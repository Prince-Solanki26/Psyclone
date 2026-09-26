import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BOOKS, getBookById } from '../data/books';
import {
  Send,
  BookOpen,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Bookmark
} from 'lucide-react';

export const ChatView: React.FC = () => {
  const {
    chatMessages,
    isLoadingChat,
    sendChatMessage,
    clearChat,
    openPaceSelection,
    requestMoreBooksInChat,
    setActiveTab,
    setSelectedBook,
    currentPlan
  } = useApp();

  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isLoadingChat]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isLoadingChat) return;
    sendChatMessage(inputText);
    setInputText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSelectBook = (bookId: string) => {
    const book = getBookById(bookId);
    if (book) {
      openPaceSelection(book);
    }
  };

  const handleExploreBook = (bookId: string) => {
    const book = getBookById(bookId);
    if (book) {
      setSelectedBook(book);
      setActiveTab('books');
    }
  };

  const handleSuggestedClick = (text: string) => {
    const lower = text.toLowerCase();

    // Check for returning to tasks
    if (
      lower.includes('back to my tasks') ||
      lower.includes('back to tasks') ||
      lower.includes('return to tasks') ||
      lower.includes('go to tasks')
    ) {
      setActiveTab('tasks');
      return;
    }

    // Check for plan setup or explore
    if (lower.startsWith('set up a plan for') || lower.startsWith('explore ')) {
      const book = BOOKS.find(
        b => lower.includes(b.title.toLowerCase()) || lower.includes(b.id)
      );
      if (book) {
        if (lower.startsWith('explore ')) {
          handleExploreBook(book.id);
        } else {
          handleSelectBook(book.id);
        }
        return;
      }
    }

    // Check for requesting other books
    if (
      lower.includes('show me a different book') ||
      lower.includes('different book') ||
      lower.includes('more books') ||
      lower.includes('another book')
    ) {
      requestMoreBooksInChat();
      return;
    }

    sendChatMessage(text);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-60px)] md:h-screen max-w-3xl mx-auto w-full">
      {/* Top Header */}
      <header className="px-5 py-3.5 bg-[#FDFBF7] dark:bg-[#181715] border-b border-[#E8E4DC] dark:border-[#2C2A26] flex items-center justify-between sticky top-0 z-10 shrink-0 transition-colors">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-[#C25E34] text-white flex items-center justify-center font-serif text-base font-bold shadow-xs">
            Ψ
          </div>
          <div>
            <h1 className="font-serif font-bold text-base text-[#1C1917] dark:text-[#F5F2EB] leading-tight">
              PSYCLONE
            </h1>
            <p className="text-[11px] text-[#8C8275] dark:text-[#9E968A]">
              Reflective Dialogue & Book Wisdom
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {currentPlan && (
            <button
              onClick={() => setActiveTab('tasks')}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#EFEAE0] dark:bg-[#282522] hover:bg-[#E5DFD4] dark:hover:bg-[#332F2A] text-[#2D2A26] dark:text-[#EAE6DE] transition-colors cursor-pointer"
            >
              Today's Tasks
            </button>
          )}

          <button
            onClick={clearChat}
            title="Start fresh conversation"
            className="p-1.5 text-[#8C8275] hover:text-[#1C1917] dark:hover:text-[#F5F2EB] rounded-lg hover:bg-[#EFEAE0] dark:hover:bg-[#282522] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {chatMessages.map(msg => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-2`}
            >
              {/* Message Header */}
              <div className="flex items-center space-x-2 px-1 text-[11px] text-[#8C8275] dark:text-[#7A746B]">
                <span className="font-semibold text-[#4A453E] dark:text-[#B5AFA4]">
                  {isUser ? 'You' : 'PSYCLONE'}
                </span>
                <span>·</span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[90%] md:max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                  isUser
                    ? 'bg-[#2D2A26] dark:bg-[#F5F2EB] text-[#FDFBF7] dark:text-[#181715] rounded-tr-xs shadow-xs font-medium'
                    : 'bg-[#FFFFFF] dark:bg-[#1E1D19] text-[#1C1917] dark:text-[#F2EFE8] border border-[#E6E1D6] dark:border-[#2E2B26] rounded-tl-xs shadow-xs'
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
              </div>

              {/* BOOK RECOMMENDATIONS CARD IN CHAT */}
              {!isUser && msg.recommendations && msg.recommendations.length > 0 && (
                <div className="max-w-[96%] md:max-w-[90%] w-full space-y-3 mt-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#8C8275] dark:text-[#9E968A] px-1">
                    Recommended Resource:
                  </div>

                  <div className="grid grid-cols-1 gap-3.5">
                    {msg.recommendations.map(bookRec => (
                      <div
                        key={bookRec.bookId}
                        className="bg-[#FFFFFF] dark:bg-[#1C1B17] border border-[#E3DDD1] dark:border-[#332F2A] hover:border-[#C25E34] rounded-2xl p-5 shadow-xs space-y-3 transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C25E34]">
                              Recommended Book
                            </span>
                            <h3 className="text-base font-serif font-bold text-[#1C1917] dark:text-[#F5F2EB] mt-0.5">
                              {bookRec.title}
                            </h3>
                            <p className="text-xs text-[#787166] dark:text-[#9E968A]">
                              By {bookRec.author}
                            </p>
                          </div>
                          <BookOpen className="w-5 h-5 text-[#8C8275]" />
                        </div>

                        <p className="text-xs text-[#4A453D] dark:text-[#D1CBC1] leading-relaxed">
                          {bookRec.overview}
                        </p>

                        {/* Why this may be relevant */}
                        <div className="p-3 rounded-xl bg-[#F8F5EE] dark:bg-[#23211D] border border-[#EBE5D8] dark:border-[#2C2925] text-xs space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8275] dark:text-[#9E968A] block">
                            Why this connects to your situation:
                          </span>
                          <p className="text-[#38342E] dark:text-[#E2DDD3] leading-relaxed italic">
                            "{bookRec.whySelected}"
                          </p>
                        </div>

                        {/* Key Idea */}
                        <div className="text-xs text-[#595349] dark:text-[#C4BEB3]">
                          <span className="font-semibold text-[#1C1917] dark:text-[#F5F2EB]">Key Takeaway: </span>
                          <span>{bookRec.keyIdea}</span>
                        </div>

                        {/* Action Buttons: Set up Plan or Explore */}
                        <div className="pt-3 border-t border-[#ECE7DC] dark:border-[#2D2A26] flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleSelectBook(bookRec.bookId)}
                            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#C25E34] hover:bg-[#B0522B] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                          >
                            <Bookmark className="w-3.5 h-3.5" />
                            <span>Set up a Plan for {bookRec.title}</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleExploreBook(bookRec.bookId)}
                            className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl border border-[#DED7CC] dark:border-[#38342E] hover:bg-[#F5F2E9] dark:hover:bg-[#262420] text-[#4A453D] dark:text-[#D1CBC1] text-xs font-semibold transition-colors cursor-pointer"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Read Summary</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Alternative actions: Different book or keep talking */}
                  <div className="pt-1 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={requestMoreBooksInChat}
                      className="text-xs font-semibold text-[#686259] dark:text-[#B5AFA4] hover:text-[#1C1917] dark:hover:text-[#F5F2EB] px-3.5 py-2 rounded-xl border border-[#DED7CC] dark:border-[#38342E] hover:bg-[#F5F2E9] dark:hover:bg-[#262420] transition-colors cursor-pointer"
                    >
                      Show me a different book
                    </button>
                    <button
                      type="button"
                      onClick={() => sendChatMessage("I'd like to talk a bit more first before choosing a plan.")}
                      className="text-xs font-semibold text-[#686259] dark:text-[#B5AFA4] hover:text-[#1C1917] dark:hover:text-[#F5F2EB] px-3.5 py-2 rounded-xl border border-[#DED7CC] dark:border-[#38342E] hover:bg-[#F5F2E9] dark:hover:bg-[#262420] transition-colors cursor-pointer"
                    >
                      Let's keep talking first
                    </button>
                  </div>
                </div>
              )}

              {/* Suggested Quick Replies */}
              {!isUser && msg.suggestedReplies && msg.suggestedReplies.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1 pl-1">
                  {msg.suggestedReplies.map((reply, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestedClick(reply)}
                      className="text-xs bg-[#F7F4EC] dark:bg-[#201E1B] hover:bg-[#EFEADF] dark:hover:bg-[#2A2723] border border-[#E3DDD1] dark:border-[#332F2A] text-[#4A453D] dark:text-[#D1CBC1] px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer text-left"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoadingChat && (
          <div className="flex items-center space-x-2 text-[#8C8275] dark:text-[#7A746B] text-xs px-2 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#C25E34] animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#C25E34] animate-pulse delay-150" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#C25E34] animate-pulse delay-300" />
            <span className="ml-2 font-medium">PSYCLONE is writing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Bar */}
      <div className="p-3 md:p-4 bg-[#FDFBF7] dark:bg-[#181715] border-t border-[#E8E4DC] dark:border-[#2C2A26] shrink-0 transition-colors">
        <form onSubmit={handleSubmit} className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputText}
              onChange={e => {
                setInputText(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
              }}
              onKeyDown={handleKeyDown}
              placeholder="Write a message... (Enter to send, Shift+Enter for newline)"
              className="w-full px-4 py-3 text-sm rounded-xl border border-[#DDD7CC] dark:border-[#38342E] bg-[#FFFFFF] dark:bg-[#1A1916] text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:ring-2 focus:ring-[#C25E34]/40 focus:border-[#C25E34] transition-all placeholder:text-[#9C9488] dark:placeholder:text-[#686259] resize-none max-h-32"
            />
          </div>
          <button
            type="submit"
            disabled={!inputText.trim() || isLoadingChat}
            className="p-3 rounded-xl bg-[#C25E34] hover:bg-[#B0522B] disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all shadow-xs shrink-0 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
