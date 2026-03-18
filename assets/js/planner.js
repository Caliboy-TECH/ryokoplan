window.RyokoPlanner = (() => {
  const samplePlans = {
    tokyo: {
      destination:'Tokyo', duration:'3 Nights 4 Days', companion:'Couple', style:'Hidden spots', localMode:true,
      title:'Tokyo · 3N4D · Couple · Local Mode',
      summary:'Classic neighborhoods balanced with quieter local corners so the trip never feels too packed.',
      budgetBreakdown:{flight:'$320–520',hotel:'$480–760',food:'$160–260',transit:'$40–70',admission:'$35–70'},
      checklist:['Comfortable walking shoes','Suica or transit pass','One dinner reservation','Light outer layer for evenings'],
      days:[{day:1,title:'Shibuya and Harajuku',stops:['Shibuya Crossing','Cat street walk','Harajuku café stop']},{day:2,title:'Asakusa and Ueno',stops:['Senso-ji area','Ueno park stroll','Quiet coffee bar']},{day:3,title:'Kiyosumi and Shimokitazawa',stops:['Roastery morning','Vintage shops','Dinner alley']},{day:4,title:'Slow final morning',stops:['Neighborhood brunch','Gift stop','Airport transfer']}]
    },
    seoul: {
      destination:'Seoul', duration:'2 Nights 3 Days', companion:'Friends', style:'Photo / vibes', localMode:false,
      title:'Seoul · 2N3D · Friends · City Vibes',
      summary:'A compact route built around cafés, walks, and night views without long cross-city detours.',
      budgetBreakdown:{flight:'$0–180',hotel:'$220–420',food:'$120–200',transit:'$20–40',admission:'$20–50'},
      checklist:['Sneakers','T-money card','One sunset viewpoint','Light jacket for night wind'],
      days:[{day:1,title:'Seongsu afternoon',stops:['Bakery stop','Design shops','Riverside sunset']},{day:2,title:'Bukchon and Euljiro',stops:['Slow morning walk','Lunch lane','Late bar street']},{day:3,title:'Final café loop',stops:['Brunch','Gift shopping','Station transfer']}]
    }
  };
  function qs(id){ return document.getElementById(id); }
  function options(arr){ return arr.map(item => `<option value="${item}">${item}</option>`).join(''); }
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
    ['styleGrid','withGrid'].forEach(id => {
      const wrap = qs(id); if(!wrap) return;
      wrap.querySelectorAll('.option-chip').forEach(chip => chip.addEventListener('click', () => {
        wrap.querySelectorAll('.option-chip').forEach(c => c.classList.remove('is-selected'));
        chip.classList.add('is-selected');
        const hiddenId = id === 'styleGrid' ? 'style' : 'companion';
        qs(hiddenId).value = chip.dataset.value;
      }));
    });
  }
  function readForm(){
    return {
      destination: qs('destination').value.trim(),
      duration: qs('duration').value,
      companion: qs('companion').value || qs('withGrid .option-chip.is-selected')?.dataset.value || '',
      style: qs('style').value || qs('styleGrid .option-chip.is-selected')?.dataset.value || '',
      travelerTraits: [...document.querySelectorAll('#needsGrid input:checked')].map(i => i.value),
      localMode: qs('localToggle').classList.contains('on'),
      notes: qs('notes').value.trim(),
      language: window.RyokoApp.lang,
      lang: window.RyokoApp.lang
    };
  }
  function normalizeSummary(data){
    const raw = data.summary ?? data.focusSummary ?? '';
    if (Array.isArray(raw)) return raw.filter(Boolean).join(' · ');
    if (typeof raw === 'object' && raw !== null) return Object.values(raw).filter(Boolean).join(' · ');
    return String(raw || '');
  }
  function renderPlan(data){
    qs('resultTitle').textContent = data.title || `${data.destination} Trip Plan`;
    qs('resultSummary').textContent = normalizeSummary(data);
    const dayHtml = (data.days || []).map(day => `
      <div class="summary-line"><span><strong>Day ${day.day}</strong> · ${day.title}</span><span>${(day.stops || day.activities || []).slice(0,3).map(s => typeof s === 'string' ? s : (s.place || s.description || '')).filter(Boolean).join(' · ')}</span></div>`).join('');
    qs('resultDays').innerHTML = dayHtml || '<div class="summary-line">Sample trip ready</div>';
    const budget = data.budgetBreakdown || {};
    const entries = Array.isArray(budget) ? budget.map(x => [x.category, x.amount]) : Object.entries(budget);
    qs('budgetList').innerHTML = (entries.length ? entries : Object.entries(samplePlans.tokyo.budgetBreakdown)).map(([k,v]) => `<div class="summary-line"><span>${k}</span><span>${v}</span></div>`).join('');
    const checklist = (data.checklist || []).length ? data.checklist : samplePlans.tokyo.checklist;
    qs('checklistList').innerHTML = checklist.map(item => `<div class="summary-line"><span>${item}</span><span>✓</span></div>`).join('');
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
    printWindow.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${data.title}</title><style>body{font-family:Arial,sans-serif;padding:32px;color:#1f2937}h1{margin:0 0 8px}h2{margin-top:28px}ul{line-height:1.7} .row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee}</style></head><body><h1>${data.title || ''}</h1><p>${data.summary || ''}</p><h2>Days</h2>${(data.days || []).map(d => `<h3>Day ${d.day} · ${d.title}</h3><ul>${(d.stops || d.activities || []).map(s => `<li>${typeof s === 'string' ? s : (s.place || s.description || '')}</li>`).join('')}</ul>`).join('')}<h2>Budget</h2>${(Array.isArray(data.budgetBreakdown)?data.budgetBreakdown.map(x=>[x.category,x.amount]):Object.entries(data.budgetBreakdown || {})).map(([k,v])=>`<div class="row"><span>${k}</span><span>${v}</span></div>`).join('')}<h2>Checklist</h2><ul>${(data.checklist || []).map(i => `<li>${i}</li>`).join('')}</ul><script>window.onload=()=>setTimeout(()=>window.print(),200)<\/script></body></html>`);
    printWindow.document.close();
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
