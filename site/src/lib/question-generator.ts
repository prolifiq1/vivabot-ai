import { ProcessedDocument, DocumentSection } from "./document-processor";

export interface GeneratedQuestion {
  question: string;
  category: string;
  difficulty: "Foundational" | "Intermediate" | "Advanced";
  section: string;
  context: string;
}

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Methodology: ["method", "approach", "design", "sample", "sampling", "data collection", "procedure", "instrument", "survey", "interview", "experiment", "qualitative", "quantitative", "mixed method", "case study", "ethnograph", "grounded theory", "participant", "population", "reliability", "validity"],
  Analysis: ["result", "finding", "analysis", "statistic", "significant", "correlation", "regression", "t-test", "anova", "chi-square", "p-value", "hypothesis", "variable", "coefficient", "mean", "standard deviation", "variance", "thematic", "coding", "theme"],
  Literature: ["literature", "review", "previous", "prior research", "existing", "gap", "theoretical", "framework", "theory", "model", "according to", "argued", "posit", "suggest", "demonstrate", "scholar", "seminal", "landmark"],
  Ethics: ["ethic", "consent", "confidential", "privacy", "IRB", "approval", "anonymi", "harm", "vulnerable", "deception", "bias", "fairness"],
  Knowledge: ["contribution", "significance", "impact", "implication", "recommend", "conclusion", "future", "limitation", "original", "novel"],
};

function classifyCategory(text: string): string {
  const lower = text.toLowerCase();
  let bestCat = "Knowledge";
  let bestScore = 0;
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    const score = keywords.filter((k) => lower.includes(k)).length;
    if (score > bestScore) {
      bestScore = score;
      bestCat = cat;
    }
  }
  return bestCat;
}

