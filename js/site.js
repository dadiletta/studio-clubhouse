// Five small jobs the pages share. The site still works without this file:
// the menu opens, the forms check themselves, the year says what the HTML says,
// the carousels scroll, and the nav over the hero stays on top of it.

// 1. THE PHONE MENU is a <details>, which opens with no script. This adds
//    closing it when you tap away or press Escape.
document.addEventListener('click', (event) => {
  document.querySelectorAll('details.dropdown[open]').forEach((menu) => {
    if (!menu.contains(event.target)) menu.removeAttribute('open');
  });
});
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  document.querySelectorAll('details.dropdown[open]').forEach((menu) => {
    menu.removeAttribute('open');
    menu.querySelector('summary').focus();
  });
});

// 2. THE FOOTER YEAR keeps itself current.
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// 3. DEMO FORMS show their thank-you message ([data-sent]) instead of sending.
//    To make one real, give the <form> an action and delete data-demo.
document.querySelectorAll('form[data-demo]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.reset();
    const sent = form.querySelector('[data-sent]');
    if (sent) {
      sent.hidden = false;
      sent.focus(); // role="status" plus focus: a screen reader hears it too
    }
  });
});

// 4. CAROUSELS ([data-carousel]) swipe and scroll with no script; their buttons
//    stay hidden until this file shows them. It adds arrows that move the
//    carousel and not the page, one dot per slide, and, given data-autoplay (in
//    milliseconds), turning that stops for a hover, a focus or the pause button.
document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('.carousel');
  const slides = [...track.children];
  const controls = carousel.querySelector('[data-carousel-controls]');
  const dots = carousel.querySelector('[data-dots]');
  const pause = carousel.querySelector('[data-pause]');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!controls || slides.length < 2) return;
  controls.hidden = false;

  const at = () => {
    const left = track.scrollLeft;
    return slides.reduce((best, s, i) => (Math.abs(s.offsetLeft - left) < Math.abs(slides[best].offsetLeft - left) ? i : best), 0);
  };
  // The last slide that can sit at the left edge: a row of cards ends before its last card does.
  const last = () => slides.findIndex((s) => s.offsetLeft >= track.scrollWidth - track.clientWidth - 1);
  const go = (i) => {
    const end = last() === -1 ? slides.length - 1 : last();
    const n = i > end ? 0 : i < 0 ? end : i;
    track.scrollTo({ left: slides[n].offsetLeft, behavior: still ? 'auto' : 'smooth' });
  };
  carousel.querySelector('[data-prev]')?.addEventListener('click', () => go(at() - 1));
  carousel.querySelector('[data-next]')?.addEventListener('click', () => go(at() + 1));

  // One dot per place the row can stop: three cards in view means two fewer.
  let buttons = [];
  const paint = () => buttons.forEach((b, i) => b.setAttribute('aria-current', String(i === at())));
  const build = () => {
    const stops = (last() === -1 ? slides.length - 1 : last()) + 1;
    if (stops === buttons.length) return paint();
    dots?.replaceChildren();
    buttons = slides.slice(0, stops).map((slide, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'carousel-dot';
      b.setAttribute('aria-label', `Slide ${i + 1} of ${stops}`);
      b.addEventListener('click', () => go(i));
      dots?.append(b);
      return b;
    });
    paint();
  };
  track.addEventListener('scroll', () => requestAnimationFrame(paint), { passive: true });
  addEventListener('resize', build);
  build();

  const every = Number(carousel.dataset.autoplay);
  if (!every || still) {
    if (pause) pause.hidden = true;
    return;
  }
  let stopped = false;
  let held = false;
  setInterval(() => stopped || held || document.hidden || go(at() + 1), every);
  carousel.addEventListener('pointerenter', () => (held = true));
  carousel.addEventListener('pointerleave', () => (held = false));
  carousel.addEventListener('focusin', () => (held = true));
  carousel.addEventListener('focusout', () => (held = false));
  pause?.addEventListener('click', () => {
    stopped = !stopped;
    pause.setAttribute('aria-pressed', String(stopped));
    pause.setAttribute('aria-label', stopped ? 'Play the slides' : 'Pause the slides');
  });
});

// 5. THE NAV OVER THE HERO ([data-nav-over]) is see-through on the photo and
//    turns solid once the photo has scrolled up under it. With no script it sits
//    on the hero and scrolls away with it.
document.querySelectorAll('[data-nav-over]').forEach((nav) => {
  const hero = document.querySelector('[data-nav-under]');
  nav.classList.add('is-fixed');
  const paint = () => nav.classList.toggle('is-solid', scrollY > (hero?.offsetHeight ?? 0) - nav.offsetHeight);
  addEventListener('scroll', paint, { passive: true });
  paint();
});
