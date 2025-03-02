// components/InputForm.js
import { useState } from "react";

export default function InputForm({ onSendMessage }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="ここに入力..."
        className="flex-grow p-2 border rounded-l-lg text-blue-800"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg">
        送信
      </button>
    </form>
  );
}
