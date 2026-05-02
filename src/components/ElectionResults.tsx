import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line } from 'recharts';
import { ELECTION_RESULTS_DATA } from '../data/electionData';
import { Trophy, TrendingUp, Map, BarChart3, ChevronRight, Info } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ElectionResults() {
  const [activeView, setActiveView] = useState<'national' | 'states' | 'trends'>('national');

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 border border-orange-100 dark:border-orange-900/30 rounded-2xl shadow-xl">
          <p className="font-bold text-gray-900 dark:text-gray-100">{payload[0].name || payload[0].payload.party}</p>
          <p className="text-orange-600 font-mono font-bold">
            {payload[0].value} {payload[0].name === 'voteShare' ? '%' : 'Seats'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-500 rounded-full text-xs font-black uppercase tracking-widest">
            <Trophy size={14} className="icon-glow-orange" /> Live Results
          </div>
          <h2 className="text-5xl md:text-7xl font-serif italic text-orange-950 dark:text-orange-600 leading-none">
            2026 Verdict.
          </h2>
        </div>

        <div className="flex bg-gray-100 dark:bg-zinc-950 p-1 rounded-2xl border border-gray-200 dark:border-zinc-900">
          {[
            { id: 'national', label: 'National', icon: BarChart3 },
            { id: 'states', label: 'States', icon: Map },
            { id: 'trends', label: 'Trends', icon: TrendingUp },
          ].map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id as any)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all",
                activeView === view.id
                  ? "bg-white dark:bg-zinc-900 text-orange-600 dark:text-orange-500 shadow-sm"
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-zinc-400"
              )}
            >
              <view.icon size={18} className={activeView === view.id ? "icon-glow-orange" : ""} />
              {view.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeView === 'national' && (
          <motion.div
            key="national"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="bg-white dark:bg-zinc-950 p-8 rounded-[3rem] border border-orange-100 dark:border-orange-900/40 shadow-sm">
              <h3 className="text-2xl font-bold mb-8 dark:text-white">Seat Distribution</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ELECTION_RESULTS_DATA.national}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={140}
                      paddingAngle={5}
                      dataKey="seats"
                      nameKey="party"
                    >
                      {ELECTION_RESULTS_DATA.national.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-950 p-8 rounded-[3rem] border border-orange-100 dark:border-orange-900/40 shadow-sm flex flex-col">
              <h3 className="text-2xl font-bold mb-8 dark:text-white">Vote Share %</h3>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ELECTION_RESULTS_DATA.national} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="party" type="category" hide />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="voteShare" radius={[0, 10, 10, 0]}>
                      {ELECTION_RESULTS_DATA.national.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} opacity={0.9} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4 mt-8">
                {ELECTION_RESULTS_DATA.national.map((party) => (
                  <div key={party.party} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full icon-glow" style={{ backgroundColor: party.color, boxShadow: `0 0 8px ${party.color}` }} />
                      <span className="font-bold dark:text-white">{party.party}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-mono font-bold dark:text-orange-500">{party.seats} seats</p>
                      <p className="text-xs text-gray-400 font-bold uppercase">{party.voteShare}% Votes</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'states' && (
          <motion.div
            key="states"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {ELECTION_RESULTS_DATA.statesWins.map((state, idx) => (
              <motion.div
                key={state.state}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-zinc-950 p-6 rounded-3xl border border-gray-100 dark:border-zinc-900 shadow-sm hover:shadow-xl hover:border-orange-500 transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-lg font-bold dark:text-white">{state.state}</h4>
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full",
                      state.lead === 'High' ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-500" : "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-500"
                    )}>
                      {state.lead} Margin
                    </span>
                  </div>
                  <div className="w-10 h-10 bg-gray-50 dark:bg-zinc-900 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-orange-600 group-hover:text-white transition-all">
                    <ChevronRight size={20} />
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800">
                  <div 
                    className="w-10 h-10 rounded-xl icon-glow" 
                    style={{ 
                      backgroundColor: ELECTION_RESULTS_DATA.national.find(p => p.party === state.winner)?.color || '#ccc',
                      boxShadow: `0 0 10px ${ELECTION_RESULTS_DATA.national.find(p => p.party === state.winner)?.color || '#ccc'}`
                    }} 
                  />
                  <div>
                    <p className="text-xs text-gray-400 dark:text-zinc-500 font-bold uppercase">Leading Party</p>
                    <p className="font-bold dark:text-white">{state.winner}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeView === 'trends' && (
          <motion.div
            key="trends"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-zinc-950 p-8 rounded-[3rem] border border-orange-100 dark:border-orange-900/40 shadow-sm"
          >
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-2xl font-bold dark:text-white">Live Seat Tally Trends</h3>
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#EA580C] icon-glow shadow-orange-500/50" /> Party A</span>
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#2563EB] icon-glow shadow-blue-500/50" /> Party B</span>
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#16A34A] icon-glow shadow-green-500/50" /> Party C</span>
              </div>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ELECTION_RESULTS_DATA.trends}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.05} />
                  <XAxis dataKey="time" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', borderRadius: '16px', border: '1px solid #333', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
                  />
                  <Line type="monotone" dataKey="partyA" stroke="#EA580C" strokeWidth={4} dot={{ r: 6, fill: '#EA580C', strokeWidth: 0 }} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="partyB" stroke="#2563EB" strokeWidth={4} dot={{ r: 6, fill: '#2563EB', strokeWidth: 0 }} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="partyC" stroke="#16A34A" strokeWidth={4} dot={{ r: 6, fill: '#16A34A', strokeWidth: 0 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-orange-950 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center gap-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 pointer-events-none">
          <Info size={160} />
        </div>
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
          <Info className="text-orange-400" />
        </div>
        <div className="space-y-2 relative z-10">
          <h4 className="text-xl font-bold">Data Source & Accuracy</h4>
          <p className="text-orange-200/60 leading-relaxed max-w-2xl text-sm italic">
            These results are mock representations for demonstration. Official data is exclusively provided by the Election Commission of India at results.eci.gov.in. Always refer to official portals for final counts.
          </p>
        </div>
      </div>
    </div>
  );
}
