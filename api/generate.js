module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const {
    lang = 'ko',
    destination,
    duration,
    style,
    budget,
    companion,
    travelerTraits = [],
    localMode = false,
    notes = ''
  } = req.body || {};

  if (!destination) return res.status(400).json({ error: 'destination is required' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured' });

  const languageNames = {
    ko: 'Korean',
    en: 'English',
    ja: 'Japanese',
    zh: 'Simplified Chinese'
  };

  const uiLanguage = languageNames[lang] || 'English';
  const traitLine = travelerTraits.length ? travelerTraits.join(', ') : 'None';
  const modeLine = localMode ? 'Local mode ON: prioritize hidden gems, local neighborhoods, quieter cafes, side streets, and non-obvious experiences. Still keep 1-2 must-see anchors if truly essential.' : 'Tourist mode: balance iconic highlights with practical pacing.';

  const prompt = `You are a premium travel planner.
Create a polished, realistic itinerary in ${uiLanguage}.

TRIP INPUTS
- Destination: ${destination}
- Duration: ${duration || '3 Nights 4 Days'}
- Travel style: ${style || 'Balanced sightseeing'}
- Budget level: ${budget || 'Balanced'}
- Companion: ${companion || 'Solo'}
- Traveler traits: ${traitLine}
- ${modeLine}
- Extra notes: ${notes || 'None'}

RULES
1. Output valid JSON only. No markdown. No code fences. No commentary.
2. Make the plan practical: cluster places by area, reduce backtracking, respect energy level.
3. If traveler traits imply accessibility, elderly travelers, kids, or pets, adapt pacing, transport, and checklist accordingly.
4. Include a budget breakdown with exactly these categories in this order: Flight, Hotel, Food, Transit, Admission.
5. Checklist must reflect destination, likely season, style, and traveler traits.
6. Tips must be genuinely useful and local-feeling, not generic filler.
7. Day activities should include varied categories where relevant.
8. Keep total JSON concise but detailed enough to be useful.

JSON SCHEMA
{
  "title": "string",
  "destination": "string",
  "duration": "string",
  "style": "string",
  "companion": "string",
  "travelerTraits": ["string"],
  "localMode": true,
  "focusSummary": "one-sentence summary of the plan's angle",
  "summary": ["short sentence", "short sentence", "short sentence"],
  "days": [
    {
      "day": 1,
      "title": "string",
      "area": "string",
      "activities": [
        {
          "time": "09:00",
          "place": "string",
          "description": "string",
          "category": "sightseeing|food|cafe|transport|stay|shopping|nature|culture|activity|photo|hidden",
          "tip": "string"
        }
      ]
    }
  ],
  "tips": ["string", "string", "string", "string"],
  "budgetBreakdown": [
    {"category": "Flight", "amount": "string"},
    {"category": "Hotel", "amount": "string"},
    {"category": "Food", "amount": "string"},
    {"category": "Transit", "amount": "string"},
    {"category": "Admission", "amount": "string"}
  ],
  "estimatedBudget": "string",
  "checklist": ["string", "string", "string", "string", "string", "string"]
}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 5000,
        temperature: 0.6,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return res.status(response.status).json({
        error: errData.error?.message || 'Anthropic API error'
      });
    }

    const data = await response.json();
    const rawText = data.content?.[0]?.text || '';
    const cleaned = rawText.replace(/```json\s*|```/g, '').trim();
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    const jsonText = start >= 0 && end >= 0 ? cleaned.slice(start, end + 1) : cleaned;
    const itinerary = JSON.parse(jsonText);

    itinerary.destination = itinerary.destination || destination;
    itinerary.duration = itinerary.duration || duration;
    itinerary.style = itinerary.style || style;
    itinerary.companion = itinerary.companion || companion;
    itinerary.travelerTraits = Array.isArray(itinerary.travelerTraits) ? itinerary.travelerTraits : travelerTraits;
    itinerary.localMode = typeof itinerary.localMode === 'boolean' ? itinerary.localMode : !!localMode;
    itinerary.tips = Array.isArray(itinerary.tips) ? itinerary.tips : [];
    itinerary.checklist = Array.isArray(itinerary.checklist) ? itinerary.checklist : [];
    itinerary.summary = Array.isArray(itinerary.summary) ? itinerary.summary : [];
    itinerary.days = Array.isArray(itinerary.days) ? itinerary.days : [];
    itinerary.budgetBreakdown = Array.isArray(itinerary.budgetBreakdown) ? itinerary.budgetBreakdown : [];

    return res.status(200).json(itinerary);
  } catch (error) {
    console.error('generate error:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate itinerary' });
  }
};
