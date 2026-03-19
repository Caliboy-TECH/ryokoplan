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
  function readForm(){
    return {
      destination: qs('destination').value.trim(),
      duration: qs('duration').value,
      companion: qs('companion').value || '',
      style: qs('style').value || '',
      travelerTraits: [...document.querySelectorAll('#needsGrid input:checked')].map(i => i.value),
      localMode: qs('localToggle').classList.contains('on'),
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
  function renderDays(data){
    const days = (data.days || []).map(day => {
      const places = normalizePlaces(day);
      return `
        <article class="day-card">
          <div class="day-card-top">
            <div>
              <span class="day-badge">${getDayLabel(day.day)}</span>
              <h3 class="day-title">${textValue(day.title, `Day ${day.day}`)}</h3>
              <p class="day-intro">${textValue(day.intro || day.summary, '')}</p>
            </div>
          </div>
          <div class="place-list">
            ${places.map((place, idx) => `
              <div class="place-item">
                <div class="place-index">${idx + 1}</div>
                <div>
                  <div class="place-name">${place.name}</div>
                  <div class="place-reason">${place.reason}</div>
                </div>
              </div>`).join('')}
          </div>
          ${day.localTip ? `<div class="day-tip">${day.localTip}</div>` : ''}
        </article>`;
    }).join('');
    qs('resultDays').innerHTML = days || '<div class="summary-line">Sample trip ready</div>';
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
    const shareData = { title: window.currentTripPayload.title || 'Ryokoplan Trip', text: `${window.currentTripPayload.destination} trip from Ryokoplan`, url };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch {}
      return;
    }
    await navigator.clipboard.writeText(`${shareData.text}\n${url}`);
    alert('Link copied.');
  }
  function savePdf(){
    const printWindow = window.open('', '_blank');
    if (!printWindow || !window.currentTripPayload) return alert('Generate a plan first.');
    const data = window.currentTripPayload.planData;
    const daysHtml = (data.days || []).map(d => {
      const places = normalizePlaces(d).map(p => `<li><strong>${p.name}</strong> — ${p.reason}</li>`).join('');
      return `<h3>Day ${d.day} · ${textValue(d.title)}</h3><p>${textValue(d.intro || '')}</p><ul>${places}</ul>${d.localTip ? `<p><em>${d.localTip}</em></p>` : ''}`;
    }).join('');
    const budgetRows = (Array.isArray(data.budgetBreakdown)?data.budgetBreakdown.map(x=>[x.category,x.amount]):Object.entries(data.budgetBreakdown || {})).map(([k,v])=>`<div class="row"><span>${k}</span><span>${v}</span></div>`).join('');
    const tipsHtml = (data.localTips || []).map(i => `<li>${i}</li>`).join('');
    const checklistHtml = (data.checklist || []).map(i => `<li>${i}</li>`).join('');
    printWindow.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${data.title}</title><style>body{font-family:Arial,sans-serif;padding:32px;color:#1f2937;line-height:1.65}h1{margin:0 0 8px}h2{margin-top:28px}h3{margin-top:18px}.meta{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:18px 0}.meta div{padding:12px;border:1px solid #eee;border-radius:12px;background:#faf8f4}.row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee}ul{padding-left:18px}</style></head><body><h1>${data.title || ''}</h1><p>${normalizeSummary(data)}</p><div class="meta"><div><strong>Vibe</strong><br>${textValue(data.vibe,'-')}</div><div><strong>Pace</strong><br>${textValue(data.pace,'-')}</div><div><strong>Best for</strong><br>${textValue(data.bestFor,'-')}</div></div><h2>Day by Day</h2>${daysHtml}<h2>Local Tips</h2><ul>${tipsHtml}</ul><h2>Budget</h2><p>${textValue(data.budgetSummary,'')}</p>${budgetRows}<h2>Checklist</h2><ul>${checklistHtml}</ul><script>window.onload=()=>setTimeout(()=>window.print(),200)<\/script></body></html>`);
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
    qs('saveTripBtn').addEventListener('click', saveCurrentTrip);
    qs('shareTripBtn').addEventListener('click', shareCurrentTrip);
    qs('pdfTripBtn').addEventListener('click', savePdf);
    loadSharedTrip();
    if (!window.currentTripPayload) renderPlan(samplePlans.tokyo);
  }
  return { init, renderPlan };
})();
window.addEventListener('DOMContentLoaded', () => window.RyokoPlanner.init());
