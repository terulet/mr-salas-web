(() => {
  const story = document.querySelector('[data-story]');
  const stage = story.querySelector('.build-stage');
  const header = document.getElementById('nav');
  const canvas = stage.querySelector('.model');
  const facade = stage.querySelector('.facade-reveal');
  const model = window.createCimentaScene?.(canvas);
  if (!model) return;

  const chapters = [...story.querySelectorAll('[data-build-stage]')];
  const navigation = [...stage.querySelectorAll('.stage-nav a')];
  const label = stage.querySelector('[data-phase-label]');
  const detail = stage.querySelector('[data-phase-detail]');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 760px)');
  const phases = [0, .32, .63, 1].map((progress, index) => ({
    progress,
    label: chapters[index].dataset.label,
    detail: chapters[index].dataset.detail
  }));
  const cutoffs = [.095,.39,.743];
  const stops = [0,0,0,0];
  let animationId = 0;
  let currentIndex = -1;
  let lastDisplay = null;

  function clamp(value) {
    return Math.max(0, Math.min(1, value));
  }

  function valueAt(scrollY) {
    for (let i = 1; i < stops.length; i++) {
      if (scrollY > stops[i]) continue;
      const fraction = clamp((scrollY - stops[i-1]) / (stops[i] - stops[i-1]));
      const start = phases[i-1].progress;
      return start + fraction * (phases[i].progress - start);
    }
    return 1;
  }

  function frame() {
    animationId = 0;
    const progress = valueAt(window.scrollY);
    const index = cutoffs.filter(cutoff => progress >= cutoff).length;
    const display = motion.matches ? phases[index].progress : progress;
    const photo = facade && facade.complete && facade.naturalWidth ? clamp((display-.896)/.097) : 0;
    if (photo < 1 && display !== lastDisplay) model.draw(display);
    lastDisplay = display;
    if(facade){
      facade.style.opacity=String(photo*photo*(3-2*photo));
    }
    navigation.forEach((link,i) => {
      const end = phases[i+1]?.progress ?? 1;
      const start = phases[i].progress;
      const fill = i === phases.length - 1
        ? clamp((progress - .74) / .26)
        : clamp((progress - start) / (end - start));
      link.style.setProperty('--fill', i === index ? Math.max(.13,fill) : fill);
    });
    if (currentIndex === index) return;
    currentIndex = index;
    label.textContent = phases[index].label;
    detail.textContent = phases[index].detail;
    navigation.forEach((link,i) => {
      if (index === i) link.setAttribute('aria-current','step');
      else link.removeAttribute('aria-current');
    });
  }

  function requestFrame() {
    if (!animationId) animationId = window.requestAnimationFrame(frame);
  }

  function layout() {
    const stageHeight = stage.offsetHeight;
    story.style.setProperty('--stage-offset', stageHeight + 'px');
    const offset = header.offsetHeight + (mobile.matches ? stageHeight : 0);
    chapters.forEach((chapter, index) => {
      const top = chapter.getBoundingClientRect().top + window.scrollY;
      const previous = index ? stops[index - 1] + 1 : 0;
      stops[index] = Math.max(previous, top - offset);
    });
    model.resize();
    lastDisplay = null;
    requestFrame();
  }

  window.addEventListener('scroll',requestFrame,{passive:true});
  window.addEventListener('resize',layout);
  window.addEventListener('load',layout);
  document.fonts?.ready.then(layout);
  motion.addEventListener('change',requestFrame);
  facade?.addEventListener('load',requestFrame);
  layout();
})();
