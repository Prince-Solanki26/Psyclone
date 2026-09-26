import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Compass, ArrowRight } from 'lucide-react';

export const PaceSelectionModal: React.FC = () => {
  const { paceSelectionBook, closePaceSelection, selectPlanDuration } = useApp();

  if (!paceSelectionBook) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#141311]/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FFFFFF] dark:bg-[#1A1916] rounded-2xl border border-[#E6E1D6] dark:border-[#2D2A26] shadow-2xl max-w-lg w-full p-6 md:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#ECE7DC] dark:border-[#2D2A26] pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C25E34]">
              Plan Setup
            </span>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1C1917] dark:text-[#F5F2EB] mt-0.5">
              How much time would you like?
            </h2>
            <p className="text-xs text-[#787166] dark:text-[#9E968A] mt-1">
              Select your pacing for <span className="font-semibold text-[#1C1917] dark:text-[#F5F2EB]">"{paceSelectionBook.title}"</span>.
            </p>
          </div>
          <button
            onClick={closePaceSelection}
            className="p-1.5 text-[#8C8275] hover:text-[#1C1917] dark:hover:text-[#F5F2EB] rounded-lg hover:bg-[#F3EFE6] dark:hover:bg-[#262420] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2 Main Options: 1 WEEK vs 1 MONTH */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 1 WEEK */}
          <div
            onClick={() => selectPlanDuration(paceSelectionBook.id, '7_days')}
            className="p-5 rounded-xl border-2 border-[#E3DDD1] dark:border-[#332F2A] hover:border-[#C25E34] hover:bg-[#FAF8F5] dark:hover:bg-[#201E1B] transition-all cursor-pointer flex flex-col justify-between group shadow-xs"
          >
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-serif font-bold text-lg text-[#1C1917] dark:text-[#F5F2EB]">
                  1 Week
                </span>
                <span className="text-xs font-semibold text-[#C25E34]">
                  7 Days
                </span>
              </div>

              <p className="text-xs text-[#595349] dark:text-[#C4BEB3] leading-relaxed">
                An intensive 7-day focus sprint to tackle an immediate exam or hurdle.
              </p>

              <div className="text-[11px] text-[#787166] dark:text-[#9E968A] mt-4 space-y-1.5 border-t border-[#ECE7DC] dark:border-[#2D2A26] pt-3">
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C25E34]" />
                  <span>2–4 micro-tasks daily</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C25E34]" />
                  <span>~12–15 min per day</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C25E34]" />
                  <span>Rapid momentum</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => selectPlanDuration(paceSelectionBook.id, '7_days')}
              className="mt-5 w-full py-2.5 rounded-lg bg-[#C25E34] hover:bg-[#B0522B] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs inline-flex items-center justify-center space-x-1.5"
            >
              <span>Choose 1 Week</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 1 MONTH */}
          <div
            onClick={() => selectPlanDuration(paceSelectionBook.id, '30_days')}
            className="p-5 rounded-xl border-2 border-[#E3DDD1] dark:border-[#332F2A] hover:border-[#C25E34] hover:bg-[#FAF8F5] dark:hover:bg-[#201E1B] transition-all cursor-pointer flex flex-col justify-between group shadow-xs"
          >
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-serif font-bold text-lg text-[#1C1917] dark:text-[#F5F2EB]">
                  1 Month
                </span>
                <span className="text-xs font-semibold text-[#8C8275] dark:text-[#9E968A]">
                  30 Days
                </span>
              </div>

              <p className="text-xs text-[#595349] dark:text-[#C4BEB3] leading-relaxed">
                A steady 30-day rhythm designed for lasting habits without overwhelm.
              </p>

              <div className="text-[11px] text-[#787166] dark:text-[#9E968A] mt-4 space-y-1.5 border-t border-[#ECE7DC] dark:border-[#2D2A26] pt-3">
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8C8275]" />
                  <span>2–3 micro-tasks daily</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8C8275]" />
                  <span>~5–10 min per day</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8C8275]" />
                  <span>Low friction habit building</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => selectPlanDuration(paceSelectionBook.id, '30_days')}
              className="mt-5 w-full py-2.5 rounded-lg bg-[#2D2A26] dark:bg-[#F5F2EB] hover:bg-[#1C1917] dark:hover:bg-white text-white dark:text-[#181715] text-xs font-bold transition-colors cursor-pointer shadow-xs inline-flex items-center justify-center space-x-1.5"
            >
              <span>Choose 1 Month</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <p className="text-[11px] text-center text-[#8C8275] dark:text-[#888177]">
          Selecting a pace immediately prepares your Day 1 tasks.
        </p>
      </div>
    </div>
  );
};
