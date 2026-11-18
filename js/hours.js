/* HOURS: resalta el día de hoy y muestra si está atendiendo ahora */
(function () {
  "use strict";
  var cfg = window.SITE;
  if (!cfg) return;

  // Día y hora actuales en Buenos Aires (sin depender de la zona del visitante)
  function nowInBA() {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: cfg.zonaHoraria, weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false
    }).formatToParts(new Date());
    var get = function (t) { return parts.find(function (p) { return p.type === t; }).value; };
    var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { day: map[get("weekday")], minutes: (parseInt(get("hour"), 10) % 24) * 60 + parseInt(get("minute"), 10) };
  }
  function toMin(hhmm) { var p = hhmm.split(":"); return parseInt(p[0], 10) * 60 + parseInt(p[1], 10); }

  var now = nowInBA();

  // 1) Resaltar filas de hoy
  document.querySelectorAll("#hoursTable tr[data-days]").forEach(function (row) {
    var days = row.getAttribute("data-days").split(",").map(Number);
    if (days.indexOf(now.day) !== -1) row.classList.add("is-today");
  });

  // 2) Estado "atendiendo ahora" (solo si es verdadero, para no desalentar el contacto)
  var open = cfg.horarios.some(function (h) {
    return h.dias.indexOf(now.day) !== -1 && now.minutes >= toMin(h.desde) && now.minutes < toMin(h.hasta);
  });
  var status = document.getElementById("openStatus");
  if (status && open) {
    status.textContent = "Ahora estoy en horario de atención.";
    status.hidden = false;
  }
})();
