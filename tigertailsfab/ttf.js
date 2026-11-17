(function () {
  var d = window.TTF || {};
  var email = d.email || "";

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  function card(it) {
    var c = el("article", "card" + (it.sample ? " is-sample" : ""));
    var pic = el("div", "pic");
    if (it.photo) {
      var img = el("img");
      img.src = "img/items/" + it.photo;
      img.alt = it.title;
      img.loading = "lazy";
      pic.appendChild(img);
    } else {
      pic.classList.add("empty");
      pic.appendChild(el("span", "", "Photo coming"));
    }
    if (it.tag) pic.appendChild(el("span", "tag", it.tag));
    if (it.sample) pic.appendChild(el("span", "sample", "Sample"));
    c.appendChild(pic);

    var body = el("div", "body");
    body.appendChild(el("h3", "", it.title));
    if (it.blurb) body.appendChild(el("p", "", it.blurb));
    if (it.price) body.appendChild(el("p", "price", it.price));
    if (it.deal) body.appendChild(el("p", "deal", it.deal));
    var acts = el("div", "acts");
    var ask = el("a", "btn btn-main sm", it.ask || "Ask about this");
    ask.href = "#contact";
    ask.addEventListener("click", function () {
      var f = document.getElementById("ask-item");
      if (f) f.value = it.title;
    });
    acts.appendChild(ask);
    if (it.link) {
      var mw = el("a", "btn btn-line sm", "MakerWorld");
      mw.href = it.link;
      mw.target = "_blank";
      mw.rel = "noopener";
      acts.appendChild(mw);
    }
    body.appendChild(acts);
    c.appendChild(body);
    return c;
  }

  document.querySelectorAll("[data-list]").forEach(function (g) {
    var items = d[g.getAttribute("data-list")] || [];
    if (!items.length) {
      g.appendChild(el("p", "none", "New items coming soon."));
      return;
    }
    items.forEach(function (it) { g.appendChild(card(it)); });
  });

  // videos: YouTube Shorts (youtube: "VIDEO_ID") or a file in img/videos/ (mp4: "name.mp4")
  var vids = d.videos || [], vg = document.querySelector("[data-videos]");
  if (vg && vids.length) {
    vids.forEach(function (v) {
      var box = el("figure", "vid");
      var frame = el("div", "vframe");
      if (v.youtube) {
        var b = el("button", "vplay");
        b.type = "button";
        b.setAttribute("aria-label", "Play " + v.title);
        b.style.backgroundImage = "url(https://i.ytimg.com/vi/" + v.youtube + "/hqdefault.jpg)";
        b.appendChild(el("span", "vicon", "\u25B6"));
        b.addEventListener("click", function () {
          var f = document.createElement("iframe");
          f.src = "https://www.youtube-nocookie.com/embed/" + v.youtube + "?autoplay=1&playsinline=1&rel=0";
          f.title = v.title;
          f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
          f.allowFullscreen = true;
          frame.replaceChild(f, b);
        });
        frame.appendChild(b);
      } else if (v.mp4) {
        var m = el("video");
        m.src = "img/videos/" + v.mp4;
        m.controls = true; m.playsInline = true; m.preload = "none";
        if (v.poster) m.poster = "img/videos/" + v.poster;
        frame.appendChild(m);
      }
      box.appendChild(frame);
      box.appendChild(el("figcaption", "", v.title));
      vg.appendChild(box);
    });
    var vs = document.getElementById("videos"), vn = document.getElementById("nav-videos");
    if (vs) vs.hidden = false;
    if (vn) vn.hidden = false;
    var cr = document.getElementById("crochet");
    if (cr) cr.classList.remove("alt");   // keep the light/dark bands alternating
  }

  if (!email) {
    var f0 = document.getElementById("ask"), alt = document.getElementById("ask-alt");
    if (f0) f0.hidden = true;
    if (alt) alt.hidden = false;
    var mwb = document.getElementById("ask-mw");
    if (mwb && d.makerworld) mwb.href = d.makerworld;
    return;
  }

  // email is set: show the email form first, with MakerWorld as a second option below it
  var alt2 = document.getElementById("ask-alt"), mw2 = document.getElementById("ask-mw"), f2 = document.getElementById("ask");
  if (alt2 && f2) {
    if (mw2) { mw2.className = "btn btn-line"; mw2.textContent = "Or message us on MakerWorld"; if (d.makerworld) mw2.href = d.makerworld; }
    f2.parentNode.insertBefore(alt2, f2.nextSibling);
    alt2.style.marginTop = "16px";
    alt2.hidden = false;
  }

  var link = document.getElementById("email-link");
  if (link) { link.href = "mailto:" + email; link.textContent = email; }

  var form = document.getElementById("ask");
  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.name.value.trim();
    var item = form.item.value.trim();
    var msg = form.msg.value.trim();
    var subject = "Tiger Tails Fab: " + (item || "question");
    var body = (msg || "") + "\n\n" + (item ? "Item: " + item + "\n" : "") + (name ? "From: " + name : "");
    window.location.href = "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body.trim());
  });
})();
