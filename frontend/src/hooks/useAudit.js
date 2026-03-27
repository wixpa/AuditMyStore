import { useState, useEffect, useRef } from "react";

const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;
const HF_URL = import.meta.env.VITE_HF_URL;

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

You cannot actually crawl the site, but you must infer realistic issues for a modern Shopify store in this niche, based on common patterns you have seen.

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
- Be highly specific to this exact store brand, niche, and product type (infer from the URL and typical Shopify brands)
- Severity must be realistic — not everything is high
- Performance scores: most Shopify stores realistically score 45-75 on performance
- Metrics should be realistic estimates for a Shopify store of this type
- Raw JSON only — no markdown, no code fences
`;
}

/* ── HuggingFace Router request ── */
async function fetchHuggingFace(storeUrl) {
   const body = {
      model: "zai-org/GLM-5:novita",
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
   };

   const response = await fetch(HF_URL, {
      method: "POST",
      headers: {
         Authorization: `Bearer ${HF_TOKEN}`,
         "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
   });

   if (!response.ok) {
      const err = await response.text();
      throw new Error(`HuggingFace error ${response.status}: ${err}`);
   }

   const result = await response.json();

   // HF router uses OpenAI-like structure
   const raw =
      result?.choices?.[0]?.message?.content ??
      result?.choices?.[0]?.message?.[0]?.content ??
      "";

   const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/i, "")
      .trim();

   return JSON.parse(cleaned);
}

/* ── Normalize into dashboard-friendly shape ── */
function normalizeReport(raw, url) {
   return {
      url,
      aiSource: "huggingface",
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
   const [strategy, setStrategy] = useState("mobile"); // still used for UI toggle
   const [step, setStep] = useState(0);
   const ranRef = useRef(false);

   const run = async (url) => {
      if (!url) return;
      setLoading(true);
      setError(null);
      setData(null);

      try {
         setStep(1); // connecting
         await new Promise((r) => setTimeout(r, 400));

         setStep(2); // analyzing
         await new Promise((r) => setTimeout(r, 400));

         setStep(3); // HF model thinking
         const raw = await fetchHuggingFace(url);

         setStep(4); // building report
         await new Promise((r) => setTimeout(r, 300));

         setData(normalizeReport(raw, url));
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
      if (storeUrl) run(storeUrl);
   }, [storeUrl]);

   const handleStrategyChange = (s) => {
      setStrategy(s);
      ranRef.current = false;
      run(storeUrl);
   };

   // ... all existing code stays same, only update the return:

   return {
      data,
      loading,
      error,
      strategy,
      aiSource: "huggingface",
      setStrategy: handleStrategyChange,
      step,
      run,        // ← ADD THIS
      rerun: () => {
         ranRef.current = false;
         run(storeUrl);
      },
   };
}
