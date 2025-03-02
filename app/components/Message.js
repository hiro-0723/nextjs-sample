// app/components/Message.js
export default function Message({ text, sender }) {
  return (
    <div
      className={`block p-2 rounded-lg w-fit max-w-xs ${
        sender === "bot"
          ? "bg-blue-200 text-black text-left self-start"
          : "bg-gray-300 text-black text-right ml-auto"
      }`}
    >
      {text}
    </div>
  );
}
