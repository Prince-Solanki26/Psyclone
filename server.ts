import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

// Initialize Gemini API client if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize Gemini AI client:', err);
  }
}

// Resilient model fallback pool (gemini-3.1-flash-lite has separate quota and low latency)
const CANDIDATE_MODELS = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
const modelCooldownMap: Record<string, number> = {};

async function generateWithGemini(contents: any, config?: any): Promise<string | null> {
  if (!ai) return null;
  const now = Date.now();

  for (const model of CANDIDATE_MODELS) {
    const cooldownUntil = modelCooldownMap[model] || 0;
    if (now < cooldownUntil) {
      continue;
    }

    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config,
      });
      const text = response.text?.trim();
      if (text) return text;
    } catch (err: any) {
      const isQuotaError =
        err?.status === 429 ||
        err?.code === 429 ||
        err?.message?.includes('429') ||
        err?.message?.includes('RESOURCE_EXHAUSTED') ||
        err?.message?.includes('quota');

      if (isQuotaError) {
        // Cooldown this model for 60 seconds
        modelCooldownMap[model] = Date.now() + 60000;
      }
    }
  }

  return null;
}

// Curated Books Catalog for Recommendations
const CURATED_BOOKS = [
  {
    id: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    overview: 'Explores how small systems and environmental changes make difficult behaviors easier to maintain.',
    matchKeywords: ['habit', 'routine', 'consistency', 'distraction', 'procrastination', 'study schedule', 'discipline']
  },
  {
    id: 'mindset',
    title: 'Mindset: The New Psychology of Success',
    author: 'Carol S. Dweck',
    overview: 'Shows how viewing ability as learnable rather than fixed turns setbacks into useful diagnostic feedback.',
    matchKeywords: ['failed', 'exam', 'not smart', 'stupid', 'fraud', 'imposter', 'talent', 'marks', 'bad grade', 'test']
  },
  {
    id: 'deep-work',
    title: 'Deep Work',
    author: 'Cal Newport',
    overview: 'Guides how to eliminate fragmented attention and build distraction-free focus sprints.',
    matchKeywords: ['focus', 'phone', 'distracted', 'concentration', 'social media', 'attention', 'multitasking']
  },
  {
    id: 'grit',
    title: 'Grit: The Power of Passion and Perseverance',
    author: 'Angela Duckworth',
    overview: 'Demonstrates why sustained effort and resilience matter far more than innate giftedness.',
    matchKeywords: ['giving up', 'quit', 'too hard', 'demotivated', 'exhausted', 'slow progress']
  },
  {
    id: 'courage-to-be-disliked',
    title: 'The Courage to Be Disliked',
    author: 'Ichiro Kishimi & Fumitake Koga',
    overview: 'Teaches how to separate your own duties from other people\'s expectations and judgments.',
    matchKeywords: ['parents', 'expectations', 'pressure', 'judged', 'people think', 'social', 'comparison']
  },
  {
    id: 'make-it-stick',
    title: 'Make It Stick',
    author: 'Brown, Roediger & McDaniel',
    overview: 'The cognitive science of durable learning: active retrieval, self-testing, and spacing.',
    matchKeywords: ['forgetting', 'revision', 'memory', 'studying', 'syllabus', 'cramming', 'retain']
  },
  {
    id: 'essentialism',
    title: 'Essentialism: The Disciplined Pursuit of Less',
    author: 'Greg McKeown',
    overview: 'How to ruthlessly cut non-essential obligations to focus your energy on what truly counts.',
    matchKeywords: ['overwhelmed', 'too much to do', 'burnout', 'commitments', 'busy', 'exhausted']
  },
  {
    id: 'feel-the-fear',
    title: 'Feel the Fear and Do It Anyway',
    author: 'Susan Jeffers',
    overview: 'Dynamic techniques to handle fear and hesitation by trusting your ability to figure things out.',
    matchKeywords: ['scared', 'fear', 'anxiety', 'freeze', 'panic', 'nervous', 'interview', 'presentation']
  },
  {
    id: 'antidote',
    title: 'The Antidote',
    author: 'Oliver Burkeman',
    overview: 'Explores how accepting uncertainty and looking realistic difficulties in the eye brings calm.',
    matchKeywords: ['worry', 'worst case', 'overthinking', 'perfectionism', 'anxious', 'stress']
  },
  {
    id: 'flow',
    title: 'Flow: The Psychology of Optimal Experience',
    author: 'Mihaly Csikszentmihalyi',
    overview: 'How to adjust task challenges to match your current skill level and enter deeply enjoyable focus.',
    matchKeywords: ['bored', 'frustrated', 'challenge', 'interest', 'engagement']
  }
];

// Internal Thinking Pattern Detection (never exposed as clinical labels or diagnoses to user)
interface InternalPatternInsight {
  patternId: string;
  patternName: string;
  synthesis: string;
  primaryBook: typeof CURATED_BOOKS[0];
  secondaryBook: typeof CURATED_BOOKS[0];
  bookLeadIn: string;
  whyPrimary: string;
  keyIdeaPrimary: string;
}

