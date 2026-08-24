(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Progressive reveal
  const revealItems = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    revealItems.forEach((el, index) => {
      el.style.transitionDelay = `${Math.min(index % 3, 2) * 55}ms`;
      io.observe(el);
    });
  } else {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  }

  // Header hides gently on downward scroll and returns on upward scroll.
  const header = document.querySelector('[data-header]');
  let lastY = window.scrollY;
  let ticking = false;
  const updateHeader = () => {
    const y = window.scrollY;
    const movingDown = y > lastY + 10;
    const movingUp = y < lastY - 8;
    if (movingDown && y > 160) header?.classList.add('is-hidden');
    if (movingUp || y < 80) header?.classList.remove('is-hidden');
    lastY = y;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  // Subtle hero parallax: intentionally restrained.
  const orbit = document.querySelector('[data-orbit-scene]');
  const hero = document.querySelector('.hero');
  if (orbit && hero && !reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      orbit.style.translate = `${x * 10}px ${y * 8}px`;
    });
    hero.addEventListener('pointerleave', () => {
      orbit.style.translate = '0 0';
    });
  }

  // Generate the 64-QAM grid in JS to keep the markup lean.
  const qam64 = document.querySelector('.qam64');
  if (qam64) {
    const frag = document.createDocumentFragment();
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const dot = document.createElement('i');
        dot.style.position = 'absolute';
        dot.style.width = '5px';
        dot.style.height = '5px';
        dot.style.borderRadius = '50%';
        dot.style.background = '#977bff';
        dot.style.left = `${(col + 0.5) * 12.5}%`;
        dot.style.top = `${(row + 0.5) * 12.5}%`;
        dot.style.transform = 'translate(-50%, -50%)';
        dot.style.boxShadow = '0 0 7px rgba(151,123,255,.45)';
        frag.appendChild(dot);
      }
    }
    qam64.style.backgroundImage = 'none';
    qam64.appendChild(frag);
  }

  // Tilt large visual panels very slightly on desktop.
  const stages = [...document.querySelectorAll('.project-stage')];
  if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    stages.forEach((stage) => {
      stage.addEventListener('pointermove', (event) => {
        const rect = stage.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        stage.style.transform = `perspective(1200px) rotateX(${(-y * 1.25).toFixed(2)}deg) rotateY(${(x * 1.5).toFixed(2)}deg)`;
      });
      stage.addEventListener('pointerleave', () => {
        stage.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
      });
      stage.style.transition = 'transform .7s cubic-bezier(.22,1,.36,1)';
    });
  }

  // Internal anchor links remain accessible even with the floating header.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', id);
    });
  });
})();
