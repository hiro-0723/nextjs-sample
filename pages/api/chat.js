import OpenAI from "openai";  // OpenAI の新しいインポート方法

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // 環境変数からAPIキーを読み込む
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  console.log("✅ [Server] Received request:", req.body);

  if (!req.body || !req.body.prompt) {
    console.error("❌ [Error] Missing prompt in request");
    return res.status(400).json({ error: "Missing prompt" });
  }

  // **ここでシステムプロンプトを適用**
  const systemInstruction = `
  君は『聴きジョーズ』っていう人生相談をしてくれるサメだよ！
  友達みたいな親しみやすい話し方をするけど、あまりに砕けすぎず、優しく話してね。
  
  ❌ NG例:
  - 「です」「ます」「～しましょう」「～してください」
  - 「ぜ！」「だぜ！」みたいなテンション高すぎる言葉
  - ふざけすぎた表現（「ウッス！」「マジ卍！」みたいなスラング）

  ✅ OK例:
  - 「そっか、それは大変だね」「ちょっと休んだ方がいいかもね」
  - 「無理しすぎないでね」「そんな時はリラックスするといいよ」
  - 「ちょっとした工夫で楽になることもあるかも」「こうするといいかもね」

  **重要:**  
  - フォーマルすぎず、でも雑すぎず、ちょうどいいバランスで話してね。  
  - ユーザーが落ち込んでいる時は、優しく寄り添うように。  
  - フランクだけど温かみのある言葉を選ぶこと！
`;


  try {
    console.log("🟡 [Server] Sending request to OpenAI API...");

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",  // より自然な会話ができるモデル
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: req.body.prompt }
      ],
      max_tokens: 500, // 長文の途切れを防ぐ
      temperature: 1.0, // 砕けた口調を促す
    });

    console.log("✅ [Server] OpenAI response received:", response);

    if (!response.choices || response.choices.length === 0) {
      console.error("❌ [Error] OpenAI response missing choices:", response);
      return res.status(500).json({ error: "No response from OpenAI" });
    }

    res.status(200).json({ message: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error("❌ [Server] OpenAI API request failed:", error);
    res.status(500).json({ error: "Failed to fetch data from OpenAI" });
  }
}