function analyzeThinkingPatternsInternally(allUserText: string): InternalPatternInsight {
  const text = allUserText.toLowerCase();

  // Pattern: All-or-Nothing / Perfectionism
  if (text.includes('procrastinat') || text.includes('lazy') || text.includes('delay') || text.includes('perfect') || text.includes('all or nothing') || text.includes('putting off')) {
    return {
      patternId: 'all-or-nothing',
      patternName: 'All-or-Nothing Thinking',
      synthesis: "It sounds like you're putting a lot of pressure on yourself to be perfect, which ends up making it hard to even start.",
      primaryBook: CURATED_BOOKS[0], // Atomic Habits
      secondaryBook: CURATED_BOOKS[2], // Deep Work
      bookLeadIn: "There's a book that might be really helpful for this:\n**Atomic Habits** by James Clear.\n\nIt talks about how to lower the barrier to starting and build momentum with tiny changes.\n\nWould you like to explore this book and set up a simple daily plan to work on it?",
      whyPrimary: "Small, reliable starting routines bypass all-or-nothing pressure and eliminate resistance.",
      keyIdeaPrimary: "Making beginning actions smaller than 2 minutes and anchoring them to existing habits removes friction."
    };
  }

  // Pattern: Overgeneralization / Fixed Mindset / Exam failure
  if (text.includes('fail') || text.includes('exam') || text.includes('test') || text.includes('marks') || text.includes('grade') || text.includes('not smart') || text.includes('stupid') || text.includes('terrible at everything')) {
    return {
      patternId: 'overgeneralization',
      patternName: 'Overgeneralization',
      synthesis: "It sounds like this exam result hit your confidence really hard, making it feel like a verdict on your intelligence rather than a study strategy that just needs adjusting.",
      primaryBook: CURATED_BOOKS[1], // Mindset
      secondaryBook: CURATED_BOOKS[5], // Make It Stick
      bookLeadIn: "There's a book that might be really helpful for this:\n**Mindset: The New Psychology of Success** by Carol S. Dweck.\n\nIt explains how viewing ability as learnable rather than fixed turns setbacks into useful diagnostic feedback instead of permanent verdicts.\n\nWould you like to explore this book and set up a simple daily plan to work on it?",
      whyPrimary: "Shifts your perspective from proving your intellect to diagnosing what your preparation strategy missed.",
      keyIdeaPrimary: "Viewing challenges as informative experiments rather than verdicts on your personal worth."
    };
  }

  // Pattern: Catastrophizing / Overwhelm
  if (text.includes('overwhelm') || text.includes('too much') || text.includes('deadline') || text.includes('burnout') || text.includes('hopeless') || text.includes('ruined') || text.includes('impossible')) {
    return {
      patternId: 'catastrophizing',
      patternName: 'Catastrophizing',
      synthesis: "It sounds like having so many demands piling up at once is creating cognitive overload and leaving you drained, making everything feel urgent and overwhelming.",
      primaryBook: CURATED_BOOKS[6], // Essentialism
      secondaryBook: CURATED_BOOKS[0], // Atomic Habits
      bookLeadIn: "There's a book that might be really helpful for this:\n**Essentialism: The Disciplined Pursuit of Less** by Greg McKeown.\n\nIt shows how to ruthlessly eliminate non-essential obligations and protect your mental clarity for what truly matters.\n\nWould you like to explore this book and set up a simple daily plan to work on it?",
      whyPrimary: "Cuts through analysis paralysis by prioritizing only the single highest-value action today.",
      keyIdeaPrimary: "Saying no to non-essentials so you can make your highest contribution to what counts."
    };
  }

  // Pattern: Fortune Telling / Anxiety / Panic
  if (text.includes('anxiety') || text.includes('fear') || text.includes('panic') || text.includes('scared') || text.includes('freeze') || text.includes('nervous')) {
    return {
      patternId: 'fortune-telling',
      patternName: 'Fortune Telling',
      synthesis: "It sounds like anticipating the worst-case scenario and feeling uncertain about what's ahead is freezing your motivation before you can take action.",
      primaryBook: CURATED_BOOKS[7], // Feel the Fear
      secondaryBook: CURATED_BOOKS[8], // The Antidote
      bookLeadIn: "There's a book that might be really helpful for this:\n**Feel the Fear and Do It Anyway** by Susan Jeffers.\n\nIt gives grounded, practical tools to move forward calmly even while anxiety is present.\n\nWould you like to explore this book and set up a simple daily plan to work on it?",
      whyPrimary: "Helps you trust your ability to navigate uncertainty one realistic step at a time.",
      keyIdeaPrimary: "Taking action with fear present dissolves hesitation faster than waiting for perfect calm."
    };
  }

  // Pattern: Personalization / Social Comparison / Mind Reading
  if (text.includes('parents') || text.includes('expect') || text.includes('judged') || text.includes('comparison') || text.includes('people think') || text.includes('everyone else')) {
    return {
      patternId: 'personalization',
      patternName: 'Personalization & Comparison',
      synthesis: "It sounds like the weight of other people's expectations and comparing your progress to peers is creating constant pressure.",
      primaryBook: CURATED_BOOKS[4], // Courage to Be Disliked
      secondaryBook: CURATED_BOOKS[1], // Mindset
      bookLeadIn: "There's a book that might be really helpful for this:\n**The Courage to Be Disliked** by Ichiro Kishimi & Fumitake Koga.\n\nIt offers a powerful way to separate your own duties from the expectations and opinions of others.\n\nWould you like to explore this book and set up a simple daily plan to work on it?",
      whyPrimary: "Frees up your mental energy by focusing exclusively on what lies inside your own circle of control.",
      keyIdeaPrimary: "Separation of tasks: focus on your own effort and release responsibility for other people's reactions."
    };
  }

  // Pattern: Distraction / Divided Focus
  if (text.includes('focus') || text.includes('distract') || text.includes('phone') || text.includes('social media') || text.includes('attention') || text.includes('scroll')) {
    return {
      patternId: 'should-statements',
      patternName: 'Divided Focus',
      synthesis: "It sounds like digital noise and rapid context-switching are breaking your concentration before your brain can sink into deep study flow.",
      primaryBook: CURATED_BOOKS[2], // Deep Work
      secondaryBook: CURATED_BOOKS[0], // Atomic Habits
      bookLeadIn: "There's a book that might be really helpful for this:\n**Deep Work** by Cal Newport.\n\nIt provides practical rules to eliminate cognitive residue and master high-intensity focus sprints.\n\nWould you like to explore this book and set up a simple daily plan to work on it?",
      whyPrimary: "Rebuilds your cognitive endurance through structured, low-friction focus intervals.",
      keyIdeaPrimary: "Protecting distraction-free blocks produces dramatically higher quality study output in half the time."
    };
  }

  // Default
  return {
    patternId: 'all-or-nothing',
    patternName: 'Habit & Growth Alignment',
    synthesis: "It sounds like you're looking for a steady, sustainable way to make progress without burning yourself out or fighting constant resistance.",
    primaryBook: CURATED_BOOKS[0], // Atomic Habits
    secondaryBook: CURATED_BOOKS[1], // Mindset
    bookLeadIn: "There's a book that might be really helpful for this:\n**Atomic Habits** by James Clear.\n\nIt talks about how to lower the barrier to starting and build momentum with tiny changes.\n\nWould you like to explore this book and set up a simple daily plan to work on it?",
    whyPrimary: "Designing small, supportive daily systems beats waiting for fluctuating willpower.",
    keyIdeaPrimary: "Small daily adjustments compound into massive long-term results."
  };
}

