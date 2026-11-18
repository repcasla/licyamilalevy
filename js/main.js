/* MAIN: inicialización general. Los módulos se auto-ejecutan; acá van detalles menores. */
(function () {
  "use strict";
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Punto único para analítica futura (GA4, Meta Pixel, etc.): cada CTA tiene data-track
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-track]");
    if (!el) return;
    // Ejemplo: gtag("event", "cta_click", { cta: el.dataset.track });
    window.dispatchEvent(new CustomEvent("cta:click", { detail: el.dataset.track }));
  });
})();
