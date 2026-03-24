import { useState, useEffect, useRef } from "react";

const OPENAI_API_KEY =
   "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";
const GEMINI_API_KEY = "AIzaSyBZ3LP3R7NV7wKT9ispXdlwMY__ESw3Ewo";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export function scoreColor(val) {
   if (val >= 80) return "emerald";
   if (val >= 50) return "amber";
   return "red";
}

/* ── Shared audit prompt ── */
function buildPrompt(storeUrl) {
   return `
You are a world-class Shopify CRO, SEO, and performance expert. Perform a full audit of this Shopify store:

Store URL: ${storeUrl}

Based on your expert knowledge of Shopify stores, common CRO issues, SEO best practices, page speed problems, mobile UX issues, and app performance risks — generate a comprehensive, realistic, and highly specific audit report.

IMPORTANT: Return ONLY a valid raw JSON object. No markdown. No code fences. No explanation. Just pure JSON.

Required JSON structure:
{
  "overallScore": <number 0-100>,
  "summary": "<2-3 sentence honest assessment of the store's biggest strengths and opportunities>",
  "scores": {
    "performance": <number 0-100>,
    "seo": <number 0-100>,
    "accessibility": <number 0-100>,
    "cro": <number 0-100>
  },
  "metrics": {
    "lcp":  { "displayValue": "<e.g. 3.2s>",  "label": "Largest Contentful Paint" },
    "fcp":  { "displayValue": "<e.g. 1.8s>",  "label": "First Contentful Paint"   },
    "tbt":  { "displayValue": "<e.g. 420ms>", "label": "Total Blocking Time"       },
    "cls":  { "displayValue": "<e.g. 0.12>",  "label": "Cumulative Layout Shift"   },
    "ttfb": { "displayValue": "<e.g. 0.9s>",  "label": "Time to First Byte"        }
  },
  "problems": [
    {
      "id": 1,
      "category": "<CRO | SEO | Speed | UX | Apps | Mobile>",
      "severity": "<high | medium | low>",
      "title": "<short specific problem title, max 8 words>",
      "problem": "<2-3 sentences: what is wrong and how it directly hurts conversions or revenue>",
      "solution": "<2-3 sentences: specific actionable step-by-step Shopify fix>",
      "impact": "<1-2 sentences: measurable expected business impact after fixing>"
    }
  ],
  "quickWins": <count of low-severity problems>,
  "highImpact": <count of high-severity problems>
}

Rules:
- Generate exactly 7 problems covering different categories
- Be highly specific to this exact store brand, niche, and product type
- Severity must be realistic — not everything is high
- Performance scores: most Shopify stores score 45-75 realistically
- Metrics should be realistic estimates for a Shopify store of this type
- Raw JSON only — no markdown, no code fences
`;
}

/* ── OpenAI request ── */
async function fetchOpenAI(storeUrl) {
   const res = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
         model: "gpt-4o-mini",
         messages: [
            {
               role: "system",
               content:
                  "You are a world-class Shopify CRO and SEO consultant. Always respond with raw JSON only — no markdown, no code fences.",
            },
            {
               role: "user",
               content: buildPrompt(storeUrl),
            },
         ],
         temperature: 0.5,
         max_tokens: 3000,
         response_format: { type: "json_object" },
      }),
   });

   if (!res.ok) {
      const err = await res.text();
      throw new Error(`OpenAI error ${res.status}: ${err}`);
   }

   const json = await res.json();
   const raw = json?.choices?.[0]?.message?.content ?? "";
   return JSON.parse(raw);
}

/* ── Gemini request ── */
async function fetchGemini(storeUrl) {
   const res = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
         contents: [{ parts: [{ text: buildPrompt(storeUrl) }] }],
         generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 3000,
            responseMimeType: "application/json",
         },
      }),
   });

   if (!res.ok) {
      const err = await res.text();
      throw new Error(`Gemini error ${res.status}: ${err}`);
   }

   const json = await res.json();
   const raw = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
   const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/i, "")
      .trim();
   return JSON.parse(cleaned);
}

/* ── Try OpenAI first, fallback to Gemini ── */
async function fetchAudit(storeUrl, onSourceDetected) {
   try {
      const data = await fetchOpenAI(storeUrl);
      onSourceDetected("openai");
      return data;
   } catch (openAiErr) {
      console.warn("OpenAI failed, falling back to Gemini:", openAiErr.message);
      try {
         const data = await fetchGemini(storeUrl);
         onSourceDetected("gemini");
         return data;
      } catch (geminiErr) {
         throw new Error(
            `Both APIs failed. OpenAI: ${openAiErr.message} | Gemini: ${geminiErr.message}`,
         );
      }
   }
}

/* ── Parse & normalize report ── */
function normalizeReport(raw, url, aiSource) {
   return {
      url,
      aiSource,
      overallScore: raw.overallScore ?? 60,
      summary: raw.summary ?? "",
      scores: {
         performance: {
            value: raw.scores?.performance ?? 60,
            color: scoreColor(raw.scores?.performance ?? 60),
         },
         seo: {
            value: raw.scores?.seo ?? 60,
            color: scoreColor(raw.scores?.seo ?? 60),
         },
         accessibility: {
            value: raw.scores?.accessibility ?? 60,
            color: scoreColor(raw.scores?.accessibility ?? 60),
         },
         cro: {
            value: raw.scores?.cro ?? 60,
            color: scoreColor(raw.scores?.cro ?? 60),
         },
      },
      metrics: raw.metrics ?? {},
      problems: raw.problems ?? [],
      quickWins: raw.quickWins ?? 0,
      highImpact: raw.highImpact ?? 0,
      issuesCount: raw.problems?.length ?? 0,
   };
}

/* ── Main hook ── */
export default function useAudit(storeUrl) {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [strategy, setStrategy] = useState("mobile");
   const [step, setStep] = useState(0);
   const [aiSource, setAiSource] = useState(null); // "openai" | "gemini"
   const ranRef = useRef(false);

   const run = async (url, strat) => {
      if (!url) return;
      setLoading(true);
      setError(null);
      setData(null);
      setAiSource(null);

      try {
         setStep(1);
         await new Promise((r) => setTimeout(r, 500));

         setStep(2);
         await new Promise((r) => setTimeout(r, 500));

         setStep(3);
         const raw = await fetchAudit(url, setAiSource);

         setStep(4);
         await new Promise((r) => setTimeout(r, 300));

         setData(normalizeReport(raw, url, aiSource));
         setStep(5);
      } catch (err) {
         setError(err.message || "Audit failed. Please try again.");
      } finally {
         setLoading(false);
         setStep(0);
      }
   };

   useEffect(() => {
      if (ranRef.current) return;
      ranRef.current = true;
      if (storeUrl) run(storeUrl, strategy);
   }, [storeUrl]);

   const handleStrategyChange = (s) => {
      setStrategy(s);
      ranRef.current = false;
      run(storeUrl, s);
   };

   return {
      data,
      loading,
      error,
      strategy,
      aiSource,
      setStrategy: handleStrategyChange,
      step,
      rerun: () => {
         ranRef.current = false;
         run(storeUrl, strategy);
      },
   };
}
