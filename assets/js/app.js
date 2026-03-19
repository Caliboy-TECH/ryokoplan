window.RyokoApp = (() => {
  const defaultLang = 'ko';
  let lang = localStorage.getItem('ryoko_lang_v2') || defaultLang;

  const pathRoot = (() => {
    const depth = location.pathname.split('/').filter(Boolean).length;
    return depth > 1 ? '../' : depth === 1 ? (location.pathname.endsWith('/') ? '../' : '') : './';
  })();

  function t(path){
    const dict = window.RYOKO_TRANSLATIONS?.[lang] || window.RYOKO_TRANSLATIONS?.ko || {};
    return path.split('.').reduce((acc, key) => acc?.[key], dict) ?? '';
  }
  function setLanguage(next){
    lang = next;
    localStorage.setItem('ryoko_lang_v2', lang);
    applyTranslations();
    document.querySelectorAll('[data-lang-btn]').forEach(btn => btn.classList.toggle('active', btn.dataset.langBtn === lang));
    renderMobileDock();
    window.dispatchEvent(new CustomEvent('ryoko:langchange', { detail: { lang } }));
  }
  function applyTranslations(root=document){
    root.querySelectorAll('[data-t]').forEach(el => {
      const value = t(el.dataset.t);
      if (value) el.textContent = value;
    });
    root.querySelectorAll('[data-t-placeholder]').forEach(el => {
      const value = t(el.dataset.tPlaceholder);
      if (value) el.setAttribute('placeholder', value);
    });
  }
  function bindLanguageButtons(root=document){
    root.querySelectorAll('[data-lang-btn]').forEach(btn => {
      btn.addEventListener('click', () => setLanguage(btn.dataset.langBtn));
      btn.classList.toggle('active', btn.dataset.langBtn === lang);
    });
  }
  function navHref(target){
    if (target === 'magazine') return `${pathRoot}magazine/`;
    if (target === 'planner') return `${pathRoot}index.html`.replace('./index.html','./').replace('../index.html','../');
    if (target === 'trips') return `${pathRoot}my-trips/`;
    return '#';
  }
  function renderMobileDock(){
    let dock = document.querySelector('.mobile-dock');
    if (!dock) {
      dock = document.createElement('nav');
      dock.className = 'mobile-dock';
      document.body.appendChild(dock);
    }
    const page = document.body.dataset.page || 'planner';
    dock.innerHTML = `
      <a class="mobile-dock-item ${page === 'planner' ? 'active' : ''}" href="${navHref('planner')}">
        <span class="mobile-dock-icon">●</span>
        <span class="mobile-dock-label">${t('nav.planner') || 'Planner'}</span>
      </a>
      <a class="mobile-dock-item ${page === 'magazine' ? 'active' : ''}" href="${navHref('magazine')}">
        <span class="mobile-dock-icon">◆</span>
        <span class="mobile-dock-label">${t('nav.magazine') || 'Magazine'}</span>
      </a>
      <a class="mobile-dock-item ${page === 'trips' ? 'active' : ''}" href="${navHref('trips')}">
        <span class="mobile-dock-icon">■</span>
        <span class="mobile-dock-label">${t('nav.trips') || 'My Trips'}</span>
      </a>`;
  }

  function initMagazine(){
    if (document.body.dataset.page !== 'magazine') return;
    const cards = [...document.querySelectorAll('.finder-card')];
    if (!cards.length) return;
    const searchInput = document.getElementById('magazineCitySearch');
    const countryTabs = [...document.querySelectorAll('[data-country-filter]')];
    const vibeTabs = [...document.querySelectorAll('[data-vibe-filter]')];
    const empty = document.getElementById('finderEmptyState');
    let country = 'all';
    let vibe = 'all';
    let query = '';

    function apply(){
      let visible = 0;
      cards.forEach(card => {
        const matchesCountry = country === 'all' || card.dataset.country === country;
        const vibeList = String(card.dataset.vibe || '').split(/\s+/).filter(Boolean);
        const matchesVibe = vibe === 'all' || vibeList.includes(vibe);
        const haystack = `${card.dataset.search || ''} ${card.textContent || ''}`.toLowerCase();
        const matchesQuery = !query || haystack.includes(query);
        const show = matchesCountry && matchesVibe && matchesQuery;
        card.classList.toggle('is-hidden', !show);
        if (show) visible += 1;
      });
      if (empty) empty.hidden = visible !== 0;
    }

    countryTabs.forEach(btn => btn.addEventListener('click', () => {
      country = btn.dataset.countryFilter;
      countryTabs.forEach(tab => tab.classList.toggle('active', tab === btn));
      apply();
    }));
    vibeTabs.forEach(btn => btn.addEventListener('click', () => {
      vibe = btn.dataset.vibeFilter;
      vibeTabs.forEach(tab => tab.classList.toggle('active', tab === btn));
      apply();
    }));
    searchInput?.addEventListener('input', e => {
      query = String(e.target.value || '').trim().toLowerCase();
      apply();
    });
    apply();
  }


  function initHomePresets(){
    const presetButtons = [...document.querySelectorAll('[data-home-preset]')];
    if (!presetButtons.length) return;
    presetButtons.forEach(btn => btn.addEventListener('click', () => {
      let preset = {};
      try { preset = JSON.parse(btn.dataset.homePreset || '{}'); } catch {}
      const destination = document.getElementById('destination');
      const duration = document.getElementById('duration');
      const companion = document.getElementById('companion');
      const style = document.getElementById('style');
      const notes = document.getElementById('notes');
      if (destination && preset.destination) destination.value = preset.destination;
      if (duration && preset.duration) duration.value = preset.duration;
      if (companion && preset.companion) companion.value = preset.companion;
      if (style && preset.style) style.value = preset.style;
      if (notes && preset.notes) notes.value = preset.notes;
      document.querySelector('.planner-shell')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      [destination, duration, companion, style, notes].forEach(el => {
        if (!el) return;
        el.classList.add('is-focused');
        setTimeout(() => el.classList.remove('is-focused'), 900);
      });
      if (destination) destination.focus({ preventScroll: true });
    }));
  }



  function initEditorialChrome(){
    const page = document.body.dataset.page || 'planner';
    const labels = {
      planner: { kicker: 'Planner flow', title: 'Start from a city mood, then turn it into a usable trip.', chips: ['Japan / Korea focus', 'Magazine-led planning', 'Save / Share / PDF'] },
      magazine: { kicker: 'Magazine flow', title: 'Read the city first so the plan feels more intentional.', chips: ['City guides', 'Sample routes', 'Local rhythm'] },
      trips: { kicker: 'My Trips flow', title: 'Return to saved, recent, and shared trips without losing context.', chips: ['Saved trips', 'Recent plans', 'Shared links'] }
    };
    const data = labels[page] || labels.planner;
    const header = document.querySelector('.top-bar');
    if (header && !document.querySelector('.page-signal')) {
      const wrap = document.createElement('div');
      wrap.className = 'page-signal';
      wrap.innerHTML = `
        <div class="page-signal-card">
          <div class="page-signal-copy">
            <strong>${data.kicker}</strong>
            <span>${data.title}</span>
          </div>
          <div class="page-signal-chips">${data.chips.map(chip => `<span class="page-signal-chip">${chip}</span>`).join('')}</div>
        </div>`;
      header.insertAdjacentElement('afterend', wrap);
    }

    if (!document.querySelector('.reading-progress')) {
      const progress = document.createElement('div');
      progress.className = 'reading-progress';
      document.body.appendChild(progress);
      const sync = () => {
        const max = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
        const pct = Math.min(Math.max(scrollY / max, 0), 1);
        progress.style.transform = `scaleX(${pct})`;
        document.body.classList.toggle('is-scrolled', scrollY > 12);
      };
      sync();
      window.addEventListener('scroll', sync, { passive: true });
      window.addEventListener('resize', sync);
    }

    document.querySelectorAll('.top-actions .nav-chip,[data-nav],.mobile-dock-item').forEach(link => {
      const href = link.getAttribute('href') || '';
      const current = (page === 'planner' && (href === './' || href === '../' || /index\.html$/.test(href)))
        || (page === 'magazine' && /magazine\/?$/.test(href))
        || (page === 'trips' && /my-trips\/?$/.test(href));
      if (current) link.classList.add('is-current');
    });

    const targets = [...document.querySelectorAll('.hero-card, .info-card, .editorial-panel, .route-strip-card, .finder-card, .district-card, .example-card, .trip-card, .meta-card, .section-head')];
    targets.forEach((el, index) => {
      if (el.hasAttribute('data-reveal')) return;
      el.setAttribute('data-reveal', '');
      el.style.transitionDelay = `${Math.min(index * 22, 180)}ms`;
    });
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
      targets.forEach(el => io.observe(el));
    } else {
      targets.forEach(el => el.classList.add('is-visible'));
    }
  }

  function initCommon(){
    applyTranslations();
    bindLanguageButtons();
    document.querySelectorAll('[data-nav="magazine"]').forEach(a => a.setAttribute('href', navHref('magazine')));
    document.querySelectorAll('[data-nav="planner"]').forEach(a => a.setAttribute('href', navHref('planner')));
    document.querySelectorAll('[data-nav="trips"]').forEach(a => a.setAttribute('href', navHref('trips')));
    renderMobileDock();
    initHomePresets();
    initEditorialChrome();
  }
  function cityCardTemplate(city){
    return `
      <article class="city-card">
        <div class="card-image"><img src="${city.image}" alt="${city.name}"></div>
        <div class="card-body">
          <div class="meta">${city.country}</div>
          <h3 class="card-title">${city.name}</h3>
          <p class="card-copy">${city.desc}</p>
          <div class="card-actions">
            <a class="soft-btn" href="${city.guideUrl}">${t('common.guide')}</a>
            <button class="ghost-btn" data-pick-city="${city.key}">${t('common.plan')}</button>
          </div>
        </div>
      </article>`;
  }
  return { t, setLanguage, applyTranslations, bindLanguageButtons, initCommon, initMagazine, cityCardTemplate, get lang(){return lang;}, pathRoot, navHref };
})();
window.addEventListener('DOMContentLoaded', () => { window.RyokoApp.initCommon(); window.RyokoApp.initMagazine(); });
