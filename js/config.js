/* ==========================================================================
   CONFIG: datos de la profesional. Si algo cambia (teléfono, horarios,
   consultorios), se edita acá y se reflejan en formulario y horarios.
   ========================================================================== */
window.SITE = {
  profesional: {
    nombre: "Lic. Yamila Levy",
    matricula: "N° 15483",
    whatsapp: "5491156694041",            // formato internacional, sin + ni espacios
    email: "pisopelvicosano.yamilalevy@gmail.com",
    instagram: "pisopelvicosano_lic.yamilalevy"
  },
  // Días: 0 = domingo ... 6 = sábado. Horas en formato 24 h.
  horarios: [
    { dias: [1],          desde: "08:00", hasta: "12:00" },
    { dias: [1],          desde: "14:00", hasta: "19:00" },
    { dias: [2, 3, 4, 5], desde: "08:00", hasta: "13:00" }
  ],
  zonaHoraria: "America/Argentina/Buenos_Aires"
};
