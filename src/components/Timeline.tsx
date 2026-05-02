import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { ELECTION_TIMELINE } from '../data/electionData';
import { cn } from '../lib/utils';
import ReadAloudButton from './ReadAloudButton';

export default function Timeline() {
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  return (
    <div className="max-w-6xl mx-auto space-y-24 py-12">
      <div className="space-y-6">
        <h2 className="text-8xl md:text-[12rem] font-serif italic text-orange-950 dark:text-orange-500 leading-none tracking-tighter opacity-10 absolute -top-10 left-0 select-none pointer-events-none">
          Process
        </h2>
        <div className="relative z-10 pt-12">
            <h3 className="text-4xl md:text-6xl font-bold text-orange-900 dark:text-orange-500 leading-tight">
                The Path to <br/>
                <span className="font-serif italic font-light text-gray-900 dark:text-gray-100">Democratic Participation.</span>
            </h3>
            <p className="text-gray-400 dark:text-gray-500 mt-6 max-w-sm font-medium">A step-by-step guide from being a citizen to becoming a voter.</p>
        </div>
      </div>

      <motion.div 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15
            }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12"
      >
          {ELECTION_TIMELINE.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.3 } }
              }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "group relative p-10 rounded-[3rem] transition-all duration-500 border overflow-hidden cursor-pointer",
                expandedStep === idx 
                  ? "bg-white dark:bg-[#0A0A0A] border-orange-200 dark:border-orange-900 shadow-2xl dark:shadow-none z-10" 
                  : "bg-transparent border-gray-100 dark:border-zinc-900 hover:border-orange-100 dark:hover:border-orange-900/40"
              )}
              onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}
            >
              <motion.div 
                animate={{ 
                  scale: expandedStep === idx ? 1.2 : 1,
                  opacity: expandedStep === idx ? 0.05 : 0.1
                }}
                className="absolute top-0 right-0 p-8 text-8xl font-serif italic text-orange-50 dark:text-gray-900 transition-colors select-none pointer-events-none"
              >
                0{item.step}
              </motion.div>

              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 bg-orange-50 dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-500 shadow-sm border border-orange-100 dark:border-orange-950/20 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-500 icon-glow-orange shadow-orange-500/10">
                    <CheckCircle2 size={32} />
                </div>
                
                <div>
                    <h4 className="text-2xl font-bold text-orange-950 dark:text-gray-100 mb-2">{item.title}</h4>
                    <p className={cn(
                        "text-gray-500 dark:text-gray-400 leading-relaxed font-medium transition-all duration-500",
                        expandedStep === idx ? "opacity-100" : "line-clamp-2 opacity-60"
                    )}>
                        {expandedStep === idx ? item.longDesc : item.description}
                    </p>
                </div>

                {expandedStep === idx && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pt-4 flex flex-col gap-6"
                    >
                        <ReadAloudButton text={item.longDesc} />
                        <div className="flex gap-2">
                            <span className="px-4 py-1.5 bg-orange-950 dark:bg-orange-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Mandatory</span>
                            <span className="px-4 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-900 dark:text-orange-300 rounded-full text-[10px] font-black uppercase tracking-widest">ECI Regulated</span>
                        </div>
                    </motion.div>
                )}

                {!expandedStep && expandedStep !== 0 && (
                    <div className="text-orange-400 dark:text-orange-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                        Learn More <ChevronDown size={14} />
                    </div>
                )}
              </div>
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
}