// Natural Conversational Engine (Fallbacks and Logic)
function getLocalConversationalResponse(messages: { sender: string; text: string }[]) {
  const userMessages = messages.filter(m => m.sender === 'user');
  const userTurnCount = userMessages.length;
  const lastUserMsg = userMessages[userMessages.length - 1]?.text || '';
  const lower = lastUserMsg.toLowerCase();
  const allUserText = userMessages.map(m => m.text).join(' ').toLowerCase();

  // Handle explicit request for more/different books
  if (lower.includes('different book') || lower.includes('another book') || lower.includes('show me more books')) {
    const alt1 = CURATED_BOOKS[2]; // Deep Work
    const alt2 = CURATED_BOOKS[6]; // Essentialism
    return {
      message: "Here are two other perspectives that might fit where you're at right now:\n\n**Deep Work** focuses on distraction-free focus sprints, while **Essentialism** helps you cut down non-essential commitments. Would either of these feel like a better starting point?",
      readyForBooks: true,
      recommendations: [
        {
          bookId: alt1.id,
          title: alt1.title,
          author: alt1.author,
          overview: alt1.overview,
          whySelected: "Helps you train distraction-free focus blocks and protect your study time.",
          keyIdea: "Deep uninterrupted focus sprints yield significantly better retention in less time."
        },
        {
          bookId: alt2.id,
          title: alt2.title,
          author: alt2.author,
          overview: alt2.overview,
          whySelected: "Helps you ruthlessly eliminate non-essentials to prevent cognitive burnout.",
          keyIdea: "Focus your best mental energy on the few things that actually move the needle."
        }
      ],
      suggestedReplies: [
        `Set up a Plan for ${alt1.title}`,
        `Set up a Plan for ${alt2.title}`,
        "Let's keep talking first"
      ]
    };
  }

  // Handle user wanting to keep talking without jumping into a plan
  if (lower.includes('keep talking') || lower.includes('talk more') || lower.includes('not ready') || lower.includes('not now')) {
    return {
      message: "Of course! We don't have to jump into a reading plan until you're ready. What's the main thought or feeling on your mind at this moment?",
      readyForBooks: false,
      suggestedReplies: [
        "I feel like I'm falling behind everyone else.",
        "I'm worried I won't be able to stick to any routine.",
        "I just feel exhausted all the time."
      ]
    };
  }

  // Turn 1: Active, curious exploration without diagnosing
  if (userTurnCount === 1) {
    if (lower.includes('procrastinat') || lower.includes('lazy') || lower.includes('delay') || lower.includes('putting off')) {
      return {
        message: "I understand. When did you start noticing this happening?",
        suggestedReplies: [
          "It started a couple of weeks ago with a heavy assignment.",
          "It mostly happens when a task feels huge or unclear.",
          "It's been a constant pattern this whole semester."
        ],
        readyForBooks: false
      };
    }

    if (lower.includes('fail') || lower.includes('exam') || lower.includes('test') || lower.includes('bad') || lower.includes('terrible')) {
      return {
        message: "I'm sorry you're dealing with that. Getting a result you didn't want hurts. What happened?",
        suggestedReplies: [
          "I studied hard but still couldn't perform.",
          "I ran out of time and panicked during the test.",
          "I couldn't focus during preparation."
        ],
        readyForBooks: false
      };
    }

    if (lower.includes('overwhelm') || lower.includes('too much') || lower.includes('stress') || lower.includes('deadline')) {
      return {
        message: "That sounds like a lot to carry right now. When you look at everything on your plate, what specific part feels heaviest or most pressing?",
        suggestedReplies: [
          "Upcoming assignment deadlines.",
          "My entire semester syllabus feels impossible.",
          "Balancing college with personal expectations."
        ],
        readyForBooks: false
      };
    }

    if (lower.includes('focus') || lower.includes('distract') || lower.includes('phone')) {
      return {
        message: "Digital distractions can be relentless, especially when a subject gets dense. When does the urge to look away usually hit you most?",
        suggestedReplies: [
          "As soon as I hit a difficult problem.",
          "After about 10 minutes of reading.",
          "Whenever my phone buzzes."
        ],
        readyForBooks: false
      };
    }

    return {
      message: "Thank you for sharing that with me. What has been the most challenging part of this situation for you lately?",
      suggestedReplies: [
        "Finding consistent motivation.",
        "Managing my time and daily routine.",
        "Dealing with self-doubt."
      ],
      readyForBooks: false
    };
  }

  // Turn 2: Follow-up on user's specific experience
  if (userTurnCount === 2) {
    if (allUserText.includes('procrastinat') || allUserText.includes('delay') || allUserText.includes('lazy')) {
      return {
        message: "What usually happens when you sit down to start working?",
        suggestedReplies: [
          "I open my laptop, feel stuck, and check my phone instead.",
          "I spend 30 minutes organizing without doing real work.",
          "I feel a wave of resistance and tell myself I'll do it later."
        ],
        readyForBooks: false
      };
    }

    if (allUserText.includes('fail') || allUserText.includes('exam')) {
      return {
        message: "That sounds frustrating, especially after putting in the effort. What do you think made the exam go badly?",
        suggestedReplies: [
          "I couldn't manage my time and then I panicked.",
          "My revision strategy didn't match the questions.",
          "I froze up when I saw questions I hadn't seen before."
        ],
        readyForBooks: false
      };
    }

    if (allUserText.includes('overwhelm') || allUserText.includes('deadline')) {
      return {
        message: "When you try to pick where to begin, what happens in your head?",
        suggestedReplies: [
          "I keep jumping between tasks and finish nothing.",
          "I feel paralyzed because every task feels equally urgent.",
          "I end up procrastinating because the list feels impossible."
        ],
        readyForBooks: false
      };
    }

    return {
      message: "That gives us something useful to work with. Has this kind of situation happened before, or was this unusual for you?",
      suggestedReplies: [
        "It's happened a few times before.",
        "This was the first time, but it shook my confidence.",
        "It happens whenever pressure gets high."
      ],
      readyForBooks: false
    };
  }

  // Turn 3: Emotional & outcome exploration
  if (userTurnCount === 3) {
    if (allUserText.includes('procrastinat') || allUserText.includes('phone') || allUserText.includes('resistance')) {
      return {
        message: "How does that make you feel afterward, and what would you most like to change about this?",
        suggestedReplies: [
          "I feel guilty and stressed, and I want a frictionless start routine.",
          "I want to be able to focus for 30 minutes without needing willpower.",
          "I want to stop beating myself up when I get distracted."
        ],
        readyForBooks: false
      };
    }

    if (allUserText.includes('fail') || allUserText.includes('panick') || allUserText.includes('exam')) {
      return {
        message: "How has that been affecting your thoughts about your abilities, and what kind of support or change feels most helpful right now?",
        suggestedReplies: [
          "It made me feel like I'm not smart enough for this subject.",
          "A steadier study system so I feel genuinely prepared.",
          "I want to stop dwelling on the grade and figure out how to bounce back."
        ],
        readyForBooks: false
      };
    }

    return {
      message: "I hear you. What would you most like to change about this moving forward?",
      suggestedReplies: [
        "Building a reliable daily habit.",
        "Getting past the fear of not being good enough.",
        "Finding an approach that doesn't burn me out."
      ],
      readyForBooks: false
    };
  }

  // Turn 4+: Ready for Books Recommendation synthesized naturally
  const insight = analyzeThinkingPatternsInternally(allUserText);

  return {
    message: `${insight.synthesis}\n\n${insight.bookLeadIn}`,
    readyForBooks: true,
    recommendations: [
      {
        bookId: insight.primaryBook.id,
        title: insight.primaryBook.title,
        author: insight.primaryBook.author,
        overview: insight.primaryBook.overview,
        whySelected: insight.whyPrimary,
        keyIdea: insight.keyIdeaPrimary,
        internalPattern: insight.patternName
      },
      {
        bookId: insight.secondaryBook.id,
        title: insight.secondaryBook.title,
        author: insight.secondaryBook.author,
        overview: insight.secondaryBook.overview,
        whySelected: `An alternative perspective focusing on ${insight.secondaryBook.title.toLowerCase()}.`,
        keyIdea: insight.secondaryBook.overview,
        internalPattern: 'Alternative Perspective'
      }
    ],
    suggestedReplies: [
      `Set up a Plan for ${insight.primaryBook.title}`,
      `Explore ${insight.secondaryBook.title}`,
      "Show me a different book",
      "Let's keep talking first"
    ]
  };
}

