import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  MessageSquare,
  CheckSquare,
  BookOpen,
  BarChart2,
  Sun,
  Moon,
  RotateCcw,
  Layers
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    currentPlan,
    activeBookPlans,
    switchActiveBookPlan,
    theme,
    toggleTheme,
    resetToCleanState
  } = useApp();

  const allActivePlans = Object.values(activeBookPlans);

  // Compute total remaining tasks across ALL ongoing books
  const remainingTodayTasks = allActivePlans.reduce((sum, plan) => {
    return (
      sum +
      plan.tasks.filter(
        t => t.day === plan.currentDay && (t.status === 'not_started' || t.status === 'in_progress')
      ).length
    );
  }, 0);

  interface NavItem {
    id: 'home' | 'chat' | 'tasks' | 'books' | 'progress';
    label: string;
    icon: any;
    badge?: string;
  }

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'chat', label: 'Talk to PSYCLONE', icon: MessageSquare },
    {
      id: 'tasks',
      label: 'My Tasks',
      icon: CheckSquare,
      badge: remainingTodayTasks > 0 ? `${remainingTodayTasks}` : undefined
    },
    { id: 'books', label: 'Books', icon: BookOpen },
    {
      id: 'progress',
      label: 'My Progress',
      icon: BarChart2,
      badge: allActivePlans.length > 1 ? `${allActivePlans.length}` : undefined
    }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#FDFBF7] dark:bg-[#181715] border-r border-[#E8E4DC] dark:border-[#2C2A26] h-screen sticky top-0 shrink-0 z-30 transition-colors">
        {/* Brand Header */}
        <div className="p-6 border-b border-[#E8E4DC] dark:border-[#2C2A26]">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => setActiveTab('home')}
            >
              <div className="w-8 h-8 rounded-lg bg-[#C25E34] text-white flex items-center justify-center font-serif text-lg font-bold shadow-xs">
                Ψ
              </div>
              <div>
                <span className="font-serif font-bold text-xl tracking-tight text-[#1C1917] dark:text-[#F5F2EB] block leading-none">
                  PSYCLONE
                </span>
                <span className="text-[10px] tracking-wider uppercase text-[#8C8275] dark:text-[#9C9488] font-medium">
                  Mindset & Books
                </span>
              </div>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-1.5 rounded-lg border border-[#E0DCD3] dark:border-[#38342E] hover:bg-[#F3EFE6] dark:hover:bg-[#262420] text-[#686259] dark:text-[#B5AFA4] transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Switch to warm light mode' : 'Switch to evening dark mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-[#686259]" />}
            </button>
          </div>
          <p className="mt-3 text-xs text-[#787166] dark:text-[#9C9488] leading-relaxed">
            Understand yourself. Learn what helps. Take one step at a time.
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#262320] dark:bg-[#F5F2EB] text-[#FDFBF7] dark:text-[#181715] font-semibold shadow-xs'
                    : 'text-[#686259] dark:text-[#A8A298] hover:text-[#1C1917] dark:hover:text-[#F5F2EB] hover:bg-[#F3EFE6] dark:hover:bg-[#23211E]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#FDFBF7] dark:text-[#181715]' : 'text-[#8C8275] dark:text-[#888177]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-[#3D3833] text-[#FAF8F5] dark:bg-[#E2DDD3] dark:text-[#181715]'
                        : 'bg-[#EDE8DE] dark:bg-[#2C2925] text-[#595349] dark:text-[#C4BEB3]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer: Ongoing Books status */}
        <div className="p-4 border-t border-[#E8E4DC] dark:border-[#2C2A26] bg-[#FDFBF7] dark:bg-[#181715] space-y-3">
          {allActivePlans.length > 0 && (
            <div className="p-3 rounded-xl bg-[#F6F2E9] dark:bg-[#211F1C] border border-[#E3DDD1] dark:border-[#332F2A] text-xs space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#8C8275] dark:text-[#9C9488]">
                <span>{allActivePlans.length === 1 ? 'Ongoing Book' : `Ongoing Books (${allActivePlans.length})`}</span>
                <button
                  onClick={() => setActiveTab('progress')}
                  className="text-[#C25E34] hover:underline cursor-pointer lowercase font-medium"
                >
                  view all
                </button>
              </div>

              {allActivePlans.length === 1 && currentPlan ? (
                <div>
                  <p className="font-serif font-bold text-[#1C1917] dark:text-[#F5F2EB] truncate">
                    {currentPlan.bookTitle}
                  </p>
                  <p className="text-[11px] text-[#787166] dark:text-[#9C9488]">
                    Day {currentPlan.currentDay} of {currentPlan.duration === '7_days' ? '7' : '30'}
                  </p>
                </div>
              ) : (
                <div className="space-y-1 max-h-24 overflow-y-auto pr-0.5">
                  {allActivePlans.map(plan => {
                    const isSelected = plan.bookId === currentPlan?.bookId;
                    return (
                      <button
                        key={plan.bookId}
                        onClick={() => {
                          switchActiveBookPlan(plan.bookId);
                          setActiveTab('tasks');
                        }}
                        className={`w-full text-left p-1.5 rounded-lg text-[11px] transition-colors cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#EAE3D4] dark:bg-[#2C2925] font-semibold text-[#1C1917] dark:text-[#F5F2EB]'
                            : 'text-[#686259] dark:text-[#A8A298] hover:bg-[#EFE9DD] dark:hover:bg-[#252320]'
                        }`}
                      >
                        <span className="truncate max-w-[120px]">{plan.bookTitle}</span>
                        <span className="text-[10px] text-[#8C8275] ml-1 shrink-0">d{plan.currentDay}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <button
            onClick={resetToCleanState}
            title="Reset to clean state"
            className="w-full flex items-center justify-center space-x-1.5 px-3 py-2 text-xs text-[#8C8275] hover:text-[#1C1917] dark:hover:text-[#F5F2EB] hover:bg-[#F3EFE6] dark:hover:bg-[#23211E] rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Clean State</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-[#FDFBF7] dark:bg-[#181715] border-b border-[#E8E4DC] dark:border-[#2C2A26] sticky top-0 z-40">
        <div
          className="flex items-center space-x-2.5 cursor-pointer"
          onClick={() => setActiveTab('home')}
        >
          <div className="w-7 h-7 rounded-lg bg-[#C25E34] text-white flex items-center justify-center font-serif text-base font-bold shadow-xs">
            Ψ
          </div>
          <span className="font-serif font-bold text-lg tracking-tight text-[#1C1917] dark:text-[#F5F2EB]">
            PSYCLONE
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {allActivePlans.length > 0 && (
            <button
              onClick={() => setActiveTab('progress')}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#F5F1E8] dark:bg-[#23211D] border border-[#E3DDD1] dark:border-[#332F2A] text-[#2D2A26] dark:text-[#F5F2EB]"
            >
              {allActivePlans.length} {allActivePlans.length === 1 ? 'Book' : 'Books'}
            </button>
          )}

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-1.5 rounded-lg border border-[#E0DCD3] dark:border-[#38342E] text-[#686259] dark:text-[#B5AFA4]"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-[#686259]" />}
          </button>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#FDFBF7] dark:bg-[#181715] border-t border-[#E8E4DC] dark:border-[#2C2A26] px-2 py-2 flex items-center justify-around z-40 shadow-lg">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-xs font-medium relative transition-colors cursor-pointer ${
                isActive
                  ? 'text-[#C25E34] dark:text-[#F5F2EB] font-bold'
                  : 'text-[#8C8275] dark:text-[#7A746B] hover:text-[#1C1917]'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] leading-tight text-center">{item.label.split(' ')[0]}</span>
              {item.badge && (
                <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-[#C25E34]" />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};
