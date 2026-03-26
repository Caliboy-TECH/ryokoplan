window.RyokoApp = (() => {
  const defaultLang = 'ko';
  let lang = localStorage.getItem('ryoko_lang_v2') || defaultLang;
  const supportedLangs = ['ko','en','ja','zhHant'];

  const pathRoot = (() => {
    const depth = location.pathname.split('/').filter(Boolean).length;
    return depth > 1 ? '../' : depth === 1 ? (location.pathname.endsWith('/') ? '../' : '') : './';
  })();


  const cityLoopMap = {
    tokyo: { name:'Tokyo', country:'Japan', guide:'city/tokyo.html', example:'example/tokyo-3n4d-first-trip.html', image:'assets/images/cities/tokyo.jpg', vibe:'fast city' },
    osaka: { name:'Osaka', country:'Japan', guide:'city/osaka.html', example:'example/osaka-2n3d-family.html', image:'assets/images/cities/osaka.jpg', vibe:'food energy' },
    kyoto: { name:'Kyoto', country:'Japan', guide:'city/kyoto.html', example:'example/kyoto-2n3d-slow-trip.html', image:'assets/images/cities/kyoto.jpg', vibe:'slow reset' },
    fukuoka: { name:'Fukuoka', country:'Japan', guide:'city/fukuoka.html', example:'example/fukuoka-2n3d-food-trip.html', image:'assets/images/cities/fukuoka.jpg', vibe:'compact local' },
    seoul: { name:'Seoul', country:'Korea', guide:'city/seoul.html', example:'example/seoul-2n3d-city-vibes.html', image:'assets/images/cities/seoul.jpg', vibe:'city social' },
    busan: { name:'Busan', country:'Korea', guide:'city/busan.html', example:'example/busan-2n3d-with-parents.html', image:'assets/images/cities/busan.jpg', vibe:'coast mode' },
    jeju: { name:'Jeju', country:'Korea', guide:'city/jeju.html', example:'city/jeju.html', image:'assets/images/cities/jeju.jpg', vibe:'scenic ease' },
    gyeongju: { name:'Gyeongju', country:'Korea', guide:'city/gyeongju.html', example:'city/gyeongju.html', image:'assets/images/cities/gyeongju.jpg', vibe:'history slow' },
    taipei: { name:'Taipei', country:'Taiwan', guide:'city/taipei.html', example:'example/taipei-3n4d-night-food.html', image:'assets/images/cities/taipei.jpg', vibe:'night food layers' },
    hongkong: { name:'Hong Kong', country:'Hong Kong', guide:'city/hongkong.html', example:'example/hongkong-3n4d-harbor-rhythm.html', image:'assets/images/cities/hongkong.jpg', vibe:'vertical harbor nights' },
    macau: { name:'Macau', country:'Macau', guide:'city/macau.html', example:'example/macau-2n3d-heritage-night.html', image:'assets/images/cities/macau.jpg', vibe:'compact heritage nights' }
  };
  const loopPairs = {
    tokyo:['kyoto','fukuoka','seoul'], osaka:['kyoto','fukuoka','tokyo'], kyoto:['osaka','tokyo','gyeongju'], fukuoka:['osaka','busan','tokyo'],
    seoul:['busan','jeju','tokyo'], busan:['jeju','seoul','fukuoka'], jeju:['busan','seoul','gyeongju'], gyeongju:['busan','kyoto','seoul'],
    taipei:['hongkong','macau','okinawa'], hongkong:['taipei','macau','tokyo'], macau:['hongkong','taipei','okinawa']
  };
  const cityVoiceMap = {
    tokyo: {
      ko: { strap: '밀도는 높고, 루트는 더 가볍게.', reward: '한 동네씩 읽을수록 좋음', watch: '환승 과적 금지', mood: 'sharp / layered / late' },
      en: { strap: 'High density, lighter routing.', reward: 'Better one neighborhood at a time', watch: 'Do not overload transit', mood: 'sharp / layered / late' }
    },
    osaka: {
      ko: { strap: '많이 보기보다, 잘 먹고 쉽게 즐기기.', reward: '식사 타이밍이 여행 퀄리티를 만듦', watch: '큰 구역 두 개를 한날에 깊게 넣지 않기', mood: 'warm / easy / lively' },
      en: { strap: 'Less coverage, more easy fun.', reward: 'Meal timing shapes the trip', watch: 'Do not go deep on two big zones in one day', mood: 'warm / easy / lively' }
    },
    kyoto: {
      ko: { strap: '적게 넣을수록, 더 오래 남는 도시.', reward: '여백과 산책이 핵심', watch: '체크리스트식 이동 금지', mood: 'quiet / scenic / slow' },
      en: { strap: 'The less you force, the better it lands.', reward: 'Space and walking matter most', watch: 'Avoid checklist pacing', mood: 'quiet / scenic / slow' }
    },
    fukuoka: {
      ko: { strap: '짧아도 만족도가 잘 나오는 콤팩트 시티.', reward: '가볍게 먹고 걷기 좋음', watch: '무리한 당일치기 확장 금지', mood: 'compact / tasty / relaxed' },
      en: { strap: 'A compact city that pays off fast.', reward: 'Easy food-and-walk rhythm', watch: 'Do not over-expand the route', mood: 'compact / tasty / relaxed' }
    },
    seoul: {
      ko: { strap: '동네 차이가 곧 여행의 톤이 됩니다.', reward: '어느 구역을 묶느냐가 핵심', watch: '강남·성수·홍대를 무심코 한날에 다 넣지 않기', mood: 'social / layered / quick' },
      en: { strap: 'Neighborhood contrast becomes the trip tone.', reward: 'Grouping the right zones matters most', watch: 'Do not casually stack too many major districts', mood: 'social / layered / quick' }
    },
    busan: {
      ko: { strap: '풍경이 먼저, 속도는 그다음.', reward: '뷰와 쉬는 타이밍이 좋을수록 만족', watch: '오르막·이동 피로 과소평가 금지', mood: 'open / scenic / breezy' },
      en: { strap: 'Views first, speed second.', reward: 'Rest timing improves the trip', watch: 'Do not underestimate hills and transfers', mood: 'open / scenic / breezy' }
    },
    jeju: {
      ko: { strap: '목적지보다 여정 감각이 중요한 섬.', reward: '풍경 사이의 여백이 좋음', watch: '이동시간을 너무 가볍게 보지 않기', mood: 'airy / scenic / soft' },
      en: { strap: 'On Jeju, the journey matters as much as the stop.', reward: 'The spaces between views matter', watch: 'Do not underweight drive time', mood: 'airy / scenic / soft' }
    },
    gyeongju: {
      ko: { strap: '장면보다 템포가 먼저인 역사 도시.', reward: '느린 산책과 저녁 무드가 강함', watch: '낮 시간에만 몰아보지 않기', mood: 'heritage / calm / textured' },
      en: { strap: 'A heritage city shaped by tempo, not volume.', reward: 'Slow walks and evening mood land best', watch: 'Do not compress it into daytime only', mood: 'heritage / calm / textured' }
    },
    taipei: {
      ko: { strap: '밤 리듬과 먹는 결이 같이 살아나는 도시.', reward: '야시장과 골목의 연결감이 좋음', watch: '하루에 너무 많은 동네를 쌓지 않기', mood: 'night / food / layered' },
      en: { strap: 'A city where night rhythm and food texture land together.', reward: 'Night markets and alley pockets connect well', watch: 'Do not stack too many neighborhoods in one day', mood: 'night / food / layered' }
    },
    hongkong: {
      ko: { strap: '수직 밀도와 항구 장면이 함께 남는 도시.', reward: '짧아도 강한 장면이 잘 남음', watch: '고저차와 이동 피로를 가볍게 보지 않기', mood: 'vertical / harbor / sharp' },
      en: { strap: 'A city where vertical density meets harbor light.', reward: 'Even short trips can leave very strong scenes', watch: 'Do not underweight slopes and transfer fatigue', mood: 'vertical / harbor / sharp' }
    },
    macau: {
      ko: { strap: '짧게 가도 밤과 유산 장면이 선명한 도시.', reward: '걷기 좋은 중심 축이 명확함', watch: '하루에 너무 많은 구역을 억지로 넣지 않기', mood: 'heritage / night / compact' },
      en: { strap: 'A compact city where heritage and night scenes stay vivid.', reward: 'The central walkable axis is easy to read', watch: 'Do not force too many zones into one day', mood: 'heritage / night / compact' }
    }
  };

  const citySectionMap = {
    tokyo: {
      ko: {
        moduleEyebrow:'Tokyo edit',
        moduleTitle:'도쿄는 큰 장면보다 구간 편집이 중요합니다',
        moduleDesc:'하루에 하나의 큰 앵커와 하나의 리셋 구간만 두면 도쿄가 훨씬 덜 피곤하고 더 선명하게 남습니다.',
        modules:[
          {type:'timing', title:'Best windows', items:[['오전 9–11시','아사쿠사, 우에노처럼 첫 장면이 중요한 곳'],['오후 2–5시','기요스미, 다이칸야마처럼 쉬는 동네'],['저녁 7시 이후','시부야, 신주쿠, 이자카야 골목 무드']]},
          {type:'pair', title:'Good pairings', items:[['시부야 → 오모테산도','에너지와 정돈감이 자연스럽게 이어짐'],['아사쿠사 → 우에노','초행에도 동선 이해가 쉬움'],['긴자 → 도쿄역 주변','마지막 쇼핑/식사와 이동 연결이 좋음']]}
        ]
      },
      en: {
        moduleEyebrow:'Tokyo edit',
        moduleTitle:'Tokyo works better when the route is edited in chunks',
        moduleDesc:'One big anchor and one reset zone per day usually lands better than trying to stack every famous stop.',
        modules:[
          {type:'timing', title:'Best windows', items:[['9–11 am','Asakusa, Ueno, and first-scene districts'],['2–5 pm','Kiyosumi, Daikanyama, and calmer reset zones'],['After 7 pm','Shibuya, Shinjuku, and izakaya blocks']]},
          {type:'pair', title:'Good pairings', items:[['Shibuya → Omotesando','Energy flows into a more polished city tone'],['Asakusa → Ueno','Easy routing for first-timers'],['Ginza → Tokyo Station','A clean close for food, shopping, and departure prep']]}
        ]
      }
    },
    osaka: {
      ko: {
        moduleEyebrow:'Osaka edit',
        moduleTitle:'오사카는 보기보다 먹고 쉬는 간격이 중요합니다',
        moduleDesc:'관광 스폿보다 식사 타이밍과 쉬운 이동이 여행 만족도를 크게 좌우합니다.',
        modules:[
          {type:'timing', title:'Meal rhythm', items:[['점심 전','시장/상점가 쪽으로 먼저 진입'],['오후','카페나 쇼핑 아케이드로 템포 완화'],['저녁','도톤보리·우메다 중 한 축만 깊게']]},
          {type:'watch', title:'Do not force', items:[['USJ + 도톤보리 심야','체력 소모가 큼'],['교토/나라와 동시 깊게','2박 3일엔 오사카 무드가 약해짐'],['큰 쇼핑 구역 2개 이상','비슷한 피로가 겹침']]}
        ]
      },
      en: {
        moduleEyebrow:'Osaka edit',
        moduleTitle:'In Osaka, meal spacing matters more than coverage',
        moduleDesc:'Food timing and easy movement often shape the trip more than adding one more sightseeing block.',
        modules:[
          {type:'timing', title:'Meal rhythm', items:[['Before lunch','Enter through market streets or food-heavy areas'],['Afternoon','Use cafés or arcades to soften the tempo'],['Night','Go deep on either Dotonbori or Umeda, not both']]},
          {type:'watch', title:'Do not force', items:[['USJ plus late-night Dotonbori','The fatigue stacks fast'],['Deep Kyoto/Nara add-ons','A 2N3D Osaka trip loses its own mood'],['Too many shopping zones','The day starts to feel repetitive']]}
        ]
      }
    },
    kyoto: {
      ko: {
        moduleEyebrow:'Kyoto edit',
        moduleTitle:'교토는 비워둘수록 더 좋아집니다',
        moduleDesc:'보는 개수보다 조용한 시간대와 걷는 리듬을 확보하는 쪽이 훨씬 중요합니다.',
        modules:[
          {type:'timing', title:'Quiet windows', items:[['이른 아침','기온, 산넨자카, 아라시야마'],['점심 이후','강변, 카페, 작은 정원'],['해질 무렵','산책 + 저녁 한 곳만 깊게']]},
          {type:'pair', title:'Better pacing', items:[['동쪽 교토 하루','기온/청수사권을 한 축으로'],['북쪽 사원 + 카페','이동보다 템포 중심'],['강변 산책 + 저녁','마지막 장면용으로 강함']]}
        ]
      },
      en: {
        moduleEyebrow:'Kyoto edit',
        moduleTitle:'Kyoto usually improves when you leave more room',
        moduleDesc:'Quiet hours and walkable pacing matter far more than trying to count more temples.',
        modules:[
          {type:'timing', title:'Quiet windows', items:[['Early morning','Gion, Sannenzaka, Arashiyama'],['After lunch','River walks, cafés, and smaller gardens'],['Toward sunset','One strong walk plus one good dinner']]},
          {type:'pair', title:'Better pacing', items:[['East Kyoto day','Keep Gion and Kiyomizu on one axis'],['North temples + café drift','Tempo over transfer volume'],['River walk + dinner close','A stronger ending than one more checklist stop']]}
        ]
      }
    },
    fukuoka: {
      ko: {
        moduleEyebrow:'Fukuoka edit',
        moduleTitle:'후쿠오카는 짧게 가도 리듬이 잘 나오는 도시입니다',
        moduleDesc:'이 도시는 욕심내기보다 compact하게 먹고 걷고 쉬는 구성이 강합니다.',
        modules:[
          {type:'pair', title:'Strong combinations', items:[['하카타역권 → 캐널시티','도착일용으로 안정적'],['오호리공원 → 텐진','산책과 도심 리듬이 좋음'],['야타이 → 늦은 산책','짧은 밤에도 만족감 큼']]},
          {type:'watch', title:'Keep it compact', items:[['무리한 근교 확장','후쿠오카 장점이 흐려짐'],['너무 많은 카페/쇼핑','도시 자체가 작아 중복감이 빨리 옴'],['체크아웃 날 과한 이동','마지막 날은 하카타 중심이 편함']]}
        ]
      },
      en: {
        moduleEyebrow:'Fukuoka edit',
        moduleTitle:'Fukuoka pays off when the trip stays compact',
        moduleDesc:'Its strength is not volume, but how easily food, walks, and soft city energy fit together.',
        modules:[
          {type:'pair', title:'Strong combinations', items:[['Hakata area → Canal City','A stable arrival-day route'],['Ohori Park → Tenjin','Walk-first rhythm with city access'],['Yatai → late stroll','A short night can still feel complete']]},
          {type:'watch', title:'Keep it compact', items:[['Overextending to too many side trips','The city loses its own advantage'],['Too many similar cafés or shops','The overlap shows quickly'],['Heavy checkout-day movement','Hakata-centered endings feel cleaner']]}
        ]
      }
    },
    seoul: {
      ko: {
        moduleEyebrow:'Seoul edit',
        moduleTitle:'서울은 동네 조합이 곧 여행 톤이 됩니다',
        moduleDesc:'어디를 넣느냐보다 어떤 구역을 같이 묶느냐가 훨씬 중요합니다.',
        modules:[
          {type:'pair', title:'Good neighborhood sets', items:[['성수 → 서울숲 → 뚝섬','요즘 서울 무드'],['을지로 → 광장시장 → 종로','도시 텍스처가 강함'],['홍대 → 연남 → 망원','친구와 가볍게 풀기 좋음']]},
          {type:'watch', title:'Avoid stacking', items:[['강남 + 성수 + 홍대','이동 피로가 큼'],['낮과 밤 무드 미스매치','동네 성격이 너무 달라짐'],['주말 피크만 고려 안 함','대기와 이동이 갑자기 커짐']]}
        ]
      },
      en: {
        moduleEyebrow:'Seoul edit',
        moduleTitle:'In Seoul, the neighborhood mix becomes the trip tone',
        moduleDesc:'The city feels best when the right zones are grouped together instead of stacked at random.',
        modules:[
          {type:'pair', title:'Good neighborhood sets', items:[['Seongsu → Seoul Forest → Ttukseom','Current Seoul mood, walkable and social'],['Euljiro → Gwangjang → Jongno','Strong city texture'],['Hongdae → Yeonnam → Mangwon','Easy with friends and café energy']]},
          {type:'watch', title:'Avoid stacking', items:[['Gangnam + Seongsu + Hongdae in one day','Transfers pile up fast'],['Day/night mismatch','The mood can feel disjointed'],['Ignoring weekend peaks','Waiting and crowd fatigue jump quickly']]}
        ]
      }
    },
    busan: {
      ko: {
        moduleEyebrow:'Busan edit',
        moduleTitle:'부산은 뷰와 휴식 타이밍이 핵심입니다',
        moduleDesc:'장소 수보다 풍경을 어떻게 배치하고 언제 쉬는지가 만족도를 크게 좌우합니다.',
        modules:[
          {type:'timing', title:'View windows', items:[['오전','감천·송도처럼 공기감 좋은 구간'],['오후','해운대·광안리 카페/산책'],['저녁','야경 포인트는 한 곳만 길게']]},
          {type:'watch', title:'Fatigue checks', items:[['오르막 많은 코스 연속','피로 누적이 큼'],['시장+바다+전망대 과적','장면이 겹치며 흐려짐'],['부모님 동행 시 무리한 환승','택시 활용이 더 나을 수 있음']]}
        ]
      },
      en: {
        moduleEyebrow:'Busan edit',
        moduleTitle:'Busan gets better when views and rests are placed well',
        moduleDesc:'The trip quality often comes from how you space scenery and downtime, not from adding more stops.',
        modules:[
          {type:'timing', title:'View windows', items:[['Morning','Gamcheon or Songdo when the air feels cleaner'],['Afternoon','Haeundae or Gwangalli walks and cafés'],['Night','Go long on one night-view point, not several']]},
          {type:'watch', title:'Fatigue checks', items:[['Too many hilly routes in sequence','The tiredness stacks'],['Market + sea + observatory overload','The scenes start to blur together'],['Heavy transfers with parents','Taxis may actually protect the trip better']]}
        ]
      }
    },
    jeju: {
      ko: {
        moduleEyebrow:'Jeju edit',
        moduleTitle:'제주는 목적지보다 드라이브 리듬이 중요합니다',
        moduleDesc:'같은 동선 안에 풍경, 카페, 쉬는 구간이 어떻게 섞이는지가 여행 퀄리티를 바꿉니다.',
        modules:[
          {type:'pair', title:'Soft route shapes', items:[['동쪽 해안 라인','성산/섭지코지/카페'],['서쪽 노을 라인','애월/협재/저녁 바다'],['한라산 주변 + 숙소 휴식','비 오는 날 대안으로 좋음']]},
          {type:'watch', title:'Drive reality', items:[['하루에 섬 반 바퀴 이상','운전 피로가 큼'],['풍경 포인트 과다','결국 사진만 남고 리듬이 사라짐'],['날씨 변수 무시','제주는 날씨에 따라 만족도 편차가 큼']]}
        ]
      },
      en: {
        moduleEyebrow:'Jeju edit',
        moduleTitle:'On Jeju, drive rhythm matters more than destination count',
        moduleDesc:'The island feels better when scenery, cafés, and pauses sit naturally on the same line.',
        modules:[
          {type:'pair', title:'Soft route shapes', items:[['East coast line','Seongsan, Seopjikoji, and scenic cafés'],['West sunset line','Aewol, Hyeopjae, and evening sea stops'],['Hallasan side + hotel reset','Useful on rainier or lower-energy days']]},
          {type:'watch', title:'Drive reality', items:[['More than half the island in one day','Driver fatigue jumps quickly'],['Too many scenic points','The trip becomes a photo sweep'],['Ignoring weather shifts','Jeju satisfaction swings hard with conditions']]}
        ]
      }
    },
    gyeongju: {
      ko: {
        moduleEyebrow:'Gyeongju edit',
        moduleTitle:'경주는 낮보다 저녁 무드까지 봐야 완성됩니다',
        moduleDesc:'역사 유적만 보는 도시가 아니라, 걷는 속도와 해 질 무렵 분위기까지 포함해서 읽어야 좋습니다.',
        modules:[
          {type:'timing', title:'Best tempo', items:[['오전','대릉원·첨성대처럼 상징 장면'],['오후','황리단길·한옥 카페로 템포 완화'],['저녁','동궁과 월지, 조명 켜진 산책']]},
          {type:'pair', title:'What pairs well', items:[['유적 + 카페','과한 역사 피로를 줄임'],['한옥 거리 + 저녁 산책','경주다운 마지막 장면'],['자전거/도보 중심','도시 결을 느끼기 쉬움']]}
        ]
      },
      en: {
        moduleEyebrow:'Gyeongju edit',
        moduleTitle:'Gyeongju lands best when evening mood is part of the plan',
        moduleDesc:'It is not just a heritage city by daylight. The slower pace and dusk atmosphere matter just as much.',
        modules:[
          {type:'timing', title:'Best tempo', items:[['Morning','Daereungwon, Cheomseongdae, and signature scenes'],['Afternoon','Hwangridan-gil and hanok cafés to soften the pace'],['Evening','Donggung and Wolji plus a lit-up walk']]},
          {type:'pair', title:'What pairs well', items:[['Heritage + café','Reduces monument fatigue'],['Hanok street + evening walk','A stronger Gyeongju ending'],['Bike or foot routes','Makes the city texture easier to feel']]}
        ]
      }
    }
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

  function normalizeSignalTag(tag=''){
    const v = String(tag || '').toLowerCase().trim();
    const map = {
      'rain':'rainy','rainy-day':'rainy','indoor':'rainy','late':'late-night','night':'late-night','nightlife':'late-night',
      'family':'parents','easy':'parents','easy pace':'parents','food':'food-led','food-first':'food-led','coast':'coast',
      'scenic':'coast','weekend':'weekend','soft':'soft-reset','slow':'soft-reset'
    };
    return map[v] || v;
  }
  function detectSignalTags(context={}){
    const parts = [context.city, context.destination, context.companion, context.style, context.notes, context.mode, context.query]
      .filter(Boolean).join(' ').toLowerCase();
    const tags = new Set();
    if (/(rain|rainy|우천|비 )/.test(parts)) tags.add('rainy');
    if (/(late|night|nightlife|야간|밤)/.test(parts)) tags.add('late-night');
    if (/(parent|family|부모|가족|easy pace|slow meals)/.test(parts)) tags.add('parents');
    if (/(food|meal|local food|맛집|먹)/.test(parts)) tags.add('food-led');
    if (/(coast|sea|ocean|beach|바다|coastal|drive|scenic)/.test(parts)) tags.add('coast');
    if (/(weekend|2n3d|주말)/.test(parts)) tags.add('weekend');
    if (/(soft|slow|quiet|reset|조용|느린)/.test(parts)) tags.add('soft-reset');
    return [...tags];
  }

  const SIGNAL_PROFILE_KEY = 'ryoko_signal_profile_v1';
  function readSignalProfile(){
    try { return JSON.parse(localStorage.getItem(SIGNAL_PROFILE_KEY) || '{"counts":{},"recent":[],"updatedAt":null}'); }
    catch { return { counts:{}, recent:[], updatedAt:null }; }
  }
  function writeSignalProfile(profile){
    try { localStorage.setItem(SIGNAL_PROFILE_KEY, JSON.stringify(profile)); } catch {}
  }
  function recordSignalInteraction(payload={}){
    const profile = readSignalProfile();
    const tags = [...new Set((payload.tags || []).map(normalizeSignalTag).filter(Boolean))];
    tags.forEach(tag => { profile.counts[tag] = (profile.counts[tag] || 0) + 1; });
    const recentItem = {
      tags,
      city: payload.city || payload.destination || '',
      title: payload.title || '',
      source: payload.source || '',
      at: new Date().toISOString()
    };
    profile.recent = [recentItem, ...(profile.recent || [])].slice(0, 18);
    profile.updatedAt = recentItem.at;
    writeSignalProfile(profile);
    window.dispatchEvent(new CustomEvent('ryoko:signalprofile', { detail: profile }));
    return profile;
  }
  function getTopSignalTags(limit=3){
    const profile = readSignalProfile();
    return Object.entries(profile.counts || {})
      .sort((a,b) => b[1] - a[1])
      .slice(0, limit)
      .map(([tag]) => tag);
  }
  function boostBySignalProfile(items=[]){
    const top = getTopSignalTags(4);
    if (!top.length) return items;
    return [...items].sort((a,b) => {
      const aScore = top.reduce((acc, tag) => acc + (((a.tags || []).map(normalizeSignalTag).includes(tag)) ? 1 : 0), 0);
      const bScore = top.reduce((acc, tag) => acc + (((b.tags || []).map(normalizeSignalTag).includes(tag)) ? 1 : 0), 0);
      return bScore - aScore;
    });
  }
  function getPersonalizedSignalItems(scope='home'){
    const top = getTopSignalTags(3);
    if (!top.length) return [];
    const pools = [
      ...buildDiscoveryItems(),
      ...getSeasonalEditorialCollections().cover,
      ...getSeasonalEditorialCollections().magazine,
      ...getCommunityCollections().picks,
      ...getCommunityCollections().trending,
      ...getCommunityCollections().branches,
    ];
    const scored = pools.map(item => ({
      ...item,
      profileScore: top.reduce((acc, tag) => acc + (((item.tags || []).map(normalizeSignalTag).includes(tag)) ? 2 : 0), 0)
    }))
    .filter(item => item.profileScore > 0)
    .sort((a,b) => b.profileScore - a.profileScore);
    const seen = new Set();
    return scored.filter(item => {
      const key = `${item.preset?.destination || ''}-${item.title?.en || item.title?.ko || ''}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, scope === 'magazine' ? 4 : 3);
  }
  function attachSignalTracking(scope=document){
    scope.querySelectorAll('[data-signal-tags]').forEach(el => {
      if (el.dataset.signalBound === '1') return;
      el.dataset.signalBound = '1';
      el.addEventListener('click', () => {
        const tags = String(el.dataset.signalTags || '').split('|').filter(Boolean);
        recordSignalInteraction({
          tags,
          city: el.dataset.signalCity || '',
          title: el.dataset.signalTitle || '',
          source: el.dataset.signalSource || ''
        });
      });
    });
  }
  function getSignalRecommendations(context={}){
    const signals = detectSignalTags(context);
    const pools = [
      ...buildDiscoveryItems(),
      ...getSeasonalEditorialCollections().cover,
      ...getSeasonalEditorialCollections().magazine,
      ...getSeasonalEditorialCollections().archive,
      ...getCommunityCollections().picks,
      ...getCommunityCollections().trending,
      ...getCommunityCollections().branches,
    ];
    const mapped = pools.map(item => ({
      ...item,
      score: signals.reduce((acc, sig) => acc + ((item.tags || []).map(normalizeSignalTag).includes(sig) ? 2 : 0), 0)
        + ((String(item.preset?.destination || '').toLowerCase() === String(context.destination || context.city || '').toLowerCase()) ? 1 : 0)
    }));
    const seen = new Set();
    return mapped
      .filter(item => item.score > 0)
      .sort((a,b) => b.score - a.score)
      .filter(item => {
        const key = `${item.title?.en || item.title?.ko || item.slug}-${item.preset?.destination || ''}`;
        if (seen.has(key)) return false;
        seen.add(key); return true;
      })
      .slice(0, 3);
  }
  function getCityVoice(city=''){
    const slug = slugifyCity(city);
    const entry = cityVoiceMap[slug];
    if (!entry) return null;
    return entry[lang] || entry.en || null;
  }

  function t(path){
    const activeLang = supportedLangs.includes(lang) ? lang : 'en';
    const dict = window.RYOKO_TRANSLATIONS?.[activeLang] || window.RYOKO_TRANSLATIONS?.en || window.RYOKO_TRANSLATIONS?.ko || {};
    return path.split('.').reduce((acc, key) => acc?.[key], dict) ?? '';
  }
  function setLanguage(next){
    lang = supportedLangs.includes(next) ? next : 'en';
    localStorage.setItem('ryoko_lang_v2', lang);
    document.documentElement.lang = lang;
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
    root.querySelectorAll('[data-lang-ko], [data-lang-en], [data-lang-ja], [data-lang-zhhant]').forEach(el => {
      const keyMap = { ko: 'langKo', en: 'langEn', ja: 'langJa', zhHant: 'langZhhant' };
      const value = el.dataset[keyMap[lang]] || el.dataset.langEn || el.dataset.langKo;
      if (value) el.innerHTML = value;
    });
    root.querySelectorAll('[data-lang-ko-placeholder], [data-lang-en-placeholder], [data-lang-ja-placeholder], [data-lang-zhhant-placeholder]').forEach(el => {
      const keyMap = { ko: 'langKoPlaceholder', en: 'langEnPlaceholder', ja: 'langJaPlaceholder', zhHant: 'langZhhantPlaceholder' };
      const value = el.dataset[keyMap[lang]] || el.dataset.langEnPlaceholder || el.dataset.langKoPlaceholder;
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
    if (target === 'magazine') return `${pathRoot}magazine/index.html`;
    if (target === 'planner') return `${pathRoot}index.html`;
    if (target === 'trips') return `${pathRoot}my-trips/index.html`;
    return '#';
  }
  function renderMobileDock(){
    let dock = document.querySelector('.mobile-dock');
    if (!dock) {
      dock = document.createElement('nav');
      dock.className = 'mobile-dock';
      dock.setAttribute('aria-label', 'Primary');
      document.body.appendChild(dock);
    }
    const page = document.body.dataset.page || 'planner';
    const dockLang = supportedLangs.includes(document.documentElement.lang) ? document.documentElement.lang : 'en';
    const helperCopy = {
      planner: { ko:'계획', en:'Plan', ja:'計画', zhHant:'規劃' },
      magazine: { ko:'탐색', en:'Read', ja:'探索', zhHant:'探索' },
      trips: { ko:'보관', en:'Keep', ja:'保存', zhHant:'保存' }
    };
    const dockCopy = {
      planner: { icon: 'P', helper: helperCopy.planner[lang] || helperCopy.planner.en, label: t('nav.planner') || 'Planner' },
      magazine: { icon: 'M', helper: helperCopy.magazine[lang] || helperCopy.magazine.en, label: t('nav.magazine') || 'Magazine' },
      trips: { icon: 'T', helper: helperCopy.trips[lang] || helperCopy.trips.en, label: t('nav.trips') || 'My Trips' }
    };
    dock.innerHTML = ['planner','magazine','trips'].map((key) => `
      <a class="mobile-dock-item ${page === key ? 'active' : ''}" href="${navHref(key)}" aria-current="${page === key ? 'page' : 'false'}">
        <span class="mobile-dock-icon">${dockCopy[key].icon}</span>
        <span class="mobile-dock-label">${dockCopy[key].label}</span>
        <span class="mobile-dock-helper">${dockCopy[key].helper}</span>
      </a>`).join('');
  }


  const cityOpsMap = {
    tokyo: {
      ko: {
        eyebrow:'Route logic',
        title:'도쿄는 한 축씩 끊어서 읽을 때 가장 덜 피곤합니다',
        desc:'핵심은 명소 수가 아니라 같은 결의 구역을 하루 안에 묶는 것입니다.',
        cards:[
          {label:'Best with', title:'첫 방문 · 친구 · 디자인/쇼핑 취향', body:'도쿄는 첫 방문자에게도 좋지만, 특히 동네 차이를 읽는 재미를 좋아하는 사람에게 강합니다.'},
          {label:'Avoid when', title:'하루에 세 개 이상의 큰 허브를 넣을 때', body:'시부야, 아사쿠사, 팀랩 같은 큰 허브를 한날에 겹치면 장면보다 환승 기억이 더 많이 남습니다.'},
          {label:'Weather swap', title:'비 오면 실내 밀도 높은 구역으로 바꾸기', body:'긴자, 도쿄역, 백화점 지하, 미술관 포켓으로 방향만 틀어도 하루 리듬을 지킬 수 있습니다.'}
        ]
      },
      en: {
        eyebrow:'Route logic',
        title:'Tokyo feels lighter when it is read one axis at a time',
        desc:'The key is not stop count, but keeping districts of similar energy on the same day.',
        cards:[
          {label:'Best with', title:'First-timers · friends · design/shopping bias', body:'Tokyo is especially strong for travelers who enjoy neighborhood contrast, not just headline landmarks.'},
          {label:'Avoid when', title:'You stack three major hubs in one day', body:'Put Shibuya, Asakusa, and teamLab on the same day and the memory often becomes transit, not the city.'},
          {label:'Weather swap', title:'Shift into indoor-density districts on rain days', body:'Ginza, Tokyo Station, depachika floors, and museum pockets can protect the pace without killing the day.'}
        ]
      }
    },
    osaka: {
      ko: {
        eyebrow:'Route logic',
        title:'오사카는 도시를 소비하기보다 즐기는 쪽이 더 잘 맞습니다',
        desc:'재밌는 구역이 가까워서, 과한 욕심만 빼면 짧아도 만족도가 잘 나옵니다.',
        cards:[
          {label:'Best with', title:'친구 · 커플 · 짧은 주말', body:'음식과 쉬운 동선이 중심이라 여행 텐션을 크게 끌어올리기 좋습니다.'},
          {label:'Avoid when', title:'교토/나라까지 동시에 깊게 넣을 때', body:'오사카의 장점은 컴팩트함인데, 외부 도시를 과하게 섞으면 그 장점이 약해집니다.'},
          {label:'Weather swap', title:'비 오면 우메다·아케이드 축으로 옮기기', body:'실내 쇼핑, 카페, 식사 밀도가 높아서 날씨가 나빠도 리듬을 유지하기 쉽습니다.'}
        ]
      },
      en: {
        eyebrow:'Route logic',
        title:'Osaka pays off more when you enjoy it than when you over-cover it',
        desc:'The city is close-packed enough that a short trip can feel full without overreaching.',
        cards:[
          {label:'Best with', title:'Friends · couples · short weekends', body:'Food and low-friction movement make it easy to keep trip energy up.'},
          {label:'Avoid when', title:'You go deep on Kyoto/Nara at the same time', body:'Osaka’s strength is compact ease. Heavy side-city expansion weakens that advantage.'},
          {label:'Weather swap', title:'Move into Umeda and arcade-heavy zones on rain days', body:'Indoor shopping, cafés, and easy food density make bad weather easier to absorb.'}
        ]
      }
    },
    kyoto: {
      ko: {
        eyebrow:'Route logic',
        title:'교토는 덜 넣는 용기가 있을수록 더 강해집니다',
        desc:'사원 수를 늘리는 것보다 조용한 시간대를 지키는 편이 훨씬 중요합니다.',
        cards:[
          {label:'Best with', title:'혼자 · 부모님 · 느린 페이스', body:'산책과 여백을 좋아하는 여행자일수록 교토가 깊게 남습니다.'},
          {label:'Avoid when', title:'교토를 하루 종일 체크리스트처럼 다닐 때', body:'비슷한 유적 피로가 누적되면 도시 특유의 결이 흐려집니다.'},
          {label:'Weather swap', title:'비 오는 날은 정원·찻집·강변 중심으로', body:'실내 정원, 찻집, 한 구역 산책만으로도 교토다운 하루를 지킬 수 있습니다.'}
        ]
      },
      en: {
        eyebrow:'Route logic',
        title:'Kyoto gets stronger when you leave enough room on purpose',
        desc:'Protecting quiet hours matters more here than pushing temple count.',
        cards:[
          {label:'Best with', title:'Solo travelers · parents · slower pacing', body:'Kyoto stays with people who enjoy space, walking, and quieter transitions.'},
          {label:'Avoid when', title:'You treat Kyoto like a full-day checklist', body:'Monument fatigue builds fast and the city starts to flatten into repetition.'},
          {label:'Weather swap', title:'On rain days, lean into gardens, tea rooms, and river edges', body:'A softer indoor-outdoor mix can still feel very Kyoto without forcing too much movement.'}
        ]
      }
    },
    fukuoka: {
      ko: {
        eyebrow:'Route logic',
        title:'후쿠오카는 짧게 다녀와도 충분히 남는 도시입니다',
        desc:'핵심은 적당히 먹고 걷고 쉬는 리듬을 깨지 않는 것입니다.',
        cards:[
          {label:'Best with', title:'짧은 일정 · 음식 중심 · 재방문', body:'주말이나 짧은 휴가에도 결과가 잘 나오는 도시라 부담이 적습니다.'},
          {label:'Avoid when', title:'너무 많은 근교를 억지로 넣을 때', body:'도시 자체의 장점이 희미해지고 이동 기억만 남기 쉽습니다.'},
          {label:'Weather swap', title:'비 오면 하카타/텐진 축 실내 밀도로 보호', body:'쇼핑, 식사, 카페가 가깝게 묶여 있어 우천 대안이 비교적 쉬운 편입니다.'}
        ]
      },
      en: {
        eyebrow:'Route logic',
        title:'Fukuoka is one of the few cities that still lands on short trips',
        desc:'The real trick is protecting a compact food-walk-rest rhythm.',
        cards:[
          {label:'Best with', title:'Short stays · food bias · repeat visits', body:'It gives a good return even when the schedule is short or the trip is casual.'},
          {label:'Avoid when', title:'You force too many side trips', body:'The city’s own strength gets washed out when movement starts to dominate the memory.'},
          {label:'Weather swap', title:'Use Hakata and Tenjin indoor density to absorb rain', body:'Food, shopping, and cafés sit close enough together that weather pivots are relatively painless.'}
        ]
      }
    },
    seoul: {
      ko: {
        eyebrow:'Route logic',
        title:'서울은 랜드마크보다 동네 조합 감각이 더 중요합니다',
        desc:'서로 결이 맞는 구역을 묶을수록 이동 피로가 줄고 도시 리듬이 살아납니다.',
        cards:[
          {label:'Best with', title:'친구 · 커플 · 카페/동네 산책 취향', body:'서울은 동네 차이를 읽는 재미가 큰 도시라, 취향이 분명할수록 만족도가 높습니다.'},
          {label:'Avoid when', title:'강남·성수·홍대를 한날에 다 넣을 때', body:'지도상으론 가까워 보여도, 실제 체감은 분절되고 피곤해질 수 있습니다.'},
          {label:'Weather swap', title:'비 오면 성수/여의도/백화점 축으로 이동', body:'실내 비중이 높은 구역으로 바꾸면 서울 특유의 도시감은 유지하면서 피로를 줄일 수 있습니다.'}
        ]
      },
      en: {
        eyebrow:'Route logic',
        title:'In Seoul, neighborhood chemistry matters more than landmark count',
        desc:'The city feels cleaner when districts of compatible mood stay on the same route.',
        cards:[
          {label:'Best with', title:'Friends · couples · café and neighborhood walkers', body:'Seoul rewards travelers who care about district tone as much as major sights.'},
          {label:'Avoid when', title:'You stack Gangnam, Seongsu, and Hongdae together', body:'They look manageable on a map, but can feel disjointed and tiring in practice.'},
          {label:'Weather swap', title:'Move into Seongsu, Yeouido, or department-store axes on rain days', body:'You can keep Seoul’s city texture while reducing fatigue through more indoor-biased zones.'}
        ]
      }
    },
    busan: {
      ko: {
        eyebrow:'Route logic',
        title:'부산은 장소보다 공기감과 휴식 타이밍이 더 중요합니다',
        desc:'뷰 포인트를 너무 많이 쌓기보다 풍경이 잘 남는 시간대를 지키는 편이 좋습니다.',
        cards:[
          {label:'Best with', title:'부모님 · 커플 · 바다 풍경 우선', body:'부산은 걷는 양보다 어디에서 쉬고 어디서 보는지가 더 크게 작용합니다.'},
          {label:'Avoid when', title:'전망대와 시장을 하루에 과적할 때', body:'장면이 많아도 비슷한 피로가 누적되면 도시의 인상이 흐려집니다.'},
          {label:'Weather swap', title:'흐리면 시장·카페·실내 전망으로 균형 잡기', body:'완전 야외만 고집하지 말고, 실내 전망과 식사 중심으로 템포를 바꾸는 편이 낫습니다.'}
        ]
      },
      en: {
        eyebrow:'Route logic',
        title:'In Busan, atmosphere and rest timing beat stop count',
        desc:'Protecting the right scenic windows often matters more than adding more view points.',
        cards:[
          {label:'Best with', title:'Parents · couples · sea-first trips', body:'Busan is shaped more by where you pause and look than by how much you cover.'},
          {label:'Avoid when', title:'You overload observatories and markets on one day', body:'Even strong scenes can blur together when the fatigue pattern repeats.'},
          {label:'Weather swap', title:'On gray days, balance with markets, cafés, and indoor views', body:'Do not force only outdoor scenery. Mixed pacing often lands better.'}
        ]
      }
    },
    jeju: {
      ko: {
        eyebrow:'Route logic',
        title:'제주는 관광지 리스트보다 동선 모양이 더 중요합니다',
        desc:'드라이브 리듬이 살아야 풍경도 좋게 남고, 피로도 낮게 유지됩니다.',
        cards:[
          {label:'Best with', title:'커플 · 가족 · 렌터카 기반 일정', body:'제주는 이동이 곧 여행이 되는 곳이라, 여유를 즐길 수 있는 사람에게 특히 좋습니다.'},
          {label:'Avoid when', title:'하루에 섬을 가로지르는 큰 이동을 반복할 때', body:'목적지를 많이 찍어도 드라이브 피로가 커지면 여행 감각이 빠르게 무너집니다.'},
          {label:'Weather swap', title:'날씨 나쁘면 숙소 주변 반경을 과감히 좁히기', body:'제주는 날씨 편차가 크므로, 가까운 카페·전시·짧은 바다 산책으로 계획을 줄이는 편이 낫습니다.'}
        ]
      },
      en: {
        eyebrow:'Route logic',
        title:'On Jeju, route shape matters more than attraction count',
        desc:'When the drive rhythm holds, the scenery usually lands better too.',
        cards:[
          {label:'Best with', title:'Couples · families · rental-car trips', body:'Jeju is especially rewarding for travelers who can enjoy the movement itself, not just each stop.'},
          {label:'Avoid when', title:'You keep crossing the island in one day', body:'You may tick more points off, but the fatigue can erase the feeling of the trip.'},
          {label:'Weather swap', title:'Shrink the radius aggressively on weak-weather days', body:'Jeju often works better when a bad-weather plan becomes a smaller café-exhibit-sea loop.'}
        ]
      }
    },
    gyeongju: {
      ko: {
        eyebrow:'Route logic',
        title:'경주는 해 질 무렵까지 남겨둘 때 완성됩니다',
        desc:'낮의 유적만 보는 도시가 아니라, 저녁 산책과 여유가 함께 있어야 좋습니다.',
        cards:[
          {label:'Best with', title:'부모님 · 역사 관심 · 조용한 산책', body:'경주는 빠른 여행보다 느린 템포에서 훨씬 잘 읽히는 도시입니다.'},
          {label:'Avoid when', title:'낮 시간에만 몰아보고 빨리 빠질 때', body:'오후와 저녁의 분위기를 놓치면 경주의 장점 절반을 놓치게 됩니다.'},
          {label:'Weather swap', title:'비 오는 날은 박물관/한옥 카페/짧은 유적 축으로', body:'완전 야외 중심 계획을 줄이고 실내 질감을 섞는 편이 오히려 더 안정적입니다.'}
        ]
      },
      en: {
        eyebrow:'Route logic',
        title:'Gyeongju usually completes itself when dusk is part of the plan',
        desc:'It is not only a daylight heritage city. The evening atmosphere is part of what makes it work.',
        cards:[
          {label:'Best with', title:'Parents · heritage interest · quiet walkers', body:'Gyeongju reads much better at a slower tempo than on a rushed monument sweep.'},
          {label:'Avoid when', title:'You only stack daytime heritage stops and leave', body:'Missing the softer late-day atmosphere means losing a big part of the city’s identity.'},
          {label:'Weather swap', title:'Use museums, hanok cafés, and shorter heritage loops on rain days', body:'A mixed indoor texture can actually make the city feel steadier in weak weather.'}
        ]
      }
    }
  };


  const editorialData = {
    magazine: {
      ko: {
        title: 'Ryokoplan — Magazine',
        heroEyebrow: 'Ryokoplan Magazine',
        heroTitle: '도시를 먼저 읽고, 그다음 여행을 만드세요',
        heroDesc: '지금 필요한 건 정보 더미보다 도시의 결, 이동 리듬, 그리고 바로 여행 흐름으로 이어지는 입구입니다. 매거진을 플래너 앞의 에디토리얼 첫 장처럼 다시 정리했습니다.',
        heroChips: ['East Asia city edit', 'Japan · Korea · Greater China', 'planner-ready routes'],
        startPlanner: '플래너 열기',
        browseCities: '도시 둘러보기',
        featureKicker: 'Editor\'s note',
        featureMeta: 'Better first route',
        featureTitle: 'Tokyo → Kyoto → Osaka, 리듬이 있는 첫 일본 여행',
        featureDesc: '도쿄의 밀도, 교토의 여백, 오사카의 쉬운 재미를 순서 있게 배치하면 초행도 훨씬 덜 지칩니다.',
        featureLinks: ['Tokyo 무드', 'Kyoto 페이스', '샘플 일정'],
        sideKicker: 'What Magazine does',
        sideTitle: '읽고 끝나는 페이지가 아니라, 여행으로 넘어가는 첫 장',
        sideLines: [
          ['City mood first', '랜드마크보다 동네 감각, 페이스, 잘 맞는 여행 타입을 먼저 보여줍니다.'],
          ['Less random browsing', 'fast city / slow day / food-led처럼 지금 끌리는 방식으로 바로 진입하게 합니다.'],
          ['Straight into Planner', '마음에 드는 도시나 샘플 흐름은 곧바로 플래너 값으로 이어집니다.']
        ],
        sideButtons: ['도시 가이드', '저장한 여정'],
        loopEyebrow: 'Recommendation loop',
        loopTitle: '읽은 뒤 바로 루트로 이어지게',
        loopDesc: '최근 본 여행이나 저장한 일정이 있으면 다음 도시를 제안하고, 없으면 강한 첫 진입점을 보여줍니다.',
        finderEyebrow: 'City finder',
        finderTitle: '나라보다 무드로 먼저 도시를 고르세요',
        finderDesc: '이제 도시 리스트도 그냥 카드 모음이 아니라, 필터와 검색으로 바로 좁혀볼 수 있게 정리했습니다.',
        finderSearchPH: '도시명, 나라, mood로 검색',
        countryAll: '전체', countryJapan: 'Japan', countryKorea: 'Korea', countryGreaterChina: '중화권',
        vibeAll: '전체 mood', vibeFast: 'Fast city', vibeSlow: 'Slow day', vibeFood: 'Food-led', vibeCoast: 'Coast',
        cityMeta: {
          tokyo:'Japan edit · Fast city', osaka:'Japan edit · Food / easy fun', kyoto:'Japan edit · Slow trip', fukuoka:'Japan edit · Compact food trip', sapporo:'Japan edit · Snow-light city', sendai:'Japan edit · Green city pause', okinawa:'Japan edit · Soft-breeze island',
          seoul:'Korea edit · Fast city', busan:'Korea edit · Coast / food', jeju:'Korea edit · Coast / nature', gyeongju:'Korea edit · Slow heritage trip', taipei:'Greater China edit · Layered night food', hongkong:'Greater China edit · Vertical harbor cut', macau:'Greater China edit · Heritage night close'
        },
        cityCopy: {
          tokyo:'큰 장면과 조용한 골목이 함께 있는 도시. 동네 기준으로 짜면 훨씬 부드럽게 풀립니다.',
          osaka:'먹고 걷고 쉬는 리듬이 가까이 모여 있어 짧은 여행에도 만족감이 큽니다.',
          kyoto:'적게 넣을수록 더 좋아지는 도시. 골목, 강변, 사원 지구가 여유를 만듭니다.',
          fukuoka:'짧게 가도 좋고, 음식 중심으로 풀기 좋은 콤팩트 시티입니다.',
          seoul:'동네 성격 차이가 커서 어디를 묶느냐가 여행 분위기를 결정합니다.',
          busan:'바다 풍경과 시장 리듬이 섞여 서울과는 다른 열린 템포가 나옵니다.',
          jeju:'풍경, 카페, 이동 여유를 중심으로 짜야 제주다운 여행이 됩니다.',
          gyeongju:'유적과 한옥 무드, 느린 산책 템포가 어울리는 도시입니다.'
        },
        chipMap: {
          tokyo:['Electric', 'Design', 'Late cafés'], osaka:['Food', 'Friends', 'Easy routes'], kyoto:['Quiet lanes', 'Scenery', 'Slow pace'], fukuoka:['Compact', 'Food stalls', 'Weekend'],
          seoul:['Neighborhoods', 'Cafés', 'Late energy'], busan:['Sea views', 'Markets', 'Parents'], jeju:['Nature', 'Scenic', 'Relaxed'], gyeongju:['History', 'Hanok mood', 'Quiet']
        },
        guideBtn:'가이드', planBtn:'플랜',
        emptyTitle:'아직 맞는 도시가 안 보여요', emptyDesc:'필터를 하나 줄이거나 도시명, 나라, 분위기로 다시 검색해보세요.',
        curatedEyebrow: 'Curated paths', curatedTitle:'같은 도시도 들어가는 결은 달라집니다', curatedDesc:'동행과 페이스가 바뀌면, 같은 도시도 다른 편집 흐름으로 읽혀야 합니다.',
        bentoFeatureKicker:'샘플 루트', bentoFeatureTitle:'도쿄 첫 여행, 덜 지치게 짜는 법', bentoFeatureDesc:'유명 지역은 챙기되, 하루에 하나의 큰 앵커와 하나의 리셋 포인트만 두는 식으로 균형을 맞춥니다.',
        readSample:'샘플 읽기', usePlanner:'플래너에 쓰기',
        parentsKicker:'부모님과', parentsTitle:'풍경 위주로, 무리 없이 보는 부산', parentsDesc:'바다 뷰, 쉬운 동선, 체력 소모를 줄인 타이밍 중심으로 읽습니다.', openBusan:'부산 샘플 열기',
        slowKicker:'슬로우 트립', slowTitle:'체크리스트보다 리듬으로 보는 교토', slowDesc:'사람 없는 시간대와 쉬는 구간까지 생각해야 교토가 더 좋게 느껴집니다.', openKyoto:'교토 샘플 열기',
        howKicker:'Magazine 활용법', howSteps:[['1. 무드 고르기','fast city / slow route / food-led / coast 중 지금 끌리는 것부터.'],['2. 도시 하나 읽기','vibe, pace, district focus, local tips로 감을 잡습니다.'],['3. 바로 Planner','도시 선택을 그대로 일정 생성으로 넘깁니다.']],
        bannerTitle:'도시를 읽고, 루트를 남기세요', bannerDesc:'Ryokoplan은 매거진과 플래너와 저장된 루트가 한 흐름일 때 가장 자연스럽습니다. 도시를 먼저 읽고, 루트를 만들고, 저장하고, 다시 이어보세요.', bannerPlanner:'여행 시작하기', bannerTrips:'My Trips 열기',
        loopFreshEyebrow:'Fresh start', loopFreshTitle:'도시 하나를 제대로 읽으면 첫 루트가 쉬워집니다', loopFreshDesc:'아직 저장한 여행이 없어도 괜찮습니다. 매거진은 첫 루트로 들어가는 가장 자연스러운 입구가 될 수 있습니다.', loopFreshA:'Tokyo 읽기', loopFreshB:'플래너 열기', loopSideTitle:'좋은 첫 진입', loopSideItems:['Tokyo · 밀도와 리듬 파악용', 'Kyoto · 여백이 필요한 여행', 'Seoul · 동네 감각 중심']
      },
      en: {
        title: 'Ryokoplan — Magazine',
        heroEyebrow: 'Ryokoplan Magazine',
        heroTitle: 'Read the city first. Then build the trip.',
        heroDesc: 'What matters here is not more information, but a clearer read on city mood, movement, and where the trip should begin. Magazine now works as the editorial front door to Planner.',
        heroChips: ['East Asia city edit', 'Japan · Korea · Greater China', 'planner-ready routes'],
        startPlanner: 'Open Planner',
        browseCities: 'Browse cities',
        featureKicker: 'Editor\'s note',
        featureMeta: 'Better first route',
        featureTitle: 'Tokyo → Kyoto → Osaka, with better rhythm',
        featureDesc: 'The sequence works because Tokyo brings density, Kyoto slows the trip down, and Osaka closes with easier food-and-fun movement.',
        featureLinks: ['Tokyo mood', 'Kyoto pace', 'Sample plan'],
        sideKicker: 'What Magazine does',
        sideTitle: 'Not a side page, but the editorial front door',
        sideLines: [
          ['City mood first', 'See neighborhood feel, pace, and who the city fits before the checklist starts.'],
          ['Less random browsing', 'Enter through fast city, slow day, food-led, or coast instead of endless tab-hopping.'],
          ['Straight into Planner', 'Any city guide or sample route can flow straight into a usable trip setup.']
        ],
        sideButtons: lang === 'ja' ? ['都市ガイド', '保存した旅程'] : lang === 'zhHant' ? ['城市指南', '已存旅程'] : ['City guides', 'Saved trips'],
        loopEyebrow: 'Recommendation loop',
        loopTitle: 'So reading can turn into a route',
        loopDesc: 'If you already have saved or recent trips, Magazine pushes the next city. If not, it shows the strongest first entry points.',
        finderEyebrow: 'City finder',
        finderTitle: 'Choose the city by mood first',
        finderDesc: 'The city list now behaves more like a filterable editorial shelf than a simple grid of cards.',
        finderSearchPH: 'Search by city, country, or mood',
        countryAll: 'All', countryJapan: 'Japan', countryKorea: 'Korea', countryGreaterChina: 'Greater China',
        vibeAll: 'All moods', vibeFast: 'Fast city', vibeSlow: 'Slow day', vibeFood: 'Food-led', vibeCoast: 'Coast',
        cityMeta: {
          tokyo:'Japan edit · Fast city', osaka:'Japan edit · Food / easy fun', kyoto:'Japan edit · Slow trip', fukuoka:'Japan edit · Compact food trip', sapporo:'Japan edit · Snow-light city', sendai:'Japan edit · Green city pause', okinawa:'Japan edit · Soft-breeze island',
          seoul:'Korea edit · Fast city', busan:'Korea edit · Coast / food', jeju:'Korea edit · Coast / nature', gyeongju:'Korea edit · Slow heritage trip', taipei:'Greater China edit · Layered night food', hongkong:'Greater China edit · Vertical harbor cut', macau:'Greater China edit · Heritage night close'
        },
        cityCopy: {
          tokyo:'A city where major scenes and quiet backstreets coexist. It feels much smoother when planned by neighborhoods.',
          osaka:'Food, walking, and low-friction fun sit close together, which makes short trips very satisfying.',
          kyoto:'A city that improves when you do less. Alleys, river walks, and temple districts create the pace.',
          fukuoka:'Compact, short-trip friendly, and easy to build around eating well.',
          seoul:'Neighborhood contrast matters more than landmark-chasing. What you group changes the whole mood.',
          busan:'Sea views and market rhythm create a more open tempo than Seoul.',
          jeju:'Jeju works best when scenery, cafés, and transfer ease shape the route.',
          gyeongju:'Heritage texture, hanok mood, and slow walking pace make the city feel distinct.'
        },
        chipMap: {
          tokyo:['Electric', 'Design', 'Late cafés'], osaka:['Food', 'Friends', 'Easy routes'], kyoto:['Quiet lanes', 'Scenery', 'Slow pace'], fukuoka:['Compact', 'Food stalls', 'Weekend'],
          seoul:['Neighborhoods', 'Cafés', 'Late energy'], busan:['Sea views', 'Markets', 'Parents'], jeju:['Nature', 'Scenic', 'Relaxed'], gyeongju:['History', 'Hanok mood', 'Quiet']
        },
        guideBtn:'Guide', planBtn:'Plan',
        emptyTitle:'No matching city yet', emptyDesc:'Try removing a filter or searching by city, country, or trip mood.',
        curatedEyebrow: 'Curated paths', curatedTitle:'Different ways into the same city edit', curatedDesc:'The right entry should shift with the companion, the pace, and the kind of days you want to hold.',
        bentoFeatureKicker:'Sample', bentoFeatureTitle:'Tokyo first trip, but less exhausting', bentoFeatureDesc:'Keep the iconic districts, but balance each day around one clear anchor and one reset point.',
        readSample:'Read sample route', usePlanner:'Use in Planner',
        parentsKicker:'親と一緒', parentsTitle:'Busan built for scenery, not rushing', parentsDesc:'Sea views, easier routes, and timing that lowers fatigue.', openBusan:'Open Busan sample',
        slowKicker:'ゆっくり旅', slowTitle:'Kyoto by rhythm, not by checklist', slowDesc:'The city feels better when you consider calm hours, rests, and fewer anchors.', openKyoto:'Open Kyoto sample',
        howKicker:'How to use Magazine', howSteps:[['1. Pick a mood','Start with fast city, slow route, food-led, or coast.'],['2. Read one city','Get vibe, pace, district focus, and local tips first.'],['3. Jump to Planner','Carry the city choice straight into a usable itinerary.']],
        bannerTitle:'Read the city. Then keep the route.', bannerDesc:'Ryokoplan is strongest when Magazine, Planner, and saved routes feel like one continuous flow. Read one city well, shape the route, save it, and return to it later.', bannerPlanner:'Start planning', bannerTrips:'Open My Trips',
        loopFreshEyebrow:'Fresh start', loopFreshTitle:'One good city read makes the first route easier', loopFreshDesc:'You do not need a saved trip yet. Magazine can still be the cleanest first entry into your first route.', loopFreshA:'Read Tokyo', loopFreshB:'Open Planner', loopSideTitle:'Good first entries', loopSideItems:['Tokyo · density and rhythm', 'Kyoto · slower reset', 'Seoul · neighborhood contrast']
      }
    },
    city: {
      tokyo: {
        country: 'Japan', image: 'assets/images/cities/tokyo.jpg', planner: 'Tokyo', example: 'tokyo-3n4d-first-trip.html',
        ko: { eyebrow:'City editorial', lead:'체크리스트보다 동네 단위로 읽을 때 훨씬 부드럽게 풀리는 도시입니다.', chips:['Electric crossings','Quiet backstreets','Late cafés','Design shops'], why:'Why it works', whyDesc:'도쿄는 많이 보는 것보다 같은 방향의 동네를 하루에 묶는 편이 훨씬 좋습니다.', bestFor:'첫 여행, 쇼핑, 식도락, 밤 풍경, 동네 hopping', pace:'첫 방문은 3박 4일 전후가 가장 안정적입니다.', season:'3월 말~5월, 10월~12월 초가 가장 무난합니다.', focusTitle:'Where to focus', focusDesc:'전부 찍기보다 지금 원하는 리듬에 맞는 구역을 고르세요.', districts:[['Shibuya & Harajuku','첫날 에너지, 식사 선택지, 도쿄다운 장면을 빠르게 얻기 좋습니다.'],['Asakusa & Ueno','전형적인 도쿄 장면과 박물관, 초행자에게 읽기 쉬운 동선이 나옵니다.'],['Kiyosumi & Ginza','조용한 카페, 갤러리, 정돈된 도시 무드를 원할 때 좋습니다.']], foodTitle:'Food and local rhythm', foodDesc:'유명 장소 리스트보다 실제 체감에 더 큰 영향을 주는 요소들입니다.', foodBullets:['백화점 지하 식품관은 실패 확률이 낮은 테이크아웃 허브입니다.','서서 먹는 스시나 소바는 짧은 식사에도 효율이 좋습니다.','늦은 밤엔 이자카야 골목이 도쿄의 분위기를 크게 바꿉니다.'], budgetFeel:'중간 예산 기준으로는 큰 액티비티 하나와 동네 산책을 섞을 때 만족도가 좋습니다.', sampleTitle:'Sample rhythm for Tokyo', sampleDesc:'커스텀 생성 전에 pacing 감을 잡는 가장 현실적인 방식입니다.', sampleDays:[['Day 1 · Arrival and soft landing','시부야 첫 장면, 조용한 커피 한 곳, 가까운 저녁으로 첫날을 가볍게 시작합니다.'],['Day 2 · Icons without overload','아사쿠사 오전, 우에노나 박물관 포켓, 저녁엔 한 번의 전망 포인트.'],['Day 3 · Mood day','다이칸야마나 기요스미처럼 템포가 느슨한 동네를 하루 중심으로 둡니다.'],['Day 4 · Last picks and departure','짧은 쇼핑, 역 이동 버퍼, 마지막 식사까지 남겨둡니다.']], tips:['시부야, 아사쿠사, teamLab을 하루에 모두 넣으면 환승 피로가 큽니다.','도쿄는 역 출구 번호 차이가 커서 출구 확인이 체감 피로를 줄입니다.','편의점은 아침과 늦은 밤 fallback 식사로 생각보다 강력합니다.'], keep:['작은 쓰레기 파우치를 챙기면 편합니다.','대형 역은 환승 시간을 넉넉히 두세요.','날씨나 쇼핑 변수용 유동 슬롯 하루 하나는 남겨두는 편이 좋습니다.'], finalTitle:'도시를 읽고, 이제 당신 일정으로 바꾸세요', finalDesc:'이 가이드는 톤과 흐름을 잡는 기준입니다. 이제 플래너에서 동행, 페이스, 무드를 당신 쪽으로 조정하면 됩니다.' },
        en: { eyebrow:'City editorial', lead:'Tokyo opens best when you treat it like a stack of city covers—one district line at a time, each with its own pressure and release.', chips:['Electric crossings','Quiet backstreets','Late cafés','Design shops'], why:'Why it works', whyDesc:'Tokyo gets cleaner when each day holds one compact zone with its own logic, instead of asking the city to perform every headline stop at once.', bestFor:'First-timers, shopping, food runs, late-night views, neighborhood-hopping', pace:'3 to 4 nights is the sweet spot for a first visit.', season:'Late March to May and October to early December feel easiest.', focusTitle:'Where to focus', focusDesc:'Pick districts that match your energy instead of trying to touch everything.', districts:[['Shibuya & Harajuku','Good for first-day energy, food options, and a strong Tokyo feeling right away.'],['Asakusa & Ueno','Classic scenes, museums, and a very readable route for first-timers.'],['Kiyosumi & Ginza','Better when you want calmer cafés, galleries, and a polished city mood.']], foodTitle:'Food and local rhythm', foodDesc:'These shape the city more than a simple list of famous places.', foodBullets:['Department store basements are unusually reliable for easy takeaway picks.','Standing sushi or soba work well when you want a short but good meal.','Late izakaya blocks change how Tokyo feels after dark.'], budgetFeel:'For a mid-range trip, one bigger-ticket activity plus neighborhood wandering usually feels balanced.', sampleTitle:'Sample rhythm for Tokyo', sampleDesc:'A realistic way to think about pacing before generating your own plan.', sampleDays:[['Day 1 · Arrival and soft landing','Start with Shibuya, one slower coffee stop, and dinner nearby so the first night stays easy.'],['Day 2 · Icons without overload','Asakusa in the morning, Ueno or a museum pocket after lunch, then one skyline moment.'],['Day 3 · Mood day','Let a calmer neighborhood like Daikanyama or Kiyosumi shape the day.'],['Day 4 · Last picks and departure','Leave room for short shopping, transfer buffer, and one final meal.']], tips:['Avoid stacking Shibuya, Asakusa, and teamLab on one day unless you want a transit-heavy schedule.','Station exits matter more than travelers expect, so check the exit number first.','Convenience stores are unusually strong fallback options for breakfast or late meals.'], keep:['Carry a small trash pouch because public bins are limited.','Leave extra transfer time for very large stations.','Keep one flexible slot for weather or shopping drift.'], finalTitle:'Read the city, then make it yours', finalDesc:'Use this guide as the tone reference, then let Planner adjust the pace, companion, and mood to fit your trip.' }
      },
      osaka: {
        country: 'Japan', image: 'assets/images/cities/osaka.jpg', planner:'Osaka', example:'osaka-2n3d-family.html',
        ko:{ eyebrow:'City editorial', lead:'오사카는 많이 걷지 않아도 먹고 놀고 쉬는 리듬이 자연스럽게 이어지는 도시입니다.', chips:['Street food','Easy fun','Night energy','Short hops'], why:'Why it works', whyDesc:'오사카는 명소보다 구역별 분위기와 식사 타이밍을 잘 묶을수록 만족도가 올라갑니다.', bestFor:'친구 여행, 짧은 주말, 먹거리 위주, 첫 일본 도시', pace:'2박 3일만으로도 충분히 만족도가 높습니다.', season:'봄과 가을이 가장 무난하고, 여름은 덥지만 밤 리듬이 좋습니다.', focusTitle:'Where to focus', focusDesc:'핵심은 멀리 이동하는 대신 재미가 밀집된 구역을 묶는 것입니다.', districts:[['Namba & Dotonbori','오사카다운 에너지와 식사 선택지를 가장 빠르게 체감할 수 있습니다.'],['Umeda & Nakazakicho','쇼핑과 카페, 실내 이동 비중이 필요한 날에 좋습니다.'],['Shinsekai & Tennoji','조금 더 로컬한 질감과 전망 포인트를 섞기 좋습니다.']], foodTitle:'Food and local rhythm', foodDesc:'오사카는 무엇을 보느냐보다 언제 무엇을 먹느냐가 기억에 남습니다.', foodBullets:['타코야키, 오코노미야키 같은 street food는 이동 중 리듬을 끊지 않습니다.','긴 줄 식당 하나보다 적당히 좋은 가게 여러 곳이 오사카와 더 잘 맞습니다.','늦은 밤 난바 주변은 짧은 2차까지 넣기 쉽습니다.'], budgetFeel:'중간 예산이면 쇼핑 한 구간과 대표 음식 몇 끼를 무리 없이 담을 수 있습니다.', sampleTitle:'Sample rhythm for Osaka', sampleDesc:'오사카는 과하게 쪼개기보다 큰 장면 몇 개를 쉽게 연결하는 편이 좋습니다.', sampleDays:[['Day 1 · Easy arrival','난바나 도톤보리 근처로 바로 진입해 밤 리듬을 먼저 느낍니다.'],['Day 2 · Food and fun core','시장, 쇼핑, 전망 포인트를 가까운 반경 안에서 풀어갑니다.'],['Day 3 · Last meal and move','점심 한 끼와 짧은 쇼핑만 남기고 이동 버퍼를 둡니다.']], tips:['USJ를 넣는 날은 그날 다른 핵심 지역을 빼는 편이 좋습니다.','난바와 우메다는 모두 강하지만 하루에 둘 다 깊게 넣으면 산만해질 수 있습니다.','오사카는 늦은 저녁까지 리듬이 살아 있어 일찍 끝낼 필요가 적습니다.'], keep:['숙소 위치는 난바/신사이바시 쪽이 초행에 편합니다.','현금만 받는 오래된 가게도 아직 남아 있습니다.','짧은 여행일수록 쇼핑 시간을 따로 분리하세요.'], finalTitle:'오사카는 가볍게 풀수록 좋습니다', finalDesc:'플래너에서는 먹거리, 쇼핑, 친구 여행, 가족 여행 중 어느 축을 더 강하게 둘지 정하면 훨씬 잘 맞습니다.' },
        en:{ eyebrow:'City editorial', lead:'Osaka is rewarding because food, fun, and easy movement stay naturally close together.', chips:['Street food','Easy fun','Night energy','Short hops'], why:'Why it works', whyDesc:'Osaka works better when you group food timing and district mood instead of chasing too many attractions.', bestFor:'Friends, short weekends, food-led trips, a first easy Japan city', pace:'2 nights and 3 days already feels satisfying here.', season:'Spring and autumn feel easiest, though summer nights still have strong energy.', focusTitle:'Where to focus', focusDesc:'Keep the trip compact by grouping areas with naturally dense fun.', districts:[['Namba & Dotonbori','The fastest way to feel Osaka energy and food variety.'],['Umeda & Nakazakicho','Useful for shopping, cafés, and more indoor movement.'],['Shinsekai & Tennoji','Adds more local texture plus one clearer view point.']], foodTitle:'Food and local rhythm', foodDesc:'In Osaka, what you eat and when you eat often matters more than what you tick off.', foodBullets:['Street food like takoyaki or okonomiyaki keeps the day moving.','Several good casual places often suit Osaka better than one long-line restaurant.','Namba stays active late, which makes a short second round easy.'], budgetFeel:'Mid-range trips can easily fit shopping plus several strong food stops.', sampleTitle:'Sample rhythm for Osaka', sampleDesc:'The city feels better when you connect a few bigger scenes instead of over-splitting the day.', sampleDays:[['Day 1 · Easy arrival','Drop into Namba or Dotonbori first and let the evening set the tone.'],['Day 2 · Food and fun core','Markets, shopping, and one view point can stay in a compact radius.'],['Day 3 · Last meal and move','Leave just enough room for lunch, short shopping, and transfer buffer.']], tips:['If you add USJ, remove another major zone that day.','Namba and Umeda are both strong, but doing both deeply on one day can feel scattered.','Osaka stays lively late, so there is less need to end the day early.'], keep:['Namba or Shinsaibashi is easiest for first-time stays.','Some older shops still prefer cash.','On short trips, separate shopping time on purpose.'], finalTitle:'Osaka usually improves when you keep it light', finalDesc:'In Planner, decide whether the trip leans more toward food, shopping, friends, or family comfort.' }
      },
      kyoto: {
        country:'Japan', image:'assets/images/cities/kyoto.jpg', planner:'Kyoto', example:'kyoto-2n3d-slow-trip.html',
        ko:{ eyebrow:'City editorial', lead:'교토는 많이 넣을수록 좋아지지 않습니다. 적게 보고 더 느리게 움직일수록 도시가 살아납니다.', chips:['Temple mornings','Quiet lanes','River walks','Tea breaks'], why:'Why it works', whyDesc:'교토는 이동을 줄이고 비슷한 질감의 구역을 묶어야 피로보다 분위기가 남습니다.', bestFor:'슬로우 트립, 혼자 여행, 부모님과, 감성 중심 일정', pace:'2박 3일 또는 3박 4일의 느슨한 일정이 가장 좋습니다.', season:'벚꽃/단풍 시즌은 강하지만, 사람이 적은 평일 오전이 훨씬 중요합니다.', focusTitle:'Where to focus', focusDesc:'하루에 2개 구역 정도만 잡고 나머지는 걷고 쉬는 시간으로 남겨두세요.', districts:[['Higashiyama','사원과 골목, 교토다운 장면을 가장 진하게 느끼기 좋습니다.'],['Arashiyama','자연과 산책, 아침 시간대가 특히 좋은 구역입니다.'],['Kawaramachi & Demachiyanagi','강변, 카페, 로컬 리듬을 섞기 좋습니다.']], foodTitle:'Food and local rhythm', foodDesc:'교토는 화려한 먹거리보다 조용한 식사와 티 브레이크가 더 잘 어울립니다.', foodBullets:['오전 사원 구간 뒤에 찻집이나 카페를 넣으면 템포가 안정됩니다.','점심 피크를 피하면 유명 지역에서도 훨씬 편합니다.','해 질 무렵 강변 산책 하나만으로도 하루가 정리됩니다.'], budgetFeel:'교토는 숙소 분위기에 따라 체감 예산이 크게 달라집니다. 일정 자체는 무리하게 비싸지 않아도 좋습니다.', sampleTitle:'Sample rhythm for Kyoto', sampleDesc:'교토는 체크리스트보다 하루 무드가 훨씬 중요합니다.', sampleDays:[['Day 1 · Quiet entry','오후 도착 후 강변이나 골목 위주로 가볍게 적응합니다.'],['Day 2 · Temple morning, soft afternoon','이른 오전 사원, 점심 후 카페와 산책으로 템포를 누그러뜨립니다.'],['Day 3 · One last district','한 구역만 더 깊게 보고 여유 있게 마무리합니다.']], tips:['사원 3곳 이상을 한날에 넣으면 비슷한 피로가 겹칠 수 있습니다.','교토는 아침 시작이 늦으면 체감이 많이 달라집니다.','버스보다 택시를 짧게 섞는 것이 오히려 체력 관리에 좋을 때가 있습니다.'], keep:['사람 많은 시즌엔 식당 예약을 고려하세요.','걷는 시간이 길어질 수 있어 신발이 중요합니다.','비 오는 날 대안으로 실내 카페나 전시 공간을 하나 확보해두세요.'], finalTitle:'교토는 여백이 핵심입니다', finalDesc:'플래너에서는 느슨한 하루 밀도와 조용한 무드를 선택할수록 이 도시와 잘 맞습니다.' },
        en:{ eyebrow:'City editorial', lead:'Kyoto does not improve by adding more. It gets better when you do less and move slower.', chips:['Temple mornings','Quiet lanes','River walks','Tea breaks'], why:'Why it works', whyDesc:'Kyoto feels stronger when similar textures stay grouped and transfers stay low.', bestFor:'Slow trips, solo travel, parents, mood-led itineraries', pace:'A loose 2N3D or 3N4D rhythm fits Kyoto best.', season:'Cherry blossom and foliage matter, but calm weekday mornings matter even more.', focusTitle:'Where to focus', focusDesc:'Aim for two zones a day at most, then leave the rest to walking and resting.', districts:[['Higashiyama','The strongest area for temples, lanes, and classic Kyoto texture.'],['Arashiyama','Natural scenery and morning light make this area work best early.'],['Kawaramachi & Demachiyanagi','Useful when you want riverside movement, cafés, and softer local rhythm.']], foodTitle:'Food and local rhythm', foodDesc:'Kyoto suits quiet meals and tea breaks more than a loud food checklist.', foodBullets:['A tea stop after a temple zone often resets the day well.','Avoiding lunch peak changes the comfort level even in popular areas.','One riverside walk near dusk can be enough to close the day beautifully.'], budgetFeel:'Kyoto feels more expensive or not mainly through lodging tone, not the route itself.', sampleTitle:'Sample rhythm for Kyoto', sampleDesc:'In Kyoto, day mood matters much more than the raw number of stops.', sampleDays:[['Day 1 · Quiet entry','Arrive softly and let riverside or alley walking set the tone.'],['Day 2 · Temple morning, soft afternoon','Start early with one temple zone, then slow the day with cafés and a walk.'],['Day 3 · One last district','Go deeper into just one more district and close without rushing.']], tips:['Three or more temple anchors in one day can create repetitive fatigue.','Kyoto changes a lot if your mornings start late.','Short taxi hops can be better for energy than insisting on all-bus movement.'], keep:['In busy seasons, meal reservations can help more than expected.','Shoes matter because walking time grows quickly here.','Keep one rainy-day indoor café or gallery option.'], finalTitle:'Kyoto is really about leaving room', finalDesc:'In Planner, lower day density and a softer mood usually fit this city better.' }
      },
      fukuoka: {
        country:'Japan', image:'assets/images/cities/fukuoka.jpg', planner:'Fukuoka', example:'fukuoka-2n3d-food-trip.html',
        ko:{ eyebrow:'City editorial', lead:'후쿠오카는 짧아도 맛있고, 멀리 안 가도 만족감이 높은 도시입니다.', chips:['Yatai nights','Compact routes','Ramen breaks','Riverside'], why:'Why it works', whyDesc:'후쿠오카는 규모가 콤팩트해서 음식과 산책, 쇼핑을 한 덩어리로 묶기 쉽습니다.', bestFor:'짧은 일본 여행, 음식 중심 일정, 친구/커플', pace:'2박 3일이면 핵심을 충분히 즐길 수 있습니다.', season:'봄과 가을이 가장 걷기 좋고, 겨울도 비교적 부담이 적습니다.', focusTitle:'Where to focus', focusDesc:'후쿠오카는 무리하게 넓히지 말고 중심부 리듬을 즐기는 편이 좋습니다.', districts:[['Tenjin','쇼핑과 카페, 이동 허브 역할을 모두 하는 중심 구역입니다.'],['Nakasu & Hakata','밤 리듬과 음식 중심으로 풀기 좋습니다.'],['Ohori & Yakuin','조금 더 느긋하고 동네 감각이 있는 구간입니다.']], foodTitle:'Food and local rhythm', foodDesc:'이 도시는 먹는 시간이 곧 여행의 구조가 됩니다.', foodBullets:['라멘, 모츠나베, 야타이 같은 키워드만으로도 흐름이 선명해집니다.','쇼핑이나 관광보다 식사 간격을 기준으로 짜는 편이 더 잘 맞습니다.','강변 산책은 저녁 식사 전후에 넣기 좋습니다.'], budgetFeel:'후쿠오카는 과하게 비싸지 않아도 만족감 있는 음식 구성이 가능합니다.', sampleTitle:'Sample rhythm for Fukuoka', sampleDesc:'먹는 리듬을 중심에 놓으면 짧은 여행도 훨씬 선명해집니다.', sampleDays:[['Day 1 · Arrival and first bites','텐진 주변에 적응하며 첫 끼와 가벼운 밤 산책을 넣습니다.'],['Day 2 · Full food day','하카타, 나카스, 강변 구간을 중심으로 먹고 쉬고 걷는 리듬을 만듭니다.'],['Day 3 · Last meal and exit','체크아웃 후 마지막 한 끼와 쇼핑 정도만 남깁니다.']], tips:['야타이는 날씨와 대기열 변수에 따라 대안 가게를 하나 준비해두면 좋습니다.','하카타역 주변과 텐진은 둘 다 강하지만 역할이 다릅니다.','짧은 여행일수록 카페보다 식사 우선순위를 먼저 정하세요.'], keep:['인기 식당은 피크 시간대를 살짝 피하세요.','비가 와도 크게 무너지지 않는 도시입니다.','숙소는 텐진/하카타 중 이동 스타일에 맞춰 고르세요.'], finalTitle:'후쿠오카는 간결할수록 좋습니다', finalDesc:'플래너에서는 food-led와 compact pace를 잡으면 이 도시의 장점이 더 잘 살아납니다.' },
        en:{ eyebrow:'City editorial', lead:'Fukuoka is satisfying because it can feel delicious and complete without stretching the trip too far.', chips:['Yatai nights','Compact routes','Ramen breaks','Riverside'], why:'Why it works', whyDesc:'The city is compact enough to group food, walking, and light shopping into one easy rhythm.', bestFor:'Short Japan trips, food-led plans, friends or couples', pace:'2N3D is enough to enjoy the core well.', season:'Spring and autumn are easiest for walking, though winter still feels manageable.', focusTitle:'Where to focus', focusDesc:'Fukuoka works better when you enjoy the central rhythm instead of forcing too much distance.', districts:[['Tenjin','A central zone that works for shopping, cafés, and movement.'],['Nakasu & Hakata','Strong for night rhythm and food-led planning.'],['Ohori & Yakuin','A calmer stretch with more neighborhood feel.']], foodTitle:'Food and local rhythm', foodDesc:'In Fukuoka, meal timing becomes the structure of the trip itself.', foodBullets:['Ramen, motsunabe, and yatai already create a strong route logic.','Planning around meal gaps often works better than planning around attractions.','Riverside walks fit especially well before or after dinner.'], budgetFeel:'Fukuoka can feel satisfying on a moderate budget without needing luxury meals.', sampleTitle:'Sample rhythm for Fukuoka', sampleDesc:'Short trips feel sharper when food rhythm stays at the center.', sampleDays:[['Day 1 · Arrival and first bites','Settle into Tenjin and let the first meal plus an evening walk start the trip.'],['Day 2 · Full food day','Use Hakata, Nakasu, and the riverside to alternate eating, resting, and walking.'],['Day 3 · Last meal and exit','Keep only one final meal and a little shopping before leaving.']], tips:['For yatai, keep one backup in mind because weather and waiting lines shift fast.','Hakata and Tenjin are both strong, but they serve different roles.','On short trips, rank meals before cafés.'], keep:['Shift popular meal times slightly when you can.','Rain usually hurts this city less than expected.','Choose Tenjin or Hakata lodging based on your movement style.'], finalTitle:'Fukuoka improves when it stays concise', finalDesc:'In Planner, food-led plus compact pacing usually fits this city best.' }
      },
      seoul: {
        country:'Korea', image:'assets/images/cities/seoul.jpg', planner:'Seoul', example:'seoul-2n3d-city-vibes.html',
        ko:{ eyebrow:'Korea City Guide', lead:'서울은 무엇을 보느냐보다 어떤 동네를 묶느냐가 여행 무드를 결정하는 도시입니다.', chips:['Neighborhood contrast','Late cafés','Night views','Fast transit'], why:'Why it works', whyDesc:'서울은 동네 간 분위기 차이가 커서 하루 단위로 성격을 나눠 짜는 편이 좋습니다.', bestFor:'친구 여행, 카페/감성, 짧은 도심 여행, 야간 뷰', pace:'2박 3일도 가능하지만 3박 4일이면 동네 차이를 더 잘 즐길 수 있습니다.', season:'봄과 가을이 가장 좋고, 겨울은 실내/카페 중심으로 재구성하면 괜찮습니다.', focusTitle:'Where to focus', focusDesc:'서울은 랜드마크보다 동네 조합이 중요합니다.', districts:[['Seongsu & Seoul Forest','카페, 편집숍, 가벼운 산책이 잘 어울리는 구역입니다.'],['Euljiro & Jongno','서울의 오래된 질감과 밤 분위기를 섞기 좋습니다.'],['Mangwon & Yeonnam','조금 더 가볍고 로컬한 낮 루트를 만들기 좋습니다.']], foodTitle:'Food and local rhythm', foodDesc:'서울은 식사와 카페, 밤 풍경이 하루의 리듬을 크게 바꿉니다.', foodBullets:['점심과 저녁 사이 카페 타임이 긴 도시입니다.','밤 전망 포인트 하나만 잘 넣어도 서울다운 느낌이 확 살아납니다.','동네 이동이 잦아지면 피로도가 빨리 올라갑니다.'], budgetFeel:'식사 옵션 폭이 넓어서 예산 조절이 쉬운 편입니다. 다만 카페와 택시가 누적될 수 있습니다.', sampleTitle:'Sample rhythm for Seoul', sampleDesc:'서울은 빠르게도 느리게도 만들 수 있지만, 하루마다 성격을 나누는 편이 좋습니다.', sampleDays:[['Day 1 · Easy district entry','성수나 연남처럼 걸으며 적응하기 좋은 동네로 시작합니다.'],['Day 2 · Contrast day','낮엔 동네 감성, 밤엔 전망이나 바/야경으로 다른 얼굴을 넣습니다.'],['Day 3 · One last neighborhood','마지막 반나절은 욕심내지 말고 한 동네만 더 깊게 봅니다.']], tips:['성수, 성수동 카페, 더현대, 한남을 하루에 깊게 다 넣으면 피로가 큽니다.','서울은 지하철이 좋지만 밤엔 택시가 전체 템포를 부드럽게 만들 때가 있습니다.','웨이팅 식당 하나 때문에 하루 리듬을 무너뜨리지 않는 편이 좋습니다.'], keep:['동행 취향 차이가 크면 동네별 자유 시간을 주는 게 좋습니다.','주말 인기 동네는 오전 시작이 훨씬 낫습니다.','비 오는 날엔 실내 쇼핑/카페 대안을 미리 넣어두세요.'], finalTitle:'서울은 동네 조합이 전부입니다', finalDesc:'플래너에서는 city vibes, food, neighborhood 중심 옵션이 특히 잘 맞습니다.' },
        en:{ eyebrow:'Korea City Guide', lead:'In Seoul, the city mood changes more by which neighborhoods you group than by what landmarks you tick off.', chips:['Neighborhood contrast','Late cafés','Night views','Fast transit'], why:'Why it works', whyDesc:'Seoul works best when each day has its own neighborhood character instead of one giant mixed list.', bestFor:'Friends, café and mood trips, short city breaks, night views', pace:'2N3D works, but 3N4D shows the neighborhood contrast better.', season:'Spring and autumn feel strongest. Winter improves when you lean more indoor and café-led.', focusTitle:'Where to focus', focusDesc:'Neighborhood combinations matter more than landmarks here.', districts:[['Seongsu & Seoul Forest','Strong for cafés, concept stores, and light walking.'],['Euljiro & Jongno','Useful when you want older city texture plus a stronger night mood.'],['Mangwon & Yeonnam','Better for softer daytime routes and local-feeling movement.']], foodTitle:'Food and local rhythm', foodDesc:'Meals, cafés, and night views can change the whole feel of a Seoul day.', foodBullets:['Seoul is a city with long café windows between lunch and dinner.','One strong night-view point can make the trip feel much more Seoul-specific.','Too many cross-city jumps build fatigue quickly.'], budgetFeel:'Food budgets are flexible, though cafés and taxis can quietly accumulate.', sampleTitle:'Sample rhythm for Seoul', sampleDesc:'The city can go fast or soft, but it usually works better when each day has one identity.', sampleDays:[['Day 1 · Easy district entry','Start in a district like Seongsu or Yeonnam that is easy to settle into on foot.'],['Day 2 · Contrast day','Use daytime neighborhood mood and night skyline energy as two faces of Seoul.'],['Day 3 · One last neighborhood','Keep the final half day focused on just one more district.']], tips:['Doing Seongsu, The Hyundai, Hannam, and deep café hopping all in one day gets tiring fast.','Subways are strong, but taxis at night can smooth the trip more than expected.','Do not let one waiting-list restaurant break the whole rhythm.'], keep:['If companion tastes differ, leave some free time within the district.','Busy neighborhoods are much better earlier on weekends.','Keep one indoor shopping or café fallback for rain.'], finalTitle:'Seoul is really about neighborhood composition', finalDesc:'In Planner, city vibes, food, and neighborhood-focused styles fit this city especially well.' }
      },
      busan: {
        country:'Korea', image:'assets/images/cities/busan.jpg', planner:'Busan', example:'busan-2n3d-with-parents.html',
        ko:{ eyebrow:'Korea City Guide', lead:'부산은 바다 뷰와 시장 리듬, 언덕과 평지가 섞여 있어 어디를 어떻게 묶느냐가 중요합니다.', chips:['Sea views','Markets','Open pace','Sunset spots'], why:'Why it works', whyDesc:'부산은 서울보다 열린 템포가 장점이지만, 언덕과 이동거리를 잘 조절해야 더 좋아집니다.', bestFor:'부모님 동행, 풍경 위주, 바다, 가벼운 주말 여행', pace:'2박 3일도 충분하고, 무리하지 않는 루트가 특히 좋습니다.', season:'봄/가을이 가장 좋고, 겨울 바다도 분위기가 강합니다.', focusTitle:'Where to focus', focusDesc:'부산은 도시 전체를 도는 것보다 성격 다른 바다 구역을 나눠서 보는 편이 좋습니다.', districts:[['Haeundae & Dalmaji','익숙하고 편한 바다 풍경, 카페, 첫 방문자 친화적인 구역입니다.'],['Nampo & Jagalchi','시장과 오래된 부산 감각을 느끼기 좋습니다.'],['Gwangalli & Millak','밤 바다, 회, 비교적 쉬운 산책 리듬이 좋습니다.']], foodTitle:'Food and local rhythm', foodDesc:'부산은 식사와 바다 산책을 교차시키면 훨씬 자연스럽습니다.', foodBullets:['해산물 식사는 한 끼만 강하게 잡아도 만족도가 큽니다.','해운대와 광안리는 비슷해 보여도 야경과 거리 감각이 다릅니다.','시장 구간은 체력 소모가 커서 오후 늦게 넣지 않는 편이 좋습니다.'], budgetFeel:'카페와 바다 뷰 숙소를 넣으면 예산이 올라가지만, 일정 구조 자체는 크게 비싸지 않습니다.', sampleTitle:'Sample rhythm for Busan', sampleDesc:'부산은 풍경과 이동 편의 사이 균형을 맞추는 것이 핵심입니다.', sampleDays:[['Day 1 · Sea-first entry','해운대나 광안리처럼 바다를 먼저 느끼는 구역으로 시작합니다.'],['Day 2 · Market and coast contrast','시장 질감과 다른 해변 리듬을 하루에 대비시켜 넣습니다.'],['Day 3 · Scenic close','무리 없는 카페/산책 하나로 마지막을 정리합니다.']], tips:['감천문화마을은 사진은 좋지만 부모님 동행이면 체력 고려가 꼭 필요합니다.','부산은 언덕 지형 때문에 예상보다 택시 활용 가치가 큽니다.','해변 2곳을 하루에 모두 깊게 넣지 않는 편이 좋습니다.'], keep:['날씨가 바뀌면 해변 체감이 크게 달라집니다.','바람 강한 날은 실내 대안을 하나 두세요.','부모님 동행이면 계단 많은 포인트는 미리 체크하세요.'], finalTitle:'부산은 scenic + easy pace가 강합니다', finalDesc:'플래너에서는 coast mode와 family-friendly 템포를 잡으면 결과가 훨씬 좋아집니다.' },
        en:{ eyebrow:'Korea City Guide', lead:'Busan mixes sea views, market rhythm, hills, and flatter coastal stretches, so grouping matters a lot.', chips:['Sea views','Markets','Open pace','Sunset spots'], why:'Why it works', whyDesc:'Busan offers a more open tempo than Seoul, but the trip feels better when hills and transfer distances stay controlled.', bestFor:'Parents, scenic routes, sea-focused trips, easy weekends', pace:'2N3D is enough, especially when the route stays gentle.', season:'Spring and autumn are easiest, though winter sea views can still feel strong.', focusTitle:'Where to focus', focusDesc:'Instead of trying to cover the whole city, separate a few sea-facing zones with distinct character.', districts:[['Haeundae & Dalmaji','An easy first zone with familiar sea views, cafés, and broad appeal.'],['Nampo & Jagalchi','Useful for market energy and older Busan texture.'],['Gwangalli & Millak','Great for night sea views, sashimi, and a smoother walking rhythm.']], foodTitle:'Food and local rhythm', foodDesc:'Busan works best when meals alternate naturally with sea walks and lighter stops.', foodBullets:['One strong seafood meal is often enough to anchor the whole day.','Haeundae and Gwangalli look similar on paper but feel different in distance and night mood.','Market zones can be tiring, so avoid placing them too late in the day.'], budgetFeel:'Sea-view cafés and hotels can lift the budget, but the route structure itself need not be expensive.', sampleTitle:'Sample rhythm for Busan', sampleDesc:'The city works best when scenic value and movement ease stay balanced.', sampleDays:[['Day 1 · Sea-first entry','Start with a coastline district like Haeundae or Gwangalli.'],['Day 2 · Market and coast contrast','Balance one market-texture half with a different seaside rhythm later.'],['Day 3 · Scenic close','Use one easy café or walk to close the trip without strain.']], tips:['Gamcheon is photogenic, but energy cost matters a lot with parents.','Because of Busan’s terrain, taxis often add more value than expected.','Avoid trying to do two beach zones deeply in one day.'], keep:['Weather changes affect the coastline experience quickly.','Keep one indoor fallback for windy days.','With parents, check for stairs-heavy points in advance.'], finalTitle:'Busan is strongest in scenic, easy pacing', finalDesc:'In Planner, coast mode and family-friendly rhythm usually improve the output a lot.' }
      },
      jeju: {
        country:'Korea', image:'assets/images/cities/jeju.jpg', planner:'Jeju', example:'jeju.html',
        ko:{ eyebrow:'Korea Island Guide', lead:'제주는 많이 보기보다 풍경과 날씨, 이동 여유를 중심으로 짜야 제대로 좋습니다.', chips:['Scenic roads','Cafés','Nature','Slow resets'], why:'Why it works', whyDesc:'제주는 관광지 개수보다 이동 스트레스와 날씨 대응력이 여행 만족도를 좌우합니다.', bestFor:'커플, 가족, 풍경 위주, 쉬는 여행', pace:'3박 4일 정도면 동서남북을 무리 없이 나눠볼 수 있습니다.', season:'봄/초여름/가을이 가장 좋고, 바람과 비 변수는 항상 생각해야 합니다.', focusTitle:'Where to focus', focusDesc:'하루에 한 축만 잡고, 카페나 해안 산책으로 연결하는 편이 좋습니다.', districts:[['Aewol & Northwest','카페, 해안 드라이브, 첫날 적응에 잘 맞습니다.'],['Seogwipo & South coast','폭포, 바다, 조금 더 관광 밀도가 있는 구역입니다.'],['Seongsan & East','일출, 바다 풍경, 상대적으로 멀지만 장면이 강한 축입니다.']], foodTitle:'Food and local rhythm', foodDesc:'제주는 장거리 이동 사이에 쉬는 지점을 잘 넣는 것이 중요합니다.', foodBullets:['카페 한 곳이 단순 휴식이 아니라 이동 템포를 살리는 역할을 합니다.','해산물과 흑돼지는 같은 날 모두 무겁게 넣지 않는 편이 좋습니다.','날씨가 좋으면 풍경 위주, 나쁘면 실내/카페 위주로 유연하게 바꾸세요.'], budgetFeel:'렌터카와 숙소 위치에 따라 체감 예산 차이가 큽니다.', sampleTitle:'Sample rhythm for Jeju', sampleDesc:'제주는 욕심보다 방향 분리가 중요합니다.', sampleDays:[['Day 1 · West entry','애월 쪽으로 들어가며 카페와 해안 풍경 위주로 적응합니다.'],['Day 2 · South scenic core','서귀포권 풍경과 식사를 느슨하게 엮습니다.'],['Day 3 · East or rest','성산 쪽 강한 장면을 보거나, 완전히 쉬는 날로 둡니다.'],['Day 4 · Soft departure','공항 동선 기준으로 무리 없이 마무리합니다.']], tips:['제주는 같은 30분 이동도 체감 피로 차이가 큽니다.','비 오는 날엔 오름/야외 비중을 과감히 줄이는 편이 좋습니다.','렌터카 회수 시간을 마지막 날 넉넉히 잡으세요.'], keep:['바람 강한 날엔 체감이 크게 달라집니다.','동선보다 숙소 위치가 전체 만족도를 좌우할 수 있습니다.','맛집 웨이팅보다 풍경 좋은 시간대를 우선하세요.'], finalTitle:'제주는 scenery + slow pace가 핵심입니다', finalDesc:'플래너에서는 scenic, easy pace, family/couple 조합이 특히 잘 맞습니다.' },
        en:{ eyebrow:'Korea Island Guide', lead:'Jeju works best when the trip centers on scenery, weather, and movement ease rather than raw stop count.', chips:['Scenic roads','Cafés','Nature','Slow resets'], why:'Why it works', whyDesc:'In Jeju, transfer stress and weather flexibility shape satisfaction more than how many sights you hit.', bestFor:'Couples, families, scenic routes, slower travel', pace:'Around 3N4D lets you separate directions without strain.', season:'Spring, early summer, and autumn feel best, but wind and rain always matter.', focusTitle:'Where to focus', focusDesc:'Choose one axis a day and connect it with cafés or coastline walking.', districts:[['Aewol & Northwest','Good for cafés, coastal drives, and easing into the island.'],['Seogwipo & South coast','Waterfalls, sea views, and slightly denser sightseeing.'],['Seongsan & East','Further out, but strong for sunrise and dramatic coast scenes.']], foodTitle:'Food and local rhythm', foodDesc:'Jeju improves when rest stops are built into the longer movements.', foodBullets:['One café stop often saves the route, not just your energy.','Avoid making both seafood and black pork feel heavy on the same day.','Shift hard toward indoor or café-led pacing when weather turns.'], budgetFeel:'Rental car choices and lodging location change the felt budget a lot.', sampleTitle:'Sample rhythm for Jeju', sampleDesc:'On Jeju, directional separation matters more than trying to do more.', sampleDays:[['Day 1 · West entry','Use Aewol and the northwest to settle into the island with cafés and coastline.'],['Day 2 · South scenic core','Link Seogwipo scenery and meals with a looser pace.'],['Day 3 · East or rest','Either take one stronger east-side scene or fully use the day as a reset.'],['Day 4 · Soft departure','Close the trip gently around airport-friendly movement.']], tips:['The same 30-minute drive can feel very different depending on Jeju traffic and weather.','On rainy days, reduce oreum and outdoor anchors quickly.','Leave generous time for rental-car return on the final day.'], keep:['Wind changes the island experience noticeably.','Lodging location can matter more than route density.','Prioritize good scenic timing over one more famous restaurant line.'], finalTitle:'Jeju is strongest with scenery and slower pacing', finalDesc:'In Planner, scenic, easy pace, and couple/family combinations usually fit the island well.' }
      },
      gyeongju: {
        country:'Korea', image:'assets/images/cities/gyeongju.jpg', planner:'Gyeongju', example:'gyeongju.html',
        ko:{ eyebrow:'Korea Heritage Guide', lead:'경주는 크게 자극적이지 않지만, 그래서 더 오래 남는 도시입니다. 느린 템포와 유적의 간격이 잘 맞습니다.', chips:['Heritage','Night walks','Hanok mood','Calm pace'], why:'Why it works', whyDesc:'경주는 급하게 보면 비슷해지지만, 천천히 보면 역사 질감과 여백이 훨씬 잘 느껴집니다.', bestFor:'부모님과, 역사/한옥 무드, 조용한 국내 여행', pace:'1박 2일도 가능하지만 2박 3일이면 훨씬 여유롭습니다.', season:'봄과 가을이 가장 좋고, 여름은 낮보다 저녁 산책이 좋습니다.', focusTitle:'Where to focus', focusDesc:'유적 밀도가 높은 중심부와 보문단지 쪽 템포를 나눠 생각하세요.', districts:[['Downtown tombs & observatory','경주의 역사적 장면을 가장 읽기 쉬운 중심 축입니다.'],['Hwangridan-gil','한옥 감성과 카페, 쉬는 시간을 섞기 좋습니다.'],['Bomun area','조금 더 넓고 여유 있는 리조트형 템포가 나옵니다.']], foodTitle:'Food and local rhythm', foodDesc:'경주는 크게 화려하지 않으므로 산책과 식사, 야간 조명이 분위기를 만듭니다.', foodBullets:['황리단길은 식사보다 분위기와 쉬는 타이밍이 중요합니다.','대릉원과 첨성대 주변은 해 질 무렵 산책이 특히 좋습니다.','하루가 길지 않아도 충분히 완성도 있게 느껴질 수 있습니다.'], budgetFeel:'경주는 일정 자체보다 숙소/한옥 선택에 따라 예산 체감이 바뀝니다.', sampleTitle:'Sample rhythm for Gyeongju', sampleDesc:'경주는 천천히 읽을수록 더 좋아집니다.', sampleDays:[['Day 1 · Heritage core','중심 유적지와 황리단길을 연결하며 도시 감을 잡습니다.'],['Day 2 · Soft extension','보문단지나 박물관처럼 조금 더 느린 축을 더합니다.'],['Day 3 · Quiet close','짧은 산책과 식사만 남기고 편하게 마무리합니다.']], tips:['차가 있으면 편하지만, 중심부만 볼 땐 도보/택시도 충분합니다.','한여름 낮 시간은 과하게 넣지 않는 편이 좋습니다.','밤 산책 시간이 생각보다 만족도를 많이 올립니다.'], keep:['한옥 숙소는 예약이 빨리 찹니다.','유적지 설명을 조금 읽고 가면 체감이 더 커집니다.','조용한 여행이 목적이면 주말 인파를 피하는 편이 좋습니다.'], finalTitle:'경주는 슬로우 헤리티지 무드가 핵심입니다', finalDesc:'플래너에서는 quiet, slow, parents-friendly 조합이 잘 맞습니다.' },
        en:{ eyebrow:'Korea Heritage Guide', lead:'Gyeongju is not loud, which is exactly why it lingers. Slow pace suits the heritage spacing well.', chips:['Heritage','Night walks','Hanok mood','Calm pace'], why:'Why it works', whyDesc:'If you rush Gyeongju, the sights blur together. Slow it down and the texture becomes much stronger.', bestFor:'Parents, heritage and hanok mood, quiet domestic trips', pace:'1N2D works, but 2N3D feels far more relaxed.', season:'Spring and autumn are best, while summer works better in the evening than at midday.', focusTitle:'Where to focus', focusDesc:'Think separately about the dense heritage core and the looser Bomun tempo.', districts:[['Downtown tombs & observatory','The clearest central axis for reading the city’s heritage texture.'],['Hwangridan-gil','Good for hanok mood, cafés, and easier rest windows.'],['Bomun area','A more resort-like, spacious pace.']], foodTitle:'Food and local rhythm', foodDesc:'Because the city is quieter, walks, meals, and evening lighting shape the mood strongly.', foodBullets:['Hwangridan-gil is more about atmosphere and timing than pure eating.','The tomb complex and Cheomseongdae area feel especially good near dusk.','The trip can feel complete even without very long days.'], budgetFeel:'The route itself need not be expensive; lodging tone changes the felt budget more.', sampleTitle:'Sample rhythm for Gyeongju', sampleDesc:'The city improves the more slowly you read it.', sampleDays:[['Day 1 · Heritage core','Link the central heritage zone with Hwangridan-gil to understand the city.'],['Day 2 · Soft extension','Add one looser axis like Bomun or the museum.'],['Day 3 · Quiet close','Finish with just one short walk and meal.']], tips:['A car helps, but the central zone can still work with walking plus taxis.','Avoid overpacking midday in peak summer.','Night walks raise satisfaction more than many travelers expect.'], keep:['Hanok stays book up fast.','Reading a little history beforehand noticeably improves the trip.','If quiet travel is the goal, weekends are less ideal.'], finalTitle:'Gyeongju is about slow heritage mood', finalDesc:'In Planner, quiet, slow, and parents-friendly setups often fit best.' }
      }
    },
    example: {
      'tokyo-3n4d-first-trip': { titleKo:'Tokyo 3박 4일 첫 여행', titleEn:'Tokyo 3N4D First Trip', city:'Tokyo', image:'assets/images/examples/tokyo-first-trip.jpg', guide:'tokyo.html', koLead:'도쿄 초행이 피곤하지 않게 흘러가도록 짠 대표 샘플입니다.', enLead:'A first-time Tokyo sample that keeps the city bright and high-energy without letting the route blur into transfer fatigue.',
        ko:{ routeShape:'서쪽 밀도 → 동쪽 아이콘 → 느슨한 무드 데이', energyControl:'둘째 날까지만 강하게 두고, 셋째 날은 일부러 템포를 낮춥니다.', swapNote:'비가 오면 아사쿠사보다 긴자·도쿄역·미술관 포켓 쪽으로 바꾸는 편이 안정적입니다.', bestWith:'첫 일본 여행, 친구 2명, 쇼핑/카페 취향', whyBullets:['첫날은 도쿄를 이해하는 장면만 잡고, 깊은 이동은 미룹니다.','아이콘 day와 무드 day를 나눠서 과포화를 피합니다.','마지막 날은 쇼핑과 이동 버퍼를 남겨 실제 체감이 깔끔합니다.'] },
        en:{ routeShape:'West-side charge → east-side clarity → a looser design-led mood day', energyControl:'Let day two carry the most pressure, then deliberately give day three more breathing room so Tokyo still feels exciting on the way out.', swapNote:'If weather turns, Tokyo Station, Ginza, and museum pockets usually hold better than a hard Asakusa push.', bestWith:'First Japan trip, two friends, shopping and café bias', whyBullets:['Day one captures the city fast without forcing deep movement.','Icon day and mood day are separated so the trip does not overload itself.','The final day keeps room for transfers and short shopping, which makes the whole route feel cleaner.'] } },
      'osaka-2n3d-family': { titleKo:'Osaka 2박 3일 가족 여행', titleEn:'Osaka 2N3D Family Trip', city:'Osaka', image:'assets/images/examples/osaka-family.jpg', guide:'osaka.html', koLead:'먹고 쉬고 움직이는 간격을 무리 없이 묶은 오사카 샘플입니다.', enLead:'An Osaka sample built around easy spacing for eating, resting, and moving.',
        ko:{ routeShape:'난바 중심 → 먹거리 코어 → 마지막 한 끼', energyControl:'걷는 양보다 식사와 휴식 사이 간격을 부드럽게 두는 쪽이 중요합니다.', swapNote:'날씨가 나쁘면 우메다와 아케이드 비중을 높이고, 야외 장면은 저녁 짧게 남기는 편이 좋습니다.', bestWith:'가족, 부모님 동행, 짧은 2박 3일', whyBullets:['한 축을 깊게 보는 오사카 방식이 가족 여행에서 피로를 줄입니다.','식사 타이밍이 자연스럽게 route의 중심이 됩니다.','마지막 날 욕심을 줄여 이동과 마무리 식사가 더 좋아집니다.'] },
        en:{ routeShape:'Namba core → food-heavy center → one final meal', energyControl:'Spacing meals and rest windows matters more here than covering extra distance.', swapNote:'On weak-weather days, increase Umeda and arcade time, then keep open-air scenes short and late.', bestWith:'Families, parents, short 2N3D stays', whyBullets:['Osaka feels easier for families when one zone is read deeply instead of many zones lightly.','Meal timing becomes the natural route structure.','The final day stays lighter, which protects both movement and mood.'] } },
      'kyoto-2n3d-slow-trip': { titleKo:'Kyoto 2박 3일 슬로우 트립', titleEn:'Kyoto 2N3D Slow Trip', city:'Kyoto', image:'assets/images/examples/kyoto-slow.jpg', guide:'kyoto.html', koLead:'교토를 체크리스트보다 리듬으로 읽는 샘플입니다.', enLead:'A Kyoto sample built to preserve hush, spacing, and evening residue instead of turning the city into coverage.',
        ko:{ routeShape:'이른 산책 → 낮 휴식 → 해질 무렵 장면', energyControl:'오전은 살리고, 한낮은 비우고, 저녁 산책으로 하루를 닫습니다.', swapNote:'비 오는 날은 정원, 찻집, 실내 질감이 있는 한 구역만 오래 가져가도 충분합니다.', bestWith:'커플, 혼자, 부모님과 조용한 여행', whyBullets:['교토는 이른 시간대 장면이 하루 인상을 크게 바꿉니다.','중간 휴식이 있어야 후반부의 고요함이 살아납니다.','많이 보기보다 한 구역의 결을 오래 남기는 쪽이 도시와 더 잘 맞습니다.'] },
        en:{ routeShape:'Early quiet → midday retreat → dusk residue', energyControl:'Protect the morning light, leave the middle of the day softer than feels necessary, then let dusk do the final work.', swapNote:'On rainy days, one garden-tea-room axis with indoor texture is often enough.', bestWith:'Couples, solo travelers, parents on a quieter trip', whyBullets:['Kyoto is often decided by the quality of its early hours.','A true rest window is what lets the second half of the day stay calm.','The city lands better when one area leaves a deeper trace instead of many places leaving a thin one.'] } },
      'seoul-2n3d-city-vibes': { titleKo:'Seoul 2박 3일 시티 바이브', titleEn:'Seoul 2N3D City Vibes', city:'Seoul', image:'assets/images/examples/seoul-city-vibes.jpg', guide:'seoul.html', koLead:'동네 대비와 밤 리듬을 살리는 서울형 샘플입니다.', enLead:'A Seoul sample shaped around neighborhood contrast, a cleaner café handoff, and a night rhythm that arrives late instead of too early.',
        ko:{ routeShape:'서촌/북촌 결 → 성수/한강 대비 → 밤 리듬', energyControl:'낮에는 동네 하나만 깊게, 밤에는 장면 하나만 강하게 두는 편이 좋습니다.', swapNote:'비가 오면 성수, 여의도, 더현대 같은 실내축으로 전환해도 서울 무드는 유지됩니다.', bestWith:'친구, 커플, 카페/동네 취향', whyBullets:['서울은 landmark보다 동네 조합이 route의 완성도를 좌우합니다.','낮/밤 대비가 살아야 도시가 더 입체적으로 남습니다.','한날에 너무 많은 생활권을 섞지 않아서 리듬이 깨지지 않습니다.'] },
        en:{ routeShape:'Historic west-side tone → Seongsu contrast → late-night handoff', energyControl:'Let one neighborhood own the day, then let one sharper evening scene own the close so the route feels edited rather than crowded.', swapNote:'Rain can pivot the route into Seongsu, Yeouido, and indoor retail axes without killing the Seoul mood.', bestWith:'Friends, couples, café and neighborhood-minded trips', whyBullets:['Seoul is completed by district pairing more than by landmark count.','The city becomes more dimensional when day and night have different textures.','The route avoids mixing too many daily-life zones into one overloaded schedule.'] } },
      'busan-2n3d-with-parents': { titleKo:'Busan 2박 3일 부모님과', titleEn:'Busan 2N3D With Parents', city:'Busan', image:'assets/images/examples/busan-parents.jpg', guide:'busan.html', koLead:'무리 없이 scenic하게 흐르는 부산 가족 샘플입니다.', enLead:'A Busan sample for mixed-age travel that keeps the coast cinematic without making the route feel uphill or overcommitted.',
        ko:{ routeShape:'바다 view → 쉬는 점심 → 부드러운 야경', energyControl:'시장과 전망을 같은 날 많이 쌓지 않고, 앉아서 보는 시간 비중을 높입니다.', swapNote:'흐린 날은 실내 전망, 카페, 시장 축을 섞어서 야외 비중을 줄이는 편이 좋습니다.', bestWith:'부모님, 커플, 풍경 우선 여행', whyBullets:['부산은 많이 이동하는 것보다 좋은 시간대에 좋은 장면을 잡는 쪽이 중요합니다.','경사와 이동 피로를 의식해서 중간 휴식을 넣습니다.','야경도 짧고 선명하게 보는 편이 전체 만족도를 올립니다.'] },
        en:{ routeShape:'Sea-view anchor → slower lunch → shorter night finish', energyControl:'Do not stack market texture and viewpoints too aggressively on the same day. Busan gets better when seated scenery has real time to land.', swapNote:'On gray days, mix indoor views, cafés, and market texture so the route stays balanced.', bestWith:'Parents, couples, scenery-first travel', whyBullets:['Busan is shaped more by good scenic timing than by aggressive movement.','Slope and transfer fatigue are softened by true rest windows.','Shorter, sharper night scenes often work better than extending the day too far.'] } },
      'fukuoka-2n3d-food-trip': { titleKo:'Fukuoka 2박 3일 푸드 트립', titleEn:'Fukuoka 2N3D Food Trip', city:'Fukuoka', image:'assets/images/examples/fukuoka-food.jpg', guide:'fukuoka.html', koLead:'짧은 기간에 후쿠오카다운 음식 리듬을 잡는 샘플입니다.', enLead:'A compact Fukuoka sample built around meal spacing, short walks, and a weekend rhythm that still feels editorial instead of rushed.',
        ko:{ routeShape:'텐진 settle → 하카타/나카스 식사축 → 마지막 취향 한 끼', energyControl:'명소보다 meal spacing을 먼저 잡고, 그 사이 산책과 쇼핑을 채워 넣습니다.', swapNote:'비 오면 하카타역 주변, 지하상가, 텐진 실내축으로 옮겨도 route가 거의 안 무너집니다.', bestWith:'짧은 일본 여행, 친구, 커플, food-first', whyBullets:['후쿠오카는 식사 timing이 도시 route를 거의 대신합니다.','짧은 일정에도 만족도가 쉽게 나와 과한 욕심이 필요 없습니다.','강한 한 끼와 가벼운 산책을 번갈아 두면 도시가 더 자연스럽게 남습니다.'] },
        en:{ routeShape:'Settle in Tenjin → Hakata/Nakasu meal axis → one final preference meal', energyControl:'Build the meal spacing first, then let coffee, river air, and light shopping settle into the gaps without stealing the appetite curve.', swapNote:'Rain usually hurts less here because Hakata Station, underground malls, and Tenjin indoor routes absorb it well.', bestWith:'Short Japan trips, friends, couples, food-first plans', whyBullets:['In Fukuoka, meal timing almost becomes the route itself.','The city pays off quickly, so the trip does not need overreaching to feel full.','Alternating one stronger meal with a lighter walk keeps the city feeling natural.'] } }
    }
  };

  cityLoopMap.sapporo = { name:'Sapporo', country:'Japan', guide:'city/sapporo.html', example:'example/sapporo-3n4d-snow-soft.html', image:'assets/images/cities/sapporo.jpg', vibe:'seasonal calm' };
  cityLoopMap.sendai = { name:'Sendai', country:'Japan', guide:'city/sendai.html', example:'example/sendai-2n3d-city-rest.html', image:'assets/images/cities/sendai.jpg', vibe:'quiet city' };
  cityLoopMap.okinawa = { name:'Okinawa', country:'Japan', guide:'city/okinawa.html', example:'example/okinawa-3n4d-island-breeze.html', image:'assets/images/cities/okinawa.jpg', vibe:'island ease' };

  loopPairs.sapporo = ['sendai','tokyo','okinawa'];
  loopPairs.sendai = ['tokyo','sapporo','fukuoka'];
  loopPairs.okinawa = ['fukuoka','jeju','sapporo'];
  loopPairs.tokyo = ['kyoto','sapporo','sendai'];
  loopPairs.fukuoka = ['osaka','okinawa','busan'];

  cityVoiceMap.sapporo = {
    ko: { strap:'눈빛과 공기감이 첫 장면을 만드는 북쪽 도시.', reward:'하얀 공기와 따뜻한 식사 장면을 길게 남기기 좋음', watch:'전망·식사·이동을 한날에 과하게 겹치지 않기', mood:'snow-lit / calm / warm-night' },
    en: { strap:'A northern city where light, snow, and air shape the first scene.', reward:'Snow light and one warm meal scene linger best with more room', watch:'Do not stack viewpoints, meals, and long moves into the same day', mood:'snow-lit / calm / warm-night' }
  };
  cityVoiceMap.sendai = {
    ko: { strap:'나무길과 로컬 포켓이 천천히 남는 조용한 도시 베이스.', reward:'녹음길과 시장 포켓이 하루 리듬을 부드럽게 잡아줌', watch:'도심 산책 리듬을 근교 이동으로 끊지 않기', mood:'green / local / slow-urban' },
    en: { strap:'A quiet city base shaped by tree-lined streets and local pockets.', reward:'Green avenues and market pockets hold the day together softly', watch:'Do not break the urban walking rhythm with a deep side trip', mood:'green / local / slow-urban' }
  };
  cityVoiceMap.okinawa = {
    ko: { strap:'섬에서는 바다 색보다 바람과 쉬는 시간이 먼저 남습니다.', reward:'해변·카페·드라이브가 느슨하게 이어질 때 가장 좋음', watch:'한낮 이동과 해변 개수를 욕심내지 않기', mood:'sea-breeze / sun-soft / easy' },
    en: { strap:'On the island, sea breeze and rest stay longer than stop count.', reward:'Beaches, cafés, and drives work best when the route stays loose', watch:'Do not overpack midday moves or beach count', mood:'sea-breeze / sun-soft / easy' }
  };

  citySectionMap.sapporo = {
    ko: { moduleEyebrow:'Sapporo edit', moduleTitle:'삿포로는 계절과 넓은 축을 같이 읽어야 좋습니다', moduleDesc:'짧은 체크리스트보다, 계절 장면과 쉬는 타이밍을 같이 묶는 쪽이 훨씬 잘 맞습니다.', modules:[{type:'timing', title:'Best windows', items:[]},{type:'pair', title:'Good pairings', items:[['오도리 → 스스키노','도심 무드가 자연스럽게 이어짐'],['카페 → 전망 포인트','차가운 계절에도 리듬이 부드러움'],['시장 점심 → 저녁 산책','짧아도 만족감이 높음']]}] },
    en: { moduleEyebrow:'Sapporo edit', moduleTitle:'Sapporo works better when season and spacing are read together', moduleDesc:'Instead of checklist pacing, this city usually lands better with wider blocks and stronger rest timing.', modules:[{type:'timing', title:'Best windows', items:[['Early afternoon','Odori and Susukino first-scene entry'],['Toward dusk','Viewpoints and dinner transition'],['Later at night','A shorter bar or meal close']]},{type:'pair', title:'Good pairings', items:[['Odori → Susukino','The city core flows naturally'],['Café → viewpoint','The colder season still feels soft'],['Market lunch → evening walk','Short, but high payoff']]}] }
  };
  citySectionMap.sendai = {
    ko: { moduleEyebrow:'Sendai edit', moduleTitle:'센다이는 과하지 않은 도심 리듬이 장점입니다', moduleDesc:'화려한 체크포인트보다, 걷기 편한 구간과 식사 타이밍을 정리하는 편이 좋습니다.', modules:[{type:'timing', title:'Quiet windows', items:[['오전','역 주변과 중심 거리 적응'],['오후','카페/쇼핑/강변으로 느리게'],['저녁','한 구역만 가볍게 깊게']]},{type:'pair', title:'Good pairings', items:[['중심가 → 조젠지 거리','도시 템포가 자연스럽게 풀림'],['시장 점심 → 카페 포켓','짧은 여행에도 안정적'],['도심 하루 + 근교 하루','2박 3일에 특히 좋음']]}] },
    en: { moduleEyebrow:'Sendai edit', moduleTitle:'Sendai pays off through low-friction city rhythm', moduleDesc:'Instead of headline stops, it feels better when walking ease, meals, and one calm district are edited well.', modules:[{type:'timing', title:'Quiet windows', items:[['Morning','Station-side and central street entry'],['Afternoon','Cafés, shopping, and riverside drift'],['Night','Go a little deeper in one district only']]},{type:'pair', title:'Good pairings', items:[['Center → Jozenji area','The city tempo opens naturally'],['Market lunch → café pocket','A stable short-trip structure'],['One city day + one side-trip day','Especially useful for 2N3D']]}] }
  };
  citySectionMap.okinawa = {
    ko: { moduleEyebrow:'Okinawa edit', moduleTitle:'오키나와는 바다보다 이동 여유를 먼저 남겨야 합니다', moduleDesc:'같은 해변이라도 시간대와 체력 여유에 따라 만족도가 크게 달라집니다.', modules:[{type:'timing', title:'Best windows', items:[['아침','짧은 드라이브 + 바다 첫 장면'],['오후 늦게','카페/실내 포켓으로 더위 조절'],['해질 무렵','하루의 대표 해변 장면']]},{type:'watch', title:'Keep it light', items:[['해변 여러 개 깊게','풍경이 겹치기 쉬움'],['더운 낮 장시간 이동','체감 피로가 큼'],['공항 날 무리한 남북 이동','마지막 날 밀도가 무너짐']]}] },
    en: { moduleEyebrow:'Okinawa edit', moduleTitle:'In Okinawa, keep room for movement before adding more coast', moduleDesc:'Even beautiful beaches lose power when heat, distance, and energy are not edited properly.', modules:[{type:'timing', title:'Best windows', items:[['Morning','Short drive plus a first sea scene'],['Late afternoon','Use cafés or indoor pockets against heat'],['Dusk','Save one lead beach scene for the close']]},{type:'watch', title:'Keep it light', items:[['Too many deep beach stops','The scenery starts to overlap'],['Long hot daytime moves','Fatigue jumps quickly'],['Heavy airport-day north/south shifts','The final day gets unstable']]}] }
  };


  citySectionMap.taipei = {
    ko: { moduleEyebrow:'Taipei edit', moduleTitle:'타이베이는 먹는 템포와 밤의 공기를 같이 읽을 때 도시의 결이 더 또렷해집니다', moduleDesc:'큰 랜드마크보다 먹는 간격, 골목, 늦은 시간의 템포를 어떻게 묶느냐가 더 중요합니다.', modules:[{type:'timing', title:'Best windows', items:[['오후 늦게','카페와 골목, 첫 야시장 전 리셋'],['저녁','야시장 또는 식사 축 한 곳을 깊게'],['늦은 밤','강한 이동보다 늦은 카페나 산책으로 마감']]},{type:'pair', title:'Good pairings', items:[['동네 산책 → 야시장','먹는 흐름이 자연스럽게 이어짐'],['카페 → 전망/야경','밤 템포가 더 선명해짐'],['한 구역 집중 + 다음 날 다른 결','과밀하지 않고 만족도 높음']]}] },
    en: { moduleEyebrow:'Taipei edit', moduleTitle:'Taipei feels most itself when food rhythm and night air are read together', moduleDesc:'More than headline landmarks, the city improves when meals, alleys, and after-dark pacing are edited well.', modules:[{type:'timing', title:'Best windows', items:[['Late afternoon','Cafés, alleys, and one reset before the night market'],['Evening','Go deeper on one market or one dinner axis'],['Later at night','Close with a softer café or walk, not another long transfer']]},{type:'pair', title:'Good pairings', items:[['Neighborhood walk → night market','The food rhythm opens naturally'],['Café → night view','The city feels sharper after dark'],['One focused zone a day','Higher payoff than stacking too much']]}] }
  };
  citySectionMap.hongkong = {
    ko: { moduleEyebrow:'Hong Kong edit', moduleTitle:'홍콩은 높은 밀도 속에서도 축을 짧게 잡는 편이 좋습니다', moduleDesc:'전망, 페리, 골목 식사 중 하루에 두 개만 강하게 두면 훨씬 선명합니다.', modules:[{type:'timing', title:'Best windows', items:[['아침','항구/도심 첫 장면'],['오후 늦게','카페나 쇼핑 아케이드로 체력 정리'],['밤','야경과 식사 축 하나만 깊게']]},{type:'watch', title:'Keep it light', items:[['섬/반도 과도한 왕복','짧은 일정엔 피로가 큼'],['언덕 구역 다중 중첩','체감 피로가 빨라짐'],['전망 포인트 과다','비슷한 장면이 겹치기 쉬움']]}] },
    en: { moduleEyebrow:'Hong Kong edit', moduleTitle:'Hong Kong usually improves when the route axis stays short', moduleDesc:'Two strong moments a day — a harbor scene, one ferry move, one food block — usually land better than trying to cover everything.', modules:[{type:'timing', title:'Best windows', items:[['Morning','Harbor and core-city first scenes'],['Late afternoon','Use cafés or arcades to reset energy'],['Night','Go deep on one skyline or dinner axis only']]},{type:'watch', title:'Keep it light', items:[['Too many island/peninsula shifts','Short trips tire out fast'],['Stacking many hill districts','Felt fatigue rises quickly'],['Too many viewpoints','The scenes start to overlap']]}] }
  };
  citySectionMap.macau = {
    ko: { moduleEyebrow:'Macau edit', moduleTitle:'마카오는 짧은 축으로 heritage와 night를 같이 읽는 편이 좋습니다', moduleDesc:'오래 끌기보다 중심 보행축과 저녁 장면을 잘 연결하면 훨씬 깔끔합니다.', modules:[{type:'timing', title:'Best windows', items:[['오전','유산 구역 산책'],['오후','카페/실내 포켓으로 템포 조절'],['저녁','야경 또는 엔터테인먼트 축 한 곳만']]},{type:'pair', title:'Good pairings', items:[['세나도 → 근처 골목 식사','짧아도 도시 캐릭터가 남음'],['유산 산책 → 야간 장면','낮/밤 대비가 좋음'],['반나절 + 반나절 구조','2박 3일에 특히 안정적']]}] },
    en: { moduleEyebrow:'Macau edit', moduleTitle:'Macau lands better when heritage and night are kept on short axes', moduleDesc:'Rather than stretching the route too far, connect one central walking core with one clear evening scene.', modules:[{type:'timing', title:'Best windows', items:[['Morning','Heritage streets and first walkable core'],['Afternoon','Use cafés or indoor pockets to slow the tempo'],['Night','Choose one skyline or entertainment close']]},{type:'pair', title:'Good pairings', items:[['Senado area → alley dinner','Compact but high-payoff'],['Heritage walk → night scene','The day-to-night contrast works well'],['Half-day + half-day shape','Especially stable for 2N3D edits']]}] }
  };

  cityOpsMap.sapporo = {
    ko:{ routeLogic:'넓은 도심 블록을 짧게 여러 개 넣기보다, 오도리·스스키노 같은 축을 천천히 읽는 편이 훨씬 좋습니다.', bestWith:'겨울/초봄 무드, 커플, 음식과 도시 산책 중심', avoidWhen:'하루에 근교와 도심을 동시에 욕심낼 때', weatherSwap:'눈·비가 강하면 실내 포켓과 전망 포인트를 중심으로 축을 짧게 유지하세요.' },
    en:{ routeLogic:'Sapporo feels better when one wider core gets more time instead of forcing too many small blocks into one day.', bestWith:'Winter or early-spring mood, couples, food plus urban walks', avoidWhen:'Trying to go deep on downtown and side trips in the same day', weatherSwap:'When snow or rain picks up, shorten the axis and lean on indoor pockets plus one view point.' }
  };
  cityOpsMap.sendai = {
    ko:{ routeLogic:'센다이는 조용한 도심 리듬과 한 끼, 한 카페, 한 산책 축이 잘 맞는 도시입니다.', bestWith:'솔로, 조용한 주말, 너무 빡빡하지 않은 일본 도시 여행', avoidWhen:'도심과 마쓰시마 같은 근교를 한날에 다 깊게 넣을 때', weatherSwap:'날씨가 흐리면 강변 산책보다 실내 카페와 아케이드 구간을 더 길게 두세요.' },
    en:{ routeLogic:'Sendai usually lands through one meal, one café, and one walkable axis rather than a crowded city checklist.', bestWith:'Solo trips, calmer weekends, lighter urban Japan edits', avoidWhen:'Trying to go deep on downtown and Matsushima on the same day', weatherSwap:'If the weather turns gray, let indoor cafés and covered streets take more of the route.' }
  };
  cityOpsMap.okinawa = {
    ko:{ routeLogic:'오키나와는 해변 개수보다, 어느 시간대에 어떤 바다를 두느냐가 여행의 질을 바꿉니다.', bestWith:'커플, 가족, 쉬는 여행, 풍경 중심', avoidWhen:'더운 낮에 체크리스트처럼 여러 포인트를 찍으려 할 때', weatherSwap:'비나 강풍이 오면 해변 시간을 줄이고 실내·카페·리조트 포켓을 더 많이 두세요.' },
    en:{ routeLogic:'In Okinawa, the quality of the trip depends more on when you place the coast than on how many beaches you count.', bestWith:'Couples, families, slower scenic trips', avoidWhen:'Trying to treat the coast like a midday checklist', weatherSwap:'With rain or stronger wind, shorten beach time and expand cafés, indoor stops, or resort pockets.' }
  };


  cityOpsMap.taipei = {
    ko:{ routeLogic:'타이베이는 낮 랜드마크보다 밤의 먹는 리듬과 동네 축이 여행 만족도를 더 크게 만듭니다.', bestWith:'커플, 친구, food-led weekend, 늦은 카페 무드', avoidWhen:'야시장과 유명 구역을 하루에 너무 많이 겹치려 할 때', weatherSwap:'비가 오면 전망보다 실내 카페, 쇼핑, 식사 축을 더 길게 쓰는 편이 좋습니다.' },
    en:{ routeLogic:'In Taipei, food rhythm and neighborhood pacing often matter more than stacking daytime landmarks.', bestWith:'Couples, friends, food-led weekends, later café mood', avoidWhen:'Trying to overlap too many markets and headline districts in one day', weatherSwap:'On rainy days, let indoor cafés, shops, and meal pockets take more of the route.' }
  };
  cityOpsMap.hongkong = {
    ko:{ routeLogic:'홍콩은 강한 장면이 많은 도시라, 적게 잘 보는 편이 만족도가 더 높습니다.', bestWith:'친구, 커플, 짧은 도시 여행, harbor/night mood', avoidWhen:'짧은 일정에 섬과 반도를 과하게 넓게 훑으려 할 때', weatherSwap:'날씨가 흐리면 전망 포인트 수를 줄이고 실내 식사·카페 축을 더 안정적으로 두세요.' },
    en:{ routeLogic:'Hong Kong has enough strong scenes that the trip usually improves when you do fewer of them well.', bestWith:'Friends, couples, short city trips, harbor/night mood', avoidWhen:'Trying to scan too much of both island and peninsula on a short trip', weatherSwap:'If weather turns gray, cut viewpoint count and lean more on indoor food and café anchors.' }
  };
  cityOpsMap.macau = {
    ko:{ routeLogic:'마카오는 짧은 체류에 잘 맞는 도시라, 중심 보행축과 저녁 장면만 잘 잡아도 충분합니다.', bestWith:'커플, 부모님, 짧은 2박 3일, heritage + night', avoidWhen:'한 번에 너무 많은 구역과 쇼를 겹치려 할 때', weatherSwap:'비가 오면 유산 산책 비중을 줄이고 실내 포켓과 저녁 장면을 더 좋게 묶는 편이 낫습니다.' },
    en:{ routeLogic:'Macau suits shorter stays, and one clear walkable core plus one evening scene is often enough.', bestWith:'Couples, parents, shorter 2N3D trips, heritage + night', avoidWhen:'Trying to stack too many zones and shows into the same day', weatherSwap:'In rain, reduce heritage walking and let indoor pockets plus one evening scene carry more of the route.' }
  };

  editorialData.city.sapporo = { country:'Japan', image:'assets/images/cities/sapporo.jpg', planner:'Sapporo', example:'sapporo-3n4d-snow-soft.html',
    ko:{ eyebrow:'Japan North Guide', lead:'삿포로는 체크리스트보다 눈빛, 차가운 공기, 그리고 따뜻한 식사를 언제 넣느냐가 도시의 인상을 더 크게 바꿉니다.', chips:['Snow light','Food warmth','Wide blocks','Evening glow'], why:'Why it works', whyDesc:'삿포로는 눈과 공기를 느낄 여백을 남겼을 때 도시의 매력이 더 선명하게 살아납니다.', bestFor:'겨울·초봄 도시 여행, 커플, 음식과 산책 중심', pace:'2박 3일도 좋지만 3박 4일이면 계절 장면을 더 여유 있게 남길 수 있습니다.', season:'겨울과 초봄이 특히 강하고, 여름도 공기가 시원한 편입니다.', focusTitle:'Where to focus', focusDesc:'오도리와 스스키노를 중심으로, 전망 포인트 하나와 조용한 포켓 하나만 더하는 편이 좋습니다.', districts:[['Odori & central core','도시 구조와 계절 공기를 가장 쉽게 읽는 중심 축입니다.'],['Susukino','저녁 식사와 늦은 시간 리듬이 강한 구역입니다.'],['Maruyama / quieter pockets','카페와 조금 느린 산책으로 도시 톤을 부드럽게 바꿔줍니다.']], foodTitle:'Food and local rhythm', foodDesc:'삿포로는 따뜻한 식사, 짧은 이동, 그리고 추위를 피하는 실내 포켓이 함께 갈 때 훨씬 좋습니다.', foodBullets:['한 끼는 확실하게 따뜻한 음식으로 잡는 편이 만족도가 높습니다.','눈이나 비가 있는 날엔 실내 이동이 쉬운 축이 여행을 살립니다.','야경이나 저녁 산책은 길게보다 짧고 선명하게 넣는 편이 좋습니다.'], budgetFeel:'겨울 숙소와 식사에 따라 예산 체감 차이가 있지만, 루트 구조는 크게 복잡하지 않습니다.', sampleTitle:'Sample rhythm for Sapporo', sampleDesc:'삿포로는 계절감을 과하게 소비하지 않고 남기는 편이 더 좋습니다.', sampleDays:[['Day 1 · Central entry','오도리와 중심 구역으로 도시 첫 장면을 잡습니다.'],['Day 2 · Food + winter-soft rhythm','식사와 카페, 저녁 무드를 중심으로 하루를 엮습니다.'],['Day 3 · Quiet pocket or view close','조용한 포켓 하나나 전망 장면으로 마무리합니다.']], tips:['겨울엔 이동 시간보다 체감 날씨를 더 중요하게 봐야 합니다.','눈 오는 날엔 한 구역을 깊게 보는 편이 훨씬 좋습니다.','저녁은 과하게 늦지 않게 마무리하는 편이 전체 리듬이 좋아집니다.'], keep:['방한 준비가 루트 만족도를 직접 바꿉니다.','역·지하 공간 연결이 좋은 숙소가 체력 소모를 줄입니다.','근교를 넣으면 도심 무드를 하루 덜 쓰게 된다는 점을 기억하세요.'], finalTitle:'삿포로는 seasonal calm이 핵심입니다', finalDesc:'플래너에서는 winter-soft, food warmth, slower evening 조합이 특히 잘 맞습니다.' },
    en:{ eyebrow:'Japan North Guide', lead:'Sapporo is shaped less by stop count than by snow light, cold air, and when you let one warm meal anchor the day.', chips:['Snow light','Food warmth','Wide blocks','Evening glow'], why:'Why it works', whyDesc:'The city becomes much more compelling when you slow down inside wider zones instead of forcing a dense checklist.', bestFor:'Winter or early-spring city trips, couples, food-and-walk routes', pace:'2N3D works, but 3N4D gives the city more room to hold its seasonal mood.', season:'Winter and early spring feel strongest, though summer can also feel pleasantly crisp.', focusTitle:'Where to focus', focusDesc:'Use Odori and Susukino as the core, then add only one or two softer axes.', districts:[['Odori & central core','The clearest axis for understanding the city structure and seasonal air.'],['Susukino','Strong for dinner rhythm and later-night city mood.'],['Maruyama / quieter pockets','Useful for cafés and a softer walking tone.']], foodTitle:'Food and local rhythm', foodDesc:'Sapporo works well when meals, short movement, and warm indoor pockets support each other.', foodBullets:['One clearly warm meal often anchors the day better than many smaller stops.','On snow or rain days, an axis with easier indoor movement protects the trip.','Night views and evening walks work better when they stay short and clear.'], budgetFeel:'Winter stays and food choices can change the felt budget, but the route logic itself stays manageable.', sampleTitle:'Sample rhythm for Sapporo', sampleDesc:'The city often feels stronger when seasonal mood is left with space instead of overused.', sampleDays:[['Day 1 · Central entry','Use Odori and the city core to catch the first scene.'],['Day 2 · Food + winter-soft rhythm','Build the day around meals, cafés, and evening atmosphere.'],['Day 3 · Quiet pocket or view close','Close with one calmer pocket or a final viewpoint.']], tips:['In winter, felt weather matters more than map distance.','On snow days, going deeper on one district usually works better.','Try not to push dinner too late; the route lands cleaner that way.'], keep:['Cold-weather prep directly changes route quality.','Hotels with good station or underground access reduce fatigue.','Adding side trips means giving downtown mood less time.'], finalTitle:'Sapporo is strongest in seasonal calm', finalDesc:'In Planner, winter-soft, food warmth, and slower evening combinations usually fit best.' }
  };
  editorialData.city.sendai = { country:'Japan', image:'assets/images/cities/sendai.jpg', planner:'Sendai', example:'sendai-2n3d-city-rest.html',
    ko:{ eyebrow:'Japan Quiet City Guide', lead:'센다이는 큰 이벤트보다 녹음길, 시장 포켓, 그리고 조용한 식사 리듬이 천천히 남는 도시입니다.', chips:['Green avenues','Quiet city','Food pockets','Easy tempo'], why:'Why it works', whyDesc:'센다이는 느린 도심 산책과 로컬 포켓을 길게 남길수록 도시의 결이 더 좋아집니다.', bestFor:'솔로, 조용한 주말, 덜 과한 일본 도시 여행', pace:'2박 3일이면 도심과 한 축의 바깥 포인트를 같이 보기 좋습니다.', season:'봄과 가을이 특히 편안하고, 초여름도 도시 산책에 잘 맞습니다.', focusTitle:'Where to focus', focusDesc:'역 주변 중심축과 조젠지 거리, 그리고 시장/카페 포켓 하나면 도시 리듬이 충분히 살아납니다.', districts:[['Station & central streets','도착 첫날 적응과 기본 동선 이해에 좋습니다.'],['Jozenji / greener axis','센다이의 느린 도시 무드를 읽기 좋은 축입니다.'],['Market + café pockets','짧은 여행에도 만족도가 높은 식사·휴식 구간입니다.']], foodTitle:'Food and local rhythm', foodDesc:'센다이는 식사와 녹음길 산책, 카페 휴식을 느슨하게 이어갈 때 가장 좋습니다.', foodBullets:['너무 많은 스폿보다 한 끼와 한 카페가 더 오래 남습니다.','도심만으로도 충분한 도시라 근교를 무리하게 넣지 않는 편이 좋습니다.','밤에는 한 구역만 남겨도 도시 기분이 충분히 살아납니다.'], budgetFeel:'숙소와 식사에 따라 차이는 있지만, 전체적으로 무리한 예산 구조는 아닙니다.', sampleTitle:'Sample rhythm for Sendai', sampleDesc:'센다이는 덜 바쁠수록 더 선명해집니다.', sampleDays:[['Day 1 · Easy center entry','역권과 중심가로 도시 기본 리듬을 읽습니다.'],['Day 2 · Green street + meal pockets','도심 산책과 식사, 카페를 느슨하게 연결합니다.'],['Day 3 · Soft close or small side note','짧은 산책 또는 작은 외곽 포켓으로 마무리합니다.']], tips:['센다이는 짧은 이동이 많아 보여도 하루 끝 체감 피로가 적은 편입니다.','근교를 넣을 땐 도심 하루를 따로 남기는 편이 좋습니다.','시장과 카페 포켓을 한 축으로 묶으면 여행 질감이 살아납니다.'], keep:['도심 호텔만으로도 충분히 만족도가 높습니다.','과한 쇼핑 위주보다 식사와 거리 산책이 더 잘 맞습니다.','비 오는 날엔 아케이드·카페 축을 더 길게 쓰세요.'], finalTitle:'센다이는 quiet city rhythm이 핵심입니다', finalDesc:'플래너에서는 solo, soft city, lighter pace 조합이 특히 잘 맞습니다.' },
    en:{ eyebrow:'Japan Quiet City Guide', lead:'Sendai is less about big icons than about quiet city texture, meals, and a walk-first rhythm that lingers.', chips:['Green avenues','Quiet city','Food pockets','Easy tempo'], why:'Why it works', whyDesc:'The city’s own tempo is comfortable, so it usually improves when you resist adding too much.', bestFor:'Solo trips, calm weekends, a lighter Japanese city break', pace:'2N3D is enough to hold the downtown and one softer outside note.', season:'Spring and autumn feel especially easy, with early summer also working well for walks.', focusTitle:'Where to focus', focusDesc:'The station-side core, the Jozenji axis, and one calmer pocket are often enough.', districts:[['Station & central streets','Useful for arrival-day orientation and understanding the core movement.'],['Jozenji / greener axis','A stronger way to read the city’s slower mood.'],['Market + café pockets','High-payoff food and rest zones for shorter trips.']], foodTitle:'Food and local rhythm', foodDesc:'Sendai works best when meals, city walks, and cafés stay loosely connected.', foodBullets:['One meal and one café often stay with you longer than one more landmark.','The city is good enough on its own that side trips should not be forced.','At night, one district is usually enough to hold the mood.'], budgetFeel:'Hotels and meals change the feel, but the route itself usually stays manageable.', sampleTitle:'Sample rhythm for Sendai', sampleDesc:'The city often becomes clearer the less busy you make it.', sampleDays:[['Day 1 · Easy center entry','Use the station area and central streets to catch the city rhythm.'],['Day 2 · Green street + meal pockets','Link walks, meals, and cafés at a looser tempo.'],['Day 3 · Soft close or small side note','Close with one easy walk or a light side pocket.']], tips:['Even when movements look short, Sendai tends to end the day with lower felt fatigue.','If you add a side trip, leave one real downtown day for the city itself.','Market and café pockets often work well as one joined axis.'], keep:['A downtown hotel is usually enough for a satisfying base.','Meals and street rhythm often fit the city better than a heavy shopping route.','On rainy days, make more use of covered streets and cafés.'], finalTitle:'Sendai is strongest in quiet city rhythm', finalDesc:'In Planner, solo, soft city, and lighter pace combinations usually fit best.' }
  };
  editorialData.city.okinawa = { country:'Japan', image:'assets/images/cities/okinawa.jpg', planner:'Okinawa', example:'okinawa-3n4d-island-breeze.html',
    ko:{ eyebrow:'Japan Island Guide', lead:'오키나와는 체크리스트보다 해 질 무렵의 바다색, 바람, 그리고 쉬는 시간이 함께 남을 때 더 좋습니다.', chips:['Sea breeze','Drive rhythm','Island ease','Resort calm'], why:'Why it works', whyDesc:'오키나와는 해변 개수보다 시간대와 쉬는 포켓이 여행 톤을 훨씬 크게 바꿉니다.', bestFor:'커플, 가족, 쉬는 여행, 해변과 드라이브 중심', pace:'3박 4일 정도면 섬 리듬을 무리 없이 느끼기 좋습니다.', season:'초여름과 가을이 특히 좋고, 한여름은 더위와 이동 리듬을 더 신경 써야 합니다.', focusTitle:'Where to focus', focusDesc:'하루에 한 방향만 잡고, 카페와 해변, 짧은 드라이브를 느슨하게 이어가는 편이 좋습니다.', districts:[['Naha & arrival core','도착일 적응과 가벼운 도심 리듬에 좋습니다.'],['West coast / resort line','바다와 카페, 쉬는 시간이 잘 맞는 축입니다.'],['North or scenic drive note','하루를 통째로 쓸 가치가 있는 풍경 축입니다.']], foodTitle:'Food and local rhythm', foodDesc:'오키나와는 더위와 이동 거리를 고려해 식사·그늘·쉬는 타이밍을 넉넉히 두는 것이 중요합니다.', foodBullets:['해변은 많이 보는 것보다 좋은 시간대 하나가 더 중요합니다.','카페나 리조트 포켓이 단순 휴식이 아니라 route quality를 살립니다.','도심과 북부를 같은 날 깊게 넣으면 섬 리듬이 무너집니다.'], budgetFeel:'숙소 등급과 렌터카, 리조트 선택에 따라 예산 체감 차이가 큽니다.', sampleTitle:'Sample rhythm for Okinawa', sampleDesc:'오키나와는 덜 서두를수록 더 오래 남습니다.', sampleDays:[['Day 1 · Naha soft entry','도착일은 나하나 가까운 축으로 가볍게 시작합니다.'],['Day 2 · Coast and rest windows','서해안이나 리조트 라인을 여유 있게 씁니다.'],['Day 3 · Scenic drive or island pocket','드라이브 중심 하루 혹은 해변 포켓을 깊게 씁니다.'],['Day 4 · Soft departure','공항 이동을 고려해 무리 없이 마무리합니다.']], tips:['한여름엔 낮 시간보다 해질 무렵이 훨씬 좋을 때가 많습니다.','차 이동 전후로 쉬는 포켓을 꼭 남겨두는 편이 좋습니다.','해변은 두세 곳 얕게보다 한두 곳을 좋게 보는 편이 만족도가 높습니다.'], keep:['렌터카 회수와 공항 이동 시간을 넉넉히 잡으세요.','비나 강풍 예보가 있으면 실내 fallback을 하나 두는 편이 좋습니다.','리조트형 숙소를 쓰면 일정 밀도를 더 낮춰도 충분합니다.'], finalTitle:'오키나와는 island ease가 핵심입니다', finalDesc:'플래너에서는 coast, couple/family, scenic + easy pace 조합이 특히 잘 맞습니다.' },
    en:{ eyebrow:'Japan Island Guide', lead:'Okinawa becomes stronger when sea, air, and real rest are left in the trip together instead of chasing a stop count.', chips:['Sea breeze','Drive rhythm','Island ease','Resort calm'], why:'Why it works', whyDesc:'In Okinawa, movement ease and time-of-day choices often change trip quality far more than the number of beaches.', bestFor:'Couples, families, slower scenic trips, coast-and-drive routes', pace:'Around 3N4D is enough to feel the island without forcing it.', season:'Early summer and autumn feel strongest, while peak summer needs more care around heat and movement.', focusTitle:'Where to focus', focusDesc:'Choose one direction a day, then connect coast scenes, cafés, and rest windows loosely.', districts:[['Naha & arrival core','Useful for easing into the island on arrival day.'],['West coast / resort line','A stronger axis for sea views, cafés, and softer rest windows.'],['North or scenic drive note','Worth using as one full scenic day.']], foodTitle:'Food and local rhythm', foodDesc:'Heat and movement make meal spacing and rest windows more important than they first appear.', foodBullets:['One strong coastline time slot usually matters more than seeing many beaches.','Cafés and resort pockets do more than rest — they protect route quality.','Trying to go deep on downtown and the north on the same day weakens the island rhythm.'], budgetFeel:'Hotels, rental cars, and resort choices can change the felt budget a lot.', sampleTitle:'Sample rhythm for Okinawa', sampleDesc:'The island usually stays longer when the trip is less rushed.', sampleDays:[['Day 1 · Naha soft entry','Use Naha or a nearby axis for a lighter arrival day.'],['Day 2 · Coast and rest windows','Let one west-coast or resort line breathe.'],['Day 3 · Scenic drive or island pocket','Use one stronger drive day or deepen one coastline pocket.'],['Day 4 · Soft departure','Close gently with airport movement in mind.']], tips:['In peak summer, dusk often feels better than midday.','Keep a real rest pocket before or after longer drives.','One or two beaches done well usually beat three done lightly.'], keep:['Leave generous room for rental return and airport transfer.','If rain or wind is forecast, keep one indoor fallback ready.','With a resort stay, the route can stay lighter and still feel complete.'], finalTitle:'Okinawa is strongest in island ease', finalDesc:'In Planner, coast, couple/family, and scenic + easy pace combinations usually fit best.' }
  };


  editorialData.city.taipei = { country:'Taiwan', image:'assets/images/cities/taipei.jpg', planner:'Taipei', example:'taipei-3n4d-night-food.html',
    ko:{ eyebrow:'Taiwan City Guide', lead:'타이베이는 큰 랜드마크보다 밤의 food rhythm, 골목의 레이어, 늦은 카페의 마감을 어떻게 붙이느냐가 더 중요한 도시입니다.', chips:['Night markets','Layered alleys','Late cafés','Soft resets'], why:'Why it works', whyDesc:'타이베이는 체크리스트보다 먹는 흐름과 동네 템포를 잘 편집할수록 만족도가 높아집니다.', bestFor:'친구, 커플, food-led weekend, 늦은 도시 무드', pace:'2박 3일도 충분하지만 3박 4일이면 밤 리듬을 더 부드럽게 남길 수 있습니다.', season:'가을과 봄이 특히 좋고, 비 오는 날엔 실내 포켓 활용이 중요합니다.', focusTitle:'Where to focus', focusDesc:'한 번에 모든 구역을 넣기보다 하루 한두 축만 선명하게 읽는 편이 더 좋습니다.', districts:[['Ximending / west-side energy','첫날 진입과 밤 리듬을 잡기 쉬운 축입니다.'],['Da’an / café neighborhoods','조금 더 부드럽고 정돈된 낮 템포에 좋습니다.'],['Night-market pockets','먹는 리듬이 여행 전체 톤을 정해주는 핵심 포인트입니다.']], foodTitle:'Food and local rhythm', foodDesc:'타이베이는 한 끼와 한 야시장, 그리고 늦은 카페 포켓을 어떻게 잇느냐가 중요합니다.', foodBullets:['하루에 야시장 두 개보다 하나를 좋게 읽는 편이 낫습니다.','카페 포켓이 늦은 밤 밀도를 훨씬 부드럽게 만듭니다.','랜드마크보다 동네 결이 더 오래 남는 도시입니다.'], budgetFeel:'식사 선택에 따라 폭은 있지만, 동선 자체는 비교적 짧게 편집하기 쉽습니다.', sampleTitle:'Sample rhythm for Taipei', sampleDesc:'타이베이는 밤 템포를 남겨둘수록 더 잘 기억됩니다.', sampleDays:[['Day 1 · Soft city entry','서쪽 중심가나 카페 동네로 가볍게 시작합니다.'],['Day 2 · Food-led night rhythm','식사와 야시장, 늦은 카페를 중심으로 하루를 엮습니다.'],['Day 3 · View or neighborhood contrast','전망 포인트나 결이 다른 동네로 템포를 바꿉니다.'],['Day 4 · Slow close','마지막 반나절은 과하게 늘리지 않고 마무리합니다.']], tips:['야시장 전 한 번 쉬는 포켓을 두면 밤 피로가 확 줄어듭니다.','비 오는 날엔 실내 포켓이 route quality를 지켜줍니다.','한 구역을 오래 보는 편이 더 타이베이답게 남습니다.'], keep:['호텔 위치를 MRT 축 기준으로 잡으면 훨씬 편합니다.','하루를 너무 늦게 끝내면 다음 날 낮 템포가 무너지기 쉽습니다.','먹는 일정은 너무 많이 넣기보다 spacing이 중요합니다.'], finalTitle:'타이베이는 night food rhythm이 핵심입니다', finalDesc:'플래너에서는 food-led, friends/couple, late café 조합이 특히 잘 맞습니다.' },
    en:{ eyebrow:'Taiwan City Guide', lead:'Taipei is defined less by big landmarks than by how well night food rhythm, layered alleys, and a softer late café close are connected.', chips:['Night food','Layered alleys','Late café','Short resets'], why:'Why it works', whyDesc:'The city usually pays off more when food flow and neighborhood tempo are edited well rather than stacked as a checklist.', bestFor:'Friends, couples, food-led weekends, later city mood', pace:'2N3D works, but 3N4D leaves more room for the city’s night rhythm.', season:'Autumn and spring feel strongest, while rainy days reward stronger indoor pockets.', focusTitle:'Where to focus', focusDesc:'Do fewer districts well. One or two axes a day usually land better than trying to scan everything.', districts:[['Ximending / west-side energy','A useful axis for arrival day and after-dark movement.'],['Da’an / café neighborhoods','Better for a softer and more ordered daytime pace.'],['Night-market pockets','The city’s food rhythm often defines the whole trip tone.']], foodTitle:'Food and local rhythm', foodDesc:'In Taipei, what matters is how you connect one meal, one market, and one late café pocket.', foodBullets:['One night market done well usually beats two done lightly.','Café pockets make the night density much softer.','Neighborhood texture often stays with you longer than one more landmark.'], budgetFeel:'Food choices change the budget feel, but the route itself is usually compact and manageable.', sampleTitle:'Sample rhythm for Taipei', sampleDesc:'Taipei stays longer when the night tempo is left room to breathe.', sampleDays:[['Day 1 · Soft city entry','Start with a western core or a calmer café neighborhood.'],['Day 2 · Food-led night rhythm','Use meals, a market, and a late café as the main axis.'],['Day 3 · View or neighborhood contrast','Shift the tempo through a viewpoint or a different district texture.'],['Day 4 · Slow close','Close without forcing the final half day too hard.']], tips:['A reset pocket before the market makes the whole night easier.','On rainy days, indoor anchors protect route quality.','One district with more time usually feels more like Taipei.'], keep:['Hotels on a stronger MRT axis usually improve the whole trip.','If the night runs too late, the next day tends to flatten.','Meal spacing matters more than quantity.'], finalTitle:'Taipei is strongest in night food rhythm', finalDesc:'In Planner, food-led, friends/couple, and later café combinations usually fit best.' },
    ja:{ eyebrow:'Taiwan City Guide', lead:'台北は昼の名所数より、もう一度食べる場面と路地の質感、夜のテンポをどうつなぐかが大切な都市です。', chips:['Night food','Layered alleys','Late café','Short resets'], why:'Why it works', whyDesc:'チェックリストより、食の流れと街区テンポを上手く編集した方が満足度が高くなります。', bestFor:'友だち、カップル、food-led weekend、夜寄りの都市ムード', pace:'2泊3日でも十分ですが、3泊4日だと夜のリズムをもっとやわらかく残せます。', season:'秋と春が特に良く、雨の日は室内ポケットの使い方が大切です。', focusTitle:'Where to focus', focusDesc:'一度に全部入れず、一日一〜二軸だけをきれいに読む方が合います。', districts:[['Ximending / west-side energy','到着日と夜の動きを作りやすい軸です。'],['Da’an / café neighborhoods','少しやわらかく整った昼テンポに向いています。'],['Night-market pockets','食のリズムが旅全体のトーンを決める核心です。']], foodTitle:'Food and local rhythm', foodDesc:'台北は、一食・一つの夜市・遅めのカフェをどうつなぐかが重要です。', foodBullets:['夜市は二つ浅くより、一つをしっかり読む方が良いです。','カフェの余白が夜の密度をやわらげます。','ランドマークより街区の質感が長く残ります。'], budgetFeel:'食事の選び方で幅はありますが、動線自体は比較的短くまとめやすい都市です。', sampleTitle:'Sample rhythm for Taipei', sampleDesc:'台北は夜のテンポを残すほど印象が強くなります。', sampleDays:[['Day 1 · Soft city entry','西側の中心やカフェ街から軽く始めます。'],['Day 2 · Food-led night rhythm','食事・夜市・遅めのカフェを軸に一日を組みます。'],['Day 3 · View or neighborhood contrast','展望や質感の違う街区でテンポを変えます。'],['Day 4 · Slow close','最後の半日は無理に詰め込まず締めます。']], tips:['夜市の前に一度休むと夜の疲れがかなり減ります。','雨の日は室内ポケットが route quality を守ります。','一つの街区を長く見る方が台北らしく残ります。'], keep:['MRT軸の良いホテルが全体の楽さを上げます。','夜を遅くしすぎると翌日の昼テンポが崩れやすいです。','食の予定は量より spacing が大切です。'], finalTitle:'台北は night food rhythm が核心です', finalDesc:'Planner では food-led、friends/couple、late café の組み合わせが特に合います。' },
    zhHant:{ eyebrow:'Taiwan City Guide', lead:'台北不是靠白天景點數量取勝，而是看你怎麼把再一餐、巷弄質感、夜晚節奏接在一起。', chips:['Night food','Layered alleys','Late café','Short resets'], why:'Why it works', whyDesc:'比起 checklist，台北更吃食物節奏和街區 pace 的編排。', bestFor:'朋友、情侶、food-led weekend、偏夜城市感', pace:'2晚3天也夠，但 3晚4天會把夜節奏留得更柔和。', season:'秋天和春天特別適合，雨天則要更會用室內 pocket。', focusTitle:'Where to focus', focusDesc:'不要一次塞滿，通常一天一到兩個軸線就夠了。', districts:[['Ximending / west-side energy','很適合到達日與夜間移動的第一軸。'],['Da’an / café neighborhoods','比較柔和、有整理感的白天節奏。'],['Night-market pockets','食物節奏會直接決定整趟旅程的 tone。']], foodTitle:'Food and local rhythm', foodDesc:'在台北，關鍵是怎麼把一餐、一個夜市、和晚一點的咖啡 pocket 接起來。', foodBullets:['與其夜市兩個都淺淺看，不如一個看得更好。','咖啡 pocket 會讓晚上的密度柔和很多。','比起 landmark，街區質感更容易留下來。'], budgetFeel:'餐飲選擇會拉開預算感，但動線本身通常算好編。', sampleTitle:'Sample rhythm for Taipei', sampleDesc:'台北越把夜節奏留出來，越容易被記住。', sampleDays:[['Day 1 · Soft city entry','先從西側核心或咖啡街區輕輕開始。'],['Day 2 · Food-led night rhythm','用晚餐、夜市、晚咖啡把整天串起來。'],['Day 3 · View or neighborhood contrast','用景觀或不同街區質感換一下節奏。'],['Day 4 · Slow close','最後半天不要拉太滿，慢慢收尾。']], tips:['夜市前先留一個休息 pocket，晚上的疲勞會差很多。','雨天時，室內 anchor 會保住 route quality。','一個街區多看一點，通常更像真正的台北。'], keep:['住在 MRT 軸線好的地方會讓整趟舒服很多。','晚上拖太晚，隔天白天節奏容易扁掉。','飲食安排重點不是多，而是 spacing。'], finalTitle:'台北的核心是 night food rhythm', finalDesc:'在 Planner 裡，food-led、friends/couple、late café 的組合特別合。' } };
  editorialData.city.hongkong = { country:'Hong Kong', image:'assets/images/cities/hongkong.jpg', planner:'Hong Kong', example:'hongkong-3n4d-harbor-rhythm.html',
    ko:{ eyebrow:'Harbor City Guide', lead:'홍콩은 항구 장면 하나, 수직적인 시티 밀도, 그리고 밤의 slope rhythm을 얼마나 또렷하게 남기느냐가 핵심입니다.', chips:['Harbor night','Vertical city','Slope rhythm','Sharp views'], why:'Why it works', whyDesc:'강한 장면이 많은 도시라, 적게 잘 보는 편이 전체 톤을 훨씬 좋게 만듭니다.', bestFor:'친구, 커플, 짧은 city break, night/harbor 무드', pace:'2박 3일도 충분하지만 3박 4일이면 야경과 낮 템포를 더 분리할 수 있습니다.', season:'가을과 겨울이 비교적 선명하고, 더운 계절엔 휴식 포켓을 더 의식해야 합니다.', focusTitle:'Where to focus', focusDesc:'항구 축, 한 개의 높은 뷰포인트, 그리고 하나의 식사 구역만 잘 잡아도 충분합니다.', districts:[['Central / harbor core','홍콩 첫 장면과 야간 밀도를 가장 잘 보여주는 축입니다.'],['Kowloon side pockets','먹는 리듬과 야경 대비를 만들기 좋습니다.'],['Peak / elevated views','하루에 하나면 충분한 강한 장면입니다.']], foodTitle:'Food and local rhythm', foodDesc:'홍콩은 이동보다 한 끼와 한 뷰포인트를 어떻게 붙이느냐가 더 중요합니다.', foodBullets:['전망 포인트는 여러 개보다 하나를 좋게 보는 편이 낫습니다.','가파른 동선은 생각보다 빨리 피로를 만듭니다.','저녁은 한 축만 깊게 써도 충분히 강합니다.'], budgetFeel:'숙소 예산 체감은 큰 편이지만, 루트 자체는 짧게 잘 정리하면 훨씬 편합니다.', sampleTitle:'Sample rhythm for Hong Kong', sampleDesc:'홍콩은 낮/밤 대비를 너무 많이 넣지 않을수록 더 선명합니다.', sampleDays:[['Day 1 · Harbor entry','항구와 중심 코어로 첫 장면을 잡습니다.'],['Day 2 · Vertical city + food','높은 장면과 식사 축을 연결합니다.'],['Day 3 · Slower contrast day','조금 더 느린 축으로 리듬을 조절합니다.'],['Day 4 · Sharp close','마지막 장면 하나로 짧고 강하게 마무리합니다.']], tips:['밤의 밀도를 남기려면 오후에 한 번 쉬는 편이 좋습니다.','항구 야경은 날씨가 흐리면 대체 포켓을 준비하세요.','짧은 일정일수록 섬/반도 왕복을 줄이는 편이 좋습니다.'], keep:['언덕·에스컬레이터 이동 체감을 과소평가하지 마세요.','하루에 두 개 이상의 전망 포인트는 과한 경우가 많습니다.','호텔은 야간 복귀 편한 축이 유리합니다.'], finalTitle:'홍콩은 harbor intensity가 핵심입니다', finalDesc:'플래너에서는 night city, friends/couple, compact but sharp 조합이 잘 맞습니다.' },
    en:{ eyebrow:'Harbor City Guide', lead:'Hong Kong works best when one harbor scene, the city’s vertical density, and its sharper night slope rhythm are edited into one clear line.', chips:['Harbor night','Vertical city','Compact intensity','Sharp views'], why:'Why it works', whyDesc:'Because the city already has so many strong scenes, doing fewer of them well usually improves the whole tone.', bestFor:'Friends, couples, shorter city breaks, night/harbor mood', pace:'2N3D works, but 3N4D separates skyline nights and daytime rhythm more comfortably.', season:'Autumn and winter feel clearer, while hotter months need stronger reset pockets.', focusTitle:'Where to focus', focusDesc:'One harbor axis, one elevated view, and one food district are often enough.', districts:[['Central / harbor core','A strong axis for first scenes and night density.'],['Kowloon-side pockets','Useful for food rhythm and skyline contrast.'],['Peak / elevated views','One strong viewpoint a day is usually enough.']], foodTitle:'Food and local rhythm', foodDesc:'In Hong Kong, what matters is how one meal and one view point are connected, not how much you move.', foodBullets:['One viewpoint done well usually beats several rushed ones.','Steeper routing tires the day faster than it first seems.','One dinner axis is often enough to hold the night.'], budgetFeel:'Hotels can feel expensive, but the route itself becomes easier when kept compact.', sampleTitle:'Sample rhythm for Hong Kong', sampleDesc:'The city usually gets sharper when the day/night contrast is not overdone.', sampleDays:[['Day 1 · Harbor entry','Catch the first city scene through the harbor core.'],['Day 2 · Vertical city + food','Link one elevated scene with one strong food axis.'],['Day 3 · Slower contrast day','Use a slightly softer district to rebalance the trip.'],['Day 4 · Sharp close','Finish with one short but vivid final scene.']], tips:['To keep the night strong, use one real reset in the late afternoon.','If harbor weather turns gray, keep one backup indoor pocket ready.','On shorter stays, cut down island/peninsula back-and-forth.'], keep:['Do not underweight hills and escalator-heavy movement.','More than two viewpoints in one day is often too much.','Hotels with easier late-night returns usually pay off.'], finalTitle:'Hong Kong is strongest in harbor intensity', finalDesc:'In Planner, night city, friends/couple, and compact-but-sharp combinations fit best.' },
    ja:{ eyebrow:'Harbor City Guide', lead:'香港は、縦方向の都市密度とハーバーの光、短くても強い夜のリズムをどうつなぐかが核心です。', chips:['Harbor night','Vertical city','Compact intensity','Sharp views'], why:'Why it works', whyDesc:'強い場面が多い都市なので、数を増やすより少なく良く見る方が全体のトーンが整います。', bestFor:'友だち、カップル、短い city break、night / harbor mood', pace:'2泊3日でも十分ですが、3泊4日だと夜景と昼テンポをもっと分けて使えます。', season:'秋と冬の方が輪郭が出やすく、暑い季節は reset pocket を強めに取りたい都市です。', focusTitle:'Where to focus', focusDesc:'ハーバー軸、眺望一点、食の一軸だけでも十分です。', districts:[['Central / harbor core','最初の場面と夜の密度を作りやすい軸です。'],['Kowloon-side pockets','食のリズムと夜景コントラストを作りやすいです。'],['Peak / elevated views','一日に一つで十分な強い場面です。']], foodTitle:'Food and local rhythm', foodDesc:'香港は移動量より、一食と一つの眺望をどうつなぐかが重要です。', foodBullets:['眺望は複数より、一つを良く見る方が良いです。','急な動線は思ったより早く疲れを作ります。','夜は一軸だけ深く使っても十分強いです。'], budgetFeel:'ホテルの体感予算は高めですが、ルート自体はコンパクトにするとかなり楽です。', sampleTitle:'Sample rhythm for Hong Kong', sampleDesc:'昼夜コントラストを入れすぎない方が、香港はむしろくっきり残ります。', sampleDays:[['Day 1 · Harbor entry','ハーバーと中心コアで最初の都市場面をつかみます。'],['Day 2 · Vertical city + food','高い場面と食の一軸をつなぎます。'],['Day 3 · Slower contrast day','少しやわらかい軸でテンポを戻します。'],['Day 4 · Sharp close','最後は短くても強い一場面で締めます。']], tips:['夜を強く残したいなら、午後遅めに一度休むと良いです。','ハーバー天気が悪い日は室内 fallback を一つ用意しましょう。','短い滞在ほど、島/半島の往復は減らした方が良いです。'], keep:['坂やエスカレーター移動を軽く見ないでください。','一日に眺望二つ以上は過密になりやすいです。','夜の戻りが楽なホテルが便利です。'], finalTitle:'香港の核心は harbor intensity です', finalDesc:'Planner では night city、friends/couple、compact but sharp が特に合います。' },
    zhHant:{ eyebrow:'Harbor City Guide', lead:'香港的重點在於，你怎麼把垂直城市密度、港口光感、以及短但強的夜節奏接在一起。', chips:['Harbor night','Vertical city','Compact intensity','Sharp views'], why:'Why it works', whyDesc:'因為這座城市本來就有很多強畫面，所以做少一點、做得更好，整體 tone 反而更強。', bestFor:'朋友、情侶、短 city break、night / harbor mood', pace:'2晚3天也夠，但 3晚4天會更容易把夜景和白天節奏分開。', season:'秋冬輪廓更清楚，天熱時更需要 reset pocket。', focusTitle:'Where to focus', focusDesc:'一條港口軸、一個高點 view、再加一個食物區，其實就很夠了。', districts:[['Central / harbor core','最容易建立第一個城市場景與夜間密度的軸。'],['Kowloon-side pockets','很適合做食物節奏與夜景對比。'],['Peak / elevated views','一天一個高點通常就夠了。']], foodTitle:'Food and local rhythm', foodDesc:'在香港，重點不是移動多少，而是一餐和一個 view point 怎麼接起來。', foodBullets:['與其看很多 view，不如一個看得更好。','比較陡的動線會比想像中更快累。','晚上其實只要深一條軸就很夠。'], budgetFeel:'住宿預算感偏高，但動線如果保持緊湊，其實會舒服很多。', sampleTitle:'Sample rhythm for Hong Kong', sampleDesc:'香港通常在晝夜對比不做過頭時，反而更清楚。', sampleDays:[['Day 1 · Harbor entry','先用港口和核心區抓住第一個城市畫面。'],['Day 2 · Vertical city + food','把高點畫面和食物軸接起來。'],['Day 3 · Slower contrast day','用比較柔和的區域重新調整節奏。'],['Day 4 · Sharp close','最後用一個短但清楚的畫面收尾。']], tips:['如果想保住夜的密度，下午後段最好留一次 reset。','港口天氣不好時，先準備一個室內 fallback。','停留時間短時，更應該減少島/半島往返。'], keep:['不要低估坡度和手扶梯動線的體感。','一天超過兩個高點 view 通常太多。','住在夜間回程比較順的軸線會更好。'], finalTitle:'香港的核心是 harbor intensity', finalDesc:'在 Planner 裡，night city、friends/couple、compact but sharp 的組合最適合。' } };
  editorialData.city.macau = { country:'Macau', image:'assets/images/cities/macau.jpg', planner:'Macau', example:'macau-2n3d-heritage-night.html',
    ko:{ eyebrow:'Macau City Guide', lead:'마카오는 광장 스케일, heritage 보행축, 그리고 짧고 또렷한 night close를 한 축으로 묶을 때 가장 도시답게 남습니다.', chips:['Square scale','Heritage core','Night close','Short stay'], why:'Why it works', whyDesc:'도심 보행축이 짧고 선명해서, 억지로 넓히지 않을수록 훨씬 만족도가 좋습니다.', bestFor:'커플, 부모님, 짧은 2박 3일, heritage + night', pace:'2박 3일이면 충분하고, 과하게 늘리기보다 압축된 흐름이 잘 맞습니다.', season:'가을과 겨울이 걷기 좋고, 비 오는 날엔 실내 포켓이 중요해집니다.', focusTitle:'Where to focus', focusDesc:'세나도 주변 heritage 축과 한 개의 저녁 장면만 잘 잡아도 구조가 깔끔합니다.', districts:[['Senado / heritage core','짧게 걸으며 도시 캐릭터를 읽기 좋은 중심축입니다.'],['Alley food pockets','짧은 식사 장면이 루트 전체 만족도를 올립니다.'],['Night close scene','하루를 짧고 선명하게 마감하는 포인트입니다.']], foodTitle:'Food and local rhythm', foodDesc:'마카오는 큰 스폿 수보다 걷기 좋은 축과 저녁 식사 장면의 연결이 중요합니다.', foodBullets:['낮/밤 대비가 잘 나서 하루가 짧아도 만족도가 높습니다.','실내 포켓을 하나 두면 날씨 변화에도 안정적입니다.','너무 많은 구역을 넣으면 compact한 장점이 사라집니다.'], budgetFeel:'숙소 선택 폭은 있지만, 체류일이 짧아 전체 루트는 비교적 안정적으로 관리됩니다.', sampleTitle:'Sample rhythm for Macau', sampleDesc:'마카오는 heritage와 night를 짧고 선명하게 남길수록 좋습니다.', sampleDays:[['Day 1 · Heritage entry','세나도 주변과 중심 보행축으로 시작합니다.'],['Day 2 · Food + night close','짧은 식사 장면과 저녁 포인트를 연결합니다.'],['Day 3 · Soft departure','마지막 날은 무리하지 않고 짧게 정리합니다.']], tips:['짧은 체류일수록 보행축 하나에 집중하는 편이 좋습니다.','비 오는 날엔 실내 포켓과 카페가 route quality를 지켜줍니다.','야간 장면은 여러 개보다 하나를 좋게 보는 편이 낫습니다.'], keep:['장시간 공연/쇼와 긴 이동을 같은 날 겹치지 마세요.','호텔 위치가 보행축 근처면 훨씬 편합니다.','하루를 너무 길게 끌지 않는 편이 도시와 잘 맞습니다.'], finalTitle:'마카오는 compact heritage night가 핵심입니다', finalDesc:'플래너에서는 heritage, couple/parents, short stay 조합이 특히 잘 맞습니다.' },
    en:{ eyebrow:'Macau City Guide', lead:'Macau fits shorter stays best when square scale, a heritage walk, and one clean night close are held on the same compact axis.', chips:['Heritage core','Night close','Compact walk','Short stay'], why:'Why it works', whyDesc:'The central walkable core is short and clear, so the city usually improves when the route is not forced wider.', bestFor:'Couples, parents, shorter 2N3D trips, heritage + night', pace:'2N3D is enough, and the city often works better as a compact edit than as a stretched one.', season:'Autumn and winter feel better for walking, while rainy days reward indoor pockets.', focusTitle:'Where to focus', focusDesc:'A Senado-area heritage axis plus one evening scene already makes a clean structure.', districts:[['Senado / heritage core','A compact central axis that reads the city character well on foot.'],['Alley food pockets','Short meal scenes that noticeably improve overall payoff.'],['Night close scene','A clear point to end the day with focus.']], foodTitle:'Food and local rhythm', foodDesc:'In Macau, the strength comes less from volume and more from how one walkable axis and one dinner scene connect.', foodBullets:['The day-night contrast gives good payoff even on shorter stays.','One indoor pocket keeps the route stable when weather shifts.','Too many zones weaken the city’s compact advantage.'], budgetFeel:'There is range in hotels, but the shorter stay usually keeps the route manageable.', sampleTitle:'Sample rhythm for Macau', sampleDesc:'Macau gets stronger when heritage and night are left short but vivid.', sampleDays:[['Day 1 · Heritage entry','Start through Senado and the central walking core.'],['Day 2 · Food + night close','Connect a shorter meal scene with one evening point.'],['Day 3 · Soft departure','Close without forcing the final day too hard.']], tips:['The shorter the stay, the more useful it is to stay on one walkable axis.','On rainy days, indoor cafés and pockets protect route quality.','One good night scene usually beats several lighter ones.'], keep:['Do not stack long shows and longer transfers on the same day.','Hotels near the walkable core usually feel easier.','The city suits shorter, clearer days better than very long ones.'], finalTitle:'Macau is strongest in compact heritage night', finalDesc:'In Planner, heritage, couple/parents, and short-stay combinations usually fit best.' },
    ja:{ eyebrow:'Macau City Guide', lead:'マカオは短い滞在に強い都市で、heritage の散歩と夜の場面をどう一つの軸にまとめるかが大切です。', chips:['Heritage core','Night close','Compact walk','Short stay'], why:'Why it works', whyDesc:'中心の歩行軸が短く明確なので、無理に広げないほど満足度が上がります。', bestFor:'カップル、親との旅、短い 2泊3日、heritage + night', pace:'2泊3日で十分で、伸ばすより圧縮した流れの方が合います。', season:'秋冬は歩きやすく、雨の日は室内ポケットが重要になります。', focusTitle:'Where to focus', focusDesc:'セナド周辺の heritage 軸と一つの夜景場面だけでも構造はきれいです。', districts:[['Senado / heritage core','短く歩きながら都市キャラクターを読むのに向いた中心軸です。'],['Alley food pockets','短い食事場面が全体の満足度を上げます。'],['Night close scene','一日を短く明確に締めるポイントです。']], foodTitle:'Food and local rhythm', foodDesc:'マカオは大きなスポット数より、歩きやすい軸と夕食シーンの接続が大切です。', foodBullets:['昼夜コントラストが良く、短い滞在でも満足度が高いです。','室内ポケットを一つ持つと天気変化にも安定します。','区間を増やしすぎると compact の良さが消えます。'], budgetFeel:'ホテルの幅はありますが、滞在日が短く全体ルートは安定しやすいです。', sampleTitle:'Sample rhythm for Macau', sampleDesc:'マカオは heritage と night を短く、くっきり残すほど良くなります。', sampleDays:[['Day 1 · Heritage entry','セナド周辺と中心歩行軸から始めます。'],['Day 2 · Food + night close','短い食事場面と夜のポイントをつなぎます。'],['Day 3 · Soft departure','最終日は無理なく短く整えます。']], tips:['短い滞在ほど一つの歩行軸に集中する方が合います。','雨の日は室内ポケットとカフェが route quality を守ります。','夜の場面は複数より、一つを良く見る方が良いです。'], keep:['長いショーと長い移動を同日に重ねないでください。','歩行軸近くのホテルがかなり便利です。','とても長い日より、短く明確な一日の方が都市に合います。'], finalTitle:'マカオの核心は compact heritage night です', finalDesc:'Planner では heritage、couple/parents、short stay の組み合わせが特に合います。' },
    zhHant:{ eyebrow:'Macau City Guide', lead:'澳門很適合短停留，重點在於你怎麼把 heritage 散步和夜晚場景接成同一條軸。', chips:['Heritage core','Night close','Compact walk','Short stay'], why:'Why it works', whyDesc:'因為中心步行軸短而清楚，所以不硬拉得太寬時，整體反而更好。', bestFor:'情侶、爸媽同行、短 2晚3天、heritage + night', pace:'2晚3天就夠，通常緊湊一點的節奏比硬拉長更適合。', season:'秋冬比較好走，雨天時室內 pocket 就更重要。', focusTitle:'Where to focus', focusDesc:'以議事亭前地周邊的 heritage 軸，再加一個晚間場景，其實就很乾淨。', districts:[['Senado / heritage core','很適合用步行去讀城市 character 的核心軸。'],['Alley food pockets','短一點的食物場景就能明顯提高滿意度。'],['Night close scene','把一天收得短而清楚的最後一幕。']], foodTitle:'Food and local rhythm', foodDesc:'澳門的重點不是景點量，而是好走的軸線和晚餐場景怎麼接起來。', foodBullets:['晝夜對比很強，所以停留短也能有好回報。','留一個室內 pocket，天氣變化時會穩很多。','塞太多區域，反而會失去 compact 的優勢。'], budgetFeel:'住宿選擇有高低，但因為停留短，整體路線通常算穩。', sampleTitle:'Sample rhythm for Macau', sampleDesc:'澳門越把 heritage 和 night 留得短而清楚，越有味道。', sampleDays:[['Day 1 · Heritage entry','先從議事亭前地和核心步行軸開始。'],['Day 2 · Food + night close','把短一點的食物場景和夜間收尾接起來。'],['Day 3 · Soft departure','最後一天不要拉太滿，慢慢收尾。']], tips:['停留越短，越適合集中在一條步行軸上。','雨天時，室內 pocket 和 café 會守住 route quality。','夜景與其多個，不如一個看得更好。'], keep:['不要把長秀場和長移動排在同一天。','住在步行軸附近通常會舒服很多。','這座城市更適合短、清楚的一天，而不是拖很長。'], finalTitle:'澳門的核心是 compact heritage night', finalDesc:'在 Planner 裡，heritage、couple/parents、short stay 的組合最適合。' } };

  editorialData.example['sapporo-3n4d-snow-soft'] = { titleKo:'Sapporo 3박 4일 seasonal calm', titleEn:'Sapporo 3N4D Seasonal Calm', city:'Sapporo', image:'assets/images/examples/sapporo-snow-soft.jpg', guide:'sapporo.html', koLead:'삿포로의 눈빛, 따뜻한 식사, 짧은 저녁 장면을 느슨하게 묶은 샘플입니다.', enLead:'A Sapporo sample built around snow light, warm meals, and a looser evening rhythm.', ko:{ routeShape:'도심 코어 → food warmth → 조용한 마감', energyControl:'둘째 날만 조금 더 길게 두고, 나머지는 넓게 여백을 남깁니다.', swapNote:'눈이나 비가 강하면 실내 포켓과 전망 포인트 위주로 축을 더 짧게 잡습니다.', bestWith:'커플, 겨울 도시 여행, food + walk mood', whyBullets:['삿포로는 넓은 블록을 천천히 읽을수록 좋습니다.','한 끼와 한 저녁 장면이 여행의 톤을 결정합니다.','무리한 근교보다 도심 seasonal mood가 더 강하게 남습니다.'] }, en:{ routeShape:'Core city entry → food warmth → quieter close', energyControl:'Let only day two stretch a little, then keep the rest wider and softer.', swapNote:'If snow or rain gets stronger, shorten the axis and lean on indoor pockets plus one viewpoint.', bestWith:'Couples, winter city trips, food-and-walk mood', whyBullets:['Sapporo improves when wider blocks get more room.','One meal and one evening scene often define the whole tone.','Downtown seasonal mood usually pays off more than forcing a side trip.'] } };
  editorialData.example['sendai-2n3d-city-rest'] = { titleKo:'Sendai 2박 3일 city rest', titleEn:'Sendai 2N3D City Rest', city:'Sendai', image:'assets/images/examples/sendai-city-rest.jpg', guide:'sendai.html', koLead:'센다이의 녹음길과 시장 포켓, 그리고 조용한 식사 리듬을 오래 남기는 쪽으로 짠 샘플입니다.', enLead:'A Sendai sample built to hold green avenues, market pockets, and a quieter meal rhythm for longer.', ko:{ routeShape:'도심 적응 → 그린 스트리트 → 느린 마감', energyControl:'하루에 너무 많은 축을 넣지 않고, 식사와 카페 사이 간격을 넉넉히 둡니다.', swapNote:'비가 오면 강변보다 카페와 아케이드 구간을 더 길게 잡는 편이 좋습니다.', bestWith:'솔로, 차분한 주말, 덜 빡빡한 일본 도시 여행', whyBullets:['센다이는 빠르게 훑기보다 한두 축을 오래 읽는 편이 좋습니다.','시장과 카페 포켓이 route quality를 높여줍니다.','근교를 넣더라도 도심 하루를 따로 남기면 도시 캐릭터가 살아납니다.'] }, en:{ routeShape:'Downtown ease → green streets → slower close', energyControl:'Avoid too many axes per day and leave more room between meals and cafés.', swapNote:'On rainy days, extend indoor cafés and covered streets rather than river walks.', bestWith:'Solo trips, calmer weekends, lighter urban Japan edits', whyBullets:['Sendai works better when one or two axes get more time.','Market and café pockets noticeably improve route quality.','Even with a side trip, leaving one real city day keeps the character alive.'] } };
  editorialData.example['okinawa-3n4d-island-breeze'] = { titleKo:'Okinawa 3박 4일 island breeze', titleEn:'Okinawa 3N4D Island Breeze', city:'Okinawa', image:'assets/images/examples/okinawa-island-breeze.jpg', guide:'okinawa.html', koLead:'오키나와의 바다색, 쉬는 시간, 느슨한 드라이브를 같이 남기는 샘플입니다.', enLead:'A slower Okinawa sample that leaves room for sea color, sea air, and real rest.', ko:{ routeShape:'도착 완충 → coast day → scenic drive → 부드러운 출발', energyControl:'한여름일수록 낮 이동을 줄이고, 저녁과 해변 시간을 더 좋게 씁니다.', swapNote:'비나 바람이 강하면 해변 수를 줄이고 카페·리조트 포켓을 늘리는 편이 좋습니다.', bestWith:'커플, 가족, coast + easy pace', whyBullets:['오키나와는 해변 개수보다 시간대 선택이 더 중요합니다.','드라이브 전후 쉬는 포켓이 route quality를 지켜줍니다.','마지막 날 무리한 이동을 줄이면 섬 리듬이 더 깔끔하게 남습니다.'] }, en:{ routeShape:'Arrival buffer → coast day → scenic drive → soft departure', energyControl:'The hotter the season, the more you should reduce midday moves and improve evening coast timing.', swapNote:'With rain or stronger wind, cut beach count and expand cafés or resort pockets instead.', bestWith:'Couples, families, coast + easy pace', whyBullets:['In Okinawa, time-of-day choices matter more than beach count.','Rest pockets around drives protect route quality.','A lighter final day leaves the island rhythm much cleaner.'] } };



  editorialData.example['taipei-3n4d-night-food'] = { titleKo:'Taipei 3박 4일 night food', titleEn:'Taipei 3N4D Night Food', city:'Taipei', image:'assets/images/examples/taipei-night-food.jpg', guide:'taipei.html', koLead:'타이베이의 night food rhythm, 골목 레이어, 늦은 카페 마감을 같이 남기는 샘플입니다.', enLead:'A Taipei sample shaped around night-food rhythm, layered alleys, and a slower late close.', ko:{ routeShape:'도착 적응 → food-led night → 동네 대비 → 느린 마감', energyControl:'밤 축을 강하게 쓰는 대신 낮엔 동네 수를 줄여 체력 여유를 남깁니다.', swapNote:'비가 오면 전망보단 실내 식사·카페 포켓을 더 길게 쓰는 편이 좋습니다.', bestWith:'친구, 커플, food-led weekend', whyBullets:['타이베이는 밤의 food rhythm이 여행 만족도를 크게 바꿉니다.','낮 동선을 줄일수록 밤 장면이 더 선명해집니다.','한 구역을 오래 보는 편이 도시 캐릭터가 더 남습니다.'] }, en:{ routeShape:'Arrival ease → food-led night → neighborhood contrast → softer close', energyControl:'Use a stronger night axis, then reduce daytime zone count to keep energy in reserve.', swapNote:'On rainy days, extend indoor meals and café pockets instead of forcing viewpoints.', bestWith:'Friends, couples, food-led weekends', whyBullets:['Taipei’s night food rhythm changes the whole trip quality.','A lighter daytime route makes the night much clearer.','One district with more time usually leaves a stronger city impression.'] } };
  editorialData.example['hongkong-3n4d-harbor-rhythm'] = { titleKo:'Hong Kong 3박 4일 harbor rhythm', titleEn:'Hong Kong 3N4D Harbor Rhythm', city:'Hong Kong', image:'assets/images/examples/hongkong-harbor-rhythm.jpg', guide:'hongkong.html', koLead:'홍콩의 harbor scene, 수직 도시감, 밤의 slope rhythm을 압축해서 남기는 샘플입니다.', enLead:'A Hong Kong sample that keeps harbor scenes, vertical density, and night slope rhythm compact but vivid.', ko:{ routeShape:'항구 진입 → skyline + food → 대비 day → 짧은 마감', energyControl:'야간 장면이 강한 도시라 오후에 한 번 리셋을 넣는 편이 좋습니다.', swapNote:'날씨가 흐리면 전망 포인트를 줄이고 실내 포켓을 더 안정적으로 씁니다.', bestWith:'친구, 커플, 짧은 night city trip', whyBullets:['홍콩은 적게 잘 볼수록 더 선명합니다.','한 식사 축과 한 전망 포인트만으로도 충분히 강합니다.','고저차와 이동 피로를 고려한 route editing이 중요합니다.'] }, en:{ routeShape:'Harbor entry → skyline + food → contrast day → shorter close', energyControl:'Because nights are strong here, one afternoon reset usually helps the whole route.', swapNote:'If weather turns gray, cut viewpoint count and use indoor anchors more confidently.', bestWith:'Friends, couples, shorter night-city trips', whyBullets:['Hong Kong often gets sharper when you do less but do it better.','One food axis and one view point can already be enough.','Good route editing matters because slopes and movement fatigue add up.'] } };
  editorialData.example['macau-2n3d-heritage-night'] = { titleKo:'Macau 2박 3일 heritage night', titleEn:'Macau 2N3D Heritage Night', city:'Macau', image:'assets/images/examples/macau-heritage-night.jpg', guide:'macau.html', koLead:'마카오의 square scale, heritage 산책, night close를 짧고 선명하게 남기는 샘플입니다.', enLead:'A shorter Macau sample built around square scale, a clean heritage walk, and one strong night close.', ko:{ routeShape:'heritage entry → food + night → 부드러운 출발', energyControl:'짧은 도시라 하루를 너무 길게 끌지 않는 편이 route quality를 지켜줍니다.', swapNote:'비가 오면 heritage 산책을 줄이고 실내 포켓을 더 길게 두는 편이 좋습니다.', bestWith:'커플, 부모님, 짧은 2박 3일', whyBullets:['마카오는 중심 보행축 하나만 좋아도 만족도가 높습니다.','짧은 체류에 night contrast가 잘 남습니다.','많이 보기보다 compact하게 읽는 편이 도시와 더 잘 맞습니다.'] }, en:{ routeShape:'Heritage entry → food + night → softer departure', energyControl:'Because the city is compact, shorter and clearer days usually protect route quality.', swapNote:'In rain, reduce heritage walking and expand indoor pockets instead.', bestWith:'Couples, parents, shorter 2N3D trips', whyBullets:['Macau pays off even when one central walking axis is done well.','Night contrast stays strong on shorter stays.','The city fits compact reading better than volume.'] } };


  function plannerUrlForCity(city=''){ return `${navHref('planner')}?destination=${encodeURIComponent(city)}`; }

  function uiText(key){
    const labels = {
      coverNote: { ko:'커버 노트', en:'Cover note', ja:'カバーノート', zhHant:'封面筆記' },
      frontPageEdit: { ko:'프론트 페이지 에디트', en:'Front page edit', ja:'フロントページ編集', zhHant:'首頁編輯' },
      cityGuide: { ko:'도시 가이드', en:'City guide', ja:'都市ガイド', zhHant:'城市指南' },
      readFirst: { ko:'먼저 읽기', en:'Read first', ja:'先に読む', zhHant:'先讀這裡' },
      bestSeason: { ko:'추천 시즌', en:'Best season', ja:'おすすめの季節', zhHant:'推薦季節' },
      overview: { ko:'개요', en:'Overview', ja:'概要', zhHant:'總覽' },
      districts: { ko:'구역', en:'Districts', ja:'エリア', zhHant:'區域' },
      sample: { ko:'샘플', en:'Sample', ja:'サンプル', zhHant:'範例' },
      localNotes: { ko:'현지 노트', en:'Local notes', ja:'ローカルノート', zhHant:'在地筆記' },
      localTips: { ko:'현지 팁', en:'Local tips', ja:'現地のヒント', zhHant:'在地提示' },
      beforeYouGo: { ko:'가기 전에', en:'Before you go', ja:'出発前に', zhHant:'出發之前' },
      keepInMind: { ko:'기억해둘 점', en:'Keep in mind', ja:'覚えておきたいこと', zhHant:'先記住這些' },
      nextMove: { ko:'다음 단계', en:'Next move', ja:'次の一手', zhHant:'下一步' },
      planExample: { ko:'일정 예시', en:'Plan example', ja:'旅程サンプル', zhHant:'行程範例' },
      exampleItinerary: { ko:'예시 일정', en:'Example itinerary', ja:'サンプル旅程', zhHant:'範例行程' },
      cityMood: { ko:'도시 무드', en:'City mood', ja:'街のムード', zhHant:'城市氛圍' },
      atAGlance: { ko:'한눈에 보기', en:'At a glance', ja:'ひと目で', zhHant:'一眼看懂' },
      dayByDay: { ko:'하루별 흐름', en:'Day by day', ja:'日ごとの流れ', zhHant:'每日節奏' },
      whyItWorks: { ko:'왜 이 구조가 맞는지', en:'Why this structure works', ja:'この構成がうまくいく理由', zhHant:'這個結構為什麼有效' },
      adjustBeforeEditing: { ko:'커스텀 전에 조정하기', en:'Before you customize it', ja:'カスタマイズ前に整える', zhHant:'客製前先調整' }
    };
    return (labels[key] && labels[key][lang]) || (labels[key] && labels[key].en) || key;
  }

  function renderMagazineLanding(){
    if (location.pathname.includes('/city/') || location.pathname.includes('/example/')) return;
    const root = document.getElementById('magazineAppRoot');
    if (!root) return;
    const data = editorialData.magazine[lang] || editorialData.magazine.en;
    const order = ['tokyo','seoul','taipei','kyoto','busan','hongkong','fukuoka','jeju','macau','sapporo','gyeongju','sendai','okinawa','osaka'];
    const cityMarkup = order.map(key => {
      const loop = cityLoopMap[key];
      const meta = data.cityMeta[key];
      const copy = data.cityCopy[key];
      const chips = (data.chipMap[key] || []).map(ch => `<span class="trip-mini-chip">${ch}</span>`).join('');
      const vibe = String(loop.vibe || '').split(/\s+/)[0] || 'all';
      return `<article class="city-card info-card finder-card" data-country="${loop.country.toLowerCase()}" data-vibe="${(loop.vibe||'').replace(/ /g,' ')}" data-search="${loop.name.toLowerCase()} ${loop.country.toLowerCase()} ${(loop.vibe||'').toLowerCase()}">
        <div class="card-image"><img src="../${loop.image}" alt="${loop.name}"></div>
        <div class="card-body"><div class="meta">${meta}</div><h3 class="card-title">${loop.name}</h3><p class="card-copy">${copy}</p><div class="trip-chip-row">${chips}</div><div class="card-actions"><a class="soft-btn" href="../${loop.guide}">${data.guideBtn}</a><button class="ghost-btn" data-start-city="${loop.name}">${data.planBtn}</button></div></div>
      </article>`;
    }).join('');
    root.innerHTML = `
      <section class="magazine-hero-v2 hero-card magazine-led-hero cover-system-shell cover-system-shell-magazine">
        <div class="magazine-hero-copy cover-copy-column">
          <div class="cover-meta-row"><span class="cover-meta-pill">Magazine</span><span class="cover-meta-pill">East Asia city edit</span></div>
          <span class="eyebrow">${data.heroEyebrow}</span>
          <h1>${data.heroTitle}</h1>
          <p>${data.heroDesc}</p>
          <div class="hero-chip-row">${data.heroChips.map(ch => `<span class="hero-chip">${ch}</span>`).join('')}</div>
          <div class="cover-note-line"><strong>${uiText('coverNote')}</strong><span>${lang === 'ko' ? '홈, 매거진, 도시 가이드의 첫 장면을 같은 커버 규칙으로 맞췄습니다.' : lang === 'ja' ? 'ホーム、マガジン、都市ガイドの最初の見え方を同じカバー規則でそろえました。' : lang === 'zhHant' ? '首頁、城市誌與城市指南的第一個畫面，現在都共用同一套封面規則。' : 'Home, magazine, and city guides now open with the same cover rules.'}</span></div>
          <div class="cta-row hero-actions cover-actions-row">
            <a class="primary-btn" data-nav="planner">${data.startPlanner}</a>
            <a class="secondary-btn" href="#cityFinder">${data.browseCities}</a>
          </div>
        </div>
        <div class="magazine-hero-stack cover-visual-column">
          <article class="hero-feature-card info-card">
            <div class="hero-feature-top"><span class="collection-kicker">${data.featureKicker}</span><span class="hero-mini-meta">${data.featureMeta}</span></div>
            <h3>${data.featureTitle}</h3>
            <p>${data.featureDesc}</p>
            <div class="hero-feature-rail"><a href="../city/tokyo.html">${data.featureLinks[0]}</a><a href="../city/kyoto.html">${data.featureLinks[1]}</a><a href="../example/osaka-2n3d-family.html">${data.featureLinks[2]}</a></div>
          </article>
          <article class="hero-side-card info-card">
            <span class="collection-kicker">${data.sideKicker}</span>
            <h3>${data.sideTitle}</h3>
            <div class="editorial-lines compact">${data.sideLines.map(line => `<div class="editorial-line"><strong>${line[0]}</strong><span>${line[1]}</span></div>`).join('')}</div>
            <div class="mini-cta-stack"><a class="soft-btn" href="#cityFinder">${data.sideButtons[0]}</a><a class="soft-btn" data-nav="trips">${data.sideButtons[1]}</a></div>
          </article>
        </div>
      </section>
      <section class="section magazine-cover-strip">
        <div class="section-head">
          <div><span class="eyebrow">${uiText('frontPageEdit')}</span><h2 class="section-title">${lang === 'ko' ? '이번 주 동아시아 커버' : lang === 'ja' ? '今週の東アジアカバー' : lang === 'zhHant' ? '本週東亞封面' : 'This week’s East Asia cover'}</h2><p class="section-desc">${lang === 'ko' ? '일본, 한국, 대만·홍콩·마카오까지 한 호흡 안에서 읽히도록 첫 셸프를 다시 정리했습니다.' : lang === 'ja' ? '日本・韓国・台北／香港／マカオが一つの流れで読めるよう、最初の棚を整えました。' : lang === 'zhHant' ? '把日本、韓國，以及台北／香港／澳門放進同一個閱讀節奏裡，重新整理了第一層書架。' : 'The first shelf is rebalanced so Japan, Korea, and Taipei / Hong Kong / Macau read as one East Asia edit.'}</p></div>
        </div>
        <div class="cover-desk-grid cover-desk-grid-magazine">
          <article class="cover-story-card cover-story-card-large">
            <div class="cover-story-media"><img src="../assets/images/hero/main-hero-japan.jpg" alt="Japan editorial cover"></div>
            <div class="cover-story-body">
              <span class="collection-kicker">${lang === 'ko' ? 'Japan edit' : lang === 'ja' ? 'Japan edit' : lang === 'zhHant' ? 'Japan edit' : 'Japan edit'}</span>
              <h3>${lang === 'ko' ? '도시를 리듬과 온도로 읽는 방식' : lang === 'ja' ? '街をリズムと温度で読む方法' : lang === 'zhHant' ? '用節奏與溫度去讀城市' : 'Reading cities by rhythm, pace, and temperature'}</h3>
              <p>${lang === 'ko' ? 'Tokyo부터 Okinawa까지, 밀도 높은 도시와 느슨한 도시를 한 흐름 안에서 읽게 정리했습니다.' : lang === 'ja' ? 'Tokyo から Okinawa まで、密度の高い街とゆるい街を一つの流れで読めるように整えました。' : lang === 'zhHant' ? '從 Tokyo 到 Okinawa，把高密度城市與鬆弛城市放進同一條閱讀流裡。' : 'From Tokyo to Okinawa, denser cities and softer cities now sit in one readable flow.'}</p>
              <div class="cta-row"><a class="primary-btn" href="../city/tokyo.html">${lang === 'ko' ? '도시 가이드 열기' : lang === 'ja' ? '都市ガイドを開く' : lang === 'zhHant' ? '打開城市指南' : 'Open city guide'}</a><a class="secondary-btn" href="../example/tokyo-3n4d-first-trip.html">${lang === 'ko' ? '샘플 루트 보기' : lang === 'ja' ? 'サンプルルートを見る' : lang === 'zhHant' ? '看範例路線' : 'See a sample route'}</a></div>
            </div>
          </article>
          <div class="cover-desk-side">
            <article class="cover-story-card cover-story-card-compact">
              <div class="cover-story-media compact"><img src="../assets/images/hero/main-hero-korea.jpg" alt="Korea editorial cover"></div>
              <div class="cover-story-body compact">
                <span class="collection-kicker">${lang === 'ko' ? 'Korea edit' : lang === 'ja' ? 'Korea edit' : lang === 'zhHant' ? 'Korea edit' : 'Korea edit'}</span>
                <h3>${lang === 'ko' ? 'Seoul부터 Macau까지, 결이 다른 도시들' : lang === 'ja' ? 'Seoul から Macau まで、質感の違う都市たち' : lang === 'zhHant' ? '從 Seoul 到 Macau，不同質地的城市' : 'From Seoul to Macau, cities with different textures'}</h3>
                <p>${lang === 'ko' ? '한국 도시와 번체권 도시가 한 화면 안에서 자연스럽게 이어지도록 카드 균형을 다시 잡았습니다.' : lang === 'ja' ? '韓国の都市と繁体字圏の都市が一つの画面で自然につながるよう、カードのバランスを整えました。' : lang === 'zhHant' ? '把韓國城市與繁體字圈城市放進同一個畫面節奏裡，重新整理了卡片平衡。' : 'Cards are rebalanced so Korea and the Traditional Chinese city set sit together more naturally.'}</p>
              </div>
            </article>
            <article class="dispatch-card info-card">
              <span class="collection-kicker">${lang === 'ko' ? 'Desk notes' : lang === 'ja' ? 'Desk notes' : lang === 'zhHant' ? '編輯筆記' : 'Desk notes'}</span>
              <div class="dispatch-lines">
                <div><strong>${lang === 'ko' ? '도시 무드' : lang === 'ja' ? '都市ムード' : lang === 'zhHant' ? '城市氛圍' : 'City mood'}</strong><span>${lang === 'ko' ? 'Fast city, slow reset, food-led, coast mode로 먼저 좁힙니다.' : lang === 'ja' ? 'Fast city、slow reset、food-led、coast mode のどれに近いかで先に絞ります。' : lang === 'zhHant' ? '先用 fast city、slow reset、food-led、coast mode 這些感覺來縮小。' : 'Filter first by fast city, slow reset, food-led, or coast mode.'}</span></div>
                <div><strong>${lang === 'ko' ? '샘플 흐름' : lang === 'ja' ? 'サンプルの流れ' : lang === 'zhHant' ? '範例節奏' : 'Sample flow'}</strong><span>${lang === 'ko' ? '좋은 일정이 어떤 템포로 보이는지 먼저 읽게 합니다.' : lang === 'ja' ? '良い旅程がどんなテンポで見えるのかを、作る前に先に読めるようにします。' : lang === 'zhHant' ? '先讓你在生成前看懂，一條好的路線會是什麼節奏。' : 'Let readers see how a strong route actually flows before they generate.'}</span></div>
                <div><strong>${lang === 'ko' ? '플래너 연결' : lang === 'ja' ? 'Planner への橋渡し' : lang === 'zhHant' ? '接到 Planner' : 'Planner bridge'}</strong><span>${lang === 'ko' ? '마음에 드는 도시와 무드에서 바로 플래너로 연결됩니다.' : lang === 'ja' ? '気に入った都市やムードから、そのまま Planner へつなげられます。' : lang === 'zhHant' ? '只要遇到喜歡的城市或節奏，就能直接接到 Planner。' : 'Every strong city or route can jump directly into Planner.'}</span></div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="section editorial-dispatch-section magazine-dispatch-section">
        <div class="section-head">
          <div><span class="eyebrow">${lang === 'ko' ? '에디토리얼 디스패치' : lang === 'ja' ? '編集ディスパッチ' : lang === 'zhHant' ? '編輯 dispatch' : 'Editorial dispatches'}</span><h2 class="section-title">${lang === 'ko' ? '지금 바로 출발하기 좋은 운영형 베이스' : lang === 'ja' ? 'いま使いやすい運用型ベース' : lang === 'zhHant' ? '現在就很好用的操作型基底' : 'Operating bases that are worth using right now'}</h2><p class="section-desc">${lang === 'ko' ? '주말, 우천일, 부모님 동행처럼 실제로 자주 쓰는 상황을 기준으로 도시 베이스를 묶었습니다.' : lang === 'ja' ? '週末、雨の日、親との旅など、実際によくある状況を基準に都市ベースをまとめました。' : lang === 'zhHant' ? '這些城市基底是依照週末、雨天、和父母同行這些真的常出現的情境整理的。' : 'These bases are grouped around the situations that actually come up: weekends, rain, parents, and soft pacing.'}</p></div>
          <a class="soft-btn" data-nav="trips">${lang === 'ko' ? '컬렉션으로 보기' : lang === 'ja' ? 'コレクションを見る' : lang === 'zhHant' ? '看收藏架' : 'Open collections'}</a>
        </div>
        <div class="dispatch-edit-grid">
          <article class="dispatch-edit-card feature">
            <span class="collection-kicker">${lang === 'ko' ? '주말 데스크' : lang === 'ja' ? '週末デスク' : lang === 'zhHant' ? '週末編輯桌' : 'Weekend desk'}</span>
            <h3>${lang === 'ko' ? 'Tokyo dense weekend, 그런데 너무 빡빡하지 않게' : lang === 'ja' ? '密度はあるけれど詰め込みすぎない東京週末ベース' : lang === 'zhHant' ? '高密度但不會過滿的東京週末基底' : 'Tokyo dense weekend, without making it feel overpacked'}</h3>
            <p>${lang === 'ko' ? '대표 지역은 챙기되, 하루 한 구간은 숨을 쉬게 두는 2박 3일 베이스입니다.' : lang === 'ja' ? '主要エリアは押さえつつ、毎日にひとつやわらかい余白を残す2泊3日の東京ベースです。' : lang === 'zhHant' ? '保留代表區域，但每天都留一段能喘口氣的節奏，是這個東京 2晚3天基底的重點。' : 'A 2-night Tokyo base that still hits the big districts but leaves one softer pocket each day.'}</p>
            <div class="trip-mini-chip-row"><span class="trip-mini-chip">Tokyo</span><span class="trip-mini-chip">2N3D</span><span class="trip-mini-chip">${lang === 'ko' ? '주말' : lang === 'ja' ? '週末' : lang === 'zhHant' ? '週末' : 'Weekend'}</span></div>
            <div class="cta-row"><button class="primary-btn" data-start-city="Tokyo">${lang === 'ko' ? '플래너로 시작' : lang === 'ja' ? 'Planner で始める' : lang === 'zhHant' ? '在 Planner 開始' : 'Start in Planner'}</button><a class="secondary-btn" href="../example/tokyo-3n4d-first-trip.html">${lang === 'ko' ? '샘플 보기' : lang === 'ja' ? 'サンプルを見る' : lang === 'zhHant' ? '看範例' : 'Read sample route'}</a></div>
          </article>
          <article class="dispatch-edit-card">
            <span class="collection-kicker">${lang === 'ko' ? '우천일 노트' : lang === 'ja' ? '雨の日ノート' : lang === 'zhHant' ? '雨天筆記' : 'Rainy-day note'}</span>
            <h3>${lang === 'ko' ? 'Seoul rainy-day fallback' : lang === 'ja' ? '雨の日でも崩れにくいソウルの代替ベース' : lang === 'zhHant' ? '下雨天也不容易失衡的首爾替代基底' : 'Seoul rainy-day fallback'}</h3>
            <p>${lang === 'ko' ? '실내 밀도와 동네 이동을 가볍게 유지하는 서울 우천일 베이스입니다.' : lang === 'ja' ? '室内の密度を保ちながら、街区の移動を軽くつなぐソウルの雨の日ベースです。' : lang === 'zhHant' ? '這是把室內密度和街區移動都維持得更輕一些的首爾雨天基底。' : 'A Seoul fallback that stays indoor-friendly while keeping the neighborhood line intact.'}</p>
            <div class="cta-row compact-actions"><button class="ghost-btn" data-start-city="Seoul">${lang === 'ko' ? '플래너로 시작' : lang === 'ja' ? 'Planner で始める' : lang === 'zhHant' ? '在 Planner 開始' : 'Start in Planner'}</button><a class="soft-link" href="../city/seoul.html">${lang === 'ko' ? '도시 가이드' : lang === 'ja' ? '都市ガイド' : lang === 'zhHant' ? '城市指南' : 'City guide'}</a></div>
          </article>
          <article class="dispatch-edit-card">
            <span class="collection-kicker">${lang === 'ko' ? '가족 페이스' : lang === 'ja' ? '家族ペース' : lang === 'zhHant' ? '家庭節奏' : 'Family pace'}</span>
            <h3>${lang === 'ko' ? 'Jeju easy pace with parents' : lang === 'ja' ? '親と行く、やわらかな済州ペース' : lang === 'zhHant' ? '和父母同行的濟州輕鬆節奏' : 'Jeju easy pace with parents'}</h3>
            <p>${lang === 'ko' ? '이동은 단순하게, 풍경과 식사는 충분히 남기는 느린 제주 베이스입니다.' : lang === 'ja' ? '移動はシンプルに、景色と食事、休憩の余白を残すゆるやかな済州ベースです。' : lang === 'zhHant' ? '移動保持簡單，把風景、用餐和休息的空間都留出來的濟州慢節奏基底。' : 'A slower Jeju base with simple movement, enough scenery, and room for meals and rest.'}</p>
            <div class="cta-row compact-actions"><button class="ghost-btn" data-start-city="Jeju">${lang === 'ko' ? '플래너로 시작' : lang === 'ja' ? 'Planner で始める' : lang === 'zhHant' ? '在 Planner 開始' : 'Start in Planner'}</button><a class="soft-link" href="../city/jeju.html">${lang === 'ko' ? '도시 가이드' : lang === 'ja' ? '都市ガイド' : lang === 'zhHant' ? '城市指南' : 'City guide'}</a></div>
          </article>
        </div>
      </section>

      <section class="section magazine-loop-section">
        <div class="section-head"><div><span class="eyebrow">${data.loopEyebrow}</span><h2 class="section-title">${data.loopTitle}</h2><p class="section-desc">${data.loopDesc}</p></div></div>
        <div class="magazine-loop-grid"><article class="loop-main-card info-card" id="magazineLoopMain"></article><aside class="loop-side-card info-card" id="magazineLoopSide"></aside></div>
      </section>
      <section class="section city-finder-section" id="cityFinder">
        <div class="section-head"><div><span class="eyebrow">${data.finderEyebrow}</span><h2 class="section-title">${data.finderTitle}</h2><p class="section-desc">${data.finderDesc}</p></div></div>
        <div class="finder-toolbar info-card">
          <input id="magazineCitySearch" class="input finder-search" placeholder="${data.finderSearchPH}">
          <div class="finder-group"> <button class="tab-btn active" data-country-filter="all">${data.countryAll}</button><button class="tab-btn" data-country-filter="japan">${data.countryJapan}</button><button class="tab-btn" data-country-filter="korea">${data.countryKorea}</button></div>
          <div class="finder-group"> <button class="tab-btn active" data-vibe-filter="all">${data.vibeAll}</button><button class="tab-btn" data-vibe-filter="fast">${data.vibeFast}</button><button class="tab-btn" data-vibe-filter="slow">${data.vibeSlow}</button><button class="tab-btn" data-vibe-filter="food">${data.vibeFood}</button><button class="tab-btn" data-vibe-filter="coast">${data.vibeCoast}</button></div>
        </div>
        <div class="magazine-grid featured-grid">${cityMarkup}</div>
        <div class="finder-empty info-card" id="finderEmptyState" hidden><h3>${data.emptyTitle}</h3><p>${data.emptyDesc}</p></div>
      </section>
      <section class="section editorial-bento">
        <div class="section-head"><div><span class="eyebrow">${data.curatedEyebrow}</span><h2 class="section-title">${data.curatedTitle}</h2><p class="section-desc">${data.curatedDesc}</p></div></div>
        <div class="bento-grid">
          <article class="bento-card feature info-card bento-dark"><span class="collection-kicker">${data.bentoFeatureKicker}</span><h3>${data.bentoFeatureTitle}</h3><p>${data.bentoFeatureDesc}</p><div class="cta-row"><a class="secondary-btn" href="../example/tokyo-3n4d-first-trip.html">${data.readSample}</a><button class="ghost-btn on-dark" data-start-city="Tokyo">${data.usePlanner}</button></div></article>
          <article class="bento-card info-card"><span class="collection-kicker">${data.parentsKicker}</span><h3>${data.parentsTitle}</h3><p>${data.parentsDesc}</p><a class="soft-link" href="../example/busan-2n3d-with-parents.html">${data.openBusan}</a></article>
          <article class="bento-card info-card"><span class="collection-kicker">${data.slowKicker}</span><h3>${data.slowTitle}</h3><p>${data.slowDesc}</p><a class="soft-link" href="../example/kyoto-2n3d-slow-trip.html">${data.openKyoto}</a></article>
          <article class="bento-card info-card tips-card-wide"><span class="collection-kicker">${data.howKicker}</span><div class="tips-inline-grid">${data.howSteps.map(step => `<div><strong>${step[0]}</strong><span>${step[1]}</span></div>`).join('')}</div></article>
        </div>
      </section>
      <section class="section utility-banner utility-banner-large"><div><h3>${data.bannerTitle}</h3><p>${data.bannerDesc}</p></div><div class="cta-row"><a class="primary-btn" data-nav="planner">${data.bannerPlanner}</a><a class="secondary-btn" data-nav="trips">${data.bannerTrips}</a></div></section>
    `;
    document.title = data.title;
    applyTranslations(root);
    document.querySelectorAll('[data-nav="planner"]').forEach(a => a.setAttribute('href', navHref('planner')));
    document.querySelectorAll('[data-nav="trips"]').forEach(a => a.setAttribute('href', navHref('trips')));
    root.querySelectorAll('[data-start-city]').forEach(btn => btn.addEventListener('click', () => { location.href = plannerUrlForCity(btn.dataset.startCity || ''); }));
  }

  function renderMagazineLoop(){
    if (location.pathname.includes('/city/') || location.pathname.includes('/example/')) return;
    const main = document.getElementById('magazineLoopMain');
    const side = document.getElementById('magazineLoopSide');
    if (!main || !side) return;
    const data = editorialData.magazine[lang] || editorialData.magazine.en;
    const saved = window.RyokoStorage?.getSavedTrips?.() || [];
    const recent = window.RyokoStorage?.getRecentTrips?.() || [];
    const base = recent[0] || saved[0] || null;
    if (!base) {
      main.innerHTML = `<span class="eyebrow">${data.loopFreshEyebrow}</span><h3>${data.loopFreshTitle}</h3><p>${data.loopFreshDesc}</p><div class="card-actions"><a class="primary-btn" href="../city/tokyo.html">${data.loopFreshA}</a><a class="secondary-btn" href="../">${data.loopFreshB}</a></div>`;
      side.innerHTML = `<h3>${data.loopSideTitle}</h3><div class="trip-loop-list">${data.loopSideItems.map(item => `<div class="trip-loop-item">${item}</div>`).join('')}</div>`;
      return;
    }
    const city = getCityLoopData(base.destination || '') || getCityLoopData('Tokyo');
    const related = getRelatedCities(base.destination || city.name).slice(0,3);
    main.innerHTML = `<span class="eyebrow">${base.destination || city.name}</span><h3>${lang === 'ko' ? '최근 본 도시에서 다음 흐름으로' : lang === 'ja' ? '最近見た都市から次の流れへ' : lang === 'zhHant' ? '從最近看過的城市，接到下一個節奏' : 'From your recent trip into the next branch'}</h3><p>${lang === 'ko' ? `최근 여정 ${base.title || base.destination}을 기준으로, 연결감 좋은 다음 도시를 보여드립니다.` : `Using ${base.title || base.destination} as context, here are smoother next branches.`}</p><div class="card-actions"><a class="primary-btn" href="../${city.guide}">${lang === 'ko' ? '도시 가이드 다시 보기' : lang === 'ja' ? '都市ガイドをもう一度開く' : lang === 'zhHant' ? '重新打開城市指南' : 'Reopen city guide'}</a><a class="secondary-btn" href="${plannerUrlForCity(city.name)}">${lang === 'ko' ? '같은 도시 다시 짜기' : lang === 'ja' ? '同じ都市でもう一度組む' : lang === 'zhHant' ? '重新規劃同一座城市' : 'Plan the same city'}</a></div>`;
    side.innerHTML = `<h3>${lang === 'ko' ? '다음으로 잘 이어지는 도시' : lang === 'ja' ? '次につながりやすい都市' : lang === 'zhHant' ? '下一站很順的城市' : 'Cities that connect well next'}</h3><div class="trip-loop-list">${related.map(item => `<a class="trip-loop-item" href="../${item.guide}"><strong>${item.name}</strong><span>${item.vibe}</span></a>`).join('')}</div>`;
  }


  function renderCityModules(citySlug, cityName){
    const entry = citySectionMap[citySlug];
    const data = entry?.[lang] || entry?.en;
    if (!data) return '';
    const blocks = (data.modules || []).map(block => {
      const rows = (block.items || []).map(item => `<li><strong>${item[0]}</strong><span>${item[1]}</span></li>`).join('');
      return `<article class="info-card editorial-panel city-module-card city-module-${block.type}"><div class="section-head compact"><div><div class="editorial-kicker">${data.moduleEyebrow}</div><h2 class="section-title">${block.title}</h2><p class="section-desc">${data.moduleDesc}</p></div></div><ul class="editorial-pair-list">${rows}</ul></article>`;
    }).join('');
    return `<section class="section city-modules-band"><div class="section-head"><div><span class="eyebrow">${data.moduleEyebrow}</span><h2 class="section-title">${data.moduleTitle}</h2><p class="section-desc">${data.moduleDesc}</p></div></div><div class="city-module-grid">${blocks}</div></section>`;
  }

  function renderCityOps(citySlug){
    const entry = cityOpsMap[citySlug];
    const data = entry?.[lang] || entry?.en;
    if (!data) return '';
    return `<section class="section city-ops-band"><div class="section-head"><div><span class="eyebrow">${data.eyebrow}</span><h2 class="section-title">${data.title}</h2><p class="section-desc">${data.desc}</p></div></div><div class="city-ops-grid">${(data.cards||[]).map(card => `<article class="info-card editorial-panel city-ops-card"><span class="city-ops-label">${card.label}</span><h3>${card.title}</h3><p>${card.body}</p></article>`).join('')}</div></section>`;
  }

  function renderExampleOps(slug){
    const entry = editorialData.example[slug];
    if (!entry) return '';
    const data = entry[lang] || entry.en;
    if (!data) return '';
    const labels = { eyebrow: lang === 'ko' ? '루트 프레임' : lang === 'ja' ? 'ルートの見取り図' : lang === 'zhHant' ? '路線框架' : 'Route frame', route: lang === 'ko' ? '루트 구조' : lang === 'ja' ? 'ルートの流れ' : lang === 'zhHant' ? '路線節奏' : 'Route shape', energy: lang === 'ko' ? '에너지 조절' : lang === 'ja' ? '体力の配分' : lang === 'zhHant' ? '體力分配' : 'Energy control', swap: lang === 'ko' ? '바꿔 끼우기' : lang === 'ja' ? '入れ替えのコツ' : lang === 'zhHant' ? '替換方式' : 'Swap if needed', best: lang === 'ko' ? '잘 맞는 경우' : lang === 'ja' ? '相性がいい旅' : lang === 'zhHant' ? '最適情境' : 'Best with', why: lang === 'ko' ? '이 구조가 잘 먹히는 이유' : lang === 'ja' ? 'この構成がうまく働く理由' : lang === 'zhHant' ? '這個節奏有效的原因' : 'Why this route works' };
    return `
      <section class="section example-ops-section"><article class="info-card editorial-panel editorial-panel-contrast"><div class="section-head"><div><div class="editorial-kicker">${labels.eyebrow}</div><h2 class="section-title">${data.routeShape}</h2><p class="section-desc">${data.energyControl}</p></div></div><div class="city-ops-grid example-ops-grid"><article class="city-ops-card"><span class="city-ops-label">${labels.route}</span><h3>${data.routeShape}</h3><p>${data.bestWith}</p></article><article class="city-ops-card"><span class="city-ops-label">${labels.energy}</span><h3>${data.energyControl}</h3><p>${data.swapNote}</p></article><article class="city-ops-card"><span class="city-ops-label">${labels.best}</span><h3>${data.bestWith}</h3><p>${lang === 'ko' ? '도시 무드와 동행 조합이 잘 맞을 때 이 샘플이 가장 자연스럽습니다.' : lang === 'ja' ? '都市ムードと同行者の組み合わせが合っていると、このサンプルは最も自然にはまります。' : lang === 'zhHant' ? '當城市氛圍和同行組合本來就合時，這個範例會最自然。' : 'This sample lands best when the city mood and companion setup already match.'}</p></article></div><div class="editorial-lines editorial-lines-strong example-logic-lines">${data.whyBullets.map(item => `<div class="editorial-line"><strong>${labels.why}</strong><span>${item}</span></div>`).join('')}</div></article></section>`;
  }


  function renderCityPage(){
    const slug = document.body.dataset.citySlug;
    if (!slug) return;
    const entry = editorialData.city[slug];
    if (!entry) return;
    const data = entry[lang] || entry.en;
    const root = document.getElementById('cityPageRoot');
    if (!root) return;
    const guideLabel = lang === 'ko' ? '도시 가이드' : lang === 'ja' ? '都市ガイド' : lang === 'zhHant' ? '城市指南' : 'City Guide';
    root.innerHTML = `
      <section class="city-detail-hero hero-card city-hero-polish city-hero-magazine cover-system-shell cover-system-shell-city city-hero--${slug}">
        <div class="city-detail-copy city-copy-magazine cover-copy-column"><div class="cover-meta-row"><span class="cover-meta-pill">${uiText('cityGuide')}</span><span class="cover-meta-pill">${entry.planner}</span></div><span class="eyebrow">${data.eyebrow}</span><h1>${entry.planner}</h1><p class="city-detail-lead">${data.lead}</p><div class="city-strapline">${(getCityVoice(entry.planner)?.strap || '')}</div><div class="mini-vibe-row">${data.chips.map(ch => `<span class="mini-vibe-chip">${ch}</span>`).join('')}</div><div class="city-voice-strip"><span class="city-voice-pill"><strong>${lang === 'ko' ? '좋은 점' : lang === 'ja' ? '良いところ' : lang === 'zhHant' ? '適合重點' : 'Rewards'}</strong><span>${(getCityVoice(entry.planner)?.reward || '')}</span></span><span class="city-voice-pill"><strong>${lang === 'ko' ? '주의할 점' : lang === 'ja' ? '気をつけたい点' : lang === 'zhHant' ? '留意重點' : 'Watch'}</strong><span>${(getCityVoice(entry.planner)?.watch || '')}</span></span><span class="city-voice-pill"><strong>${lang === 'ko' ? '무드' : lang === 'ja' ? 'トーン' : lang === 'zhHant' ? '氛圍' : 'Tone'}</strong><span>${(getCityVoice(entry.planner)?.mood || '')}</span></span></div><div class="cover-note-line"><strong>${uiText('coverNote')}</strong><span>${data.whyDesc}</span></div><div class="hero-actions hero-actions-strong cover-actions-row"><a class="primary-btn" href="${plannerUrlForCity(entry.planner)}">${lang === 'ko' ? entry.planner + ' 여행 짜기' : lang === 'ja' ? entry.planner + ' の旅を作る' : lang === 'zhHant' ? '規劃 ' + entry.planner + ' 旅程' : 'Plan ' + entry.planner}</a><a class="ghost-btn" href="../example/${entry.example}">${lang === 'ko' ? '샘플 일정 보기' : lang === 'ja' ? 'サンプル旅程を見る' : lang === 'zhHant' ? '看範例行程' : 'See sample plan'}</a></div></div>
        <div class="city-detail-visual city-visual-stack cover-visual-column"><img src="../${entry.image}" alt="${entry.planner}"><div class="glass-note strong"><strong>${data.why}</strong><span>${data.bestFor}</span></div><div class="visual-stack-card route-card dark strong"><strong>${uiText('readFirst')}</strong><span>${(getCityVoice(entry.planner)?.strap || data.pace)}</span></div><div class="visual-stack-card light city-stack-meta"><strong>${uiText('bestSeason')}</strong><span>${data.season}</span></div></div>
      </section>
      <section class="section city-quicknav-wrap"><div class="city-quicknav"><a class="jump-chip" href="#city-overview">${uiText('overview')}</a><a class="jump-chip" href="#city-districts">${uiText('districts')}</a><a class="jump-chip" href="#city-neighborhoods">${lang === 'ko' ? '동네 픽' : lang === 'ja' ? '近所のピック' : lang === 'zhHant' ? '鄰里精選' : 'Neighborhood picks'}</a><a class="jump-chip" href="#city-sample">${uiText('sample')}</a><a class="jump-chip" href="#city-tips">${lang === 'ko' ? '팁' : lang === 'ja' ? 'ヒント' : lang === 'zhHant' ? '小提示' : 'Tips'}</a></div></section>
      <section class="section city-overview-composition" id="city-overview"><div class="city-overview-lead"><div class="editorial-kicker">${uiText('overview')}</div><h2 class="section-title">${lang === 'ko' ? entry.planner + '를 읽는 첫 장면' : lang === 'ja' ? entry.planner + ' を読む最初の場面' : lang === 'zhHant' ? '讀 ' + entry.planner + ' 的第一個畫面' : 'The first read of ' + entry.planner}</h2><p class="section-desc">${data.whyDesc}</p></div><div class="city-meta-strip"><article class="meta-card feature"><span class="meta-label">${lang === 'ko' ? '잘 맞는 여행' : lang === 'ja' ? '向いている旅' : lang === 'zhHant' ? '適合的旅程' : 'Best for'}</span><span class="meta-value">${data.bestFor}</span></article><article class="meta-card"><span class="meta-label">${lang === 'ko' ? '추천 페이스' : lang === 'ja' ? 'おすすめのペース' : lang === 'zhHant' ? '建議節奏' : 'Suggested pace'}</span><span class="meta-value">${data.pace}</span></article><article class="meta-card"><span class="meta-label">${uiText('bestSeason')}</span><span class="meta-value">${data.season}</span></article></div></section>
      ${renderCityModules(slug, entry.planner)}
      ${renderCityOps(slug)}
      <section class="section city-reading-grid city-reading-grid-rich" id="city-districts"><article class="info-card editorial-panel"><div class="section-head compact"><div><div class="editorial-kicker">${lang === 'ko' ? '어디서 시작할지' : lang === 'ja' ? 'どこから始めるか' : lang === 'zhHant' ? '從哪裡開始' : 'Where to start'}</div><h2 class="section-title">${data.focusTitle}</h2><p class="section-desc">${data.focusDesc}</p></div></div><div class="district-grid district-grid-rich">${data.districts.map((d,i) => `<article class="district-card info-card district-card-rich"><span class="district-index">0${i+1}</span><span class="district-label">${lang === 'ko' ? '추천 구역' : lang === 'ja' ? 'おすすめエリア' : lang === 'zhHant' ? '推薦區域' : 'District pick'}</span><h3>${d[0]}</h3><p>${d[1]}</p></article>`).join('')}</div></article><article class="info-card editorial-panel editorial-panel-contrast"><div class="section-head compact"><div><div class="editorial-kicker">${lang === 'ko' ? '이 도시의 결' : lang === 'ja' ? '街の空気感' : lang === 'zhHant' ? '城市氣氛' : 'How it feels'}</div><h2 class="section-title">${data.foodTitle}</h2><p class="section-desc">${data.foodDesc}</p></div></div><ul class="editorial-bullets">${data.foodBullets.map(item => `<li>${item}</li>`).join('')}</ul><div class="editorial-budget-note"><strong>${lang === 'ko' ? '예산 감각' : lang === 'ja' ? '予算感' : lang === 'zhHant' ? '預算感受' : 'Budget feel'}</strong><p>${data.budgetFeel}</p></div></article></section>
      <section class="section city-section-band"><article class="cover-story-card story-band"><div class="editorial-kicker">${lang === 'ko' ? '편집 메모' : lang === 'ja' ? '編集メモ' : lang === 'zhHant' ? '編輯筆記' : 'Editorial note'}</div><h3>${lang === 'ko' ? '좋은 여행은 장소보다 도시의 템포를 먼저 맞출 때 선명해집니다' : lang === 'ja' ? '良い旅は、場所の数より先に街のテンポが合うと輪郭がはっきりします' : lang === 'zhHant' ? '好的旅程，通常是在清單之前先把城市節奏對上' : 'Trips get clearer when the city tempo lands before the checklist does'}</h3><p>${data.lead}</p></article></section>
      ${(() => {
        const atlasLocale = atlasLocaleMap[lang]?.[slug] || null;
        const picks = getCityNeighborhoodProfiles(slug, data, atlasLocale);
        const picksIntro = lang === 'ko' ? 'City atlas에서 보던 동네 픽을 상세 가이드 안에서도 district와 함께 이어 읽을 수 있게 확장했습니다.' : lang === 'ja' ? 'City atlas で見た近所のピックを、この詳細ガイドの中でも district と一緒に読み継げるよう広げました。' : lang === 'zhHant' ? '把 City atlas 先看到的鄰里精選，直接延伸到這份詳細指南裡，並和 district 一起讀。' : 'The neighborhood picks from City atlas continue here with district depth, so the city still reads in one order.';
        const picksDesc = lang === 'ko' ? '먼저 읽기 좋은 동네와 연결 district, 들어가기 좋은 시간대를 같이 묶었습니다.' : lang === 'ja' ? '入りやすい近所、つながる district、相性のいい時間帯を一つの束で読めるようにしました。' : lang === 'zhHant' ? '把最適合先讀的近所、連動 district、以及最適時段放在同一個閱讀節奏裡。' : 'Each card ties the first neighborhood read to a district anchor and an easy entry window.';
        return `<section class="section city-neighborhood-bridge" id="city-neighborhoods"><article class="info-card editorial-panel editorial-panel-soft"><div class="section-head compact"><div><div class="editorial-kicker">${lang === 'ko' ? '동네 픽' : lang === 'ja' ? '近所のピック' : lang === 'zhHant' ? '鄰里精選' : 'Neighborhood picks'}</div><h2 class="section-title">${lang === 'ko' ? entry.planner + '를 여는 첫 동네들' : lang === 'ja' ? entry.planner + ' を開く最初の近所' : lang === 'zhHant' ? '打開 ' + entry.planner + ' 的第一批近所' : 'The neighborhoods that open ' + entry.planner}</h2><p class="section-desc">${picksIntro}</p></div></div><p class="city-neighborhood-intro">${picksDesc}</p><div class="city-neighborhood-grid city-neighborhood-grid-deep">${picks.map((item, i) => `<article class="city-neighborhood-card city-neighborhood-card-deep"><span class="district-index">0${i+1}</span><strong>${item.name}</strong><p>${item.note}</p><div class="city-neighborhood-meta"><span><strong>${item.linkedLabel}</strong>${item.district}</span><span><strong>${item.bestLabel}</strong>${item.window}</span></div><div class="city-neighborhood-deeper"><span class="mini-label">${item.routeLabel}</span><small>${item.deeper}</small></div></article>`).join('')}</div></article></section>${renderPriorityCityDepthSection(slug, entry)}`;
      })()}
      <section class="section" id="city-sample"><div class="section-head"><div><div class="editorial-kicker">${lang === 'ko' ? '샘플 루트' : lang === 'ja' ? 'サンプルルート' : lang === 'zhHant' ? '範例路線' : 'Sample'}</div><h2 class="section-title">${data.sampleTitle}</h2><p class="section-desc">${data.sampleDesc}</p></div></div><article class="example-card info-card example-card-strong example-card-expanded"><div class="editorial-kicker">${lang === 'ko' ? '샘플 일정' : lang === 'ja' ? 'サンプル旅程' : lang === 'zhHant' ? '範例行程' : 'Sample itinerary'}</div><h3 class="editorial-example-title">${entry.planner}</h3><div class="example-summary editorial-summary timeline-style">${data.sampleDays.map((day, i) => `<div class="summary-line editorial-line timeline-line"><span class="timeline-index">0${i+1}</span><div><strong>${day[0]}</strong><span>${day[1]}</span></div></div>`).join('')}</div><div class="city-route-variations"><div class="section-head compact"><div><div class="editorial-kicker">${lang === 'ko' ? '루트 변주' : lang === 'ja' ? 'ルートの変奏' : lang === 'zhHant' ? '路線變奏' : 'Route variations'}</div><h3 class="section-title">${lang === 'ko' ? entry.planner + '를 바꾸는 세 가지 방식' : lang === 'ja' ? entry.planner + ' を変える3つの方法' : lang === 'zhHant' ? '改寫 ' + entry.planner + ' 的三種方式' : 'Three ways to reshape ' + entry.planner}</h3><p class="section-desc">${lang === 'ko' ? '날씨, 속도, 밤 리듬에 따라 sample route를 바로 바꿔 읽을 수 있게 묶었습니다.' : lang === 'ja' ? '天気、速度感、夜のリズムに合わせてサンプルをすぐ曲げられるようにまとめました。' : lang === 'zhHant' ? '依照天氣、節奏與夜晚比重，這條 sample route 可以這樣直接改寫。' : 'Use these as quick switches when weather, speed, or the night rhythm changes.'}</p></div></div><div class="city-route-variation-grid">${getCityRouteVariations(slug).map(item => `<article class="city-route-variation-card"><span class="mini-label">${item.title}</span><strong class="city-route-variation-focus">${item.focus || ''}</strong><p>${item.desc}</p><div class="card-actions city-route-variation-actions"><a class="soft-link" href="${item.href || ('../city/' + cityGuideSlugFromExample(slug) + '.html')}">${lang === 'ko' ? '도시 가이드에서 이어 보기' : lang === 'ja' ? '都市ガイドで続きを読む' : lang === 'zhHant' ? '到城市指南繼續看' : 'Continue in city guide'}</a></div></article>`).join('')}</div></div>${renderPriorityExampleDepthSection(slug, entry)}${renderPriorityCrosslinks(cityGuideSlugFromExample(slug), 'example')}${renderPriorityCrosslinks(slug, 'city')}<div class="cta-row cta-row-priority"><a class="primary-btn" href="../example/${entry.example}">${lang === 'ko' ? '전체 샘플 열기' : lang === 'ja' ? 'サンプル全体を開く' : lang === 'zhHant' ? '打開完整範例' : 'Open full example'}</a><a class="soft-btn" href="${plannerUrlForCity(entry.planner)}">${lang === 'ko' ? '플래너에서 커스텀' : lang === 'ja' ? 'Planner で調整する' : lang === 'zhHant' ? '在 Planner 裡調整' : 'Customize in Planner'}</a><a class="ghost-btn" href="../city/${cityGuideSlugFromExample(slug)}.html">${lang === 'ko' ? '도시 가이드로 돌아가기' : lang === 'ja' ? '都市ガイドへ戻る' : lang === 'zhHant' ? '回到城市指南' : 'Back to city guide'}</a></div></article></section>
      <section class="section city-reading-grid city-reading-grid-rich" id="city-tips"><article class="info-card editorial-panel"><div class="section-head compact"><div><div class="editorial-kicker">${uiText('localNotes')}</div><h2 class="section-title">${uiText('localTips')}</h2><p class="section-desc">${lang === 'ko' ? '작은 조정만으로도 여행 체감이 확실히 좋아집니다.' : lang === 'ja' ? '小さな工夫だけで旅の快適さがかなり変わります。' : lang === 'zhHant' ? '只要做一些小調整，整體旅行體感就會明顯更好。' : 'Small adjustments that noticeably improve the trip.'}</p></div></div><ul class="editorial-bullets">${data.tips.map(item => `<li>${item}</li>`).join('')}</ul></article><article class="info-card editorial-panel editorial-panel-soft"><div class="section-head compact"><div><div class="editorial-kicker">${uiText('beforeYouGo')}</div><h2 class="section-title">${uiText('keepInMind')}</h2><p class="section-desc">${lang === 'ko' ? '출발 전에 챙겨두면 바로 체감되는 것들입니다.' : lang === 'ja' ? '出発前に整えておくと、すぐ効いてくるポイントです。' : lang === 'zhHant' ? '出發前先準備好，旅途中會立刻感受到差別。' : 'Small prep choices that pay off immediately.'}</p></div></div><ul class="editorial-bullets">${data.keep.map(item => `<li>${item}</li>`).join('')}</ul></article></section>
      ${(() => { const seasonal = getSeasonalCityFeature(entry.planner); return seasonal ? `<section class="section city-seasonal-bridge"><article class="info-card seasonal-bridge-card"><div class="section-head compact"><div><div class="editorial-kicker">${seasonal.label}</div><h2 class="section-title">${seasonal.title}</h2><p class="section-desc">${seasonal.desc}</p></div></div><div class="trip-chip-row seasonal-chip-row">${seasonal.chips.map(ch => `<span class="trip-mini-chip">${ch}</span>`).join('')}</div></article></section>` : ''; })()}
      <section class="section footer-cta info-card city-final-cta"><div class="editorial-kicker">${uiText('nextMove')}</div><h2>${data.finalTitle}</h2><p>${data.finalDesc}</p><div class="cta-row cta-row-priority"><a class="primary-btn" href="${plannerUrlForCity(entry.planner)}">${lang === 'ko' ? '플래너 열기' : lang === 'ja' ? 'プランナーを開く' : lang === 'zhHant' ? '打開 Planner' : 'Open Planner'}</a><a class="secondary-btn" href="../example/${entry.example}">${lang === 'ko' ? '샘플 읽기' : lang === 'ja' ? 'サンプルを読む' : lang === 'zhHant' ? '讀範例路線' : 'Read sample route'}</a><a class="ghost-btn" href="${exampleAtlasHref()}">${lang === 'ko' ? 'atlas 보기' : lang === 'ja' ? 'atlas を見る' : lang === 'zhHant' ? '看 atlas' : 'See atlas'}</a></div></section>
      <div class="footer">Ryokoplan ${guideLabel}</div>`;
    document.title = `${entry.planner} — Ryokoplan`;
  }

  function renderExamplePage(){
    const slug = document.body.dataset.exampleSlug;
    if (!slug) return;
    const entry = editorialData.example[slug];
    const city = editorialData.city[slug.split('-').slice(0,1)[0]] || editorialData.city[(entry?.city || '').toLowerCase()];
    if (!entry || !city) return;
    const cityData = city[lang] || city.en;
    const sample = cityData.sampleDays || [];
    const root = document.getElementById('examplePageRoot');
    if (!root) return;
    const title = lang === 'ko' ? entry.titleKo : entry.titleEn;
    const lead = lang === 'ko' ? entry.koLead : entry.enLead;
    root.innerHTML = `
      <section class="city-detail-hero hero-card city-hero-polish city-hero-magazine cover-system-shell cover-system-shell-example example-hero--${slug}"><div class="city-detail-copy city-copy-magazine cover-copy-column"><div class="cover-meta-row"><span class="cover-meta-pill">${uiText('planExample')}</span><span class="cover-meta-pill">${entry.city}</span></div><span class="eyebrow">${lang === 'ko' ? '일정 예시' : lang === 'ja' ? '旅程サンプル' : lang === 'zhHant' ? '行程範例' : 'Plan Example'}</span><h1>${title}</h1><p class="city-detail-lead">${lead}</p><div class="mini-vibe-row"><span class="mini-vibe-chip">${entry.city}</span><span class="mini-vibe-chip">${cityData.pace}</span><span class="mini-vibe-chip">${cityData.bestFor.split(',')[0]}</span></div><div class="cover-note-line"><strong>${lang === 'ko' ? '이 베이스로 시작' : lang === 'ja' ? 'このベースを使う' : lang === 'zhHant' ? '用這個基底開始' : 'Use this as a base'}</strong><span>${lang === 'ko' ? '리스트보다 구조를 가져가고, 도시는 그 도시다운 템포로 남겨두는 편이 좋습니다.' : lang === 'ja' ? 'リストより先に構造を持ち帰り、都市はその街らしいテンポを残す方が向いています。' : lang === 'zhHant' ? '比起帶走清單，更適合先帶走節奏結構，並保留城市本來的步調。' : 'Borrow the structure first, and keep the city in its own natural tempo.'}</span></div><div class="city-strapline compact">${(getCityVoice(entry.city)?.strap || '')}</div><div class="hero-actions hero-actions-strong cover-actions-row"><a class="primary-btn" href="${plannerUrlForCity(entry.city)}">${lang === 'ko' ? '플래너에서 커스텀' : lang === 'ja' ? 'Planner で調整する' : lang === 'zhHant' ? '在 Planner 裡調整' : 'Customize in Planner'}</a><a class="ghost-btn" href="../city/${entry.guide}">${lang === 'ko' ? '도시 가이드 읽기' : lang === 'ja' ? '都市ガイドを読む' : lang === 'zhHant' ? '讀城市指南' : 'Read city guide guide'}</a></div></div><div class="city-detail-visual city-visual-stack cover-visual-column"><img src="../${entry.image}" alt="${title}"><div class="route-card dark strong"><strong>${uiText('exampleItinerary')}</strong><span>${lang === 'ko' ? '하루별 구조, 예산 감각, 현지 팁까지 한 번에.' : lang === 'ja' ? '一日の構造、予算感、現地のヒントまで一度に見られます。' : lang === 'zhHant' ? '一天的節奏、預算感和在地提示，都能一次看完。' : 'Day-by-day structure, budget feel, and local tips in one view.'}</span></div><div class="visual-stack-card light city-stack-meta"><strong>${uiText('cityMood')}</strong><span>${cityData.bestFor.split(',')[0]}</span></div></div></section>
      <section class="section city-quicknav-wrap"><div class="city-quicknav"><a class="jump-chip" href="#example-flow">${lang === 'ko' ? '흐름' : lang === 'ja' ? '流れ' : lang === 'zhHant' ? '節奏' : 'Flow'}</a><a class="jump-chip" href="#example-why">${lang === 'ko' ? 'Why it works' : 'Why it works'}</a><a class="jump-chip" href="#example-next">${uiText('nextMove')}</a></div></section>
      <section class="section city-overview-composition"><div class="city-overview-lead"><div class="editorial-kicker">${uiText('atAGlance')}</div><h2 class="section-title">${lang === 'ko' ? '먼저 이 샘플의 결을 읽어보세요' : lang === 'ja' ? 'まずこのサンプルのトーンを読んでみてください' : lang === 'zhHant' ? '先讀懂這個範例的節奏與語氣' : 'Read the tone of the sample first'}</h2><p class="section-desc">${lang === 'ko' ? '이 예시는 장소 리스트보다 하루 리듬을 가져가는 데 더 큰 가치가 있습니다.' : lang === 'ja' ? 'このサンプルは、場所の一覧というより一日のテンポを見るための土台として使うのが向いています。' : lang === 'zhHant' ? '這個範例比起固定清單，更適合拿來理解一天的節奏。' : 'This example is more useful as a pacing reference than as a strict checklist.'}</p></div><div class="city-meta-strip"><article class="meta-card feature"><span class="meta-label">${lang === 'ko' ? '잘 맞는 여행' : lang === 'ja' ? '向いている旅' : lang === 'zhHant' ? '適合的旅程' : 'Best for'}</span><span class="meta-value">${cityData.bestFor}</span></article><article class="meta-card"><span class="meta-label">${lang === 'ko' ? '추천 페이스' : lang === 'ja' ? 'おすすめのペース' : lang === 'zhHant' ? '建議節奏' : 'Suggested pace'}</span><span class="meta-value">${cityData.pace}</span></article><article class="meta-card"><span class="meta-label">${lang === 'ko' ? '예산 감각' : lang === 'ja' ? '予算感' : lang === 'zhHant' ? '預算感受' : 'Budget feel'}</span><span class="meta-value">${cityData.budgetFeel}</span></article></div></section>
      ${renderCityOps(slug.split('-')[0])}
      ${renderExampleOps(slug)}
      ${renderExampleFlowBridge(slug)}
      <section class="section" id="example-flow"><article class="example-card info-card example-card-strong example-card-expanded"><div class="editorial-kicker">${uiText('dayByDay')}</div><h2 class="section-title">${lang === 'ko' ? '루트는 이렇게 전개됩니다' : lang === 'ja' ? 'ルートはこのテンポで展開します' : lang === 'zhHant' ? '路線會以這個節奏展開' : 'How the route unfolds'}</h2><div class="example-summary editorial-summary timeline-style">${sample.map((day, i) => `<div class="summary-line editorial-line timeline-line"><span class="timeline-index">0${i+1}</span><div><strong>${day[0]}</strong><span>${day[1]}</span></div></div>`).join('')}</div></article></section>
      <section class="section city-reading-grid city-reading-grid-rich" id="example-why"><article class="info-card editorial-panel editorial-panel-contrast"><div class="section-head compact"><div><div class="editorial-kicker">${lang === 'ko' ? '왜 잘 맞는지' : lang === 'ja' ? 'なぜうまくはまるのか' : lang === 'zhHant' ? '為什麼這樣更成立' : 'Why it lands'}</div><h2 class="section-title">${uiText('whyItWorks')}</h2><p class="section-desc">${lang === 'ko' ? '포인트는 많이 보는 게 아니라 도시를 일관되게 느끼게 만드는 것입니다.' : lang === 'ja' ? '大事なのは全部行くことではなく、街を一つの流れとして感じられることです。' : lang === 'zhHant' ? '重點不是把所有地方都塞進去，而是讓整座城市感覺是連成一個節奏。' : 'The point is not to do everything, but to make the city feel coherent.'}</p></div></div><ul class="editorial-bullets">${(editorialData.example[slug]?.[lang] || editorialData.example[slug]?.en || {}).whyBullets.map(item => `<li>${item}</li>`).join('')}</ul></article><article class="info-card editorial-panel editorial-panel-soft"><div class="section-head compact"><div><div class="editorial-kicker">${lang === 'ko' ? '편집 전에 조정할 점' : lang === 'ja' ? '編集前に整える点' : lang === 'zhHant' ? '正式編排前先調整' : 'Adjust before editing'}</div><h2 class="section-title">${uiText('adjustBeforeEditing')}</h2><p class="section-desc">${lang === 'ko' ? '커스텀 전에 기준으로 삼기 좋은 포인트입니다.' : lang === 'ja' ? '自分用に変える前に、先に押さえておくと良い基準です。' : lang === 'zhHant' ? '在客製之前，先拿來當基準的幾個重點。' : 'Good baseline decisions before you customize it.'}</p></div></div><ul class="editorial-bullets"><li>${(editorialData.example[slug]?.[lang] || editorialData.example[slug]?.en || {}).swapNote}</li><li>${(editorialData.example[slug]?.[lang] || editorialData.example[slug]?.en || {}).energyControl}</li><li>${cityData.keep[0]}</li></ul></article></section>
      <section class="section footer-cta info-card city-final-cta" id="example-next"><div class="editorial-kicker">${uiText('nextMove')}</div><h2>${lang === 'ko' ? '리스트보다 이 루트의 결을 가져가세요' : lang === 'ja' ? 'リストより、このルートのトーンを持ち帰ってください' : lang === 'zhHant' ? '帶走這條路線的節奏，而不只是清單' : 'Take the route logic, not just the list'}</h2><p>${lang === 'ko' ? '플래너에서 일수, 동행, 무드만 바꿔도 같은 결의 다른 여행으로 확장할 수 있습니다.' : lang === 'ja' ? 'Planner では日数、同行者、ムードを変えるだけで、同じトーンの別の旅に広げられます。' : lang === 'zhHant' ? '在 Planner 裡，只要改天數、同行者和氛圍，就能延伸成同樣調性的另一趟旅程。' : 'In Planner, keep the tone but change days, pace, companion, and mood to make it yours.'}</p><div class="cta-row cta-row-priority"><a class="primary-btn" href="${plannerUrlForCity(entry.city)}">${lang === 'ko' ? '플래너 열기' : lang === 'ja' ? 'プランナーを開く' : lang === 'zhHant' ? '打開 Planner' : 'Open Planner'}</a><a class="secondary-btn" href="../city/${cityGuideSlugFromExample(slug)}.html">${lang === 'ko' ? '도시 가이드로 돌아가기' : lang === 'ja' ? '都市ガイドへ戻る' : lang === 'zhHant' ? '回到城市指南' : 'Back to city guide'}</a><a class="ghost-btn" href="${exampleAtlasHref()}">${lang === 'ko' ? 'atlas 보기' : lang === 'ja' ? 'atlas を見る' : lang === 'zhHant' ? '看 atlas' : 'See atlas'}</a></div></section><div class="footer">Ryokoplan Magazine</div>`;
    document.title = `${title} — Ryokoplan`;
  }
  function buildDiscoveryItems(){
    const guideBase = document.body.dataset.page === 'planner' ? '' : '../';
    const items = [
      { kind:'city', slug:'tokyo', title:{ko:'Tokyo dense weekend',en:'Tokyo dense weekend'}, desc:{ko:'짧지만 밀도 있게, 큰 구역 두 개와 한 번의 리셋으로 읽는 도쿄 베이스.',en:'A dense short Tokyo base with two strong zones and one clean reset.'}, tags:['tokyo','japan','weekend','fast','city','friends'], guide:`${guideBase}city/tokyo.html`, example:`${guideBase}example/tokyo-3n4d-first-trip.html`, preset:{destination:'Tokyo',duration:'2n3d',companion:'friends',style:'city highlights + nightlife',notes:'Keep one high-energy block and one slower reset.'}},
      { kind:'city', slug:'kyoto', title:{ko:'Quiet Kyoto reset',en:'Quiet Kyoto reset'}, desc:{ko:'많이 넣지 않고, 오전 장면과 저녁 산책을 남기는 교토 베이스.',en:'A quieter Kyoto base built around early scenes and a softer evening walk.'}, tags:['kyoto','japan','slow','solo','quiet','reset'], guide:`${guideBase}city/kyoto.html`, example:`${guideBase}example/kyoto-2n3d-slow-trip.html`, preset:{destination:'Kyoto',duration:'2n3d',companion:'solo',style:'slow culture + cafes',notes:'Protect the quiet windows and avoid checklist pacing.'}},
      { kind:'edit', slug:'seoul-rain', title:{ko:'Seoul rainy-day fallback',en:'Seoul rainy-day fallback'}, desc:{ko:'비 오는 날에도 무너지지 않는 실내 중심 서울 베이스.',en:'A Seoul fallback built for a rainy day without losing city rhythm.'}, tags:['seoul','korea','rainy','city','fallback','couple'], guide:`${guideBase}city/seoul.html`, example:`${guideBase}example/seoul-2n3d-city-vibes.html`, preset:{destination:'Seoul',duration:'2n3d',companion:'couple',style:'indoor spots + coffee + neighborhoods',notes:'Keep transfers short and let indoor anchors carry the day.'}},
      { kind:'edit', slug:'busan-parents', title:{ko:'Busan with parents',en:'Busan with parents'}, desc:{ko:'뷰 타이밍과 이동 피로를 먼저 생각한 부산 베이스.',en:'A Busan base shaped around view timing and lower fatigue.'}, tags:['busan','korea','parents','easy','coast','family'], guide:`${guideBase}city/busan.html`, example:`${guideBase}example/busan-2n3d-with-parents.html`, preset:{destination:'Busan',duration:'2n3d',companion:'family',style:'sea views + easy pace + local food',notes:'Protect rest windows and avoid stacking hill-heavy stops.'}},
      { kind:'edit', slug:'fukuoka-food', title:{ko:'Fukuoka food weekend',en:'Fukuoka food weekend'}, desc:{ko:'먹고 걷고 쉬는 리듬이 잘 맞는 컴팩트 후쿠오카 베이스.',en:'A compact Fukuoka weekend shaped by food timing and easy walks.'}, tags:['fukuoka','japan','food','weekend','friends','compact'], guide:`${guideBase}city/fukuoka.html`, example:`${guideBase}example/fukuoka-2n3d-food-trip.html`, preset:{destination:'Fukuoka',duration:'2n3d',companion:'friends',style:'local food + cafes + neighborhoods',notes:'Keep it compact and let meals shape the route.'}},
      { kind:'edit', slug:'jeju-soft', title:{ko:'Jeju soft drive base',en:'Jeju soft drive base'}, desc:{ko:'무리한 체크리스트 대신 도로와 풍경의 여백을 남기는 제주 베이스.',en:'A softer Jeju base that leaves room for roads, wind, and wider scenery.'}, tags:['jeju','korea','drive','scenic','parents','coast'], guide:`${guideBase}city/jeju.html`, example:`${guideBase}city/jeju.html`, preset:{destination:'Jeju',duration:'3n4d',companion:'family',style:'scenic drives + cafes + coast',notes:'Give the island more space and do not underweight drive time.'}},
      { kind:'city', slug:'taipei', title:{ko:'Taipei layered night-food base',en:'Taipei layered night-food base'}, desc:{ko:'먹는 리듬과 골목 레이어, 늦은 밤의 무드를 같이 읽는 타이베이 베이스.',en:'A Taipei base built around food rhythm, layered alleys, and softer late-night energy.'}, tags:['taipei','taiwan','food','night','friends','weekend'], guide:`${guideBase}city/taipei.html`, example:`${guideBase}example/taipei-3n4d-night-food.html`, preset:{destination:'Taipei',duration:'3n4d',companion:'friends',style:'food-led neighborhoods + late cafés',notes:'Keep the night strong and the daytime route lighter.'}},
      { kind:'city', slug:'hongkong', title:{ko:'Hong Kong vertical harbor base',en:'Hong Kong vertical harbor base'}, desc:{ko:'항구 장면, 수직 도시감, 밤 리듬을 짧고 강하게 남기는 홍콩 베이스.',en:'A Hong Kong base shaped around harbor scenes, vertical city energy, and sharper nights.'}, tags:['hongkong','harbor','night','city','couple','weekend'], guide:`${guideBase}city/hongkong.html`, example:`${guideBase}example/hongkong-3n4d-harbor-rhythm.html`, preset:{destination:'Hong Kong',duration:'3n4d',companion:'couple',style:'harbor views + food + night city',notes:'Do fewer districts well and protect one afternoon reset.'}},
      { kind:'edit', slug:'macau-short', title:{ko:'Macau compact heritage nights',en:'Macau compact heritage nights'}, desc:{ko:'짧은 체류에 맞춰 광장 스케일, heritage, night close를 compact하게 읽는 마카오 베이스.',en:'A compact Macau base for shorter stays built around square scale, heritage, and one clear night close.'}, tags:['macau','heritage','night','parents','compact'], guide:`${guideBase}city/macau.html`, example:`${guideBase}example/macau-2n3d-heritage-night.html`, preset:{destination:'Macau',duration:'2n3d',companion:'family',style:'heritage walks + local food + soft nights',notes:'Keep one walkable core and do not over-expand the route.'}}
    ];
    return items;
  }


  function communityCardMarkup(item, copy){
    const title = item.title?.[lang] || item.title?.en || item.city || '';
    const desc = item.desc?.[lang] || item.desc?.en || item.summaryKo || item.summaryEn || '';
    const guide = item.guide || item.guideUrl || '#';
    const example = item.example || guide;
    const destination = item.preset?.destination || item.city || '';
    const tags = item.tags || [];
    const label = item.kind === 'club' ? copy.clubLabel : (item.kind === 'pick' ? copy.pickLabel : copy.branchLabel);
    return `
      <article class="community-route-card info-card">
        <div class="community-route-top"><span class="collection-kicker">${label}</span><span class="meta-inline">${destination}</span></div>
        <h3>${title}</h3>
        <p>${desc}</p>
        <div class="trip-chip-row">${tags.slice(0,4).map(tag => `<span class="trip-mini-chip">${tag}</span>`).join('')}</div>
        <div class="card-actions public-route-actions">
          <a class="soft-btn" href="${guide}" data-signal-tags="${tags.join('|')}" data-signal-city="${destination}" data-signal-title="${title}" data-signal-source="community-guide">${copy.guide}</a>
          <a class="ghost-btn" href="${example}" data-signal-tags="${tags.join('|')}" data-signal-city="${destination}" data-signal-title="${title}" data-signal-source="community-sample">${copy.sample}</a>
          <button class="primary-btn community-plan-btn" data-community-preset='${JSON.stringify(item.preset || {})}' data-signal-tags="${tags.join('|')}" data-signal-city="${destination}" data-signal-title="${title}" data-signal-source="community-plan">${copy.save}</button>
        </div>
      </article>`;
  }


  
  function getSeasonalCityFeature(city=''){
    const slug = slugifyCity(city);
    const map = {
      tokyo: {
        ko:{ label:'Seasonal edit', title:'도쿄는 계절보다 시간대를 먼저 고르면 더 편합니다', desc:'벚꽃철이든 연말이든, 도쿄는 오전 앵커와 늦은 저녁 회복 구간을 같이 설계할 때 훨씬 덜 지칩니다.', chips:['Spring clear mornings','Rainy museum pivots','Late-night city glow'] },
        en:{ label:'Seasonal edit', title:'Tokyo improves when you choose the time window before the season', desc:'Whether it is blossom season or a colder city break, Tokyo gets easier when mornings, resets, and late-night energy are edited together.', chips:['Spring clear mornings','Rainy museum pivots','Late-night city glow'] }
      },
      osaka: {
        ko:{ label:'Seasonal edit', title:'오사카는 날씨보다 식사 타이밍이 계절감을 바꿉니다', desc:'더운 계절엔 실내 이동과 식사 간격이 중요하고, 서늘할수록 밤 리듬이 더 살아납니다.', chips:['Summer arcade shelter','Rainy food fallback','Easy night close'] },
        en:{ label:'Seasonal edit', title:'In Osaka, seasonal comfort is shaped by meal timing', desc:'In hotter months the arcades and indoor moves matter more; in cooler stretches the night rhythm lands better.', chips:['Summer arcade shelter','Rainy food fallback','Easy night close'] }
      },
      kyoto: {
        ko:{ label:'Seasonal edit', title:'교토는 성수기보다 조용한 시간대를 잡는 것이 먼저입니다', desc:'봄과 가을이 예쁘더라도, 실제 만족도는 이른 오전과 비워 둔 오후에서 갈립니다.', chips:['Early temple window','Rainy tea-room day','Soft dusk walk'] },
        en:{ label:'Seasonal edit', title:'Kyoto is decided less by peak season than by quiet windows', desc:'Spring and fall look beautiful, but the trip quality usually comes from early starts and open afternoons.', chips:['Early temple window','Rainy tea-room day','Soft dusk walk'] }
      },
      fukuoka: {
        ko:{ label:'Seasonal edit', title:'후쿠오카는 계절이 바뀌어도 컴팩트 리듬이 잘 유지됩니다', desc:'비나 더위가 와도 하카타·텐진 축을 중심으로 route를 짧게 가져가면 만족감이 무너지지 않습니다.', chips:['Rain-proof core','Compact weekend base','Night food axis'] },
        en:{ label:'Seasonal edit', title:'Fukuoka keeps its compact rhythm across seasons', desc:'Even with rain or summer heat, Hakata–Tenjin routes still hold up well when the city core stays compact.', chips:['Rain-proof core','Compact weekend base','Night food axis'] }
      },
      seoul: {
        ko:{ label:'Seasonal edit', title:'서울은 계절보다 동네 조합과 시간대가 더 중요합니다', desc:'우천일, 늦은 밤, 주말 혼잡을 어떻게 피하느냐가 같은 서울 여행의 체감을 크게 바꿉니다.', chips:['Rainy indoor chain','Late-night social edit','Weekend crowd swap'] },
        en:{ label:'Seasonal edit', title:'In Seoul, neighborhood pairing matters more than the season alone', desc:'Rain, late-night routes, and weekend crowd timing can change the same city far more than a seasonal label.', chips:['Rainy indoor chain','Late-night social edit','Weekend crowd swap'] }
      },
      busan: {
        ko:{ label:'Seasonal edit', title:'부산은 계절마다 바다를 읽는 시간대가 달라집니다', desc:'여름엔 해 질 무렵이 중요하고, 흐린 날엔 실내 전망과 카페 리듬으로 바꾸는 편이 낫습니다.', chips:['Summer coast air','Gray-day view swap','Parents easy pace'] },
        en:{ label:'Seasonal edit', title:'Busan changes most through when you read the coast', desc:'In summer the coast opens up near dusk, while gray days often work better with indoor views and cafés.', chips:['Summer coast air','Gray-day view swap','Parents easy pace'] }
      },
      jeju: {
        ko:{ label:'Seasonal edit', title:'제주는 계절보다 날씨와 바람을 먼저 봐야 합니다', desc:'맑은 날 scenic 축을 길게 쓰고, 비나 바람이 세면 드라이브와 실내 포켓을 더 많이 두는 쪽이 좋습니다.', chips:['Wind-aware drives','Rainy café arcs','Soft family pacing'] },
        en:{ label:'Seasonal edit', title:'On Jeju, weather and wind matter before the season label', desc:'Scenic lines can stretch on clear days, but stronger wind and rain call for more cafés and softer driving arcs.', chips:['Wind-aware drives','Rainy café arcs','Soft family pacing'] }
      },
      gyeongju: {
        ko:{ label:'Seasonal edit', title:'경주는 해 질 무렵을 넣을 때 도시가 완성됩니다', desc:'낮 관광만 채우면 얕아지고, 계절이 달라도 저녁 산책과 한옥 무드를 남기면 훨씬 깊어집니다.', chips:['Dusk heritage mood','Rainy hanok fallback','Slow evening close'] },
        en:{ label:'Seasonal edit', title:'Gyeongju becomes fuller when dusk is part of the route', desc:'It can feel thin if the plan ends in daylight only; dusk walks and hanok mood deepen the city across seasons.', chips:['Dusk heritage mood','Rainy hanok fallback','Slow evening close'] }
      }
    };
    const entry = map[slug];
    return entry ? (entry[lang] || entry.en) : null;
  }

  function getSeasonalExampleFeature(city=''){
    const base = getSeasonalCityFeature(city);
    if (!base) return null;
    return {
      label: base.label,
      title: lang === 'ko' ? '이 샘플을 시즌 베이스로 보는 법' : lang === 'ja' ? 'このサンプルを季節ベースとして使う方法' : lang === 'zhHant' ? '把這個範例當成季節基底來看的方法' : 'How to use this as a seasonal base',
      desc: lang === 'ko' ? '이 일정은 도시의 고정 정답이 아니라, 날씨·주말 밀도·동행에 맞게 쉽게 바꿀 수 있는 베이스로 보는 편이 좋습니다.' : lang === 'ja' ? 'この旅程は固定の正解ではなく、天気、週末の密度、同行者に合わせて曲げやすいベースとして見るのが向いています。' : lang === 'zhHant' ? '這份行程不是城市的固定正解，而是能隨天氣、週末密度與同行對象去調整的基底。' : 'This sample works best as a flexible base that can bend with weather, weekend density, and who the trip is for.',
      chips: base.chips
    };
  }

function getSeasonalEditorialCollections(){
    const guideBase = pathRoot === '../' ? '../' : '';
    return {
      cover:[
        { season:'spring', title:{ko:'Spring soft city reset', en:'Spring soft city reset'}, desc:{ko:'벚꽃을 쫓기보다, 걷기 좋은 구간과 늦은 오후 템포를 중심으로 고른 에디트.', en:'A spring edit built around easy walks and late-afternoon tempo instead of a blossom checklist.'}, tags:['spring','soft','city'], guide:`${guideBase}city/kyoto.html`, example:`${guideBase}example/kyoto-2n3d-slow-trip.html`, preset:{destination:'Kyoto',duration:'2n3d',companion:'couple',style:'slow + quiet + spring walks',notes:'Keep spring soft. One temple anchor, one walk, one tea stop.'}},
        { season:'rainy', title:{ko:'Rainy city fallback', en:'Rainy city fallback'}, desc:{ko:'비가 와도 무너지지 않는 동네 조합과 실내 이동을 먼저 잡아둔 에디트.', en:'An edit that protects the trip on rainy days by using stronger indoor transitions and neighborhood pairings.'}, tags:['rainy','indoor','fallback'], guide:`${guideBase}city/seoul.html`, example:`${guideBase}example/seoul-2n3d-city-vibes.html`, preset:{destination:'Seoul',duration:'2n3d',companion:'solo',style:'city vibes + food + indoor pockets',notes:'Rainy-day Seoul with lighter outdoor exposure and stronger indoor flow.'}},
        { season:'summer', title:{ko:'Summer coast breathing room', en:'Summer coast breathing room'}, desc:{ko:'한여름엔 더 많이 보기보다 바다, 저녁 바람, 쉬는 타이밍이 중요한 코스트 에디트.', en:'For peak summer, the stronger edit is less coverage and more coast, evening air, and rest timing.'}, tags:['summer','coast','breeze'], guide:`${guideBase}city/busan.html`, example:`${guideBase}example/busan-2n3d-with-parents.html`, preset:{destination:'Busan',duration:'2n3d',companion:'friends',style:'coast + night views + lighter daytime',notes:'Let summer Busan breathe. One coast anchor and one slower night view.'}}
      ],
      magazine:[
        { season:'late', title:{ko:'Late-night city edit', en:'Late-night city edit'}, desc:{ko:'낮보다 밤이 더 중요한 도시를 위한 에디토리얼 셸프.', en:'An editorial shelf for cities where the night rhythm matters as much as the daytime route.'}, tags:['late-night','friends','city'], guide:`${guideBase}city/tokyo.html`, example:`${guideBase}example/tokyo-3n4d-first-trip.html`, preset:{destination:'Tokyo',duration:'3n4d',companion:'friends',style:'city highlights + late nights + hidden gems',notes:'Save room for a stronger late-night close and one slower recovery pocket the next day.'}},
        { season:'parents', title:{ko:'Parents easy pace', en:'Parents easy pace'}, desc:{ko:'이동을 줄이고 장면은 충분히 남기는 부모님 동행용 느린 베이스.', en:'A slower base for parents that protects movement while keeping the trip scenic and memorable.'}, tags:['parents','easy pace','family'], guide:`${guideBase}city/jeju.html`, example:`${guideBase}city/jeju.html`, preset:{destination:'Jeju',duration:'3n4d',companion:'family',style:'scenic + easy pace + soft meals',notes:'Keep transfers simple and leave room for a slower lunch and hotel reset.'}},
        { season:'food', title:{ko:'Food-led short break', en:'Food-led short break'}, desc:{ko:'짧은 주말에도 만족감이 잘 나는 먹는 리듬 중심의 컴팩트 에디트.', en:'A compact food-first edit that works well even on a short weekend.'}, tags:['food','weekend','compact'], guide:`${guideBase}city/fukuoka.html`, example:`${guideBase}example/fukuoka-2n3d-food-trip.html`, preset:{destination:'Fukuoka',duration:'2n3d',companion:'friends',style:'food + local neighborhoods + compact pace',notes:'Use meals as the route structure and keep the city core compact.'}}
      ],
      archive:[
        { season:'rain', title:{ko:'Rainy-day shelf', en:'Rainy-day shelf'}, desc:{ko:'비 오는 날 다시 꺼내 쓰기 좋은 fallback 베이스를 한 셸프로 묶었습니다.', en:'A shelf for rainy-day bases you can reopen when the weather turns quickly.'}, tags:['rainy','fallback','archive'], guide:`${guideBase}city/seoul.html`, example:`${guideBase}example/seoul-2n3d-city-vibes.html`, preset:{destination:'Seoul',duration:'2n3d',companion:'solo',style:'city vibes + food + indoor pockets',notes:'Reopen this when the city needs more indoor transitions.'}},
        { season:'weekend', title:{ko:'Weekend dense shelf', en:'Weekend dense shelf'}, desc:{ko:'짧은 일정에 바로 꺼내 쓰는 고밀도 but readable 베이스 모음.', en:'A reusable shelf for shorter high-density but still readable weekend bases.'}, tags:['weekend','dense','archive'], guide:`${guideBase}city/tokyo.html`, example:`${guideBase}example/tokyo-3n4d-first-trip.html`, preset:{destination:'Tokyo',duration:'2n3d',companion:'friends',style:'city highlights + hidden gems',notes:'Use this when you need a compact city weekend that still breathes.'}},
        { season:'soft', title:{ko:'Soft reset shelf', en:'Soft reset shelf'}, desc:{ko:'에너지를 아끼면서 도시를 오래 남기고 싶을 때의 느린 베이스.', en:'A slower shelf for trips where energy protection matters as much as sightseeing.'}, tags:['soft','slow','archive'], guide:`${guideBase}city/kyoto.html`, example:`${guideBase}example/kyoto-2n3d-slow-trip.html`, preset:{destination:'Kyoto',duration:'2n3d',companion:'solo',style:'slow + quiet + tea breaks',notes:'Keep the day light and let the city stay longer than the checklist.'}}
      ]
    };
  }

  function seasonalCardMarkup(item, copy, isPrimary=false){
    return `
      <article class="seasonal-card info-card ${isPrimary ? 'seasonal-card-primary' : ''}">
        <div class="seasonal-card-top">
          <span class="collection-kicker">${item.title[lang] || item.title.en}</span>
          <span class="meta-inline">${item.tags.slice(0,2).join(' · ')}</span>
        </div>
        <p class="seasonal-card-copy">${item.desc[lang] || item.desc.en}</p>
        <div class="mini-vibe-row">${item.tags.map(tag => `<span class="mini-vibe-chip">${tag}</span>`).join('')}</div>
        <div class="card-actions seasonal-card-actions">
          <a class="soft-btn" href="${item.guide}" data-signal-tags="${item.tags.join('|')}" data-signal-city="${item.preset?.destination || ''}" data-signal-title="${item.title[lang] || item.title.en}" data-signal-source="seasonal-guide">${copy.guide}</a>
          <a class="ghost-btn" href="${item.example}" data-signal-tags="${item.tags.join('|')}" data-signal-city="${item.preset?.destination || ''}" data-signal-title="${item.title[lang] || item.title.en}" data-signal-source="seasonal-sample">${copy.sample}</a>
          <button class="primary-btn seasonal-plan-btn" data-seasonal-preset='${JSON.stringify(item.preset)}' data-signal-tags="${item.tags.join('|')}" data-signal-city="${item.preset?.destination || ''}" data-signal-title="${item.title[lang] || item.title.en}" data-signal-source="seasonal-plan">${copy.plan}</button>
        </div>
      </article>`;
  }

  function wireSeasonalButtons(scope, plannerMode='page'){
    scope.querySelectorAll('.seasonal-plan-btn').forEach(btn => btn.addEventListener('click', () => {
      let preset = {};
      try { preset = JSON.parse(btn.dataset.seasonalPreset || '{}'); } catch (e) {}
      if (plannerMode === 'planner') {
        window.RyokoApp.applyPlannerPreset(preset);
        document.querySelector('.planner-shell')?.scrollIntoView({ behavior:'smooth', block:'start' });
      } else {
        location.href = plannerUrlForCity(preset.destination || '');
      }
    }));
  }


  function getAtlasText(page='home'){
    const copyMap = {
      home: {
        ko:{eyebrow:'City atlas', title:'주요 도시를 cover부터 sample route까지 한 번에 읽기', desc:'각 도시의 첫 인상, 읽는 포인트, 바로 참고할 sample rhythm을 같은 화면에 붙였습니다.', region:{japan:'Japan edit', korea:'Korea edit', greater:'Greater China edit'}, districts:'District highlights', picks:'Neighborhood picks', sample:'Sample', guide:'Read guide', plan:'Open Planner'},
        en:{eyebrow:'City atlas', title:'Read key cities from cover to sample route in one sweep', desc:'Each city now shows its cover, district focus, neighborhood picks, and route rhythm in one continuous block.', region:{japan:'Japan edit', korea:'Korea edit', greater:'Greater China edit'}, districts:'District highlights', picks:'Neighborhood picks', sample:'Sample', guide:'Read guide', plan:'Open Planner'},
        ja:{eyebrow:'シティアトラス', title:'主要都市をカバーからサンプルルートまで一気に読む', desc:'各都市の第一印象、読みどころ、街区の焦点、近所のピック、参考ルートまでを一つの流れで読めるようにまとめました。', region:{japan:'日本 edit', korea:'韓国 edit', greater:'華語圏 edit'}, districts:'注目エリア', picks:'近所のピック', sample:'サンプルルート', guide:'ガイドを見る', plan:'Planner を開く'},
        zhHant:{eyebrow:'城市 atlas', title:'把主要城市從封面一路讀到範例路線', desc:'每座城市都把第一印象、閱讀切口、街區重點、鄰里精選和範例路線接在同一段閱讀流程裡。', region:{japan:'日本 edit', korea:'韓國 edit', greater:'華語城市 edit'}, districts:'街區重點', picks:'鄰里精選', sample:'範例路線', guide:'讀城市指南', plan:'打開 Planner'}
      },
      magazine: {
        ko:{eyebrow:'City atlas', title:'도시별 cover, district, sample route를 한 셸프에서', desc:'Magazine 안에서 바로 도시별 editorial intro와 district highlights, neighborhood picks, sample rhythm까지 이어서 읽을 수 있게 확장했습니다.', region:{japan:'Japan edit', korea:'Korea edit', greater:'Greater China edit'}, districts:'District highlights', picks:'Neighborhood picks', sample:'Sample', guide:'Read guide', plan:'Open Planner'},
        en:{eyebrow:'City atlas', title:'City cover, district focus, and sample route in one shelf', desc:'Magazine now expands each major city into a tighter editorial block with intro, district highlights, neighborhood picks, and route rhythm together.', region:{japan:'Japan edit', korea:'Korea edit', greater:'Greater China edit'}, districts:'District highlights', picks:'Neighborhood picks', sample:'Sample', guide:'Read guide', plan:'Open Planner'},
        ja:{eyebrow:'シティアトラス', title:'都市ごとのカバー、注目エリア、サンプルルートを一つの棚で', desc:'Magazine の中で、主要都市ごとの導入、街区の焦点、近所のピック、参考ルートまでを続けて読めるように整えました。', region:{japan:'日本 edit', korea:'韓国 edit', greater:'華語圏 edit'}, districts:'注目エリア', picks:'近所のピック', sample:'サンプルルート', guide:'ガイドを見る', plan:'Planner を開く'},
        zhHant:{eyebrow:'城市 atlas', title:'把城市封面、街區焦點與範例路線收進同一個書架', desc:'Magazine 現在把主要城市的導語、街區重點、鄰里精選和路線節奏接成同一個閱讀段落。', region:{japan:'日本 edit', korea:'韓國 edit', greater:'華語城市 edit'}, districts:'街區重點', picks:'鄰里精選', sample:'範例路線', guide:'讀城市指南', plan:'打開 Planner'}
      }
    };
    return (copyMap[page] && (copyMap[page][lang] || copyMap[page].en)) || copyMap.home.en;
  }

  const atlasLocaleMap = {
    ja: {
      tokyo:{lead:'東京はチェックリストより、層で読むほうがずっと滑らかにほどけます。',districts:[['渋谷・原宿','最初の高揚感、食の選択肢、東京らしさを早くつかみやすいエリア。'],['浅草・上野','定番の景色と文化の軸が読みやすく、初訪問でも組みやすい流れ。']],sampleShape:'渋谷で着地 → 浅草・上野の定番軸 → 静かな街区で一度ゆるめる流れ',sampleLead:'大きな場面の間に、テンポを落とす近所を一つ差し込むと東京らしさが残りやすい。',picks:['渋谷','浅草','清澄白河']},
      osaka:{lead:'大阪は数をこなすより、食べて休んでまた動く間合いがうまくつながる都市です。',districts:[['なんば・道頓堀','大阪の熱量と食の密度を最も早く体感しやすい中心。'],['梅田・中崎町','買い物、カフェ、屋内比率を上げたい日に収まりやすい組み合わせ。']],sampleShape:'なんばで夜の入口 → 食と買い物の核 → 最後に一食だけ残して離脱',sampleLead:'一日に強いエリアを二つまでに抑えると、大阪の軽さがきれいに残ります。',picks:['なんば','中崎町','新世界']},
      kyoto:{lead:'京都は見る数より、静かな時間と歩く余白を残したほうが深く届きます。',districts:[['祇園・清水寺周辺','初回でも京都らしい場面をまとめて読める王道の軸。'],['鴨川・北山側','カフェや散歩で呼吸を整えたい日に相性がいいエリア。']],sampleShape:'東側の定番景色 → 昼は川辺や庭で呼吸を整える → 夜は一か所だけ深く',sampleLead:'京都は一日に空白を残したとき、街の質感が一段ときれいに見えてきます。',picks:['祇園','岡崎','鴨川沿い']},
      fukuoka:{lead:'福岡は短くても満足しやすく、食の間合いがそのまま旅の骨格になります。',districts:[['天神・大名','歩きやすさ、買い物、軽いカフェ導線がまとまりやすい中心。'],['博多・中洲','駅アクセスと食の密度を一緒に取りやすい夜寄りの軸。']],sampleShape:'天神で整える → 博多・中洲の食軸へ寄せる → 最後に好みの一食を置く形',sampleLead:'まず食事の間隔を決めてから街歩きを差し込むと、福岡はかなりきれいにまとまります。',picks:['天神','中洲','大濠公園']},
      sapporo:{lead:'札幌は季節の空気と広めの軸を一緒に読むと、街のやわらかさが出てきます。',districts:[['大通・すすきの','最初の景色、食事、夜の動線がつなぎやすい中心部。'],['円山・北海道神宮まわり','少し静かな空気で街をゆるめたい日に向く流れ。']],sampleShape:'大通で入る → 夕方は一つ景色を置く → 夜は温かい食事で閉じるリズム',sampleLead:'寒い季節ほど、移動量を減らして一つの夜景と一つの食事を濃くするとまとまりやすい。',picks:['大通','すすきの','円山']},
      seoul:{lead:'ソウルは名所の数より、どの近所をどう束ねるかで旅のトーンが決まります。',districts:[['聖水・ソウルの森','今のソウルの空気、カフェ、歩く楽しさをまとめて感じやすい軸。'],['乙支路・鍾路','古い質感と夜のテンポを一緒に持ち込みやすい街区。']],sampleShape:'聖水で今の空気を読む → 夕方は鍾路・乙支路へ寄せる → 最後は川沿いや夜景で抜く流れ',sampleLead:'ソウルは近所の相性が合うだけで、一日の密度がかなりきれいに見えます。',picks:['聖水','乙支路','延南洞']},
      busan:{lead:'釜山は速く回るより、海の場面と休む間合いを残したほうが満足度が伸びます。',districts:[['海雲台・広安里','海辺の象徴感と夜景を持ちやすい王道の軸。'],['甘川・南浦洞','市場と坂の質感を混ぜて釜山の古い表情を読みやすい流れ。']],sampleShape:'昼は海辺を一本 → 夕方は市場か坂道の景色 → 夜は広安里でゆるく閉じる形',sampleLead:'上り下りを欲張らず、海辺の景色を一日に一度強く置くと釜山はきれいに残ります。',picks:['海雲台','広安里','南浦洞']},
      jeju:{lead:'済州は目的地の数より、風景の間にどれだけ余白を残せるかが大事です。',districts:[['涯月・協才','海の色、カフェ、車移動の軽さを取りやすい西側の定番。'],['西帰浦・中文','滝や海岸の景色を少し大きめに取りたい日に向く軸。']],sampleShape:'午前は一つの海の場面 → 午後はカフェで熱を抜く → 夕方にもう一つだけ景色を置く流れ',sampleLead:'済州は移動を減らした日ほど、島らしい呼吸がはっきり残ります。',picks:['涯月','協才','西帰浦']},
      gyeongju:{lead:'慶州は量よりテンポが大切で、夕方に向かうほど街の質感がよく出ます。',districts:[['大陵苑・皇理団キル','歴史の景色と今っぽい店の流れを一緒に読みやすい中心。'],['東宮と月池周辺','夕方から夜にかけて場面が強くなる代表的な散歩軸。']],sampleShape:'昼は古都の核を読む → 夕方に池や灯りへ寄せる → 夜は静かな食事で閉じる流れ',sampleLead:'慶州は日没の一場面を残しておくと、旅全体の印象がぐっと締まります。',picks:['皇理団キル','大陵苑','月池']},
      taipei:{lead:'台北は食のリズムと夜の空気を一緒に読むと、街の層が一気に立ち上がります。',districts:[['永康街・東門','歩きやすさ、食、小さな店の密度を持ちやすい定番軸。'],['西門・迪化街','若い熱量と古い通りの質感を切り替えながら読める流れ。']],sampleShape:'午後はカフェと路地 → 夜市か一食の軸を深く → 遅い時間はやわらかく締める形',sampleLead:'台北は一日の中で“食べる時間”を先に置くと、他の動きが自然に収まります。',picks:['永康街','西門','迪化街']},
      hongkong:{lead:'香港は縦の密度が強いぶん、一日の軸を短く切ったほうが景色が冴えます。',districts:[['中環・上環','坂、カフェ、港の光が重なりやすい代表的な核。'],['尖沙咀・油麻地','夜景と食事、歩きやすい密度を取りやすい定番の南北軸。']],sampleShape:'朝は港の景色 → 夕方は一度屋内で整える → 夜は一つの夜景か食軸に寄せる流れ',sampleLead:'香港は一日に“強い場面”を二つまでに抑えると、疲れより景色が残りやすいです。',picks:['中環','上環','尖沙咀']},
      macau:{lead:'マカオは短い軸で遺産の空気と夜のきらめきをつなぐと、街がきれいにまとまります。',districts:[['セナド広場周辺','歩いて読める歴史の核と軽い食事を取りやすい中心部。'],['タイパ・コタイ側','夜のシーンやホテル寄りのムードを足したい日に向く流れ。']],sampleShape:'昼は旧市街の核 → 夕方は少し休む → 夜は一つのきらめきを取りにいく形',sampleLead:'マカオは詰め込まず、昼と夜の対比を一回だけ強く置くと印象が残りやすいです。',picks:['セナド広場','タイパ','コタイ']}
    },
    zhHant: {
      tokyo:{lead:'東京比起清單式打卡，更適合按層次與街區去讀，整體會順很多。',districts:[['Shibuya・Harajuku','第一天最容易抓到東京速度、吃喝選擇與城市表情的主軸。'],['Asakusa・Ueno','經典景色與文化密度高，第一次去也很好排。']],sampleShape:'先用 Shibuya 落地 → 接 Asakusa / Ueno 的經典軸線 → 再放進一段較安靜的街區節奏',sampleLead:'在大場景之間插入一個放慢速度的近所，東京會更像一段被編好的城市節奏。',picks:['Shibuya','Asakusa','Kiyosumi']},
      osaka:{lead:'大阪不是靠塞滿景點取勝，而是靠吃、走、休息之間的節奏自然接起來。',districts:[['Namba・Dotonbori','最快感受到大阪熱度、街頭感與食物密度的中心地帶。'],['Umeda・Nakazakicho','想把購物、咖啡與室內移動放得更順時很好用的組合。']],sampleShape:'先用 Namba 打開夜節奏 → 以吃與逛作為白天主軸 → 最後只留一餐收尾',sampleLead:'一天把強勢區域控制在兩個以內，大阪那種輕鬆好玩就會更完整。',picks:['Namba','Nakazakicho','Shinsekai']},
      kyoto:{lead:'京都比起多看幾個點，更適合保留安靜時段與散步的留白。',districts:[['Gion・Kiyomizu axis','第一次來也能很快讀到京都代表畫面的經典主線。'],['Kamogawa・Okazaki side','適合放進咖啡、河邊步調與較安靜的午後。']],sampleShape:'白天先讀東側經典 → 午後在河邊或庭園放慢 → 晚上只留一個深一點的段落',sampleLead:'京都在一天裡留出空白之後，城市的質感反而更容易留下來。',picks:['Gion','Okazaki','Kamogawa']},
      fukuoka:{lead:'福岡就算天數短也很容易滿足，餐與餐之間的節奏幾乎就是旅程骨架。',districts:[['Tenjin・Daimyo','步行、購物、咖啡與城市感最容易收在一起的核心。'],['Hakata・Nakasu','車站動線與晚上的吃喝密度很容易一起拿到。']],sampleShape:'先在 Tenjin 定調 → 再把重心移到 Hakata / Nakasu 的吃喝軸 → 最後留一餐自己最想吃的',sampleLead:'先把用餐間距排好，再把散步與小逛插進去，福岡會非常乾淨好讀。',picks:['Tenjin','Nakasu','Ohori Park']},
      sapporo:{lead:'札幌要把季節空氣和較寬的城市軸一起讀，城市的柔軟感才會出來。',districts:[['Odori・Susukino','第一個畫面、吃飯與夜裡移動最容易接起來的中心帶。'],['Maruyama side','想把節奏放慢、讀一點更安靜空氣時很適合。']],sampleShape:'先從 Odori 進城 → 黃昏留一個景點 → 夜裡用一頓暖的收尾',sampleLead:'越冷的季節越適合減少移動量，把一個夜景和一頓熱食留得更深。',picks:['Odori','Susukino','Maruyama']},
      seoul:{lead:'首爾的旅程感不在景點數量，而在你怎麼把不同近所編在同一天。',districts:[['Seongsu・Seoul Forest','很容易一次讀到現在首爾的空氣、咖啡與步行感。'],['Euljiro・Jongno','老質地與夜節奏最容易一起長出來的一條線。']],sampleShape:'先用 Seongsu 打開現在感 → 傍晚往 Jongno / Euljiro 靠 → 最後用河邊或夜景把節奏放鬆',sampleLead:'首爾只要近所組合對了，一天的密度就會顯得很自然。',picks:['Seongsu','Euljiro','Yeonnam']},
      busan:{lead:'釜山比起快快跑完，更適合把海景與休息節奏都留下來。',districts:[['Haeundae・Gwanganli','最容易拿到海邊代表感、夜景與放鬆感的經典雙軸。'],['Nampo・Gamcheon side','市場、老坡道與較舊的港都質感比較容易一起讀到。']],sampleShape:'白天先留一段海邊 → 傍晚讀市場或坡道景色 → 晚上在 Gwanganli 輕輕收尾',sampleLead:'不要太貪心地塞滿上下坡，把一天只留一次強海景，釜山會更好看。',picks:['Haeundae','Gwanganli','Nampo']},
      jeju:{lead:'濟州重點不在目的地數量，而在風景和風景之間保留多少呼吸感。',districts:[['Aewol・Hyeopjae','海色、咖啡與車程舒適度最好一起拿到的西線。'],['Seogwipo・Jungmun','想把瀑布、海岸或較大的風景面讀深時很好用。']],sampleShape:'早上留一個海邊主景 → 下午用咖啡把熱度降下來 → 傍晚再放一個景色就夠',sampleLead:'濟州往往是在減少移動之後，島的呼吸感才真正出來。',picks:['Aewol','Hyeopjae','Seogwipo']},
      gyeongju:{lead:'慶州比起數量更吃節奏，越接近傍晚，城市的質地越明顯。',districts:[['Daereungwon・Hwangridan-gil','古都景色與現在感店鋪最容易一起讀到的中心。'],['Donggung・Wolji side','從黃昏到夜裡特別有力量的散步主線。']],sampleShape:'白天先讀古都核心 → 傍晚往池與燈光靠 → 晚上用安靜的一餐收尾',sampleLead:'只要替日落留下一個場景，慶州整趟旅程的印象就會更完整。',picks:['Hwangridan-gil','Daereungwon','Wolji']},
      taipei:{lead:'台北最迷人的地方，是把吃的節奏和晚上的空氣一起讀進行程裡。',districts:[['Yongkang Street・Dongmen','步行、吃喝與小店密度都很順的經典入口。'],['Ximen・Dihua Street','年輕能量與老街質地能輪流切換的一條線。']],sampleShape:'下午先用咖啡和巷子暖身 → 晚上深讀一個夜市或晚餐軸 → 再用較柔的尾聲收起來',sampleLead:'台北把“吃飯時間”先排好之後，其他移動反而都會自然落位。',picks:['Yongkang','Ximen','Dihua']},
      hongkong:{lead:'香港的垂直密度很強，所以把一天的動線切短，景色反而更俐落。',districts:[['Central・Sheung Wan','坡道、咖啡與港邊光線最容易一起出現的代表核心。'],['Tsim Sha Tsui・Yau Ma Tei','夜景、餐食與步行密度最好掌握的南北主線。']],sampleShape:'早上先拿港景 → 傍晚進室內稍微整理節奏 → 晚上只深讀一個夜景或餐食軸',sampleLead:'香港一天把“強場景”控制在兩個以內，留下來的通常是景色而不是疲勞。',picks:['Central','Sheung Wan','Tsim Sha Tsui']},
      macau:{lead:'澳門更適合用短軸把歷史感與夜裡的閃亮收進同一天。',districts:[['Senado area','最容易步行讀到舊城核心與輕鬆吃喝的中心段落。'],['Taipa・Cotai side','想補進夜景、飯店感或較亮的場景時很好接。']],sampleShape:'白天先讀舊城核心 → 傍晚稍微放慢 → 晚上只拿一個亮點收尾',sampleLead:'澳門不需要塞太多，只要把白天與夜晚的對比留清楚就很有記憶點。',picks:['Senado','Taipa','Cotai']}
    }
  };

  const cityAtlasVisualPriorityMap = {
    tokyo:{ position:'center 42%', label:{ ko:'lead cover', en:'lead cover', ja:'リードカバー', zhHant:'主封面' } },
    osaka:{ position:'center 48%', label:{ ko:'food rhythm', en:'food rhythm', ja:'食のリズム', zhHant:'飲食節奏' } },
    kyoto:{ position:'center 38%', label:{ ko:'slow frame', en:'slow frame', ja:'静かな余白', zhHant:'慢節奏畫面' } },
    fukuoka:{ position:'center 46%', label:{ ko:'compact edit', en:'compact edit', ja:'コンパクト編集', zhHant:'緊湊編排' } },
    sapporo:{ position:'center 40%', label:{ ko:'seasonal air', en:'seasonal air', ja:'季節の空気', zhHant:'季節空氣' } },
    seoul:{ position:'center 44%', label:{ ko:'city contrast', en:'city contrast', ja:'街のコントラスト', zhHant:'城市反差' } },
    busan:{ position:'center 46%', label:{ ko:'coast tone', en:'coast tone', ja:'海辺のトーン', zhHant:'海岸調性' } },
    jeju:{ position:'center 52%', label:{ ko:'island pace', en:'island pace', ja:'島のテンポ', zhHant:'島嶼節奏' } },
    gyeongju:{ position:'center 42%', label:{ ko:'heritage calm', en:'heritage calm', ja:'静かな遺産', zhHant:'古都靜度' } },
    taipei:{ position:'center 44%', label:{ ko:'night food', en:'night food', ja:'夜と食', zhHant:'夜與食' } },
    hongkong:{ position:'center 39%', label:{ ko:'harbor light', en:'harbor light', ja:'港の光', zhHant:'海港燈光' } },
    macau:{ position:'center 43%', label:{ ko:'night heritage', en:'night heritage', ja:'夜の遺産', zhHant:'夜色遺產' } }
  };

  const cityNeighborhoodProfiles = {
    tokyo:{
      ko:[
        {name:'시부야',district:'Shibuya & Harajuku',window:'첫날 오후',note:'도쿄의 속도와 선택지를 가장 빨리 체감하게 해주는 첫 장면입니다.',deeper:'체크인은 가볍게 두고, 첫 저녁은 시부야에서 끝내면 도시 템포를 한 번에 잡기 좋습니다.'},
        {name:'아사쿠사',district:'Asakusa & Ueno',window:'둘째 날 오전',note:'초행자도 읽기 쉬운 도쿄의 고전적인 축입니다.',deeper:'아침 공기가 남아 있을 때 들어가면 밀도는 높아도 피로가 덜하고, 이후 우에노나 박물관 축으로 이어지기 좋습니다.'},
        {name:'기요스미',district:'Kiyosumi & Ginza',window:'해 질 무렵',note:'큰 장면 사이에 템포를 낮추기 좋은 조용한 레이어입니다.',deeper:'커피, 갤러리, 강변 산책 같은 느린 루프를 넣으면 도쿄가 체크리스트보다 결로 남습니다.'},
        {name:'신주쿠 side',district:'Shibuya & Harajuku',window:'밤 직전',note:'큰 조명과 작은 골목이 같이 접히는 마지막 야간 레이어입니다.',deeper:'전망 하나 다음에 신주쿠 골목을 짧게 붙이면, 도쿄의 밤이 과하게 무겁지 않게 남습니다.'}
      ],
      en:[
        {name:'Shibuya',district:'Shibuya & Harajuku',window:'arrival afternoon',note:'The fastest first scene for Tokyo energy, food choices, and orientation.',deeper:'Keep arrival light and let the first dinner land here so the city rhythm locks in without forcing too much.'},
        {name:'Asakusa',district:'Asakusa & Ueno',window:'second morning',note:'A classic Tokyo axis that first-timers can read without much friction.',deeper:'It works best while the morning still feels open, then flows naturally into Ueno, a museum pocket, or a slower lunch.'},
        {name:'Kiyosumi',district:'Kiyosumi & Ginza',window:'late afternoon',note:'A quieter layer that lets the city breathe between bigger headline stops.',deeper:'Add coffee, galleries, and a slower river walk here, and Tokyo starts to feel edited rather than crowded.'},
        {name:'Shinjuku side',district:'Shibuya & Harajuku',window:'pre-night',note:'A final neon-and-lane layer that closes Tokyo without stretching the route too far.',deeper:'After one skyline moment, a short Shinjuku lane read often leaves a better final memory than forcing another major stop.'}
      ]
    },
    osaka:{
      ko:[
        {name:'난바',district:'Namba & Dotonbori',window:'첫날 저녁',note:'오사카의 열기와 식사 리듬을 가장 빠르게 열어주는 중심입니다.',deeper:'첫날엔 긴 동선보다 난바 한 축만 깊게 읽는 편이 훨씬 오사카답고 덜 피곤합니다.'},
        {name:'나카자키초',district:'Umeda & Nakazakicho',window:'둘째 날 오후',note:'쇼핑과 카페, 약간의 숨 고르기를 같이 넣기 좋은 포켓입니다.',deeper:'오사카의 웃긴 에너지 사이에 이 정도 느슨한 동네를 넣어야 먹거리 여행도 산만해지지 않습니다.'},
        {name:'신세카이',district:'Shinsekai & Tennoji',window:'해 질 무렵',note:'조금 더 로컬하고 거친 질감을 느끼기 좋은 마감 구간입니다.',deeper:'전망 포인트나 저녁 한 끼와 함께 붙이면, 오사카의 밤이 과장 없이 자연스럽게 살아납니다.'}
      ],
      en:[
        {name:'Namba',district:'Namba & Dotonbori',window:'first evening',note:'The quickest way to open Osaka through food, light, and easy momentum.',deeper:'On day one, reading Namba deeply is more useful than trying to cover too many zones.'},
        {name:'Nakazakicho',district:'Umeda & Nakazakicho',window:'second afternoon',note:'A softer pocket for cafés, shopping, and a small reset.',deeper:'Osaka lands better when one lighter neighborhood interrupts the louder food rhythm.'},
        {name:'Shinsekai',district:'Shinsekai & Tennoji',window:'near dusk',note:'A rougher local texture that gives the trip a stronger close.',deeper:'Pair it with one view point or dinner, and the city ends with character instead of just volume.'}
      ]
    },
    kyoto:{
      ko:[
        {name:'기온',district:'Higashiyama',window:'이른 오전',note:'교토다운 장면을 가장 진하게 남기기 좋은 첫 축입니다.',deeper:'사람이 많아지기 전의 기온과 동산 축을 잡으면, 교토는 훨씬 조용하고 깊게 읽힙니다.'},
        {name:'오카자키',district:'Kawaramachi & Demachiyanagi',window:'늦은 오전',note:'전시, 카페, 강변으로 교토를 조금 더 부드럽게 읽게 해주는 구간입니다.',deeper:'사원 하나 뒤에 오카자키 같은 포켓을 넣으면 하루가 종교시설 체크리스트로 무거워지지 않습니다.'},
        {name:'가모가와',district:'Kawaramachi & Demachiyanagi',window:'해 질 무렵',note:'교토의 여백을 남겨주는 가장 좋은 마감 라인입니다.',deeper:'강변 산책 하나만 제대로 남겨도 교토는 훨씬 오래 기억됩니다.'},
        {name:'니넨자카 side',district:'Higashiyama',window:'오전 끝',note:'상징적인 장면을 너무 오래 끌지 않게 정리해 주는 transition 축입니다.',deeper:'기온과 동산 축 사이에 짧게 넣으면 교토가 관광지 나열이 아니라 결 있는 편집처럼 남습니다.'}
      ],
      en:[
        {name:'Gion',district:'Higashiyama',window:'early morning',note:'The clearest entry to Kyoto’s iconic texture before the city crowds up.',deeper:'Catch Gion and the east-side temple line early, and Kyoto reads deeper instead of busier.'},
        {name:'Okazaki',district:'Kawaramachi & Demachiyanagi',window:'late morning',note:'A softer pocket for museums, cafés, and a calmer midday transition.',deeper:'One quiet pocket after a temple anchor keeps the day from turning into a heavy heritage checklist.'},
        {name:'Kamogawa',district:'Kawaramachi & Demachiyanagi',window:'dusk',note:'The river line is where Kyoto’s empty space starts to matter.',deeper:'A single river walk at dusk often leaves a stronger memory than one more landmark stop.'},
        {name:'Ninenzaka side',district:'Higashiyama',window:'late morning',note:'A transition pocket that keeps Kyoto iconic without making it feel overperformed.',deeper:'Used lightly between Gion and the east-side temple line, it helps Kyoto read like an edit rather than a pile of landmarks.'}
      ]
    },
    fukuoka:{
      ko:[
        {name:'텐진',district:'Tenjin & Daimyo',window:'첫날 오후',note:'짧은 여행에서도 바로 리듬을 잡아주는 도심 코어입니다.',deeper:'텐진은 카페, 쇼핑, 식사를 한 블록씩 쌓기 쉬워서 후쿠오카 초행의 첫 장면으로 안정적입니다.'},
        {name:'나카스',district:'Hakata & Nakasu',window:'저녁',note:'먹는 리듬과 밤 공기를 같이 잡기 좋은 축입니다.',deeper:'야타이든 강변이든 저녁 흐름이 붙는 순간, 후쿠오카는 짧은 일정이어도 충분히 기억에 남습니다.'},
        {name:'오호리 공원',district:'Tenjin & Daimyo',window:'둘째 날 오전',note:'컴팩트한 도시 안에 한 번의 여유를 넣어주는 포켓입니다.',deeper:'오호리 같은 공원 축을 하루 한 번 넣으면 먹거리 중심 일정도 숨이 생깁니다.'},
        {name:'하카타역 side',district:'Hakata & Nakasu',window:'이동 전후',note:'짧은 일정의 처음과 끝을 가장 매끈하게 이어주는 practical pocket입니다.',deeper:'기차나 공항 이동 전후에 이 축을 가볍게 붙이면 후쿠오카가 서두르지 않고도 또렷하게 닫힙니다.'}
      ],
      en:[
        {name:'Tenjin',district:'Tenjin & Daimyo',window:'arrival afternoon',note:'The easiest downtown core for settling into Fukuoka fast.',deeper:'It combines cafés, shopping, and meals in a compact radius, which makes it ideal for a short first-day edit.'},
        {name:'Nakasu',district:'Hakata & Nakasu',window:'evening',note:'A strong night-food axis that gives the city its clearest after-dark tone.',deeper:'Once dinner and river air connect here, Fukuoka feels memorable even on a short trip.'},
        {name:'Ohori Park',district:'Tenjin & Daimyo',window:'second morning',note:'A breathing pocket that softens an otherwise food-led route.',deeper:'One park loop like this gives the city shape, not just appetite.'},
        {name:'Hakata Station side',district:'Hakata & Nakasu',window:'before moving on',note:'A practical pocket that smooths the start or close of a short Fukuoka stay.',deeper:'Used lightly before a train or airport move, it lets Fukuoka end cleanly without rushing the city tone.'}
      ]
    },
    sapporo:{
      ko:[
        {name:'오도리',district:'Odori & Susukino',window:'첫날 오후',note:'삿포로의 넓은 축과 첫 인상을 가장 안정적으로 여는 코어입니다.',deeper:'오도리에서 출발하면 도시 축이 바로 읽히고, 이후 식사나 야경으로도 이어 붙이기 쉽습니다.'},
        {name:'스스키노',district:'Odori & Susukino',window:'밤',note:'삿포로의 밤 리듬과 따뜻한 한 끼를 같이 붙이기 좋은 구간입니다.',deeper:'추운 계절일수록 밤을 짧게 선명하게 잡는 편이 도시 인상을 더 깊게 남깁니다.'},
        {name:'마루야마',district:'Maruyama side',window:'둘째 날 오전',note:'조금 더 조용한 삿포로를 읽고 싶을 때 좋은 레이어입니다.',deeper:'도심 코어와 대비되는 공기 덕분에 삿포로가 더 입체적으로 느껴집니다.'}
      ],
      en:[
        {name:'Odori',district:'Odori & Susukino',window:'arrival afternoon',note:'The clearest first axis for understanding Sapporo’s width and rhythm.',deeper:'Starting here makes later meals, winter walks, and evening views feel easier to connect.'},
        {name:'Susukino',district:'Odori & Susukino',window:'night',note:'A warmer night pocket that lets the city close with food and light.',deeper:'In colder months, one short and vivid night scene often works better than overmoving.'},
        {name:'Maruyama',district:'Maruyama side',window:'second morning',note:'A quieter layer that softens the trip and adds texture beyond the center.',deeper:'It gives Sapporo contrast, not just continuity.'}
      ]
    },
    seoul:{
      ko:[
        {name:'성수',district:'Seongsu & Seoul Forest',window:'첫날 오후',note:'지금 서울의 공기와 보행감을 가장 빠르게 읽게 해주는 동네입니다.',deeper:'카페, 편집숍, 강변이나 숲 축을 묶기 쉬워서 첫날 서울의 밀도를 과하게 쓰지 않고 열 수 있습니다.'},
        {name:'을지로',district:'Euljiro & Jongno',window:'저녁',note:'서울의 오래된 결과 밤 리듬이 같이 살아나는 축입니다.',deeper:'을지로는 너무 많은 설명 없이도 서울의 층을 보여줘서, 저녁 anchor로 강합니다.'},
        {name:'연남',district:'Seongsu & Seoul Forest',window:'둘째 날 늦은 오후',note:'조금 더 가볍고 생활감 있는 결을 넣기 좋은 포켓입니다.',deeper:'성수·을지로 사이에 연남 같은 포켓을 넣으면 서울이 더 자연스럽고 덜 과밀하게 느껴집니다.'}
      ],
      en:[
        {name:'Seongsu',district:'Seongsu & Seoul Forest',window:'arrival afternoon',note:'One of the fastest ways to read contemporary Seoul through walking, cafés, and texture.',deeper:'It opens the city without spending all your energy at once, which makes it ideal for a first-day rhythm.'},
        {name:'Euljiro',district:'Euljiro & Jongno',window:'evening',note:'A strong evening axis where older layers and night energy sit together.',deeper:'Euljiro turns Seoul into a layered city instead of a simple shopping route.'},
        {name:'Yeonnam',district:'Seongsu & Seoul Forest',window:'late second afternoon',note:'A lighter neighborhood pocket that adds everyday softness.',deeper:'Between stronger zones, a place like Yeonnam keeps the city from feeling too engineered.'}
      ]
    },
    busan:{
      ko:[
        {name:'해운대',district:'Haeundae & Gwanganli',window:'첫날 오후',note:'부산의 대표 바다 장면을 가장 쉽게 가져오는 축입니다.',deeper:'첫날은 해운대처럼 바로 열리는 바다를 쓰고, 나머지 풍경은 다음 날로 남겨두는 편이 덜 피곤합니다.'},
        {name:'광안리',district:'Haeundae & Gwanganli',window:'밤',note:'야경과 식사, 산책이 가장 자연스럽게 맞물리는 해변 라인입니다.',deeper:'밤의 광안리는 부산의 기억을 정리해 주는 마감 구간으로 강합니다.'},
        {name:'남포',district:'Nampo & Gamcheon side',window:'둘째 날 오전',note:'항구 도시의 오래된 결과 시장 리듬을 읽기 좋은 축입니다.',deeper:'남포를 넣으면 부산이 단순한 바다 도시가 아니라 오래된 항구 도시로도 보이기 시작합니다.'}
      ],
      en:[
        {name:'Haeundae',district:'Haeundae & Gwanganli',window:'arrival afternoon',note:'The easiest first coast scene for opening Busan without friction.',deeper:'Use one clear ocean anchor here first, then save the rest of the coast for later.'},
        {name:'Gwanganli',district:'Haeundae & Gwanganli',window:'night',note:'The most natural shore for a night view, dinner, and a slower close.',deeper:'Gwanganli often leaves the clearest Busan memory when it is saved for the end of the day.'},
        {name:'Nampo',district:'Nampo & Gamcheon side',window:'second morning',note:'A port-city layer with older streets and market rhythm.',deeper:'It makes Busan feel broader than just beaches and skyline.'}
      ]
    },
    jeju:{
      ko:[
        {name:'애월',district:'Aewol & Hyeopjae',window:'첫날 오후',note:'제주의 바람과 카페, 해안 드라이브를 가장 가볍게 여는 축입니다.',deeper:'첫날부터 먼 포인트를 무리하게 찍기보다 애월처럼 가까운 바다 결을 여는 편이 섬 리듬과 잘 맞습니다.'},
        {name:'협재',district:'Aewol & Hyeopjae',window:'둘째 날 오전',note:'제주의 맑은 바다색을 대표적으로 읽기 좋은 구간입니다.',deeper:'맑은 날이라면 협재 한 축을 깊게 보고, 다른 포인트는 과감히 줄이는 편이 더 만족스럽습니다.'},
        {name:'서귀포',district:'Seogwipo & Jungmun',window:'해 질 무렵',note:'큰 풍경과 저녁 무드를 같이 잡기 좋은 남쪽 축입니다.',deeper:'남쪽으로 내려가는 날은 이동 수를 줄이고 서귀포나 중문 한 라인만 제대로 쓰는 편이 좋습니다.'}
      ],
      en:[
        {name:'Aewol',district:'Aewol & Hyeopjae',window:'arrival afternoon',note:'An easy coastal opener for Jeju’s wind, cafés, and island pace.',deeper:'Rather than forcing distant landmarks on day one, opening the island through Aewol usually feels more natural.'},
        {name:'Hyeopjae',district:'Aewol & Hyeopjae',window:'second morning',note:'A clear representative coast when the weather is good.',deeper:'On bright days, it is often better to stay longer here and cut the total number of stops.'},
        {name:'Seogwipo',district:'Seogwipo & Jungmun',window:'late afternoon',note:'A southern line that carries bigger scenery and a softer evening close.',deeper:'The south works best when you reduce hops and let one scenic corridor hold the day.'}
      ]
    },
    gyeongju:{
      ko:[
        {name:'황리단길',district:'Daereungwon & Hwangridan-gil',window:'첫날 오후',note:'지금의 경주와 고도 분위기를 같이 읽기 좋은 첫 장면입니다.',deeper:'낮에는 황리단길과 대릉원 축으로 도시 중심을 읽고, 밤을 위한 에너지를 남겨두는 편이 좋습니다.'},
        {name:'대릉원',district:'Daereungwon & Hwangridan-gil',window:'둘째 날 오전',note:'경주의 역사 감각을 가장 담백하게 보여주는 중심입니다.',deeper:'아침 시간에 대릉원 축을 읽으면 고도 특유의 여백이 더 잘 느껴집니다.'},
        {name:'월지',district:'Donggung & Wolji side',window:'해 질 무렵',note:'경주를 기억에 남게 만드는 가장 강한 저녁 장면입니다.',deeper:'이 도시에서는 일몰 이후 한 장면만 제대로 남겨도 전체 인상이 완성됩니다.'}
      ],
      en:[
        {name:'Hwangridan-gil',district:'Daereungwon & Hwangridan-gil',window:'arrival afternoon',note:'A strong opening where contemporary shops and old-city mood meet.',deeper:'Read the center lightly first and save enough energy for the evening heritage mood.'},
        {name:'Daereungwon',district:'Daereungwon & Hwangridan-gil',window:'second morning',note:'A calmer way to feel Gyeongju’s historical scale without too much effort.',deeper:'In the morning, the open space reads more clearly and the city feels less tour-heavy.'},
        {name:'Wolji',district:'Donggung & Wolji side',window:'dusk',note:'The evening image that usually seals the city in memory.',deeper:'One dusk scene here often finishes the trip more fully than several extra daytime stops.'}
      ]
    },
    taipei:{
      ko:[
        {name:'융캉제',district:'Yongkang Street & Dongmen',window:'첫날 오후',note:'타이베이의 먹는 리듬과 골목 결을 가장 부드럽게 여는 입구입니다.',deeper:'커피, 디저트, 첫 식사를 융캉제 쪽에 두면 도시는 급하지 않게 열리고 밤까지 체력이 남습니다.'},
        {name:'시먼',district:'Ximen & Dihua Street',window:'저녁',note:'젊은 에너지와 야간 리듬을 붙이기 좋은 축입니다.',deeper:'시먼은 화려한 밤을 빠르게 열어 주지만, 다른 축과 섞을 땐 한 번의 pause가 필요합니다.'},
        {name:'디화제',district:'Ximen & Dihua Street',window:'둘째 날 늦은 오전',note:'타이베이의 오래된 상업 결을 읽기 좋은 레이어입니다.',deeper:'디화제를 넣는 순간 타이베이가 단순한 먹거리 도시가 아니라 결이 있는 도시로 남습니다.'}
      ],
      en:[
        {name:'Yongkang Street',district:'Yongkang Street & Dongmen',window:'arrival afternoon',note:'A gentle opening into Taipei through walkable lanes, first-night appetite, and a pace that leaves room for the second scene.',deeper:'Coffee, dessert, and one easy meal here open the city softly and preserve energy for the night.'},
        {name:'Ximen',district:'Ximen & Dihua Street',window:'evening',note:'A quicker way to shift into Taipei’s brighter social rhythm.',deeper:'Ximen can open the night fast, but it works best with one pause elsewhere in the day.'},
        {name:'Dihua Street',district:'Ximen & Dihua Street',window:'late second morning',note:'A textured layer that keeps Taipei from feeling like food stops only.',deeper:'Once you add Dihua, the city starts to hold memory and material, not just appetite.'}
      ]
    },
    hongkong:{
      ko:[
        {name:'센트럴',district:'Central & Sheung Wan',window:'첫날 오후',note:'홍콩의 수직 밀도와 언덕, 항구 감각을 가장 빠르게 읽게 해주는 축입니다.',deeper:'센트럴은 이동 피로도 있지만 도시 첫인상을 한 번에 강하게 주기 때문에 첫날 anchor로 좋습니다.'},
        {name:'셩완',district:'Central & Sheung Wan',window:'둘째 날 오전',note:'조금 더 느슨한 카페와 골목, 오래된 결을 읽기 좋은 레이어입니다.',deeper:'센트럴의 강한 장면 뒤에 셩완을 붙이면 홍콩이 훨씬 더 입체적으로 남습니다.'},
        {name:'침사추이',district:'Tsim Sha Tsui & Yau Ma Tei',window:'밤',note:'야경과 해안 리듬을 가장 직관적으로 가져오는 축입니다.',deeper:'홍콩의 밤은 한 장면만 제대로 남겨도 충분하니, 침사추이는 마감용으로 강합니다.'}
      ],
      en:[
        {name:'Central',district:'Central & Sheung Wan',window:'arrival afternoon',note:'The fastest first frame for Hong Kong’s vertical energy, steep gradients, and harbor logic—strong enough to define the whole route if you let it.',deeper:'It is a demanding anchor, but it gives the city a strong first frame right away.'},
        {name:'Sheung Wan',district:'Central & Sheung Wan',window:'second morning',note:'A quieter layer of cafés, older texture, and slower uphill movement.',deeper:'After Central, Sheung Wan lets Hong Kong feel dimensional instead of just intense.'},
        {name:'Tsim Sha Tsui',district:'Tsim Sha Tsui & Yau Ma Tei',window:'night',note:'The clearest night-view and waterfront line for closing the day.',deeper:'One sharp evening scene here often does more than adding several extra stops.'}
      ]
    },
    macau:{
      ko:[
        {name:'세나도',district:'Senado area',window:'첫날 오후',note:'마카오의 구시가와 가벼운 먹거리 리듬을 가장 쉽게 여는 중심입니다.',deeper:'낮에는 세나도 한 축만 천천히 읽어도 마카오의 역사 결이 충분히 들어옵니다.'},
        {name:'타이파',district:'Taipa & Cotai side',window:'저녁',note:'조금 더 밝고 화려한 밤 장면으로 넘어가기 좋은 완충 구간입니다.',deeper:'구시가 다음에 타이파를 넣으면 하루 리듬이 갑자기 튀지 않고 자연스럽게 확장됩니다.'},
        {name:'코타이',district:'Taipa & Cotai side',window:'밤',note:'마카오의 화려한 밤을 가장 직관적으로 보여주는 축입니다.',deeper:'코타이는 하루의 마지막 장면 하나만 남겨도 충분히 기능합니다.'}
      ],
      en:[
        {name:'Senado',district:'Senado area',window:'arrival afternoon',note:'The easiest old-core entry for Macau’s heritage and light food rhythm.',deeper:'One slow read of Senado already brings in most of the city’s historical texture.'},
        {name:'Taipa',district:'Taipa & Cotai side',window:'evening',note:'A softer bridge between the old core and the brighter night side.',deeper:'Taipa helps the day expand naturally instead of jumping too fast into spectacle.'},
        {name:'Cotai',district:'Taipa & Cotai side',window:'night',note:'The cleanest bright-night axis when Macau needs one stronger close.',deeper:'You usually need only one final scene here to make the contrast land.'}
      ]
    }
  };

  const cityDayRhythmMap = {
    tokyo:{ko:[['Morning anchor','첫 장면은 시부야의 속도보다 아사쿠사·우에노처럼 이해가 쉬운 축으로 여는 편이 결과를 더 또렷하게 만듭니다.'],['Afternoon reset','오후에는 기요스미나 다이칸야마 같은 quieter pocket으로 밀도를 한 번 낮춰야 도쿄가 체크리스트처럼 보이지 않습니다.'],['Night close','전망은 하나만 두고, 늦은 식사와 작은 골목 한 구간으로 닫을 때 도쿄의 밤이 가장 세련되게 남습니다.']],en:[['Morning anchor','Tokyo reads better when the first frame comes from an easier axis like Asakusa-Ueno instead of opening with pure Shibuya pressure.'],['Afternoon reset','Give the middle of the day a quieter district such as Kiyosumi or Daikanyama so the route stops feeling like stacked headlines.'],['Night close','One skyline, one later meal, and one smaller street scene are usually enough for Tokyo after dark.']]},
    kyoto:{ko:[['Quiet morning','교토는 기온이나 히가시야마를 이른 시간에 먼저 읽고 빠져나올 때 가장 맑게 시작됩니다.'],['Soft middle','정원, 찻집, 강변처럼 앉아 있는 pocket이 들어가야 교토의 여백이 진짜로 살아납니다.'],['Dusk close','이 도시는 늦은 밤보다 dusk가 핵심입니다. 강변이나 작은 골목 하나로만 닫아도 충분합니다.']],en:[['Quiet morning','Kyoto opens best when Gion or Higashiyama is read early, then left behind before the crowd thickens.'],['Soft middle','A sitting pocket—garden, tea room, or river edge—is what lets Kyoto keep its empty space instead of turning into a list.'],['Dusk close','Dusk matters more than late night here; one river edge or one smaller lane is enough for the close.']]},
    seoul:{ko:[['First district','서울은 성수나 서촌처럼 첫 결이 분명한 동네 하나로 시작할 때 도시의 속도가 가장 자연스럽게 잡힙니다.'],['Midday contrast','낮에는 lighter pocket 하나를 끼워 넣어야 저녁의 오래된 결이 더 강하게 살아납니다.'],['Night district','밤은 을지로·종로처럼 질감이 남는 한 축만 anchor로 두는 편이 훨씬 깔끔합니다.']],en:[['First district','Seoul settles fastest when one clear district such as Seongsu or Seochon opens the day.'],['Midday contrast','A lighter midday pocket gives the evening more contrast and keeps the route from burning too hot too early.'],['Night district','Let one older line like Euljiro-Jongno own the night instead of dividing the evening between too many scenes.']]},
    busan:{ko:[['Sea opener','부산은 첫 바다를 해운대나 송도처럼 접근 쉬운 축으로 열고, 다른 큰 풍경은 뒤로 남겨야 하루가 깨끗하게 읽힙니다.'],['Rest window','오후의 카페나 짧은 산책 같은 rest window가 반드시 있어야 바다 도시 특유의 숨이 살아납니다.'],['Night shore','광안리처럼 식사와 야경이 같이 되는 한 shore만으로도 밤은 충분히 또렷합니다.']],en:[['Sea opener','Busan reads cleanest when the first coast is easy—Haeundae or Songdo—and the other big scenery waits its turn.'],['Rest window','A real pause in the afternoon is what keeps Busan from feeling like nonstop transfers between viewpoints.'],['Night shore','One shore such as Gwangalli is usually enough when dinner and night light close the route together.']]},
    fukuoka:{ko:[['Food-first start','후쿠오카는 하카타나 텐진처럼 첫 식사가 쉬운 축으로 시작할 때 compact city rhythm이 가장 빨리 잡힙니다.'],['Afternoon soften','오호리 공원이나 café pocket으로 오후를 한번 낮춰야 먹거리 일정도 과밀하지 않게 남습니다.'],['Compact night','포장마차 하나와 짧은 강변 산책 정도로 닫을수록 후쿠오카의 compact night가 더 선명합니다.']],en:[['Food-first start','Fukuoka settles fastest when Hakata or Tenjin delivers the first meal without friction.'],['Afternoon soften','One softer pocket such as Ohori Park or a café reset keeps the food-led route from crowding itself.'],['Compact night','A single yatai scene and a short river walk usually capture Fukuoka better than a longer night chain.']]},
    taipei:{ko:[['Soft opening','타이베이는 융캉제나 동먼처럼 골목과 첫 식사가 한 번에 붙는 축으로 시작할 때 밤까지 체력이 가장 잘 남습니다.'],['Textured middle','디화제나 서점 pocket을 넣어야 이 도시가 먹거리만이 아니라 재질과 공기까지 남습니다.'],['Night handoff','야시장은 하나만 선명하게 두고, 늦은 디저트나 tea room으로 두 번째 밤 장면을 넘겨주세요.']],en:[['Soft opening','Taipei opens most gracefully through lanes and a first meal—Yongkang or Dongmen is usually the cleanest handoff.'],['Textured middle','Add Dihua or a bookshop pocket so the city leaves material and texture, not only appetite.'],['Night handoff','Keep one night market vivid, then pass the close to dessert or a later tea room for a softer second scene.']]},
    hongkong:{ko:[['Vertical start','홍콩은 센트럴이나 셩완처럼 경사와 수직감이 보이는 첫 축으로 열어야 도시의 압축감이 바로 읽힙니다.'],['Breathing pocket','오후에는 ferry나 covered mall 같은 pause가 꼭 필요합니다. 그래야 밤 장면이 과로처럼 보이지 않습니다.'],['Harbor close','항구 장면은 하나만 선명하게 남기고, 그 뒤엔 slope street나 디저트 pocket으로 톤을 낮추는 편이 좋습니다.']],en:[['Vertical start','Hong Kong makes sense fastest when the first read comes through a steeper, more vertical axis like Central or Sheung Wan.'],['Breathing pocket','One ferry pause or covered-mall reset in the afternoon keeps the night from feeling like overwork.'],['Harbor close','Keep one harbor scene sharp, then lower the tone through a slope street or dessert pocket so the close stays refined.']]}
  };

  const cityRouteVariationMap = {
    tokyo:{ko:[
      ['비 오는 날','도쿄의 비 오는 날은 “실내를 더 많이 넣는 것”보다 “이동 수를 줄이는 것”이 더 중요합니다. 아사쿠사에서 기요스미나 진보초 같은 실내 밀도 높은 pocket으로 빨리 넘어가면 도시의 형태가 무너지지 않습니다.'],
      ['느린 버전','시부야·하라주쿠를 같은 날 모두 깊게 넣기보다, 한 축만 진하게 읽고 다른 하루는 기요스미·다이칸야마처럼 quieter district에 비워 두는 편이 훨씬 더 세련됩니다.'],
      ['밤 버전','도쿄의 밤은 전망 포인트를 여러 개 넣는 것보다, 늦은 식사 하나와 작은 이자카야 블록 하나로 끝내는 편이 훨씬 더 도쿄답게 남습니다.']
    ],en:[
      ['Rainy version','In rainy Tokyo, reducing the number of jumps matters more than simply moving indoors. Shift early into denser museum, café, or bookshop pockets such as Kiyosumi or Jinbocho so the route keeps its shape.'],
      ['Slower version','Do not let Shibuya and Harajuku both compete for the same day. Give one day to a single headline axis, then leave another day for quieter districts like Kiyosumi or Daikanyama.'],
      ['Night version','Tokyo after dark lands harder when one late dinner and one smaller izakaya block replace multiple skyline or neon stops.']
    ]},
    osaka:{ko:[['비 오는 날','난바·우메다의 실내 이동과 arcade를 활용하고, 줄 긴 맛집 하나보다 실패 적은 여러 끼로 풀면 좋습니다.'],['느린 버전','난바와 우메다를 같은 날 깊게 넣지 말고, 하루 한 축만 읽으면 훨씬 오사카답습니다.'],['밤 버전','도톤보리로 시작하되, 마지막은 광장보다 작은 골목 술집이나 디저트로 가볍게 닫는 편이 좋습니다.']],en:[['Rainy version','Lean on arcades and indoor transitions between Namba and Umeda, and favor several easy meals over one long-line stop.'],['Slower version','Do not read Namba and Umeda deeply on the same day; Osaka feels better when one zone carries the day.'],['Night version','Open through Dotonbori, but let the close happen in a smaller bar lane or dessert stop instead of staying only on the main strip.']]},
    kyoto:{ko:[
      ['비 오는 날','교토의 비 오는 날은 사원 수를 줄이는 것이 핵심입니다. museum pocket, tea room, covered lane을 중심으로 다시 짜면 오히려 더 조용하고 교토다운 하루가 됩니다.'],
      ['느린 버전','하루에 사원 하나와 산책 하나만 남기고, 앉아 있는 시간을 더 길게 두세요. 오카자키나 가모가와 쪽 여백을 길게 잡을수록 교토는 cliché에서 멀어집니다.'],
      ['밤 버전','교토는 늦은 밤보다 dusk가 더 중요합니다. 강변이나 조용한 골목의 해 질 무렵을 주인공으로 두면 충분합니다.']
    ],en:[
      ['Rainy version','In rainy Kyoto, the key move is to reduce the temple count. Rebuild the day around a museum pocket, a tea room, and one covered lane, and the city often becomes even quieter and more convincing.'],
      ['Slower version','Keep only one temple and one walk, then leave more room for sitting than moving. The more air Okazaki or the river edge receives, the less Kyoto feels like a cliché circuit.'],
      ['Night version','Kyoto peaks closer to dusk than to late night. Let one river edge or lane scene carry the close and stop there.']
    ]},
    seoul:{ko:[
      ['비 오는 날','서울의 비 오는 날은 실내로만 도망치기보다, 을지로나 북촌 edge처럼 indoor-to-indoor 이동이 쉬운 district를 중심으로 짜는 편이 좋습니다. 카페, 전시, underground food pocket으로 연결해도 서울의 결은 충분히 남습니다.'],
      ['느린 버전','성수와 연남, 성수와 을지로를 모두 깊게 넣지 말고 한 축만 고르세요. 서촌이나 망원 같은 quieter district를 늘리면 서울이 훨씬 덜 피곤해집니다.'],
      ['밤 버전','루프톱과 한강 장면을 여러 개 넣기보다, 을지로·종로의 오래된 밤 texture 하나만 선명하게 두는 편이 더 서울답습니다.']
    ],en:[
      ['Rainy version','Rainy Seoul works best when the route is rebuilt around districts with easy indoor-to-indoor movement, such as Euljiro or the Bukchon edge. Cafés, exhibitions, and underground food pockets still preserve the city’s grain.'],
      ['Slower version','Do not push Seongsu and Yeonnam, or Seongsu and Euljiro, too deeply into the same trip. Increase quieter districts like Seochon or Mangwon and Seoul immediately feels less exhausting.'],
      ['Night version','Instead of stacking rooftops and river views, keep one older after-dark texture—Euljiro or Jongno—and let that carry the memory.']
    ]},
    busan:{ko:[
      ['비 오는 날','부산의 비 오는 날은 beach count를 줄이고, sea view café나 indoor lookout, old lane pocket을 더 길게 쓰는 편이 낫습니다. 그렇게 해도 부산의 sea-city 결은 충분히 남습니다.'],
      ['느린 버전','해운대·광안리·송도를 다 넣으려 하지 말고, 하루에 coast 축 하나만 두세요. 중간에 영도나 남포 쪽 old lane으로 한 번 낮추면 부산이 훨씬 더 입체적으로 보입니다.'],
      ['밤 버전','부산의 밤은 야경 포인트를 여러 개 넣는 것보다 광안리나 quiet shore line 한 장면만 선명하게 두는 편이 훨씬 깔끔합니다.']
    ],en:[
      ['Rainy version','In rainy Busan, lower the beach count and lengthen sea-view cafés, indoor lookouts, or one old-lane pocket. The city still keeps its sea-and-port identity that way.'],
      ['Slower version','Do not chase Haeundae, Gwangalli, and Songdo in the same trip. Give one day to a single coast axis, then lower the route once through Yeongdo or Nampo.'],
      ['Night version','Busan after dark lands cleanest when one shore scene stays vivid instead of several competing night viewpoints.']
    ]},
    fukuoka:{ko:[
      ['비 오는 날','후쿠오카의 비 오는 날은 오호리 산책을 줄이고 하카타·텐진 indoor meal pocket을 더 촘촘히 잇는 편이 맞습니다. compact city라서 실내 리듬이 훨씬 잘 먹힙니다.'],
      ['느린 버전','하카타와 텐진을 같은 날 모두 깊게 읽기보다, 한 축만 진하게 두고 오후는 야쿠인이나 café pocket으로 느리게 내려가는 편이 훨씬 더 local하게 남습니다.'],
      ['밤 버전','후쿠오카의 밤은 길게 끌지 않는 편이 좋습니다. yatai 하나와 짧은 강변 산책, 혹은 compact bar close 하나만 두면 충분합니다.']
    ],en:[
      ['Rainy version','In rainy Fukuoka, reduce the walk share around Ohori and connect Hakata and Tenjin through stronger indoor meal pockets. Its compact scale makes indoor rhythm work especially well.'],
      ['Slower version','Do not read Hakata and Tenjin too deeply on the same day. Let one axis lead, then lower the afternoon through Yakuin or a café pocket so the city feels more local.'],
      ['Night version','Fukuoka’s night works best when it stays compact—one yatai, one short river walk, or one compact bar close is enough.']
    ]},
    taipei:{ko:[
      ['비 오는 날','타이베이의 비 오는 날은 야시장 비중을 줄이고 bookshop, tea room, covered lane을 더 앞세우는 편이 좋습니다. 그렇게 하면 food-first의 장점은 남기면서도 도시의 texture가 더 선명해집니다.'],
      ['느린 버전','융캉제와 디화제를 모두 깊게 읽기보다, 한 축만 남기고 나머지 시간은 치펀이나 강변 pocket으로 비워 두세요. appetite보다 texture가 먼저 남는 버전입니다.'],
      ['밤 버전','타이베이의 밤은 야시장 하나만으로 끝내지 마세요. 늦은 디저트나 조용한 bar, tea room close를 하나 넣으면 도시가 훨씬 더 오래 갑니다.']
    ],en:[
      ['Rainy version','In rainy Taipei, reduce the night-market weight and bring bookshops, tea rooms, and covered lanes forward. That way the food-first line stays alive while the city’s texture becomes much clearer.'],
      ['Slower version','Do not read Yongkang and Dihua too deeply in the same trip. Let one of them carry the route, then leave the rest of the time for Chifeng or a river pocket so texture leads appetite.'],
      ['Night version','Do not let Taipei’s night end only in one market. Add one late dessert, quiet bar, or tea-room close and the city stays with you much longer.']
    ]},
    hongkong:{ko:[
      ['비 오는 날','홍콩의 비 오는 날은 skyline을 고집하기보다 slope street, covered mall, dessert pocket을 섞어 밀도를 조절하는 편이 낫습니다. vertical energy는 그대로 두되 피로도만 낮추는 방식입니다.'],
      ['느린 버전','센트럴과 침사추이를 둘 다 깊게 밀기보다, 하루 한 축만 진하게 두고 나머지는 PMQ/Soho나 West Kowloon처럼 breathing layer에 비워 두세요.'],
      ['밤 버전','홍콩의 밤은 skyline 여러 곳을 찍는 것보다 harbor scene 하나와 dessert pocket 하나를 남기는 편이 훨씬 세련됩니다.']
    ],en:[
      ['Rainy version','In rainy Hong Kong, do not force the skyline. Balance slope streets, covered malls, and dessert pockets so the city keeps its vertical energy without exhausting the route.'],
      ['Slower version','Do not push Central and Tsim Sha Tsui deeply on the same day. Let one side carry the day, then leave the rest for PMQ/Soho or West Kowloon as breathing layers.'],
      ['Night version','Hong Kong at night feels more elegant when one harbor scene and one dessert pocket replace several competing skyline stops.']
    ]}
  };
function getCityRouteVariations(slug){
    const polished = exampleVariationPolishMap[slug]?.[lang] || exampleVariationPolishMap[slug]?.en || [];
    const base = polished.length ? polished : (cityRouteVariationMap[slug]?.[lang] || cityRouteVariationMap[slug]?.en || []);
    const citySlug = cityGuideSlugFromExample(slug);
    const cityEntry = citySlug ? editorialData.city[citySlug] : null;
    const cityData = cityEntry ? (cityEntry[lang] || cityEntry.en || cityEntry.ko) : null;
    const profiles = citySlug && cityData ? getCityNeighborhoodProfiles(citySlug, cityData, atlasLocaleMap[lang]?.[citySlug] || null) : [];
    const names = profiles.slice(0,3).map(item => item.name || item.district || item.note).filter(Boolean);
    const routeHints = {
      rainy: {
        title: lang === 'ko' ? '비 오는 날' : lang === 'ja' ? '雨の日' : lang === 'zhHant' ? '雨天版' : 'Rainy version',
        desc: lang === 'ko'
          ? `${names[0] || '실내 포켓'}처럼 실내 fallback이 쉬운 축을 앞에 두고, 이동 수를 한 단계 줄입니다.`
          : lang === 'ja'
            ? `${names[0] || '屋内ポケット'} のように室内 fallback を置きやすい軸を前に出し、移動回数を一段落とします。`
            : lang === 'zhHant'
              ? `把 ${names[0] || '室內 pocket'} 這種比較好接 indoor fallback 的軸線往前放，並把移動次數再減一點。`
              : `Lead with an easier indoor fallback like ${names[0] || 'one indoor pocket'}, then cut one move out of the day.`,
        focus: names[0] || (lang === 'ko' ? '실내 pocket' : lang === 'ja' ? '室内ポケット' : lang === 'zhHant' ? '室內 pocket' : 'Indoor pocket'),
        href: citySlug ? `../city/${citySlug}.html#city-neighborhoods` : '#'
      },
      slower: {
        title: lang === 'ko' ? '느린 버전' : lang === 'ja' ? 'ゆっくり版' : lang === 'zhHant' ? '慢節奏版' : 'Slower version',
        desc: lang === 'ko'
          ? `${names[1] || names[0] || '한 구역'}만 깊게 두고 나머지는 산책과 pause로 남기면 이 샘플의 결이 훨씬 잘 남습니다.`
          : lang === 'ja'
            ? `${names[1] || names[0] || '一つのエリア'} だけを深く置き、残りを散歩と pause に回すと、このサンプルのトーンがきれいに残ります。`
            : lang === 'zhHant'
              ? `只把 ${names[1] || names[0] || '一個區域'} 讀深，其他時間留給散步和 pause，這條 sample 的節奏會更漂亮。`
              : `Go deep on ${names[1] || names[0] || 'one district'} only, then leave the rest for walks and pause windows so the route keeps an edited, cover-story feel.`,
        focus: names[1] || names[0] || (lang === 'ko' ? '느린 동네' : lang === 'ja' ? '静かな近所' : lang === 'zhHant' ? '慢節奏鄰里' : 'Slower district'),
        href: citySlug ? `../city/${citySlug}.html#city-districts` : '#'
      },
      night: {
        title: lang === 'ko' ? '밤 버전' : lang === 'ja' ? '夜版' : lang === 'zhHant' ? '夜間版' : 'Night version',
        desc: lang === 'ko'
          ? `${names[2] || names[0] || '밤 anchor'} 하나만 선명하게 남기고, 앞부분은 더 짧게 정리하면 도시의 야간 결이 더 살아납니다.`
          : lang === 'ja'
            ? `${names[2] || names[0] || '夜のアンカー'} を一つだけくっきり残し、前半を短く整えると夜の質感が強く残ります。`
            : lang === 'zhHant'
              ? `把 ${names[2] || names[0] || '夜晚 anchor'} 留成唯一重點，前半段再收短一點，城市的夜節奏會更明確。`
              : `Keep ${names[2] || names[0] || 'one night anchor'} as the only strong close and shorten the earlier half of the day.`,
        focus: names[2] || names[0] || (lang === 'ko' ? '밤 anchor' : lang === 'ja' ? '夜のアンカー' : lang === 'zhHant' ? '夜間 anchor' : 'Night anchor'),
        href: citySlug ? `../city/${citySlug}.html#city-sample` : '#'
      }
    };
    const fallback = [routeHints.rainy, routeHints.slower, routeHints.night];
    const enriched = (base.length ? base.map((item, idx) => ({ title:item[0], desc:item[1], focus:fallback[idx]?.focus, href:fallback[idx]?.href })) : fallback);
    return enriched;
  }

  function getExampleCrossLinks(slug){
    const citySlug = cityGuideSlugFromExample(slug);
    const cityName = editorialData.example[slug]?.city || '';
    const map = {
      'tokyo-3n4d-first-trip': ['osaka-2n3d-family','kyoto-2n3d-slow-trip'],
      'osaka-2n3d-family': ['kyoto-2n3d-slow-trip','tokyo-3n4d-first-trip'],
      'kyoto-2n3d-slow-trip': ['osaka-2n3d-family','fukuoka-2n3d-food-trip'],
      'seoul-2n3d-city-vibes': ['busan-2n3d-with-parents','taipei-3n4d-night-food'],
      'busan-2n3d-with-parents': ['jeju-3n4d-island-breeze','seoul-2n3d-city-vibes'],
      'fukuoka-2n3d-food-trip': ['taipei-3n4d-night-food','osaka-2n3d-family'],
      'sapporo-3n4d-snow-soft': ['sendai-2n3d-city-rest','tokyo-3n4d-first-trip'],
      'sendai-2n3d-city-rest': ['sapporo-3n4d-snow-soft','tokyo-3n4d-first-trip'],
      'okinawa-3n4d-island-breeze': ['jeju-3n4d-island-breeze','busan-2n3d-with-parents'],
      'taipei-3n4d-night-food': ['hongkong-3n4d-harbor-rhythm','fukuoka-2n3d-food-trip'],
      'hongkong-3n4d-harbor-rhythm': ['macau-2n3d-heritage-night','taipei-3n4d-night-food'],
      'macau-2n3d-heritage-night': ['hongkong-3n4d-harbor-rhythm','taipei-3n4d-night-food']
    };
    const siblings = (map[slug] || []).map(key => editorialData.example[key]).filter(Boolean);
    const labels = {
      section: lang === 'ko' ? '이 흐름과 같이 읽기' : lang === 'ja' ? 'この流れと一緒に読む' : lang === 'zhHant' ? '和這條節奏一起讀' : 'Continue this reading flow',
      desc: lang === 'ko' ? 'atlas, city guide, 그리고 결이 비슷하거나 대비가 좋은 example까지 같이 보면 route logic이 더 빨리 잡힙니다.' : lang === 'ja' ? 'atlas、city guide、そして相性のよい対比 sample まで一緒に見ると、route logic がもっと早くつかめます。' : lang === 'zhHant' ? '把 atlas、city guide，還有調性相近或對比好的 example 一起讀，route logic 會更快成形。' : 'Read the atlas, city guide, and one matching or contrasting example together to lock the route logic faster.',
      atlas: lang === 'ko' ? 'atlas에서 같은 결 찾기' : lang === 'ja' ? 'atlas で近いトーンを見る' : lang === 'zhHant' ? '在 atlas 看相近節奏' : 'Find the nearest tone in atlas',
      neighborhoods: lang === 'ko' ? '동네 픽 더 읽기' : lang === 'ja' ? '近所のピックを深く読む' : lang === 'zhHant' ? '繼續讀鄰里精選' : 'Deepen the neighborhood picks',
      related: lang === 'ko' ? '비슷한 결의 example' : lang === 'ja' ? '近いトーンの example' : lang === 'zhHant' ? '相近調性的 example' : 'Matching example',
      contrast: lang === 'ko' ? '대비되는 example' : lang === 'ja' ? '対比のある example' : lang === 'zhHant' ? '形成對比的 example' : 'Contrast example'
    };
    const cards = [
      { label:'Atlas', title:cityName, desc:labels.atlas, href:exampleAtlasHref(), tags:['atlas', citySlug || cityName.toLowerCase()] },
      { label:'City', title:`${cityName} guide`, desc:labels.neighborhoods, href:`../city/${citySlug}.html#city-neighborhoods`, tags:[citySlug || cityName.toLowerCase(),'neighborhood'] }
    ];
    for (let i = 0; i < siblings.length; i += 1) {
      const item = siblings[i];
      const title = (lang === 'ko' ? item.titleKo : item.titleEn) || item.titleEn;
      const exampleKey = Object.keys(editorialData.example).find(key => editorialData.example[key] === item) || '';
      cards.push({
        label: i === 0 ? (lang === 'ko' ? 'Near tone' : lang === 'ja' ? '近いトーン' : lang === 'zhHant' ? '相近調性' : 'Near tone') : (lang === 'ko' ? 'Contrast' : lang === 'ja' ? '対比トーン' : lang === 'zhHant' ? '對比調性' : 'Contrast'),
        title,
        desc: i === 0 ? labels.related : labels.contrast,
        href:`../example/${exampleKey}.html`,
        tags:[item.city.toLowerCase().replace(/\s+/g,''),'example']
      });
    }
    return { labels, cards };
  }

  function renderExampleFlowBridge(slug){
    const entry = editorialData.example[slug];
    if (!entry) return '';
    const citySlug = cityGuideSlugFromExample(slug);
    const cityName = entry.city || '';
    const labels = {
      eyebrow: lang === 'ko' ? 'Route bridge' : lang === 'ja' ? 'ルートの橋渡し' : lang === 'zhHant' ? '路線橋接' : 'Route bridge',
      title: lang === 'ko' ? 'atlas에서 읽고, city에서 깊게 보고, example에서 결을 잡습니다' : lang === 'ja' ? 'atlas で読み、city で深め、example で結をつかみます' : lang === 'zhHant' ? '先在 atlas 讀，再到 city 深看，最後在 example 抓住節奏' : 'Read it in atlas, deepen it in city, then lock the route in the example',
      desc: lang === 'ko' ? '이 샘플은 단독 페이지가 아니라 city atlas와 도시 가이드의 연장선입니다.' : lang === 'ja' ? 'このサンプルは単独ページではなく、city atlas と都市ガイドの延長線です。' : lang === 'zhHant' ? '這個 example 不是獨立頁，而是 city atlas 與城市指南的延長。' : 'This example works best as a continuation of the atlas card and the city guide.',
      atlas: lang === 'ko' ? 'atlas로 돌아가기' : lang === 'ja' ? 'atlas に戻る' : lang === 'zhHant' ? '回到 atlas' : 'Back to atlas',
      city: lang === 'ko' ? '도시 가이드 더 읽기' : lang === 'ja' ? '都市ガイドを深く読む' : lang === 'zhHant' ? '繼續讀城市指南' : 'Read the city guide',
      planner: lang === 'ko' ? '이 흐름으로 플래너 열기' : lang === 'ja' ? 'この流れで Planner を開く' : lang === 'zhHant' ? '用這個節奏打開 Planner' : 'Open Planner with this logic'
    };
    const flow = getExampleCrossLinks(slug);
    const extraCards = (flow.cards || []).slice(2,6).map(card => `<a class="example-flow-card example-flow-card-quiet" href="${card.href}" data-signal-tags="${(card.tags||[]).join('|')}" data-signal-city="${cityName}" data-signal-title="${card.title}" data-signal-source="example-crosslink"><span class="mini-label">${card.label}</span><strong>${card.title}</strong><p>${card.desc}</p></a>`).join('');
    return `
      <section class="section example-flow-bridge">
        <article class="info-card editorial-panel editorial-panel-soft">
          <div class="section-head compact"><div><div class="editorial-kicker">${labels.eyebrow}</div><h2 class="section-title">${labels.title}</h2><p class="section-desc">${labels.desc}</p></div></div>
          <div class="example-flow-grid">
            <a class="example-flow-card" href="${exampleAtlasHref()}" data-signal-tags="atlas|${citySlug}" data-signal-city="${cityName}" data-signal-title="${cityName}" data-signal-source="example-atlas"><span class="mini-label">Atlas</span><strong>${cityName}</strong><p>${labels.atlas}</p></a>
            <a class="example-flow-card" href="../city/${citySlug}.html#city-neighborhoods" data-signal-tags="${citySlug}|neighborhood" data-signal-city="${cityName}" data-signal-title="${cityName} guide" data-signal-source="example-city"><span class="mini-label">City</span><strong>${cityName} guide</strong><p>${labels.city}</p></a>
            <a class="example-flow-card" href="${plannerUrlForCity(cityName)}" data-signal-tags="${citySlug}|planner" data-signal-city="${cityName}" data-signal-title="${cityName}" data-signal-source="example-planner"><span class="mini-label">Planner</span><strong>${cityName}</strong><p>${labels.planner}</p></a>
          </div>
          <div class="section-head compact example-recommend-head"><div><div class="editorial-kicker">${flow.labels.section}</div><p class="section-desc">${flow.labels.desc}</p></div></div>
          <div class="example-flow-grid example-flow-grid-secondary">${extraCards}</div>
        </article>
      </section>`;
  }


  function neighborhoodDepthForCity(slug, data, atlasLocale){
    const picks = (atlasLocale?.picks || data.districts.map(item => item[0]).slice(0,3)).slice(0,3);
    const districts = (atlasLocale?.districts || data.districts || []).slice();
    const sampleLead = atlasLocale?.sampleLead || data.lead || '';
    const linkedLabel = lang === 'ko' ? '연결 district' : lang === 'ja' ? 'つながる district' : lang === 'zhHant' ? '連動 district' : 'Linked district';
    const routeLabel = lang === 'ko' ? '읽는 포인트' : lang === 'ja' ? '読むポイント' : lang === 'zhHant' ? '閱讀重點' : 'Route note';
    const bestLabel = lang === 'ko' ? '잘 여는 시간' : lang === 'ja' ? '入りやすい時間帯' : lang === 'zhHant' ? '最適時段' : 'Best window';
    const windowText = lang === 'ko' ? ['첫날 오후','둘째 날 오전','해 질 무렵'] : lang === 'ja' ? ['到着日の午後','2日目の午前','夕方'] : lang === 'zhHant' ? ['抵達日午後','第二天上午','傍晚'] : ['arrival afternoon','second morning','late afternoon'];
    return picks.map((pick, index) => {
      const district = districts[index % Math.max(1, districts.length)] || [pick, sampleLead];
      return {
        name: pick,
        district: district[0] || pick,
        note: district[1] || sampleLead,
        deeper: sampleLead || data.focusDesc || data.lead || '',
        linkedLabel,
        routeLabel,
        bestLabel,
        window: windowText[index % windowText.length]
      };
    });
  }

  function exampleKeyFromPath(example=''){
    return String(example || '').replace(/\.html$/,'').trim();
  }

  function cityAtlasCardMarkup(slug, regionLabel, copy, page='home', index=0){
    const city = editorialData.city[slug];
    if (!city) return '';
    const cityCopy = city[lang] || city.en || city.ko;
    const atlasLocale = atlasLocaleMap[lang]?.[slug] || null;
    const example = editorialData.example[exampleKeyFromPath(city.example)] || null;
    const exampleCopy = example ? (example[lang] || example.en || example.ko) : null;
    const lead = atlasLocale?.lead || cityCopy.lead || '';
    const districts = (atlasLocale?.districts || cityCopy.districts || []).slice(0,2);
    const sampleShape = atlasLocale?.sampleShape || exampleCopy?.routeShape || cityCopy.sampleDesc || '';
    const sampleLead = atlasLocale?.sampleLead || exampleCopy?.whyBullets?.[0] || (cityCopy.sampleDays?.[0]?.[1]) || '';
    const picks = atlasLocale?.picks || districts.map(item => item[0]).slice(0,3);
    const rhythmSignals = getCityDayRhythmSignals(slug, cityCopy);
    const voice = getCityVoice(city.planner) || {};
    const visual = cityAtlasVisualPriorityMap[slug] || {};
    const visualLabel = visual?.label?.[lang] || visual?.label?.en || city.country;
    const featured = index === 0;
    const coverNoteLabel = lang === 'ko' ? 'Cover note' : lang === 'ja' ? 'カバーノート' : lang === 'zhHant' ? '封面註記' : 'Cover note';
    const picksLead = lang === 'ko' ? '이 도시를 읽기 시작하기 좋은 첫 동네들입니다.' : lang === 'ja' ? 'この街を読み始める入口として相性がいい近所です。' : lang === 'zhHant' ? '這些近所最適合當成讀這座城市的第一個入口。' : 'These are the neighborhoods that open the city most naturally.';
    return `
      <article class="city-atlas-card info-card city-atlas-card--${slug} ${featured ? 'city-atlas-card-featured' : ''}">
        <div class="city-atlas-media">
          <img src="${resolvePath(city.image)}" alt="${city.planner}" style="object-position:${visual.position || 'center center'}">
          <div class="city-atlas-overlay">
            <div class="city-atlas-overlay-top"><span class="collection-kicker">${regionLabel}</span><span class="city-atlas-country">${city.country}</span></div>
            <div class="city-atlas-overlay-copy"><strong>${city.planner}</strong><span>${voice.strap || lead}</span></div>
            <div class="city-atlas-overlay-foot"><span class="city-atlas-priority">${visualLabel}</span></div>
          </div>
        </div>
        <div class="city-atlas-body">
          <div class="city-atlas-topline"><span class="city-atlas-cover-label">${coverNoteLabel}</span><span class="meta-inline">${voice.mood || city.country}</span></div>
          <h3>${city.planner}</h3>
          <p class="city-atlas-lead">${lead}</p>
          <div class="city-atlas-block city-atlas-block-cover-note">
            <strong>${copy.picks}</strong>
            <p class="city-atlas-picks-lead">${picksLead}</p>
            <div class="city-atlas-pick-row">
              ${picks.map(item => `<span class="city-atlas-pick">${item}</span>`).join('')}
            </div>
          </div>
          <div class="city-atlas-block">
            <strong>${copy.districts}</strong>
            <div class="city-atlas-districts">
              ${districts.map(item => `<div class="city-atlas-district"><span>${item[0]}</span><small>${item[1]}</small></div>`).join('')}
            </div>
          </div>
          <div class="city-atlas-block city-atlas-sample">
            <strong>${copy.sample}</strong>
            <p>${sampleShape}</p>
            <small>${sampleLead}</small>
          </div>
          ${rhythmSignals.length ? `<div class="city-atlas-block city-atlas-rhythm-thin"><strong>${lang === 'ko' ? 'Day rhythm' : lang === 'ja' ? '一日のリズム' : lang === 'zhHant' ? '一日節奏' : 'Day rhythm'}</strong><div class="city-atlas-rhythm-row">${rhythmSignals.map(item => `<span class="city-atlas-rhythm-chip">${item}</span>`).join('')}</div></div>` : ''}
          <div class="card-actions city-atlas-actions">
            <a class="soft-btn" href="${resolvePath(city.guide || ('city/' + slug + '.html'))}">${copy.guide}</a>
            <a class="ghost-btn" href="${resolvePath('example/' + city.example)}">${copy.sample}</a>
            <button class="primary-btn" data-start-city="${city.planner}">${copy.plan}</button>
          </div>
        </div>
      </article>`;
  }

  function renderCityAtlas(page='home'){
    const root = document.getElementById(page === 'magazine' ? 'magazineCityAtlasRoot' : 'homeCityAtlasRoot');
    if (!root) return;
    const copy = getAtlasText(page);
    const groups = [
      { key:'japan', label:copy.region.japan, cities:['tokyo','osaka','kyoto','fukuoka','sapporo'] },
      { key:'korea', label:copy.region.korea, cities:['seoul','busan','jeju','gyeongju'] },
      { key:'greater', label:copy.region.greater, cities:['taipei','hongkong','macau'] }
    ];
    const groupMarkup = groups.map(group => `
      <section class="city-atlas-group">
        <div class="city-atlas-group-head"><span class="eyebrow">${group.label}</span></div>
        <div class="city-atlas-grid">${group.cities.map((slug, index) => cityAtlasCardMarkup(slug, group.label, copy, page, index)).join('')}</div>
      </section>`).join('');
    root.innerHTML = `
      <section class="section city-atlas-section city-atlas-section-${page}" id="cityAtlas">
        <div class="section-head"><div><span class="eyebrow">${copy.eyebrow}</span><h2 class="section-title">${copy.title}</h2><p class="section-desc">${copy.desc}</p></div></div>
        ${groupMarkup}
      </section>`;
    root.querySelectorAll('[data-start-city]').forEach(btn => btn.addEventListener('click', () => { location.href = plannerUrlForCity(btn.dataset.startCity || ''); }));
  }

  function renderHomeSeasonalDesk(){
    if (document.body.dataset.page !== 'planner') return;
    const anchor = document.getElementById('homeCommunityRoot');
    if (!anchor) return;
    let root = document.getElementById('homeSeasonalRoot');
    if (!root) {
      root = document.createElement('div');
      root.id = 'homeSeasonalRoot';
      anchor.insertAdjacentElement('afterend', root);
    }
    const copy = (lang === 'ko') ? {
      eyebrow:'Seasonal desk', title:'Read the season and situation before the city', desc:'You can start before choosing a city. These edits begin from spring, rainy days, midsummer, or late-night rhythm.', guide: lang==='ja' ? '都市ガイド' : lang==='zhHant' ? '城市指南' : 'City guide', sample: lang==='ja' ? 'サンプルルート' : lang==='zhHant' ? '範例路線' : 'Sample', plan: lang==='ja' ? 'このベースを使う' : lang==='zhHant' ? '使用這個基底' : 'Use this base'
    } : {
      eyebrow:'季節のデスク', title:'季節と状況から始めるエディトリアル設計', desc:'都市からでなくても始められます。春、雨、真夏の海辺、遅めの街リズムから整える編集です。', guide: lang==='ja' ? '都市ガイド' : lang==='zhHant' ? '城市指南' : 'City guide', sample: lang==='ja' ? 'サンプルルート' : lang==='zhHant' ? '範例路線' : 'Sample', plan: lang==='ja' ? 'このベースを使う' : lang==='zhHant' ? '使用這個基底' : 'Use this base'
    };
    const items = getSeasonalEditorialCollections().cover;
    root.innerHTML = `
      <section class="section seasonal-system-section">
        <div class="section-head">
          <div><span class="eyebrow">${copy.eyebrow}</span><h2 class="section-title">${copy.title}</h2><p class="section-desc">${copy.desc}</p></div>
        </div>
        <div class="seasonal-system-grid">
          ${items.map((item, idx) => seasonalCardMarkup(item, copy, idx === 0)).join('')}
        </div>
      </section>`;
    wireSeasonalButtons(root, 'planner');
    attachSignalTracking(root);
  }

  function renderMagazineSeasonalDesk(){
    if (document.body.dataset.page !== 'magazine') return;
    const anchor = document.getElementById('magazineCommunityRoot');
    if (!anchor) return;
    let root = document.getElementById('magazineSeasonalRoot');
    if (!root) {
      root = document.createElement('div');
      root.id = 'magazineSeasonalRoot';
      anchor.insertAdjacentElement('afterend', root);
    }
    const copy = (lang === 'ko') ? {
      eyebrow:'Seasonal editorial system', title:'Read the city bases that fit this season first', desc:'After the trending shelf comes season and situation. Start from trip temperature and time-of-day, and the city narrows faster.', guide: lang==='ja' ? '都市ガイド' : lang==='zhHant' ? '城市指南' : 'City guide', sample: lang==='ja' ? 'サンプルルート' : lang==='zhHant' ? '範例路線' : 'Sample', plan: lang==='ja' ? 'Planner へ進む' : lang==='zhHant' ? '接到 Planner' : 'Continue in Planner'
    } : {
      eyebrow:'季節の編集システム', title:'この季節に合うベースから先に読む', desc:'注目棚の次に来るのは季節と状況です。旅の温度や時間帯から入ると、都市がもっと早く絞れます。', guide: lang==='ja' ? '都市ガイド' : lang==='zhHant' ? '城市指南' : 'City guide', sample: lang==='ja' ? 'サンプルルート' : lang==='zhHant' ? '範例路線' : 'Sample', plan: lang==='ja' ? 'Planner へ進む' : lang==='zhHant' ? '接到 Planner' : 'Continue in Planner'
    };
    const items = getSeasonalEditorialCollections().magazine;
    root.innerHTML = `
      <section class="section seasonal-system-section seasonal-system-section-magazine">
        <div class="section-head">
          <div><span class="eyebrow">${copy.eyebrow}</span><h2 class="section-title">${copy.title}</h2><p class="section-desc">${copy.desc}</p></div>
        </div>
        <div class="seasonal-system-grid seasonal-system-grid-magazine">
          ${items.map((item, idx) => seasonalCardMarkup(item, copy, idx === 1)).join('')}
        </div>
      </section>`;
    wireSeasonalButtons(root, 'page');
    attachSignalTracking(root);
    attachSignalTracking(root);
  }

  
  
  function getPriorityCrosslinks(){
    const base = pathRoot === '../' ? '../' : '';
    return {
      tokyo:{
        ko:{article:['Article depth','첫 도쿄 다음에 읽어야 하는 quieter second Tokyo'], city:['City depth','책방·저녁·quiet pocket으로 도쿄를 다시 여는 방법'], example:['Sample','아이콘 축 뒤에 quieter layer를 끼우는 샘플'], result:['Result','first trip / return trip 기준으로 route를 다시 자르는 방법']},
        en:{article:['Article depth','What to read after the obvious first Tokyo frame'], city:['City depth','How books, dinner, and quieter pockets reopen Tokyo'], example:['Sample','A sample that slips one softer layer behind the icon line'], result:['Result','How to re-cut the route for a first trip or a return trip']},
        ja:{article:['Article depth','最初の東京のあとに読む、静かな二回目の東京'], city:['City depth','本・夕食・quiet pocket で東京を開き直す方法'], example:['Sample','アイコンの軸の後ろに柔らかい層を入れる sample'], result:['Result','初回 / 再訪で route を切り直す方法']},
        zhHant:{article:['Article depth','在第一個 Tokyo 之後，怎麼讀更安靜的第二個 Tokyo'], city:['City depth','用書店、晚餐與 quiet pocket 重新打開 Tokyo'], example:['Sample','在 icon 軸線後面放進柔軟層次的 sample'], result:['Result','依初訪 / 再訪重新切 route 的方法']}
      },
      seoul:{
        ko:{article:['Article depth','서울이 대비만으로 끝나지 않게 읽는 방법'], city:['City depth','Seochon과 Mangwon으로 서울의 숨을 붙이는 방법'], example:['Sample','contrast 뒤에 quieter layer를 넣는 샘플'], result:['Result','첫 서울 / 다시 읽는 서울로 나눠 route를 정리하는 법']},
        en:{article:['Article depth','How to keep Seoul from ending as only contrast'], city:['City depth','Using Seochon and Mangwon to give Seoul room to breathe'], example:['Sample','A sample that inserts one quieter layer behind the contrast line'], result:['Result','How to split the route between first Seoul and return Seoul']},
        ja:{article:['Article depth','Seoul を“対比だけ”で終わらせない読み方'], city:['City depth','Seochon と Mangwon で Seoul に呼吸を足す方法'], example:['Sample','contrast の後ろに quieter layer を入れる sample'], result:['Result','初めての Seoul / 再訪の Seoul で route を分ける方法']},
        zhHant:{article:['Article depth','不要讓 Seoul 只剩下反差的讀法'], city:['City depth','用 Seochon 與 Mangwon 讓 Seoul 多一口呼吸'], example:['Sample','在 contrast 後面放入 quieter layer 的 sample'], result:['Result','把第一次 Seoul 與再訪 Seoul 分開整理 route 的方法']}
      },
      kyoto:{
        ko:{article:['Article depth','분명한 교토 뒤에 더 오래 남는 여백 붙이기'], city:['City depth','Okazaki와 Nishijin으로 교토를 가볍게 다시 읽기'], example:['Sample','icon 뒤에 river-soft layer를 붙이는 샘플'], result:['Result','초행 교토와 재방문 교토를 다르게 정리하는 법']},
        en:{article:['Article depth','Adding the softer layer that lasts after obvious Kyoto'], city:['City depth','Re-reading Kyoto through Okazaki and Nishijin'], example:['Sample','A sample that adds a river-soft layer after the icon frame'], result:['Result','How to separate a first Kyoto from a return Kyoto']},
        ja:{article:['Article depth','わかりやすい Kyoto のあとに残る、やわらかな余白'], city:['City depth','Okazaki と Nishijin で Kyoto を軽く読み直す'], example:['Sample','icon の後ろに river-soft layer を置く sample'], result:['Result','初回の Kyoto と再訪の Kyoto を分けて整える方法']},
        zhHant:{article:['Article depth','在明顯 Kyoto 之後補上一層更耐記的留白'], city:['City depth','用 Okazaki 與 Nishijin 重新讀輕一點的 Kyoto'], example:['Sample','在 icon 後面接上 river-soft layer 的 sample'], result:['Result','把初訪 Kyoto 與再訪 Kyoto 分開整理的方法']}
      },
      taipei:{
        ko:{article:['Article depth','타이베이를 food-first 너머로 읽는 방법'], city:['City depth','Chifeng와 Treasure Hill로 texture를 붙이는 방법'], example:['Sample','food line 옆에 quieter pocket을 두는 샘플'], result:['Result','첫 타이베이 / 다시 보는 타이베이 route를 가르는 기준']},
        en:{article:['Article depth','Reading Taipei beyond only food-first'], city:['City depth','Adding texture through Chifeng and Treasure Hill'], example:['Sample','A sample that keeps one quieter pocket beside the meal line'], result:['Result','How to separate first Taipei from return Taipei']},
        ja:{article:['Article depth','Taipei を food-first の先へ読む方法'], city:['City depth','Chifeng と Treasure Hill で texture を足す方法'], example:['Sample','食の軸の横に quieter pocket を置く sample'], result:['Result','初めての Taipei / 再訪の Taipei を分ける基準']},
        zhHant:{article:['Article depth','把 Taipei 讀到 food-first 之外的方法'], city:['City depth','用 Chifeng 與 Treasure Hill 補上 texture'], example:['Sample','在吃的軸線旁邊放一個 quieter pocket 的 sample'], result:['Result','區分初訪 Taipei 與再訪 Taipei 的 기준']}
      },
      hongkong:{
        ko:{article:['Article depth','홍콩의 수직감 뒤에 숨 고를 층 놓기'], city:['City depth','PMQ·Soho·West Kowloon으로 홍콩을 다시 여는 법'], example:['Sample','vertical line 뒤에 harbor pocket을 넣는 샘플'], result:['Result','첫 홍콩 / 재방문 홍콩 route를 다르게 여는 기준']},
        en:{article:['Article depth','Placing one breathing layer behind Hong Kong verticality'], city:['City depth','Reopening Hong Kong through PMQ, Soho, and West Kowloon'], example:['Sample','A sample that places one harbor pocket behind the vertical line'], result:['Result','How to open first Hong Kong and return Hong Kong differently']},
        ja:{article:['Article depth','Hong Kong の縦の強さの後ろに、呼吸の層を置く'], city:['City depth','PMQ・Soho・West Kowloon で Hong Kong を開き直す'], example:['Sample','vertical line の後ろに harbor pocket を置く sample'], result:['Result','初回の Hong Kong と再訪の Hong Kong を分けて開く基準']},
        zhHant:{article:['Article depth','在 Hong Kong 的垂直感後面放一層呼吸'], city:['City depth','用 PMQ、Soho、West Kowloon 重新打開 Hong Kong'], example:['Sample','在 vertical line 後面放一個 harbor pocket 的 sample'], result:['Result','分開打開初訪 Hong Kong 與再訪 Hong Kong 的方法']}
      },
      busan:{
        ko:{article:['Article depth','postcard coast 뒤에 부산의 생활감을 붙이는 법'], city:['City depth','Yeongdo와 Bosu/Nampo로 부산을 더 입체적으로 읽기'], example:['Sample','sea line 뒤에 harbor texture를 붙이는 샘플'], result:['Result','첫 부산 / 다시 읽는 부산을 나누는 기준']},
        en:{article:['Article depth','Adding Busan’s everyday harbor layer behind the postcard coast'], city:['City depth','Reading Busan more dimensionally through Yeongdo and Bosu/Nampo'], example:['Sample','A sample that puts harbor texture behind the sea line'], result:['Result','How to separate first Busan from return Busan']},
        ja:{article:['Article depth','ポストカードの海の後ろに、Busan の日常を足す'], city:['City depth','Yeongdo と Bosu/Nampo で Busan を立体的に読む'], example:['Sample','sea line の後ろに harbor texture を置く sample'], result:['Result','初回の Busan と再訪の Busan を分ける基準']},
        zhHant:{article:['Article depth','在 postcard 海岸線後面補上 Busan 的日常港口層'], city:['City depth','用 Yeongdo 與 Bosu/Nampo 更立體地讀 Busan'], example:['Sample','在 sea line 後面放進 harbor texture 的 sample'], result:['Result','區分初訪 Busan 與再訪 Busan 的方式']}
      },
      fukuoka:{
        ko:{article:['Article depth','compact route 뒤에 더 부드러운 후쿠오카 붙이기'], city:['City depth','Hakata와 Yakuin으로 후쿠오카의 quiet pocket 여는 법'], example:['Sample','food-first 뒤에 soft local pocket을 두는 샘플'], result:['Result','첫 후쿠오카 / 재방문 후쿠오카 route를 나누는 기준']},
        en:{article:['Article depth','Adding a softer Fukuoka behind the compact route'], city:['City depth','Opening quieter pockets through Hakata and Yakuin'], example:['Sample','A sample that keeps one soft local pocket after the food-first line'], result:['Result','How to separate first Fukuoka from return Fukuoka']},
        ja:{article:['Article depth','コンパクトな route の後ろに、やわらかな Fukuoka を足す'], city:['City depth','Hakata と Yakuin で quiet pocket を開く方法'], example:['Sample','food-first の後ろに soft local pocket を置く sample'], result:['Result','初回の Fukuoka と再訪の Fukuoka を分ける基準']},
        zhHant:{article:['Article depth','在緊湊 route 後面補上一層更柔軟的 Fukuoka'], city:['City depth','用 Hakata 與 Yakuin 打開 quiet pocket'], example:['Sample','在 food-first 後面放進 soft local pocket 的 sample'], result:['Result','區分初訪 Fukuoka 與再訪 Fukuoka 的方法']}
      }
    };
  }

  function getPriorityCrosslinkPack(slug=''){
    const entry = getPriorityCrosslinks()[String(slug || '').toLowerCase()];
    if (!entry) return null;
    return entry[lang] || entry.en || entry.ko || null;
  }

  function renderHomePriorityStories(){
    if (document.body.dataset.page !== 'home') return;
    const anchor = document.getElementById('cityAtlasRoot') || document.getElementById('homeMagazineShelfRoot');
    if (!anchor) return;
    let root = document.getElementById('homePriorityStoriesRoot');
    if (!root) {
      root = document.createElement('div');
      root.id = 'homePriorityStoriesRoot';
      anchor.parentNode.insertBefore(root, anchor.nextSibling);
    }
    const pack = getPriorityMagazineArticles()[lang] || getPriorityMagazineArticles().en;
    const items = pack.items.slice(0,4);
    root.innerHTML = `<section class="section priority-story-strip"><div class="section-head compact"><div><span class="eyebrow">${pack.eyebrow}</span><h2 class="section-title">${lang === 'ko' ? '도시 읽기 story layer' : lang === 'ja' ? '都市を読む story layer' : lang === 'zhHant' ? '讀城市的 story layer' : 'A lighter city story layer'}</h2><p class="section-desc">${lang === 'ko' ? '홈에서도 release 우선 도시의 읽는 결을 바로 잡을 수 있게 얇게 붙였습니다.' : lang === 'ja' ? 'ホームでも release 優先都市の読み方をすぐ拾えるよう、薄くつないでいます。' : lang === 'zhHant' ? '在首頁也先薄薄接上 release 優先城市的閱讀方式。' : 'A thinner home strip that surfaces how to read the priority cities before planning.'}</p></div><a class="soft-link" href="${pathRoot === '../' ? '../' : ''}magazine/index.html#magazinePriorityArticleRoot">${lang === 'ko' ? '매거진에서 더 읽기' : lang === 'ja' ? 'Magazine でもっと読む' : lang === 'zhHant' ? '去 Magazine 繼續讀' : 'Read more in Magazine'}</a></div><div class="priority-story-row">${items.map(item => `<article class="priority-story-mini info-card"><span class="collection-kicker">${item.city}</span><strong>${item.title}</strong><p>${item.desc}</p><div class="card-actions"><a class="soft-btn" href="${item.guide}">${pack.guide}</a><a class="ghost-btn" href="${item.sample}">${pack.sample}</a></div></article>`).join('')}</div></section>`;
  }

  function renderPriorityCrosslinks(slug, type='city'){
    const pack = getPriorityCrosslinkPack(slug);
    if (!pack) return '';
    const base = pathRoot === '../' ? '../' : '';
    const cityHref = `${base}city/${slug}.html#city-priority-depth`;
    const articleHref = `${base}magazine/index.html#magazinePriorityArticleRoot`;
    const exampleHref = (() => {
      const examples = {
        tokyo:'tokyo-3n4d-first-trip', seoul:'seoul-2n3d-city-vibes', kyoto:'kyoto-2n3d-slow-trip',
        taipei:'taipei-3n4d-night-food', hongkong:'hongkong-3n4d-harbor-rhythm',
        busan:'busan-2n3d-with-parents', fukuoka:'fukuoka-2n3d-food-trip'
      };
      return `${base}example/${examples[slug]}.html`;
    })();
    const resultHref = `${base}index.html#planner`;
    const copyTitle = type === 'result'
      ? (lang === 'ko' ? '다음 읽기' : lang === 'ja' ? '次に読むもの' : lang === 'zhHant' ? '下一步閱讀' : 'Read next')
      : type === 'example'
      ? (lang === 'ko' ? '샘플 다음 읽기' : lang === 'ja' ? 'sample の次に読む' : lang === 'zhHant' ? 'sample 之後讀什麼' : 'Read after this sample')
      : (lang === 'ko' ? '도시 더 읽기' : lang === 'ja' ? '都市をさらに読む' : lang === 'zhHant' ? '把城市讀深一點' : 'Read this city deeper');
    return `<section class="section priority-crosslink-section"><div class="section-head compact"><div><span class="eyebrow">Cross-link</span><h3 class="section-title">${copyTitle}</h3></div></div><div class="priority-crosslink-grid">
      <a class="priority-crosslink-card info-card" href="${articleHref}"><span class="collection-kicker">${pack.article[0]}</span><strong>${pack.article[1]}</strong></a>
      <a class="priority-crosslink-card info-card" href="${cityHref}"><span class="collection-kicker">${pack.city[0]}</span><strong>${pack.city[1]}</strong></a>
      <a class="priority-crosslink-card info-card" href="${exampleHref}"><span class="collection-kicker">${pack.example[0]}</span><strong>${pack.example[1]}</strong></a>
      <a class="priority-crosslink-card info-card" href="${resultHref}"><span class="collection-kicker">${pack.result[0]}</span><strong>${pack.result[1]}</strong></a>
    </div></section>`;
  }


  function getSecondaryCityStories(){
    const base = pathRoot === '../' ? '../' : '';
    return {
      ko:{
        eyebrow:'확장 도시',
        title:'Expansion 도시 가볍게 읽기',
        desc:'release 우선 도시 다음으로, 같은 구조를 가볍게 따라오는 도시들입니다.',
        city:'도시 보기', sample:'샘플 보기',
        items:[
          {city:'Osaka', title:'첫 식사와 늦은 마감으로 읽는 Osaka', desc:'오사카는 첫 식사 라인과 늦은 마감만 선명하게 잡아도 도시 결이 빨리 보입니다.', cityHref:`${base}city/osaka.html`, sampleHref:`${base}example/osaka-2n3d-food-trip.html`},
          {city:'Jeju', title:'바람, 해안, 그리고 느린 리셋', desc:'제주는 단순 scenic보다 느린 리듬으로 붙일 때 도시의 성격이 더 잘 남습니다.', cityHref:`${base}city/jeju.html`, sampleHref:`${base}example/jeju-2n3d-slow-reset.html`},
          {city:'Sapporo', title:'날씨를 천천히 읽는 Sapporo', desc:'삿포로는 날씨와 넓은 거리 폭을 같이 읽을수록 훨씬 더 편안하게 남습니다.', cityHref:`${base}city/sapporo.html`, sampleHref:`${base}example/sapporo-2n3d-winter-city.html`},
          {city:'Okinawa', title:'해안 다음에 붙는 더 느린 pocket', desc:'오키나와는 바다 이후의 느린 pocket이 여행의 결을 더 분명하게 만듭니다.', cityHref:`${base}city/okinawa.html`, sampleHref:`${base}example/okinawa-3n4d-sea-reset.html`},
          {city:'Sendai', title:'북쪽의 더 차분한 pace', desc:'센다이는 headline보다 잔잔한 거리 리듬으로 읽을 때 더 오래 남습니다.', cityHref:`${base}city/sendai.html`, sampleHref:`${base}example/sendai-2n3d-calm-city.html`},
          {city:'Gyeongju', title:'숨 쉴 여백이 있는 heritage city', desc:'경주는 조용한 유산 도시로 읽을수록 차별점이 더 또렷해집니다.', cityHref:`${base}city/gyeongju.html`, sampleHref:`${base}example/gyeongju-2n3d-heritage-walk.html`},
          {city:'Macau', title:'오래된 골목과 밤 장면을 나눠 읽는 Macau', desc:'마카오는 오래된 거리와 밤 장면을 짧게 나눌수록 도시가 더 또렷하게 정리됩니다.', cityHref:`${base}city/macau.html`, sampleHref:`${base}example/macau-2n3d-night-lanes.html`}
        ]
      },
      en:{
        eyebrow:'Expansion cities',
        title:'Expansion cities — lighter reads',
        desc:'A lighter expansion layer for cities that come after the seven priority release cities.',
        city:'Read city guide', sample:'Read sample route',
        items:[
          {city:'Osaka', title:'Food-first Osaka with a late close', desc:'Osaka reads best when the first meal line and the late close stay crisp.', cityHref:`${base}city/osaka.html`, sampleHref:`${base}example/osaka-2n3d-food-trip.html`},
          {city:'Jeju', title:'Wind, coast, and a slower reset', desc:'Jeju lands better as wind, coast, and a slower reset than as a simple scenic list.', cityHref:`${base}city/jeju.html`, sampleHref:`${base}example/jeju-2n3d-slow-reset.html`},
          {city:'Sapporo', title:'A clearer slow-weather city', desc:'Sapporo lands better when weather, street width, and slower pacing are read together.', cityHref:`${base}city/sapporo.html`, sampleHref:`${base}example/sapporo-2n3d-winter-city.html`},
          {city:'Okinawa', title:'Coast first, then slower pockets', desc:'Okinawa becomes clearer once one slower pocket sits behind the coast line.', cityHref:`${base}city/okinawa.html`, sampleHref:`${base}example/okinawa-3n4d-sea-reset.html`},
          {city:'Sendai', title:'A softer north-side pace', desc:'Sendai holds longer through calm street rhythm than through headline stops.', cityHref:`${base}city/sendai.html`, sampleHref:`${base}example/sendai-2n3d-calm-city.html`},
          {city:'Gyeongju', title:'Quiet heritage with room to breathe', desc:'Gyeongju gets stronger when it is read as a quiet heritage city with pace.', cityHref:`${base}city/gyeongju.html`, sampleHref:`${base}example/gyeongju-2n3d-heritage-walk.html`},
          {city:'Macau', title:'A compact split between old streets and night glow', desc:'Macau gets clearer once old lanes and night glow are split into two clean layers.', cityHref:`${base}city/macau.html`, sampleHref:`${base}example/macau-2n3d-night-lanes.html`}
        ]
      },
      ja:{
        eyebrow:'拡張都市',
        title:'Expansion 都市を軽く読む',
        desc:'優先7都市のあとに、同じ読み方を軽く追いかける都市たちです。',
        city:'都市を見る', sample:'サンプルを見る',
        items:[
          {city:'Osaka', title:'最初の食と遅い締めで読む Osaka', desc:'最初の一食と夜の締めを揃えると、Osaka の性格はかなり早く見えてきます。', cityHref:`${base}city/osaka.html`, sampleHref:`${base}example/osaka-2n3d-food-trip.html`},
          {city:'Jeju', title:'風、海岸、そのあとに来る slower reset', desc:'Jeju は scenic list より、ゆっくりした回復の都市として読む方が強いです。', cityHref:`${base}city/jeju.html`, sampleHref:`${base}example/jeju-2n3d-slow-reset.html`},
          {city:'Sapporo', title:'天気ごと読む、やわらかな Sapporo', desc:'天気とゆるい速度を一緒に読むほど、Sapporo は心地よく残ります。', cityHref:`${base}city/sapporo.html`, sampleHref:`${base}example/sapporo-2n3d-winter-city.html`},
          {city:'Okinawa', title:'海から開いて、ゆっくり閉じる Okinawa', desc:'海辺で開き、遅い pocket で閉じると Okinawa の輪郭がはっきりします。', cityHref:`${base}city/okinawa.html`, sampleHref:`${base}example/okinawa-3n4d-sea-reset.html`},
          {city:'Sendai', title:'北側のやわらかな pace を持つ Sendai', desc:'headline よりも静かな街路の rhythm で読む方が、Sendai は長く残ります。', cityHref:`${base}city/sendai.html`, sampleHref:`${base}example/sendai-2n3d-calm-city.html`},
          {city:'Gyeongju', title:'余白のある heritage city としての Gyeongju', desc:'静かな遺産都市として読むほど、Gyeongju の違いがはっきりします。', cityHref:`${base}city/gyeongju.html`, sampleHref:`${base}example/gyeongju-2n3d-heritage-walk.html`},
          {city:'Macau', title:'古い路地と夜の光を分けて読む Macau', desc:'古い路地と夜の光を短く分けると、Macau はずっと整理されます。', cityHref:`${base}city/macau.html`, sampleHref:`${base}example/macau-2n3d-night-lanes.html`}
        ]
      },
      zhHant:{
        eyebrow:'擴張城市',
        title:'輕量閱讀 Expansion 城市',
        desc:'在七個優先城市之後，先用較輕的方式把同一閱讀結構帶到這些城市。',
        city:'讀城市', sample:'看 sample',
        items:[
          {city:'Osaka', title:'用第一餐與晚收尾讀 Osaka', desc:'只要先把第一餐與夜晚收尾抓穩，Osaka 的性格就會很快出來。', cityHref:`${base}city/osaka.html`, sampleHref:`${base}example/osaka-2n3d-food-trip.html`},
          {city:'Jeju', title:'風、海岸，與之後更慢的 reset', desc:'Jeju 作為慢節奏 reset 城市，比 scenic 清單更有記憶點。', cityHref:`${base}city/jeju.html`, sampleHref:`${base}example/jeju-2n3d-slow-reset.html`},
          {city:'Sapporo', title:'一座更適合慢慢讀天氣的 Sapporo', desc:'把天氣、街道寬度與慢節奏一起讀，Sapporo 會舒服很多。', cityHref:`${base}city/sapporo.html`, sampleHref:`${base}example/sapporo-2n3d-winter-city.html`},
          {city:'Okinawa', title:'先海邊、再慢慢收的 Okinawa', desc:'用海岸線打開，再讓慢 pocket 接住，Okinawa 會更有輪廓。', cityHref:`${base}city/okinawa.html`, sampleHref:`${base}example/okinawa-3n4d-sea-reset.html`},
          {city:'Sendai', title:'帶著北方柔和節奏的 Sendai', desc:'比起 headline 景點，用安靜街道 rhythm 讀 Sendai 會更耐記。', cityHref:`${base}city/sendai.html`, sampleHref:`${base}example/sendai-2n3d-calm-city.html`},
          {city:'Gyeongju', title:'留白更足的 heritage city：Gyeongju', desc:'把 Gyeongju 當成安靜的遺產城市來讀，差異會更清楚。', cityHref:`${base}city/gyeongju.html`, sampleHref:`${base}example/gyeongju-2n3d-heritage-walk.html`},
          {city:'Macau', title:'把老街與夜色分開讀的 Macau', desc:'把老街與夜晚光感短短分開，Macau 會清楚很多。', cityHref:`${base}city/macau.html`, sampleHref:`${base}example/macau-2n3d-night-lanes.html`}
        ]
      }
    };
  }

  function renderSecondaryCityStoryLayer(){
    if (document.body.dataset.page !== 'home' && document.body.dataset.page !== 'magazine') return;
    const target = document.getElementById('homeStoryLayerRoot') || document.getElementById('magazinePriorityArticleRoot');
    if (!target) return;
    let root = document.getElementById('secondaryCityStoryLayerRoot');
    if (!root) {
      root = document.createElement('div');
      root.id = 'secondaryCityStoryLayerRoot';
      target.parentNode.insertBefore(root, target.nextSibling);
    }
    const copy = getSecondaryCityStories()[lang] || getSecondaryCityStories().en;
    root.innerHTML = `<section class="section secondary-story-section" id="expansionCityStories" data-section="expansion-stories">
      <div class="section-head"><div><span class="eyebrow">${copy.eyebrow}</span><h2 class="section-title">${copy.title}</h2><p class="section-desc">${copy.desc}</p></div></div>
      <div class="priority-article-grid secondary-story-grid">${copy.items.map(item => `<article class="priority-article-card info-card secondary-story-card"><div class="priority-article-top"><span class="collection-kicker">${item.city}</span></div><h3>${item.title}</h3><p>${item.desc}</p><div class="card-actions"><a class="soft-btn" href="${item.cityHref}">${copy.city}</a><a class="ghost-btn" href="${item.sampleHref}">${copy.sample}</a></div></article>`).join('')}</div>
    </section>`;
  }



function getPriorityMagazineArticles(){
    const base = pathRoot === '../' ? '../' : '';
    return {
      ko:{
        eyebrow:'도시 읽기',
        title:'Release cities — deeper reads',
        desc:'도시를 어디서 시작하고, 어디서 늦추고, 무엇을 덜어내야 하는지까지 먼저 읽게 하는 article layer입니다.',
        guide:'도시 읽기', sample:'샘플 보기',
        openingLabel:'Opening paragraph', whoLabel:'이런 사람에게', skipLabel:'과하게 넣지 말 것', slowLabel:'천천히 둘 구간', firstSceneLabel:'첫 장면',
        items:[
          {city:'Tokyo', title:'첫 도쿄는 아이콘으로, 두 번째 도쿄는 quieter dinner rhythm으로', desc:'도쿄는 아이콘만 따라가면 쉽게 피곤해집니다. quieter pocket과 dinner rhythm이 들어와야 두 번째 레이어가 보입니다.', opening:'첫 도쿄는 아사쿠사·우에노 같은 이해 쉬운 장면으로 열어야 합니다. 하지만 오래 기억되는 건 기요스미, 진보초, 가구라자카처럼 속도를 한 번 낮춰 주는 pocket입니다.', who:'도쿄를 체크리스트보다 도시 결로 읽고 싶은 사람, 첫 방문 이후 두 번째 버전을 준비하는 사람.', skip:'시부야, 하라주쿠, 신주쿠를 같은 리듬으로 전부 깊게 넣지 마세요. headline district를 너무 많이 겹치면 피로감만 남습니다.', slow:'Kiyosumi의 river edge, Jinbocho의 책방 축, Kagurazaka의 dinner slope.', firstScene:'아침의 Asakusa 혹은 Ueno처럼 이해 쉬운 frame으로 시작한 뒤, 오후는 quieter pocket으로 한 번 눌러 주세요.', guide:`${base}city/tokyo.html#city-priority-depth`, sample:`${base}example/tokyo-3n4d-first-trip.html`},
          {city:'Seoul', title:'서울은 contrast만으로 끝내지 말고 quieter district 하나를 꼭 남겨야 한다', desc:'서울의 새 것과 오래된 것의 대비는 강하지만, 오래 남는 건 quieter district의 호흡입니다.', opening:'서울은 성수와 을지로처럼 강한 대비만 따라가도 설명은 쉽습니다. 하지만 실제로 기억에 남는 건 서촌, 망원, 종로 backstreet처럼 서울의 숨을 보여주는 district입니다.', who:'서울을 trend city보다 lived-in city로 읽고 싶은 사람, 첫 서울 이후 더 서울다운 결을 찾는 사람.', skip:'성수와 연남, 성수와 을지로를 모두 같은 밀도로 넣지 마세요. contrast를 너무 많이 겹치면 서울이 얇아집니다.', slow:'Seochon의 낮은 골목, Mangwon의 생활감, Jongno backstreet의 old lane texture.', firstScene:'성수나 북촌 edge처럼 이해 쉬운 district로 연 뒤, 서촌 같은 quieter lane으로 중간 호흡을 바꾸세요.', guide:`${base}city/seoul.html#city-priority-depth`, sample:`${base}example/seoul-2n3d-city-vibes.html`},
          {city:'Kyoto', title:'교토는 iconic frame 뒤에 river edge를 붙일 때 cliché를 벗어난다', desc:'교토는 icon만 따라가면 금방 cliché가 됩니다. river edge와 museum pocket이 있어야 더 오래 남습니다.', opening:'히가시야마와 기온은 교토를 이해하기 쉽게 여는 축입니다. 하지만 교토를 다시 떠올리게 만드는 건 오카자키의 museum pocket, 니시진의 조용한 west side, 가모강의 dusk입니다.', who:'교토를 사원 체크리스트가 아니라 quiet editorial city로 읽고 싶은 사람.', skip:'사원 수를 너무 많이 넣지 마세요. 교토는 하나 더 보는 것보다 하나 덜 보고 더 오래 앉는 쪽이 낫습니다.', slow:'Okazaki의 museum / café layer, Nishijin의 quieter west pocket, Kamo river edge의 dusk walk.', firstScene:'동쪽 icon district를 이른 시간에 읽고, 하루 후반은 river edge 쪽 여백으로 넘기세요.', guide:`${base}city/kyoto.html#city-priority-depth`, sample:`${base}example/kyoto-2n3d-slow-trip.html`},
          {city:'Taipei', title:'타이베이는 food-first만으론 부족하고, texture pocket이 있어야 완성된다', desc:'음식은 타이베이를 쉽게 설명해 주지만, texture pocket이 있어야 도시가 또렷해집니다.', opening:'융캉제, 디화제, 야시장만으로도 타이베이는 만족도가 높습니다. 하지만 치펀, Treasure Hill, tea room pocket이 들어오면 타이베이는 appetite 이상의 도시가 됩니다.', who:'타이베이를 food trip 이상으로 읽고 싶은 사람, meal rhythm과 city texture를 같이 챙기고 싶은 사람.', skip:'식사 축을 하루 종일 겹치지 마세요. 같은 톤의 market / café / dessert를 너무 많이 넣으면 도시가 평평해집니다.', slow:'Chifeng의 middle texture, Dihua late pocket, Treasure Hill의 river-side pause.', firstScene:'Yongkang이나 Dongmen처럼 meal rhythm이 쉬운 축으로 열고, 오후에는 texture pocket 하나를 꼭 넣으세요.', guide:`${base}city/taipei.html#city-priority-depth`, sample:`${base}example/taipei-3n4d-night-food.html`},
          {city:'Hong Kong', title:'Hong Kong 는 skyline 뒤에 slope street 와 harbor edge 가 필요하다', desc:'홍콩은 skyline pressure만으로도 강하지만, slope street와 harbor edge가 있어야 우아해집니다.', opening:'센트럴과 침사추이의 skyline은 홍콩을 한 번에 이해하게 해 줍니다. 하지만 PMQ와 Soho, Sheung Wan, West Kowloon 같은 layer가 들어와야 홍콩의 압축감이 세련되게 풀립니다.', who:'홍콩을 강한 skyline city가 아니라 more controlled editorial city로 읽고 싶은 사람.', skip:'센트럴과 침사추이를 같은 날 모두 깊게 밀지 마세요. skyline pressure를 겹치면 도시가 너무 단단해집니다.', slow:'PMQ와 Soho의 slope street, Sheung Wan backstreet, West Kowloon의 harbor edge.', firstScene:'Central이나 ferry처럼 vertical / harbor anchor로 열고, 중간에는 slope street 쪽으로 템포를 낮추세요.', guide:`${base}city/hongkong.html#city-priority-depth`, sample:`${base}example/hongkong-3n4d-harbor-rhythm.html`},
          {city:'Busan', title:'Busan 은 coast line 뒤에 harbor texture 가 들어가야 postcard 를 벗어난다', desc:'부산은 바다만으로도 읽히지만, harbor texture가 들어와야 더 입체적입니다.', opening:'해운대와 광안리는 부산을 가장 쉽게 이해시키는 바다 축입니다. 하지만 영도, 남포, 보수 같은 harbor-side everyday layer가 들어와야 부산이 postcard를 벗어납니다.', who:'부산을 scenic coast가 아니라 sea + port city로 같이 읽고 싶은 사람.', skip:'여러 해변을 같은 밀도로 겹치지 마세요. coast line을 늘리는 것보다 harbor texture 하나가 더 중요합니다.', slow:'Yeongdo의 다른 높이, Nampo와 Bosu의 old lane, Suyeong back lane의 quieter coast texture.', firstScene:'Haeundae 같은 쉬운 sea anchor로 시작한 뒤, 중간에는 harbor-side district로 한 번 낮추세요.', guide:`${base}city/busan.html#city-priority-depth`, sample:`${base}example/busan-2n3d-with-parents.html`},
          {city:'Fukuoka', title:'Fukuoka 는 quiet local pocket 이 들어와야 distinct 해진다', desc:'후쿠오카는 compact해서 쉽게 한 덩어리로 기억됩니다. quiet local pocket이 들어와야 도시 결이 살아납니다.', opening:'하카타와 텐진의 meal rhythm은 후쿠오카를 가장 쉽게 만족스럽게 만듭니다. 하지만 Yakuin과 Ohori edge 같은 quieter pocket이 있어야 후쿠오카가 local하고 distinct하게 남습니다.', who:'짧은 일정 안에서도 food-first와 local rhythm을 같이 가져가고 싶은 사람.', skip:'하카타와 텐진을 같은 날 모두 깊게 읽지 마세요. compact city일수록 한 축만 진하게 남기는 편이 낫습니다.', slow:'Yakuin café pocket, Ohori edge, compact late bar close.', firstScene:'첫 식사 축이 쉬운 Hakata로 열고, 오후는 Yakuin이나 café pocket으로 조용히 내려가세요.', guide:`${base}city/fukuoka.html#city-priority-depth`, sample:`${base}example/fukuoka-2n3d-food-trip.html`}
        ]
      },
      en:{
        eyebrow:'City reading stories',
        title:'Release cities — deeper reads',
        desc:'An article layer for reading where to begin, where to slow down, and what to leave out before a city collapses into a stop list.',
        guide:'Read city guide', sample:'Read sample route',
        openingLabel:'Opening paragraph', whoLabel:'Who this works for', skipLabel:'What to skip', slowLabel:'Where to slow down', firstSceneLabel:'Best first scene',
        items:[
          {city:'Tokyo', title:'First Tokyo through icons, second Tokyo through quieter dinner rhythm', desc:'Tokyo gets tiring if it stays only on icons. Quieter pockets and dinner rhythm are what reveal its second layer.', opening:'A first Tokyo opens cleanest through Asakusa or Ueno. What stays longer, though, are places like Kiyosumi, Jinbocho, and Kagurazaka: districts that lower the pace without flattening the city.', who:'Travelers who want Tokyo to feel like material and rhythm, not just landmarks, and anyone shaping a second Tokyo rather than a first checklist.', skip:'Do not force Shibuya, Harajuku, and Shinjuku to carry equal weight. Too many headline districts create fatigue faster than memory.', slow:'The river edge in Kiyosumi, the bookshop layer in Jinbocho, the dinner slope in Kagurazaka.', firstScene:'Open through Asakusa or Ueno in the morning, then let the afternoon move into one quieter pocket.', guide:`${base}city/tokyo.html#city-priority-depth`, sample:`${base}example/tokyo-3n4d-first-trip.html`},
          {city:'Seoul', title:'Do not let Seoul end as contrast alone', desc:'Seoul’s contrast works quickly, but quieter districts are what make the city stay longer.', opening:'Seoul is easy to explain through Seongsu and Euljiro. It becomes much harder to forget once Seochon, Mangwon, or the Jongno backstreets enter the route and let the city breathe.', who:'Travelers who want Seoul as a lived-in city rather than only a trend city, and anyone looking for the next layer beyond contrast.', skip:'Do not overload the trip with too many contrast-heavy districts in the same rhythm. Seoul thins out when everything tries to be loud.', slow:'Seochon’s low-key lanes, Mangwon’s everyday tempo, and the older backstreet grain of Jongno.', firstScene:'Open through an easy district such as Seongsu or a Bukchon edge, then change the day’s pace through a quieter lane district.', guide:`${base}city/seoul.html#city-priority-depth`, sample:`${base}example/seoul-2n3d-city-vibes.html`},
          {city:'Kyoto', title:'Kyoto escapes cliché once a river edge follows the iconic frame', desc:'Kyoto becomes cliché quickly on icons alone. River edges and museum pockets are what keep it alive.', opening:'Higashiyama and Gion are still the right way to open Kyoto. But what makes the city linger is the softer after-layer: Okazaki’s museum pocket, Nishijin’s quiet west side, and dusk along the Kamo river.', who:'Travelers who want Kyoto as a quiet editorial city rather than a temple checklist.', skip:'Do not add too many temples simply because they fit. In Kyoto, one less stop and one longer pause is almost always better.', slow:'Okazaki’s museum-and-café layer, Nishijin’s quiet west pocket, and the Kamo river at dusk.', firstScene:'Read the eastern icon districts early, then let the latter half of the day open into river-edge space.', guide:`${base}city/kyoto.html#city-priority-depth`, sample:`${base}example/kyoto-2n3d-slow-trip.html`},
          {city:'Taipei', title:'Food first is not enough for Taipei', desc:'Food explains Taipei easily, but textural pockets are what complete it.', opening:'Yongkang, Dihua, and one night market are enough to make Taipei enjoyable. What makes it distinct are the added textures: Chifeng, Treasure Hill, and the slower tea-room pockets that shift the city beyond appetite.', who:'Travelers who want Taipei as more than a food trip, and who want meal rhythm and city texture at the same time.', skip:'Do not let every hour revolve around the next food stop. Too many similar market, café, and dessert beats flatten the city fast.', slow:'Chifeng’s middle texture, Dihua late in the day, and Treasure Hill with one slower river pause.', firstScene:'Open through Yongkang or Dongmen, then place one textural pocket clearly into the afternoon.', guide:`${base}city/taipei.html#city-priority-depth`, sample:`${base}example/taipei-3n4d-night-food.html`},
          {city:'Hong Kong', title:'Hong Kong becomes elegant once slope streets and harbor edge soften the skyline', desc:'Hong Kong’s skyline is powerful enough on its own; slope streets and harbor edges are what make it elegant.', opening:'Central and Tsim Sha Tsui explain Hong Kong immediately. PMQ, Soho, Sheung Wan, and West Kowloon are the layers that stop skyline pressure from becoming the entire trip.', who:'Travelers who want Hong Kong as a controlled editorial city rather than a nonstop skyline rush.', skip:'Do not drive both Central and Tsim Sha Tsui too deeply on the same day. When skyline pressure stacks too hard, the city loses nuance.', slow:'The slope-street grain of PMQ and Soho, the backstreets of Sheung Wan, and the harbor edge at West Kowloon.', firstScene:'Open through Central or the ferry as a vertical-harbor anchor, then lower the middle through slope streets.', guide:`${base}city/hongkong.html#city-priority-depth`, sample:`${base}example/hongkong-3n4d-harbor-rhythm.html`},
          {city:'Busan', title:'Busan needs harbor texture behind the coast line', desc:'Busan is readable through the sea, but harbor texture is what makes it dimensional.', opening:'Haeundae and Gwangalli are the easiest coast anchors. But Busan only moves beyond postcard mode once Yeongdo, Nampo, and Bosu bring in the port-city layer.', who:'Travelers who want Busan as sea and port together, not only as a scenic coast trip.', skip:'Do not stack beach after beach at the same weight. One harbor-texture district usually matters more than another coastline repeat.', slow:'Yeongdo’s different height, the older lane texture of Nampo and Bosu, and quieter back-lane coastal edges.', firstScene:'Open through an easy sea anchor such as Haeundae, then lower the day once through a harbor-side district.', guide:`${base}city/busan.html#city-priority-depth`, sample:`${base}example/busan-2n3d-with-parents.html`},
          {city:'Fukuoka', title:'Fukuoka becomes distinct once quiet local pockets follow the food line', desc:'Fukuoka is compact enough to blur into one easy memory. Quiet local pockets are what keep it distinct.', opening:'Hakata and Tenjin deliver the easiest meal rhythm in the city. What makes Fukuoka feel local rather than generic are the softer layers: Yakuin, Ohori edge, and one quieter late close.', who:'Travelers who want both food-first comfort and local rhythm inside a short itinerary.', skip:'Do not try to read Hakata and Tenjin equally deeply on the same day. Compact cities benefit most when one axis carries the memory.', slow:'Yakuin’s café pocket, the Ohori edge, and one compact late bar close.', firstScene:'Open through Hakata for the first meal line, then lower the afternoon quietly through Yakuin or one café pocket.', guide:`${base}city/fukuoka.html#city-priority-depth`, sample:`${base}example/fukuoka-2n3d-food-trip.html`}
        ]
      },
      ja:{
        eyebrow:'City reading stories',
        title:'Release cities — deeper reads',
        desc:'どこから始め、どこで速度を落とし、何を入れすぎないかを先に読むための article layer です。',
        guide:'都市を読む', sample:'サンプルを見る',
        openingLabel:'Opening paragraph', whoLabel:'向いている人', skipLabel:'入れすぎないこと', slowLabel:'ゆっくり置く場所', firstSceneLabel:'最初の scene',
        items:[
          {city:'Tokyo', title:'最初の Tokyo は icon、二回目の Tokyo は quieter dinner rhythm で読む', desc:'Tokyo は icon だけだと疲れやすい都市です。quieter pocket と dinner rhythm が入ってはじめて二層目が見えます。', opening:'最初の Tokyo は Asakusa や Ueno のようなわかりやすい景色で開くのが正解です。けれど長く残るのは、Kiyosumi、Jinbocho、Kagurazaka のように速度を一度落としてくれる pocket です。', who:'Tokyo を landmark list ではなく material と rhythm で読みたい人。二回目の Tokyo を作りたい人。', skip:'Shibuya、Harajuku、Shinjuku を同じ密度で全部深く入れないでください。headline district を重ねすぎると疲れだけが残ります。', slow:'Kiyosumi の river edge、Jinbocho の本の層、Kagurazaka の dinner slope。', firstScene:'朝は Asakusa か Ueno から始めて、午後は quieter pocket へ落としてください。', guide:`${base}city/tokyo.html#city-priority-depth`, sample:`${base}example/tokyo-3n4d-first-trip.html`},
          {city:'Seoul', title:'Seoul を contrast だけで終わらせない', desc:'Seoul の contrast は強いですが、長く残るのは quieter district の呼吸です。', opening:'Seoul は Seongsu と Euljiro の対比だけでも説明できます。けれど本当に残るのは Seochon、Mangwon、Jongno backstreet のような district です。', who:'Seoul を trend city より lived-in city として読みたい人。contrast の次の層を探している人。', skip:'contrast の強い district を同じ密度で詰め込みすぎないでください。すべてを loud にすると Seoul は薄くなります。', slow:'Seochon の静かな lane、Mangwon の daily tempo、Jongno backstreet の古い grain。', firstScene:'Seongsu や Bukchon edge のようなわかりやすい district で開き、その後は quieter lane へ速度を落としてください。', guide:`${base}city/seoul.html#city-priority-depth`, sample:`${base}example/seoul-2n3d-city-vibes.html`},
          {city:'Kyoto', title:'Kyoto は river edge が入ると cliché から抜ける', desc:'Kyoto は icon だけだとすぐ cliché になります。river edge と museum pocket があると一気に持ちが良くなります。', opening:'Higashiyama と Gion は京都を開く正しい方法です。けれど本当に残るのは Okazaki の museum pocket、Nishijin の quiet west side、Kamo River の dusk です。', who:'Kyoto を temple checklist ではなく quiet editorial city として読みたい人。', skip:'寺を増やしすぎないでください。Kyoto はひとつ多く見るより、ひとつ減らして長く座る方が良いです。', slow:'Okazaki の museum/café layer、Nishijin の quiet west pocket、Kamo River の dusk walk。', firstScene:'東側の icon district は早い時間に読み、後半は river edge に余白を渡してください。', guide:`${base}city/kyoto.html#city-priority-depth`, sample:`${base}example/kyoto-2n3d-slow-trip.html`},
          {city:'Taipei', title:'Taipei は food first だけでは足りない', desc:'food は Taipei をわかりやすくしますが、textural pocket が入って初めて都市が完成します。', opening:'Yongkang、Dihua、night market だけでも Taipei は満足できます。けれど Chifeng、Treasure Hill、tea-room pocket が入ると appetite 以上の都市になります。', who:'Taipei を food trip 以上の都市として読みたい人。meal rhythm と city texture を両方ほしい人。', skip:'一日中、次の food stop だけで回さないでください。同じ market / café / dessert のリズムを重ねすぎると平坦になります。', slow:'Chifeng の middle texture、Dihua late、Treasure Hill と river pause。', firstScene:'Yongkang か Dongmen の meal line で開き、午後には textural pocket をひとつ明確に置いてください。', guide:`${base}city/taipei.html#city-priority-depth`, sample:`${base}example/taipei-3n4d-night-food.html`},
          {city:'Hong Kong', title:'Hong Kong は skyline の後ろに slope street と harbor edge が必要', desc:'Hong Kong の skyline は十分に強いですが、slope street と harbor edge があると一気に上品になります。', opening:'Central と Tsim Sha Tsui だけでも Hong Kong はすぐに理解できます。けれど PMQ、Soho、Sheung Wan、West Kowloon が入ると skyline pressure が旅のすべてではなくなります。', who:'Hong Kong を nonstop skyline rush ではなく、more controlled editorial city として読みたい人。', skip:'Central と Tsim Sha Tsui を同じ日に両方深く入れすぎないでください。skyline pressure を重ねすぎると nuance が消えます。', slow:'PMQ と Soho の slope street、Sheung Wan の backstreet、West Kowloon の harbor edge。', firstScene:'Central か ferry を vertical / harbor anchor にして、その後は slope street へ速度を落としてください。', guide:`${base}city/hongkong.html#city-priority-depth`, sample:`${base}example/hongkong-3n4d-harbor-rhythm.html`},
          {city:'Busan', title:'Busan は coast line の後ろに harbor texture が要る', desc:'Busan は sea だけでも読めますが、harbor texture が入って初めて立体的になります。', opening:'Haeundae と Gwangalli は最もわかりやすい coast anchor です。けれど Yeongdo、Nampo、Bosu が入ると Busan は postcard mode を超えます。', who:'Busan を scenic coast ではなく sea + port city として読みたい人。', skip:'beach を同じ重さで重ねないでください。もう一つの coast line より、harbor-texture district の方が意味があります。', slow:'Yeongdo の高さ、Nampo/Bosu の old lane、quieter coastal back lane。', firstScene:'Haeundae のような easy sea anchor で開き、中盤で harbor-side district に一度落としてください。', guide:`${base}city/busan.html#city-priority-depth`, sample:`${base}example/busan-2n3d-with-parents.html`},
          {city:'Fukuoka', title:'Fukuoka は quiet local pocket が入ると急に distinct になる', desc:'Fukuoka は compact なので簡単な一つの記憶にまとまりやすい都市です。quiet local pocket が入ると急に distinct になります。', opening:'Hakata と Tenjin の meal rhythm は最も簡単に満足を作ります。けれど Yakuin と Ohori edge のような softer layer が入ると Fukuoka は local な輪郭を持ち始めます。', who:'短い itinerary の中でも food first と local rhythm の両方を持ち帰りたい人。', skip:'Hakata と Tenjin を同じ日に同じ深さで読まないでください。compact city ほど、一つの軸だけを濃く残す方が強いです。', slow:'Yakuin の café pocket、Ohori edge、compact な late bar close。', firstScene:'最初の meal line は Hakata で始め、午後は Yakuin か café pocket へ静かに落としていってください。', guide:`${base}city/fukuoka.html#city-priority-depth`, sample:`${base}example/fukuoka-2n3d-food-trip.html`}
        ]
      },
      zhHant:{
        eyebrow:'City reading stories',
        title:'Release cities — deeper reads',
        desc:'在變成停靠點清單之前，先讀懂從哪裡開始、哪裡該慢下來、什麼不要塞太滿的 article layer。',
        guide:'讀城市', sample:'看 sample',
        openingLabel:'Opening paragraph', whoLabel:'適合這樣的人', skipLabel:'不要塞太滿', slowLabel:'適合放慢的地方', firstSceneLabel:'最佳第一個 scene',
        items:[
          {city:'Tokyo', title:'第一個 Tokyo 用 icon 打開，第二個 Tokyo 靠 quieter dinner rhythm 留下來', desc:'Tokyo 只靠 icon 很快就會疲勞。真正讓第二層跑出來的，是 quieter pocket 與 dinner rhythm。', opening:'第一個 Tokyo 用 Asakusa 或 Ueno 這種容易理解的畫面打開最乾淨。真正會留下來的，通常是 Kiyosumi、Jinbocho、Kagurazaka 這些會把速度往下壓一點的 pocket。', who:'想把 Tokyo 讀成 material 與 rhythm，而不是單純 landmark 清單的人；想做第二個 Tokyo 版本的人。', skip:'不要把 Shibuya、Harajuku、Shinjuku 全都以同樣密度塞進去。headline district 疊太多，最後只會留下疲勞感。', slow:'Kiyosumi 的 river edge、Jinbocho 的書店層、Kagurazaka 的 dinner slope。', firstScene:'早上先用 Asakusa 或 Ueno 打開，下午再把速度交給 quieter pocket。', guide:`${base}city/tokyo.html#city-priority-depth`, sample:`${base}example/tokyo-3n4d-first-trip.html`},
          {city:'Seoul', title:'不要讓 Seoul 只剩下 contrast', desc:'Seoul 的 contrast 很快就能成立，但真正會留得更久的是 quieter district 的呼吸。', opening:'Seoul 用 Seongsu 和 Euljiro 的對比就能快速說明。真正會留下來的，是 Seochon、Mangwon、Jongno backstreet 這些 quieter district。', who:'想把 Seoul 讀成 lived in city，而不只是 trend city 的人；想找 contrast 下一層的人。', skip:'不要把太多 contrast 很重的 district 用同一節奏疊在一起。全部都很 loud 時，Seoul 反而會變薄。', slow:'Seochon 的安靜 lane、Mangwon 的 daily tempo、Jongno backstreet 的 old grain。', firstScene:'先用 Seongsu 或 Bukchon edge 這種容易理解的 district 打開，再把節奏降到 quieter lane。', guide:`${base}city/seoul.html#city-priority-depth`, sample:`${base}example/seoul-2n3d-city-vibes.html`},
          {city:'Kyoto', title:'Kyoto 一旦接上 river edge 就能脫離 cliché', desc:'Kyoto 只靠 icon 很快就會 cliché。river edge 和 museum pocket 才會讓它更耐看。', opening:'Higashiyama 與 Gion 仍然是打開 Kyoto 的正確方法，但真正會留在記憶裡的，是 Okazaki 的 museum pocket、Nishijin 的 quiet west side、Kamo River 的 dusk。', who:'想把 Kyoto 當成 quiet editorial city，而不是 temple checklist 來讀的人。', skip:'不要一直加寺。Kyoto 幾乎總是少看一個、多坐一會比較好。', slow:'Okazaki 的 museum / café layer、Nishijin 的 quiet west pocket、Kamo River 的 dusk walk。', firstScene:'東側的 icon district 要早點看，後半天則把節奏交給 river edge。', guide:`${base}city/kyoto.html#city-priority-depth`, sample:`${base}example/kyoto-2n3d-slow-trip.html`},
          {city:'Taipei', title:'Taipei 不能只靠 food first', desc:'food 會讓 Taipei 很好懂，但真正讓它完整的是 textural pocket。', opening:'只靠 Yongkang、Dihua、night market，Taipei 也會很滿足。但當 Chifeng、Treasure Hill、tea room pocket 進來之後，它就不再只是 appetite city。', who:'想把 Taipei 讀成超過 food trip 的城市；想同時保留 meal rhythm 與 city texture 的人。', skip:'不要一整天都只圍著下一個 food stop 打轉。太多類似的 market / café / dessert 節拍，會讓城市很快變平。', slow:'Chifeng 的 middle texture、Dihua late、Treasure Hill 與 river pause。', firstScene:'先用 Yongkang 或 Dongmen 的 meal line 打開，下午一定要放進一個 textural pocket。', guide:`${base}city/taipei.html#city-priority-depth`, sample:`${base}example/taipei-3n4d-night-food.html`},
          {city:'Hong Kong', title:'Hong Kong 需要在 skyline 後面接上 slope street 與 harbor edge', desc:'Hong Kong 的 skyline 已經夠強了，但真正讓它優雅的是 slope street 與 harbor edge。', opening:'只靠 Central 和 Tsim Sha Tsui 也能立刻理解 Hong Kong。真正把 skyline pressure 拉回來的，是 PMQ、Soho、Sheung Wan、West Kowloon 這些 layer。', who:'想把 Hong Kong 讀成 more controlled editorial city，而不是 nonstop skyline rush 的人。', skip:'不要在同一天把 Central 和 Tsim Sha Tsui 都推得太深。skyline pressure 疊太多，細節就會消失。', slow:'PMQ 和 Soho 的 slope street、Sheung Wan 的 backstreet、West Kowloon 的 harbor edge。', firstScene:'先用 Central 或 ferry 當成 vertical / harbor anchor，再把中段交給 slope street。', guide:`${base}city/hongkong.html#city-priority-depth`, sample:`${base}example/hongkong-3n4d-harbor-rhythm.html`},
          {city:'Busan', title:'Busan 的 coast line 後面一定要有 harbor texture', desc:'Busan 只靠 sea 就能成立，但真正讓它立體的是 harbor texture。', opening:'Haeundae 與 Gwangalli 是最容易讀懂的 coast anchor。真正讓 Busan 超過 postcard 感的，是 Yeongdo、Nampo、Bosu 這些 harbor-side layer。', who:'想把 Busan 讀成 sea 加 port city，而不是單純 scenic coast 的人。', skip:'不要把 beach 一個一個同等重量地疊上去。多一個 coast line，通常不如一個 harbor texture district 來得重要。', slow:'Yeongdo 的高度、Nampo 與 Bosu 的 old lane、較安靜的 coastal back lane。', firstScene:'先用 Haeundae 這種 easy sea anchor 打開，再在中段把節奏降到 harbor-side district。', guide:`${base}city/busan.html#city-priority-depth`, sample:`${base}example/busan-2n3d-with-parents.html`},
          {city:'Fukuoka', title:'Fukuoka 一旦有 quiet local pocket 就會變得很 distinct', desc:'Fukuoka 很 compact，所以很容易被記成一個簡單整體。quiet local pocket 會讓它突然變得 distinct。', opening:'Hakata 與 Tenjin 的 meal rhythm 是最容易做出滿足感的。但當 Yakuin 與 Ohori edge 這些 softer layer 進來之後，Fukuoka 才會開始有 local 輪廓。', who:'想在短 itinerary 裡同時帶走 food first 與 local rhythm 的人。', skip:'不要在同一天把 Hakata 與 Tenjin 都讀得太深。compact city 最適合只留下一條真正有重量的軸。', slow:'Yakuin 的 café pocket、Ohori edge、compact 的 late bar close。', firstScene:'先用 Hakata 的第一餐打開，下午再安靜地降到 Yakuin 或 café pocket。', guide:`${base}city/fukuoka.html#city-priority-depth`, sample:`${base}example/fukuoka-2n3d-food-trip.html`}
        ]
      }
    };
  }


function renderMagazinePriorityArticles(){
    if (document.body.dataset.page !== 'magazine') return;
    const anchor = document.getElementById('magazinePersonalSignalRoot') || document.getElementById('magazineCommunityRoot');
    if (!anchor) return;
    let root = document.getElementById('magazinePriorityArticleRoot');
    if (!root) {
      root = document.createElement('div');
      root.id = 'magazinePriorityArticleRoot';
      anchor.parentNode.insertBefore(root, anchor.nextSibling);
    }
    const copy = getPriorityMagazineArticles()[lang] || getPriorityMagazineArticles().en;
    root.innerHTML = `
      <section class="section priority-article-section" id="releaseCityStories">
        <div class="section-head"><div><span class="eyebrow">${copy.eyebrow}</span><h2 class="section-title">${copy.title}</h2><p class="section-desc">${copy.desc}</p></div></div>
        <div class="priority-article-grid priority-article-grid-rich">${copy.items.map(item => `
          <article class="priority-article-card info-card priority-article-card-rich">
            <div class="priority-article-top"><span class="collection-kicker">${item.city}</span></div>
            <h3>${item.title}</h3>
            <p class="priority-article-intro">${item.desc}</p>
            <div class="priority-article-block">
              <strong>${copy.openingLabel}</strong>
              <p>${item.opening}</p>
            </div>
            <div class="priority-article-meta-grid">
              <article class="priority-article-meta-card"><span>${copy.whoLabel}</span><p>${item.who}</p></article>
              <article class="priority-article-meta-card"><span>${copy.skipLabel}</span><p>${item.skip}</p></article>
              <article class="priority-article-meta-card"><span>${copy.slowLabel}</span><p>${item.slow}</p></article>
              <article class="priority-article-meta-card"><span>${copy.firstSceneLabel}</span><p>${item.firstScene}</p></article>
            </div>
            <div class="card-actions">
              <a class="soft-btn" href="${item.guide}">${copy.guide}</a>
              <a class="ghost-btn" href="${item.sample}">${copy.sample}</a>
            </div>
          </article>`).join('')}</div>
      </section>`;
  }

function getSecondaryCityStories(){
    const base = pathRoot === '../' ? '../' : '';
    return {
      ko:{
        eyebrow:'확장 도시',
        title:'Expansion 도시 가볍게 읽기',
        desc:'release 우선 도시 다음으로, 같은 구조를 가볍게 따라오는 도시들입니다.',
        city:'도시 보기', sample:'샘플 보기',
        items:[
          {city:'Osaka', title:'첫 식사와 늦은 마감으로 읽는 Osaka', desc:'오사카는 첫 식사 라인과 늦은 마감만 선명하게 잡아도 도시 결이 빨리 보입니다.', cityHref:`${base}city/osaka.html`, sampleHref:`${base}example/osaka-2n3d-food-trip.html`},
          {city:'Jeju', title:'바람, 해안, 그리고 느린 리셋', desc:'제주는 단순 scenic보다 느린 리듬으로 붙일 때 도시의 성격이 더 잘 남습니다.', cityHref:`${base}city/jeju.html`, sampleHref:`${base}example/jeju-2n3d-slow-reset.html`},
          {city:'Sapporo', title:'날씨를 천천히 읽는 Sapporo', desc:'삿포로는 날씨와 넓은 거리 폭을 같이 읽을수록 훨씬 더 편안하게 남습니다.', cityHref:`${base}city/sapporo.html`, sampleHref:`${base}example/sapporo-2n3d-winter-city.html`},
          {city:'Okinawa', title:'해안 다음에 붙는 더 느린 pocket', desc:'오키나와는 바다 이후의 느린 pocket이 여행의 결을 더 분명하게 만듭니다.', cityHref:`${base}city/okinawa.html`, sampleHref:`${base}example/okinawa-3n4d-sea-reset.html`},
          {city:'Sendai', title:'북쪽의 더 차분한 pace', desc:'센다이는 headline보다 잔잔한 거리 리듬으로 읽을 때 더 오래 남습니다.', cityHref:`${base}city/sendai.html`, sampleHref:`${base}example/sendai-2n3d-calm-city.html`},
          {city:'Gyeongju', title:'숨 쉴 여백이 있는 heritage city', desc:'경주는 조용한 유산 도시로 읽을수록 차별점이 더 또렷해집니다.', cityHref:`${base}city/gyeongju.html`, sampleHref:`${base}example/gyeongju-2n3d-heritage-walk.html`},
          {city:'Macau', title:'오래된 골목과 밤 장면을 나눠 읽는 Macau', desc:'마카오는 오래된 거리와 밤 장면을 짧게 나눌수록 도시가 더 또렷하게 정리됩니다.', cityHref:`${base}city/macau.html`, sampleHref:`${base}example/macau-2n3d-night-lanes.html`}
        ]
      },
      en:{
        eyebrow:'Expansion cities',
        title:'Expansion cities — lighter reads',
        desc:'A lighter expansion layer for cities that come after the seven priority release cities.',
        city:'Read city guide', sample:'Read sample route',
        items:[
          {city:'Osaka', title:'Food-first Osaka with a late close', desc:'Osaka reads best when the first meal line and the late close stay crisp.', cityHref:`${base}city/osaka.html`, sampleHref:`${base}example/osaka-2n3d-food-trip.html`},
          {city:'Jeju', title:'Wind, coast, and a slower reset', desc:'Jeju lands better as wind, coast, and a slower reset than as a simple scenic list.', cityHref:`${base}city/jeju.html`, sampleHref:`${base}example/jeju-2n3d-slow-reset.html`},
          {city:'Sapporo', title:'A clearer slow-weather city', desc:'Sapporo lands better when weather, street width, and slower pacing are read together.', cityHref:`${base}city/sapporo.html`, sampleHref:`${base}example/sapporo-2n3d-winter-city.html`},
          {city:'Okinawa', title:'Coast first, then slower pockets', desc:'Okinawa becomes clearer once one slower pocket sits behind the coast line.', cityHref:`${base}city/okinawa.html`, sampleHref:`${base}example/okinawa-3n4d-sea-reset.html`},
          {city:'Sendai', title:'A softer north-side pace', desc:'Sendai holds longer through calm street rhythm than through headline stops.', cityHref:`${base}city/sendai.html`, sampleHref:`${base}example/sendai-2n3d-calm-city.html`},
          {city:'Gyeongju', title:'Quiet heritage with room to breathe', desc:'Gyeongju gets stronger when it is read as a quiet heritage city with pace.', cityHref:`${base}city/gyeongju.html`, sampleHref:`${base}example/gyeongju-2n3d-heritage-walk.html`},
          {city:'Macau', title:'A compact split between old streets and night glow', desc:'Macau gets clearer once old lanes and night glow are split into two clean layers.', cityHref:`${base}city/macau.html`, sampleHref:`${base}example/macau-2n3d-night-lanes.html`}
        ]
      },
      ja:{
        eyebrow:'拡張都市',
        title:'Expansion 都市を軽く読む',
        desc:'優先7都市のあとに、同じ読み方を軽く追いかける都市たちです。',
        city:'都市を見る', sample:'サンプルを見る',
        items:[
          {city:'Osaka', title:'最初の食と遅い締めで読む Osaka', desc:'最初の一食と夜の締めを揃えると、Osaka の性格はかなり早く見えてきます。', cityHref:`${base}city/osaka.html`, sampleHref:`${base}example/osaka-2n3d-food-trip.html`},
          {city:'Jeju', title:'風、海岸、そのあとに来る slower reset', desc:'Jeju は scenic list より、ゆっくりした回復の都市として読む方が強いです。', cityHref:`${base}city/jeju.html`, sampleHref:`${base}example/jeju-2n3d-slow-reset.html`},
          {city:'Sapporo', title:'天気ごと読む、やわらかな Sapporo', desc:'天気とゆるい速度を一緒に読むほど、Sapporo は心地よく残ります。', cityHref:`${base}city/sapporo.html`, sampleHref:`${base}example/sapporo-2n3d-winter-city.html`},
          {city:'Okinawa', title:'海から開いて、ゆっくり閉じる Okinawa', desc:'海辺で開き、遅い pocket で閉じると Okinawa の輪郭がはっきりします。', cityHref:`${base}city/okinawa.html`, sampleHref:`${base}example/okinawa-3n4d-sea-reset.html`},
          {city:'Sendai', title:'北側のやわらかな pace を持つ Sendai', desc:'headline よりも静かな街路の rhythm で読む方が、Sendai は長く残ります。', cityHref:`${base}city/sendai.html`, sampleHref:`${base}example/sendai-2n3d-calm-city.html`},
          {city:'Gyeongju', title:'余白のある heritage city としての Gyeongju', desc:'静かな遺産都市として読むほど、Gyeongju の違いがはっきりします。', cityHref:`${base}city/gyeongju.html`, sampleHref:`${base}example/gyeongju-2n3d-heritage-walk.html`},
          {city:'Macau', title:'古い路地と夜の光を分けて読む Macau', desc:'古い路地と夜の光を短く分けると、Macau はずっと整理されます。', cityHref:`${base}city/macau.html`, sampleHref:`${base}example/macau-2n3d-night-lanes.html`}
        ]
      },
      zhHant:{
        eyebrow:'擴張城市',
        title:'輕量閱讀 Expansion 城市',
        desc:'在七個優先城市之後，先用較輕的方式把同一閱讀結構帶到這些城市。',
        city:'讀城市', sample:'看 sample',
        items:[
          {city:'Osaka', title:'用第一餐與晚收尾讀 Osaka', desc:'只要先把第一餐與夜晚收尾抓穩，Osaka 的性格就會很快出來。', cityHref:`${base}city/osaka.html`, sampleHref:`${base}example/osaka-2n3d-food-trip.html`},
          {city:'Jeju', title:'風、海岸，與之後更慢的 reset', desc:'Jeju 作為慢節奏 reset 城市，比 scenic 清單更有記憶點。', cityHref:`${base}city/jeju.html`, sampleHref:`${base}example/jeju-2n3d-slow-reset.html`},
          {city:'Sapporo', title:'一座更適合慢慢讀天氣的 Sapporo', desc:'把天氣、街道寬度與慢節奏一起讀，Sapporo 會舒服很多。', cityHref:`${base}city/sapporo.html`, sampleHref:`${base}example/sapporo-2n3d-winter-city.html`},
          {city:'Okinawa', title:'先海邊、再慢慢收的 Okinawa', desc:'用海岸線打開，再讓慢 pocket 接住，Okinawa 會更有輪廓。', cityHref:`${base}city/okinawa.html`, sampleHref:`${base}example/okinawa-3n4d-sea-reset.html`},
          {city:'Sendai', title:'帶著北方柔和節奏的 Sendai', desc:'比起 headline 景點，用安靜街道 rhythm 讀 Sendai 會更耐記。', cityHref:`${base}city/sendai.html`, sampleHref:`${base}example/sendai-2n3d-calm-city.html`},
          {city:'Gyeongju', title:'留白更足的 heritage city：Gyeongju', desc:'把 Gyeongju 當成安靜的遺產城市來讀，差異會更清楚。', cityHref:`${base}city/gyeongju.html`, sampleHref:`${base}example/gyeongju-2n3d-heritage-walk.html`},
          {city:'Macau', title:'把老街與夜色分開讀的 Macau', desc:'把老街與夜晚光感短短分開，Macau 會清楚很多。', cityHref:`${base}city/macau.html`, sampleHref:`${base}example/macau-2n3d-night-lanes.html`}
        ]
      }
    };
  }

  function renderSecondaryCityStoryLayer(){
    if (document.body.dataset.page !== 'home' && document.body.dataset.page !== 'magazine') return;
    const target = document.getElementById('homeStoryLayerRoot') || document.getElementById('magazinePriorityArticleRoot');
    if (!target) return;
    let root = document.getElementById('secondaryCityStoryLayerRoot');
    if (!root) {
      root = document.createElement('div');
      root.id = 'secondaryCityStoryLayerRoot';
      target.parentNode.insertBefore(root, target.nextSibling);
    }
    const copy = getSecondaryCityStories()[lang] || getSecondaryCityStories().en;
    root.innerHTML = `<section class="section secondary-story-section" id="expansionCityStories" data-section="expansion-stories">
      <div class="section-head"><div><span class="eyebrow">${copy.eyebrow}</span><h2 class="section-title">${copy.title}</h2><p class="section-desc">${copy.desc}</p></div></div>
      <div class="priority-article-grid secondary-story-grid">${copy.items.map(item => `<article class="priority-article-card info-card secondary-story-card"><div class="priority-article-top"><span class="collection-kicker">${item.city}</span></div><h3>${item.title}</h3><p>${item.desc}</p><div class="card-actions"><a class="soft-btn" href="${item.cityHref}">${copy.city}</a><a class="ghost-btn" href="${item.sampleHref}">${copy.sample}</a></div></article>`).join('')}</div>
    </section>`;
  }



function getPriorityMagazineArticles(){
    const base = pathRoot === '../' ? '../' : '';
    return {
      ko:{
        eyebrow:'도시 읽기',
        title:'Release cities — deeper reads',
        desc:'도시를 어디서 시작하고, 어디서 늦추고, 무엇을 덜어내야 하는지까지 먼저 읽게 하는 article layer입니다.',
        guide:'도시 읽기', sample:'샘플 보기',
        openingLabel:'Opening paragraph', whoLabel:'이런 사람에게', skipLabel:'과하게 넣지 말 것', slowLabel:'천천히 둘 구간', firstSceneLabel:'첫 장면',
        items:[
          {city:'Tokyo', title:'첫 도쿄는 아이콘으로, 두 번째 도쿄는 quieter dinner rhythm으로', desc:'도쿄는 아이콘만 따라가면 쉽게 피곤해집니다. quieter pocket과 dinner rhythm이 들어와야 두 번째 레이어가 보입니다.', opening:'첫 도쿄는 아사쿠사·우에노 같은 이해 쉬운 장면으로 열어야 합니다. 하지만 오래 기억되는 건 기요스미, 진보초, 가구라자카처럼 속도를 한 번 낮춰 주는 pocket입니다.', who:'도쿄를 체크리스트보다 도시 결로 읽고 싶은 사람, 첫 방문 이후 두 번째 버전을 준비하는 사람.', skip:'시부야, 하라주쿠, 신주쿠를 같은 리듬으로 전부 깊게 넣지 마세요. headline district를 너무 많이 겹치면 피로감만 남습니다.', slow:'Kiyosumi의 river edge, Jinbocho의 책방 축, Kagurazaka의 dinner slope.', firstScene:'아침의 Asakusa 혹은 Ueno처럼 이해 쉬운 frame으로 시작한 뒤, 오후는 quieter pocket으로 한 번 눌러 주세요.', guide:`${base}city/tokyo.html#city-priority-depth`, sample:`${base}example/tokyo-3n4d-first-trip.html`},
          {city:'Seoul', title:'서울은 contrast만으로 끝내지 말고 quieter district 하나를 꼭 남겨야 한다', desc:'서울의 새 것과 오래된 것의 대비는 강하지만, 오래 남는 건 quieter district의 호흡입니다.', opening:'서울은 성수와 을지로처럼 강한 대비만 따라가도 설명은 쉽습니다. 하지만 실제로 기억에 남는 건 서촌, 망원, 종로 backstreet처럼 서울의 숨을 보여주는 district입니다.', who:'서울을 trend city보다 lived-in city로 읽고 싶은 사람, 첫 서울 이후 더 서울다운 결을 찾는 사람.', skip:'성수와 연남, 성수와 을지로를 모두 같은 밀도로 넣지 마세요. contrast를 너무 많이 겹치면 서울이 얇아집니다.', slow:'Seochon의 낮은 골목, Mangwon의 생활감, Jongno backstreet의 old lane texture.', firstScene:'성수나 북촌 edge처럼 이해 쉬운 district로 연 뒤, 서촌 같은 quieter lane으로 중간 호흡을 바꾸세요.', guide:`${base}city/seoul.html#city-priority-depth`, sample:`${base}example/seoul-2n3d-city-vibes.html`},
          {city:'Kyoto', title:'교토는 iconic frame 뒤에 river edge를 붙일 때 cliché를 벗어난다', desc:'교토는 icon만 따라가면 금방 cliché가 됩니다. river edge와 museum pocket이 있어야 더 오래 남습니다.', opening:'히가시야마와 기온은 교토를 이해하기 쉽게 여는 축입니다. 하지만 교토를 다시 떠올리게 만드는 건 오카자키의 museum pocket, 니시진의 조용한 west side, 가모강의 dusk입니다.', who:'교토를 사원 체크리스트가 아니라 quiet editorial city로 읽고 싶은 사람.', skip:'사원 수를 너무 많이 넣지 마세요. 교토는 하나 더 보는 것보다 하나 덜 보고 더 오래 앉는 쪽이 낫습니다.', slow:'Okazaki의 museum / café layer, Nishijin의 quieter west pocket, Kamo river edge의 dusk walk.', firstScene:'동쪽 icon district를 이른 시간에 읽고, 하루 후반은 river edge 쪽 여백으로 넘기세요.', guide:`${base}city/kyoto.html#city-priority-depth`, sample:`${base}example/kyoto-2n3d-slow-trip.html`},
          {city:'Taipei', title:'타이베이는 food-first만으론 부족하고, texture pocket이 있어야 완성된다', desc:'음식은 타이베이를 쉽게 설명해 주지만, texture pocket이 있어야 도시가 또렷해집니다.', opening:'융캉제, 디화제, 야시장만으로도 타이베이는 만족도가 높습니다. 하지만 치펀, Treasure Hill, tea room pocket이 들어오면 타이베이는 appetite 이상의 도시가 됩니다.', who:'타이베이를 food trip 이상으로 읽고 싶은 사람, meal rhythm과 city texture를 같이 챙기고 싶은 사람.', skip:'식사 축을 하루 종일 겹치지 마세요. 같은 톤의 market / café / dessert를 너무 많이 넣으면 도시가 평평해집니다.', slow:'Chifeng의 middle texture, Dihua late pocket, Treasure Hill의 river-side pause.', firstScene:'Yongkang이나 Dongmen처럼 meal rhythm이 쉬운 축으로 열고, 오후에는 texture pocket 하나를 꼭 넣으세요.', guide:`${base}city/taipei.html#city-priority-depth`, sample:`${base}example/taipei-3n4d-night-food.html`},
          {city:'Hong Kong', title:'Hong Kong 는 skyline 뒤에 slope street 와 harbor edge 가 필요하다', desc:'홍콩은 skyline pressure만으로도 강하지만, slope street와 harbor edge가 있어야 우아해집니다.', opening:'센트럴과 침사추이의 skyline은 홍콩을 한 번에 이해하게 해 줍니다. 하지만 PMQ와 Soho, Sheung Wan, West Kowloon 같은 layer가 들어와야 홍콩의 압축감이 세련되게 풀립니다.', who:'홍콩을 강한 skyline city가 아니라 more controlled editorial city로 읽고 싶은 사람.', skip:'센트럴과 침사추이를 같은 날 모두 깊게 밀지 마세요. skyline pressure를 겹치면 도시가 너무 단단해집니다.', slow:'PMQ와 Soho의 slope street, Sheung Wan backstreet, West Kowloon의 harbor edge.', firstScene:'Central이나 ferry처럼 vertical / harbor anchor로 열고, 중간에는 slope street 쪽으로 템포를 낮추세요.', guide:`${base}city/hongkong.html#city-priority-depth`, sample:`${base}example/hongkong-3n4d-harbor-rhythm.html`},
          {city:'Busan', title:'Busan 은 coast line 뒤에 harbor texture 가 들어가야 postcard 를 벗어난다', desc:'부산은 바다만으로도 읽히지만, harbor texture가 들어와야 더 입체적입니다.', opening:'해운대와 광안리는 부산을 가장 쉽게 이해시키는 바다 축입니다. 하지만 영도, 남포, 보수 같은 harbor-side everyday layer가 들어와야 부산이 postcard를 벗어납니다.', who:'부산을 scenic coast가 아니라 sea + port city로 같이 읽고 싶은 사람.', skip:'여러 해변을 같은 밀도로 겹치지 마세요. coast line을 늘리는 것보다 harbor texture 하나가 더 중요합니다.', slow:'Yeongdo의 다른 높이, Nampo와 Bosu의 old lane, Suyeong back lane의 quieter coast texture.', firstScene:'Haeundae 같은 쉬운 sea anchor로 시작한 뒤, 중간에는 harbor-side district로 한 번 낮추세요.', guide:`${base}city/busan.html#city-priority-depth`, sample:`${base}example/busan-2n3d-with-parents.html`},
          {city:'Fukuoka', title:'Fukuoka 는 quiet local pocket 이 들어와야 distinct 해진다', desc:'후쿠오카는 compact해서 쉽게 한 덩어리로 기억됩니다. quiet local pocket이 들어와야 도시 결이 살아납니다.', opening:'하카타와 텐진의 meal rhythm은 후쿠오카를 가장 쉽게 만족스럽게 만듭니다. 하지만 Yakuin과 Ohori edge 같은 quieter pocket이 있어야 후쿠오카가 local하고 distinct하게 남습니다.', who:'짧은 일정 안에서도 food-first와 local rhythm을 같이 가져가고 싶은 사람.', skip:'하카타와 텐진을 같은 날 모두 깊게 읽지 마세요. compact city일수록 한 축만 진하게 남기는 편이 낫습니다.', slow:'Yakuin café pocket, Ohori edge, compact late bar close.', firstScene:'첫 식사 축이 쉬운 Hakata로 열고, 오후는 Yakuin이나 café pocket으로 조용히 내려가세요.', guide:`${base}city/fukuoka.html#city-priority-depth`, sample:`${base}example/fukuoka-2n3d-food-trip.html`}
        ]
      },
      en:{
        eyebrow:'City reading stories',
        title:'Release cities — deeper reads',
        desc:'An article layer for reading where to begin, where to slow down, and what to leave out before a city collapses into a stop list.',
        guide:'Read city guide', sample:'Read sample route',
        openingLabel:'Opening paragraph', whoLabel:'Who this works for', skipLabel:'What to skip', slowLabel:'Where to slow down', firstSceneLabel:'Best first scene',
        items:[
          {city:'Tokyo', title:'First Tokyo through icons, second Tokyo through quieter dinner rhythm', desc:'Tokyo gets tiring if it stays only on icons. Quieter pockets and dinner rhythm are what reveal its second layer.', opening:'A first Tokyo opens cleanest through Asakusa or Ueno. What stays longer, though, are places like Kiyosumi, Jinbocho, and Kagurazaka: districts that lower the pace without flattening the city.', who:'Travelers who want Tokyo to feel like material and rhythm, not just landmarks, and anyone shaping a second Tokyo rather than a first checklist.', skip:'Do not force Shibuya, Harajuku, and Shinjuku to carry equal weight. Too many headline districts create fatigue faster than memory.', slow:'The river edge in Kiyosumi, the bookshop layer in Jinbocho, the dinner slope in Kagurazaka.', firstScene:'Open through Asakusa or Ueno in the morning, then let the afternoon move into one quieter pocket.', guide:`${base}city/tokyo.html#city-priority-depth`, sample:`${base}example/tokyo-3n4d-first-trip.html`},
          {city:'Seoul', title:'Do not let Seoul end as contrast alone', desc:'Seoul’s contrast works quickly, but quieter districts are what make the city stay longer.', opening:'Seoul is easy to explain through Seongsu and Euljiro. It becomes much harder to forget once Seochon, Mangwon, or the Jongno backstreets enter the route and let the city breathe.', who:'Travelers who want Seoul as a lived-in city rather than only a trend city, and anyone looking for the next layer beyond contrast.', skip:'Do not overload the trip with too many contrast-heavy districts in the same rhythm. Seoul thins out when everything tries to be loud.', slow:'Seochon’s low-key lanes, Mangwon’s everyday tempo, and the older backstreet grain of Jongno.', firstScene:'Open through an easy district such as Seongsu or a Bukchon edge, then change the day’s pace through a quieter lane district.', guide:`${base}city/seoul.html#city-priority-depth`, sample:`${base}example/seoul-2n3d-city-vibes.html`},
          {city:'Kyoto', title:'Kyoto escapes cliché once a river edge follows the iconic frame', desc:'Kyoto becomes cliché quickly on icons alone. River edges and museum pockets are what keep it alive.', opening:'Higashiyama and Gion are still the right way to open Kyoto. But what makes the city linger is the softer after-layer: Okazaki’s museum pocket, Nishijin’s quiet west side, and dusk along the Kamo river.', who:'Travelers who want Kyoto as a quiet editorial city rather than a temple checklist.', skip:'Do not add too many temples simply because they fit. In Kyoto, one less stop and one longer pause is almost always better.', slow:'Okazaki’s museum-and-café layer, Nishijin’s quiet west pocket, and the Kamo river at dusk.', firstScene:'Read the eastern icon districts early, then let the latter half of the day open into river-edge space.', guide:`${base}city/kyoto.html#city-priority-depth`, sample:`${base}example/kyoto-2n3d-slow-trip.html`},
          {city:'Taipei', title:'Food first is not enough for Taipei', desc:'Food explains Taipei easily, but textural pockets are what complete it.', opening:'Yongkang, Dihua, and one night market are enough to make Taipei enjoyable. What makes it distinct are the added textures: Chifeng, Treasure Hill, and the slower tea-room pockets that shift the city beyond appetite.', who:'Travelers who want Taipei as more than a food trip, and who want meal rhythm and city texture at the same time.', skip:'Do not let every hour revolve around the next food stop. Too many similar market, café, and dessert beats flatten the city fast.', slow:'Chifeng’s middle texture, Dihua late in the day, and Treasure Hill with one slower river pause.', firstScene:'Open through Yongkang or Dongmen, then place one textural pocket clearly into the afternoon.', guide:`${base}city/taipei.html#city-priority-depth`, sample:`${base}example/taipei-3n4d-night-food.html`},
          {city:'Hong Kong', title:'Hong Kong becomes elegant once slope streets and harbor edge soften the skyline', desc:'Hong Kong’s skyline is powerful enough on its own; slope streets and harbor edges are what make it elegant.', opening:'Central and Tsim Sha Tsui explain Hong Kong immediately. PMQ, Soho, Sheung Wan, and West Kowloon are the layers that stop skyline pressure from becoming the entire trip.', who:'Travelers who want Hong Kong as a controlled editorial city rather than a nonstop skyline rush.', skip:'Do not drive both Central and Tsim Sha Tsui too deeply on the same day. When skyline pressure stacks too hard, the city loses nuance.', slow:'The slope-street grain of PMQ and Soho, the backstreets of Sheung Wan, and the harbor edge at West Kowloon.', firstScene:'Open through Central or the ferry as a vertical-harbor anchor, then lower the middle through slope streets.', guide:`${base}city/hongkong.html#city-priority-depth`, sample:`${base}example/hongkong-3n4d-harbor-rhythm.html`},
          {city:'Busan', title:'Busan needs harbor texture behind the coast line', desc:'Busan is readable through the sea, but harbor texture is what makes it dimensional.', opening:'Haeundae and Gwangalli are the easiest coast anchors. But Busan only moves beyond postcard mode once Yeongdo, Nampo, and Bosu bring in the port-city layer.', who:'Travelers who want Busan as sea and port together, not only as a scenic coast trip.', skip:'Do not stack beach after beach at the same weight. One harbor-texture district usually matters more than another coastline repeat.', slow:'Yeongdo’s different height, the older lane texture of Nampo and Bosu, and quieter back-lane coastal edges.', firstScene:'Open through an easy sea anchor such as Haeundae, then lower the day once through a harbor-side district.', guide:`${base}city/busan.html#city-priority-depth`, sample:`${base}example/busan-2n3d-with-parents.html`},
          {city:'Fukuoka', title:'Fukuoka becomes distinct once quiet local pockets follow the food line', desc:'Fukuoka is compact enough to blur into one easy memory. Quiet local pockets are what keep it distinct.', opening:'Hakata and Tenjin deliver the easiest meal rhythm in the city. What makes Fukuoka feel local rather than generic are the softer layers: Yakuin, Ohori edge, and one quieter late close.', who:'Travelers who want both food-first comfort and local rhythm inside a short itinerary.', skip:'Do not try to read Hakata and Tenjin equally deeply on the same day. Compact cities benefit most when one axis carries the memory.', slow:'Yakuin’s café pocket, the Ohori edge, and one compact late bar close.', firstScene:'Open through Hakata for the first meal line, then lower the afternoon quietly through Yakuin or one café pocket.', guide:`${base}city/fukuoka.html#city-priority-depth`, sample:`${base}example/fukuoka-2n3d-food-trip.html`}
        ]
      },
      ja:{
        eyebrow:'City reading stories',
        title:'Release cities — deeper reads',
        desc:'どこから始め、どこで速度を落とし、何を入れすぎないかを先に読むための article layer です。',
        guide:'都市を読む', sample:'サンプルを見る',
        openingLabel:'Opening paragraph', whoLabel:'向いている人', skipLabel:'入れすぎないこと', slowLabel:'ゆっくり置く場所', firstSceneLabel:'最初の scene',
        items:[
          {city:'Tokyo', title:'最初の Tokyo は icon、二回目の Tokyo は quieter dinner rhythm で読む', desc:'Tokyo は icon だけだと疲れやすい都市です。quieter pocket と dinner rhythm が入ってはじめて二層目が見えます。', opening:'最初の Tokyo は Asakusa や Ueno のようなわかりやすい景色で開くのが正解です。けれど長く残るのは、Kiyosumi、Jinbocho、Kagurazaka のように速度を一度落としてくれる pocket です。', who:'Tokyo を landmark list ではなく material と rhythm で読みたい人。二回目の Tokyo を作りたい人。', skip:'Shibuya、Harajuku、Shinjuku を同じ密度で全部深く入れないでください。headline district を重ねすぎると疲れだけが残ります。', slow:'Kiyosumi の river edge、Jinbocho の本の層、Kagurazaka の dinner slope。', firstScene:'朝は Asakusa か Ueno から始めて、午後は quieter pocket へ落としてください。', guide:`${base}city/tokyo.html#city-priority-depth`, sample:`${base}example/tokyo-3n4d-first-trip.html`},
          {city:'Seoul', title:'Seoul を contrast だけで終わらせない', desc:'Seoul の contrast は強いですが、長く残るのは quieter district の呼吸です。', opening:'Seoul は Seongsu と Euljiro の対比だけでも説明できます。けれど本当に残るのは Seochon、Mangwon、Jongno backstreet のような district です。', who:'Seoul を trend city より lived-in city として読みたい人。contrast の次の層を探している人。', skip:'contrast の強い district を同じ密度で詰め込みすぎないでください。すべてを loud にすると Seoul は薄くなります。', slow:'Seochon の静かな lane、Mangwon の daily tempo、Jongno backstreet の古い grain。', firstScene:'Seongsu や Bukchon edge のようなわかりやすい district で開き、その後は quieter lane へ速度を落としてください。', guide:`${base}city/seoul.html#city-priority-depth`, sample:`${base}example/seoul-2n3d-city-vibes.html`},
          {city:'Kyoto', title:'Kyoto は river edge が入ると cliché から抜ける', desc:'Kyoto は icon だけだとすぐ cliché になります。river edge と museum pocket があると一気に持ちが良くなります。', opening:'Higashiyama と Gion は京都を開く正しい方法です。けれど本当に残るのは Okazaki の museum pocket、Nishijin の quiet west side、Kamo River の dusk です。', who:'Kyoto を temple checklist ではなく quiet editorial city として読みたい人。', skip:'寺を増やしすぎないでください。Kyoto はひとつ多く見るより、ひとつ減らして長く座る方が良いです。', slow:'Okazaki の museum/café layer、Nishijin の quiet west pocket、Kamo River の dusk walk。', firstScene:'東側の icon district は早い時間に読み、後半は river edge に余白を渡してください。', guide:`${base}city/kyoto.html#city-priority-depth`, sample:`${base}example/kyoto-2n3d-slow-trip.html`},
          {city:'Taipei', title:'Taipei は food first だけでは足りない', desc:'food は Taipei をわかりやすくしますが、textural pocket が入って初めて都市が完成します。', opening:'Yongkang、Dihua、night market だけでも Taipei は満足できます。けれど Chifeng、Treasure Hill、tea-room pocket が入ると appetite 以上の都市になります。', who:'Taipei を food trip 以上の都市として読みたい人。meal rhythm と city texture を両方ほしい人。', skip:'一日中、次の food stop だけで回さないでください。同じ market / café / dessert のリズムを重ねすぎると平坦になります。', slow:'Chifeng の middle texture、Dihua late、Treasure Hill と river pause。', firstScene:'Yongkang か Dongmen の meal line で開き、午後には textural pocket をひとつ明確に置いてください。', guide:`${base}city/taipei.html#city-priority-depth`, sample:`${base}example/taipei-3n4d-night-food.html`},
          {city:'Hong Kong', title:'Hong Kong は skyline の後ろに slope street と harbor edge が必要', desc:'Hong Kong の skyline は十分に強いですが、slope street と harbor edge があると一気に上品になります。', opening:'Central と Tsim Sha Tsui だけでも Hong Kong はすぐに理解できます。けれど PMQ、Soho、Sheung Wan、West Kowloon が入ると skyline pressure が旅のすべてではなくなります。', who:'Hong Kong を nonstop skyline rush ではなく、more controlled editorial city として読みたい人。', skip:'Central と Tsim Sha Tsui を同じ日に両方深く入れすぎないでください。skyline pressure を重ねすぎると nuance が消えます。', slow:'PMQ と Soho の slope street、Sheung Wan の backstreet、West Kowloon の harbor edge。', firstScene:'Central か ferry を vertical / harbor anchor にして、その後は slope street へ速度を落としてください。', guide:`${base}city/hongkong.html#city-priority-depth`, sample:`${base}example/hongkong-3n4d-harbor-rhythm.html`},
          {city:'Busan', title:'Busan は coast line の後ろに harbor texture が要る', desc:'Busan は sea だけでも読めますが、harbor texture が入って初めて立体的になります。', opening:'Haeundae と Gwangalli は最もわかりやすい coast anchor です。けれど Yeongdo、Nampo、Bosu が入ると Busan は postcard mode を超えます。', who:'Busan を scenic coast ではなく sea + port city として読みたい人。', skip:'beach を同じ重さで重ねないでください。もう一つの coast line より、harbor-texture district の方が意味があります。', slow:'Yeongdo の高さ、Nampo/Bosu の old lane、quieter coastal back lane。', firstScene:'Haeundae のような easy sea anchor で開き、中盤で harbor-side district に一度落としてください。', guide:`${base}city/busan.html#city-priority-depth`, sample:`${base}example/busan-2n3d-with-parents.html`},
          {city:'Fukuoka', title:'Fukuoka は quiet local pocket が入ると急に distinct になる', desc:'Fukuoka は compact なので簡単な一つの記憶にまとまりやすい都市です。quiet local pocket が入ると急に distinct になります。', opening:'Hakata と Tenjin の meal rhythm は最も簡単に満足を作ります。けれど Yakuin と Ohori edge のような softer layer が入ると Fukuoka は local な輪郭を持ち始めます。', who:'短い itinerary の中でも food first と local rhythm の両方を持ち帰りたい人。', skip:'Hakata と Tenjin を同じ日に同じ深さで読まないでください。compact city ほど、一つの軸だけを濃く残す方が強いです。', slow:'Yakuin の café pocket、Ohori edge、compact な late bar close。', firstScene:'最初の meal line は Hakata で始め、午後は Yakuin か café pocket へ静かに落としていってください。', guide:`${base}city/fukuoka.html#city-priority-depth`, sample:`${base}example/fukuoka-2n3d-food-trip.html`}
        ]
      },
      zhHant:{
        eyebrow:'City reading stories',
        title:'Release cities — deeper reads',
        desc:'在變成停靠點清單之前，先讀懂從哪裡開始、哪裡該慢下來、什麼不要塞太滿的 article layer。',
        guide:'讀城市', sample:'看 sample',
        openingLabel:'Opening paragraph', whoLabel:'適合這樣的人', skipLabel:'不要塞太滿', slowLabel:'適合放慢的地方', firstSceneLabel:'最佳第一個 scene',
        items:[
          {city:'Tokyo', title:'第一個 Tokyo 用 icon 打開，第二個 Tokyo 靠 quieter dinner rhythm 留下來', desc:'Tokyo 只靠 icon 很快就會疲勞。真正讓第二層跑出來的，是 quieter pocket 與 dinner rhythm。', opening:'第一個 Tokyo 用 Asakusa 或 Ueno 這種容易理解的畫面打開最乾淨。真正會留下來的，通常是 Kiyosumi、Jinbocho、Kagurazaka 這些會把速度往下壓一點的 pocket。', who:'想把 Tokyo 讀成 material 與 rhythm，而不是單純 landmark 清單的人；想做第二個 Tokyo 版本的人。', skip:'不要把 Shibuya、Harajuku、Shinjuku 全都以同樣密度塞進去。headline district 疊太多，最後只會留下疲勞感。', slow:'Kiyosumi 的 river edge、Jinbocho 的書店層、Kagurazaka 的 dinner slope。', firstScene:'早上先用 Asakusa 或 Ueno 打開，下午再把速度交給 quieter pocket。', guide:`${base}city/tokyo.html#city-priority-depth`, sample:`${base}example/tokyo-3n4d-first-trip.html`},
          {city:'Seoul', title:'不要讓 Seoul 只剩下 contrast', desc:'Seoul 的 contrast 很快就能成立，但真正會留得更久的是 quieter district 的呼吸。', opening:'Seoul 用 Seongsu 和 Euljiro 的對比就能快速說明。真正會留下來的，是 Seochon、Mangwon、Jongno backstreet 這些 quieter district。', who:'想把 Seoul 讀成 lived in city，而不只是 trend city 的人；想找 contrast 下一層的人。', skip:'不要把太多 contrast 很重的 district 用同一節奏疊在一起。全部都很 loud 時，Seoul 反而會變薄。', slow:'Seochon 的安靜 lane、Mangwon 的 daily tempo、Jongno backstreet 的 old grain。', firstScene:'先用 Seongsu 或 Bukchon edge 這種容易理解的 district 打開，再把節奏降到 quieter lane。', guide:`${base}city/seoul.html#city-priority-depth`, sample:`${base}example/seoul-2n3d-city-vibes.html`},
          {city:'Kyoto', title:'Kyoto 一旦接上 river edge 就能脫離 cliché', desc:'Kyoto 只靠 icon 很快就會 cliché。river edge 和 museum pocket 才會讓它更耐看。', opening:'Higashiyama 與 Gion 仍然是打開 Kyoto 的正確方法，但真正會留在記憶裡的，是 Okazaki 的 museum pocket、Nishijin 的 quiet west side、Kamo River 的 dusk。', who:'想把 Kyoto 當成 quiet editorial city，而不是 temple checklist 來讀的人。', skip:'不要一直加寺。Kyoto 幾乎總是少看一個、多坐一會比較好。', slow:'Okazaki 的 museum / café layer、Nishijin 的 quiet west pocket、Kamo River 的 dusk walk。', firstScene:'東側的 icon district 要早點看，後半天則把節奏交給 river edge。', guide:`${base}city/kyoto.html#city-priority-depth`, sample:`${base}example/kyoto-2n3d-slow-trip.html`},
          {city:'Taipei', title:'Taipei 不能只靠 food first', desc:'food 會讓 Taipei 很好懂，但真正讓它完整的是 textural pocket。', opening:'只靠 Yongkang、Dihua、night market，Taipei 也會很滿足。但當 Chifeng、Treasure Hill、tea room pocket 進來之後，它就不再只是 appetite city。', who:'想把 Taipei 讀成超過 food trip 的城市；想同時保留 meal rhythm 與 city texture 的人。', skip:'不要一整天都只圍著下一個 food stop 打轉。太多類似的 market / café / dessert 節拍，會讓城市很快變平。', slow:'Chifeng 的 middle texture、Dihua late、Treasure Hill 與 river pause。', firstScene:'先用 Yongkang 或 Dongmen 的 meal line 打開，下午一定要放進一個 textural pocket。', guide:`${base}city/taipei.html#city-priority-depth`, sample:`${base}example/taipei-3n4d-night-food.html`},
          {city:'Hong Kong', title:'Hong Kong 需要在 skyline 後面接上 slope street 與 harbor edge', desc:'Hong Kong 的 skyline 已經夠強了，但真正讓它優雅的是 slope street 與 harbor edge。', opening:'只靠 Central 和 Tsim Sha Tsui 也能立刻理解 Hong Kong。真正把 skyline pressure 拉回來的，是 PMQ、Soho、Sheung Wan、West Kowloon 這些 layer。', who:'想把 Hong Kong 讀成 more controlled editorial city，而不是 nonstop skyline rush 的人。', skip:'不要在同一天把 Central 和 Tsim Sha Tsui 都推得太深。skyline pressure 疊太多，細節就會消失。', slow:'PMQ 和 Soho 的 slope street、Sheung Wan 的 backstreet、West Kowloon 的 harbor edge。', firstScene:'先用 Central 或 ferry 當成 vertical / harbor anchor，再把中段交給 slope street。', guide:`${base}city/hongkong.html#city-priority-depth`, sample:`${base}example/hongkong-3n4d-harbor-rhythm.html`},
          {city:'Busan', title:'Busan 的 coast line 後面一定要有 harbor texture', desc:'Busan 只靠 sea 就能成立，但真正讓它立體的是 harbor texture。', opening:'Haeundae 與 Gwangalli 是最容易讀懂的 coast anchor。真正讓 Busan 超過 postcard 感的，是 Yeongdo、Nampo、Bosu 這些 harbor-side layer。', who:'想把 Busan 讀成 sea 加 port city，而不是單純 scenic coast 的人。', skip:'不要把 beach 一個一個同等重量地疊上去。多一個 coast line，通常不如一個 harbor texture district 來得重要。', slow:'Yeongdo 的高度、Nampo 與 Bosu 的 old lane、較安靜的 coastal back lane。', firstScene:'先用 Haeundae 這種 easy sea anchor 打開，再在中段把節奏降到 harbor-side district。', guide:`${base}city/busan.html#city-priority-depth`, sample:`${base}example/busan-2n3d-with-parents.html`},
          {city:'Fukuoka', title:'Fukuoka 一旦有 quiet local pocket 就會變得很 distinct', desc:'Fukuoka 很 compact，所以很容易被記成一個簡單整體。quiet local pocket 會讓它突然變得 distinct。', opening:'Hakata 與 Tenjin 的 meal rhythm 是最容易做出滿足感的。但當 Yakuin 與 Ohori edge 這些 softer layer 進來之後，Fukuoka 才會開始有 local 輪廓。', who:'想在短 itinerary 裡同時帶走 food first 與 local rhythm 的人。', skip:'不要在同一天把 Hakata 與 Tenjin 都讀得太深。compact city 最適合只留下一條真正有重量的軸。', slow:'Yakuin 的 café pocket、Ohori edge、compact 的 late bar close。', firstScene:'先用 Hakata 的第一餐打開，下午再安靜地降到 Yakuin 或 café pocket。', guide:`${base}city/fukuoka.html#city-priority-depth`, sample:`${base}example/fukuoka-2n3d-food-trip.html`}
        ]
      }
    };
  }

function renderMagazinePriorityArticles(){
    if (document.body.dataset.page !== 'magazine') return;
    const anchor = document.getElementById('magazinePersonalSignalRoot') || document.getElementById('magazineCommunityRoot');
    if (!anchor) return;
    let root = document.getElementById('magazinePriorityArticleRoot');
    if (!root) {
      root = document.createElement('div');
      root.id = 'magazinePriorityArticleRoot';
      anchor.parentNode.insertBefore(root, anchor.nextSibling);
    }
    const copy = getPriorityMagazineArticles()[lang] || getPriorityMagazineArticles().en;
    root.innerHTML = `
      <section class="section priority-article-section" id="releaseCityStories" data-section="release-stories">
        <div class="section-head"><div><span class="eyebrow">${copy.eyebrow}</span><h2 class="section-title">${copy.title}</h2><p class="section-desc">${copy.desc}</p></div></div>
        <div class="priority-article-grid">${copy.items.map(item => `
          <article class="priority-article-card info-card">
            <div class="priority-article-top"><span class="collection-kicker">${item.city}</span></div>
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
            <div class="card-actions">
              <a class="soft-btn" href="${item.guide}">${copy.guide}</a>
              <a class="ghost-btn" href="${item.sample}">${copy.sample}</a>
            </div>
          </article>`).join('')}</div>
      </section>`;
  }

function renderTripsSeasonalDesk(){
    if (document.body.dataset.page !== 'trips') return;
    const anchor = document.querySelector('.route-club-section') || document.querySelector('.operating-edit-section');
    if (!anchor) return;
    let root = document.getElementById('tripsSeasonalRoot');
    if (!root) {
      root = document.createElement('section');
      root.id = 'tripsSeasonalRoot';
      root.className = 'section seasonal-system-section seasonal-system-section-trips';
      anchor.insertAdjacentElement('afterend', root);
    }
    const copy = (lang === 'ko') ? {
      eyebrow:'Seasonal archive', title:'Keep seasonal bases ready to reopen later', desc:'Saving seasonal and situation-led bases inside My Trips makes the next trip easier to start.', guide: lang==='ja' ? '都市ガイド' : lang==='zhHant' ? '城市指南' : 'City guide', sample: lang==='ja' ? 'サンプルルート' : lang==='zhHant' ? '範例路線' : 'Sample', plan: lang==='ja' ? '自分のベースとして保存' : lang==='zhHant' ? '存成我的基底' : 'Save as my base'
    } : {
      eyebrow:'季節のアーカイブ', title:'あとでまた開ける季節の棚', desc:'My Trips の中に季節や状況ごとのベースを残しておくと、次の旅をもっと早く始められます。', guide: lang==='ja' ? '都市ガイド' : lang==='zhHant' ? '城市指南' : 'City guide', sample: lang==='ja' ? 'サンプルルート' : lang==='zhHant' ? '範例路線' : 'Sample', plan: lang==='ja' ? '自分のベースとして保存' : lang==='zhHant' ? '存成我的基底' : 'Save as my base'
    };
    const items = getSeasonalEditorialCollections().archive;
    root.innerHTML = `
      <div class="section-head">
        <div><span class="eyebrow">${copy.eyebrow}</span><h2 class="section-title">${copy.title}</h2><p class="section-desc">${copy.desc}</p></div>
      </div>
      <div class="seasonal-system-grid seasonal-system-grid-trips">
        ${items.map((item, idx) => seasonalCardMarkup(item, copy, idx === 2)).join('')}
      </div>`;
    wireSeasonalButtons(root, 'page');
  }

  function getCommunityCollections(){
    const guideBase = resolvePath('') === './' ? './' : '../';
    return {
      picks: [
        { kind:'pick', title:{ko:'Tokyo dense weekend edit', en:'Tokyo dense weekend edit'}, desc:{ko:'대표 구역은 챙기되 하루 한 구간은 숨을 쉬게 두는 도쿄 베이스.', en:'A Tokyo base that hits the big districts but still leaves one softer pocket each day.'}, tags:['tokyo','weekend','dense','city'], guide:`${guideBase}city/tokyo.html`, example:`${guideBase}example/tokyo-3n4d-first-trip.html`, preset:{destination:'Tokyo',duration:'2n3d',companion:'friends',style:'city highlights + food + some breathing room',notes:'Protect one softer pocket each day.'}},
        { kind:'pick', title:{ko:'Quiet Kyoto reset', en:'Quiet Kyoto reset'}, desc:{ko:'많이 넣지 않고 아침 장면과 저녁 산책을 남기는 교토 베이스.', en:'A Kyoto base shaped around quieter mornings and a softer evening walk.'}, tags:['kyoto','slow','quiet','solo'], guide:`${guideBase}city/kyoto.html`, example:`${guideBase}example/kyoto-2n3d-slow-trip.html`, preset:{destination:'Kyoto',duration:'2n3d',companion:'solo',style:'slow culture + tea + walks',notes:'Keep the route light and leave room.'}},
        { kind:'pick', title:{ko:'Busan easy view rhythm', en:'Busan easy view rhythm'}, desc:{ko:'언덕 피로를 줄이고 뷰 타이밍을 먼저 맞추는 부산 베이스.', en:'A Busan base built around view timing and lower fatigue.'}, tags:['busan','coast','parents','easy'], guide:`${guideBase}city/busan.html`, example:`${guideBase}example/busan-2n3d-with-parents.html`, preset:{destination:'Busan',duration:'2n3d',companion:'family',style:'sea views + easy pace',notes:'Let views lead and protect rest windows.'}}
      ],
      trending: [
        { kind:'club', title:{ko:'Seoul rainy-day fallback', en:'Seoul rainy-day fallback'}, desc:{ko:'실내 밀도와 동네 이동을 가볍게 유지하는 서울 우천일 베이스.', en:'A Seoul fallback that stays indoor-friendly while keeping the neighborhood line intact.'}, tags:['seoul','rainy','city','fallback'], guide:`${guideBase}city/seoul.html`, example:`${guideBase}example/seoul-2n3d-city-vibes.html`, preset:{destination:'Seoul',duration:'2n3d',companion:'couple',style:'indoor spots + coffee + neighborhoods',notes:'Keep transfers short.'}},
        { kind:'club', title:{ko:'Fukuoka food weekend', en:'Fukuoka food weekend'}, desc:{ko:'먹고 걷고 쉬는 리듬이 잘 맞는 컴팩트 후쿠오카 베이스.', en:'A compact Fukuoka weekend shaped by food timing and easy walks.'}, tags:['fukuoka','food','weekend','friends'], guide:`${guideBase}city/fukuoka.html`, example:`${guideBase}example/fukuoka-2n3d-food-trip.html`, preset:{destination:'Fukuoka',duration:'2n3d',companion:'friends',style:'local food + cafes + neighborhoods',notes:'Let meals shape the route.'}},
        { kind:'club', title:{ko:'Jeju soft drive base', en:'Jeju soft drive base'}, desc:{ko:'무리한 체크리스트 대신 도로와 풍경의 여백을 남기는 제주 베이스.', en:'A softer Jeju base that leaves room for roads, wind, and wider scenery.'}, tags:['jeju','drive','coast','soft'], guide:`${guideBase}city/jeju.html`, example:`${guideBase}city/jeju.html`, preset:{destination:'Jeju',duration:'3n4d',companion:'family',style:'scenic drives + cafes + coast',notes:'Do not underweight drive time.'}}
      ],
      branches: [
        { kind:'branch', title:{ko:'Tokyo → Seoul', en:'Tokyo → Seoul'}, desc:{ko:'밀도 높은 도시 리듬 다음에 동네 대비가 좋은 서울로 연결하는 흐름.', en:'A strong next move when you want neighborhood contrast after a denser Tokyo rhythm.'}, tags:['tokyo','seoul','next','city'], guide:`${guideBase}city/seoul.html`, example:`${guideBase}example/seoul-2n3d-city-vibes.html`, preset:{destination:'Seoul',duration:'2n3d',companion:'friends',style:'neighborhoods + late coffee + city rhythm',notes:'Use contrast, not repetition.'}},
        { kind:'branch', title:{ko:'Kyoto → Gyeongju', en:'Kyoto → Gyeongju'}, desc:{ko:'조용한 역사 도시의 결을 다른 방식으로 이어보는 다음 분기.', en:'A softer branch when you want another history-led city without repeating Kyoto too hard.'}, tags:['kyoto','gyeongju','next','quiet'], guide:`${guideBase}city/gyeongju.html`, example:`${guideBase}city/gyeongju.html`, preset:{destination:'Gyeongju',duration:'2n3d',companion:'couple',style:'history + quiet walks + calm pace',notes:'Keep the tempo soft.'}},
        { kind:'branch', title:{ko:'Busan → Jeju', en:'Busan → Jeju'}, desc:{ko:'바다 리듬은 유지하되 밀도를 낮추고 풍경을 더 여는 연결.', en:'A coast-led branch that lowers density and opens the scenery further.'}, tags:['busan','jeju','next','coast'], guide:`${guideBase}city/jeju.html`, example:`${guideBase}city/jeju.html`, preset:{destination:'Jeju',duration:'3n4d',companion:'family',style:'coast + drives + slower meals',notes:'Let the island breathe.'}}
      ]
    };
  }

  function wireCommunityButtons(scope){
    scope.querySelectorAll('.community-plan-btn').forEach(btn => btn.addEventListener('click', () => {
      try { window.RyokoApp.applyPlannerPreset(JSON.parse(btn.dataset.communityPreset || '{}')); } catch(e) {}
      if (document.body.dataset.page === 'planner') {
        document.querySelector('.planner-shell')?.scrollIntoView({ behavior:'smooth', block:'start' });
      } else {
        location.href = plannerUrlForCity((JSON.parse(btn.dataset.communityPreset || '{}').destination) || '');
      }
    }));
  }

  function renderHomeCommunityDesk(){
    if (document.body.dataset.page !== 'planner') return;
    const root = document.getElementById('homeCommunityRoot');
    if (!root) return;
    const copyMap = { ko:{eyebrow:'Route club', title:'에디터 픽과 다음 분기까지 한 번에 보기', desc:'도시를 고르는 것에서 끝내지 않고, 지금 잘 먹히는 베이스와 다음으로 연결되는 분기를 같이 보여줍니다.', picks:'Editor picks', trending:'Trending bases', branches:'Branch next', guide: lang==='ja' ? '都市ガイド' : lang==='zhHant' ? '城市指南' : 'City guide', sample: lang==='ja' ? 'サンプルルート' : lang==='zhHant' ? '範例路線' : 'Sample', save: lang==='ja' ? '自分のベースに使う' : lang==='zhHant' ? '用作我的基底' : 'Use as my base'}, en:{eyebrow:'Route club', title:'See editor picks and next branches together', desc:'This does more than pick a city. It puts strong current bases and smoother next branches in one place.', picks:'Editor picks', trending:'Trending bases', branches:'Branch next', guide: lang==='ja' ? '都市ガイド' : lang==='zhHant' ? '城市指南' : 'City guide', sample: lang==='ja' ? 'サンプルルート' : lang==='zhHant' ? '範例路線' : 'Sample', save:'Use as my base'}, ja:{eyebrow:'ルートクラブ', title:'エディターピックと次の分岐を一緒に見る', desc:'都市を選ぶだけで終わらず、今よくはまるベースと次につながる分岐を一緒に見せます。', picks:'エディターピック', trending:'注目ベース', branches:'次の分岐', guide:'都市ガイド', sample:'サンプルルート', save:'自分のベースに使う'}, zhHant:{eyebrow:'路線俱樂部', title:'把編輯精選和下一個分支一起看', desc:'不只幫你選城市，也把現在好用的基底和接下來的分支一起放在這裡。', picks:'編輯精選', trending:'熱門基底', branches:'下一個分支', guide:'城市指南', sample:'範例路線', save:'存成我的基底'}};
    const copy = copyMap[lang] || copyMap.en;
    const data = getCommunityCollections();
    root.innerHTML = `
      <section class="section community-desk-section">
        <div class="section-head"><div><span class="eyebrow">${copy.eyebrow}</span><h2 class="section-title">${copy.title}</h2><p class="section-desc">${copy.desc}</p></div></div>
        <div class="community-shelf-grid">
          <article class="community-shelf info-card"><div class="community-shelf-head"><span class="collection-kicker">${copy.picks}</span></div>${data.picks.map(item => communityCardMarkup(item, copy)).join('')}</article>
          <article class="community-shelf info-card"><div class="community-shelf-head"><span class="collection-kicker">${copy.trending}</span></div>${data.trending.map(item => communityCardMarkup(item, copy)).join('')}</article>
          <article class="community-shelf info-card"><div class="community-shelf-head"><span class="collection-kicker">${copy.branches}</span></div>${data.branches.map(item => communityCardMarkup(item, copy)).join('')}</article>
        </div>
      </section>`;
    wireCommunityButtons(root);
    attachSignalTracking(root);
  }

  function renderMagazineCommunityDesk(){
    if (document.body.dataset.page !== 'magazine') return;
    const host = document.getElementById('magazineCommunityRoot');
    if (!host) return;
    const copyMap = { ko:{eyebrow:'Route club', title:'지금 잘 먹히는 공개 베이스와 다음 도시 분기', desc:'매거진을 읽고 끝나지 않게, 에디터 픽과 다음으로 잘 이어지는 도시를 한 셸프에 모았습니다.', picks:'Editor picks', trending:'Trending bases', branches:'Branch next', guide: lang==='ja' ? '都市ガイド' : lang==='zhHant' ? '城市指南' : 'City guide', sample: lang==='ja' ? 'サンプルルート' : lang==='zhHant' ? '範例路線' : 'Sample', save: lang==='ja' ? 'プランナーへ進む' : lang==='zhHant' ? '接到規劃器' : 'Continue in Planner'}, en:{eyebrow:'Route club', title:'Public bases that work now, plus the next city branch', desc:'This keeps the magazine from ending on reading alone by grouping editor picks and smoother next-city branches in one shelf.', picks:'Editor picks', trending:'Trending bases', branches:'Branch next', guide: lang==='ja' ? '都市ガイド' : lang==='zhHant' ? '城市指南' : 'City guide', sample: lang==='ja' ? 'サンプルルート' : lang==='zhHant' ? '範例路線' : 'Sample', save:'Continue in Planner'}, ja:{eyebrow:'ルートクラブ', title:'今よくはまる公開ベースと次の都市分岐', desc:'マガジンを読んで終わらせず、エディターピックと次に続く都市分岐を一つの棚にまとめました。', picks:'エディターピック', trending:'注目ベース', branches:'次の分岐', guide:'都市ガイド', sample:'サンプルルート', save:'Planner へつなぐ'}, zhHant:{eyebrow:'路線俱樂部', title:'現在好用的公開基底與下一座城市分支', desc:'不讓城市誌停在閱讀，而是把編輯精選與下一個城市分支放進同一個架上。', picks:'編輯精選', trending:'熱門基底', branches:'下一個分支', guide:'城市指南', sample:'範例路線', save:'接到 Planner'}};
    const copy = copyMap[lang] || copyMap.en;
    const data = getCommunityCollections();
    host.innerHTML = `
      <section class="section community-desk-section community-desk-section-magazine">
        <div class="section-head"><div><span class="eyebrow">${copy.eyebrow}</span><h2 class="section-title">${copy.title}</h2><p class="section-desc">${copy.desc}</p></div></div>
        <div class="community-shelf-grid">
          <article class="community-shelf info-card"><div class="community-shelf-head"><span class="collection-kicker">${copy.picks}</span></div>${data.picks.map(item => communityCardMarkup(item, copy)).join('')}</article>
          <article class="community-shelf info-card"><div class="community-shelf-head"><span class="collection-kicker">${copy.trending}</span></div>${data.trending.map(item => communityCardMarkup(item, copy)).join('')}</article>
          <article class="community-shelf info-card"><div class="community-shelf-head"><span class="collection-kicker">${copy.branches}</span></div>${data.branches.map(item => communityCardMarkup(item, copy)).join('')}</article>
        </div>
      </section>`;
    wireCommunityButtons(host);
    attachSignalTracking(host);
  }

  function renderHomeDiscovery(){
    if (document.body.dataset.page !== 'planner') return;
    const root = document.getElementById('homeDiscoveryRoot');
    if (!root) return;
    const copyMap = {
      ko: {
        eyebrow:'Quick find', title:'상황이나 무드로 바로 좁혀보세요', desc:'도시 이름이 먼저 떠오르지 않아도 됩니다. 주말, 우천일, 부모님 동행 같은 상황에서 바로 출발할 수 있게 정리했습니다.',
        placeholder:'도시, mood, 상황으로 검색', all:'All', weekend:'Weekend', rainy:'Rainy day', parents:'With parents', food:'Food-led', coast:'Coast', empty:'맞는 베이스가 없으면 매거진에서 도시를 먼저 읽어보세요.',
        guide: lang==='ja' ? '都市ガイド' : lang==='zhHant' ? '城市指南' : 'City guide', sample: lang==='ja' ? 'サンプルルート' : lang==='zhHant' ? '範例路線' : 'Sample', plan: lang==='ja' ? 'ベースに使う' : lang==='zhHant' ? '用作基底' : 'Use as base', matches: lang==='ja' ? '件' : lang==='zhHant' ? '個結果' : '개', helper: lang==='ja' ? 'おすすめ検索' : lang==='zhHant' ? '推薦搜尋' : '추천 검색'
      },
      en: {
        eyebrow:'Quick find', title:'Narrow the trip by mood or use case', desc:'You do not need a city name first. Start from a weekend, a rainy day, or a better pace for parents and move from there.',
        placeholder:'Search by city, mood, or use case', all:'All', weekend:'Weekend', rainy:'Rainy day', parents:'With parents', food:'Food-led', coast:'Coast', empty:'If nothing fits yet, start with the city magazine first.',
        guide: lang==='ja' ? '都市ガイド' : lang==='zhHant' ? '城市指南' : 'City guide', sample: lang==='ja' ? 'サンプルルート' : lang==='zhHant' ? '範例路線' : 'Sample', plan:'Use as base', matches:'matches', helper:'Suggested searches'
      },
      ja: {
        eyebrow:'クイック検索', title:'ムードや旅の条件からすぐ絞り込む', desc:'都市名が先に浮かばなくても大丈夫です。週末、雨の日、親との旅のような条件から先に始められます。',
        placeholder:'都市・ムード・旅の条件で検索', all:'すべて', weekend:'週末', rainy:'雨の日', parents:'親と一緒に', food:'食中心', coast:'海辺', empty:'まだ決まらないなら、先にシティマガジンから読んでみてください。',
        guide:'都市ガイド', sample:'サンプルルート', plan:'ベースに使う', matches:'件', helper:'おすすめ検索'
      },
      zhHant: {
        eyebrow:'快速搜尋', title:'用旅遊氣氛或情境快速縮小範圍', desc:'就算你還沒想到城市名，也可以先從週末、雨天、和父母同行這種情境開始。',
        placeholder:'用城市、旅遊氣氛或情境搜尋', all:'全部', weekend:'週末', rainy:'雨天', parents:'和父母同行', food:'以吃為主', coast:'海邊', empty:'如果還沒有合適的，不如先從城市誌開始讀。',
        guide:'城市指南', sample:'範例路線', plan:'用作基底', matches:'個結果', helper:'推薦搜尋'
      }
    };
    const copy = copyMap[lang] || copyMap.en;
    root.innerHTML = `
      <article class="info-card discovery-desk">
        <div class="section-head compact"><div><span class="eyebrow">${copy.eyebrow}</span><h2 class="section-title">${copy.title}</h2><p class="section-desc">${copy.desc}</p></div><div class="discovery-count" id="homeDiscoveryCount"></div></div>
        <div class="discovery-toolbar">
          <input id="homeDiscoverySearch" class="input finder-search" placeholder="${copy.placeholder}">
          <div class="discovery-suggest"><span class="discovery-suggest-label">${copy.helper}</span>
            <button class="tab-btn active" data-discovery-filter="all">${copy.all}</button>
            <button class="tab-btn" data-discovery-filter="weekend">${copy.weekend}</button>
            <button class="tab-btn" data-discovery-filter="rainy">${copy.rainy}</button>
            <button class="tab-btn" data-discovery-filter="parents">${copy.parents}</button>
            <button class="tab-btn" data-discovery-filter="food">${copy.food}</button>
            <button class="tab-btn" data-discovery-filter="coast">${copy.coast}</button>
          </div>
        </div>
        <div class="discovery-grid" id="homeDiscoveryGrid"></div>
        <div class="finder-empty info-card" id="homeDiscoveryEmpty" hidden><p>${copy.empty}</p></div>
      </article>`;
    const items = boostBySignalProfile(buildDiscoveryItems());
    const grid = root.querySelector('#homeDiscoveryGrid');
    const count = root.querySelector('#homeDiscoveryCount');
    const empty = root.querySelector('#homeDiscoveryEmpty');
    let filter = 'all'; let query = '';
    function render(){
      const filtered = items.filter(item => {
        const hay = `${item.slug} ${item.tags.join(' ')} ${item.title[lang]||item.title.en} ${item.desc[lang]||item.desc.en}`.toLowerCase();
        const matchesQuery = !query || hay.includes(query);
        const matchesFilter = filter === 'all' || item.tags.includes(filter);
        return matchesQuery && matchesFilter;
      });
      grid.innerHTML = filtered.map(item => `
        <article class="discovery-card info-card">
          <div class="discovery-card-meta"><span class="collection-kicker">${item.kind === 'city' ? (lang==='ja' ? '都市ベース' : lang==='zhHant' ? '城市基底' : 'City base') : (lang==='ja' ? '編集ベース' : lang==='zhHant' ? '編輯基底' : 'Editorial base')}</span><span class="meta-inline">${item.preset.destination}</span></div>
          <h3>${item.title[lang] || item.title.en}</h3>
          <p>${item.desc[lang] || item.desc.en}</p>
          <div class="mini-vibe-row">${item.tags.slice(0,4).map(tag => `<span class="mini-vibe-chip">${tag}</span>`).join('')}</div>
          <div class="card-actions discovery-actions"><a class="soft-btn" href="${item.guide}" data-signal-tags="${item.tags.join('|')}" data-signal-city="${item.preset?.destination || ''}" data-signal-title="${item.title[lang] || item.title.en}" data-signal-source="seasonal-guide">${copy.guide}</a><a class="ghost-btn" href="${item.example}">${copy.sample}</a><button class="primary-btn discovery-plan-btn" data-discovery-preset='${JSON.stringify(item.preset)}'>${copy.plan}</button></div>
        </article>`).join('');
      count.textContent = lang === 'ko' ? `${filtered.length}${copy.matches}` : `${filtered.length} ${copy.matches}`;
      if (empty) empty.hidden = filtered.length !== 0;
      grid.querySelectorAll('[data-discovery-preset]').forEach(btn => btn.addEventListener('click', () => {
        try { window.RyokoApp.applyPlannerPreset(JSON.parse(btn.dataset.discoveryPreset || '{}')); } catch(e) {}
        document.querySelector('.planner-shell')?.scrollIntoView({ behavior:'smooth', block:'start' });
      }));
      attachSignalTracking(grid);
    }
    root.querySelectorAll('[data-discovery-filter]').forEach(btn => btn.addEventListener('click', () => {
      filter = btn.dataset.discoveryFilter;
      root.querySelectorAll('[data-discovery-filter]').forEach(el => el.classList.toggle('active', el === btn));
      render();
    }));
    root.querySelector('#homeDiscoverySearch')?.addEventListener('input', e => { query = String(e.target.value||'').trim().toLowerCase(); render(); });
    render();
  }


  function personalizedSignalCardMarkup(item, copy){
    const title = item.title?.[lang] || item.title?.en || item.city || '';
    const desc = item.desc?.[lang] || item.desc?.en || '';
    const destination = item.preset?.destination || item.city || '';
    return `
      <article class="personal-signal-card info-card">
        <div class="personal-signal-top"><span class="collection-kicker">${destination || (lang === 'ko' ? '큐레이션' : lang === 'ja' ? 'キュレーション' : lang === 'zhHant' ? '策展' : 'Curated')}</span><span class="meta-inline">${(item.tags || []).slice(0,2).join(' · ')}</span></div>
        <h3>${title}</h3>
        <p>${desc}</p>
        <div class="card-actions public-route-actions">
          <a class="soft-btn" href="${item.guide || '#'}" data-signal-tags="${(item.tags || []).join('|')}" data-signal-city="${destination}" data-signal-title="${title}" data-signal-source="personal-guide">${copy.guide}</a>
          <a class="ghost-btn" href="${item.example || item.guide || '#'}" data-signal-tags="${(item.tags || []).join('|')}" data-signal-city="${destination}" data-signal-title="${title}" data-signal-source="personal-sample">${copy.sample}</a>
          <button class="primary-btn personal-plan-btn" data-personal-preset='${JSON.stringify(item.preset || {})}' data-signal-tags="${(item.tags || []).join('|')}" data-signal-city="${destination}" data-signal-title="${title}" data-signal-source="personal-plan">${copy.plan}</button>
        </div>
      </article>`;
  }
  function wirePersonalButtons(scope, plannerMode='page'){
    scope.querySelectorAll('.personal-plan-btn').forEach(btn => btn.addEventListener('click', () => {
      let preset = {};
      try { preset = JSON.parse(btn.dataset.personalPreset || '{}'); } catch {}
      if (plannerMode === 'planner') {
        window.RyokoApp.applyPlannerPreset(preset);
        document.querySelector('.planner-shell')?.scrollIntoView({ behavior:'smooth', block:'start' });
      } else {
        location.href = plannerUrlForCity(preset.destination || '');
      }
    }));
    attachSignalTracking(scope);
  }
  function renderSignalPersonalDesk(page='home'){
    const items = getPersonalizedSignalItems(page);
    const targetId = page === 'home' ? 'homeCommunityRoot' : 'magazineCommunityRoot';
    const anchor = document.getElementById(targetId);
    if (!anchor) return;
    let root = document.getElementById(page === 'home' ? 'homePersonalSignalRoot' : 'magazinePersonalSignalRoot');
    if (!items.length) { if (root) root.innerHTML = ''; return; }
    if (!root) {
      root = document.createElement('div');
      root.id = page === 'home' ? 'homePersonalSignalRoot' : 'magazinePersonalSignalRoot';
      anchor.parentNode.insertBefore(root, anchor);
    }
    const top = getTopSignalTags(3);
    const tagLabel = top.map(tag => tag.replace('-', ' ')).join(' · ');
    const copyMap = {
      ko: { eyebrow:'Your rhythm', title:'최근 반응한 신호를 바탕으로 다시 고른 셸프', desc:`최근 읽은 베이스에서 ${tagLabel} 결이 더 자주 보였습니다. 앞단 큐레이션도 그 신호를 먼저 보여줍니다.`, guide:'도시 가이드', sample:'샘플 루트', plan: page === 'home' ? '이 베이스로 시작' : '플래너로 이어가기' },
      en: { eyebrow:'Your rhythm', title:'A shelf reshaped by the signals you keep opening', desc:`Your recent reads leaned toward ${tagLabel}. This shelf pushes those tones forward first.`, guide: lang==='ja' ? '都市ガイド' : lang==='zhHant' ? '城市指南' : 'City guide', sample: lang==='ja' ? 'サンプルルート' : lang==='zhHant' ? '範例路線' : 'Sample', plan: page === 'home' ? 'Start from this base' : 'Continue in Planner' },
      ja: { eyebrow:'あなたのリズム', title:'最近ひらいた気配から組み直した棚', desc:`最近よく開いたベースには ${tagLabel} の流れが見えました。最初の棚もそのトーンを少し前に出しています。`, guide:'都市ガイド', sample:'サンプルルート', plan: page === 'home' ? 'このベースから始める' : 'Planner へつなぐ' },
      zhHant: { eyebrow:'你的節奏', title:'依照你最近常打開的訊號重新排過的架子', desc:`你最近打開的基底裡，${tagLabel} 這種節奏更常出現。前面的策展也會先把這些調性往前放。`, guide:'城市指南', sample:'範例路線', plan: page === 'home' ? '從這個基底開始' : '接到 Planner' }
    };
    const copy = copyMap[lang] || copyMap.en;
    root.innerHTML = `
      <section class="section personal-signal-section">
        <div class="section-head"><div><span class="eyebrow">${copy.eyebrow}</span><h2 class="section-title">${copy.title}</h2><p class="section-desc">${copy.desc}</p></div></div>
        <div class="personal-signal-grid">${items.map(item => personalizedSignalCardMarkup(item, copy)).join('')}</div>
      </section>`;
    wirePersonalButtons(root, page === 'home' ? 'planner' : 'page');
  }
  const magazineLangPatches = {
    ja: {
      heroChips:['東アジア・シティエディット','日本・韓国・中華圏','すぐ旅程にできるルート'],
      countryJapan:'日本', countryKorea:'韓国', countryGreaterChina:'中華圏',
      guideBtn:'ガイド', planBtn:'プラン'
    },
    zhHant: {
      heroChips:['東亞城市編輯選','日本・韓國・大中華','可直接接到旅程的路線'],
      countryJapan:'日本', countryKorea:'韓國', countryGreaterChina:'大中華',
      guideBtn:'指南', planBtn:'規劃'
    }
  };
  ['ja','zhHant'].forEach(code => {
    const base = JSON.parse(JSON.stringify(editorialData.magazine.en));
    editorialData.magazine[code] = Object.assign(base, magazineLangPatches[code], editorialData.magazine[code] || {});
  });

  function initMagazine(){
    if (document.body.dataset.page !== 'magazine') return;
    renderMagazineLoop();
    renderMagazineCommunityDesk();
    renderMagazinePriorityArticles();
    renderSecondaryCityStoryLayer();
    const cards = [...document.querySelectorAll('.finder-card')];
    if (!cards.length) return;
    const searchInput = document.getElementById('magazineCitySearch');
    const countryTabs = [...document.querySelectorAll('[data-country-filter]')];
    const vibeTabs = [...document.querySelectorAll('[data-vibe-filter]')];
    const empty = document.getElementById('finderEmptyState');
    const helperMap = { ko:{ helper:'빠른 검색', count:'개 도시' }, en:{ helper:'Quick search', count:'cities' }, ja:{ helper:'クイック検索', count:'都市' }, zhHant:{ helper:'快速搜尋', count:'座城市' } };
    const helperCopy = helperMap[lang] || helperMap.en;
    const toolbar = document.querySelector('.finder-toolbar');
    if (toolbar && !document.getElementById('finderHelperRow')) {
      const row = document.createElement('div');
      row.className = 'finder-helper-row';
      row.id = 'finderHelperRow';
      const suggestMap = { ko:['Tokyo','우천일','부모님','푸드'], en:['Tokyo','Rainy day','Parents','Food'], ja:['Tokyo','雨の日','親と一緒に','食中心'], zhHant:['Tokyo','雨天','和父母同行','以吃為主'] };
      const s = suggestMap[lang] || suggestMap.en;
      row.innerHTML = `<div class="finder-suggestions"><span class="discovery-suggest-label">${helperCopy.helper}</span><button class="tab-btn" data-finder-suggest="tokyo">${s[0]}</button><button class="tab-btn" data-finder-suggest="rainy">${s[1]}</button><button class="tab-btn" data-finder-suggest="parents">${s[2]}</button><button class="tab-btn" data-finder-suggest="food">${s[3]}</button></div><div class="finder-count" id="finderCount"></div>`;
      toolbar.insertAdjacentElement('afterend', row);
    }
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
      const count = document.getElementById('finderCount');
      if (count) count.textContent = (lang === 'ko' || lang === 'ja' || lang === 'zhHant') ? `${visible}${helperCopy.count}` : `${visible} ${helperCopy.count}`;
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
    document.querySelectorAll('[data-finder-suggest]').forEach(btn => btn.addEventListener('click', () => {
      query = String(btn.dataset.finderSuggest || '').toLowerCase();
      if (searchInput) searchInput.value = btn.dataset.finderSuggest || '';
      apply();
    }));
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
      ko: {
        planner: { kicker: 'Planner note', title: '도시 무드를 먼저 잡고, 바로 저장 가능한 일정으로 연결합니다.', chips: ['East Asia city edit', 'Magazine-led planning', 'Save / Share / PDF'] },
        magazine: { kicker: 'Magazine note', title: '도시를 읽는 흐름이 좋아야 플랜도 더 자연스럽게 짜입니다.', chips: ['City guides', 'Samples', 'Local rhythm'] },
        trips: { kicker: 'My Trips note', title: '저장한 일정과 공유받은 일정을 한 흐름 안에서 다시 꺼내봅니다.', chips: ['Saved trips', 'Recent plans', 'Shared links'] }
      },
      en: {
        planner: { kicker: 'Planner note', title: 'Start from the city mood, then move into a trip worth saving.', chips: ['East Asia city edit', 'Magazine-led planning', 'Save / Share / PDF'] },
        magazine: { kicker: 'Magazine note', title: 'The better the city reads, the more natural the plan feels.', chips: ['City guides', 'Samples', 'Local rhythm'] },
        trips: { kicker: 'My Trips note', title: 'Reopen saved and shared itineraries without losing the story around them.', chips: ['Saved trips', 'Recent plans', 'Shared links'] }
      },
      ja: {
        planner: { kicker: 'Plannerノート', title: '街のムードを先につかみ、そのまま保存したくなる旅程へつなげます。', chips: ['東アジア・シティエディット', 'マガジン主導の設計', '保存 / 共有 / PDF'] },
        magazine: { kicker: 'Magazineノート', title: '街の読み方が整うほど、旅の流れも自然になります。', chips: ['都市ガイド', 'サンプルルート', '街のリズム'] },
        trips: { kicker: 'My Tripsノート', title: '保存した旅程も共有された旅程も、流れを切らさずにまた開けます。', chips: ['保存したルート', '最近のプラン', '共有リンク'] }
      },
      zhHant: {
        planner: { kicker: 'Planner 筆記', title: '先抓住城市的氣氛，再順著那個感覺接到值得保存的旅程。', chips: ['東亞城市編輯選', 'Magazine 主導規劃', '儲存 / 分享 / PDF'] },
        magazine: { kicker: 'Magazine 筆記', title: '城市讀得越清楚，旅程也會排得更自然。', chips: ['城市指南', '範例路線', '在地節奏'] },
        trips: { kicker: 'My Trips 筆記', title: '把已儲存和收到的旅程放在同一個流裡，之後也能再接著打開。', chips: ['已存旅程', '最近計畫', '共享連結'] }
      }
    };
    const data = (labels[lang] || labels.ko)[page] || (labels[lang] || labels.ko).planner;
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


  function localizeLangButtonLabels(root=document){
    root.querySelectorAll('[data-lang-btn="zhHant"]').forEach(btn => { btn.textContent = '繁體'; });
    root.querySelectorAll('[data-lang-btn="ja"]').forEach(btn => { btn.textContent = 'JP'; });
  }

  function localizeStaticIndexSections(){
    if (document.body.dataset.page !== 'planner') return;
    const homeMap = {
      ko: {
        cityMeta:['일본 · 빠른 도시','일본 · 여유로운 리듬','한국 · 동네 중심 도시','한국 · 바다와 휴식','일본 · 콤팩트 미식 도시'],
        cityTitle:['Tokyo','Kyoto','Seoul','Busan','Fukuoka'],
        cityCopy:['큰 장면과 조용한 골목이 함께 있는 도시. 동네 기준으로 짜면 훨씬 부드럽게 풀립니다.','적게 넣을수록 더 좋아지는 도시. 골목, 강변, 사원 지구가 여유를 만듭니다.','무엇을 보느냐보다 어떤 동네를 묶느냐가 무드를 결정합니다.','바다 풍경과 시장 리듬이 섞여 서울과는 다른 열린 템포가 납니다.','짧게 가도 좋고, 음식 중심으로 풀기 좋은 콤팩트 시티입니다.'],
        sampleMeta:['3박 4일 · 커플','2박 3일 · 슬로우','2박 3일 · 친구','2박 3일 · 가족'],
        sampleTitle:['도쿄 첫 여행 베이스','조용한 교토 주말','서울 시티 바이브','부모님과 부산'],
        sampleCopy:['처음 가는 사람도 리듬을 잃지 않게 짠 도쿄 베이스입니다.','골목, 사원 지구, 강변 산책 중심의 느린 교토 루트입니다.','카페, 산책, 야경이 부드럽게 이어지는 서울 루트입니다.','바다 풍경과 휴식을 중심으로 잡은 더 부드러운 부산 루트입니다.']
      },
      en: {
        cityMeta:['Japan · Fast city','Japan · Slow rhythm','Korea · Neighborhood-led city','Korea · Coast and rest','Japan · Compact food city'],
        cityTitle:['Tokyo','Kyoto','Seoul','Busan','Fukuoka'],
        cityCopy:['A city of layered highlights and quieter pockets. It works best when read neighborhood by neighborhood.','A city that improves when you do less. Alleys, river edges, and temple districts need more room.','In Seoul, the mood comes from how you group neighborhoods, not how many sights you stack.','Sea views and market rhythm create a more open pace than Seoul.','Compact, easy, and deeply rewarding when food leads the route.'],
        sampleMeta:['3 Nights 4 Days · Couple','2 Nights 3 Days · Slow','2 Nights 3 Days · Friends','2 Nights 3 Days · Family'],
        sampleTitle:['Tokyo for first-timers','Quiet Kyoto weekend','Seoul city vibes','Busan with parents'],
        sampleCopy:['A Tokyo base that stays balanced even for first-time visitors.','A slower Kyoto route built around alleys, temple districts, and riverside pauses.','Cafés, walks, and night views tied into a smoother Seoul rhythm.','A gentler Busan route shaped by sea views and better rest windows.']
      },
      ja: {
        cityMeta:['日本 · 速い都市','日本 · ゆるいリズム','韓国 · 街区中心の都市','韓国 · 海と休息','日本 · コンパクトな美食都市'],
        cityTitle:['Tokyo','Kyoto','Seoul','Busan','Fukuoka'],
        cityCopy:['大きな見どころと静かな路地が重なる都市。エリアごとに読むと流れがぐっと楽になります。','詰め込みすぎないほど良くなる都市。路地、川辺、寺エリアに余白が必要です。','何を見るかより、どの街区を一緒に束ねるかでムードが決まります。','海の景色と市場のリズムが合わさり、ソウルとは違う開いたテンポが出ます。','短くても満足度が高く、食を軸にしやすいコンパクトシティです。'],
        sampleMeta:['3泊4日 · カップル','2泊3日 · スロー','2泊3日 · 友人','2泊3日 · 家族'],
        sampleTitle:['はじめての東京ベース','静かな京都週末','ソウル city vibes','親と行く釜山'],
        sampleCopy:['初めてでもリズムを崩しにくい東京ベースです。','路地、寺エリア、川辺の散歩を中心にしたゆるい京都ルートです。','カフェ、散歩、夜景がやわらかくつながるソウルルートです。','海の景色と休息を軸にした、よりやさしい釜山ルートです。']
      },
      zhHant: {
        cityMeta:['日本 · 快節奏城市','日本 · 慢節奏城市','韓國 · 街區導向城市','韓國 · 海景與休息','日本 · 緊湊美食城市'],
        cityTitle:['Tokyo','Kyoto','Seoul','Busan','Fukuoka'],
        cityCopy:['大場景與安靜巷弄並存的城市。用街區去讀，整體會順很多。','放得更少反而更好的城市。巷子、河邊與寺區需要留白。','首爾的旅行感不在景點數，而在你怎麼把街區組在一起。','海景與市場節奏交疊，會走出和首爾很不一樣的開闊步調。','就算短去也很有收穫，很適合用美食來帶整段旅程。'],
        sampleMeta:['3晚4天 · 情侶','2晚3天 · 慢遊','2晚3天 · 朋友','2晚3天 · 家人'],
        sampleTitle:['東京初訪 base','安靜京都週末','首爾 city vibes','和父母去釜山'],
        sampleCopy:['就算第一次去，也不容易亂掉節奏的東京 base。','以巷弄、寺區與河邊散步為主的慢節奏京都路線。','把咖啡館、散步與夜景連成更順的首爾節奏。','以海景與休息窗口為主的更溫和釜山路線。']
      }
    };
    const copy = homeMap[lang] || homeMap.en;
    document.querySelectorAll('.city-grid .city-card').forEach((card, i) => {
      const meta = card.querySelector('.meta');
      const title = card.querySelector('.card-title');
      const body = card.querySelector('.card-copy');
      if (meta && copy.cityMeta[i]) meta.textContent = copy.cityMeta[i];
      if (title && copy.cityTitle[i]) title.textContent = copy.cityTitle[i];
      if (body && copy.cityCopy[i]) body.textContent = copy.cityCopy[i];
    });
    document.querySelectorAll('.sample-grid .sample-card').forEach((card, i) => {
      const meta = card.querySelector('.meta');
      const title = card.querySelector('.card-title');
      const body = card.querySelector('.card-copy');
      if (meta && copy.sampleMeta[i]) meta.textContent = copy.sampleMeta[i];
      if (title && copy.sampleTitle[i]) title.textContent = copy.sampleTitle[i];
      if (body && copy.sampleCopy[i]) body.textContent = copy.sampleCopy[i];
    });
  }


  function localizeExtendedStaticSections(){
    const page = document.body.dataset.page;
    const maps = {
      planner: {
        ko: {
          '.brand-manifesto-note strong':'브랜드 문장',
          '.brand-manifesto-note p':'도시를 먼저 읽고, 그다음 여행을 만듭니다.\n이 한 문장을 기준으로 홈, 매거진, 도시 가이드, 결과 화면을 같은 결로 정리합니다.',
          '.home-cover-desk .eyebrow':'이번 주 커버',
          '.home-cover-desk .section-title':'폼보다 도시가 먼저 보이는 홈 커버',
          '.home-cover-desk .section-desc':'첫 화면은 입력보다 도시의 무드와 샘플 루트를 먼저 보여주는 에디토리얼 커버로 정리했습니다.',
          '.cover-story-card-large .primary-btn':'매거진 열기',
          '.cover-story-card-large .secondary-btn':'샘플 일정 보기'
        },
        en: {
          '.brand-manifesto-note strong':'Brand line',
          '.brand-manifesto-note p':'Read the city. Then build the trip.\nThis line keeps the homepage, magazine, city guides, and results in one consistent tone.',
          '.home-cover-desk .eyebrow':'This week’s cover',
          '.home-cover-desk .section-title':'A homepage cover that opens with the city, not the form',
          '.home-cover-desk .section-desc':'The first screen now behaves more like an editorial cover: city mood first, route ideas second, Planner after that.',
          '.cover-story-card-large .primary-btn':'Open magazine',
          '.cover-story-card-large .secondary-btn':'Open sample route'
        },
        ja: {
          '.brand-manifesto .eyebrow':'ブランド方向',
          '.brand-manifesto-card .section-title':'Ryokoplan はツールより都市エディトリアルに近いです',
          '.brand-manifesto-card .section-desc':'機能説明から始まるのではなく、都市を先に読み、そのまま旅へつながる流れを前面に出します。',
          '.brand-manifesto-line:nth-of-type(1) strong':'先讀城市',
          '.brand-manifesto-line:nth-of-type(1) span':'ランドマーク一覧より先に、都市のリズムと街区の空気を見せます。',
          '.brand-manifesto-line:nth-of-type(2) strong':'Keep it clear',
          '.brand-manifesto-line:nth-of-type(2) span':'機能コピーではなく、短くはっきりしたエディトリアル文でまとめます。',
          '.brand-manifesto-line:nth-of-type(3) strong':'Build from rhythm',
          '.brand-manifesto-line:nth-of-type(3) span':'旅程は生成結果ではなく、都市を読んだあとに整うより良い流れとして見せます。',
          '.brand-manifesto-note strong':'Brand line',
          '.brand-manifesto-note p':'街を読んでから、旅を組み立てる。 この一文を軸に、ホーム、マガジン、都市ガイド、結果画面まで同じトーンでつないでいます。',
          '.home-cover-desk .eyebrow':'今週のカバー',
          '.home-cover-desk .section-title':'フォームより先に街が見えるホームカバー',
          '.home-cover-desk .section-desc':'最初の画面は入力フォームではなく、街のムードと サンプルルートから始まるエディトリアルカバーとして整えました。',
          '.cover-story-card-large h3':'速い都市と遅い都市を一つの画面で読む',
          '.cover-story-card-large p':'Tokyo, Osaka, Kyoto, Fukuoka を単なる一覧ではなく、リズムとムードの差として見せます。',
          '.cover-story-card-large .secondary-btn':'サンプルルートを開く',
          '.cover-story-card-compact h3':'Seoul から Jeju まで、温度の違う都市たち',
          '.cover-story-card-compact p':'都市ごとの空気感と移動密度を先に読み、韓国の中でも結がどう分かれるかを見せます。',
          '.dispatch-card .collection-kicker':'クイックディスパッチ',
          '.dispatch-lines div:nth-of-type(1) strong':'都市キュレーション',
          '.dispatch-lines div:nth-of-type(1) span':'読みたい都市を mood と pace から先に絞ります。',
          '.dispatch-lines div:nth-of-type(2) strong':'sample route',
          '.dispatch-lines div:nth-of-type(2) span':'良い旅程がどんな流れに見えるかを先に確認できます。',
          '.dispatch-lines div:nth-of-type(3) strong':'即 Planner',
          '.dispatch-lines div:nth-of-type(3) span':'気に入った都市やムードを押すと、値が入ったまま Planner が始まります。',
          '.top-story-card:first-child .eyebrow':'エディターズピック',
          '.top-story-card:first-child strong':'Tokyo after dark · Kyoto reset · Busan sea line',
          '.top-story-card:first-child span':'各都市の代表ムードを先に読んで、そのまま sample や Planner へ進みます。',
          '.top-story-card.soft .eyebrow':'快速入口',
          '.top-story-card.soft strong':'先に都市を読む',
          '.top-story-card.soft span':'説明より先にシーンが入るよう、ホームの第一印象をマガジンカバーのように整えました。'
        },
        zhHant: {
          '.brand-manifesto .eyebrow':'品牌方向',
          '.brand-manifesto-card .section-title':'Ryokoplan 更像城市 editorial，而不是旅行工具',
          '.brand-manifesto-card .section-desc':'不是先用功能說明把人帶進來，而是先讀城市，再自然接到旅程。',
          '.brand-manifesto-line:nth-of-type(1) strong':'先讀城市',
          '.brand-manifesto-line:nth-of-type(1) span':'在景點清單之前，先讓人看見城市節奏、氛圍與街區感。',
          '.brand-manifesto-line:nth-of-type(2) strong':'Keep it clear',
          '.brand-manifesto-line:nth-of-type(2) span':'不用工具型文案，而是用短而清楚的 editorial 句子。',
          '.brand-manifesto-line:nth-of-type(3) strong':'Build from rhythm',
          '.brand-manifesto-line:nth-of-type(3) span':'旅程不是生成結果，而是讀懂城市後整理出的更好節奏。',
          '.brand-manifesto-note strong':'Brand line',
          '.brand-manifesto-note p':'「先讀城市，再開始旅程」會把首頁、雜誌、城市指南與結果頁串成同一種語氣。',
          '.home-cover-desk .eyebrow':'本週封面',
          '.home-cover-desk .section-title':'先看到城市，而不是先看到表單的首頁封面',
          '.home-cover-desk .section-desc':'第一眼不是輸入表單，而是先用城市氛圍與範例路線打開的 editorial cover。',
          '.cover-story-card-large h3':'在同一個畫面讀快城市與慢城市',
          '.cover-story-card-large p':'把 Tokyo、Osaka、Kyoto、Fukuoka 當成節奏與 mood 的差異，而不是平面目的地清單。',
          '.cover-story-card-large .secondary-btn':'打開範例路線',
          '.cover-story-card-compact h3':'從 Seoul 到 Jeju，溫度不同的城市們',
          '.cover-story-card-compact p':'先讀城市的空氣感與移動密度，再看同一個韓國裡怎麼分出不同節奏。',
          '.dispatch-card .collection-kicker':'クイックディスパッチ',
          '.dispatch-lines div:nth-of-type(1) strong':'城市策展',
          '.dispatch-lines div:nth-of-type(1) span':'先用 mood 與 pace 縮小你想讀的城市。',
          '.dispatch-lines div:nth-of-type(2) strong':'sample route',
          '.dispatch-lines div:nth-of-type(2) span':'先看好的旅程大概會長成什麼流。',
          '.dispatch-lines div:nth-of-type(3) strong':'直接進 Planner',
          '.dispatch-lines div:nth-of-type(3) span':'一按喜歡的城市或 mood，就會帶著預填值開始。',
          '.top-story-card:first-child .eyebrow':'編輯精選',
          '.top-story-card:first-child strong':'Tokyo after dark · Kyoto reset · Busan sea line',
          '.top-story-card:first-child span':'先讀每座城市最強的 mood，再直接接到 sample 或 Planner。',
          '.top-story-card.soft .eyebrow':'快速入口',
          '.top-story-card.soft strong':'先讀城市',
          '.top-story-card.soft span':'讓場景先進來，而不是先看到說明，首頁第一眼更像一本城市雜誌封面。'
        }
      },
      magazine: {
        ja: {
          '.magazine-shell .utility-banner .eyebrow':'プランナーノート',
          '.magazine-shell .utility-banner .section-title':'都市のムードを先に読み、保存できる旅程へすぐつなげます。'
        },
        zhHant: {
          '.magazine-shell .utility-banner .eyebrow':'Planner 筆記',
          '.magazine-shell .utility-banner .section-title':'先抓城市 mood，再直接接到可保存的旅程。'
        }
      },
      trips: {
        ja: {
          '.trips-shell .utility-banner .eyebrow':'Trips note',
          '.trips-shell .utility-banner .section-title':'保存した旅、共有でもらった旅、最近の旅程を一つの流れで見直します。'
        },
        zhHant: {
          '.trips-shell .utility-banner .eyebrow':'Trips note',
          '.trips-shell .utility-banner .section-title':'把已存旅程、分享行程與最近路線放在同一條流裡。'
        }
      }
    };
    const pageMap = maps[page]?.[lang];
    if (!pageMap) return;
    Object.entries(pageMap).forEach(([selector, value]) => {
      const el = document.querySelector(selector);
      if (el) el.textContent = value;
    });
  }



  editorialData.magazine.ja = {
    ...editorialData.magazine.en,
    title:'Ryokoplan — Magazine',
    heroEyebrow:'Ryokoplan Magazine',
    heroTitle:'街を読んで、その先に旅を組み立てる',
    heroDesc:'必要なのは情報の量ではなく、街の質感、移動のリズム、そしてそのまま旅へつながる入口です。Magazine を Planner の手前にあるエディトリアルの最初の一枚として整えました。',
    heroChips:['日本・韓国中心','都市エディトリアルガイド','そのまま Planner へ'],
    startPlanner:'Planner を開く', browseCities:'都市を見る',
    featureMeta:'Better first route', featureTitle:'Tokyo → Kyoto → Osaka、リズムで読む最初の日本旅', featureDesc:'東京の密度、京都の余白、大阪の気楽さを順序よく置くと、初回でもずっと軽く感じられます。', featureLinks:['Tokyo のムード','Kyoto のペース','サンプル旅程'],
    sideKicker:'Magazine の役割', sideTitle:'読むだけで終わらず、そのまま旅へ進む入口', sideLines:[['City mood first','ランドマークより先に、街区の感触、ペース、合う旅タイプを見せます。'],['Less random browsing','fast city / slow day / food-led のように、今の気分からすぐ入れます。'],['Straight into Planner','気に入った都市やサンプルはそのまま Planner の値へつながります。']], sideButtons:['都市ガイド','保存した旅'],
    loopEyebrow:'Recommendation loop', loopTitle:'読んだあと、そのままルートへ進めるように', loopDesc:'最近見た旅や保存した旅があれば次の都市を提案し、なければ強い入口を先に見せます。',
    finderEyebrow:'City finder', finderTitle:'国より先に、ムードから都市を選ぶ', finderDesc:'ただのカード一覧ではなく、フィルターと検索でその場で絞り込めます。', finderSearchPH:'都市名・国・mood で検索', countryAll:'すべて', countryJapan:'Japan', countryKorea:'Korea', vibeAll:'すべての mood', vibeFast:'Fast city', vibeSlow:'Slow day', vibeFood:'Food-led', vibeCoast:'Coast',
    cityMeta:{tokyo:'日本編輯 · 快節奏城市', osaka:'日本編輯 · 輕鬆美食城市', kyoto:'日本編輯 · 留白慢旅行', fukuoka:'日本編輯 · 緊湊美食城市', sapporo:'日本編輯 · 雪光城市', sendai:'日本編輯 · 綠意城市停頓點', okinawa:'日本編輯 · 柔和島風', seoul:'韓國編輯 · 快節奏城市', busan:'韓國編輯 · 海景與美食', jeju:'韓國編輯 · 海邊與自然', gyeongju:'韓國編輯 · 安靜歷史旅', taipei:'繁中城市編輯 · 夜食節奏', hongkong:'繁中城市編輯 · 垂直港灣夜景', macau:'繁中城市編輯 · 緊湊遺產夜色'},
    cityCopy:{tokyo:'大きな見どころと静かな街区が同居する都市。街区ごとに読むと、全体がやわらかくほどけます。', osaka:'食べて、歩いて、休むリズムが近くに集まり、短い旅でも満足度が高い都市です。', kyoto:'詰め込まないほど良くなる都市。路地、川辺、寺エリアが余白を作ります。', fukuoka:'短い旅でも満足度を作りやすい、食中心のコンパクトシティです。', seoul:'どの街区を束ねるかで旅のムードが決まる都市です。', busan:'海景と市場のリズムが混ざり、ソウルとは違う開いたテンポになります。', jeju:'風景、カフェ、移動の余裕を軸にしてこそ済州らしくなります。', gyeongju:'数をこなすより、歴史の質感と歩くテンポを守る方が強い都市です。'},
    guideBtn:'都市ガイド', planBtn:'旅程を作る', emptyTitle:'条件に合う都市がありません', emptyDesc:'フィルターを少しゆるめると、近いムードの都市が見つかります。', curatedEyebrow:'厳選ルート', curatedTitle:'同じ都市でも、入り方のトーンは変わります', curatedDesc:'同行者やペースが変われば、同じ都市でも別の編集トーンから入る方が自然です。', bentoFeatureKicker:'ルートから始める', bentoFeatureTitle:'良い旅程のテンポを先に読む', bentoFeatureDesc:'Planner を開く前に、良い日程がどんな密度で流れるかをサンプルで先に見せます。', readSample:'サンプルを見る', usePlanner:'Planner で使う', parentsKicker:'親と一緒に', parentsTitle:'親と行く釜山は海景と休息の置き方が先です', parentsDesc:'景色の窓と移動負担を軽くすると、より自然な釜山ルートになります。', openBusan:'Busan を開く', slowKicker:'スロートリップ', slowTitle:'京都は見どころより間の時間が残る方がいい', slowDesc:'寺、川辺、カフェをゆるくつなぐと、京都らしさがもっと長く残ります。', openKyoto:'Kyoto を開く', howKicker:'使い方', howSteps:[['Read the mood','都市を先に読んで'],['Open a sample','サンプルでテンポを見て'],['Start in Planner','自分の旅へつなげる']], bannerTitle:'街を読んで、ルートを残す旅支度', bannerDesc:'街を読んで、流れをつかみ、そのまま自分の旅程へつなげて保存できる流れがこのページの役割です。', bannerPlanner:'Planner を開く', bannerTrips:'My Trips を開く'
  };
  editorialData.magazine.zhHant = {
    ...editorialData.magazine.en,
    title:'Ryokoplan — Magazine', heroEyebrow:'Ryokoplan 城市誌', heroTitle:'先讀懂東亞城市，再把旅程接起來', heroDesc:'現在更重要的不是更多資訊，而是城市的質感、移動節奏，以及能直接接到旅程的入口。', heroChips:['聚焦日本／韓國／繁中城市','城市編輯指南','可直接接到規劃'], startPlanner:'打開規劃器', browseCities:'看城市指南', featureMeta:'Better first route', featureTitle:'Tokyo → Kyoto → Osaka，用節奏讀第一次日本旅程', featureDesc:'把東京的密度、京都的留白、大阪的輕鬆感排成順序，第一次去也會輕很多。', featureLinks:['東京的 mood','京都的 pace','範例路線'], sideKicker:'Magazine 的作用', sideTitle:'不是讀完就結束，而是接到旅程的入口', sideLines:[['City mood first','先讓你看街區感、步調與適合的旅行型，而不是只看地標。'],['Less random browsing','可以直接從 fast city / slow day / food-led 這種現在的感覺切進去。'],['Straight into Planner','喜歡的城市或範例路線都能直接接到 Planner。']], sideButtons:['城市指南','已存旅程'], loopEyebrow:'Recommendation loop', loopTitle:'讓閱讀可以直接接成路線', loopDesc:'如果有最近看過或存過的旅程，就先推下一座城市；沒有的話，就先給你最強入口。', finderEyebrow:'City finder', finderTitle:'先用 mood 選城市', finderDesc:'不只是城市卡片，而是可以直接用篩選與搜尋縮小。', finderSearchPH:'用城市、國家、mood 搜尋', countryAll:'全部', countryJapan:'Japan', countryKorea:'Korea', vibeAll:'全部 mood', vibeFast:'Fast city', vibeSlow:'Slow day', vibeFood:'Food-led', vibeCoast:'Coast', cityMeta:{tokyo:'日本編輯 · 快節奏城市', osaka:'日本編輯 · 輕鬆美食城市', kyoto:'日本編輯 · 留白慢旅行', fukuoka:'日本編輯 · 緊湊美食城市', sapporo:'日本編輯 · 雪光城市', sendai:'日本編輯 · 綠意城市停頓點', okinawa:'日本編輯 · 柔和島風', seoul:'韓國編輯 · 快節奏城市', busan:'韓國編輯 · 海景與美食', jeju:'韓國編輯 · 海邊與自然', gyeongju:'韓國編輯 · 安靜歷史旅', taipei:'繁中城市編輯 · 夜食節奏', hongkong:'繁中城市編輯 · 垂直港灣夜景', macau:'繁中城市編輯 · 緊湊遺產夜色'}, cityCopy:{tokyo:'大場景與安靜街區並存的城市。用街區去讀，整體會更柔順。', osaka:'吃、走、休息的距離很近，短旅行也能做出很高的滿足感。', kyoto:'越不塞越好的城市。巷弄、河邊與寺區會把留白做出來。', fukuoka:'短去也很夠，用美食當主軸就很容易排得乾淨的緊湊城市。', sapporo:'雪光、冷空氣與一頓溫暖的晚餐，最能留下這座城市的冬季記憶。', sendai:'綠蔭大道、市場口袋與安靜的用餐節奏，更能讀出仙台的城市性格。', okinawa:'海風、柔和日照與鬆弛的開車節奏，才會讓沖繩看起來像真正的沖繩。', seoul:'不是景點數，而是怎麼把街區組在一起，決定整趟旅程的氣氛。', busan:'海景和市場節奏交疊，會走出和首爾不同的開放步調。', jeju:'要把風景、咖啡館與移動留白一起算進去，才會像真正的濟州。', gyeongju:'比起多看幾個點，守住歷史質感與步行節奏更重要。', taipei:'夜食節奏、巷弄層次和偏晚的空氣感，最容易留下來。', hongkong:'就算停留不長，也會留下很強的港灣壓縮感、垂直密度和夜坡節奏。', macau:'很適合用短步行去讀廣場尺度、遺產質地與安靜夜色收尾的緊湊城市。'}, guideBtn:'看城市指南', planBtn:'排行程', emptyTitle:'沒有符合條件的城市', emptyDesc:'把篩選放寬一點，就能看到更接近的 mood。', curatedEyebrow:'精選路線', curatedTitle:'同一座城市，也會有不同的進入語氣', curatedDesc:'同行對象與節奏一變，同一座城市就該用不同的編輯入口去讀。', bentoFeatureKicker:'從路線開始', bentoFeatureTitle:'先讀懂好旅程的節奏', bentoFeatureDesc:'在打開 Planner 前，先用 sample 看看好的行程怎麼流動。', readSample:'看 sample', usePlanner:'在 Planner 使用', parentsKicker:'和父母一起', parentsTitle:'和父母去釜山，要先把海景與休息窗口放對', parentsDesc:'把看景時間與移動負擔壓順，會得到更自然的釜山路線。', openBusan:'打開 Busan', slowKicker:'慢步旅行', slowTitle:'京都更適合把空白留給時間，而不是把景點塞滿', slowDesc:'把寺區、河邊與咖啡館鬆鬆接起來，京都感會留得更久。', openKyoto:'打開 Kyoto', howKicker:'使用方式', howSteps:[['Read the mood','先讀城市氣質'],['Open a sample','先看 sample 節奏'],['Start in Planner','再接到你的旅程']], bannerTitle:'先讀城市，再把路線留下來', bannerDesc:'這裡的重點不是只看完，而是把城市讀成自己的旅程，接著留下來、之後再回來。', bannerPlanner:'打開 Planner', bannerTrips:'打開 My Trips'
  };


  function initCommon(){
    document.documentElement.lang = lang;
    renderMagazineLanding();
    renderCityAtlas('magazine');
    renderCityPage();
    renderExamplePage();
    applyTranslations();
    localizeLangButtonLabels();
    localizeStaticIndexSections();
    localizeExtendedStaticSections();
    bindLanguageButtons();
    document.querySelectorAll('[data-nav="magazine"]').forEach(a => a.setAttribute('href', navHref('magazine')));
    document.querySelectorAll('[data-nav="planner"]').forEach(a => a.setAttribute('href', navHref('planner')));
    document.querySelectorAll('[data-nav="trips"]').forEach(a => a.setAttribute('href', navHref('trips')));
    document.addEventListener('click', (e) => {
      const navTarget = e.target.closest('[data-nav="planner-start"]');
      if (!navTarget) return;
      e.preventDefault();
      const plannerShell = document.querySelector('.planner-shell');
      if (plannerShell) plannerShell.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.location.href = navHref('planner');
    });
    renderMobileDock();
    initHomePresets();
    initPlannerOnboarding();
    renderHomeDiscovery();
    renderCityAtlas('home');
    renderHomePriorityStories();
    renderHomeCommunityDesk();
    renderSignalPersonalDesk('home');
    renderHomeSeasonalDesk();
    renderMagazineCommunityDesk();
    renderMagazinePriorityArticles();
    renderSecondaryCityStoryLayer();
    renderSignalPersonalDesk('magazine');
    renderMagazineSeasonalDesk();
    renderTripsSeasonalDesk();
    window.addEventListener('ryoko:langchange', () => {
      renderMagazineLanding();
      renderHomeDiscovery();
      renderCityAtlas('home');
      renderHomePriorityStories();
      renderCityAtlas('magazine');
      renderHomeCommunityDesk();
      renderSignalPersonalDesk('home');
      renderHomeSeasonalDesk();
      renderMagazineCommunityDesk();
    renderMagazinePriorityArticles();
    renderSecondaryCityStoryLayer();
      renderSignalPersonalDesk('magazine');
      renderMagazineSeasonalDesk();
      renderTripsSeasonalDesk();
      localizeLangButtonLabels();
      localizeStaticIndexSections();
    localizeExtendedStaticSections();
    });
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
  return { t, setLanguage, applyTranslations, bindLanguageButtons, initCommon, initMagazine, cityCardTemplate, getCityLoopData, getRelatedCities, getCityVoice, slugifyCity, resolvePath, applyPlannerPreset, getSignalRecommendations, detectSignalTags, recordSignalInteraction, getTopSignalTags, get lang(){return lang;}, pathRoot, navHref };
})();
window.addEventListener('DOMContentLoaded', () => { window.RyokoApp.initCommon(); window.RyokoApp.initMagazine(); });
