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
    var acts = el("div", "acts");
    var ask = el("a", "btn btn-main sm", "Ask about this");
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

  if (!email) {
    var f0 = document.getElementById("ask"), alt = document.getElementById("ask-alt");
    if (f0) f0.hidden = true;
    if (alt) alt.hidden = false;
    var mwb = document.getElementById("ask-mw");
    if (mwb && d.makerworld) mwb.href = d.makerworld;
    return;
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
