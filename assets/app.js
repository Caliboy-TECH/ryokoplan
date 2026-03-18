const i18n = {
  ko: {
    planner: '플래너', magazine: '매거진', myTrips: '내 여정', eyebrow: '도시를 읽고, 바로 여행으로 이어지는 플래닝',
    heroTitle: '모바일에서 더 자연스럽게 쓰는 여행 플래너.',
    heroCopy: '도시 매거진처럼 읽고, 일정 앱처럼 바로 저장하고, 실제 여행 동선처럼 자연스럽게 짜주는 Ryokoplan.',
    startPlanning: '여행 계획 시작', viewMagazine: '매거진 보기', mini1t: '도시 가이드 + 일정', mini1c: '읽다가 바로 여행 플랜으로 전환할 수 있어요.', mini2t: '공유하기 좋은 결과', mini2c: '모바일에서 열었을 때 보기 좋은 구성으로 정리합니다.',
    magTitle:'일본·한국 도시 가이드를 매거진처럼 읽어보세요.', magCopy:'도쿄, 오사카, 교토, 서울, 부산, 후쿠오카. 검색 의도에 맞는 도시 가이드와 실제 일정 흐름이 자연스럽게 이어집니다.',
    magOverlay:'도시 이미지와 가이드를 같은 톤으로 정리해, 읽는 경험과 플래닝 경험이 끊기지 않도록 구성했습니다.',
    planTitle:'여행 만들기', planSub:'누구와 가는지, 어떤 페이스를 원하는지, 현지 로컬 스팟을 얼마나 섞을지 알려주세요.',
    destination:'여행지', destinationHint:'도시, 국가 또는 지역', destinationPh:'예: 도쿄, 오사카, 파리, 교토', duration:'여행 기간', style:'여행 스타일', budget:'예산 수준', companion:'누구와 함께?', traits:'여행자 특성', traitsHint:'동선, 속도, 체크리스트에 반영됩니다', localMode:'현지인 모드', localModeDesc:'관광객 코스보다 숨은 로컬 스팟 우선', notes:'추가 요청', notesPh:'예: 느린 일정, 카페 많이, 무리 없는 동선, 미술관 1회',
    generate:'일정 생성하기', saved:'저장된 일정', resultReady:'여행 플랜이 여기서 살아납니다.', resultReadySub:'생성 후 링크 공유, 로컬 저장, PDF 출력까지 바로 가능합니다.',
    previewBadge:'Tokyo preview', previewTitle:'Travel-friendly route logic', previewText:'Area-based pacing, simpler transfers, and a plan that still feels worth sharing.', routeLabel:'샘플 동선', routeValue:'아사쿠사 → 기요스미 → 시모키타자와 숨은 카페', thumb1:'조용한 거리', thumb2:'바다 보는 하루',
    tripSummary:'플랜 요약', practicalTips:'현지 팁', checklist:'체크리스트', budgetTitle:'예산 breakdown', share:'공유 링크 복사', pdf:'PDF 저장', errorDest:'여행지를 입력해 주세요.', generating:'도시 무드에 맞게 짜는 중...',
    durations:['1박 2일','2박 3일','3박 4일','4박 5일','5박 6일'],
    styles:['일반 관광','맛집 위주','카페·감성','자연·힐링','럭셔리','가족 여행'], budgets:['절약 여행','적당한 예산','여유 있는 예산'], companions:['혼자','커플','가족','친구'],
    traitLabels:['몸이 불편한 분','어르신','유아동반','반려동물'],
    cities:['도쿄','오사카','교토','서울','부산','후쿠오카'],
    cityCards:[
      {city:'Tokyo', meta:'도쿄 · 8 min', title:'도쿄 여행 가이드: 지역 동선, 맛집 존, 첫 여행 페이스', desc:'도쿄를 지역별로 나누고 이동 시간을 줄이며 첫 여행의 리듬을 잡는 법.'},
      {city:'Osaka', meta:'오사카 · 7 min', title:'오사카 여행 가이드: 먹방 동선, 가족 페이스, 쉬운 근교', desc:'숙소 위치와 하루 구성을 어떻게 잡아야 하는지 한 번에 이해되는 가이드.'},
      {city:'Kyoto', meta:'교토 · 7 min', title:'교토 여행 가이드: 사찰 시간대, 조용한 거리, 계절 감성', desc:'붐비는 시간대를 피하고 더 우아한 교토 동선을 짜는 방법.'},
      {city:'Seoul', meta:'서울 · 8 min', title:'서울 여행 가이드: 카페 동네, 궁궐 루트, 야시장 페이스', desc:'처음 서울을 가는 여행자를 위한 동네별 성격과 밤 산책 루트.'},
      {city:'Busan', meta:'부산 · 6 min', title:'부산 여행 가이드: 바다 뷰, 시장 먹거리, 해안 이동법', desc:'광안리·해운대·감천·자갈치를 한 번에 무리 없이 묶는 흐름.'},
      {city:'Fukuoka', meta:'후쿠오카 · 6 min', title:'후쿠오카 여행 가이드: 가볍게 걷는 미식 여행', desc:'텐진, 하카타, 모모치의 리듬을 살린 2~3일 미식형 일정.'}
    ]
  },
  en: {
    planner:'Planner', magazine:'Magazine', myTrips:'My trips', eyebrow:'Editorial city guides that turn into usable plans', heroTitle:'A travel planner that feels natural on mobile.', heroCopy:'Read it like a city magazine, save it like an itinerary app, and move through the city with smarter route logic.', startPlanning:'Start planning', viewMagazine:'Open magazine', mini1t:'Guides + plans', mini1c:'Go from reading to planning in one flow.', mini2t:'Shareable results', mini2c:'Layouts stay readable when opened on a phone.', magTitle:'Read Japan and Korea city guides like a travel magazine.', magCopy:'Tokyo, Osaka, Kyoto, Seoul, Busan, and Fukuoka — city guides and route logic designed to feel cohesive.', magOverlay:'Magazine-like reading mode with images and guides kept in the same visual tone.', planTitle:'Build your trip', planSub:'Tell us your pace, who you travel with, and how local you want the plan to feel.', destination:'Destination', destinationHint:'City, country, or region', destinationPh:'e.g. Tokyo, Osaka, Paris, Kyoto', duration:'Travel duration', style:'Travel style', budget:'Budget level', companion:'Who are you traveling with?', traits:'Traveler traits', traitsHint:'Used in pacing, routing, and checklist', localMode:'Local mode', localModeDesc:'Prioritize quieter local spots over tourist-heavy routes', notes:'Extra notes', notesPh:'e.g. slower pace, more cafes, minimal walking strain, one museum', generate:'Generate itinerary', saved:'Saved trips', resultReady:'Your trip plan comes alive here.', resultReadySub:'After generation, copy a link, keep it locally, or save it as a PDF.', previewBadge:'Tokyo preview', previewTitle:'Travel-friendly route logic', previewText:'Area-based pacing, simpler transfers, and a plan that still feels worth sharing.', routeLabel:'Sample route', routeValue:'Asakusa → Kiyosumi → Shimokitazawa hidden cafe', thumb1:'Quiet streets', thumb2:'Sea-view day', tripSummary:'Trip summary', practicalTips:'Local tips', checklist:'Checklist', budgetTitle:'Budget breakdown', share:'Copy share link', pdf:'Save as PDF', errorDest:'Please enter a destination.', generating:'Building a smoother city flow...', durations:['1 Night 2 Days','2 Nights 3 Days','3 Nights 4 Days','4 Nights 5 Days','5 Nights 6 Days'], styles:['Balanced sightseeing','Food-focused','Cafe & mood','Nature & healing','Luxury','Family trip'], budgets:['Budget-friendly','Balanced','Comfortable'], companions:['Solo','Couple','Family','Friends'], traitLabels:['Mobility support needed','Senior travelers','Traveling with young kids','Traveling with pets'], cities:['Tokyo','Osaka','Kyoto','Seoul','Busan','Fukuoka'], cityCards:[{city:'Tokyo',meta:'Tokyo · 8 min',title:'Tokyo guide: neighborhood logic, food zones, first-trip pace',desc:'How to split Tokyo by area, reduce transit waste, and find a first-trip rhythm.'},{city:'Osaka',meta:'Osaka · 7 min',title:'Osaka guide: food routes, family pace, easy side trips',desc:'Where to stay and how to shape your days so the trip feels full, not rushed.'},{city:'Kyoto',meta:'Kyoto · 7 min',title:'Kyoto guide: shrine timing, quiet streets, seasonal mood',desc:'How to avoid the busiest hours and build a softer Kyoto route.'},{city:'Seoul',meta:'Seoul · 8 min',title:'Seoul guide: cafe districts, palace routes, night-market pace',desc:'A first-timer guide to neighborhood mood and evening walks.'},{city:'Busan',meta:'Busan · 6 min',title:'Busan guide: sea views, market eats, coastal movement',desc:'A calmer way to connect Gwangalli, Haeundae, Gamcheon, and Jagalchi.'},{city:'Fukuoka',meta:'Fukuoka · 6 min',title:'Fukuoka guide: light walking and easy food trips',desc:'A 2–3 day rhythm for Tenjin, Hakata, and Momochi.'}]
  },
  ja: {
    planner:'プランナー', magazine:'マガジン', myTrips:'私の旅程', eyebrow:'都市ガイドからそのまま旅程へつながる設計', heroTitle:'モバイルで自然に使える旅行プランナー。', heroCopy:'都市マガジンのように読み、旅程アプリのように保存し、実際の街歩きのように無理なく組み立てます。', startPlanning:'旅を作る', viewMagazine:'マガジンを見る', mini1t:'ガイド＋旅程', mini1c:'読む流れのまま旅程作成までつながります。', mini2t:'共有しやすい結果', mini2c:'スマホで開いても読みやすい構成です。', magTitle:'日本・韓国の都市ガイドをマガジン感覚で読めます。', magCopy:'東京、大阪、京都、ソウル、釜山、福岡。都市ガイドと旅程ロジックを同じトーンでまとめました。', magOverlay:'写真とガイドを同じ雰囲気で整え、読む体験とプランニング体験が分断されないようにしました。', planTitle:'旅を作る', planSub:'誰と行くか、どんなテンポがいいか、ローカル感をどれくらい入れたいかを教えてください。', destination:'旅行先', destinationHint:'都市・国・地域', destinationPh:'例: 東京、大阪、パリ、京都', duration:'旅行日数', style:'旅行スタイル', budget:'予算レベル', companion:'誰と行く？', traits:'旅行者特性', traitsHint:'動線、ペース、持ち物に反映されます', localMode:'ローカルモード', localModeDesc:'観光地より静かなローカルスポットを優先', notes:'追加メモ', notesPh:'例: ゆっくり、カフェ多め、歩行負担少なめ、美術館1回', generate:'旅程を作成', saved:'保存した旅程', resultReady:'旅のプランがここに表示されます。', resultReadySub:'作成後すぐにリンク共有、ローカル保存、PDF保存ができます。', previewBadge:'Tokyo preview', previewTitle:'Travel-friendly route logic', previewText:'Area-based pacing, simpler transfers, and a plan that still feels worth sharing.', routeLabel:'サンプルルート', routeValue:'浅草 → 清澄白河 → 下北沢の隠れカフェ', thumb1:'静かな通り', thumb2:'海が見える日', tripSummary:'プラン要約', practicalTips:'現地ヒント', checklist:'チェックリスト', budgetTitle:'予算内訳', share:'共有リンクをコピー', pdf:'PDF保存', errorDest:'旅行先を入力してください。', generating:'街の流れに合わせて組み立て中...', durations:['1泊2日','2泊3日','3泊4日','4泊5日','5泊6日'], styles:['定番観光','グルメ重視','カフェ・雰囲気','自然・癒し','ラグジュアリー','家族旅行'], budgets:['節約','標準','ゆとりあり'], companions:['ひとり','カップル','家族','友人'], traitLabels:['移動サポートが必要','シニア同行','子ども連れ','ペット連れ'], cities:['東京','大阪','京都','ソウル','釜山','福岡'], cityCards:[{city:'Tokyo',meta:'東京 · 8 min',title:'東京ガイド: エリア動線、グルメゾーン、初旅行ペース',desc:'東京をエリア別に分けて移動のムダを減らす考え方。'},{city:'Osaka',meta:'大阪 · 7 min',title:'大阪ガイド: 食べ歩き動線、家族ペース、近郊の組み方',desc:'宿の位置と1日の配分をどう考えるべきかがわかります。'},{city:'Kyoto',meta:'京都 · 7 min',title:'京都ガイド: 神社の時間帯、静かな通り、季節の空気感',desc:'混雑時間を避けて、より落ち着いた京都の流れを作る方法。'},{city:'Seoul',meta:'ソウル · 8 min',title:'ソウルガイド: カフェ街、宮殿ルート、夜市場の歩き方',desc:'初めてのソウルで役立つ街の雰囲気と夜散歩の組み方。'},{city:'Busan',meta:'釜山 · 6 min',title:'釜山ガイド: 海景色、市場グルメ、海辺移動',desc:'広安里・海雲台・甘川・チャガルチを無理なくつなぐ流れ。'},{city:'Fukuoka',meta:'福岡 · 6 min',title:'福岡ガイド: 軽やかに歩くグルメ旅',desc:'天神・博多・百道を活かした2〜3日の食旅リズム。'}]
  },
  zh: {
    planner:'规划器', magazine:'杂志', myTrips:'我的行程', eyebrow:'从城市指南自然进入可用行程', heroTitle:'更适合手机使用的旅行规划器。', heroCopy:'像读城市杂志一样浏览，像行程应用一样保存，并按真实出行节奏来规划。', startPlanning:'开始规划', viewMagazine:'查看杂志', mini1t:'指南 + 行程', mini1c:'从阅读直接切换到规划。', mini2t:'适合分享的结果', mini2c:'在手机里打开也保持清晰。', magTitle:'像旅行杂志一样阅读日本与韩国城市指南。', magCopy:'东京、大阪、京都、首尔、釜山、福冈。城市指南与行程逻辑保持统一气质。', magOverlay:'图片与指南保持同一视觉语气，让阅读与规划不断开。', planTitle:'创建旅行', planSub:'告诉我们你和谁出行、想要怎样的节奏，以及是否更偏向本地隐藏地点。', destination:'目的地', destinationHint:'城市、国家或地区', destinationPh:'例如：东京、大阪、巴黎、京都', duration:'旅行时长', style:'旅行风格', budget:'预算水平', companion:'和谁一起出行？', traits:'旅行者特征', traitsHint:'会影响节奏、动线与清单', localMode:'本地人模式', localModeDesc:'优先安静的本地地点，而不是热门游客路线', notes:'额外要求', notesPh:'例如：慢节奏、多咖啡馆、少走路、一次美术馆', generate:'生成行程', saved:'已保存行程', resultReady:'你的旅行方案会显示在这里。', resultReadySub:'生成后可立即分享链接、本地保存或导出 PDF。', previewBadge:'Tokyo preview', previewTitle:'Travel-friendly route logic', previewText:'Area-based pacing, simpler transfers, and a plan that still feels worth sharing.', routeLabel:'示例路线', routeValue:'浅草 → 清澄白河 → 下北泽隐藏咖啡馆', thumb1:'安静街区', thumb2:'海景一天', tripSummary:'行程摘要', practicalTips:'当地建议', checklist:'清单', budgetTitle:'预算明细', share:'复制分享链接', pdf:'保存 PDF', errorDest:'请输入目的地。', generating:'正在按城市节奏生成...', durations:['1晚2天','2晚3天','3晚4天','4晚5天','5晚6天'], styles:['经典观光','美食优先','咖啡与氛围','自然疗愈','轻奢','家庭旅行'], budgets:['节省型','均衡型','舒适型'], companions:['独自','情侣','家庭','朋友'], traitLabels:['需要行动辅助','长者同行','带小孩','带宠物'], cities:['东京','大阪','京都','首尔','釜山','福冈'], cityCards:[{city:'Tokyo',meta:'东京 · 8 min',title:'东京指南：区域动线、美食区与首次旅行节奏',desc:'如何按区域拆分东京，减少交通浪费，并建立第一次旅行的节奏。'},{city:'Osaka',meta:'大阪 · 7 min',title:'大阪指南：吃逛路线、家庭节奏与轻松近郊',desc:'住宿位置与每日结构应该怎么安排更顺手。'},{city:'Kyoto',meta:'京都 · 7 min',title:'京都指南：寺社时段、安静街道与季节感',desc:'避开最拥挤时段，做出更优雅的京都路线。'},{city:'Seoul',meta:'首尔 · 8 min',title:'首尔指南：咖啡街区、宫殿路线与夜市节奏',desc:'给第一次去首尔的人准备的街区个性与夜间散步路线。'},{city:'Busan',meta:'釜山 · 6 min',title:'釜山指南：海景、市场美食与海岸移动',desc:'把广安里、海云台、甘川和札嘎其顺畅地串起来。'},{city:'Fukuoka',meta:'福冈 · 6 min',title:'福冈指南：轻松步行的美食旅程',desc:'适合天神、博多与百道的 2–3 天美食节奏。'}]
  }
};

