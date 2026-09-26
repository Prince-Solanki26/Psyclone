export type Stage = 'awareness' | 'understanding' | 'challenge' | 'practice';

export type PaceType = 'quick' | 'balanced' | 'deep';

export interface PaceDetails {
  pace?: PaceType;
  title?: string;
  duration?: string;
  timeRange?: string;
  commitment?: string;
  targetAudience?: string;
  description: string;
  focusPoints?: string[];
  pathSteps?: any[];
}

export interface PracticeStep {
  stepNumber: number;
  title: string;
  instruction?: string;
  prompt: string;
  placeholder: string;
  helpTip?: string;
  helperText?: string;
  defaultInput?: string;
  userInput?: string;
}

export interface Practice {
  id?: string;
  title: string;
  subtitle?: string;
  estimatedMinutes?: number;
  durationMinutes?: number;
  duration?: string | number;
  type?: string;
  stage?: Stage;
  conceptTitle?: string;
  sourceBookTitle?: string;
  source?: string;
  prompt?: string;
  targetPattern?: string;
  targetThought?: string;
  relatedBookId?: string;
  relatedConceptId?: string;
  steps?: PracticeStep[];
  reflectionSummary?: string;
  isCompleted?: boolean;
}

export interface ThinkingPattern {
  id: string;
  name: string;
  definition: string;
  indicators: string[];
  examples: string[];
  explanation: string;
  reflectionPrompts?: string[];
  reflectionQuestions?: string[];
  actionRecommendation?: string;
  practiceTypes?: string[];
}

export type TaskType = 'learn' | 'reflect' | 'practice' | 'apply' | 'review' | 'checkin';

export type TaskStatus = 'not_started' | 'in_progress' | 'completed' | 'missed';

export type PlanDuration = '7_days' | '30_days';

export interface TaskFeedback {
  helpfulness: 'helped' | 'helped_little' | 'didnt_help' | 'not_sure';
  comment?: string;
  createdAt: string;
}

export interface DailyTask {
  id: string;
  bookPlanId?: string;
  day: number;
  order: number; // 1, 2, 3... within the day
  title: string;
  type: TaskType;
  description: string;
  bookId: string;
  concept: string;
  estimatedMinutes: number;
  status: TaskStatus;
  reason: string;
  actionPrompt?: string;
  userInput?: string;
  feedback?: TaskFeedback;
  completedAt?: string;
}

export interface PersonalizedPlan {
  id: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  duration: PlanDuration;
  startDate: string;
  currentDay: number;
  tasks: DailyTask[];
  adaptation?: {
    shortenTasks?: boolean;
    feedbackSummary?: string;
  };
}

export interface BookRecommendation {
  bookId: string;
  title: string;
  author: string;
  overview: string;
  whySelected: string;
  keyIdea: string;
  internalPattern?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'psyclone';
  text: string;
  timestamp: string;
  recommendations?: BookRecommendation[];
  suggestedReplies?: string[];
  relatedTaskId?: string;
  relatedBookId?: string;
  relatedBookConcept?: {
    bookTitle: string;
    conceptTitle: string;
  };
}

export interface BookConcept {
  id: string;
  title: string;
  shortExplanation: string;
  detailedExplanation: string;
  practicalExample: string;
  whyItMatters: string;
  applicationExample: string;
  suggestedQuestions: string[];
  practiceTemplate?: Practice;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  tagline: string;
  category: string[];
  readTimeEstimate: string;
  colorTheme: {
    bg: string;
    border: string;
    badge: string;
    accent: string;
  };
  summary: string;
  coreIdeas: string[];
  concepts: BookConcept[];
}

export interface ActivityItem {
  id: string;
  type: 'task_completed' | 'task_missed' | 'plan_started' | 'feedback_given';
  title: string;
  detail: string;
  timestamp: string;
  bookId?: string;
}

export interface UserProgress {
  activeBookPlans: Record<string, PersonalizedPlan>; // Keyed by bookId
  activeBookId: string | null; // Currently selected active book plan
  activityLog: ActivityItem[];
  feedbackList: {
    taskId: string;
    bookId: string;
    taskTitle: string;
    taskType: TaskType;
    helpfulness: TaskFeedback['helpfulness'];
    comment?: string;
    timestamp: string;
  }[];
}
