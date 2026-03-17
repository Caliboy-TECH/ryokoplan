export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { destination, duration, style, budget } = req.body || {};
  if (!destination) return res.status(400).json({ error: 'destination is required' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

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
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: `여행 일정을 만들어줘.\n목적지: ${destination}\n기간: ${duration || '3박 4일'}\n여행 스타일: ${style || '일반 관광'}\n예산: ${budget || '적당한 예산'}\n\n반드시 아래 JSON 형식으로만 응답해. 다른 텍스트 없이 JSON만:\n{\n  "title": "여행 제목",\n  "destination": "${destination}",\n  "duration": "${duration || '3박 4일'}",\n  "days": [\n    {\n      "day": 1,\n      "title": "Day 1 소제목",\n      "activities": [\n        {\n          "time": "09:00",\n          "place": "장소명",\n          "description": "활동 설명",\n          "category": "관광",\n          "tip": ""\n        }\n      ]\n    }\n  ],\n  "tips": ["팁1", "팁2"],\n  "estimatedBudget": "예상 예산"\n}`
        }]
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return res.status(response.status).json({ error: errData.error?.message || 'API error' });
    }

    const data = await response.json();
    const rawText = data.content?.[0]?.text || '';
    const cleaned = rawText.replace(/```json\s*|\s*```/g, '').trim();
    const itinerary = JSON.parse(cleaned);
    return res.status(200).json(itinerary);

  } catch (err) {
    console.error('generate error:', err);
    return res.status(500).json({ error: err.message || '일정 생성 실패' });
  }
}
