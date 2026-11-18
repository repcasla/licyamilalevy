/* FORM: valida y arma el mensaje para WhatsApp o mail (sin backend) */
(function () {
  "use strict";
  var cfg = window.SITE;
  var form = document.getElementById("contactForm");
  if (!cfg || !form) return;

  var status = document.getElementById("formStatus");

  // Los botones "Consultar por..." de las tarjetas preseleccionan el motivo
  document.querySelectorAll("[data-motivo]").forEach(function (link) {
    link.addEventListener("click", function () {
      form.elements.motivo.value = link.getAttribute("data-motivo");
    });
  });

  function setError(fieldName, message) {
    var field = form.elements[fieldName].closest(".field");
    var out = document.getElementById(fieldName + "-error");
    field.classList.toggle("is-invalid", Boolean(message));
    if (out) out.textContent = message || "";
  }

  function validate() {
    var ok = true;
    var nombre = form.elements.nombre.value.trim();
    setError("nombre", nombre ? "" : "Escribí tu nombre para poder responderte.");
    if (!nombre) ok = false;
    setError("motivo", form.elements.motivo.value ? "" : "Elegí un motivo de consulta.");
    if (!form.elements.motivo.value) ok = false;
    if (!ok) {
      var firstInvalid = form.querySelector(".is-invalid input, .is-invalid select");
      if (firstInvalid) firstInvalid.focus();
    }
    return ok;
  }

  function buildMessage() {
    var e = form.elements;
    var lines = [
      "Hola " + cfg.profesional.nombre + ", soy " + e.nombre.value.trim() + ".",
      "Motivo de consulta: " + e.motivo.value + ".",
      "Consultorio preferido: " + e.consultorio.value + "."
    ];
    if (e.telefono.value.trim()) lines.push("Mi teléfono: " + e.telefono.value.trim() + ".");
    if (e.mensaje.value.trim()) lines.push(e.mensaje.value.trim());
    lines.push("Quisiera consultar disponibilidad de turnos. ¡Gracias!");
    return lines.join("\n");
  }

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (!validate()) return;

    var text = buildMessage();
    var canal = form.elements.canal.value;

    if (canal === "email") {
      var subject = "Consulta de turno: " + form.elements.motivo.value;
      window.location.href = "mailto:" + cfg.profesional.email +
        "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(text);
      status.textContent = "Se abrió tu app de mail con el mensaje listo. Solo falta enviarlo.";
    } else {
      window.open("https://wa.me/" + cfg.profesional.whatsapp + "?text=" + encodeURIComponent(text), "_blank", "noopener");
      status.textContent = "Se abrió WhatsApp con el mensaje listo. Solo falta enviarlo.";
    }
  });

  // Limpia el error apenas la persona corrige el campo
  ["nombre", "motivo"].forEach(function (n) {
    form.elements[n].addEventListener("input", function () { setError(n, ""); });
  });
})();
