import { Book, PaceType, PaceDetails } from '../types';

export const BOOKS: Book[] = [
  {
    id: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    tagline: 'An easy & proven way to build good habits and break bad ones.',
    category: ['Habits', 'Productivity', 'Mindset'],
    readTimeEstimate: '15 min overview',
    colorTheme: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      badge: 'bg-amber-100 text-amber-800',
      accent: 'text-amber-700'
    },
    summary: 'Real change does not come from massive overnight transformations, but from the compound interest of self-improvement: tiny 1% daily changes in your systems and identity.',
    coreIdeas: [
      'You do not rise to the level of your goals; you fall to the level of your systems.',
      'Small habits do not add up; they compound over time.',
      'True behavior change is identity change: decide who you want to be, then prove it to yourself with small wins.'
    ],
    concepts: [
      {
        id: 'identity-based-habits',
        title: 'Identity-Based Habits',
        shortExplanation: 'Focus on who you wish to become rather than solely what you want to achieve.',
        detailedExplanation: 'Most people try to change their outcomes first ("I want to score 90%"). Instead, focus on the identity: "I am a disciplined student who solves problems every morning." Every action is a vote for the person you want to be.',
        practicalExample: 'Instead of saying "I have to study for my test," an identity-based shift says: "A dedicated researcher reads for 30 minutes every morning."',
        whyItMatters: 'Outcome-based goals fade when motivation drops. Identity-based habits become part of your self-image, making consistency feel natural instead of forced.',
        applicationExample: 'Cast one vote today for your desired identity: write down one sentence summarizing a concept, even on a hectic day.',
        suggestedQuestions: [
          'How can I shift from goal-driven anxiety to identity-based study habits?',
          'What small daily vote can I cast for being a resilient learner?',
          'How does this apply when I feel tired after college classes?'
        ],
        practiceTemplate: {
          title: 'Identity Vote Ledger',
          duration: 3,
          type: 'Identity Reframing',
          prompt: 'Name the kind of student you want to be, and identify one 2-minute action you will take right now to cast a vote for that identity.'
        }
      },
      {
        id: 'habit-stacking',
        title: 'Habit Stacking',
        shortExplanation: 'Tie a new habit directly to an existing automatic daily routine.',
        detailedExplanation: 'The brain already has established neural pathways for your daily routines (brushing teeth, making morning chai, sitting at your study desk). By inserting your new habit right after an established one, you eliminate friction and decision fatigue.',
        practicalExample: 'Formula: "After I [Current Habit], I will [New Habit]." E.g., "After I open my laptop lid, I will immediately open my revision flashcards before any other tab."',
        whyItMatters: 'Vague intentions ("I will study more") fail because you never decide when or where. Habit stacking gives a clear situational trigger.',
        applicationExample: 'After I sit down with my evening tea, I will solve 2 practice problems before checking social media.',
        suggestedQuestions: [
          'What existing routine in my college day makes the best anchor for revision?',
          'How can I stack a habit to avoid phone distractions in the morning?',
          'What should I do if the anchor habit doesn\'t happen at the same time every day?'
        ],
        practiceTemplate: {
          title: 'Design Your Habit Stack',
          duration: 3,
          type: 'Implementation Cue Design',
          prompt: 'Identify an established anchor habit you never skip, and formulate your exact stacking statement.'
        }
      },
      {
        id: 'environment-design',
        title: 'Environment Design',
        shortExplanation: 'Shape your physical and digital surroundings so good habits are effortless and bad ones are difficult.',
        detailedExplanation: 'Environment is the invisible hand that shapes human behavior. People with great self-control rarely exert Herculean willpower; they structure spaces where distractions are hidden and helpful cues are in plain sight.',
        practicalExample: 'Placing your phone in another room while solving practice papers, or keeping your textbook open on your desk the night before.',
        whyItMatters: 'Willpower is a depletable cognitive resource. Designing your room or workspace eliminates the constant struggle of temptation.',
        applicationExample: 'Put your phone in a drawer across the room and create a clean desk space with only the current assignment visible.',
        suggestedQuestions: [
          'How can I modify my room to stop getting distracted while studying?',
          'What digital environment tweaks help maintain study momentum?',
          'How can I design cues for subjects I currently dread?'
        ],
        practiceTemplate: {
          title: 'Friction Audit',
          duration: 4,
          type: 'Environment Restructuring',
          prompt: 'Find one friction point you can add to a distraction, and one friction point you can remove from your study flow.'
        }
      },
      {
        id: 'two-minute-rule',
        title: 'The Two-Minute Rule',
        shortExplanation: 'Scale down any new habit until it takes two minutes or less to start.',
        detailedExplanation: 'When you start a new habit, it should take less than two minutes to do. "Read 50 pages" becomes "Read one page." "Study for three hours" becomes "Open my notes and read one paragraph." The point is to master the art of showing up.',
        practicalExample: 'Instead of dreading a giant 4-hour study session, commit strictly to sitting down and writing the title and first bullet point.',
        whyItMatters: 'A habit must be established before it can be improved. Once you overcome the initial friction of starting, continuing becomes dramatically easier.',
        applicationExample: 'Set a timer for 2 minutes to organize your notes for tomorrow\'s class. If you want to stop after 2 minutes, you are allowed to.',
        suggestedQuestions: [
          'How can I break down heavy exam prep into a two-minute entry ritual?',
          'What if I feel silly just doing 2 minutes of a subject?',
          'How do I transition from the 2-minute start to longer flow states?'
        ],
        practiceTemplate: {
          title: 'Two-Minute Launchpad',
          duration: 2,
          type: 'Micro-Action Activation',
          prompt: 'Take a task you have been procrastinating on, and define its irreducible 2-minute starting gateway.'
        }
      }
    ]
  },
  {
    id: 'mindset',
    title: 'Mindset: The New Psychology of Success',
    author: 'Carol S. Dweck',
    tagline: 'How we can learn to fulfill our potential in school, work, and sports.',
    category: ['Mindset', 'Psychology', 'Education'],
    readTimeEstimate: '15 min overview',
    colorTheme: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      badge: 'bg-emerald-100 text-emerald-800',
      accent: 'text-emerald-700'
    },
    summary: 'The view you adopt for yourself profoundly affects how you lead your life. Believing your qualities are carved in stone leads to self-protection and fear of failure, whereas a growth mindset turns setbacks into springboards for development.',
    coreIdeas: [
      'In a fixed mindset, effort is seen as proof of lack of talent; in a growth mindset, effort is the vehicle of mastery.',
      'Setbacks are not labels of incompetence, but diagnostic signals about strategy and process.',
      'The word "YET" bridges current limitations with future capability.'
    ],
    concepts: [
      {
        id: 'fixed-vs-growth',
        title: 'Fixed vs. Growth Mindset',
        shortExplanation: 'Talent is not an immutable ceiling, but a starting point developed through strategy and effort.',
        detailedExplanation: 'In a fixed mindset, students believe their basic intelligence and abilities are predetermined. This creates a chronic fear of looking stupid. In a growth mindset, challenges are perceived not as personal verdicts, but as neurological workouts.',
        practicalExample: 'Receiving a poor quiz grade: Fixed mindset says "I am not built for engineering/coding." Growth mindset says "My current test-taking strategy had gaps; what needs tweaking?"',
        whyItMatters: 'Students with a growth mindset embrace difficult problems because they value learning above looking flawless.',
        applicationExample: 'When you make a mistake in a problem set, treat it as data on what needs revision rather than proof of low aptitude.',
        suggestedQuestions: [
          'How do I catch myself falling into fixed-mindset thoughts during mock tests?',
          'What does "effort" actually mean when standard studying isn\'t working?',
          'How do I handle peer comparison when someone seems naturally gifted?'
        ],
        practiceTemplate: {
          title: 'The Growth Reframe Audit',
          duration: 3,
          type: 'Cognitive Mindset Shift',
          prompt: 'Write down a recent situation where you thought "I\'m just not good at this," and translate it into a growth mindset hypothesis.'
        }
      },
      {
        id: 'the-power-of-yet',
        title: 'The Power of "Yet"',
        shortExplanation: 'Add the word "yet" to any self-limiting statement to preserve cognitive plasticity.',
        detailedExplanation: 'When you say "I don\'t understand data structures," your brain seals the case. Adding "yet" changes it to an ongoing learning timeline: "I don\'t understand data structures yet."',
        practicalExample: 'Transform "I can\'t solve dynamic programming problems" into "I haven\'t mastered dynamic programming yet."',
        whyItMatters: 'Neurologically, "yet" opens up problem-solving pathways instead of triggering threat-avoidance reflexes.',
        applicationExample: 'Whenever you utter or think a phrase expressing inability, verbally tag "yet" onto the end and specify the next action step.',
        suggestedQuestions: [
          'How does using "yet" prevent discouragement during semester prep?',
          'What is one skill I feel deficient in where adding "yet" changes my stress level?',
          'Can "yet" be paired with specific practice drills?'
        ],
        practiceTemplate: {
          title: 'The "Yet" Pivot Exercise',
          duration: 2,
          type: 'Linguistic Reframing',
          prompt: 'Identify your most stubborn "I can\'t" thought today, attach "yet", and list one concrete experiment to test next.'
        }
      },
      {
        id: 'redefining-failure',
        title: 'Reframing Failure as Diagnostic Data',
        shortExplanation: 'Failure is not an identity; it is an experiment that yielded unexpected results.',
        detailedExplanation: 'When a scientist tests a hypothesis and it fails, they do not conclude they are worthless. They extract information: which variable didn\'t hold? In student life, treating low marks as experimental data removes shame and enables iterative improvement.',
        practicalExample: 'Instead of hiding a marked exam paper in disgust, sit down with a highlighter and categorize errors into concept gaps, calculation errors, or time management.',
        whyItMatters: 'Defensive avoidance stops learning cold. Diagnostic curiosity accelerates mastery.',
        applicationExample: 'Categorize your last academic stumble into 3 neutral categories: Preparation method, Focus during test, or Concept ambiguity.',
        suggestedQuestions: [
          'How can I review test mistakes without getting overwhelmed by self-criticism?',
          'What questions should I ask professors after a poor assessment?',
          'How do I separate my self-worth from my competitive exam rank?'
        ],
        practiceTemplate: {
          title: 'Error Autopsy without Guilt',
          duration: 4,
          type: 'Diagnostic Analysis',
          prompt: 'Take one recent error or setback, describe the objective fact without adjectives, and pinpoint the procedural lesson.'
        }
      }
    ]
  },
  {
    id: 'deep-work',
    title: 'Deep Work',
    author: 'Cal Newport',
    tagline: 'Rules for focused success in a distracted world.',
    category: ['Focus', 'Productivity', 'Study Skills'],
    readTimeEstimate: '15 min overview',
    colorTheme: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      badge: 'bg-indigo-100 text-indigo-800',
      accent: 'text-indigo-700'
    },
    summary: 'The ability to perform deep work—focusing without distraction on a cognitively demanding task—is becoming increasingly rare and valuable. Cultivating it transforms both your learning speed and creative output.',
    coreIdeas: [
      'Deep work produces elite results in less total clock time than fragmented, shallow work.',
      'Attention residue from quick phone checks destroys mental bandwidth for 15-20 minutes.',
      'Clarity about what matters provides clarity about what to ignore.'
    ],
    concepts: [
      {
        id: 'attention-residue',
        title: 'Attention Residue',
        shortExplanation: 'Quickly checking a phone or notification leaves a cognitive residue that impairs deep thinking.',
        detailedExplanation: 'When you switch from writing an essay to checking a single WhatsApp message or email, your attention doesn\'t switch cleanly. A portion of your neural resources stays trapped thinking about the message, drastically reducing performance on your core study task.',
        practicalExample: 'Glancing at an Instagram notification for 5 seconds actually disrupts your problem-solving depth for the next 15 minutes.',
        whyItMatters: 'Studying for 2 hours with phone checks has the effective brainpower of 30 minutes of low-quality work.',
        applicationExample: 'Put your phone in "Do Not Disturb" mode inside your backpack before sitting down for a 45-minute focus block.',
        suggestedQuestions: [
          'How do I handle the fear of missing urgent group project texts?',
          'What is the best way to train my focus endurance from 15 minutes up to 60?',
          'How does attention residue affect complex math or coding assignments?'
        ],
        practiceTemplate: {
          title: 'Residue-Free Focus Sprint',
          duration: 3,
          type: 'Focus Ritual Design',
          prompt: 'Define your personal rules for a single 30-minute deep study sprint: where the phone goes, what tabs stay open, and how you will signal you are unavailable.'
        }
      },
      {
        id: 'embrace-boredom',
        title: 'Embrace Boredom',
        shortExplanation: 'Train your brain to tolerate zero stimulation so you can focus deeply when required.',
        detailedExplanation: 'If every mundane moment (standing in line, waiting for class, waiting for kettle) is filled with phone scrolling, you condition your brain to reject boredom. When you then try to study complex textbooks, the brain rebels against the quiet.',
        practicalExample: 'Waiting at the campus bus stop with your phone in your pocket, simply observing your breath and surroundings.',
        whyItMatters: 'You cannot be a deep thinker for 2 hours a day if you train your brain for shallow distraction for the other 14 hours.',
        applicationExample: 'Resist pulling out your screen during small transitions today—let your mind rest in silence.',
        suggestedQuestions: [
          'Why does sitting without my phone make me feel restless and anxious?',
          'How does embracing boredom stimulate creative insights for projects?',
          'What micro-practices can I do during transit instead of doom-scrolling?'
        ],
        practiceTemplate: {
          title: 'The 3-Minute Stillness Reset',
          duration: 3,
          type: 'Dopamine Calibration',
          prompt: 'Spend three intentional minutes without checking any device or looking for stimulation. Observe the urge to fidget without obeying it.'
        }
      }
    ]
  },
  {
    id: 'grit',
    title: 'Grit: The Power of Passion and Perseverance',
    author: 'Angela Duckworth',
    tagline: 'Why passion and resilience are the secrets to achievement.',
    category: ['Resilience', 'Psychology', 'Mindset'],
    readTimeEstimate: '15 min overview',
    colorTheme: {
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      badge: 'bg-rose-100 text-rose-800',
      accent: 'text-rose-700'
    },
    summary: 'High achievement is not primarily about natural giftedness. It is about grit: a combination of long-term passion and relentless perseverance toward long-term goals.',
    coreIdeas: [
      'Talent × Effort = Skill. Skill × Effort = Achievement. Effort counts twice.',
      'Grit is living life like a marathon, not a sprint.',
      'Deliberate practice focused on your weakest edge produces genuine mastery.'
    ],
    concepts: [
      {
        id: 'effort-counts-twice',
        title: 'Effort Counts Twice',
        shortExplanation: 'Effort develops skill, and effort turns skill into tangible achievement.',
        detailedExplanation: 'Society often overvalues innate brilliance and underestimates the power of staying in the chair. Duckworth\'s formula reveals that without effort, talent remains dormant potential, and without effort, acquired skill never converts into real results.',
        practicalExample: 'A student who considers themselves "average" but practices consistently every evening will outpace a brilliant classmate who only studies during panic cramming.',
        whyItMatters: 'This frees you from the trap of believing you cannot succeed because you weren\'t born a prodigy.',
        applicationExample: 'Celebrate the hours you spent solving tough problems rather than measuring whether you understood them instantly.',
        suggestedQuestions: [
          'How do I maintain effort when my study results don\'t improve right away?',
          'What is the difference between stubborn effort and smart deliberate practice?',
          'How can I remind myself of this during high-stakes competitive exams?'
        ],
        practiceTemplate: {
          title: 'Effort Multiplier Audit',
          duration: 3,
          type: 'Effort Valuation',
          prompt: 'Identify a domain where you felt "not talented enough," and map out what doubling your focused effort on foundational drills would look like.'
        }
      },
      {
        id: 'deliberate-practice-edge',
        title: 'Targeting the Stretch Edge',
        shortExplanation: 'Real improvement happens by isolating your exact point of failure, not repeating what is already comfortable.',
        detailedExplanation: 'Most students study by re-reading the chapters they already know because it feels reassuring. Deliberate practice is intentionally operating at the edge of your ability where errors happen frequently.',
        practicalExample: 'Skipping the textbook questions you can solve easily and diving straight into the multi-concept problems you usually skip.',
        whyItMatters: 'Comfortable practice creates an illusion of competence. Operating at the stretch edge builds real neural mastery.',
        applicationExample: 'Identify the one chapter or topic in your hardest subject that you always avoid, and spend 15 minutes only on its hardest sample problem.',
        suggestedQuestions: [
          'How do I handle the frustration of constantly making mistakes during deliberate practice?',
          'How do I identify my exact stretch edge in coding or mathematics?',
          'How much time per study session should be spent at this edge?'
        ],
        practiceTemplate: {
          title: 'Stretch Edge Diagnostic',
          duration: 4,
          type: 'Weakness Targeted Drilling',
          prompt: 'Name the specific concept you have been avoiding because it makes you feel incompetent, and outline one modest drill targeting only that concept.'
        }
      }
    ]
  },
  {
    id: 'courage-to-be-disliked',
    title: 'The Courage to Be Disliked',
    author: 'Ichiro Kishimi & Fumitake Koga',
    tagline: 'The Japanese phenomenon that shows you how to free yourself and change your life.',
    category: ['Psychology', 'Philosophy', 'Confidence'],
    readTimeEstimate: '15 min overview',
    colorTheme: {
      bg: 'bg-cyan-50',
      border: 'border-cyan-200',
      badge: 'bg-cyan-100 text-cyan-800',
      accent: 'text-cyan-700'
    },
    summary: 'Based on Adlerian psychology, this book teaches that you hold the power to choose your path right now. All problems are interpersonal relationship problems, and true freedom comes from separating your tasks from the tasks of other people.',
    coreIdeas: [
      'Separation of Tasks: You are responsible for your effort; other people\'s judgment of you is their task.',
      'Do not live to satisfy other people\'s expectations.',
      'True confidence is having the courage to be normal and living in the "here and now".'
    ],
    concepts: [
      {
        id: 'separation-of-tasks',
        title: 'Separation of Tasks',
        shortExplanation: 'Distinguish clearly between what is your responsibility and what belongs to others.',
        detailedExplanation: 'Ask yourself: "Whose task is this ultimately?" Your task is to prepare thoroughly for your career and conduct yourself with integrity. How parents, peers, or interviewers judge your performance is their task. Trying to control other people\'s reactions is the root of interpersonal anxiety.',
        practicalExample: 'Worrying constantly about whether your relatives approve of your chosen engineering branch vs. focusing on mastering your current coursework.',
        whyItMatters: 'Students waste enormous energy trying to control other people\'s approval, leading to chronic perfectionism and burnout.',
        applicationExample: 'Draw a boundary line: On the left, write your duty (learning the material). On the right, write their duty (their opinions and feelings). Let go of the right side.',
        suggestedQuestions: [
          'How can I apply separation of tasks when my parents put immense pressure on my career path?',
          'Does this mean I should stop caring about feedback from my professors?',
          'How do I stop feeling guilty when I set healthy boundaries with study groups?'
        ],
        practiceTemplate: {
          title: 'Task Separation Ledger',
          duration: 3,
          type: 'Boundary Clarification',
          prompt: 'Pick a current social or academic stressor. Split it into: "My Task (what I can do)" and "Their Task (what is outside my control)."'
        }
      }
    ]
  },
  {
    id: 'make-it-stick',
    title: 'Make It Stick: The Science of Successful Learning',
    author: 'Brown, Roediger & McDaniel',
    tagline: 'The cognitive science of durable learning and retention.',
    category: ['Study Skills', 'Education', 'Productivity'],
    readTimeEstimate: '15 min overview',
    colorTheme: {
      bg: 'bg-teal-50',
      border: 'border-teal-200',
      badge: 'bg-teal-100 text-teal-800',
      accent: 'text-teal-700'
    },
    summary: 'Cognitive science shows that popular study methods like highlighting and re-reading create an illusion of mastery. Durable retention requires desirable difficulties: retrieval practice, spaced repetition, and interleaving.',
    coreIdeas: [
      'Learning is deeper and more durable when it is effortful.',
      'Active retrieval produces stronger neural encoding than passive reviewing.',
      'Interleaving different types of problems trains the brain to discriminate underlying principles.'
    ],
    concepts: [
      {
        id: 'active-retrieval',
        title: 'Active Retrieval Practice',
        shortExplanation: 'Test yourself without looking at the notes before checking the answer.',
        detailedExplanation: 'When you re-read notes, the text looks familiar, which your brain misinterprets as mastery. The act of struggling to retrieve an answer from memory strengthens neural pathways far more than looking at the answer ten times.',
        practicalExample: 'Close the textbook after reading a section and force yourself to write down a mental summary or diagram on blank paper.',
        whyItMatters: 'Retrieval practice stops the shock of forgetting during actual exams.',
        applicationExample: 'Before starting a study session, spend 4 minutes writing everything you recall from the previous lecture from memory.',
        suggestedQuestions: [
          'How can I turn my existing lecture slides into active retrieval flashcards?',
          'Why does retrieval feel uncomfortable and tiring compared to highlighting?',
          'How frequently should I quiz myself on older syllabus units?'
        ],
        practiceTemplate: {
          title: 'Blank Page Retrieval Test',
          duration: 4,
          type: 'Desirable Difficulty Drill',
          prompt: 'Close all materials, take a blank paper, and sketch the core architecture of the most difficult topic you learned this week.'
        }
      }
    ]
  },
  {
    id: 'essentialism',
    title: 'Essentialism: The Disciplined Pursuit of Less',
    author: 'Greg McKeown',
    tagline: 'How to invest your time and energy in only what is essential.',
    category: ['Productivity', 'Mindset', 'Focus'],
    readTimeEstimate: '15 min overview',
    colorTheme: {
      bg: 'bg-violet-50',
      border: 'border-violet-200',
      badge: 'bg-violet-100 text-violet-800',
      accent: 'text-violet-700'
    },
    summary: 'Essentialism is not about getting more things done in less time; it is about getting only the right things done. It is the relentless discipline of eliminating non-essentials so you can make the highest possible contribution toward what matters.',
    coreIdeas: [
      'If you do not prioritize your life, someone else will.',
      'Saying yes to one opportunity means saying no to everything else you could have done with that time.',
      'Trade-offs are not something to avoid; they are an inherent reality of limited human energy.'
    ],
    concepts: [
      {
        id: 'the-90-percent-rule',
        title: 'The 90% Rule for Commitments',
        shortExplanation: 'If an opportunity or activity is not a definite 90% YES, treat it as a definite NO.',
        detailedExplanation: 'Students often say yes to every college committee, side gig, social event, and side project out of fear of missing out. The 90% rule forces you to evaluate opportunities against strict criteria: only pursue what is truly essential to your primary trajectory.',
        practicalExample: 'Evaluating 5 different hackathons or campus clubs and committing completely to the single one aligned with your core ambition.',
        whyItMatters: 'Dividing your energy among 10 superficial directions yields millimeters of progress in each; focusing on 1 yields miles of momentum.',
        applicationExample: 'Review your weekly schedule and identify one recurring low-value obligation you can politely decline or drop.',
        suggestedQuestions: [
          'How do I say no to friends and extracurricular demands without burning bridges?',
          'What are my 1-2 non-negotiable priorities for this academic semester?',
          'How does Essentialism prevent college burnout?'
        ],
        practiceTemplate: {
          title: 'Essentialist Commitments Audit',
          duration: 3,
          type: 'Priority Distillation',
          prompt: 'List 3 activities currently draining your schedule and ruthlessly identify the single essential priority that deserves your main energy.'
        }
      }
    ]
  },
  {
    id: 'feel-the-fear',
    title: 'Feel the Fear and Do It Anyway',
    author: 'Susan Jeffers',
    tagline: 'Dynamic techniques for turning fear, indecision, and anger into power and action.',
    category: ['Confidence', 'Psychology', 'Mindset'],
    readTimeEstimate: '15 min overview',
    colorTheme: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      badge: 'bg-orange-100 text-orange-800',
      accent: 'text-orange-700'
    },
    summary: 'Fear will never disappear completely as long as you continue to grow and expand. The only way to get rid of the fear of doing something is to go out and do it, realizing at the bottom of all fear is the simple belief: "I won\'t be able to handle it."',
    coreIdeas: [
      'At the bottom of every fear is the thought: "I can\'t handle it." Replace it with: "I will handle it."',
      'Fear expands when you procrastinate; taking action diminishes anxiety.',
      'Treating choices as "No-Lose Decisions" eliminates the paralysis of perfectionism.'
    ],
    concepts: [
      {
        id: 'i-can-handle-it',
        title: 'The "I Will Handle It" Anchor',
        shortExplanation: 'Underneath all anxiety is the hidden assumption that you cannot cope with negative outcomes.',
        detailedExplanation: 'Whenever you fear failing an exam, freezing during an interview, or being rejected by an employer, the real terror is not the event itself—it is the fear of being emotionally destroyed by it. Re-anchoring in "Whatever happens, I will figure out how to handle it" restores self-agency.',
        practicalExample: 'Before entering an interview room, repeating: "Even if I get a tough question I don\'t know, I have the resources to handle it with grace."',
        whyItMatters: 'You cannot guarantee that bad things will never happen, but you can build rock-solid confidence in your ability to respond.',
        applicationExample: 'Identify your scariest academic scenario right now, and write down 3 concrete steps you would take to handle it if it actually happened.',
        suggestedQuestions: [
          'How do I quiet physical fear symptoms (shaky hands, fast heartbeat) before a demo?',
          'What makes the thought "I can handle it" more effective than toxic positivity?',
          'How does this shift the pressure during competitive campus interviews?'
        ],
        practiceTemplate: {
          title: 'Coping Resource Inventory',
          duration: 3,
          type: 'Self-Efficacy Anchoring',
          prompt: 'Identify the worst possible outcome you are dreading, and write down the exact resources and actions you would use to handle it.'
        }
      }
    ]
  },
  {
    id: 'antidote',
    title: 'The Antidote: Happiness for People Who Can\'t Stand Positive Thinking',
    author: 'Oliver Burkeman',
    tagline: 'An exploration of the "negative path" to happiness and resilience.',
    category: ['Psychology', 'Mindset', 'Philosophy'],
    readTimeEstimate: '15 min overview',
    colorTheme: {
      bg: 'bg-slate-100',
      border: 'border-slate-300',
      badge: 'bg-slate-200 text-slate-800',
      accent: 'text-slate-700'
    },
    summary: 'Constantly striving to feel positive and optimistic often backfires by making us anxious and fragile. Stoic wisdom and negative capability show that embracing uncertainty, imperfection, and mortality creates authentic peace of mind.',
    coreIdeas: [
      'The effort to eliminate negative thoughts often amplifies them (the ironic rebound effect).',
      'Premeditation of evils (Stoic realism) drains the paralyzing power of anxiety.',
      'Accepting our limitations is where genuine emotional resilience begins.'
    ],
    concepts: [
      {
        id: 'premeditation-of-evils',
        title: 'Stoic Premeditation (Negative Visualization)',
        shortExplanation: 'Calmly imagine the worst-case scenario to see that life continues and you remain functional.',
        detailedExplanation: 'Rather than chanting artificial positive affirmations ("I will be amazing!"), Stoics practiced deliberately contemplating the worst that could happen. By visualizing it calmly in advance, you strip the catastrophe of its mysterious horror and realize it is manageable.',
        practicalExample: 'Visualizing failing a subject, realizing you will retake it next semester, and seeing that your loved ones still respect you and your life is not destroyed.',
        whyItMatters: 'Positive thinking breeds fragility because any setback is viewed as a catastrophe. Negative visualization builds unbreakable composure.',
        applicationExample: 'Spend 2 minutes imagining the exam you dread going poorly. Notice that the world keeps spinning and you have options.',
        suggestedQuestions: [
          'Is negative visualization depressing, or does it relieve pressure?',
          'How can I use Stoic realism without becoming cynical or apathetic?',
          'Why does toxic positive thinking increase anxiety in students?'
        ],
        practiceTemplate: {
          title: 'Worst-Case Reality Check',
          duration: 4,
          type: 'Stoic Decatastrophizing',
          prompt: 'Look the dreaded scenario directly in the eye: What is the genuine worst that happens, and why would you still survive and move forward?'
        }
      }
    ]
  },
  {
    id: 'flow',
    title: 'Flow: The Psychology of Optimal Experience',
    author: 'Mihaly Csikszentmihalyi',
    tagline: 'The classic work on how people achieve genuine happiness and focus.',
    category: ['Focus', 'Psychology', 'Productivity'],
    readTimeEstimate: '15 min overview',
    colorTheme: {
      bg: 'bg-sky-50',
      border: 'border-sky-200',
      badge: 'bg-sky-100 text-sky-800',
      accent: 'text-sky-700'
    },
    summary: 'Flow is the optimal mental state where a person is fully immersed in an activity with energized focus and enjoyment. It occurs when high challenge meets high skill with immediate feedback.',
    coreIdeas: [
      'Flow requires balancing the difficulty of the challenge with your current level of skill.',
      'Clear immediate feedback keeps the mind engaged without self-conscious doubt.',
      'Control over inner experience determines the quality of life.'
    ],
    concepts: [
      {
        id: 'challenge-skill-balance',
        title: 'The Challenge-Skill Calibration',
        shortExplanation: 'Adjust the difficulty of your study task so it stays just above your current skill.',
        detailedExplanation: 'If a task is too easy relative to your skills, you experience boredom. If the task is too difficult, you experience paralyzing anxiety. Flow happens in the sweet spot channel: where the challenge stretches your capabilities by roughly 4-5% beyond your comfort zone.',
        practicalExample: 'If textbook reading is boring, raise the challenge by racing a 10-minute timer to summarize the chapter in bullet points.',
        whyItMatters: 'Calibrating challenge turns tedious studying into an engaging, gamified flow state.',
        applicationExample: 'If an assignment feels overwhelming, lower the scope to solving 1 sub-problem. If it feels boring, challenge yourself to explain it in 60 seconds.',
        suggestedQuestions: [
          'How can I turn boring coursework into a flow experience?',
          'What should I do when an engineering subject triggers acute panic instead of flow?',
          'How can I get immediate feedback when studying alone?'
        ],
        practiceTemplate: {
          title: 'Flow Calibration Dial',
          duration: 3,
          type: 'Engagement Tuning',
          prompt: 'Take your current assignment: Diagnose if you are in the Anxiety zone or the Boredom zone, and apply one dial adjustment to enter the Flow channel.'
        }
      }
    ]
  }
];

