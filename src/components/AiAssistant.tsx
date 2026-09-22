import { useState, useRef, useEffect } from "react";
import { TRANSLATIONS } from "../data";
import { Language, ChatMessage } from "../types";
import { MessageSquare, X, Send, Sparkles, Loader2, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AiAssistantProps {
  lang: Language;
}

export default function AiAssistant({ lang }: AiAssistantProps) {
  const t = TRANSLATIONS[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        role: "model",
        parts: [{ text: t.chatInitMessage }]
      }
    ]);
  }, [lang]);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    setErrorMsg(null);
    const userMsg = textToSend.trim();
    setInput("");

    // Append user message
    const updatedMessages: ChatMessage[] = [
      ...messages,
      { role: "user", parts: [{ text: userMsg }] }
    ];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: messages.map(m => ({
            role: m.role,
            parts: m.parts
          }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to communicate with AI Assistant");
      }

      setMessages([
        ...updatedMessages,
        { role: "model", parts: [{ text: data.reply }] }
      ]);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const starterQuestions = lang === "id" 
    ? [
        "Apa itu In Silico Molecular Docking?",
        "Bagaimana pengalaman Mank Krisna di BPOM?",
        "Apa saja logam berat yang diuji pada seafood?",
        "Apa saja organisasi dan hobi musik EDM Mank Krisna?"
      ]
    : [
        "What is In Silico Molecular Docking?",
        "Describe Mank Krisna's BPOM experience.",
        "What heavy metals are tested in seafood?",
        "Tell me about Mank Krisna's organizations and EDM music!"
      ];

  return (
    <>
      {/* Floating Chat Trigger Button with Glow */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer bg-accent text-on-accent hover:bg-accent-soft transition-colors"
        style={{ background: 'linear-gradient(135deg, #2D5A4E 0%, #4ECDC4 100%)' }}
        title="Open Mank Krisna AI Assistant"
      >
        <MessageSquare size={24} className="text-white" />
      </motion.button>

      {/* Expanded Chat Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[400px] h-[550px] glass-card rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-line"
          >
            {/* Header with Gradient */}
            <div className="px-5 py-4 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #2D5A4E 0%, #4ECDC4 100%)' }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <div>
                  <h3 className="font-serif italic text-base text-white font-bold flex items-center gap-1.5">
                    <Sparkles size={14} />
                    <span>Lab Virtual AI</span>
                  </h3>
                  <p className="text-[9px] font-mono uppercase tracking-wider text-white/80">
                    Mank Krisna Virtual Clone
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:opacity-80 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Sub-header info */}
            <div className="bg-accent/5 px-4 py-2 border-b border-line/50 flex items-center gap-2 text-[10px] text-accent font-mono">
              <Info size={12} className="shrink-0" />
              <span>Grounded in Mank Krisna's official chemistry portfolio.</span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-paper-soft/30">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "text-on-accent"
                        : "glass-card text-ink border border-line"
                    }`}
                    style={msg.role === "user" ? { background: 'linear-gradient(135deg, #2D5A4E 0%, #4ECDC4 100%)' } : {}}
                  >
                    <p className="whitespace-pre-line text-justify">{msg.parts[0].text}</p>
                  </div>
                </div>
              ))}

              {/* Chat loading indicator */}
              {loading && (
                <div className="flex justify-start">
                  <div className="glass-card text-ink border border-line rounded-2xl px-4 py-3 text-xs flex items-center gap-2">
                    <Loader2 size={13} className="animate-spin text-accent" />
                    <span className="font-mono text-[10px] text-ink-soft uppercase tracking-wider">
                      Analyzing structures...
                    </span>
                  </div>
                </div>
              )}

              {/* Error block */}
              {errorMsg && (
                <div className="bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 p-3 rounded-xl border border-rose-100 text-[10px] leading-relaxed space-y-1">
                  <p className="font-semibold">Gemini API Key Missing</p>
                  <p>
                    Please verify that the <strong>GEMINI_API_KEY</strong> is loaded into your AI Studio <strong>Settings &gt; Secrets</strong> panel. Server-side API key retrieval is mandatory.
                  </p>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Recommended starter questions */}
            {messages.length === 1 && (
              <div className="p-3 glass-card border-t border-line/40 space-y-1.5">
                <span className="block text-[9px] font-mono text-ink-soft uppercase tracking-wider mb-1">
                  💡 Suggestion prompts:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {starterQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="text-[10px] text-ink-soft hover:text-accent hover:border-accent glass-card border border-line/60 rounded-full px-2.5 py-1 text-left cursor-pointer transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 glass-card border-t border-line flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.chatPlaceholder}
                className="flex-1 bg-paper-soft border border-line rounded-xl px-3 py-2 text-xs text-ink focus:border-accent focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2 rounded-xl flex items-center justify-center cursor-pointer disabled:opacity-40 text-on-accent transition-colors"
                style={{ background: 'linear-gradient(135deg, #2D5A4E 0%, #4ECDC4 100%)' }}
              >
                <Send size={15} className="text-white" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
