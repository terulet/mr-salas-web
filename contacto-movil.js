(() => {
    const shortcuts = document.querySelector('.mobile-contact');
    const hero = document.getElementById('inicio');
    const contact = document.getElementById('contacto');
    const header = document.getElementById('nav');
    const compact = matchMedia('(max-width: 740px)');
    let scheduled = false;

    function update() {
      scheduled = false;
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const pastHero = hero.getBoundingClientRect().bottom <= header.offsetHeight + 12;
      const beforeContact = contact.getBoundingClientRect().top >= viewportHeight;
      shortcuts.hidden = !compact.matches || !pastHero || !beforeContact;
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
    compact.addEventListener('change', schedule);
    update();
  })();
