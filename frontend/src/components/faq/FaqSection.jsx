import { useState } from "react";
import FaqItem from "./FaqItem";
import { MessageCircle, Mail, Zap } from "lucide-react";

const categories = ["All", "General", "SEO & AI", "Privacy", "Results"];

const faqs = [
   {
      category: "General",
      emoji: "🔍",
      accentColor: "bg-emerald-400",
      accentLight: "bg-emerald-50",
      accentText: "text-emerald-600",
      accentRing: "ring-emerald-200",
      question: "What exactly does the AI audit analyze in my Shopify store?",
      answer:
         "Our AI does a deep scan across your entire store — covering CRO issues, SEO gaps, mobile UX problems, page speed blockers, app performance risks, and checkout friction points. You get a complete prioritized view of everything stopping visitors from converting into customers.",
   },
   {
      category: "SEO & AI",
      emoji: "🤖",
      accentColor: "bg-sky-400",
      accentLight: "bg-sky-50",
      accentText: "text-sky-600",
      accentRing: "ring-sky-200",
      question:
         "How does the ChatGPT & AI SEO audit help my store rank in AI search?",
      answer:
         "AI models like ChatGPT and Perplexity pull product and brand recommendations from stores that are structured correctly. Our AI SEO audit checks your store's content structure, metadata, schema markup, and topical authority — then gives you specific fixes to get recommended in AI-generated answers.",
   },
   {
      category: "Privacy",
      emoji: "🔒",
      accentColor: "bg-violet-400",
      accentLight: "bg-violet-50",
      accentText: "text-violet-600",
      accentRing: "ring-violet-200",
      question:
         "Will the audit affect my store's theme, code, or live performance?",
      answer:
         "Absolutely not. Our audit is completely read-only — we analyze your store from the outside, exactly like a visitor would. We never touch your code, theme files, or database. Your store stays fully live and unaffected throughout the entire audit process.",
   },
   {
      category: "Results",
      emoji: "📊",
      accentColor: "bg-amber-400",
      accentLight: "bg-amber-50",
      accentText: "text-amber-600",
      accentRing: "ring-amber-200",
      question:
         "How accurate are the AI suggestions, and what if I need help implementing them?",
      answer:
         "Our AI is trained on thousands of Shopify stores and real CRO data — so suggestions are highly specific, not generic advice. Every fix is actionable with a clear explanation. If you need hands-on help, our team at ConversionAB can implement the fixes for you directly.",
   },
   {
      category: "General",
      emoji: "⚡",
      accentColor: "bg-lime-400",
      accentLight: "bg-lime-50",
      accentText: "text-lime-700",
      accentRing: "ring-lime-200",
      question:
         "Can the audit detect issues caused by third-party apps and scripts?",
      answer:
         "Yes. Our App Performance Audit specifically scans for installed apps that add unnecessary JavaScript, slow down your store, conflict with other apps, or block conversions. You'll see exactly which apps are hurting performance and what to do about them.",
   },
   {
      category: "SEO & AI",
      emoji: "🎯",
      accentColor: "bg-pink-400",
      accentLight: "bg-pink-50",
      accentText: "text-pink-600",
      accentRing: "ring-pink-200",
      question:
         "How long does the audit take and what format are the results in?",
      answer:
         "The AI scan completes in under 60 seconds. Results are delivered as a clean, structured report organized by category — SEO, CRO, Speed, Mobile, and Apps. Each issue includes a severity rating, explanation, and a step-by-step fix so you know exactly what to do next.",
   },
   {
      category: "Results",
      emoji: "💰",
      accentColor: "bg-teal-400",
      accentLight: "bg-teal-50",
      accentText: "text-teal-600",
      accentRing: "ring-teal-200",
      question: "Is the audit really free? What's the catch?",
      answer:
         "Yes — the core AI audit is completely free with no credit card required. We offer it because we believe once you see the value of the insights, you'll want our team or tools to help you implement them. There's no hidden catch, no auto-billing, and no spam.",
   },
];