const cityImages = {
  tokyo:'/assets/cities/tokyo.png', osaka:'/assets/cities/osaka.png', kyoto:'/assets/cities/kyoto.png', seoul:'/assets/cities/seoul.png', busan:'/assets/cities/busan.png', fukuoka:'/assets/cities/fukuoka.png'
};

const qs = s => document.querySelector(s);
const qsa = s => [...document.querySelectorAll(s)];
let currentLang = new URLSearchParams(location.search).get('lang') || localStorage.getItem('ryoko_lang') || 'ko';
let localMode = false;
let currentPlan = null;

function setText(key, value){ qsa(`[data-i18n="${key}"]`).forEach(el=>el.textContent=value); }
function fillSelect(el, items){ el.innerHTML = items.map(v=>`<option value="${v}">${v}</option>`).join(''); }
function renderCityCards(lang){
  const wrap = qs('#magazineGrid'); if(!wrap) return;
  wrap.innerHTML = i18n[lang].cityCards.map((card, idx)=>{
    const keys = Object.keys(cityImages); const img = cityImages[keys[idx]];
    return `<article class="city-card"><div class="cover" style="background-image:url('${img}')"></div><div class="body"><div class="eyeline">${card.meta}</div><h3>${card.title}</h3><p>${card.desc}</p></div></article>`;
  }).join('');
}
function applyLang(lang){
  currentLang = lang;
  localStorage.setItem('ryoko_lang', lang);
  const t = i18n[lang];
  document.documentElement.lang = lang;
  qsa('.lang-btn').forEach(btn=>btn.classList.toggle('active', btn.dataset.lang===lang));
  Object.keys(t).forEach(key=>{ if(typeof t[key]==='string') setText(key, t[key]); });
  fillSelect(qs('#duration'), t.durations); fillSelect(qs('#style'), t.styles); fillSelect(qs('#budget'), t.budgets); fillSelect(qs('#companion'), t.companions);
  qsa('[data-trait-label]').forEach((el,i)=> el.textContent = t.traitLabels[i]);
  qsa('[data-city-pill]').forEach((el,i)=> el.textContent = t.cities[i]);
  renderCityCards(lang);
  const params = new URLSearchParams(location.search); params.set('lang', lang); history.replaceState({},'',`${location.pathname}?${params.toString()}${location.hash}`);
}

