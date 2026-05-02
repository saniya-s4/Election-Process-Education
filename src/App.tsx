/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Vote, 
  MapPin, 
  MessageSquare, 
  Clock, 
  HelpCircle, 
  Languages,
  Mic,
  Volume2,
  ChevronRight,
  Menu,
  X,
  Trophy,
  Info,
  Bell,
  Smartphone,
  BarChart3,
  Home
} from 'lucide-react';
import { cn } from './lib/utils';
import { STATES_DATA, ELECTION_TIMELINE, QUIZ_QUESTIONS } from './data/electionData';
import { chatWithGemini, textToSpeech } from './lib/gemini';
import ReactMarkdown from 'react-markdown';

// Components
import Assistant from './components/Assistant';
import Timeline from './components/Timeline';
import StateGuide from './components/StateGuide';
import Quiz from './components/Quiz';
import FAQ from './components/FAQ';
import Reminders from './components/Reminders';
import DarkModeToggle from './components/DarkModeToggle';
import ElectionResults from './components/ElectionResults';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'timeline' | 'states' | 'quiz' | 'assistant' | 'faq' | 'reminders' | 'results'>('home');
  const [language, setLanguage] = useState('English');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { id: 'home', label: 'Overview', icon: Home },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'states', label: 'State Guide', icon: MapPin },
    { id: 'results', label: 'Results', icon: BarChart3 },
    { id: 'reminders', label: 'Reminders', icon: Bell },
    { id: 'faq', label: 'FAQ', icon: Info },
    { id: 'quiz', label: 'Voter Quiz', icon: Trophy },
    { id: 'assistant', label: 'AI Assistant', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] dark:bg-[#000000] text-[#1a1a1a] dark:text-white font-sans selection:bg-orange-100 dark:selection:bg-orange-950 selection:text-orange-900 dark:selection:text-orange-200 transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-orange-100 dark:border-orange-900/40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="p-2 bg-orange-600 rounded-lg icon-glow-orange">
              <Vote className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-orange-900 dark:text-orange-500">Matadhikar</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2 bg-gray-50 dark:bg-gray-900/50 p-1.5 rounded-full border border-gray-100 dark:border-gray-800">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-2 rounded-full transition-colors text-sm font-medium outline-none",
                    isActive 
                      ? "text-orange-700 dark:text-orange-400" 
                      : "text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-300"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-orange-100 dark:bg-orange-900/40 rounded-full"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <DarkModeToggle />
            <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-full shadow-sm">
              <Languages className="w-4 h-4 text-gray-400" />
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-sm focus:outline-none cursor-pointer dark:text-zinc-200"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Bengali</option>
                <option>Telugu</option>
                <option>Tamil</option>
                <option>Marathi</option>
                <option>Gujarati</option>
                <option>Kannada</option>
                <option>Malayalam</option>
              </select>
            </div>
            <button 
              className="md:hidden p-2 hover:bg-orange-50 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden fixed inset-0 z-40 bg-white pt-20"
          >
            <div className="flex flex-col gap-2 px-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setIsMenuOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-2xl transition-all text-lg font-medium",
                    activeTab === tab.id 
                      ? "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400" 
                      : "text-gray-500 dark:text-gray-400"
                  )}
                >
                  <tab.icon className="w-6 h-6" />
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Hero Section */}
              <section className="relative overflow-hidden min-h-[60vh] flex items-center">
                <div className="absolute top-0 right-0 p-8 opacity-5 select-none pointer-events-none hidden lg:block">
                  <Vote size={600} className="text-orange-900 dark:text-orange-500" />
                </div>
                
                <div className="relative z-10 max-w-4xl space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400 rounded-full text-xs font-black uppercase tracking-widest animate-fade-in">
                    <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" />
                    Indian Election 2026 Guide
                  </div>
                  
                  <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif italic text-orange-950 dark:text-orange-500 leading-[0.85] tracking-tight">
                    Power to <br />
                    <span className="text-orange-600 dark:text-orange-400">The People.</span>
                  </h1>
                  
                  <div className="flex flex-col md:flex-row gap-8 items-start md:items-center pt-8">
                    <p className="text-xl text-gray-500 dark:text-gray-400 max-w-md leading-relaxed font-light italic">
                      Navigating the world's largest democratic process, simplified for every citizen.
                    </p>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setActiveTab('assistant')}
                        className="w-20 h-20 bg-orange-600 text-white rounded-full flex items-center justify-center hover:bg-orange-700 hover:scale-110 transition-all shadow-xl shadow-orange-200 dark:shadow-none icon-glow-orange glow-button group"
                      >
                        <MessageSquare className="group-hover:rotate-12 transition-transform" />
                      </button>
                      <button 
                        onClick={() => setActiveTab('timeline')}
                        className="px-8 py-4 bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-zinc-800 text-gray-900 dark:text-gray-100 rounded-full font-bold hover:bg-orange-50 dark:hover:bg-[#111111] transition-all shadow-sm"
                      >
                        The Process
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Quick Stats/Links */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Registration", desc: "Form 6 is for new voters. Register online @ nvsp.in", icon: Clock, color: "bg-blue-50 dark:bg-[#111111] text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-900/20 shadow-sm" },
                  { title: "Identify Card", desc: "EPIC (Voter ID) is mandatory, but other IDs are accepted too.", icon: Vote, color: "bg-green-50 dark:bg-[#111111] text-green-700 dark:text-green-400 border-green-100 dark:border-green-900/20 shadow-sm" },
                  { title: "Find Polling Station", desc: "Located within 2km of your residence.", icon: MapPin, color: "bg-purple-50 dark:bg-[#111111] text-purple-700 dark:text-purple-400 border-purple-100 dark:border-purple-900/20 shadow-sm" },
                ].map((item, idx) => (
                  <div key={idx} className={cn("p-6 rounded-3xl border flex flex-col gap-4 transition-all hover:scale-[1.02]", item.color)}>
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#1a1a1a] flex items-center justify-center shadow-sm border dark:border-zinc-800">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-sm opacity-80 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </section>

              {/* State Spotlight */}
              <section className="bg-orange-50 dark:bg-orange-950/20 rounded-[2rem] p-8 border dark:border-orange-900/30">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-orange-900 dark:text-orange-500">Election Rules vary by State?</h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
                      While most rules are national, specific forms, help-line processing, and certain identity verifications can have state-specific nuances. Our state guide helps you find the right contacts.
                    </p>
                    <button 
                      onClick={() => setActiveTab('states')}
                      className="px-6 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all flex items-center gap-2 mx-auto md:ml-0 shadow-lg glow-button icon-glow-orange"
                    >
                      Select Your State
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2 flex-1 rotate-3 h-48 w-full md:w-auto">
                    {STATES_DATA.slice(0, 9).map((s) => (
                      <div key={s.id} className="bg-white dark:bg-[#0A0A0A] p-2 rounded-lg shadow-sm border border-orange-100 dark:border-zinc-800 flex items-center justify-center text-xs font-bold text-orange-400">
                        {s.name}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'assistant' && <Assistant language={language} />}
          {activeTab === 'timeline' && <Timeline />}
          {activeTab === 'states' && <StateGuide />}
          {activeTab === 'results' && <ElectionResults />}
          {activeTab === 'reminders' && <Reminders />}
          {activeTab === 'faq' && <FAQ />}
          {activeTab === 'quiz' && <Quiz />}
        </AnimatePresence>
      </main>

      <footer className="border-t border-gray-100 dark:border-zinc-900 bg-white dark:bg-[#0A0A0A] py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-600 rounded-lg icon-glow-orange shadow-orange-600/20">
              <Vote className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold dark:text-orange-500">Matadhikar</span>
          </div>
          <p className="text-sm text-gray-400 dark:text-zinc-600">© 2026 Interactive Voter Guide • Data from Election Commission of India</p>
          <div className="flex gap-6 text-sm font-medium text-gray-500 dark:text-zinc-500">
            <a href="#" className="hover:text-orange-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-orange-600 transition-colors">Contact ECI</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