// Generate Multiple Tasks Per Day (2-4 Tasks / Day)
function getLocalPlanTasks(bookId: string, duration: '7_days' | '30_days', shortenTasks: boolean = false) {
  const mult = shortenTasks ? 0.6 : 1;

  if (bookId === 'atomic-habits') {
    return [
      // Day 1: 3 Tasks
      {
        id: `task-${Date.now()}-1`,
        day: 1,
        order: 1,
        title: 'Understand Identity-Based Habits',
        type: 'learn' as const,
        description: 'Read the short breakdown of why focusing on who you wish to become works better than outcome anxiety.',
        bookId,
        concept: 'Identity-Based Habits',
        estimatedMinutes: Math.max(2, Math.round(5 * mult)),
        status: 'not_started' as const,
        reason: 'Shifts focus away from past setbacks toward your ongoing identity as a learner.',
        actionPrompt: 'A dedicated learner shows up even for 5 minutes. Notice how this feels compared to "I must score 95%."'
      },
      {
        id: `task-${Date.now()}-2`,
        day: 1,
        order: 2,
        title: 'Name Your Learning Identity',
        type: 'reflect' as const,
        description: 'Answer one short reflection: What is one quality of the student you want to become?',
        bookId,
        concept: 'Identity-Based Habits',
        estimatedMinutes: Math.max(2, Math.round(3 * mult)),
        status: 'not_started' as const,
        reason: 'Anchors your study sessions to your personal values.',
        actionPrompt: 'Complete the sentence: "I am a student who..." (e.g. approaches problem sets with curiosity).'
      },
      {
        id: `task-${Date.now()}-3`,
        day: 1,
        order: 3,
        title: 'Cast One Vote Today',
        type: 'apply' as const,
        description: 'Perform one 3-minute physical action that proves your chosen identity (e.g. review 1 formula or clear your desk).',
        bookId,
        concept: 'Identity-Based Habits',
        estimatedMinutes: Math.max(2, Math.round(5 * mult)),
        status: 'not_started' as const,
        reason: 'Builds immediate self-trust with a tiny win.',
        actionPrompt: 'Set a 3-minute timer right now. Do one small action for your coursework, then stop.'
      },

      // Day 2: 3 Tasks
      {
        id: `task-${Date.now()}-4`,
        day: 2,
        order: 1,
        title: 'Learn Habit Stacking',
        type: 'learn' as const,
        description: 'Discover how attaching a study action to an existing routine eliminates decision fatigue.',
        bookId,
        concept: 'Habit Stacking',
        estimatedMinutes: Math.max(2, Math.round(5 * mult)),
        status: 'not_started' as const,
        reason: 'Solves the "when and where should I study" hesitation.',
        actionPrompt: 'Formula: After I [Current Habit], I will [New Study Habit].'
      },
      {
        id: `task-${Date.now()}-5`,
        day: 2,
        order: 2,
        title: 'Identify Your Daily Anchor',
        type: 'reflect' as const,
        description: 'Pick an anchor habit you do every single day without fail (morning tea, washing hands, opening laptop).',
        bookId,
        concept: 'Habit Stacking',
        estimatedMinutes: Math.max(2, Math.round(3 * mult)),
        status: 'not_started' as const,
        reason: 'Finds your natural launchpad.'
      },
      {
        id: `task-${Date.now()}-6`,
        day: 2,
        order: 3,
        title: 'Test Your First Habit Stack',
        type: 'apply' as const,
        description: 'Attach: "After I sit at my desk, I will open my notes and read one paragraph before touching my phone."',
        bookId,
        concept: 'Habit Stacking',
        estimatedMinutes: Math.max(2, Math.round(5 * mult)),
        status: 'not_started' as const,
        reason: 'Immediate behavioral trial without relying on willpower.'
      },

      // Day 3: 3 Tasks
      {
        id: `task-${Date.now()}-7`,
        day: 3,
        order: 1,
        title: 'The Two-Minute Rule',
        type: 'learn' as const,
        description: 'Learn why scaling a difficult task down to two minutes overcomes the inertia of starting.',
        bookId,
        concept: 'Two-Minute Rule',
        estimatedMinutes: Math.max(2, Math.round(4 * mult)),
        status: 'not_started' as const,
        reason: 'Prevents procrastination caused by intimidatingly large tasks.'
      },
      {
        id: `task-${Date.now()}-8`,
        day: 3,
        order: 2,
        title: 'Apply the 2-Minute Gateway',
        type: 'apply' as const,
        description: 'Pick the subject you have been dreading. Commit only to working on it for exactly 120 seconds.',
        bookId,
        concept: 'Two-Minute Rule',
        estimatedMinutes: Math.max(2, Math.round(3 * mult)),
        status: 'not_started' as const,
        reason: 'Removes the dread of endless study marathons.'
      },
      {
        id: `task-${Date.now()}-9`,
        day: 3,
        order: 3,
        title: 'Check-In on Friction',
        type: 'checkin' as const,
        description: 'Reflect: Did starting feel easier when the commitment was only 2 minutes?',
        bookId,
        concept: 'Two-Minute Rule',
        estimatedMinutes: Math.max(2, Math.round(2 * mult)),
        status: 'not_started' as const,
        reason: 'Evaluates whether this intervention is reducing your study friction.'
      }
    ];
  }

  // Deep Work
  if (bookId === 'deep-work') {
    return [
      // Day 1
      {
        id: `task-${Date.now()}-1`,
        day: 1,
        order: 1,
        title: 'Understand Attention Residue',
        type: 'learn' as const,
        description: 'Learn why checking your phone for 10 seconds leaves a cognitive residue that hurts focus for 15 minutes.',
        bookId,
        concept: 'Attention Residue',
        estimatedMinutes: Math.max(2, Math.round(5 * mult)),
        status: 'not_started' as const,
        reason: 'Explains why studying feels draining when fragmented by notifications.',
        actionPrompt: 'When you switch tasks quickly, your brain remains divided.'
      },
      {
        id: `task-${Date.now()}-2`,
        day: 1,
        order: 2,
        title: 'Phone Location Audit',
        type: 'reflect' as const,
        description: 'Where is your phone right now when you study? How easily can you reach it without standing up?',
        bookId,
        concept: 'Attention Residue',
        estimatedMinutes: Math.max(2, Math.round(3 * mult)),
        status: 'not_started' as const,
        reason: 'Brings environmental cues to awareness.'
      },
      {
        id: `task-${Date.now()}-3`,
        day: 1,
        order: 3,
        title: 'Run a 20-Minute Clean Sprint',
        type: 'apply' as const,
        description: 'Place your phone in another room. Set a 20-minute timer for one single academic task.',
        bookId,
        concept: 'Attention Residue',
        estimatedMinutes: Math.max(2, Math.round(6 * mult)),
        status: 'not_started' as const,
        reason: 'Experience zero-residue focus directly.'
      },

      // Day 2
      {
        id: `task-${Date.now()}-4`,
        day: 2,
        order: 1,
        title: 'Embracing Boredom',
        type: 'learn' as const,
        description: 'Why tolerating stillness and micro-pauses restores dopamine balance for deep learning.',
        bookId,
        concept: 'Embrace Boredom',
        estimatedMinutes: Math.max(2, Math.round(4 * mult)),
        status: 'not_started' as const,
        reason: 'Stops the reflex to constantly seek stimulation during quiet study.'
      },
      {
        id: `task-${Date.now()}-5`,
        day: 2,
        order: 2,
        title: 'The 3-Minute Stillness Reset',
        type: 'practice' as const,
        description: 'Sit quietly for 3 minutes without touching any screen or notebook. Notice the urge to reach for a distraction.',
        bookId,
        concept: 'Embrace Boredom',
        estimatedMinutes: Math.max(2, Math.round(3 * mult)),
        status: 'not_started' as const,
        reason: 'Trains focus stamina from the ground up.'
      }
    ];
  }

  // Default tasks for Mindset or other books
  return [
    // Day 1
    {
      id: `task-${Date.now()}-1`,
      day: 1,
      order: 1,
      title: 'Fixed vs. Growth Mindset in Exams',
      type: 'learn' as const,
      description: 'Understand the difference between treating an exam as an intelligence test vs. diagnostic data on strategy.',
      bookId,
      concept: 'Diagnostic Reframing',
      estimatedMinutes: Math.max(2, Math.round(5 * mult)),
      status: 'not_started' as const,
      reason: 'Reduces the shame and self-blame associated with low marks.',
      actionPrompt: 'A low score reveals what your strategy missed, not your ceiling as a human.'
    },
    {
      id: `task-${Date.now()}-2`,
      day: 1,
      order: 2,
      title: 'Identify the Critical Thought',
      type: 'reflect' as const,
      description: 'Write down the single most harsh or absolute statement you said to yourself after your setback.',
      bookId,
      concept: 'Diagnostic Reframing',
      estimatedMinutes: Math.max(2, Math.round(3 * mult)),
      status: 'not_started' as const,
      reason: 'Brings unconscious self-talk into the open so we can inspect it.'
    },
    {
      id: `task-${Date.now()}-3`,
      day: 1,
      order: 3,
      title: 'Attach the Word "Yet"',
      type: 'apply' as const,
      description: 'Rewrite your critical thought by adding "yet" at the end, and identify one small experiment for tomorrow.',
      bookId,
      concept: 'The Power of Yet',
      estimatedMinutes: Math.max(2, Math.round(4 * mult)),
      status: 'not_started' as const,
      reason: 'Restores cognitive agency and flexibility.'
    },

    // Day 2
    {
      id: `task-${Date.now()}-4`,
      day: 2,
      order: 1,
      title: 'Error Autopsy without Guilt',
      type: 'learn' as const,
      description: 'How scientists treat failed experiments as neutral data points rather than personal flaws.',
      bookId,
      concept: 'Diagnostic Error Autopsy',
      estimatedMinutes: Math.max(2, Math.round(5 * mult)),
      status: 'not_started' as const,
      reason: 'Helps you look at marked papers without emotional exhaustion.'
    },
    {
      id: `task-${Date.now()}-5`,
      day: 2,
      order: 2,
      title: 'Categorize One Error',
      type: 'practice' as const,
      description: 'Take one mistake from a recent test: Was it a concept gap, time rush, or misread question?',
      bookId,
      concept: 'Diagnostic Error Autopsy',
      estimatedMinutes: Math.max(2, Math.round(5 * mult)),
      status: 'not_started' as const,
      reason: 'Turns vague regret into a specific technical fix.'
    }
  ];
}

