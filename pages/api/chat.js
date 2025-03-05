import OpenAI from "openai";

export default async function handler(req, res) {
  console.log("🟡 [Server] Starting API request...");

  if (req.method !== "POST") {
    console.error("❌ [Error] Invalid method:", req.method);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      console.error("❌ [Error] Missing prompt in request");
      return res.status(400).json({ error: "Missing prompt" });
    }

    console.log("🟡 [Server] Checking API key...");
    console.log("🔑 OPENAI_API_KEY:", process.env.OPENAI_API_KEY ? "Exists ✅" : "Missing ❌");

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "API Key is missing" });
    }

    console.log("🟡 [Server] Sending request to OpenAI API...");
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    console.log("✅ [Server] OpenAI response received:", response);

    res.status(200).json({ message: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error("❌ [Server] OpenAI API request failed:", error);

    // `error.json()` ではなく `JSON.stringify(error.message)` を使う
    res.status(500).json({ error: `Failed to fetch OpenAI response: ${error.message}` });
  }
}
