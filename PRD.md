# VivaBot — Production-Grade Product Requirements Document

**Version:** 1.0
**Date:** June 15, 2026
**Classification:** Confidential — Investor & Engineering Ready
**Status:** Final Draft

---

# Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [User Personas](#2-user-personas)
3. [Product Vision](#3-product-vision)
4. [User Journeys](#4-user-journeys)
5. [Functional Requirements](#5-functional-requirements)
6. [AI Architecture](#6-ai-architecture)
7. [Multi-Agent System](#7-multi-agent-system)
8. [Viva Simulation Modes](#8-viva-simulation-modes)
9. [Voice System](#9-voice-system)
10. [Feedback Engine](#10-feedback-engine)
11. [Analytics](#11-analytics)
12. [Database Design](#12-database-design)
13. [API Design](#13-api-design)
14. [Frontend Design](#14-frontend-design)
15. [UX Design](#15-ux-design)
16. [Security](#16-security)
17. [Infrastructure](#17-infrastructure)
18. [AI Cost Optimization](#18-ai-cost-optimization)
19. [SaaS Business Model](#19-saas-business-model)
20. [Roadmap](#20-roadmap)
21. [Investor Section](#21-investor-section)
22. [Technical Implementation Plan](#22-technical-implementation-plan)
23. [Complete Folder Structure](#23-complete-folder-structure)
24. [Final Output Requirements](#24-final-output-requirements)

---

# 1. Executive Summary

## Problem Statement

Every year, over 4.2 million students globally defend dissertations, theses, capstone projects, and research papers through oral examinations (vivas). The failure rate for first-attempt PhD vivas in the UK alone is approximately 4%, with ~35% requiring major corrections — outcomes that cost students months of additional work and institutions significant administrative overhead.

The core problem: **Students have no way to practice the most consequential academic assessment of their career.** They write for years, then walk into a room and speak unprepared. No mock examiner exists that:

- Has actually read their 80,000-word thesis
- Asks questions grounded in their specific methodology, data, and claims
- Adapts follow-up questions based on the quality of their answers
- Scores their performance against the same rubric their real examiner will use
- Is available at 2 AM the night before their defense

## Existing Challenges

| Challenge | Impact |
|-----------|--------|
| No scalable practice mechanism | Students rehearse with friends who haven't read the work |
| Supervisor availability is limited | 1-2 mock vivas at most; scheduling is difficult |
| Generic question banks are shallow | "What is your contribution?" doesn't test deep understanding |
| Anxiety is the primary failure mode | Students who know the material freeze under pressure |
| Assessment criteria are opaque | Students don't know how they'll be scored until it's too late |
| International students face language barriers | No safe space to practice academic English under pressure |
| Institutions lack preparation analytics | No data on student readiness before examination day |

## Market Opportunity

- **Global higher education market:** $2.2 trillion (2025)
- **EdTech market:** $340 billion (2025), growing at 16.3% CAGR
- **AI in education market:** $20 billion (2025), growing at 36% CAGR
- **Total addressable students defending research annually:** ~4.2 million
- **Average willingness-to-pay per student (surveyed):** $29–$79/month during preparation period
- **University budget for student support tools:** $15–$50 per student/year

No direct competitor exists. Adjacent tools (ChatGPT, Quizlet, Grammarly) cannot read a full thesis, generate grounded examination questions, or simulate a scored defense session.

## Competitive Advantage

1. **Document-grounded questioning** — Every question traces back to a specific page, paragraph, or claim in the student's own work
2. **Multi-agent examiner panel** — Specialized agents for methodology, statistics, literature, and contribution assessment
3. **Rubric-aligned scoring** — Performance is measured against the same criteria used in real examinations
4. **Voice-native interaction** — Real vivas are spoken; VivaBot is spoken
5. **Institutional integration** — SSO, LMS integration, department analytics, custom rubrics
6. **Longitudinal improvement tracking** — Students see exactly which areas improved between sessions

## Business Value

| Stakeholder | Value |
|-------------|-------|
| Students | 3-5x more practice sessions than available from supervisors; objective performance feedback; reduced anxiety |
| Supervisors | Offload repetitive mock viva work; see student readiness data before recommending examination |
| Examiners | Pre-defense performance data to calibrate questioning; standardized rubric enforcement |
| Departments | Aggregate readiness analytics; reduced re-examination rates; quality assurance data |
| Universities | Differentiated student support offering; retention improvement; international student support |
| VivaBot (business) | $42M ARR at 300K subscribers at blended $12/month ARPU |

## Target Users

### Primary
- PhD candidates (1.5M globally in defense preparation at any time)
- Masters students with thesis defense requirements (~2M annually)

### Secondary
- Undergraduate capstone students (~10M annually, lower ARPU)
- Medical/law students with oral examination components
- Professional certification candidates (PMP, CFA oral components)

### Institutional Buyers
- Universities (Top 1,000 research universities = initial target)
- Research institutes
- Professional training organizations

---

# 2. User Personas

## Students

### Persona 1: Amara — PhD Candidate

| Attribute | Detail |
|-----------|--------|
| **Age** | 29 |
| **Program** | PhD Computer Science, Year 4 |
| **University** | University of Manchester, UK |
| **Background** | Nigerian, studying in the UK on scholarship |
| **Thesis** | "Federated Learning for Privacy-Preserving Healthcare Analytics" |
| **Tech comfort** | High — uses LaTeX, Python, Overleaf daily |
| **Defense date** | 8 weeks away |
| **Pain points** | Supervisor available for one mock viva only; accent anxiety; unsure how to explain statistical choices to a non-ML examiner; no feedback loop on answers |
| **Goal** | Practice 3x/week, get scored on rubric, identify weakest sections |
| **Willingness to pay** | $49/month for 2 months |
| **Quote** | "I've spent 4 years on this. I can't afford to walk in unprepared." |

### Persona 2: James — Masters Student

| Attribute | Detail |
|-----------|--------|
| **Age** | 24 |
| **Program** | MSc Data Science |
| **University** | University of Melbourne, Australia |
| **Thesis** | "Predicting Patient Readmission Using Gradient Boosted Trees" |
| **Tech comfort** | Medium — comfortable with notebooks, not infrastructure |
| **Defense date** | 3 weeks away |
| **Pain points** | First major oral assessment; doesn't know what to expect; methodology section was rushed; nervous about statistics questions |
| **Goal** | Understand what examiners ask; practice answering methodology questions |
| **Willingness to pay** | $29/month for 1 month |
| **Quote** | "I don't even know what a viva is like. I just need to know what they'll ask." |

### Persona 3: Sofia — Undergraduate Capstone

| Attribute | Detail |
|-----------|--------|
| **Age** | 21 |
| **Program** | BSc Nursing |
| **University** | University of the Philippines |
| **Project** | "Impact of Telehealth on Rural Patient Outcomes" |
| **Tech comfort** | Low — uses Word, basic Google tools |
| **Defense date** | 1 week away |
| **Pain points** | English is second language; panel defense format with 3 examiners; has never presented research before |
| **Goal** | Practice basic Q&A about her project; build speaking confidence |
| **Willingness to pay** | Free tier or $9/month |
| **Quote** | "I just don't want to freeze when they ask me a question." |

## Academic Staff

### Persona 4: Dr. Sarah Chen — Supervisor

| Attribute | Detail |
|-----------|--------|
| **Role** | Associate Professor, supervising 6 PhD students |
| **Institution** | ETH Zurich |
| **Pain points** | Cannot conduct mock vivas for all students; wants to see student readiness before recommending for defense; spends 4+ hours per mock viva |
| **Goal** | View student practice data; ensure students are ready; reduce re-examination rate in her group |
| **Value** | Dashboard showing each student's readiness score, session history, and weak areas |

### Persona 5: Prof. Williams — External Examiner

| Attribute | Detail |
|-----------|--------|
| **Role** | Professor, frequently serves as external examiner |
| **Institution** | Imperial College London |
| **Pain points** | Receives thesis 6 weeks before viva; must generate questions manually; no way to pre-assess student capability |
| **Goal** | Use platform to generate question bank from thesis; optionally review student's practice performance |
| **Value** | AI-generated question bank grounded in the specific thesis; pre-defense readiness signal |

### Persona 6: Dr. Okonkwo — Department Head

| Attribute | Detail |
|-----------|--------|
| **Role** | Head of Department, Engineering |
| **Institution** | University of Lagos |
| **Pain points** | High re-examination rates (18%); no visibility into student preparation; inconsistent assessment standards across examiners |
| **Goal** | Department-wide analytics; standardized rubrics; reduce re-exam rate to under 8% |
| **Value** | Aggregate dashboard, rubric templates, cohort comparison analytics |

## Institutions

### Persona 7: University of Edinburgh — Research University

| Attribute | Detail |
|-----------|--------|
| **Size** | 35,000 students, 4,000 postgraduate researchers |
| **Current tools** | Moodle LMS, Turnitin, Microsoft 365 |
| **Pain points** | No centralized defense preparation tool; international students underperform in vivas despite strong written work; manual rubric management |
| **Goal** | Platform-wide deployment for all PGR students; SSO via Microsoft Entra; LMS integration; GDPR compliance |
| **Budget** | $15-25 per PGR student/year (institution-funded) |

### Persona 8: Karolinska Institute — Research Institute

| Attribute | Detail |
|-----------|--------|
| **Size** | 6,000 researchers |
| **Focus** | Medical and biomedical research |
| **Pain points** | Complex defense format with opponent system; need domain-specific medical/scientific questioning |
| **Goal** | Custom examination format matching Swedish PhD defense structure; medical terminology support |

---

# 3. Product Vision

## Mission

Ensure no student walks into a thesis defense unprepared.

## Vision

VivaBot becomes the global standard for academic defense preparation — every university includes it in their research degree toolkit, every student uses it before their viva, and every examiner trusts its question generation.

## Core Principles

1. **Grounded, not generic** — Every question must trace to a specific claim, method, or finding in the student's own document. If the AI cannot ground a question, it must not ask it.

2. **Assessment-aligned** — All feedback maps to real academic rubric criteria. Scores must correlate with actual examination outcomes (validated annually).

3. **Anxiety reduction through repetition** — The primary outcome is confidence. Students who practice 5+ sessions should report measurably lower anxiety on the GAD-7 scale.

4. **Voice-first** — Real vivas are spoken. Text is a fallback, not the default. The platform must feel like a conversation, not a chatbot.

5. **Institutional trust** — Universities must trust the platform with student research before publication. Security, privacy, and IP protection are non-negotiable.

6. **Accessible globally** — Works on low-bandwidth connections, supports screen readers, works in multiple languages, and prices affordably for students in low-income countries.

## Success Metrics

| Metric | Target (Year 1) | Target (Year 3) |
|--------|-----------------|-----------------|
| Monthly Active Users (students) | 50,000 | 500,000 |
| Institutional contracts | 50 | 500 |
| Avg. sessions per student before defense | 4.2 | 7.5 |
| Student-reported anxiety reduction | 30% improvement | 45% improvement |
| Correlation with actual viva outcome | 0.6 Pearson r | 0.75 Pearson r |
| Net Promoter Score (students) | 55 | 70 |
| Net Revenue Retention (institutions) | 110% | 130% |
| Monthly Recurring Revenue | $350K | $3.5M |

---

# 4. User Journeys

## Student Journey

### Phase 1: Onboarding (Day 0)

```
Student lands on vivabot.ai
    → "Prepare for your thesis defense with AI"
    → Sign up (email / Google / university SSO)
    → Select role: Student
    → Select level: Undergraduate / Masters / PhD
    → Select university (autocomplete, 5000+ institutions)
    → Select department
    → Select defense date (triggers preparation timeline)
    → Onboarding tour (3 screens, skippable)
```

### Phase 2: Project Upload (Day 0-1)

```
Student enters project workspace
    → Upload thesis/dissertation (PDF or DOCX, max 200MB)
    → System extracts text, detects structure (chapters, sections, references)
    → Student confirms detected structure or adjusts
    → Optional: Upload marking rubric (PDF/DOCX)
    → Optional: Upload presentation slides (PPTX/PDF)
    → Optional: Upload supervisor feedback notes
    → System processes documents (2-5 minutes)
    → Student receives: "Your project is ready. We've identified 12 chapters, 
      47 key claims, and 23 methodological decisions we can examine you on."
```

### Phase 3: First Viva Session (Day 1-2)

```
Student clicks "Start Practice"
    → Select mode: Quick (5 min) / Standard (15 min) / Full (45 min)
    → Select style: Friendly / Balanced / Challenging
    → Select focus: Full thesis / Specific chapter / Methodology only
    → Select interface: Voice / Text / Video
    → Session begins
    → AI introduces itself as examiner
    → Asks opening question grounded in thesis
    → Student responds (voice or text)
    → AI evaluates response, asks follow-up
    → Session continues for selected duration
    → Session ends with summary
    → Student receives:
        - Overall score (0-100)
        - Category scores (Knowledge, Methodology, Communication, etc.)
        - Transcript with annotations
        - Specific improvement suggestions
        - Recommended areas to study
```

### Phase 4: Improvement Cycle (Day 2 → Defense Day)

```
Student reviews feedback
    → Dashboard shows score trends across sessions
    → Weak areas highlighted with specific thesis sections
    → "Practice this area" buttons for targeted sessions
    → Student starts focused session on weak methodology section
    → Scores improve in that area
    → New weak areas surface
    → Cycle repeats
    → Pre-defense readiness score reaches "Confident" threshold
    → System sends: "You're ready. You've improved 34% since your first session."
```

## Examiner Journey

### Rubric Creation

```
Examiner logs in (SSO or invite link from department)
    → Navigate to Rubrics
    → Create new rubric or clone institutional template
    → Define categories: Knowledge, Methodology, Analysis, Communication, Defense
    → Define scoring levels per category: Excellent / Good / Satisfactory / Unsatisfactory
    → Define descriptors per level
    → Save and assign to department/course
    → Students using this rubric are scored against it
```

### Student Performance Review

```
Examiner opens Students dashboard
    → See list of supervised students
    → Click student → see session history
    → See score trends, weak areas, session transcripts
    → Optionally review AI-generated question bank for the student's thesis
    → Export readiness report (PDF)
    → Decide whether to recommend student for defense
```

## University Journey

### Department Setup

```
University admin logs in (SSO)
    → Navigate to Organization settings
    → Add departments
    → Assign department heads
    → Upload institutional rubric templates
    → Configure defense formats (single examiner, panel, opponent system)
    → Set student license allocation per department
    → Enable/disable features per role
```

### Analytics Dashboard

```
Department head opens Analytics
    → See aggregate readiness across all students
    → Filter by: cohort year, program, supervisor, defense date
    → Identify at-risk students (low readiness scores, no practice sessions)
    → Compare department performance against institutional average
    → Export reports for quality assurance reviews
```

---

# 5. Functional Requirements

## 5.1 Authentication & Authorization

| ID | Requirement | Priority |
|----|------------|----------|
| AUTH-001 | Email/password registration with email verification | P0 |
| AUTH-002 | Google OAuth 2.0 | P0 |
| AUTH-003 | Microsoft Entra ID (for university SSO) | P0 |
| AUTH-004 | SAML 2.0 SSO for institutional identity providers | P1 |
| AUTH-005 | Multi-factor authentication (TOTP) | P1 |
| AUTH-006 | Password reset via email link (expires in 1 hour) | P0 |
| AUTH-007 | Session management with JWT (15-min access, 7-day refresh) | P0 |
| AUTH-008 | Account lockout after 5 failed attempts (30-min cooldown) | P0 |
| AUTH-009 | Role-based access: Student, Supervisor, Examiner, DeptHead, OrgAdmin, PlatformAdmin | P0 |
| AUTH-010 | Invitation-based onboarding for institutional users | P0 |

## 5.2 User Management

| ID | Requirement | Priority |
|----|------------|----------|
| USER-001 | User profile: name, email, avatar, institution, department, program, defense date | P0 |
| USER-002 | Role assignment and modification by OrgAdmin | P0 |
| USER-003 | User deactivation (soft delete, retain data for audit) | P0 |
| USER-004 | Bulk user import via CSV for institutions | P1 |
| USER-005 | User search and filtering for admins | P0 |
| USER-006 | Profile completion progress indicator | P2 |

## 5.3 Subscription & Billing

| ID | Requirement | Priority |
|----|------------|----------|
| BILL-001 | Stripe integration for individual subscriptions | P0 |
| BILL-002 | Free tier: 2 sessions/month, text-only, 1 project | P0 |
| BILL-003 | Student plan: unlimited sessions, voice, 3 projects | P0 |
| BILL-004 | Researcher plan: all features, 10 projects, priority AI | P0 |
| BILL-005 | University plan: per-seat licensing, annual billing, SSO | P1 |
| BILL-006 | Enterprise plan: custom terms, SLA, dedicated support | P1 |
| BILL-007 | Usage metering: sessions consumed, minutes used, documents processed | P0 |
| BILL-008 | Invoice generation for institutional buyers | P1 |
| BILL-009 | Proration on plan changes | P1 |
| BILL-010 | Student discount verification (SheerID or .edu email) | P2 |

## 5.4 Multi-tenancy & Organizations

| ID | Requirement | Priority |
|----|------------|----------|
| MT-001 | Organization (tenant) creation with subdomain or custom domain | P0 |
| MT-002 | Row-level data isolation per organization | P0 |
| MT-003 | Organization-level settings: allowed features, rubric templates, defense formats | P0 |
| MT-004 | Department hierarchy within organizations | P0 |
| MT-005 | Course management within departments | P1 |
| MT-006 | Organization branding: logo, colors (applied to student portal) | P2 |
| MT-007 | Data residency selection (EU, US, APAC) | P1 |

## 5.5 Research Projects

| ID | Requirement | Priority |
|----|------------|----------|
| PROJ-001 | Create project: title, description, type (thesis/dissertation/capstone/paper) | P0 |
| PROJ-002 | Upload primary document (PDF, DOCX; max 200MB) | P0 |
| PROJ-003 | Upload supplementary documents: rubric, slides, supervisor notes, published papers | P0 |
| PROJ-004 | Document processing pipeline: extract text, detect structure, chunk, embed | P0 |
| PROJ-005 | Processing status indicator with estimated time | P0 |
| PROJ-006 | Detected structure review: student confirms/adjusts chapters, sections | P1 |
| PROJ-007 | Project versioning: re-upload updated document, re-process | P1 |
| PROJ-008 | Project sharing: student invites supervisor to view | P1 |
| PROJ-009 | Project archival after defense | P2 |

## 5.6 Viva Sessions

| ID | Requirement | Priority |
|----|------------|----------|
| VIVA-001 | Create session: select project, mode, style, focus, interface | P0 |
| VIVA-002 | Text-based viva: chat interface, real-time AI responses | P0 |
| VIVA-003 | Voice-based viva: real-time speech-to-text and text-to-speech | P1 |
| VIVA-004 | Video-based viva: webcam feed with voice (student sees AI avatar) | P2 |
| VIVA-005 | Session timer with configurable duration | P0 |
| VIVA-006 | Mid-session pause and resume | P0 |
| VIVA-007 | Session transcript generation (auto for voice/video) | P0 |
| VIVA-008 | Follow-up questions based on answer quality | P0 |
| VIVA-009 | "I don't know" detection with supportive follow-up | P0 |
| VIVA-010 | Session recording (audio) with consent | P1 |
| VIVA-011 | Session bookmarking: student marks difficult questions | P1 |
| VIVA-012 | Session replay with annotations | P2 |

## 5.7 AI Question Generation

| ID | Requirement | Priority |
|----|------------|----------|
| QG-001 | Generate questions grounded in uploaded document only | P0 |
| QG-002 | Question categories: knowledge, methodology, analysis, contribution, literature, defense | P0 |
| QG-003 | Question difficulty levels: foundational, intermediate, advanced, adversarial | P0 |
| QG-004 | Page/section citation for every generated question | P0 |
| QG-005 | Question bank generation (20-50 questions per project) | P0 |
| QG-006 | Question bank export (PDF) | P1 |
| QG-007 | Custom question injection by supervisor | P1 |
| QG-008 | Question deduplication across sessions | P1 |

## 5.8 Rubric Management

| ID | Requirement | Priority |
|----|------------|----------|
| RUB-001 | Create rubric: categories, levels, descriptors, weights | P0 |
| RUB-002 | Institutional rubric templates | P0 |
| RUB-003 | Clone and customize rubrics | P0 |
| RUB-004 | Default rubric for students without institutional rubric | P0 |
| RUB-005 | Rubric assignment to courses/departments | P1 |
| RUB-006 | Rubric versioning | P2 |

## 5.9 Performance & Reporting

| ID | Requirement | Priority |
|----|------------|----------|
| PERF-001 | Per-session score report: overall + per-category | P0 |
| PERF-002 | Score trend visualization across sessions | P0 |
| PERF-003 | Weak area identification with specific thesis sections | P0 |
| PERF-004 | Improvement recommendations | P0 |
| PERF-005 | Exportable performance report (PDF) | P1 |
| PERF-006 | Supervisor readiness report per student | P1 |
| PERF-007 | Department aggregate report | P1 |
| PERF-008 | Comparative analytics (student vs. cohort average) | P2 |

## 5.10 Notifications

| ID | Requirement | Priority |
|----|------------|----------|
| NOTIF-001 | Email: session complete, weekly progress summary, defense reminder | P0 |
| NOTIF-002 | In-app notifications | P0 |
| NOTIF-003 | Push notifications (mobile PWA) | P2 |
| NOTIF-004 | Supervisor notification when student completes session | P1 |
| NOTIF-005 | Defense countdown reminders (30d, 14d, 7d, 1d) | P1 |

## 5.11 Administration

| ID | Requirement | Priority |
|----|------------|----------|
| ADM-001 | Platform admin dashboard: users, organizations, usage, revenue | P0 |
| ADM-002 | Feature flags per organization | P0 |
| ADM-003 | Audit log: all data access and modifications | P0 |
| ADM-004 | System health monitoring | P0 |
| ADM-005 | Support ticket management | P1 |

---

# 6. AI Architecture

## 6.1 Document Processing Pipeline

### Overview

```
Upload → Validate → Extract → Structure → Chunk → Embed → Store → Index
```

### Stage Details

**1. Validation**
- File type check (PDF, DOCX, PPTX, images)
- Size limit enforcement (200MB)
- Malware scan (ClamAV)
- Page count extraction

**2. Text Extraction**
- PDF: `pdf-parse` + `pdfjs-dist` for text-layer PDFs
- DOCX: `mammoth` for structured extraction with heading detection
- PPTX: `python-pptx` (microservice) for slide-by-slide extraction
- Images/scanned PDFs: AWS Textract or Google Document AI for OCR
- Research papers: GROBID for structured extraction (title, abstract, sections, references)

**3. Structure Detection**
- Heading hierarchy detection (H1 = chapters, H2 = sections, H3 = subsections)
- Table of contents extraction and validation
- Figure/table caption extraction
- Reference section isolation
- Appendix detection

**4. Chunking Strategy**
- **Primary:** Semantic chunking by section (respecting heading boundaries)
- **Secondary:** Sliding window within large sections (1,500 tokens, 200-token overlap)
- **Metadata per chunk:** chapter, section, page numbers, heading hierarchy, document type
- **Special handling:** Tables chunked as complete units; figures chunked with captions
- Average thesis (80K words) → ~250-400 chunks

**5. Embedding**
- Model: `text-embedding-3-large` (OpenAI) or `voyage-3-large` (Anthropic partnership)
- Dimension: 1024 (reduced from 3072 via Matryoshka for cost optimization)
- Batch processing: 100 chunks per API call
- Cost: ~$0.02 per thesis for embedding

**6. Vector Storage**
- PgVector extension on PostgreSQL
- HNSW index for approximate nearest neighbor search
- Metadata filtering on: organization_id, project_id, document_type, chapter, section
- Hybrid search: vector similarity + BM25 full-text (using `ts_vector`)

### Processing Performance Targets

| Document Type | Size | Processing Time |
|--------------|------|----------------|
| 80K-word PhD thesis (text PDF) | 2MB | < 90 seconds |
| 80K-word PhD thesis (scanned) | 50MB | < 5 minutes |
| 15K-word Masters thesis | 500KB | < 30 seconds |
| 50-slide PPTX presentation | 10MB | < 45 seconds |
| 5-page marking rubric | 100KB | < 10 seconds |

## 6.2 RAG Architecture

### Retrieval Strategy

```
Student answer + question context
    → Query formulation (expand abbreviations, add thesis context)
    → Hybrid search (0.7 vector + 0.3 BM25)
    → Top-K retrieval (K=8)
    → Cross-encoder reranking (Cohere Rerank or BGE Reranker)
    → Top-4 chunks selected
    → Injected into LLM prompt as grounding context
```

### Grounding Strategy

Every AI-generated question must include:
- `source_chunks`: array of chunk IDs used to generate the question
- `page_references`: human-readable page numbers
- `confidence`: model's self-assessed groundedness (0-1)
- Questions with confidence < 0.7 are filtered or flagged

### Hallucination Prevention

1. **Constrained generation:** System prompt explicitly instructs: "Only ask questions about content present in the provided thesis excerpts. Never introduce external claims."
2. **Citation enforcement:** Every question includes a citation. Questions without traceable citations are rejected by the validation layer.
3. **Answer evaluation grounding:** When scoring student answers, the AI must reference specific thesis content that supports or contradicts the answer.
4. **Faithfulness checking:** A lightweight verification step compares generated questions against source chunks using NLI (Natural Language Inference) classification.
5. **Human feedback loop:** Students can flag questions as "not from my thesis" — flagged questions are logged, reviewed, and used to fine-tune retrieval.

## 6.3 Question Generation Engine

### Input
- Student's project document chunks (via RAG)
- Rubric criteria
- Session mode and difficulty
- Previous session questions (for deduplication)
- Student's identified weak areas

### Generation Process

```
1. Select rubric category to examine (weighted by weakness profile)
2. Retrieve relevant chunks for that category
3. Generate question using LLM with:
   - Role: "Academic examiner for [field]"
   - Grounding: retrieved chunks
   - Difficulty: specified level
   - Style: specified mode (friendly/balanced/hostile)
4. Validate question:
   - Grounded in source? (NLI check)
   - Not duplicate of previous questions? (semantic similarity < 0.85)
   - Appropriate difficulty? (classifier check)
5. Generate expected answer rubric (what a good answer includes)
6. Store question with metadata
```

### LLM Selection

| Task | Model | Rationale |
|------|-------|-----------|
| Question generation | Claude Sonnet 4.6 | Best balance of quality and cost for structured generation |
| Answer evaluation | Claude Sonnet 4.6 | Nuanced rubric-aligned scoring |
| Follow-up generation | Claude Haiku 4.5 | Fast, cheap, adequate for reactive follow-ups |
| Session summary | Claude Sonnet 4.6 | Comprehensive synthesis |
| Document structure detection | Claude Haiku 4.5 | Classification task, speed matters |

---

# 7. Multi-Agent System

## Agent Architecture

The viva session is orchestrated by a **Session Orchestrator** that coordinates specialized agents. Each agent has a defined responsibility, access scope, and communication protocol.

### Agent Definitions

#### 1. Session Orchestrator

**Responsibility:** Manages the flow of the viva session. Decides which agent asks the next question, manages time, handles transitions.

**Inputs:** Session configuration, time remaining, conversation history, rubric weights
**Outputs:** Next agent selection, session flow commands (start, pause, wrap-up)

**Behavior:**
- Opens session with introductory question (broad → specific)
- Allocates time per rubric category proportional to weight
- Detects when a topic is exhausted and transitions
- Triggers wrap-up sequence at 80% time elapsed
- Produces session completion signal

#### 2. Chief Examiner Agent

**Responsibility:** Asks high-level questions about the thesis as a whole — research questions, contribution, significance, originality.

**Example questions:**
- "Can you summarize the central contribution of your thesis in two sentences?"
- "How does your work advance the state of the art beyond [cited paper]?"
- "If you could redo this research, what would you change?"

**Access:** Full document, abstract, conclusion, introduction chunks

#### 3. Methodology Examiner Agent

**Responsibility:** Examines research design, data collection, sampling, procedures, ethical considerations.

**Example questions:**
- "Why did you choose [method X] over [method Y] for this study?"
- "How did you ensure the validity of your data collection instrument?"
- "Walk me through your ethical approval process."

**Access:** Methodology chapter chunks, ethics section, research design sections

#### 4. Statistics & Analysis Examiner Agent

**Responsibility:** Examines data analysis choices, statistical tests, results interpretation, limitations.

**Example questions:**
- "Your sample size was N=47. How did you determine this was sufficient?"
- "You used a Bonferroni correction here. What would happen if you hadn't?"
- "The p-value for hypothesis 3 was 0.048. How confident are you in this result?"

**Access:** Results chapter, methodology (analysis subsection), tables, figures

#### 5. Literature Review Examiner Agent

**Responsibility:** Tests understanding of the field, theoretical framework, positioning of work within existing research.

**Example questions:**
- "You cite [Author, Year] as foundational. What specifically do you build upon?"
- "Are you aware of [related work]? How does it relate to your findings?"
- "Your theoretical framework draws on [theory]. What are its limitations?"

**Access:** Literature review chapter, references, theoretical framework sections

#### 6. Follow-up Agent

**Responsibility:** Generates probing follow-up questions when student answers are vague, incomplete, or incorrect.

**Behavior:**
- Detects vague answers: "Can you be more specific about...?"
- Detects incomplete answers: "You mentioned X but not Y. Can you address...?"
- Detects incorrect claims: "Actually, your thesis states [quote]. Can you reconcile...?"
- Detects strong answers: "Good. Let's go deeper — what about...?"

**Access:** Current conversation context, relevant document chunks

#### 7. Assessment Agent

**Responsibility:** Scores each student response against the rubric in real-time. Does not interact with the student directly.

**Outputs per response:**
```json
{
  "rubric_category": "methodology",
  "score": 72,
  "level": "good",
  "evidence": "Student correctly identified the limitation but didn't propose mitigation",
  "rubric_descriptor_matched": "Demonstrates understanding of methodological choices with minor gaps"
}
```

#### 8. Feedback Agent

**Responsibility:** Generates end-of-session feedback. Synthesizes all assessment scores into actionable improvement guidance.

**Outputs:**
- Overall readiness score
- Per-category scores with trend arrows
- Top 3 strengths with evidence
- Top 3 areas for improvement with specific study recommendations
- Recommended focus for next session
- Motivational closing message calibrated to score

### Agent Interaction Protocol

```
Session Start
    → Orchestrator selects Chief Examiner
    → Chief Examiner generates opening question
    → Student responds
    → Assessment Agent scores response (background)
    → Follow-up Agent evaluates if follow-up needed
        → If yes: Follow-up Agent generates follow-up
        → If no: Orchestrator selects next agent based on rubric weights
    → Loop until time expires
    → Orchestrator triggers wrap-up
    → Chief Examiner asks closing question
    → Student responds
    → Assessment Agent produces final scores
    → Feedback Agent generates session summary
Session End
```

### Panel Defense Mode

In Panel Defense mode, 2-3 examiner agents are active simultaneously:

```
Orchestrator assigns roles:
    - Chief Examiner (leads)
    - Methodology Examiner (second examiner)
    - Literature Examiner (third examiner)

Flow:
    Chief asks question → Student responds → 
    Methodology Examiner interjects with related question →
    Student responds → Literature Examiner challenges a claim →
    Student responds → Chief moves to next topic
```

This simulates the real experience of facing multiple examiners with different perspectives.

---

# 8. Viva Simulation Modes

## Mode Definitions

### Quick Practice (5 minutes)

**Purpose:** Daily check-in, warm-up before a longer session, or time-constrained practice.

| Parameter | Value |
|-----------|-------|
| Duration | 5 minutes |
| Questions | 3-4 |
| Agents active | Chief Examiner only |
| Follow-ups | 1 per question max |
| Scope | Random section or student-selected chapter |
| Feedback | Brief: overall score + 1 improvement suggestion |

### Standard Practice (15 minutes)

**Purpose:** Regular practice session covering multiple thesis areas.

| Parameter | Value |
|-----------|-------|
| Duration | 15 minutes |
| Questions | 8-12 |
| Agents active | Chief + 1 specialist (rotated per session) |
| Follow-ups | 2 per question max |
| Scope | Full thesis with emphasis on weak areas |
| Feedback | Detailed: all category scores + 3 improvements |

### Full Defense (45 minutes)

**Purpose:** Realistic full-length viva simulation.

| Parameter | Value |
|-----------|-------|
| Duration | 45 minutes |
| Questions | 20-30 |
| Agents active | Chief + Methodology + Statistics + Literature |
| Follow-ups | Unlimited |
| Scope | Comprehensive thesis coverage |
| Feedback | Full report: scores, transcript annotations, study plan |

### Panel Defense (45 minutes)

**Purpose:** Simulate multi-examiner defense panel.

| Parameter | Value |
|-----------|-------|
| Duration | 45 minutes |
| Questions | 15-25 |
| Agents active | 3 agents as named panel members |
| Interaction | Agents may interrupt or build on each other's questions |
| Follow-ups | Unlimited, may come from any panel member |
| Feedback | Per-examiner scores + aggregate |

### Hostile Examiner Mode

**Purpose:** Prepare for adversarial questioning. Build resilience.

| Parameter | Value |
|-----------|-------|
| Style | Aggressive, interrupting, skeptical |
| Behavior | Challenges every claim, demands evidence, questions assumptions |
| Follow-ups | Persistent, drilling into weak answers |
| Phrases | "That's not convincing." / "Your evidence is thin here." / "How do you respond to the criticism that...?" |
| Feedback | Includes resilience score and "composure under pressure" assessment |

### Friendly Examiner Mode

**Purpose:** Build confidence. Coaching-oriented.

| Parameter | Value |
|-----------|-------|
| Style | Encouraging, guiding, Socratic |
| Behavior | Helps student reach the answer, acknowledges good points, reframes weak answers constructively |
| Follow-ups | Supportive: "You're on the right track. Can you expand on...?" |
| Feedback | Emphasizes strengths, frames improvements as opportunities |

### University-Specific Mode

**Purpose:** Match institutional defense format exactly.

| Parameter | Value |
|-----------|-------|
| Configuration | Set by OrgAdmin |
| Options | Number of examiners, time allocation, opening format, question ordering rules |
| Example | UK PhD: 2 examiners, no audience, 60-90 min, student opens with 10-min presentation |
| Example | Swedish PhD: opponent system, public defense, 2-hour format |
| Example | US capstone: 3-member committee, 30-min presentation + 30-min Q&A |

---

# 9. Voice System

## Architecture

```
Student speaks
    → Browser MediaRecorder API captures audio
    → Audio chunks streamed via WebSocket to backend
    → Backend forwards to STT service
    → Transcribed text sent to AI pipeline
    → AI generates response text
    → Response text sent to TTS service
    → Audio streamed back to student via WebSocket
    → Student hears examiner response
```

## Speech-to-Text (STT)

**Primary:** Deepgram Nova-2
- Real-time streaming transcription
- Latency: < 300ms
- Accuracy: 95%+ for academic English
- Cost: $0.0043/minute

**Fallback:** OpenAI Whisper API
- Batch transcription for session recordings
- Higher accuracy for accented English
- Cost: $0.006/minute

**Configuration:**
- Language: Auto-detect (English, Mandarin, Spanish, French, German, Portuguese, Arabic, Hindi)
- Punctuation: Enabled
- Diarization: Disabled (single speaker)
- Profanity filter: Disabled (academic context)
- Custom vocabulary: Inject thesis-specific terms (extracted during document processing)

## Text-to-Speech (TTS)

**Primary:** ElevenLabs Turbo v2.5
- Streaming output for low latency
- Natural academic voice (selected from voice library)
- Latency: first byte < 500ms
- Cost: $0.18/1K characters

**Fallback:** OpenAI TTS (`tts-1`)
- Lower quality but cheaper for scale
- Cost: $0.015/1K characters

**Voice Configuration:**
- Default: "Professor" voice (authoritative, clear, measured pace)
- Friendly mode: warmer tone, slightly faster
- Hostile mode: sharper tone, more clipped delivery
- Student can select gender preference

## Real-time Conversation Flow

**Turn-taking:**
- Voice Activity Detection (VAD) determines when student has finished speaking
- 1.5-second silence threshold triggers end-of-turn
- Student can press spacebar to signal "I'm done"
- AI waits for full thought before responding (no premature interruption in standard mode)

**Interruption Handling (Panel/Hostile modes):**
- AI may interject after detecting hesitation (3+ seconds of filler words)
- Student can interrupt AI by speaking (AI response pauses)
- Priority: student speech always takes precedence

## Latency Targets

| Metric | Target | Acceptable |
|--------|--------|------------|
| STT processing | < 300ms | < 500ms |
| AI response generation (first token) | < 800ms | < 1500ms |
| TTS first byte | < 500ms | < 800ms |
| **Total turn latency** | **< 2 seconds** | **< 3 seconds** |

## Cost Optimization

| Component | Cost per minute | 45-min session cost |
|-----------|----------------|-------------------|
| STT (Deepgram) | $0.0043 | $0.19 |
| TTS (ElevenLabs) | ~$0.05 (avg 280 chars/response, 15 responses) | ~$0.76 |
| AI inference | ~$0.03 | ~$1.35 |
| **Total voice session** | | **~$2.30** |
| Text-only session equivalent | | ~$0.45 |

---

# 10. Feedback Engine

## Scoring Framework

### Category Definitions and Weights

| Category | Weight | Description |
|----------|--------|-------------|
| Knowledge Depth | 25% | Understanding of core concepts, theories, and findings in the thesis |
| Methodology Rigor | 20% | Ability to justify and defend research design, methods, and procedures |
| Analytical Thinking | 20% | Quality of reasoning about data, results, and their implications |
| Communication Clarity | 15% | Ability to articulate ideas clearly, concisely, and at appropriate depth |
| Critical Self-Assessment | 10% | Awareness of limitations, alternative interpretations, and future work |
| Research Positioning | 10% | Understanding of how the work fits within the broader field |

### Scoring Formula

**Per-response score:**

```
response_score = Σ(criterion_weight × criterion_score) / Σ(criterion_weight)

where criterion_score ∈ {0, 25, 50, 75, 100}
    0   = No answer or completely incorrect
    25  = Attempted but fundamentally flawed
    50  = Partially correct with significant gaps
    75  = Good answer with minor gaps
    100 = Excellent, comprehensive answer
```

**Per-category session score:**

```
category_score = Σ(response_score_i × difficulty_weight_i) / Σ(difficulty_weight_i)

where difficulty_weight:
    foundational = 0.8
    intermediate = 1.0
    advanced     = 1.3
    adversarial  = 1.5
```

**Overall session score:**

```
session_score = Σ(category_weight × category_score) / Σ(category_weight)
```

**Confidence Score (special):**

```
confidence_score = 0.4 × response_latency_score 
                 + 0.3 × filler_word_score 
                 + 0.2 × answer_completeness_score 
                 + 0.1 × self_correction_score

where:
    response_latency_score: 100 if < 3s, linear decay to 0 at 15s
    filler_word_score: 100 if < 2 fillers/response, linear decay
    answer_completeness_score: from Assessment Agent
    self_correction_score: positive signal for thoughtful self-correction
```

### Readiness Classification

| Score Range | Classification | Recommendation |
|-------------|---------------|----------------|
| 85-100 | Highly Ready | "You're well prepared. Focus on edge cases." |
| 70-84 | Ready | "Solid foundation. Practice weak areas once more." |
| 55-69 | Approaching Ready | "Good progress. 3-5 more sessions recommended." |
| 40-54 | Needs Improvement | "Significant gaps remain. Focus on [specific areas]." |
| 0-39 | Not Ready | "Substantial preparation needed. Review [sections] and practice daily." |

---

# 11. Analytics

## Student Dashboard

### Components
- **Readiness Gauge:** Large circular gauge showing overall readiness score (0-100)
- **Score Trend Chart:** Line chart showing session scores over time
- **Category Radar:** Radar chart showing per-category scores
- **Session History:** Table of past sessions with scores, duration, mode
- **Weak Areas Panel:** Ordered list of thesis sections needing most work
- **Upcoming Defense Countdown:** Days remaining with preparation milestone tracker
- **Practice Streak:** Gamification element showing consecutive practice days

## Supervisor Dashboard

### Components
- **Student Roster:** Table of supervised students with latest readiness scores
- **At-Risk Alerts:** Students with declining scores or no recent sessions
- **Readiness Heatmap:** Visual grid of students × categories, color-coded by score
- **Session Activity:** Timeline of student practice activity
- **Question Bank:** AI-generated questions for each student's thesis
- **Export Controls:** Generate PDF readiness reports per student

## Department Dashboard

### Components
- **Cohort Overview:** Aggregate readiness distribution (histogram)
- **Supervisor Comparison:** Average student readiness per supervisor (anonymized or named, configurable)
- **Defense Outcome Correlation:** (Post-launch) Predicted vs. actual outcomes
- **Monthly Active Usage:** Students practicing, sessions conducted, average scores
- **Re-examination Rate Tracking:** Department-level trend over semesters
- **Rubric Compliance:** Percentage of students assessed against official rubric

## University Dashboard

### Components
- **Cross-department Comparison:** Readiness scores by department
- **License Utilization:** Seats used vs. purchased per department
- **ROI Metrics:** Re-examination rate reduction, student satisfaction scores
- **Engagement Trends:** Monthly/weekly active users, session frequency
- **International Student Analytics:** Performance segmented by student origin (for support targeting)

## Platform Admin Dashboard

### Components
- **Revenue Metrics:** MRR, ARR, churn, ARPU, LTV
- **Usage Metrics:** DAU, MAU, sessions/day, documents processed/day
- **AI Costs:** Per-session cost trend, model usage breakdown
- **Infrastructure:** API latency p50/p95/p99, error rates, queue depths
- **Organization Health:** Per-org usage, contract renewal dates, NPS

---

# 12. Database Design

## Multi-tenancy Strategy

**Approach:** Shared database, shared schema, row-level isolation.

Every table containing tenant-specific data includes an `organization_id` column. Row-Level Security (RLS) policies in PostgreSQL enforce isolation at the database level.

```sql
-- Enable RLS on all tenant tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy: users can only see rows from their organization
CREATE POLICY org_isolation ON projects
    USING (organization_id = current_setting('app.current_org_id')::uuid);
```

## Core Tables

### Organizations & Users

```sql
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    plan_type VARCHAR(50) NOT NULL DEFAULT 'free',
    settings JSONB DEFAULT '{}',
    data_residency VARCHAR(10) DEFAULT 'us',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_departments_org ON departments(organization_id);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    role VARCHAR(50) NOT NULL DEFAULT 'student',
    organization_id UUID REFERENCES organizations(id),
    department_id UUID REFERENCES departments(id),
    program VARCHAR(255),
    defense_date DATE,
    auth_provider VARCHAR(50) DEFAULT 'email',
    auth_provider_id VARCHAR(255),
    email_verified BOOLEAN DEFAULT FALSE,
    mfa_enabled BOOLEAN DEFAULT FALSE,
    mfa_secret VARCHAR(255),
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_users_org ON users(organization_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_dept ON users(department_id);

CREATE TABLE user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id),
    role VARCHAR(50) NOT NULL,
    granted_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, organization_id, role)
);
```

### Research Projects & Documents

```sql
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    organization_id UUID REFERENCES organizations(id),
    title VARCHAR(500) NOT NULL,
    description TEXT,
    project_type VARCHAR(50) NOT NULL, -- thesis, dissertation, capstone, paper
    academic_level VARCHAR(50), -- undergraduate, masters, phd
    field_of_study VARCHAR(255),
    status VARCHAR(50) DEFAULT 'processing',
    processing_completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_projects_user ON projects(user_id);
CREATE INDEX idx_projects_org ON projects(organization_id);

CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL, -- primary, rubric, slides, supervisor_notes
    file_name VARCHAR(500) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    storage_key TEXT NOT NULL, -- S3 key
    page_count INT,
    word_count INT,
    processing_status VARCHAR(50) DEFAULT 'pending',
    structure_metadata JSONB, -- detected chapters, sections
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_documents_project ON documents(project_id);

CREATE TABLE document_chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    project_id UUID NOT NULL REFERENCES projects(id),
    organization_id UUID REFERENCES organizations(id),
    chunk_index INT NOT NULL,
    content TEXT NOT NULL,
    chapter VARCHAR(255),
    section VARCHAR(255),
    page_start INT,
    page_end INT,
    heading_hierarchy JSONB,
    token_count INT,
    embedding vector(1024), -- pgvector
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_chunks_project ON document_chunks(project_id);
CREATE INDEX idx_chunks_doc ON document_chunks(document_id);
CREATE INDEX idx_chunks_embedding ON document_chunks 
    USING hnsw (embedding vector_cosine_ops) WITH (m = 16, ef_construction = 64);
```

### Rubrics

```sql
CREATE TABLE rubrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id),
    created_by UUID NOT NULL REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_template BOOLEAN DEFAULT FALSE,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE rubric_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rubric_id UUID NOT NULL REFERENCES rubrics(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    weight DECIMAL(5,2) NOT NULL,
    sort_order INT NOT NULL
);

CREATE TABLE rubric_levels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES rubric_categories(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL, -- excellent, good, satisfactory, unsatisfactory
    score INT NOT NULL, -- 100, 75, 50, 25
    descriptor TEXT NOT NULL,
    sort_order INT NOT NULL
);
```

### Viva Sessions

```sql
CREATE TABLE viva_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id),
    user_id UUID NOT NULL REFERENCES users(id),
    organization_id UUID REFERENCES organizations(id),
    rubric_id UUID REFERENCES rubrics(id),
    mode VARCHAR(50) NOT NULL, -- quick, standard, full, panel
    style VARCHAR(50) NOT NULL, -- friendly, balanced, hostile
    interface_type VARCHAR(50) NOT NULL, -- text, voice, video
    focus_area VARCHAR(255), -- full, specific chapter name
    duration_planned_seconds INT NOT NULL,
    duration_actual_seconds INT,
    status VARCHAR(50) DEFAULT 'active', -- active, paused, completed, abandoned
    overall_score DECIMAL(5,2),
    readiness_level VARCHAR(50),
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_sessions_user ON viva_sessions(user_id);
CREATE INDEX idx_sessions_project ON viva_sessions(project_id);
CREATE INDEX idx_sessions_org ON viva_sessions(organization_id);
CREATE INDEX idx_sessions_status ON viva_sessions(status);

CREATE TABLE session_turns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES viva_sessions(id) ON DELETE CASCADE,
    turn_index INT NOT NULL,
    role VARCHAR(20) NOT NULL, -- examiner, student
    agent_type VARCHAR(50), -- chief, methodology, statistics, literature, followup
    content TEXT NOT NULL,
    audio_url TEXT,
    source_chunk_ids UUID[],
    page_references INT[],
    duration_seconds DECIMAL(6,2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_turns_session ON session_turns(session_id);

CREATE TABLE session_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES viva_sessions(id) ON DELETE CASCADE,
    turn_id UUID REFERENCES session_turns(id),
    rubric_category_id UUID REFERENCES rubric_categories(id),
    category_name VARCHAR(255) NOT NULL,
    score DECIMAL(5,2) NOT NULL,
    level VARCHAR(50),
    evidence TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_scores_session ON session_scores(session_id);

CREATE TABLE session_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES viva_sessions(id) ON DELETE CASCADE,
    overall_score DECIMAL(5,2) NOT NULL,
    readiness_level VARCHAR(50) NOT NULL,
    strengths JSONB NOT NULL, -- [{area, evidence, score}]
    improvements JSONB NOT NULL, -- [{area, suggestion, thesis_sections}]
    study_recommendations JSONB,
    confidence_score DECIMAL(5,2),
    next_session_focus VARCHAR(255),
    summary TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Subscriptions & Billing

```sql
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    organization_id UUID REFERENCES organizations(id),
    stripe_subscription_id VARCHAR(255) UNIQUE,
    stripe_customer_id VARCHAR(255),
    plan_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL, -- active, canceled, past_due, trialing
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    seats_purchased INT DEFAULT 1,
    seats_used INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE usage_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    organization_id UUID REFERENCES organizations(id),
    record_type VARCHAR(50) NOT NULL, -- session, document_processing, voice_minutes
    quantity DECIMAL(10,2) NOT NULL,
    billing_period_start DATE NOT NULL,
    billing_period_end DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_usage_user_period ON usage_records(user_id, billing_period_start);
```

### Audit & Notifications

```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    organization_id UUID REFERENCES organizations(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    resource_id UUID,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_audit_org ON audit_logs(organization_id, created_at DESC);
CREATE INDEX idx_audit_user ON audit_logs(user_id, created_at DESC);

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT,
    data JSONB,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_notifications_user ON notifications(user_id, read_at);
```

---

# 13. API Design

## Base URL

```
Production: https://api.vivabot.ai/v1
Staging:    https://api.staging.vivabot.ai/v1
```

## Authentication

All endpoints require `Authorization: Bearer <jwt_token>` unless marked as public.

## Core Endpoints

### Authentication

```
POST   /auth/register
POST   /auth/login
POST   /auth/refresh
POST   /auth/forgot-password
POST   /auth/reset-password
POST   /auth/verify-email
GET    /auth/google
GET    /auth/google/callback
GET    /auth/microsoft
GET    /auth/microsoft/callback
POST   /auth/sso/saml
DELETE /auth/logout
```

**Example: Register**

```http
POST /v1/auth/register
Content-Type: application/json

{
  "email": "amara@university.ac.uk",
  "password": "SecurePass123!",
  "full_name": "Amara Obi",
  "role": "student",
  "program": "PhD Computer Science",
  "defense_date": "2026-08-15"
}
```

```json
// 201 Created
{
  "user": {
    "id": "usr_01H8...",
    "email": "amara@university.ac.uk",
    "full_name": "Amara Obi",
    "role": "student",
    "email_verified": false,
    "created_at": "2026-06-15T10:00:00Z"
  },
  "token": {
    "access_token": "eyJ...",
    "refresh_token": "eyJ...",
    "expires_in": 900
  }
}
```

### Projects

```
POST   /projects                    — Create project
GET    /projects                    — List user's projects
GET    /projects/:id                — Get project details
PATCH  /projects/:id                — Update project
DELETE /projects/:id                — Delete project
POST   /projects/:id/documents      — Upload document
GET    /projects/:id/documents      — List project documents
GET    /projects/:id/status         — Processing status
GET    /projects/:id/structure      — Detected document structure
GET    /projects/:id/question-bank  — Generated question bank
```

**Example: Upload Document**

```http
POST /v1/projects/prj_01H8.../documents
Content-Type: multipart/form-data

file: thesis.pdf
document_type: primary
```

```json
// 202 Accepted
{
  "document": {
    "id": "doc_01H9...",
    "file_name": "thesis.pdf",
    "file_size_bytes": 2145678,
    "mime_type": "application/pdf",
    "processing_status": "queued",
    "estimated_processing_seconds": 90
  }
}
```

### Viva Sessions

```
POST   /sessions                — Start new session
GET    /sessions                — List user's sessions
GET    /sessions/:id            — Get session details
PATCH  /sessions/:id            — Update session (pause/resume)
POST   /sessions/:id/end        — End session
GET    /sessions/:id/transcript — Get full transcript
GET    /sessions/:id/feedback   — Get session feedback
GET    /sessions/:id/scores     — Get detailed scores
WS     /sessions/:id/stream     — WebSocket for real-time session
```

**Example: Start Session**

```http
POST /v1/sessions
Content-Type: application/json

{
  "project_id": "prj_01H8...",
  "mode": "standard",
  "style": "balanced",
  "interface_type": "voice",
  "focus_area": "full",
  "rubric_id": "rub_01H7..."
}
```

```json
// 201 Created
{
  "session": {
    "id": "ses_01HA...",
    "status": "active",
    "mode": "standard",
    "duration_planned_seconds": 900,
    "websocket_url": "wss://api.vivabot.ai/v1/sessions/ses_01HA.../stream",
    "started_at": "2026-06-15T14:30:00Z"
  }
}
```

**WebSocket Protocol (Session Stream):**

```json
// Client → Server: Student response
{
  "type": "student_response",
  "content": "My research addresses the gap in federated learning...",
  "audio_base64": "..." // for voice mode
}

// Server → Client: Examiner question
{
  "type": "examiner_question",
  "agent": "methodology",
  "content": "You chose differential privacy with epsilon=1.0. How did you determine that threshold?",
  "audio_url": "https://cdn.vivabot.ai/audio/...",
  "source_pages": [45, 46],
  "turn_index": 5
}

// Server → Client: Score update (real-time)
{
  "type": "score_update",
  "category": "methodology",
  "score": 78,
  "level": "good"
}

// Server → Client: Session end
{
  "type": "session_complete",
  "overall_score": 72,
  "readiness_level": "ready",
  "feedback_url": "/v1/sessions/ses_01HA.../feedback"
}
```

### Rubrics

```
POST   /rubrics             — Create rubric
GET    /rubrics              — List rubrics
GET    /rubrics/:id          — Get rubric details
PATCH  /rubrics/:id          — Update rubric
DELETE /rubrics/:id          — Delete rubric
GET    /rubrics/templates    — List institutional templates
POST   /rubrics/:id/clone    — Clone rubric
```

### Analytics

```
GET    /analytics/student/summary        — Student performance summary
GET    /analytics/student/trends         — Score trends over time
GET    /analytics/student/weak-areas     — Identified weak areas
GET    /analytics/supervisor/students    — Supervisor's students overview
GET    /analytics/department/overview    — Department aggregate
GET    /analytics/organization/overview  — Organization-wide metrics
```

**Example: Student Summary**

```http
GET /v1/analytics/student/summary
Authorization: Bearer eyJ...
```

```json
{
  "readiness": {
    "overall_score": 72,
    "level": "ready",
    "trend": "improving",
    "trend_delta": +8
  },
  "sessions": {
    "total": 12,
    "this_week": 3,
    "total_minutes": 245,
    "streak_days": 5
  },
  "categories": [
    {"name": "Knowledge Depth", "score": 81, "trend": "stable"},
    {"name": "Methodology Rigor", "score": 65, "trend": "improving"},
    {"name": "Analytical Thinking", "score": 74, "trend": "improving"},
    {"name": "Communication", "score": 78, "trend": "stable"},
    {"name": "Critical Self-Assessment", "score": 58, "trend": "declining"},
    {"name": "Research Positioning", "score": 70, "trend": "improving"}
  ],
  "weak_areas": [
    {
      "area": "Statistical justification",
      "thesis_sections": ["Chapter 4: Methodology, Section 4.3"],
      "pages": [42, 43, 44],
      "recommendation": "Review your sample size justification and power analysis"
    }
  ],
  "defense_countdown_days": 24
}
```

### Organization Management

```
POST   /organizations                    — Create organization
GET    /organizations/:id                — Get organization
PATCH  /organizations/:id                — Update organization settings
GET    /organizations/:id/departments    — List departments
POST   /organizations/:id/departments    — Create department
GET    /organizations/:id/members        — List members
POST   /organizations/:id/invite         — Invite member
PATCH  /organizations/:id/members/:uid   — Update member role
```

---

# 14. Frontend Design

## Design System: Hydrogen

Inspired by the clean, card-based layouts observed in Strut and VEED.IO, with the conversational patterns from Gemini. The design system is called **Hydrogen** — light, minimal, fast.

### Design Tokens

```css
/* Colors */
--h-brand-primary: #4F46E5;     /* Indigo-600: primary actions */
--h-brand-secondary: #7C3AED;   /* Violet-600: AI/examiner elements */
--h-brand-accent: #F59E0B;      /* Amber-500: scores, progress */
--h-surface-primary: #FFFFFF;
--h-surface-secondary: #F9FAFB;
--h-surface-elevated: #FFFFFF;
--h-border: #E5E7EB;
--h-text-primary: #111827;
--h-text-secondary: #6B7280;
--h-text-inverse: #FFFFFF;
--h-success: #10B981;
--h-warning: #F59E0B;
--h-error: #EF4444;
--h-info: #3B82F6;

/* Score colors */
--h-score-excellent: #10B981;   /* Green: 85-100 */
--h-score-good: #3B82F6;        /* Blue: 70-84 */
--h-score-approaching: #F59E0B; /* Amber: 55-69 */
--h-score-needs-work: #EF4444;  /* Red: 0-54 */

/* Typography */
--h-font-sans: 'Inter', system-ui, sans-serif;
--h-font-mono: 'JetBrains Mono', monospace;

/* Spacing scale */
--h-space-1: 4px;
--h-space-2: 8px;
--h-space-3: 12px;
--h-space-4: 16px;
--h-space-6: 24px;
--h-space-8: 32px;

/* Radius */
--h-radius-sm: 6px;
--h-radius-md: 8px;
--h-radius-lg: 12px;
--h-radius-xl: 16px;

/* Shadows */
--h-shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--h-shadow-md: 0 4px 6px rgba(0,0,0,0.07);
--h-shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
```

## Page Definitions

### Student Portal

#### Page: Dashboard (`/dashboard`)

**Purpose:** Central hub showing readiness status, recent activity, and quick actions.

**Components:**
- `ReadinessGauge` — Circular progress showing overall score with classification label
- `DefenseCountdown` — Days until defense with milestone markers
- `CategoryRadar` — 6-axis radar chart of category scores
- `RecentSessions` — Card list of last 5 sessions with scores and mode
- `QuickActions` — "Start Practice", "View Question Bank", "Review Feedback" buttons
- `WeakAreasPanel` — Sorted list of areas needing attention with "Practice This" CTA
- `StreakTracker` — Practice streak visualization

**States:**
- Loading: Skeleton screens
- Empty: No sessions yet → prominent "Start Your First Practice" CTA
- Active: Full dashboard with data
- Pre-defense (< 7 days): Highlighted countdown, motivational messaging

#### Page: Project Workspace (`/projects/:id`)

**Purpose:** Manage uploaded documents, view detected structure, access question bank.

**Components:**
- `DocumentList` — Uploaded files with processing status badges
- `UploadDropzone` — Drag-and-drop file upload area
- `StructureViewer` — Expandable tree of detected chapters/sections
- `QuestionBank` — Generated questions grouped by category, exportable
- `ProcessingProgress` — Step-by-step progress indicator during document processing

**States:**
- Uploading: Progress bar
- Processing: Animated steps (Extracting → Analyzing → Embedding → Ready)
- Ready: Full workspace
- Error: Processing failed with retry option

#### Page: Viva Session (`/sessions/:id`)

**Purpose:** The core experience. Real-time viva examination interface.

**Components (Text Mode):**
- `ExaminerPanel` — Left side: AI examiner messages with agent avatar and type badge
- `StudentInput` — Bottom: text area with send button, word count
- `SessionTimer` — Top: countdown timer with mode indicator
- `LiveScoreBar` — Right sidebar: real-time category score bars (optional, can hide)
- `SourceReferences` — Expandable panel showing thesis pages referenced in questions
- `SessionControls` — Pause, end session, toggle score visibility

**Components (Voice Mode):**
- `VoiceWaveform` — Central: animated waveform showing speaking/listening state
- `ExaminerAvatar` — AI examiner visual with speaking animation
- `TranscriptFeed` — Scrolling transcript of the conversation
- `VoiceControls` — Mute, end turn (spacebar), pause, end session
- `SessionTimer` — Persistent countdown

**States:**
- Connecting: "Preparing your examiner..."
- Active: Real-time conversation
- Thinking: AI processing indicator (subtle, not blocking)
- Paused: Timer paused, "Resume" button
- Wrapping up: Final question indicator
- Complete: Transition to feedback view

#### Page: Session Feedback (`/sessions/:id/feedback`)

**Purpose:** Post-session performance review.

**Components:**
- `OverallScoreBanner` — Large score with readiness classification and comparison to previous
- `CategoryBreakdown` — Score cards per category with trend arrows
- `StrengthsList` — Top 3 strengths with evidence quotes from session
- `ImprovementsList` — Top 3 areas to improve with study recommendations
- `AnnotatedTranscript` — Full transcript with inline score annotations and examiner notes
- `NextStepsPanel` — Recommended focus for next session, suggested mode/style
- `ShareButton` — Share report with supervisor (generates link)

#### Page: Analytics (`/analytics`)

**Purpose:** Long-term progress tracking across all sessions.

**Components:**
- `ScoreTrendChart` — Line chart: overall score over time, with session markers
- `CategoryTrendCharts` — Small multiples: one line chart per category
- `SessionCalendar` — GitHub-style contribution grid showing practice days
- `ProgressMilestones` — Timeline of achieved readiness milestones
- `ComparisonPanel` — (Optional) Compare against anonymized cohort average

### Examiner Portal

#### Page: Students Overview (`/supervisor/students`)

**Components:**
- `StudentTable` — Sortable/filterable table: name, program, defense date, readiness score, last session, sessions count
- `ReadinessHeatmap` — Grid: students × categories, color-coded cells
- `AtRiskAlerts` — Prominent cards for students with declining scores or inactivity
- `BulkActions` — Export reports, send reminders

#### Page: Student Detail (`/supervisor/students/:id`)

**Components:**
- `StudentProfile` — Name, program, defense date, supervisor notes
- `ReadinessDashboard` — Mirror of student's dashboard (read-only)
- `SessionHistory` — Detailed session list with expandable transcripts
- `QuestionBankView` — AI-generated questions for this student's thesis
- `ReportExport` — Generate PDF readiness report

#### Page: Rubric Manager (`/supervisor/rubrics`)

**Components:**
- `RubricList` — Table of created and assigned rubrics
- `RubricEditor` — Form: categories, weights, levels, descriptors
- `TemplateLibrary` — Browse and clone institutional templates
- `AssignmentPanel` — Assign rubric to courses/students

### University Portal

#### Page: Organization Dashboard (`/admin/dashboard`)

**Components:**
- `UsageSummary` — Cards: total users, active students, sessions this month, avg readiness
- `DepartmentComparison` — Bar chart: avg readiness per department
- `LicenseUtilization` — Progress bars: seats used/purchased per department
- `ActivityTimeline` — Recent activity across organization
- `ReExamRateTracker` — Trend line showing re-examination rate over time

#### Page: Department Management (`/admin/departments`)

**Components:**
- `DepartmentList` — Table with member count, head, avg readiness
- `DepartmentForm` — Create/edit department
- `MemberManager` — Add/remove members, assign roles

#### Page: Settings (`/admin/settings`)

**Components:**
- `BrandingEditor` — Logo, colors, display name
- `SSOConfiguration` — SAML/OIDC setup
- `FeatureToggles` — Enable/disable features per role
- `DefenseFormatEditor` — Configure custom viva formats
- `DataPrivacySettings` — Retention policies, data residency

---

# 15. UX Design

## Information Architecture

```
VivaBot
├── Public Pages
│   ├── Landing Page
│   ├── Pricing
│   ├── About
│   └── Auth (Login/Register)
│
├── Student Portal
│   ├── Dashboard
│   ├── Projects
│   │   ├── Project List
│   │   └── Project Detail (Documents, Structure, Questions)
│   ├── Sessions
│   │   ├── New Session (Configuration)
│   │   ├── Active Session (Text/Voice/Video)
│   │   └── Session Feedback
│   ├── Analytics
│   ├── Question Bank
│   ├── Settings (Profile, Subscription, Notifications)
│   └── Help
│
├── Supervisor Portal
│   ├── Students
│   │   ├── Student List
│   │   └── Student Detail
│   ├── Rubrics
│   │   ├── Rubric List
│   │   └── Rubric Editor
│   ├── Reports
│   └── Settings
│
├── University Portal
│   ├── Dashboard
│   ├── Departments
│   ├── Members
│   ├── Analytics
│   ├── Rubric Templates
│   ├── Billing
│   └── Settings
│
└── Platform Admin
    ├── Organizations
    ├── Users
    ├── Revenue
    ├── Usage
    ├── System Health
    └── Feature Flags
```

## Navigation Structure

**Student (Primary Nav — Left Sidebar, collapsible):**
- Dashboard (home icon)
- Projects (folder icon)
- Sessions (play icon)
- Analytics (chart icon)
- Question Bank (list icon)
- Settings (gear icon)

**Top Bar (persistent):**
- VivaBot logo
- Search (Cmd+K)
- Notifications bell
- Defense countdown badge
- User avatar → dropdown (profile, settings, billing, logout)

## Mobile UX

**Breakpoint strategy:**
- Mobile: < 768px (single column, bottom nav)
- Tablet: 768px - 1024px (collapsible sidebar)
- Desktop: > 1024px (persistent sidebar)

**Mobile-specific decisions:**
- Viva sessions are voice-first on mobile (text input is secondary)
- Dashboard collapses to vertical stack: readiness gauge → weak areas → recent sessions
- Sidebar becomes bottom tab bar: Dashboard, Projects, Practice, Analytics, Profile
- Session feedback uses swipeable cards instead of side-by-side layout

## Accessibility Requirements

| Requirement | Standard | Implementation |
|------------|----------|----------------|
| Screen reader support | WCAG 2.1 AA | Semantic HTML, ARIA labels, live regions for session updates |
| Keyboard navigation | WCAG 2.1 AA | Full tab navigation, focus trapping in modals, skip links |
| Color contrast | WCAG 2.1 AA | 4.5:1 minimum for text, 3:1 for large text/graphics |
| Text scaling | WCAG 2.1 AA | All text in rem units, layout stable up to 200% zoom |
| Motion sensitivity | WCAG 2.1 AA | Respect `prefers-reduced-motion`, disable animations |
| Voice mode alternative | Inclusive | Full text-mode fallback for users who cannot use voice |
| Score communication | Inclusive | Scores announced with context, not just numbers. Color is never the only indicator |
| Session timeout | Inclusive | Warning before session timeout, extend option |

---

# 16. Security

## Role-Based Access Control (RBAC)

### Role Hierarchy

```
PlatformAdmin
    └── OrgAdmin
        └── DeptHead
            └── Supervisor / Examiner
                └── Student
```

### Permission Matrix

| Resource | Student | Supervisor | Examiner | DeptHead | OrgAdmin | PlatformAdmin |
|----------|---------|-----------|----------|----------|----------|--------------|
| Own projects | CRUD | - | - | - | - | R |
| Own sessions | CRU | - | - | - | - | R |
| Supervised student data | - | R | - | R | R | R |
| Student session transcripts | Own | Supervised | Assigned | Dept | Org | All |
| Rubrics (own) | - | CRUD | CRUD | CRUD | CRUD | CRUD |
| Rubric templates | R | R | R | CRUD | CRUD | CRUD |
| Department analytics | - | - | - | R | R | R |
| Org analytics | - | - | - | - | R | R |
| Organization settings | - | - | - | - | RU | CRUD |
| User management | - | - | - | - | CRU | CRUD |
| Billing | Own | - | - | - | Org | All |

## Encryption

| Data State | Method | Details |
|-----------|--------|---------|
| In transit | TLS 1.3 | All connections, no fallback to TLS 1.2 |
| At rest (database) | AES-256 | AWS RDS encryption, automatic key rotation |
| At rest (files in S3) | AES-256 | SSE-S3 with AWS KMS managed keys |
| At rest (sensitive fields) | AES-256-GCM | Application-level encryption for PII fields |
| Passwords | bcrypt | Cost factor 12, automatic upgrade on login |
| JWT tokens | RS256 | RSA key pair, rotated quarterly |

## Data Privacy

### GDPR Compliance

| Requirement | Implementation |
|-------------|---------------|
| Right to access | Data export API: `/users/me/export` generates full data package |
| Right to erasure | Account deletion triggers cascade: anonymize sessions, delete documents, purge embeddings |
| Right to portability | Export in JSON and PDF formats |
| Data minimization | Only collect data necessary for service; no tracking beyond product analytics |
| Consent management | Explicit consent for: document processing, AI analysis, voice recording |
| Data Processing Agreement | Standard DPA available for institutional contracts |
| Data residency | EU, US, APAC options; enforced at infrastructure level |
| Breach notification | Automated detection → 72-hour notification pipeline |

### FERPA Compliance

| Requirement | Implementation |
|-------------|---------------|
| Education records protection | Student data accessible only to student and authorized institutional users |
| Directory information | Configurable per institution: what constitutes directory info |
| Parental access | Not applicable (higher education = student consent only) |
| Institutional access | Scoped to organization, role-based, audited |
| Third-party disclosure | No student data shared with third parties without consent |

## Audit Trail

Every data access and modification is logged:

```json
{
  "timestamp": "2026-06-15T14:32:01Z",
  "user_id": "usr_01H8...",
  "organization_id": "org_01H5...",
  "action": "session.create",
  "resource_type": "viva_session",
  "resource_id": "ses_01HA...",
  "ip_address": "86.12.34.56",
  "user_agent": "Mozilla/5.0...",
  "details": {
    "mode": "standard",
    "project_id": "prj_01H8..."
  }
}
```

Audit logs are:
- Immutable (append-only table, no UPDATE/DELETE permissions)
- Retained for 7 years
- Searchable by admin via dedicated interface
- Exportable for compliance audits

## Secure File Storage

- Documents uploaded to S3 with server-side encryption
- Pre-signed URLs for download (15-minute expiry)
- No public bucket access
- Malware scanning on upload (ClamAV)
- File type validation (magic bytes, not just extension)
- Maximum file size enforced at API gateway and application level

---

# 17. Infrastructure

## Technology Stack

| Layer | Technology | Justification |
|-------|-----------|---------------|
| Frontend | Next.js 15 (App Router) | SSR for SEO, RSC for performance, mature ecosystem |
| Backend | NestJS 10 | TypeScript, modular architecture, good for enterprise |
| Database | PostgreSQL 16 + PgVector | Battle-tested, vector search without separate DB |
| Cache | Redis 7 (Valkey) | Session cache, rate limiting, real-time pub/sub |
| Object Storage | AWS S3 | Document storage, audio recordings |
| Search | PostgreSQL FTS + PgVector | Hybrid search without ElasticSearch complexity |
| Queue | BullMQ (Redis-backed) | Document processing jobs, async AI tasks |
| WebSocket | Socket.IO on NestJS | Real-time viva sessions |
| AI Gateway | Custom routing layer | Multi-model: Claude, GPT, Deepgram, ElevenLabs |
| Monitoring | Prometheus + Grafana | Metrics collection and dashboarding |
| Tracing | OpenTelemetry + Jaeger | Distributed tracing across services |
| Logging | Pino → Loki → Grafana | Structured logging with centralized search |
| CI/CD | GitHub Actions | Build, test, deploy pipelines |
| Infrastructure | Terraform + AWS EKS | IaC, Kubernetes for orchestration |
| CDN | CloudFront | Static assets, audio file delivery |

## Kubernetes Architecture

### Namespaces
- `vivabot-prod` — Production workloads
- `vivabot-staging` — Staging environment
- `vivabot-monitoring` — Prometheus, Grafana, Jaeger
- `vivabot-jobs` — Document processing workers

### Deployments

| Service | Replicas (prod) | CPU Request | Memory Request | HPA Target |
|---------|-----------------|-------------|----------------|------------|
| `api-gateway` | 3 | 500m | 512Mi | 70% CPU |
| `auth-service` | 2 | 250m | 256Mi | 70% CPU |
| `session-service` | 4 | 1000m | 1Gi | 60% CPU |
| `document-service` | 2 | 500m | 1Gi | Queue depth |
| `ai-gateway` | 3 | 500m | 512Mi | 70% CPU |
| `analytics-service` | 2 | 500m | 512Mi | 70% CPU |
| `notification-service` | 1 | 250m | 256Mi | — |
| `web-frontend` | 3 | 250m | 256Mi | 70% CPU |
| `worker-document` | 4 | 2000m | 4Gi | Queue depth |
| `worker-embedding` | 2 | 500m | 1Gi | Queue depth |

### Database

- AWS RDS PostgreSQL 16 (Multi-AZ)
- Instance: `db.r6g.xlarge` (4 vCPU, 32 GB RAM) — production
- Storage: gp3, 500 GB, auto-scaling
- Read replicas: 1 (for analytics queries)
- Automated backups: daily, 30-day retention
- PgVector extension enabled

### Redis

- AWS ElastiCache (Redis 7, cluster mode)
- Instance: `cache.r6g.large` (2 vCPU, 13 GB RAM)
- Use cases: session state, rate limiting, BullMQ queues, caching

---

# 18. AI Cost Optimization

## Cost Per Session (Estimated)

### Text-Only Standard Session (15 min, ~10 exchanges)

| Component | Calculation | Cost |
|-----------|------------|------|
| RAG retrieval (10 queries) | 10 × 1K input tokens embedding | $0.001 |
| Question generation (10) | 10 × 2K input + 500 output (Sonnet) | $0.105 |
| Answer evaluation (10) | 10 × 1.5K input + 300 output (Sonnet) | $0.072 |
| Follow-up generation (5) | 5 × 1K input + 200 output (Haiku) | $0.004 |
| Session summary | 1 × 4K input + 1K output (Sonnet) | $0.021 |
| **Total text session** | | **$0.20** |

### Voice Standard Session (15 min)

| Component | Cost |
|-----------|------|
| Text session (above) | $0.20 |
| STT (Deepgram, 7.5 min student speaking) | $0.03 |
| TTS (ElevenLabs, ~2K chars × 10 responses) | $0.76 |
| **Total voice session** | **$0.99** |

### Full Defense Voice Session (45 min)

| Component | Cost |
|-----------|------|
| Text inference (30 exchanges) | $0.55 |
| STT (22.5 min student speaking) | $0.10 |
| TTS (6K chars × 30 responses) | $2.10 |
| **Total full defense** | **$2.75** |

## Optimization Strategies

### 1. Embedding Reuse
- Embeddings are computed once per document version and stored permanently
- Re-uploading the same document (hash match) skips embedding
- Savings: ~$0.02/document, amortized over all sessions

### 2. Question Bank Caching
- Generate 50-question bank per project on first processing
- Sessions draw from pre-generated bank (no real-time generation for standard questions)
- Only follow-up questions require real-time generation
- Savings: ~40% reduction in inference costs per session

### 3. Response Caching
- Cache common evaluation patterns (e.g., "vague answer" detection)
- Cache scoring rubric interpretations per rubric template
- Semantic cache: if student asks similar question to a previous session, reuse evaluation context
- Savings: ~15% reduction in evaluation costs

### 4. Model Tiering
- Use Haiku for: follow-ups, classification, structure detection
- Use Sonnet for: question generation, evaluation, feedback
- Use Opus only for: complex panel interactions (enterprise tier)
- Savings: ~30% vs. using Sonnet for everything

### 5. Hybrid Search Optimization
- BM25 pre-filter reduces vector search space by 60%
- Metadata filtering (chapter, section) further reduces search space
- Result: fewer embedding comparisons, faster retrieval

### 6. TTS Cost Reduction
- Switch to OpenAI TTS for Friendly mode (acceptable quality, 8x cheaper)
- Cache common phrases ("Can you elaborate?", "That's a good point")
- Use shorter TTS responses in Quick Practice mode
- Target blended TTS cost: $0.04/1K chars (vs. $0.18 ElevenLabs only)

### Projected Unit Economics

| Plan | Avg Sessions/Month | Avg Cost/Session | Monthly AI Cost | Subscription Price | Gross Margin |
|------|-------------------|-----------------|----------------|-------------------|-------------|
| Free | 2 (text only) | $0.20 | $0.40 | $0 | -100% |
| Student | 12 (8 text, 4 voice) | $0.52 | $6.24 | $19 | 67% |
| Researcher | 20 (10 text, 10 voice) | $0.60 | $12.00 | $39 | 69% |
| University (per seat) | 8 | $0.45 | $3.60 | $8/seat | 55% |

---

# 19. SaaS Business Model

## Plan Structure

### Free Plan — $0/month

**Purpose:** Acquisition funnel. Let students experience the value.

| Feature | Limit |
|---------|-------|
| Projects | 1 |
| Sessions | 2/month |
| Mode | Quick Practice only (5 min) |
| Interface | Text only |
| Feedback | Basic score only |
| Document size | 50 pages max |
| Question bank | 10 questions |

### Student Plan — $19/month ($15/month annual)

**Purpose:** Individual students preparing for defense. Primary revenue driver.

| Feature | Limit |
|---------|-------|
| Projects | 3 |
| Sessions | Unlimited |
| Modes | Quick, Standard, Full Defense |
| Interface | Text + Voice |
| Feedback | Full detailed feedback |
| Document size | 300 pages |
| Question bank | 50 questions, exportable |
| Rubric upload | Yes |
| Session recordings | 30-day retention |
| Progress analytics | Full |

### Researcher Plan — $39/month ($29/month annual)

**Purpose:** PhD students, postdocs, serious researchers.

| Feature | Limit |
|---------|-------|
| Everything in Student | — |
| Projects | 10 |
| Modes | All including Panel Defense |
| Interface | Text + Voice + Video |
| Hostile Examiner mode | Yes |
| Priority AI processing | Yes (faster response times) |
| Session recordings | Unlimited retention |
| Question bank | 100 questions |
| Share with supervisor | Yes |
| Export reports (PDF) | Yes |

### University Plan — $8/seat/month ($6/seat annual, min 100 seats)

**Purpose:** Institutional deployment for all PGR students.

| Feature | Limit |
|---------|-------|
| Everything in Researcher | — |
| SSO (SAML/OIDC) | Yes |
| Custom rubric templates | Yes |
| Department management | Yes |
| Supervisor dashboards | Yes |
| Aggregate analytics | Yes |
| LMS integration | Moodle, Canvas, Blackboard |
| Custom defense formats | Yes |
| Data residency selection | Yes |
| Dedicated support | Email + chat |
| Onboarding sessions | 2 included |

### Enterprise Plan — Custom pricing

**Purpose:** Large universities, multi-campus deployments, government research bodies.

| Feature | Limit |
|---------|-------|
| Everything in University | — |
| Unlimited seats | Yes |
| Custom AI model fine-tuning | Yes |
| On-premise deployment option | Yes |
| API access | Yes |
| Custom integrations | Yes |
| SLA (99.9% uptime) | Yes |
| Dedicated account manager | Yes |
| Quarterly business reviews | Yes |

### Pricing Rationale

- **$19 Student:** Below the price of a single textbook. Students spend $29-79/month on Chegg, Grammarly, etc. $19 for defense preparation is impulse-affordable. At 4.2M potential users, even 1% penetration at $19 = $800K MRR.
- **$39 Researcher:** PhD students have longer preparation periods (2-4 months), more complex needs, and higher willingness to pay. This tier captures 3x the value while adding features that cost more to deliver (Panel mode, video).
- **$8/seat University:** Competitive with other academic tools (Turnitin: $3-5/student, Grammarly: $12/user). Institutional procurement officers expect per-seat annual pricing. Minimum 100 seats ensures meaningful contract value ($9,600/year).
- **Regional pricing:** 40% discount for students with billing addresses in low-income countries (World Bank classification). Institutions in these countries: 50% discount.

---

# 20. Roadmap

## MVP (Month 1-3)

**Goal:** Validate core value proposition with 500 beta users.

| Feature | Details |
|---------|---------|
| Auth | Email + Google OAuth |
| Upload | PDF thesis upload, text extraction, chunking, embedding |
| Text Viva | Standard mode, balanced style, full thesis focus |
| AI Engine | Single examiner agent (Claude Sonnet), RAG-grounded questions |
| Feedback | Overall score + 3 category scores + basic improvement suggestions |
| Question Bank | 20 auto-generated questions per project |
| Dashboard | Readiness score, session history, basic trend chart |
| Billing | Stripe integration, Free + Student plans |
| Infra | Single Kubernetes cluster (AWS EKS), PostgreSQL + PgVector |

**Key metrics:** User activation rate, session completion rate, return rate.

## V1 (Month 4-6)

**Goal:** Launch publicly. Reach 5,000 paying students.

| Feature | Details |
|---------|---------|
| Voice Viva | Deepgram STT + ElevenLabs TTS, real-time conversation |
| Multi-agent | Chief Examiner + Methodology + Follow-up agents |
| All modes | Quick, Standard, Full Defense |
| Examiner styles | Friendly, Balanced, Hostile |
| Full rubric system | Upload rubric, rubric-aligned scoring |
| DOCX support | Word document processing |
| Session recordings | Audio recording with transcript |
| Enhanced analytics | Category trends, weak area identification, study recommendations |
| Supervisor view | Read-only access to student progress (invite-based) |
| Microsoft OAuth | For university users |
| Mobile responsive | Full mobile support (PWA) |

## V2 (Month 7-12)

**Goal:** Institutional sales. Sign 50 universities.

| Feature | Details |
|---------|---------|
| University portal | Organization management, departments, member management |
| SSO | SAML 2.0 integration |
| LMS integration | Moodle plugin (LTI 1.3) |
| Panel Defense mode | Multiple AI examiners |
| Video Viva | Webcam + AI avatar |
| Custom defense formats | Configurable per institution |
| Supervisor dashboards | Full analytics for supervisors and department heads |
| Rubric templates | Institutional rubric template library |
| PPTX support | Presentation slide processing |
| Bulk user import | CSV import for institutions |
| Advanced analytics | Cohort comparison, department benchmarks |
| Researcher plan | Launch with priority AI |
| Enterprise plan | Custom pricing framework |
| GDPR tools | Data export, deletion, consent management |

## V3 (Month 13-18)

**Goal:** International expansion. 100K users, 200 institutions.

| Feature | Details |
|---------|---------|
| Multi-language | Support for 10 languages (UI + AI examination) |
| Canvas/Blackboard LMS | Additional LMS integrations |
| AI-generated study materials | Based on weak areas, generate targeted study guides |
| Peer practice mode | Two students examine each other, AI moderates |
| Mobile native apps | iOS and Android |
| Outcome tracking | Post-defense outcome data collection, correlation analysis |
| API access | For enterprise integrations |
| On-premise option | Docker-based self-hosted deployment |
| Fine-tuned models | Domain-specific model fine-tuning for large institutions |
| Accessibility audit | WCAG 2.1 AA certification |

## Future Vision (18+ months)

- **VivaBot for Professional Certifications** — Expand to PMP, medical boards, law bar prep
- **AI Conference Presenter** — Practice presenting at conferences, not just defending
- **Research Collaboration Hub** — Connect students working on related topics
- **Publication Readiness** — Assess whether a paper is ready for journal submission
- **Examiner Training** — Help new examiners practice conducting vivas
- **Institutional Quality Assurance** — Benchmarking and standardization tools for national higher education bodies

---

# 21. Investor Section

## Total Addressable Market (TAM)

**Global higher education oral examination preparation: $12.6 billion**

Calculation:
- 4.2M students defending annually × $50 avg. willingness to pay × 12 months preparation period ÷ 2 (not all months active) = ~$1.26B individual market
- 30,000 universities globally × avg. 500 relevant students × $8/seat/month × 12 = $1.44B institutional market
- Professional certification oral prep (medical, legal, engineering): $10B+ market
- **Total TAM: $12.6B+**

## Serviceable Addressable Market (SAM)

**English-speaking higher education: $2.1 billion**

- English-language universities: ~8,000
- Students at these universities defending annually: ~1.5M
- Institutional penetration potential: 15% within 5 years
- Individual student penetration: 10% within 5 years

## Serviceable Obtainable Market (SOM)

**Year 3 target: $42 million ARR**

- 200,000 individual subscribers (blended $15 ARPU) = $36M
- 500 institutional contracts (avg. $12K/year) = $6M
- Total: $42M ARR

## Competitive Landscape

| Competitor | What they do | Why we win |
|-----------|-------------|-----------|
| ChatGPT/Claude (direct) | General AI chatbots | Can't read full thesis, no rubric alignment, no scoring, no voice examination, no institutional features |
| Quizlet | Flashcard-based study | Wrong modality entirely — vivas are oral, not recall-based |
| Grammarly | Writing assistance | Written, not oral; helps write the thesis, not defend it |
| Turnitin | Plagiarism detection | Different problem space; no overlap |
| University mock vivas | Human-conducted practice | Limited to 1-2 sessions; VivaBot is unlimited, available 24/7, scored objectively |
| PrepAI / QuestionPro | Generic question generation | Not thesis-grounded, no oral practice, no scoring |

**No direct competitor exists in AI-powered viva preparation.**

## Defensibility & Moat

### 1. Data Moat
- Every session generates training data: questions, answers, scores, outcomes
- Over time, correlation between VivaBot scores and actual viva outcomes becomes a proprietary dataset
- This data improves question quality, scoring accuracy, and recommendation relevance
- Competitors starting later will have years less data

### 2. Institutional Lock-in
- SSO integration, LMS integration, custom rubrics, department structure
- Migration cost is high once embedded in institutional workflow
- Multi-year contracts with universities create predictable revenue

### 3. Network Effects
- Supervisor adoption drives student adoption (and vice versa)
- Department-level adoption creates social proof for other departments
- University adoption creates case studies for competing institutions

### 4. Domain Expertise
- Academic examination is a niche requiring deep domain understanding
- Rubric design, defense format configuration, examiner persona calibration
- This expertise compounds and is hard to replicate quickly

### 5. Brand Trust
- Students trust VivaBot with unpublished research (IP sensitivity)
- Institutions trust VivaBot with student data (FERPA/GDPR)
- Trust, once established, is a durable competitive advantage

---

# 22. Technical Implementation Plan

## Phase 1: Foundation (Weeks 1-6)

### Features
- Authentication (email, Google OAuth)
- User management (student role)
- Project creation and document upload
- PDF text extraction and chunking
- Embedding generation and vector storage
- Basic text-based viva session (single agent)
- Session scoring (simple formula)
- Basic dashboard

### Architecture
- Monolithic NestJS backend (modules for auth, projects, sessions, ai)
- Next.js frontend with App Router
- PostgreSQL + PgVector on AWS RDS
- Redis on ElastiCache
- S3 for document storage
- Single Kubernetes namespace
- GitHub Actions CI/CD

### Risks
- Document extraction quality varies across PDF types
- AI response quality depends on chunk quality
- Cold start: no training data for scoring calibration

### Deliverables
- Deployed MVP at vivabot.ai
- 50 beta users invited
- Core infrastructure operational

## Phase 2: Voice & Multi-Agent (Weeks 7-12)

### Features
- Voice viva (Deepgram + ElevenLabs)
- Multi-agent system (Chief, Methodology, Follow-up, Assessment)
- Full rubric management
- Enhanced feedback engine (6 categories, formulas)
- DOCX support
- Session modes (Quick, Standard, Full)
- Examiner styles (Friendly, Balanced, Hostile)
- Supervisor invite and read-only access
- Stripe billing integration

### Architecture
- Extract AI service to separate microservice
- WebSocket gateway for real-time sessions
- BullMQ for async document processing and AI tasks
- CDN for audio delivery

### Risks
- Voice latency may exceed targets
- Multi-agent coordination complexity
- Billing integration testing with live payments

### Deliverables
- Public launch (V1)
- Student + Researcher plans live
- 5,000 target users

## Phase 3: Institutional (Weeks 13-24)

### Features
- Organization and department management
- SSO (SAML 2.0)
- University admin portal
- Supervisor dashboards
- Department analytics
- Panel Defense mode
- Custom defense formats
- LMS integration (Moodle LTI)
- Bulk user import
- GDPR compliance tools
- University and Enterprise plans

### Architecture
- Row-level security enforcement for multi-tenancy
- Read replica for analytics queries
- Horizontal scaling for session service (HPA)
- Terraform for infrastructure-as-code

### Risks
- SSO integration complexity varies per IdP
- Multi-tenancy data isolation bugs
- Enterprise sales cycle length (3-6 months)

### Deliverables
- University portal live
- 50 institutional contracts signed
- SOC 2 Type I audit initiated

## Phase 4: Scale & Intelligence (Weeks 25-36)

### Features
- Video viva with AI avatar
- Multi-language support (10 languages)
- Mobile native apps (React Native)
- AI-generated study materials
- Outcome tracking and correlation
- Advanced analytics and benchmarking
- API access for enterprise
- On-premise deployment option

### Architecture
- Global CDN distribution
- Multi-region database (read replicas)
- Model fine-tuning pipeline
- Feature flag system for gradual rollout
- Comprehensive observability stack

### Risks
- Multi-language AI quality varies
- Video viva costs are high
- On-premise support burden

### Deliverables
- 100K users
- 200 institutions
- $42M ARR trajectory

---

# 23. Complete Folder Structure

## Next.js Frontend

```
apps/web/
├── next.config.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── .env.local
├── .env.production
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   └── og-image.png
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   ├── forgot-password/page.tsx
│   │   │   ├── reset-password/page.tsx
│   │   │   └── verify-email/page.tsx
│   │   ├── (student)/
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx
│   │   │   │       ├── documents/page.tsx
│   │   │   │       ├── questions/page.tsx
│   │   │   │       └── structure/page.tsx
│   │   │   ├── sessions/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx
│   │   │   │       ├── active/page.tsx
│   │   │   │       └── feedback/page.tsx
│   │   │   ├── analytics/page.tsx
│   │   │   ├── question-bank/page.tsx
│   │   │   └── settings/
│   │   │       ├── page.tsx
│   │   │       ├── profile/page.tsx
│   │   │       ├── billing/page.tsx
│   │   │       └── notifications/page.tsx
│   │   ├── (supervisor)/
│   │   │   ├── layout.tsx
│   │   │   ├── students/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── rubrics/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   └── reports/page.tsx
│   │   ├── (admin)/
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── departments/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── members/page.tsx
│   │   │   ├── analytics/page.tsx
│   │   │   ├── rubric-templates/page.tsx
│   │   │   ├── billing/page.tsx
│   │   │   └── settings/page.tsx
│   │   ├── (platform)/
│   │   │   ├── layout.tsx
│   │   │   ├── organizations/page.tsx
│   │   │   ├── users/page.tsx
│   │   │   ├── revenue/page.tsx
│   │   │   ├── usage/page.tsx
│   │   │   ├── health/page.tsx
│   │   │   └── feature-flags/page.tsx
│   │   └── api/
│   │       └── webhooks/
│   │           └── stripe/route.ts
│   ├── components/
│   │   ├── ui/                     # Hydrogen design system primitives
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── avatar.tsx
│   │   ├── layout/
│   │   │   ├── sidebar.tsx
│   │   │   ├── topbar.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   └── page-header.tsx
│   │   ├── dashboard/
│   │   │   ├── readiness-gauge.tsx
│   │   │   ├── defense-countdown.tsx
│   │   │   ├── category-radar.tsx
│   │   │   ├── recent-sessions.tsx
│   │   │   ├── weak-areas-panel.tsx
│   │   │   ├── streak-tracker.tsx
│   │   │   └── quick-actions.tsx
│   │   ├── session/
│   │   │   ├── session-config.tsx
│   │   │   ├── text-session.tsx
│   │   │   ├── voice-session.tsx
│   │   │   ├── video-session.tsx
│   │   │   ├── examiner-panel.tsx
│   │   │   ├── student-input.tsx
│   │   │   ├── session-timer.tsx
│   │   │   ├── live-score-bar.tsx
│   │   │   ├── voice-waveform.tsx
│   │   │   ├── voice-controls.tsx
│   │   │   └── transcript-feed.tsx
│   │   ├── feedback/
│   │   │   ├── score-banner.tsx
│   │   │   ├── category-breakdown.tsx
│   │   │   ├── strengths-list.tsx
│   │   │   ├── improvements-list.tsx
│   │   │   ├── annotated-transcript.tsx
│   │   │   └── next-steps.tsx
│   │   ├── project/
│   │   │   ├── document-list.tsx
│   │   │   ├── upload-dropzone.tsx
│   │   │   ├── structure-viewer.tsx
│   │   │   ├── question-bank.tsx
│   │   │   └── processing-progress.tsx
│   │   ├── analytics/
│   │   │   ├── score-trend-chart.tsx
│   │   │   ├── category-trends.tsx
│   │   │   ├── session-calendar.tsx
│   │   │   └── readiness-heatmap.tsx
│   │   ├── rubric/
│   │   │   ├── rubric-editor.tsx
│   │   │   ├── rubric-preview.tsx
│   │   │   └── template-library.tsx
│   │   └── shared/
│   │       ├── file-upload.tsx
│   │       ├── score-badge.tsx
│   │       ├── trend-arrow.tsx
│   │       ├── empty-state.tsx
│   │       ├── loading-state.tsx
│   │       └── error-boundary.tsx
│   ├── hooks/
│   │   ├── use-auth.ts
│   │   ├── use-session.ts
│   │   ├── use-voice.ts
│   │   ├── use-websocket.ts
│   │   ├── use-media-recorder.ts
│   │   └── use-analytics.ts
│   ├── lib/
│   │   ├── api-client.ts
│   │   ├── auth.ts
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   └── validations.ts
│   ├── stores/
│   │   ├── auth-store.ts
│   │   ├── session-store.ts
│   │   └── project-store.ts
│   └── types/
│       ├── api.ts
│       ├── user.ts
│       ├── project.ts
│       ├── session.ts
│       ├── rubric.ts
│       └── analytics.ts
```

## NestJS Backend

```
apps/api/
├── nest-cli.json
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── .env
├── .env.production
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── common/
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts
│   │   │   ├── roles.decorator.ts
│   │   │   └── organization.decorator.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── roles.guard.ts
│   │   │   └── organization.guard.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── interceptors/
│   │   │   ├── audit-log.interceptor.ts
│   │   │   ├── transform.interceptor.ts
│   │   │   └── timeout.interceptor.ts
│   │   ├── middleware/
│   │   │   ├── tenant.middleware.ts
│   │   │   └── rate-limit.middleware.ts
│   │   ├── pipes/
│   │   │   └── validation.pipe.ts
│   │   └── types/
│   │       ├── pagination.ts
│   │       └── response.ts
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── strategies/
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   ├── google.strategy.ts
│   │   │   │   ├── microsoft.strategy.ts
│   │   │   │   └── saml.strategy.ts
│   │   │   └── dto/
│   │   │       ├── register.dto.ts
│   │   │       ├── login.dto.ts
│   │   │       └── reset-password.dto.ts
│   │   ├── users/
│   │   │   ├── users.module.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.repository.ts
│   │   │   └── dto/
│   │   │       ├── create-user.dto.ts
│   │   │       └── update-user.dto.ts
│   │   ├── organizations/
│   │   │   ├── organizations.module.ts
│   │   │   ├── organizations.controller.ts
│   │   │   ├── organizations.service.ts
│   │   │   ├── departments.controller.ts
│   │   │   ├── departments.service.ts
│   │   │   └── dto/
│   │   │       ├── create-organization.dto.ts
│   │   │       └── create-department.dto.ts
│   │   ├── projects/
│   │   │   ├── projects.module.ts
│   │   │   ├── projects.controller.ts
│   │   │   ├── projects.service.ts
│   │   │   ├── documents.controller.ts
│   │   │   ├── documents.service.ts
│   │   │   └── dto/
│   │   │       ├── create-project.dto.ts
│   │   │       └── upload-document.dto.ts
│   │   ├── sessions/
│   │   │   ├── sessions.module.ts
│   │   │   ├── sessions.controller.ts
│   │   │   ├── sessions.service.ts
│   │   │   ├── sessions.gateway.ts          # WebSocket gateway
│   │   │   └── dto/
│   │   │       ├── create-session.dto.ts
│   │   │       └── session-message.dto.ts
│   │   ├── rubrics/
│   │   │   ├── rubrics.module.ts
│   │   │   ├── rubrics.controller.ts
│   │   │   ├── rubrics.service.ts
│   │   │   └── dto/
│   │   │       └── create-rubric.dto.ts
│   │   ├── analytics/
│   │   │   ├── analytics.module.ts
│   │   │   ├── analytics.controller.ts
│   │   │   └── analytics.service.ts
│   │   ├── billing/
│   │   │   ├── billing.module.ts
│   │   │   ├── billing.controller.ts
│   │   │   ├── billing.service.ts
│   │   │   ├── stripe.service.ts
│   │   │   └── webhooks.controller.ts
│   │   ├── notifications/
│   │   │   ├── notifications.module.ts
│   │   │   ├── notifications.controller.ts
│   │   │   ├── notifications.service.ts
│   │   │   └── email.service.ts
│   │   └── admin/
│   │       ├── admin.module.ts
│   │       ├── admin.controller.ts
│   │       └── admin.service.ts
│   ├── ai/
│   │   ├── ai.module.ts
│   │   ├── ai-gateway.service.ts           # Multi-model routing
│   │   ├── document-processor/
│   │   │   ├── document-processor.service.ts
│   │   │   ├── pdf-extractor.ts
│   │   │   ├── docx-extractor.ts
│   │   │   ├── chunker.ts
│   │   │   └── embedder.ts
│   │   ├── retrieval/
│   │   │   ├── retrieval.service.ts
│   │   │   ├── vector-search.ts
│   │   │   ├── bm25-search.ts
│   │   │   └── reranker.ts
│   │   ├── agents/
│   │   │   ├── orchestrator.agent.ts
│   │   │   ├── chief-examiner.agent.ts
│   │   │   ├── methodology-examiner.agent.ts
│   │   │   ├── statistics-examiner.agent.ts
│   │   │   ├── literature-examiner.agent.ts
│   │   │   ├── follow-up.agent.ts
│   │   │   ├── assessment.agent.ts
│   │   │   └── feedback.agent.ts
│   │   ├── question-generator/
│   │   │   ├── question-generator.service.ts
│   │   │   └── question-validator.ts
│   │   └── voice/
│   │       ├── voice.service.ts
│   │       ├── stt.service.ts               # Deepgram integration
│   │       └── tts.service.ts               # ElevenLabs integration
│   ├── database/
│   │   ├── database.module.ts
│   │   ├── migrations/
│   │   │   ├── 001_initial_schema.ts
│   │   │   ├── 002_rubrics.ts
│   │   │   ├── 003_sessions.ts
│   │   │   ├── 004_billing.ts
│   │   │   └── 005_audit_logs.ts
│   │   └── seeds/
│   │       ├── default-rubrics.seed.ts
│   │       └── demo-data.seed.ts
│   └── jobs/
│       ├── jobs.module.ts
│       ├── document-processing.job.ts
│       ├── embedding-generation.job.ts
│       ├── question-bank-generation.job.ts
│       ├── session-cleanup.job.ts
│       └── notification.job.ts
├── test/
│   ├── e2e/
│   │   ├── auth.e2e-spec.ts
│   │   ├── projects.e2e-spec.ts
│   │   └── sessions.e2e-spec.ts
│   └── unit/
│       ├── ai/
│       │   ├── chunker.spec.ts
│       │   ├── retrieval.spec.ts
│       │   └── question-generator.spec.ts
│       └── services/
│           ├── auth.service.spec.ts
│           └── sessions.service.spec.ts
```

## Infrastructure

```
infrastructure/
├── terraform/
│   ├── environments/
│   │   ├── production/
│   │   │   ├── main.tf
│   │   │   ├── variables.tf
│   │   │   ├── outputs.tf
│   │   │   └── terraform.tfvars
│   │   └── staging/
│   │       ├── main.tf
│   │       ├── variables.tf
│   │       ├── outputs.tf
│   │       └── terraform.tfvars
│   ├── modules/
│   │   ├── eks/
│   │   │   ├── main.tf
│   │   │   ├── variables.tf
│   │   │   └── outputs.tf
│   │   ├── rds/
│   │   │   ├── main.tf
│   │   │   ├── variables.tf
│   │   │   └── outputs.tf
│   │   ├── redis/
│   │   │   ├── main.tf
│   │   │   ├── variables.tf
│   │   │   └── outputs.tf
│   │   ├── s3/
│   │   │   ├── main.tf
│   │   │   ├── variables.tf
│   │   │   └── outputs.tf
│   │   ├── cloudfront/
│   │   │   ├── main.tf
│   │   │   └── variables.tf
│   │   ├── vpc/
│   │   │   ├── main.tf
│   │   │   ├── variables.tf
│   │   │   └── outputs.tf
│   │   └── monitoring/
│   │       ├── main.tf
│   │       └── variables.tf
│   └── shared/
│       ├── backend.tf
│       └── providers.tf
├── kubernetes/
│   ├── base/
│   │   ├── namespace.yaml
│   │   ├── api-gateway/
│   │   │   ├── deployment.yaml
│   │   │   ├── service.yaml
│   │   │   └── hpa.yaml
│   │   ├── session-service/
│   │   │   ├── deployment.yaml
│   │   │   ├── service.yaml
│   │   │   └── hpa.yaml
│   │   ├── document-service/
│   │   │   ├── deployment.yaml
│   │   │   └── service.yaml
│   │   ├── ai-gateway/
│   │   │   ├── deployment.yaml
│   │   │   ├── service.yaml
│   │   │   └── hpa.yaml
│   │   ├── web-frontend/
│   │   │   ├── deployment.yaml
│   │   │   ├── service.yaml
│   │   │   └── hpa.yaml
│   │   ├── worker-document/
│   │   │   ├── deployment.yaml
│   │   │   └── hpa.yaml
│   │   ├── worker-embedding/
│   │   │   ├── deployment.yaml
│   │   │   └── hpa.yaml
│   │   └── ingress.yaml
│   ├── overlays/
│   │   ├── production/
│   │   │   └── kustomization.yaml
│   │   └── staging/
│   │       └── kustomization.yaml
│   └── monitoring/
│       ├── prometheus/
│       │   ├── prometheus-config.yaml
│       │   └── service-monitor.yaml
│       ├── grafana/
│       │   ├── dashboards/
│       │   │   ├── api-overview.json
│       │   │   ├── ai-costs.json
│       │   │   └── session-metrics.json
│       │   └── datasources.yaml
│       └── otel-collector/
│           └── config.yaml
├── docker/
│   ├── api.Dockerfile
│   ├── web.Dockerfile
│   ├── worker.Dockerfile
│   └── docker-compose.dev.yaml
└── scripts/
    ├── setup-dev.sh
    ├── run-migrations.sh
    ├── seed-db.sh
    └── deploy.sh
```

## CI/CD (GitHub Actions)

```
.github/
├── workflows/
│   ├── ci.yaml                # Lint, test, type-check on PR
│   ├── deploy-staging.yaml    # Auto-deploy to staging on merge to main
│   ├── deploy-production.yaml # Manual approval deploy to production
│   ├── db-migration.yaml      # Run database migrations
│   └── security-scan.yaml     # Weekly dependency and code scanning
└── CODEOWNERS
```

---

# 24. Final Output Requirements Checklist

| Requirement | Status |
|-------------|--------|
| Extremely detailed | 24 comprehensive sections |
| Investor-ready | TAM/SAM/SOM, competitive landscape, unit economics, moat analysis |
| Engineer-ready | Database schemas, API contracts, folder structure, architecture details |
| Designer-ready | Design tokens, page definitions, component lists, states, IA, accessibility |
| Implementation-ready | 4-phase plan with features, architecture, risks, deliverables per phase |
| Diagrams | Architecture diagrams (see companion visualization) |
| Database schemas | Complete PostgreSQL DDL with indexes and RLS |
| API contracts | Full REST API with endpoints, request/response examples, WebSocket protocol |
| Workflows | User journeys for student, supervisor, university |
| Security architecture | RBAC matrix, encryption, GDPR, FERPA, audit trails |
| User flows | Onboarding → Upload → Practice → Feedback → Improvement cycle |

---

*This document is designed for 1 million global student users. Every architectural decision optimizes for scalability, educational impact, institutional trust, and commercial viability.*

*VivaBot — Because no student should walk into their defense unprepared.*
