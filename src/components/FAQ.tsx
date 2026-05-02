import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Info } from 'lucide-react';
import { FAQ_DATA } from '../data/electionData';
import { cn } from '../lib/utils';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-5xl mx-auto space-y-16 py-12">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-gray-200 dark:bg-zinc-900" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 dark:text-zinc-500">Library of Knowledge</span>
            <div className="h-[1px] flex-1 bg-gray-200 dark:bg-zinc-900" />
        </div>
        <h2 className="text-6xl md:text-[8rem] font-serif italic text-center text-orange-950 dark:text-orange-600 leading-none tracking-tight">
          Frequently <br/><span className="text-orange-600 dark:text-orange-500">Asked.</span>
        </h2>
      </div>

      <motion.div 
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        className="grid grid-cols-1 gap-px bg-gray-100 dark:bg-zinc-950 border border-gray-100 dark:border-zinc-900 rounded-[3rem] overflow-hidden shadow-2xl dark:shadow-none"
      >
        {FAQ_DATA.map((item, idx) => (
          <motion.div 
            key={idx}
            variants={{
              hidden: { opacity: 0, x: -20 },
              show: { opacity: 1, x: 0 }
            }}
            className={cn(
                "group transition-all duration-500",
                openIndex === idx ? "bg-white dark:bg-[#0A0A0A]" : "bg-gray-50/50 dark:bg-[#050505] hover:bg-white dark:hover:bg-[#0A0A0A]"
            )}
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-10 md:p-12 flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-8">
                <span className="text-sm font-mono font-bold text-orange-600 dark:text-orange-500 opacity-40">0{idx + 1}</span>
                <span className={cn(
                    "text-xl md:text-2xl font-bold transition-all duration-500",
                    openIndex === idx ? "text-orange-950 dark:text-white translate-x-2" : "text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                )}>
                    {item.question}
                </span>
              </div>
              <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500",
                  openIndex === idx ? "bg-orange-600 border-orange-600 text-white rotate-180 icon-glow-orange" : "bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 text-gray-400 dark:text-zinc-600 group-hover:border-orange-200 dark:group-hover:border-orange-950 group-hover:text-orange-600 dark:group-hover:text-orange-500"
              )}>
                <ChevronDown size={24} />
              </div>
            </button>
            
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-12 md:px-24 pb-12">
                    <div className="max-w-2xl">
                        <p className="text-lg md:text-xl text-gray-500 dark:text-zinc-400 font-light leading-relaxed italic mb-8">
                            {item.answer}
                        </p>
                        <div className="flex items-center gap-4 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-2xl border border-orange-100 dark:border-orange-900/40">
                             <div className="w-10 h-10 bg-white dark:bg-black rounded-xl flex items-center justify-center text-orange-600 dark:text-orange-500 shadow-sm icon-glow-orange">
                                <Info size={18} />
                             </div>
                             <p className="text-xs font-bold text-orange-900 dark:text-orange-400">Official ECI Guideline Reference</p>
                        </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="text-center">
        <p className="text-gray-400 text-sm font-medium">Still have questions? <span className="text-orange-600 cursor-pointer hover:underline">Connect with a Local Booth Officer</span></p>
      </div>
    </div>
  );
}
