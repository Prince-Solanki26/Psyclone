import { Practice, PracticeStep, Stage } from '../types';

export function createEvidenceExaminationPractice(
  thought: string = "I failed my last exam, so now I feel like I'm terrible at everything.",
  patternName: string = "All-or-Nothing Thinking",
  source: 'conversation' | 'book' | 'quick-start' = 'conversation'
): Practice {
  const steps: PracticeStep[] = [
    {
      stepNumber: 1,
      title: 'Identify the Core Thought',
      prompt: 'What specific thought or belief are you examining right now?',
      placeholder: 'e.g., I stumbled in my interview, so I am incapable of getting hired...',
      helperText: 'State the thought plainly, without softening it yet.',
      userInput: thought
    },
    {
      stepNumber: 2,
      title: 'Examine Supporting Evidence',
      prompt: 'What factual, objective evidence seems to support this thought?',
      placeholder: 'e.g., I did receive a lower score on this specific paper than I wanted...',
      helperText: 'Stick to observable facts rather than feelings or assumptions.'
    },
    {
      stepNumber: 3,
      title: 'Examine Contradicting Evidence',
      prompt: 'What objective evidence challenges, limits, or contradicts this thought?',
      placeholder: 'e.g., I successfully passed 4 other subjects; this was a single difficult test...',
      helperText: 'Look for counter-examples, past successes, or external factors that influenced this outcome.'
    },
    {
      stepNumber: 4,
      title: 'The Trusted Friend Perspective',
      prompt: 'If a close classmate or friend came to you with this exact situation, what would you say to them?',
      placeholder: 'e.g., I would tell them that one bad test does not define their intelligence...',
      helperText: 'Notice how compassion and realism come more easily when advising someone else.'
    },
    {
      stepNumber: 5,
      title: 'Synthesize a Balanced Thought',
      prompt: 'Based on all the evidence, write a more balanced, grounded version of this thought.',
      placeholder: 'e.g., This test was difficult and my preparation strategy had flaws, but one result does not determine my overall ability. I can adjust my strategy...',
      helperText: 'A balanced thought is not toxic positivity; it acknowledges difficulty while keeping perspective.'
    }
  ];

  return {
    id: `practice-${Date.now()}`,
    title: 'Test the Evidence',
    type: 'Evidence Examination',
    durationMinutes: 3,
    source,
    targetPattern: patternName,
    targetThought: thought,
    steps,
    isCompleted: false,
    stage: 'practice'
  };
}

export function createBookPractice(
  bookTitle: string,
  conceptTitle: string,
  customPrompt?: string,
  bookId?: string,
  conceptId?: string
): Practice {
  const steps: PracticeStep[] = [
    {
      stepNumber: 1,
      title: 'Current Challenge',
      prompt: `In what specific area of your student life or study routine do you want to apply "${conceptTitle}"?`,
      placeholder: 'e.g., Sticking to my morning revision schedule before college lectures...',
      helperText: 'Pick an immediate, concrete scenario rather than an abstract goal.'
    },
    {
      stepNumber: 2,
      title: 'Concept Translation',
      prompt: `How does the principle of "${conceptTitle}" from ${bookTitle} directly address this friction?`,
      placeholder: customPrompt || 'e.g., By making the starting step under 2 minutes so I don\'t procrastinate...',
      helperText: 'Explain the bridge between the theory and your everyday experience.'
    },
    {
      stepNumber: 3,
      title: 'Define the Micro-Action',
      prompt: 'Formulate an exact, tiny action you can execute in less than 3 minutes today.',
      placeholder: 'e.g., "After I boil water for morning tea, I will open my laptop and read 1 GATE question."',
      helperText: 'Make it specific: define the WHEN, WHERE, and EXACT first physical step.'
    },
    {
      stepNumber: 4,
      title: 'Identify the Obstacle',
      prompt: 'What friction or distraction could disrupt this action, and how will you prevent it?',
      placeholder: 'e.g., My phone might be on my desk. Solution: I will leave it on my bed across the room...',
      helperText: 'Anticipate the derailment before it happens.'
    },
    {
      stepNumber: 5,
      title: 'Commitment & Anchor',
      prompt: 'Write your final implementation contract for today.',
      placeholder: 'e.g., Today at 5:00 PM, I will complete this 3-minute action regardless of motivation.',
      helperText: 'Keep it short, direct, and actionable.'
    }
  ];

  return {
    id: `practice-book-${Date.now()}`,
    title: `${conceptTitle} Micro-Practice`,
    type: `${conceptTitle} Application`,
    durationMinutes: 4,
    source: 'book',
    relatedBookId: bookId,
    relatedConceptId: conceptId,
    targetThought: `Applying ${conceptTitle} from ${bookTitle}`,
    steps,
    isCompleted: false,
    stage: 'practice'
  };
}
