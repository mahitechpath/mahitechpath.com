const fetch = require('node-fetch');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { prompt, systemPrompt, isJson } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Invalid parameters: prompt is required.' });
    }

    const requestBody = {
      contents: [{ parts: [{ text: prompt }] }]
    };

    if (systemPrompt) {
      requestBody.systemInstruction = {
        parts: [{ text: systemPrompt }]
      };
    }

    if (isJson) {
      requestBody.generationConfig = {
        responseMimeType: "application/json"
      };
    }
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      return res.status(500).json({ error: data.error?.message || 'Gemini API error' });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    
    // Return both 'result' and 'reply' properties for backward compatibility with app.js
    return res.status(200).json({ 
      result: text, 
      reply: text 
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
