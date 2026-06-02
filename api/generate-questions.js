module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-gemini-api-key'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { topics, roadmapTitle } = req.body;
    if (!topics || !Array.isArray(topics) || !roadmapTitle) {
      return res.status(400).json({ error: 'Invalid parameters: topics and roadmapTitle are required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY || req.headers['x-gemini-api-key'];
    if (!apiKey) {
      return res.status(400).json({ error: 'Gemini API Key is missing. Configure GEMINI_API_KEY environment variable or set it in settings.' });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const systemPrompt = "You are an expert examiner. Generate a multiple-choice quiz of exactly 10 questions based on the provided list of topics. Return ONLY a valid JSON array of objects. Each object in the array must have the following keys: 'question' (string), 'options' (array of exactly 4 strings), 'correct' (integer index 0-3 of the correct option), and 'topic' (string matching one of the provided topics).";
    const userPrompt = `Generate 10 MCQ questions for the following phase topics from the "${roadmapTitle}" roadmap:\n${topics.join('\n')}`;

    const requestBody = {
      contents: [
        { parts: [{ text: userPrompt }] }
      ],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      generationConfig: {
        responseMimeType: "application/json"
      }
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: `Gemini API Error: ${errorText}` });
    }

    const data = await response.json();
    let text = "";
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text) {
      text = data.candidates[0].content.parts[0].text.trim();
    } else {
      return res.status(500).json({ error: 'Invalid response from Gemini API' });
    }

    return res.status(200).json({ reply: text });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
};
