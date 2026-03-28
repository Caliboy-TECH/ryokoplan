window.RyokoPlanner = (() => {
  const samplePlans = {
    tokyo: {
      destination: 'Tokyo',
      duration: '3 Nights 4 Days',
      companion: 'Couple',
      style: 'Hidden spots',
      localMode: true,
      title: 'Tokyo · 3N4D · Couple · Local Mode',
      summary: 'A Tokyo plan that mixes iconic districts with slower neighborhood pockets, so the trip feels full without becoming exhausting.',
      vibe: 'Layered, stylish, urban',
      pace: 'Balanced with built-in breaks',
      bestFor: 'First-timers who still want local texture',
      tripMood: 'Magazine-led city glow',
      dayDensity: 'Balanced days',
      budgetMode: 'Balanced spend',
      budgetSummary: 'A mid-range Tokyo trip with one nicer dinner, café stops, and efficient train rides across the city.',
      budgetBreakdown: { flight: '$320–520', hotel: '$480–760', food: '$160–260', transit: '$40–70', admission: '$35–70' },
      checklist: ['Reserve one popular dinner in advance', 'Load Suica or another transit card', 'Bring comfortable shoes for station walking', 'Keep one flexible rain-friendly indoor stop'],
      localTips: ['Aim for an early start in Shibuya before the crowd density rises.', 'Many smaller cafés open later than convenience stores, so keep a backup breakfast option.', 'Station transfers look short on maps but can take longer inside large hubs like Shinjuku or Tokyo Station.'],
      days: [
        { day: 1, title: 'A soft landing through Shibuya and Harajuku', intro: 'Start with high-energy Tokyo, but keep the first day gentle after arrival.', places: [
          { name: 'Shibuya Crossing', reason: 'It gives you the instant Tokyo feeling without needing much planning.' },
          { name: 'Miyashita Park or nearby rooftop stop', reason: 'Good for a reset, city views, and an easy first break.' },
          { name: 'Cat Street', reason: 'A smoother walk that connects busy areas with more stylish local shops.' },
          { name: 'Harajuku café stop', reason: 'Adds a slower pause before the evening gets busy again.' }
        ], localTip: 'If you arrive tired, skip long lines on day 1 and keep dinner close to your hotel area.' },
        { day: 2, title: 'Classic Tokyo with room to breathe', intro: 'This is the most iconic day, but it still avoids stacking too many heavy stops.', places: [
          { name: 'Senso-ji / Asakusa', reason: 'A strong morning anchor with culture, food, and an easy walking loop.' },
          { name: 'Sumida riverside view', reason: 'Gives you open space after the denser temple streets.' },
          { name: 'Ueno Park', reason: 'A natural shift into a greener, slower part of the day.' },
          { name: 'Ameyoko or a casual side street dinner', reason: 'Lets the day end with food and energy without needing a formal reservation.' }
        ], localTip: 'Go earlier in Asakusa for cleaner photos and a less crowded first hour.' },
        { day: 3, title: 'Neighborhood Tokyo with better texture', intro: 'A slower day built around places that feel more lived-in than checklist-driven.', places: [
          { name: 'Kiyosumi area coffee stop', reason: 'Sets a calm tone and feels noticeably different from central Tokyo.' },
          { name: 'Nakameguro or Daikanyama', reason: 'Easy for design shops, strolling, and a polished local atmosphere.' },
          { name: 'Shimokitazawa', reason: 'Adds vintage energy and a younger neighborhood rhythm.' },
          { name: 'Small alley dinner zone', reason: 'Creates a more memorable ending than a generic mall restaurant.' }
        ], localTip: 'Do not over-stack neighborhoods far apart on this day; the charm comes from moving slower.' },
        { day: 4, title: 'A clean final morning before departure', intro: 'Keep the last stretch light so checkout and airport movement stay easy.', places: [
          { name: 'Neighborhood brunch', reason: 'A low-stress finish that still feels intentional.' },
          { name: 'Last gift stop', reason: 'Useful for snacks, stationery, or one polished souvenir run.' },
          { name: 'Airport transfer buffer', reason: 'Tokyo transit is efficient, but large stations still reward extra time.' }
        ], localTip: 'Buy station snacks or gifts before entering the most crowded transfer windows.' }
      ]
    },
    seoul: {
      destination: 'Seoul',
      duration: '2 Nights 3 Days',
      companion: 'Friends',
      style: 'Photo / vibes',
      localMode: false,
      title: 'Seoul · 2N3D · Friends · City Vibes',
      summary: 'A compact Seoul flow with strong neighborhood contrast, late-day energy, and enough breathing room to keep it enjoyable.',
      vibe: 'Trendy, walkable, contrast-heavy',
      pace: 'Compact but not rushed',
      bestFor: 'Friends who want cafés, streets, and night views',
      tripMood: 'Vivid city social',
      dayDensity: 'Balanced days',
      budgetMode: 'Balanced spend',
      budgetSummary: 'Works well as a city-focused short trip with moderate food spending and easy subway movement.',
      budgetBreakdown: { flight: '$0–180', hotel: '$220–420', food: '$120–200', transit: '$20–40', admission: '$20–50' },
      checklist: ['Check café opening hours by neighborhood', 'Use a T-money card for easy subway transfers', 'Keep one pair of shoes for longer walking blocks', 'Book a popular dinner or bar if it matters to you'],
      localTips: ['Some Seoul neighborhoods look close on the map but feel different in pace and timing.', 'For cleaner photo streets, late morning is often easier than peak afternoon.', 'Night views are better when paired with an earlier dinner reservation nearby.'],
      days: [
        { day: 1, title: 'Seongsu to riverside evening', intro: 'A stylish start with a neighborhood that feels current without being too complicated.', places: [
          { name: 'Seongsu bakery or coffee stop', reason: 'Easy entry into the area and a strong mood-setter.' },
          { name: 'Design and concept shops', reason: 'Gives the day texture without needing a rigid route.' },
          { name: 'Riverside sunset stop', reason: 'Adds openness after tighter neighborhood streets.' }
        ], localTip: 'Popular Seongsu spots can build lines quickly on weekends, so earlier is better.' },
        { day: 2, title: 'Classic Seoul contrast day', intro: 'Mix historic texture with a grittier night district so the city feels layered, not one-note.', places: [
          { name: 'Bukchon or nearby traditional streets', reason: 'Gives the trip a recognizable Seoul identity.' },
          { name: 'Insadong / lunch lane', reason: 'A simple bridge between daytime sightseeing and later city energy.' },
          { name: 'Euljiro evening streets', reason: 'This shifts the mood into a more local night rhythm.' },
          { name: 'Late bar or snack stop', reason: 'A good social ending without crossing the city again.' }
        ], localTip: 'Stack the historic part earlier and keep Euljiro for later, when the area feels more alive.' },
        { day: 3, title: 'One last easy neighborhood loop', intro: 'Use the final hours for a slow finish instead of forcing one more heavy landmark.', places: [
          { name: 'Brunch stop', reason: 'A softer closing rhythm before departure.' },
          { name: 'Gift or lifestyle shop pass', reason: 'Good for practical souvenirs without turning the day into pure shopping.' },
          { name: 'Station or airport transfer', reason: 'Seoul is efficient, but extra buffer keeps the exit cleaner.' }
        ], localTip: 'On departure day, prioritize one neighborhood only instead of crossing Seoul for a single stop.' }
      ]
    }
  };

  function qs(id){ return document.getElementById(id); }
  function options(arr){ return arr.map(item => `<option value="${item}">${item}</option>`).join(''); }
  function getDayLabel(day){ const lang = window.RyokoApp?.lang || 'ko'; if (lang === 'ko') return `${day}일차`; if (lang === 'ja') return `${day}日目`; if (lang === 'zhHant') return `第 ${day} 天`; return `Day ${day}`; }
  function textValue(v, fallback=''){
    if (v == null) return fallback;
    if (typeof v === 'string') return v;
    if (Array.isArray(v)) return v.filter(Boolean).join(' · ') || fallback;
    if (typeof v === 'object') return Object.values(v).flat().filter(Boolean).join(' · ') || fallback;
    return String(v || fallback);
  }
  function escapeHtml(value=''){
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  function budgetLabel(key){
    const raw = String(key || '').trim();
    const lang = window.RyokoApp?.lang || 'ko';
    const maps = {
      ko: { flight:'항공', hotel:'숙소', food:'식비', transit:'교통', admission:'입장료', activities:'체험', transport:'이동' },
      en: { flight:'Flight', hotel:'Hotel', food:'Food', transit:'Transit', admission:'Admission', activities:'Activities', transport:'Transport' },
      ja: { flight:'航空', hotel:'宿泊', food:'食事', transit:'交通', admission:'入場', activities:'体験', transport:'移動' },
      zhHant: { flight:'機票', hotel:'住宿', food:'餐飲', transit:'交通', admission:'門票', activities:'體驗', transport:'移動' }
    };
    const map = maps[lang] || maps.en;
    const normalized = raw.toLowerCase();
    return map[normalized] || raw.charAt(0).toUpperCase() + raw.slice(1);
  }
  function prefersReducedMotion(){
    return typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  function ensureToastStack(){
    let stack = qs('toastStack');
    if (!stack) {
      stack = document.createElement('div');
      stack.id = 'toastStack';
      stack.className = 'toast-stack';
      stack.setAttribute('role', 'status');
      stack.setAttribute('aria-live', 'polite');
      stack.setAttribute('aria-atomic', 'true');
      document.body.appendChild(stack);
    }
    return stack;
  }
  function showToast(message='', tone='info'){
    if (!message) return;
    const stack = ensureToastStack();
    const chip = document.createElement('div');
    chip.className = `toast-chip toast-${tone}`;
    chip.textContent = String(message);
    stack.appendChild(chip);
    requestAnimationFrame(() => chip.classList.add('is-visible'));
    const remove = () => {
      chip.classList.remove('is-visible');
      setTimeout(() => chip.remove(), prefersReducedMotion() ? 20 : 220);
    };
    setTimeout(remove, tone === 'warn' ? 2600 : 2200);
  }
  function setButtonBusy(button, label=''){
    if (!button) return;
    if (!button.dataset.defaultLabel) button.dataset.defaultLabel = button.innerHTML;
    button.disabled = true;
    button.classList.add('is-busy');
    button.setAttribute('aria-busy', 'true');
    if (label) button.textContent = label;
  }
  function resetButtonBusy(button){
    if (!button) return;
    button.disabled = false;
    button.classList.remove('is-busy');
    button.removeAttribute('aria-busy');
    if (button.dataset.defaultLabel) button.innerHTML = button.dataset.defaultLabel;
  }
  function revealResult(){
    const result = qs('resultTop');
    if (!result) return;
    result.setAttribute('tabindex', '-1');
    result.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block:'start' });
    setTimeout(() => { try { result.focus({ preventScroll:true }); } catch {} }, prefersReducedMotion() ? 0 : 80);
  }

  function storageKey(destination='trip'){
    return `ryoko:savedPlaces:${String(destination).toLowerCase()}`;
  }
  function getSavedPlaces(destination='trip'){
    try { return JSON.parse(localStorage.getItem(storageKey(destination)) || '[]'); } catch { return []; }
  }
  function setSavedPlaces(destination='trip', places=[]){
    localStorage.setItem(storageKey(destination), JSON.stringify(places));
  }
  function toggleSavedPlace(destination, placeName){
    const saved = new Set(getSavedPlaces(destination));
    if (saved.has(placeName)) saved.delete(placeName); else saved.add(placeName);
    const result = [...saved];
    setSavedPlaces(destination, result);
    return result;
  }
  function smoothJump(targetId){
    document.getElementById(targetId)?.scrollIntoView({ behavior:'smooth', block:'start' });
  }
  function bindJumpChips(){
    document.querySelectorAll('[data-jump-target]').forEach(btn => btn.addEventListener('click', () => smoothJump(btn.dataset.jumpTarget)));
    document.querySelectorAll('[data-sticky-jump]').forEach(btn => btn.addEventListener('click', () => smoothJump(btn.dataset.stickyJump)));
  }
  function bindStickyBar(){
    const bar = qs('resultStickyBar');
    const anchor = qs('resultDaysSection');
    if (!bar || !anchor) return;
    const onScroll = () => {
      const rect = anchor.getBoundingClientRect();
      bar.classList.toggle('is-visible', rect.top < window.innerHeight * 0.55);
      updateActiveJumpChip();
      updateActiveDayRail();
    };
    window.addEventListener('scroll', onScroll, { passive:true });
    onScroll();
  }
  function updateStickyCopy(data){
    if (qs('stickyTripTitle')) qs('stickyTripTitle').textContent = data.title || `${data.destination || 'City'} editorial route`;
    if (qs('stickyTripMeta')) qs('stickyTripMeta').textContent = [textValue(data.vibe,''), textValue(data.pace,'')].filter(Boolean).join(' · ') || uiCopy('개요 · 저장 · 공유 · PDF','Overview · save · share · PDF');
  }
  function updateActiveJumpChip(){
    const sections = ['resultTop','resultDayRailSection','resultDaysSection','localTipsSection','budgetSection','checklistSection'];
    let active = 'resultTop';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= 120) active = id;
    });
    document.querySelectorAll('[data-jump-target]').forEach(btn => btn.classList.toggle('is-active', btn.dataset.jumpTarget === active));
  }
  function bindDayInteractions(){
    document.querySelectorAll('.day-card-header').forEach(header => header.addEventListener('click', () => {
      const card = header.closest('.day-card');
      if (!card) return;
      const toggle = card.querySelector('.day-toggle');
      const isOpen = card.classList.toggle('is-open');
      if (toggle) toggle.textContent = isOpen ? '−' : '+';
    }));
    document.querySelectorAll('.place-save').forEach(btn => btn.addEventListener('click', e => {
      e.stopPropagation();
      const destination = btn.dataset.destination || 'trip';
      const place = btn.dataset.place || '';
      const saved = toggleSavedPlace(destination, place);
      const isSaved = saved.includes(place);
      btn.classList.toggle('is-saved', isSaved);
      btn.setAttribute('aria-pressed', String(isSaved));
      btn.textContent = isSaved ? '♥' : '♡';
      btn.setAttribute('aria-label', isSaved ? uiCopy('저장됨', 'Saved') : uiCopy('장소 저장', 'Save place'));
    }));
  }
  function absoluteUrl(input=''){
    const siteOrigin = 'https://ryokoplan.com';
    const value = String(input || '').trim();
    if (!value) return siteOrigin;
    if (/^https?:\/\//i.test(value)) return value;
    const normalized = value.replace(/^\.\//,'').replace(/^\.\.\//,'').replace(/^\/+/, '');
    return `${siteOrigin}/${normalized}`;
  }
  function setStructuredData(id, payload){
    if (!id) return;
    let node = document.head.querySelector(`script[type="application/ld+json"]#${id}`);
    if (!payload) {
      if (node) node.remove();
      return;
    }
    if (!node) {
      node = document.createElement('script');
      node.type = 'application/ld+json';
      node.id = id;
      document.head.appendChild(node);
    }
    node.textContent = JSON.stringify(payload);
  }
  function updateShareStructuredData(data, canonicalHref, cleanUrl){
    const destination = textValue(data?.destination, '').trim();
    const routeTitle = data?.title || destination || 'Ryokoplan route';
    const description = normalizeSummary(data) || 'Read the city. Then build the trip.';
    const dayItems = (data?.days || []).map((day, dayIndex) => ({
      '@type':'ListItem',
      position:dayIndex + 1,
      name:textValue(day.title, `Day ${dayIndex + 1}`),
      itemListElement:(normalizePlaces(day) || []).map((place, placeIndex) => ({
        '@type':'ListItem',
        position:placeIndex + 1,
        name:textValue(place.name, `Stop ${placeIndex + 1}`),
        description:textValue(place.reason, '')
      }))
    }));
    const graph = {
      '@context':'https://schema.org',
      '@graph':[
        {
          '@type':'Organization',
          '@id':'https://ryokoplan.com#organization',
          name:'Ryokoplan',
          url:'https://ryokoplan.com',
          logo:absoluteUrl('assets/images/brand/apple-touch-icon.png')
        },
        {
          '@type':'WebSite',
          '@id':'https://ryokoplan.com#website',
          url:'https://ryokoplan.com',
          name:'Ryokoplan',
          publisher:{'@id':'https://ryokoplan.com#organization'}
        },
        {
          '@type':'BreadcrumbList',
          '@id':`${canonicalHref}#breadcrumb`,
          itemListElement:[
            { '@type':'ListItem', position:1, name:'Ryokoplan', item:'https://ryokoplan.com' },
            { '@type':'ListItem', position:2, name: destination || 'Route', item: canonicalHref }
          ]
        },
        {
          '@type':'TouristDestination',
          '@id':`${canonicalHref}#destination`,
          name: destination || 'East Asia city route',
          url: canonicalHref,
          description,
          image:absoluteUrl(cityImageFor(destination || ''))
        },
        {
          '@type':'ItemList',
          '@id':`${canonicalHref}#route-days`,
          name:`${routeTitle} day flow`,
          itemListOrder:'https://schema.org/ItemListOrdered',
          numberOfItems:dayItems.length,
          itemListElement:dayItems
        },
        {
          '@type':'WebPage',
          '@id':`${cleanUrl}#webpage`,
          url: cleanUrl,
          name:`${routeTitle} — Ryokoplan`,
          description,
          isPartOf:{'@id':'https://ryokoplan.com#website'},
          breadcrumb:{'@id':`${canonicalHref}#breadcrumb`},
          about:{'@id':`${canonicalHref}#destination`},
          mainEntity:{'@id':`${canonicalHref}#route-days`},
          primaryImageOfPage:{'@type':'ImageObject', url:absoluteUrl('assets/images/brand/og-cover.png')}
        }
      ]
    };
    setStructuredData('ryoko-structured-data', graph);
  }

  function updateShareMeta(data){
    const destination = textValue(data?.destination, '').trim();
    const routeTitle = data?.title || destination || 'Ryokoplan';
    const title = destination ? `${destination} route — Ryokoplan` : `${routeTitle} — Ryokoplan`;
    const shareMetaMap = {
      Tokyo:'A Tokyo route shaped around cleaner axes, softer resets, and a city-first reading order.',
      Osaka:'An Osaka route shaped around compact meal rhythm, easier arcades, and one calmer pocket.',
      Kyoto:'A Kyoto route built around quiet windows, slower pockets, and a cleaner editorial pace.',
      Fukuoka:'A Fukuoka route shaped by compact food rhythm and short, readable movement.',
      Sapporo:'A Sapporo route tuned around winter blocks, warm meals, and one shorter snow-lit close.',
      Sendai:'A Sendai route built around green avenues, market pockets, and a calmer meal rhythm.',
      Okinawa:'An Okinawa route shaped by one coast line, slower reset windows, and lighter island pacing.',
      Seoul:'A Seoul route balancing stronger neighborhood contrast with a smoother city rhythm.',
      Busan:'A Busan route built around coast timing, view pockets, and easier movement.',
      Jeju:'A Jeju route tuned around drive reality, scenery windows, and softer rest-led movement.',
      Gyeongju:'A Gyeongju route built around dusk heritage mood, hanok lanes, and lighter walking rhythm.',
      Taipei:'A Taipei route tuned around night-food rhythm, layered alleys, and softer pacing.',
      'Hong Kong':'A Hong Kong route tuned for harbor density, vertical contrast, and a cleaner night close.',
      Macau:'A Macau route shaped around compact heritage lanes, quieter squares, and one short night close.'
    };
    const desc = destination
      ? (shareMetaMap[destination] || `${destination} in a city-first flow. Read the neighborhoods, compare the route, and shape the trip.`)
      : (normalizeSummary(data) || 'Read the city. Then build the trip.');
    document.title = title;
    const pageUrl = new URL(location.href);
    pageUrl.hash = '';
    const cleanUrl = pageUrl.toString();
    const isParameterized = [...pageUrl.searchParams.keys()].length > 0;
    const canonicalHref = isParameterized ? `${pageUrl.origin}${pageUrl.pathname}` : cleanUrl;
    const robotsValue = isParameterized ? 'noindex,follow' : 'index,follow';
    const coverImage = 'https://ryokoplan.com/assets/images/brand/og-cover.png';
    const entries = {
      'meta[name="description"]': desc,
      'meta[name="robots"]': robotsValue,
      'meta[property="og:title"]': title,
      'meta[property="og:description"]': desc,
      'meta[property="og:url"]': cleanUrl,
      'meta[property="og:image"]': coverImage,
      'meta[property="og:image:type"]': 'image/png',
      'meta[name="twitter:title"]': title,
      'meta[name="twitter:description"]': desc,
      'meta[name="twitter:image"]': coverImage,
      'meta[property="og:image:alt"]': destination ? `${destination} city-first route cover` : 'Ryokoplan city-first route cover',
      'meta[name="twitter:image:alt"]': destination ? `${destination} city-first route cover` : 'Ryokoplan city-first route cover'
    };
    Object.entries(entries).forEach(([selector, value]) => {
      let node = document.querySelector(selector);
      if (!node && value) {
        const match = selector.match(/^meta\[(name|property)="(.+)"\]$/);
        if (match) {
          node = document.createElement('meta');
          node.setAttribute(match[1], match[2]);
          document.head.appendChild(node);
        }
      }
      if (node && value) node.setAttribute('content', value);
    });
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalHref);
    updateShareStructuredData(data, canonicalHref, cleanUrl);
  }
  function refreshOptions(){
    const currentDuration = qs('duration')?.selectedIndex || 0;
    const currentCompanion = qs('companion')?.selectedIndex || 0;
    const currentStyle = qs('style')?.selectedIndex || 0;
    const selectedNeeds = [...document.querySelectorAll('#needsGrid input:checked')].map(i => Number(i.dataset.needIndex));
    qs('duration').innerHTML = options(window.RyokoApp.t('options.durations'));
    qs('companion').innerHTML = options(window.RyokoApp.t('options.companions'));
    qs('style').innerHTML = options(window.RyokoApp.t('options.styles'));
    qs('duration').selectedIndex = Math.min(currentDuration, qs('duration').options.length - 1);
    qs('companion').selectedIndex = Math.min(currentCompanion, qs('companion').options.length - 1);
    qs('style').selectedIndex = Math.min(currentStyle, qs('style').options.length - 1);
    const needs = window.RyokoApp.t('options.needs') || [];
    const box = qs('needsGrid');
    box.innerHTML = needs.map((label, idx) => `<label class="option-chip${selectedNeeds.includes(idx) ? ' is-selected' : ''}"><input type="checkbox" value="${label}" data-need-index="${idx}" ${selectedNeeds.includes(idx) ? 'checked' : ''}><span>${label}</span></label>`).join('');
    box.querySelectorAll('.option-chip').forEach(chip => chip.addEventListener('click', e => {
      if (e.target.tagName === 'INPUT') return;
      const input = chip.querySelector('input');
      input.checked = !input.checked;
      chip.classList.toggle('is-selected', input.checked);
    }));
    syncPlannerRecipe();
  }
  function bindSelectionChips(){
    document.querySelectorAll('[data-quick-city]').forEach(btn => btn.addEventListener('click', () => {
      qs('destination').value = btn.dataset.quickCity;
      document.querySelector('.planner-shell')?.scrollIntoView({behavior:'smooth', block:'start'});
    }));
  }
  function getSelectedPill(group, fallback=''){
    return document.querySelector(`[data-pill-group="${group}"].active`)?.dataset.pillValue || fallback;
  }
  function prettyPillValue(group, value=''){
    const key = String(value || '').toLowerCase();
    const lang = window.RyokoApp?.lang || 'ko';
    const maps = {
      tripMood: lang === 'ko' ? { balanced:'균형형', editorial:'매거진형', soft:'소프트', vivid:'비비드' } : lang === 'ja' ? { balanced:'バランス', editorial:'エディトリアル', soft:'ソフト', vivid:'ビビッド' } : lang === 'zhHant' ? { balanced:'平衡', editorial:'編輯感', soft:'柔和', vivid:'鮮明' } : { balanced:'Balanced mood', editorial:'Editorial mood', soft:'Soft mood', vivid:'Vivid mood' },
      dayDensity: lang === 'ko' ? { light:'가볍게', balanced:'균형형', full:'꽉 차게' } : lang === 'ja' ? { light:'軽め', balanced:'バランス', full:'しっかり' } : lang === 'zhHant' ? { light:'輕量', balanced:'平衡', full:'飽滿' } : { light:'Light days', balanced:'Balanced days', full:'Full days' },
      budgetMode: lang === 'ko' ? { smart:'스마트', balanced:'밸런스', treat:'한 끼는 확실하게' } : lang === 'ja' ? { smart:'スマート', balanced:'バランス', treat:'少し贅沢' } : lang === 'zhHant' ? { smart:'聰明花', balanced:'平衡', treat:'值得犒賞' } : { smart:'Smart spend', balanced:'Balanced spend', treat:'Treat-worthy' }
    };
    return maps[group]?.[key] || value;
  }
  function readForm(){
    return {
      destination: qs('destination').value.trim(),
      duration: qs('duration').value,
      companion: qs('companion').value || '',
      style: qs('style').value || '',
      travelerTraits: [...document.querySelectorAll('#needsGrid input:checked')].map(i => i.value),
      localMode: qs('localToggle').classList.contains('on'),
      tripMood: getSelectedPill('tripMood', 'balanced'),
      dayDensity: getSelectedPill('dayDensity', 'balanced'),
      budgetMode: getSelectedPill('budgetMode', 'balanced'),
      notes: qs('notes').value.trim(),
      language: window.RyokoApp.lang,
      lang: window.RyokoApp.lang
    };
  }
  function normalizeSummary(data){
    const raw = data.summary ?? data.focusSummary ?? '';
    return textValue(raw, '');
  }
  function normalizePlaces(day){
    const source = day.places || day.stops || day.activities || [];
    const list = Array.isArray(source) ? source : [];
    return list.map((item, idx) => {
      if (typeof item === 'string') {
        return { name: item, reason: window.RyokoApp.t('planner.stopReasonFallback') || '' };
      }
      return {
        name: textValue(item.name || item.place || item.title || item.description, `Stop ${idx + 1}`),
        reason: textValue(item.reason || item.note || item.why || item.description, window.RyokoApp.t('planner.stopReasonFallback') || '')
      };
    }).filter(item => item.name).slice(0, 5);
  }
  function renderMeta(data){
    const meta = [
      { label: window.RyokoApp.t('planner.metaVibe') || 'Vibe', value: textValue(data.vibe, 'Balanced city mood') },
      { label: window.RyokoApp.t('planner.metaPace') || 'Pace', value: textValue(data.pace, 'Comfortable and readable') },
      { label: window.RyokoApp.t('planner.metaBestFor') || 'Best for', value: textValue(data.bestFor, 'Travelers who want a smoother trip flow') }
    ];
    qs('resultMeta').innerHTML = meta.map(item => `
      <div class="meta-card">
        <span class="meta-label">${item.label}</span>
        <span class="meta-value">${item.value}</span>
      </div>`).join('');
  }
  function cityImageFor(destination=''){
    const slug = String(destination || '').trim().toLowerCase();
    const map = {
      tokyo:'assets/images/cities/tokyo.jpg', osaka:'assets/images/cities/osaka.jpg', kyoto:'assets/images/cities/kyoto.jpg',
      fukuoka:'assets/images/cities/fukuoka.jpg', sapporo:'assets/images/cities/sapporo.jpg', sendai:'assets/images/cities/sendai.jpg', okinawa:'assets/images/cities/okinawa.jpg',
      seoul:'assets/images/cities/seoul.jpg', busan:'assets/images/cities/busan.jpg', jeju:'assets/images/cities/jeju.jpg', gyeongju:'assets/images/cities/gyeongju.jpg',
      taipei:'assets/images/cities/taipei.jpg', hongkong:'assets/images/cities/hongkong.jpg', macau:'assets/images/cities/macau.jpg'
    };
    return map[slug] || 'assets/images/hero/planner-preview.jpg';
  }
  function exampleImageFor(destination=''){
    const slug = String(destination || '').trim().toLowerCase();
    const map = {
      tokyo:'assets/images/examples/tokyo-first-trip.jpg', osaka:'assets/images/examples/osaka-family.jpg', kyoto:'assets/images/examples/kyoto-slow.jpg',
      fukuoka:'assets/images/examples/fukuoka-food.jpg', sapporo:'assets/images/examples/sapporo-snow-soft.jpg', sendai:'assets/images/examples/sendai-city-rest.jpg', okinawa:'assets/images/examples/okinawa-island-breeze.jpg',
      seoul:'assets/images/examples/seoul-city-vibes.jpg', busan:'assets/images/examples/busan-parents.jpg', jeju:'assets/images/cities/jeju.jpg', gyeongju:'assets/images/cities/gyeongju.jpg',
      taipei:'assets/images/examples/taipei-night-food.jpg', hongkong:'assets/images/examples/hongkong-harbor-rhythm.jpg', macau:'assets/images/examples/macau-heritage-night.jpg'
    };
    return map[slug] || cityImageFor(destination);
  }
  function uiCopy(ko, en, ja = en, zhHant = en){
    const lang = window.RyokoApp?.lang || 'ko';
    if (lang === 'ko') return ko;
    if (lang === 'ja') return ja;
    if (lang === 'zhHant') return zhHant;
    return en;
  }

  function priorityCityLoopNote(baseCity='', signals={}, context='result'){
    const slug = String(baseCity || '').trim().toLowerCase();
    const notes = {
      tokyo: {
        result: uiCopy('도쿄는 큰 장면을 더 늘리기보다, 축 하나를 더 깊게 읽을 때 결과가 훨씬 세련돼집니다.', 'Tokyo lands better when one axis owns the trip—Shibuya-Harajuku for lift, Asakusa-Ueno for first-trip clarity, or Kiyosumi-Ginza for polish—instead of forcing one more headline stop.', '東京は大きなスポットを足すより、ひとつの軸を深く読むほうが結果がずっと洗練されます。', '東京比起再加一個大景點，更適合把其中一條軸線讀深，整體會乾淨很多。'),
        share: uiCopy('공유받은 도쿄 루트라면, 바로 다른 랜드마크를 더하기보다 한 축을 더 깊게 읽는 편이 좋습니다.', 'For a shared Tokyo route, sharpen one district line first, then choose whether the next move is charge, classic clarity, or a calmer design pocket.', '共有された東京ルートなら、別の名所を足す前にひとつの軸を深く読むほうが合います。', '如果這是一條分享來的東京路線，先把其中一條軸線讀深，比再疊一個地標更適合。'),
        guide: uiCopy('시부야-하라주쿠의 밀도, 아사쿠사-우에노의 고전축, 기요스미-긴자의 정돈된 결 중 하나를 더 깊게 읽어 보세요.', 'Choose one Tokyo line—Shibuya-Harajuku for charge, Asakusa-Ueno for first scenes, or Kiyosumi-Ginza for polish—and let that axis carry the next read.', '渋谷・原宿、浅草・上野、清澄・銀座のどれか一軸を選んで、もう少し深く読んでみてください。', '從 Shibuya-Harajuku、Asakusa-Ueno、Kiyosumi-Ginza 之中挑一條軸線，再往內讀深一點。')
      },
      kyoto: {
        result: uiCopy('교토는 더 넣기보다 덜 건드리는 쪽이 좋습니다. 다음 읽기는 속도보다 여백을 지키는 방향이 잘 맞습니다.', 'Kyoto improves when the next move protects stillness—one temple district, one river edge, one evening lane—instead of asking the city to perform again.', '京都は足すより、触りすぎないほうが合います。次の読み先も速度より余白を守る方向が向いています。', '京都通常不是靠加更多，而是靠保留留白。下一步也更適合守住安靜節奏。'),
        share: uiCopy('공유받은 교토 루트라면, 비슷한 사찰 하나를 더하기보다 오후 여백 하나를 지키는 편이 더 좋습니다.', 'For a shared Kyoto route, guard one open afternoon and one softer dusk before adding another temple pin. That is where Kyoto starts to feel quietly luxurious.', '共有された京都ルートなら、寺をひとつ増やすより、午後の余白をひとつ守るほうがきれいです。', '如果是分享來的京都路線，比起再加一座寺，更適合先保住一段午後留白。'),
        guide: uiCopy('교토는 히가시야마의 상징성, 가모가와의 여백, 서촌 쪽의 조용한 마감 중 어느 결을 남길지 먼저 정하세요.', 'Decide whether Kyoto should lean on Higashiyama symbolism, Kamo River breathing room, or a quieter western close, then let the rest stay secondary.', '京都では、東山の象徴性、鴨川の余白、西側の静かな締めのどれを残すかを先に決めると整います。', '先決定京都要保留的是東山的象徵性、鴨川的留白，還是西側安靜的收尾，會更順。')
      },
      seoul: {
        result: uiCopy('서울은 같은 날의 동네 대비가 결과를 바꿉니다. 강한 구역 하나와 느슨한 포켓 하나를 같이 보는 쪽이 좋습니다.', 'Seoul reads best when one sharp neighborhood—Seongsu, Euljiro, or Hannam—meets one looser pocket that lets the day breathe before night takes over.', 'ソウルは同じ日の街区コントラストで結果が変わります。強い地区とゆるいポケットをひとつずつ置くのがきれいです。', '首爾的結果很常被同一天裡的街區對比拉開。放一個強區域，再配一個鬆一點的 pocket 會更好。'),
        share: uiCopy('공유받은 서울 루트라면, 카페 동선과 야간 구간을 같이 보고 동네 대비를 더 선명하게 만드는 편이 좋습니다.', 'For a shared Seoul route, sharpen the handoff between daytime café pockets and the late-night district instead of making every neighborhood peak at once.', '共有されたソウルルートなら、カフェの流れと夜の区間を一緒に見て、街区の対比をもう少し立てると合います。', '如果是分享來的首爾路線，建議把咖啡 pocket 和夜間段落一起看，讓街區對比更鮮明。'),
        guide: uiCopy('성수-서울숲, 을지로-종로, 한남-이태원처럼 대비가 분명한 축을 한 번 더 읽어 보세요.', 'Re-read one Seoul contrast line—Seongsu-Seoul Forest, Euljiro-Jongno, or Hannam-Itaewon—and decide which side owns the day and which owns the close.', '聖水・ソウルの森、乙支路・鍾路、漢南・梨泰院のような対比の強い軸をもう一度読むと流れが見えます。', '再讀一次像 Seongsu-Seoul Forest、Euljiro-Jongno、Hannam-Itaewon 這種對比強的軸線，節奏會更清楚。')
      },
      busan: {
        result: uiCopy('부산은 바다를 보는 시간대와 쉬는 창이 같이 잡혀야 좋습니다. 전망 하나와 느린 식사 하나를 같이 보세요.', 'Busan works best when the coast arrives at the right hour and one real rest window keeps the route from turning into slopes and transfers.', '釜山は海を見る時間帯と休む窓が一緒に取れているときがいちばんきれいです。', '釜山最適合把看海的時間帶和真正的休息窗口一起留住。'),
        share: uiCopy('공유받은 부산 루트라면, 바다 장면을 더 늘리기보다 이동 부담 없는 전망 하나를 더 선명하게 남기는 편이 좋습니다.', 'For a shared Busan route, make one easy coast view memorable—Haeundae, Gwanganli, or Yeongdo—before adding another sea scene that steals energy.', '共有された釜山ルートなら、海の場面を増やすより、負担の少ない眺めをひとつ強く残すほうが合います。', '如果是分享來的釜山路線，比起再加更多海景，更適合把一個移動負擔低的 view 留得更清楚。'),
        guide: uiCopy('영도·흰여울·해운대 중 지금 페이스에 맞는 해안 축 하나를 먼저 고르세요.', 'Pick one Busan coast axis—Yeongdo for texture, Huinnyeoul for a softer cliff edge, or Haeundae for cleaner ease—and let that mood set the rest of the pace.', '影島・白瀬・海雲台のうち、今のペースに合う海側の軸をひとつ先に選んでください。', '先從 Yeongdo、Huinnyeoul、Haeundae 裡挑一條符合你現在步調的海岸軸線。')
      },
      fukuoka: {
        result: uiCopy('후쿠오카는 더 많이 보기보다 meal rhythm을 지키는 쪽이 훨씬 좋습니다. 식사와 산책의 간격을 다시 보세요.', 'Fukuoka gets stronger when the meal rhythm stays intact—Tenjin, Hakata, Nakasu, one more coffee, one more bite—instead of turning the weekend into stop-counting.', '福岡は多く見るより、食のリズムを守るほうがずっと良くなります。食事と散歩の間隔を見直してください。', '福岡比起塞更多停點，更適合守住 meal rhythm。先把用餐與散步之間的間隔看順。'),
        share: uiCopy('공유받은 후쿠오카 루트라면, 명소 하나보다 식사 타이밍 하나를 더 정확하게 잡는 편이 낫습니다.', 'For a shared Fukuoka route, refine one meal window and one walking pocket before adding another attraction. This city pays off through timing more than scale.', '共有された福岡ルートなら、名所を増やす前に食事のタイミングをひとつ整えるほうが合います。', '如果是分享來的福岡路線，先把其中一段用餐時段調準，比再加一個景點更適合。'),
        guide: uiCopy('하카타·텐진·오호리 쪽에서 식사 리듬과 짧은 이동이 같이 되는 축을 다시 읽어 보세요.', 'Re-read the Hakata, Tenjin, and Ohori axis where short moves, coffee pockets, and meal timing still sit together. That is where Fukuoka feels exact.', '博多・天神・大濠の軸で、食事リズムと短い移動が一緒に成立する流れを見直してみてください。', '再讀一次 Hakata、Tenjin、Ohori 這條兼顧短移動與用餐節奏的軸線。')
      },
      taipei: {
        result: uiCopy('타이베이는 밤 공기와 먹는 리듬이 같이 움직일 때 좋습니다. 야시장 하나보다 동선 하나를 더 매끈하게 보세요.', 'Taipei lands best when the night air, side-street appetite, and one slower tea or dessert pocket move as one sequence.', '台北は夜の空気と食のリズムが一緒に動くときにいちばん良く見えます。', '台北最適合讓夜晚空氣和吃的節奏一起走，不一定是再多一個夜市。'),
        share: uiCopy('공유받은 타이베이 루트라면, 야시장 개수보다 저녁 전후의 리듬을 더 매끈하게 정리하는 편이 좋습니다.', 'For a shared Taipei route, smooth the handoff from late afternoon into dinner and a second night pocket before adding another market.', '共有された台北ルートなら、夜市を増やすより夕食前後の流れをなめらかに整えるほうが合います。', '如果是分享來的台北路線，比起再加一個夜市，更適合先把晚餐前後的節奏整理順。'),
        guide: uiCopy('융캉제·츠펑·시먼 중 어느 밤 결을 더 읽을지 먼저 정하면 타이베이가 훨씬 또렷해집니다.', 'Taipei gets clearer once you choose whether Yongkang opens softly, Chifeng adds texture, or Ximending carries the brighter late-night handoff.', '永康街・赤峰街・西門のどの夜の質感を主役にするかを先に決めると、台北がずっと明確になります。', '先決定要讓 Yongkang、Chifeng 還是 Ximending 帶出夜晚調性，台北就會清楚很多。')
      },
      hongkong: {
        result: uiCopy('홍콩은 압축된 수직감이 강해서, 한 구간씩 숨을 쉬게 남겨야 결과가 좋아집니다.', 'Hong Kong stays sharp when one compressed vertical stretch—Central slopes, Tsim Sha Tsui waterfront, or Wan Chai neon—meets one deliberate breathing pocket.', '香港は圧縮された縦の密度が強いので、一区間ずつ呼吸できる余白を残すと結果が良くなります。', '香港的垂直壓縮感很強，所以每一段之間都要留一個能喘口氣的 pocket。'),
        share: uiCopy('공유받은 홍콩 루트라면, 한 장면을 더 세게 만들기보다 경사와 야경 사이에 숨 쉴 구간을 남겨 두세요.', 'For a shared Hong Kong route, keep one breathing pocket between the slope, harbor, and night view so the city stays cinematic instead of exhausting.', '共有された香港ルートなら、景色を強くするより、坂・夜景・港のあいだに呼吸できる区間を残すほうが合います。', '如果是分享來的香港路線，比起再加強一個場景，更適合在坡地、夜景與港灣之間留一段喘息。'),
        guide: uiCopy('센트럴·셩완, 침사추이, 완차이·코즈웨이베이 중 어느 수직 리듬을 먼저 읽을지 고르세요.', 'Choose whether Central-Sheung Wan should lead with vertical pressure, Tsim Sha Tsui with harbor clarity, or Wan Chai-Causeway Bay with late neon, then let the others stay in support.', 'セントラル・上環、尖沙咀、湾仔・銅鑼湾のどの縦のリズムを先に読むかを決めると整います。', '先決定 Central-Sheung Wan、Tsim Sha Tsui、Wan Chai-Causeway Bay 哪一條要帶出這座城市的垂直節奏。')
      }
    };
    const entry = notes[slug];
    if (!entry) return '';
    if (signals?.tags?.includes('local-mode') && context !== 'share') return entry.guide || entry.result;
    return entry[context] || entry.result || '';
  }
  
  const priorityCityRefineMap = {
    tokyo:{
      ko:{district:'도쿄는 headline district만 따라가면 쉽게 피곤해집니다. Kiyosumi나 Jinbocho 같은 quieter layer를 중간에 끼우면 훨씬 더 오래 갑니다.', rhythm:[['Morning anchor','Asakusa나 Ueno처럼 이해가 쉬운 district로 열어두는 편이 가장 좋습니다.'],['Afternoon reset','Kiyosumi나 river edge 쪽으로 tempo를 낮추면 하루가 훨씬 덜 빽빽해집니다.'],['Night close','Kagurazaka나 조용한 dinner pocket으로 마감하면 도쿄가 훨씬 더 세련되게 남습니다.']], variants:[['Rainy version','실내성이 있는 museum / café pocket을 더 빨리 넣으세요.'],['Slower version','Shibuya나 Shinjuku보다 Kiyosumi·Jinbocho 비중을 늘리면 훨씬 부드러워집니다.'],['Night version','Omoide lane이나 late café처럼 압축된 밤 장면 하나만 두는 편이 좋습니다.']]},
      en:{district:'Tokyo gets tiring when it stays only on headline districts. Add Kiyosumi or Jinbocho and the route immediately gains more control.', rhythm:[['Morning anchor','Open through a clear icon district like Asakusa or Ueno.'],['Afternoon reset','Let Kiyosumi or one river-edge pocket lower the tempo in the middle.'],['Night close','End with Kagurazaka or another quieter dinner pocket so Tokyo lands with more elegance.']], variants:[['Rainy version','Bring museum and café pockets forward much earlier.'],['Slower version','Shift weight from Shibuya/Shinjuku toward Kiyosumi and Jinbocho.'],['Night version','Keep only one compressed after-dark scene, like Omoide lane or a late café.']]}
    },
    seoul:{
      ko:{district:'서울은 contrast가 강한 만큼 quieter district 하나가 꼭 필요합니다. Seochon이나 Jongno backstreet를 끼워 넣어야 도시가 더 오래 남습니다.', rhythm:[['Morning anchor','성수나 북촌처럼 이해가 쉬운 district로 여세요.'],['Afternoon reset','Seochon이나 quieter lane으로 한 번 숨을 고르면 서울의 밀도가 훨씬 정리됩니다.'],['Night close','을지로나 한남처럼 밤의 질감을 하나만 선명하게 두세요.']], variants:[['Rainy version','실내 밀도가 높은 북촌 edge나 을지로 pocket 쪽을 먼저 쓰는 편이 좋습니다.'],['Slower version','망원·서촌 비중을 늘리면 서울이 훨씬 덜 피곤해집니다.'],['Night version','이태원/을지로 late texture를 짧게 하나만 선명하게 남기는 편이 좋습니다.']]},
      en:{district:'Seoul needs one quieter district to stop its contrast from getting too loud. Add Seochon or the Jongno backstreets and the route holds much longer.', rhythm:[['Morning anchor','Open through an easy district like Seongsu or Bukchon edge.'],['Afternoon reset','Let Seochon or another quieter lane absorb the middle of the day.'],['Night close','Keep one strong evening texture—Euljiro, Hannam, or a similar late district—and stop there.']], variants:[['Rainy version','Bring denser indoor pockets like Bukchon edge or Euljiro forward.'],['Slower version','Increase Mangwon and Seochon so Seoul stops feeling too hard-edged.'],['Night version','Use only one late texture, such as Itaewon or Euljiro, and keep it tight.']]}
    },
    kyoto:{
      ko:{district:'교토는 iconic frame 뒤에 quieter pocket을 붙일 때 cliché에서 벗어납니다. Okazaki, Nishijin, Kamo river edge 중 하나가 꼭 필요합니다.', rhythm:[['Morning anchor','Higashiyama처럼 iconic district는 이른 시간에 읽는 편이 훨씬 좋습니다.'],['Afternoon reset','Okazaki나 museum pocket으로 한 번 낮추면 교토가 훨씬 더 부드럽게 이어집니다.'],['Night close','Kamo river edge나 조용한 tea/dinner pocket으로 마감하세요.']], variants:[['Rainy version','museum pocket과 covered lane 비중을 늘리세요.'],['Slower version','Nishijin이나 river walk를 더 길게 두는 편이 좋습니다.'],['Night version','야경을 키우기보다 dusk walk와 조용한 dinner를 남기는 쪽이 맞습니다.']]},
      en:{district:'Kyoto escapes cliché once one quieter pocket follows the iconic frame. Okazaki, Nishijin, or the Kamo river edge usually does the job.', rhythm:[['Morning anchor','Read iconic Kyoto early, while districts like Higashiyama are still clear.'],['Afternoon reset','Use Okazaki or another museum pocket to lower the middle of the day.'],['Night close','Close through the river edge or a quiet tea-and-dinner pocket.']], variants:[['Rainy version','Bring museums and covered lanes forward.'],['Slower version','Let Nishijin or one river walk hold more of the route.'],['Night version','Choose dusk walking and quiet dinner over a heavier night scene.']]}
    },
    taipei:{
      ko:{district:'타이베이는 food-first 뒤에 texture pocket이 붙을 때 훨씬 또렷해집니다. Chifeng, Dihua late, Treasure Hill 중 하나를 남겨두세요.', rhythm:[['Morning anchor','Yongkang이나 Dongmen처럼 meal rhythm이 쉬운 축으로 여세요.'],['Afternoon reset','Chifeng이나 Dihua 쪽에서 texture를 한 겹 넣으면 타이베이가 더 도시답게 남습니다.'],['Night close','night market 하나만 선명하게 두고 끝내는 편이 좋습니다.']], variants:[['Rainy version','bookshop/tea room과 covered lane 비중을 더 빠르게 올리세요.'],['Slower version','Treasure Hill이나 river pocket을 넣으면 appetite 중심에서 벗어납니다.'],['Night version','late dessert나 one market close만 두고 과하게 늘리지 않는 편이 좋습니다.']]},
      en:{district:'Taipei becomes much clearer when one textural pocket sits behind the food line. Keep Chifeng, Dihua late, or Treasure Hill in play.', rhythm:[['Morning anchor','Open through an easy meal rhythm like Yongkang or Dongmen.'],['Afternoon reset','Add one layer of texture through Chifeng or Dihua so Taipei feels like a city, not only a meal list.'],['Night close','Keep one night market vivid and stop there.']], variants:[['Rainy version','Bring bookshops, tea rooms, and covered lanes forward.'],['Slower version','Use Treasure Hill or a river pocket to move beyond pure appetite.'],['Night version','Keep only one late dessert or market close instead of stretching the night too far.']]}
    },
    hongkong:{
      ko:{district:'홍콩은 skyline 뒤에 slope street와 harbor edge를 붙일수록 훨씬 세련되게 남습니다. PMQ/Soho, Sheung Wan, West Kowloon을 적극적으로 쓰세요.', rhythm:[['Morning anchor','Central이나 ferry처럼 vertical/habor anchor로 여세요.'],['Afternoon reset','PMQ/Soho나 Sheung Wan backstreet로 한 번 tempo를 내려야 홍콩이 덜 피곤합니다.'],['Night close','Tsim Sha Tsui나 harbor edge에서 night glow를 하나만 남기세요.']], variants:[['Rainy version','mall보다 slope street와 café pocket을 섞어 밀도를 조절하세요.'],['Slower version','West Kowloon이나 Sheung Wan 쪽 비중을 늘리면 훨씬 더 세련됩니다.'],['Night version','skyline은 하나만 두고, 나머지는 harbor edge와 dessert pocket으로 마감하는 편이 좋습니다.']]},
      en:{district:'Hong Kong reads with much more elegance when slope streets and the harbor edge temper the skyline pressure. Use PMQ/Soho, Sheung Wan, and West Kowloon actively.', rhythm:[['Morning anchor','Open through a vertical or harbor anchor like Central or the ferry.'],['Afternoon reset','Lower the middle through PMQ/Soho or the Sheung Wan backstreets.'],['Night close','Keep one clear harbor-side night scene and stop there.']], variants:[['Rainy version','Balance dense indoor areas with slope streets and café pockets.'],['Slower version','Increase West Kowloon or Sheung Wan for a more elegant pace.'],['Night version','Keep one skyline moment only, then let harbor edge and dessert pockets close the route.']]}
    },
    busan:{
      ko:{district:'부산은 coast line 뒤에 harbor-side everyday texture를 넣을 때 훨씬 입체적으로 변합니다. Yeongdo, Bosu, Nampo 중 하나는 꼭 남겨두세요.', rhythm:[['Morning anchor','Haeundae나 coast line처럼 이해 쉬운 바다 축으로 여세요.'],['Afternoon reset','Yeongdo나 Bosu/Nampo로 넘어가면 postcard 느낌이 한 번 눌립니다.'],['Night close','Gwangalli나 quiet coast walk처럼 밤 장면 하나만 선명하게 남기세요.']], variants:[['Rainy version','indoor café pocket과 old lane 비중을 늘리세요.'],['Slower version','Yeongdo·old lane 비중을 늘리면 부산이 훨씬 덜 전형적으로 남습니다.'],['Night version','광안리나 quiet shore line 하나만 선명하게 두는 편이 좋습니다.']]},
      en:{district:'Busan becomes more dimensional once harbor-side everyday texture sits behind the coast line. Keep Yeongdo, Bosu, or Nampo in the mix.', rhythm:[['Morning anchor','Open through an easy coast anchor like Haeundae.'],['Afternoon reset','Shift into Yeongdo or Bosu/Nampo to soften the postcard feeling.'],['Night close','Keep one clear night shore scene—Gwangalli or a quieter coast walk—and stop there.']], variants:[['Rainy version','Increase indoor café pockets and old-lane texture.'],['Slower version','Lean harder on Yeongdo and the old lanes so Busan stops feeling too typical.'],['Night version','Keep one single night shore frame instead of spreading the evening too wide.']]}
    },
    fukuoka:{
      ko:{district:'후쿠오카는 food-first 뒤에 quiet local pocket을 붙일 때 훨씬 더 distinct하게 남습니다. Hakata Station side, Yakuin, Ohori edge를 적극적으로 쓰세요.', rhythm:[['Morning anchor','Hakata나 first meal pocket으로 간결하게 여세요.'],['Afternoon reset','Yakuin이나 café pocket으로 한 번 조용하게 낮추면 후쿠오카가 훨씬 local하게 보입니다.'],['Night close','yatai나 compact bar close처럼 작은 밤 장면 하나만 남기세요.']], variants:[['Rainy version','station side, indoor café, department pocket 비중을 높이세요.'],['Slower version','Ohori edge와 Yakuin 비중을 늘리면 훨씬 덜 바쁘게 남습니다.'],['Night version','yatai나 compact bar close 하나만 짧게 두는 편이 가장 좋습니다.']]},
      en:{district:'Fukuoka becomes much more distinct when one quiet local pocket follows the food line. Keep Hakata Station side, Yakuin, or Ohori edge in play.', rhythm:[['Morning anchor','Open compactly through Hakata or a first-meal pocket.'],['Afternoon reset','Lower the middle through Yakuin or a café pocket so Fukuoka reads more local.'],['Night close','Keep one small after-dark scene—yatai or a compact bar close—and stop there.']], variants:[['Rainy version','Increase station-side, indoor café, and department-store pockets.'],['Slower version','Give more weight to Ohori edge and Yakuin for a calmer route.'],['Night version','One short yatai or compact bar close is usually enough.']]}
    },
    osaka:{
      ko:{district:'오사카는 headline spot보다 meal spacing과 아케이드 shelter가 route quality를 훨씬 더 크게 바꿉니다. Namba와 Umeda를 둘 다 세게 쓰기보다 one food core와 one slower west pocket을 나누는 편이 좋습니다.', rhythm:[['Morning anchor','Kuromon이나 Namba edge처럼 먹는 리듬이 쉬운 축으로 여는 편이 가장 안정적입니다.'],['Afternoon reset','Nakanoshima·Utsubo처럼 quieter west pocket이 들어가야 오사카가 덜 시끄럽고 더 세련되게 남습니다.'],['Night close','밤은 Dotonbori나 Umeda 중 한 축만 짧고 선명하게 두는 편이 좋습니다.']], variants:[['Rainy version','Arcade, depachika, indoor café pocket을 더 빨리 넣고 거리 비중을 줄이세요.'],['Slower version','Namba 비중을 줄이고 Nakanoshima나 Yodoyabashi 쪽 비중을 늘리면 훨씬 부드러워집니다.'],['Night version','도톤보리 전 구간을 길게 끌기보다 bright scene 하나와 late dessert 하나만 남기세요.']]},
      en:{district:'In Osaka, meal spacing and arcade shelter matter more than adding another headline spot. A food core plus one slower west-side pocket usually lands better than going equally hard on both Namba and Umeda.', rhythm:[['Morning anchor','Open through an easy food line such as Kuromon or the Namba edge.'],['Afternoon reset','A quieter west pocket like Nakanoshima or Utsubo keeps Osaka from feeling too loud for too long.'],['Night close','At night, go clear on either Dotonbori or Umeda, not both.']], variants:[['Rainy version','Bring arcades, depachika, and indoor café pockets forward much earlier.'],['Slower version','Reduce Namba weight and give more space to Nakanoshima or Yodoyabashi.'],['Night version','Keep one bright-night scene and one late dessert instead of stretching Dotonbori too far.']]}
    },
    sapporo:{
      ko:{district:'삿포로는 볼거리를 늘리기보다 wide axis와 warm pocket을 같이 두는 편이 훨씬 좋습니다. Odori의 넓이와 Susukino의 밤을 한 번에 다 세게 쓰기보다 midday heat pocket을 끼워 넣으세요.', rhythm:[['Morning anchor','오도리처럼 block structure가 잘 읽히는 축으로 열어야 도시가 가장 깨끗하게 자리 잡습니다.'],['Afternoon reset','카페나 warm meal pocket이 오후 한복판에 꼭 들어가야 겨울 도시 피로가 덜 쌓입니다.'],['Night close','밤은 스스키노 한 장면이나 전망 하나만 짧게 남기는 편이 좋습니다.']], variants:[['Rainy version','실내 전망, 지하 연결축, 아케이드 pocket을 더 많이 써서 block 이동을 짧게 유지하세요.'],['Slower version','마루야마나 quieter side를 늘리고 스스키노 비중을 줄이면 도시가 훨씬 더 부드럽게 남습니다.'],['Night version','긴 바 hopping보다 warm dinner와 night scene 하나만 선명하게 남기세요.']]},
      en:{district:'Sapporo works better when a wide city axis and one warm pocket stay together. Instead of pushing Odori and Susukino equally hard, insert a midday heat-and-rest pocket.', rhythm:[['Morning anchor','Open through a block-readable line like Odori so the city settles in cleanly.'],['Afternoon reset','A café or warm-meal pocket in the middle protects the whole route in colder weather.'],['Night close','Keep only one Susukino or night-view scene short and vivid.']], variants:[['Rainy version','Use indoor views, underground links, and arcade pockets so block movement stays short.'],['Slower version','Increase Maruyama or another quieter side and reduce Susukino weight.'],['Night version','One warm dinner and one winter-night scene usually land better than a longer bar chain.']]}
    },
    sendai:{
      ko:{district:'센다이는 큰 장면보다 calm axis 하나를 제대로 읽을 때 훨씬 더 도시답게 남습니다. 역권과 조젠지도리를 한 축으로 두고, market이나 green pocket 하나를 끼워 넣는 편이 좋습니다.', rhythm:[['Morning anchor','역권이나 arcade처럼 friction이 적은 중심 축으로 여는 편이 가장 쉽습니다.'],['Afternoon reset','조젠지도리나 market pocket이 midday에 들어가야 센다이가 통과지가 아니라 도시처럼 남습니다.'],['Night close','밤은 loud scene보다 quiet dinner close와 짧은 산책 하나로 닫는 편이 더 잘 맞습니다.']], variants:[['Rainy version','river나 큰 야외 장면 비중을 줄이고 arcade, market, café pocket으로 바로 전환하세요.'],['Slower version','조젠지도리나 quieter lane 하나만 길게 남기고 나머지는 식사와 pause로 두세요.'],['Night version','큰 야경보다 dinner close 하나만 선명하게 두어도 충분합니다.']]},
      en:{district:'Sendai becomes much more like a real city when one calm axis is read properly. Keep the station side and Jozenji-dori on one line, then insert a market or green pocket.', rhythm:[['Morning anchor','Open through an easy central line such as the station side or the arcade.'],['Afternoon reset','Jozenji-dori or one market pocket in the middle keeps Sendai from feeling like a pass-through stop.'],['Night close','A quiet dinner close and one short walk usually suit the city better than forcing a louder night.']], variants:[['Rainy version','Reduce river or outdoor weight and pivot quickly into arcades, markets, and café pockets.'],['Slower version','Let one line such as Jozenji-dori hold more of the route and leave the rest as pauses.'],['Night version','A single dinner close already gives the night enough shape.']]}
    },
    okinawa:{
      ko:{district:'오키나와는 beach count보다 drive pause가 중요합니다. coast line을 더 늘리기보다 one closer sea opener와 one soft dusk close를 남기는 편이 훨씬 좋습니다.', rhythm:[['Morning anchor','가까운 coast line 하나로 먼저 열어야 섬 리듬이 부드럽게 시작됩니다.'],['Afternoon reset','오후에는 beach 추가보다 café, resort, aquarium pocket 같은 pause가 route quality를 지켜 줍니다.'],['Night close','밤은 loud downtown보다 dusk sea와 quiet dinner close 쪽이 더 오래 남습니다.']], variants:[['Rainy version','비나 바람이 강하면 beach count를 빨리 줄이고 indoor fallback으로 pivot하세요.'],['Slower version','한쪽 해안만 깊게 읽고 나머지는 숙소 휴식과 늦은 점심으로 남기는 편이 좋습니다.'],['Night version','late-night city보다 dusk sea 하나를 길게 남기세요.']]},
      en:{district:'In Okinawa, drive pauses matter more than beach count. Instead of extending the coast line further, keep one closer sea opener and one soft dusk close.', rhythm:[['Morning anchor','Open through one closer coast line so the island rhythm starts gently.'],['Afternoon reset','In the afternoon, a café, resort, or aquarium pocket protects the route better than one more beach.'],['Night close','A dusk sea scene and a quiet dinner usually stay longer than a louder downtown night.']], variants:[['Rainy version','When rain or strong wind hits, cut the beach count quickly and pivot indoors.'],['Slower version','Read one side of the coast more deeply and leave the rest for hotel resets and slower lunches.'],['Night version','Keep one longer dusk-sea scene instead of forcing late-night city energy.']]}
    },
    jeju:{
      ko:{district:'제주는 coast line을 다 보려 하기보다 one west or east line을 깊게 읽는 편이 훨씬 좋습니다. 풍경 포인트 개수보다 café pause와 drive spacing이 더 중요합니다.', rhythm:[['Morning anchor','애월이나 성산처럼 장면이 쉬운 해안 축 하나로 여세요.'],['Afternoon reset','카페나 village pocket이 midday에 꼭 들어가야 제주가 단순 사진 sweep이 되지 않습니다.'],['Night close','밤은 늦은 이동보다 숙소 근처 dinner와 조용한 coast close가 더 잘 맞습니다.']], variants:[['Rainy version','wind/rain이 강하면 scenic drive를 줄이고 café, museum, hotel pause를 적극적으로 쓰세요.'],['Slower version','동/서 한 축만 남기고 나머지는 숙소 휴식과 늦은 lunch로 비워 두세요.'],['Night version','late-night drive보다 dusk coast와 quiet dinner close를 우선하세요.']]},
      en:{district:'Jeju gets much better when one west or east line is read more deeply instead of trying to cover the whole coast. Café pauses and drive spacing matter more than scene count.', rhythm:[['Morning anchor','Open through one easy coast axis such as Aewol or Seongsan.'],['Afternoon reset','A café or village pocket in the middle keeps Jeju from turning into a pure photo sweep.'],['Night close','A nearby dinner and quiet coast close usually work better than more night driving.']], variants:[['Rainy version','When wind or rain rises, cut scenic drives and use cafés, museums, and hotel pauses actively.'],['Slower version','Keep only one east or west line and leave the rest for hotel resets and slower lunches.'],['Night version','Prioritize dusk coast and a quiet dinner close over late-night driving.']]}
    },
    gyeongju:{
      ko:{district:'경주는 heritage point를 더 넣기보다 dusk와 quiet lane을 남기는 편이 훨씬 더 강하게 남습니다. Daereungwon, museum edge, Hwangnidan-gil 중 한 축만 깊게 두어도 충분합니다.', rhythm:[['Morning anchor','대릉원이나 museum edge처럼 읽기 쉬운 heritage axis로 여세요.'],['Afternoon reset','한옥 café나 quiet lane pocket이 오후에 들어가야 유산 도시가 숨을 쉽니다.'],['Night close','밤은 황리단길 loud stretch 전체보다 soft dusk walk와 quiet dinner close가 더 잘 맞습니다.']], variants:[['Rainy version','heritage walk를 짧게 줄이고 hanok café, museum, dessert pocket을 더 빨리 넣으세요.'],['Slower version','유적 개수를 줄이고 한 축의 산책 밀도를 높이는 편이 좋습니다.'],['Night version','황리단길 전체를 길게 끌기보다 dusk lane 하나만 선명하게 남기세요.']]},
      en:{district:'Gyeongju lands much better when dusk and one quiet lane are protected instead of adding more heritage points. One deeper axis around Daereungwon, the museum edge, or Hwangnidan-gil is already enough.', rhythm:[['Morning anchor','Open through an easy heritage axis such as Daereungwon or the museum edge.'],['Afternoon reset','A hanok café or quiet-lane pocket in the middle lets the heritage city breathe.'],['Night close','A soft dusk walk and a quiet dinner usually suit the city better than stretching the louder side too far.']], variants:[['Rainy version','Shorten the heritage walk and bring hanok cafés, museums, and dessert pockets forward.'],['Slower version','Reduce the count of heritage points and let one walkable axis carry more weight.'],['Night version','Keep one dusk lane vivid instead of dragging the whole Hwangnidan-gil stretch.']]}
    },
    macau:{
      ko:{district:'마카오는 compact scale을 믿는 편이 좋습니다. Senado heritage core와 Taipa/Cotai bright side를 둘 다 길게 끌기보다, bridge pocket 하나를 두고 day-night contrast만 선명하게 남기세요.', rhythm:[['Morning anchor','Senado나 Ruins edge처럼 걷기 쉬운 old-core line으로 여세요.'],['Afternoon reset','타이파 같은 bridge pocket이 들어가야 old core와 bright side가 자연스럽게 이어집니다.'],['Night close','밤은 Cotai multiple scene보다 bright close 하나와 dessert pocket 하나만 두는 편이 좋습니다.']], variants:[['Rainy version','heritage walk를 짧게 줄이고 tea room, dessert, resort indoor pocket으로 바로 전환하세요.'],['Slower version','Senado와 Taipa를 둘 다 깊게 끌지 말고 한 축만 진하게 두세요.'],['Night version','여러 casino scene보다 one bright close 하나가 훨씬 더 세련됩니다.']]},
      en:{district:'Macau works better when you trust its compact scale. Instead of stretching both the Senado heritage core and the Taipa/Cotai bright side, keep one bridge pocket and let the day-night contrast stay clear.', rhythm:[['Morning anchor','Open through an easy old-core line such as Senado or the Ruins edge.'],['Afternoon reset','A bridge pocket like Taipa lets the old core and bright side connect naturally.'],['Night close','One bright close plus one dessert pocket usually lands better than several Cotai scenes.']], variants:[['Rainy version','Shorten the heritage walk quickly and pivot into tea rooms, desserts, and resort-style indoor pockets.'],['Slower version','Do not drag both Senado and Taipa deeply; let one axis lead.'],['Night version','One bright close is far more elegant than several competing casino scenes.']]}
    }
  };

  const priorityResultEditorialMap = {
    osaka:{ ko:{title:'Food-first Osaka, but edited softly', why:'오사카는 명소 수보다 먹는 타이밍과 쉬는 구간이 더 중요합니다. 이번 결과는 food core를 살리면서도 과밀해지지 않게 조정하는 쪽이 잘 맞습니다.', bestFor:'짧은 일정에서도 먹고 걷고 쉬는 리듬을 분명하게 남기고 싶은 사람', rainy:'아케이드, depachika, indoor café pocket을 앞당기면 비 오는 날에도 리듬이 잘 유지됩니다.', slower:'Nakanoshima나 quieter west pocket 비중을 늘리면 훨씬 더 정돈된 오사카가 됩니다.', swap:'Namba와 Umeda를 둘 다 길게 끌기보다, 한쪽만 깊게 두고 다른 한쪽은 dinner close 정도로 남기세요.'}, en:{title:'Food-first Osaka, edited more softly', why:'In Osaka, meal timing and easier movement matter more than adding more headline spots. The cleaner move is to keep the food core vivid without letting the route get loud for too long.', bestFor:'Travelers who want clear food-and-walk rhythm on a short trip', rainy:'Pull arcade, depachika, and indoor café pockets forward on rainy days.', slower:'Increasing Nakanoshima or a quieter west-side pocket makes Osaka feel much more controlled.', swap:'Do not drag both Namba and Umeda equally deep; let one lead and leave the other as a dinner close.'}},
    sapporo:{ ko:{title:'Winter-light Sapporo with a warmer middle', why:'삿포로는 넓은 축과 따뜻한 식사 pocket이 같이 있어야 겨울 도시 피로가 덜 쌓입니다. 이번 결과는 그 균형을 잡는 쪽이 핵심입니다.', bestFor:'짧은 겨울 도시 여행에서도 계절 공기와 식사 만족을 같이 남기고 싶은 사람', rainy:'실내 전망, 지하 연결축, 카페 pocket을 앞당기면 비나 눈에도 route quality가 유지됩니다.', slower:'마루야마나 quieter side를 늘리면 삿포로가 훨씬 더 부드럽고 차분하게 남습니다.', swap:'오도리와 스스키노를 둘 다 길게 끌기보다, 낮은 한 축 중심으로 두고 밤은 짧게 마감하세요.'}, en:{title:'Winter-light Sapporo with a warmer middle', why:'Sapporo lands best when a wide axis and one warm pocket stay together. The goal is not more stops, but cleaner seasonal control.', bestFor:'Travelers who want winter atmosphere without overloading movement', rainy:'Bring indoor views, underground links, and café pockets forward in rain or snow.', slower:'A quieter side like Maruyama softens the whole city beautifully.', swap:'Do not stretch both Odori and Susukino too far; keep the day centered and the night short.'}},
    sendai:{ ko:{title:'Calmer Sendai, read as a city not a stopover', why:'센다이는 조용한 축 하나와 meal pocket 하나가 제대로 잡힐 때 도시 성격이 살아납니다. 이번 결과는 그 차분한 결을 지키는 쪽이 좋습니다.', bestFor:'빽빽한 체크리스트보다 차분한 도시 텍스처를 원하는 사람', rainy:'arcade, market, café pocket 위주로 재배치하면 우천일에도 무리 없이 읽힙니다.', slower:'조젠지도리 같은 한 축만 더 길게 두고 나머지는 pause로 남기세요.', swap:'강변/야외 구간을 억지로 늘리기보다 dinner close 하나를 더 단단하게 만드는 편이 낫습니다.'}, en:{title:'Calmer Sendai, read as a city not a stopover', why:'Sendai works when one calm line and one meal pocket are allowed to define the trip. It should feel grounded, not like a transit gap.', bestFor:'Travelers who want a quieter city texture instead of a packed checklist', rainy:'Rebuild around arcades, markets, and café pockets on rainy days.', slower:'Let a line like Jozenji-dori carry more of the route and leave the rest as pauses.', swap:'Instead of forcing more river or outdoor weight, strengthen one dinner close.'}},
    okinawa:{ ko:{title:'Okinawa with fewer beaches and better pauses', why:'오키나와는 해변 개수보다 drive pause가 더 중요합니다. 이번 결과는 바다 장면을 남기되, 섬 리듬이 흐트러지지 않게 쉬는 구간을 같이 두는 쪽이 핵심입니다.', bestFor:'풍경은 충분히 보되 과로한 island sweep은 피하고 싶은 사람', rainy:'비나 강풍이 오면 beach count를 줄이고 café, resort, aquarium pocket으로 빨리 전환하세요.', slower:'한쪽 해안만 남기고 나머지는 숙소 휴식과 늦은 lunch로 비워 두면 훨씬 좋아집니다.', swap:'멀리 있는 해변 하나를 더 넣기보다, 가까운 coast line과 dusk close를 더 길게 가져가세요.'}, en:{title:'Okinawa with fewer beaches and better pauses', why:'In Okinawa, drive pauses matter more than one more beach. The route should keep the island rhythm intact while still leaving one strong sea scene.', bestFor:'Travelers who want scenery without turning the island into a rushed sweep', rainy:'Cut the beach count quickly and pivot into cafés, resort pockets, or aquariums in rain or wind.', slower:'Keep one side of the coast only and leave the rest for hotel resets and slower lunches.', swap:'Instead of chasing one more distant beach, lengthen the closer coast line and the dusk close.'}},
    jeju:{ ko:{title:'Jeju with one coast line held more deeply', why:'제주는 동서 전체를 다 잡으려 하기보다 한 축만 더 깊게 남길 때 훨씬 더 좋아집니다. 이번 결과도 drive spacing과 café pause가 핵심입니다.', bestFor:'풍경과 휴식의 밸런스를 원하고, 이동 피로를 줄이고 싶은 사람', rainy:'바람이나 비가 강하면 scenic drive를 줄이고 café, museum, hotel pause를 앞당기세요.', slower:'동/서 한 축만 남기고 나머지를 과감히 비우면 훨씬 더 제주답게 남습니다.', swap:'풍경 포인트 하나를 더 넣기보다, 숙소 근처 dinner close와 coast pause를 더 단단하게 만드세요.'}, en:{title:'Jeju with one coast line held more deeply', why:'Jeju improves when one coast line is read more deeply instead of trying to cover both east and west. Drive spacing and café pauses matter most here.', bestFor:'Travelers who want a better scenery-rest balance with less fatigue', rainy:'Bring cafés, museums, and hotel pauses forward when wind or rain rises.', slower:'Keep only one east or west axis and leave the rest open.', swap:'Instead of adding one more scenic point, strengthen the nearby dinner close and coast pause.'}},
    gyeongju:{ ko:{title:'Gyeongju with dusk and quiet lanes protected', why:'경주는 유산 개수보다 dusk와 lane rhythm을 남기는 쪽이 훨씬 더 강합니다. 이번 결과도 그 느린 템포를 지키는 방향이 맞습니다.', bestFor:'역사 도시를 체크리스트보다 장면과 템포로 읽고 싶은 사람', rainy:'hanok café, museum, dessert pocket 위주로 돌리면 우천일에도 무리 없이 유지됩니다.', slower:'유적 개수를 줄이고 한 축의 산책 밀도를 높이면 훨씬 더 좋습니다.', swap:'황리단길 전체를 길게 끌기보다 dusk walk 하나와 quiet dinner 하나를 더 선명하게 남기세요.'}, en:{title:'Gyeongju with dusk and quiet lanes protected', why:'Gyeongju lands better through dusk and lane rhythm than through a higher heritage count. The stronger move is to protect the slower tempo.', bestFor:'Travelers who want to read a heritage city through scene and pace, not only checklist value', rainy:'Hanok cafés, museums, and dessert pockets make much better rainy-day pivots.', slower:'Reduce the heritage count and let one walkable axis carry more weight.', swap:'Instead of stretching the whole Hwangnidan-gil side, make one dusk walk and one quiet dinner much clearer.'}},
    macau:{ ko:{title:'Compact Macau with one cleaner day-night contrast', why:'마카오는 scale을 믿을수록 좋아집니다. 이번 결과는 old core와 bright side를 둘 다 세게 끌기보다, bridge pocket을 두고 contrast만 선명하게 남기는 편이 맞습니다.', bestFor:'짧은 일정에서도 유산과 밤 장면을 둘 다 보고 싶은 사람', rainy:'heritage walk를 짧게 줄이고 tea room, dessert, indoor resort pocket을 빨리 쓰는 편이 좋습니다.', slower:'Senado와 Taipa를 둘 다 깊게 끌지 말고 한 축만 리드하게 두세요.', swap:'여러 bright scene보다 Cotai one bright close 하나가 훨씬 더 세련됩니다.'}, en:{title:'Compact Macau with one cleaner day-night contrast', why:'Macau gets better when you trust its scale. Instead of dragging both the old core and the bright side, keep one bridge pocket and let the contrast stay clean.', bestFor:'Travelers who want both heritage and night tone on a shorter trip', rainy:'Shorten the heritage walk and pivot quickly into tea rooms, desserts, and resort-style indoor pockets.', slower:'Do not go deep on both Senado and Taipa; let one axis lead.', swap:'One bright Cotai close is usually much more elegant than several competing night scenes.'}}
  };

  const priorityResultBranchMap = {
    osaka:{ ko:['교토처럼 quieter city를 붙이면 대비가 훨씬 또렷해집니다.','후쿠오카처럼 compact food city를 이어 읽으면 meal rhythm 비교가 잘 됩니다.'], en:['Branch into Kyoto when you want a quieter contrast after Osaka.','Branch into Fukuoka when you want to compare compact food-city rhythm.']},
    sapporo:{ ko:['센다이를 이어 읽으면 차분한 북쪽 도시 결이 더 넓게 보입니다.','도쿄로 넘어가면 같은 일본 안에서도 밀도 차이가 더 선명해집니다.'], en:['Continue with Sendai for a calmer north-city contrast.','Jump to Tokyo when you want the density difference inside Japan to feel sharper.']},
    sendai:{ ko:['삿포로를 같이 보면 계절감 있는 일본 도시 결이 더 넓어집니다.','서울을 붙이면 calm axis와 fast city contrast가 분명해집니다.'], en:['Pair it with Sapporo for a wider read on softer Japanese city rhythm.','Pair it with Seoul when you want a calm-versus-fast city contrast.']},
    okinawa:{ ko:['타이베이를 이어 읽으면 섬 공기와 야간 도시 리듬의 차이가 더 재미있게 보입니다.','제주를 붙이면 동아시아 island route를 비교하기 좋습니다.'], en:['Continue with Taipei for a sharper contrast between island air and night-city rhythm.','Pair it with Jeju when you want an East Asia island-route comparison.']},
    jeju:{ ko:['부산을 이어 읽으면 바다 도시와 섬 route의 차이가 분명해집니다.','경주를 붙이면 느린 한국 trip 축이 더 풍부해집니다.'], en:['Continue with Busan for a cleaner coast-city versus island contrast.','Pair it with Gyeongju to widen the slower Korea-trip axis.']},
    gyeongju:{ ko:['교토를 이어 읽으면 heritage city의 quiet rhythm 비교가 잘 됩니다.','부산을 붙이면 역사 도시와 coast city 대비가 더 선명해집니다.'], en:['Continue with Kyoto for a strong quiet-heritage city comparison.','Pair it with Busan when you want the heritage-versus-coast contrast to stand out.']},
    macau:{ ko:['홍콩을 이어 읽으면 vertical harbor night와 compact heritage night의 차이가 또렷해집니다.','타이파이/타이베이 쪽으로 가지를 치면 greater China night rhythm을 더 넓게 읽을 수 있습니다.'], en:['Continue with Hong Kong for a sharper contrast between vertical harbor nights and compact heritage nights.','Branch into Taipei when you want to widen the Greater China night-rhythm read.']}
  };


  const priorityResultHeroPackMap = {
  "osaka": {
    "ko": {
      "eyebrow": "오사카 결과 브리프",
      "coverMeta": "Osaka editorial result",
      "coverNote": "오사카 결과는 명소 수보다 meal rhythm과 쉬는 구간이 보이도록 다시 편집했습니다.",
      "factRhythm": "Meal-first rhythm with one softer reset",
      "factShape": "한 개의 food core · 한 개의 quieter pocket · 짧은 night close",
      "factBest": "짧은 일정에서도 먹고 걷고 쉬는 리듬을 남기고 싶은 사람",
      "editorNote": "이 결과는 오사카를 더 많이 넣기보다, 한 축은 먹는 리듬으로 밀고 다른 한 축은 쉬는 pocket으로 눌러서 도시가 과열되지 않게 잡은 버전입니다.",
      "visualTitle": "오사카 food-core edit",
      "visualDesc": "headline spot을 늘리기보다 food axis와 reset pocket을 같이 남기는 쪽으로 정리했습니다.",
      "visualKicker": "Food-led city edit"
    },
    "en": {
      "eyebrow": "Osaka result brief",
      "coverMeta": "Osaka editorial result",
      "coverNote": "This Osaka result is framed around meal rhythm and reset windows, not a higher attraction count.",
      "factRhythm": "Meal-first rhythm with one softer reset",
      "factShape": "One food core · one quieter pocket · one short night close",
      "factBest": "Travelers who want clear food-walk-rest rhythm on a shorter trip",
      "editorNote": "This version keeps Osaka from overheating by letting one axis carry the food energy while another stays softer and more breathable.",
      "visualTitle": "Osaka food-core edit",
      "visualDesc": "Instead of adding more headline spots, this route keeps the food axis and the reset pocket visible together.",
      "visualKicker": "Food-led city edit"
    }
  },
  "sapporo": {
    "ko": {
      "eyebrow": "삿포로 결과 브리프",
      "coverMeta": "Sapporo editorial result",
      "coverNote": "삿포로 결과는 넓은 축과 따뜻한 pocket이 같이 읽히도록 겨울 도시 리듬 중심으로 정리했습니다.",
      "factRhythm": "Wide winter axis with warm indoor pockets",
      "factShape": "넓은 중심축 · 실내 연결 · 짧은 야간 글로우",
      "factBest": "계절감은 느끼되 겨울 도시 피로는 줄이고 싶은 사람",
      "editorNote": "이 결과는 삿포로를 눈 구경 리스트로 만들지 않고, 차가운 바깥 축과 따뜻한 한 끼/실내 pocket이 번갈아 나오도록 잡아 겨울 리듬이 무너지지 않게 만든 버전입니다.",
      "visualTitle": "삿포로 winter-light flow",
      "visualDesc": "cold air, indoor link, warm meal pocket이 같이 보이게 정리한 겨울 도시 루트입니다.",
      "visualKicker": "Winter city edit"
    },
    "en": {
      "eyebrow": "Sapporo result brief",
      "coverMeta": "Sapporo editorial result",
      "coverNote": "This Sapporo result is organized around winter-city rhythm, where a wider axis and a warm pocket need to stay together.",
      "factRhythm": "Wide winter axis with warm indoor pockets",
      "factShape": "A broad center line · indoor links · a short night glow",
      "factBest": "Travelers who want seasonal atmosphere without piling on winter fatigue",
      "editorNote": "This version keeps Sapporo from turning into a cold-weather checklist by alternating the open winter line with warmer meal and indoor pockets.",
      "visualTitle": "Sapporo winter-light flow",
      "visualDesc": "The route keeps cold air, indoor links, and one warm meal pocket readable on the same page.",
      "visualKicker": "Winter city edit"
    }
  },
  "sendai": {
    "ko": {
      "eyebrow": "센다이 결과 브리프",
      "coverMeta": "Sendai editorial result",
      "coverNote": "센다이 결과는 stopover처럼 보이지 않도록 calm axis와 meal pocket이 같이 살아나게 정리했습니다.",
      "factRhythm": "Calm avenue rhythm with a market pause",
      "factShape": "차분한 중심축 · market pocket · 조용한 dinner close",
      "factBest": "과밀한 체크리스트보다 도시 텍스처를 더 오래 남기고 싶은 사람",
      "editorNote": "이 결과는 센다이를 지나가는 도시처럼 다루지 않고, calm axis 하나와 meal pocket 하나가 도시 성격을 끝까지 끌고 가도록 만든 버전입니다.",
      "visualTitle": "센다이 calm-city flow",
      "visualDesc": "green axis, market pause, quiet dinner close로 끝나는 차분한 도시 루트입니다.",
      "visualKicker": "Calm city edit"
    },
    "en": {
      "eyebrow": "Sendai result brief",
      "coverMeta": "Sendai editorial result",
      "coverNote": "This Sendai result is edited so the city reads as a calm destination, not a stopover gap.",
      "factRhythm": "Calm avenue rhythm with a market pause",
      "factShape": "A softer city axis · one market pocket · one quiet dinner close",
      "factBest": "Travelers who want city texture to linger longer than checklist density",
      "editorNote": "This version keeps Sendai grounded by letting one calm line and one meal pocket define the city from start to finish.",
      "visualTitle": "Sendai calm-city flow",
      "visualDesc": "The route closes through a green axis, a market pause, and one quieter dinner rhythm.",
      "visualKicker": "Calm city edit"
    }
  },
  "okinawa": {
    "ko": {
      "eyebrow": "오키나와 결과 브리프",
      "coverMeta": "Okinawa editorial result",
      "coverNote": "오키나와 결과는 beach count보다 drive pause와 바다 장면의 간격이 보이도록 편집했습니다.",
      "factRhythm": "Sea scenes with deliberate drive pauses",
      "factShape": "바다 앵커 · drive reset · 부드러운 dusk close",
      "factBest": "풍경은 충분히 보되 섬 전체를 과하게 훑고 싶지는 않은 사람",
      "editorNote": "이 결과는 오키나와를 beach 리스트로 만들지 않고, sea opener 뒤에 resort pause와 느린 dusk close가 들어와 섬 리듬이 무너지지 않게 잡은 버전입니다.",
      "visualTitle": "오키나와 sea-reset flow",
      "visualDesc": "바다 장면은 남기되, drive와 resort pause가 같이 읽히는 섬 루트입니다.",
      "visualKicker": "Island reset edit"
    },
    "en": {
      "eyebrow": "Okinawa result brief",
      "coverMeta": "Okinawa editorial result",
      "coverNote": "This Okinawa result is edited around drive pauses and sea spacing, not a higher beach count.",
      "factRhythm": "Sea scenes with deliberate drive pauses",
      "factShape": "A sea anchor · a drive reset · a soft dusk close",
      "factBest": "Travelers who want scenery without turning the island into a rushed sweep",
      "editorNote": "This version avoids beach-list logic by letting the sea opener, the resort pause, and the softer dusk close protect the island rhythm.",
      "visualTitle": "Okinawa sea-reset flow",
      "visualDesc": "The route keeps the sea vivid while making the drive and reset windows readable too.",
      "visualKicker": "Island reset edit"
    }
  },
  "jeju": {
    "ko": {
      "eyebrow": "제주 결과 브리프",
      "coverMeta": "Jeju editorial result",
      "coverNote": "제주 결과는 동서 전체를 다 훑기보다 한 coast line을 더 깊게 남기도록 다시 정리했습니다.",
      "factRhythm": "One stronger coast line with slower pauses",
      "factShape": "한 해안축 · café pause · 느린 dinner close",
      "factBest": "풍경과 휴식의 밸런스를 원하고 이동 피로는 줄이고 싶은 사람",
      "editorNote": "이 결과는 제주를 넓게 소모하지 않고, 한쪽 coast line과 café pause를 더 깊게 읽어 풍경과 휴식을 같이 남기도록 만든 버전입니다.",
      "visualTitle": "제주 one-coast edit",
      "visualDesc": "한 해안축을 더 깊게 읽고 나머지는 비워 두는 쪽으로 정리한 섬 루트입니다.",
      "visualKicker": "Soft coast edit"
    },
    "en": {
      "eyebrow": "Jeju result brief",
      "coverMeta": "Jeju editorial result",
      "coverNote": "This Jeju result is reorganized around one deeper coast line instead of trying to cover both sides of the island.",
      "factRhythm": "One stronger coast line with slower pauses",
      "factShape": "A single coast axis · café pauses · a slower dinner close",
      "factBest": "Travelers who want a better scenery-rest balance with less movement fatigue",
      "editorNote": "This version keeps Jeju from feeling too spread out by reading one coast line more deeply and leaving more room for pauses.",
      "visualTitle": "Jeju one-coast edit",
      "visualDesc": "The route deepens one coast axis and leaves the rest more open and breathable.",
      "visualKicker": "Soft coast edit"
    }
  },
  "gyeongju": {
    "ko": {
      "eyebrow": "경주 결과 브리프",
      "coverMeta": "Gyeongju editorial result",
      "coverNote": "경주 결과는 heritage count보다 dusk와 quiet lane rhythm이 먼저 보이게 정리했습니다.",
      "factRhythm": "Heritage scenes held by dusk and lane rhythm",
      "factShape": "유산축 · dusk walk · quiet dinner pocket",
      "factBest": "역사 도시를 장면과 템포로 읽고 싶은 사람",
      "editorNote": "이 결과는 경주를 유적 리스트로 밀지 않고, dusk walk와 lane rhythm이 도시 전체를 묶도록 만들어 더 오래 남게 한 버전입니다.",
      "visualTitle": "경주 dusk-heritage flow",
      "visualDesc": "heritage scene보다 dusk와 quiet lane이 먼저 기억나게 정리한 경주 루트입니다.",
      "visualKicker": "Heritage dusk edit"
    },
    "en": {
      "eyebrow": "Gyeongju result brief",
      "coverMeta": "Gyeongju editorial result",
      "coverNote": "This Gyeongju result is framed so dusk and quiet lane rhythm lead before a higher heritage count does.",
      "factRhythm": "Heritage scenes held by dusk and lane rhythm",
      "factShape": "A heritage axis · a dusk walk · a quiet dinner pocket",
      "factBest": "Travelers who want to read a heritage city through scene and tempo",
      "editorNote": "This version avoids checklist pressure by letting dusk and quieter lanes tie the whole city together more elegantly.",
      "visualTitle": "Gyeongju dusk-heritage flow",
      "visualDesc": "The route is shaped so dusk and quiet lanes stay in memory longer than the raw heritage count.",
      "visualKicker": "Heritage dusk edit"
    }
  },
  "macau": {
    "ko": {
      "eyebrow": "마카오 결과 브리프",
      "coverMeta": "Macau editorial result",
      "coverNote": "마카오 결과는 old core와 bright side를 둘 다 세게 끌기보다, day-night contrast만 선명하게 남기도록 정리했습니다.",
      "factRhythm": "Compact old core with one bright close",
      "factShape": "old-core walk · bridge pocket · one bright night finish",
      "factBest": "짧은 일정에서도 heritage와 night tone을 같이 보고 싶은 사람",
      "editorNote": "이 결과는 마카오를 작게 믿는 쪽으로 잡았습니다. old core와 bright side를 모두 길게 끌지 않고, bridge pocket을 사이에 두고 contrast만 선명하게 남깁니다.",
      "visualTitle": "마카오 compact contrast flow",
      "visualDesc": "짧은 old-core walk와 one bright close만 남겨 contrast가 흐려지지 않게 만든 루트입니다.",
      "visualKicker": "Compact contrast edit"
    },
    "en": {
      "eyebrow": "Macau result brief",
      "coverMeta": "Macau editorial result",
      "coverNote": "This Macau result keeps the old core and the bright side from competing by holding only the day-night contrast clearly.",
      "factRhythm": "Compact old core with one bright close",
      "factShape": "An old-core walk · a bridge pocket · one bright night finish",
      "factBest": "Travelers who want both heritage and night tone on a shorter route",
      "editorNote": "This version trusts Macau’s scale. It does not drag both the old core and the bright side too far, and leaves the contrast clear instead.",
      "visualTitle": "Macau compact contrast flow",
      "visualDesc": "A shorter old-core walk and one bright close keep the contrast elegant instead of noisy.",
      "visualKicker": "Compact contrast edit"
    }
  }
};

  const priorityResultMicroBriefMap = {
  "osaka": {
    "ko": [
      {
        "kicker": "Food axis",
        "text": "Namba나 main food core를 하루의 중심축으로 두고, 나머지는 쉬는 pocket으로 눌러 주세요."
      },
      {
        "kicker": "Reset pocket",
        "text": "Nakanoshima나 quieter west side가 들어와야 오사카가 오래 갑니다."
      },
      {
        "kicker": "Night finish",
        "text": "야간은 길게 늘리기보다 one bright close만 남기는 편이 더 세련됩니다."
      }
    ],
    "en": [
      {
        "kicker": "Food axis",
        "text": "Let one food core such as Namba carry the day, then use the rest of the route as softer resets."
      },
      {
        "kicker": "Reset pocket",
        "text": "A quieter west-side layer like Nakanoshima keeps Osaka from burning too hot for too long."
      },
      {
        "kicker": "Night finish",
        "text": "The night usually lands better when it stays as one bright close instead of a longer spread."
      }
    ]
  },
  "sapporo": {
    "ko": [
      {
        "kicker": "Winter width",
        "text": "오도리 같은 넓은 축을 먼저 잡고, 중간에 따뜻한 식사 pocket을 넣어 주세요."
      },
      {
        "kicker": "Indoor link",
        "text": "눈이나 비가 오면 지하 연결과 실내 전망을 더 빨리 앞당기는 편이 좋습니다."
      },
      {
        "kicker": "Short glow",
        "text": "야간은 짧게 남겨야 겨울 도시 피로가 덜 쌓입니다."
      }
    ],
    "en": [
      {
        "kicker": "Winter width",
        "text": "Open through a wider line like Odori, then place one warm meal pocket in the middle."
      },
      {
        "kicker": "Indoor link",
        "text": "In snow or rain, underground links and indoor views should come forward earlier."
      },
      {
        "kicker": "Short glow",
        "text": "Keeping the night shorter helps the winter-city rhythm stay lighter."
      }
    ]
  },
  "sendai": {
    "ko": [
      {
        "kicker": "Calm opener",
        "text": "역 근처나 조젠지도리처럼 이해 쉬운 calm axis로 먼저 열어 주세요."
      },
      {
        "kicker": "Market pause",
        "text": "시장이나 아케이드 pocket이 들어와야 센다이가 transit city처럼 보이지 않습니다."
      },
      {
        "kicker": "Quiet close",
        "text": "저녁은 크게 퍼뜨리기보다 quiet dinner close로 정리하는 편이 맞습니다."
      }
    ],
    "en": [
      {
        "kicker": "Calm opener",
        "text": "Open through a readable calm axis like the station area or Jozenji-dori."
      },
      {
        "kicker": "Market pause",
        "text": "A market or arcade pocket keeps Sendai from reading like a transit gap."
      },
      {
        "kicker": "Quiet close",
        "text": "The evening lands better as one quieter dinner close than as a wider spread."
      }
    ]
  },
  "okinawa": {
    "ko": [
      {
        "kicker": "Sea opener",
        "text": "첫 장면은 바다로 여되, 너무 먼 beach 추가는 빨리 끊어 주세요."
      },
      {
        "kicker": "Drive pause",
        "text": "오키나와는 drive spacing이 route quality를 크게 좌우합니다."
      },
      {
        "kicker": "Soft dusk",
        "text": "마감은 resort pause나 dusk close처럼 느리게 닫는 편이 좋습니다."
      }
    ],
    "en": [
      {
        "kicker": "Sea opener",
        "text": "Open with the sea, but cut the urge to add one more distant beach early."
      },
      {
        "kicker": "Drive pause",
        "text": "In Okinawa, drive spacing changes the quality of the whole route."
      },
      {
        "kicker": "Soft dusk",
        "text": "The close usually works best as a slower dusk or resort pause."
      }
    ]
  },
  "jeju": {
    "ko": [
      {
        "kicker": "One coast",
        "text": "동서 전체보다 한 coast line을 더 깊게 읽는 쪽이 이번 결과와 잘 맞습니다."
      },
      {
        "kicker": "Café pause",
        "text": "제주는 café pause를 빼면 scenic drive만 남아 금방 피곤해집니다."
      },
      {
        "kicker": "Local close",
        "text": "숙소 근처 dinner close를 단단하게 남겨야 route가 덜 흩어집니다."
      }
    ],
    "en": [
      {
        "kicker": "One coast",
        "text": "This result works best when one coast line is read more deeply than the whole island."
      },
      {
        "kicker": "Café pause",
        "text": "Without café pauses, Jeju quickly turns into scenery and drive fatigue only."
      },
      {
        "kicker": "Local close",
        "text": "A stronger dinner close near the stay keeps the route from scattering."
      }
    ]
  },
  "gyeongju": {
    "ko": [
      {
        "kicker": "Dusk first",
        "text": "경주는 dusk가 들어가야 heritage texture가 더 깊어집니다."
      },
      {
        "kicker": "Lane rhythm",
        "text": "quiet lane과 hanok pocket이 같이 있어야 결과가 더 오래 남습니다."
      },
      {
        "kicker": "Edit down",
        "text": "유적 개수 하나를 덜고 한 장면을 더 길게 두는 편이 훨씬 좋습니다."
      }
    ],
    "en": [
      {
        "kicker": "Dusk first",
        "text": "Gyeongju’s heritage texture deepens once dusk becomes part of the route."
      },
      {
        "kicker": "Lane rhythm",
        "text": "Quiet lanes and hanok pockets help the result linger much longer."
      },
      {
        "kicker": "Edit down",
        "text": "Cut one heritage count and let one scene stay longer instead."
      }
    ]
  },
  "macau": {
    "ko": [
      {
        "kicker": "Old-core first",
        "text": "Senado나 old core를 짧고 분명하게 먼저 읽는 편이 가장 좋습니다."
      },
      {
        "kicker": "Bridge pocket",
        "text": "Taipa bridge pocket이 들어와야 day-night contrast가 덜 거칠어집니다."
      },
      {
        "kicker": "One bright close",
        "text": "night scene은 Cotai one bright close만 남겨도 충분합니다."
      }
    ],
    "en": [
      {
        "kicker": "Old-core first",
        "text": "Macau usually opens best through a short, clear old-core read."
      },
      {
        "kicker": "Bridge pocket",
        "text": "A Taipa bridge pocket makes the day-night contrast feel less abrupt."
      },
      {
        "kicker": "One bright close",
        "text": "One brighter Cotai close is usually enough for the night."
      }
    ]
  }
};

  const priorityResultVisualStoryMap = {
  "osaka": {
    "ko": {
      "coverTitle": "오사카 food-core cover",
      "coverText": "이번 결과는 오사카를 attraction list가 아니라 meal rhythm이 보이는 도시로 다시 읽게 만드는 cover입니다.",
      "routeTitle": "한 축은 loud, 한 축은 softer",
      "routeText": "food core 뒤에 quieter west pocket을 넣어 route가 과열되지 않게 잡았습니다.",
      "packageTitle": "왜 이 route가 오래 가는지",
      "packageText": "오사카는 더 많이 넣을수록 좋아지는 도시가 아니라, meal spacing과 night close를 더 정확히 잡을수록 좋아집니다.",
      "branchTitle": "교토 또는 후쿠오카로 이어 읽기",
      "branchText": "quiet contrast가 필요하면 Kyoto, compact food rhythm 비교가 필요하면 Fukuoka 쪽으로 가지를 치는 편이 자연스럽습니다."
    },
    "en": {
      "coverTitle": "Osaka food-core cover",
      "coverText": "This cover reframes Osaka as a city of meal rhythm rather than a simple attraction list.",
      "routeTitle": "One louder axis, one softer line",
      "routeText": "A quieter west-side pocket is placed behind the food core so the route does not overheat.",
      "packageTitle": "Why this route holds",
      "packageText": "Osaka gets stronger when meal spacing and the night close are tuned more carefully, not when more stops are added.",
      "branchTitle": "Continue into Kyoto or Fukuoka",
      "branchText": "Branch into Kyoto for quieter contrast, or into Fukuoka to compare a more compact food-city rhythm."
    }
  },
  "sapporo": {
    "ko": {
      "coverTitle": "삿포로 winter-light cover",
      "coverText": "이 cover는 삿포로를 눈 구경 도시가 아니라 cold air와 warm pocket이 번갈아 나오는 도시로 읽게 만듭니다.",
      "routeTitle": "차가운 축과 따뜻한 pocket",
      "routeText": "넓은 바깥 축 뒤에 실내 연결과 warm meal pocket을 넣어 겨울 리듬을 정리했습니다.",
      "packageTitle": "왜 이 route가 겨울에 강한지",
      "packageText": "겨울 도시는 stop 수보다 회복 구간 배치가 더 중요합니다. 이 route는 그 간격을 먼저 잡았습니다.",
      "branchTitle": "센다이 또는 도쿄로 이어 읽기",
      "branchText": "부드러운 북쪽 축을 더 읽고 싶다면 Sendai, 밀도 차이를 크게 보고 싶다면 Tokyo로 이어가면 좋습니다."
    },
    "en": {
      "coverTitle": "Sapporo winter-light cover",
      "coverText": "This cover reads Sapporo through cold air and warm pockets rather than as a snow-spot list.",
      "routeTitle": "Cold lines and warm pockets",
      "routeText": "The wider outdoor axis is balanced by indoor links and one warm meal pocket.",
      "packageTitle": "Why this route works in winter",
      "packageText": "In a winter city, recovery windows matter more than one extra stop. This route is built around that spacing.",
      "branchTitle": "Continue into Sendai or Tokyo",
      "branchText": "Move into Sendai for a softer northern read, or Tokyo if you want the density contrast to sharpen."
    }
  },
  "sendai": {
    "ko": {
      "coverTitle": "센다이 calm-city cover",
      "coverText": "이 cover는 센다이를 transit gap이 아니라 calm axis가 있는 도시로 다시 읽게 만듭니다.",
      "routeTitle": "green axis와 meal pocket",
      "routeText": "조젠지도리 같은 calm line과 시장/아케이드 pocket이 같이 있어야 센다이가 살아납니다.",
      "packageTitle": "왜 이 route가 stopover처럼 안 보이는지",
      "packageText": "센다이는 하나의 강한 축과 하나의 meal pocket만 정확해도 도시 성격이 분명해집니다.",
      "branchTitle": "삿포로 또는 서울로 이어 읽기",
      "branchText": "부드러운 북쪽 도시 결을 넓히려면 Sapporo, calm-versus-fast contrast를 보려면 Seoul이 잘 붙습니다."
    },
    "en": {
      "coverTitle": "Sendai calm-city cover",
      "coverText": "This cover reframes Sendai as a city with a calm axis, not just a stopover gap.",
      "routeTitle": "A green line and one meal pocket",
      "routeText": "A calm line like Jozenji-dori and a market pocket help Sendai hold together.",
      "packageTitle": "Why this does not feel like a stopover",
      "packageText": "In Sendai, one strong axis and one meal pocket are often enough to make the city feel complete.",
      "branchTitle": "Continue into Sapporo or Seoul",
      "branchText": "Choose Sapporo to widen the softer north-city read, or Seoul for a calm-versus-fast contrast."
    }
  },
  "okinawa": {
    "ko": {
      "coverTitle": "오키나와 sea-reset cover",
      "coverText": "이 cover는 오키나와를 beach count보다 sea opener와 pause spacing으로 읽게 만드는 버전입니다.",
      "routeTitle": "바다 뒤에 쉬는 구간을 남기기",
      "routeText": "sea scene은 유지하되 drive pause와 resort pocket을 같이 남겨 섬 리듬을 지켰습니다.",
      "packageTitle": "왜 이 route가 덜 피곤한지",
      "packageText": "오키나와는 한 장면을 더 보는 것보다, 멀어지는 이동을 하나 덜어내는 편이 더 큰 차이를 만듭니다.",
      "branchTitle": "제주 또는 타이베이로 이어 읽기",
      "branchText": "다른 island route를 보고 싶다면 Jeju, sea air와 city night contrast를 보고 싶다면 Taipei가 잘 붙습니다."
    },
    "en": {
      "coverTitle": "Okinawa sea-reset cover",
      "coverText": "This cover reads Okinawa through sea openings and pause spacing rather than a higher beach count.",
      "routeTitle": "Leave rest behind the sea scenes",
      "routeText": "The sea stays vivid, but the drive pause and resort pocket keep the island rhythm protected.",
      "packageTitle": "Why this route feels lighter",
      "packageText": "In Okinawa, removing one longer movement often changes the day more than adding one more scenic point.",
      "branchTitle": "Continue into Jeju or Taipei",
      "branchText": "Choose Jeju for another island route, or Taipei if you want a sea-air versus night-city contrast."
    }
  },
  "jeju": {
    "ko": {
      "coverTitle": "제주 one-coast cover",
      "coverText": "이 cover는 제주를 넓게 훑는 도시가 아니라 한 coast line을 더 깊게 남기는 도시로 다시 읽게 만듭니다.",
      "routeTitle": "한쪽 해안축을 더 깊게",
      "routeText": "한 coast line에 무게를 두고 café pause와 dinner close로 route를 단단하게 잡았습니다.",
      "packageTitle": "왜 이 route가 더 제주답게 남는지",
      "packageText": "제주는 더 많이 보는 것보다 한쪽 해안의 tempo를 더 깊게 읽을 때 훨씬 더 또렷하게 남습니다.",
      "branchTitle": "부산 또는 경주로 이어 읽기",
      "branchText": "coast city contrast를 보고 싶다면 Busan, 느린 한국 trip 축을 넓히고 싶다면 Gyeongju가 잘 붙습니다."
    },
    "en": {
      "coverTitle": "Jeju one-coast cover",
      "coverText": "This cover reframes Jeju around one deeper coast line instead of a wider island sweep.",
      "routeTitle": "Read one coast more deeply",
      "routeText": "The route stays tighter by giving more weight to one coast axis, café pauses, and a dinner close.",
      "packageTitle": "Why this feels more like Jeju",
      "packageText": "Jeju usually lingers more clearly when one coast tempo is read deeply instead of everything being covered more widely.",
      "branchTitle": "Continue into Busan or Gyeongju",
      "branchText": "Choose Busan for a coast-city contrast, or Gyeongju if you want to widen the slower Korea-trip axis."
    }
  },
  "gyeongju": {
    "ko": {
      "coverTitle": "경주 dusk-heritage cover",
      "coverText": "이 cover는 경주를 heritage count보다 dusk와 lane rhythm으로 먼저 읽게 만드는 버전입니다.",
      "routeTitle": "유산 뒤에 lane과 dusk를 남기기",
      "routeText": "유적 수를 더하는 대신, quiet lane과 dusk walk가 도시 전체를 묶도록 정리했습니다.",
      "packageTitle": "왜 이 route가 더 오래 남는지",
      "packageText": "경주는 볼거리의 개수보다 느린 템포와 해 질 무렵의 장면을 어떻게 남기느냐가 더 중요합니다.",
      "branchTitle": "교토 또는 부산으로 이어 읽기",
      "branchText": "quiet heritage city 비교가 필요하면 Kyoto, 역사 도시와 coast city 대비가 필요하면 Busan이 잘 붙습니다."
    },
    "en": {
      "coverTitle": "Gyeongju dusk-heritage cover",
      "coverText": "This cover reads Gyeongju through dusk and lane rhythm before a raw heritage count.",
      "routeTitle": "Keep dusk and lanes behind the heritage axis",
      "routeText": "Instead of adding more sites, the route lets quiet lanes and a dusk walk hold the city together.",
      "packageTitle": "Why this route lingers longer",
      "packageText": "In Gyeongju, slower tempo and dusk scenes matter more than a higher sightseeing count.",
      "branchTitle": "Continue into Kyoto or Busan",
      "branchText": "Choose Kyoto for a quieter heritage-city comparison, or Busan for a heritage-versus-coast contrast."
    }
  },
  "macau": {
    "ko": {
      "coverTitle": "마카오 compact-contrast cover",
      "coverText": "이 cover는 마카오를 old core와 bright side가 싸우지 않도록 compact contrast로 읽게 만듭니다.",
      "routeTitle": "짧은 old core, 짧은 bright close",
      "routeText": "heritage walk와 night close를 둘 다 짧고 분명하게 두어 도시 scale을 믿는 쪽으로 정리했습니다.",
      "packageTitle": "왜 이 route가 더 세련되게 남는지",
      "packageText": "마카오는 양쪽을 다 길게 끄는 순간 contrast가 흐려집니다. bridge pocket 하나와 one bright close가 핵심입니다.",
      "branchTitle": "홍콩 또는 타이베이로 이어 읽기",
      "branchText": "vertical harbor night contrast를 보고 싶다면 Hong Kong, greater China night rhythm을 넓히고 싶다면 Taipei가 자연스럽습니다."
    },
    "en": {
      "coverTitle": "Macau compact-contrast cover",
      "coverText": "This cover keeps Macau elegant by reading it as compact contrast instead of letting the old core and bright side compete.",
      "routeTitle": "A short old core and a short bright close",
      "routeText": "The route trusts Macau’s scale by keeping both the heritage walk and the night close short and clear.",
      "packageTitle": "Why this route feels more controlled",
      "packageText": "Macau loses elegance when both sides are stretched too far. One bridge pocket and one bright close are usually enough.",
      "branchTitle": "Continue into Hong Kong or Taipei",
      "branchText": "Choose Hong Kong for a vertical harbor-night contrast, or Taipei to widen the Greater China night rhythm."
    }
  }
};


const priorityCityEntryMap = {
    tokyo:{
      ko:{visitTitle:'Visit split', first:['First-time','Asakusa → Ueno → Kiyosumi','읽기 쉬운 축부터 quiet pocket으로 마감하세요.'], second:['Second-time','Kiyosumi → Jinbocho → Kagurazaka','두 번째라면 재질과 저녁 결이 더 오래 남습니다.'], entries:[['Classic first read','Asakusa → Ueno → Kiyosumi'],['Design-soft read','Daikanyama → Nakameguro → Shibuya late'],['Night-led read','Shinjuku side → Omoide lane → late café']]},
      en:{visitTitle:'Visit split', first:['First-time','Asakusa → Ueno → Kiyosumi','Readable icons first, then one quieter pocket to close the day.'], second:['Second-time','Kiyosumi → Jinbocho → Kagurazaka','On a return trip, let texture and dinner rhythm carry the memory.'], entries:[['Classic first read','Asakusa → Ueno → Kiyosumi'],['Design-soft read','Daikanyama → Nakameguro → Shibuya late'],['Night-led read','Shinjuku side → Omoide lane → late café']]}
    },
    seoul:{
      ko:{visitTitle:'Visit split', first:['First-time','Seongsu → Euljiro → Seochon','대비가 큰 축 뒤에 quieter layer를 꼭 넣으세요.'], second:['Second-time','Mangwon → Seochon → Euljiro late','생활감 있는 동네를 먼저 두면 서울이 덜 전형적으로 남습니다.'], entries:[['Contrast opener','Seongsu → Seoul Forest → Euljiro'],['Soft local opener','Seochon → Bukchon edge → Jongno dinner'],['Night-weight opener','Hannam → Itaewon → Euljiro late']]},
      en:{visitTitle:'Visit split', first:['First-time','Seongsu → Euljiro → Seochon','Use a strong contrast line first, then one quieter district.'], second:['Second-time','Mangwon → Seochon → Euljiro late','A better repeat line when you want daily texture to lead.'], entries:[['Contrast opener','Seongsu → Seoul Forest → Euljiro'],['Soft local opener','Seochon → Bukchon edge → Jongno dinner'],['Night-weight opener','Hannam → Itaewon → Euljiro late']]}
    },
    kyoto:{
      ko:{visitTitle:'Visit split', first:['First-time','Higashiyama early → Gion edge → Kamo dusk','상징적 장면은 이르게, 마감은 dusk로 두세요.'], second:['Second-time','Okazaki → Nishijin → Kamo dusk','다시 간다면 quieter west와 강변이 더 강합니다.'], entries:[['Quiet icon opener','Higashiyama early → Gion → tea pocket'],['River-soft opener','Okazaki → Kamo River → Kawaramachi dinner'],['Second-trip opener','Nishijin → quiet temple pocket → dusk walk']]},
      en:{visitTitle:'Visit split', first:['First-time','Higashiyama early → Gion edge → Kamo dusk','Read the iconic frame early, then close through dusk.'], second:['Second-time','Okazaki → Nishijin → Kamo dusk','Quieter west-side pockets usually land better on a return visit.'], entries:[['Quiet icon opener','Higashiyama early → Gion → tea pocket'],['River-soft opener','Okazaki → Kamo River → Kawaramachi dinner'],['Second-trip opener','Nishijin → quiet temple pocket → dusk walk']]}
    },
    taipei:{
      ko:{visitTitle:'Visit split', first:['First-time','Yongkang → Dihua → one night market','식사와 골목, 시장 하나만 선명하게 두세요.'], second:['Second-time','Chifeng → Treasure Hill → tea room close','두 번째라면 texture와 pause가 더 중요합니다.'], entries:[['Food-first opener','Yongkang → Dongmen → late dessert'],['Texture opener','Dihua → Chifeng → bookshop pocket'],['Second-trip opener','Treasure Hill → river walk → tea room']]},
      en:{visitTitle:'Visit split', first:['First-time','Yongkang → Dihua → one night market','Keep one meal line, one lane read, and one market vivid.'], second:['Second-time','Chifeng → Treasure Hill → tea-room close','On a return visit, texture and pause often matter more than another sprint.'], entries:[['Food-first opener','Yongkang → Dongmen → late dessert'],['Texture opener','Dihua → Chifeng → bookshop pocket'],['Second-trip opener','Treasure Hill → river walk → tea room']]}
    },
    hongkong:{
      ko:{visitTitle:'Visit split', first:['First-time','Central → Sheung Wan → Tsim Sha Tsui night','수직감과 항구 장면이 분명한 축으로 여세요.'], second:['Second-time','Sheung Wan → PMQ/Soho → West Kowloon close','재방문이면 slope와 harbor edge가 더 세게 남습니다.'], entries:[['Vertical opener','Central → Mid-Levels edge → Sheung Wan'],['Harbor opener','Star Ferry → Tsim Sha Tsui → dessert pocket'],['Second-trip opener','Sheung Wan → PMQ/Soho → West Kowloon']]},
      en:{visitTitle:'Visit split', first:['First-time','Central → Sheung Wan → Tsim Sha Tsui night','Open through a clear vertical line and one harbor close.'], second:['Second-time','Sheung Wan → PMQ/Soho → West Kowloon close','Slope streets and harbor edge often land better on a return visit.'], entries:[['Vertical opener','Central → Mid-Levels edge → Sheung Wan'],['Harbor opener','Star Ferry → Tsim Sha Tsui → dessert pocket'],['Second-trip opener','Sheung Wan → PMQ/Soho → West Kowloon']]}
    },
    busan:{
      ko:{visitTitle:'Visit split', first:['First-time','Haeundae → Gwangalli → one night shore','접근 쉬운 바다 축과 밤 장면 하나만 남기세요.'], second:['Second-time','Yeongdo → Nampo/Bosu → Gwangalli close','두 번째라면 harbor-side texture가 더 오래 갑니다.'], entries:[['Sea-first opener','Haeundae → café pocket → Gwangalli night'],['Harbor-texture opener','Nampo → Bosu → Yeongdo edge'],['Second-trip opener','Yeongdo → quiet coast walk → dinner close']]},
      en:{visitTitle:'Visit split', first:['First-time','Haeundae → Gwangalli → one night shore','Keep the first read coast-anchored with one clear night close.'], second:['Second-time','Yeongdo → Nampo/Bosu → Gwangalli close','Harbor texture usually lands better on a repeat visit.'], entries:[['Sea-first opener','Haeundae → café pocket → Gwangalli night'],['Harbor-texture opener','Nampo → Bosu → Yeongdo edge'],['Second-trip opener','Yeongdo → quiet coast walk → dinner close']]}
    },
    fukuoka:{
      ko:{visitTitle:'Visit split', first:['First-time','Hakata → Tenjin → yatai close','짧은 이동과 첫 식사 리듬을 선명하게 두세요.'], second:['Second-time','Yakuin → Ohori edge → compact dinner close','재방문이면 quieter pocket이 더 오래 남습니다.'], entries:[['Food-first opener','Hakata → Tenjin → yatai'],['Soft local opener','Yakuin → café pocket → Ohori edge'],['Second-trip opener','Ohori edge → Yakuin → compact bar close']]},
      en:{visitTitle:'Visit split', first:['First-time','Hakata → Tenjin → yatai close','Keep movement short and the first meal line clear.'], second:['Second-time','Yakuin → Ohori edge → compact dinner close','Quieter everyday pockets usually carry a repeat trip better.'], entries:[['Food-first opener','Hakata → Tenjin → yatai'],['Soft local opener','Yakuin → café pocket → Ohori edge'],['Second-trip opener','Ohori edge → Yakuin → compact bar close']]}
    }
  };
  
  const priorityCityEntryIntlOverrides = {
    ja:{
      tokyo:{visitTitle:'訪問分岐', first:['初回向け','浅草 → 上野 → 清澄','わかりやすい景色から入り、最後に静かなポケットを一つ置くと安定します。'], second:['二回目向け','清澄 → 神保町 → 神楽坂','二度目なら質感と本、夕食のリズムが長く残ります。'], entries:[['王道の最初の一線','浅草 → 上野 → 清澄'],['デザイン寄りの入り方','代官山 → 中目黒 → 渋谷レイト'],['夜から入る線','新宿サイド → 思い出横丁 → レイトカフェ']]},
      seoul:{visitTitle:'訪問分岐', first:['初回向け','聖水 → 乙支路 → 西村','強いコントラストの線のあとに静かな街区を一つ置いてください。'], second:['二回目向け','望遠 → 西村 → 乙支路レイト','暮らしの手触りが前に出る線の方が再訪には合います。'], entries:[['コントラストの入口','聖水 → ソウルの森 → 乙支路'],['ローカル寄りの入口','西村 → 北村の端 → 鍾路ディナー'],['夜を重く置く入口','漢南 → 梨泰院 → 乙支路レイト']]},
      kyoto:{visitTitle:'訪問分岐', first:['初回向け','東山の朝 → 祇園の端 → 鴨川の夕暮れ','象徴的な景色は朝に、締めは夕暮れに置くときれいです。'], second:['二回目向け','岡崎 → 西陣 → 鴨川の夕暮れ','再訪なら静かな西側と川辺の方が強く残ります。'], entries:[['静かなアイコンの入口','東山の朝 → 祇園 → 茶のポケット'],['川沿いから入る線','岡崎 → 鴨川 → 河原町ディナー'],['再訪向けの入口','西陣 → 静かな寺のポケット → 夕暮れ歩き']]},
      taipei:{visitTitle:'訪問分岐', first:['初回向け','永康 → 迪化 → ナイトマーケット一つ','食事と路地、市場を一つだけはっきり置くのが合います。'], second:['二回目向け','赤峰 → 宝蔵巖 → 茶室で締める','再訪なら質感と pause の方が効きます。'], entries:[['food-first の入口','永康 → 東門 → 遅いデザート'],['質感から入る線','迪化 → 赤峰 → 本屋ポケット'],['再訪向けの入口','宝蔵巖 → 川辺散歩 → 茶室']]},
      hongkong:{visitTitle:'訪問分岐', first:['初回向け','Central → Sheung Wan → 尖沙咀の夜','縦の圧縮感と港の景色がはっきりした線で開くのがいちばん簡単です。'], second:['二回目向け','Sheung Wan → PMQ/Soho → West Kowloon close','再訪なら坂道と港の縁が skyline より強く残ります。'], entries:[['縦に入る入口','Central → Mid-Levels edge → Sheung Wan'],['ハーバーから入る線','Star Ferry → 尖沙咀 → デザートポケット'],['再訪向けの入口','Sheung Wan → PMQ/Soho → West Kowloon']]},
      busan:{visitTitle:'訪問分岐', first:['初回向け','海雲台 → 広安里 → 夜の海辺一つ','最初は海の線を軸にして、夜景は一つだけ強く残してください。'], second:['二回目向け','影島 → 南浦/宝水 → 広安里 close','再訪なら harbor-side の質感の方が長く残ります。'], entries:[['海から入る入口','海雲台 → カフェポケット → 広安里の夜'],['港の質感から入る線','南浦 → 宝水 → 影島の端'],['再訪向けの入口','影島 → 静かな海辺散歩 → 夕食で締める']]},
      fukuoka:{visitTitle:'訪問分岐', first:['初回向け','博多 → 天神 → 屋台で締める','移動を短くし、最初の食事のリズムをくっきり置くと良いです。'], second:['二回目向け','薬院 → 大濠の端 → コンパクトな夕食 close','再訪なら静かな pocket の方が長く残ります。'], entries:[['food-first の入口','博多 → 天神 → 屋台'],['soft local の入口','薬院 → カフェポケット → 大濠の端'],['再訪向けの入口','大濠の端 → 薬院 → コンパクトなバー close']]}
    },
    zhHant:{
      tokyo:{visitTitle:'造訪分流', first:['第一次','淺草 → 上野 → 清澄','先從好理解的景色進去，最後留一個安靜口袋會最穩。'], second:['第二次','清澄 → 神保町 → 神樂坂','第二次時，質感、書店與晚餐節奏會留得更久。'], entries:[['經典第一次讀法','淺草 → 上野 → 清澄'],['設計感柔和讀法','代官山 → 中目黑 → 晚一點的澀谷'],['夜晚起手線','新宿一側 → 思い出横丁 → 深夜咖啡']]},
      seoul:{visitTitle:'造訪分流', first:['第一次','聖水 → 乙支路 → 西村','先用對比強的線打開，再插入一個安靜街區。'], second:['第二次','望遠 → 西村 → 晚一點的乙支路','再訪時，由生活感帶路會更耐看。'], entries:[['對比感起手','聖水 → 首爾林 → 乙支路'],['柔和在地起手','西村 → 北村邊緣 → 鍾路晚餐'],['夜晚加重起手','漢南 → 梨泰院 → 晚一點的乙支路']]},
      kyoto:{visitTitle:'造訪分流', first:['第一次','東山清晨 → 祇園邊緣 → 鴨川黃昏','象徵場景放在早段，黃昏收尾會更乾淨。'], second:['第二次','岡崎 → 西陣 → 鴨川黃昏','再訪時，安靜西側與河邊通常更有後勁。'], entries:[['安靜經典起手','東山清晨 → 祇園 → 茶室口袋'],['河邊柔和起手','岡崎 → 鴨川 → 河原町晚餐'],['再訪起手線','西陣 → 安靜寺院口袋 → 黃昏散步']]},
      taipei:{visitTitle:'造訪分流', first:['第一次','永康 → 迪化 → 一個夜市','只把食物、巷子與一個夜市講清楚就很夠。'], second:['第二次','赤峰 → 寶藏巖 → 茶室收尾','再訪時，質感與 pause 比再衝一次清單更重要。'], entries:[['food-first 起手','永康 → 東門 → 晚一點的甜點'],['質感起手線','迪化 → 赤峰 → 書店口袋'],['再訪起手線','寶藏巖 → 河邊散步 → 茶室']]},
      hongkong:{visitTitle:'造訪分流', first:['第一次','中環 → 上環 → 尖沙咀夜晚','用垂直感與港口畫面都很鮮明的線打開最容易。'], second:['第二次','上環 → PMQ/Soho → 西九龍收尾','再訪時，坡道與港邊比 skyline 更有後勁。'], entries:[['垂直感起手','中環 → 半山邊緣 → 上環'],['港口起手線','天星小輪 → 尖沙咀 → 甜點口袋'],['再訪起手線','上環 → PMQ/Soho → 西九龍']]},
      busan:{visitTitle:'造訪分流', first:['第一次','海雲台 → 廣安里 → 一個夜晚海岸','第一次先用海岸線打開，再留一個清楚夜景就夠了。'], second:['第二次','影島 → 南浦/寶水 → 廣安里收尾','再訪時，港邊質地通常更耐記。'], entries:[['海岸起手','海雲台 → 咖啡口袋 → 廣安里夜晚'],['港口質感起手','南浦 → 寶水 → 影島邊緣'],['再訪起手線','影島 → 安靜海邊散步 → 晚餐收尾']]},
      fukuoka:{visitTitle:'造訪分流', first:['第一次','博多 → 天神 → 屋台收尾','讓移動短一點、第一餐節奏清楚一點最合適。'], second:['第二次','藥院 → 大濠邊緣 → 緊湊晚餐收尾','再訪時，安靜 pocket 比屋台熱鬧更耐留。'], entries:[['food-first 起手','博多 → 天神 → 屋台'],['soft local 起手','藥院 → 咖啡口袋 → 大濠邊緣'],['再訪起手線','大濠邊緣 → 藥院 → 緊湊酒吧收尾']]}
    }
  };

  function mergeEntryPack(base = {}, override = {}){
    return {
      ...base,
      ...override,
      first: override.first || base.first,
      second: override.second || base.second,
      entries: override.entries || base.entries
    };
  }


  const secondaryCityThinEntryMap = {
    osaka:{ko:{visitTitle:'Visit lens', first:['First trip','Namba → Dotonbori','식사 라인과 밤 장면 하나만 선명하게.'], second:['Return trip','Nakanoshima → Utsubo','재방문이면 quieter west pocket이 좋습니다.'], entries:[['Food-first','Namba → Dotonbori'],['Softer','Nakanoshima → Utsubo']]}, en:{visitTitle:'Visit lens', first:['First trip','Namba → Dotonbori','Keep one meal line and one late scene clear.'], second:['Return trip','Nakanoshima → Utsubo','A quieter west-side pocket often lands better on a return.'], entries:[['Food-first','Namba → Dotonbori'],['Softer','Nakanoshima → Utsubo']]}}
    ,sapporo:{ko:{visitTitle:'Visit lens', first:['First trip','Odori → Susukino','중심 축을 짧고 분명하게.'], second:['Return trip','Maruyama → café pocket','조금 더 느린 pocket이 좋습니다.'], entries:[['Central','Odori → Susukino'],['Soft','Maruyama → café pocket']]}, en:{visitTitle:'Visit lens', first:['First trip','Odori → Susukino','Keep the central line short and readable.'], second:['Return trip','Maruyama → café pocket','A softer neighborhood layer often lands better on a return.'], entries:[['Central','Odori → Susukino'],['Soft','Maruyama → café pocket']]}}
    ,sendai:{ko:{visitTitle:'Visit lens', first:['First trip','Station → arcade','중심 축부터 가볍게.'], second:['Return trip','Jozenji-dori → river edge','조용한 북측 pace가 더 잘 남습니다.'], entries:[['Centre','Station → arcade'],['Calm','Jozenji-dori → river edge']]}, en:{visitTitle:'Visit lens', first:['First trip','Station → arcade','Open through the clearest central line first.'], second:['Return trip','Jozenji-dori → river edge','A slower north-side rhythm often lands better on a return.'], entries:[['Centre','Station → arcade'],['Calm','Jozenji-dori → river edge']]}}
    ,okinawa:{ko:{visitTitle:'Visit lens', first:['First trip','Coast drive → beach stop','바다 축을 먼저.'], second:['Return trip','Yomitan → slower dusk','느린 pocket이 더 좋습니다.'], entries:[['Coast','Coast drive → beach'],['Slow','Yomitan → dusk']]}, en:{visitTitle:'Visit lens', first:['First trip','Coast drive → beach stop','Open through the sea line first.'], second:['Return trip','Yomitan → slower dusk','A slower local pocket often lands better.'], entries:[['Coast','Coast drive → beach'],['Slow','Yomitan → dusk']]}}
    ,jeju:{ko:{visitTitle:'Visit lens', first:['First trip','Aewol → coast café','해안 결을 하나만 선명하게.'], second:['Return trip','village pocket → slower west','느린 리셋이 더 중요합니다.'], entries:[['Coast','Aewol → coast café'],['Reset','village pocket → west']]}, en:{visitTitle:'Visit lens', first:['First trip','Aewol → coast café','Keep one coast line vivid.'], second:['Return trip','village pocket → slower west','A slower reset often matters more.'], entries:[['Coast','Aewol → coast café'],['Reset','village pocket → west']]}}
    ,gyeongju:{ko:{visitTitle:'Visit lens', first:['First trip','Daereungwon → museum edge','유산 축부터 가볍게.'], second:['Return trip','Hwangnidan-gil → quiet lane','조용한 lane rhythm이 더 좋습니다.'], entries:[['Heritage','Daereungwon → museum edge'],['Quiet','Hwangnidan-gil → lane walk']]}, en:{visitTitle:'Visit lens', first:['First trip','Daereungwon → museum edge','Open through the clearest heritage line.'], second:['Return trip','Hwangnidan-gil → quiet lane','Quieter lanes usually carry more memory.'], entries:[['Heritage','Daereungwon → museum edge'],['Quiet','Hwangnidan-gil → lane walk']]}}
    ,macau:{ko:{visitTitle:'Visit lens', first:['First trip','Ruins edge → Senado','old lane과 밤 장면 하나만.'], second:['Return trip','Taipa → softer lane','조금 더 compact한 축이 좋습니다.'], entries:[['Old-lane','Ruins edge → Senado'],['Taipa','Taipa → softer lane']]}, en:{visitTitle:'Visit lens', first:['First trip','Ruins edge → Senado','Keep one old-lane line vivid.'], second:['Return trip','Taipa → softer lane','A looser Taipa route often lands better.'], entries:[['Old-lane','Ruins edge → Senado'],['Taipa','Taipa → softer lane']]}}
  };

function getPriorityEntryPack(city=''){
    const slug = String(city || '').trim().toLowerCase();
    const entry = priorityCityEntryMap[slug] || secondaryCityThinEntryMap[slug];
    if (!entry) return null;
    const lang = window.RyokoApp?.lang || 'ko';
    return entry[lang] || entry.en || entry.ko;
  }

  function renderEntryRouteMiniBlock(city='', mode='default'){
    const pack = getPriorityEntryPack(city);
    if (!pack) return '';
    const compact = mode === 'compact';
    return `<div class="entry-mini-block ${compact ? 'entry-mini-block-compact' : ''}">
      <div class="entry-mini-head"><strong>${pack.visitTitle || uiCopy('Visit lens','Visit lens','訪問レンズ','造訪視角')}</strong></div>
      <div class="entry-mini-row">
        <span class="entry-mini-label">${pack.first?.[0] || uiCopy('First trip','First trip','初回','初訪')}</span>
        <span class="entry-mini-value">${pack.first?.[1] || ''}</span>
      </div>
      <div class="entry-mini-row">
        <span class="entry-mini-label">${pack.second?.[0] || uiCopy('Return trip','Return trip','再訪','再訪')}</span>
        <span class="entry-mini-value">${pack.second?.[1] || ''}</span>
      </div>
      <div class="entry-mini-route-list">${(pack.entries || []).slice(0, compact ? 2 : 3).map(item => `<span class="entry-mini-chip">${item[0]} · ${item[1]}</span>`).join('')}</div>
    </div>`;
  }
function getPriorityRefinePack(city=''){
    const slug = String(city || '').trim().toLowerCase();
    const entry = priorityCityRefineMap[slug];
    if (!entry) return null;
    const lang = window.RyokoApp?.lang || 'ko';
    return entry[lang] || entry.en || entry.ko;
  }

  function summarizeRouteShape(data){
    const days = Array.isArray(data.days) ? data.days.length : 0;
    const placeCount = (data.days || []).reduce((acc, day) => acc + normalizePlaces(day).length, 0);
    if (!days) return 'A compact route with one clear anchor per day';
    if (days <= 2) return `${days} focused day${days > 1 ? 's' : ''} with ${placeCount || 'a few'} easy stops`;
    if (days <= 4) return `${days} editorial days with clear anchors and softer pockets`;
    return `${days} days layered with readable movement and lighter resets`;
  }
  function buildEditorNote(data){
    const lang = window.RyokoApp?.lang || 'ko';
    const firstTip = Array.isArray(data.localTips) && data.localTips[0] ? textValue(data.localTips[0], '') : '';
    const opening = textValue(data.days?.[0]?.title, uiCopy('첫날은 일부러 조금 더 부드럽게 열어 두었습니다.', 'The opening day stays intentionally gentle', '初日はあえて少しやわらかく始まるように整えています。', '第一天刻意留得更柔和一些，讓整體節奏自然展開。'));
    const ending = textValue(data.days?.[data.days.length - 1]?.title, uiCopy('마지막 구간은 가볍게 닫히도록 남겨 두었습니다.', 'the final stretch stays light', '終盤は軽く締められるように残しています。', '最後一段則保留得更輕一些，讓行程自然收束。'));
    if (firstTip) return firstTip;
    if (lang === 'ko') return `${opening}에서 시작해 전체 리듬이 무리 없이 자리 잡고, ${ending.replace(/\.$/, '')} 쪽으로 마무리되도록 정리했습니다.`;
    if (lang === 'ja') return `${opening}から入り、全体の流れが無理なく整い、${ending.replace(/\.$/, '')}ように編集しています。`;
    if (lang === 'zhHant') return `從${opening.replace(/。$/, '')}開始，讓整體節奏自然站穩，最後再以${ending.replace(/。$/, '')}的方式收尾。`;
    return `${opening} so the route settles in smoothly, and ${ending.toLowerCase()} instead of feeling overloaded.`;
  }

  function resultCopy(){
    return {
      signalTitle: uiCopy('지금 리듬에 더 잘 맞는 베이스', 'Better bases for this rhythm', 'この流れに合う次のベース', '更適合這個節奏的下一個起點'),
      signalDesc: uiCopy('비, 부모님 동행, 늦은 밤, 푸드 중심 같은 신호를 기준으로 다음 베이스를 다시 고를 수 있게 묶었습니다.', 'Grouped around signals like rain, parents, late nights, or food-led pacing so the next base feels more intentional.', '雨・親との同行・深夜の流れ・食重視などの条件から、次のベースを選び直しやすくまとめました。', '以雨天、與父母同行、夜晚節奏、以美食為主等訊號重新整理，讓下一個 base 更好選。'),
      signalEyebrow: uiCopy('Signal-aware picks','Signal-aware picks','Signal-aware picks','Signal-aware picks'),
      cityGuide: uiCopy('도시 가이드','City guide','城市ガイド','城市指南'),
      sampleRoute: uiCopy('샘플 루트','Sample route','範例路線','示範路線'),
      nextLoopEyebrow: uiCopy('다음 액션 루프','Next step loop','次のアクションループ','下一步循環'),
      nextLoopTitle: uiCopy('한 번의 결과에서 끝내지 마세요', 'Keep the route moving after this result', 'この結果で止めずに、次へつなげましょう', '別停在這一次的結果，讓路線繼續往下走'),
      nextLoopDesc: uiCopy('연결된 도시를 더 읽고, 저장한 루트를 다시 열고, 샘플 루트까지 이어서 볼 수 있게 정리했습니다.', 'Read a related city, reopen a saved route, or move into a sample route to keep the Ryokoplan flow going.', 'つながる都市を読み、保存したルートを開き直し、サンプルルートへ続けられるように整えています。', '你可以繼續讀相關城市、重新打開已存路線，或接著看示範路線，讓 Ryokoplan 的流動不中斷。'),
      keepLoop: uiCopy('다음 루프로','Keep the loop going','次のループへ','接著往下一個循環'),
      openRecent: uiCopy('최근 루트 열기','Open recent route','最近のルートを開く','打開最近路線'),
      openTrips: uiCopy('My Trips 열기','Open My Trips','My Trips を開く','打開 My Trips'),
      readGuide: uiCopy('도시 가이드 읽기','Read guide','ガイドを読む','閱讀指南'),
      routeNote: uiCopy('비주얼 루트 노트', 'Visual route notes', 'ビジュアルルートノート', '視覺路線筆記'),
      routeNoteDesc: uiCopy('도시 커버, 이번 루트의 분위기, 그리고 다음으로 가지를 칠 수 있는 도시까지 한 번에 보여줍니다.', 'A city cover, one route mood frame, and one next branch keep the result from reading like a plain checklist.', '都市カバー、今回のルートの空気、次に枝分かれできる都市まで、一度に読めるように見せます。', '把城市封面、這次路線的氣氛，以及下一個可延伸的城市，一次整理給你看。'),
      sampleRead: uiCopy('샘플 보기', 'Read sample route', 'サンプルを見る', '查看範例'),
      plannerBase: uiCopy('루트 베이스', 'Route base', 'ルートのベース', '路線 base'),
      nextCity: uiCopy('다음 도시', 'Next city', '次の都市', '下一座城市'),
      sharedKicker: uiCopy('공유받은 일정','Shared trip','共有ルート','分享行程'),
      sharedTitle: uiCopy('공유된 루트에서 바로 시작했어요', 'You started from a shared route', '共有ルートからこの旅を始めました', '你是從分享路線開始這段旅程的'),
      sharedDesc: uiCopy('공유 링크로 들어온 일정입니다. 그대로 저장하거나, 내 취향에 맞게 다시 다듬을 수 있어요.', 'This route came in through a shared link. Keep it, save it, or reshape it into your own version.', '共有リンクから開いたルートです。このまま保存しても、自分の旅に合わせて整え直しても大丈夫です。', '這條路線是從分享連結打開的。你可以直接保存，也可以依自己的節奏重新整理。'),
      openGuide: uiCopy('도시 가이드 보기','Read guide','ガイドを見る','查看指南'),
      saveTrip: uiCopy('여정 저장','Save Trip','旅程を保存','保存旅程'),
      useThisRoute: uiCopy('이 루트로 시작','Use this route','このルートを使う','使用這條路線'),
      routeLoopEyebrow: uiCopy('루트 루프','Route loop','ルートループ','路線循環'),
      routeLoopTitle: uiCopy('atlas에서 결과까지, 이 흐름을 다시 이어가세요', 'Keep the full flow moving from atlas to result', 'atlas から結果まで、この流れをもう一度つなげましょう', '從 atlas 到結果，讓這個流程繼續接回去'),
      routeLoopDesc: uiCopy('지금 결과를 끝으로 두지 않고, city atlas·도시 가이드·sample route·route desk를 다시 오가며 더 좋은 다음 루트를 만들 수 있게 묶었습니다.', 'Do not stop at this result. Move back through the city atlas, the city guide, the sample route, and the route desk to shape the next version with better context.', 'この結果で止まらず、city atlas・都市ガイド・sample route・route desk を行き来しながら、次のルートをもっと良い文脈で整えられるようにつなげています。', '別停在這個結果。你可以回到 city atlas、城市指南、sample route 與 route desk 之間來回閱讀，整理出下一版更有脈絡的路線。'),
      atlas: uiCopy('atlas', 'Atlas', 'atlas', 'atlas'),
      neighborhoods: uiCopy('동네 픽', 'Neighborhood picks', '近所のピック', '鄰里精選'),
      routeResult: uiCopy('현재 결과', 'Current result', '今の結果', '目前結果'),
      backToAtlas: uiCopy('atlas로 돌아가기', 'Back to atlas', 'atlas に戻る', '回到 atlas'),
      readCityLayer: uiCopy('도시 결 더 읽기', 'Read city guide layer', '都市の層を読む', '繼續讀城市層次'),
      compareExample: uiCopy('샘플과 비교하기', 'Compare example', 'サンプルと比べる', '對照範例'),
      tunePlanner: uiCopy('이 루트 더 다듬기', 'Refine this route', 'このルートを整える', '微調這條路線'),
      continueResult: uiCopy('결과로 돌아오기', 'Return to result', '結果へ戻る', '回到結果'),
      matchingTitle: uiCopy('이 결과와 잘 붙는 다음 읽기', 'What fits this result next', 'この結果に続けて読みたいもの', '最適合接著讀的下一步'),
      matchingDesc: uiCopy('같은 도시의 guide와 example, 그리고 비슷한 결의 도시를 함께 보여줘 다음 클릭이 자연스럽게 이어지게 했습니다.', 'A matching city guide, example, and a related city sit together here so the next click feels obvious.', '同じ都市の guide と example、そして近いトーンの都市を並べて、次のクリックが自然につながるようにしました。', '把同城市的 guide 與 example，加上調性相近的城市放在一起，讓下一次點擊更自然。'),
      matchingEyebrow: uiCopy('추천 흐름', 'Suggested next reads', 'おすすめの流れ', '推薦流程'),
      sameCityGuideDesc: uiCopy('결과에 쓰인 동네 결을 도시 가이드에서 더 깊게 읽습니다.', 'Read the same neighborhood logic in the city guide with more depth.', 'この結果で使った近所のロジックを、都市ガイドでもっと深く読めます。', '把這次結果用到的鄰里邏輯，在城市指南裡讀得更深。'),
      sameCityExampleDesc: uiCopy('같은 도시의 샘플과 나란히 놓고 속도나 톤 차이를 비교합니다.', 'Put this beside a sample of the same city and compare the pace or tone.', '同じ都市のサンプルと並べて、速度感やトーンの違いを比べられます。', '把它和同城市範例並排比較，看看節奏和調性的差異。'),
      neighborhoodDesc: uiCopy('가이드 안의 동네 픽에서 어디를 더 깊게 읽을지 바로 이어집니다.', 'Jump straight into the neighborhood picks inside the city guide.', '都市ガイド内の近所のピックへ、そのまま続けて読めます。', '可直接接到城市指南裡的鄰里精選，決定下一步往哪裡讀。'),
      relatedCityDesc: uiCopy('비슷한 결을 가진 다른 도시로 가지를 치며 다음 루트를 넓혀 봅니다.', 'Branch into a related city when you want the next route to keep a similar tone.', '近いトーンの別都市へ枝分かれして、次のルートを広げられます。', '當你想讓下一條路線保留相近調性時，可以延伸到相關城市。')
    };
  }


  function getPriorityResultHeroPack(city=''){
    const slug = String(city || '').trim().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
    const entry = priorityResultHeroPackMap[slug];
    if (!entry) return null;
    const lang = window.RyokoApp?.lang || 'ko';
    return entry[lang] || entry.en || entry.ko || null;
  }

  function getPriorityResultMicroBriefPack(city=''){
    const slug = String(city || '').trim().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
    const entry = priorityResultMicroBriefMap[slug];
    if (!entry) return null;
    const lang = window.RyokoApp?.lang || 'ko';
    return entry[lang] || entry.en || entry.ko || null;
  }

  function getPriorityResultVisualStoryPack(city=''){
    const slug = String(city || '').trim().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
    const entry = priorityResultVisualStoryMap[slug];
    if (!entry) return null;
    const lang = window.RyokoApp?.lang || 'ko';
    return entry[lang] || entry.en || entry.ko || null;
  }


  const priorityResultDayPolishMap = {
    osaka: {
      ko:[
        { title:'난바 food axis로 첫 장면을 여는 날', intro:'난바 한 축만 먼저 붙잡고, 긴 줄 하나보다 두세 번의 짧은 식사 장면으로 오사카의 템포를 엽니다.', localTip:'도톤보리 전체를 길게 끌기보다 난바 코어 한 구역만 또렷하게 남기면 첫날 피로가 훨씬 덜합니다.' },
        { title:'우메다 reset 뒤 작은 밤 장면을 남기는 날', intro:'낮엔 우메다와 나카자키초 쪽으로 숨을 고르고, 밤엔 메인 스트립 전체가 아니라 작은 골목 하나만 선명하게 남깁니다.', localTip:'비 오는 날엔 arcade와 실내 상가를 먼저 쓰고, 밤 장면은 bar lane이나 dessert close 하나로 줄이는 편이 좋습니다.' },
        { title:'간식과 역 동선으로 가볍게 닫는 마지막 날', intro:'마지막 날은 역 근처 간식과 짧은 쇼핑 정도로만 정리해 food trip의 밀도를 흐리지 않습니다.', localTip:'출발 전 마지막 식사는 긴 대기보다 회전 빠른 local spot이 전체 리듬을 더 깨끗하게 지켜줍니다.' }
      ],
      en:[
        { title:'A first day that opens through the Namba food axis', intro:'Open Osaka through one Namba line first, using two or three shorter meal scenes instead of one exhausting queue.', localTip:'If you keep the first day inside one tighter Namba core, Osaka lands with much less fatigue.' },
        { title:'A Umeda reset before one smaller late-night lane', intro:'Lower the middle of the day through Umeda and Nakazakicho, then leave only one smaller lane vivid at night instead of dragging the whole main strip.', localTip:'On rainy days, let arcades and indoor malls lead, then reduce the late-night close to one dessert stop or bar lane.' },
        { title:'A lighter final day built around snacks and station logic', intro:'Use the final hours for one practical snack stop, shorter shopping, and an easy station-side close so the food-trip density stays intact.', localTip:'Before departure, a faster local counter usually protects the tone better than one last famous queue.' }
      ],
      ja:[
        { title:'難波の food axis で開く最初の日', intro:'最初は難波の一本だけを深く読み、長い行列一つより短い食事シーンを二つ三つ置いて Osaka のテンポを開きます。', localTip:'初日を難波のコアに絞るほど、Osaka は疲れずに強く残ります。' },
        { title:'梅田の reset と小さな夜の路地', intro:'昼は梅田と中崎町で少し呼吸を入れ、夜はメインストリップ全部ではなく小さな路地を一つだけ残します。', localTip:'雨の日は arcade と屋内モールを前に出し、夜の締めは dessert か bar lane 一つで十分です。' },
        { title:'駅まわりで軽く閉じる最後の日', intro:'最終日は駅まわりの軽い食事と短い買い物だけにして、food trip の密度を濁らせないように閉じます。', localTip:'出発前は有名店の長い列より、回転の早い local counter の方が全体のリズムを守れます。' }
      ],
      zhHant:[
        { title:'用 Namba food axis 打開的第一天', intro:'先只把 Namba 這一條軸線讀深，與其排一條很長的隊，不如用兩三段短一點的食物場景打開 Osaka 的節奏。', localTip:'第一天越集中在 Namba 核心，Osaka 越容易留下清楚而不疲倦的第一印象。' },
        { title:'Umeda reset 之後只留一條小夜巷', intro:'白天用 Umeda 和 Nakazakicho 把節奏放鬆一點，晚上不要整條主街都拉滿，只留一條小巷夜景就夠。', localTip:'雨天先把 arcade 和室內商場放前面，夜裡只用 dessert 或 bar lane 收尾就很好。' },
        { title:'用小吃和車站節奏輕輕收尾的最後一天', intro:'最後一天只留車站附近的小吃、短購物和輕收尾，別把這趟 food trip 的密度沖散。', localTip:'出發前與其排最後一條名店長隊，不如去一間翻桌快的 local counter，更能守住節奏。' }
      ]
    },
    sapporo: {
      ko:[
        { title:'오도리의 넓이와 따뜻한 저녁으로 시작하는 날', intro:'오도리 축으로 도시의 넓이를 먼저 읽고, 따뜻한 저녁 한 끼로 겨울 도시의 첫 인상을 안정적으로 잡습니다.', localTip:'삿포로는 첫날에 넓은 블록을 너무 많이 걷기보다 중심축 하나와 warm meal 하나를 좋게 잡는 편이 낫습니다.' },
        { title:'겨울 공기와 quieter side를 같이 읽는 날', intro:'낮엔 넓은 축을 짧게 읽고 마루야마 같은 quieter side를 끼운 뒤, 밤엔 스스키노 장면 하나만 선명하게 남깁니다.', localTip:'눈이나 비가 강해지면 지하 상가, indoor view, café pocket을 끼워 겨울 도시 리듬이 끊기지 않게 하세요.' },
        { title:'카페와 market pocket으로 깨끗하게 닫는 마지막 날', intro:'마지막 날은 카페나 market pocket 정도만 붙이고 짧게 닫아 삿포로의 겨울 공기를 흐리지 않습니다.', localTip:'출발일엔 한 끼를 길게 잡기보다 역 접근이 쉬운 market pocket 하나가 더 잘 맞습니다.' }
      ],
      en:[
        { title:'A first day built on Odori width and one warm dinner', intro:'Read Sapporo’s width through the Odori axis first, then let one warm dinner set the winter-city tone cleanly.', localTip:'Sapporo usually lands better when day one protects one central axis and one warm meal instead of too many wide-block walks.' },
        { title:'A winter day with one quieter side in the middle', intro:'Keep the wider axis brief, add a quieter side such as Maruyama, and leave only one Susukino scene vivid at night.', localTip:'When snow or rain rises, use underground malls, indoor viewpoints, and one café pocket to keep the winter rhythm intact.' },
        { title:'A clean final day through cafés and market pockets', intro:'Close through one café or market pocket only, then leave early enough that the winter air stays crisp instead of overworked.', localTip:'On departure day, a practical market stop often works better than one last long sit-down meal.' }
      ]
    },
    sendai: {
      ko:[
        { title:'도심에 조용히 적응하는 첫날', intro:'역과 아케이드 축으로 도심에 가볍게 적응하고, 첫 저녁을 조용하게 닫아 센다이의 calm tone을 잡습니다.', localTip:'센다이는 첫날부터 headline spot을 많이 넣기보다 도심 적응과 식사 리듬을 먼저 안정시키는 편이 좋습니다.' },
        { title:'green line과 market pause가 중심이 되는 날', intro:'조젠지도리 같은 green line을 한 번 깊게 읽고, market pocket과 느린 식사로 하루를 과하게 밀지 않습니다.', localTip:'비 오는 날엔 강변보다 아케이드와 café pocket 비중을 높이면 센다이의 calm flow가 더 잘 유지됩니다.' },
        { title:'한 동네와 짧은 커피로 마무리하는 마지막 날', intro:'마지막 날은 강한 장면보다 한 동네와 짧은 커피 정도만 남겨 센다이의 pause를 지킵니다.', localTip:'출발 전엔 마지막 한 장면을 더 넣는 것보다 station-side 정리를 일찍 시작하는 편이 전체 인상에 더 좋습니다.' }
      ],
      en:[
        { title:'A first day that settles downtown quietly', intro:'Ease into Sendai through the station and arcade axis, then close the first evening quietly so the calm tone arrives early.', localTip:'Sendai works better when the first day stabilizes downtown rhythm instead of chasing too many headline stops.' },
        { title:'A day held together by one green line and a market pause', intro:'Read one green line such as Jozenji-dori more deeply, then hold the day together with a market pocket and a slower meal.', localTip:'When rain comes in, increase the arcade and café share instead of leaning harder on the river route.' },
        { title:'A final day shaped by one soft neighborhood and coffee', intro:'Leave one softer neighborhood and a short coffee stop for the final hours instead of forcing one more headline scene.', localTip:'Before departure, starting station-side logistics earlier usually protects the city impression more than squeezing in one last detour.' }
      ]
    },
    okinawa: {
      ko:[
        { title:'해안선 하나와 휴식으로 적응하는 첫날', intro:'도착일엔 해변 수를 늘리지 말고 coast 하나와 쉬는 시간만 남겨 섬의 템포에 먼저 적응합니다.', localTip:'첫날부터 여러 해변을 건드리기보다 숙소 근처 coast line 하나와 early dinner 정도가 가장 안정적입니다.' },
        { title:'맑은 시간대를 바다에 주는 날', intro:'맑은 시간대를 바다에 주고, 이동 횟수는 줄여 오키나와의 색과 바람을 길게 남깁니다.', localTip:'해가 강한 날은 midday move를 줄이고 dusk sea 쪽으로 무게를 옮기면 훨씬 더 island-like하게 남습니다.' },
        { title:'드라이브와 resort pause가 중심이 되는 날', intro:'드라이브를 하루의 전부로 만들지 말고 긴 점심과 resort pause를 같이 넣어 sea-reset 구조를 완성합니다.', localTip:'비나 바람이 강해지면 해변 수를 빠르게 줄이고 café/resort pocket 비중을 더 높이세요.' },
        { title:'마지막 풍경 하나만 남기고 닫는 날', intro:'마지막 날은 브런치나 짧은 바다 장면 하나만 두고 부드럽게 닫아 섬의 공기를 지켜둡니다.', localTip:'출발일엔 욕심내서 한 방향을 더 돌기보다 공항 동선 안쪽의 마지막 view 하나가 더 잘 맞습니다.' }
      ],
      en:[
        { title:'An arrival day built on one coast and real rest', intro:'On arrival day, keep only one coast scene plus real rest so you adjust to the island tempo before trying to cover it.', localTip:'One nearby coast line and an early dinner usually work better than touching several beaches immediately.' },
        { title:'A sea day that gives the clearest hours to the coast', intro:'Give the clearest hours to the sea, then reduce transfer count so Okinawa’s color and wind stay in the route longer.', localTip:'On brighter days, cutting midday moves and shifting weight toward dusk sea often makes the island feel much more itself.' },
        { title:'A drive day anchored by lunch and a resort pause', intro:'Do not let the drive become the whole day; anchor it with one long lunch and a resort pause so the sea-reset structure holds.', localTip:'If rain or wind rises, cut beach count quickly and expand cafés or resort pockets instead.' },
        { title:'A final day that leaves only one last view', intro:'Close with brunch or one short sea scene only, then leave gently enough that the island air still lingers.', localTip:'On departure day, one last airport-side view often works better than trying to force one more big loop.' }
      ]
    },
    jeju: {
      ko:[
        { title:'서쪽 coast와 카페 하나로 여는 첫날', intro:'서쪽 coast 한 축과 카페 하나만 또렷하게 두고, 제주의 바람에 먼저 적응하는 식으로 시작합니다.', localTip:'첫날은 오름이나 실외 포인트를 여러 개 넣기보다 coast line 하나와 café pocket 하나가 훨씬 제주답습니다.' },
        { title:'풍경과 긴 점심을 같이 남기는 날', intro:'남쪽 scenic core를 깊게 읽되, 풍경 사이에 긴 점심과 쉬는 pocket을 넣어 제주를 checklist로 만들지 않습니다.', localTip:'맑은 날엔 scenic drive를 길게 쓰고, 바람이 거세면 café와 bakery pocket 쪽으로 빠르게 전환하는 편이 좋습니다.' },
        { title:'바람을 보며 방향 하나만 고르는 마지막 날', intro:'마지막 날은 바람과 날씨를 보고 한 방향만 짧게 읽은 뒤 부드럽게 빠져나옵니다.', localTip:'출발 전 마지막 장면은 욕심내기보다 숙소나 공항 동선과 잘 붙는 coast stop 하나가 가장 안정적입니다.' }
      ],
      en:[
        { title:'A first day opened by one west-coast line and one café', intro:'Open Jeju through one west-coast line and one café only, using the arrival day to adjust to wind and island pace.', localTip:'On day one, one coast line plus one café pocket usually feels more like Jeju than several outdoor anchors.' },
        { title:'A scenic day held together by one longer lunch', intro:'Read the south scenic core more deeply, but hold the day together with one longer lunch and a real reset pocket so Jeju never turns into a checklist.', localTip:'On clear days, stretch the scenic drive; when wind rises, pivot more quickly into cafés, bakeries, or indoor pockets.' },
        { title:'A final morning guided by wind and one direction only', intro:'Let the final morning follow the wind and weather, choose only one direction, then leave softly instead of squeezing in one more circuit.', localTip:'Before departure, one coast stop that sits neatly on the airport line usually works better than one last ambitious detour.' }
      ]
    },
    gyeongju: {
      ko:[
        { title:'대릉원 축을 천천히 여는 첫날', intro:'대릉원과 황리단길 주변을 천천히 걸으며 도시의 낮은 리듬에 먼저 몸을 맞춥니다.', localTip:'경주는 첫날부터 유적 수를 늘리기보다 tomb core와 한옥 거리의 걸음 속도를 먼저 맞추는 편이 좋습니다.' },
        { title:'heritage walk와 dusk 장면이 중심이 되는 날', intro:'낮엔 유적 걷기, 오후엔 한옥 카페 pause, 밤엔 월지나 old-core dusk 한 장면으로 경주의 결을 완성합니다.', localTip:'비가 오면 야외 유적 수를 줄이고 museum pocket이나 hanok café 쪽 비중을 더 높이세요.' },
        { title:'조용한 아침으로 고도(古都)를 닫는 마지막 날', intro:'마지막 날은 박물관이나 짧은 산책 정도만 남겨 고도(古都)의 공기를 흐리지 않고 닫습니다.', localTip:'출발 전엔 황리단길보다 더 조용한 lane이나 museum edge가 마지막 인상으로 더 잘 남습니다.' }
      ],
      en:[
        { title:'A first day that settles slowly into the tomb core', intro:'Walk slowly through the tomb core and Hwangridan-gil first so your pace drops into Gyeongju before the city asks for more heritage.', localTip:'Gyeongju usually starts better when the first day matches walking speed to the old core instead of multiplying heritage stops.' },
        { title:'A day carried by heritage walking and one dusk scene', intro:'Use the day for a heritage walk, the afternoon for one hanok café pause, and the evening for a single Wolji or old-core dusk scene.', localTip:'If rain appears, reduce the outdoor heritage load and let museum pockets or hanok cafés carry more of the day.' },
        { title:'A final morning that protects the old-capital air', intro:'Leave only a museum pocket or one short walk for the final morning so the old-capital air stays intact to the end.', localTip:'Before departure, a quieter lane or museum edge often leaves a better final impression than returning to the busier café strip.' }
      ]
    },
    macau: {
      ko:[
        { title:'세나도와 old lanes로 스케일을 잡는 첫날', intro:'첫날은 세나도와 old-lane 축만 짧고 선명하게 읽어 마카오의 compact scale에 먼저 적응합니다.', localTip:'마카오는 첫날에 구역을 늘리기보다 old core 한 축만 또렷하게 잡는 편이 훨씬 깔끔합니다.' },
        { title:'타이파 대비와 bright close가 중심이 되는 날', intro:'낮엔 타이파로 한 번 넘어가 대비를 만들고, 밤엔 bright scene 하나만 남겨 골목과 조명의 contrast를 정리합니다.', localTip:'비 오는 날엔 heritage walk를 줄이고 tea room, dessert pocket, indoor resort fallback을 더 빨리 붙이세요.' },
        { title:'디저트 pocket 하나로 부드럽게 닫는 마지막 날', intro:'마지막 날은 디저트나 tea room pocket 하나 정도만 더해 부드럽게 빠져나오는 편이 좋습니다.', localTip:'출발일엔 세나도 재방문보다 hotel-side dessert close나 quiet square가 더 안정적으로 마무리됩니다.' }
      ],
      en:[
        { title:'A first day that sets scale through Senado and old lanes', intro:'Open Macau through Senado and the old-lane axis only, keeping the first day short enough to adjust to the city’s compact scale.', localTip:'Macau usually reads much cleaner when day one stays inside one old-core axis instead of widening too early.' },
        { title:'A contrast day built on Taipa and one bright close', intro:'Cross into Taipa to build contrast, then leave only one bright night scene so the lanes and lights do not compete too hard.', localTip:'When rain arrives, shorten the heritage walk fast and bring tea rooms, dessert pockets, or indoor resort fallback forward.' },
        { title:'A softer final day led by one dessert pocket', intro:'A dessert or tea-room pocket is usually enough for the final hours before a softer departure.', localTip:'On departure day, a hotel-side dessert close or quiet square often works better than reopening the main Senado core.' }
      ]
    }
  };

  function getPriorityResultDayPack(destination=''){
    const slug = String(destination || '').trim().toLowerCase();
    const entry = priorityResultDayPolishMap[slug];
    if (!entry) return [];
    const lang = window.RyokoApp?.lang || 'ko';
    return entry[lang] || entry.en || [];
  }

  function applyPriorityResultDayPolish(data){
    const pack = getPriorityResultDayPack(data?.destination || '');
    if (!pack.length || !Array.isArray(data?.days) || !data.days.length) return data;
    return {
      ...data,
      days: data.days.map((day, idx) => {
        const current = pack[idx] || pack[Math.min(idx, pack.length - 1)] || null;
        if (!current) return day;
        return {
          ...day,
          title: current.title || day.title,
          intro: current.intro || day.intro || day.summary || '',
          localTip: current.localTip || day.localTip || ''
        };
      })
    };
  }

  function getSeasonalResultFeature(destination=''){
    const slug = String(destination||'').trim().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
    const map = {
      tokyo:{ ko:{title:'계절보다 시간대를 먼저 잡는 도쿄 베이스', desc:'맑은 오전 앵커, 비 오는 날의 실내 전환, 늦은 밤 회복 구간을 같이 두는 편이 도쿄를 더 읽기 쉽게 만듭니다.', chips:['Morning anchor','Rainy indoor swap','Late-night recovery']}, en:{title:'A Tokyo base shaped by time windows before the season', desc:'Tokyo usually gets easier when clear mornings, rainy indoor pivots, and late-night recovery are all considered together.', chips:['Morning anchor','Rainy indoor swap','Late-night recovery']}},
      seoul:{ ko:{title:'서울은 계절보다 동네 조합과 우천 대응이 더 중요합니다', desc:'비 오는 날과 주말 혼잡을 고려한 실내 연결, 늦은 밤 사회적 리듬, 부모님용 easy pace가 모두 다른 route를 만듭니다.', chips:['Indoor chain','Weekend crowd swap','Late-night city edit']}, en:{title:'In Seoul, neighborhood mix and weather response matter more than the season tag', desc:'Rain plans, weekend crowd swaps, late-night social rhythm, and easier family pacing all produce different versions of Seoul.', chips:['Indoor chain','Weekend crowd swap','Late-night city edit']}},
      busan:{ ko:{title:'부산은 바다를 읽는 시간대가 결과를 바꿉니다', desc:'여름엔 해 질 무렵 coast line이 강하고, 흐린 날은 실내 전망과 카페가 fallback이 됩니다.', chips:['Coast at dusk','Gray-day fallback','Easy family pacing']}, en:{title:'In Busan, the coast timing changes the whole result', desc:'Summer evenings open the coast up, while gray days usually work better with indoor views and café-led fallback.', chips:['Coast at dusk','Gray-day fallback','Easy family pacing']}},
      kyoto:{ ko:{title:'교토는 quiet window를 먼저 지키는 쪽이 좋습니다', desc:'성수기보다 이른 오전과 비워둔 오후가 route 만족도를 더 크게 좌우합니다.', chips:['Early quiet window','Rainy tea-room day','Soft dusk walk']}, en:{title:'Kyoto works best when the quiet window is protected first', desc:'Early mornings and open afternoons usually matter more than the peak-season label itself.', chips:['Early quiet window','Rainy tea-room day','Soft dusk walk']}},
      jeju:{ ko:{title:'제주는 날씨와 바람을 같이 보는 편이 좋습니다', desc:'맑은 날 scenic drive를 길게 쓰고, 비나 바람이 강하면 café-led fallback으로 무게를 옮기는 쪽이 안정적입니다.', chips:['Wind-aware drives','Rainy café pivot','Soft coast line']}, en:{title:'Jeju gets better when weather and wind are read together', desc:'Stretch scenic drives on clear days, then shift weight toward café-led fallback when rain or wind rises.', chips:['Wind-aware drives','Rainy café pivot','Soft coast line']}},
      fukuoka:{ ko:{title:'후쿠오카는 계절이 달라도 compact route가 강합니다', desc:'도심 코어를 짧게 잡고 meal rhythm을 유지하면 우천일과 더위에도 만족도가 크게 무너지지 않습니다.', chips:['Compact core','Meal rhythm','Rain-proof center']}, en:{title:'Fukuoka stays strong when the route remains compact', desc:'A shorter city core with stable meal rhythm usually holds up well through rain or heat.', chips:['Compact core','Meal rhythm','Rain-proof center']}},
      osaka:{ ko:{title:'오사카는 season보다 meal spacing이 먼저입니다', desc:'아케이드와 실내 구간을 잘 섞으면 비 오는 날에도 리듬이 무너지지 않고, 저녁 무드도 더 쉽게 살릴 수 있습니다.', chips:['Arcade shelter','Food spacing','Easy night close']}, en:{title:'In Osaka, meal spacing comes before the seasonal label', desc:'Arcades and indoor stretches protect the route on rainy days and keep the evening rhythm easier to hold.', chips:['Arcade shelter','Food spacing','Easy night close']}},
      sapporo:{ ko:{title:'삿포로는 차가운 공기와 따뜻한 pocket을 같이 봐야 좋습니다', desc:'넓은 축, 실내 연결, 따뜻한 한 끼가 같이 있어야 겨울 도시 리듬이 무너지지 않습니다.', chips:['Winter width','Warm pocket','Short night glow']}, en:{title:'Sapporo works best when cold air and warm pockets are read together', desc:'A wider axis, one indoor link, and one warm meal usually keep the winter-city rhythm intact.', chips:['Winter width','Warm pocket','Short night glow']}},
      sendai:{ ko:{title:'센다이는 계절보다 calm axis가 더 중요합니다', desc:'녹음길, market pocket, quiet dinner close가 같이 있어야 이 도시의 장점이 살아납니다.', chips:['Calm axis','Market pocket','Quiet dinner close']}, en:{title:'In Sendai, the calm axis matters more than the season label', desc:'A green avenue, one market pocket, and a quieter dinner close usually bring the city out best.', chips:['Calm axis','Market pocket','Quiet dinner close']}},
      okinawa:{ ko:{title:'오키나와는 날씨보다 바다와 pause를 같이 읽는 편이 좋습니다', desc:'wind, rain, sea, resort pause를 함께 봐야 섬 route가 무너지지 않습니다.', chips:['Sea opener','Drive pause','Soft dusk close']}, en:{title:'Okinawa works better when sea scenes and pauses are read together', desc:'Reading wind, rain, sea, and resort pauses together usually keeps the island route cleaner.', chips:['Sea opener','Drive pause','Soft dusk close']}},
      gyeongju:{ ko:{title:'경주는 dusk를 넣어야 계절감이 깊어집니다', desc:'한옥과 유적의 질감은 해 질 무렵에 더 선명해지고, 비 오는 날엔 hanok/café fallback이 route를 살려줍니다.', chips:['Dusk heritage mood','Hanok fallback','Slow evening close']}, en:{title:'Gyeongju deepens when dusk is part of the route', desc:'Heritage texture sharpens toward dusk, and rainy hanok/café fallback keeps the day intact.', chips:['Dusk heritage mood','Hanok fallback','Slow evening close']}},
      macau:{ ko:{title:'마카오는 짧은 축과 day-night contrast가 핵심입니다', desc:'old core, Taipa bridge pocket, bright close를 짧고 분명하게 두는 편이 가장 좋습니다.', chips:['Old-core walk','Bridge pocket','Bright night close']}, en:{title:'Macau works through short axes and day-night contrast', desc:'The city lands best when the old core, Taipa bridge pocket, and one bright close stay short and clear.', chips:['Old-core walk','Bridge pocket','Bright night close']}}
    };
    const entry = map[slug] || map.seoul;
    const langKey = (window.RyokoApp?.lang || 'ko') === 'ko' ? 'ko' : 'en';
    return entry[langKey] || entry.en;
  }

  function renderEditorialHero(data){
    const destination = textValue(data.destination, readForm().destination || 'Trip');
    const eyebrow = qs('resultEyebrow');
    const rhythm = qs('resultFactRhythm');
    const shape = qs('resultFactShape');
    const best = qs('resultFactBest');
    const note = qs('resultEditorNoteText');
    const coverMeta = qs('resultCoverMeta');
    const coverNote = qs('resultCoverNoteText');
    const visual = qs('resultEditorialVisual');
    const visualTitle = qs('resultVisualTitle');
    const visualDesc = qs('resultVisualDesc');
    const visualKicker = qs('resultVisualKicker');
    const voice = window.RyokoApp?.getCityVoice?.(destination);
    const heroPack = getPriorityResultHeroPack(destination);
    if (eyebrow) eyebrow.textContent = heroPack?.eyebrow || uiCopy(`${destination} 루트 노트`, `${destination} route note`);
    if (coverMeta) coverMeta.textContent = heroPack?.coverMeta || uiCopy(`${destination} 플래너 에디트`, `${destination} planner edit`);
    if (coverNote) coverNote.textContent = heroPack?.coverNote || uiCopy(`${destination} 결과도 홈과 매거진에서 쓰는 같은 커버 규칙으로 읽히게 정리했습니다.`, `${destination} results now follow the same cover framing used on the home and magazine pages.`);
    if (rhythm) rhythm.textContent = heroPack?.factRhythm || textValue(data.pace, 'Balanced city pacing');
    if (shape) shape.textContent = heroPack?.factShape || summarizeRouteShape(data);
    if (best) best.textContent = heroPack?.factBest || textValue(data.bestFor, 'Travelers who want a smoother route');
    if (note) note.textContent = heroPack?.editorNote || buildEditorNote(data);
    if (visual) {
      visual.style.backgroundImage = `linear-gradient(180deg, rgba(17,27,45,0.08) 0%, rgba(17,27,45,0.58) 100%), url("${cityImageFor(destination)}")`;
    }
    if (visualTitle) visualTitle.textContent = heroPack?.visualTitle || voice?.strap || uiCopy(`${destination} 에디토리얼 플로우`, `${destination} editorial flow`);
    if (visualDesc) visualDesc.textContent = heroPack?.visualDesc || textValue(data.summary, 'Built like a readable magazine route instead of a crowded checklist.');
    if (visualKicker) visualKicker.textContent = heroPack?.visualKicker || voice?.mood || textValue(data.vibe, 'City cover');
  }
  function buildMicroBrief(data){
    const destination = data.destination || readForm().destination || '';
    const custom = getPriorityResultMicroBriefPack(destination);
    if (custom?.length) return custom;
    const voice = window.RyokoApp?.getCityVoice?.(destination) || {};
    const loop = window.RyokoApp?.getCityLoopData?.(destination) || { vibe: '' };
    return [
      { kicker: uiCopy('Lead with', 'Lead with', 'Lead with', 'Lead with'), text: voice?.strap || textValue(data.pace, (loop.vibe || uiCopy('도시의 기본 템포를 먼저 가져가세요.', 'Take the city tempo first.'))) },
      { kicker: uiCopy('Protect', 'Protect', 'Protect', 'Protect'), text: voice?.watch || buildEditorNote(data) },
      { kicker: uiCopy('Keep', 'Keep', 'Keep', 'Keep'), text: voice?.reward || textValue(data.bestFor, uiCopy('이 도시가 잘 남는 장면을 끝까지 지키세요.', 'Keep the part of the city that actually stays with you.')) }
    ];
  }
  function renderSignature(data){
    const form = readForm();
    const chips = [
      textValue(data.tripMood, prettyPillValue('tripMood', form.tripMood || 'balanced')),
      textValue(data.dayDensity, prettyPillValue('dayDensity', form.dayDensity || 'balanced')),
      textValue(data.budgetMode, prettyPillValue('budgetMode', form.budgetMode || 'balanced')),
      form.localMode ? uiCopy('현지인 모드', 'Local mode on') : uiCopy('관광객 모드', 'Classic routing')
    ].filter(Boolean);
    const node = qs('resultSignature');
    if (!node) return;
    node.innerHTML = chips.map(item => `<span class="result-signature-chip">${escapeHtml(item)}</span>`).join('');
    const brief = qs('resultMicroBrief');
    if (brief) {
      brief.innerHTML = buildMicroBrief(data).map(item => `
        <article class="micro-brief-card">
          <span class="micro-brief-kicker">${escapeHtml(item.kicker)}</span>
          <p>${escapeHtml(item.text)}</p>
        </article>`).join('');
    }
  }
  function renderDayRail(data){
    const rail = qs('resultDayRail');
    const eyebrow = qs('dayRailEyebrow');
    const title = qs('dayRailTitle');
    if (!rail) return;
    if (eyebrow) eyebrow.textContent = uiCopy('루트 리듬', 'Route rhythm');
    if (title) title.textContent = uiCopy('하루씩 가볍게 이동하면서 읽어보세요', 'Jump through the trip one day at a time');
    rail.innerHTML = (data.days || []).map((day, idx) => {
      const places = normalizePlaces(day);
      const target = `dayCard${day.day || idx + 1}`;
      return `
        <button class="day-rail-chip${idx === 0 ? ' is-active' : ''}" data-day-jump="${target}">
          <span class="day-rail-kicker">${escapeHtml(getDayLabel(day.day || idx + 1))}</span>
          <strong>${escapeHtml(textValue(day.title, uiCopy('하루 일정', 'Day route')))}</strong>
          <small>${escapeHtml(String(places.length || 0))} ${uiCopy('곳', 'stops')}</small>
        </button>`;
    }).join('');
    document.querySelectorAll('[data-day-jump]').forEach(btn => btn.addEventListener('click', () => smoothJump(btn.dataset.dayJump)));
  }
  function updateActiveDayRail(){
    const chips = [...document.querySelectorAll('[data-day-jump]')];
    if (!chips.length) return;
    let active = chips[0]?.dataset.dayJump;
    chips.forEach(btn => {
      const el = document.getElementById(btn.dataset.dayJump);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.32) active = btn.dataset.dayJump;
    });
    chips.forEach(btn => btn.classList.toggle('is-active', btn.dataset.dayJump === active));
  }
  function renderDays(data){
    const destination = textValue(data.destination, readForm().destination || 'Trip');
    const savedPlaces = getSavedPlaces(destination);
    const days = (data.days || []).map((day, dayIndex) => {
      const places = normalizePlaces(day);
      const compact = places.slice(0, 3).map(place => `<span class="day-mini-chip">${escapeHtml(place.name)}</span>`).join('');
      const isOpen = dayIndex === 0 ? ' is-open' : '';
      return `
        <article class="day-card${isOpen}" id="dayCard${day.day || dayIndex + 1}">
          <div class="day-card-header">
            <div class="day-card-top">
              <div>
                <span class="day-badge">${getDayLabel(day.day)}</span>
                <h3 class="day-title">${escapeHtml(textValue(day.title, getDayLabel(day.day || dayIndex + 1)))}</h3>
                <p class="day-intro">${escapeHtml(textValue(day.intro || day.summary, ''))}</p>
              </div>
            </div>
            <button class="day-toggle" aria-label="${uiCopy('하루 열기/접기', 'Toggle day')}">${dayIndex === 0 ? '−' : '+'}</button>
          </div>
          <div class="day-card-summary">${compact}</div>
          <div class="day-card-body">
            <div class="place-list">
              ${places.map((place, idx) => {
                const saved = savedPlaces.includes(place.name);
                const saveLabel = saved ? uiCopy('저장됨', 'Saved') : uiCopy('장소 저장', 'Save place');
                return `
                <div class="place-item">
                  <div class="place-index">${idx + 1}</div>
                  <div class="place-copy">
                    <div class="place-name">${escapeHtml(place.name)}</div>
                    <div class="place-reason">${escapeHtml(place.reason)}</div>
                  </div>
                  <button class="place-save${saved ? ' is-saved' : ''}" data-destination="${escapeHtml(destination)}" data-place="${escapeHtml(place.name)}" aria-pressed="${saved ? 'true' : 'false'}" aria-label="${saveLabel}">${saved ? '♥' : '♡'}</button>
                </div>`;
              }).join('')}
            </div>
            ${day.localTip ? `<div class="day-tip">${escapeHtml(day.localTip)}</div>` : ''}
          </div>
        </article>`;
    }).join('');
    qs('resultDays').innerHTML = days || '<div class="summary-line">Sample trip ready</div>';
    bindDayInteractions();
    updateActiveDayRail();
  }
  function renderBudget(data){
    const budget = data.budgetBreakdown || {};
    const entries = Array.isArray(budget) ? budget.map(x => [x.category, x.amount]) : Object.entries(budget);
    qs('budgetSummary').textContent = textValue(data.budgetSummary, window.RyokoApp.t('planner.budgetSummaryFallback') || '');
    qs('budgetList').innerHTML = (entries.length ? entries : Object.entries(samplePlans.tokyo.budgetBreakdown)).map(([k,v]) => `<div class="budget-card-line"><strong>${budgetLabel(k)}</strong><span>${v}</span></div>`).join('');
  }
  function renderTips(data){
    const tips = Array.isArray(data.localTips) && data.localTips.length ? data.localTips : samplePlans.tokyo.localTips;
    qs('localTipsList').innerHTML = tips.map(item => `<div class="tip-card-line"><span class="tip-icon">i</span><div class="tip-text">${item}</div></div>`).join('');
  }


  function normalizeSignalText(value=''){ return String(value || '').toLowerCase(); }
  function getResultSignals(data, payload = window.currentTripPayload || readForm()){
    const parts = [
      textValue(data.destination, ''),
      textValue(data.vibe, ''),
      textValue(data.pace, ''),
      textValue(data.bestFor, ''),
      textValue(data.tripMood, ''),
      textValue(data.dayDensity, ''),
      textValue(data.budgetMode, ''),
      payload?.companion || '',
      payload?.style || '',
      payload?.notes || '',
      payload?.localMode ? 'local mode' : 'classic mode'
    ].join(' ').toLowerCase();
    const tags = new Set(window.RyokoApp?.detectSignalTags?.({
      city: textValue(data.destination, ''),
      destination: textValue(data.destination, ''),
      companion: payload?.companion || '',
      style: payload?.style || '',
      notes: [payload?.notes || '', textValue(data.vibe, ''), textValue(data.pace, ''), textValue(data.bestFor, '')].join(' '),
      mode: payload?.localMode ? 'local' : 'classic',
      query: parts
    }) || []);
    if (/(editorial|magazine|에디토리얼|매거진|編輯|エディトリアル)/.test(parts)) tags.add('editorial');
    if (/(vivid|sharp|social|night|late|city vibes|鮮明|夜|late-night)/.test(parts)) tags.add('late-night');
    if (/(soft|slow|quiet|calm|lighter|rest|느린|조용|柔和)/.test(parts)) tags.add('soft-reset');
    if (/(food|meal|dinner|cafe|coffee|맛집|食)/.test(parts)) tags.add('food-led');
    if (/(coast|sea|ocean|harbor|beach|바다|海)/.test(parts)) tags.add('coast');
    if (/(parent|family|부모|가족)/.test(parts)) tags.add('parents');
    if (payload?.localMode) tags.add('local-mode');
    const paceKey = /(light|soft|easy|slow|가볍|느린|軽め)/.test(parts) ? 'light' : (/(full|dense|packed|꽉|しっかり|飽滿)/.test(parts) ? 'full' : 'balanced');
    const moodKey = /(editorial|magazine|매거진|編輯|エディトリアル)/.test(parts) ? 'editorial' : (/(vivid|social|late|night|비비드|鮮明|ビビッド)/.test(parts) ? 'vivid' : (/(soft|slow|quiet|소프트|柔和|ソフト)/.test(parts) ? 'soft' : 'balanced'));
    return { tags:[...tags], paceKey, moodKey, localMode: !!payload?.localMode };
  }
  const citySignalProfiles = {
    tokyo: { tags:['late-night','editorial'], mood:['vivid','editorial'], pace:['full','balanced'] },
    osaka: { tags:['food-led'], mood:['vivid','balanced'], pace:['balanced','full'] },
    kyoto: { tags:['soft-reset','parents'], mood:['editorial','soft'], pace:['light','balanced'] },
    fukuoka: { tags:['food-led','local-mode'], mood:['balanced','editorial'], pace:['balanced','light'] },
    seoul: { tags:['late-night','local-mode'], mood:['vivid','editorial'], pace:['full','balanced'] },
    busan: { tags:['coast','parents'], mood:['soft','balanced'], pace:['light','balanced'] },
    jeju: { tags:['coast','soft-reset'], mood:['soft','editorial'], pace:['light'] },
    gyeongju: { tags:['soft-reset','parents'], mood:['editorial','soft'], pace:['light','balanced'] },
    sapporo: { tags:['soft-reset'], mood:['soft','editorial'], pace:['light','balanced'] },
    sendai: { tags:['soft-reset','editorial'], mood:['soft','editorial'], pace:['light','balanced'] },
    okinawa: { tags:['coast','soft-reset'], mood:['soft','balanced'], pace:['light'] },
    taipei: { tags:['late-night','food-led','local-mode'], mood:['vivid','balanced'], pace:['full','balanced'] },
    hongkong: { tags:['late-night','coast'], mood:['vivid','editorial'], pace:['full','balanced'] },
    macau: { tags:['late-night','parents'], mood:['editorial','balanced'], pace:['balanced','light'] }
  };
  function scoreCityForSignals(city, signals){
    if (!city) return 0;
    const vibe = String(city.vibe || '').toLowerCase();
    const slug = window.RyokoApp.slugifyCity(city.name || '');
    const profile = citySignalProfiles[slug] || { tags:[], mood:[], pace:[] };
    let score = 0;
    if (signals.tags.includes('late-night') && /(night|harbor|social|food|fast|vertical)/.test(vibe)) score += 3;
    if (signals.tags.includes('food-led') && /(food|compact|local|night|tasty)/.test(vibe)) score += 3;
    if (signals.tags.includes('soft-reset') && /(slow|history|scenic|ease|quiet|calm|island)/.test(vibe)) score += 3;
    if (signals.tags.includes('coast') && /(coast|scenic|harbor|island|open)/.test(vibe)) score += 3;
    if (signals.tags.includes('parents') && /(scenic|history|ease|coast|heritage)/.test(vibe)) score += 3;
    if (signals.tags.includes('local-mode') && /(local|social|food|compact|layered)/.test(vibe)) score += 2;
    signals.tags.forEach(tag => { if (profile.tags.includes(tag)) score += 4; });
    if (profile.mood.includes(signals.moodKey)) score += 3;
    if (profile.pace.includes(signals.paceKey)) score += 2;
    if (signals.moodKey === 'editorial' && /(slow|history|scenic|local|heritage)/.test(vibe)) score += 1;
    if (signals.moodKey === 'vivid' && /(fast|night|social|harbor|vertical)/.test(vibe)) score += 1;
    if (signals.paceKey === 'light' && /(slow|ease|scenic|history|quiet|island)/.test(vibe)) score += 1;
    if (signals.paceKey === 'full' && /(fast|social|food|harbor|night)/.test(vibe)) score += 1;
    return score;
  }
  function rerankRecommendations(recs, signals, baseCity=''){
    return [...(recs || [])].sort((a,b) => {
      const acity = a.preset?.destination || '';
      const bcity = b.preset?.destination || '';
      const av = String(acity).toLowerCase() === String(baseCity || '').toLowerCase() ? 3 : 0;
      const bv = String(bcity).toLowerCase() === String(baseCity || '').toLowerCase() ? 3 : 0;
      const atags = (a.tags || []).map(t => String(t).toLowerCase());
      const btags = (b.tags || []).map(t => String(t).toLowerCase());
      const ascore = av + scoreCityForSignals(window.RyokoApp.getCityLoopData(acity) || {name:acity,vibe:''}, signals)
        + signals.tags.reduce((acc, tag) => acc + (atags.some(t => t.includes(tag) || tag.includes(t)) ? 2 : 0), 0)
        + (signals.localMode && atags.some(t => /local|hidden|neighborhood/.test(t)) ? 2 : 0)
        + (signals.paceKey === 'light' && atags.some(t => /soft|slow|easy/.test(t)) ? 1 : 0)
        + (signals.paceKey === 'full' && atags.some(t => /dense|late|food|weekend/.test(t)) ? 1 : 0)
        + (signals.moodKey === 'editorial' && atags.some(t => /editorial|guide|archive|quiet|heritage/.test(t)) ? 1 : 0)
        + (signals.moodKey === 'vivid' && atags.some(t => /night|city|harbor|late/.test(t)) ? 1 : 0);
      const bscore = bv + scoreCityForSignals(window.RyokoApp.getCityLoopData(bcity) || {name:bcity,vibe:''}, signals)
        + signals.tags.reduce((acc, tag) => acc + (btags.some(t => t.includes(tag) || tag.includes(t)) ? 2 : 0), 0)
        + (signals.localMode && btags.some(t => /local|hidden|neighborhood/.test(t)) ? 2 : 0)
        + (signals.paceKey === 'light' && btags.some(t => /soft|slow|easy/.test(t)) ? 1 : 0)
        + (signals.paceKey === 'full' && btags.some(t => /dense|late|food|weekend/.test(t)) ? 1 : 0)
        + (signals.moodKey === 'editorial' && btags.some(t => /editorial|guide|archive|quiet|heritage/.test(t)) ? 1 : 0)
        + (signals.moodKey === 'vivid' && btags.some(t => /night|city|harbor|late/.test(t)) ? 1 : 0);
      return bscore - ascore;
    });
  }
  function sortRelatedCities(baseCity, signals){
    return window.RyokoApp.getRelatedCities(baseCity).slice().sort((a,b) => scoreCityForSignals(b, signals) - scoreCityForSignals(a, signals));
  }
  function adaptiveNudgeCopy(baseCity, signals){
    const city = window.RyokoApp.getCityLoopData(baseCity) || { name: baseCity };
    const cityNote = priorityCityLoopNote(baseCity, signals, 'result');
    if (cityNote) return cityNote;
    if (signals.tags.includes('coast')) return uiCopy('해안선과 전망 포켓이 있는 흐름을 먼저 다시 읽어 보세요.', 'Re-open the route through coast lines and view pockets first.', '海沿いと眺めのポケットがある流れから読み直すのがおすすめです。', '先回到有海岸線與視野口袋的節奏去讀會更順。');
    if (signals.tags.includes('food-led')) return uiCopy('식사 타이밍이 루트를 만드는 도시일수록, example와 guide를 같이 보면 밀도가 더 정확해집니다.', 'When meal timing shapes the city, reading the guide beside the example makes the density easier to tune.', '食のタイミングが街を作る都市ほど、guide と example を並べると密度を整えやすくなります。', '當用餐節奏會決定整座城市時，把 guide 和 example 並著看會更容易調整密度。');
    if (signals.tags.includes('late-night')) return uiCopy('밤 장면이 중요한 결과라면, 늦은 시간대가 강한 도시 가지를 먼저 열어 보세요.', 'If the night close matters here, open the stronger late-night branch first.', '夜の締めが大事な結果なら、深夜の強い枝から先に開くと流れが整います。', '如果這次重點是夜晚收尾，先打開夜間氣氛更強的分支會更順。');
    if (signals.tags.includes('soft-reset') || signals.paceKey === 'light') return uiCopy('지금 결과는 많이 넣기보다 여백을 살리는 쪽이 잘 맞습니다.', 'This result works better when the next read protects space instead of adding more stops.', 'この結果は、詰め足すより余白を守る読み方のほうが合います。', '這次結果更適合保留留白，而不是再往裡塞更多停點。');
    if (signals.localMode) return uiCopy(`${city.name}의 로컬 결을 더 읽어야 다음 루프가 더 자연스럽습니다.`, `Reading ${city.name} through more local pockets will make the next loop feel cleaner.`, `${city.name} のローカルな層をもう少し読むと、次のループが自然になります。`, `把 ${city.name} 的在地層次再多讀一點，下一輪會更自然。`);
    return uiCopy('같은 도시의 guide와 example를 한 번 더 비교한 뒤, 다음 도시로 가지를 치는 편이 좋습니다.', 'Compare the same-city guide and example once more before branching into the next city.', '同じ都市の guide と example をもう一度見比べてから、次の都市へ枝分かれするのがおすすめです。', '先再比對一次同城市的 guide 與 example，再延伸到下一座城市會更順。');
  }

  function sharedProductContextMarkup(baseCity, payload){
    const cityName = String(baseCity || payload?.destination || '').trim();
    const saved = (window.RyokoStorage.getSavedTrips?.() || []).filter(item => String(item.destination || '').toLowerCase() === cityName.toLowerCase());
    const recent = (window.RyokoStorage.getRecentTrips?.() || []).filter(item => String(item.destination || '').toLowerCase() === cityName.toLowerCase());
    const shared = (window.RyokoStorage.getSharedTrips?.() || []).filter(item => String(item.destination || '').toLowerCase() === cityName.toLowerCase());
    const latest = [saved[0], recent[0], shared[0]].filter(Boolean).sort((a,b) => new Date(b.updatedAt || b.savedAt || b.viewedAt || b.sharedViewedAt || b.createdAt || 0) - new Date(a.updatedAt || a.savedAt || a.viewedAt || a.sharedViewedAt || a.createdAt || 0))[0] || null;
    const city = window.RyokoApp.getCityLoopData(cityName) || null;
    const latestHref = latest ? `${location.pathname}?trip=${encodeURIComponent(window.RyokoStorage.encodeShare(latest))}` : window.RyokoApp.navHref('trips');
    const guideHref = city ? window.RyokoApp.resolvePath(city.guide || 'magazine/index.html') : window.RyokoApp.navHref('magazine');
    const articleHref = city ? window.RyokoApp.resolvePath(city.guide || 'magazine/index.html') + '#city-neighborhoods' : window.RyokoApp.navHref('magazine');
    const exampleHref = city ? window.RyokoApp.resolvePath(city.example || city.guide || 'magazine/index.html') : window.RyokoApp.navHref('magazine');
    const total = saved.length + recent.length + shared.length;
    const collectionDesc = total
      ? uiCopy(`${cityName} 관련 저장/최근/공유 흐름 ${total}개가 쌓여 있습니다.`, `${total} saved, recent, or shared routes already sit around ${cityName}.`, `${cityName} まわりには保存・最近・共有の流れが ${total} 件あります。`, `${cityName} 周邊已累積 ${total} 筆已存、最近或分享的路線。`)
      : uiCopy(`${cityName}는 이 공유 루트를 첫 저장 컬렉션으로 삼기 좋습니다.`, `This shared route can become the first saved collection for ${cityName}.`, `${cityName} では、この共有ルートが最初の保存コレクションになります。`, `這條分享路線很適合成為 ${cityName} 的第一個保存收藏。`);
    const continueDesc = latest
      ? uiCopy(`${latest.title || cityName}와 나란히 두고 비교하면 다음 수정이 훨씬 빨라집니다.`, `Keeping this beside ${latest.title || cityName} makes the next edit easier to judge.`, `${latest.title || cityName} と並べると、次の調整がぐっとしやすくなります。`, `把它和 ${latest.title || cityName} 並排看，下一次微調會更容易。`)
      : uiCopy(`도시 가이드와 샘플을 먼저 읽고, 그다음 이 공유 루트를 저장 컬렉션으로 남겨 보세요.`, `Read the city guide and sample first, then keep this shared route as a saved collection.`, `先に都市ガイドとサンプルを読み、この共有ルートを保存コレクションとして残してみてください。`, `先讀城市指南和範例，再把這條分享路線留下成為你的收藏。`);
    return `
      <div class="shared-product-grid">
        <article class="shared-product-card info-card">
          <span class="eyebrow">${uiCopy('저장 컬렉션','Saved collection','保存コレクション','已存收藏')}</span>
          <h4>${uiCopy('이 도시를 보관하는 기준점', 'A cleaner city base', 'この都市を保管する基準点', '保留這座城市的基準點')}</h4>
          <p>${collectionDesc}</p>
          <div class="trip-chip-row">
            <span class="trip-mini-chip">${saved.length} ${uiCopy('저장','saved','保存','已存')}</span>
            <span class="trip-mini-chip">${recent.length} ${uiCopy('최근','recent','最近','最近')}</span>
            <span class="trip-mini-chip">${shared.length} ${uiCopy('공유','shared','共有','分享')}</span>
          </div>
          <div class="card-actions">
            <a class="soft-btn" href="${window.RyokoApp.navHref('trips')}">${uiCopy('My Trips 보기','Open My Trips','My Trips を開く','打開 My Trips')}</a>
            <a class="ghost-btn" href="${guideHref}">${uiCopy('도시 가이드','City guide','都市ガイド','城市指南')}</a>
            <a class="ghost-btn" href="${articleHref}">${uiCopy('아티클 깊이','Article depth','article depth','article depth')}</a>
          </div>
        </article>
        <article class="shared-product-card info-card">
          <span class="eyebrow">${uiCopy('이어 읽기','Continue reading','続けて読む','接續閱讀')}</span>
          <h4>${uiCopy('다음 클릭을 더 자연스럽게', 'Where to reopen next', '次のクリックを自然にする', '讓下一次點擊更自然')}</h4>
          <p>${continueDesc}</p>
          ${renderEntryRouteMiniBlock(baseCity, 'compact')}
          <div class="card-actions">
            <a class="primary-btn" href="${latestHref}">${latest ? uiCopy('최근 루트 열기','Open recent route','最近のルートを開く','打開最近路線') : uiCopy('이 루트 저장','Save this route','このルートを保存','保存這條路線')}</a>
            <a class="secondary-btn" href="${exampleHref}">${uiCopy('샘플 비교','Compare sample','サンプル比較','對照範例')}</a>
            <a class="ghost-btn" href="${articleHref}">${uiCopy('아티클 깊이','Article depth','article depth','article depth')}</a>
          </div>
        </article>
      </div>`;
  }

  function sharedLoopMarkup(baseCity, signals){
    const city = window.RyokoApp.getCityLoopData(baseCity) || { name: baseCity, guide:'magazine/index.html', example:'magazine/index.html', image: cityImageFor(baseCity), vibe:'' };
    const related = sortRelatedCities(baseCity, signals)[0] || city;
    const atlasHref = window.RyokoApp.resolvePath('magazine/index.html#cityAtlas');
    const guideHref = window.RyokoApp.resolvePath(city.guide || 'magazine/index.html') + '#city-neighborhoods';
    const exampleHref = window.RyokoApp.resolvePath(city.example || city.guide || 'magazine/index.html');
    const plannerHref = `${location.pathname}?destination=${encodeURIComponent(baseCity)}#plannerForm`;
    return `
      <div class="shared-loop-shell">
        <div class="shared-loop-head">
          <span class="eyebrow">${uiCopy('city-first loop','City-first loop','city-first loop','city-first loop')}</span>
          <strong>${uiCopy('공유 링크도 같은 도시 루프로 다시 읽습니다','A shared link should reopen the same city loop, not stop at the route preview','共有リンクも同じ都市ループで読み直します','分享連結也要回到同一個城市循環')}</strong>
        </div>
        <p class="card-copy">${priorityCityLoopNote(baseCity, signals, 'share') || adaptiveNudgeCopy(baseCity, signals)}</p>
        <div class="shared-loop-grid">
          <a class="shared-loop-card" href="${atlasHref}"><span class="mini-label">Atlas</span><strong>${city.name}</strong><p>${uiCopy('도시 커버와 우선 동네를 다시 읽기','Reopen the city cover, priority districts, and first neighborhood logic','都市カバーと最初の地区を読み直す','重新讀城市封面與優先區域')}</p></a>
          <a class="shared-loop-card" href="${guideHref}"><span class="mini-label">City</span><strong>${uiCopy('Neighborhood picks','Neighborhood picks','近所のピック','鄰里精選')}</strong><p>${uiCopy('이 공유 루트가 기대는 동네 결을 더 읽기','Read the neighborhood logic holding this shared route together','この共有ルートが寄りかかる近所のロジックを読む','把這條分享路線依靠的鄰里邏輯再讀深一點')}</p></a>
          <a class="shared-loop-card" href="${exampleHref}"><span class="mini-label">Example</span><strong>${city.name}</strong><p>${uiCopy('비슷한 도시 예시와 속도 차이 비교','Compare this pace against the stronger city example','同じ都市のサンプルと速度感を比べる','和同城市範例比對節奏差異')}</p></a>
          <a class="shared-loop-card" href="${window.RyokoApp.resolvePath(related.guide || city.guide)}"><span class="mini-label">Next</span><strong>${related.name}</strong><p>${uiCopy('비슷한 결의 다음 도시 가지 열기','Open the next city branch that carries a similar editorial tone','近いトーンの次都市ブランチを開く','打開調性相近的下一座城市分支')}</p></a>
        </div>
        <div class="card-actions shared-loop-actions">
          <a class="soft-btn" href="${plannerHref}">${uiCopy('이 루트 다듬기','Refine this route','このルートを整える','微調這條路線')}</a>
          <a class="ghost-btn" href="${guideHref}">${uiCopy('도시 가이드 읽기','Read guide','ガイドを読む','閱讀指南')}</a>
        </div>
      </div>`;
  }

  function renderVisualStory(data){
    const node = qs('resultVisualStoryGrid');
    if (!node) return;
    const copy = resultCopy();
    const baseCity = textValue(data.destination, readForm().destination || 'Tokyo');
    const current = window.RyokoApp.getCityLoopData(baseCity) || { name: baseCity, country:'', guide:'magazine/', example:'magazine/', image: cityImageFor(baseCity), vibe:'editorial route' };
    const related = window.RyokoApp.getRelatedCities(baseCity)[0] || current;
    const dayOne = data.days?.[0] || {};
    const dayOnePlaces = normalizePlaces(dayOne).slice(0,3).map(place => place.name).join(' · ');
    const title = qs('visualStoryTitle');
    const desc = qs('visualStoryDesc');
    const eyebrow = qs('visualStoryEyebrow');
    if (eyebrow) eyebrow.textContent = copy.routeNote;
    if (title) title.textContent = uiCopy('결과를 기사형 패키지처럼 읽게 만듭니다', 'See the result like an editorial package', '結果を小さなエディトリアルパッケージのように読めるようにします', '讓這份結果像一個小型 editorial package 一樣被閱讀');
    if (desc) desc.textContent = copy.routeNoteDesc;
    const seasonal = getSeasonalResultFeature(baseCity);
    const storyPack = getPriorityResultVisualStoryPack(baseCity);
    const cards = [
      {
        kicker: copy.cityCover,
        title: storyPack?.coverTitle || `${current.name}`,
        text: storyPack?.coverText || textValue(data.summary, uiCopy('이 여정의 전체 리듬을 먼저 잡아주는 대표 컷입니다.', 'This is the cover frame that sets the route tone first.')),
        image: window.RyokoApp.resolvePath(current.image || cityImageFor(baseCity)),
        actionLabel: uiCopy('도시 가이드', 'City guide', '都市ガイド', '城市指南'),
        actionHref: window.RyokoApp.resolvePath(current.guide)
      },
      {
        kicker: copy.routeMood,
        title: storyPack?.routeTitle || textValue(dayOne.title, uiCopy('첫날의 리듬', 'Opening rhythm')),
        text: storyPack?.routeText || dayOnePlaces || uiCopy('첫날은 강한 앵커와 부드러운 포켓을 섞어 과밀하지 않게 시작합니다.', 'Day one mixes one anchor and softer pockets so the route opens cleanly.'),
        image: window.RyokoApp.resolvePath(exampleImageFor(baseCity)),
        actionLabel: copy.sampleRead,
        actionHref: window.RyokoApp.resolvePath(current.example)
      },
      {
        kicker: storyPack ? uiCopy('루트 패키지', 'Route package', 'ルートパッケージ', '路線套組') : uiCopy('시즌 노트', 'Seasonal note', '季節ノート', '季節筆記'),
        title: storyPack?.packageTitle || seasonal.title,
        text: storyPack?.packageText || seasonal.desc,
        image: window.RyokoApp.resolvePath(current.image || cityImageFor(baseCity)),
        actionLabel: copy.plannerBase,
        actionHref: '#plannerForm'
      },
      {
        kicker: copy.nextBranch,
        title: storyPack?.branchTitle || uiCopy(`${related.name}까지 이어서 읽기`, `Branch into ${related.name}`, `${related.name}へ続けて読む`, `延伸閱讀到 ${related.name}`),
        text: storyPack?.branchText || uiCopy(`${related.vibe} 톤의 도시를 이어서 읽으면 다음 저장 루프가 더 자연스럽게 이어집니다.`, `A ${related.vibe} city keeps the next save-and-read loop moving naturally, especially when this result already leans in that direction.`, `${related.vibe}の空気を持つ都市へ続けると、次の保存と読み直しの流れが自然につながります。`, `接著讀一座帶有 ${related.vibe} 氛圍的城市，會讓下一輪保存與再閱讀更自然地延續下去。`),
        image: window.RyokoApp.resolvePath(related.image || cityImageFor(related.name)),
        actionLabel: copy.nextCity,
        actionHref: window.RyokoApp.resolvePath(related.guide)
      }
    ];
    node.innerHTML = cards.map((card, idx) => `
      <article class="visual-story-card${idx === 0 ? ' is-feature' : ''}">
        <div class="visual-story-image" style="background-image:linear-gradient(180deg, rgba(16,23,38,0.06), rgba(16,23,38,0.62)), url('${card.image}')"></div>
        <div class="visual-story-body">
          <span class="visual-story-kicker">${escapeHtml(card.kicker)}</span>
          <h3>${escapeHtml(card.title)}</h3>
          <p>${escapeHtml(card.text)}</p>
          <a class="soft-btn" href="${card.actionHref}">${escapeHtml(card.actionLabel)}</a>
        </div>
      </article>`).join('');
  }


  function renderJourneyLoop(data){
    const node = qs('resultLoopSection');
    if (!node) return;
    const copy = resultCopy();
    const baseCity = textValue(data.destination, readForm().destination || 'Tokyo');
    const current = window.RyokoApp.getCityLoopData(baseCity) || { name: baseCity, country:'', guide:'magazine/index.html', example:'magazine/index.html', image: cityImageFor(baseCity), vibe:'' };
    const signals = getResultSignals(data);
    const related = sortRelatedCities(baseCity, signals).slice(0, 2);
    const atlasHref = window.RyokoApp.resolvePath('magazine/index.html#cityAtlas');
    const cityGuideHref = window.RyokoApp.resolvePath((current.guide || 'magazine/index.html')) + '#city-neighborhoods';
    const exampleHref = window.RyokoApp.resolvePath(current.example || current.guide || 'magazine/index.html');
    const plannerHref = `${location.pathname}?destination=${encodeURIComponent(baseCity)}#plannerForm`;
    const resultHref = '#resultTop';
    const stages = [
      { step:'01', label:copy.atlas, title: uiCopy(`${current.name}를 atlas에서 다시 읽기`, `Re-read ${current.name} in the atlas`, `${current.name} を atlas で読み直す`, `回到 atlas 重讀 ${current.name}`), desc: copy.backToAtlas, href: atlasHref, cls:'atlas' },
      { step:'02', label:copy.cityGuide, title: uiCopy(`${current.name} city guide`, `${current.name} city guide`, `${current.name} 都市ガイド`, `${current.name} 城市指南`), desc: copy.sameCityGuideDesc, href: cityGuideHref, cls:'city' },
      { step:'03', label:copy.sampleRoute, title: uiCopy(`${current.name} sample route`, `${current.name} sample route`, `${current.name} サンプルルート`, `${current.name} 範例路線`), desc: copy.sameCityExampleDesc, href: exampleHref, cls:'example' },
      { step:'04', label:copy.plannerBase, title: uiCopy(`${current.name} route desk`, `${current.name} route desk`, `${current.name} route desk`, `${current.name} route desk`), desc: copy.tunePlanner, href: plannerHref, cls:'planner' },
      { step:'05', label:copy.routeResult, title: uiCopy('지금 보고 있는 결과', 'The result you are reading now', '今読んでいる結果', '你現在正在看的結果'), desc: copy.continueResult, href: resultHref, cls:'result' }
    ];
    const stageCards = stages.map((item, idx) => {
      const body = `<span class="loop-stage-step">${item.step}</span><span class="mini-label">${escapeHtml(item.label)}</span><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.desc)}</p>`;
      return idx === stages.length - 1
        ? `<article class="loop-stage-card is-current loop-stage-${item.cls}">${body}<span class="loop-stage-current">${escapeHtml(copy.routeResult)}</span></article>`
        : `<a class="loop-stage-card loop-stage-${item.cls}" href="${item.href}">${body}</a>`;
    }).join('');
    const matching = [
      { eyebrow:copy.cityGuide, title: uiCopy(`${current.name} guide`, `${current.name} guide`, `${current.name} ガイド`, `${current.name} 指南`), desc: priorityCityLoopNote(baseCity, signals, 'guide') || copy.sameCityGuideDesc, href: cityGuideHref, soft:copy.readCityLayer },
      { eyebrow:copy.sampleRoute, title: uiCopy(`${current.name} example`, `${current.name} example`, `${current.name} サンプル`, `${current.name} 範例`), desc: uiCopy(`${current.name}의 현재 결을 sample route와 나란히 두고, 강한 구간과 느슨한 구간이 어디서 갈리는지 비교합니다.`, `Set this beside the ${current.name} sample and compare where the stronger and softer sections split apart.`, `${current.name} の現在のトーンを sample route と並べ、強い区間とゆるい区間がどこで分かれるかを見比べます。`, `把現在這條 ${current.name} 路線和 sample route 並排，看看強區段與鬆區段在哪裡分開。`), href: exampleHref, soft:copy.compareExample },
      { eyebrow:copy.neighborhoods, title: uiCopy(`${current.name} neighborhood picks`, `${current.name} neighborhood picks`, `${current.name} 近所のピック`, `${current.name} 鄰里精選`), desc: priorityCityLoopNote(baseCity, signals, 'guide') || copy.neighborhoodDesc, href: cityGuideHref, soft:copy.neighborhoods },
    ].concat(related.map(city => ({ eyebrow:copy.nextCity, title:city.name, desc:copy.relatedCityDesc, href:window.RyokoApp.resolvePath(city.guide), soft:copy.readGuide, vibe:city.vibe || '' })));
    node.innerHTML = `
      <div class="section-head">
        <div>
          <span class="eyebrow">${copy.routeLoopEyebrow}</span>
          <h2 class="section-title">${copy.routeLoopTitle}</h2>
          <p class="section-desc">${copy.routeLoopDesc}</p>
        </div>
      </div>
      <div class="loop-stage-grid">${stageCards}</div>
      <article class="loop-feature info-card">
        <div class="loop-feature-copy">
          <span class="eyebrow">${copy.matchingEyebrow}</span>
          <h3>${copy.matchingTitle}</h3>
          <p>${copy.matchingDesc}</p><p class="section-desc">${adaptiveNudgeCopy(baseCity, signals)}</p>
          <div class="card-actions">
            <a class="primary-btn" href="${cityGuideHref}">${copy.readCityLayer}</a>
            <a class="secondary-btn" href="${exampleHref}">${copy.compareExample}</a>
            <a class="ghost-btn" href="${atlasHref}">${copy.backToAtlas}</a>
          </div>
        </div>
      </article>
      <div class="loop-grid">${matching.map(item => `
        <article class="loop-card info-card">
          <div class="loop-card-top"><span class="eyebrow">${escapeHtml(item.eyebrow)}</span><span class="loop-card-vibe">${escapeHtml(item.vibe || current.vibe || '')}</span></div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.desc)}</p>
          <div class="card-actions">
            <a class="soft-btn" href="${item.href}">${escapeHtml(item.soft)}</a>
          </div>
        </article>`).join('')}</div>`;
  }

  function renderSignalShelf(data){
    const node = qs('resultSignalShelf');
    if (!node) return;
    const form = readForm();
    const signals = getResultSignals(data, window.currentTripPayload || form);
    const recs = rerankRecommendations(window.RyokoApp.getSignalRecommendations({
      city: textValue(data.destination, form.destination || ''),
      destination: textValue(data.destination, form.destination || ''),
      companion: form.companion,
      style: form.style,
      notes: [form.notes, textValue(data.vibe,''), textValue(data.pace,''), textValue(data.bestFor,''), textValue(data.tripMood,'')].filter(Boolean).join(' · '),
      mode: window.currentTripPayload?.localMode ? 'local' : 'classic',
      query: [textValue(data.vibe,''), textValue(data.pace,''), textValue(data.bestFor,''), signals.moodKey, signals.paceKey].join(' ')
    }), signals, textValue(data.destination, form.destination || ''));
    if (!recs.length) { node.innerHTML = ''; return; }
    const copy = resultCopy();
    const title = copy.signalTitle;
    const desc = copy.signalDesc;
    node.innerHTML = `
      <div class="section-head">
        <div>
          <span class="eyebrow">${copy.signalEyebrow}</span>
          <h2 class="section-title">${title}</h2>
          <p class="section-desc">${desc}</p><p class="section-desc">${adaptiveNudgeCopy(textValue(data.destination, form.destination || ''), signals)}</p>
        </div>
      </div>
      <div class="loop-grid">${recs.map(item => `
        <article class="loop-card info-card">
          <div class="loop-card-top"><span class="eyebrow">${escapeHtml(item.preset?.destination || item.slug || 'Base')}</span><span class="loop-card-vibe">${escapeHtml((item.tags || []).slice(0,2).join(' · '))}</span></div>
          <h3>${escapeHtml(textValue(item.title, item.slug || 'Base'))}</h3>
          <p>${escapeHtml(textValue(item.desc, ''))}</p>
          <div class="card-actions">
            <a class="soft-btn" href="${item.guide || '#'}" data-signal-tags="${(item.tags || []).join('|')}" data-signal-city="${item.preset?.destination || ''}" data-signal-title="${textValue(item.title, item.slug || 'Base')}" data-signal-source="result-signal-guide">${copy.cityGuide}</a>
            <a class="ghost-btn" href="${item.example || item.guide || '#'}" data-signal-tags="${(item.tags || []).join('|')}" data-signal-city="${item.preset?.destination || ''}" data-signal-title="${textValue(item.title, item.slug || 'Base')}" data-signal-source="result-signal-sample">${copy.sampleRoute}</a>
            <a class="secondary-btn" href="${location.pathname}?destination=${encodeURIComponent(item.preset?.destination || '')}#plannerForm" data-signal-tags="${(item.tags || []).join('|')}" data-signal-city="${item.preset?.destination || ''}" data-signal-title="${textValue(item.title, item.slug || 'Base')}" data-signal-source="result-signal-planner">${copy.plannerBase}</a>
          </div>
        </article>`).join('')}</div>`;
    window.RyokoApp?.recordSignalInteraction && node.querySelectorAll('[data-signal-tags]').forEach(el => {
      if (el.dataset.signalBound === '1') return;
      el.dataset.signalBound = '1';
      el.addEventListener('click', () => {
        window.RyokoApp.recordSignalInteraction({
          tags: String(el.dataset.signalTags || '').split('|').filter(Boolean),
          city: el.dataset.signalCity || '',
          title: el.dataset.signalTitle || '',
          source: el.dataset.signalSource || 'result-signal'
        });
      });
    });
  }

  function renderRefineSection(data){
    const node = qs('resultRefineSection');
    if (!node) return;
    const pack = getPriorityRefinePack(textValue(data.destination, readForm().destination || ''));
    if (!pack) { node.innerHTML=''; node.classList.add('hidden'); return; }
    node.classList.remove('hidden');
    const copy = {
      eyebrow: uiCopy('루트 정교화', 'Route refinement', 'ルートの精緻化', '路線微調整'),
      title: uiCopy('지금 결과를 더 좋게 읽는 세 가지 축', 'Three cleaner ways to tune this result', 'この結果をもっと良く読む三つの軸', '把這次結果讀得更準的三個方向'),
      desc: uiCopy('district deeper note, day rhythm, 그리고 rainy / slower / night 변주를 한 번에 붙였습니다.', 'District depth, day rhythm, and rainy / slower / night switches now sit together here so the route reads less like output and more like an edited city package.', 'エリアの読みどころ、一日のリズム、rainy / slower / night の切り替えをここにまとめました。', '把區域延伸筆記、一日節奏與 rainy / slower / night 變奏一起收進這裡。'),
      district: uiCopy('District deeper note','District deeper note','エリアの読みどころ','區域延伸筆記'),
      rhythm: uiCopy('Day rhythm','Day rhythm','一日のリズム','一日節奏'),
      variants: uiCopy('Quick variants','Quick variants','すぐ切り替え','快速變奏'),
      visit: uiCopy('Visit split','Visit split','訪問の分岐','造訪分流'),
      entry: uiCopy('Entry routes','Entry routes','入口ルート','入口路線')
    };
    const entryPack = getPriorityEntryPack(textValue(data.destination, readForm().destination || ''));
    const editorial = priorityResultEditorialMap[String(textValue(data.destination, readForm().destination || '')).trim().toLowerCase()];
    const editorialPack = editorial ? (editorial[window.RyokoApp?.lang || 'ko'] || editorial.en || editorial.ko) : null;
    node.innerHTML = `
      <div class="section-head result-section-head">
        <div>
          <span class="eyebrow">${copy.eyebrow}</span>
          <h3 class="section-title">${copy.title}</h3>
          <p class="section-desc">${copy.desc}</p>
        </div>
      </div>
      <div class="loop-grid">
        <article class="loop-card info-card"><div class="loop-card-top"><span class="eyebrow">${copy.district}</span></div><p>${pack.district}</p></article>
        <article class="loop-card info-card"><div class="loop-card-top"><span class="eyebrow">${copy.rhythm}</span></div>${pack.rhythm.map(item => `<div class="summary-line editorial-line"><strong>${item[0]}</strong><span>${item[1]}</span></div>`).join('')}</article>
        <article class="loop-card info-card"><div class="loop-card-top"><span class="eyebrow">${copy.variants}</span></div>${pack.variants.map(item => `<div class="summary-line editorial-line"><strong>${item[0]}</strong><span>${item[1]}</span></div>`).join('')}</article>
        ${entryPack ? `<article class="loop-card info-card"><div class="loop-card-top"><span class="eyebrow">${copy.visit}</span></div><div class="summary-line editorial-line"><strong>${entryPack.first[0]}</strong><span>${entryPack.first[1]} — ${entryPack.first[2]}</span></div><div class="summary-line editorial-line"><strong>${entryPack.second[0]}</strong><span>${entryPack.second[1]} — ${entryPack.second[2]}</span></div></article>` : ''}
        ${entryPack ? `<article class="loop-card info-card"><div class="loop-card-top"><span class="eyebrow">${copy.entry}</span></div>${entryPack.entries.map(item => `<div class="summary-line editorial-line"><strong>${item[0]}</strong><span>${item[1]}</span></div>`).join('')}</article>` : ''}
      </div>
      ${editorialPack ? `<div class="result-editorial-memo-grid">
        <article class="result-editorial-memo-card info-card"><span>${editorialPack.title}</span><p>${editorialPack.why}</p></article>
        <article class="result-editorial-memo-card info-card"><span>${window.RyokoApp?.lang === 'ko' ? 'Best for' : window.RyokoApp?.lang === 'ja' ? 'Best for' : window.RyokoApp?.lang === 'zhHant' ? 'Best for' : 'Best for'}</span><p>${editorialPack.bestFor}</p></article>
        <article class="result-editorial-memo-card info-card"><span>${window.RyokoApp?.lang === 'ko' ? 'If it rains' : window.RyokoApp?.lang === 'ja' ? 'If it rains' : window.RyokoApp?.lang === 'zhHant' ? 'If it rains' : 'If it rains'}</span><p>${editorialPack.rainy}</p></article>
        <article class="result-editorial-memo-card info-card"><span>${window.RyokoApp?.lang === 'ko' ? 'If you want it slower' : window.RyokoApp?.lang === 'ja' ? 'If you want it slower' : window.RyokoApp?.lang === 'zhHant' ? 'If you want it slower' : 'If you want it slower'}</span><p>${editorialPack.slower}</p></article>
        <article class="result-editorial-memo-card info-card result-editorial-memo-card-wide"><span>${window.RyokoApp?.lang === 'ko' ? 'One thing to swap' : window.RyokoApp?.lang === 'ja' ? 'One thing to swap' : window.RyokoApp?.lang === 'zhHant' ? 'One thing to swap' : 'One thing to swap'}</span><p>${editorialPack.swap}</p></article>
        ${(() => { const branchKey = String(textValue(data.destination, readForm().destination || '')).trim().toLowerCase(); const branchMap = priorityResultBranchMap[branchKey]; const branchLines = branchMap ? (branchMap[window.RyokoApp?.lang || 'ko'] || branchMap.en || []) : []; return branchLines.length ? `<article class="result-editorial-memo-card info-card result-editorial-memo-card-wide result-editorial-continue-card"><span>${window.RyokoApp?.lang === 'ko' ? 'Continue with' : window.RyokoApp?.lang === 'ja' ? 'Continue with' : window.RyokoApp?.lang === 'zhHant' ? 'Continue with' : 'Continue with'}</span><div class="result-editorial-continue-list">${branchLines.map(line => `<p>${line}</p>`).join('')}</div></article>` : ''; })()}
      </div>` : ''}`;
  }

  function renderLoopSection(data){
    const node = qs('resultLoopSection');
    if (!node) return;
    const baseCity = textValue(data.destination, readForm().destination || 'Tokyo');
    const current = window.RyokoApp.getCityLoopData(baseCity) || { name: baseCity, guide:'magazine/', example:'magazine/' };
    const related = window.RyokoApp.getRelatedCities(baseCity).slice(0, 3);
    const recent = (window.RyokoStorage.getRecentTrips?.() || []).filter(item => String(item.destination || '').toLowerCase() !== String(baseCity).toLowerCase()).slice(0, 1);
    const relatedCards = related.map(city => `
      <article class="loop-card info-card">
        <div class="loop-card-top"><span class="eyebrow">${escapeHtml(city.country)}</span><span class="loop-card-vibe">${escapeHtml(city.vibe)}</span></div>
        <h3>${escapeHtml(city.name)}</h3>
        <p>${uiCopy('도시 가이드로 먼저 읽고, 그 무드를 더 차분한 루트로 바꿔보세요.', 'Start from the city guide, then turn that mood into a calmer, cleaner route.', 'まず都市ガイドを読み、その空気をより落ち着いたルートへ整えてみてください。', '先從城市指南讀起，再把那個氣氛整理成更安穩的路線。')}</p>
        <div class="card-actions">
          <a class="soft-btn" href="${window.RyokoApp.resolvePath(city.guide)}">${copy.cityGuide}</a>
          <a class="ghost-btn" href="${window.RyokoApp.resolvePath(city.example)}">${copy.sampleRoute}</a>
        </div>
      </article>`).join('');
    const continueCard = recent[0] ? `
      <article class="loop-feature info-card">
        <div class="loop-feature-copy">
          <span class="eyebrow">${copy.keepLoop}</span>
          <h3>${uiCopy(`${recent[0].destination || '최근 여행'}로 다시 돌아가기`, `Jump back into ${recent[0].destination || 'your recent trip'}`)}</h3>
          <p>${escapeHtml((recent[0].planData?.summary || recent[0].notes || uiCopy('이미 다시 열어볼 수 있는 다른 여행 흐름이 준비되어 있어요.', 'You already have another trip flow ready to reopen.')).slice(0, 180))}</p>
          <div class="card-actions">
            <a class="primary-btn" href="${location.pathname}?trip=${encodeURIComponent(window.RyokoStorage.encodeShare(recent[0]))}">${copy.openRecent}</a>
            <a class="secondary-btn" href="${window.RyokoApp.navHref('trips')}">${copy.openTrips}</a>
          </div>
        </div>
      </article>` : `
      <article class="loop-feature info-card">
        <div class="loop-feature-copy">
          <span class="eyebrow">${copy.keepLoop}</span>
          <h3>${uiCopy(`${current.name}를 더 읽고 이 루트를 저장하세요`, `Read ${current.name} deeper, then save the route`)}</h3>
          <p>${uiCopy('도시 가이드로 무드를 더 선명하게 만든 뒤, 이 플랜을 My Trips에 남겨두면 다음 탐색이 더 쉬워집니다.', 'Use the city guide to sharpen the vibe, keep this plan in My Trips, and come back with stronger context next time.')}</p>
          <div class="card-actions">
            <a class="primary-btn" href="${window.RyokoApp.resolvePath(current.guide)}">${copy.readGuide}</a>
            <a class="secondary-btn" href="${window.RyokoApp.navHref('trips')}">${copy.openTrips}</a>
          </div>
        </div>
      </article>`;
    node.innerHTML = `
      <div class="section-head">
        <div>
          <span class="eyebrow">${copy.nextLoopEyebrow}</span>
          <h2 class="section-title">${copy.nextLoopTitle}</h2>
          <p class="section-desc">${copy.nextLoopDesc}</p>
        </div>
      </div>
      ${continueCard}
      <div class="loop-grid">${relatedCards}</div>`;
  }

  function renderChecklist(data){
    const checklist = (data.checklist || []).length ? data.checklist : samplePlans.tokyo.checklist;
    qs('checklistList').innerHTML = checklist.map(item => `<div class="check-item"><span class="check-icon">✓</span><div class="check-text">${item}</div></div>`).join('');
  }
  function renderPlan(data){
    data = applyPriorityResultDayPolish(data);
    window.__RYOKO_LAST_RESULT__ = data;
    qs('resultTitle').textContent = data.title || `${data.destination} editorial route`;
    qs('resultSummary').textContent = normalizeSummary(data);
    renderMeta(data);
    renderEditorialHero(data);
    renderDayRail(data);
    renderDays(data);
    renderVisualStory(data);
    renderRefineSection(data);
    renderTips(data);
    renderBudget(data);
    renderChecklist(data);
    renderSharedTripBanner(window.sharedTripSource || null);
    renderJourneyLoop(data);
    renderSignalShelf(data);
    updateStickyCopy(data);
    updateShareMeta(data);
    window.currentTripPayload = { ...readForm(), planData:data, title:data.title || data.destination };
    window.RyokoStorage.addRecentTrip({ ...window.currentTripPayload, destination:data.destination || readForm().destination });
  }
  async function generate(){
    const payload = readForm();
    if (!payload.destination) { showToast(uiCopy('도시를 먼저 선택해 주세요.','Choose a city first.'), 'warn'); return; }
    setButtonBusy(qs('submitBtn'), window.RyokoApp.t('planner.generating'));
    try {
      const res = await fetch(`${window.RyokoApp.pathRoot}api/generate`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      renderPlan(data);
      revealResult();
      showToast(uiCopy('여정을 준비했어요.','Your trip is ready.'), 'success');
    } catch (e) {
      const fallback = samplePlans[payload.destination.toLowerCase()] || samplePlans.tokyo;
      renderPlan({...fallback, destination: payload.destination || fallback.destination});
      revealResult();
      showToast(uiCopy('샘플 리듬으로 먼저 보여드릴게요.','Loaded a sample route as a fallback.'), 'info');
    } finally {
      resetButtonBusy(qs('submitBtn'));
    }
  }
  function useExample(key='tokyo'){
    const plan = samplePlans[key] || samplePlans.tokyo;
    qs('destination').value = plan.destination;
    qs('notes').value = normalizeSummary(plan);
    renderPlan(plan);
    revealResult();
    showToast(uiCopy('샘플 루트를 불러왔어요.','Sample route loaded.'), 'info');
  }
  function saveCurrentTrip(){
    if (!window.currentTripPayload) return showToast(uiCopy('먼저 여정을 만들어 주세요.','Generate a trip first.'), 'warn');
    const saved = window.RyokoStorage.saveTrip(window.currentTripPayload);
    showToast(uiCopy(`${saved.title || saved.destination} 저장 완료`,`Saved ${saved.title || saved.destination}`), 'success');
  }
  async function shareCurrentTrip(){
    if (!window.currentTripPayload) return showToast(uiCopy('먼저 여정을 만들어 주세요.','Generate a trip first.'), 'warn');
    const code = window.RyokoStorage.encodeShare(window.currentTripPayload);
    const url = `${location.origin}${location.pathname}?trip=${encodeURIComponent(code)}`;
    const data = window.currentTripPayload.planData || {};
    const shareText = [textValue(data.summary, ''), textValue(data.bestFor, '')].filter(Boolean).join(' · ');
    const shareData = {
      title: window.currentTripPayload.title || 'Ryokoplan route',
      text: shareText || `${window.currentTripPayload.destination} route from Ryokoplan`,
      url
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showToast(uiCopy('공유 패널을 열었어요.','Opened share sheet.'), 'success');
        return;
      } catch {}
    }
    try {
      await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${url}`);
      showToast(uiCopy('링크를 복사했어요.','Link copied.'), 'success');
    } catch {
      window.prompt('Copy this link', url);
    }
  }
  function savePdf(){
    const printWindow = window.open('', '_blank');
    if (!window.currentTripPayload) return showToast(uiCopy('먼저 여정을 만들어 주세요.','Generate a trip first.'), 'warn');
    if (!printWindow) return showToast(uiCopy('팝업이 차단되어 PDF 창을 열 수 없어요.','Popup blocked. Allow a new tab to export PDF.'), 'warn');
    const data = window.currentTripPayload.planData || {};
    const lang = window.RyokoApp?.lang || 'en';
    const copy = {
      pdfTag: 'Ryokoplan · Editorial PDF',
      vibe: uiCopy('무드','Vibe','ムード','氛圍'),
      pace: uiCopy('페이스','Pace','節奏','步調'),
      bestFor: uiCopy('잘 맞는 여행자','Best for','向いている旅','最適合'),
      quickRhythm: uiCopy('리듬','Rhythm','流れ','節奏'),
      quickShape: uiCopy('루트 구조','Route shape','ルート構成','路線結構'),
      quickWorks: uiCopy('잘 맞는 타입','Works best for','合う旅のタイプ','適合的旅人'),
      editorsTake: uiCopy('편집 메모','Editorial note','編集ノート','編輯筆記'),
      dayByDay: uiCopy('하루별 흐름','Day by day','日ごとの流れ','每日節奏'),
      localTips: uiCopy('현지 팁','Local tips','現地メモ','在地筆記'),
      budget: uiCopy('예산','Budget','予算','預算'),
      checklist: uiCopy('체크리스트','Checklist','チェックリスト','旅行清單'),
      cityCover: uiCopy('도시 커버','City cover','シティカバー','城市封面'),
      routeMood: uiCopy('루트 무드','Route mood','ルートムード','路線氛圍'),
      nextBranch: uiCopy('다음 가지','Next branch','次の分岐','下一個分支'),
      localTip: uiCopy('현지 팁','Local tip','現地メモ','在地筆記'),
      generatedOn: uiCopy('생성일','Generated on','作成日','生成日期'),
      classicRouting: uiCopy('관광객 모드','Classic routing','定番ルート','經典路線'),
      localModeOn: uiCopy('현지인 모드','Local mode on','ローカルモード','在地模式'),
      cityCoverText: uiCopy('이 여정 전체의 톤을 먼저 잡아주는 커버 컷입니다.','The cover frame that sets the tone of this itinerary first.','この旅全体のトーンを最初に決めるカバーフレームです。','這是先替整段旅程定下基調的封面畫面。'),
      routeMoodText: uiCopy('첫날의 리듬과 주요 앵커를 한 번에 읽을 수 있게 정리한 비주얼 노트입니다.','A visual note that lets you read day-one rhythm and key anchors at a glance.','初日の流れと主要アンカーをひと目で読めるように整えたビジュアルノートです。','整理成一眼就能看懂第一天節奏與關鍵 anchor 的視覺筆記。'),
      nextBranchText: uiCopy('다음 도시로 자연스럽게 이어질 수 있는 추천 가지입니다.','A natural next-city branch to keep the read-and-save loop moving.','読みと保存の流れを保ったまま次の都市へつなげる分岐です。','這是一個能讓閱讀與保存循環自然延續到下一座城市的分支。'),
      visualStory: uiCopy('비주얼 스토리','Visual story','ビジュアルストーリー','視覺故事'),
      visualStoryDesc: uiCopy('도시 커버, 이번 루트의 분위기, 그리고 다음 도시까지 한 번에 읽을 수 있는 PDF용 스토리 패키지입니다.','A PDF-ready story package that keeps the city cover, current route mood, and next branch on one spread.','都市カバー、今回のルートの空気、次の都市までを一度に読める PDF 用ストーリーパッケージです。','把城市封面、這次路線的氣氛與下一個城市分支整合在同一頁的 PDF 故事包。')
    };
    const rawDestination = window.currentTripPayload.destination || data.destination || 'Trip';
    const destination = escapeHtml(rawDestination);
    const title = escapeHtml(data.title || `${rawDestination} editorial route`);
    const summary = escapeHtml(normalizeSummary(data));
    const budgetSummary = escapeHtml(textValue(data.budgetSummary, ''));
    const signature = [
      textValue(data.tripMood,''),
      textValue(data.dayDensity,''),
      textValue(data.budgetMode,''),
      window.currentTripPayload.localMode ? copy.localModeOn : copy.classicRouting
    ].filter(Boolean).join(' · ');
    const localeMap = { ko:'ko-KR', en:'en-US', ja:'ja-JP', zhHant:'zh-Hant' };
    const generatedAt = new Date().toLocaleDateString(localeMap[lang] || 'en-US', { year:'numeric', month:'long', day:'numeric' });
    const quickFacts = [
      { label: copy.quickRhythm, value: textValue(data.pace, '-') },
      { label: copy.quickShape, value: summarizeRouteShape(data) },
      { label: copy.quickWorks, value: textValue(data.bestFor, '-') }
    ].map(item => `<div class="meta-card quick"><span class="meta-label">${escapeHtml(item.label)}</span><strong>${escapeHtml(item.value)}</strong></div>`).join('');
    const metaCards = [
      { label: copy.vibe, value: textValue(data.vibe, '-') },
      { label: copy.pace, value: textValue(data.pace, '-') },
      { label: copy.bestFor, value: textValue(data.bestFor, '-') }
    ].map(item => `<div class="meta-card"><span class="meta-label">${escapeHtml(item.label)}</span><strong>${escapeHtml(item.value)}</strong></div>`).join('');
    const editorNote = escapeHtml(buildEditorNote(data));
    const coverImage = window.RyokoApp.resolvePath(cityImageFor(rawDestination));
    const routeMoodImage = window.RyokoApp.resolvePath(exampleImageFor(rawDestination));
    const related = window.RyokoApp.getRelatedCities(rawDestination)[0] || window.RyokoApp.getCityLoopData(rawDestination) || { name: rawDestination, image: cityImageFor(rawDestination), vibe:'editorial route' };
    const relatedName = textValue(related.name, rawDestination);
    const relatedImage = window.RyokoApp.resolvePath(related.image || cityImageFor(relatedName));
    const dayOne = data.days?.[0] || {};
    const dayOnePlaces = normalizePlaces(dayOne).slice(0,3).map(place => place.name).join(' · ');
    const visualCards = [
      { kicker: copy.cityCover, title: rawDestination, text: textValue(data.summary, copy.cityCoverText), image: coverImage },
      { kicker: copy.routeMood, title: textValue(dayOne.title, uiCopy('첫날의 리듬', 'Opening rhythm', '一日目のリズム', '第一天的節奏')), text: dayOnePlaces || copy.routeMoodText, image: routeMoodImage },
      { kicker: copy.nextBranch, title: uiCopy(`${relatedName}까지 이어보기`, `Branch into ${relatedName}`, `${relatedName}へ続ける`, `延伸到 ${relatedName}`), text: uiCopy(`${textValue(related.vibe, 'editorial route')} 톤의 도시로 다음 탐색을 이어갈 수 있습니다.`, `This ${textValue(related.vibe, 'editorial route')} city is the cleanest next branch from here if you want the next read to feel related, not random.`, `${textValue(related.vibe, 'editorial route')}の空気を持つ都市へ、そのまま次の探索をつなげられます。`, `這座帶有 ${textValue(related.vibe, 'editorial route')} 氛圍的城市，最適合作為下一段延伸。`), image: relatedImage }
    ].map(card => `
      <article class="story-card">
        <div class="story-image" style="background-image:linear-gradient(180deg, rgba(17,27,45,0.08), rgba(17,27,45,0.58)), url('${card.image}')"></div>
        <div class="story-body">
          <span class="story-kicker">${escapeHtml(card.kicker)}</span>
          <h3>${escapeHtml(card.title)}</h3>
          <p>${escapeHtml(card.text)}</p>
        </div>
      </article>`).join('');
    const daysHtml = (data.days || []).map(d => {
      const places = normalizePlaces(d).map((p, idx) => `
        <div class="place-row">
          <div class="place-no">${idx + 1}</div>
          <div>
            <strong>${escapeHtml(p.name)}</strong>
            <p>${escapeHtml(p.reason)}</p>
          </div>
        </div>`).join('');
      return `
        <section class="day-block">
          <div class="day-top">
            <span class="day-chip">${escapeHtml(getDayLabel(d.day))}</span>
            <div>
              <h3>${escapeHtml(textValue(d.title, `Day ${d.day}`))}</h3>
              <p class="day-intro">${escapeHtml(textValue(d.intro || '', ''))}</p>
            </div>
          </div>
          <div class="places">${places}</div>
          ${d.localTip ? `<div class="tip-inline"><strong>${escapeHtml(copy.localTip)}</strong><span>${escapeHtml(textValue(d.localTip, ''))}</span></div>` : ''}
        </section>`;
    }).join('');
    const budgetRows = (Array.isArray(data.budgetBreakdown) ? data.budgetBreakdown.map(x => [x.category, x.amount]) : Object.entries(data.budgetBreakdown || {}))
      .map(([k,v])=>`<div class="budget-row"><span>${escapeHtml(budgetLabel(k))}</span><strong>${escapeHtml(v)}</strong></div>`).join('');
    const tipsSource = (data.localTips || []).length ? data.localTips : [uiCopy('이동 사이에 15분 정도의 여백을 남겨두면 전체 리듬이 훨씬 좋아집니다.', 'Leave a 15-minute pocket between anchors to keep the route feeling light.', '移動のあいだに15分ほどの余白を残すと、全体のテンポがぐっと整います。', '在各個停點之間留出約 15 分鐘的空白，整體節奏會更輕盈。')];
    const checklistSource = (data.checklist || []).length ? data.checklist : [uiCopy('교통/영업시간을 마지막으로 한 번 더 확인하세요.', 'Do one last check on transport timing and opening hours.', '交通と営業時間を最後にもう一度確認してください。', '最後再確認一次交通時間與營業資訊。')];
    const tipsHtml = tipsSource.map(i => `<div class="list-row"><span class="dot">•</span><span>${escapeHtml(i)}</span></div>`).join('');
    const checklistHtml = checklistSource.map(i => `<div class="list-row"><span class="dot">✓</span><span>${escapeHtml(i)}</span></div>`).join('');
    printWindow.document.write(`<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
  :root{--bg:#fcfaf6;--paper:#ffffff;--ink:#15273a;--muted:#667085;--line:#e7dfd3;--soft:#f8f3eb;--soft2:#fff4ea;--navy:#17324f;--coral:#f07c4c;--blue:#edf3f7}
  *{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  body{margin:0;background:var(--bg);color:var(--ink);font-family:Arial,sans-serif;line-height:1.58}
  .page{padding:26px}
  .cover{padding:26px;border:1px solid var(--line);border-radius:28px;background:linear-gradient(180deg,#fffdf9 0%,#f7f2ea 100%)}
  .cover-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:18px;align-items:stretch}
  .cover-copy{display:flex;flex-direction:column;justify-content:space-between}
  .eyebrow{display:inline-block;padding:8px 12px;border-radius:999px;background:var(--soft2);color:#b96732;font-weight:700;font-size:12px;letter-spacing:.04em;text-transform:uppercase}
  h1{margin:14px 0 10px;font-size:30px;line-height:1.08}
  .summary{margin:0;color:var(--muted);font-size:15px}
  .signature{margin-top:10px;font-weight:700;color:#9a734b}
  .hero-visual{min-height:280px;border-radius:24px;background-size:cover;background-position:center;position:relative;overflow:hidden}
  .hero-note{position:absolute;left:16px;right:16px;bottom:16px;padding:14px 16px;border-radius:18px;background:rgba(255,255,255,.88);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.7)}
  .hero-note .meta-label{margin-bottom:4px}
  .meta-grid,.facts-grid,.story-grid{display:grid;gap:12px}
  .meta-grid{grid-template-columns:repeat(3,1fr);margin-top:18px}
  .facts-grid{grid-template-columns:repeat(3,1fr);margin-top:16px}
  .meta-card{padding:14px;border-radius:18px;background:#fff;border:1px solid var(--line)}
  .meta-card.quick{background:linear-gradient(180deg,#fffdf9 0%,#fff7ef 100%)}
  .meta-label,.story-kicker{display:block;font-size:11px;font-weight:700;color:#9a734b;text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px}
  .section{margin-top:18px;padding:20px;border:1px solid var(--line);border-radius:24px;background:var(--paper)}
  .section.dark{background:linear-gradient(180deg,#18324f 0%,#102033 100%);color:#f8fafc;border-color:#17324f}
  .section h2{margin:0 0 12px;font-size:20px}
  .section.dark h2,.section.dark p,.section.dark .story-kicker{color:#f8fafc}
  .story-grid{grid-template-columns:repeat(3,1fr)}
  .story-card{border-radius:22px;overflow:hidden;background:#fff;border:1px solid var(--line)}
  .story-image{height:160px;background-size:cover;background-position:center}
  .story-body{padding:14px}
  .story-body h3{margin:0 0 6px;font-size:18px;line-height:1.22}
  .story-body p{margin:0;color:var(--muted);font-size:13px}
  .section.dark .story-card{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.12)}
  .section.dark .story-body p{color:#d6e3f0}
  .day-block{padding:16px;border-radius:18px;background:linear-gradient(180deg,#fffdf9 0%,#fff8f0 100%);border:1px solid var(--line);margin-bottom:14px;position:relative;overflow:hidden}
  .day-block::before{content:"";position:absolute;left:12px;top:16px;bottom:16px;width:3px;border-radius:999px;background:linear-gradient(180deg,#f4c8ab,#f07c4c)}
  .day-top{display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:flex-start;padding-left:12px}
  .day-chip{display:inline-flex;align-items:center;justify-content:center;padding:8px 12px;border-radius:999px;background:#fff;border:1px solid var(--line);font-size:12px;font-weight:700;color:#9a734b}
  .day-block h3{margin:0 0 6px;font-size:18px;line-height:1.3}
  .day-intro{margin:0;color:var(--muted);font-size:14px}
  .places{display:grid;gap:10px;margin-top:14px;padding-left:12px}
  .place-row{display:grid;grid-template-columns:30px 1fr;gap:10px;padding:12px;border-radius:16px;background:#fff;border:1px solid #f0e8dc}
  .place-no{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:var(--soft2);border:1px solid #f4d6bc;font-weight:700;color:#b96732;font-size:12px}
  .place-row p{margin:4px 0 0;color:var(--muted);font-size:13px}
  .tip-inline{margin:12px 0 0 12px;padding:12px 14px;border-radius:16px;background:var(--blue)}
  .tip-inline strong{display:block;margin-bottom:4px}
  .budget-row,.list-row{display:grid;grid-template-columns:1fr auto;gap:16px;padding:12px 0;border-bottom:1px solid #f0e8dc}
  .list-row{grid-template-columns:auto 1fr;align-items:start}
  .dot{font-weight:700;color:#b96732}
  .budget-note{margin:0 0 8px;color:var(--muted)}
  .split{display:grid;grid-template-columns:1fr 1fr;gap:18px}
  .footer-note{margin-top:18px;color:var(--muted);font-size:12px;text-align:right}
  @page{size:A4;margin:12mm}
  @media print{.page{padding:0}.section,.cover,.story-card,.day-block{break-inside:avoid}.story-grid{grid-template-columns:repeat(3,1fr)}}
</style>
</head>
<body>
  <main class="page">
    <section class="cover">
      <div class="cover-grid">
        <div class="cover-copy">
          <div>
            <span class="eyebrow">${escapeHtml(copy.pdfTag)}</span>
            <h1>${title}</h1>
            <p class="summary">${summary}</p>
            ${signature ? `<p class="summary signature">${escapeHtml(signature)}</p>` : ''}
            <div class="facts-grid">${quickFacts}</div>
          </div>
          <div>
            <div class="meta-grid">${metaCards}</div>
          </div>
        </div>
        <div class="hero-visual" style="background-image:linear-gradient(180deg, rgba(16,23,38,0.06), rgba(16,23,38,0.58)), url('${coverImage}')">
          <div class="hero-note">
            <span class="meta-label">${escapeHtml(copy.editorsTake)}</span>
            <strong>${escapeHtml(uiCopy(`${rawDestination} 에디토리얼 플로우`, `${rawDestination} editorial flow`, `${rawDestination} エディトリアルフロー`, `${rawDestination} 編輯路線氛圍`))}</strong>
            <p class="summary" style="margin-top:6px">${editorNote}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="section dark">
      <h2>${escapeHtml(copy.visualStory)}</h2>
      <p>${escapeHtml(copy.visualStoryDesc)}</p>
      <div class="story-grid">${visualCards}</div>
    </section>
    <section class="section">
      <h2>${escapeHtml(copy.dayByDay)}</h2>
      ${daysHtml}
    </section>
    <section class="split">
      <section class="section">
        <h2>${escapeHtml(copy.localTips)}</h2>
        ${tipsHtml}
      </section>
      <section class="section">
        <h2>${escapeHtml(copy.checklist)}</h2>
        ${checklistHtml}
      </section>
    </section>
    <section class="section">
      <h2>${escapeHtml(copy.budget)}</h2>
      <p class="budget-note">${budgetSummary}</p>
      ${budgetRows}
    </section>
    <div class="footer-note">${destination} · ${escapeHtml(copy.generatedOn)} ${escapeHtml(generatedAt)} · Ryokoplan</div>
  </main>
<script>window.onload=()=>setTimeout(()=>window.print(),260)<\/script>
</body>
</html>`);
    printWindow.document.close();
  }

  function sharedBannerCopy(){
    const copy = resultCopy();
    return {
      kicker: copy.sharedKicker,
      title: copy.sharedTitle,
      desc: copy.sharedDesc,
      openGuide: copy.openGuide,
      save: copy.saveTrip,
      duplicate: copy.useThisRoute,
      source: uiCopy('공유 루트 컨텍스트','Shared trip context','共有ルートの文脈','分享路線脈絡')
    };
  }
  function renderSharedTripBanner(payload){
    const node = qs('sharedTripBanner');
    if (!node) return;
    if (!payload) {
      node.classList.add('hidden');
      node.innerHTML = '';
      return;
    }
    const copy = sharedBannerCopy();
    const data = payload.planData || payload;
    const baseCity = payload.destination || data.destination || '';
    const city = window.RyokoApp.getCityLoopData(baseCity) || null;
    const guideHref = city ? window.RyokoApp.resolvePath(city.guide) + '#city-neighborhoods' : window.RyokoApp.navHref('magazine');
    const chips = [payload.destination || data.destination, payload.duration || data.duration, payload.companion || data.companion, data.vibe, data.pace].filter(Boolean).slice(0,5)
      .map(value => `<span class="trip-mini-chip">${escapeHtml(value)}</span>`).join('');
    const sharedPayload = { ...payload, localMode: payload.localMode ?? window.currentTripPayload?.localMode ?? false };
    const signals = getResultSignals(data, sharedPayload);
    node.classList.remove('hidden');
    node.innerHTML = `
      <div class="shared-trip-banner-head">
        <span class="eyebrow">${copy.kicker}</span>
        <strong>${copy.title}</strong>
      </div>
      <p class="card-copy">${escapeHtml(normalizeSummary(data) || copy.desc)}</p>
      <div class="trip-chip-row">${chips}</div>
      <div class="shared-trip-banner-note">
        <span>${copy.source}</span>
        <strong>${escapeHtml(data.bestFor || payload.notes || '')}</strong>
      </div>
      ${sharedLoopMarkup(baseCity || textValue(data.destination,''), signals)}
      ${sharedProductContextMarkup(baseCity || textValue(data.destination,''), payload)}
      <div class="card-actions">
        <button class="secondary-btn" id="sharedBannerSaveBtn">${copy.save}</button>
        <button class="ghost-btn" id="sharedBannerDuplicateBtn">${copy.duplicate}</button>
        <a class="soft-btn" href="${guideHref}">${copy.openGuide}</a>
      </div>`;
    qs('sharedBannerSaveBtn')?.addEventListener('click', saveCurrentTrip);
    qs('sharedBannerDuplicateBtn')?.addEventListener('click', () => {
      const formPayload = {
        destination: payload.destination || data.destination || '',
        duration: payload.duration || data.duration || '',
        companion: payload.companion || data.companion || '',
        style: payload.style || data.style || '',
        notes: payload.notes || normalizeSummary(data) || '',
        tripMood: payload.tripMood || data.tripMood || 'balanced',
        dayDensity: payload.dayDensity || data.dayDensity || 'balanced',
        budgetMode: payload.budgetMode || data.budgetMode || 'balanced'
      };
      if (window.RyokoApp?.applyPlannerPreset) window.RyokoApp.applyPlannerPreset(formPayload);
      document.querySelector('.planner-shell')?.scrollIntoView({ behavior:'smooth', block:'start' });
      showToast(uiCopy('이 공유 루트를 바탕으로 다시 시작해요.','Starting from this shared route.'), 'info');
    });
  }

  function applyPresetFromQuery(){
    const params = new URLSearchParams(location.search);
    const destination = params.get('destination');
    if (destination && qs('destination')) qs('destination').value = destination;
  }

  function loadSharedTrip(){
    const code = new URLSearchParams(location.search).get('trip');
    if (!code) return;
    const payload = window.RyokoStorage.decodeShare(code);
    if (!payload) return;
    window.sharedTripSource = { ...payload, importedFromLink: true };
    window.currentTripPayload = { ...payload, sharedSource: 'link' };
    if (payload.destination) qs('destination').value = payload.destination;
    if (payload.notes) qs('notes').value = payload.notes;
    if (payload.tripMood) document.querySelectorAll('[data-pill-group="tripMood"]').forEach(btn => btn.classList.toggle('active', btn.dataset.pillValue === payload.tripMood));
    if (payload.dayDensity) document.querySelectorAll('[data-pill-group="dayDensity"]').forEach(btn => btn.classList.toggle('active', btn.dataset.pillValue === payload.dayDensity));
    if (payload.budgetMode) document.querySelectorAll('[data-pill-group="budgetMode"]').forEach(btn => btn.classList.toggle('active', btn.dataset.pillValue === payload.budgetMode));
    renderPlan(payload.planData || payload);
    window.RyokoStorage.addSharedTrip(payload);
  }
  function init(){
    if (!document.body.dataset.page || document.body.dataset.page !== 'planner') return;
    refreshOptions();
    bindSelectionChips();
    applyPresetFromQuery();
    window.addEventListener('ryoko:langchange', () => {
      refreshOptions();
      const existing = window.__RYOKO_LAST_RESULT__;
      if (existing) renderPlan(existing);
    });
    qs('localToggle').addEventListener('click', () => qs('localToggle').classList.toggle('on'));
    qs('submitBtn').addEventListener('click', generate);
    qs('exampleBtn').addEventListener('click', () => useExample('tokyo'));
    bindJumpChips();
    bindStickyBar();
    qs('saveTripBtn').addEventListener('click', saveCurrentTrip);
    qs('shareTripBtn').addEventListener('click', shareCurrentTrip);
    qs('pdfTripBtn').addEventListener('click', savePdf);
    qs('stickySaveBtn')?.addEventListener('click', saveCurrentTrip);
    qs('stickyShareBtn')?.addEventListener('click', shareCurrentTrip);
    qs('stickyPdfBtn')?.addEventListener('click', savePdf);
    loadSharedTrip();
    if (!window.currentTripPayload) renderPlan(samplePlans.tokyo);
  }
  return { init, renderPlan };
})();
window.addEventListener('DOMContentLoaded', () => window.RyokoPlanner.init());
