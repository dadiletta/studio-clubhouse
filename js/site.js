// Three small jobs every page shares. The site still works without this file:
// the menu opens, the forms check themselves, the year says what the HTML says.

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
