"use client";

import { useState } from "react";
import { Client } from "@gradio/client";

export default function ChatBox() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState<{ from: string; message: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = userInput.trim();
    setChatHistory((prev) => [...prev, { from: "user", message: userMessage }]);
    setUserInput("");
    setIsLoading(true);

    try {
      const client = await Client.connect("rahulxjain11/mindmate-chatbot");

      const result = await client.predict("/chat", {
        message: userMessage,
        system_message: "You are a helpful and supportive AI mental health assistant.",
        max_tokens: "512", // as string per Gradio spec
        temperature: 0.7,
        top_p: 0.95,
      });

      const botReply = (result?.data as string[] | undefined)?.[0] ?? "Sorry, I couldn’t understand that.";
      setChatHistory((prev) => [...prev, { from: "bot", message: botReply }]);
    } catch (error) {
      console.error("❌ Error talking to chatbot:", error);
      setChatHistory((prev) => [
        ...prev,
        { from: "bot", message: "An error occurred. Please try again later." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
      <div className="h-96 overflow-y-auto border p-4 mb-4">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.from === "user" ? "text-right" : "text-left"}`}>
            <span
              className={`inline-block px-3 py-2 rounded ${
                msg.from === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              {msg.message}
            </span>
          </div>
        ))}
        {isLoading && <div className="text-left text-gray-500 italic">Bot is typing...</div>}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-grow border p-2 rounded"
          placeholder="Ask something..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
