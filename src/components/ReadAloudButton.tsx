import { useState, useRef } from 'react';
import { Volume2 } from 'lucide-react';
import { textToSpeech } from '../lib/gemini';
import { cn } from '../lib/utils';

interface ReadAloudButtonProps {
  text: string;
  className?: string;
}

export default function ReadAloudButton({ text, className }: ReadAloudButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSpeak = async () => {
    if (isSpeaking) {
      audioRef.current?.pause();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    try {
      const audio = await textToSpeech(text);
      if (audio) {
        audioRef.current = audio;
        audio.onended = () => setIsSpeaking(false);
        audio.play();
      } else {
        setIsSpeaking(false);
      }
    } catch (error) {
      console.error("TTS Error:", error);
      setIsSpeaking(false);
    }
  };

  return (
    <button 
      onClick={(e) => {
        e.stopPropagation();
        handleSpeak();
      }}
      className={cn(
        "p-2 rounded-full transition-all flex items-center gap-2 text-xs font-semibold",
        isSpeaking 
          ? "bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-500 icon-glow-orange" 
          : "text-gray-400 dark:text-zinc-600 hover:text-orange-600 dark:hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-zinc-900",
        className
      )}
    >
      <Volume2 size={14} className={isSpeaking ? "animate-bounce" : ""} />
      {isSpeaking ? "Speaking..." : "Read Aloud"}
    </button>
  );
}
