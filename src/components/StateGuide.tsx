import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Phone, ExternalLink, Info, ShieldCheck, ChevronRight, Smartphone } from 'lucide-react';
import { STATES_DATA } from '../data/electionData';
import { cn } from '../lib/utils';
import ReadAloudButton from './ReadAloudButton';

export default function StateGuide() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState<typeof STATES_DATA[0] | null>(null);

  const filteredStates = STATES_DATA.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-16 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-b border-gray-100 dark:border-zinc-900 pb-12">
        <div className="space-y-6">
          <h2 className="text-6xl md:text-8xl font-serif italic text-orange-950 dark:text-orange-600 leading-none">The States.</h2>
          <p className="text-xl text-gray-400 dark:text-zinc-500 font-light max-w-sm italic">Each territory, a unique chapter in Indian democracy.</p>
        </div>
        
        <div className="w-full md:w-96 relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-600" size={20} />
          <input 
            type="text"
            placeholder="Find your state or language..."
            className="w-full bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-full py-6 pl-16 pr-8 focus:ring-4 focus:ring-orange-100 dark:focus:ring-orange-950 outline-none transition-all shadow-xl shadow-orange-900/5 dark:shadow-none font-bold dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredStates.length > 0 ? (
        <motion.div 
          layout
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 border-l border-t border-gray-100 dark:border-zinc-900"
        >
          {filteredStates.map((state) => (
            <motion.button
              key={state.id}
              layout
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                show: { opacity: 1, scale: 1 }
              }}
              whileHover={{ scale: 1.05, zIndex: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedState(state)}
              className={cn(
                "p-10 border-r border-b border-gray-100 dark:border-zinc-900 transition-all text-left space-y-4 group relative overflow-hidden",
                selectedState?.id === state.id ? "bg-orange-50 dark:bg-orange-950/20" : "bg-white dark:bg-[#0A0A0A] hover:bg-gray-50 dark:hover:bg-[#111111]"
              )}
            >
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-300 dark:text-zinc-600 group-hover:text-orange-400 transition-colors">
                  {state.id}
              </div>
              <span className={cn(
                  "block text-lg font-bold leading-tight transition-all duration-500",
                  selectedState?.id === state.id ? "text-orange-600 dark:text-orange-500 scale-110 translate-x-2" : "text-gray-900 dark:text-white"
              )}>
                  {state.name}
              </span>
              {selectedState?.id === state.id && (
                  <motion.div 
                    layoutId="activeStateUnderline"
                    className="absolute bottom-0 left-0 w-full h-1 bg-orange-600 shadow-[0_0_15px_rgba(234,88,12,0.5)]" 
                  />
              )}
            </motion.button>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 text-center space-y-4"
        >
          <div className="w-20 h-20 bg-orange-50 dark:bg-zinc-900 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-500 mx-auto">
            <Search size={32} />
          </div>
          <h3 className="text-2xl font-bold dark:text-white">No states found</h3>
          <p className="text-gray-500 dark:text-zinc-500 max-w-xs mx-auto">We couldn't find any state matching "{searchTerm}". Try a different search term.</p>
          <button 
            onClick={() => setSearchTerm('')}
            className="text-orange-600 font-bold hover:underline"
          >
            Clear Search
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {selectedState && (
            <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="bg-[#0A0A0A] rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl"
            >
            <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
                <MapPin size={400} />
            </div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-20">
                <div className="space-y-12">
                <div>
                    <h3 className="text-6xl md:text-8xl font-serif italic mb-6 leading-none">{selectedState.name}</h3>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck size={14} /> ECI Verified Channel
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <p className="text-[10px] text-orange-500 font-black uppercase tracking-widest">Official Helpline</p>
                        <p className="text-4xl font-mono font-bold tracking-tighter">{selectedState.helpline}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[10px] text-orange-500 font-black uppercase tracking-widest">Primary Language</p>
                        <p className="text-2xl font-bold">{selectedState.language}</p>
                    </div>
                </div>

                <div className="space-y-4">
                     <p className="text-orange-100/60 leading-relaxed font-light text-lg italic">
                        "Registration process for {selectedState.name} is handled by the office of the Chief Electoral Officer. Please ensure you have local address proof as specified by {selectedState.name} regulations."
                    </p>
                    <ReadAloudButton 
                        text={`Voters in ${selectedState.name} can submit Form 6 for new registrations through the CEO ${selectedState.name} portal or NVSP. For address changes within ${selectedState.name}, use Form 8.`} 
                        className="bg-white/5 border border-white/10 hover:bg-white/10"
                    />
                </div>
                </div>

                <div className="flex flex-col gap-3 justify-center">
                    <p className="text-[10px] text-orange-500 font-black uppercase tracking-widest mb-4">Official Resources</p>
                    {[
                        { label: "Electoral Roll Search", icon: ExternalLink, primary: true },
                        { label: "District Officer Directory", icon: Smartphone, primary: false },
                        { label: `CEO ${selectedState.name} Portal`, icon: ExternalLink, primary: false }
                    ].map((btn, i) => (
                        <button key={i} className={cn(
                            "flex items-center justify-between p-8 rounded-3xl transition-all font-bold group",
                            btn.primary ? "bg-orange-600 text-white hover:bg-orange-700" : "bg-white/5 border border-white/10 hover:bg-white/10"
                        )}>
                            <span className="text-xl">{btn.label}</span>
                            <btn.icon size={24} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                        </button>
                    ))}
                </div>
            </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
