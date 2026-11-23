(() => {
  const gallery = document.querySelector('#obras-reales');
  const viewer = gallery?.querySelector('[data-works-viewer]');
  if (typeof viewer?.showModal !== 'function') return;

  const photos = [...gallery.querySelectorAll('[data-works-photo]')];
  const large = viewer.querySelector('[data-works-large]');
  const title = viewer.querySelector('[data-works-title]');
  const position = viewer.querySelector('[data-works-position]');
  let current = 0;
  let opener;

  function showPhoto(index) {
    current = (index + photos.length) % photos.length;
    const photo = photos[current];
    const thumbnail = photo.querySelector('img');
    large.style.filter = thumbnail.style.filter;
    large.alt = thumbnail.alt;
    large.src = photo.href;
    title.textContent = thumbnail.alt;
    position.textContent = `${current + 1} / ${photos.length}`;
  }

  photos.forEach((photo, index) => photo.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = photo;
    showPhoto(index);
    viewer.showModal();
  }));

  viewer.querySelector('[data-works-previous]').addEventListener('click', () => showPhoto(current - 1));
  viewer.querySelector('[data-works-next]').addEventListener('click', () => showPhoto(current + 1));
  viewer.addEventListener('close', () => opener?.focus({ preventScroll: true }));
  viewer.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
})();
