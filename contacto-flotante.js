(() => {
  const shortcut = document.querySelector('.floating-contact');
  const contact = document.getElementById('contacto');
  if (!shortcut || !contact) return;

  let scheduled = false;

  function update() {
    scheduled = false;
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
    const beforeContact = contact.getBoundingClientRect().top >= viewportHeight;
    shortcut.hidden = !beforeContact;
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  window.visualViewport?.addEventListener('resize', schedule);
  update();
})();
