(() => {
    const root = document.getElementById('salas-obra-visor');
    const buttons = [...root.querySelectorAll('[data-pick]')];
    const before = root.querySelector('[data-image="before"]');
    const after = root.querySelector('[data-image="after"]');
    const title = root.querySelector('.work-caption h3');
    const description = root.querySelector('.work-caption p');
    const sweep = root.querySelector('.work-sweep');
    const catalan = document.documentElement.lang === 'ca';
    const stages = catalan ? {
      before: ['El porxo abans de la reforma', 'El paviment exterior estava deteriorat i l’arrebossat s’havia desprès en diversos punts.'],
      after: [title.textContent, description.textContent],
      detail: ['Acabat del paviment a l’entrada', 'L’ampliació mostra la unió entre el terra del porxo, el graó i el sòcol del pilar.']
    } : {
      before: ['El porche antes de la reforma', 'El pavimento exterior estaba deteriorado y el revoco se había desprendido en varios puntos.'],
      after: [title.textContent, description.textContent],
      detail: ['Remate del pavimento en la entrada', 'La ampliación muestra el encuentro entre el suelo del porche, el peldaño y el zócalo del pilar.']
    };
    const fullAlt = after.alt;
    const detailAlt = catalan
      ? 'Detall ampliat del graó, el paviment i el sòcol del pilar.'
      : 'Detalle ampliado del peldaño, el pavimento y el zócalo del pilar.';
    for (const miniature of root.querySelectorAll('[data-mini]')) {
      miniature.src = miniature.dataset.mini === 'before' ? before.src : after.src;
    }

    function show(button) {
      const phase = button.dataset.pick;
      if (phase === root.dataset.phase) return;
      root.dataset.phase = phase;
      before.setAttribute('aria-hidden', String(phase !== 'before'));
      after.setAttribute('aria-hidden', String(phase === 'before'));
      after.alt = phase === 'detail' ? detailAlt : fullAlt;
      for (const item of buttons) item.setAttribute('aria-pressed', String(item === button));
      [title.textContent, description.textContent] = stages[phase];
      if (phase !== 'detail') {
        sweep.classList.remove('is-running');
        void sweep.offsetWidth;
        sweep.classList.add('is-running');
      }
    }

    for (const button of buttons) button.addEventListener('click', () => show(button));
    root.querySelector('.work-steps').addEventListener('keydown', event => {
      const direction = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
      const position = buttons.indexOf(event.target);
      if (!direction || position === -1) return;
      event.preventDefault();
      const next = buttons[(position + direction + buttons.length) % buttons.length];
      next.focus();
      show(next);
    });
  })();
