import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ChatMessage,
  Book,
  DailyTask,
  PersonalizedPlan,
  PlanDuration,
  TaskFeedback,
  UserProgress,
  TaskType
} from '../types';
import { BOOKS, getBookById } from '../data/books';

interface AppContextType {
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Navigation
  activeTab: 'home' | 'chat' | 'tasks' | 'books' | 'progress';
  setActiveTab: (tab: 'home' | 'chat' | 'tasks' | 'books' | 'progress') => void;

  // Chat
  chatMessages: ChatMessage[];
  isLoadingChat: boolean;
  sendChatMessage: (text: string, context?: { bookId?: string; taskId?: string }) => Promise<void>;
  clearChat: () => void;
  startChatWithThought: (thought: string) => void;
  requestMoreBooksInChat: () => void;

  // Book Selection & Pace Flow (NEVER redirects to chat!)
  paceSelectionBook: Book | null;
  openPaceSelection: (book: Book) => void;
  closePaceSelection: () => void;
  startBookFromLibrary: (book: Book) => void;
  selectPlanDuration: (bookId: string, duration: PlanDuration) => Promise<void>;

  // Multiple Active Book Plans
  activeBookPlans: Record<string, PersonalizedPlan>;
  currentPlan: PersonalizedPlan | null;
  switchActiveBookPlan: (bookId: string) => void;

  // Task Actions
  activeTaskForModal: DailyTask | null;
  setActiveTaskForModal: (task: DailyTask | null) => void;
  feedbackModalTask: DailyTask | null;
  setFeedbackModalTask: (task: DailyTask | null) => void;
  completeTask: (taskId: string, userInput?: string) => void;
  submitTaskFeedback: (taskId: string, helpfulness: TaskFeedback['helpfulness'], comment?: string) => void;
  retryTask: (taskId: string) => void;
  shortenTasks: (bookId?: string) => void;
  advanceToNextDay: (bookId: string) => void;
  askTaskHelp: (task: DailyTask) => void;

  // Library Book Viewing
  selectedBook: Book | null;
  setSelectedBook: (book: Book | null) => void;

  // Progress & State
  userProgress: UserProgress;
  resetToCleanState: () => void;
}

