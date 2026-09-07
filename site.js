/* Tallie Tales LLC — small progressive enhancements.
   Everything here is optional: with JavaScript off, the pages render fully.  */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduced = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Marks that JS is available, which is what switches the reveal styles on.
  root.className += ' js';

  function revealAll(nodes) {
    for (var i = 0; i < nodes.length; i++) nodes[i].classList.add('in');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var targets = document.querySelectorAll('.reveal');

    // No IntersectionObserver (or motion is unwanted): show everything at once.
    if (reduced || !('IntersectionObserver' in window)) {
      revealAll(targets);
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    for (var i = 0; i < targets.length; i++) io.observe(targets[i]);

    // Safety net: if anything above misfires, never leave content hidden.
    window.setTimeout(function () { revealAll(targets); }, 3000);

    // Blow counter under the hero animation, kept in step with the CSS loop.
    var counter = document.getElementById('blow-count');
    if (counter) {
      var n = 0;
      window.setInterval(function () {
        n += 1;
        counter.textContent = n < 10 ? '0' + n : String(n);
      }, 1900);
    }
  });
})();
