import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  BookOpen,
  MessageSquare,
  Bookmark,
  Compass,
  Check,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { PersonalizedPlan } from '../types';

export const ProgressView: React.FC = () => {
  const {
    activeBookPlans,
    currentPlan,
    userProgress,
    setActiveTab,
    switchActiveBookPlan,
    advanceToNextDay
  } = useApp();

  const [selectedBookFilter, setSelectedBookFilter] = useState<string>('all');

  const allPlans: PersonalizedPlan[] = Object.values(activeBookPlans);
  const totalOngoingBooks = allPlans.length;

  // Aggregate stats across all active ongoing books
  let totalTasksAllBooks = 0;
  let totalCompletedAllBooks = 0;
  let totalMissedAllBooks = 0;
  let totalRemainingTodayAllBooks = 0;

  allPlans.forEach(plan => {
    const totalDays = plan.duration === '7_days' ? 7 : 30;
    totalTasksAllBooks += plan.tasks.length;
    totalCompletedAllBooks += plan.tasks.filter(t => t.status === 'completed').length;
    totalMissedAllBooks += plan.tasks.filter(t => t.status === 'missed').length;
    totalRemainingTodayAllBooks += plan.tasks.filter(
      t => t.day === plan.currentDay && (t.status === 'not_started' || t.status === 'in_progress')
    ).length;
  });

  const overallProgressPercent =
    totalTasksAllBooks > 0
      ? Math.round((totalCompletedAllBooks / totalTasksAllBooks) * 100)
      : 0;

  // Empty state if user has no ongoing book plans
  if (totalOngoingBooks === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#EFEAE0] dark:bg-[#23211D] flex items-center justify-center mx-auto text-[#8C8275] dark:text-[#9E968A]">
          <Compass className="w-8 h-8 text-[#C25E34]" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            Your Record Starts Here
          </h2>
          <p className="text-sm text-[#686259] dark:text-[#A8A298] max-w-md mx-auto leading-relaxed">
            PSYCLONE tracks your progress across all ongoing books and study plans. Choose a book from the library or converse with PSYCLONE to begin your first journey.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab('books')}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-[#C25E34] hover:bg-[#B0522B] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse Library & Start a Plan</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl border border-[#DED7CC] dark:border-[#38342E] text-[#4A453D] dark:text-[#D1CBC1] hover:bg-[#F5F2E9] dark:hover:bg-[#23211E] text-xs font-bold transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#C25E34]" />
            <span>Ask for Recommendations</span>
          </button>
        </div>
      </div>
    );
  }

  // Filter plans to display
  const displayedPlans =
    selectedBookFilter === 'all'
      ? allPlans
      : allPlans.filter(p => p.bookId === selectedBookFilter);

  // Derive "What seems to help" from feedbackList
  const feedbackList = userProgress.feedbackList || [];
  const positiveFeedback = feedbackList.filter(
    f => f.helpfulness === 'helped' || f.helpfulness === 'helped_little'
  );

  let helpfulInsight = '';
  if (positiveFeedback.length > 0) {
    const typeCounts: Record<string, number> = {};
    positiveFeedback.forEach(f => {
      typeCounts[f.taskType] = (typeCounts[f.taskType] || 0) + 1;
    });
    const sortedTypes = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);
    const topType = sortedTypes[0]?.[0];
    if (topType) {
      const formatted = topType.charAt(0).toUpperCase() + topType.slice(1);
      helpfulInsight = `${formatted} micro-practices have received the highest rating across your reading journeys.`;
    }
  }

  const handleOpenPlanTasks = (bookId: string) => {
    switchActiveBookPlan(bookId);
    setActiveTab('tasks');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 space-y-8">
      {/* Title & Subhead */}
      <div className="space-y-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              My Progress
            </h1>
            <p className="text-xs md:text-sm text-[#686259] dark:text-[#A8A298]">
              Comprehensive record across all {totalOngoingBooks} ongoing reading {totalOngoingBooks === 1 ? 'journey' : 'journeys'}.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('books')}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#C25E34] hover:underline self-start sm:self-auto cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Add another book</span>
          </button>
        </div>
      </div>

      {/* OVERALL AGGREGATE SUMMARY (Across all ongoing books) */}
      <div className="bg-[#FFFFFF] dark:bg-[#1A1916] rounded-2xl border border-[#E6E1D6] dark:border-[#2D2A26] p-6 md:p-8 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#ECE7DC] dark:border-[#2D2A26] pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C25E34]">
              Combined Progress
            </span>
            <h2 className="text-lg md:text-xl font-serif font-bold text-[#1C1917] dark:text-[#F5F2EB] mt-0.5">
              All Ongoing Books ({totalOngoingBooks})
            </h2>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="px-3 py-1 rounded-lg bg-[#F5F1E8] dark:bg-[#23211D] border border-[#E3DDD1] dark:border-[#332F2A] font-semibold text-[#2D2A26] dark:text-[#F5F2EB]">
              {totalCompletedAllBooks} of {totalTasksAllBooks} total tasks done
            </span>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium text-[#686259] dark:text-[#A8A298]">
            <span>Overall Completion Rate</span>
            <span>{overallProgressPercent}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-[#EFEAE0] dark:bg-[#282622] overflow-hidden">
            <div
              className="h-full bg-[#C25E34] rounded-full transition-all duration-500"
              style={{ width: `${overallProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Aggregate 3-column stats */}
        <div className="grid grid-cols-3 gap-3 pt-1 text-center">
          <div className="p-3.5 rounded-xl bg-[#F5F8F5] dark:bg-[#152219] border border-emerald-200 dark:border-emerald-900/60">
            <div className="text-xl md:text-2xl font-serif font-bold text-emerald-800 dark:text-emerald-300">
              {totalCompletedAllBooks}
            </div>
            <div className="text-[11px] font-medium text-emerald-800 dark:text-emerald-400 mt-0.5">
              Completed Tasks
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF5F0] dark:bg-[#241C18] border border-[#EADACD] dark:border-[#3D2C24]">
            <div className="text-xl md:text-2xl font-serif font-bold text-[#C25E34]">
              {totalRemainingTodayAllBooks}
            </div>
            <div className="text-[11px] font-medium text-[#A74E28] dark:text-[#D97D58] mt-0.5">
              Due Today
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8F6F0] dark:bg-[#201E1A] border border-[#E3DDD1] dark:border-[#332F2A]">
            <div className="text-xl md:text-2xl font-serif font-bold text-[#686259] dark:text-[#A8A298]">
              {totalMissedAllBooks}
            </div>
            <div className="text-[11px] font-medium text-[#787166] dark:text-[#9E968A] mt-0.5">
              Missed
            </div>
          </div>
        </div>
      </div>

      {/* FILTER TABS IF MULTIPLE BOOKS ARE ACTIVE */}
      {totalOngoingBooks > 1 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs px-1">
            <span className="font-bold uppercase tracking-wider text-[11px] text-[#8C8275]">
              Filter by Journey:
            </span>
            <span className="text-[#8C8275]">
              Showing {displayedPlans.length} of {totalOngoingBooks} books
            </span>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedBookFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                selectedBookFilter === 'all'
                  ? 'bg-[#2D2A26] dark:bg-[#F5F2EB] text-[#FDFBF7] dark:text-[#181715] shadow-xs'
                  : 'bg-[#FFFFFF] dark:bg-[#1C1B17] border border-[#E3DDD1] dark:border-[#332F2A] text-[#595349] dark:text-[#C4BEB3] hover:border-[#8C8275]'
              }`}
            >
              All Ongoing Books ({totalOngoingBooks})
            </button>

            {allPlans.map(plan => {
              const isSelected = selectedBookFilter === plan.bookId;
              return (
                <button
                  key={plan.bookId}
                  onClick={() => setSelectedBookFilter(plan.bookId)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#2D2A26] dark:bg-[#F5F2EB] text-[#FDFBF7] dark:text-[#181715] shadow-xs'
                      : 'bg-[#FFFFFF] dark:bg-[#1C1B17] border border-[#E3DDD1] dark:border-[#332F2A] text-[#595349] dark:text-[#C4BEB3] hover:border-[#8C8275]'
                  }`}
                >
                  {plan.bookTitle}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION: EACH ONGOING BOOK'S INDIVIDUAL PROGRESS CARD */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg md:text-xl font-serif font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            Ongoing Reading Journeys
          </h2>
          <span className="text-xs text-[#8C8275] dark:text-[#7A746B]">
            {displayedPlans.length} active {displayedPlans.length === 1 ? 'plan' : 'plans'}
          </span>
        </div>

        <div className="space-y-5">
          {displayedPlans.map(plan => {
            const totalDays = plan.duration === '7_days' ? 7 : 30;
            const completedInPlan = plan.tasks.filter(t => t.status === 'completed');
            const missedInPlan = plan.tasks.filter(t => t.status === 'missed');
            const todayTasks = plan.tasks.filter(t => t.day === plan.currentDay);
            const remainingTodayInPlan = todayTasks.filter(
              t => t.status === 'not_started' || t.status === 'in_progress'
            );

            const planTotalTasks = plan.tasks.length;
            const planCompletedCount = completedInPlan.length;
            const planMissedCount = missedInPlan.length;
            const planRemainingTodayCount = remainingTodayInPlan.length;

            const planRatio = planTotalTasks > 0 ? planCompletedCount / planTotalTasks : 0;
            const planPercent = Math.round(planRatio * 100);

            const isCurrentSelectedInApp = currentPlan?.bookId === plan.bookId;
            const allTodayTasksDone =
              todayTasks.length > 0 && planRemainingTodayCount === 0;

            return (
              <div
                key={plan.bookId}
                className="bg-[#FFFFFF] dark:bg-[#1A1916] rounded-2xl border border-[#E6E1D6] dark:border-[#2D2A26] p-6 md:p-7 shadow-xs space-y-5 hover:border-[#C25E34]/60 transition-all"
              >
                {/* Book Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C25E34]">
                        {plan.duration === '7_days' ? '1-Week Focus Sprint' : '1-Month Habit Builder'}
                      </span>
                      {isCurrentSelectedInApp && (
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-[#2D2A26] dark:bg-[#F5F2EB] text-white dark:text-[#181715] px-2 py-0.5 rounded-sm">
                          Active in Tasks
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg md:text-xl font-serif font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                      {plan.bookTitle}
                    </h3>
                    <p className="text-xs text-[#787166] dark:text-[#9E968A]">
                      By {plan.bookAuthor}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 self-start sm:self-auto">
                    <span className="font-serif font-bold text-xs text-[#2D2A26] dark:text-[#F5F2EB] bg-[#F5F1E8] dark:bg-[#23211D] border border-[#E3DDD1] dark:border-[#332F2A] px-3 py-1.5 rounded-lg">
                      Day {plan.currentDay} of {totalDays}
                    </span>
                  </div>
                </div>

                {/* Progress Bar for this book */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium text-[#686259] dark:text-[#A8A298]">
                    <span>Journey Progress</span>
                    <span>
                      {planCompletedCount} of {planTotalTasks} tasks completed ({planPercent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#EFEAE0] dark:bg-[#282622] overflow-hidden">
                    <div
                      className="h-full bg-[#C25E34] rounded-full transition-all duration-500"
                      style={{ width: `${planPercent}%` }}
                    />
                  </div>
                </div>

                {/* Mini Stats Grid for this book */}
                <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                  <div className="p-2.5 rounded-lg bg-[#F5F8F5] dark:bg-[#152219] border border-emerald-100 dark:border-emerald-900/40">
                    <span className="font-bold text-sm text-emerald-800 dark:text-emerald-300 block">
                      {planCompletedCount}
                    </span>
                    <span className="text-[10px] text-emerald-800 dark:text-emerald-400">
                      Completed
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#FAF5F0] dark:bg-[#241C18] border border-[#EADACD] dark:border-[#3D2C24]">
                    <span className="font-bold text-sm text-[#C25E34] block">
                      {planRemainingTodayCount}
                    </span>
                    <span className="text-[10px] text-[#A74E28] dark:text-[#D97D58]">
                      Remaining Today
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#F8F6F0] dark:bg-[#201E1A] border border-[#E3DDD1] dark:border-[#332F2A]">
                    <span className="font-bold text-sm text-[#686259] dark:text-[#A8A298] block">
                      {planMissedCount}
                    </span>
                    <span className="text-[10px] text-[#787166] dark:text-[#9E968A]">
                      Missed
                    </span>
                  </div>
                </div>

                {/* Status notice or completion reminder */}
                {allTodayTasksDone ? (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="font-medium">All tasks for Day {plan.currentDay} completed!</span>
                    </div>
                    {plan.currentDay < totalDays && (
                      <button
                        onClick={() => advanceToNextDay(plan.bookId)}
                        className="text-xs font-bold text-emerald-700 dark:text-emerald-300 underline cursor-pointer"
                      >
                        Advance to Day {plan.currentDay + 1}
                      </button>
                    )}
                  </div>
                ) : null}

                {/* Book Card Actions */}
                <div className="pt-2 border-t border-[#ECE7DC] dark:border-[#2D2A26] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <span className="text-xs text-[#787166] dark:text-[#9E968A]">
                    {planRemainingTodayCount > 0
                      ? `${planRemainingTodayCount} task${planRemainingTodayCount !== 1 ? 's' : ''} left on Day ${plan.currentDay}`
                      : 'Today\'s tasks all done.'}
                  </span>

                  <button
                    onClick={() => handleOpenPlanTasks(plan.bookId)}
                    className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-[#2D2A26] dark:bg-[#F5F2EB] hover:bg-[#1C1917] dark:hover:bg-white text-white dark:text-[#181715] text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <span>View & Do Today's Tasks</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C25E34]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* WHAT SEEMS TO HELP INSIGHT */}
      {helpfulInsight ? (
        <div className="bg-[#FFFFFF] dark:bg-[#1A1916] rounded-2xl border border-[#E6E1D6] dark:border-[#2D2A26] p-6 shadow-xs space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#C25E34] block">
            What seems to help
          </span>
          <p className="text-sm font-serif font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
            "{helpfulInsight}"
          </p>
          <p className="text-xs text-[#787166] dark:text-[#9E968A]">
            PSYCLONE uses this to adjust subsequent daily practices across your active books.
          </p>
        </div>
      ) : feedbackList.length > 0 ? (
        <div className="bg-[#FFFFFF] dark:bg-[#1A1916] rounded-2xl border border-[#E6E1D6] dark:border-[#2D2A26] p-6 shadow-xs space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8275] block">
            What seems to help
          </span>
          <p className="text-xs text-[#686259] dark:text-[#A8A298]">
            Gathering feedback from your daily tasks. Keep submitting quick reflections after completing actions.
          </p>
        </div>
      ) : null}

      {/* RECENT ACTIVITY LOG (Tagged with Book Title) */}
      <div className="bg-[#FFFFFF] dark:bg-[#1A1916] rounded-2xl border border-[#E6E1D6] dark:border-[#2D2A26] p-6 md:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-serif font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            Recent Activity
          </h3>
          <span className="text-xs text-[#8C8275]">
            Across all reading plans
          </span>
        </div>

        {userProgress.activityLog.length === 0 ? (
          <p className="text-xs text-[#8C8275] dark:text-[#7A746B]">
            No activity recorded yet. Start by completing a micro-task or conversation.
          </p>
        ) : (
          <div className="space-y-3">
            {userProgress.activityLog.slice(0, 10).map(item => {
              const isTaskCompleted = item.type === 'task_completed';
              const isTaskMissed = item.type === 'task_missed';
              const relatedBook = item.bookId ? allPlans.find(p => p.bookId === item.bookId) : null;

              return (
                <div
                  key={item.id}
                  className="flex items-start justify-between py-2.5 border-b border-[#ECE7DC] dark:border-[#2D2A26] last:border-0 text-xs"
                >
                  <div className="flex items-start space-x-2.5 flex-1 pr-3">
                    {isTaskCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 mt-0.5 shrink-0" />
                    ) : isTaskMissed ? (
                      <XCircle className="w-4 h-4 text-[#8C8275] mt-0.5 shrink-0" />
                    ) : (
                      <Bookmark className="w-4 h-4 text-[#C25E34] mt-0.5 shrink-0" />
                    )}
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                          {item.title}
                        </span>
                        {relatedBook && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-sm bg-[#F5F1E8] dark:bg-[#23211D] border border-[#E3DDD1] dark:border-[#332F2A] text-[#686259] dark:text-[#A8A298]">
                            {relatedBook.bookTitle}
                          </span>
                        )}
                      </div>
                      <p className="text-[#787166] dark:text-[#9E968A] text-[11px]">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#8C8275] font-mono ml-4 shrink-0">
                    {item.timestamp}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
