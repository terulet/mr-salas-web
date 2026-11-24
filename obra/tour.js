(() => {
  const tour = document.querySelector('[data-tour]');
  if (!tour) return;
  const chapters = [...tour.querySelectorAll('[data-tour-stop]')];
  const stack = tour.querySelector('[data-shot-stack]');
  const state = tour.querySelector('[data-tour-location]');
  const links = [...tour.querySelectorAll('.tour-nav a')];
  const header = document.getElementById('nav');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 760px)');
  const layers = chapters.map(chapter => ({
    image:chapter.querySelector('img'),
    x:Number(chapter.dataset.x),
    y:Number(chapter.dataset.y),
    max:Number(chapter.dataset.max),
    turnsRight: chapter.id === 'recibidor'
  }));
  if (layers.length !== 6 || layers.some(layer => !layer.image)) return;
  const journey = tour.closest('.mr-journey');
  const facade = journey?.querySelector('.facade-reveal');
  const buildStage = facade?.closest('.build-stage');
  const tourStage = tour.querySelector('.tour-stage');
  const approach = layers[0];
  const approachStart = .18;
  layers.forEach(({image,x,y}) => {
    image.style.setProperty('--focus-x', x+'%');
    image.style.setProperty('--focus-y', y+'%');
    image.style.transformOrigin = x+'% '+y+'%';
    stack.append(image);
  });
  tour.setAttribute('data-ready','true');

  let offsets = [];
  let tail = 1;
  let frame = 0;
  let shown = -1;
  const clamp = n => Math.min(1,Math.max(0,n));
  const ease = n => n*n*(3-2*n);

  const bridge = facade && buildStage && tourStage ? createBridge() : null;

  function createBridge() {
    const frame = document.createElement('div');
    const photo = document.createElement('img');
    const shade = tour.querySelector('.tour-shade').cloneNode();
    frame.className = 'facade-bridge';
    frame.setAttribute('aria-hidden', 'true');
    photo.className = 'facade-bridge-photo';
    photo.src = approach.image.src;
    photo.alt = '';
    photo.decoding = 'async';
    frame.append(photo, shade);
    journey.append(frame);

    let geometry = null;

    function measureBridge() {
      const from = facade.getBoundingClientRect();
      const build = buildStage.getBoundingClientRect();
      const to = tourStage.getBoundingClientRect();
      const stickyTop = parseFloat(getComputedStyle(buildStage).top);
      const targetTop = parseFloat(getComputedStyle(tourStage).top);
      const tourTop = tour.getBoundingClientRect().top + window.scrollY;
      const viewportBottom = window.innerHeight;
      const [positionX, positionY] = getComputedStyle(facade).objectPosition.split(' ').map(parseFloat);
      geometry = {
        start: tourTop - viewportBottom,
        end: tourTop - targetTop,
        from: {
          left: from.left,
          top: Math.min(stickyTop, viewportBottom - build.height) + from.top - build.top,
          width: from.width,
          height: from.height
        },
        to: {left: to.left, top: targetTop, width: to.width, height: to.height},
        positionX,
        positionY
      };
    }

    function drawBridge(scroll) {
      const available = geometry && !motion.matches && photo.naturalWidth && Number(facade.style.opacity) >= .999;
      const active = Boolean(available && scroll > geometry.start && scroll < geometry.end);
      journey.toggleAttribute('data-joining', active);
      if (!active) return Boolean(available);

      const progress = ease(clamp((scroll - geometry.start) / (geometry.end - geometry.start)));
      const mix = (start, end) => start + (end - start) * progress;
      for (const edge of ['left', 'top', 'width', 'height']) {
        frame.style[edge] = mix(geometry.from[edge], geometry.to[edge]) + 'px';
      }
      photo.style.objectPosition = mix(geometry.positionX, approach.x) + '% ' +
        mix(geometry.positionY, approach.y) + '%';
      photo.style.transformOrigin = approach.x + '% ' + approach.y + '%';
      photo.style.transform = camera(approach, approachStart * progress);
      photo.style.filter = 'saturate(' + mix(1, .92) + ')';
      shade.style.opacity = String(progress);
      frame.style.borderRadius = mix(2, 0) + 'px';
      return true;
    }

    photo.addEventListener('load', schedule);
    return { measure: measureBridge, draw: drawBridge };
  }

  function camera(layer,t) {
    const room = ease(clamp(t));
    const screenFactor = mobile.matches ? .68 : 1;
    const maxZoom = (layer.max - 1) * screenFactor;
    // Start the hall view looking along the passage, then turn towards the sofa.
    const turn = layer.turnsRight ? 1 - ease(clamp(t / .68)) : 0;
    const initialZoom = layer.turnsRight ? .17 * screenFactor : 0;
    const move = initialZoom + (maxZoom - initialZoom) * room;
    const scale = 1 + move;
    const x = (50 - layer.x) * move * .27 + (mobile.matches ? 5 : 7) * turn;
    const y = (50-layer.y)*move*.30;
    return 'translate('+x.toFixed(3)+'%,'+y.toFixed(3)+'%) scale('+scale.toFixed(4)+')';
  }

  function animate() {
    frame=0;
    if (!offsets.length) return;
    const scroll = window.scrollY;
    const joinedApproach = bridge?.draw(scroll);
    let index = 0;
    while (index + 1 < offsets.length && scroll >= offsets[index + 1]) index++;
    const arriving = layers[index+1];
    const right = arriving ? offsets[index+1] : tail;
    const progress = clamp((scroll-offsets[index])/Math.max(1,right-offsets[index]));
    // Reach the door before dissolving into the view from just inside it.
    const blendStart = arriving?.turnsRight ? .8 : .59;
    const blend = arriving && !motion.matches
      ? ease(clamp((progress - blendStart) / (1 - blendStart))) : 0;
    layers.forEach((layer,i) => {
      const current = i===index, next = i===index+1;
      layer.image.style.opacity = current ? '1' : next ? String(blend) : '0';
      if (current || next) {
        let cameraProgress = current ? progress : layer.turnsRight ? 0 : blend * .12;
        if (i === 0 && joinedApproach) {
          cameraProgress = approachStart + (1 - approachStart) * progress;
        }
        layer.image.style.transform = motion.matches ? 'none' : camera(layer, cameraProgress);
      }
    });
    const visible = blend >= .65 ? index+1 : index;
    if(shown!==visible){
      shown=visible;
      state.textContent=chapters[visible].dataset.location;
      links.forEach((link,i)=>{
        if(i===visible)link.setAttribute('aria-current','location');
        else link.removeAttribute('aria-current');
      });
    }
    tour.style.setProperty('--tour-progress',clamp((scroll-offsets[0])/Math.max(1,tail-offsets[0])));
  }

  function schedule() {
    if(!frame)frame=window.requestAnimationFrame(animate);
  }

  function measure() {
    const margin=header.offsetHeight;
    offsets=chapters.map(chapter=>chapter.getBoundingClientRect().top+window.scrollY-margin);
    tail=offsets[offsets.length-1]+chapters.at(-1).offsetHeight*.63;
    bridge?.measure();
    schedule();
  }
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',measure);
  window.addEventListener('load',measure);
  document.fonts?.ready.then(measure);
  motion.addEventListener('change',schedule);
  measure();
})();
