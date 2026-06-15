export interface DocumentSection {
  title: string;
  content: string;
  pageStart: number;
  pageEnd: number;
}

export interface ProcessedDocument {
  title: string;
  fullText: string;
  sections: DocumentSection[];
  pageCount: number;
  wordCount: number;
  fileName: string;
}

const HEADING_PATTERNS = [
  /^chapter\s+\d+[.:]\s*/i,
  /^\d+\.\s+[A-Z]/,
  /^(?:abstract|introduction|literature\s+review|methodology|methods|results|discussion|conclusion|recommendations|references|bibliography|appendix|acknowledgements?)/i,
  /^(?:theoretical\s+framework|conceptual\s+framework|research\s+design|data\s+(?:collection|analysis)|findings|limitations|future\s+(?:work|research))/i,
];

function isHeading(line: string): boolean {
  const trimmed = line.trim();
  if (trimmed.length < 3 || trimmed.length > 120) return false;
  if (HEADING_PATTERNS.some((p) => p.test(trimmed))) return true;
  const words = trimmed.split(/\s+/);
  if (words.length <= 8 && words.length >= 1) {
    const upperCount = words.filter((w) => w[0] && w[0] === w[0].toUpperCase()).length;
    if (upperCount / words.length > 0.7 && !trimmed.endsWith(".")) return true;
  }
  return false;
}

function buildSections(pages: { pageNum: number; text: string }[]): DocumentSection[] {
  const sections: DocumentSection[] = [];
  let currentTitle = "Preamble";
  let currentContent = "";
  let currentPageStart = 1;

  for (const page of pages) {
    const lines = page.text.split("\n");
    for (const line of lines) {
      if (isHeading(line) && currentContent.trim().length > 100) {
        sections.push({
          title: currentTitle,
          content: currentContent.trim(),
          pageStart: currentPageStart,
          pageEnd: page.pageNum,
        });
        currentTitle = line.trim().replace(/^chapter\s+\d+[.:]\s*/i, "").replace(/^\d+\.\s+/, "");
        currentContent = "";
        currentPageStart = page.pageNum;
      } else {
        currentContent += line + "\n";
      }
    }
  }

  if (currentContent.trim().length > 20) {
    sections.push({
      title: currentTitle,
      content: currentContent.trim(),
      pageStart: currentPageStart,
      pageEnd: pages[pages.length - 1]?.pageNum || 1,
    });
  }

  return sections.filter((s) => s.content.length > 50);
}

function inferTitle(text: string, fileName: string): string {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  for (const line of lines.slice(0, 20)) {
    if (line.length > 15 && line.length < 200 && !line.match(/^(page|table of|list of|declaration|acknowledgement)/i)) {
      const words = line.split(/\s+/);
      if (words.length >= 3) return line;
    }
  }
  return fileName.replace(/\.(pdf|docx)$/i, "").replace(/[_-]/g, " ");
}

export async function extractPDF(file: File): Promise<ProcessedDocument> {
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  const pages: { pageNum: number; text: string }[] = [];
  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items
      .map((item: unknown) => {
        const t = item as { str?: string; hasEOL?: boolean };
        return (t.str || "") + (t.hasEOL ? "\n" : "");
      })
      .join("");
    pages.push({ pageNum: i, text });
    fullText += text + "\n\n";
  }

  const sections = buildSections(pages);

  return {
    title: inferTitle(fullText, file.name),
    fullText,
    sections,
    pageCount: pdf.numPages,
    wordCount: fullText.split(/\s+/).filter(Boolean).length,
    fileName: file.name,
  };
}

export async function extractDOCX(file: File): Promise<ProcessedDocument> {
  const mammoth = await import("mammoth");
  const buffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer: buffer });
  const fullText = result.value;

  const lines = fullText.split("\n");
  const pages: { pageNum: number; text: string }[] = [];
  const linesPerPage = 45;
  for (let i = 0; i < lines.length; i += linesPerPage) {
    pages.push({
      pageNum: Math.floor(i / linesPerPage) + 1,
      text: lines.slice(i, i + linesPerPage).join("\n"),
    });
  }

  const sections = buildSections(pages);

  return {
    title: inferTitle(fullText, file.name),
    fullText,
    sections,
    pageCount: pages.length,
    wordCount: fullText.split(/\s+/).filter(Boolean).length,
    fileName: file.name,
  };
}

export async function processDocument(file: File): Promise<ProcessedDocument> {
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return extractPDF(file);
  if (ext === "docx") return extractDOCX(file);
  throw new Error("Unsupported file type. Please upload a PDF or DOCX file.");
}
