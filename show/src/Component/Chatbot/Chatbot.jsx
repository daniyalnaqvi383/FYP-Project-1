import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Sparkles, Shirt, RefreshCw } from "lucide-react";
import axios from "axios";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  
  // 💡 NEW DESIGNER WELCOME LAYOUT: Beautifully formatted rich message
  const welcomeMessage = `Assalam-o-Alaikum! 👋 Welcome to "Trylo" Premium Store. 

Main aapka personal fashion stylist hoon. Aaj main aapko styling, color matching, aur sizing mein guide karunga. 

Main aapki kya madad kar sakta hoon? 👇`;

  const [messages, setMessages] = useState([
    { sender: "bot", text: welcomeMessage }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // 💡 QUICK SUGGESTION BUTTONS: Customer direct click kar sake
  const quickPrompts = [
    { text: "Kurta Matchings 🌟", query: "Black kurta ke sath waistcoat aur pants ka combination batao." },
    { text: "Casual Dinner Wear 👕", query: "Doston ke sath dinner par jana hai, koi elite Western combo suggest karo." },
    { text: "Exchange Policy 🔄", query: "Agar size ka masla ho toh exchange policy kya hai?" }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e, customQuery = null) => {
    if (e) e.preventDefault();
    
    const userMessage = customQuery ? customQuery.trim() : input.trim();
    if (!userMessage || loading) return;

    // User ka message screen par add karein
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    if (!customQuery) setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8030/api/chat", { message: userMessage });
      
      if (res.data.success) {
        setMessages((prev) => [...prev, { sender: "bot", text: res.data.reply }]);
      } else {
        setMessages((prev) => [...prev, { sender: "bot", text: `❌ BACKEND ERROR: ${res.data.message}` }]);
      }
    } catch (error) {
      console.error("Chatbot frontend error:", error);
      const extractedError = error.response?.data?.error || error.response?.data?.message || error.message;
      setMessages((prev) => [...prev, { sender: "bot", text: `🔴 API CRASH ALERT => ${extractedError}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* 🟢 CHAT FLOATING TOGGLE BUBBLE */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#C19A6B] hover:bg-[#a37f55] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        >
          <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* 🔵 MAIN CHAT WINDOW INTERFACE */}
      {isOpen && (
        <div className="bg-white w-[350px] sm:w-[390px] h-[520px] rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all duration-300">
          
          {/* HEADER BAR */}
          <div className="bg-black text-white p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="bg-[#C19A6B] p-2 rounded-xl text-white shadow-inner animate-pulse">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide flex items-center gap-1">
                  Me. Assistant <Sparkles size={14} className="text-[#C19A6B] fill-[#C19A6B]" />
                </h3>
                <span className="text-[10px] text-green-400 font-medium flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block"></span> Active Stylist
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition p-1 rounded-lg hover:bg-zinc-900">
              <X size={20} />
            </button>
          </div>

          {/* MESSAGES LOG VIEWPORT */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-zinc-50/60">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm shadow-sm whitespace-pre-line leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-black text-white rounded-tr-none font-medium"
                      : msg.text.startsWith("🔴") || msg.text.startsWith("❌")
                      ? "bg-red-50 text-red-600 border border-red-200 rounded-tl-none font-mono text-xs"
                      : "bg-white text-zinc-800 border border-zinc-100 rounded-tl-none shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-zinc-100 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 bg-[#C19A6B] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2 h-2 bg-[#C19A6B] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2 h-2 bg-[#C19A6B] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* 💡 QUICK SUGGESTION BUTTONS ROW */}
          {messages.length === 1 && !loading && (
            <div className="px-4 py-2 bg-zinc-50/60 flex flex-wrap gap-2 border-t border-zinc-100">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(null, prompt.query)}
                  className="bg-white hover:bg-zinc-900 hover:text-white text-zinc-700 text-[11px] font-medium px-3 py-1.5 rounded-full border border-zinc-200 shadow-sm transition-all duration-200 active:scale-95"
                >
                  {prompt.text}
                </button>
              ))}
            </div>
          )}

          {/* INPUT FORM */}
          <form onSubmit={(e) => handleSendMessage(e)} className="p-3 border-t bg-white flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about fits, styling, contrasts..."
              className="w-full bg-zinc-50 text-xs sm:text-sm border border-zinc-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C19A6B] text-black placeholder-zinc-400 font-medium"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-black hover:bg-zinc-800 text-white p-3 rounded-xl transition-all duration-200 disabled:opacity-30 active:scale-95 shadow-md flex items-center justify-center"
            >
              <Send size={16} />
            </button>
          </form>
          
        </div>
      )}
    </div>
  );
}