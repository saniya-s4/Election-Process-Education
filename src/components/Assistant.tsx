import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Bot, Volume2, Mic, MicOff, RefreshCcw, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { chatWithGemini, textToSpeech } from '../lib/gemini';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
  feedback?: 'up' | 'down' | null;
}

export default function Assistant({ language }: { language: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithGemini(input, messages, language);
      const botMessage: Message = { role: 'model', parts: [{ text: response || '' }] };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = { role: 'model', parts: [{ text: "I'm sorry, I encountered an error. Please try again." }] };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = (index: number, type: 'up' | 'down') => {
    setMessages(prev => prev.map((m, i) => 
      i === index ? { ...m, feedback: m.feedback === type ? null : type } : m
    ));
  };

  const handleSpeak = async (text: string) => {
    if (isSpeaking) {
      audioRef.current?.pause();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    const audio = await textToSpeech(text);
    if (audio) {
      audioRef.current = audio;
      audio.onended = () => setIsSpeaking(false);
      audio.play();
    } else {
      setIsSpeaking(false);
    }
  };

  // Browser Speech Recognition
  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'Hindi' ? 'hi-IN' : 'en-IN';
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto h-[70vh] bg-white dark:bg-[#000000] rounded-[2.5rem] shadow-xl border border-orange-100 dark:border-orange-900/40 flex flex-col overflow-hidden transition-colors duration-300"
    >
      <div className="p-6 bg-orange-50 dark:bg-zinc-950 border-b border-orange-100 dark:border-orange-900/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-200 dark:shadow-none icon-glow-orange">
            <Bot className="text-white w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-orange-900 dark:text-orange-400">Election Assistant</h3>
            <p className="text-xs text-orange-600 dark:text-orange-500 font-medium tracking-wide flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Active • {language}
            </p>
          </div>
        </div>
        <button 
          onClick={() => setMessages([])}
          className="p-2 hover:bg-orange-100 dark:hover:bg-zinc-900 rounded-full text-orange-600 dark:text-orange-400 transition-colors"
          title="Clear Conversation"
        >
          <RefreshCcw size={18} />
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-orange-200 dark:scrollbar-thumb-zinc-800"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 bg-orange-50 dark:bg-[#0A0A0A] rounded-3xl flex items-center justify-center mb-6">
              <MessageSquare className="text-orange-300 dark:text-orange-600 w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">How can I help you vote?</h4>
            <p className="text-gray-400 dark:text-zinc-500 max-w-sm mb-8 text-lg">Ask about registration, documents required, or your specific state rules from ECI guidelines.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
              {[
                "How do I register for Form 6?",
                "Documents for Voter ID?",
                "Check my name in voter list",
                "State specific regulations"
              ].map((q) => (
                <button 
                  key={q}
                  onClick={() => { setInput(q); }}
                  className="p-4 text-sm font-bold text-gray-700 dark:text-zinc-300 bg-gray-50 dark:bg-[#0A0A0A] rounded-xl hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:text-orange-600 dark:hover:text-orange-400 border border-gray-100 dark:border-zinc-800 transition-all text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex gap-4 max-w-[85%]",
              m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            <div className={cn(
              "w-8 h-8 shrink-0 rounded-full flex items-center justify-center shadow-sm",
              m.role === 'user' ? "bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400" : "bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400"
            )}>
              {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className="space-y-2">
              <div className={cn(
                "p-4 rounded-3xl text-sm leading-relaxed shadow-sm",
                m.role === 'user' 
                  ? "bg-orange-600 text-white rounded-tr-none shadow-orange-900/10" 
                  : "bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-zinc-800 rounded-tl-none text-gray-800 dark:text-zinc-100"
              )}>
                <div className="markdown-body">
                  <ReactMarkdown>
                    {m.parts[0].text}
                  </ReactMarkdown>
                </div>
              </div>
              {m.role === 'model' && (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleSpeak(m.parts[0].text)}
                    className={cn(
                      "p-2 rounded-full transition-all flex items-center gap-2 text-xs font-semibold",
                      isSpeaking ? "bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400" : "text-gray-400 dark:text-gray-500 hover:text-orange-600 dark:hover:text-orange-400"
                    )}
                  >
                    <Volume2 size={14} className={isSpeaking ? "animate-bounce" : ""} />
                    {isSpeaking ? "Speaking..." : "Read Aloud"}
                  </button>
                  
                  <div className="flex items-center gap-1 ml-2 border-l border-gray-100 dark:border-zinc-800 pl-3">
                    <button 
                      onClick={() => handleFeedback(idx, 'up')}
                      className={cn(
                        "p-1.5 rounded-lg transition-all",
                        m.feedback === 'up' 
                          ? "bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-500" 
                          : "text-gray-400 hover:bg-green-50 dark:hover:bg-green-950/20 hover:text-green-600 dark:hover:text-green-500"
                      )}
                      title="Helpful"
                    >
                      <ThumbsUp size={14} fill={m.feedback === 'up' ? "currentColor" : "none"} />
                    </button>
                    <button 
                      onClick={() => handleFeedback(idx, 'down')}
                      className={cn(
                        "p-1.5 rounded-lg transition-all",
                        m.feedback === 'down' 
                          ? "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-500" 
                          : "text-gray-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-500"
                      )}
                      title="Not helpful"
                    >
                      <ThumbsDown size={14} fill={m.feedback === 'down' ? "currentColor" : "none"} />
                    </button>
                    {m.feedback && (
                      <motion.span 
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 italic ml-1"
                      >
                        Thanks!
                      </motion.span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <div className="flex gap-4 mr-auto max-w-[85%]">
            <div className="w-8 h-8 shrink-0 rounded-full bg-gray-100 dark:bg-zinc-900 text-gray-400 dark:text-zinc-500 flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="bg-white dark:bg-zinc-950 border border-gray-50 dark:border-zinc-800 p-4 rounded-3xl rounded-tl-none">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-orange-200 dark:bg-orange-950 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-orange-300 dark:bg-orange-900 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-orange-400 dark:bg-orange-800 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-900 transition-colors duration-300">
        <form onSubmit={handleSend} className="relative flex items-center gap-2">
          <button 
            type="button"
            onClick={startListening}
            className={cn(
              "p-4 rounded-2xl transition-all shadow-sm",
              isListening ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 dark:bg-zinc-950 text-gray-500 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-400"
            )}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask in ${language}...`}
            className="flex-1 bg-gray-50 dark:bg-zinc-950 border-none rounded-2xl p-4 pr-16 focus:ring-2 focus:ring-orange-500 outline-none transition-all dark:text-white"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 px-6 py-2 bg-orange-600 text-white rounded-xl shadow-lg shadow-orange-200 dark:shadow-none hover:bg-orange-700 disabled:opacity-50 disabled:shadow-none transition-all flex items-center gap-2"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </motion.div>
  );
}