// API Routes
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, currentThoughtContext } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const userMessages = messages.filter((m: any) => m.sender === 'user');
    const userTurnCount = userMessages.length;

    // If Gemini is available, call it with companion guidelines
    if (ai) {
      try {
        const conversationHistoryText = messages
          .map((m: any) => `${m.sender.toUpperCase()}: ${m.text}`)
          .join('\n');

        const systemInstruction = `
You are PSYCLONE: a warm, friendly, intelligent personal growth companion for students (Smart India Hackathon prototype).
Your purpose is to help students work through difficult situations (procrastination, exam setbacks, pressure, focus issues), understand their experience, and introduce relevant books with actionable daily micro-tasks.

CORE PRINCIPLES:
1. NEVER DIAGNOSE OR LABEL THE USER:
   - Do NOT say "You have All-or-Nothing Thinking", "cognitive distortion", "thinking trap", "diagnosis", or "confidence score".
   - You can internally evaluate thinking patterns (All-or-Nothing, Overgeneralization, Catastrophizing, Mind Reading, Fortune Telling, Personalization, Emotional Reasoning, Should Statements) to understand what they are going through, but NEVER expose classification labels to the user during normal conversation.
   - The user must feel: "PSYCLONE understood me", NOT "PSYCLONE diagnosed me".

2. NATURAL PERSONAL CONVERSATION BEFORE RECOMMENDATIONS:
   - On the first 2-3 user turns, do NOT recommend books yet.
   - Ask thoughtful, contextual follow-up questions adapted directly to what the user said:
     * Turn 1: Acknowledge what happened with warmth, ask when/how it started or what happened.
     * Turn 2: Explore what specifically happens in that moment (e.g., sitting down to work).
     * Turn 3: Ask how that makes them feel afterward and what they would most like to change.
   - Keep conversational responses concise, warm, and natural (2-3 sentences max).

3. BOOK RECOMMENDATION AS PART OF THE CONVERSATION (Turn 3-4+ or when context is clear):
   - When context is clear, suggest a relevant book naturally inside the conversation message itself.
   - Example format for the message:
     "It sounds like you're putting a lot of pressure on yourself to be perfect, which ends up making it hard to even start.
     There's a book that might be really helpful for this:
     Atomic Habits by James Clear.
     It talks about how to lower the barrier to starting and build momentum with tiny changes.
     Would you like to explore this book and set up a simple daily plan to work on it?"
   - Recommend 1-2 relevant books from:
     * atomic-habits (James Clear)
     * mindset (Carol S. Dweck)
     * deep-work (Cal Newport)
     * grit (Angela Duckworth)
     * courage-to-be-disliked (Ichiro Kishimi & Fumitake Koga)
     * make-it-stick (Brown, Roediger & McDaniel)
     * essentialism (Greg McKeown)
     * feel-the-fear (Susan Jeffers)
     * antidote (Oliver Burkeman)
     * flow (Mihaly Csikszentmihalyi)
   - When recommending books, set readyForBooks to true and include suggested replies:
     ["Set up a Plan for [Book Title]", "Explore [Book Title]", "Show me a different book", "Let's keep talking first"]

4. USER CHOICE:
   - If user asks for a different book ("different book", "another book"), provide another perspective without being pushy.
   - If user asks to keep talking ("let's keep talking", "talk more"), continue discussing their thoughts with empathy without forcing a plan.

OUTPUT FORMAT:
Return JSON only:
{
  "message": "Warm, empathetic conversational response that synthesizes what the student shared and asks the next question, OR introduces the book naturally if ready",
  "readyForBooks": boolean,
  "recommendations": [
    {
      "bookId": "exact book id",
      "title": "Book Title",
      "author": "Author Name",
      "overview": "Short book overview",
      "whySelected": "Why this book is relevant to what the user shared",
      "keyIdea": "Key practical idea relevant to user"
    }
  ] (only include if readyForBooks is true),
  "suggestedReplies": ["short suggested user reply 1", "short suggested user reply 2"]
}
`;

        const rawText = await generateWithGemini(
          `Conversation history (User turn count: ${userTurnCount}):\n${conversationHistoryText}\n\nCurrent user context: ${currentThoughtContext || 'Student discussing study challenge.'}\n\nRespond as PSYCLONE in valid JSON format only.`,
          {
            systemInstruction,
            responseMimeType: 'application/json',
            temperature: 0.65,
          }
        );

        if (rawText) {
          const parsed = JSON.parse(rawText);
          if (parsed && typeof parsed.message === 'string') {
            return res.json(parsed);
          }
        }
      } catch (_geminiErr) {
        // Fall through to local contextual engine
      }
    }

    // Contextual local fallback
    const localResult = getLocalConversationalResponse(messages);
    return res.json(localResult);
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
});

