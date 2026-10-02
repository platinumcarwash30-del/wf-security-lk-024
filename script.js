(() => {
  // Refresh the inner-page visual layer without changing homepage content.
  document.querySelectorAll('link[rel="stylesheet"][href*="styles-extra.css"]').forEach((link) => {
    const base = link.href.split('?')[0];
    if (!link.href.includes('v=bg3')) link.href = `${base}?v=bg3`;
  });

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#form-status');
  if (form && status) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      status.textContent = 'Formular je spreman. Povezivanje sa LK-024 aplikacijom biće uključeno u sinhronizovanoj fazi.';
    });
  }
})();
