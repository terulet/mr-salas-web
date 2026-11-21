(() => {
  const main = document.getElementById("contenido");
  const entry = main.querySelector("[data-enter-history]");
  const historySection = document.getElementById("como");
  const eras = document.getElementById("salas-cine-eras");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");

  entry.addEventListener("click", event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!eras.hidden) return;
    event.preventDefault();
    eras.hidden = false;
    if (!reduced.matches) main.classList.add("salas-passing");

    setTimeout(() => {
      if (location.hash !== "#como") history.pushState(null, "", "#como");
      historySection.scrollIntoView({ block: "start", behavior: reduced.matches ? "auto" : "smooth" });
    }, reduced.matches ? 0 : 330);
  });
})();

(() => {
    const root = document.querySelector('.salas-hero-root');
    const cover = root.querySelector('.salas-cover');
    const scene = root.querySelector('.salas-background');
    const original = scene.querySelector('img');
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const opening = [[892, 212], [1582, 113], [1590, 298], [1598, 574], [1604, 868], [887, 815], [890, 611], [893, 377]];
    const layer = document.createElement('div');
    layer.className = 'salas-depth';
    layer.setAttribute('aria-hidden', 'true');

    const landscape = original.cloneNode(false);
    landscape.alt = '';
    layer.append(landscape);
    scene.insertBefore(layer, scene.querySelector('figcaption'));

    function alignToOpening() {
      if (!original.naturalWidth || !original.clientWidth || !original.clientHeight) return;
      const { clientWidth: width, clientHeight: height, naturalWidth, naturalHeight } = original;
      const [positionX, positionY] = getComputedStyle(original).objectPosition.split(' ').map(parseFloat);
      const scale = Math.max(width / naturalWidth, height / naturalHeight);
      const left = (width - naturalWidth * scale) * positionX / 100;
      const top = (height - naturalHeight * scale) * positionY / 100;
      layer.style.clipPath = 'polygon(' + opening.map(([x, y]) =>
        (left + x * scale).toFixed(2) + 'px ' + (top + y * scale).toFixed(2) + 'px'
      ).join(', ') + ')';
    }

    function stopMovement() {
      layer.classList.remove('is-moving');
      layer.style.removeProperty('--salas-depth-x');
      layer.style.removeProperty('--salas-depth-y');
    }

    cover.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse' || reducedMotion.matches || cover.clientWidth <= 600 || root.closest('main').classList.contains('salas-passing')) return;
      const bounds = cover.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1));
      const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1));
      layer.style.setProperty('--salas-depth-x', (-x * 22).toFixed(1) + 'px');
      layer.style.setProperty('--salas-depth-y', (-y * 10).toFixed(1) + 'px');
      layer.classList.add('is-moving');
    }, { passive: true });
    cover.addEventListener('pointerleave', stopMovement);
    reducedMotion.addEventListener('change', stopMovement);
    original.addEventListener('load', alignToOpening);
    new ResizeObserver(alignToOpening).observe(cover);
    alignToOpening();
  })();
