window.RyokoApp = (() => {
  const defaultLang = 'ko';
  let lang = localStorage.getItem('ryoko_lang_v2') || defaultLang;

  const pathRoot = (() => {
    const depth = location.pathname.split('/').filter(Boolean).length;
    return depth > 1 ? '../' : depth === 1 ? (location.pathname.endsWith('/') ? '../' : '') : './';
  })();


  const cityLoopMap = {
    tokyo: { name:'Tokyo', country:'Japan', guide:'city/tokyo.html', example:'example/tokyo-3n4d-first-trip.html', image:'assets/images/cities/tokyo.png', vibe:'fast city' },
    osaka: { name:'Osaka', country:'Japan', guide:'city/osaka.html', example:'example/osaka-2n3d-family.html', image:'assets/images/cities/osaka.png', vibe:'food energy' },
    kyoto: { name:'Kyoto', country:'Japan', guide:'city/kyoto.html', example:'example/kyoto-2n3d-slow-trip.html', image:'assets/images/cities/kyoto.png', vibe:'slow reset' },
    fukuoka: { name:'Fukuoka', country:'Japan', guide:'city/fukuoka.html', example:'example/fukuoka-2n3d-food-trip.html', image:'assets/images/cities/fukuoka.png', vibe:'compact local' },
    seoul: { name:'Seoul', country:'Korea', guide:'city/seoul.html', example:'example/seoul-2n3d-city-vibes.html', image:'assets/images/cities/seoul.png', vibe:'city social' },
    busan: { name:'Busan', country:'Korea', guide:'city/busan.html', example:'example/busan-2n3d-with-parents.html', image:'assets/images/cities/busan.png', vibe:'coast mode' },
    jeju: { name:'Jeju', country:'Korea', guide:'city/jeju.html', example:'city/jeju.html', image:'assets/images/cities/jeju.png', vibe:'scenic ease' },
    gyeongju: { name:'Gyeongju', country:'Korea', guide:'city/gyeongju.html', example:'city/gyeongju.html', image:'assets/images/cities/gyeongju.png', vibe:'history slow' }
  };
  const loopPairs = {
    tokyo:['kyoto','fukuoka','seoul'], osaka:['kyoto','fukuoka','tokyo'], kyoto:['osaka','tokyo','gyeongju'], fukuoka:['osaka','busan','tokyo'],
    seoul:['busan','jeju','tokyo'], busan:['jeju','seoul','fukuoka'], jeju:['busan','seoul','gyeongju'], gyeongju:['busan','kyoto','seoul']
  };
  function slugifyCity(value=''){
    return String(value || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
  function resolvePath(rel=''){
    if (!rel) return '#';
    return `${pathRoot}${rel}`.replace('././','./').replace('.././','../');
  }
  function getCityLoopData(city=''){
    return cityLoopMap[slugifyCity(city)] || null;
  }
  function getRelatedCities(city=''){
    return (loopPairs[slugifyCity(city)] || []).map(key => cityLoopMap[key]).filter(Boolean);
  }

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


  function setPillValue(group, value){
    if (!group || !value) return;
    const buttons = [...document.querySelectorAll(`[data-pill-group="${group}"]`)];
    if (!buttons.length) return;
    let matched = false;
    buttons.forEach(btn => {
      const active = btn.dataset.pillValue === value;
      btn.classList.toggle('active', active);
      if (active) matched = true;
    });
    if (!matched) buttons[0]?.classList.add('active');
  }
  function getPillValue(group){
    return document.querySelector(`[data-pill-group="${group}"].active`)?.dataset.pillValue || '';
  }

  function applyPlannerPreset(preset={}){
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
    if (preset.tripMood) setPillValue('tripMood', preset.tripMood);
    if (preset.dayDensity) setPillValue('dayDensity', preset.dayDensity);
    if (preset.budgetMode) setPillValue('budgetMode', preset.budgetMode);
    [destination, duration, companion, style, notes].forEach(el => {
      if (!el) return;
      el.dispatchEvent(new Event('change', { bubbles:true }));
      el.classList.add('is-focused');
      setTimeout(() => el.classList.remove('is-focused'), 900);
    });
  }

  function syncPlannerRecipe(){
    if (document.body.dataset.page !== 'planner') return;
    const destination = document.getElementById('destination')?.value?.trim() || 'Pick a city';
    const duration = document.getElementById('duration')?.value || 'duration';
    const companion = document.getElementById('companion')?.value || 'who';
    const style = document.getElementById('style')?.value || 'travel style';
    const notes = document.getElementById('notes')?.value?.trim() || '';
    const localMode = document.getElementById('localToggle')?.classList.contains('on');
    const tripMood = getPillValue('tripMood') || 'balanced';
    const dayDensity = getPillValue('dayDensity') || 'balanced';
    const budgetMode = getPillValue('budgetMode') || 'balanced';
    const title = document.getElementById('tripRecipeTitle');
    const desc = document.getElementById('tripRecipeDesc');
    const fill = document.getElementById('tripRecipeFill');
    const hints = document.getElementById('plannerHintLines');
    const complete = [document.getElementById('destination')?.value?.trim(), document.getElementById('duration')?.value, document.getElementById('companion')?.value, document.getElementById('style')?.value].filter(Boolean).length;
    if (title) title.textContent = `${destination} · ${duration} · ${companion}`;
    if (desc) desc.textContent = `${style}${localMode ? ' · local mode on' : ''} · ${tripMood} mood · ${dayDensity} density · ${budgetMode} spend${notes ? ' · ' + notes : ''}`;
    if (fill) fill.style.width = `${25 + complete * 18.75}%`;
    if (hints) {
      const lines = [
        `<div class="planner-hint-line"><strong>Best when</strong><span>${companion ? `you are planning for ${companion} and want the route to feel intentional.` : 'you want a quick first version without overthinking the inputs.'}</span></div>`,
        `<div class="planner-hint-line"><strong>What changes</strong><span>${style ? `${style} will shape the pacing, neighborhood mix, and stop density.` : 'style, companion, and notes combine to shape the pacing and place mix.'} ${tripMood ? `The ${tripMood} mood changes how polished or playful the route feels.` : ''} ${budgetMode ? `${budgetMode} spending adjusts where nicer moments are placed.` : ''}</span></div>`
      ];
      hints.innerHTML = lines.join('');
    }
  }

  function initPlannerOnboarding(){
    if (document.body.dataset.page !== 'planner') return;
    document.querySelectorAll('[data-plan-preset]').forEach(btn => btn.addEventListener('click', () => {
      let preset = {};
      try { preset = JSON.parse(btn.dataset.planPreset || '{}'); } catch {}
      applyPlannerPreset(preset);
      document.querySelector('.planner-shell')?.scrollIntoView({ behavior:'smooth', block:'start' });
      document.getElementById('destination')?.focus({ preventScroll:true });
      syncPlannerRecipe();
    }));
    ['destination','duration','companion','style','notes'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', syncPlannerRecipe);
      el.addEventListener('change', syncPlannerRecipe);
    });
    document.getElementById('localToggle')?.addEventListener('click', () => setTimeout(syncPlannerRecipe, 0));
    document.querySelectorAll('[data-pill-group]').forEach(btn => btn.addEventListener('click', () => {
      const group = btn.dataset.pillGroup;
      setPillValue(group, btn.dataset.pillValue || '');
      syncPlannerRecipe();
    }));
    syncPlannerRecipe();
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
      applyPlannerPreset(preset);
      document.querySelector('.planner-shell')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (destination) destination.focus({ preventScroll: true });
      syncPlannerRecipe();
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
    initPlannerOnboarding();
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
  return { t, setLanguage, applyTranslations, bindLanguageButtons, initCommon, initMagazine, cityCardTemplate, getCityLoopData, getRelatedCities, slugifyCity, resolvePath, applyPlannerPreset, get lang(){return lang;}, pathRoot, navHref };
})();
window.addEventListener('DOMContentLoaded', () => { window.RyokoApp.initCommon(); window.RyokoApp.initMagazine(); });
