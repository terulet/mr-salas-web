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
})();

/* ---------- Recorrido de obra y reforma ---------- */
(() => {
  const history = document.querySelector(".reform-history");
  const nav = history.querySelector(".era-nav");
  const links = [...nav.querySelectorAll("a")];
  const header = document.getElementById("nav");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const chapters = [...history.querySelectorAll(".chapter")].map(section => ({
    section,
    pin: section.querySelector(".chapter__pin"),
    caption: section.querySelector(".caption"),
    buttons: [...section.querySelectorAll("[data-select]")],
    images: [...section.querySelectorAll("[data-photo]")],
    captions: { before: section.dataset.before, after: section.dataset.after },
    lastScrollStage: null
  }));
  let pending = false;

  function show(chapter, stage) {
    if (chapter.section.dataset.stage === stage) return;
    chapter.section.dataset.stage = stage;
    chapter.caption.textContent = chapter.captions[stage];
    for (const button of chapter.buttons) {
      button.setAttribute("aria-pressed", String(button.dataset.select === stage));
    }
    for (const img of chapter.images) {
      img.setAttribute("aria-hidden", String(img.dataset.photo !== stage));
    }
  }

  function trackScroll() {
    pending = false;
    const line = header.offsetHeight + nav.offsetHeight;
    let active = chapters[0];
    for (const chapter of chapters) {
      const top = chapter.section.getBoundingClientRect().top;
      if (top <= line + nav.offsetHeight) active = chapter;
      if (reduced.matches) continue;
      const travel = Math.max(1, chapter.section.offsetHeight - chapter.pin.offsetHeight);
      const stage = line - top > travel * .42 ? "after" : "before";
      if (stage !== chapter.lastScrollStage) {
        chapter.lastScrollStage = stage;
        show(chapter, stage);
      }
    }
    for (const link of links) {
      if (link.hash === "#" + active.section.id) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  }

  function scheduleTracking() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(trackScroll);
  }

  for (const chapter of chapters) {
    for (const button of chapter.buttons) {
      button.addEventListener("click", () => show(chapter, button.dataset.select));
    }
  }
  window.addEventListener("scroll", scheduleTracking, { passive: true });
  window.addEventListener("resize", scheduleTracking);
  reduced.addEventListener("change", () => {
    for (const chapter of chapters) chapter.lastScrollStage = null;
    scheduleTracking();
  });
  trackScroll();
})();

(() => {
  const section = document.getElementById("lo-que-no-se-ve");
  const details = {
    window: {
      heading: "El encuentro con la ventana",
      copy: "Revisamos la junta entre el marco y la pared y el vierteaguas de debajo. Ese remate ayuda a que la lluvia caiga hacia fuera y se separe de la fachada."
    },
    base: {
      heading: "El zócalo de la fachada",
      copy: "La parte baja recibe salpicaduras y está cerca del terreno. Miramos de dónde viene la humedad antes de decidir cómo reparar y rematar el muro."
    },
    drain: {
      heading: "La salida del agua",
      copy: "Comprobamos hacia dónde corre la lluvia desde la terraza. En este ejemplo, la pendiente lleva el agua hasta una rejilla a ras de suelo."
    }
  };
  const controls = [...section.querySelectorAll("[data-detail]")];
  const heading = section.querySelector("[data-craft-heading]");
  const copy = section.querySelector("[data-craft-copy]");
  let selected = "window";

  for (const control of controls) {
    control.addEventListener("click", () => {
      const key = control.dataset.detail;
      if (key === selected) return;
      selected = key;
      heading.textContent = details[key].heading;
      copy.textContent = details[key].copy;
      for (const item of controls) {
        item.setAttribute("aria-pressed", String(item.dataset.detail === key));
      }
    });
  }
})();
