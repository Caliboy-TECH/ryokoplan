module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { destination, duration, companion, style, travelerTraits = [], localMode = false, notes = '', lang = 'en', language } = req.body || {};
  const pickedLang = language || lang || 'en';
  if (!destination) return res.status(400).json({ error: 'destination is required' });

  const languageNames = { ko: 'Korean', en: 'English', ja: 'Japanese', zh: 'Simplified Chinese' };
  const uiLanguage = languageNames[pickedLang] || 'English';
  const traitLine = travelerTraits.length ? travelerTraits.join(', ') : 'None';

  function defaultPlan() {
    return {
      title: `${destination} · ${duration || '3N4D'} · ${companion || 'Solo'}`,
      summary: pickedLang === 'ko'
        ? '이 일정은 이동 부담을 줄이면서 핵심 지역을 자연스럽게 묶는 방향으로 구성했어요.'
        : 'This plan is built to reduce transit fatigue while grouping key areas in a natural flow.',
      days: [
        { day: 1, title: pickedLang === 'ko' ? '도착 후 가볍게 시작하는 하루' : 'An easy first day after arrival', stops: [pickedLang === 'ko' ? '체크인' : 'Check-in', pickedLang === 'ko' ? '주변 산책' : 'Neighborhood walk', pickedLang === 'ko' ? '근처 저녁 식사' : 'Dinner nearby'] },
        { day: 2, title: pickedLang === 'ko' ? '대표 지역을 보는 핵심 일정' : 'A core day around the main areas', stops: [pickedLang === 'ko' ? '주요 지역 방문' : 'Main district stop', pickedLang === 'ko' ? '카페 휴식' : 'Cafe break', pickedLang === 'ko' ? '저녁 산책' : 'Evening stroll'] }
      ],
      budgetBreakdown: { flight: '$200–450', hotel: '$260–620', food: '$90–180', transit: '$25–60', admission: '$20–55' },
      checklist: pickedLang === 'ko'
        ? ['편한 신발', '교통카드', '보조배터리', '필요한 예약 확인']
        : ['Comfortable shoes', 'Transit card', 'Portable charger', 'Check any needed reservations']
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
    if (typeof v === 'string') {
      return v.split(/\n|•|·|\u2022/).map(s => s.trim()).filter(Boolean);
    }
    if (v && typeof v === 'object') return valuesDeep(v).filter(Boolean);
    return [];
  }

  function normalizeDays(v) {
    const arr = Array.isArray(v)
      ? v
      : (v && typeof v === 'object')
        ? Object.values(v)
        : [];
    const mapped = arr.map((item, idx) => {
      if (typeof item === 'string') {
        return { day: idx + 1, title: item, stops: [] };
      }
      const stops = toList(item?.stops || item?.activities || item?.places || item?.items);
      return {
        day: Number(item?.day) || idx + 1,
        title: toText(item?.title || item?.theme || item?.name || item, `Day ${idx + 1}`),
        stops: stops.slice(0, 5)
      };
    }).filter(d => d.title || d.stops.length);
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
      days: normalizeDays(raw.days || raw.itinerary || raw.plan || raw.schedule),
      budgetBreakdown: normalizeBudget(raw.budgetBreakdown || raw.budget || raw.costs),
      checklist: toList(raw.checklist || raw.packingList || raw.todos || raw.tips).slice(0, 8).length
        ? toList(raw.checklist || raw.packingList || raw.todos || raw.tips).slice(0, 8)
        : base.checklist
    };
  }

  function parseJsonFromText(text) {
    const cleaned = String(text || '').replace(/```json|```/g, '').trim();
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start === -1 || end === -1 || end <= start) return null;
    try {
      return JSON.parse(cleaned.slice(start, end + 1));
    } catch {
      return null;
    }
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

Return EXACTLY this schema:
{
  "title": "...",
  "summary": "one short paragraph",
  "days": [
    { "day": 1, "title": "...", "stops": ["...", "...", "..."] }
  ],
  "budgetBreakdown": {
    "flight": "$...",
    "hotel": "$...",
    "food": "$...",
    "transit": "$...",
    "admission": "$..."
  },
  "checklist": ["...", "...", "..."]
}

Keep it concise, practical, and easy to scan on mobile. Use 2 to 4 days based on the trip length.`;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(200).json(defaultPlan());
  }

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
        max_tokens: 2200,
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
    return res.status(200).json(defaultPlan());
  }
};
