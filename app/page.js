// app/page.js
import ChatBox from "./components/ChatBox";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ChatBox />
    </div>
  );
}
