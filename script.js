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

  /* ---------- Formulario → WhatsApp ---------- */
  var form = document.getElementById("form");
  var err = document.getElementById("form-error");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var nombre = form.elements.namedItem("nombre").value.trim();
    var tipo = form.elements.namedItem("tipo").value;
    var lugar = form.elements.namedItem("lugar").value.trim();
    var msg = form.elements.namedItem("mensaje").value.trim();
    var priv = document.getElementById("f-priv").checked;

    [form.elements.namedItem("nombre"), form.elements.namedItem("tipo"), form.elements.namedItem("lugar")].forEach(function (f) {
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

  /* ---------- Cuatro fotografías de la obra ---------- */
  var story = document.getElementById("obra-recorrido");
  var scene = document.getElementById("obra-escena");
  var caption = document.getElementById("stage-caption");
  var stageButtons = Array.from(story.querySelectorAll("[data-stage]"));
  var stageFrames = Array.from(story.querySelectorAll(".story__frame"));
  var preview = story.closest("#mr-salas-photo-preview");
  var activeStage = 0;
  var scrollStage = 0;
  var pending = false;

  function showPhoto(index) {
    if (activeStage === index) return;
    activeStage = index;
    stageButtons.forEach(function (button, i) {
      button.setAttribute("aria-pressed", String(index === i));
      stageFrames[i].classList.toggle("is-current", index === i);
    });
    var selected = stageButtons[index];
    var number = selected.firstElementChild.textContent;
    var title = selected.textContent.trim().slice(number.length).trim();
    caption.textContent = number + " / 04 · " + title;
  }

  function scrollProgress() {
    if (preview) return story.scrollTop / Math.max(story.scrollHeight - story.clientHeight, 1);
    var stickyTop = parseFloat(window.getComputedStyle(scene).top) || 0;
    return (stickyTop - story.getBoundingClientRect().top) / Math.max(story.offsetHeight - scene.offsetHeight, 1);
  }

  function followScroll() {
    pending = false;
    var progress = Math.max(0, Math.min(1, scrollProgress()));
    var index = Math.min(stageFrames.length - 1, Math.floor(progress * stageFrames.length));
    if (scrollStage === index) return;
    scrollStage = index;
    showPhoto(index);
  }

  function schedule() {
    if (pending) return;
    pending = true;
    window.requestAnimationFrame(followScroll);
  }

  stageButtons.forEach(function (button, index) {
    button.addEventListener("click", function () { showPhoto(index); });
  });
  (preview ? story : window).addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  schedule();
})();
