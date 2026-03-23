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
  function getDayLabel(day){ return window.RyokoApp?.lang === 'ko' ? `${day}일차` : `Day ${day}`; }
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
    const map = lang === 'ko'
      ? { flight:'항공', hotel:'숙소', food:'식비', transit:'교통', admission:'입장료', activities:'체험', transport:'이동' }
      : { flight:'Flight', hotel:'Hotel', food:'Food', transit:'Transit', admission:'Admission', activities:'Activities', transport:'Transport' };
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
      updateActiveDayRail();
    };
    window.addEventListener('scroll', onScroll, { passive:true });
    onScroll();
  }
  function updateStickyCopy(data){
    if (qs('stickyTripTitle')) qs('stickyTripTitle').textContent = data.title || `${data.destination || 'Trip'} Plan`;
    if (qs('stickyTripMeta')) qs('stickyTripMeta').textContent = [textValue(data.vibe,''), textValue(data.pace,'')].filter(Boolean).join(' · ') || 'Jump, save, share, or export';
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
  function updateShareMeta(data){
    const title = data?.title || 'Ryokoplan';
    const desc = normalizeSummary(data) || 'Read the city. Shape a better trip.';
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
    const isKo = (window.RyokoApp?.lang || 'ko') === 'ko';
    const maps = {
      tripMood: isKo ? { balanced:'균형형', editorial:'매거진형', soft:'소프트', vivid:'비비드' } : { balanced:'Balanced mood', editorial:'Editorial mood', soft:'Soft mood', vivid:'Vivid mood' },
      dayDensity: isKo ? { light:'가볍게', balanced:'균형형', full:'꽉 차게' } : { light:'Light days', balanced:'Balanced days', full:'Full days' },
      budgetMode: isKo ? { smart:'스마트', balanced:'밸런스', treat:'한 끼는 확실하게' } : { smart:'Smart spend', balanced:'Balanced spend', treat:'Treat-worthy' }
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
      tokyo:'assets/images/cities/tokyo.png', osaka:'assets/images/cities/osaka.png', kyoto:'assets/images/cities/kyoto.png',
      fukuoka:'assets/images/cities/fukuoka.png', seoul:'assets/images/cities/seoul.png', busan:'assets/images/cities/busan.png',
      jeju:'assets/images/cities/jeju.png', gyeongju:'assets/images/cities/gyeongju.png'
    };
    return map[slug] || 'assets/images/hero/planner-preview.png';
  }
  function exampleImageFor(destination=''){
    const slug = String(destination || '').trim().toLowerCase();
    const map = {
      tokyo:'assets/images/examples/tokyo-first-trip.png', osaka:'assets/images/examples/osaka-family.png', kyoto:'assets/images/examples/kyoto-slow.png',
      fukuoka:'assets/images/examples/fukuoka-food.png', seoul:'assets/images/examples/seoul-city-vibes.png', busan:'assets/images/examples/busan-parents.png',
      jeju:'assets/images/cities/jeju.png', gyeongju:'assets/images/cities/gyeongju.png'
    };
    return map[slug] || cityImageFor(destination);
  }
  function uiCopy(ko, en){
    return (window.RyokoApp?.lang || 'ko') === 'ko' ? ko : en;
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
    const firstTip = Array.isArray(data.localTips) && data.localTips[0] ? textValue(data.localTips[0], '') : '';
    const opening = textValue(data.days?.[0]?.title, 'The opening day stays intentionally gentle');
    const ending = textValue(data.days?.[data.days.length - 1]?.title, 'the final stretch stays light');
    return firstTip || `${opening} so the route settles in smoothly, and ${ending.toLowerCase()} instead of feeling overloaded.`;
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
      gyeongju:{ ko:{title:'경주는 dusk를 넣어야 계절감이 깊어집니다', desc:'한옥과 유적의 질감은 해 질 무렵에 더 선명해지고, 비 오는 날엔 hanok/café fallback이 route를 살려줍니다.', chips:['Dusk heritage mood','Hanok fallback','Slow evening close']}, en:{title:'Gyeongju deepens when dusk is part of the route', desc:'Heritage texture sharpens toward dusk, and rainy hanok/café fallback keeps the day intact.', chips:['Dusk heritage mood','Hanok fallback','Slow evening close']}}
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
    if (eyebrow) eyebrow.textContent = uiCopy(`${destination} 루트 노트`, `${destination} route note`);
    if (coverMeta) coverMeta.textContent = uiCopy(`${destination} 플래너 에디트`, `${destination} planner edit`);
    if (coverNote) coverNote.textContent = uiCopy(`${destination} 결과도 홈과 매거진에서 쓰는 같은 커버 규칙으로 읽히게 정리했습니다.`, `${destination} results now follow the same cover framing used on the home and magazine pages.`);
    if (rhythm) rhythm.textContent = textValue(data.pace, 'Balanced city pacing');
    if (shape) shape.textContent = summarizeRouteShape(data);
    if (best) best.textContent = textValue(data.bestFor, 'Travelers who want a smoother route');
    if (note) note.textContent = buildEditorNote(data);
    if (visual) {
      visual.style.backgroundImage = `linear-gradient(180deg, rgba(17,27,45,0.08) 0%, rgba(17,27,45,0.58) 100%), url("${cityImageFor(destination)}")`;
    }
    if (visualTitle) visualTitle.textContent = voice?.strap || uiCopy(`${destination} 에디토리얼 플로우`, `${destination} editorial flow`);
    if (visualDesc) visualDesc.textContent = textValue(data.summary, 'Built like a readable magazine route instead of a crowded checklist.');
    if (visualKicker) visualKicker.textContent = voice?.mood || textValue(data.vibe, 'City cover');
  }
  function buildMicroBrief(data){
    const firstDay = data.days?.[0] || {};
    const lastDay = data.days?.[data.days?.length - 1] || {};
    const firstPlace = normalizePlaces(firstDay)[0]?.name || textValue(firstDay.title, uiCopy('첫날 시작', 'Opening day'));
    const lastMove = normalizePlaces(lastDay).slice(-1)[0]?.name || textValue(lastDay.title, uiCopy('마지막 날', 'Final day'));
    const voice = window.RyokoApp?.getCityVoice?.(data.destination || readForm().destination || '');
    return [
      { kicker: uiCopy('시작점', 'Start clean'), text: uiCopy(`${firstPlace} 쪽에서 시작하면 첫 인상이 덜 산만합니다.`, `Start around ${firstPlace} for a cleaner opening tone.`) },
      { kicker: uiCopy('리듬 유지', 'Keep the rhythm'), text: voice?.watch || buildEditorNote(data) },
      { kicker: uiCopy('이 일정의 결', 'Trip tone'), text: voice?.strap || textValue(data.bestFor, uiCopy('도시를 무리 없이 읽고 싶은 여행자', 'Travelers who want a smoother, better-paced city route.')) }
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

  function renderVisualStory(data){
    const node = qs('resultVisualStoryGrid');
    if (!node) return;
    const baseCity = textValue(data.destination, readForm().destination || 'Tokyo');
    const current = window.RyokoApp.getCityLoopData(baseCity) || { name: baseCity, country:'', guide:'magazine/', example:'magazine/', image: cityImageFor(baseCity), vibe:'editorial route' };
    const related = window.RyokoApp.getRelatedCities(baseCity)[0] || current;
    const dayOne = data.days?.[0] || {};
    const dayOnePlaces = normalizePlaces(dayOne).slice(0,3).map(place => place.name).join(' · ');
    const title = qs('visualStoryTitle');
    const desc = qs('visualStoryDesc');
    const eyebrow = qs('visualStoryEyebrow');
    if (eyebrow) eyebrow.textContent = uiCopy('비주얼 루트 노트', 'Visual route notes');
    if (title) title.textContent = uiCopy('결과를 기사형 패키지처럼 읽게 만듭니다', 'See the result like an editorial package');
    if (desc) desc.textContent = uiCopy('도시 커버, 이번 루트의 분위기, 그리고 다음으로 가지를 칠 수 있는 도시까지 한 번에 보여줍니다.', 'A city cover, one route mood frame, and one next branch keep the result from feeling like a plain checklist.');
    const seasonal = getSeasonalResultFeature(baseCity);
    const cards = [
      {
        kicker: uiCopy('City cover', 'City cover'),
        title: `${current.name}`,
        text: textValue(data.summary, uiCopy('이 여정의 전체 리듬을 먼저 잡아주는 대표 컷입니다.', 'This is the cover frame that sets the route tone first.')),
        image: window.RyokoApp.resolvePath(current.image || cityImageFor(baseCity)),
        actionLabel: uiCopy('도시 가이드', 'City guide'),
        actionHref: window.RyokoApp.resolvePath(current.guide)
      },
      {
        kicker: uiCopy('Route mood', 'Route mood'),
        title: textValue(dayOne.title, uiCopy('첫날의 리듬', 'Opening rhythm')),
        text: dayOnePlaces || uiCopy('첫날은 강한 앵커와 부드러운 포켓을 섞어 과밀하지 않게 시작합니다.', 'Day one mixes one anchor and softer pockets so the route opens cleanly.'),
        image: window.RyokoApp.resolvePath(exampleImageFor(baseCity)),
        actionLabel: uiCopy('샘플 보기', 'Read sample'),
        actionHref: window.RyokoApp.resolvePath(current.example)
      },
      {
        kicker: uiCopy('Seasonal note', 'Seasonal note'),
        title: seasonal.title,
        text: seasonal.desc,
        image: window.RyokoApp.resolvePath(current.image || cityImageFor(baseCity)),
        actionLabel: uiCopy('Planner base', 'Planner base'),
        actionHref: '#plannerForm'
      },
      {
        kicker: uiCopy('Next branch', 'Next branch'),
        title: uiCopy(`${related.name}까지 이어서 읽기`, `Branch into ${related.name}`),
        text: uiCopy(`${related.vibe} 톤의 도시를 이어서 읽으면 다음 저장 루프가 더 자연스럽게 이어집니다.`, `A ${related.vibe} city keeps the next save-and-read loop moving naturally.`),
        image: window.RyokoApp.resolvePath(related.image || cityImageFor(related.name)),
        actionLabel: uiCopy('다음 도시', 'Next city'),
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


  function renderSignalShelf(data){
    const node = qs('resultSignalShelf');
    if (!node) return;
    const form = readForm();
    const recs = window.RyokoApp.getSignalRecommendations({
      city: textValue(data.destination, form.destination || ''),
      destination: textValue(data.destination, form.destination || ''),
      companion: form.companion,
      style: form.style,
      notes: form.notes,
      mode: window.currentTripPayload?.localMode ? 'local' : 'classic'
    });
    if (!recs.length) { node.innerHTML = ''; return; }
    const title = uiCopy('지금 선택에 더 잘 맞는 베이스', 'Bases that fit this route better');
    const desc = uiCopy('우천일, 부모님 동행, 늦은 밤, 푸드 중심 같은 신호를 기준으로 다시 이어볼 수 있는 베이스입니다.', 'These are stronger next bases when rain, parents, late-night pacing, or food-led routing matters more.');
    node.innerHTML = `
      <div class="section-head">
        <div>
          <span class="eyebrow">${uiCopy('Signal-aware picks','Signal-aware picks')}</span>
          <h2 class="section-title">${title}</h2>
          <p class="section-desc">${desc}</p>
        </div>
      </div>
      <div class="loop-grid">${recs.map(item => `
        <article class="loop-card info-card">
          <div class="loop-card-top"><span class="eyebrow">${escapeHtml(item.preset?.destination || item.slug || 'Base')}</span><span class="loop-card-vibe">${escapeHtml((item.tags || []).slice(0,2).join(' · '))}</span></div>
          <h3>${escapeHtml(textValue(item.title, item.slug || 'Base'))}</h3>
          <p>${escapeHtml(textValue(item.desc, ''))}</p>
          <div class="card-actions">
            <a class="soft-btn" href="${item.guide || '#'}" data-signal-tags="${(item.tags || []).join('|')}" data-signal-city="${item.preset?.destination || ''}" data-signal-title="${textValue(item.title, item.slug || 'Base')}" data-signal-source="result-signal-guide">${uiCopy('도시 가이드','City guide')}</a>
            <a class="ghost-btn" href="${item.example || item.guide || '#'}" data-signal-tags="${(item.tags || []).join('|')}" data-signal-city="${item.preset?.destination || ''}" data-signal-title="${textValue(item.title, item.slug || 'Base')}" data-signal-source="result-signal-sample">${uiCopy('샘플 루트','Sample route')}</a>
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
        <p>${uiCopy('도시 가이드로 먼저 읽고, 그 무드를 더 차분한 루트로 바꿔보세요.', 'Start from the city guide, then turn that mood into a calmer, cleaner route.')}</p>
        <div class="card-actions">
          <a class="soft-btn" href="${window.RyokoApp.resolvePath(city.guide)}">${uiCopy('도시 가이드','City guide')}</a>
          <a class="ghost-btn" href="${window.RyokoApp.resolvePath(city.example)}">${uiCopy('샘플 루트','Sample route')}</a>
        </div>
      </article>`).join('');
    const continueCard = recent[0] ? `
      <article class="loop-feature info-card">
        <div class="loop-feature-copy">
          <span class="eyebrow">${uiCopy('다음 루프로','Keep the loop going')}</span>
          <h3>${uiCopy(`${recent[0].destination || '최근 여행'}로 다시 돌아가기`, `Jump back into ${recent[0].destination || 'your recent trip'}`)}</h3>
          <p>${escapeHtml((recent[0].planData?.summary || recent[0].notes || uiCopy('이미 다시 열어볼 수 있는 다른 여행 흐름이 준비되어 있어요.', 'You already have another trip flow ready to reopen.')).slice(0, 180))}</p>
          <div class="card-actions">
            <a class="primary-btn" href="${location.pathname}?trip=${encodeURIComponent(window.RyokoStorage.encodeShare(recent[0]))}">${uiCopy('최근 일정 열기','Open recent trip')}</a>
            <a class="secondary-btn" href="${window.RyokoApp.navHref('trips')}">My Trips</a>
          </div>
        </div>
      </article>` : `
      <article class="loop-feature info-card">
        <div class="loop-feature-copy">
          <span class="eyebrow">${uiCopy('다음 루프로','Keep the loop going')}</span>
          <h3>${uiCopy(`${current.name}를 더 읽고 이 플랜을 저장하세요`, `Read ${current.name} deeper, then save the plan`)}</h3>
          <p>${uiCopy('도시 가이드로 무드를 더 선명하게 만든 뒤, 이 플랜을 My Trips에 남겨두면 다음 탐색이 더 쉬워집니다.', 'Use the city guide to sharpen the vibe, keep this plan in My Trips, and come back with stronger context next time.')}</p>
          <div class="card-actions">
            <a class="primary-btn" href="${window.RyokoApp.resolvePath(current.guide)}">${uiCopy('도시 가이드 읽기','Read city guide')}</a>
            <a class="secondary-btn" href="${window.RyokoApp.navHref('trips')}">Open My Trips</a>
          </div>
        </div>
      </article>`;
    node.innerHTML = `
      <div class="section-head">
        <div>
          <span class="eyebrow">${uiCopy('다음 액션 루프','Next step loop')}</span>
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
    window.__RYOKO_LAST_RESULT__ = data;
    qs('resultTitle').textContent = data.title || `${data.destination} Trip Plan`;
    qs('resultSummary').textContent = normalizeSummary(data);
    renderMeta(data);
    renderEditorialHero(data);
    renderDayRail(data);
    renderDays(data);
    renderVisualStory(data);
    renderTips(data);
    renderBudget(data);
    renderChecklist(data);
    renderSharedTripBanner(window.sharedTripSource || null);
    renderLoopSection(data);
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
      title: window.currentTripPayload.title || 'Ryokoplan Trip',
      text: shareText || `${window.currentTripPayload.destination} trip from Ryokoplan`,
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
    const copy = lang === 'ko'
      ? {
          pdfTag: 'Ryokoplan · Editorial PDF',
          vibe: 'Vibe', pace: 'Pace', bestFor: 'Best for',
          quickRhythm: 'Rhythm', quickShape: 'Route shape', quickWorks: 'Works best for',
          editorsTake: uiCopy('편집 메모','Editorial note'), dayByDay: uiCopy('하루별 일정','Day by day'), localTips: uiCopy('현지 팁','Local tips'), budget: uiCopy('예산','Budget'), checklist: uiCopy('체크리스트','Checklist'),
          cityCover: 'City cover', routeMood: 'Route mood', nextBranch: 'Next branch',
          localTip: 'Local tip', generatedOn: '생성일',
          classicRouting: 'Classic routing', localModeOn: 'Local mode on',
          cityCoverText: '이 여정 전체의 톤을 먼저 잡아주는 커버 컷입니다.',
          routeMoodText: '첫날의 리듬과 주요 앵커를 한 번에 읽을 수 있게 정리한 비주얼 노트입니다.',
          nextBranchText: '다음 도시로 자연스럽게 이어질 수 있는 추천 가지입니다.'
        }
      : {
          pdfTag: 'Ryokoplan · Editorial PDF',
          vibe: 'Vibe', pace: 'Pace', bestFor: 'Best for',
          quickRhythm: 'Rhythm', quickShape: 'Route shape', quickWorks: 'Works best for',
          editorsTake: uiCopy('편집 메모','Editorial note'), dayByDay: uiCopy('하루별 일정','Day by day'), localTips: uiCopy('현지 팁','Local tips'), budget: uiCopy('예산','Budget'), checklist: uiCopy('체크리스트','Checklist'),
          cityCover: 'City cover', routeMood: 'Route mood', nextBranch: 'Next branch',
          localTip: 'Local tip', generatedOn: 'Generated on',
          classicRouting: 'Classic routing', localModeOn: 'Local mode on',
          cityCoverText: 'The cover frame that sets the tone of this itinerary first.',
          routeMoodText: 'A visual note that lets you read day one rhythm and key anchors at a glance.',
          nextBranchText: 'A natural next city branch to keep the reading-and-saving loop moving.'
        };
    const rawDestination = window.currentTripPayload.destination || data.destination || 'Trip';
    const destination = escapeHtml(rawDestination);
    const title = escapeHtml(data.title || `${rawDestination} Trip Plan`);
    const summary = escapeHtml(normalizeSummary(data));
    const budgetSummary = escapeHtml(textValue(data.budgetSummary, ''));
    const signature = [
      textValue(data.tripMood,''),
      textValue(data.dayDensity,''),
      textValue(data.budgetMode,''),
      window.currentTripPayload.localMode ? copy.localModeOn : copy.classicRouting
    ].filter(Boolean).join(' · ');
    const generatedAt = new Date().toLocaleDateString(lang === 'ko' ? 'ko-KR' : 'en-US', { year:'numeric', month:'long', day:'numeric' });
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
      { kicker: copy.routeMood, title: textValue(dayOne.title, lang === 'ko' ? '첫날의 리듬' : 'Opening rhythm'), text: dayOnePlaces || copy.routeMoodText, image: routeMoodImage },
      { kicker: copy.nextBranch, title: lang === 'ko' ? `${relatedName}까지 이어보기` : `Branch into ${relatedName}`, text: lang === 'ko' ? `${textValue(related.vibe, 'editorial route')} 톤의 도시로 다음 탐색을 이어갈 수 있습니다.` : `This ${textValue(related.vibe, 'editorial route')} city is the cleanest next branch from here.`, image: relatedImage }
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
    const tipsSource = (data.localTips || []).length ? data.localTips : [lang === 'ko' ? '이동 사이에 15분 정도의 여백을 남겨두면 전체 리듬이 훨씬 좋아집니다.' : 'Leave a 15-minute pocket between anchors to keep the route feeling light.'];
    const checklistSource = (data.checklist || []).length ? data.checklist : [lang === 'ko' ? '교통/영업시간을 마지막으로 한 번 더 확인하세요.' : 'Do one last check on transport timing and opening hours.'];
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
            <strong>${escapeHtml(rawDestination)} editorial flow</strong>
            <p class="summary" style="margin-top:6px">${editorNote}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="section dark">
      <h2>${lang === 'ko' ? 'Visual story' : 'Visual story'}</h2>
      <p>${lang === 'ko' ? '도시 커버, 이번 루트의 분위기, 그리고 다음 도시까지 한 번에 읽을 수 있는 PDF용 스토리 패키지입니다.' : 'A PDF-ready story package that keeps the city cover, current route mood, and next branch on one spread.'}</p>
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
    return window.RyokoApp.lang === 'ko'
      ? {
          kicker:'공유받은 일정',
          title:'누군가 만든 흐름에서 바로 시작했어요',
          desc:'공유 링크로 들어온 일정입니다. 그대로 저장하거나, 내 취향에 맞게 다시 다듬을 수 있어요.',
          openGuide:'도시 가이드 보기',
          save:'내 여정에 저장',
          duplicate:'이 흐름으로 다시 만들기',
          source:'Shared trip context'
        }
      : {
          kicker:'Shared trip',
          title:'You started from someone else’s itinerary',
          desc:'This plan came in through a shared link. Keep it as-is, save it to your vault, or reshape it into your own version.',
          openGuide:'Read city guide',
          save:'Save to My Trips',
          duplicate:'Use as my base',
          source:'Shared trip context'
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
    const city = window.RyokoApp.getCityLoopData(payload.destination || data.destination || '') || null;
    const guideHref = city ? window.RyokoApp.resolvePath(city.guide) : window.RyokoApp.navHref('magazine');
    const chips = [payload.destination || data.destination, payload.duration || data.duration, payload.companion || data.companion, data.vibe, data.pace].filter(Boolean).slice(0,5)
      .map(value => `<span class="trip-mini-chip">${escapeHtml(value)}</span>`).join('');
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
      showToast(uiCopy('이 일정의 흐름을 기반으로 다시 시작해요.','Starting from this shared route.'), 'info');
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
