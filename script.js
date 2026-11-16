/* =====================================================================
   M.R. SALAS · Manolo Rodríguez · script.js
   Menú móvil, cabecera al hacer scroll, apariciones suaves y
   formulario que prepara el mensaje de WhatsApp.
   ===================================================================== */
(function () {
  "use strict";

  // Número de WhatsApp de Manolo (formato internacional, sin + ni espacios)
  var WHATSAPP_NUMERO = "34615959391";

  // Mensaje inicial de los botones de WhatsApp
  var WA_SALUDO = "Hola Manolo, te escribo desde la web. Quería consultarte una obra.";

  /* ---------- Botones de WhatsApp con saludo ---------- */
  var waUrl = "https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(WA_SALUDO);
  document.querySelectorAll(".js-wa").forEach(function (a) { a.href = waUrl; });

  /* ---------- Cabecera ---------- */
  var nav = document.getElementById("nav");
  function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menú móvil ---------- */
  var toggle = document.getElementById("toggle");
  var menu = document.getElementById("menu");
  function setMenu(open) {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }
  toggle.addEventListener("click", function () { setMenu(!menu.classList.contains("is-open")); });
  menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---------- Apariciones suaves ---------- */
  var targets = document.querySelectorAll(
    ".section-head, .about__head, .about__body, .card, .steps li, .pledge__big, .zone__grid > *, .faq details, .contact__info, .form"
  );
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    targets.forEach(function (el) { el.classList.add("reveal"); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Formulario → WhatsApp ---------- */
  var form = document.getElementById("form");
  var err = document.getElementById("form-error");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var nombre = form.nombre.value.trim();
    var tipo = form.tipo.value;
    var lugar = form.lugar.value.trim();
    var msg = form.mensaje.value.trim();
    var priv = document.getElementById("f-priv").checked;

    [form.nombre, form.tipo, form.lugar].forEach(function (f) {
      f.classList.toggle("is-invalid", !f.value.trim());
    });

    if (!nombre || !tipo || !lugar || !priv) {
      err.hidden = false;
      return;
    }
    err.hidden = true;

    var texto =
      "Hola Manolo, soy " + nombre + ". Te escribo desde la web.\n" +
      "• Trabajo: " + tipo + "\n" +
      "• Municipio: " + lugar +
      (msg ? "\n• Detalles: " + msg : "");

    window.open("https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(texto), "_blank", "noopener");
  });

  /* ---------- Año del pie ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
