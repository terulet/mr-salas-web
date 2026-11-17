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

  /* ---------- Túnel del tiempo de la obra ---------- */
  var story = document.getElementById("obra-recorrido");
  var scene = document.getElementById("obra-escena");
  var caption = document.getElementById("stage-caption");
  var stageButtons = Array.from(story.querySelectorAll("[data-stage]"));
  var stageSteps = Array.from(story.querySelectorAll(".story__step"));
  var stageFrames = Array.from(scene.querySelectorAll(".story__frame"));
  var stageMarkers = Array.from(scene.querySelectorAll(".story__track i"));
  var mobile = window.matchMedia("(max-width: 740px)");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var activeStage = 0;
  var pending = false;

  function readingLine() {
    var top = parseFloat(window.getComputedStyle(scene).top) || 0;
    if (mobile.matches) {
      var gap = parseFloat(window.getComputedStyle(story).rowGap) || 0;
      top += scene.offsetHeight + gap;
    }
    return top;
  }

  function stagePosition(line) {
    var tops = stageSteps.map(function (step) { return step.getBoundingClientRect().top; });
    for (var i = 0; i < tops.length - 1; i++) {
      if (line < tops[i + 1]) {
        return i + Math.max(0, (line - tops[i]) / Math.max(tops[i + 1] - tops[i], 1));
      }
    }
    return tops.length - 1;
  }

  function showStage(index) {
    if (activeStage === index) return;
    activeStage = index;
    stageButtons.forEach(function (button, i) {
      button.setAttribute("aria-pressed", String(index === i));
      stageSteps[i].classList.toggle("is-current", index === i);
      stageFrames[i].classList.toggle("is-current", index === i);
      stageMarkers[i].classList.toggle("is-marked", i <= index);
    });
    var selected = stageButtons[index];
    var number = selected.firstElementChild.textContent;
    var title = selected.textContent.trim().slice(number.length).trim();
    caption.textContent = number + " / 04 · " + title;
  }

  function followScroll() {
    pending = false;
    var position = stagePosition(readingLine());
    var index = Math.floor(position);
    var fraction = position - index;
    // Hold each photo still, then reveal the next one by moving the survey line.
    var revealStart = .64;
    var reveal = reducedMotion.matches ? 0 : Math.max(0, (fraction - revealStart) / (1 - revealStart));

    showStage(index);
    stageFrames.forEach(function (frame, i) {
      frame.classList.toggle("is-next", reveal > 0 && i === index + 1);
    });
    var progress = reducedMotion.matches ? index : position;
    scene.style.setProperty("--story-progress", progress / (stageFrames.length - 1));
    scene.style.setProperty("--story-reveal", reveal * 100 + "%");
    scene.classList.toggle("is-revealing", reveal > 0);
  }

  function schedule() {
    if (pending) return;
    pending = true;
    window.requestAnimationFrame(followScroll);
  }

  function sizeScene() {
    story.style.setProperty("--story-scene-height", scene.offsetHeight + "px");
    schedule();
  }

  stageButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      var difference = stageSteps[index].getBoundingClientRect().top - readingLine();
      window.scrollBy({ top: difference + 2, behavior: reducedMotion.matches ? "auto" : "smooth" });
    });
  });
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", sizeScene);
  reducedMotion.addEventListener("change", schedule);
  if (window.ResizeObserver) new window.ResizeObserver(sizeScene).observe(scene);
  sizeScene();
})();
