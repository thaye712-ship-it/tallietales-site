// The item's own page: item.html?id=<page name>. Builds the gallery and details from items.js.
(function () {
  var d = window.TTF || {}, root = document.getElementById("item");
  if (!root) return;
  var slug = window.TTF_slug, card = window.TTF_card;
  var id = new URLSearchParams(location.search).get("id") || "";
  var all = [], it = null, list = null;
  ["prints", "crochet"].forEach(function (k) {
    (d[k] || []).forEach(function (x) { all.push([k, x]); if (slug(x) === id) { it = x; list = k; } });
  });

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  if (!it) {
    root.appendChild(el("h1", "item-title", "Item not found"));
    var b = el("a", "btn btn-main", "See all items"); b.href = "./#prints";
    root.appendChild(b);
    return;
  }

  document.title = it.title + " | Tiger Tails Fab";
  var back = document.getElementById("back");
  if (back) back.href = "./#" + list;

  // gallery: a swipeable strip of photos, arrows, and thumbnails
  var photos = [];
  if (it.photo) photos.push(it.photo);
  (it.photos || []).forEach(function (p) { if (photos.indexOf(p) < 0) photos.push(p); });

  var gal = el("div", "gal");
  var strip = el("div", "strip");
  strip.tabIndex = 0;
  strip.setAttribute("aria-label", it.title + " photos");
  photos.forEach(function (p, i) {
    var f = el("figure", "slide");
    var img = el("img");
    img.src = "img/items/" + p;
    img.alt = it.title + ", photo " + (i + 1) + " of " + photos.length;
    if (i) img.loading = "lazy";
    f.appendChild(img);
    strip.appendChild(f);
  });
  if (!photos.length) {
    var e = el("figure", "slide empty"); e.appendChild(el("span", "", "Photo coming")); strip.appendChild(e);
  }
  gal.appendChild(strip);

  var thumbs = el("div", "thumbs");
  if (photos.length > 1) {
    var prev = el("button", "arrow prev", "‹"), next = el("button", "arrow next", "›");
    prev.type = next.type = "button";
    prev.setAttribute("aria-label", "Previous photo");
    next.setAttribute("aria-label", "Next photo");
    var count = el("span", "gcount", "1 / " + photos.length);
    gal.appendChild(prev); gal.appendChild(next); gal.appendChild(count);
    photos.forEach(function (p, i) {
      var t = el("button", "thumb" + (i ? "" : " on"));
      t.type = "button";
      t.setAttribute("aria-label", "Show photo " + (i + 1));
      var ti = el("img"); ti.src = "img/items/" + p; ti.alt = ""; ti.loading = "lazy";
      t.appendChild(ti);
      t.addEventListener("click", function () { go(i); });
      thumbs.appendChild(t);
    });
    var cur = 0;
    function go(i) {
      i = (i + photos.length) % photos.length;
      strip.scrollTo({ left: i * strip.clientWidth, behavior: "smooth" });
    }
    prev.addEventListener("click", function () { go(cur - 1); });
    next.addEventListener("click", function () { go(cur + 1); });
    strip.addEventListener("keydown", function (ev) {
      if (ev.key === "ArrowLeft") go(cur - 1);
      if (ev.key === "ArrowRight") go(cur + 1);
    });
    strip.addEventListener("scroll", function () {
      var i = Math.round(strip.scrollLeft / strip.clientWidth);
      if (i === cur) return;
      cur = i;
      count.textContent = (i + 1) + " / " + photos.length;
      [].forEach.call(thumbs.children, function (t, k) { t.classList.toggle("on", k === i); });
      var on = thumbs.children[i]; if (on) on.scrollIntoView({ block: "nearest", inline: "nearest" });
    }, { passive: true });
  }

  var left = el("div", "item-gal");
  left.appendChild(gal);
  if (photos.length > 1) left.appendChild(thumbs);

  // details
  var info = el("div", "item-info");
  if (it.tag) info.appendChild(el("span", "tag", it.tag));
  info.appendChild(el("h1", "item-title", it.title));
  if (it.price) info.appendChild(el("p", "item-price", it.price));
  if (it.deal) info.appendChild(el("p", "item-deal", it.deal));
  if (it.blurb) info.appendChild(el("p", "item-blurb", it.blurb));
  if (it.details && it.details.length) {
    var ul = el("ul", "item-points");
    it.details.forEach(function (x) { ul.appendChild(el("li", "", x)); });
    info.appendChild(ul);
  }
  var acts = el("div", "item-acts");
  var ask = el("a", "btn btn-main", it.ask || "Ask about this");
  ask.href = "./?item=" + encodeURIComponent(it.title) + "#contact";
  acts.appendChild(ask);
  if (it.link) {
    var mw = el("a", "btn btn-line", "Free file on MakerWorld");
    if (!/free/i.test(it.tag || "")) mw.textContent = "See it on MakerWorld";
    mw.href = it.link; mw.target = "_blank"; mw.rel = "noopener";
    acts.appendChild(mw);
  }
  info.appendChild(acts);
  info.appendChild(el("p", "item-note", "Every piece is printed or made when you order it. Tell us the colors you want and we'll reply with timing and shipping."));

  root.appendChild(left);
  root.appendChild(info);

  // more from the same list
  var more = document.querySelector("[data-more]");
  if (more && card) {
    var others = all.filter(function (x) { return x[0] === list && x[1] !== it; }).map(function (x) { return x[1]; });
    others.slice(0, 3).forEach(function (x) { more.appendChild(card(x)); });
    if (!others.length) document.getElementById("more").hidden = true;
  }
})();
