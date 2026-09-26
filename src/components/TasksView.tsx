import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DailyTask, TaskType } from '../types';
import {
  CheckCircle2,
  Clock,
  MessageSquare,
  ArrowRight,
  RotateCcw,
  HelpCircle,
  BookOpen,
  Check,
  X,
  Sliders,
  Lock,
  Calendar,
  Bookmark
} from 'lucide-react';

export const TasksView: React.FC = () => {
  const {
    activeBookPlans,
    currentPlan,
    switchActiveBookPlan,
    setActiveTab,
    activeTaskForModal,
    setActiveTaskForModal,
    feedbackModalTask,
    setFeedbackModalTask,
    completeTask,
    submitTaskFeedback,
    retryTask,
    shortenTasks,
    advanceToNextDay,
    askTaskHelp
  } = useApp();

  const [taskInputText, setTaskInputText] = useState('');
  const [feedbackHelpfulness, setFeedbackHelpfulness] = useState<
    'helped' | 'helped_little' | 'didnt_help' | 'not_sure'
  >('helped');
  const [feedbackComment, setFeedbackComment] = useState('');

  // No active plan state
  if (!currentPlan) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#EFEAE0] dark:bg-[#23211D] flex items-center justify-center mx-auto text-[#8C8275] dark:text-[#9E968A]">
          <BookOpen className="w-8 h-8 text-[#C25E34]" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            No Active Journey Yet
          </h2>
          <p className="text-sm text-[#686259] dark:text-[#A8A298] max-w-md mx-auto leading-relaxed">
            Have a dialogue with PSYCLONE or select a book from the curated library to generate your daily micro-tasks.
          </p>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab('chat')}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-[#C25E34] hover:bg-[#B0522B] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Talk with PSYCLONE</span>
          </button>
          <button
            onClick={() => setActiveTab('books')}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl border border-[#DED7CC] dark:border-[#38342E] text-[#4A453D] dark:text-[#D1CBC1] hover:bg-[#F5F2E9] dark:hover:bg-[#23211E] text-xs font-bold transition-all cursor-pointer"
          >
            <span>Explore Library</span>
          </button>
        </div>
      </div>
    );
  }

  const allActivePlans = Object.values(activeBookPlans);
  const totalDays = currentPlan.duration === '7_days' ? 7 : 30;
  const currentDay = currentPlan.currentDay;

  // Filter tasks for current day
  const todayTasks = currentPlan.tasks
    .filter(t => t.day === currentDay)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  // Tomorrow preview tasks (Day + 1)
  const tomorrowTasks = currentPlan.tasks
    .filter(t => t.day === currentDay + 1)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  // Missed tasks across all previous days for this book
  const missedTasks = currentPlan.tasks.filter(t => t.status === 'missed');

  const completedTodayCount = todayTasks.filter(t => t.status === 'completed').length;
  const allTodayCompleted = todayTasks.length > 0 && completedTodayCount === todayTasks.length;
  const totalMinutesToday = todayTasks.reduce((acc, t) => acc + t.estimatedMinutes, 0);

  // Find index of first uncompleted task
  const firstUnfinishedIdx = todayTasks.findIndex(t => t.status !== 'completed');

  const handleStartTask = (task: DailyTask) => {
    setActiveTaskForModal(task);
    setTaskInputText(task.userInput || '');
  };

  const handleFinishTask = () => {
    if (!activeTaskForModal) return;
    completeTask(activeTaskForModal.id, taskInputText);
    setTaskInputText('');
  };

  const handleSendFeedback = () => {
    if (!feedbackModalTask) return;
    submitTaskFeedback(feedbackModalTask.id, feedbackHelpfulness, feedbackComment);
    setFeedbackComment('');
  };

  const typeConfig: Record<TaskType, { name: string; color: string }> = {
    learn: { name: 'Learn', color: 'text-amber-800 dark:text-amber-300' },
    reflect: { name: 'Reflect', color: 'text-[#8A5038] dark:text-[#D49880]' },
    practice: { name: 'Practice', color: 'text-emerald-800 dark:text-emerald-300' },
    apply: { name: 'Apply', color: 'text-teal-800 dark:text-teal-300' },
    review: { name: 'Review', color: 'text-stone-700 dark:text-stone-300' },
    checkin: { name: 'Check-In', color: 'text-sky-800 dark:text-sky-300' }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 space-y-8">
      {/* Switcher if multiple books are active */}
      {allActivePlans.length > 1 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs px-1">
            <span className="text-[11px] font-bold text-[#8C8275] uppercase tracking-wider">
              Active Journeys ({allActivePlans.length}):
            </span>
            <button
              onClick={() => setActiveTab('progress')}
              className="text-[#C25E34] hover:underline font-semibold cursor-pointer text-xs"
            >
              Compare all progress →
            </button>
          </div>
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            {allActivePlans.map(plan => {
              const isSelected = plan.bookId === currentPlan.bookId;
              const remainingToday = plan.tasks.filter(
                t => t.day === plan.currentDay && (t.status === 'not_started' || t.status === 'in_progress')
              ).length;

              return (
                <button
                  key={plan.bookId}
                  onClick={() => switchActiveBookPlan(plan.bookId)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-[#2D2A26] dark:bg-[#F5F2EB] text-[#FDFBF7] dark:text-[#181715] shadow-xs'
                      : 'bg-[#FFFFFF] dark:bg-[#1C1B17] border border-[#E3DDD1] dark:border-[#332F2A] text-[#595349] dark:text-[#C4BEB3] hover:border-[#8C8275]'
                  }`}
                >
                  <span>{plan.bookTitle} (Day {plan.currentDay})</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-sm font-mono ${
                      isSelected
                        ? 'bg-[#403B35] text-white dark:bg-[#E2DDD3] dark:text-[#181715]'
                        : remainingToday === 0
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                        : 'bg-[#EFEAE0] dark:bg-[#282622] text-[#787166] dark:text-[#A8A298]'
                    }`}
                  >
                    {remainingToday === 0 ? '✓' : `${remainingToday} due`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Plan Header Card */}
      <div className="bg-[#FFFFFF] dark:bg-[#1A1916] rounded-2xl border border-[#E6E1D6] dark:border-[#2D2A26] p-6 md:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#ECE7DC] dark:border-[#2D2A26] pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C25E34]">
              {currentPlan.duration === '7_days' ? '1-Week Focus Sprint' : '1-Month Habit Builder'}
            </span>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-[#1C1917] dark:text-[#F5F2EB] mt-0.5">
              {currentPlan.bookTitle}
            </h1>
            <p className="text-xs text-[#787166] dark:text-[#9E968A]">
              By {currentPlan.bookAuthor}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3.5 py-1.5 rounded-lg bg-[#F5F1E8] dark:bg-[#23211D] border border-[#E3DDD1] dark:border-[#332F2A] text-[#2D2A26] dark:text-[#F5F2EB] font-serif font-bold text-xs">
              Day {currentDay} of {totalDays}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="text-[#595349] dark:text-[#C4BEB3]">
            Progress: <span className="font-bold text-[#1C1917] dark:text-[#F5F2EB]">{completedTodayCount} of {todayTasks.length} tasks completed</span>
            {' '}· ~{totalMinutesToday} min total today
          </div>

          <button
            onClick={() => shortenTasks(currentPlan.bookId)}
            className="inline-flex items-center space-x-1.5 text-xs text-[#8C8275] hover:text-[#1C1917] dark:hover:text-[#F5F2EB] transition-colors cursor-pointer self-start sm:self-auto"
            title="Reduce estimated time and scale down remaining tasks"
          >
            <Sliders className="w-3.5 h-3.5 text-[#C25E34]" />
            <span>Make tasks shorter</span>
          </button>
        </div>
      </div>

      {/* TODAY'S TASKS LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg md:text-xl font-serif font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            Today's Micro-Tasks
          </h2>
          <span className="text-xs text-[#8C8275] dark:text-[#7A746B]">
            {todayTasks.length} actionable steps
          </span>
        </div>

        <div className="space-y-3.5">
          {todayTasks.map((task, index) => {
            const isCompleted = task.status === 'completed';
            const isAvailable = index <= firstUnfinishedIdx || firstUnfinishedIdx === -1;
            const typeInfo = typeConfig[task.type] || typeConfig.apply;

            return (
              <div
                key={task.id}
                className={`p-5 rounded-xl border transition-all ${
                  isCompleted
                    ? 'bg-[#F9F7F2]/80 dark:bg-[#181714]/80 border-[#E8E3D8] dark:border-[#262420] opacity-90'
                    : isAvailable
                    ? 'bg-[#FFFFFF] dark:bg-[#1C1B17] border-[#DDD7CC] dark:border-[#38342E] hover:border-[#C25E34] shadow-xs'
                    : 'bg-[#F7F5EE]/60 dark:bg-[#151412]/60 border-[#E8E4DB] dark:border-[#23211E] opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center space-x-2 text-xs text-[#8C8275] dark:text-[#9E968A]">
                      <span className={`font-bold text-[10px] uppercase tracking-wider ${typeInfo.color}`}>
                        {typeInfo.name}
                      </span>
                      <span>·</span>
                      <span className="flex items-center space-x-1 font-mono text-[11px]">
                        <Clock className="w-3 h-3 text-[#8C8275]" />
                        <span>~{task.estimatedMinutes} min</span>
                      </span>
                      <span>·</span>
                      <span>{task.concept}</span>
                    </div>

                    <h3 className={`text-base font-serif font-bold leading-snug ${isCompleted ? 'text-[#8C8275] line-through' : 'text-[#1C1917] dark:text-[#F5F2EB]'}`}>
                      {index + 1}. {task.title}
                    </h3>

                    <p className="text-xs text-[#595349] dark:text-[#C4BEB3] leading-relaxed">
                      {task.description}
                    </p>

                    {task.reason && (
                      <p className="text-[11px] text-[#8C8275] dark:text-[#888177] italic">
                        Why this helps: {task.reason}
                      </p>
                    )}
                  </div>

                  {/* Actions & Status */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    {isCompleted ? (
                      <span className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                        <Check className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </span>
                    ) : isAvailable ? (
                      <button
                        onClick={() => handleStartTask(task)}
                        className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#C25E34] hover:bg-[#B0522B] text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                      >
                        <span>Start Task</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="inline-flex items-center space-x-1 text-xs text-[#8C8275] bg-[#EFEAE0] dark:bg-[#201E1A] px-3 py-1 rounded-lg">
                        <Lock className="w-3 h-3" />
                        <span>Next up</span>
                      </span>
                    )}

                    {/* Ask PSYCLONE Contextual Button */}
                    <button
                      onClick={() => askTaskHelp(task)}
                      className="text-[11px] text-[#787166] dark:text-[#9E968A] hover:text-[#C25E34] transition-colors cursor-pointer inline-flex items-center space-x-1 font-medium"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Ask PSYCLONE</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MILESTONE BANNER: SHOW THE NEXT DAY AFTER TODAY'S TASKS ARE COMPLETED */}
      {allTodayCompleted && (
        <div className="bg-[#F5F8F5] dark:bg-[#16211A] border-2 border-emerald-300 dark:border-emerald-800 rounded-2xl p-6 md:p-8 space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                Milestone Reached
              </span>
              <h3 className="text-xl font-serif font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                Day {currentDay} Completed
              </h3>
              <p className="text-xs text-emerald-800 dark:text-emerald-300">
                You've completed all tasks for today. Small daily actions create lasting compounding results.
              </p>
            </div>
          </div>

          {/* Tomorrow Preview */}
          {currentDay < totalDays && (
            <div className="bg-[#FFFFFF] dark:bg-[#1A1916] rounded-xl border border-emerald-200 dark:border-emerald-900/60 p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-[#ECE7DC] dark:border-[#2D2A26] pb-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#8C8275]" />
                  <span className="font-serif font-bold text-sm text-[#1C1917] dark:text-[#F5F2EB]">
                    Tomorrow: Day {currentDay + 1}
                  </span>
                </div>
                <span className="text-xs text-[#8C8275]">
                  {tomorrowTasks.length > 0 ? `${tomorrowTasks.length} upcoming tasks` : 'Next session prepared'}
                </span>
              </div>

              {tomorrowTasks.length > 0 ? (
                <div className="space-y-2">
                  {tomorrowTasks.map(t => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between text-xs py-1.5 border-b border-[#F5F1E8] dark:border-[#23211D] last:border-0"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8C8275]" />
                        <span className="font-medium text-[#1C1917] dark:text-[#F5F2EB]">{t.title}</span>
                        <span className="text-[10px] uppercase font-bold text-[#8C8275]">({t.type})</span>
                      </div>
                      <span className="text-[#8C8275] font-mono text-[11px]">~{t.estimatedMinutes} min</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-[#686259] dark:text-[#A8A298]">
                  Day {currentDay + 1} tasks will guide you in applying core principles with self-reflection.
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-[#8C8275]">
                  Ready to continue right now?
                </span>
                <button
                  type="button"
                  onClick={() => advanceToNextDay(currentPlan.bookId)}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#C25E34] hover:bg-[#B0522B] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <span>Advance to Day {currentDay + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MISSED TASKS SECTION */}
      {missedTasks.length > 0 && (
        <div className="bg-[#FAF8F5] dark:bg-[#1A1916] rounded-2xl border border-[#E6E1D6] dark:border-[#2D2A26] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-serif font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              Previous Unfinished Tasks
            </h3>
            <span className="text-xs text-[#8C8275]">Flexible pace</span>
          </div>

          <p className="text-xs text-[#686259] dark:text-[#A8A298] leading-relaxed">
            Missed tasks are completely natural. Would you like to revisit any today?
          </p>

          <div className="space-y-2.5">
            {missedTasks.map(task => (
              <div
                key={task.id}
                className="p-3.5 rounded-xl bg-[#FFFFFF] dark:bg-[#201E1B] border border-[#E3DDD1] dark:border-[#332F2A] flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-[#1C1917] dark:text-[#F5F2EB]">{task.title}</span>
                  <p className="text-[#8C8275] text-[11px]">{task.concept} · ~{task.estimatedMinutes} min</p>
                </div>
                <button
                  onClick={() => retryTask(task.id)}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-[#DDD7CC] dark:border-[#38342E] hover:bg-[#F5F2E9] dark:hover:bg-[#282622] font-semibold text-xs text-[#1C1917] dark:text-[#F5F2EB] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3 text-[#C25E34]" />
                  <span>Retry</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOTTOM "NEED HELP? ASK PSYCLONE" SECTION */}
      <div className="bg-[#FFFFFF] dark:bg-[#1A1916] rounded-2xl border border-[#E6E1D6] dark:border-[#2D2A26] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="space-y-0.5">
          <h3 className="text-sm font-serif font-bold text-[#1C1917] dark:text-[#F5F2EB]">
            Need guidance or a practical example?
          </h3>
          <p className="text-xs text-[#787166] dark:text-[#9E968A]">
            Ask PSYCLONE to unpack any concept, adjust a task, or give a student-specific demonstration.
          </p>
        </div>
        <button
          onClick={() => {
            const firstActive = todayTasks.find(t => t.status !== 'completed') || todayTasks[0];
            if (firstActive) {
              askTaskHelp(firstActive);
            } else {
              setActiveTab('chat');
            }
          }}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-[#2D2A26] dark:bg-[#F5F2EB] hover:bg-[#1C1917] dark:hover:bg-white text-white dark:text-[#181715] font-bold text-xs transition-colors cursor-pointer shrink-0"
        >
          <MessageSquare className="w-4 h-4 text-[#C25E34]" />
          <span>Ask PSYCLONE</span>
        </button>
      </div>

      {/* MODAL: TASK EXECUTION RUNNER */}
      {activeTaskForModal && (
        <div className="fixed inset-0 z-50 bg-[#141311]/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FFFFFF] dark:bg-[#1A1916] rounded-2xl border border-[#E6E1D6] dark:border-[#2D2A26] max-w-lg w-full p-6 md:p-8 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-[#ECE7DC] dark:border-[#2D2A26] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C25E34]">
                  {activeTaskForModal.type.toUpperCase()} · {activeTaskForModal.estimatedMinutes} MIN
                </span>
                <h3 className="text-lg font-serif font-bold text-[#1C1917] dark:text-[#F5F2EB] mt-0.5">
                  {activeTaskForModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveTaskForModal(null)}
                className="p-1.5 text-[#8C8275] hover:text-[#1C1917] dark:hover:text-[#F5F2EB] rounded-lg hover:bg-[#F3EFE6] dark:hover:bg-[#262420] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs leading-relaxed text-[#38342E] dark:text-[#D6D0C5]">
              <p className="font-medium text-sm text-[#1C1917] dark:text-[#F5F2EB]">
                {activeTaskForModal.description}
              </p>

              {activeTaskForModal.actionPrompt && (
                <div className="p-4 rounded-xl bg-[#F8F5EE] dark:bg-[#201E1A] border border-[#EAE3D6] dark:border-[#332F2A] text-[#2D2A26] dark:text-[#F5F2EB] font-serif text-sm">
                  {activeTaskForModal.actionPrompt}
                </div>
              )}

              {/* Interaction note input */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C8275] block">
                  Your Action / Reflection Note:
                </label>
                <textarea
                  rows={3}
                  value={taskInputText}
                  onChange={e => setTaskInputText(e.target.value)}
                  placeholder="Record what you observed, what step you took, or what you felt..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#DDD7CC] dark:border-[#38342E] bg-[#FCFBF8] dark:bg-[#141311] text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:ring-2 focus:ring-[#C25E34]/40 focus:border-[#C25E34] resize-none leading-relaxed"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#ECE7DC] dark:border-[#2D2A26] flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  askTaskHelp(activeTaskForModal);
                  setActiveTaskForModal(null);
                }}
                className="text-xs font-semibold text-[#8C8275] hover:text-[#C25E34] inline-flex items-center space-x-1 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Need an example?</span>
              </button>

              <button
                type="button"
                onClick={handleFinishTask}
                className="inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-lg bg-[#C25E34] hover:bg-[#B0522B] text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Mark Completed</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: POST-TASK FEEDBACK */}
      {feedbackModalTask && (
        <div className="fixed inset-0 z-50 bg-[#141311]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] dark:bg-[#1A1916] rounded-2xl border border-[#E6E1D6] dark:border-[#2D2A26] max-w-md w-full p-6 md:p-8 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="space-y-1 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Task Completed
              </span>
              <h3 className="text-xl font-serif font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                Did this help?
              </h3>
              <p className="text-xs text-[#787166] dark:text-[#9E968A]">
                Your feedback adapts future tasks to what actually resonates with you.
              </p>
            </div>

            {/* 4 Choices */}
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'helped', label: 'Helped' },
                { id: 'helped_little', label: 'Helped a little' },
                { id: 'didnt_help', label: "Didn't help" },
                { id: 'not_sure', label: 'Not sure' }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setFeedbackHelpfulness(opt.id as any)}
                  className={`p-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    feedbackHelpfulness === opt.id
                      ? 'bg-[#2D2A26] dark:bg-[#F5F2EB] text-white dark:text-[#181715] border-[#2D2A26] dark:border-white shadow-xs'
                      : 'bg-[#FCFBF8] dark:bg-[#201E1B] border-[#DDD7CC] dark:border-[#38342E] text-[#4A453D] dark:text-[#D1CBC1] hover:border-[#8C8275]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Optional Comment */}
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-[#787166] dark:text-[#9E968A]">
                What changed after doing this task? (optional)
              </label>
              <input
                type="text"
                value={feedbackComment}
                onChange={e => setFeedbackComment(e.target.value)}
                placeholder="e.g. Felt less hesitation to sit at my desk..."
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DDD7CC] dark:border-[#38342E] bg-[#FCFBF8] dark:bg-[#141311] text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:ring-2 focus:ring-[#C25E34]/40"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setFeedbackModalTask(null)}
                className="text-xs text-[#8C8275] hover:text-[#1C1917] dark:hover:text-[#F5F2EB] cursor-pointer"
              >
                Skip
              </button>

              <button
                type="button"
                onClick={handleSendFeedback}
                className="px-5 py-2 rounded-lg bg-[#C25E34] hover:bg-[#B0522B] text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Save Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
