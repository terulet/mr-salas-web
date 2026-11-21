/* =====================================================================
   M.R. SALAS · Manolo Rodríguez · script.js
   Menú móvil, recorrido fotográfico y contacto por WhatsApp.
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- Cabecera ---------- */
  var nav = document.getElementById("nav");
  function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menú móvil ---------- */
  var toggle = document.getElementById("toggle");
  var menu = document.getElementById("menu");
  var languages = nav.querySelector(".lang-menu");
  var catalan = document.documentElement.lang === "ca";
  function setMenu(open) {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    const labels = catalan ? ["Obre el menú", "Tanca el menú"] : ["Abrir menú", "Cerrar menú"];
    toggle.setAttribute("aria-label", labels[Number(open)]);
  }
  toggle.addEventListener("click", function () {
    languages.open = false;
    setMenu(!menu.classList.contains("is-open"));
  });
  const languageLinks = [...languages.querySelectorAll("a[hreflang]")];
  function keepSection() {
    for (const link of languageLinks) link.hash = location.hash;
  }
  languages.addEventListener("toggle", function () {
    if (languages.open) {
      setMenu(false);
      keepSection();
    }
  });
  window.addEventListener("hashchange", keepSection);
  keepSection();
  document.addEventListener("click", function (event) {
    if (!languages.contains(event.target)) languages.open = false;
  });
  menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    if (languages.open) {
      languages.open = false;
      if (languages.contains(document.activeElement)) languages.querySelector("summary").focus();
    }
    setMenu(false);
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
  const details = document.documentElement.lang === "ca" ? {
    window: {
      heading: "La junta de la finestra",
      copy: "Revisem la junta entre el marc i la paret i el trencaaigües de sota. Aquest acabat ajuda a fer que l’aigua de la pluja caigui enfora, lluny de la façana."
    },
    base: {
      heading: "El sòcol de la façana",
      copy: "La part baixa rep esquitxades i és a prop del terreny. Mirem d’on ve la humitat abans de decidir com reparar i rematar el mur."
    },
    drain: {
      heading: "La sortida de l’aigua",
      copy: "Comprovem cap on s’escola l’aigua de la pluja des de la terrassa. En aquest exemple, el pendent la porta fins a una reixeta arran de terra."
    }
  } : {
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

/* ---------- Contacto por WhatsApp ---------- */
(() => {
  const contact = document.getElementById("contacto");
  const toggle = contact.querySelector("[data-compose]");
  const draft = document.getElementById("salas-draft");
  const job = draft.querySelector("[data-job]");
  const town = draft.querySelector("[data-town]");
  const preview = draft.querySelector("[data-message]");
  const whatsapp = draft.querySelector("[data-whatsapp]");
  const destination = new URL(whatsapp.href);

  const messages = document.documentElement.lang === "ca" ? {
    greeting: "Hola, Manolo. ",
    about: "Voldria fer-te una consulta sobre ",
    at: " a ",
    coverage: place => `Treballeu a ${place}?`,
    unspecified: "Voldria confirmar si treballeu al meu municipi."
  } : {
    greeting: "Hola Manolo. ",
    about: "Quería consultarte sobre ",
    at: " en ",
    coverage: place => `¿Trabajáis en ${place}?`,
    unspecified: "Quería confirmar si trabajáis en mi municipio."
  };

  function updateMessage() {
    const municipality = town.value.trim();
    const place = municipality ? messages.at + municipality : "";
    const topic = job.selectedOptions[0].dataset.message;
    const content = job.value === "municipio"
      ? (municipality ? messages.coverage(municipality) : messages.unspecified)
      : messages.about + topic + place + ".";
    const text = messages.greeting + content;
    preview.textContent = text;
    destination.searchParams.set("text", text);
    whatsapp.href = destination.href;
  }

  function setDraft(open) {
    draft.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    if (open) updateMessage();
  }

  toggle.addEventListener("click", () => setDraft(draft.hidden));
  document.querySelectorAll("[data-service]").forEach(link => {
    link.addEventListener("click", () => {
      job.value = link.dataset.service;
      setDraft(true);
    });
  });
  job.addEventListener("change", updateMessage);
  town.addEventListener("input", updateMessage);
  updateMessage();
  toggle.hidden = false;
})();
