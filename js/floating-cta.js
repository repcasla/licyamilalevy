/* FLOATING CTA: muestra el botón de WhatsApp al salir del hero y lo oculta en el formulario */
(function () {
  "use strict";
  var fab = document.getElementById("fab");
  var hero = document.getElementById("inicio");
  var contact = document.getElementById("contacto");
  if (!fab || !hero || !("IntersectionObserver" in window)) { if (fab) fab.classList.add("is-visible"); return; }

  var heroVisible = true, contactVisible = false;
  function update() { fab.classList.toggle("is-visible", !heroVisible && !contactVisible); }

  new IntersectionObserver(function (entries) { heroVisible = entries[0].isIntersecting; update(); }).observe(hero);
  if (contact) new IntersectionObserver(function (entries) { contactVisible = entries[0].isIntersecting; update(); }).observe(contact);
})();