// Route: Generate Personalized Plan (Multiple Tasks Per Day)
app.post('/api/generate-plan', async (req, res) => {
  try {
    const { bookId, duration, userContext, shortenTasks } = req.body;
    const selectedBook = CURATED_BOOKS.find(b => b.id === bookId) || CURATED_BOOKS[0];

    if (ai) {
      try {
        const prompt = `
Generate a personalized learning and practice plan for a student based on:
Book: "${selectedBook.title}" by ${selectedBook.author}
Duration: ${duration === '7_days' ? '1 Week (7 Days, focused)' : '1 Month (30 Days, gradual)'}
User Context: "${userContext || 'Student working on study habits, focus, and pressure.'}"
Shorten Tasks requested: ${shortenTasks ? 'Yes (keep all tasks under 5 minutes)' : 'No (standard 3-7 minutes)'}

IMPORTANT: A day must contain MULTIPLE tasks (2 to 4 tasks per day).
Include tasks for Day 1 and Day 2.
Types must be: "learn" | "reflect" | "practice" | "apply" | "review" | "checkin".

Return JSON with an array of DailyTasks:
{
  "tasks": [
    {
      "id": "unique string",
      "day": 1,
      "order": 1,
      "title": "Specific, actionable task title",
      "type": "learn" | "reflect" | "practice" | "apply" | "review" | "checkin",
      "description": "Clear instructions (1-2 sentences)",
      "bookId": "${selectedBook.id}",
      "concept": "Name of relevant concept",
      "estimatedMinutes": 3 to 7,
      "status": "not_started",
      "reason": "Why this task helps the user's specific situation",
      "actionPrompt": "Concrete first step or prompt"
    }
  ]
}
Tasks must be specific, actionable, achievable, and connected to the book's core principles.
`;

        const raw = await generateWithGemini(prompt, {
          responseMimeType: 'application/json',
          temperature: 0.6,
        });

        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed.tasks && Array.isArray(parsed.tasks) && parsed.tasks.length >= 3) {
            return res.json({ tasks: parsed.tasks });
          }
        }
      } catch (_err) {
        // Fall through to curated plan tasks
      }
    }

    const localTasks = getLocalPlanTasks(selectedBook.id, duration || '7_days', shortenTasks);
    return res.json({ tasks: localTasks });
  } catch (error: any) {
    console.error('Error in /api/generate-plan:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
});