const STORAGE_KEY = 'psyclone_state_v3';
const THEME_KEY = 'psyclone_theme';

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: 'msg-welcome',
  sender: 'psyclone',
  text: "Hey, I'm PSYCLONE.\n\nI'm here to help you work through what's been going on and find something practical you can try.\n\nWhat's on your mind?",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  suggestedReplies: [
    "I've been procrastinating a lot.",
    "I failed an exam and feel terrible.",
    "I'm overwhelmed by my semester deadlines.",
    "I can't seem to stay focused on studying."
  ]
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.warn('Failed to update theme class:', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'tasks' | 'books' | 'progress'>('home');

  // Saved Progress supporting multiple simultaneous active book plans
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved state:', e);
    }
    return {
      activeBookPlans: {},
      activeBookId: null,
      activityLog: [],
      feedbackList: []
    };
  });

  // Current active plan
  const currentPlan: PersonalizedPlan | null =
    (userProgress.activeBookId && userProgress.activeBookPlans[userProgress.activeBookId]) ||
    Object.values(userProgress.activeBookPlans)[0] ||
    null;

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([INITIAL_WELCOME_MESSAGE]);
  const [isLoadingChat, setIsLoadingChat] = useState<boolean>(false);

  // Active modals
  const [paceSelectionBook, setPaceSelectionBook] = useState<Book | null>(null);
  const [activeTaskForModal, setActiveTaskForModal] = useState<DailyTask | null>(null);
  const [feedbackModalTask, setFeedbackModalTask] = useState<DailyTask | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Save progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userProgress));
    } catch (e) {
      console.warn('Failed to save progress:', e);
    }
  }, [userProgress]);

  const resetToCleanState = () => {
    const clean: UserProgress = {
      activeBookPlans: {},
      activeBookId: null,
      activityLog: [],
      feedbackList: []
    };
    setUserProgress(clean);
    setChatMessages([INITIAL_WELCOME_MESSAGE]);
    setActiveTaskForModal(null);
    setFeedbackModalTask(null);
    setPaceSelectionBook(null);
    setSelectedBook(null);
    localStorage.removeItem(STORAGE_KEY);
    setActiveTab('home');
  };

  const startChatWithThought = (thought: string) => {
    setActiveTab('chat');
    sendChatMessage(thought);
  };

  const sendChatMessage = async (text: string, context?: { bookId?: string; taskId?: string }) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      relatedBookId: context?.bookId,
      relatedTaskId: context?.taskId
    };

    const newHistory = [...chatMessages, userMsg];
    setChatMessages(newHistory);
    setIsLoadingChat(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map(m => ({ sender: m.sender, text: m.text })),
          currentThoughtContext: text
        })
      });

      if (!response.ok) {
        throw new Error(`Chat API responded with ${response.status}`);
      }

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'psyclone',
        text: data.message || "I hear you. Tell me a bit more about what happened.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendations: data.recommendations || undefined,
        suggestedReplies: data.suggestedReplies || []
      };

      setChatMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackAiMsg: ChatMessage = {
        id: `ai-fallback-${Date.now()}`,
        sender: 'psyclone',
        text: "I'm listening. Could you share what feels like the biggest obstacle in this right now?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedReplies: [
          "I can't seem to stay consistent.",
          "I feel a lot of resistance whenever I sit down."
        ]
      };
      setChatMessages(prev => [...prev, fallbackAiMsg]);
    } finally {
      setIsLoadingChat(false);
    }
  };

  const clearChat = () => {
    setChatMessages([INITIAL_WELCOME_MESSAGE]);
  };

  // Pace Selection flow: Opens modal, DOES NOT return to chat!
  const openPaceSelection = (book: Book) => {
    setPaceSelectionBook(book);
  };

  const closePaceSelection = () => {
    setPaceSelectionBook(null);
  };

  // Generate Personalized Plan and IMMEDIATELY display Today's Tasks
  const selectPlanDuration = async (bookId: string, duration: PlanDuration) => {
    const book = getBookById(bookId);
    if (!book) return;

    setIsLoadingChat(true);
    setPaceSelectionBook(null);

    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId,
          duration,
          userContext: chatMessages.filter(m => m.sender === 'user').map(m => m.text).join(' ')
        })
      });

      const data = await response.json();
      const rawTasks = data.tasks || [];
      const tasks: DailyTask[] = rawTasks.map((t: any, idx: number) => ({
        ...t,
        order: t.order || (idx % 3) + 1,
        bookId: book.id
      }));

      const newPlan: PersonalizedPlan = {
        id: `plan-${book.id}-${Date.now()}`,
        bookId: book.id,
        bookTitle: book.title,
        bookAuthor: book.author,
        duration,
        startDate: new Date().toISOString(),
        currentDay: 1,
        tasks
      };

      // Add to multi-book active plans and select this book!
      setUserProgress(prev => ({
        ...prev,
        activeBookPlans: {
          ...prev.activeBookPlans,
          [book.id]: newPlan
        },
        activeBookId: book.id,
        activityLog: [
          {
            id: `act-${Date.now()}`,
            type: 'plan_started',
            title: `Started ${duration === '7_days' ? '1-Week' : '1-Month'} Plan: ${book.title}`,
            detail: `Generated multiple daily tasks based on your situation.`,
            timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
            bookId: book.id
          },
          ...prev.activityLog
        ]
      }));

      // CRITICAL FIX: Directly navigate to Today's Tasks! Do NOT return to chat!
      setActiveTab('tasks');
    } catch (err) {
      console.error('Failed to generate plan:', err);
    } finally {
      setIsLoadingChat(false);
    }
  };

  const switchActiveBookPlan = (bookId: string) => {
    if (userProgress.activeBookPlans[bookId]) {
      setUserProgress(prev => ({
        ...prev,
        activeBookId: bookId
      }));
      setActiveTab('tasks');
    }
  };

  const requestMoreBooksInChat = () => {
    const moreRecs = [
      {
        bookId: 'deep-work',
        title: 'Deep Work',
        author: 'Cal Newport',
        overview: 'Rules for focused, distraction-free studying in a world of constant notifications.',
        whySelected: 'If attention residue and phone checks are interrupting your momentum, this offers a clean structure.',
        keyIdea: 'Training focus sprints and eliminating cognitive residue from quick phone checks.'
      },
      {
        bookId: 'grit',
        title: 'Grit',
        author: 'Angela Duckworth',
        overview: 'Why passion and sustained perseverance matter more than talent when navigating difficult coursework.',
        whySelected: 'Helpful if you feel discouraged by slow progress or comparing yourself to classmates.',
        keyIdea: 'Effort counts twice: effort turns talent into skill, and skill into achievement.'
      },
      {
        bookId: 'essentialism',
        title: 'Essentialism',
        author: 'Greg McKeown',
        overview: 'The disciplined pursuit of less: eliminating non-essential tasks to protect your energy.',
        whySelected: 'Best if you feel pulled in ten different directions by assignments, clubs, and expectations.',
        keyIdea: 'Saying no to non-essentials so you can make your highest contribution to what matters.'
      }
    ];

    const aiMsg: ChatMessage = {
      id: `ai-more-${Date.now()}`,
      sender: 'psyclone',
      text: "Here are three other approaches that might match what you're dealing with:",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      recommendations: moreRecs
    };

    setChatMessages(prev => [...prev, aiMsg]);
  };

  // Complete a task: Real completion with userInput
  const completeTask = (taskId: string, userInput?: string) => {
    if (!currentPlan) return;

    const bookId = currentPlan.bookId;
    const targetTask = currentPlan.tasks.find(t => t.id === taskId);
    if (!targetTask) return;

    const completedTask: DailyTask = {
      ...targetTask,
      status: 'completed',
      completedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      userInput: userInput || targetTask.userInput
    };

    const updatedTasks = currentPlan.tasks.map(t => (t.id === taskId ? completedTask : t));

    setUserProgress(prev => {
      const plan = prev.activeBookPlans[bookId];
      if (!plan) return prev;

      return {
        ...prev,
        activeBookPlans: {
          ...prev.activeBookPlans,
          [bookId]: {
            ...plan,
            tasks: updatedTasks
          }
        },
        activityLog: [
          {
            id: `act-${Date.now()}`,
            type: 'task_completed',
            title: `Completed: ${completedTask.title}`,
            detail: `${completedTask.type.toUpperCase()} • ${completedTask.estimatedMinutes} min (${plan.bookTitle})`,
            timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
            bookId
          },
          ...prev.activityLog
        ]
      };
    });

    setActiveTaskForModal(null);
    // Show immediate feedback modal
    setFeedbackModalTask(completedTask);
  };

  // Submit Feedback after task completion
  const submitTaskFeedback = (
    taskId: string,
    helpfulness: TaskFeedback['helpfulness'],
    comment?: string
  ) => {
    if (!currentPlan) return;
    const bookId = currentPlan.bookId;
    const targetTask = currentPlan.tasks.find(t => t.id === taskId);
    if (!targetTask) return;

    const feedback: TaskFeedback = {
      helpfulness,
      comment,
      createdAt: new Date().toISOString()
    };

    const updatedTasks = currentPlan.tasks.map(t =>
      t.id === taskId ? { ...t, feedback } : t
    );

    setUserProgress(prev => {
      const plan = prev.activeBookPlans[bookId];
      if (!plan) return prev;

      return {
        ...prev,
        activeBookPlans: {
          ...prev.activeBookPlans,
          [bookId]: {
            ...plan,
            tasks: updatedTasks
          }
        },
        feedbackList: [
          {
            taskId,
            bookId,
            taskTitle: targetTask.title,
            taskType: targetTask.type,
            helpfulness,
            comment,
            timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          },
          ...prev.feedbackList
        ]
      };
    });

    setFeedbackModalTask(null);
  };

  // Retry a missed task
  const retryTask = (taskId: string) => {
    if (!currentPlan) return;
    const bookId = currentPlan.bookId;

    const updatedTasks = currentPlan.tasks.map(t =>
      t.id === taskId ? { ...t, status: 'in_progress' as const } : t
    );

    setUserProgress(prev => {
      const plan = prev.activeBookPlans[bookId];
      if (!plan) return prev;

      return {
        ...prev,
        activeBookPlans: {
          ...prev.activeBookPlans,
          [bookId]: {
            ...plan,
            tasks: updatedTasks
          }
        }
      };
    });

    const target = updatedTasks.find(t => t.id === taskId);
    if (target) {
      setActiveTaskForModal(target);
    }
  };

  // Make tasks shorter
  const shortenTasks = (bookId?: string) => {
    const targetBookId = bookId || currentPlan?.bookId;
    if (!targetBookId || !userProgress.activeBookPlans[targetBookId]) return;

    setUserProgress(prev => {
      const plan = prev.activeBookPlans[targetBookId];
      if (!plan) return prev;

      const updatedTasks = plan.tasks.map(t => {
        if (t.status === 'not_started' || t.status === 'in_progress') {
          return {
            ...t,
            estimatedMinutes: Math.max(2, Math.round(t.estimatedMinutes * 0.6))
          };
        }
        return t;
      });

      return {
        ...prev,
        activeBookPlans: {
          ...prev.activeBookPlans,
          [targetBookId]: {
            ...plan,
            adaptation: {
              ...plan.adaptation,
              shortenTasks: true
            },
            tasks: updatedTasks
          }
        }
      };
    });
  };

  // Advance to next day after completing all tasks of current day
  const advanceToNextDay = (bookId: string) => {
    setUserProgress(prev => {
      const plan = prev.activeBookPlans[bookId];
      if (!plan) return prev;
      const totalDays = plan.duration === '7_days' ? 7 : 30;
      if (plan.currentDay >= totalDays) return prev;

      return {
        ...prev,
        activeBookPlans: {
          ...prev.activeBookPlans,
          [bookId]: {
            ...plan,
            currentDay: plan.currentDay + 1
          }
        }
      };
    });
  };

  // Context-aware "Ask PSYCLONE" from any task
  const askTaskHelp = async (task: DailyTask) => {
    setActiveTab('chat');
    const bookTitle = currentPlan?.bookTitle || 'your plan';
    const helpQuestion = `I'm on Day ${task.day} working on the task "${task.title}" (${task.concept}) from "${bookTitle}". Can you give me a simple example of how to do this?`;

    // Send user message
    const userMsg: ChatMessage = {
      id: `user-task-${Date.now()}`,
      sender: 'user',
      text: helpQuestion,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      relatedTaskId: task.id,
      relatedBookId: task.bookId
    };

    const newHistory = [...chatMessages, userMsg];
    setChatMessages(newHistory);
    setIsLoadingChat(true);

    try {
      const res = await fetch('/api/task-help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskTitle: task.title,
          taskType: task.type,
          taskDescription: task.description,
          bookTitle,
          concept: task.concept,
          userQuestion: helpQuestion
        })
      });

      const data = await res.json();
      const aiMsg: ChatMessage = {
        id: `ai-task-${Date.now()}`,
        sender: 'psyclone',
        text: `${data.explanation}\n\n💡 Tip: ${data.quickTip}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedReplies: [
          "Got it, taking me back to my tasks!",
          "Can you explain a bit more?",
          "What if I only have 2 minutes?"
        ]
      };

      setChatMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.warn('Task help API failed, using fallback:', err);
      const fallbackAiMsg: ChatMessage = {
        id: `ai-task-fallback-${Date.now()}`,
        sender: 'psyclone',
        text: `For "${task.title}", don't worry about making it perfect. Simply take one tiny, effortless action for today's study session.\n\n💡 Tip: Keep the action under 2 minutes so your brain has zero friction to start.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedReplies: ["Take me back to my tasks."]
      };
      setChatMessages(prev => [...prev, fallbackAiMsg]);
    } finally {
      setIsLoadingChat(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        chatMessages,
        isLoadingChat,
        sendChatMessage,
        clearChat,
        startChatWithThought,
        requestMoreBooksInChat,
        paceSelectionBook,
        openPaceSelection,
        closePaceSelection,
        startBookFromLibrary: openPaceSelection,
        selectPlanDuration,
        activeBookPlans: userProgress.activeBookPlans,
        currentPlan,
        switchActiveBookPlan,
        activeTaskForModal,
        setActiveTaskForModal,
        feedbackModalTask,
        setFeedbackModalTask,
        completeTask,
        submitTaskFeedback,
        retryTask,
        shortenTasks,
        advanceToNextDay,
        askTaskHelp,
        selectedBook,
        setSelectedBook,
        userProgress,
        resetToCleanState
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
