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

  function initCommon(){
    applyTranslations();
    bindLanguageButtons();
    document.querySelectorAll('[data-nav="magazine"]').forEach(a => a.setAttribute('href', navHref('magazine')));
    document.querySelectorAll('[data-nav="planner"]').forEach(a => a.setAttribute('href', navHref('planner')));
    document.querySelectorAll('[data-nav="trips"]').forEach(a => a.setAttribute('href', navHref('trips')));
    renderMobileDock();
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
