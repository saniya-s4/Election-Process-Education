import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Trophy, RefreshCcw, CheckCircle2, XCircle, Vote } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/electionData';
import { cn } from '../lib/utils';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleOptionSelect = (option: string) => {
    if (selectedOption) return;
    
    setSelectedOption(option);
    const correct = option === QUIZ_QUESTIONS[currentQuestion].answer;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);

    setTimeout(() => {
      if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div 
                key="quiz"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white dark:bg-[#0A0A0A] rounded-[3rem] p-10 md:p-16 shadow-2xl dark:shadow-none border border-orange-100 dark:border-orange-950/40 flex flex-col min-h-[500px]"
              >
                <div className="flex justify-between items-center mb-12">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-200 dark:shadow-none icon-glow-orange">
                        <HelpCircle size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500">Knowledge Test</p>
                        <p className="text-sm font-bold text-orange-950 dark:text-orange-500">Q{currentQuestion + 1} / {QUIZ_QUESTIONS.length}</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-3xl md:text-5xl font-serif italic text-orange-950 dark:text-gray-100 mb-12 leading-[1.1]">
                  {QUIZ_QUESTIONS[currentQuestion].question}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                  {QUIZ_QUESTIONS[currentQuestion].options.map((option) => (
                    <motion.button
                      key={option}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOptionSelect(option)}
                      disabled={!!selectedOption}
                      className={cn(
                        "p-6 rounded-[2rem] text-left font-bold transition-all flex items-center justify-between border-2",
                        !selectedOption && "bg-gray-50 dark:bg-black border-transparent text-gray-900 dark:text-white hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:border-orange-600 dark:hover:border-orange-500",
                        selectedOption === option && (isCorrect ? "bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-400" : "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-400"),
                        selectedOption !== option && selectedOption && option === QUIZ_QUESTIONS[currentQuestion].answer ? "bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-400" : ""
                      )}
                    >
                      {option}
                      {selectedOption === option && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          {isCorrect ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                        </motion.div>
                      )}
                      {selectedOption !== option && selectedOption && option === QUIZ_QUESTIONS[currentQuestion].answer && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <CheckCircle2 size={24} />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-[#0A0A0A] rounded-[3rem] p-16 text-center shadow-2xl text-white relative h-full flex flex-col justify-center border dark:border-zinc-800"
              >
                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <Trophy size={200} />
                </div>
                
                <div className="w-32 h-32 bg-orange-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-orange-900/20 rotate-12">
                  <Trophy className="text-white w-16 h-16" />
                </div>
                
                <h2 className="text-5xl font-serif italic mb-4">Certified <br/><span className="text-orange-500">Informed Voter.</span></h2>
                <div className="text-7xl font-black font-mono tracking-tighter mb-8">
                    {score}/{QUIZ_QUESTIONS.length}
                </div>
                
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={resetQuiz}
                    className="w-full py-5 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-50 transition-all dark:bg-orange-600 dark:text-white dark:hover:bg-orange-700"
                  >
                    <RefreshCcw size={20} /> Try Again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="md:w-80 space-y-6">
            <div className="bg-orange-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute -bottom-10 -right-10 opacity-20 group-hover:scale-110 transition-transform">
                    <Vote size={150} />
                </div>
                <h4 className="text-xl font-bold mb-8 italic">Quick Poll</h4>
                <p className="text-orange-100 mb-8 text-sm font-medium leading-relaxed">What feature helps you the most during elections?</p>
                <div className="space-y-6">
                    {[
                    { label: "AI Guide", votes: "42%" },
                    { label: "Checklists", votes: "28%" },
                    { label: "Deadlines", votes: "30%" }
                    ].map((option) => (
                    <div key={option.label} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-80">
                        <span>{option.label}</span>
                        <span>{option.votes}</span>
                        </div>
                        <div className="h-2 bg-orange-900/30 dark:bg-orange-950/50 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: option.votes }}
                            className="h-full bg-white"
                        />
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[2.5rem] p-8">
                <h4 className="text-lg font-bold mb-4 dark:text-gray-100">Why it matters?</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed italic">
                    "Democracy is constant education. Knowing the rules makes you a more effective citizen."
                </p>
                <div className="mt-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700" />
                    <div>
                        <p className="text-xs font-bold text-gray-900 dark:text-gray-100">Election Watch</p>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase">Public Interest</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
