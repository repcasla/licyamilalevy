/* NAV: menú móvil + sombra del header al scrollear */
(function () {
  "use strict";
  var header = document.getElementById("header");
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  if (!header || !toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });
  // Cierra el menú al elegir una opción o con Escape
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });

  function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
