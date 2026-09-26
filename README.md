## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/PSYCLONE.git
cd PSYCLONE
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add Gemini API Key

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Start PSYCLONE

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

### 5. Start using PSYCLONE

```text
Home
 → Talk to PSYCLONE
 → Describe your situation
 → Get book recommendations
 → Choose a book
 → Select 7-day or 30-day journey
 → Complete daily practices
 → Track your progress
```

You can also use **Explore Books** to directly select a book and start a learning journey.

# PSYCLONE

### Understand yourself. Learn what helps. Take one step at a time.

PSYCLONE is an AI-powered mindset-building and self-learning platform designed to transform ideas from self-development books into personalized, practical daily actions.

Instead of simply recommending books, PSYCLONE uses conversational AI to understand a user's situation, identify potentially relevant thinking patterns internally, recommend suitable resources, and create a personalized learning journey based on the user's selected book and goals.

> **Smart India Hackathon 2026 Project**

---

## Table of Contents

* [Overview](#overview)
* [Problem](#problem)
* [Solution](#solution)
* [How PSYCLONE Works](#how-psyclone-works)
* [Core Features](#core-features)
* [User Journey](#user-journey)
* [AI Workflow](#ai-workflow)
* [4-Stage Learning Model](#4-stage-learning-model)
* [Architecture](#architecture)
* [Technology Stack](#technology-stack)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)
* [Environment Variables](#environment-variables)
* [Example Workflow](#example-workflow)
* [Safety and Responsible AI](#safety-and-responsible-ai)
* [Future Scope](#future-scope)
* [Team](#team)
* [License](#license)

---

# Overview

People consume large amounts of self-development content but often struggle to convert what they learn into consistent real-world behavior.

Reading a book can provide useful ideas, but the difficult part is:

**Understanding → Applying → Practicing → Maintaining**

PSYCLONE bridges this gap.

The platform converts self-development knowledge into small, personalized and actionable practices that users can perform in their everyday lives.

The system combines:

* Conversational AI
* Personalized book recommendations
* Context-aware learning
* Daily micro-practices
* Task tracking
* User feedback
* Progress tracking
* Multiple independent learning journeys

---

# Problem

Traditional self-help platforms generally follow a passive model:

```text
Find Book
   ↓
Read Book
   ↓
Understand Concept
   ↓
Try to Apply It
```

This approach has several limitations:

* Users may not know which book is relevant to their situation.
* Generic recommendations may not match individual needs.
* Reading does not guarantee application.
* Users often struggle to convert concepts into actions.
* There is little feedback about whether a particular practice was useful.
* Different users require different learning speeds and approaches.

PSYCLONE addresses these limitations by creating a personalized learning loop.

---

# Solution

PSYCLONE creates a personalized path:

```text
User Situation
      ↓
Natural Conversation
      ↓
Context Understanding
      ↓
Relevant Resource Recommendation
      ↓
Book Selection
      ↓
Personalized Learning Plan
      ↓
Daily Micro-Practices
      ↓
User Feedback
      ↓
Adaptive Learning
      ↓
Progress Tracking
```

The objective is not simply to tell users what to read.

The objective is to help users **apply what they learn**.

---

# How PSYCLONE Works

PSYCLONE has two primary learning paths.

## 1. AI-Guided Path

The user starts by describing a situation or challenge.

For example:

> "I keep procrastinating on important work even when I know I need to finish it."

PSYCLONE does not immediately assign a label.

Instead, the AI continues the conversation and asks relevant follow-up questions.

For example:

* What usually happens before you start procrastinating?
* What do you feel when you think about starting the task?
* Does this happen with all tasks or only certain ones?
* What have you already tried?
* What would you like to change?

After gathering sufficient context, PSYCLONE recommends relevant books.

The user chooses a book and then selects:

* **1 Week — 7-day focused journey**
* **1 Month — 30-day gradual journey**

PSYCLONE then creates a personalized learning plan.

---

## 2. User-Guided Path

Users do not have to talk to the AI first.

They can directly browse the book library.

```text
Explore Books
     ↓
Select Book
     ↓
Choose Duration
     ↓
Generate Learning Plan
     ↓
Today's Practice
     ↓
Progress
```

This allows users who already know what they want to learn to start immediately.

---

# Core Features

## Conversational AI

PSYCLONE provides a natural conversational interface rather than a static questionnaire.

The AI asks adaptive follow-up questions based on the conversation.

---

## Internal Thinking-Pattern Analysis

The AI can internally analyze possible unhelpful thinking patterns to improve personalization.

Examples include:

* All-or-nothing thinking
* Catastrophizing
* Overgeneralization
* Mind reading
* Personalization
* Emotional reasoning
* Negative filtering

These internal classifications are **not presented as diagnoses or labels to the user**.

Instead, they help determine:

* Relevant books
* Relevant concepts
* Follow-up questions
* Practice types
* Task difficulty

---

## Personalized Book Recommendations

After understanding the user's situation, PSYCLONE recommends multiple potentially relevant books.

Each recommendation contains:

* Title
* Author
* Overview
* Why it may be useful
* Key concepts
* Selection option

The user remains in control of which resource they want to explore.

---

## Personalized Learning Plans

After selecting a book, users choose their learning duration.

### 7-Day Journey

A focused short-term learning experience.

### 30-Day Journey

A slower, more gradual learning experience.

The learning plan adapts the number and type of activities to the selected duration.

---

## Daily Micro-Practices

Each day contains approximately 2–4 activities.

Possible activity types include:

* Learn
* Reflect
* Practice
* Apply
* Review
* Check-in

Tasks are designed to be actionable rather than simply asking users to read.

Example:

Instead of:

> "Read about habits."

PSYCLONE may provide:

> "Identify one habit you repeatedly postpone. Write down what normally happens immediately before you avoid it."

---

## Task Progression

Tasks have four states:

```text
NOT_STARTED
     ↓
IN_PROGRESS
     ↓
COMPLETED
```

A task can also become:

```text
MISSED
```

Opening a task does not automatically complete it.

The user must interact with the task.

---

## Feedback Loop

After completing a task, the user is asked:

**Did this help?**

Options:

* Helped
* Helped a little
* Didn't help
* Not sure

The user can also provide written feedback.

This feedback can influence future practices.

---

## Multiple Learning Journeys

Users can learn from multiple books simultaneously.

For example:

```text
Atomic Habits
Day 8 / 30
18 completed
3 missed

Deep Work
Day 3 / 7
7 completed
1 missed
```

Each book maintains its own:

* Current day
* Tasks
* Completion history
* Missed tasks
* Feedback
* Duration
* Progress

---

## Context-Aware AI

PSYCLONE understands the user's current learning context.

If the user asks a question while completing a task, the AI can understand:

* Current book
* Current concept
* Current task
* Current day
* Original user situation
* Relevant previous feedback

Therefore, the user can ask:

> "Why am I doing this exercise?"

and receive an explanation related to the current practice rather than restarting the entire conversation.

---

# User Journey

## AI-Guided Journey

```text
┌──────────────────────┐
│        HOME          │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Talk to PSYCLONE     │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Natural Conversation │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Adaptive Questions   │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Book Recommendations │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Select Book          │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Select Duration      │
│ 7 Days / 30 Days     │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Personalized Plan    │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Today's Practice     │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Complete Tasks       │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Give Feedback        │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Track Progress       │
└──────────────────────┘
```

---

# AI Workflow

The AI workflow can be represented as:

```text
User Message
     ↓
Conversation Context
     ↓
Context Extraction
     ↓
Internal Pattern Analysis
     ↓
Book Matching
     ↓
Book Recommendation
     ↓
User Book Selection
     ↓
Duration Selection
     ↓
Plan Generation
     ↓
Daily Task Generation
     ↓
Task Completion
     ↓
Feedback
     ↓
Adaptive Future Tasks
```

The system should maintain relevant context throughout the learning journey.

---

# 4-Stage Learning Model

PSYCLONE follows a four-stage learning progression:

## 1. Awareness

Help the user notice a recurring pattern or behavior.

Example:

> Identify situations where procrastination occurs.

---

## 2. Understanding

Connect the observed behavior with a relevant concept.

Example:

> Understand why immediate discomfort can lead to task avoidance.

---

## 3. Challenge

Encourage the user to question an existing assumption or behavior.

Example:

> Identify the assumption that a task must be completed perfectly before starting.

---

## 4. Practice

Convert the concept into an actionable real-world experiment.

Example:

> Work on the task for only five minutes and observe what happens.

This creates a continuous loop:

```text
Awareness
    ↓
Understanding
    ↓
Challenge
    ↓
Practice
    ↓
New Awareness
    ↺
```

---

# Architecture

The conceptual architecture is:

```text
                   ┌───────────────────┐
                   │       USER        │
                   └─────────┬─────────┘
                             │
                             ↓
                   ┌───────────────────┐
                   │    PSYCLONE UI    │
                   └─────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              ↓              ↓              ↓
         ┌─────────┐    ┌─────────┐   ┌──────────┐
         │  CHAT   │    │  BOOKS  │   │  TASKS   │
         └────┬────┘    └────┬────┘   └────┬─────┘
              │              │              │
              └──────────────┼──────────────┘
                             ↓
                   ┌───────────────────┐
                   │   AI / Gemini     │
                   └─────────┬─────────┘
                             │
                             ↓
                   ┌───────────────────┐
                   │ Learning Planner  │
                   └─────────┬─────────┘
                             │
                             ↓
                   ┌───────────────────┐
                   │ Progress & State  │
                   └───────────────────┘
```

---

# Technology Stack

## Frontend

* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Lucide Icons

## AI

* Google Gemini API
* Prompt-based contextual reasoning
* Personalized recommendation generation
* Personalized task generation

## State & Persistence

* React state management
* Browser localStorage for prototype persistence

## Development

* Node.js
* npm
* Vite

---

# Project Structure

A typical project structure is:

```text
PSYCLONE/
│
├── public/
│   └── assets/
│
├── src/
│   ├── components/
│   │   ├── Chat/
│   │   ├── Books/
│   │   ├── Tasks/
│   │   ├── Progress/
│   │   └── UI/
│   │
│   ├── pages/
│   │   ├── Home
│   │   ├── Chat
│   │   ├── Books
│   │   ├── Tasks
│   │   └── Progress
│   │
│   ├── data/
│   │   └── books
│   │
│   ├── services/
│   │   ├── gemini
│   │   └── recommendation
│   │
│   ├── types/
│   │
│   ├── utils/
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── USER_FLOW.md
│   └── AI_WORKFLOW.md
│
├── .env.example
├── package.json
├── README.md
└── ...
```

The exact structure may vary depending on implementation.

---

# Getting Started

## 1. Clone the Repository

```bash
git clone <repository-url>
cd PSYCLONE
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create a `.env` file based on `.env.example`.

Example:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

Do not commit the `.env` file to GitHub.

---

## 4. Start Development Server

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

# Environment Variables

Create:

```text
.env
```

Example:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
```

For security:

```text
.env
```

should be included in `.gitignore`.

Only commit:

```text
.env.example
```

---

# Example User Experience

### Scenario

A user says:

> "I keep delaying my college work even though I know the deadline is close."

PSYCLONE begins a conversation instead of immediately giving a generic productivity tip.

It may ask:

> "What usually happens when you sit down to start the work?"

The user responds.

PSYCLONE continues the conversation and gathers enough context.

It then recommends relevant resources such as:

* Atomic Habits
* Deep Work

The user chooses a book.

Then:

```text
Choose your journey

7 DAYS
Focused journey

30 DAYS
Gradual journey
```

The user selects 7 days.

PSYCLONE generates tasks such as:

```text
Day 1

1. Identify the trigger
2. Reduce your task to a two-minute starting action
3. Complete the starting action
```

After completing each task, the user gives feedback.

PSYCLONE uses the interaction history to inform future practices.

---

# Responsible AI

PSYCLONE is designed as a self-learning and personal-development platform.

It does not:

* Diagnose mental-health conditions
* Claim to provide therapy
* Replace professional mental-health support
* Present internal AI classifications as diagnoses
* Expose hidden AI reasoning

The platform uses careful language such as:

> "Based on what you've shared..."

and:

> "This may be useful to explore..."

For situations involving immediate danger or serious crisis, users should seek appropriate professional or emergency support.

---

# Future Scope

Potential future improvements include:

* Secure user accounts
* Cloud synchronization
* Long-term personalization
* Advanced recommendation models
* Vector database for book knowledge
* Retrieval-Augmented Generation (RAG)
* Voice interaction
* Multilingual support
* More comprehensive book knowledge bases
* Advanced behavioral analytics
* Personalized difficulty adaptation
* Calendar and reminder integration
* Mobile application
* Privacy-preserving user profiles

---

# Why PSYCLONE?

Most self-development platforms focus on **content consumption**.

PSYCLONE focuses on **content application**.

The core idea is:

```text
Don't just read the idea.
Understand it.
Challenge it.
Practice it.
Reflect on it.
Repeat.
```

PSYCLONE transforms self-development from a passive reading experience into an interactive learning journey.

---

# Smart India Hackathon 2026

**Project:** PSYCLONE

**Category:** Software

**Theme:** MedTech / BioTech / HealthTech

PSYCLONE is developed as an AI-powered platform for personalized mindset development and practical self-learning.

---

# Team

### Team PSYCLONE

Add your team members here:

| Member   | Role        |
| -------- | ----------- |
| Member 1 | AI / ML     |
| Member 2 | Frontend    |
| Member 3 | Backend     |
| Member 4 | UI/UX       |
| Member 5 | Research    |
| Member 6 | Integration |

---

# License

This project is developed as an academic and hackathon prototype.

Add the appropriate license before public distribution.
