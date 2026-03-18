const translations = {
  ko: {
    planner: '플래너', blog: '블로그', trips: '내 여정',
    badge: '감도와 실용성을 모두 챙긴 여행 플래닝',
    heroTitle: '취향도 실용성도 챙긴 여행 플래너.',
    heroDesc: 'AI 툴처럼 차갑게 보이기보다, 실제 여행 서비스처럼 느껴지도록. 현지 골목, 무리 없는 동선, 계절별 준비물까지 한 번에 정리합니다.',
    fp1: '4개 언어 지원', fp2: '예산 항목별 분리', fp3: '계절별 체크리스트', fp4: '현지인 모드',
    formTitle: '여행 만들기', formDesc: '누구와 가는지, 어떤 템포를 원하는지, 유명 명소 중심인지 현지인 숨은 장소 중심인지 알려주세요.',
    destination: '여행지', destinationPH: '예: 도쿄, 오사카, 파리, 교토',
    duration: '여행 기간', style: '여행 스타일', budget: '예산 수준', withWho: '누구와 함께?',
    durationOpts: ['1박 2일','2박 3일','3박 4일','4박 5일'],
    styleOpts: ['일반 관광','맛집 위주','역사 · 문화','로컬 감성'],
    budgetOpts: ['절약 여행','적당한 예산','여유 있는 예산'],
    withOpts: ['혼자','커플','가족','친구'],
    traits: '여행자 특성', mobility:'몸이 불편한 분', senior:'어르신', kids:'유아동반', pets:'반려동물',
    localMode: '현지인 모드', localModeDesc: '관광객 코스보다 숨은 로컬 스팟 우선', notes:'추가 요청', notesPH:'예: 느린 일정, 카페 많이, 무리 없는 동선, 미술관 1회',
    generate:'여정 만들기', save:'저장된 일정',
    resultTitle:'여행 플랜이 여기서 살아납니다.', resultDesc:'샘플 카드, 도시 이미지, 저장한 여정을 여기에서 빠르게 볼 수 있게 바꿨습니다.',
    previewTitle:'여행 친화적인 미리보기', previewDesc:'도시 이미지를 먼저 보여주고, 공유했을 때도 무엇을 보는지 바로 이해되게 구성합니다.',
    routeLabel:'샘플 동선', routeText:'아사쿠사 → 기요스미 → 시모키타자와 숨은 카페',
    tag1:'조용한 거리', tag2:'바다 뷰 하루',
    blogBadge:'Ryokoplan Blog', blogTitle:'일본·한국 도시 가이드를 언어별로 읽어보세요.',
    blogDesc:'도쿄, 오사카, 교토, 서울, 부산, 후쿠오카를 중심으로 실제 여행 검색 의도에 맞는 도시 가이드를 모았습니다.',
    openPlanner:'플래너 열기', openTokyo:'도쿄 가이드 읽기',
    cityChip:['도쿄','오사카','교토','서울','부산','후쿠오카']
  },
  en: {
    planner: 'Planner', blog: 'Blog', trips: 'Trips',
    badge: 'Travel planning with taste and practicality',
    heroTitle: 'A travel planner that feels curated, not generic.',
    heroDesc: 'Built to feel like a real travel service, not a cold tool. Hidden neighborhoods, low-friction routing, and seasonal prep in one place.',
    fp1: '4-language output', fp2: 'Budget by category', fp3: 'Seasonal checklist', fp4: 'Local mode',
    formTitle: 'Build your trip', formDesc: 'Tell us where you are going, what pace you want, and whether you want highlights or hidden local gems.',
    destination: 'Destination', destinationPH: 'e.g. Tokyo, Osaka, Paris, Kyoto',
    duration: 'Duration', style: 'Travel style', budget: 'Budget', withWho: 'Traveling with',
    durationOpts: ['1 Night 2 Days','2 Nights 3 Days','3 Nights 4 Days','4 Nights 5 Days'],
    styleOpts: ['Classic sightseeing','Food-first','History & culture','Local mood'],
    budgetOpts: ['Budget-friendly','Mid-range','Comfort'],
    withOpts: ['Solo','Couple','Family','Friends'],
    traits: 'Traveler traits', mobility:'Mobility support', senior:'Senior travelers', kids:'Traveling with kids', pets:'Traveling with pets',
    localMode: 'Local mode', localModeDesc: 'Prioritize hidden local spots over tourist checklists', notes:'Extra notes', notesPH:'e.g. slower pace, more cafés, less walking, one museum',
    generate:'Create trip', save:'Saved trips',
    resultTitle:'Your trip previews live here.', resultDesc:'We redesigned this area so it feels visual first: city photo, sample route, and your saved plans in one glance.',
    previewTitle:'A preview that feels travel-first', previewDesc:'Lead with destination imagery so users instantly understand the vibe of the trip before reading details.',
    routeLabel:'Sample route', routeText:'Asakusa → Kiyosumi → Shimokitazawa hidden cafés',
    tag1:'Quiet streets', tag2:'Sea-view day',
    blogBadge:'Ryokoplan Blog', blogTitle:'Read Japan and Korea city guides in your language.',
    blogDesc:'Tokyo, Osaka, Kyoto, Seoul, Busan, and Fukuoka guides built around real travel search intent.',
    openPlanner:'Open planner', openTokyo:'Read Tokyo guide',
    cityChip:['Tokyo','Osaka','Kyoto','Seoul','Busan','Fukuoka']
  },
  ja: {
    planner: 'プランナー', blog: 'ブログ', trips: '旅程',
    badge: '感性と実用性を両立した旅行プランニング',
    heroTitle: '好みも使いやすさも両立する旅行プランナー。',
    heroDesc: '冷たいAIツールではなく、本当の旅行サービスのように。路地の雰囲気、無理のない動線、季節別の準備までまとめます。',
    fp1: '4言語対応', fp2: '予算を項目別に', fp3: '季節チェックリスト', fp4: 'ローカルモード',
    formTitle: '旅行を作る', formDesc: 'どこへ行くか、どんなテンポがよいか、有名スポット中心かローカル中心かを教えてください。',
    destination: '目的地', destinationPH: '例: 東京, 大阪, パリ, 京都',
    duration: '旅行期間', style: '旅行スタイル', budget: '予算', withWho: '誰と行く？',
    durationOpts: ['1泊2日','2泊3日','3泊4日','4泊5日'],
    styleOpts: ['定番観光','グルメ中心','歴史・文化','ローカル感'],
    budgetOpts: ['節約旅','標準予算','ゆとりあり'],
    withOpts: ['一人','カップル','家族','友達'],
    traits: '旅行者特性', mobility:'移動サポート', senior:'シニア', kids:'子ども連れ', pets:'ペット連れ',
    localMode: 'ローカルモード', localModeDesc: '観光名所より隠れたローカルスポットを優先', notes:'追加メモ', notesPH:'例: ゆっくり、カフェ多め、歩行少なめ、美術館1回',
    generate:'旅程を作る', save:'保存した旅程',
    resultTitle:'旅のプレビューがここに集まります。', resultDesc:'都市写真、サンプル動線、保存旅程が一目で見える構成にしました。',
    previewTitle:'旅先らしさが先に伝わるプレビュー', previewDesc:'詳細の前に目的地の雰囲気が伝わるように、都市イメージを先に見せます。',
    routeLabel:'サンプル動線', routeText:'浅草 → 清澄白河 → 下北沢の隠れカフェ',
    tag1:'静かな路地', tag2:'海の見える一日',
    blogBadge:'Ryokoplan Blog', blogTitle:'日本・韓国の都市ガイドを言語別に読めます。',
    blogDesc:'東京、大阪、京都、ソウル、釜山、福岡を中心に、旅行検索意図に合うガイドをまとめました。',
    openPlanner:'プランナーを開く', openTokyo:'東京ガイドを読む',
    cityChip:['東京','大阪','京都','ソウル','釜山','福岡']
  },
  zh: {
    planner: '规划器', blog: '博客', trips: '我的行程',
    badge: '兼顾质感与实用性的旅行规划',
    heroTitle: '兼顾偏好与实用性的旅行规划器。',
    heroDesc: '不像冷冰冰的工具，而更像真正的旅行服务。把小众街区、轻松动线和季节准备一次整理好。',
    fp1: '4种语言', fp2: '预算分类', fp3: '季节清单', fp4: '本地模式',
    formTitle: '创建旅程', formDesc: '告诉我们你要去哪里、想要什么节奏，以及想看经典景点还是本地隐藏地点。',
    destination: '目的地', destinationPH: '例如：东京、大阪、巴黎、京都',
    duration: '行程天数', style: '旅行风格', budget: '预算', withWho: '同行对象',
    durationOpts: ['1晚2天','2晚3天','3晚4天','4晚5天'],
    styleOpts: ['经典观光','美食优先','历史文化','本地氛围'],
    budgetOpts: ['省钱型','中等预算','舒适型'],
    withOpts: ['独自','情侣','家庭','朋友'],
    traits: '旅行者特性', mobility:'行动辅助', senior:'长者同行', kids:'儿童同行', pets:'宠物同行',
    localMode: '本地模式', localModeDesc: '优先隐藏本地地点，而不是游客清单', notes:'补充需求', notesPH:'例如：节奏慢一些，更多咖啡馆，少走路，一个美术馆',
    generate:'生成行程', save:'已保存行程',
    resultTitle:'你的旅程预览会显示在这里。', resultDesc:'我们把这里改成更偏旅行展示：城市图片、样例路线和已保存旅程一眼看懂。',
    previewTitle:'更像旅行服务的预览', previewDesc:'先用目的地画面传达气氛，再阅读路线细节。',
    routeLabel:'样例路线', routeText:'浅草 → 清澄白河 → 下北泽隐藏咖啡馆',
    tag1:'安静街区', tag2:'海景一天',
    blogBadge:'Ryokoplan Blog', blogTitle:'按语言阅读日本与韩国城市指南。',
    blogDesc:'围绕东京、大阪、京都、首尔、釜山、福冈，整理更贴近真实搜索意图的城市指南。',
    openPlanner:'打开规划器', openTokyo:'阅读东京指南',
    cityChip:['东京','大阪','京都','首尔','釜山','福冈']
  }
};

