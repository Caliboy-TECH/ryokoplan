module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { destination, duration, companion, style, travelerTraits = [], localMode = false, notes = '', lang = 'en', language } = req.body || {};
  const pickedLang = language || lang || 'en';
  if (!destination) return res.status(400).json({ error: 'destination is required' });

  const languageNames = { ko: 'Korean', en: 'English' };
  const uiLanguage = languageNames[pickedLang] || 'English';
  const traitLine = travelerTraits.length ? travelerTraits.join(', ') : 'None';

  function defaultPlan(overrides = {}) {
    const isKo = pickedLang === 'ko';
    return {
      title: `${destination} · ${duration || (isKo ? '3박 4일' : '3N4D')} · ${companion || (isKo ? '혼자' : 'Solo')}`,
      summary: isKo
        ? '이 일정은 이동 부담을 줄이면서도 도시의 대표 분위기와 실제 체감이 좋은 동네를 함께 묶는 방향으로 구성했어요.'
        : 'This plan groups key areas with stronger real-world flow, so the trip feels complete without unnecessary transit fatigue.',
      vibe: isKo ? '도시 감도와 대표 스팟의 균형' : 'A balanced mix of iconic and local city texture',
      pace: isKo ? '무리하지 않되 지루하지 않은 템포' : 'Comfortable, steady, and easy to follow',
      bestFor: isKo ? '첫 방문이지만 너무 뻔한 일정은 싫은 여행자' : 'Travelers who want a smoother first trip without making it too generic',
      days: [
        {
          day: 1,
          title: isKo ? '도착 후 무리 없이 시작하는 첫날' : 'A soft first day after arrival',
          intro: isKo ? '체크인 이후에도 부담 없이 움직일 수 있게 대표 지역과 쉬는 지점을 섞었어요.' : 'This first stretch stays light, so you can settle in without burning energy too early.',
          places: [
            { name: isKo ? '체크인 주변 산책' : 'A short walk near check-in', reason: isKo ? '장거리 이동 뒤에도 부담이 적고 동네 감을 바로 잡기 좋아요.' : 'It helps you get oriented without locking you into a heavy plan.' },
            { name: isKo ? '대표 거리 한 곳' : 'One signature district', reason: isKo ? '도시에 왔다는 느낌을 빠르게 주는 첫 인상이 됩니다.' : 'It gives the trip an immediate sense of place.' },
            { name: isKo ? '가벼운 저녁 식사' : 'An easy dinner stop', reason: isKo ? '늦게까지 무리하지 않으면서 하루를 정리하기 좋습니다.' : 'A simple finish works better than over-planning the arrival night.' }
          ],
          localTip: isKo ? '첫날은 줄 서는 인기 맛집보다 동선이 좋은 곳을 우선하는 편이 만족도가 높아요.' : 'On day one, choosing convenience over hype usually makes the evening feel better.'
        },
        {
          day: 2,
          title: isKo ? '대표 지역을 자연스럽게 묶은 핵심 일정' : 'A core day built around the main areas',
          intro: isKo ? '이동이 꼬이지 않도록 한 축 안에서 분위기가 달라지는 장소들을 엮었습니다.' : 'This day stays compact while still giving you a visible change in atmosphere.',
          places: [
            { name: isKo ? '대표 명소 구역' : 'A major landmark area', reason: isKo ? '처음 방문이라면 한 번은 확실히 볼 가치가 있어요.' : 'It anchors the trip with something clearly worth seeing.' },
            { name: isKo ? '카페 또는 휴식 포인트' : 'A café or reset stop', reason: isKo ? '중간에 템포를 한 번 낮춰야 다음 일정이 더 좋아집니다.' : 'A real break keeps the rest of the day from feeling flat.' },
            { name: isKo ? '산책하기 좋은 거리' : 'A walkable street or neighborhood', reason: isKo ? '도시의 생활감이 더 잘 느껴지는 구간입니다.' : 'This is where the city tends to feel more lived-in.' },
            { name: isKo ? '저녁 분위기가 좋은 구역' : 'An evening-friendly area', reason: isKo ? '낮과 다른 분위기로 하루 마무리 완성도가 높아져요.' : 'It gives the day a stronger ending than going straight back.' }
          ],
          localTip: isKo ? '인기 구역은 오전이나 해 질 무렵에 체감이 훨씬 좋을 때가 많아요.' : 'Busy districts often feel far better earlier or near sunset than at peak mid-afternoon.'
        }
      ],
      localTips: isKo
        ? ['이동 시간보다 역 내부 이동과 대기 시간이 체감상 더 크게 느껴질 수 있어요.', '현지 인기 가게는 휴무일과 브레이크 타임을 꼭 같이 확인하는 편이 좋아요.', '한 번에 지역을 많이 넣기보다 분위기가 맞는 동네를 길게 보는 쪽이 만족도가 높습니다.']
        : ['Station-to-street movement can take longer than it looks on a map.', 'Check break times and closed days for popular local spots, not just opening hours.', 'Trips usually feel better when you stay longer in the right neighborhood instead of crossing the city too often.'],
      budgetSummary: isKo
        ? '숙소와 식사 선택에 따라 차이는 있지만, 이동과 식사를 무리 없이 즐기는 기준으로 잡은 예산입니다.'
        : 'This estimate is built around a comfortable version of the trip, with enough room for transit, food, and a few better moments.',
      budgetBreakdown: { flight: '$200–450', hotel: '$260–620', food: '$90–180', transit: '$25–60', admission: '$20–55' },
      checklist: isKo
        ? ['편한 신발 준비', '교통카드 또는 교통 앱 확인', '인기 식당/전망대 예약 여부 확인', '우천 시 대체 장소 하나 확보', '체크아웃/공항 이동 시간 다시 확인']
        : ['Pack comfortable shoes', 'Set up your transit card or payment app', 'Check whether any dinner or viewpoint needs a reservation', 'Keep one rain-friendly indoor backup', 'Reconfirm checkout and airport transfer timing']
    };
  }

  function valuesDeep(v) {
    if (v == null) return [];
    if (Array.isArray(v)) return v.flatMap(valuesDeep);
    if (typeof v === 'object') return Object.values(v).flatMap(valuesDeep);
    return [String(v).trim()];
  }

  function toText(v, fallback = '') {
    const vals = valuesDeep(v).filter(Boolean);
    return vals.length ? vals.join(' ') : fallback;
  }

  function toList(v) {
    if (Array.isArray(v)) return v.flatMap(item => typeof item === 'string' ? [item.trim()] : valuesDeep(item)).filter(Boolean);
    if (typeof v === 'string') return v.split(/\n|•|·|\u2022/).map(s => s.trim()).filter(Boolean);
    if (v && typeof v === 'object') return valuesDeep(v).filter(Boolean);
    return [];
  }

  function normalizePlaces(v) {
    const arr = Array.isArray(v) ? v : (v && typeof v === 'object' ? Object.values(v) : []);
    return arr.map((item, idx) => {
      if (typeof item === 'string') return { name: item, reason: '' };
      return {
        name: toText(item?.name || item?.place || item?.title || item?.spot || item, `Stop ${idx + 1}`),
        reason: toText(item?.reason || item?.why || item?.note || item?.description || '', '')
      };
    }).filter(p => p.name).slice(0, 5);
  }

  function normalizeDays(v) {
    const arr = Array.isArray(v) ? v : (v && typeof v === 'object' ? Object.values(v) : []);
    const mapped = arr.map((item, idx) => {
      if (typeof item === 'string') {
        return { day: idx + 1, title: item, intro: '', places: [], localTip: '' };
      }
      return {
        day: Number(item?.day) || idx + 1,
        title: toText(item?.title || item?.theme || item?.name || item, `Day ${idx + 1}`),
        intro: toText(item?.intro || item?.summary || item?.overview || '', ''),
        places: normalizePlaces(item?.places || item?.stops || item?.activities || item?.items),
        localTip: toText(item?.localTip || item?.tip || '', '')
      };
    }).filter(d => d.title || d.places.length);
    return mapped.length ? mapped : defaultPlan().days;
  }

  function normalizeBudget(v) {
    if (Array.isArray(v)) {
      const out = {};
      v.forEach(item => {
        const key = String(item?.category || item?.name || '').toLowerCase();
        const val = item?.amount || item?.value || '';
        if (key) out[key] = String(val);
      });
      if (Object.keys(out).length) return out;
    }
    if (v && typeof v === 'object') {
      const out = {};
      const aliases = {
        flight: ['flight', 'airfare', 'plane'],
        hotel: ['hotel', 'stay', 'accommodation', 'lodging'],
        food: ['food', 'meal', 'meals', 'dining'],
        transit: ['transit', 'transport', 'transportation'],
        admission: ['admission', 'tickets', 'entry', 'activities']
      };
      const flat = {};
      for (const [k, val] of Object.entries(v)) flat[String(k).toLowerCase()] = String(val);
      for (const [target, keys] of Object.entries(aliases)) {
        const found = keys.find(k => flat[k]);
        if (found) out[target] = flat[found];
      }
      if (Object.keys(out).length) return out;
    }
    return defaultPlan().budgetBreakdown;
  }

  function normalizePlan(raw) {
    const base = defaultPlan();
    if (!raw || typeof raw !== 'object') return base;
    return {
      title: toText(raw.title || raw.tripTitle || raw.name, base.title),
      summary: toText(raw.summary || raw.overview || raw.description || raw.focusSummary, base.summary),
      tripMood: toText(raw.tripMood || raw.trip_mood || raw.signatureMood, base.tripMood),
      dayDensity: toText(raw.dayDensity || raw.day_density || raw.density, base.dayDensity),
      budgetMode: toText(raw.budgetMode || raw.budget_mode || raw.spendMode, base.budgetMode),
      vibe: toText(raw.vibe || raw.mood, base.vibe),
      pace: toText(raw.pace || raw.tempo, base.pace),
      bestFor: toText(raw.bestFor || raw.best_for || raw.suitedFor, base.bestFor),
      days: normalizeDays(raw.days || raw.itinerary || raw.plan || raw.schedule),
      localTips: toList(raw.localTips || raw.tips || raw.travelTips).slice(0, 6).length ? toList(raw.localTips || raw.tips || raw.travelTips).slice(0, 6) : base.localTips,
      budgetSummary: toText(raw.budgetSummary || raw.budgetNote || raw.costSummary, base.budgetSummary),
      budgetBreakdown: normalizeBudget(raw.budgetBreakdown || raw.budget || raw.costs),
      checklist: toList(raw.checklist || raw.packingList || raw.todos || raw.prep).slice(0, 10).length ? toList(raw.checklist || raw.packingList || raw.todos || raw.prep).slice(0, 10) : base.checklist
    };
  }

  function parseJsonFromText(text) {
    const cleaned = String(text || '').replace(/```json|```/g, '').trim();
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start === -1 || end === -1 || end <= start) return null;
    try { return JSON.parse(cleaned.slice(start, end + 1)); } catch { return null; }
  }

  const prompt = `You are a travel planner for a mobile-first service called Ryokoplan. Return valid JSON only.
Every user-facing string must be written entirely in ${uiLanguage}. Do not use Korean unless the selected language is Korean.

Trip inputs:
- Destination: ${destination}
- Duration: ${duration || '3 Nights 4 Days'}
- Companion: ${companion || 'Solo'}
- Style: ${style || 'Balanced'}
- Traveler traits: ${traitLine}
- Local mode: ${localMode ? 'On' : 'Off'}
- Notes: ${notes || 'None'}
- Trip mood: ${req.body?.tripMood || 'balanced'}
- Day density: ${req.body?.dayDensity || 'balanced'}
- Budget rhythm: ${req.body?.budgetMode || 'balanced'}

Return EXACTLY this schema:
{
  "title": "...",
  "summary": "one short paragraph",
  "tripMood": "2 to 4 words",
  "dayDensity": "Light days / Balanced days / Full days",
  "budgetMode": "Smart spend / Balanced spend / Treat-worthy",
  "vibe": "3 to 6 words",
  "pace": "3 to 8 words",
  "bestFor": "short phrase",
  "days": [
    {
      "day": 1,
      "title": "natural day title, not generic",
      "intro": "one short sentence",
      "places": [
        { "name": "...", "reason": "short reason" },
        { "name": "...", "reason": "short reason" },
        { "name": "...", "reason": "short reason" }
      ],
      "localTip": "one practical local tip"
    }
  ],
  "localTips": ["...", "...", "..."],
  "budgetSummary": "one short sentence",
  "budgetBreakdown": {
    "flight": "$...",
    "hotel": "$...",
    "food": "$...",
    "transit": "$...",
    "admission": "$..."
  },
  "checklist": ["...", "...", "...", "..."]
}

Rules:
- Keep it concise but richer than a basic itinerary.
- Use 2 to 4 days based on trip length.
- Each day must contain 3 to 5 places.
- Make day titles sound editorial and natural.
- Reasons must explain why the stop belongs in that day, not just what it is.
- Local tips must feel practical and real.
- Output JSON only.`;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(200).json(defaultPlan({ tripMood: req.body?.tripMood, dayDensity: req.body?.dayDensity, budgetMode: req.body?.budgetMode }));

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-1-20250805',
        max_tokens: 2600,
        temperature: 0.2,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) throw new Error('Upstream API error');
    const data = await response.json();
    const raw = data.content?.[0]?.text || '{}';
    const parsed = parseJsonFromText(raw);
    return res.status(200).json(normalizePlan(parsed));
  } catch (error) {
    return res.status(200).json(defaultPlan({ tripMood: req.body?.tripMood, dayDensity: req.body?.dayDensity, budgetMode: req.body?.budgetMode }));
  }
};
