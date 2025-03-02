"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Message from "./Message";
import InputForm from "./InputForm";

export default function ChatBox() {
  // チャットのメッセージ管理（最初のメッセージを設定）
  const [messages, setMessages] = useState([
    { text: "どうしたの？何かあったの？", sender: "bot" }
  ]);

  // メッセージを追加する関数
  const addMessage = (text, sender) => {
    setMessages((prevMessages) => [...prevMessages, { text, sender }]);
  };

  // AIからの返答を追加する関数
  const getAIResponse = async (userMessage) => {
    console.log("Sending message to API:", userMessage);

    const requestData = { prompt: userMessage };
    console.log("Request data being sent to API:", requestData);

    addMessage("考えているよ...", "bot"); // 一時メッセージを表示

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userMessage,
          max_tokens: 500, // 長文の途切れを防ぐ
          systemInstruction: "君は『聴きジョーズ』っていう人生相談をしてくれるサメだよ！親しみやすい友達みたいな話し方で、フォーマルな言葉は絶対に使わないで！たとえば『マジか！』『～するといいかもね！』『それはヤバいね！』みたいな砕けたカジュアルな口調で話してね。敬語は禁止。『です』『ます』は使わないで！"
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch AI response");
      }

      const data = await res.json();
      console.log("AI response data:", data);

      if (data.message) {
        setMessages((prevMessages) => [
          ...prevMessages.filter(msg => msg.text !== "考えているよ..."), // 一時メッセージ削除
          { text: data.message, sender: "bot" }
        ]);
      } else {
        console.error("No message found in the response");
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  // メッセージ送信時の処理
  const handleSendMessage = (userMessage) => {
    addMessage(userMessage, "user");
    getAIResponse(userMessage);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-4 rounded-lg shadow-lg">
      {/* サメのイラスト（アニメーション） */}
      <div className="flex justify-center">
        <motion.img
          src="/shark.png"
          alt="サメ"
          className="w-24 h-24"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* メッセージ表示 */}
      <div className="mt-4 space-y-2">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
      </div>

      {/* 入力フォーム */}
      <InputForm onSendMessage={handleSendMessage} />
    </div>
  );
}
