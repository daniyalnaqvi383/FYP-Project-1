const Groq = require("groq-sdk");

// 💡 INTERNAL SESSION CACHE: Short-term history tracking module
let chatSessions = {};

const handleBotChat = async (req, res) => {
  try {
    const { message, userId } = req.body; 

    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    // Direct configuration parameters validation boundary
    const apiKey = process.env.GROQ_API_KEY 
    
    if (!apiKey || apiKey.includes("missing")) {
      return res.status(500).json({ 
        success: false, 
        message: "❌ CONFIG ERROR: GROQ_API_KEY parameter binding is missing inside .env portal!" 
      });
    }

    // Initialize clean instance and trim any unintentional white spaces
    const groq = new Groq({ apiKey: apiKey.trim() });

    // Fallback default handler allocation loop tracking sessions
    const sessionId = userId || "default_user";
    if (!chatSessions[sessionId]) {
      chatSessions[sessionId] = [];
    }

    // 💡 SYSTEM PROMPT: Elite Stylist Framework
    const systemPrompt = `
      You are "Me. Assistant", the elite luxury virtual stylist and fashion consultant for the premium clothing brand "Me.".
      You format your output beautifully using markdown (bolding key words, using clean bullet points for lists).

      LANGUAGE DUALITY:
      - If user types in Roman Urdu/Hinglish (e.g., "mujhe combo batao", "kya haal hai"), reply in highly fluent, modern, trendy Roman Urdu/Hinglish. Sound like a supportive, cool fashion peer.
      - If user types in English, reply in flawless, high-end professional English.

      SMART INSTRUCTIONS:
      1. SHORT GREETINGS: If user says just "Hi", "Salam", etc., give a 1-line sweet energetic greeting.
      2. WARDROBE RECOMMENDATIONS: Use bold text and short bullet points. Eastern (Kurtas, Waistcoats in Black, White, Navy) and Western (Premium Polos, Oxford shirts, Chinos, Dark Denim).
      3. CONTEXT AWARENESS: You have access to previous conversation history. Use it to answer follow-up questions intelligently.
      4. BRAND POLICY: 7-day hassle-free exchange policy.
    `;

    // 💡 COMPILE MESSAGES WITH RECENT HISTORICAL TURNS
    let apiMessages = [{ role: "system", content: systemPrompt }];
    
    const history = chatSessions[sessionId].slice(-4);
    history.forEach(msg => apiMessages.push(msg));
    
    apiMessages.push({ role: "user", content: message });

    // ⚡ Execute cloud transaction handshake to Llama-3.1 engine
    const chatCompletion = await groq.chat.completions.create({
      messages: apiMessages,
      model: "llama-3.1-8b-instant",
      temperature: 0.6,
      max_tokens: 300
    });

    const botReply = chatCompletion.choices[0]?.message?.content || "No response text recovered.";

    // Append standard turn records to cache layer
    chatSessions[sessionId].push({ role: "user", content: message });
    chatSessions[sessionId].push({ role: "assistant", content: botReply });

    return res.status(200).json({
      success: true,
      reply: botReply,
    });

  } catch (error) {
    // This will print the raw detailed payload stack inside VS Code Node terminal window
    console.error("🔴 CRITICAL NODE INTERNALS EXCEPTIONS ERROR =>", error);
    
    return res.status(500).json({ 
      success: false, 
      message: `Chat Engine Core API Error: ${error.message}` 
    });
  }
};

module.exports = { handleBotChat };