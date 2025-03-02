// pages/api/chat.js
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,  // 環境変数からAPIキーを読み込みます
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log("Received POST request:", req.body);  // 受け取ったリクエストを確認
    try {
      const response = await openai.createCompletion({
        model: 'text-davinci-003',  // 使用するモデル
        prompt: req.body.prompt,    // ユーザーから送られたプロンプト
        max_tokens: 150,            // 返答の最大トークン数
      });
      console.log("OpenAI response:", response.data);  // OpenAIからの返答を確認
      res.status(200).json({ message: response.data.choices[0].text.trim() });
    } catch (error) {
      console.error("Error:", error);  // エラーメッセージを表示
      res.status(500).json({ error: 'Failed to fetch data from OpenAI' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