function guessImage(dest=''){ const d = dest.toLowerCase(); if(d.includes('osaka')||d.includes('오사카')||d.includes('大阪')) return cityImages.osaka; if(d.includes('kyoto')||d.includes('교토')||d.includes('京都')) return cityImages.kyoto; if(d.includes('seoul')||d.includes('서울')||d.includes('ソウル')||d.includes('首尔')) return cityImages.seoul; if(d.includes('busan')||d.includes('부산')||d.includes('釜山')) return cityImages.busan; if(d.includes('fukuoka')||d.includes('후쿠오카')||d.includes('福岡')) return cityImages.fukuoka; return cityImages.tokyo; }
function updatePreview(dest=''){ const img = guessImage(dest); qs('#previewTop').style.backgroundImage = `url('${img}')`; qs('#previewMain').style.backgroundImage = `url('${img}')`; qs('#magazineVisual').style.backgroundImage = `url('${img}')`; }

async function generatePlan(){
  const t = i18n[currentLang];
  const destination = qs('#destination').value.trim();
  if(!destination){ qs('#errorBox').style.display='block'; qs('#errorBox').textContent=t.errorDest; return; }
  qs('#errorBox').style.display='none';
  const travelerTraits = qsa('.trait-input:checked').map(i=>i.value);
  const submit = qs('#generateBtn'); const original = submit.textContent; submit.disabled = true; submit.textContent = t.generating;
  updatePreview(destination);
  try{
    const res = await fetch('/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({lang:currentLang,destination,duration:qs('#duration').value,style:qs('#style').value,budget:qs('#budget').value,companion:qs('#companion').value,travelerTraits,localMode,notes:qs('#notes').value})});
    const data = await res.json(); if(!res.ok) throw new Error(data.error || 'Failed');
    currentPlan = data; renderPlan(data); saveCurrentPlan();
  }catch(err){ qs('#errorBox').style.display='block'; qs('#errorBox').textContent = err.message; }
  finally{ submit.disabled = false; submit.textContent = original; }
}

function renderPlan(plan){
  qs('#emptyState').style.display='none';
  qs('#resultCard').style.display='block';
  qs('#resultTitle').textContent = plan.title || plan.destination;
  qs('#resultMeta').innerHTML = [plan.destination,plan.duration,plan.style,plan.companion].filter(Boolean).map(v=>`<span class="meta-pill">${v}</span>`).join('');
  qs('#summaryList').innerHTML = (plan.summary||[]).map(v=>`<li>${v}</li>`).join('');
  qs('#tipsList').innerHTML = (plan.tips||[]).map(v=>`<li>${v}</li>`).join('');
  qs('#checklistList').innerHTML = (plan.checklist||[]).map(v=>`<li>${v}</li>`).join('');
  qs('#budgetList').innerHTML = (plan.budgetBreakdown||[]).map(v=>`<li><strong>${v.category}</strong>: ${v.amount}</li>`).join('');
  qs('#daysList').innerHTML = (plan.days||[]).map(day=>`<section class="day-card"><h5>Day ${day.day} · ${day.title||''}</h5><div class="eyeline">${day.area||''}</div>${(day.activities||[]).map(a=>`<div class="activity"><div class="activity-time">${a.time||''}</div><div class="activity-place">${a.place||''}</div><div>${a.description||''}</div>${a.tip?`<div class="activity-tip">Tip · ${a.tip}</div>`:''}</div>`).join('')}</section>`).join('');
}
function saveCurrentPlan(){ if(currentPlan) localStorage.setItem('ryoko_plan', JSON.stringify(currentPlan)); }
function loadSavedPlan(){ const raw = localStorage.getItem('ryoko_plan'); if(raw){ try{ currentPlan = JSON.parse(raw); renderPlan(currentPlan); }catch{} } }
function encodePlan(plan){ return btoa(unescape(encodeURIComponent(JSON.stringify(plan)))); }
function decodePlan(str){ return JSON.parse(decodeURIComponent(escape(atob(str)))); }
function sharePlan(){ if(!currentPlan) return; const url = `${location.origin}${location.pathname}?lang=${currentLang}#plan=${encodePlan(currentPlan)}`; if(navigator.share){ navigator.share({title:'Ryokoplan trip plan', text: currentPlan.title || currentPlan.destination, url}).catch(()=>{}); } else { navigator.clipboard.writeText(url); alert(i18n[currentLang].share); } }
function loadPlanFromHash(){ if(location.hash.startsWith('#plan=')){ try{ currentPlan = decodePlan(location.hash.slice(6)); renderPlan(currentPlan); }catch{} } }
async function savePdf(){ if(!currentPlan) return; const target = qs('#resultCard'); const [{default: html2canvas},{jsPDF}] = await Promise.all([import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm'), import('https://cdn.jsdelivr.net/npm/jspdf@2.5.1/+esm')]); const canvas = await html2canvas(target,{scale:2,backgroundColor:'#ffffff'}); const img = canvas.toDataURL('image/png'); const pdf = new jsPDF('p','pt','a4'); const width = 555; const ratio = canvas.height/canvas.width; const height = width*ratio; pdf.addImage(img,'PNG',20,20,width,height); pdf.save(`ryokoplan-${(currentPlan.destination||'trip').replace(/\s+/g,'-').toLowerCase()}.pdf`); }

window.addEventListener('DOMContentLoaded',()=>{
  qsa('.lang-btn').forEach(btn=>btn.addEventListener('click',()=>applyLang(btn.dataset.lang)));
  qs('#localToggle').addEventListener('click',()=>{ localMode=!localMode; qs('#localToggle').classList.toggle('active',localMode); });
  qs('#generateBtn').addEventListener('click',generatePlan);
  qs('#shareBtn').addEventListener('click',sharePlan);
  qs('#pdfBtn').addEventListener('click',savePdf);
  qs('#savedBtn').addEventListener('click',()=>{ loadSavedPlan(); qs('#resultCard').scrollIntoView({behavior:'smooth',block:'start'}); });
  qs('#destination').addEventListener('input',e=>updatePreview(e.target.value));
  applyLang(currentLang); loadPlanFromHash(); loadSavedPlan();
});
