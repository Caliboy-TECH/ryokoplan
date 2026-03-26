
    window.addEventListener('DOMContentLoaded', () => {
      const $ = id => document.getElementById(id);
      const sections = { saved: $('savedSection'), recent: $('recentSection'), shared: $('sharedSection') };
      const imgMap = {
        Tokyo:'../assets/images/cities/tokyo.jpg', Osaka:'../assets/images/cities/osaka.jpg', Kyoto:'../assets/images/cities/kyoto.jpg',
        Fukuoka:'../assets/images/cities/fukuoka.jpg', Seoul:'../assets/images/cities/seoul.jpg', Busan:'../assets/images/cities/busan.jpg',
        Jeju:'../assets/images/cities/jeju.jpg', Gyeongju:'../assets/images/cities/gyeongju.jpg'
      };
      const copyByLang = {
        ko: {
          continueTitle: 'Continue your trip flow',
          continueDesc: '가장 최근에 열어본 여정부터 바로 이어서 볼 수 있어요.',
          noContinue: '아직 이어볼 여정이 없어요',
          noContinueDesc: '플래너에서 첫 일정을 만들거나, 공유 링크를 열어보세요.',
          useAsBase: '이 일정으로 이어가기',
          saveAsMine: '내 여정에 저장',
          remove: '제거',
          imported: '공유 링크를 My Trips에 추가했어요.',
          importFail: 'Ryokoplan 공유 링크를 확인해 주세요.',
          linkCopied: '링크를 복사했어요.',
          collectionsAll: '전체',
          filterAll: '전체',
          filterSaved: '저장됨',
          filterRecent: '최근',
          filterShared: '공유',
          sortRecent: '최신순',
          sortCity: '도시순',
          sortTitle: '제목순',
          searchPH: '도시명이나 제목으로 검색',
          importedLabel: '직접 가져온 링크',
          continueMeta: '가장 최근에 다시 본 일정',
          tripBase: '이 일정으로 새 여행 시작',
          tripSaved: '저장한 내 여정',
          tripRecent: '최근 본 흐름',
          tripShared: '공유받은 일정',
          lastUpdated: '업데이트',
          importTitle: '공유 링크 모아두기',
          importDesc: '누가 보낸 일정이든 붙여넣고 다시 꺼내보세요.',
          makeMyVersion: '내 버전 만들기',
          cityCollectionsEmptyTitle: '아직 도시 컬렉션이 없어요',
          cityCollectionsEmptyDesc: '저장하거나 공유받은 여정이 쌓이면 도시별 컬렉션이 여기 모입니다.',
          collectionRoutes: '개 루트',
          collectionPlaces: '개 장소 저장',
          collectionOpen: '최근 루트 열기',
          collectionGuide: '도시 가이드',
          collectionExample: '샘플 루트',
          collectionMixed: '저장/최근/공유가 함께 쌓인 아카이브',
          collectionSavedOnly: '저장한 여정 중심의 아카이브',
          collectionSharedHeavy: '공유받은 일정 비중이 높은 도시',
          collectionRecentHeavy: '최근 열어본 루트가 많은 도시',
          continueReading: '이어 읽기',
          collectionLayer: '도시 레이어 읽기',
          publicDeskLabel: '퍼블릭 루트 데스크',
          publicDeskPick: '에디터 픽',
          publicDeskSave: '내 루트로 저장',
          publicDeskOpen: '샘플 열기',
          publicDeskPlan: '플래너로 이어가기',
          publicDeskSaved: '샘플 루트를 My Trips에 저장했어요.',
          publicDeskIntro: '공개 샘플에서 바로 내 버전으로 이어지는 큐레이션 허브',
          publicDeskWeekend: '주말용 베이스',
          publicDeskSlow: '슬로우 무드',
          publicDeskFamily: '가족 동선',
          publicDeskFood: '푸드 중심',
          editSave: '베이스 저장',
          editOpen: '루트 보기',
          editGuide: '가이드 보기',
          editSaved: '에디토리얼 베이스를 My Trips에 저장했어요.',
          routeClubTitle: '트렌딩 루트 클럽',
          routeClubLabel: '지금 많이 저장되는 결',
          routeClubSave: '내 버전으로 저장',
          routeClubOpen: '관련 샘플 보기',
          routeClubGuide: '관련 도시 읽기',
          routeClubSaved: '트렌딩 루트를 내 버전으로 저장했어요.'
        },
        en: {
          continueTitle: 'Continue your trip flow',
          continueDesc: 'Jump back into the last trip you opened or shaped.',
          noContinue: 'No trip to continue yet',
          noContinueDesc: 'Create your first plan or import a shared Ryokoplan link.',
          useAsBase: 'Continue this trip',
          saveAsMine: 'Save to My Trips',
          remove: 'Remove',
          imported: 'Shared trip added to My Trips.',
          importFail: 'Check that this is a Ryokoplan shared link.',
          linkCopied: 'Link copied.',
          collectionsAll: 'All',
          filterAll: 'All',
          filterSaved: 'Saved',
          filterRecent: 'Recent',
          filterShared: 'Shared',
          sortRecent: 'Newest first',
          sortCity: 'By city',
          sortTitle: 'By title',
          searchPH: 'Search by city or title',
          importedLabel: 'Imported link',
          continueMeta: 'Most recent trip to reopen',
          tripBase: 'Use this trip as a new base',
          tripSaved: 'Saved to My Trips',
          tripRecent: 'Recently opened',
          tripShared: 'Shared itinerary',
          lastUpdated: 'Updated',
          importTitle: 'Collect shared links',
          importDesc: 'Paste any Ryokoplan itinerary link and keep it here.',
          makeMyVersion: 'Make my version',
          cityCollectionsEmptyTitle: 'No city collections yet',
          cityCollectionsEmptyDesc: 'As saved, recent, and shared trips build up, city collections will appear here automatically.',
          collectionRoutes: 'routes',
          collectionPlaces: 'saved places',
          collectionOpen: 'Open latest',
          collectionGuide: 'City guide',
          collectionExample: 'Sample route',
          collectionMixed: 'A mixed archive of saved, recent, and shared routes',
          collectionSavedOnly: 'Mostly built from your saved routes',
          collectionSharedHeavy: 'A city with a stronger shared-trip mix',
          collectionRecentHeavy: 'A city you reopened often recently',
          continueReading: 'Continue reading next',
          collectionLayer: 'City guide layer',
          publicDeskLabel: 'Public route desk',
          publicDeskPick: 'Editor pick',
          publicDeskSave: 'Save to My Trips',
          publicDeskOpen: 'Compare sample',
          publicDeskPlan: 'Continue in Planner',
          publicDeskSaved: 'Sample route saved to My Trips.',
          publicDeskIntro: 'A curated hub where public samples can become your next trip base.',
          publicDeskWeekend: 'Weekend base',
          publicDeskSlow: 'Slow mood',
          publicDeskFamily: 'Family pacing',
          publicDeskFood: 'Food-led',
          editSave: 'Save base',
          editOpen: 'Open route',
          editGuide: 'Read guide',
          editSaved: 'Editorial base saved to My Trips.',
          routeClubTitle: 'Trending route club',
          routeClubLabel: 'A shape people keep saving now',
          routeClubSave: 'Save my version',
          routeClubOpen: 'Open related sample',
          routeClubGuide: 'Read related city',
          routeClubSaved: 'Trending route saved as your own version.',
          loopEmptyEyebrow: 'No saved loop yet',
          loopEmptyTitle: 'Save one trip, then the city-first loop gets smarter',
          loopEmptyDesc: 'Once a trip is saved or reopened, My Trips can point you to the next guide, sample route, or related city branch that fits the tone you already liked.',
          loopOpenPlanner: 'Open Planner',
          loopReadMagazine: 'Read Magazine',
          loopGoodStart: 'Good starting points',
          loopTokyoGuide: 'Tokyo guide',
          loopTokyoGuideDesc: 'A strong first-entry city when you want density, nightlife, and clean next branches.',
          loopBusanSample: 'Busan sample',
          loopBusanSampleDesc: 'A softer scenic sample for mixed-age travel, easier coast timing, and gentler night closes.',
          loopVaultEyebrow: 'From your vault',
          loopVaultTitle: 'can open the next step too'
        },
        ja: {
          continueTitle: '旅の流れを続ける',
          continueDesc: '最後に開いた旅程からそのまま戻れます。',
          noContinue: 'まだ続きから開く旅がありません',
          noContinueDesc: '最初の旅程を作るか、共有リンクを取り込んでください。',
          useAsBase: 'この旅程から続ける',
          saveAsMine: 'My Trips に保存',
          remove: '削除',
          imported: '共有リンクを My Trips に追加しました。',
          importFail: 'Ryokoplan の共有リンクか確認してください。',
          linkCopied: 'リンクをコピーしました。',
          collectionsAll: 'すべて',
          filterAll: 'すべて',
          filterSaved: '保存済み',
          filterRecent: '最近',
          filterShared: '共有',
          sortRecent: '新しい順',
          sortCity: '都市順',
          sortTitle: 'タイトル順',
          searchPH: '都市名またはタイトルで検索',
          importedLabel: '取り込んだリンク',
          continueMeta: '最後に見直した旅程',
          tripBase: 'この旅程を新しいベースにする',
          tripSaved: '保存した旅程',
          tripRecent: '最近開いた旅程',
          tripShared: '共有された旅程',
          lastUpdated: '更新',
          importTitle: '共有リンクをまとめる',
          importDesc: '誰かが送った旅程を貼り付けて、あとでまた開けます。',
          makeMyVersion: '自分版を作る',
          cityCollectionsEmptyTitle: 'まだ都市コレクションがありません',
          cityCollectionsEmptyDesc: '保存や共有された旅程が増えると、都市ごとのコレクションがここにまとまります。',
          collectionRoutes: '件のルート',
          collectionPlaces: '件の保存スポット',
          collectionOpen: '最新ルートを開く',
          collectionGuide: '都市ガイド',
          collectionExample: 'サンプルルート',
          collectionMixed: '保存・最近・共有が混ざったアーカイブ',
          collectionSavedOnly: '保存した旅程中心のアーカイブ',
          collectionSharedHeavy: '共有旅程の比率が高い都市',
          collectionRecentHeavy: '最近よく開き直した都市',
          continueReading: '続けて読む',
          collectionLayer: '都市の層を読む',
          publicDeskLabel: '公開ルートデスク',
          publicDeskPick: 'エディターピック',
          publicDeskSave: 'My Trips に保存',
          publicDeskOpen: 'サンプルを開く',
          publicDeskPlan: 'Planner へつなぐ',
          publicDeskSaved: 'サンプルルートを My Trips に保存しました。',
          publicDeskIntro: '公開サンプルから自分の次の旅へつながるキュレーションハブ',
          publicDeskWeekend: '週末ベース',
          publicDeskSlow: 'スロームード',
          publicDeskFamily: '家族ペース',
          publicDeskFood: '食中心',
          editSave: 'ベースを保存',
          editOpen: 'ルートを見る',
          editGuide: 'ガイドを見る',
          editSaved: 'エディトリアルベースを My Trips に保存しました。',
          routeClubTitle: 'トレンドルートクラブ',
          routeClubLabel: '今よく保存されている形',
          routeClubSave: '自分版として保存',
          routeClubOpen: '関連サンプルを見る',
          routeClubGuide: '関連都市を読む',
          routeClubSaved: 'トレンドルートを自分版として保存しました。',
          loopEmptyEyebrow: 'まだ保存ループがありません',
          loopEmptyTitle: '一つ旅程を作ると、次の流れがもっと見えやすくなります',
          loopEmptyDesc: '旅程を保存したり再度開いたりすると、My Trips が次に読むガイドやサンプルルートを提案できます。',
          loopOpenPlanner: 'Planner を開く',
          loopReadMagazine: 'Magazine を読む',
          loopGoodStart: '最初の入り口に向くもの',
          loopTokyoGuide: 'Tokyo ガイド',
          loopTokyoGuideDesc: '速い都市で、最初のルートが作りやすく、次の分岐も多いです。',
          loopBusanSample: 'Busan サンプル',
          loopBusanSampleDesc: '景色のペースと幅広い年齢の旅に向いています。',
          loopVaultEyebrow: 'あなたの保管庫から',
          loopVaultTitle: 'から次の一歩へつなげられます'
        },
        zhHant: {
          continueTitle: '接著你的旅程節奏',
          continueDesc: '可以直接回到你最後打開的那份旅程。',
          noContinue: '還沒有可以接著看的旅程',
          noContinueDesc: '先建立第一個行程，或匯入分享連結。',
          useAsBase: '從這份旅程接著走',
          saveAsMine: '存到 My Trips',
          remove: '移除',
          imported: '已把分享行程加入 My Trips。',
          importFail: '請確認這是 Ryokoplan 的分享連結。',
          linkCopied: '已複製連結。',
          collectionsAll: '全部',
          filterAll: '全部',
          filterSaved: '已保存',
          filterRecent: '最近',
          filterShared: '分享',
          sortRecent: '最新優先',
          sortCity: '依城市',
          sortTitle: '依標題',
          searchPH: '用城市或標題搜尋',
          importedLabel: '匯入的連結',
          continueMeta: '最近重新打開的旅程',
          tripBase: '把這份旅程當作新底稿',
          tripSaved: '已存到 My Trips',
          tripRecent: '最近打開',
          tripShared: '分享行程',
          lastUpdated: '更新',
          importTitle: '收好分享連結',
          importDesc: '把別人傳來的旅程貼上，之後可以再回來接著看。',
          makeMyVersion: '做成我的版本',
          cityCollectionsEmptyTitle: '還沒有城市收藏',
          cityCollectionsEmptyDesc: '當已保存、最近與分享旅程慢慢累積後，城市收藏會自動出現在這裡。',
          collectionRoutes: '條路線',
          collectionPlaces: '個已存地點',
          collectionOpen: '打開最新路線',
          collectionGuide: '城市指南',
          collectionExample: '範例路線',
          collectionMixed: '混合了保存、最近與分享旅程的檔案庫',
          collectionSavedOnly: '以你保存的旅程為主的檔案庫',
          collectionSharedHeavy: '分享旅程比例較高的城市',
          collectionRecentHeavy: '最近常重新打開的城市',
          continueReading: '接續閱讀',
          collectionLayer: '繼續讀城市層次',
          publicDeskLabel: '公開路線桌',
          publicDeskPick: '編輯精選',
          publicDeskSave: '存到 My Trips',
          publicDeskOpen: '打開範例',
          publicDeskPlan: '接到 Planner',
          publicDeskSaved: '已把範例路線存到 My Trips。',
          publicDeskIntro: '讓公開範例直接變成下一份旅程底稿的策展區',
          publicDeskWeekend: '週末底稿',
          publicDeskSlow: '慢節奏',
          publicDeskFamily: '家庭動線',
          publicDeskFood: '美食導向',
          editSave: '保存底稿',
          editOpen: '看路線',
          editGuide: '看指南',
          editSaved: '已把編輯底稿存到 My Trips。',
          routeClubTitle: '熱門路線俱樂部',
          routeClubLabel: '現在很多人正在保存的形狀',
          routeClubSave: '存成我的版本',
          routeClubOpen: '看相關範例',
          routeClubGuide: '讀相關城市',
          routeClubSaved: '已把熱門路線存成你的版本。'
        }
      };
      let activeCollection = 'all';
      let activeModeFilter = 'all';

      const publicRouteDesk = [
        {
          key:'tokyo-first', city:'Tokyo', titleKo:'Tokyo first trip base', titleEn:'Tokyo first trip base', badgeKey:'publicDeskWeekend', image:'../assets/images/examples/tokyo-first-trip.jpg', guide:'../city/tokyo.html', example:'../example/tokyo-3n4d-first-trip.html',
          summaryKo:'처음 가는 도쿄를 과열되지 않게 시작하기 좋은 공개 베이스입니다.', summaryEn:'A first-time Tokyo base that keeps its charge without overheating the pace.',
          duration:'3N4D', companionKo:'커플/친구', companionEn:'Couple / Friends', vibeKo:'도시 밀도', vibeEn:'City density', bestKo:'첫 여행, 쇼핑, 밤 리듬', bestEn:'First trip, shopping, night rhythm'
        },
        {
          key:'kyoto-slow', city:'Kyoto', titleKo:'Kyoto slow reset', titleEn:'Kyoto slow reset', badgeKey:'publicDeskSlow', image:'../assets/images/examples/kyoto-slow.jpg', guide:'../city/kyoto.html', example:'../example/kyoto-2n3d-slow-trip.html',
          summaryKo:'많이 넣지 않고 교토의 여백을 살리는 공개 샘플입니다.', summaryEn:'A Kyoto sample that protects the city by leaving real space in the route.',
          duration:'2N3D', companionKo:'혼자/커플', companionEn:'Solo / Couple', vibeKo:'조용한 무드', vibeEn:'Quiet mood', bestKo:'슬로우 트립, 오전 사원', bestEn:'Slow trip, temple mornings'
        },
        {
          key:'busan-parents', city:'Busan', titleKo:'Busan scenic family route', titleEn:'Busan scenic family route', badgeKey:'publicDeskFamily', image:'../assets/images/examples/busan-parents.jpg', guide:'../city/busan.html', example:'../example/busan-2n3d-with-parents.html',
          summaryKo:'부모님과도 무리 없이 갈 수 있는 부산 scenic 루트 베이스입니다.', summaryEn:'A scenic Busan base that stays gentle for mixed-age or parent trips.',
          duration:'2N3D', companionKo:'가족/부모님', companionEn:'Family / Parents', vibeKo:'시닉 리듬', vibeEn:'Scenic rhythm', bestKo:'전망, 식사, 완만한 템포', bestEn:'Views, meals, softer tempo'
        },
        {
          key:'fukuoka-food', city:'Fukuoka', titleKo:'Fukuoka food weekend', titleEn:'Fukuoka food weekend', badgeKey:'publicDeskFood', image:'../assets/images/examples/fukuoka-food.jpg', guide:'../city/fukuoka.html', example:'../example/fukuoka-2n3d-food-trip.html',
          summaryKo:'짧은 일정에서 식사 리듬을 가장 잘 살리는 공개 샘플입니다.', summaryEn:'A compact public sample built around the strongest food rhythm for a short stay.',
          duration:'2N3D', companionKo:'친구/혼자', companionEn:'Friends / Solo', vibeKo:'푸드 리듬', vibeEn:'Food rhythm', bestKo:'짧은 일본, 컴팩트 이동', bestEn:'Short Japan, compact moves'
        },
        {
          key:'seoul-rainy', city:'Seoul', titleKo:'Seoul rainy-day fallback', titleEn:'Seoul rainy-day fallback', badgeKey:'publicDeskSlow', image:'../assets/images/cities/seoul.jpg', guide:'../city/seoul.html', example:'../example/seoul-2n3d-city-vibes.html',
          summaryKo:'비가 오거나 컨디션이 애매할 때도 동네 리듬을 망치지 않는 서울용 공개 베이스입니다.', summaryEn:'A Seoul fallback base that still holds shape when weather turns or energy drops.',
          duration:'2N3D', companionKo:'혼자/친구', companionEn:'Solo / Friends', vibeKo:'레인 스왑', vibeEn:'Rain swap', bestKo:'비 오는 날, 동네 이동', bestEn:'Rainy day, neighborhood flow'
        },
        {
          key:'jeju-soft-drive', city:'Jeju', titleKo:'Jeju soft drive base', titleEn:'Jeju soft drive base', badgeKey:'publicDeskFamily', image:'../assets/images/cities/jeju.jpg', guide:'../city/jeju.html', example:'../example/busan-2n3d-with-parents.html',
          summaryKo:'제주의 이동 현실을 반영해서 과속하지 않는 드라이브형 공개 베이스입니다.', summaryEn:'A gentler Jeju base that respects drive time, open space, and lower route density.',
          duration:'2N3D', companionKo:'가족/커플', companionEn:'Family / Couple', vibeKo:'드라이브 리듬', vibeEn:'Drive rhythm', bestKo:'제주 초행, 느린 일정', bestEn:'First Jeju, slower pace'
        }
      ];

      const routeClubDesk = [
        {
          key:'tokyo-to-seoul-night', source:'Tokyo', city:'Seoul', titleKo:'도쿄 다음엔 서울 나이트 리듬', titleEn:'Seoul after Tokyo night rhythm', image:'../assets/images/cities/seoul.jpg', guide:'../city/seoul.html', example:'../example/seoul-2n3d-city-vibes.html',
          summaryKo:'도쿄의 밀도와 밤 리듬이 맞았다면, 다음 분기로는 서울의 동네 대비와 늦은 저녁 템포가 잘 이어집니다.',
          summaryEn:'If Tokyo worked for density and night rhythm, Seoul is a strong next branch for neighborhood contrast and later evenings.',
          chipsKo:['트렌딩', '야간 리듬', '동네 대비'], chipsEn:['Trending', 'Night rhythm', 'Neighborhood contrast'], duration:'2N3D'
        },
        {
          key:'kyoto-to-gyeongju-quiet', source:'Kyoto', city:'Gyeongju', titleKo:'교토 다음엔 경주의 조용한 템포', titleEn:'Quiet Gyeongju after Kyoto', image:'../assets/images/cities/gyeongju.jpg', guide:'../city/gyeongju.html', example:'../city/gyeongju.html',
          summaryKo:'교토의 여백과 낮은 에너지 밀도가 좋았다면, 경주는 더 느린 문화 리듬으로 자연스럽게 이어집니다.',
          summaryEn:'If Kyoto worked because of space and lower energy density, Gyeongju keeps that line going with an even slower cultural tempo.',
          chipsKo:['슬로우', '문화 리듬', '낮은 밀도'], chipsEn:['Slow', 'Cultural rhythm', 'Low density'], duration:'2N3D'
        },
        {
          key:'busan-to-jeju-soft', source:'Busan', city:'Jeju', titleKo:'부산 다음엔 제주 소프트 드라이브', titleEn:'Soft Jeju drive after Busan', image:'../assets/images/cities/jeju.jpg', guide:'../city/jeju.html', example:'../city/jeju.html',
          summaryKo:'부산에서 전망과 완만한 템포가 잘 맞았다면, 제주는 더 느슨한 드라이브형 분기로 잘 이어집니다.',
          summaryEn:'If Busan worked for views and a softer tempo, Jeju is the next branch for a more open drive-based route.',
          chipsKo:['코스트', '드라이브', '가벼운 분기'], chipsEn:['Coast', 'Drive', 'Softer branch'], duration:'2N3D'
        },
        {
          key:'fukuoka-to-osaka-food', source:'Fukuoka', city:'Osaka', titleKo:'후쿠오카 다음엔 오사카 푸드 업시프트', titleEn:'Food upshift to Osaka after Fukuoka', image:'../assets/images/cities/osaka.jpg', guide:'../city/osaka.html', example:'../example/osaka-2n3d-family.html',
          summaryKo:'짧은 후쿠오카 푸드 리듬이 좋았다면, 오사카는 더 진한 식사 동선과 에너지를 주는 다음 샘플입니다.',
          summaryEn:'If Fukuoka worked as a compact food rhythm, Osaka is the next sample for heavier meal sequencing and more energy.',
          chipsKo:['푸드', '업시프트', '주말'], chipsEn:['Food-led', 'Upshift', 'Weekend'], duration:'2N3D'
        }
      ];

      const operatingEdits = [
        {
          key:'spring-soft-seoul', city:'Seoul', titleKo:'봄 주말 서울 소프트 에디트', titleEn:'Soft Seoul spring weekend', labelKo:'시즌 에디트', labelEn:'Seasonal edit', image:'../assets/images/cities/seoul.jpg', guide:'../city/seoul.html', example:'../example/seoul-2n3d-city-vibes.html',
          summaryKo:'벚꽃 시즌처럼 사람이 많을 때도 리듬을 망치지 않게, 동네 조합과 시간대를 부드럽게 잡은 베이스입니다.', summaryEn:'A softer Seoul base for crowded spring windows, built on neighborhood rhythm and timing.',
          chipsKo:['봄 창', '동네 조합', '저녁 무드'], chipsEn:['Spring window', 'Neighborhood pairings', 'Evening mood'], duration:'2N3D', companionKo:'커플/친구', companionEn:'Couple / Friends'
        },
        {
          key:'tokyo-weekend-dense', city:'Tokyo', titleKo:'도쿄 주말 고밀도 베이스', titleEn:'Tokyo dense weekend base', labelKo:'주말 에디트', labelEn:'Weekend edit', image:'../assets/images/cities/tokyo.jpg', guide:'../city/tokyo.html', example:'../example/tokyo-3n4d-first-trip.html',
          summaryKo:'시간이 짧아도 밀도를 살리고 싶을 때 쓰는 주말형 도쿄 베이스입니다. 축을 나눠 과열만 막습니다.', summaryEn:'A short-window Tokyo base for travelers who still want density without turning the route into a blur.',
          chipsKo:['주말', '밀도', '축 나누기'], chipsEn:['Weekend', 'Density', 'Axis split'], duration:'2N3D', companionKo:'친구', companionEn:'Friends'
        },
        {
          key:'busan-parents-soft', city:'Busan', titleKo:'부모님과 가는 부산 소프트 루트', titleEn:'Soft Busan with parents', labelKo:'동행 에디트', labelEn:'Companion edit', image:'../assets/images/cities/busan.jpg', guide:'../city/busan.html', example:'../example/busan-2n3d-with-parents.html',
          summaryKo:'전망과 식사는 살리고 피로 누적은 줄이는 부모님 동행용 베이스입니다.', summaryEn:'A parent-friendly Busan base that keeps the views and meals while protecting energy.',
          chipsKo:['부모님', '전망', '피로 조절'], chipsEn:['Parents', 'Views', 'Fatigue control'], duration:'2N3D', companionKo:'가족/부모님', companionEn:'Family / Parents'
        },
        {
          key:'kyoto-solo-quiet', city:'Kyoto', titleKo:'교토 솔로 콰이어트 윈도우', titleEn:'Quiet Kyoto for solo time', labelKo:'솔로 에디트', labelEn:'Solo edit', image:'../assets/images/cities/kyoto.jpg', guide:'../city/kyoto.html', example:'../example/kyoto-2n3d-slow-trip.html',
          summaryKo:'혼자일 때 교토를 과하게 쓰지 않고, 오전과 저녁의 조용한 시간을 중심으로 읽는 베이스입니다.', summaryEn:'A solo Kyoto base built around quieter morning and evening windows instead of trying to do too much.',
          chipsKo:['혼자', '조용한 시간', '슬로우'], chipsEn:['Solo', 'Quiet windows', 'Slow'], duration:'2N3D', companionKo:'혼자', companionEn:'Solo'
        },
        {
          key:'fukuoka-friends-food', city:'Fukuoka', titleKo:'후쿠오카 친구 푸드 위켄드', titleEn:'Fukuoka food weekend with friends', labelKo:'프렌즈 에디트', labelEn:'Friends edit', image:'../assets/images/cities/fukuoka.jpg', guide:'../city/fukuoka.html', example:'../example/fukuoka-2n3d-food-trip.html',
          summaryKo:'짧게 가도 식사 타이밍이 무너지지 않게, 친구와 쓰기 좋은 푸드 중심 베이스입니다.', summaryEn:'A friend-ready Fukuoka base built around food timing that still works on a short weekend.',
          chipsKo:['친구', '푸드', '짧은 일본'], chipsEn:['Friends', 'Food', 'Short Japan'], duration:'2N3D', companionKo:'친구', companionEn:'Friends'
        },
        {
          key:'busan-summer-coast', city:'Busan', titleKo:'부산 서머 코스트 에디트', titleEn:'Busan summer coast edit', labelKo:'시즌 에디트', labelEn:'Seasonal edit', image:'../assets/images/cities/busan.jpg', guide:'../city/busan.html', example:'../example/busan-2n3d-with-parents.html',
          summaryKo:'여름 부산에서 바다를 많이 넣되 이동 과열은 막는 coast 중심 베이스입니다.', summaryEn:'A summer Busan base that lets the coast lead without overheating the route.',
          chipsKo:['여름', '코스트', '오후 전망'], chipsEn:['Summer', 'Coast', 'Late-day views'], duration:'2N3D', companionKo:'친구/커플', companionEn:'Friends / Couple'
        },
        {
          key:'seoul-late-night-friends', city:'Seoul', titleKo:'서울 프렌즈 레이트나이트 에디트', titleEn:'Seoul late-night friends edit', labelKo:'프렌즈 에디트', labelEn:'Friends edit', image:'../assets/images/cities/seoul.jpg', guide:'../city/seoul.html', example:'../example/seoul-2n3d-city-vibes.html',
          summaryKo:'밤 리듬을 살리되 다음날이 무너지지 않게 조절한 서울 친구 여행 베이스입니다.', summaryEn:'A Seoul friends base that keeps the late-night rhythm without ruining the next day.',
          chipsKo:['친구', '밤 리듬', '다음날 보호'], chipsEn:['Friends', 'Night rhythm', 'Protect next day'], duration:'2N3D', companionKo:'친구', companionEn:'Friends'
        },
        {
          key:'jeju-parents-easy', city:'Jeju', titleKo:'제주 부모님 이지 페이스', titleEn:'Jeju easy pace with parents', labelKo:'동행 에디트', labelEn:'Companion edit', image:'../assets/images/cities/jeju.jpg', guide:'../city/jeju.html', example:'../example/busan-2n3d-with-parents.html',
          summaryKo:'운전과 풍경, 식사 리듬을 무리 없이 맞춘 부모님 동행용 제주 베이스입니다.', summaryEn:'A Jeju parent-friendly base built around easy drive logic, view windows, and meal rhythm.',
          chipsKo:['부모님', '드라이브', '쉬운 페이스'], chipsEn:['Parents', 'Drive', 'Easy pace'], duration:'2N3D', companionKo:'가족/부모님', companionEn:'Family / Parents'
        }
      ];

      function langCopy(){ return copyByLang[window.RyokoApp.lang] || copyByLang.en; }

      function langVariant(ko, en, ja, zhHant){
        const lang = window.RyokoApp.lang;
        if (lang === 'ko') return ko ?? en ?? '';
        if (lang === 'ja') return ja ?? en ?? ko ?? '';
        if (lang === 'zhHant') return zhHant ?? en ?? ko ?? '';
        return en ?? ko ?? '';
      }
      function rhythmSignalsForCity(city=''){
        const key = String(city || '').toLowerCase().trim();
        const map = {
          tokyo: { ko:['아침 앵커','오후 리셋','밤 클로즈'], en:['Morning anchor','Afternoon reset','Night close'], ja:['朝のアンカー','午後のリセット','夜の締め'], zhHant:['早晨起點','午後重整','夜間收尾'] },
          seoul: { ko:['첫 동네','낮 대비','밤 축'], en:['First district','Midday contrast','Night district'], ja:['最初の街区','昼のコントラスト','夜の街区'], zhHant:['第一街區','中段對比','夜間街區'] },
          kyoto: { ko:['조용한 아침','오후 여백','해질녘 마감'], en:['Quiet morning','Soft middle','Dusk close'], ja:['静かな朝','午後の余白','夕暮れの締め'], zhHant:['安靜早晨','午後留白','黃昏收尾'] },
          taipei: { ko:['부드러운 시작','질감 있는 오후','밤 넘기기'], en:['Soft opening','Textured middle','Night handoff'], ja:['やわらかな始まり','質感のある午後','夜への受け渡し'], zhHant:['柔和開場','有質感的中段','夜晚轉場'] },
          'hong kong': { ko:['수직 시작','숨 고르기','하버 마감'], en:['Vertical start','Breathing pocket','Harbor close'], ja:['縦の始まり','息継ぎの余白','港の締め'], zhHant:['垂直開場','喘息空間','海港收尾'] },
          busan: { ko:['바다 오프너','쉼 구간','밤 해안'], en:['Sea opener','Rest window','Night shore'], ja:['海辺の始まり','休む時間','夜の海辺'], zhHant:['海邊開場','休息時段','夜晚海岸'] },
          fukuoka: { ko:['첫 식사','오후 완화','컴팩트한 밤'], en:['Food-first start','Afternoon soften','Compact night'], ja:['最初の一食','午後のやわらぎ','コンパクトな夜'], zhHant:['先吃一口','午後放慢','緊湊夜晚'] }
        };
        const normalized = key === 'hongkong' ? 'hong kong' : key;
        const lang = window.RyokoApp.lang === 'zhHant' ? 'zhHant' : (window.RyokoApp.lang || 'en');
        return map[normalized]?.[lang] || map[normalized]?.en || [];
      }
      function rhythmLabel(){
        return langVariant('Day rhythm','Day rhythm','一日のリズム','一日節奏');
      }
      function priorityVisitEntryPack(city=''){
        const map = {
          tokyo: {
            ko:{visit:'방문 분기', first:['첫 방문','Asakusa → Ueno → Kiyosumi'], second:['두 번째','Kiyosumi → Jinbocho → Kagurazaka'], entry:['Classic first read','Design-soft read']},
            en:{visit:'Visit lens', first:['First trip','Asakusa → Ueno → Kiyosumi'], second:['Return trip','Kiyosumi → Jinbocho → Kagurazaka'], entry:['Classic','Design-soft']},
            ja:{visit:'訪問レンズ', first:['初回','Asakusa → Ueno → Kiyosumi'], second:['再訪','Kiyosumi → Jinbocho → Kagurazaka'], entry:['最初の入口','デザイン寄り入口']},
            zhHant:{visit:'造訪視角', first:['初訪','Asakusa → Ueno → Kiyosumi'], second:['再訪','Kiyosumi → Jinbocho → Kagurazaka'], entry:['第一入口','設計感入口']}
          },
          seoul: {
            ko:{visit:'방문 분기', first:['첫 방문','Seongsu → Euljiro → Seochon'], second:['두 번째','Mangwon → Seochon → Euljiro late'], entry:['Contrast opener','Soft local opener']},
            en:{visit:'Visit lens', first:['First trip','Seongsu → Euljiro → Seochon'], second:['Return trip','Mangwon → Seochon → Euljiro late'], entry:['Contrast','Soft local']},
            ja:{visit:'訪問レンズ', first:['初回','Seongsu → Euljiro → Seochon'], second:['再訪','Mangwon → Seochon → Euljiro late'], entry:['対比の入口','ローカル寄り入口']},
            zhHant:{visit:'造訪視角', first:['初訪','Seongsu → Euljiro → Seochon'], second:['再訪','Mangwon → Seochon → Euljiro late'], entry:['對比入口','在地入口']}
          },
          kyoto: {
            ko:{visit:'방문 분기', first:['첫 방문','Higashiyama early → Gion edge → Kamo dusk'], second:['두 번째','Okazaki → Nishijin → Kamo dusk'], entry:['Quiet icon opener','River-soft opener']},
            en:{visit:'Visit lens', first:['First trip','Higashiyama early → Gion edge → Kamo dusk'], second:['Return trip','Okazaki → Nishijin → Kamo dusk'], entry:['Quiet icon','River-soft']},
            ja:{visit:'訪問レンズ', first:['初回','Higashiyama early → Gion edge → Kamo dusk'], second:['再訪','Okazaki → Nishijin → Kamo dusk'], entry:['静かな入口','川沿いの入口']},
            zhHant:{visit:'造訪視角', first:['初訪','Higashiyama early → Gion edge → Kamo dusk'], second:['再訪','Okazaki → Nishijin → Kamo dusk'], entry:['安靜入口','河邊入口']}
          },
          taipei: {
            ko:{visit:'방문 분기', first:['첫 방문','Yongkang → Dihua → one night market'], second:['두 번째','Chifeng → Treasure Hill → tea room close'], entry:['Food-first opener','Texture opener']},
            en:{visit:'Visit lens', first:['First trip','Yongkang → Dihua → one night market'], second:['Return trip','Chifeng → Treasure Hill → tea room close'], entry:['Food-first','Texture']},
            ja:{visit:'訪問レンズ', first:['初回','Yongkang → Dihua → one night market'], second:['再訪','Chifeng → Treasure Hill → tea room close'], entry:['食から入る','質感から入る']},
            zhHant:{visit:'造訪視角', first:['初訪','Yongkang → Dihua → one night market'], second:['再訪','Chifeng → Treasure Hill → tea room close'], entry:['先吃再讀','先讀質感']}
          },
          hongkong: {
            ko:{visit:'방문 분기', first:['첫 방문','Central → Sheung Wan → Tsim Sha Tsui night'], second:['두 번째','Sheung Wan → PMQ/Soho → West Kowloon close'], entry:['Vertical opener','Harbor opener']},
            en:{visit:'Visit lens', first:['First trip','Central → Sheung Wan → Tsim Sha Tsui night'], second:['Return trip','Sheung Wan → PMQ/Soho → West Kowloon close'], entry:['Vertical opener','Harbor opener']},
            ja:{visit:'訪問レンズ', first:['初回','Central → Sheung Wan → Tsim Sha Tsui night'], second:['再訪','Sheung Wan → PMQ/Soho → West Kowloon close'], entry:['縦の入口','ハーバー入口']},
            zhHant:{visit:'造訪視角', first:['初訪','Central → Sheung Wan → Tsim Sha Tsui night'], second:['再訪','Sheung Wan → PMQ/Soho → West Kowloon close'], entry:['垂直入口','海港入口']}
          },
          busan: {
            ko:{visit:'방문 분기', first:['첫 방문','Haeundae → Gwangalli → one night shore'], second:['두 번째','Yeongdo → Nampo/Bosu → Gwangalli close'], entry:['Sea-first opener','Harbor-texture opener']},
            en:{visit:'Visit lens', first:['First trip','Haeundae → Gwangalli → one night shore'], second:['Return trip','Yeongdo → Nampo/Bosu → Gwangalli close'], entry:['Sea-first','Harbor']},
            ja:{visit:'訪問レンズ', first:['初回','Haeundae → Gwangalli → one night shore'], second:['再訪','Yeongdo → Nampo/Bosu → Gwangalli close'], entry:['海から入る','港の質感から入る']},
            zhHant:{visit:'造訪視角', first:['初訪','Haeundae → Gwangalli → one night shore'], second:['再訪','Yeongdo → Nampo/Bosu → Gwangalli close'], entry:['從海開始','從港口質感開始']}
          },
          fukuoka: {
            ko:{visit:'방문 분기', first:['첫 방문','Hakata → Tenjin → yatai close'], second:['두 번째','Yakuin → Ohori edge → compact dinner close'], entry:['Food-first opener','Soft local opener']},
            en:{visit:'Visit lens', first:['First trip','Hakata → Tenjin → yatai close'], second:['Return trip','Yakuin → Ohori edge → compact dinner close'], entry:['Food-first','Soft local']},
            ja:{visit:'訪問レンズ', first:['初回','Hakata → Tenjin → yatai close'], second:['再訪','Yakuin → Ohori edge → compact dinner close'], entry:['食から入る','ローカル寄り入口']},
            zhHant:{visit:'造訪視角', first:['初訪','Hakata → Tenjin → yatai close'], second:['再訪','Yakuin → Ohori edge → compact dinner close'], entry:['先吃再讀','在地入口']}
          }
        };
        const slug = String(city || '').trim().toLowerCase();
        const pack = map[slug];
        if (!pack) return null;
        const lang = window.RyokoApp.lang === 'zhHant' ? 'zhHant' : (window.RyokoApp.lang || 'en');
        return pack[lang] || pack.en || null;
      }
      
      
      function secondaryVisitEntryPack(city=''){
        const map = {
          osaka:{
            ko:{visit:'방문 분기', first:['첫 방문','Namba → Dotonbori'], second:['다시 방문','Nakanoshima → Utsubo'], entry:['Food-first','Softer west']},
            en:{visit:'Visit lens', first:['First trip','Namba → Dotonbori'], second:['Return trip','Nakanoshima → Utsubo'], entry:['Food-first','Softer west']},
            ja:{visit:'訪問レンズ', first:['初回','Namba → Dotonbori'], second:['再訪','Nakanoshima → Utsubo'], entry:['食から入る','西側をやわらかく']},
            zhHant:{visit:'造訪視角', first:['初訪','Namba → Dotonbori'], second:['再訪','Nakanoshima → Utsubo'], entry:['先吃再讀','柔和西側']}
          },
          sapporo:{
            ko:{visit:'방문 분기', first:['첫 방문','Odori → Susukino'], second:['다시 방문','Maruyama → café pocket'], entry:['Central','Soft local']},
            en:{visit:'Visit lens', first:['First trip','Odori → Susukino'], second:['Return trip','Maruyama → café pocket'], entry:['Central','Soft local']},
            ja:{visit:'訪問レンズ', first:['初回','Odori → Susukino'], second:['再訪','Maruyama → café pocket'], entry:['中心から','やわらかい近所']},
            zhHant:{visit:'造訪視角', first:['初訪','Odori → Susukino'], second:['再訪','Maruyama → café pocket'], entry:['中心入口','柔和近所']}
          },
          sendai:{
            ko:{visit:'방문 분기', first:['첫 방문','Station → arcade'], second:['다시 방문','Jozenji-dori → river edge'], entry:['Centre','Calm north']},
            en:{visit:'Visit lens', first:['First trip','Station → arcade'], second:['Return trip','Jozenji-dori → river edge'], entry:['Centre','Calm north']},
            ja:{visit:'訪問レンズ', first:['初回','Station → arcade'], second:['再訪','Jozenji-dori → river edge'], entry:['中心から','静かな北側']},
            zhHant:{visit:'造訪視角', first:['初訪','Station → arcade'], second:['再訪','Jozenji-dori → river edge'], entry:['中心入口','安靜北側']}
          },
          okinawa:{
            ko:{visit:'방문 분기', first:['첫 방문','Coast drive → beach stop'], second:['다시 방문','Yomitan → slower dusk'], entry:['Coast','Slow pocket']},
            en:{visit:'Visit lens', first:['First trip','Coast drive → beach stop'], second:['Return trip','Yomitan → slower dusk'], entry:['Coast','Slow pocket']},
            ja:{visit:'訪問レンズ', first:['初回','Coast drive → beach stop'], second:['再訪','Yomitan → slower dusk'], entry:['海から','遅い pocket']},
            zhHant:{visit:'造訪視角', first:['初訪','Coast drive → beach stop'], second:['再訪','Yomitan → slower dusk'], entry:['海岸入口','慢 pocket']}
          },
          jeju:{
            ko:{visit:'방문 분기', first:['첫 방문','Aewol → coast café'], second:['다시 방문','village pocket → slower west'], entry:['Coast','Reset']},
            en:{visit:'Visit lens', first:['First trip','Aewol → coast café'], second:['Return trip','village pocket → slower west'], entry:['Coast','Reset']},
            ja:{visit:'訪問レンズ', first:['初回','Aewol → coast café'], second:['再訪','village pocket → slower west'], entry:['海岸から','リセット入口']},
            zhHant:{visit:'造訪視角', first:['初訪','Aewol → coast café'], second:['再訪','village pocket → slower west'], entry:['海岸入口','重置入口']}
          },
          gyeongju:{
            ko:{visit:'방문 분기', first:['첫 방문','Daereungwon → museum edge'], second:['다시 방문','Hwangnidan-gil → quiet lane'], entry:['Heritage','Quiet lane']},
            en:{visit:'Visit lens', first:['First trip','Daereungwon → museum edge'], second:['Return trip','Hwangnidan-gil → quiet lane'], entry:['Heritage','Quiet lane']},
            ja:{visit:'訪問レンズ', first:['初回','Daereungwon → museum edge'], second:['再訪','Hwangnidan-gil → quiet lane'], entry:['遺産から','静かな lane']},
            zhHant:{visit:'造訪視角', first:['初訪','Daereungwon → museum edge'], second:['再訪','Hwangnidan-gil → quiet lane'], entry:['遺產入口','安靜巷線']}
          },
          macau:{
            ko:{visit:'방문 분기', first:['첫 방문','Ruins edge → Senado'], second:['다시 방문','Taipa → softer lane'], entry:['Old lane','Taipa']},
            en:{visit:'Visit lens', first:['First trip','Ruins edge → Senado'], second:['Return trip','Taipa → softer lane'], entry:['Old lane','Taipa']},
            ja:{visit:'訪問レンズ', first:['初回','Ruins edge → Senado'], second:['再訪','Taipa → softer lane'], entry:['古い lane','Taipa']},
            zhHant:{visit:'造訪視角', first:['初訪','Ruins edge → Senado'], second:['再訪','Taipa → softer lane'], entry:['老街入口','Taipa']}
          }
        };
        const slug = String(city || '').trim().toLowerCase();
        const pack = map[slug];
        if (!pack) return null;
        const lang = window.RyokoApp.lang === 'zhHant' ? 'zhHant' : (window.RyokoApp.lang || 'en');
        return pack[lang] || pack.en || null;
      }

      function articleHrefForCity(city=''){
        const slug = String(city || '').trim().toLowerCase();
        const secondary = ['osaka','sapporo','sendai','okinawa','jeju','gyeongju','macau'];
        return secondary.includes(slug) ? '../magazine/index.html#expansionCityStories' : '../magazine/index.html#releaseCityStories';
      }
      function articleLabel(){
        const lang = window.RyokoApp.lang === 'zhHant' ? 'zhHant' : (window.RyokoApp.lang || 'en');
        return ({ko:'아티클 깊이', en:'Article depth', ja:'article depth', zhHant:'article depth'})[lang] || 'Article depth';
      }
function visitEntryMarkup(city='', extraClass=''){
        const pack = priorityVisitEntryPack(city) || secondaryVisitEntryPack(city);
        if (!pack) return '';
        return `<div class="trip-entry-inline ${extraClass}"><strong>${pack.visit}</strong><div class="trip-entry-row"><span class="trip-entry-chip">${pack.first[0]} · ${pack.first[1]}</span><span class="trip-entry-chip">${pack.second[0]} · ${pack.second[1]}</span></div><div class="trip-entry-row">${(pack.entry || []).slice(0,2).map(v => `<span class="trip-entry-chip trip-entry-chip-soft">${v}</span>`).join('')}</div></div>`;
      }
      function rhythmMarkup(city='', extraClass=''){
        const signals = rhythmSignalsForCity(city);
        if (!signals.length) return '';
        return `<div class="trip-rhythm-inline ${extraClass}"><strong>${rhythmLabel()}</strong><div class="trip-rhythm-row">${signals.map(v => `<span class="trip-rhythm-chip">${v}</span>`).join('')}</div></div>`;
      }
      function entryText(entry, base){
        return langVariant(entry[`${base}Ko`], entry[`${base}En`], entry[`${base}Ja`], entry[`${base}ZhHant`]);
      }
      function activeTab(name){
        document.querySelectorAll('[data-tab]').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === name));
        Object.entries(sections).forEach(([key, section]) => section.classList.toggle('hidden', key !== name));
      }
      document.querySelectorAll('[data-tab]').forEach(btn => btn.addEventListener('click', () => activeTab(btn.dataset.tab)));

      function textIncludes(item, query){
        const blob = [item.title, item.destination, item.duration, item.companion, item.notes, item.planData?.summary, item.planData?.vibe, item.planData?.bestFor].filter(Boolean).join(' ').toLowerCase();
        return blob.includes(query.toLowerCase());
      }
      function getMetaSummary(item){
        return item.planData?.summary || item.notes || item.planData?.vibe || '';
      }
      function getTimestamp(item){
        return item.savedAt || item.viewedAt || item.sharedViewedAt || item.createdAt || '';
      }
      function shareUrl(item){
        const plannerUrl = new URL(window.RyokoApp.navHref('planner'), location.href);
        plannerUrl.searchParams.set('trip', window.RyokoStorage.encodeShare(item));
        return plannerUrl.toString();
      }
      function formatDate(value){
        if (!value) return '';
        const d = new Date(value);
        if (Number.isNaN(d.getTime())) return '';
        const localeMap = { ko:'ko-KR', en:'en-US', ja:'ja-JP', zhHant:'zh-Hant' };
        const locale = localeMap[window.RyokoApp.lang] || 'en-US';
        return new Intl.DateTimeFormat(locale, { month:'short', day:'numeric' }).format(d);
      }
      function sortItems(items){
        const mode = $('tripSort').value;
        return [...items].sort((a, b) => {
          if (mode === 'city') return String(a.destination || '').localeCompare(String(b.destination || '')) || String(a.title || '').localeCompare(String(b.title || ''));
          if (mode === 'title') return String(a.title || a.destination || '').localeCompare(String(b.title || b.destination || ''));
          return new Date(getTimestamp(b) || 0) - new Date(getTimestamp(a) || 0);
        });
      }
      function filterItems(items, mode){
        const query = $('tripSearch').value.trim();
        let list = query ? items.filter(item => textIncludes(item, query)) : [...items];
        if (activeCollection !== 'all') list = list.filter(item => String(item.destination || '').toLowerCase() === activeCollection);
        if (activeModeFilter !== 'all') list = activeModeFilter === mode ? list : [];
        return sortItems(list);
      }
      function tripModeLabel(mode){
        const copy = langCopy();
        return mode === 'saved' ? copy.tripSaved : mode === 'recent' ? copy.tripRecent : copy.tripShared;
      }
      function card(item, mode){
        const meta = item.planData || {};
        const chips = [item.destination, item.duration, item.companion, meta.vibe].filter(Boolean).slice(0,4)
          .map(value => `<span class="trip-mini-chip">${value}</span>`).join('');
        return `
          <article class="trip-card rich info-card">
            <div class="card-image"><img src="${imgMap[item.destination] || '../assets/images/hero/planner-preview.jpg'}" alt="${item.destination || 'Trip'}"></div>
            <div class="card-body">
              <div class="trip-card-topline">
                <div class="meta">${tripModeLabel(mode)}</div>
                <div class="trip-card-date">${langCopy().lastUpdated} ${formatDate(getTimestamp(item))}</div>
              </div>
              <h3 class="card-title">${item.title || item.destination || 'Trip'}</h3>
              <div class="trip-chip-row">${chips}</div>
              ${rhythmMarkup(item.destination)}
              ${visitEntryMarkup(item.destination)}
              <p class="card-copy clamp-3">${getMetaSummary(item)}</p>
              <div class="trip-card-footer-note">${meta.bestFor || item.notes || ''}</div>
              <div class="card-actions trip-card-actions">
                <a class="soft-btn" href="${shareUrl(item)}">${window.RyokoApp.t('trips.tripOpen')}</a>
                <button class="ghost-btn" data-detail-mode="${mode}" data-detail="${item.id}">${window.RyokoApp.t('common.details') || 'Details'}</button>
                <button class="ghost-btn" data-copy="${item.id}">${window.RyokoApp.t('trips.tripShare')}</button>
                ${mode !== 'saved' ? `<button class="ghost-btn" data-save="${item.id}">${langCopy().saveAsMine}</button>` : `<button class="ghost-btn" data-duplicate="${item.id}">${window.RyokoApp.t('trips.tripDuplicate')}</button>`}
                <button class="ghost-btn" data-delete-mode="${mode}" data-delete="${item.id}">${langCopy().remove}</button>
              </div>
            </div>
          </article>`;
      }
      function renderContinueCard(saved, recent, shared){
        const latest = sortItems([...saved, ...recent, ...shared])[0];
        const copy = langCopy();
        if (!latest) {
          $('continueCard').innerHTML = `
            <div class="trip-continue-copy">
              <div class="eyebrow">Trip vault</div>
              <h2 class="section-title trip-tight-title">${copy.noContinue}</h2>
              <p class="section-desc">${copy.noContinueDesc}</p>
              <div class="hero-actions"><a class="primary-btn" data-nav="planner">${window.RyokoApp.t('trips.openPlanner')}</a></div>
            </div>`;
          return;
        }
        const meta = latest.planData || {};
        $('continueCard').innerHTML = `
          <div class="trip-continue-media"><img src="${imgMap[latest.destination] || '../assets/images/hero/planner-preview.jpg'}" alt="${latest.destination || 'Trip'}"></div>
          <div class="trip-continue-copy">
            <div class="eyebrow">${copy.continueMeta}</div>
            <h2 class="section-title trip-tight-title">${latest.title || latest.destination || 'Trip'}</h2>
            <p class="section-desc">${meta.summary || latest.notes || copy.continueDesc}</p>
            <div class="trip-chip-row">${[latest.destination, latest.duration, latest.companion, meta.vibe].filter(Boolean).map(v => `<span class="trip-mini-chip">${v}</span>`).join('')}</div>
            ${rhythmMarkup(latest.destination, 'trip-rhythm-inline-soft')}
            ${visitEntryMarkup(latest.destination, 'trip-entry-inline-soft')}
            <div class="hero-actions">
              <a class="primary-btn" href="${shareUrl(latest)}">${copy.useAsBase}</a>
              <a class="soft-btn" href="../${(window.RyokoApp.getCityLoopData(latest.destination)||{}).guide || `city/${String(latest.destination||'').toLowerCase()}.html`}">${copy.collectionLayer || 'City guide layer'}</a>
              <a class="ghost-btn" href="${articleHrefForCity(latest.destination)}">${articleLabel()}</a>
              <button class="secondary-btn" data-copy="${latest.id}">${window.RyokoApp.t('trips.tripShare')}</button>
            </div>
          </div>`;
      }
      function renderCollections(saved, recent, shared){
        const copy = langCopy();
        const all = [...saved, ...recent, ...shared];
        const counts = all.reduce((acc, item) => {
          const key = String(item.destination || 'Other').trim();
          if (!key) return acc;
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {});
        const rows = [['all', copy.collectionsAll, all.length], ...Object.entries(counts).sort((a,b) => b[1]-a[1] || a[0].localeCompare(b[0])).slice(0,8).map(([city,count]) => [city.toLowerCase(), city, count])];
        $('collectionChips').innerHTML = rows.map(([value, label, count]) => `
          <button class="trip-collection-chip ${activeCollection === value ? 'active' : ''}" data-collection="${value}">
            <span>${label}</span><strong>${count}</strong>
          </button>`).join('');
        document.querySelectorAll('[data-collection]').forEach(btn => btn.addEventListener('click', () => {
          activeCollection = btn.dataset.collection;
          render();
        }));
      }

      function publicRoutePayload(entry){
        const now = new Date().toISOString();
        return {
          id: `public_${entry.key}_${Date.now()}`,
          destination: entry.city,
          title: entryText(entry, 'title'),
          duration: entry.duration,
          companion: entryText(entry, 'companion'),
          notes: entryText(entry, 'summary'),
          createdAt: now,
          planData: {
            summary: entryText(entry, 'summary'),
            vibe: entryText(entry, 'vibe'),
            bestFor: entryText(entry, 'best')
          }
        };
      }

      function renderPublicRouteDesk(){
        const target = $('publicRouteDesk');
        if (!target) return;
        const copy = langCopy();
        target.innerHTML = publicRouteDesk.map(entry => `
          <article class="public-route-card info-card">
            <div class="public-route-media"><img src="${entry.image}" alt="${entry.city}"></div>
            <div class="public-route-body">
              <div class="trip-card-topline">
                <div class="meta">${copy.publicDeskPick}</div>
                <div class="trip-card-date">${copy[entry.badgeKey] || ''}</div>
              </div>
              <h3 class="card-title">${entryText(entry, 'title')}</h3>
              <p class="card-copy">${entryText(entry, 'summary')}</p>
              <div class="trip-chip-row">
                <span class="trip-mini-chip">${entry.city}</span>
                <span class="trip-mini-chip">${entry.duration}</span>
                <span class="trip-mini-chip">${entryText(entry, 'vibe')}</span>
                <span class="trip-mini-chip">${entryText(entry, 'best')}</span>
              </div>
              <div class="card-actions public-route-actions">
                <a class="soft-btn" href="${entry.example}">${copy.publicDeskOpen}</a>
                <a class="ghost-btn" href="../?destination=${encodeURIComponent(entry.city)}">${copy.publicDeskPlan}</a>
                <button class="primary-btn" data-save-public="${entry.key}">${copy.publicDeskSave}</button>
              </div>
            </div>
          </article>`).join('');
      }

      function routeClubPayload(entry){
        return {
          id: `club_${entry.key}_${Date.now()}`,
          destination: entry.city,
          title: `${langVariant('내 버전', 'My version', '自分版', '我的版本')} — ${entryText(entry, 'title')}`,
          duration: entry.duration,
          companion: langVariant('혼자/친구', 'Solo / Friends', 'ひとり / 友人', '自己 / 朋友'),
          notes: entryText(entry, 'summary'),
          createdAt: new Date().toISOString(),
          planData: {
            summary: entryText(entry, 'summary'),
            vibe: langVariant((entry.chipsKo || []).slice(0,2).join(' · '), (entry.chipsEn || []).slice(0,2).join(' · '), (entry.chipsJa || entry.chipsEn || []).slice(0,2).join(' · '), (entry.chipsZhHant || entry.chipsEn || []).slice(0,2).join(' · ')),
            bestFor: langVariant((entry.chipsKo || []).join(' · '), (entry.chipsEn || []).join(' · '), (entry.chipsJa || entry.chipsEn || []).join(' · '), (entry.chipsZhHant || entry.chipsEn || []).join(' · '))
          }
        };
      }

      function operatingEditPayload(entry){
        return {
          id: `edit_${entry.key}_${Date.now()}`,
          destination: entry.city,
          title: entryText(entry, 'title'),
          duration: entry.duration,
          companion: entryText(entry, 'companion'),
          notes: entryText(entry, 'summary'),
          createdAt: new Date().toISOString(),
          planData: {
            summary: entryText(entry, 'summary'),
            vibe: langVariant((entry.chipsKo || []).slice(0,2).join(' · '), (entry.chipsEn || []).slice(0,2).join(' · '), (entry.chipsJa || entry.chipsEn || []).slice(0,2).join(' · '), (entry.chipsZhHant || entry.chipsEn || []).slice(0,2).join(' · ')),
            bestFor: langVariant((entry.chipsKo || []).join(' · '), (entry.chipsEn || []).join(' · '), (entry.chipsJa || entry.chipsEn || []).join(' · '), (entry.chipsZhHant || entry.chipsEn || []).join(' · '))
          }
        };
      }

      function renderRouteClub(){
        const target = $('routeClubGrid');
        if (!target) return;
        const copy = langCopy();
        target.innerHTML = routeClubDesk.map(entry => `
          <article class="public-route-card info-card route-club-card">
            <div class="public-route-media"><img src="${entry.image}" alt="${entry.city}"></div>
            <div class="public-route-body">
              <div class="trip-card-topline"><div class="meta">${copy.routeClubLabel}</div><div class="trip-card-date">${entry.source} → ${entry.city}</div></div>
              <h3 class="card-title">${entryText(entry, 'title')}</h3>
              <p class="card-copy">${entryText(entry, 'summary')}</p>
              <div class="trip-chip-row">${langVariant(entry.chipsKo, entry.chipsEn, entry.chipsJa || entry.chipsEn, entry.chipsZhHant || entry.chipsEn).map(ch => `<span class="trip-mini-chip">${ch}</span>`).join('')}<span class="trip-mini-chip">${entry.duration}</span></div>
              <div class="card-actions public-route-actions">
                <a class="soft-btn" href="${entry.example}">${copy.routeClubOpen}</a>
                <a class="ghost-btn" href="${entry.guide}">${copy.routeClubGuide}</a>
                <button class="primary-btn" data-save-club="${entry.key}">${copy.routeClubSave}</button>
              </div>
            </div>
          </article>`).join('');
      }

      function renderOperatingEdits(){
        const target = $('operatingEditDesk');
        if (!target) return;
        const copy = langCopy();
        target.innerHTML = operatingEdits.map(entry => `
          <article class="operating-edit-card info-card">
            <div class="operating-edit-media"><img src="${entry.image}" alt="${entry.city}"></div>
            <div class="operating-edit-body">
              <div class="operating-edit-topline">
                <span class="collection-kicker">${entryText(entry, 'label')}</span>
                <span class="trip-card-date">${entry.city} · ${entry.duration}</span>
              </div>
              <h3>${entryText(entry, 'title')}</h3>
              <p>${entryText(entry, 'summary')}</p>
              <div class="trip-chip-row">${langVariant(entry.chipsKo, entry.chipsEn, entry.chipsJa || entry.chipsEn, entry.chipsZhHant || entry.chipsEn).map(chip => `<span class="trip-mini-chip">${chip}</span>`).join('')}</div>
              <div class="operating-edit-actions card-actions">
                <a class="soft-btn" href="${entry.example}">${copy.editOpen}</a>
                <a class="ghost-btn" href="${entry.guide}">${copy.editGuide}</a>
                <button class="primary-btn" data-save-edit="${entry.key}">${copy.editSave}</button>
              </div>
            </div>
          </article>`).join('');
      }

      function renderSavedPlacesArchive(){
        const target = $('savedPlacesCollections');
        if (!target) return;
        const collections = (window.RyokoStorage.getSavedPlaceCollections?.() || []).sort((a, b) => b.places.length - a.places.length || String(a.city || '').localeCompare(String(b.city || '')));
        if (!collections.length) {
          target.innerHTML = `<div class="trip-archive-empty"><strong>${langVariant('아직 저장한 장소가 없어요','No saved places yet','まだ保存した場所がありません','還沒有已保存地點')}</strong><span>${langVariant('플래너 결과에서 하트를 누르면 장소 아카이브가 쌓이기 시작합니다.','Tap hearts inside planner results and your place archive will start to build itself.','プランナー結果でハートを押すと、場所アーカイブが少しずつ育っていきます。','在 Planner 結果裡點愛心後，你的地點收藏檔案就會開始累積。')}</span></div>`;
          return;
        }
        target.innerHTML = collections.slice(0, 6).map(entry => `
          <article class="trip-archive-line">
            <div class="trip-archive-topline">
              <strong>${entry.city}</strong>
              <span>${entry.places.length} ${langVariant('저장됨','saved','件保存','已保存')}</span>
            </div>
            <div class="trip-chip-row">${entry.places.slice(0,5).map(place => `<span class="trip-mini-chip">${place}</span>`).join('')}</div>
            <a class="soft-btn" href="../?destination=${encodeURIComponent(entry.city)}">${langVariant(`${entry.city}부터 짜기`,`Plan from ${entry.city}`,`${entry.city}から組む`,`從 ${entry.city} 開始規劃`)}</a>
          </article>`).join('');
      }
      function renderSavedRouteArchive(saved, recent, shared){
        const target = $('savedRouteCollections');
        if (!target) return;
        const groups = [...saved, ...recent, ...shared].reduce((acc, item) => {
          const city = String(item.destination || 'Other').trim() || 'Other';
          (acc[city] ||= []).push(item);
          return acc;
        }, {});
        const rows = Object.entries(groups).sort((a,b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
        if (!rows.length) {
          target.innerHTML = `<div class="trip-archive-empty"><strong>${langVariant('아직 루트 아카이브가 없어요','No route archive yet','まだルートアーカイブがありません','還沒有路線檔案')}</strong><span>${langVariant('여정을 저장하거나 다시 열면 도시 컬렉션이 여기에 자동으로 쌓입니다.','Save or reopen a trip and city collections will appear here automatically.','旅程を保存したり開き直したりすると、都市コレクションがここに自動で集まります。','保存或重新打開旅程後，城市收藏會自動出現在這裡。')}</span></div>`;
          return;
        }
        target.innerHTML = rows.slice(0, 6).map(([city, items]) => {
          const latest = sortItems(items)[0];
          const label = latest?.planData?.vibe || latest?.duration || langVariant('루트 베이스','Route base','ルートベース','路線基底');
          return `
            <article class="trip-archive-line">
              <div class="trip-archive-topline">
                <strong>${city}</strong>
                <span>${items.length} ${langVariant('개 루트', items.length > 1 ? 'routes' : 'route', '件のルート', '條路線')}</span>
              </div>
              <p class="trip-archive-copy">${getMetaSummary(latest) || langVariant('이 도시에 다시 쓸 수 있는 루트 베이스입니다.','A reusable route base for this city.','この都市で何度も使えるルートベースです。','這是一條可重複使用於這座城市的路線基底。')}</p>
              <div class="trip-chip-row">${items.slice(0,4).map(item => `<span class="trip-mini-chip">${item.title || label}</span>`).join('')}</div>
              <div class="card-actions"><a class="soft-btn" href="${shareUrl(latest)}">${langVariant('최근 루트 열기','Open latest','最新ルートを開く','打開最新路線')}</a><a class="ghost-btn" href="../city/${city.toLowerCase()}.html">${langVariant('도시 읽기','City guide','都市を読む','閱讀城市')}</a></div>
            </article>`;
        }).join('');
      }

      function collectionNote(items){
        const savedCount = items.filter(item => item.savedAt).length;
        const sharedCount = items.filter(item => item.sharedViewedAt).length;
        const recentCount = items.filter(item => item.viewedAt && !item.savedAt).length;
        const copy = langCopy();
        if (sharedCount >= savedCount && sharedCount >= recentCount && sharedCount > 0) return copy.collectionSharedHeavy;
        if (recentCount > savedCount && recentCount > 0) return copy.collectionRecentHeavy;
        if (savedCount === items.length) return copy.collectionSavedOnly;
        return copy.collectionMixed;
      }
      function renderCityCollections(saved, recent, shared){
        const target = $('cityCollectionsGrid');
        if (!target) return;
        const all = [...saved, ...recent, ...shared];
        const placeCollections = (window.RyokoStorage.getSavedPlaceCollections?.() || []).reduce((acc, entry) => {
          acc[String(entry.city || '').trim().toLowerCase()] = entry.places || [];
          return acc;
        }, {});
        const groups = all.reduce((acc, item) => {
          const city = String(item.destination || '').trim();
          if (!city) return acc;
          (acc[city] ||= []).push(item);
          return acc;
        }, {});
        const rows = Object.entries(groups).sort((a,b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
        if (!rows.length) {
          target.innerHTML = `<article class="city-collection-card info-card city-collection-empty"><h3>${langCopy().cityCollectionsEmptyTitle}</h3><p>${langCopy().cityCollectionsEmptyDesc}</p></article>`;
          return;
        }
        target.innerHTML = rows.map(([city, items]) => {
          const latest = sortItems(items)[0];
          const cityKey = city.toLowerCase();
          const loop = window.RyokoApp.getCityLoopData(city) || {};
          const places = placeCollections[cityKey] || [];
          const chips = [latest?.duration, latest?.companion, latest?.planData?.vibe, latest?.planData?.bestFor].filter(Boolean).slice(0,3);
          return `
            <article class="city-collection-card info-card">
              <div class="city-collection-cover"><img src="${imgMap[city] || '../assets/images/hero/planner-preview.jpg'}" alt="${city}"></div>
              <div class="city-collection-body">
                <div class="trip-card-topline"><div class="meta">${city}</div><div class="trip-card-date">${items.length} ${langCopy().collectionRoutes}</div></div>
                <h3 class="card-title">${latest?.title || city}</h3>
                <p class="card-copy">${collectionNote(items)}</p>
                <div class="trip-chip-row">
                  ${chips.map(v => `<span class="trip-mini-chip">${v}</span>`).join('')}
                  ${places.length ? `<span class="trip-mini-chip">${places.length} ${langCopy().collectionPlaces}</span>` : ''}
                </div>
                ${rhythmMarkup(city, 'trip-rhythm-inline-soft')}
                ${visitEntryMarkup(city, 'trip-entry-inline-soft')}
                <div class="city-collection-stack">
                  <div class="city-collection-snippet"><strong>${latest?.title || city}</strong><span>${getMetaSummary(latest) || ''}</span></div>
                  ${places.length ? `<div class="city-collection-places">${places.slice(0,4).map(place => `<span class="trip-mini-chip">${place}</span>`).join('')}</div>` : ''}
                </div>
                <div class="city-collection-continue"><strong>${langCopy().continueReading || 'Continue reading'}</strong><span>${cityLoopBranchNote(city) || collectionNote(items)}</span></div>
                <div class="card-actions city-collection-actions">
                  <a class="primary-btn" href="${shareUrl(latest)}">${langCopy().collectionOpen}</a>
                  <a class="soft-btn" href="../${loop.guide || `city/${cityKey}.html`}">${langCopy().collectionGuide}</a>
                  <a class="ghost-btn" href="../${loop.example || `city/${cityKey}.html`}">${langCopy().collectionExample}</a>
                </div>
              </div>
            </article>`;
        }).join('');
      }

      function renderModeFilters(){
        const copy = langCopy();
        const rows = [
          ['all', copy.filterAll],
          ['saved', copy.filterSaved],
          ['recent', copy.filterRecent],
          ['shared', copy.filterShared]
        ];
        $('tripFilterChips').innerHTML = rows.map(([value, label]) => `<button class="trip-filter-chip ${activeModeFilter === value ? 'active' : ''}" data-mode-filter="${value}">${label}</button>`).join('');
        document.querySelectorAll('[data-mode-filter]').forEach(btn => btn.addEventListener('click', () => {
          activeModeFilter = btn.dataset.modeFilter;
          const tabTarget = activeModeFilter === 'all' ? 'saved' : activeModeFilter;
          activeTab(tabTarget);
          render();
        }));
        const sort = $('tripSort');
        sort.options[0].textContent = copy.sortRecent;
        sort.options[1].textContent = copy.sortCity;
        sort.options[2].textContent = copy.sortTitle;
      }
      function parseSharedInput(value){
        try {
          const raw = String(value || '').trim();
          if (!raw) return null;
          const url = new URL(raw, location.href);
          const code = url.searchParams.get('trip') || raw;
          return window.RyokoStorage.decodeShare(decodeURIComponent(code));
        } catch {
          return window.RyokoStorage.decodeShare(String(value || '').trim());
        }
      }
      async function copyText(text){
        try {
          await navigator.clipboard.writeText(text);
          return true;
        } catch {
          const input = document.createElement('textarea');
          input.value = text;
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          input.remove();
          return true;
        }
      }
      function detailMeta(item){
        const data = item.planData || {};
        return {
          days: Array.isArray(data.days) ? data.days.length : 0,
          tips: Array.isArray(data.localTips) ? data.localTips.length : 0,
          checklist: Array.isArray(data.checklist) ? data.checklist.length : 0
        };
      }

      function renderSharedSpotlight(shared){
        const node = $('sharedSpotlight');
        const section = $('sharedSpotlightSection');
        if (!node || !section) return;
        const item = shared[0];
        if (!item) {
          section.classList.add('hidden');
          return;
        }
        section.classList.remove('hidden');
        const city = window.RyokoApp.getCityLoopData(item.destination) || { name:item.destination || 'Trip', guide:'city/tokyo.html', example:'example/tokyo-3n4d-first-trip.html' };
        const meta = detailMeta(item);
        node.innerHTML = `
          <div class="shared-spotlight-media"><img src="${imgMap[item.destination] || '../assets/images/hero/planner-preview.jpg'}" alt="${item.destination || 'Trip'}"></div>
          <div class="shared-spotlight-copy">
            <div class="trip-card-topline">
              <div class="meta">${langCopy().tripShared}</div>
              <div class="trip-card-date">${langCopy().lastUpdated} ${formatDate(getTimestamp(item))}</div>
            </div>
            <h3 class="section-title trip-tight-title">${item.title || item.destination || 'Trip'}</h3>
            <p class="section-desc">${getMetaSummary(item) || 'A shared itinerary that can be saved, reopened, or turned into your own version.'}</p>
            <div class="trip-chip-row">
              ${[item.destination, item.duration, item.companion, item.planData?.vibe].filter(Boolean).map(v => `<span class="trip-mini-chip">${v}</span>`).join('')}
              <span class="trip-mini-chip">${meta.days} days</span>
              <span class="trip-mini-chip">${meta.tips} tips</span>
            </div>
            ${rhythmMarkup(item.destination, 'trip-rhythm-inline-soft')}
            ${visitEntryMarkup(item.destination, 'trip-entry-inline-soft')}
            <div class="shared-spotlight-note">
              <strong>${langVariant('왜 남기나요?','Why keep it?','なぜ残す？','為什麼留住？')}</strong>
              <span>${item.importedFromLink ? langVariant('공유 링크에서 가져온 루트라 다시 열어보고 비교하기 좋습니다.','Imported from a shared link, so it is easier to revisit and compare later.','共有リンクから取り込んだので、あとで見返して比べやすくなります。','從分享連結匯入，之後更容易回看與比較。') : langVariant('저장해 두면 비교하고 갈라 읽기 쉬운 루트가 됩니다.','Saved here, it becomes easier to compare and branch into your own version.','ここに残しておくと、比べたり自分の分岐にしやすくなります。','先存進這裡，就更容易比較並延伸成自己的版本。')}</span>
            </div>
            <div class="card-actions">
              <a class="primary-btn" href="${shareUrl(item)}">Open shared trip</a>
              <button class="secondary-btn" data-detail-mode="shared" data-detail="${item.id}">${window.RyokoApp.t('common.details') || 'Details'}</button>
              <button class="soft-btn" data-save="${item.id}">${langCopy().saveAsMine}</button>
              <button class="ghost-btn" data-my-version="${item.id}">${langCopy().makeMyVersion}</button>
              <a class="soft-btn" href="../${city.guide}">Read ${city.name}</a>
            </div>
          </div>`;
      }
      function openDetailModal(item, mode){
        const modal = $('tripDetailModal');
        const content = $('tripDetailContent');
        if (!modal || !content || !item) return;
        const data = item.planData || {};
        const city = window.RyokoApp.getCityLoopData(item.destination) || { name:item.destination || 'Trip', guide:'city/tokyo.html', example:'example/tokyo-3n4d-first-trip.html' };
        const related = window.RyokoApp.getRelatedCities(item.destination).slice(0,3);
        const days = Array.isArray(data.days) ? data.days : [];
        const dayPreview = days.slice(0,3).map(day => `<article class="trip-detail-day"><strong>${day.title || ('Day ' + day.day)}</strong><p>${(day.intro || '').slice(0,120)}</p></article>`).join('');
        const tips = (Array.isArray(data.localTips) ? data.localTips : []).slice(0,3).map(t => `<li>${t}</li>`).join('');
        const summary = getMetaSummary(item) || 'A saved city route you can reopen, compare, or branch into a new edit.';
        content.innerHTML = `
          <div class="trip-detail-hero">
            <div class="trip-detail-media"><img src="${imgMap[item.destination] || '../assets/images/hero/planner-preview.jpg'}" alt="${item.destination || 'Trip'}"></div>
            <div class="trip-detail-copy">
              <div class="meta">${tripModeLabel(mode)}</div>
              <h2>${item.title || item.destination || 'Trip'}</h2>
              <p>${summary}</p>
              <div class="trip-chip-row">
                ${[item.destination, item.duration, item.companion, data.vibe, data.pace, data.bestFor].filter(Boolean).slice(0,6).map(v => `<span class="trip-mini-chip">${v}</span>`).join('')}
              </div>
              <div class="card-actions">
                <a class="primary-btn" href="${shareUrl(item)}">Open trip</a>
                ${mode !== 'saved' ? `<button class="secondary-btn" data-save="${item.id}">${langCopy().saveAsMine}</button><button class="ghost-btn" data-my-version="${item.id}">${langCopy().makeMyVersion}</button>` : `<button class="secondary-btn" data-duplicate="${item.id}">${window.RyokoApp.t('trips.tripDuplicate')}</button>`}
                <a class="soft-btn" href="../${city.guide}">Read ${city.name}</a>
              </div>
            </div>
          </div>
          <div class="trip-detail-grid">
            <article class="info-card trip-detail-panel">
              <h3>${langVariant('Trip snapshot','Trip snapshot','旅のスナップショット','旅程快照')}</h3>
              <div class="trip-detail-stats">
                <div><span>Days</span><strong>${days.length || '—'}</strong></div>
                <div><span>Tips</span><strong>${(data.localTips || []).length || '—'}</strong></div>
                <div><span>Checklist</span><strong>${(data.checklist || []).length || '—'}</strong></div>
                <div><span>Updated</span><strong>${formatDate(getTimestamp(item)) || '—'}</strong></div>
              </div>
              <p class="card-copy">${item.importedFromLink ? 'This one was imported from a shared Ryokoplan link and can now live inside your own trip vault.' : 'This route already lives inside your vault, so it is easy to reopen, compare, or branch from here.'}</p>
            </article>
            <article class="info-card trip-detail-panel">
              <h3>${rhythmLabel()} preview</h3>
              <div class="trip-detail-day-list">${dayPreview || '<p class="card-copy">No day preview available yet.</p>'}</div>
            </article>
            <article class="info-card trip-detail-panel">
              <h3>${langVariant('Local tips preview','Local tips preview','ローカルヒント','在地提示')}</h3>
              ${tips ? `<ul class="trip-detail-list">${tips}</ul>` : '<p class="card-copy">No extra local tips stored on this trip yet.</p>'}
            </article>
            <article class="info-card trip-detail-panel">
              <h3>${langVariant('다음 가지','Continue with','次の分岐','下一個分支')}</h3>
              <div class="trip-detail-branch-list">
                <a class="trip-detail-branch" href="../${city.example}">
                  <strong>${city.name} sample route</strong>
                  <span>${langVariant('이 저장본을 더 선명한 도시 베이스와 나란히 놓고 비교해 보세요.','Use the sample route to compare this saved edit against a clearer city baseline.','この保存ルートを、もっと輪郭のはっきりした都市ベースと並べて比べてみてください。','把這份儲存路線和更清楚的城市基準放在一起比較看看。')}</span>
                </a>
                ${related.map(rel => `<a class="trip-detail-branch" href="../${rel.guide}"><strong>${rel.name}</strong><span>${rel.vibe} is a strong next read after ${city.name}.</span></a>`).join('')}
              </div>
            </article>
          </div>`;
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
      }
      function closeDetailModal(){
        const modal = $('tripDetailModal');
        if (!modal) return;
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
      }

      function bindActions(saved, recent, shared){
        document.querySelectorAll('[data-delete]').forEach(btn => btn.addEventListener('click', () => {
          const id = btn.dataset.delete;
          const mode = btn.dataset.deleteMode;
          if (mode === 'saved') window.RyokoStorage.deleteSavedTrip(id);
          if (mode === 'recent') window.RyokoStorage.deleteRecentTrip(id);
          if (mode === 'shared') window.RyokoStorage.deleteSharedTrip(id);
          render();
        }));
        document.querySelectorAll('[data-save]').forEach(btn => btn.addEventListener('click', () => {
          const item = [...recent, ...shared].find(x => x.id === btn.dataset.save);
          if (item) {
            window.RyokoStorage.saveTrip(item);
            render();
          }
        }));
        document.querySelectorAll('[data-duplicate]').forEach(btn => btn.addEventListener('click', () => {
          window.RyokoStorage.duplicateTrip(btn.dataset.duplicate);
          render();
        }));
        document.querySelectorAll('[data-my-version]').forEach(btn => btn.addEventListener('click', () => {
          const pool = [...saved, ...recent, ...shared];
          const item = pool.find(x => x.id === btn.dataset.myVersion);
          if (item) {
            window.RyokoStorage.makeMyVersion?.(item);
            render();
          }
        }));
        document.querySelectorAll('[data-detail]').forEach(btn => btn.addEventListener('click', () => {
          const pool = [...saved, ...recent, ...shared];
          const item = pool.find(x => x.id === btn.dataset.detail);
          openDetailModal(item, btn.dataset.detailMode || 'saved');
        }));
        document.querySelectorAll('[data-copy]').forEach(btn => btn.addEventListener('click', async () => {
          const item = [...saved, ...recent, ...shared].find(x => x.id === btn.dataset.copy);
          if (!item) return;
          await copyText(shareUrl(item));
          const msg = $('sharedImportMessage');
          msg.textContent = langCopy().linkCopied;
        }));
        document.querySelectorAll('[data-save-public]').forEach(btn => btn.addEventListener('click', () => {
          const entry = publicRouteDesk.find(x => x.key === btn.dataset.savePublic);
          if (!entry) return;
          window.RyokoStorage.saveTrip(publicRoutePayload(entry));
          const msg = $('sharedImportMessage');
          msg.textContent = langCopy().publicDeskSaved;
          activeTab('saved');
          render();
        }));
        document.querySelectorAll('[data-save-edit]').forEach(btn => btn.addEventListener('click', () => {
          const entry = operatingEdits.find(x => x.key === btn.dataset.saveEdit);
          if (!entry) return;
          window.RyokoStorage.saveTrip(operatingEditPayload(entry));
          const msg = $('sharedImportMessage');
          msg.textContent = langCopy().editSaved;
          activeTab('saved');
          render();
        }));
        document.querySelectorAll('[data-save-club]').forEach(btn => btn.addEventListener('click', () => {
          const entry = routeClubDesk.find(x => x.key === btn.dataset.saveClub);
          if (!entry) return;
          window.RyokoStorage.saveTrip(routeClubPayload(entry));
          const msg = $('sharedImportMessage');
          msg.textContent = langCopy().routeClubSaved;
          activeTab('saved');
          render();
        }));
        document.querySelectorAll('[data-close-detail]').forEach(btn => btn.onclick = closeDetailModal);
        $('sharedImportBtn').onclick = () => {
          const payload = parseSharedInput($('sharedImportInput').value);
          const msg = $('sharedImportMessage');
          if (!payload) {
            msg.textContent = langCopy().importFail;
            msg.classList.add('is-error');
            return;
          }
          msg.classList.remove('is-error');
          window.RyokoStorage.addSharedTrip({ ...payload, importedFromLink: true });
          $('sharedImportInput').value = '';
          msg.textContent = langCopy().imported;
          activeTab('shared');
          render();
        };
      }
      function renderTripLoop(saved, recent, shared){
        const main = $('tripLoopMain');
        const side = $('tripLoopSide');
        if (!main || !side) return;
        const anchor = saved[0] || recent[0] || shared[0] || null;
        if (!anchor) {
          main.innerHTML = `
            <span class="eyebrow">${langCopy().loopEmptyEyebrow || "No saved loop yet"}</span>
            <h3>${langCopy().loopEmptyTitle || "Save one trip, then the city-first loop gets smarter"}</h3>
            <p>${langCopy().loopEmptyDesc || "Once a trip is saved or reopened, My Trips can point you to the next guide, sample route, or related city branch that fits the tone you already liked."}</p>
            <div class="card-actions"><a class="primary-btn" href="../">${langCopy().loopOpenPlanner || "Open Planner"}</a><a class="secondary-btn" href="../magazine/index.html">${langCopy().loopReadMagazine || "Read Magazine"}</a></div>`;
          side.innerHTML = `
            <h3>${langCopy().loopGoodStart || "Good starting points"}</h3>
            <div class="trip-loop-list">
              <article><h4>${langCopy().loopTokyoGuide || "Tokyo guide"}</h4><p>${langCopy().loopTokyoGuideDesc || "A strong first-entry city when you want density, nightlife, and clean next branches."}</p></article>
              <article><h4>${lang === 'ko' ? '부산 샘플' : lang === 'ja' ? '釜山サンプル' : lang === 'zhHant' ? '釜山範例' : 'Busan sample'}</h4><p>${lang === 'ko' ? '풍경 페이스와 세대 혼합 여행에 잘 맞습니다.' : lang === 'ja' ? '景色のテンポと幅広い年齢の旅に向いています。' : lang === 'zhHant' ? '很適合重視風景節奏與不同年齡同行的旅程。' : 'A softer scenic sample for mixed-age travel, easier coast timing, and gentler night closes.'}</p></article>
            </div>`;
          return;
        }
        const current = window.RyokoApp.getCityLoopData(anchor.destination) || { name: anchor.destination || 'Trip', guide:'city/tokyo.html', example:'example/tokyo-3n4d-first-trip.html' };
        const related = window.RyokoApp.getRelatedCities(anchor.destination).slice(0,3);
        main.innerHTML = `
          <span class="eyebrow">${langCopy().loopVaultEyebrow || "From your vault"}</span>
          <h3>${current.name} ${langCopy().loopVaultTitle || "can open the next step too"}</h3>
          <p>${(anchor.planData?.summary || anchor.notes || 'Use your saved trip as a base, deepen the strongest city axis inside it first, then branch only once the next city feels editorially related.').slice(0, 180)}</p>
          <div class="trip-loop-destinations">
            <span class="trip-loop-chip">${current.name}</span>
            ${related.map(city => `<span class="trip-loop-chip">${city.name}</span>`).join('')}
          </div>
          <div class="card-actions">
            <a class="primary-btn" href="../${current.guide}">Read ${current.name} deeper</a>
            <a class="secondary-btn" href="../${current.example}">Compare sample</a>
            <a class="soft-btn" href="../?destination=${encodeURIComponent(current.name)}">Plan again</a>
          </div>`;
        side.innerHTML = `
          <h3>${langVariant('관련 가지','Read next','関連する分岐','相關分支')}</h3>
          ${visitEntryMarkup(anchor.destination)}
          <div class="trip-loop-list">
            ${related.map(city => `
              <article>
                <h4>${city.name}</h4>
                <p>${langVariant(`${current.name} 다음 가지를 고를 때 톤이 끊기지 않게 이어 주는 도시입니다.`, `${city.vibe} is a clean next read after ${current.name} when you want the next branch to feel connected, not random.`, `${current.name} の次で、トーンを切らさずにつなぎやすい都市です。`, `${current.name} 之後若想讓節奏延續而不跳脫，這會是更乾淨的下一個分支。`)}</p>
                <div class="card-actions" style="margin-top:10px">
                  <a class="soft-btn" href="../${city.guide}">Guide</a>
                  <a class="ghost-btn" href="../${city.example}">Sample</a>
                </div>
              </article>`).join('')}
          </div>`;
      }
      function render(){
        const copy = langCopy();
        const currentSort = $('tripSort').value || 'recent';
        $('tripSearch').setAttribute('placeholder', copy.searchPH);
        $('tripSort').innerHTML = `
          <option value="recent">${copy.sortRecent}</option>
          <option value="city">${copy.sortCity}</option>
          <option value="title">${copy.sortTitle}</option>`;
        $('tripSort').value = currentSort;
        const saved = window.RyokoStorage.getSavedTrips();
        const recent = window.RyokoStorage.getRecentTrips();
        const shared = window.RyokoStorage.getSharedTrips();
        const fsaved = filterItems(saved, 'saved');
        const frecent = filterItems(recent, 'recent');
        const fshared = filterItems(shared, 'shared');

        $('savedCount').textContent = saved.length;
        $('recentCount').textContent = recent.length;
        $('sharedCount').textContent = shared.length;

        $('savedGrid').innerHTML = fsaved.map(x => card(x, 'saved')).join('');
        $('recentGrid').innerHTML = frecent.map(x => card(x, 'recent')).join('');
        $('sharedGrid').innerHTML = fshared.map(x => card(x, 'shared')).join('');

        $('savedEmpty').classList.toggle('hidden', fsaved.length > 0);
        $('recentEmpty').classList.toggle('hidden', frecent.length > 0);
        $('sharedEmpty').classList.toggle('hidden', fshared.length > 0);

        renderContinueCard(saved, recent, shared);
        renderCollections(saved, recent, shared);
        renderSavedPlacesArchive();
        renderSavedRouteArchive(saved, recent, shared);
        renderPublicRouteDesk();
        renderRouteClub();
        renderOperatingEdits();
        renderSharedSpotlight(shared);
        renderTripLoop(saved, recent, shared);
        renderCityCollections(saved, recent, shared);
        renderModeFilters();
        bindActions(saved, recent, shared);
      }

      $('tripSearch').addEventListener('input', render);
      $('tripSort').addEventListener('change', render);
      $('clearSearchBtn').addEventListener('click', () => {
        $('tripSearch').value = '';
        activeCollection = 'all';
        activeModeFilter = 'all';
        render();
      });

      render();
      activeTab('saved');
      window.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeDetailModal();
      });
      window.addEventListener('ryoko:langchange', render);
    });
  