export default function FaqSection() {
   const [openIndex, setOpenIndex] = useState(0);
   const [activeCategory, setActiveCategory] = useState("All");

   const filtered =
      activeCategory === "All"
         ? faqs
         : faqs.filter((f) => f.category === activeCategory);

   return (
      <section className="relative w-full overflow-hidden py-28">
         {/* ── BACKGROUND ── */}
         <div className="absolute inset-0 -z-10">
            <div
               className="absolute inset-0"
               style={{
                  background: `
              radial-gradient(ellipse 70% 55% at 0% 0%, rgba(254,205,211,0.35) 0%, transparent 55%),
              radial-gradient(ellipse 60% 50% at 100% 5%, rgba(167,243,208,0.32) 0%, transparent 55%),
              radial-gradient(ellipse 55% 45% at 5% 100%, rgba(186,230,255,0.28) 0%, transparent 55%),
              radial-gradient(ellipse 50% 40% at 95% 95%, rgba(253,230,138,0.22) 0%, transparent 50%),
              linear-gradient(150deg, #fff1f2 0%, #f0fdf4 30%, #f0f9ff 65%, #fffbeb 100%)
            `,
               }}
            />
            {/* Dot grid */}
            <div
               className="absolute inset-0 opacity-[0.055]"
               style={{
                  backgroundImage: `radial-gradient(circle, #f472b6 1px, transparent 1px)`,
                  backgroundSize: "30px 30px",
               }}
            />
            {/* Noise */}
            <div
               className="absolute inset-0 opacity-[0.015]"
               style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  backgroundSize: "128px 128px",
               }}
            />
            {/* Blobs */}
            <div className="animate-float absolute -top-16 left-1/4 h-72 w-72 rounded-full bg-pink-200/25 blur-3xl" />
            <div className="animate-float-reverse absolute bottom-0 right-1/3 h-64 w-64 rounded-full bg-emerald-200/20 blur-3xl" />
            <div className="animate-float absolute top-1/2 right-0 h-56 w-56 rounded-full bg-sky-200/20 blur-3xl" />
            {/* Rings */}
            <div className="absolute top-10 right-[7%] h-28 w-28 rounded-full border border-pink-200/50 opacity-70" />
            <div className="absolute top-16 right-[8.5%] h-14 w-14 rounded-full border border-pink-300/40 opacity-60" />
            <div className="absolute bottom-14 left-[6%] h-20 w-20 rounded-full border border-emerald-200/50 opacity-70" />
            {/* Crosses */}
            <svg
               className="animate-float absolute top-[18%] left-[5%] opacity-15"
               width="18"
               height="18"
               viewBox="0 0 20 20"
            >
               <path
                  d="M10 2v16M2 10h16"
                  stroke="#f472b6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
               />
            </svg>
            <svg
               className="animate-float-reverse absolute bottom-[22%] right-[5%] opacity-15"
               width="16"
               height="16"
               viewBox="0 0 20 20"
            >
               <path
                  d="M10 2v16M2 10h16"
                  stroke="#34d399"
                  strokeWidth="2.5"
                  strokeLinecap="round"
               />
            </svg>
            {/* Diamonds */}
            <div className="animate-float-reverse absolute top-[35%] right-[3%] h-3.5 w-3.5 rotate-45 border border-pink-400/40 opacity-60" />
            <div className="animate-float absolute top-[14%] right-[10%] h-2.5 w-2.5 rotate-45 bg-emerald-300/30 opacity-60" />
            <div className="animate-float-reverse absolute bottom-[38%] left-[4%] h-3 w-3 rotate-45 border border-sky-400/35 opacity-60" />
            <div className="animate-float absolute bottom-[14%] left-[12%] h-2 w-2 rounded-full bg-amber-400/35 opacity-70" />
         </div>

         <div className="mx-auto max-w-6xl px-4">
            {/* ── HEADING ── */}
            <div className="opacity-0-init animate-fade-in-up delay-100 mb-14 text-center">
               <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-200/70 bg-pink-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-pink-600 shadow-sm backdrop-blur-sm">
                  ✦ Got Questions?
               </span>
               <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-[54px]">
                  Frequently Asked{" "}
                  <span className="relative inline-block">
                     Questions
                     <svg
                        className="absolute -bottom-2 left-0 w-full"
                        viewBox="0 0 320 12"
                        fill="none"
                        preserveAspectRatio="none"
                     >
                        <path
                           d="M2 8 C60 2, 130 12, 200 6 S285 2, 318 7"
                           stroke="#10b981"
                           strokeWidth="3"
                           strokeLinecap="round"
                        />
                     </svg>
                  </span>
               </h2>
               <p className="mt-5 text-base text-gray-500 max-w-lg mx-auto leading-relaxed">
                  Everything you need to know about the AI audit — answered
                  clearly and honestly.
               </p>
            </div>

            {/* ── CATEGORY FILTERS ── */}
            <div className="opacity-0-init animate-fade-in-up delay-200 mb-10 flex flex-wrap justify-center gap-2">
               {categories.map((cat) => (
                  <button
                     key={cat}
                     onClick={() => {
                        setActiveCategory(cat);
                        setOpenIndex(null);
                     }}
                     className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200
                ${
                   activeCategory === cat
                      ? "bg-gray-900 text-white border-gray-900 shadow-sm scale-105"
                      : "border-gray-200 bg-white/70 text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
                  >
                     {cat}
                  </button>
               ))}
            </div>

            {/* ── MAIN LAYOUT ── */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
               {/* FAQ accordion — 2/3 width */}
               <div className="lg:col-span-2 opacity-0-init animate-fade-in-up delay-300">
                  <div className="overflow-hidden rounded-3xl border border-gray-100/80 bg-white/70 shadow-xl shadow-gray-100/60 backdrop-blur-sm divide-y divide-gray-100">
                     {filtered.map((faq, i) => (
                        <FaqItem
                           key={i}
                           faq={faq}
                           index={i}
                           isOpen={openIndex === i}
                           onToggle={() =>
                              setOpenIndex(openIndex === i ? null : i)
                           }
                        />
                     ))}
                  </div>
               </div>

               {/* Right support card — 1/3 width */}
               <div className="opacity-0-init animate-fade-in-up delay-500 flex flex-col gap-5">
                  {/* Still have questions card */}
                  <div className="rounded-3xl border border-gray-100/80 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
                     <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                        <MessageCircle
                           className="h-6 w-6 text-emerald-600"
                           strokeWidth={1.8}
                        />
                     </div>
                     <h3 className="mb-2 text-base font-extrabold text-gray-900">
                        Still have questions?
                     </h3>
                     <p className="mb-5 text-sm leading-relaxed text-gray-500">
                        Our team typically responds within a few hours. Reach
                        out and we'll help you personally.
                     </p>
                     <a
                        href="mailto:hello@fixmystore.com"
                        className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700"
                     >
                        <Mail className="h-4 w-4" />
                        hello@fixmystore.com
                     </a>
                  </div>

                  {/* Quick stats card */}
                  <div className="rounded-3xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50/80 to-teal-50/60 p-6 shadow-lg backdrop-blur-sm">
                     <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500">
                        <Zap className="h-6 w-6 text-white" strokeWidth={2} />
                     </div>
                     <h3 className="mb-4 text-base font-extrabold text-gray-900">
                        Why store owners trust us
                     </h3>
                     <div className="space-y-3">
                        {[
                           { label: "Audit completion time", value: "< 60s" },
                           { label: "Avg. issues found", value: "75+" },
                           { label: "Stores audited", value: "500+" },
                           { label: "Customer rating", value: "4.9 ★" },
                        ].map((stat, i) => (
                           <div
                              key={i}
                              className="flex items-center justify-between"
                           >
                              <span className="text-xs text-gray-500">
                                 {stat.label}
                              </span>
                              <span className="text-xs font-bold text-emerald-700">
                                 {stat.value}
                              </span>
                           </div>
                        ))}
                     </div>
                     <button className="mt-5 w-full flex items-center justify-center gap-2 rounded-2xl bg-gray-900 px-5 py-3 text-sm font-bold text-white shadow transition-all duration-200 hover:bg-emerald-600 hover:scale-[1.02] active:scale-95">
                        Start Free Audit →
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
