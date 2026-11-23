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
    max:Number(chapter.dataset.max)
  }));
  if (layers.length !== 6 || layers.some(layer => !layer.image)) return;
  document.querySelector('.facade-reveal').src = layers[0].image.src;
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

  function camera(layer,t) {
    const room = ease(clamp(t));
    const move = (layer.max-1)*(mobile.matches ? .68 : 1)*room;
    const scale = 1 + move;
    const x = (50-layer.x)*move*.27;
    const y = (50-layer.y)*move*.30;
    return 'translate('+x.toFixed(3)+'%,'+y.toFixed(3)+'%) scale('+scale.toFixed(4)+')';
  }

  function animate() {
    frame=0;
    if (!offsets.length) return;
    const scroll = window.scrollY;
    let index = 0;
    while (index + 1 < offsets.length && scroll >= offsets[index + 1]) index++;
    const arriving = layers[index+1];
    const right = arriving ? offsets[index+1] : tail;
    const progress = clamp((scroll-offsets[index])/Math.max(1,right-offsets[index]));
    const blend = arriving && !motion.matches ? ease(clamp((progress-.59)/.41)):0;
    layers.forEach((layer,i) => {
      const current = i===index, next = i===index+1;
      layer.image.style.opacity = current ? '1' : next ? String(blend) : '0';
      if(current || next)layer.image.style.transform = motion.matches ? 'none' : camera(layer,current?progress:blend*.12);
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
    schedule();
  }
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',measure);
  window.addEventListener('load',measure);
  document.fonts?.ready.then(measure);
  motion.addEventListener('change',schedule);
  measure();
})();