export function getBookById(id: string): Book | undefined {
  return BOOKS.find(b => b.id === id);
}

export function getPaceDetails(book: Book, pace: PaceType): PaceDetails {
  if (pace === 'quick') {
    return {
      pace: 'quick',
      title: 'Quick Path',
      timeRange: '5–10 min / session',
      description: 'Get the essential ideas and practical takeaways quickly.',
      focusPoints: [
        'Key ideas & core thesis',
        'Concise explanations of primary concepts',
        'One direct practical takeaway',
        'One short actionable practice'
      ],
      pathSteps: [
        {
          id: `${book.id}-q1`,
          title: 'Key Idea',
          description: `The foundational thesis of ${book.title}.`,
          type: 'overview'
        },
        {
          id: `${book.id}-q2`,
          title: 'Essential Concepts',
          description: `Snapshot of core principles: ${book.concepts.slice(0, 2).map(c => c.title).join(', ')}.`,
          type: 'concept',
          conceptId: book.concepts[0]?.id
        },
        {
          id: `${book.id}-q3`,
          title: 'Practical Takeaway',
          description: 'Immediate action rule you can deploy today.',
          type: 'reflection'
        },
        {
          id: `${book.id}-q4`,
          title: 'One Short Practice',
          description: 'A 2-3 minute micro-practice to anchor the lesson.',
          type: 'practice',
          conceptId: book.concepts[0]?.id
        }
      ]
    };
  }

  if (pace === 'balanced') {
    return {
      pace: 'balanced',
      title: 'Balanced Path',
      timeRange: '15–20 min / session',
      description: 'Understand the main concepts and spend time applying them.',
      focusPoints: [
        'Book overview and framework',
        'Key concepts with practical student examples',
        'Interactive concept exploration',
        'Conversation with PSYCLONE AI guide',
        'Structured reflection',
        'Practical exercise linked to your progress'
      ],
      pathSteps: [
        {
          id: `${book.id}-b1`,
          title: 'Book Overview',
          description: `Big picture framework of ${book.title}.`,
          type: 'overview'
        },
        {
          id: `${book.id}-b2`,
          title: 'Key Concepts',
          description: `Deep dive into ${book.concepts[0]?.title || 'primary idea'}.`,
          type: 'concept',
          conceptId: book.concepts[0]?.id
        },
        {
          id: `${book.id}-b3`,
          title: 'Concept Exploration',
          description: `Exploring ${book.concepts[1]?.title || 'secondary idea'} with examples.`,
          type: 'concept',
          conceptId: book.concepts[1]?.id || book.concepts[0]?.id
        },
        {
          id: `${book.id}-b4`,
          title: 'Chat with PSYCLONE',
          description: 'Ask PSYCLONE how to apply these concepts to your specific college routine.',
          type: 'chat'
        },
        {
          id: `${book.id}-b5`,
          title: 'Reflection',
          description: 'Examine where you currently struggle with these ideas.',
          type: 'reflection'
        },
        {
          id: `${book.id}-b6`,
          title: 'Practical Exercise',
          description: 'Step-by-step application practice that updates your progress.',
          type: 'practice',
          conceptId: book.concepts[0]?.id
        }
      ]
    };
  }

  // Deep
  return {
    pace: 'deep',
    title: 'Deep Path',
    timeRange: '30–45 min / session',
    description: 'Explore concepts deeply through discussion, reflection, and application.',
    focusPoints: [
      'Comprehensive book overview & philosophical context',
      'Core ideas and foundational research',
      'Detailed multi-concept exploration with counter-examples',
      'Extensive Q&A with PSYCLONE on your personal situation',
      'Personal reflection & friction audit',
      'Direct application to user\'s situation',
      'Extended practice with multiple checkpoints',
      'Synthesis and ongoing review plan'
    ],
    pathSteps: [
      {
        id: `${book.id}-d1`,
        title: 'Book Overview',
        description: 'Comprehensive overview and conceptual foundation.',
        type: 'overview'
      },
      {
        id: `${book.id}-d2`,
        title: 'Core Ideas',
        description: 'Underlying psychological dynamics and mental models.',
        type: 'overview'
      },
      {
        id: `${book.id}-d3`,
        title: 'Detailed Concept Exploration',
        description: `Deep analysis of ${book.concepts[0]?.title}.`,
        type: 'concept',
        conceptId: book.concepts[0]?.id
      },
      {
        id: `${book.id}-d4`,
        title: 'Examples & Case Studies',
        description: `Real-life student scenarios applying ${book.concepts[1]?.title || book.concepts[0]?.title}.`,
        type: 'concept',
        conceptId: book.concepts[1]?.id || book.concepts[0]?.id
      },
      {
        id: `${book.id}-d5`,
        title: 'Chat with PSYCLONE',
        description: 'In-depth dialogue dissecting your specific challenges and habits.',
        type: 'chat'
      },
      {
        id: `${book.id}-d6`,
        title: 'Personal Reflection',
        description: 'Honest audit of self-sabotage patterns and study roadblocks.',
        type: 'reflection'
      },
      {
        id: `${book.id}-d7`,
        title: 'Application to User\'s Situation',
        description: 'Translating concepts into a customized personal protocol.',
        type: 'concept'
      },
      {
        id: `${book.id}-d8`,
        title: 'Extended Practice',
        description: 'Multi-part reflective and practical implementation protocol.',
        type: 'practice',
        conceptId: book.concepts[0]?.id
      },
      {
        id: `${book.id}-d9`,
        title: 'Review & Integration',
        description: 'Consolidation, progress log update, and ongoing commitment.',
        type: 'review'
      }
    ]
  };
}