// Route: Contextual Task Help from PSYCLONE
app.post('/api/task-help', async (req, res) => {
  try {
    const { taskTitle, taskType, taskDescription, bookTitle, concept, userQuestion } = req.body;

    if (ai) {
      try {
        const prompt = `
A student is working on this daily task from "${bookTitle || 'their reading plan'}":
Concept: "${concept || 'Core idea'}"
Task Title: "${taskTitle}" (${taskType})
Task Description: "${taskDescription}"
Student's Question: "${userQuestion || 'I am not sure how to do this task.'}"

Explain the task in simple, encouraging, friendly words. Give them one concrete, realistic student example they can do right now. Keep it under 2 paragraphs.
Return JSON:
{
  "explanation": "friendly explanation with example",
  "quickTip": "one sentence practical tip"
}
`;
        const raw = await generateWithGemini(prompt, {
          responseMimeType: 'application/json',
          temperature: 0.7,
        });

        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.explanation) {
            return res.json(parsed);
          }
        }
      } catch (_err) {
        // Quiet fallback
      }
    }

    return res.json({
      explanation: `For "${taskTitle}", keep it simple! If the task asks you to reflect or take action, don't overthink. For example, if it's about habit stacking, choose an anchor you never skip (like opening your laptop or finishing dinner) and attach a tiny 2-minute action immediately after.`,
      quickTip: "Make the starting action so small you can't say no."
    });
  } catch (error: any) {
    console.error('Error in /api/task-help:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
});

