(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      mobileMenu.hidden = open;
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded','false'); mobileMenu.hidden = true;
    }));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); reveal.unobserve(entry.target); }
  }), {threshold: 0.12});
  document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

  const title = 'Stacja Kontroli Pojazdów IDZIAK – Częstochowa';
  const url = 'https://idziak.com.pl/';
  const text = 'IDZIAK SKP, ul. Festynowa 26A, 42-280 Częstochowa. Tel. 509 736 253.';
  const modal = document.getElementById('share-modal');
  const openFallback = () => {
    const encodedUrl = encodeURIComponent(url), encodedText = encodeURIComponent(text + ' ' + url);
    modal?.classList.add('open'); modal?.setAttribute('aria-hidden','false'); document.body.classList.add('no-scroll');
    const wa = document.querySelector('[data-share-wa]'); if (wa) wa.href = `https://wa.me/?text=${encodedText}`;
    const sms = document.querySelector('[data-share-sms]'); if (sms) sms.href = `sms:?&body=${encodedText}`;
    const mail = document.querySelector('[data-share-mail]'); if (mail) mail.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodedText}`;
    const fb = document.querySelector('[data-share-facebook]'); if (fb) fb.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  };
  const share = async () => {
    if (navigator.share) {
      try { await navigator.share({title,text,url}); return; } catch (e) { if (e.name === 'AbortError') return; }
    }
    openFallback();
  };
  document.querySelectorAll('[data-share]').forEach(btn => btn.addEventListener('click', share));
  const closeShare = () => { modal?.classList.remove('open'); modal?.setAttribute('aria-hidden','true'); document.body.classList.remove('no-scroll'); };
  document.querySelectorAll('[data-close-share]').forEach(el => el.addEventListener('click', closeShare));
  document.querySelector('[data-copy-link]')?.addEventListener('click', async () => {
    const label = document.querySelector('[data-copy-label]');
    try { await navigator.clipboard.writeText(url); if (label) label.textContent = 'Link skopiowany'; }
    catch { if (label) label.textContent = url; }
  });

  const lightbox = document.getElementById('lightbox');
  const lightImg = lightbox?.querySelector('img');
  document.querySelectorAll('[data-gallery]').forEach(btn => btn.addEventListener('click', () => {
    if (!lightbox || !lightImg) return;
    lightImg.src = btn.dataset.gallery; lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden','false'); document.body.classList.add('no-scroll');
  }));
  const closeLightbox = () => { lightbox?.classList.remove('open'); lightbox?.setAttribute('aria-hidden','true'); document.body.classList.remove('no-scroll'); if(lightImg) lightImg.src=''; };
  lightbox?.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeLightbox(); closeShare(); } });
})();