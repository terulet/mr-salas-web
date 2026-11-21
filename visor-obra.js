(() => {
    const root = document.getElementById('salas-obra-visor');
    const buttons = [...root.querySelectorAll('[data-pick]')];
    const before = root.querySelector('[data-image="before"]');
    const after = root.querySelector('[data-image="after"]');
    const title = root.querySelector('.work-caption h3');
    const description = root.querySelector('.work-caption p');
    const sweep = root.querySelector('.work-sweep');
    const localized = {
      es: {
        before: ['El porche antes de la reforma', 'El pavimento exterior estaba deteriorado y el revoco se había desprendido en varios puntos.'],
        after: [title.textContent, description.textContent],
        detail: ['Remate del pavimento en la entrada', 'La ampliación muestra el encuentro entre el suelo del porche, el peldaño y el zócalo del pilar.']
      },
      ca: {
        before: ['El porxo abans de la reforma', 'El paviment exterior estava deteriorat i l’arrebossat s’havia desprès en diversos punts.'],
        after: [title.textContent, description.textContent],
        detail: ['Acabat del paviment a l’entrada', 'L’ampliació mostra la unió entre el terra del porxo, el graó i el sòcol del pilar.']
      },
      fr: {
        before: ['Le porche avant les travaux', 'Le sol extérieur était abîmé et l’enduit s’était décollé par endroits.'],
        after: [title.textContent, description.textContent],
        detail: ['Finition du sol à l’entrée', 'Le gros plan montre le raccord entre le sol du porche, la marche et la base du pilier.']
      },
      en: {
        before: ['The porch before renovation', 'The outdoor paving was damaged and the render had flaked off in places.'],
        after: [title.textContent, description.textContent],
        detail: ['Paving detail at the entrance', 'The close-up shows where the porch floor, step and base of the pillar meet.']
      },
      de: {
        before: ['Der Vorbau vor der Sanierung', 'Der Außenbelag war beschädigt und der Putz stellenweise abgeplatzt.'],
        after: [title.textContent, description.textContent],
        detail: ['Bodenbelag am Eingang im Detail', 'Die Nahaufnahme zeigt den Übergang zwischen dem Boden des Vorbaus, der Stufe und dem Sockel des Pfeilers.']
      },
      nl: {
        before: ['De veranda vóór de renovatie', 'De bestrating was beschadigd en het pleisterwerk liet op verschillende plekken los.'],
        after: [title.textContent, description.textContent],
        detail: ['Detail van de bestrating bij de ingang', 'De detailfoto toont de aansluiting tussen de vloer van de veranda, de trede en de voet van de pijler.']
      }
    };
    const stages = localized[document.documentElement.lang] ?? localized.es;
    const fullAlt = after.alt;
    const detailDescriptions = {
      es: 'Detalle ampliado del peldaño, el pavimento y el zócalo del pilar.',
      ca: 'Detall ampliat del graó, el paviment i el sòcol del pilar.',
      fr: 'Gros plan sur la marche, le revêtement du sol et la base du pilier.',
      en: 'Close-up of the step, paving and base of the pillar.',
      de: 'Nahaufnahme von Stufe, Bodenbelag und Pfeilersockel.',
      nl: 'Detailfoto van de trede, de bestrating en de voet van de pijler.'
    };
    const detailAlt = detailDescriptions[document.documentElement.lang] ?? detailDescriptions.es;
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