// Route: Book QA
app.post('/api/book-qa', async (req, res) => {
  try {
    const { bookTitle, conceptName, userQuestion, pace, conversationHistory } = req.body;

    if (ai) {
      try {
        const prompt = `
You are PSYCLONE, answering a student's question about the book "${bookTitle}" and specifically the concept "${conceptName}".
Student's question: "${userQuestion}"

Explain the concept warmly and concisely, connect it directly to the student's study life, and suggest one concrete micro-action.
Format your answer in JSON:
{
  "explanation": "Clear, engaging explanation connecting ${conceptName} to the student's question",
  "practicalTakeaway": "Single actionable takeaway",
  "suggestedPracticePrompt": "A 1-sentence prompt for a 3-minute action they can do right now"
}
`;
        const rawText = await generateWithGemini(prompt, {
          responseMimeType: 'application/json',
          temperature: 0.7,
        });

        if (rawText) {
          const parsed = JSON.parse(rawText);
          if (parsed && parsed.explanation) {
            return res.json(parsed);
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini API failed in /api/book-qa, using fallback:', geminiErr);
      }
    }

    return res.json({
      explanation: `In "${bookTitle}", the idea of "${conceptName}" shows that lasting progress comes from lowering initial friction. Rather than waiting for intense motivation, attach a tiny, effortless routine to something you already do every day.`,
      practicalTakeaway: `Treat "${conceptName}" as an immediate experiment for today's study block.`,
      suggestedPracticePrompt: `Define an exact 2-minute version of "${conceptName}" you will test today.`
    });
  } catch (error: any) {
    console.error('Error in /api/book-qa:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
});

// Setup Vite or static serving
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`PSYCLONE server running at http://0.0.0.0:${port}`);
  });
}

startServer();