function applyTranslations(lang){
  const t = translations[lang] || translations.ko;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.dataset.i18n;
    if(t[key]) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const key = el.dataset.i18nPlaceholder;
    if(t[key]) el.setAttribute('placeholder', t[key]);
  });
  const setOptions = (id, arr)=>{
    const el = document.getElementById(id); if(!el) return;
    const prev = el.value;
    el.innerHTML = arr.map(v=>`<option>${v}</option>`).join('');
    if(arr.includes(prev)) el.value = prev;
  };
  setOptions('duration', t.durationOpts); setOptions('style', t.styleOpts); setOptions('budget', t.budgetOpts); setOptions('withWho', t.withOpts);
  document.querySelectorAll('[data-city-chip]').forEach((el, i)=>{el.textContent = t.cityChip[i] || el.textContent});
  document.querySelectorAll('.lang-btn').forEach(btn=>btn.classList.toggle('active', btn.dataset.lang===lang));
  localStorage.setItem('ryoko-lang', lang);
}

window.addEventListener('DOMContentLoaded', ()=>{
  const current = localStorage.getItem('ryoko-lang') || 'ko';
  applyTranslations(current);
  document.querySelectorAll('.lang-btn').forEach(btn=>btn.addEventListener('click', ()=>applyTranslations(btn.dataset.lang)));
  const sw = document.querySelector('.switch');
  if(sw) sw.addEventListener('click', ()=>sw.classList.toggle('on'));
});
