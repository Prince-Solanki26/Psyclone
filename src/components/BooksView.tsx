import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BOOKS } from '../data/books';
import { Book } from '../types';
import {
  Search,
  BookOpen,
  ArrowRight,
  MessageSquare,
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  BarChart2
} from 'lucide-react';

export const BooksView: React.FC = () => {
  const {
    startBookFromLibrary,
    setActiveTab,
    sendChatMessage,
    selectedBook,
    setSelectedBook,
    activeBookPlans,
    switchActiveBookPlan
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewingBook, setViewingBook] = useState<Book | null>(null);

  const currentViewingBook = viewingBook || selectedBook;

  const handleBackToLibrary = () => {
    setViewingBook(null);
    setSelectedBook(null);
  };

  const allCategories = ['All', 'Habits', 'Mindset', 'Focus', 'Psychology', 'Study Skills', 'Resilience', 'Confidence'];

  const filteredBooks = BOOKS.filter(book => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.concepts.some(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || book.category.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const handleDiscussInChat = (book: Book) => {
    setActiveTab('chat');
    sendChatMessage(`I'm interested in the book "${book.title}" by ${book.author}. How can its ideas help my student routine?`);
  };

  const handleJumpToPlan = (bookId: string) => {
    switchActiveBookPlan(bookId);
    setActiveTab('tasks');
  };

  // If viewing single book details
  if (currentViewingBook) {
    const ongoingPlan = activeBookPlans[currentViewingBook.id];
    const isOngoing = !!ongoingPlan;
    const totalDays = ongoingPlan ? (ongoingPlan.duration === '7_days' ? 7 : 30) : 7;
    const completedTasksCount = ongoingPlan
      ? ongoingPlan.tasks.filter(t => t.status === 'completed').length
      : 0;

    return (
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 space-y-8">
        <button
          onClick={handleBackToLibrary}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#8C8275] hover:text-[#1C1917] dark:hover:text-[#F5F2EB] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Curated Library</span>
        </button>

        <div className="bg-[#FFFFFF] dark:bg-[#1A1916] rounded-2xl border border-[#E6E1D6] dark:border-[#2D2A26] p-6 md:p-9 shadow-xs space-y-6">
          <div className="space-y-2 border-b border-[#ECE7DC] dark:border-[#2D2A26] pb-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#C25E34]">
                {currentViewingBook.category.join(' · ')}
              </span>

              {isOngoing && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Ongoing Journey: Day {ongoingPlan.currentDay} of {totalDays}</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-4xl font-serif font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              {currentViewingBook.title}
            </h1>
            <p className="text-sm text-[#787166] dark:text-[#9E968A] italic">
              By {currentViewingBook.author}
            </p>
          </div>

          <p className="text-sm text-[#4A453D] dark:text-[#D1CBC1] leading-relaxed">
            {currentViewingBook.summary}
          </p>

          {/* Ongoing Banner if already active */}
          {isOngoing && (
            <div className="p-4 rounded-xl bg-[#F8F5EE] dark:bg-[#201E1A] border border-[#E8E1D4] dark:border-[#332F2A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-[#1C1917] dark:text-[#F5F2EB] block">
                  You have an active plan for this book
                </span>
                <span className="text-[#787166] dark:text-[#9E968A]">
                  Day {ongoingPlan.currentDay} of {totalDays} · {completedTasksCount} of {ongoingPlan.tasks.length} tasks completed
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleJumpToPlan(currentViewingBook.id)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#C25E34] hover:bg-[#B0522B] text-white font-bold text-xs cursor-pointer"
                >
                  Continue Tasks
                </button>
                <button
                  onClick={() => setActiveTab('progress')}
                  className="px-3 py-1.5 rounded-lg border border-[#DDD7CC] dark:border-[#38342E] text-[#595349] dark:text-[#D1CBC1] font-semibold text-xs cursor-pointer"
                >
                  View in Progress
                </button>
              </div>
            </div>
          )}

          {/* Core Principles */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C8275]">
              Core Principles
            </h3>
            <div className="space-y-2.5">
              {currentViewingBook.coreIdeas.map((idea, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-[#F8F5EE] dark:bg-[#201E1A] border border-[#EBE4D8] dark:border-[#2D2A26] text-xs text-[#38342E] dark:text-[#D6D0C5]"
                >
                  <span className="font-serif font-bold text-sm text-[#1C1917] dark:text-[#F5F2EB] block mb-1">
                    Principle {i + 1}
                  </span>
                  {idea}
                </div>
              ))}
            </div>
          </div>

          {/* Concepts Covered */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C8275]">
              Key Concepts & Practices
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentViewingBook.concepts.map(concept => (
                <div
                  key={concept.id}
                  className="p-4 rounded-xl border border-[#E3DDD1] dark:border-[#332F2A] bg-[#FFFFFF] dark:bg-[#1E1D19] space-y-1 text-xs"
                >
                  <h4 className="font-serif font-bold text-sm text-[#1C1917] dark:text-[#F5F2EB]">
                    {concept.title}
                  </h4>
                  <p className="text-[#686259] dark:text-[#A8A298] leading-relaxed">
                    {concept.shortExplanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to actions */}
          <div className="pt-6 border-t border-[#ECE7DC] dark:border-[#2D2A26] flex flex-col sm:flex-row items-center gap-3">
            {isOngoing ? (
              <button
                onClick={() => handleJumpToPlan(currentViewingBook.id)}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-[#C25E34] hover:bg-[#B0522B] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <Bookmark className="w-4 h-4" />
                <span>Go to Today's Tasks for this Book</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => startBookFromLibrary(currentViewingBook)}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-[#C25E34] hover:bg-[#B0522B] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <Bookmark className="w-4 h-4" />
                <span>Start a Plan with this Book</span>
              </button>
            )}

            <button
              onClick={() => handleDiscussInChat(currentViewingBook)}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl border border-[#DED7CC] dark:border-[#38342E] text-[#38342E] dark:text-[#E2DDD3] hover:bg-[#F5F2E9] dark:hover:bg-[#262420] text-xs font-semibold transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#C25E34]" />
              <span>Discuss with PSYCLONE</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1C1917] dark:text-[#F5F2EB]">
          Curated Books
        </h1>
        <p className="text-xs md:text-sm text-[#686259] dark:text-[#A8A298]">
          Foundational books on habits, mindset, deep focus, and emotional resilience that drive daily micro-tasks.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8C8275] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search books, authors, or concepts..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-[#DDD7CC] dark:border-[#38342E] bg-[#FFFFFF] dark:bg-[#1A1916] text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:ring-2 focus:ring-[#C25E34]/40 focus:border-[#C25E34]"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#2D2A26] dark:bg-[#F5F2EB] text-[#FDFBF7] dark:text-[#181715] font-bold'
                  : 'bg-[#FFFFFF] dark:bg-[#1C1B17] border border-[#E3DDD1] dark:border-[#332F2A] text-[#595349] dark:text-[#C4BEB3] hover:bg-[#F7F4EC] dark:hover:bg-[#252320]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredBooks.map(book => {
          const ongoingPlan = activeBookPlans[book.id];
          const isOngoing = !!ongoingPlan;
          const totalDays = ongoingPlan ? (ongoingPlan.duration === '7_days' ? 7 : 30) : 7;

          return (
            <div
              key={book.id}
              onClick={() => setViewingBook(book)}
              className={`p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#1A1916] border transition-all cursor-pointer group flex flex-col justify-between shadow-xs ${
                isOngoing
                  ? 'border-[#C25E34]/70 hover:border-[#C25E34]'
                  : 'border-[#E6E1D6] dark:border-[#2D2A26] hover:border-[#C25E34]'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C25E34]">
                    {book.category.slice(0, 2).join(' · ')}
                  </span>

                  {isOngoing && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-sm">
                      Ongoing · Day {ongoingPlan.currentDay}/{totalDays}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-serif font-bold text-[#1C1917] dark:text-[#F5F2EB] group-hover:text-[#C25E34] transition-colors">
                  {book.title}
                </h3>

                <p className="text-xs text-[#787166] dark:text-[#9E968A] italic">
                  By {book.author}
                </p>

                <p className="text-xs text-[#595349] dark:text-[#C4BEB3] leading-relaxed line-clamp-3 pt-1">
                  {book.summary}
                </p>

                {/* Concepts preview */}
                <div className="pt-2 flex flex-wrap gap-1 text-[11px] text-[#8C8275] dark:text-[#9E968A]">
                  {book.concepts.slice(0, 3).map((c, i) => (
                    <span key={c.id}>
                      {c.title}{i < 2 ? ' · ' : ''}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#ECE7DC] dark:border-[#2D2A26] flex items-center justify-between text-xs font-semibold text-[#1C1917] dark:text-[#F5F2EB] group-hover:text-[#C25E34]">
                <span>{isOngoing ? "Continue Journey · View Details" : "Explore Book & Daily Plan"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
