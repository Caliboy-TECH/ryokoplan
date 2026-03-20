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
      tripMood: 'Editorial city glow',
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
  function getDayLabel(day){ return `Day ${day}`; }
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
    const map = { flight:'Flight', hotel:'Hotel', food:'Food', transit:'Transit', admission:'Admission', activities:'Activities', transport:'Transport' };
    const raw = String(key || '').trim();
    return map[raw.toLowerCase()] || raw.charAt(0).toUpperCase() + raw.slice(1);
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
    };
    window.addEventListener('scroll', onScroll, { passive:true });
    onScroll();
  }
  function updateStickyCopy(data){
    if (qs('stickyTripTitle')) qs('stickyTripTitle').textContent = data.title || `${data.destination || 'Trip'} Plan`;
    if (qs('stickyTripMeta')) qs('stickyTripMeta').textContent = [textValue(data.vibe,''), textValue(data.pace,'')].filter(Boolean).join(' · ') || 'Jump, save, share, or export';
  }
  function updateActiveJumpChip(){
    const sections = ['resultTop','resultDaysSection','localTipsSection','budgetSection','checklistSection'];
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
    }));
  }
  function updateShareMeta(data){
    const title = data?.title || 'Ryokoplan';
    const desc = normalizeSummary(data) || 'Read the city. Plan the trip.';
    document.title = `${title} — Ryokoplan`;
    const entries = {
      'meta[name="description"]': desc,
      'meta[property="og:title"]': title,
      'meta[property="og:description"]': desc,
      'meta[name="twitter:title"]': title,
      'meta[name="twitter:description"]': desc
    };
    Object.entries(entries).forEach(([selector, value]) => {
      const node = document.querySelector(selector);
      if (node && value) node.setAttribute('content', value);
    });
  }
  function refreshOptions(){
    qs('duration').innerHTML = options(window.RyokoApp.t('options.durations'));
    qs('companion').innerHTML = options(window.RyokoApp.t('options.companions'));
    qs('style').innerHTML = options(window.RyokoApp.t('options.styles'));
    const needs = window.RyokoApp.t('options.needs') || [];
    const box = qs('needsGrid');
    box.innerHTML = needs.map((label, idx) => `<label class="option-chip"><input type="checkbox" value="${label}" data-need-index="${idx}"><span>${label}</span></label>`).join('');
    box.querySelectorAll('.option-chip').forEach(chip => chip.addEventListener('click', e => {
      if (e.target.tagName === 'INPUT') return;
      const input = chip.querySelector('input');
      input.checked = !input.checked;
      chip.classList.toggle('is-selected', input.checked);
    }));
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
    const maps = {
      tripMood: { balanced:'Balanced mood', editorial:'Editorial mood', soft:'Soft mood', vivid:'Vivid mood' },
      dayDensity: { light:'Light days', balanced:'Balanced days', full:'Full days' },
      budgetMode: { smart:'Smart spend', balanced:'Balanced spend', treat:'Treat-worthy' }
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
  function renderSignature(data){
    const form = readForm();
    const chips = [
      textValue(data.tripMood, prettyPillValue('tripMood', form.tripMood || 'balanced')),
      textValue(data.dayDensity, prettyPillValue('dayDensity', form.dayDensity || 'balanced')),
      textValue(data.budgetMode, prettyPillValue('budgetMode', form.budgetMode || 'balanced')),
      form.localMode ? 'Local mode on' : 'Classic routing'
    ].filter(Boolean);
    const node = qs('resultSignature');
    if (!node) return;
    node.innerHTML = chips.map(item => `<span class="result-signature-chip">${escapeHtml(item)}</span>`).join('');
  }
  function renderDays(data){
    const destination = textValue(data.destination, readForm().destination || 'Trip');
    const savedPlaces = getSavedPlaces(destination);
    const days = (data.days || []).map((day, dayIndex) => {
      const places = normalizePlaces(day);
      const compact = places.slice(0, 3).map(place => `<span class="day-mini-chip">${escapeHtml(place.name)}</span>`).join('');
      const isOpen = dayIndex === 0 ? ' is-open' : '';
      return `
        <article class="day-card${isOpen}">
          <div class="day-card-header">
            <div class="day-card-top">
              <div>
                <span class="day-badge">${getDayLabel(day.day)}</span>
                <h3 class="day-title">${escapeHtml(textValue(day.title, `Day ${day.day}`))}</h3>
                <p class="day-intro">${escapeHtml(textValue(day.intro || day.summary, ''))}</p>
              </div>
            </div>
            <button class="day-toggle" aria-label="Toggle day">${dayIndex === 0 ? '−' : '+'}</button>
          </div>
          <div class="day-card-summary">${compact}</div>
          <div class="day-card-body">
            <div class="place-list">
              ${places.map((place, idx) => {
                const saved = savedPlaces.includes(place.name);
                return `
                <div class="place-item">
                  <div class="place-index">${idx + 1}</div>
                  <div class="place-copy">
                    <div class="place-name">${escapeHtml(place.name)}</div>
                    <div class="place-reason">${escapeHtml(place.reason)}</div>
                  </div>
                  <button class="place-save${saved ? ' is-saved' : ''}" data-destination="${escapeHtml(destination)}" data-place="${escapeHtml(place.name)}" aria-pressed="${saved ? 'true' : 'false'}">${saved ? '♥' : '♡'}</button>
                </div>`;
              }).join('')}
            </div>
            ${day.localTip ? `<div class="day-tip">${escapeHtml(day.localTip)}</div>` : ''}
          </div>
        </article>`;
    }).join('');
    qs('resultDays').innerHTML = days || '<div class="summary-line">Sample trip ready</div>';
    bindDayInteractions();
  }
  function renderBudget(data){
    const budget = data.budgetBreakdown || {};
    const entries = Array.isArray(budget) ? budget.map(x => [x.category, x.amount]) : Object.entries(budget);
    qs('budgetSummary').textContent = textValue(data.budgetSummary, window.RyokoApp.t('planner.budgetSummaryFallback') || '');
    qs('budgetList').innerHTML = (entries.length ? entries : Object.entries(samplePlans.tokyo.budgetBreakdown)).map(([k,v]) => `<div class="budget-card-line"><strong>${k}</strong><span>${v}</span></div>`).join('');
  }
  function renderTips(data){
    const tips = Array.isArray(data.localTips) && data.localTips.length ? data.localTips : samplePlans.tokyo.localTips;
    qs('localTipsList').innerHTML = tips.map(item => `<div class="tip-card-line"><span class="tip-icon">i</span><div class="tip-text">${item}</div></div>`).join('');
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
        <p>Read the city guide first, then turn that mood into a cleaner route.</p>
        <div class="card-actions">
          <a class="soft-btn" href="${window.RyokoApp.resolvePath(city.guide)}">City guide</a>
          <a class="ghost-btn" href="${window.RyokoApp.resolvePath(city.example)}">Sample route</a>
        </div>
      </article>`).join('');
    const continueCard = recent[0] ? `
      <article class="loop-feature info-card">
        <div class="loop-feature-copy">
          <span class="eyebrow">Keep the loop going</span>
          <h3>Jump back into ${escapeHtml(recent[0].destination || 'your recent trip')}</h3>
          <p>${escapeHtml((recent[0].planData?.summary || recent[0].notes || 'You already have another trip flow ready to reopen.').slice(0, 180))}</p>
          <div class="card-actions">
            <a class="primary-btn" href="${location.pathname}?trip=${encodeURIComponent(window.RyokoStorage.encodeShare(recent[0]))}">Open recent trip</a>
            <a class="secondary-btn" href="${window.RyokoApp.navHref('trips')}">My Trips</a>
          </div>
        </div>
      </article>` : `
      <article class="loop-feature info-card">
        <div class="loop-feature-copy">
          <span class="eyebrow">Keep the loop going</span>
          <h3>Read ${escapeHtml(current.name)} deeper, then save the plan</h3>
          <p>Use the city guide to sharpen the vibe, keep this plan in My Trips, and come back with stronger context next time.</p>
          <div class="card-actions">
            <a class="primary-btn" href="${window.RyokoApp.resolvePath(current.guide)}">Read city guide</a>
            <a class="secondary-btn" href="${window.RyokoApp.navHref('trips')}">Open My Trips</a>
          </div>
        </div>
      </article>`;
    node.innerHTML = `
      <div class="section-head">
        <div>
          <span class="eyebrow">Next step loop</span>
          <h2 class="section-title">Don’t stop at one result</h2>
          <p class="section-desc">Read a related city, reopen a saved trip, or use a sample route to keep the Ryokoplan loop moving.</p>
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
    qs('resultTitle').textContent = data.title || `${data.destination} Trip Plan`;
    qs('resultSummary').textContent = normalizeSummary(data);
    renderMeta(data);
    renderDays(data);
    renderTips(data);
    renderBudget(data);
    renderChecklist(data);
    renderLoopSection(data);
    updateStickyCopy(data);
    updateShareMeta(data);
    window.currentTripPayload = { ...readForm(), planData:data, title:data.title || data.destination };
    window.RyokoStorage.addRecentTrip({ ...window.currentTripPayload, destination:data.destination || readForm().destination });
  }
  async function generate(){
    const payload = readForm();
    if (!payload.destination) { alert('Destination is required.'); return; }
    qs('submitBtn').disabled = true;
    qs('submitBtn').textContent = window.RyokoApp.t('planner.generating');
    try {
      const res = await fetch(`${window.RyokoApp.pathRoot}api/generate`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      renderPlan(data);
    } catch (e) {
      const fallback = samplePlans[payload.destination.toLowerCase()] || samplePlans.tokyo;
      renderPlan({...fallback, destination: payload.destination || fallback.destination});
    } finally {
      qs('submitBtn').disabled = false;
      qs('submitBtn').textContent = window.RyokoApp.t('planner.submit');
    }
  }
  function useExample(key='tokyo'){
    const plan = samplePlans[key] || samplePlans.tokyo;
    qs('destination').value = plan.destination;
    qs('notes').value = normalizeSummary(plan);
    renderPlan(plan);
    document.querySelector('.planner-shell').scrollIntoView({behavior:'smooth'});
  }
  function saveCurrentTrip(){
    if (!window.currentTripPayload) return alert('Generate a plan first.');
    const saved = window.RyokoStorage.saveTrip(window.currentTripPayload);
    alert(`Saved: ${saved.title || saved.destination}`);
  }
  async function shareCurrentTrip(){
    if (!window.currentTripPayload) return alert('Generate a plan first.');
    const code = window.RyokoStorage.encodeShare(window.currentTripPayload);
    const url = `${location.origin}${location.pathname}?trip=${encodeURIComponent(code)}`;
    const data = window.currentTripPayload.planData || {};
    const shareText = [textValue(data.summary, ''), textValue(data.bestFor, '')].filter(Boolean).join(' · ');
    const shareData = {
      title: window.currentTripPayload.title || 'Ryokoplan Trip',
      text: shareText || `${window.currentTripPayload.destination} trip from Ryokoplan`,
      url
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {}
    }
    try {
      await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${url}`);
      alert('Link copied.');
    } catch {
      window.prompt('Copy this link', url);
    }
  }
  function savePdf(){
    const printWindow = window.open('', '_blank');
    if (!printWindow || !window.currentTripPayload) return alert('Generate a plan first.');
    const data = window.currentTripPayload.planData || {};
    const destination = escapeHtml(window.currentTripPayload.destination || data.destination || 'Trip');
    const title = escapeHtml(data.title || `${destination} Trip Plan`);
    const summary = escapeHtml(normalizeSummary(data));
    const budgetSummary = escapeHtml(textValue(data.budgetSummary, ''));
    const signature = [textValue(data.tripMood,''), textValue(data.dayDensity,''), textValue(data.budgetMode,''), window.currentTripPayload.localMode ? 'Local mode on' : 'Classic routing'].filter(Boolean).join(' · ');
    const generatedAt = new Date().toLocaleDateString(window.RyokoApp.lang === 'ko' ? 'ko-KR' : 'en-US', { year:'numeric', month:'long', day:'numeric' });
    const metaCards = [
      { label: 'Vibe', value: textValue(data.vibe, '-') },
      { label: 'Pace', value: textValue(data.pace, '-') },
      { label: 'Best for', value: textValue(data.bestFor, '-') }
    ].map(item => `<div class="meta-card"><span class="meta-label">${escapeHtml(item.label)}</span><strong>${escapeHtml(item.value)}</strong></div>`).join('');
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
            <span class="day-chip">Day ${escapeHtml(d.day)}</span>
            <div>
              <h3>${escapeHtml(textValue(d.title, `Day ${d.day}`))}</h3>
              <p class="day-intro">${escapeHtml(textValue(d.intro || '', ''))}</p>
            </div>
          </div>
          <div class="places">${places}</div>
          ${d.localTip ? `<div class="tip-inline"><strong>Local tip</strong><span>${escapeHtml(textValue(d.localTip, ''))}</span></div>` : ''}
        </section>`;
    }).join('');
    const budgetRows = (Array.isArray(data.budgetBreakdown) ? data.budgetBreakdown.map(x => [x.category, x.amount]) : Object.entries(data.budgetBreakdown || {}))
      .map(([k,v])=>`<div class="budget-row"><span>${escapeHtml(budgetLabel(k))}</span><strong>${escapeHtml(v)}</strong></div>`).join('');
    const tipsHtml = (data.localTips || []).map(i => `<div class="list-row"><span class="dot">•</span><span>${escapeHtml(i)}</span></div>`).join('');
    const checklistHtml = (data.checklist || []).map(i => `<div class="list-row"><span class="dot">✓</span><span>${escapeHtml(i)}</span></div>`).join('');
    printWindow.document.write(`<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
  :root{--bg:#fffdf9;--paper:#ffffff;--ink:#15273a;--muted:#667085;--line:#e8dfd1;--soft:#f7f3ec;--soft2:#fff5eb;--coral:#f07c4c}
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--ink);font-family:Arial,sans-serif;line-height:1.6}
  .page{padding:28px}
  .cover{padding:28px;border:1px solid var(--line);border-radius:28px;background:linear-gradient(180deg,#fffdf9 0%,#f7f3ec 100%)}
  .eyebrow{display:inline-block;padding:8px 12px;border-radius:999px;background:var(--soft2);color:#b96732;font-weight:700;font-size:12px;letter-spacing:.04em;text-transform:uppercase}
  h1{margin:14px 0 10px;font-size:30px;line-height:1.12}
  .summary{margin:0;color:var(--muted);font-size:15px}
  .meta-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:18px}
  .meta-card{padding:14px;border-radius:18px;background:#fff;border:1px solid var(--line)}
  .meta-label{display:block;font-size:11px;font-weight:700;color:#9a734b;text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px}
  .section{margin-top:18px;padding:20px;border:1px solid var(--line);border-radius:24px;background:var(--paper)}
  .section h2{margin:0 0 12px;font-size:20px}
  .day-block{padding:16px;border-radius:18px;background:linear-gradient(180deg,#fffdf9 0%,#fff8f0 100%);border:1px solid var(--line);margin-bottom:14px}
  .day-top{display:grid;grid-template-columns:auto 1fr;gap:12px;align-items:flex-start}
  .day-chip{display:inline-flex;align-items:center;justify-content:center;padding:8px 12px;border-radius:999px;background:#fff;border:1px solid var(--line);font-size:12px;font-weight:700;color:#9a734b}
  .day-block h3{margin:0 0 6px;font-size:18px;line-height:1.3}
  .day-intro{margin:0;color:var(--muted);font-size:14px}
  .places{display:grid;gap:10px;margin-top:14px}
  .place-row{display:grid;grid-template-columns:30px 1fr;gap:10px;padding:12px;border-radius:16px;background:#fff;border:1px solid #f0e8dc}
  .place-no{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:var(--soft2);border:1px solid #f4d6bc;font-weight:700;color:#b96732;font-size:12px}
  .place-row p{margin:4px 0 0;color:var(--muted);font-size:13px}
  .tip-inline{margin-top:12px;padding:12px 14px;border-radius:16px;background:#edf3f7}
  .tip-inline strong{display:block;margin-bottom:4px}
  .budget-row,.list-row{display:grid;grid-template-columns:1fr auto;gap:16px;padding:12px 0;border-bottom:1px solid #f0e8dc}
  .list-row{grid-template-columns:auto 1fr;align-items:start}
  .dot{font-weight:700;color:#b96732}
  .budget-note{margin:0 0 8px;color:var(--muted)}
  .footer-note{margin-top:18px;color:var(--muted);font-size:12px;text-align:right}
  @media print{.page{padding:18px}}
</style>
</head>
<body>
  <main class="page">
    <section class="cover">
      <span class="eyebrow">Ryokoplan · Planner PDF</span>
      <h1>${title}</h1>
      <p class="summary">${summary}</p>
      ${signature ? `<p class="summary" style="margin-top:8px;font-weight:700;color:#9a734b">${escapeHtml(signature)}</p>` : ''}
      <div class="meta-grid">${metaCards}</div>
    </section>
    <section class="section">
      <h2>Day by Day</h2>
      ${daysHtml}
    </section>
    <section class="section">
      <h2>Local Tips</h2>
      ${tipsHtml}
    </section>
    <section class="section">
      <h2>Budget</h2>
      <p class="budget-note">${budgetSummary}</p>
      ${budgetRows}
    </section>
    <section class="section">
      <h2>Checklist</h2>
      ${checklistHtml}
    </section>
    <div class="footer-note">${escapeHtml(destination)} · Generated on ${escapeHtml(generatedAt)} · Ryokoplan</div>
  </main>
<script>window.onload=()=>setTimeout(()=>window.print(),220)<\/script>
</body>
</html>`);
    printWindow.document.close();
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
    window.currentTripPayload = payload;
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
    window.addEventListener('ryoko:langchange', refreshOptions);
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
