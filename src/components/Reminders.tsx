import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, BellOff, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { IMPORTANT_DATES } from '../data/electionData';
import { cn } from '../lib/utils';

export default function Reminders() {
  const [reminders, setReminders] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('voter_reminders');
    if (saved) setReminders(JSON.parse(saved));
  }, []);

  const toggleReminder = (id: string, title: string) => {
    let newReminders;
    if (reminders.includes(id)) {
      newReminders = reminders.filter(r => r !== id);
      showNotification(`Reminder removed for: ${title}`);
    } else {
      newReminders = [...reminders, id];
      requestNotificationPermission();
      showNotification(`Reminder set for: ${title}`);
    }
    setReminders(newReminders);
    localStorage.setItem('voter_reminders', JSON.stringify(newReminders));
  };

  const requestNotificationPermission = () => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  };

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-500 rounded-full text-xs font-bold uppercase tracking-widest">
            Stay Informed
          </div>
          <h2 className="text-4xl md:text-5xl font-serif italic text-orange-950 dark:text-orange-600">Never Miss a <span className="text-orange-600 dark:text-orange-500">Deadline</span>.</h2>
          <p className="text-gray-500 dark:text-zinc-400 max-w-lg">Set reminders for crucial election milestones. We'll help you stay prepared for every step of the democratic process.</p>
        </div>
        
        <div className="flex gap-4">
            <div className="p-4 bg-white dark:bg-[#0A0A0A] rounded-2xl border border-orange-100 dark:border-orange-950/40 flex items-center gap-4 shadow-sm">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-950/40 rounded-xl flex items-center justify-center text-orange-600 dark:text-orange-500 icon-glow-orange">
                    <Bell size={20} />
                </div>
                <div>
                    <p className="text-xs text-gray-400 dark:text-zinc-500 font-bold uppercase">Active</p>
                    <p className="text-xl font-bold font-mono dark:text-white">{reminders.length}</p>
                </div>
            </div>
        </div>
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {IMPORTANT_DATES.map((item) => {
          const isActive = reminders.includes(item.id);
          const dateObj = new Date(item.date);
          const isPast = dateObj < new Date();

          return (
            <motion.div 
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -5 }}
              className={cn(
                "group relative p-8 rounded-[2.5rem] border transition-all duration-500 overflow-hidden",
                isActive 
                  ? "bg-white dark:bg-[#0A0A0A] border-orange-500 shadow-[0_20px_50px_rgba(234,88,12,0.15)] dark:shadow-none" 
                  : "bg-white dark:bg-[#0A0A0A] border-gray-100 dark:border-zinc-900 hover:border-orange-200 dark:hover:border-orange-900/50"
              )}
            >
              <div className="absolute top-0 right-0 p-4">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleReminder(item.id, item.title)}
                  className={cn(
                    "p-3 rounded-2xl transition-all",
                    isActive 
                      ? "bg-orange-600 text-white shadow-lg shadow-orange-200 dark:shadow-none icon-glow-orange" 
                      : "bg-gray-50 dark:bg-zinc-900 text-gray-400 dark:text-zinc-600 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:text-orange-600 dark:hover:text-orange-500"
                  )}
                >
                  {isActive ? <Bell size={20} /> : <BellOff size={20} />}
                </motion.button>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-orange-500 dark:text-orange-600 uppercase tracking-wider mb-4">
                    {item.category}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors pr-10">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center gap-4 p-4 bg-orange-50/50 dark:bg-orange-950/10 rounded-2xl border border-orange-100/50 dark:border-orange-900/20">
                  <div className="w-12 h-12 bg-white dark:bg-black rounded-xl flex items-center justify-center text-orange-600 dark:text-orange-500 shadow-sm border border-orange-100 dark:border-orange-900/20 icon-glow-orange">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 dark:text-zinc-500 font-black uppercase tracking-tighter">Date</p>
                    <p className="text-lg font-mono font-bold leading-none dark:text-orange-600">{item.date}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed font-medium">
                  {item.description}
                </p>

                <div className="flex items-center gap-2 pt-2">
                  {isPast ? (
                    <div className="flex items-center gap-1.5 text-red-500 dark:text-red-600 text-xs font-bold">
                        <AlertCircle size={14} /> Passed
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-green-500 dark:text-green-600 text-xs font-bold">
                        <Clock size={14} /> Upcoming
                    </div>
                  )}
                </div>
              </div>

              {isActive && (
                <motion.div 
                  layoutId={`active_bar_${item.id}`}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-orange-600 shadow-[0_0_15px_rgba(234,88,12,0.5)]" 
                />
              )}
            </motion.div>
          )
        })}
      </motion.div>

      <div className="p-10 bg-orange-950 dark:bg-orange-900/10 border dark:border-orange-900/20 rounded-[3rem] text-white dark:text-orange-50 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
            <Bell size={200} />
        </div>
        <div className="relative z-10 max-w-xl">
            <h3 className="text-3xl font-serif italic mb-4">Notification Settings</h3>
            <p className="text-orange-200/70 dark:text-orange-200/50 mb-8 font-medium">
                We use browser-based notifications to keep you updated. No account needed, all data stays on your device.
            </p>
            <div className="flex flex-wrap gap-4">
                <button className="px-8 py-3 bg-white dark:bg-orange-600 text-orange-950 dark:text-white rounded-xl font-bold hover:bg-orange-50 dark:hover:bg-orange-700 transition-all flex items-center gap-2">
                    <CheckCircle size={18} /> Test Notification
                </button>
                <button className="px-8 py-3 bg-orange-900 dark:bg-gray-800 text-white rounded-xl font-bold border border-orange-800 dark:border-gray-700 hover:bg-orange-800 dark:hover:bg-gray-700 transition-all">
                    Reset All
                </button>
            </div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-[100] px-6 py-4 bg-gray-900 text-white rounded-2xl shadow-2xl flex items-center gap-4 min-w-[300px]"
          >
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center">
              <Bell size={20} />
            </div>
            <p className="text-sm font-bold">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
