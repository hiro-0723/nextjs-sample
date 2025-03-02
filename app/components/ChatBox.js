// app/components/ChatBox.js
"use client";  // ← ここを追加！

import { useState } from "react";
import Message from "./Message";
import InputForm from "./InputForm";

export default function ChatBox() {
  // チャットのメッセージ管理（最初のメッセージを設定）
  const [messages, setMessages] = useState([
    { text: "どうした？何かあったの？", sender: "bot" }
  ]);

  // メッセージを追加する関数
  const addMessage = (text) => {
    setMessages([...messages, { text, sender: "user" }]);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-4 rounded-lg shadow-lg">
      {/* サメのイラスト */}
      <div className="flex justify-center">
        <img src="/shark.png" alt="サメ" className="w-24 h-24" />
      </div>

      {/* メッセージ表示 */}
      <div className="mt-4 space-y-2">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
      </div>

      {/* 入力フォーム */}
      <InputForm onSendMessage={addMessage} />
    </div>
  );
}
