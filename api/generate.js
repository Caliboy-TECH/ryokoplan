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
  const prompt = `You are a travel planner for a mobile-first service called Ryokoplan. Return valid JSON only. Every user-facing string must be written entirely in ${uiLanguage}. Do not use Korean unless the selected language is Korean.

Trip inputs:
- Destination: ${destination}
- Duration: ${duration || '3 Nights 4 Days'}
- Companion: ${companion || 'Solo'}
- Style: ${style || 'Balanced'}
- Traveler traits: ${traitLine}
- Local mode: ${localMode ? 'On' : 'Off'}
- Notes: ${notes || 'None'}

Create a realistic trip with:
- title
- summary
- days (array of day, title, stops)
- budgetBreakdown (object with flight, hotel, food, transit, admission)
- checklist (array)

Keep it concise, practical, and easy to scan on mobile.`;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(200).json({
      title: `${destination} · ${duration || '3N4D'} · ${companion || 'Solo'}`,
      summary: `A practical trip shaped around pace, routing, and the kind of days you want.`,
      days: [
        { day: 1, title: `Arrival and first neighborhood`, stops: ['Check-in', 'Easy local walk', 'Dinner nearby'] },
        { day: 2, title: `Main area exploration`, stops: ['Key district', 'Cafe break', 'Evening stroll'] },
        { day: 3, title: `Slow finish`, stops: ['Brunch', 'Final stop', 'Transfer out'] }
      ],
      budgetBreakdown: { flight: '$200–450', hotel: '$260–620', food: '$90–180', transit: '$25–60', admission: '$20–55' },
      checklist: ['Comfortable shoes', 'Transit card', 'One reservation if needed', 'Portable charger']
    });
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
        temperature: 0.3,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) throw new Error('Upstream API error');
    const data = await response.json();
    const raw = data.content?.[0]?.text || '{}';
    const cleaned = raw.replace(/```json|```/g, '').trim();
    const json = JSON.parse(cleaned.slice(cleaned.indexOf('{'), cleaned.lastIndexOf('}') + 1));
    return res.status(200).json(json);
  } catch (error) {
    return res.status(200).json({
      title: `${destination} · ${duration || '3N4D'} · ${companion || 'Solo'}`,
      summary: `A practical trip shaped around pace, routing, and the kind of days you want.`,
      days: [
        { day: 1, title: `Arrival and first neighborhood`, stops: ['Check-in', 'Easy local walk', 'Dinner nearby'] },
        { day: 2, title: `Main area exploration`, stops: ['Key district', 'Cafe break', 'Evening stroll'] },
        { day: 3, title: `Slow finish`, stops: ['Brunch', 'Final stop', 'Transfer out'] }
      ],
      budgetBreakdown: { flight: '$200–450', hotel: '$260–620', food: '$90–180', transit: '$25–60', admission: '$20–55' },
      checklist: ['Comfortable shoes', 'Transit card', 'One reservation if needed', 'Portable charger']
    });
  }
};
