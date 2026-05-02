import { useEffect, useRef, useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle, Menu, X, Award, BarChart3, TrendingUp, BookOpen, Search } from 'lucide-react';
import parse, { HTMLReactParserOptions, Element, attributesToProps, domToReact } from 'html-react-parser';
import { getCourseData, CourseItem, glossaryData, GlossaryTerm } from './data';

import { LandingPage } from './LandingPage';

const RaionBrand = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-col items-center ${className}`}>
    <img 
      src="https://cdn.prod.website-files.com/69540a85684e18c663c98e2d/69540a87684e18c663c99137_a4e7569f8eecee9641205b4d8b83864a_Logo.png" 
      alt="Raion" 
      className="h-10 object-contain"
      referrerPolicy="no-referrer"
    />
  </div>
);

export default function App() {
  const [isRegistered, setIsRegistered] = useState(() => {
    return localStorage.getItem('raion-academy-registered') === 'true';
  });

  const [unit, setUnit] = useState<'UK' | 'US'>(() => {
    const saved = localStorage.getItem('ai-plumber-unit');
    return (saved as 'UK' | 'US') || 'UK';
  });
  
  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = localStorage.getItem('ai-plumber-index');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [quizAnswers, setQuizAnswers] = useState<Record<number, { selectedIdx: number, isCorrect: boolean }>>(() => {
    const saved = localStorage.getItem('ai-plumber-quiz-answers-v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return {};
      }
    }
    return {};
  });
  
  const [showSidebar, setShowSidebar] = useState(false);
  const [glossaryTerm, setGlossaryTerm] = useState<string | null>(null);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const mainAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRegistered) {
      localStorage.setItem('raion-academy-registered', 'true');
    }
  }, [isRegistered]);

  useEffect(() => {
    localStorage.setItem('ai-plumber-unit', unit);
  }, [unit]);

  useEffect(() => {
    localStorage.setItem('ai-plumber-index', currentIndex.toString());
  }, [currentIndex]);

  useEffect(() => {
    localStorage.setItem('ai-plumber-quiz-answers-v2', JSON.stringify(quizAnswers));
  }, [quizAnswers]);

  const courseData = useMemo(() => getCourseData(unit), [unit]);
  const isSummary = currentIndex === courseData.length;
  const currentItem = isSummary ? null : courseData[currentIndex];
  const isQuiz = currentItem?.type === 'quiz';
  const isSimulation = currentItem?.type === 'simulation';
  // Allow next if it's a slide/simulation, or if it's a passed quiz
  const canGoNext = isSummary ? false : (!isQuiz || currentIndex in quizAnswers);

  // Auto-scroll to top when step changes
  useEffect(() => {
    if (mainAreaRef.current) {
      mainAreaRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < courseData.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleAnswerQuiz = (selectedIdx: number, isCorrect: boolean) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [currentIndex]: { selectedIdx, isCorrect }
    }));
  };

  const openGlossaryForTerm = (term: string) => {
    setGlossaryTerm(term);
    setIsGlossaryOpen(true);
  };

  if (!isRegistered) {
    return <LandingPage onRegister={() => setIsRegistered(true)} />;
  }

  return (
    <div className="flex h-screen w-full flex-col md:flex-row bg-[#0B0D12] text-slate-300 font-sans overflow-hidden">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0A0C10] border-b border-[#232836] shrink-0">
        <RaionBrand className="scale-75 origin-left" />
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setGlossaryTerm(null); setIsGlossaryOpen(true); }}
            className="p-2 bg-[#141A29] rounded-md text-[#86ACF6] hover:bg-[#1C2333] transition-colors"
          >
            <BookOpen size={18} />
          </button>
          <UnitToggle unit={unit} setUnit={setUnit} />
          <button
            onClick={() => setShowSidebar(true)}
            className="p-2 bg-[#141A29] rounded-md text-[#346EE0] hover:bg-[#1C2333] transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Sidebar - Desktop & Mobile Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 w-80 bg-[#0A0C10] border-r border-[#232836] flex flex-col shrink-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="hidden md:flex flex-col p-6 border-b border-[#232836] items-center">
          <RaionBrand />
        </div>
        
        <div className="p-5 flex items-center justify-between">
          <div className="text-[13px] uppercase tracking-widest text-[#86ACF6] font-bold font-display">
            Modules & Progress
          </div>
          <button
            onClick={() => setShowSidebar(false)}
            className="md:hidden p-1 text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-5 pb-5 space-y-1 mt-2">
          {courseData.map((item, index) => {
            const isCompleted = index < currentIndex || index in quizAnswers;
            const isActive = index === currentIndex;
            const isItemQuiz = item.type === 'quiz';
            
            const moduleNumber = Math.ceil((index + 1) / 7); // Rough logic per data
            
            const label = isItemQuiz 
              ? `[ QUIZ - MOD ${moduleNumber} ]` 
              : `${index + 1}. ${item.title?.split('.')[1]?.trim() || item.title}`;

            return (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setShowSidebar(false);
                }}
                className={`w-full text-left py-3 px-3 rounded-md text-[14px] transition-all border-l-[3px] ${
                  isActive
                    ? 'bg-[#18243E] border-[#346EE0] text-slate-100 opacity-100 font-medium tracking-wide'
                    : isCompleted
                    ? 'border-[#10B981] text-slate-400 opacity-80 hover:bg-[#141A29]'
                    : 'border-transparent text-slate-500 opacity-50 hover:bg-[#141A29] hover:opacity-80'
                } ${isItemQuiz && !isActive ? 'font-bold text-[#F59E0B]/70 bg-[#F59E0B]/5' : ''}
                ${isItemQuiz && isActive ? 'font-bold text-[#FBBF24] border-[#FBBF24] bg-[#FBBF24]/10' : ''}`}
              >
                {label}
              </button>
            );
          })}
          
          <button
            onClick={() => {
              setCurrentIndex(courseData.length);
              setShowSidebar(false);
            }}
            className={`w-full text-left py-3 px-3 rounded-md text-[14px] transition-all border-l-[3px] mt-4 font-bold tracking-widest ${
              isSummary
                ? 'bg-[#346EE0]/20 border-[#346EE0] text-[#86ACF6] opacity-100'
                : 'border-transparent text-slate-500 opacity-60 hover:bg-[#141A29] hover:opacity-100'
            }`}
          >
            [ COURSE SUMMARY ]
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Main Content Area */}
      <div
        ref={mainAreaRef}
        className="flex-1 flex flex-col overflow-y-auto relative bg-[#0B0D12]"
      >
        {/* Desktop Top Bar */}
        <div className="hidden md:flex justify-end items-center p-6 w-full max-w-4xl mx-auto pb-0 gap-4">
          <button
            onClick={() => { setGlossaryTerm(null); setIsGlossaryOpen(true); }}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold tracking-wider rounded-sm transition-all text-slate-500 hover:text-slate-300 hover:bg-[#141A29] border border-[#232836] bg-[#0A0C10]"
          >
            <BookOpen size={14} /> GLOSSARY
          </button>
          <UnitToggle unit={unit} setUnit={setUnit} />
        </div>

        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full min-h-0 p-4 md:p-8 md:pt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-[#14171F] border border-[#232836] rounded-xl p-6 md:p-12 flex-col shadow-2xl w-full mb-8 relative"
            >
              {isSummary ? (
                <SummaryView courseData={courseData} quizAnswers={quizAnswers} />
              ) : isQuiz && currentItem ? (
                <QuizView
                  data={currentItem}
                  answer={quizAnswers[currentIndex]}
                  onAnswer={handleAnswerQuiz}
                />
              ) : isSimulation && currentItem ? (
                <SimulationView data={currentItem} />
              ) : currentItem ? (
                <SlideView data={currentItem} onTermClick={openGlossaryForTerm} />
              ) : null}
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-between items-center w-full pb-8 pt-4 border-t border-[#232836] shrink-0">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-4 md:px-6 py-3 bg-[#0A0C10] border border-[#346EE0]/50 text-[#86ACF6] text-sm md:text-sm font-semibold rounded-md cursor-pointer transition-all uppercase tracking-wider hover:bg-[#346EE0] hover:text-white disabled:border-[#232836] disabled:text-slate-600 disabled:cursor-not-allowed disabled:bg-transparent"
            >
              <ArrowLeft size={16} className="hidden sm:block" />
              Preceding
            </button>
            <span className="text-slate-500 font-mono text-sm tracking-widest">
              {isSummary ? 'SUMMARY' : `${currentIndex + 1} / ${courseData.length}`}
            </span>
            <button
              onClick={handleNext}
              disabled={isSummary || !canGoNext}
              className="flex items-center gap-2 px-4 md:px-6 py-3 bg-[#0A0C10] border border-[#346EE0]/50 text-[#86ACF6] text-sm md:text-sm font-semibold rounded-md cursor-pointer transition-all uppercase tracking-wider hover:bg-[#346EE0] hover:text-white disabled:border-[#232836] disabled:text-slate-600 disabled:cursor-not-allowed disabled:bg-transparent"
            >
              Proceed
              <ArrowRight size={16} className="hidden sm:block" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Glossary Modal */}
      <GlossaryModal 
        isOpen={isGlossaryOpen} 
        onClose={() => setIsGlossaryOpen(false)} 
        initialTerm={glossaryTerm} 
      />
    </div>
  );
}


function UnitToggle({ unit, setUnit }: { unit: 'UK' | 'US', setUnit: (v: 'UK' | 'US') => void }) {
  return (
    <div className="flex bg-[#0A0C10] border border-[#232836] rounded-md p-1 shadow-sm">
      <button
        onClick={() => setUnit('UK')}
        className={`px-3 py-1.5 text-xs font-bold tracking-wider rounded-sm transition-all ${
          unit === 'UK' 
            ? 'bg-[#18243E] text-[#86ACF6] shadow-sm' 
            : 'text-slate-500 hover:text-slate-300 hover:bg-[#141A29]'
        }`}
      >
        UK / METRIC
      </button>
      <button
        onClick={() => setUnit('US')}
        className={`px-3 py-1.5 text-xs font-bold tracking-wider rounded-sm transition-all ${
          unit === 'US' 
            ? 'bg-[#18243E] text-[#86ACF6] shadow-sm' 
            : 'text-slate-500 hover:text-slate-300 hover:bg-[#141A29]'
        }`}
      >
        US / IMPERIAL
      </button>
    </div>
  )
}

function SlideView({ data, onTermClick }: { data: CourseItem, onTermClick: (term: string) => void }) {
  // Parse HTML string to inject clickable spans around glossary terms
  const parsedContent = useMemo(() => {
    let html = data.content || '';
    if (!html) return html;
    
    // Sort terms by length descending to prevent partial matches replacing sub-strings of longer terms
    const sortedTerms = [...glossaryData].sort((a, b) => b.term.length - a.term.length);
    
    sortedTerms.forEach(item => {
      // We only want to replace text outside of HTML tags.
      // Split by HTML tags
      const parts = html.split(/(<[^>]+>)/g);
      for (let i = 0; i < parts.length; i++) {
        // Text nodes are those not starting with '<'
        if (!parts[i].startsWith('<')) {
          // Use regex to find whole words, case-insensitive
          const regex = new RegExp(`\\b(${item.term})\\b`, 'gi');
          parts[i] = parts[i].replace(regex, `<span class="glossary-term cursor-help border-b border-dashed border-[#86ACF6] text-[#86ACF6] hover:bg-[#86ACF6]/10 transition-colors" data-term="${item.term}">$1</span>`);
        }
      }
      html = parts.join('');
    });
    
    return html;
  }, [data.content]);

  const parseOptions: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.attribs && domNode.attribs.class?.includes('glossary-term')) {
        const props = attributesToProps(domNode.attribs);
        return (
          <span 
            {...props} 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const term = domNode.attribs['data-term'];
              if (term) onTermClick(term);
            }}
          >
            {domToReact(domNode.children as any[], parseOptions)}
          </span>
        );
      }
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl md:text-3xl text-slate-100 mb-8 font-black font-display tracking-tight flex items-center">
        <div className="w-2 h-8 bg-[#346EE0] mr-4 rounded-sm"></div>
        {data.title}
      </h2>
      
      {data.imageUrl && (
        <div className="mb-8 rounded-xl overflow-hidden border border-[#232836] bg-[#0A0C10] shadow-md flex justify-center p-4">
          <img src={data.imageUrl} alt={data.title} className="max-h-[300px] object-contain w-full" />
        </div>
      )}

      <div className="slide-content text-slate-300 font-sans">
        {parse(parsedContent, parseOptions)}
      </div>
    </div>
  );
}

function GlossaryModal({ isOpen, onClose, initialTerm }: { isOpen: boolean, onClose: () => void, initialTerm: string | null }) {
  const [search, setSearch] = useState('');
  
  // When opened with a term, auto-search for it
  useEffect(() => {
    if (isOpen) {
      if (initialTerm) {
        setSearch(initialTerm);
      } else {
        setSearch('');
      }
    }
  }, [isOpen, initialTerm]);

  if (!isOpen) return null;

  const filteredTerms = glossaryData.filter(t => 
    t.term.toLowerCase().includes(search.toLowerCase()) || 
    t.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 20, scale: 0.95 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: 20, scale: 0.95 }}
          className="bg-[#0A0C10] border border-[#232836] w-full max-w-2xl rounded-xl shadow-2xl flex flex-col max-h-[85vh]"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-5 border-b border-[#232836] shrink-0">
            <h3 className="text-xl font-display font-bold text-slate-100 flex items-center gap-2">
              <BookOpen size={20} className="text-[#86ACF6]" /> Technical Glossary
            </h3>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-[#141A29]">
              <X size={20} />
            </button>
          </div>
          
          <div className="p-5 border-b border-[#232836] shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text"
                placeholder="Search definitions..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-[#141A29] border border-[#232836] rounded-md py-2.5 pl-10 pr-4 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-[#346EE0] focus:ring-1 focus:ring-[#346EE0] transition-colors"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {filteredTerms.length > 0 ? (
              filteredTerms.map((item, idx) => (
                <div key={idx} className="p-4 rounded-lg border border-[#232836] bg-[#14171F]">
                  <h4 className="text-lg font-bold text-[#86ACF6] mb-2">{item.term}</h4>
                  <p className="text-slate-300 leading-relaxed text-sm">{item.definition}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-slate-500">
                No terms matched your search.
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function QuizView({
  data,
  answer,
  onAnswer,
}: {
  data: CourseItem;
  answer?: { selectedIdx: number, isCorrect: boolean };
  onAnswer: (idx: number, isCorrect: boolean) => void;
}) {
  const handleOptionClick = (idx: number) => {
    if (answer) return;
    
    const isCorrect = idx === data.correct;
    onAnswer(idx, isCorrect);
  };

  const isAnswered = !!answer;
  const isSuccess = answer?.isCorrect;

  return (
    <div className="w-full">
      <h2 className="text-2xl md:text-3xl text-[#FBBF24] mb-8 font-black font-display tracking-tight flex items-center gap-3">
        <div className="w-2 h-8 bg-[#FBBF24] mr-2 rounded-sm"></div>
        Knowledge Check (Quiz)
        {isSuccess === true && <CheckCircle className="text-[#10B981] ml-2" size={28} />}
        {isSuccess === false && <X className="text-red-500 ml-2" size={28} />}
      </h2>
      <p className="text-xl md:text-2xl font-semibold mb-8 leading-relaxed text-slate-100 font-display">
        {data.q}
      </p>
      
      <div className="space-y-4">
        {data.options?.map((opt, idx) => {
          let btnClass = "border-[#232836] bg-[#0A0C10] text-slate-300 hover:bg-[#141A29] hover:border-[#4B5563]";
          
          if (isAnswered) {
            if (idx === data.correct) {
              btnClass = "bg-[#10B981]/10 border-[#10B981]/50 text-[#10B981] pointer-events-none";
            } else if (idx === answer.selectedIdx) {
              btnClass = "bg-red-500/10 border-red-500/50 text-red-400 pointer-events-none";
            } else {
              btnClass = "border-[#232836] bg-[#0A0C10]/50 text-slate-600 pointer-events-none";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              disabled={isAnswered}
              className={`w-full text-left p-4 md:p-6 border transition-all text-base md:text-lg font-medium rounded-md ${btnClass}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-6 p-5 rounded-md text-base font-semibold border-l-4 ${
              isSuccess 
                ? 'bg-[#10B981]/10 border-[#10B981] text-[#10B981]'
                : 'bg-red-500/10 border-red-500 text-red-500'
            }`}
          >
            {isSuccess 
              ? "CORRECT. Engineering precision confirmed. You may proceed."
              : "INCORRECT. This miscalculation would result in systemic failure. Proceed to next module."}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SummaryView({ courseData, quizAnswers }: { courseData: CourseItem[], quizAnswers: Record<number, { selectedIdx: number, isCorrect: boolean }> }) {
  const totalQuizzes = courseData.filter(i => i.type === 'quiz').length;
  const answeredQuizzes = Object.values(quizAnswers);
  const passedCount = answeredQuizzes.filter(a => a.isCorrect).length;
  const failedCount = answeredQuizzes.filter(a => !a.isCorrect).length;
  const completionPercentage = totalQuizzes > 0 ? Math.round((passedCount / totalQuizzes) * 100) : 100;
  
  return (
    <div className="w-full flex flex-col items-center justify-center text-center py-10">
      <div className="w-20 h-20 bg-[#346EE0]/10 rounded-full flex items-center justify-center mb-6">
        <Award className="text-[#346EE0]" size={40} />
      </div>
      
      <h2 className="text-3xl md:text-4xl text-slate-100 mb-4 font-black font-display tracking-tight">
        Masterclass Complete
      </h2>
      
      <p className="text-lg text-slate-400 max-w-lg mb-10">
        You have successfully completed the theoretical training for AI Data Center Liquid Cooling Administration. 
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl mb-12">
        <div className="bg-[#0A0C10] border border-[#232836] rounded-xl p-6 flex flex-col items-center">
          <div className="flex items-center gap-2 text-slate-400 mb-2 font-medium">
            <TrendingUp size={18} className="text-[#86ACF6]" />
            Completion Rate
          </div>
          <div className="text-4xl font-black font-display text-slate-100">
            {completionPercentage}%
          </div>
        </div>

        <div className="bg-[#0A0C10] border border-[#232836] rounded-xl p-6 flex flex-col items-center">
          <div className="flex items-center gap-2 text-slate-400 mb-2 font-medium">
            <BarChart3 size={18} className="text-[#FBBF24]" />
            Correct / Incorrect
          </div>
          <div className="text-4xl font-black font-display text-slate-100 flex items-baseline gap-2">
            <span className="text-[#10B981]">{passedCount}</span>
            <span className="text-lg text-slate-500 font-medium">/</span>
            <span className="text-red-500">{failedCount}</span>
          </div>
        </div>
      </div>

      {completionPercentage === 100 ? (
        <div className="bg-[#10B981]/10 border border-[#10B981]/30 p-6 rounded-lg max-w-xl w-full">
          <div className="flex items-center justify-center gap-2 text-[#10B981] mb-2 font-bold uppercase tracking-widest text-sm">
            <CheckCircle size={18} />
            Certification Authorized
          </div>
          <p className="text-slate-300">
            All diagnostics resolved. You are cleared for operational deployment as a Master Level AI Plumber.
          </p>
        </div>
      ) : (
        <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 p-6 rounded-lg max-w-xl w-full">
          <p className="text-slate-300">
            To achieve full certification, ensure all Knowledge Check modules have been completed successfully.
          </p>
        </div>
      )}
    </div>
  );
}

function SimulationView({ data }: { data: CourseItem }) {
  const [flow, setFlow] = useState(120);
  const [pressure, setPressure] = useState(60);
  const [humidity, setHumidity] = useState(40);

  // Logic for Sensor Fusion
  let status = "System Normal";
  let statusColor = "text-[#10B981]";
  let bgColor = "bg-[#10B981]/10 border-[#10B981]/30";

  const isFlowLow = flow < 90;
  const isPressureLow = pressure < 45;
  const isHumidityHigh = humidity > 80;

  if (isFlowLow && isPressureLow && isHumidityHigh) {
    status = "CRITICAL LEAK CONFIRMED. Executing automatic shutdown.";
    statusColor = "text-red-500";
    bgColor = "bg-red-500/10 border-red-500/30";
  } else if (isHumidityHigh && !isFlowLow && !isPressureLow) {
    status = "Condensation suspected. Verified dew point mismatch. No leak.";
    statusColor = "text-[#FBBF24]";
    bgColor = "bg-[#FBBF24]/10 border-[#FBBF24]/30";
  } else if (isFlowLow && !isPressureLow) {
    status = "Warning: Flow rate degradation detected. Possible filter occlusion.";
    statusColor = "text-[#FBBF24]";
    bgColor = "bg-[#FBBF24]/10 border-[#FBBF24]/30";
  } else if (!isFlowLow && isPressureLow) {
    status = "Warning: Pressure loss detected without flow drop. Validate pump integrity.";
    statusColor = "text-[#FBBF24]";
    bgColor = "bg-[#FBBF24]/10 border-[#FBBF24]/30";
  } else if (isFlowLow && isPressureLow) {
    status = "Warning: Flow and Pressure degraded. Monitoring for moisture (Leak possible).";
    statusColor = "text-orange-500";
    bgColor = "bg-orange-500/10 border-orange-500/30";
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl md:text-3xl text-slate-100 mb-6 font-black font-display tracking-tight flex items-center">
        <div className="w-2 h-8 bg-[#8B5CF6] mr-4 rounded-sm"></div>
        {data.title}
      </h2>
      <div className="text-slate-300 font-sans mb-8">
        {parse(data.content || '')}
      </div>
      
      <div className="bg-[#0A0C10] border border-[#232836] p-6 rounded-xl space-y-8">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-slate-400">Flow Rate (LPM)</label>
            <span className="font-mono text-[#86ACF6]">{flow} LPM</span>
          </div>
          <input 
            type="range" min="50" max="150" value={flow} onChange={e => setFlow(parseInt(e.target.value))}
            className="w-full h-2 bg-[#18243E] rounded-lg appearance-none cursor-pointer accent-[#346EE0]"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-slate-400">Pressure (PSI)</label>
            <span className="font-mono text-[#86ACF6]">{pressure} PSI</span>
          </div>
          <input 
            type="range" min="20" max="80" value={pressure} onChange={e => setPressure(parseInt(e.target.value))}
            className="w-full h-2 bg-[#18243E] rounded-lg appearance-none cursor-pointer accent-[#346EE0]"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-slate-400">Sub-floor Humidity (%)</label>
            <span className="font-mono text-[#86ACF6]">{humidity}%</span>
          </div>
          <input 
            type="range" min="20" max="100" value={humidity} onChange={e => setHumidity(parseInt(e.target.value))}
            className="w-full h-2 bg-[#18243E] rounded-lg appearance-none cursor-pointer accent-[#346EE0]"
          />
        </div>

        <div className={`mt-8 p-4 rounded-md border ${bgColor} transition-colors duration-300`}>
          <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">AI Telemetry Assessment</div>
          <div className={`font-bold font-mono text-lg ${statusColor}`}>{status}</div>
        </div>
      </div>
    </div>
  );
}
