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
  function updateShareMeta(data){
    const destination = textValue(data?.destination, '').trim();
    const routeTitle = data?.title || destination || 'Ryokoplan';
    const title = destination ? `${destination} route — Ryokoplan` : `${routeTitle} — Ryokoplan`;
    const shareMetaMap = {
      Tokyo:'A Tokyo route shaped around cleaner axes, softer resets, and a city-first reading order.',
      Kyoto:'A Kyoto route built around quiet windows, slower pockets, and a cleaner editorial pace.',
      Seoul:'A Seoul route balancing stronger neighborhood contrast with a smoother city rhythm.',
      Busan:'A Busan route built around coast timing, view pockets, and easier movement.',
      Fukuoka:'A Fukuoka route shaped by compact food rhythm and short, readable movement.',
      Taipei:'A Taipei route tuned around night-food rhythm, layered alleys, and softer pacing.',
      'Hong Kong':'A Hong Kong route tuned for harbor density, vertical contrast, and a cleaner night close.'
    };
    const desc = destination
      ? (shareMetaMap[destination] || `${destination} in a city-first flow. Read the neighborhoods, compare the route, and shape the trip.`)
      : (normalizeSummary(data) || 'Read the city. Then build the trip.');
    document.title = title;
    const entries = {
      'meta[name="description"]': desc,
      'meta[property="og:title"]': title,
      'meta[property="og:description"]': desc,
      'meta[name="twitter:title"]': title,
      'meta[name="twitter:description"]': desc,
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
      fukuoka:'assets/images/cities/fukuoka.jpg', seoul:'assets/images/cities/seoul.jpg', busan:'assets/images/cities/busan.jpg',
      jeju:'assets/images/cities/jeju.jpg', gyeongju:'assets/images/cities/gyeongju.jpg'
    };
    return map[slug] || 'assets/images/hero/planner-preview.jpg';
  }
  function exampleImageFor(destination=''){
    const slug = String(destination || '').trim().toLowerCase();
    const map = {
      tokyo:'assets/images/examples/tokyo-first-trip.jpg', osaka:'assets/images/examples/osaka-family.jpg', kyoto:'assets/images/examples/kyoto-slow.jpg',
      fukuoka:'assets/images/examples/fukuoka-food.jpg', seoul:'assets/images/examples/seoul-city-vibes.jpg', busan:'assets/images/examples/busan-parents.jpg',
      jeju:'assets/images/cities/jeju.jpg', gyeongju:'assets/images/cities/gyeongju.jpg'
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
      ko:{district:'시부야-하라주쿠, 아사쿠사-우에노, 기요스미-긴자 중 한 축만 더 깊게 읽으면 결과가 훨씬 정돈됩니다.', rhythm:[['Morning anchor','첫 장면은 아사쿠사나 우에노처럼 이해가 쉬운 축으로 시작하세요.'],['Afternoon reset','오후에는 기요스미·다이칸야마 같은 quieter pocket이 필요합니다.'],['Night close','전망 하나와 늦은 식사 하나면 도쿄의 밤은 충분합니다.']], variants:[['Rainy','실내 전시와 café pocket을 앞에 두고 역 점프를 줄이세요.'],['Slower','한 동네만 깊게 읽고 오후를 비워 두는 편이 더 세련됩니다.'],['Night','큰 조명보다 마지막 이자카야 골목 한 구간이 더 오래 남습니다.']]},
      en:{district:'Tokyo sharpens when one line—Shibuya-Harajuku, Asakusa-Ueno, or Kiyosumi-Ginza—clearly owns the next read instead of competing with the others. Add one museum or dessert pocket and the whole route usually feels more edited.', rhythm:[['Morning anchor','Begin with an easy first-scene district like Asakusa or Ueno.'],['Afternoon reset','Tokyo needs one quieter pocket like Kiyosumi or Daikanyama in the middle.'],['Night close','One skyline moment and one later meal are enough for the close.']], variants:[['Rainy','Lead with an indoor museum or café pocket, remove one station jump, and let one polished district own the middle.'],['Slower','Go deep on one district only, give the afternoon more air, and let the close come from dinner rather than another transfer.'],['Night','A final izakaya lane often lands better than one more big-light scene, especially after one quieter afternoon pocket.']]}
    },
    seoul:{
      ko:{district:'성수-서울숲, 을지로-종로, 한남-이태원 중 어느 대비를 남길지 정하면 결과가 더 또렷해집니다.', rhythm:[['First district','성수나 서촌처럼 첫 결이 분명한 동네로 시작하세요.'],['Midday contrast','낮엔 lighter pocket 하나를 넣어 과밀을 풀어야 합니다.'],['Night district','밤은 을지로나 종로처럼 오래된 결 하나만 남기는 편이 좋습니다.']], variants:[['Rainy','실내 카페·전시·백화점 underground를 한 축으로 붙이세요.'],['Slower','성수와 연남을 다 쓰지 말고 한 축만 깊게 읽으세요.'],['Night','루프톱 하나보다 을지로의 오래된 밤 리듬이 더 오래 갑니다.']]},
      en:{district:'Seoul gets clearer once one contrast line—Seongsu-Seoul Forest, Euljiro-Jongno, or Hannam-Itaewon—clearly owns the day. The route usually improves again when one calmer middle district softens the contrast.', rhythm:[['First district','Open with one clear district such as Seongsu or Seochon.'],['Midday contrast','Add one lighter pocket at midday so the route can breathe.'],['Night district','Let one older Seoul axis own the evening instead of splitting the night in two.']], variants:[['Rainy','Indoor cafés, exhibitions, and basement food lines keep Seoul coherent in rain, especially when one calmer district replaces a second contrast jump.'],['Slower','Choose one daytime district and go deeper instead of widening the route, then let the evening stay on a single older axis.'],['Night','Euljiro after dark often carries memory better than a second rooftop, especially when the afternoon has already been allowed to slow down.']]}
    },
    kyoto:{
      ko:{district:'히가시야마, 가모가와, 서쪽 quiet lane 중 어느 여백을 남길지 먼저 정하는 편이 좋습니다.', rhythm:[['Quiet morning','사람이 몰리기 전 동쪽 축을 먼저 읽으세요.'],['Soft middle','정원·찻집·강변처럼 앉아 있는 pocket이 꼭 필요합니다.'],['Dusk close','교토는 밤보다 dusk가 핵심입니다.']], variants:[['Rainy','사원 수를 줄이고 정원·찻집·전시 한 곳만 남기세요.'],['Slower','오전 장면 하나와 dusk 산책 하나면 충분합니다.'],['Night','강변이나 작은 골목 하나가 가장 교토답게 마무리됩니다.']]},
      en:{district:'Kyoto usually improves once you decide whether Higashiyama, the river edge, or a quieter west-side close should carry the mood. One seated pause and one dusk walk are often more valuable than a fourth icon stop.', rhythm:[['Quiet morning','Read the east-side anchor early before the city crowds up.'],['Soft middle','Kyoto needs one sitting pocket—garden, tea room, or river edge—in the middle.'],['Dusk close','Dusk matters more than late night here.']], variants:[['Rainy','Cut temple count and rebuild around one garden, tea room, or exhibition pocket so the day holds its quiet longer.'],['Slower','One morning scene, one seated pause, and one dusk walk are usually enough.'],['Night','A river edge or one smaller lane often closes Kyoto more gracefully than a later night, especially after one seated pause.']]}
    },
    taipei:{
      ko:{district:'융캉제·동먼, 디화제, 시먼 중 어느 밤 결을 남길지 정하면 타이베이가 더 맛있게 읽힙니다.', rhythm:[['Soft opening','첫 식사와 골목이 같이 붙는 축으로 시작하세요.'],['Textured middle','디화제나 서점 pocket으로 도시 재질을 넣으세요.'],['Night handoff','야시장은 하나만 선명하게 남기고 두 번째 밤 장면으로 넘기세요.']], variants:[['Rainy','카페·서점·실내 식사를 더 길게 붙이면 비 오는 날에도 좋습니다.'],['Slower','융캉제나 디화제 중 한 축만 깊게 읽는 편이 더 선명합니다.'],['Night','늦은 디저트나 tea room이 밤의 여운을 더 오래 만듭니다.']]},
      en:{district:'Taipei gets sharper once you decide whether Yongkang, Dihua, or Ximending should carry the after-dark handoff. The route usually deepens when dessert, tea, or one bookstore pocket takes over the late close.', rhythm:[['Soft opening','Start through lanes and a first meal that open the city gently.'],['Textured middle','Use Dihua or a bookshop pocket to add material beyond appetite.'],['Night handoff','Keep one night market vivid, then pass the close to a second scene.']], variants:[['Rainy','Longer café, bookshop, and indoor-meal pockets make Taipei richer in rain, especially when dessert or tea closes the night.'],['Slower','Read either Yongkang or Dihua more deeply instead of widening the route, then hand the late close to dessert or tea.'],['Night','A later dessert or tea room often extends Taipei better than another market, especially when one softer pocket already holds the middle.']]}
    },
    hongkong:{
      ko:{district:'센트럴-셩완, 침사추이, 완차이 중 어느 수직 리듬을 남길지 고르면 훨씬 정리됩니다.', rhythm:[['Vertical start','경사와 수직감이 보이는 첫 축으로 홍콩을 여세요.'],['Breathing pocket','오후엔 ferry나 covered mall 같은 쉬는 창이 꼭 필요합니다.'],['Harbor close','항구 장면 하나만 선명하게 남기면 충분합니다.']], variants:[['Rainy','covered mall, ferry, 실내 식사 pocket을 더 안정적으로 쓰고 skyline 이동 하나는 덜어내세요.'],['Slower','센트럴과 침사추이를 같은 날 다 깊게 읽지 마세요.'],['Night','야경 하나 뒤엔 slope street나 dessert pocket으로 톤을 낮추세요.']]},
      en:{district:'Hong Kong becomes cleaner once you choose whether Central-Sheung Wan, Tsim Sha Tsui, or Wan Chai should own the vertical rhythm for the day. A ferry, dessert, or harbor-edge pause usually makes the handoff feel far more deliberate.', rhythm:[['Vertical start','Open through a steeper, more compressed axis like Central or Sheung Wan.'],['Breathing pocket','One ferry or covered-mall pause keeps the route alive into the evening.'],['Harbor close','One harbor scene is enough when it is placed well.']], variants:[['Rainy','Lean on covered malls, ferry logic, and indoor meals more confidently.'],['Slower','Do not read both Central and Tsim Sha Tsui deeply on the same day.'],['Night','After one skyline moment, lower the tone through a slope street or dessert pocket.']]}
    },
    busan:{
      ko:{district:'해운대, 광안리, 남포-영도 중 어디를 coast anchor로 둘지 먼저 정하면 결과가 안정됩니다.', rhythm:[['Sea opener','첫 바다는 접근 쉬운 축으로 열고 다른 풍경은 뒤로 남기세요.'],['Rest window','오후엔 카페나 짧은 산책으로 꼭 숨 쉴 창을 두세요.'],['Night shore','광안리 같은 한 shore로 밤을 정리하는 편이 좋습니다.']], variants:[['Rainy','실내 전망과 복합 공간을 더 길게 쓰면 바다 결은 그대로 남습니다.'],['Slower','하루 한 coast 축만 남기고 중간 휴식을 넉넉히 두세요.'],['Night','야경은 한 곳만 선명하게 두고 이동은 짧게 닫으세요.']]},
      en:{district:'Busan stabilizes once you choose whether Haeundae, Gwangalli, or the Nampo-Yeongdo side should own the coast anchor for the day.', rhythm:[['Sea opener','Open through an easier first coast and save the other big scenery for later.'],['Rest window','Busan needs one true pause in the afternoon.'],['Night shore','One shore like Gwangalli is usually enough for the night close.']], variants:[['Rainy','Longer indoor viewpoints and rest-friendly mixed spaces still keep the sea-city tone alive.'],['Slower','Let one coast axis carry the day and give the reset point real space.'],['Night','One night view plus a short transfer chain usually makes the cleanest Busan close.']]}
    },
    fukuoka:{
      ko:{district:'하카타, 텐진, 오호리 중 어떤 compact 축을 먼저 잡을지 정하면 후쿠오카가 훨씬 또렷합니다.', rhythm:[['Food-first start','첫 식사가 쉬운 하카타나 텐진에서 시작하세요.'],['Afternoon soften','오호리 공원이나 café pocket으로 오후를 낮추세요.'],['Compact night','포장마차 하나와 짧은 강변 산책이면 충분합니다.']], variants:[['Rainy','하카타·텐진의 실내 식사 pocket을 더 촘촘히 잇는 편이 좋습니다.'],['Slower','하루 한 축만 깊게 읽고 오후를 시장·카페 pocket으로 낮추세요.'],['Night','night를 길게 끌기보다 yatai 하나로 짧게 닫는 편이 후쿠오카답습니다.']]},
      en:{district:'Fukuoka feels exact once you decide whether Hakata, Tenjin, or the Ohori side should own the compact city axis for that route.', rhythm:[['Food-first start','Open through Hakata or Tenjin so the first meal arrives easily.'],['Afternoon soften','Lower the afternoon through Ohori Park or one café pocket.'],['Compact night','One yatai scene and a short river walk are usually enough.']], variants:[['Rainy','Connect the Hakata and Tenjin indoor meal pockets more tightly in rain.'],['Slower','Read one city axis deeply, then lower the rest through market and café pockets.'],['Night','Fukuoka usually closes better through one compact yatai scene than a longer night chain.']]}}
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
      plannerBase: uiCopy('플래너 베이스', 'Planner base', 'プランナーのベース', '規劃 base'),
      nextCity: uiCopy('다음 도시', 'Next city', '次の都市', '下一座城市'),
      sharedKicker: uiCopy('공유받은 일정','Shared trip','共有ルート','分享行程'),
      sharedTitle: uiCopy('공유된 루트에서 바로 시작했어요', 'You started from a shared route', '共有ルートからこの旅を始めました', '你是從分享路線開始這段旅程的'),
      sharedDesc: uiCopy('공유 링크로 들어온 일정입니다. 그대로 저장하거나, 내 취향에 맞게 다시 다듬을 수 있어요.', 'This route came in through a shared link. Keep it, save it, or reshape it into your own version.', '共有リンクから開いたルートです。このまま保存しても、自分の旅に合わせて整え直しても大丈夫です。', '這條路線是從分享連結打開的。你可以直接保存，也可以依自己的節奏重新整理。'),
      openGuide: uiCopy('도시 가이드 보기','Read guide','ガイドを見る','查看指南'),
      saveTrip: uiCopy('여정 저장','Save Trip','旅程を保存','保存旅程'),
      useThisRoute: uiCopy('이 루트로 시작','Use this route','このルートを使う','使用這條路線'),
      routeLoopEyebrow: uiCopy('루트 루프','Route loop','ルートループ','路線循環'),
      routeLoopTitle: uiCopy('atlas에서 결과까지, 이 흐름을 다시 이어가세요', 'Keep the full flow moving from atlas to result', 'atlas から結果まで、この流れをもう一度つなげましょう', '從 atlas 到結果，讓這個流程繼續接回去'),
      routeLoopDesc: uiCopy('지금 결과를 끝으로 두지 않고, city atlas·도시 가이드·sample route·planner를 다시 오가며 더 좋은 다음 루트를 만들 수 있게 묶었습니다.', 'Do not stop at this result. Move back through the city atlas, the city guide, the sample route, and Planner to shape the next version with better context.', 'この結果で止まらず、city atlas・都市ガイド・sample route・Planner を行き来しながら、次のルートをもっと良い文脈で整えられるようにつなげています。', '別停在這個結果。你可以回到 city atlas、城市指南、sample route 與 Planner 之間來回閱讀，整理出下一版更有脈絡的路線。'),
      atlas: uiCopy('atlas', 'Atlas', 'atlas', 'atlas'),
      neighborhoods: uiCopy('동네 픽', 'Neighborhood picks', '近所のピック', '鄰里精選'),
      routeResult: uiCopy('현재 결과', 'Current result', '今の結果', '目前結果'),
      backToAtlas: uiCopy('atlas로 돌아가기', 'Back to atlas', 'atlas に戻る', '回到 atlas'),
      readCityLayer: uiCopy('도시 결 더 읽기', 'Read city guide layer', '都市の層を読む', '繼續讀城市層次'),
      compareExample: uiCopy('샘플과 비교하기', 'Compare example', 'サンプルと比べる', '對照範例'),
      tunePlanner: uiCopy('플래너에서 미세조정', 'Tune in Planner', 'Planner で整える', '在 Planner 微調'),
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
          <a class="soft-btn" href="${plannerHref}">${uiCopy('플래너에서 다듬기','Tune in Planner','Planner で整える','到 Planner 微調')}</a>
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
    const cards = [
      {
        kicker: copy.cityCover,
        title: `${current.name}`,
        text: textValue(data.summary, uiCopy('이 여정의 전체 리듬을 먼저 잡아주는 대표 컷입니다.', 'This is the cover frame that sets the route tone first.')),
        image: window.RyokoApp.resolvePath(current.image || cityImageFor(baseCity)),
        actionLabel: uiCopy('도시 가이드', 'City guide', '都市ガイド', '城市指南'),
        actionHref: window.RyokoApp.resolvePath(current.guide)
      },
      {
        kicker: copy.routeMood,
        title: textValue(dayOne.title, uiCopy('첫날의 리듬', 'Opening rhythm')),
        text: dayOnePlaces || uiCopy('첫날은 강한 앵커와 부드러운 포켓을 섞어 과밀하지 않게 시작합니다.', 'Day one mixes one anchor and softer pockets so the route opens cleanly.'),
        image: window.RyokoApp.resolvePath(exampleImageFor(baseCity)),
        actionLabel: copy.sampleRead,
        actionHref: window.RyokoApp.resolvePath(current.example)
      },
      {
        kicker: uiCopy('시즌 노트', 'Seasonal note', '季節ノート', '季節筆記'),
        title: seasonal.title,
        text: seasonal.desc,
        image: window.RyokoApp.resolvePath(current.image || cityImageFor(baseCity)),
        actionLabel: copy.plannerBase,
        actionHref: '#plannerForm'
      },
      {
        kicker: copy.nextBranch,
        title: uiCopy(`${related.name}까지 이어서 읽기`, `Branch into ${related.name}`, `${related.name}へ続けて読む`, `延伸閱讀到 ${related.name}`),
        text: uiCopy(`${related.vibe} 톤의 도시를 이어서 읽으면 다음 저장 루프가 더 자연스럽게 이어집니다.`, `A ${related.vibe} city keeps the next save-and-read loop moving naturally, especially when this result already leans in that direction.`, `${related.vibe}の空気を持つ都市へ続けると、次の保存と読み直しの流れが自然につながります。`, `接著讀一座帶有 ${related.vibe} 氛圍的城市，會讓下一輪保存與再閱讀更自然地延續下去。`),
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
      { step:'04', label:copy.plannerBase, title: uiCopy(`${current.name} planner`, `${current.name} planner`, `${current.name} Planner`, `${current.name} Planner`), desc: copy.tunePlanner, href: plannerHref, cls:'planner' },
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
      </div>`;
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
