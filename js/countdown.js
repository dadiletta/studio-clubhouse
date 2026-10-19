// THE COUNTDOWN to the next game ([data-countdown]). It reads the moment from
// data-countdown, written the way a <time datetime> is: "2026-10-04T19:00",
// in the team's own time zone. A date it cannot read (the starter's "20XX"),
// or one already past, leaves the countdown hidden, so the card still shows
// the date in words. Each number goes in the element marked with its unit:
// data-unit="days", "hours", "minutes" or "seconds". Leave out "days" and the
// hours count past 24.
//
// The numbers are aria-hidden: the date in words already says when, and a
// screen reader announcing every second would drown the page. A reader who
// asks for less motion gets no seconds, so nothing changes faster than once a
// minute.
//
// Everything is inside these braces because js/site.js already uses the name
// `calm`, and two files may not both declare it.
{
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const UNITS = [
    ['days', 86400],
    ['hours', 3600],
    ['minutes', 60],
    ['seconds', 1],
  ];

  document.querySelectorAll('[data-countdown]').forEach((box) => {
    const at = new Date(box.dataset.countdown).getTime();
    if (Number.isNaN(at)) return;
    if (calm) box.querySelector('[data-unit="seconds"]')?.closest('[data-unit-box]')?.remove();
    const shown = UNITS.map(([unit, size]) => [box.querySelector(`[data-unit="${unit}"]`), size]).filter(([el]) => el);

    let timer = 0;
    const paint = () => {
      let left = Math.floor((at - Date.now()) / 1000);
      if (left <= 0) {
        box.hidden = true;
        clearInterval(timer);
        return;
      }
      shown.forEach(([el, size]) => {
        el.textContent = String(Math.floor(left / size)).padStart(2, '0');
        left %= size;
      });
      box.hidden = false;
    };
    paint();
    if (!box.hidden) timer = setInterval(paint, calm ? 60000 : 1000);
  });
}
