import StepCard from "./StepCard";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const steps = [
   {
      number: "01",
      accent: "border-t-emerald-400",
      glow: "hover:shadow-emerald-200/60",
      badge: "bg-emerald-100 text-emerald-700 ring-emerald-200",
      title: "Enter Your Store URL",
      desc: "Paste your Shopify store URL and let our AI engine begin scanning every corner of your store in seconds.",
      visual: <StepOne />,
   },
   {
      number: "02",
      accent: "border-t-sky-400",
      glow: "hover:shadow-sky-200/60",
      badge: "bg-sky-100 text-sky-700 ring-sky-200",
      title: "Get a Smart Report",
      desc: "AI audits SEO, speed, CRO, mobile UX and more — compiling everything into one clear, prioritized report.",
      visual: <StepTwo />,
   },
   {
      number: "03",
      accent: "border-t-violet-400",
      glow: "hover:shadow-violet-200/60",
      badge: "bg-violet-100 text-violet-700 ring-violet-200",
      title: "Optimize Your Store",
      desc: "Get personalized fixes, expert action steps and recommendations that directly boost conversions and revenue.",
      visual: <StepThree />,
   },
];

export default function HowItWorksSection() {
   return (
      <section className="relative w-full overflow-hidden py-28">
         {/* ── BACKGROUND ── */}
         <div className="absolute inset-0 -z-10">
            {/* Rich linear + radial mesh */}
            <div
               className="absolute inset-0"
               style={{
                  background: `
              radial-gradient(ellipse 65% 55% at 0% 0%, rgba(52,211,153,0.28) 0%, transparent 55%),
              radial-gradient(ellipse 55% 50% at 100% 0%, rgba(56,189,248,0.25) 0%, transparent 55%),
              radial-gradient(ellipse 60% 45% at 50% 100%, rgba(139,92,246,0.15) 0%, transparent 55%),
              radial-gradient(ellipse 40% 40% at 80% 50%, rgba(52,211,153,0.12) 0%, transparent 50%),
              linear-gradient(135deg, #d1fae5 0%, #cffafe 35%, #e0e7ff 70%, #ede9fe 100%)
            `,
               }}
            />

            {/* Dot grid */}
            <div
               className="absolute inset-0 opacity-[0.08]"
               style={{
                  backgroundImage: `radial-gradient(circle, #34d399 1px, transparent 1px)`,
                  backgroundSize: "30px 30px",
               }}
            />

            {/* Noise grain */}
            <div
               className="absolute inset-0 opacity-[0.018]"
               style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  backgroundSize: "128px 128px",
               }}
            />

            {/* Blobs */}
            <div className="animate-float absolute -top-16 left-1/3 h-80 w-80 rounded-full bg-emerald-300/25 blur-3xl" />
            <div className="animate-float-reverse absolute top-1/2 -right-20 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />
            <div className="animate-float absolute bottom-0 left-0 h-64 w-64 rounded-full bg-violet-300/20 blur-3xl" />

            {/* Decorative rings */}
            <div className="absolute top-12 right-[8%] h-28 w-28 rounded-full border border-emerald-300/30 opacity-70" />
            <div className="absolute top-16 right-[9.5%] h-16 w-16 rounded-full border border-sky-300/30 opacity-60" />
            <div className="absolute bottom-16 left-[5%] h-20 w-20 rounded-full border border-violet-300/30 opacity-60" />

            {/* Floating shapes */}
            <svg
               className="animate-float absolute top-[15%] left-[7%] opacity-20"
               width="18"
               height="18"
               viewBox="0 0 20 20"
            >
               <path
                  d="M10 2v16M2 10h16"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
               />
            </svg>
            <svg
               className="animate-float-reverse absolute bottom-[20%] right-[7%] opacity-20"
               width="16"
               height="16"
               viewBox="0 0 20 20"
            >
               <path
                  d="M10 2v16M2 10h16"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
               />
            </svg>
            <div className="animate-float absolute top-[45%] left-[3%] h-3 w-3 rotate-45 border border-emerald-400/50 opacity-60" />
            <div className="animate-float-reverse absolute top-[25%] right-[4%] h-3.5 w-3.5 rotate-45 border border-sky-400/50 opacity-60" />
            <div className="animate-float absolute bottom-[30%] right-[12%] h-2 w-2 rounded-full bg-violet-400/50" />
            <div className="animate-float-reverse absolute top-[60%] left-[9%] h-2.5 w-2.5 rounded-full bg-emerald-400/40" />
         </div>

         <div className="mx-auto max-w-6xl px-4">
            {/* ── HEADING ── */}
            <div className="opacity-0-init animate-fade-in-up delay-100 mb-20 text-center">
               <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700 shadow-sm backdrop-blur-sm">
                  ✦ Simple 3-Step Process
               </span>
               <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-[56px]">
                  How it{" "}
                  <span className="relative inline-block">
                     works?
                     <svg
                        className="absolute -bottom-2 left-0 w-full"
                        viewBox="0 0 200 12"
                        fill="none"
                        preserveAspectRatio="none"
                     >
                        <path
                           d="M2 8 C40 2, 80 12, 120 6 S175 2, 198 7"
                           stroke="#10b981"
                           strokeWidth="3"
                           strokeLinecap="round"
                        />
                     </svg>
                  </span>
               </h2>
               <p className="mt-5 text-base text-gray-500 max-w-md mx-auto leading-relaxed">
                  From URL to actionable growth plan in under 60 seconds.
               </p>
            </div>

            {/* ── STEPS GRID ── */}
            <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
               {/* Dashed connector line (desktop) */}
               <div className="absolute top-[80px] left-[calc(16.66%+36px)] right-[calc(16.66%+36px)] hidden sm:flex items-center justify-between">
                  <div className="flex-1 border-t-2 border-dashed border-emerald-300/70" />
                  {/* Arrow head mid */}
                  <svg
                     className="mx-1 flex-shrink-0 text-emerald-400"
                     width="12"
                     height="12"
                     viewBox="0 0 12 12"
                  >
                     <path
                        d="M1 6h10M7 2l4 4-4 4"
                        stroke="#34d399"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </svg>
                  <div className="flex-1 border-t-2 border-dashed border-emerald-300/70" />
               </div>

               {steps.map((step, i) => (
                  <StepCard key={i} step={step} index={i} />
               ))}
            </div>

            {/* Bottom CTA */}
            <div className="opacity-0-init animate-fade-in-up delay-600 mt-16 flex justify-center">
               <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/60 px-6 py-4 shadow-lg backdrop-blur-sm">
                  <span className="text-sm text-gray-500">
                     Ready to find what's hurting your store?
                  </span>
                  <button className="flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-600 hover:scale-[1.02] active:scale-95">
                     Start Free Audit →
                  </button>
               </div>
            </div>
         </div>
      </section>
   );
}
