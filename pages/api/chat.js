import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.prompt,
        max_tokens: 150,
      });
      res.status(200).json({ message: response.data.choices[0].text.trim() });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data from OpenAI' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
