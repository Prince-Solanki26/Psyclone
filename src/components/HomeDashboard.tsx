import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquare,
  ArrowRight,
  BookOpen,
  CheckSquare,
  BarChart2,
  Bookmark
} from 'lucide-react';

export const HomeDashboard: React.FC = () => {
  const {
    setActiveTab,
    startChatWithThought,
    currentPlan,
    activeBookPlans,
    switchActiveBookPlan
  } = useApp();

  const [thoughtInput, setThoughtInput] = useState('');

  const handleStartChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (thoughtInput.trim()) {
      startChatWithThought(thoughtInput.trim());
      setThoughtInput('');
    } else {
      setActiveTab('chat');
    }
  };

  const handleSamplePrompt = (prompt: string) => {
    startChatWithThought(prompt);
  };

  const allActivePlans = Object.values(activeBookPlans);
  const hasActivePlans = allActivePlans.length > 0;

  // Calculate total remaining tasks today across all ongoing books
  const totalRemainingToday = allActivePlans.reduce((sum, plan) => {
    return (
      sum +
      plan.tasks.filter(
        t => t.day === plan.currentDay && (t.status === 'not_started' || t.status === 'in_progress')
      ).length
    );
  }, 0);

  const handleOpenBookTasks = (e: React.MouseEvent, bookId: string) => {
    e.stopPropagation();
    switchActiveBookPlan(bookId);
    setActiveTab('tasks');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-16 space-y-10">
      {/* Brand & Tagline */}
      <div className="space-y-2 text-center sm:text-left">
        <span className="text-[11px] font-bold tracking-widest uppercase text-[#8C8275] dark:text-[#9E968A] block">
          Student Reading & Mindset Companion
        </span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-[#1C1917] dark:text-[#F5F2EB] leading-tight">
          Understand yourself. <br className="hidden sm:inline" />
          <span className="text-[#C25E34] italic font-normal">Learn what helps.</span>
        </h1>
        <p className="text-base text-[#686259] dark:text-[#A8A298] font-normal max-w-xl">
          A calm space to unpack study roadblocks, discover insights from curated books, and take one small step at a time.
        </p>
      </div>

      {/* Main Journal Card: What's on your mind? */}
      <div className="bg-[#FFFFFF] dark:bg-[#1A1916] rounded-2xl border border-[#E6E1D6] dark:border-[#2D2A26] p-6 md:p-9 shadow-xs space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            What is on your mind today?
          </h2>
          <p className="text-xs md:text-sm text-[#787166] dark:text-[#9E968A]">
            Share what happened, where you feel stuck, or what you are trying to change.
          </p>
        </div>

        <form onSubmit={handleStartChat} className="space-y-4">
          <div className="relative">
            <textarea
              rows={3}
              value={thoughtInput}
              onChange={e => setThoughtInput(e.target.value)}
              placeholder="e.g. I worked for hours but feel like nothing stuck, or I'm avoiding my upcoming physics exam..."
              className="w-full px-4 py-3.5 text-sm md:text-base rounded-xl border border-[#DDD7CC] dark:border-[#38342E] bg-[#FCFBF8] dark:bg-[#141311] text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:ring-2 focus:ring-[#C25E34]/40 focus:border-[#C25E34] transition-all placeholder:text-[#9C9488] dark:placeholder:text-[#686259] resize-none leading-relaxed"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
            <span className="text-xs text-[#8C8275] dark:text-[#888177] self-start sm:self-center">
              Thoughtful dialogue · No diagnostic labels · Real book recommendations
            </span>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-[#C25E34] hover:bg-[#B0522B] text-white font-bold text-xs md:text-sm transition-all shadow-xs cursor-pointer shrink-0"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Talk with PSYCLONE</span>
            </button>
          </div>
        </form>

        {/* Friendly Conversation Starters */}
        <div className="pt-4 border-t border-[#ECE7DC] dark:border-[#2D2A26]">
          <span className="text-[11px] font-bold text-[#8C8275] dark:text-[#888177] uppercase tracking-wider block mb-2.5">
            Or begin with a common student experience:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "I failed my exam and I feel like I'm not cut out for this.",
              "I sit down to study and keep reaching for my phone.",
              "I studied hard for weeks but still couldn't perform.",
              "I have three assignments due and feel too overwhelmed to start."
            ].map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSamplePrompt(prompt)}
                className="text-xs text-left bg-[#F7F4EC] dark:bg-[#201E1B] hover:bg-[#EFEADF] dark:hover:bg-[#2A2723] border border-[#E3DDD1] dark:border-[#332F2A] text-[#4A453D] dark:text-[#D1CBC1] p-3 rounded-xl transition-colors cursor-pointer leading-snug"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ongoing Journeys or Secondary Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {hasActivePlans ? (
          <div
            onClick={() => setActiveTab('tasks')}
            className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#1A1916] border border-[#E6E1D6] dark:border-[#2D2A26] hover:border-[#C25E34] transition-all cursor-pointer group flex flex-col justify-between shadow-xs"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#8C8275] dark:text-[#888177]">
                <span className="font-bold uppercase tracking-wider text-[10px] text-[#C25E34]">
                  {allActivePlans.length > 1
                    ? `${allActivePlans.length} Ongoing Books`
                    : 'Active Journey'}
                </span>
                <span>
                  {totalRemainingToday} task{totalRemainingToday !== 1 ? 's' : ''} left today
                </span>
              </div>

              <h3 className="text-lg font-serif font-bold text-[#1C1917] dark:text-[#F5F2EB] group-hover:text-[#C25E34] transition-colors">
                Continue Today's Tasks
              </h3>

              {allActivePlans.length === 1 && currentPlan ? (
                <p className="text-xs text-[#686259] dark:text-[#A8A298]">
                  {currentPlan.bookTitle} · Day {currentPlan.currentDay} of {currentPlan.duration === '7_days' ? '7' : '30'}
                </p>
              ) : (
                <div className="space-y-1.5 pt-1">
                  {allActivePlans.slice(0, 3).map(p => {
                    const remainingForBook = p.tasks.filter(
                      t => t.day === p.currentDay && (t.status === 'not_started' || t.status === 'in_progress')
                    ).length;
                    return (
                      <div
                        key={p.bookId}
                        className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-[#F8F5EE] dark:bg-[#201E1B] border border-[#EBE4D8] dark:border-[#2F2C27]"
                      >
                        <span className="font-medium text-[#1C1917] dark:text-[#F5F2EB] truncate max-w-[140px]">
                          {p.bookTitle}
                        </span>
                        <span className="text-[11px] text-[#8C8275]">
                          Day {p.currentDay} · {remainingForBook} due
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-[#ECE7DC] dark:border-[#2D2A26] flex items-center justify-between text-xs font-semibold text-[#C25E34]">
              <span>Open My Tasks</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ) : (
          <div
            onClick={() => setActiveTab('chat')}
            className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#1A1916] border border-[#E6E1D6] dark:border-[#2D2A26] hover:border-[#C25E34] transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8275] dark:text-[#888177]">
                First Step
              </span>
              <h3 className="text-lg font-serif font-bold text-[#1C1917] dark:text-[#F5F2EB] group-hover:text-[#C25E34] transition-colors">
                Start a Conversation
              </h3>
              <p className="text-xs text-[#686259] dark:text-[#A8A298] leading-relaxed">
                Tell PSYCLONE what challenge you are facing to receive personalized ideas and book recommendations.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#ECE7DC] dark:border-[#2D2A26] flex items-center justify-between text-xs font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
              <span>Open Dialogue</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C25E34]" />
            </div>
          </div>
        )}

        {/* Explore Books or View Progress Card */}
        {hasActivePlans ? (
          <div
            onClick={() => setActiveTab('progress')}
            className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#1A1916] border border-[#E6E1D6] dark:border-[#2D2A26] hover:border-[#C25E34] transition-all cursor-pointer group flex flex-col justify-between shadow-xs"
          >
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8275] dark:text-[#888177]">
                Honest Record
              </span>
              <h3 className="text-lg font-serif font-bold text-[#1C1917] dark:text-[#F5F2EB] group-hover:text-[#C25E34] transition-colors">
                View All Ongoing Progress
              </h3>
              <p className="text-xs text-[#686259] dark:text-[#A8A298] leading-relaxed">
                Track completion stats, reflection logs, and progress across all {allActivePlans.length} active reading {allActivePlans.length === 1 ? 'journey' : 'journeys'}.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#ECE7DC] dark:border-[#2D2A26] flex items-center justify-between text-xs font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
              <span>View Progress Record</span>
              <BarChart2 className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C25E34]" />
            </div>
          </div>
        ) : (
          <div
            onClick={() => setActiveTab('books')}
            className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#1A1916] border border-[#E6E1D6] dark:border-[#2D2A26] hover:border-[#C25E34] transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8275] dark:text-[#888177]">
                Curated Library
              </span>
              <h3 className="text-lg font-serif font-bold text-[#1C1917] dark:text-[#F5F2EB] group-hover:text-[#C25E34] transition-colors">
                Explore 10 Core Books
              </h3>
              <p className="text-xs text-[#686259] dark:text-[#A8A298] leading-relaxed">
                Timeless frameworks on habits, mindset, concentration, and emotional resilience for students.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#ECE7DC] dark:border-[#2D2A26] flex items-center justify-between text-xs font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
              <span>Browse Library</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C25E34]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
