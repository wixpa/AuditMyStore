import FixCard from "./FixCard";
import {
   BarChart3,
   SearchCheck,
   Smartphone,
   Gauge,
   LayoutGrid,
} from "lucide-react";

const cards = [
   {
      icon: BarChart3,
      iconBg: "bg-lime-100",
      iconColor: "text-lime-600",
      borderAccent: "border-t-lime-400",
      glow: "hover:shadow-lime-100/80",
      tag: "bg-lime-50 text-lime-600 ring-lime-200",
      badge: "12",
      title: "AI CRO Audit",
      desc: "Specific suggestions to convert more visitors into paying customers — from layout to trust signals.",
   },
   {
      icon: SearchCheck,
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
      borderAccent: "border-t-cyan-400",
      glow: "hover:shadow-cyan-100/80",
      tag: "bg-cyan-50 text-cyan-600 ring-cyan-200",
      badge: "9",
      title: "AI SEO Audit",
      desc: "Get discovered on ChatGPT, Google & other AI models with targeted on-page SEO improvements.",
   },
   {
      icon: Smartphone,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      borderAccent: "border-t-violet-400",
      glow: "hover:shadow-violet-100/80",
      tag: "bg-violet-50 text-violet-600 ring-violet-200",
      badge: "7",
      title: "Mobile Experience Audit",
      desc: "Fix issues that affect mobile shoppers and improve your store's usability across all screen sizes.",
   },
   {
      icon: Gauge,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      borderAccent: "border-t-amber-400",
      glow: "hover:shadow-amber-100/80",
      tag: "bg-amber-50 text-amber-600 ring-amber-200",
      badge: "15",
      title: "Page Speed Audit",
      desc: "Identify exactly what slows down your store and get actionable steps to cut loading time fast.",
   },
   {
      icon: LayoutGrid,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      borderAccent: "border-t-emerald-400",
      glow: "hover:shadow-emerald-100/80",
      tag: "bg-emerald-50 text-emerald-600 ring-emerald-200",
      badge: "11",
      title: "AI App Performance Audit",
      desc: "Find heavy or unnecessary apps that hurt speed and block conversions — and replace them smarter.",
   },
];

export default function WhatCanFixSection() {
   return (
      <section className="relative w-full overflow-hidden py-28">
         {/* ── BACKGROUND ── */}
         <div className="absolute inset-0 -z-10">
            <div
               className="absolute inset-0"
               style={{
                  background: `
              radial-gradient(ellipse 70% 50% at 15% 10%, rgba(167,243,208,0.32) 0%, transparent 55%),
              radial-gradient(ellipse 55% 45% at 85% 15%, rgba(186,230,255,0.28) 0%, transparent 50%),
              radial-gradient(ellipse 60% 50% at 10% 90%, rgba(221,214,254,0.22) 0%, transparent 55%),
              radial-gradient(ellipse 50% 40% at 90% 85%, rgba(254,240,138,0.20) 0%, transparent 50%),
              linear-gradient(150deg, #ecfdf5 0%, #f0fdfa 25%, #f0f9ff 55%, #faf5ff 80%, #fffbeb 100%)
            `,
               }}
            />

            {/* Dot grid */}
            <div
               className="absolute inset-0 opacity-[0.065]"
               style={{
                  backgroundImage: `radial-gradient(circle, #34d399 1px, transparent 1px)`,
                  backgroundSize: "30px 30px",
               }}
            />

            {/* Noise grain */}
            <div
               className="absolute inset-0 opacity-[0.016]"
               style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  backgroundSize: "128px 128px",
               }}
            />

            {/* Blobs */}
            <div className="animate-float absolute top-10 left-1/4 h-72 w-72 rounded-full bg-emerald-200/25 blur-3xl" />
            <div className="animate-float-reverse absolute bottom-10 right-1/4 h-64 w-64 rounded-full bg-violet-200/20 blur-3xl" />
            <div className="animate-float absolute top-1/2 right-0 h-56 w-56 rounded-full bg-sky-200/20 blur-3xl" />
            <div className="animate-float-reverse absolute bottom-0 left-0 h-52 w-52 rounded-full bg-amber-200/15 blur-3xl" />

            {/* Decorative rings */}
            <div className="absolute top-10 left-[6%] h-24 w-24 rounded-full border border-emerald-200/50 opacity-70" />
            <div className="absolute top-14 left-[7.5%] h-12 w-12 rounded-full border border-emerald-300/40 opacity-60" />
            <div className="absolute bottom-16 right-[6%] h-20 w-20 rounded-full border border-violet-200/50 opacity-70" />
            <div className="absolute bottom-20 right-[7.5%] h-10 w-10 rounded-full border border-violet-300/40 opacity-60" />

            {/* Floating crosses */}
            <svg
               className="animate-float absolute top-[20%] left-[5%] opacity-15"
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
               className="animate-float-reverse absolute bottom-[25%] right-[5%] opacity-15"
               width="16"
               height="16"
               viewBox="0 0 20 20"
            >
               <path
                  d="M10 2v16M2 10h16"
                  stroke="#8b5cf6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
               />
            </svg>
            <svg
               className="animate-float absolute top-[60%] left-[3%] opacity-15"
               width="14"
               height="14"
               viewBox="0 0 20 20"
            >
               <path
                  d="M10 2v16M2 10h16"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
               />
            </svg>

            {/* Floating diamonds */}
            <div className="animate-float-reverse absolute top-[35%] right-[3%] h-3.5 w-3.5 rotate-45 border border-sky-400/40 opacity-60" />
            <div className="animate-float absolute top-[15%] right-[10%] h-2.5 w-2.5 rotate-45 bg-emerald-300/30 opacity-60" />
            <div className="animate-float-reverse absolute bottom-[40%] left-[4%] h-3 w-3 rotate-45 border border-amber-400/40 opacity-60" />
         </div>

         <div className="mx-auto max-w-6xl px-4">
            {/* ── HEADING ── */}
            <div className="opacity-0-init animate-fade-in-up delay-100 mb-16 text-center">
               <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700 shadow-sm backdrop-blur-sm">
                  ✦ Full Store Coverage
               </span>
               <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-[54px]">
                  What can we{" "}
                  <span className="relative inline-block">
                     fix?
                     <svg
                        className="absolute -bottom-2 left-0 w-full"
                        viewBox="0 0 120 12"
                        fill="none"
                        preserveAspectRatio="none"
                     >
                        <path
                           d="M2 8 C25 2, 55 12, 80 6 S108 2, 118 7"
                           stroke="#10b981"
                           strokeWidth="3"
                           strokeLinecap="round"
                        />
                     </svg>
                  </span>
               </h2>
               <p className="mt-5 text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
                  Our AI tool analyzes your entire store to boost conversions,
                  improve your ChatGPT &amp; SEO visibility, speed up
                  performance, and remove apps that slow things down.
               </p>
            </div>

            {/* ── TOP ROW — 3 cards ── */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
               {cards.slice(0, 3).map((card, i) => (
                  <FixCard key={i} card={card} index={i} />
               ))}
            </div>

            {/* ── BOTTOM ROW — 2 cards centered ── */}
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:mx-auto sm:max-w-2xl">
               {cards.slice(3).map((card, i) => (
                  <FixCard key={i + 3} card={card} index={i + 3} />
               ))}
            </div>
         </div>
      </section>
   );
}