function extractKeySentences(text: string): string[] {
  const sentences = text
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 40 && s.length < 500 && !s.match(/^(figure|table|source|note|page)\s/i));

  const scored = sentences.map((s) => {
    let score = 0;
    if (s.match(/\b(significant|important|key|critical|essential|primary|main|central|novel|unique)\b/i)) score += 3;
    if (s.match(/\b(found|revealed|showed|demonstrated|indicated|suggest|argue|propose|conclude)\b/i)) score += 2;
    if (s.match(/\b(because|therefore|however|although|despite|whereas|consequently)\b/i)) score += 2;
    if (s.match(/\b(method|approach|framework|model|theory|hypothesis)\b/i)) score += 2;
    if (s.match(/\d+%|\d+\.\d+|p\s*[<>=]|n\s*=\s*\d+/i)) score += 3;
    if (s.match(/\b(limitation|challenge|difficulty|problem|issue|concern)\b/i)) score += 2;
    return { sentence: s, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 80)
    .map((s) => s.sentence);
}

function extractKeyTerms(text: string): string[] {
  const words = text.toLowerCase().split(/\s+/);
  const freq: Record<string, number> = {};
  const stopwords = new Set(["the", "a", "an", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "do", "does", "did", "will", "would", "could", "should", "may", "might", "can", "shall", "to", "of", "in", "for", "on", "with", "at", "by", "from", "as", "into", "through", "during", "before", "after", "above", "below", "between", "out", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "each", "every", "both", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "and", "but", "or", "if", "that", "this", "these", "those", "it", "its", "they", "them", "their", "we", "our", "he", "she", "his", "her", "which", "what", "who", "whom", "also", "about", "up", "one", "two"]);

  for (let i = 0; i < words.length - 1; i++) {
    const w = words[i].replace(/[^a-z]/g, "");
    if (w.length > 3 && !stopwords.has(w)) {
      freq[w] = (freq[w] || 0) + 1;
      const bigram = w + " " + words[i + 1].replace(/[^a-z]/g, "");
      if (bigram.length > 8) freq[bigram] = (freq[bigram] || 0) + 1;
    }
  }

  return Object.entries(freq)
    .filter(([, count]) => count >= 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .map(([term]) => term);
}

const TEMPLATES = {
  Foundational: [
    (ctx: string) => `What is the central argument or contribution of your research on ${ctx}?`,
    (ctx: string) => `Can you summarize what your study on ${ctx} set out to achieve?`,
    (ctx: string) => `Why is the topic of ${ctx} important in your field?`,
    (ctx: string) => `What motivated you to investigate ${ctx}?`,
    (ctx: string) => `How would you explain ${ctx} to someone outside your discipline?`,
    (ctx: string) => `What are the key concepts underpinning your work on ${ctx}?`,
  ],
  Intermediate: [
    (ctx: string) => `How does your work on ${ctx} build upon or differ from existing research?`,
    (ctx: string) => `What were the main challenges you encountered when investigating ${ctx}?`,
    (ctx: string) => `Can you justify why you chose your particular approach to studying ${ctx}?`,
    (ctx: string) => `How do your findings about ${ctx} compare with what the literature predicted?`,
    (ctx: string) => `What alternative explanations could account for your results regarding ${ctx}?`,
    (ctx: string) => `How generalizable are your findings on ${ctx}?`,
    (ctx: string) => `What would you do differently if you were to repeat the study on ${ctx}?`,
  ],
  Advanced: [
    (ctx: string) => `A critic might argue that your approach to ${ctx} is fundamentally flawed. How would you defend it?`,
    (ctx: string) => `Your findings on ${ctx} seem to contradict [established view]. Can you reconcile this?`,
    (ctx: string) => `How did you ensure the reliability and validity of your measurements related to ${ctx}?`,
    (ctx: string) => `What are the epistemological assumptions underlying your research on ${ctx}?`,
    (ctx: string) => `If your sample size or scope had been larger, do you think your conclusions about ${ctx} would change?`,
    (ctx: string) => `What are the ethical implications of your work on ${ctx}?`,
    (ctx: string) => `How does your theoretical framework handle edge cases or anomalies in ${ctx}?`,
  ],
};

const SENTENCE_TEMPLATES = {
  Foundational: [
    (s: string) => `You state: "${truncate(s, 120)}". Can you explain what this means and why it matters?`,
    (s: string) => `Regarding your claim that "${truncate(s, 120)}" — what evidence supports this?`,
  ],
  Intermediate: [
    (s: string) => `You write: "${truncate(s, 120)}". How did you arrive at this conclusion?`,
    (s: string) => `Your thesis states: "${truncate(s, 120)}". What are the implications of this finding?`,
    (s: string) => `Concerning "${truncate(s, 120)}" — could you elaborate on the methodology behind this claim?`,
  ],
  Advanced: [
    (s: string) => `You claim: "${truncate(s, 120)}". A skeptic would challenge this. How do you respond?`,
    (s: string) => `"${truncate(s, 120)}" — what are the limitations of this conclusion?`,
    (s: string) => `If "${truncate(s, 120)}" were proven wrong, how would that affect your thesis?`,
  ],
};

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

function generateFromSection(section: DocumentSection, allTerms: string[]): GeneratedQuestion[] {
  const questions: GeneratedQuestion[] = [];
  const category = classifyCategory(section.content);
  const sentences = extractKeySentences(section.content);
  const sectionTerms = extractKeyTerms(section.content).slice(0, 5);
  const usedTerms = sectionTerms.length > 0 ? sectionTerms : allTerms.slice(0, 3);

  for (const term of usedTerms.slice(0, 2)) {
    const diff = "Foundational" as const;
    const templates = TEMPLATES[diff];
    const tmpl = templates[Math.floor(Math.random() * templates.length)];
    questions.push({
      question: tmpl(term),
      category,
      difficulty: diff,
      section: section.title,
      context: term,
    });
  }

  for (const term of usedTerms.slice(0, 2)) {
    const diff = "Intermediate" as const;
    const templates = TEMPLATES[diff];
    const tmpl = templates[Math.floor(Math.random() * templates.length)];
    questions.push({
      question: tmpl(term),
      category,
      difficulty: diff,
      section: section.title,
      context: term,
    });
  }

  for (const term of usedTerms.slice(0, 1)) {
    const diff = "Advanced" as const;
    const templates = TEMPLATES[diff];
    const tmpl = templates[Math.floor(Math.random() * templates.length)];
    questions.push({
      question: tmpl(term),
      category,
      difficulty: diff,
      section: section.title,
      context: term,
    });
  }

  for (const sentence of sentences.slice(0, 3)) {
    const diffs = (["Foundational", "Intermediate", "Advanced"] as const);
    const diff = diffs[Math.floor(Math.random() * diffs.length)];
    const templates = SENTENCE_TEMPLATES[diff];
    const tmpl = templates[Math.floor(Math.random() * templates.length)];
    questions.push({
      question: tmpl(sentence),
      category,
      difficulty: diff,
      section: section.title,
      context: sentence,
    });
  }

  return questions;
}

function deduplicateQuestions(questions: GeneratedQuestion[]): GeneratedQuestion[] {
  const seen = new Set<string>();
  return questions.filter((q) => {
    const key = q.question.toLowerCase().slice(0, 60);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function generateQuestions(doc: ProcessedDocument): GeneratedQuestion[] {
  const allTerms = extractKeyTerms(doc.fullText);
  let questions: GeneratedQuestion[] = [];

  for (const section of doc.sections) {
    questions.push(...generateFromSection(section, allTerms));
  }

  questions = deduplicateQuestions(questions);

  questions.sort((a, b) => {
    const diffOrder = { Foundational: 0, Intermediate: 1, Advanced: 2 };
    return diffOrder[a.difficulty] - diffOrder[b.difficulty];
  });

  return questions;
}

export function getVivaQuestions(questions: GeneratedQuestion[], count: number = 8): GeneratedQuestion[] {
  const foundational = questions.filter((q) => q.difficulty === "Foundational");
  const intermediate = questions.filter((q) => q.difficulty === "Intermediate");
  const advanced = questions.filter((q) => q.difficulty === "Advanced");

  const shuffle = <T,>(arr: T[]): T[] => arr.sort(() => Math.random() - 0.5);

  const selected: GeneratedQuestion[] = [
    ...shuffle(foundational).slice(0, Math.ceil(count * 0.25)),
    ...shuffle(intermediate).slice(0, Math.ceil(count * 0.5)),
    ...shuffle(advanced).slice(0, Math.ceil(count * 0.25)),
  ];

  return selected.slice(0, count);
}
