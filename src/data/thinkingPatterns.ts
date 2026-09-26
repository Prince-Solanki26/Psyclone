import { ThinkingPattern } from '../types';

export const THINKING_PATTERNS: ThinkingPattern[] = [
  {
    id: 'all-or-nothing',
    name: 'All-or-Nothing Thinking',
    definition: 'Viewing situations in absolute, black-and-white terms with no middle ground or nuance.',
    indicators: [
      'always', 'never', 'ruined', 'perfect', 'total failure', 'complete disaster', 'flawless', 'useless', 'terrible at everything'
    ],
    examples: [
      "I failed my last exam, so now I feel like I'm terrible at everything.",
      "If I can't study for four uninterrupted hours, the whole day is wasted.",
      "My project presentation had one mistake, so the whole effort was useless."
    ],
    explanation: 'When your mind divides experiences strictly into total success or complete failure, any minor setback gets magnified into a total defect. This creates extreme pressure and prevents recognizing partial progress.',
    reflectionQuestions: [
      'Is there an outcome between 100% perfect and 0% failure here?',
      'What part of this effort was partially effective or worth keeping?',
      'If a classmate told you this, would you consider them a total failure?'
    ],
    practiceTypes: ['Continuum Thinking', 'Evidence Examination', 'Gray-Scale Reframing']
  },
  {
    id: 'overgeneralization',
    name: 'Overgeneralization',
    definition: 'Taking a single negative event or limited experience and viewing it as a never-ending pattern of defeat.',
    indicators: [
      'every single time', 'nothing ever works', 'I always mess up', 'patterns never change', 'everyone else'
    ],
    examples: [
      "I didn't get shortlisted for this internship; no company will ever hire me.",
      "I stumbled on this coding question, so I will always freeze up during technical rounds.",
      "One professor was critical of my draft, so nobody values my research."
    ],
    explanation: 'Overgeneralization draws a sweeping universal conclusion from one data point. It treats an isolated obstacle as an immutable law about your future capabilities.',
    reflectionQuestions: [
      'Are there any times in the past when an outcome was different?',
      'Does this single result genuinely predict all future occurrences, or just this one?',
      'What specific circumstances contributed to this result that may not be true next time?'
    ],
    practiceTypes: ['Evidence Examination', 'Counter-Example Hunt', 'Specific Context Reframing']
  },
  {
    id: 'catastrophizing',
    name: 'Catastrophizing',
    definition: 'Anticipating the absolute worst possible outcome and magnifying the imagined consequences beyond reality.',
    indicators: [
      'my career is ruined', 'unrecoverable', 'worst case scenario', 'life is over', 'I cannot survive this', 'everything will collapse'
    ],
    examples: [
      "If I don't get an A in this semester course, my entire academic career is over.",
      "My team didn't respond to my message; they definitely hate me and will kick me out.",
      "If my code has a bug in tomorrow's demo, everyone will see I am a fraud."
    ],
    explanation: 'Catastrophizing speeds up anxiety by leaping from an initial bump directly to the most catastrophic imaginable destination, assuming you will be completely unable to cope.',
    reflectionQuestions: [
      'What is the realistic worst-case, realistic best-case, and most likely realistic outcome?',
      'Even if the worst-case happens, what concrete steps would you take to navigate it?',
      'How many times has your imagined worst-case actually materialized in reality?'
    ],
    practiceTypes: ['Three Outcomes (Worst, Best, Likely)', 'Coping Plan Generation', 'Probability Check']
  },
  {
    id: 'mind-reading',
    name: 'Mind Reading',
    definition: 'Assuming you know what other people are thinking or feeling, typically assuming they judge or disapprove of you, without objective evidence.',
    indicators: [
      'they think I am dumb', 'they secretly judge me', 'I know they resent me', 'everyone in the room was laughing at me', 'she thinks I am incompetent'
    ],
    examples: [
      "The professor glanced at the clock while I was speaking; she must think I am boring and unprepared.",
      "My lab partner is quiet today; he probably thinks I am pulling down his grades.",
      "Nobody replied in the group chat immediately; they must be talking about me behind my back."
    ],
    explanation: 'Mind reading projects internal self-doubts onto other people. We treat our internal anxiety as if it were a telepathic window into someone else\'s thoughts.',
    reflectionQuestions: [
      'What factual, observable evidence do you have that proves they think this?',
      'What alternative reasons might explain their behavior (e.g. fatigue, busy schedule, personal stress)?',
      'Have you asked them directly or verified this assumption?'
    ],
    practiceTypes: ['Alternative Explanations Test', 'Direct Observation Separation', 'Perspective Check']
  },
  {
    id: 'fortune-telling',
    name: 'Fortune Telling',
    definition: 'Predicting that future events will turn out badly as if the negative outcome is already an established certainty.',
    indicators: [
      'I already know I will fail', 'there is no point trying', 'it will definitely go wrong', 'I am bound to mess it up', 'I know how it ends'
    ],
    examples: [
      "There is no point attending the campus placement drive tomorrow because I know I won't get placed.",
      "I am definitely going to choke during my viva examination next week.",
      "I know this new study schedule won't last more than three days."
    ],
    explanation: 'Fortune telling treats a fearful prediction as an unchangeable historical fact. This often causes self-fulfilling behavior, like giving up preparation because failure feels predetermined.',
    reflectionQuestions: [
      'Can you predict the future with 100% certainty, or is this an anxiety projection?',
      'What actions can you take right now that have the power to influence the trajectory?',
      'What would happen if you focused on today\'s controllable effort instead of tomorrow\'s imaginary outcome?'
    ],
    practiceTypes: ['Sphere of Control Sorting', 'Prediction Testing Log', 'Micro-Action Anchor']
  },
  {
    id: 'personalization',
    name: 'Personalization',
    definition: 'Holding yourself personally responsible for external events, group dynamics, or other people’s reactions that were largely outside your control.',
    indicators: [
      'it is all my fault', 'I caused this', 'if only I was better', 'I ruined it for the whole team', 'they are upset because of me'
    ],
    examples: [
      "Our team lost the hackathon; it is entirely my fault because my module wasn't flashy enough.",
      "My friend seemed irritated today; I must have done something wrong to upset them.",
      "The lab equipment malfunctioned while I was using it; I always break things."
    ],
    explanation: 'Personalization places you at the center of the universe of blame. It ignores the dozens of other variables, systemic factors, and individual personalities that influence real-world outcomes.',
    reflectionQuestions: [
      'What other factors, people, and external constraints contributed to this outcome?',
      'If you drew a responsibility pie chart, what percentage genuinely belonged to your actions?',
      'Are you taking blame for things you had no direct authority or influence over?'
    ],
    practiceTypes: ['Responsibility Pie Chart', 'Context & Variable Mapping', 'Self-Compassion Check']
  },
  {
    id: 'emotional-reasoning',
    name: 'Emotional Reasoning',
    definition: 'Assuming that because you feel a certain negative emotion strongly, it must reflect objective external truth.',
    indicators: [
      'I feel like an imposter so I am one', 'I feel overwhelmed so it is impossible', 'I feel hopeless so nothing will work', 'I feel stupid'
    ],
    examples: [
      "I feel overwhelmed by this syllabus, so it must be impossible to learn.",
      "I feel anxious walking into the lecture hall, so danger must be present.",
      "I feel like an imposter among these smart students, so I really do not belong here."
    ],
    explanation: 'Emotional reasoning equates internal bodily sensations or emotional reactions with external reality ("I feel it, therefore it is true"). While feelings are valid experiences, they are not reliable fact-checkers.',
    reflectionQuestions: [
      'Is your emotion reflecting a proven objective fact, or an understandable nervous-system reaction?',
      'Can you feel anxious and still take competent, practical steps forward?',
      'If you separated the feeling ("I feel overwhelmed") from the facts ("there are 3 chapters"), what changes?'
    ],
    practiceTypes: ['Fact vs Emotion Separation', 'Grounding & Somatic Pause', 'Objective Inventory']
  },
  {
    id: 'should-statements',
    name: 'Should Statements',
    definition: 'Motivating yourself or evaluating others with rigid, inflexible rules about how things "should," "must," or "ought to" be.',
    indicators: [
      'I should have known', 'I must always', 'I ought to be further ahead', 'they shouldn\'t act like that', 'I shouldn\'t be feeling this'
    ],
    examples: [
      "I should be studying 10 hours a day like other top students.",
      "I shouldn't feel nervous before giving an everyday presentation.",
      "I must never make mistakes on assignments if I want to be a real engineer."
    ],
    explanation: 'Should statements operate as internalized tyranny. They replace realistic expectations and curiosity with guilt, frustration, and resentment.',
    reflectionQuestions: [
      'Where did this rule come from? Is it truly realistic and helpful for your well-being?',
      'What happens if you replace "I should" with "I would prefer to" or "I choose to"?',
      'Does punishing yourself with "shoulds" actually boost your energy or drain it?'
    ],
    practiceTypes: ['Rule Softening Exercise', 'Preference vs Command Reframe', 'Values-Based Action']
  }
];

export function getPatternById(id: string): ThinkingPattern | undefined {
  return THINKING_PATTERNS.find(p => p.id === id);
}

export function findPatternByName(name: string): ThinkingPattern | undefined {
  const normalized = name.toLowerCase().trim();
  return THINKING_PATTERNS.find(p => p.name.toLowerCase().trim() === normalized);
}
