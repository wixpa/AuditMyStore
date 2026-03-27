import CompanyCard from "./CompanyCard";
import StickyCtaButton from "./StickyCtaButton";

const companies = [
   {
      tags: [
         {
            label: "Shopify agency",
            color: "bg-cyan-50 text-cyan-600 ring-cyan-200",
         },
         {
            label: "Conversion focused",
            color: "bg-orange-50 text-orange-600 ring-orange-200",
         },
         { label: "2024", color: "bg-pink-50 text-pink-500 ring-pink-200" },
      ],
      bannerFrom: "#7c2d12",
      bannerVia: "#c2410c",
      bannerTo: "#ea580c",
      logoInitials: "AB",
      logoBg: "bg-orange-500",
      name: "ConversionAB",
      desc: "We are the team behind ConversionAB, where we help Shopify stores improve sales by increasing conversion rate, optimizing offers, and removing friction from the buyer journey.",
      link: "conversionab.com",
      linkColor: "text-orange-500 hover:text-orange-600",
      accentBar: "from-orange-400 to-red-400",
      glowColor: "hover:shadow-orange-100/80",
      stat: { value: "300+", label: "Stores Helped" },
   },
   {
      tags: [
         {
            label: "Shopify app studio",
            color: "bg-indigo-50 text-indigo-600 ring-indigo-200",
         },
         { label: "25+ Apps", color: "bg-sky-50 text-sky-600 ring-sky-200" },
         {
            label: "2019",
            color: "bg-violet-50 text-violet-500 ring-violet-200",
         },
      ],
      bannerFrom: "#0c0a3e",
      bannerVia: "#1e3a8a",
      bannerTo: "#1d4ed8",
      logoInitials: "FA",
      logoBg: "bg-blue-500",
      name: "Final Apps",
      desc: "We also own Final Apps, where we create powerful Shopify apps designed to simplify store management, enhance everyday operations, and help merchants scale with confidence.",
      link: "appsfinal.com",
      linkColor: "text-blue-500 hover:text-blue-600",
      accentBar: "from-blue-400 to-indigo-500",
      glowColor: "hover:shadow-blue-100/80",
      stat: { value: "25+", label: "Shopify Apps" },
   },
];

export default function WhoWeAreSection() {
   return (
      <section className="relative w-full overflow-hidden py-28">
         {/* ── BACKGROUND ── */}
         <div className="absolute inset-0 -z-10">
            <div
               className="absolute inset-0"
               style={{
                  background: `
              radial-gradient(ellipse 70% 55% at 5% 5%, rgba(186,230,255,0.42) 0%, transparent 55%),
              radial-gradient(ellipse 60% 50% at 95% 10%, rgba(167,243,208,0.32) 0%, transparent 55%),
              radial-gradient(ellipse 55% 45% at 50% 100%, rgba(224,231,255,0.30) 0%, transparent 55%),
              radial-gradient(ellipse 45% 40% at 85% 80%, rgba(254,226,226,0.20) 0%, transparent 50%),
              linear-gradient(150deg, #f0f9ff 0%, #ecfdf5 30%, #eef2ff 65%, #fff1f2 100%)
            `,
               }}
            />

            {/* Dot grid */}
            <div
               className="absolute inset-0 opacity-[0.06]"
               style={{
                  backgroundImage: `radial-gradient(circle, #60a5fa 1px, transparent 1px)`,
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
            <div className="animate-float absolute -top-20 left-1/4 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl" />
            <div className="animate-float-reverse absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-indigo-200/25 blur-3xl" />
            <div className="animate-float absolute top-1/2 left-0 h-56 w-56 rounded-full bg-orange-100/25 blur-3xl" />

            {/* Rings */}
            <div className="absolute top-10 right-[7%] h-28 w-28 rounded-full border border-sky-200/50 opacity-70" />
            <div className="absolute top-16 right-[8.5%] h-14 w-14 rounded-full border border-sky-300/40 opacity-60" />
            <div className="absolute bottom-14 left-[6%] h-20 w-20 rounded-full border border-indigo-200/50 opacity-70" />
            <div className="absolute bottom-20 left-[7.5%] h-10 w-10 rounded-full border border-indigo-300/40 opacity-60" />

            {/* Floating crosses */}
            <svg
               className="animate-float absolute top-[18%] left-[5%] opacity-15"
               width="18"
               height="18"
               viewBox="0 0 20 20"
            >
               <path
                  d="M10 2v16M2 10h16"
                  stroke="#38bdf8"
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
                  stroke="#818cf8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
               />
            </svg>
            <svg
               className="animate-float absolute top-[55%] left-[3%] opacity-12"
               width="14"
               height="14"
               viewBox="0 0 20 20"
            >
               <path
                  d="M10 2v16M2 10h16"
                  stroke="#fb923c"
                  strokeWidth="2.5"
                  strokeLinecap="round"
               />
            </svg>

            {/* Diamonds */}
            <div className="animate-float-reverse absolute top-[32%] right-[3%] h-3.5 w-3.5 rotate-45 border border-sky-400/40 opacity-60" />
            <div className="animate-float absolute top-[15%] right-[10%] h-2.5 w-2.5 rotate-45 bg-indigo-300/30 opacity-60" />
            <div className="animate-float-reverse absolute bottom-[38%] left-[4%] h-3 w-3 rotate-45 border border-orange-300/35 opacity-60" />
            <div className="animate-float absolute bottom-[15%] left-[12%] h-2 w-2 rounded-full bg-sky-400/35 opacity-70" />
         </div>

         {/* Sticky CTA */}
         <StickyCtaButton />

         <div className="mx-auto max-w-5xl px-4">
            {/* ── HEADING ── */}
            <div className="opacity-0-init animate-fade-in-up delay-100 mb-16 text-center">
               <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-sky-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky-700 shadow-sm backdrop-blur-sm">
                  ✦ The Team Behind It
               </span>
               <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-[54px]">
                  Who we{" "}
                  <span className="relative inline-block">
                     are?
                     <svg
                        className="absolute -bottom-2 left-0 w-full"
                        viewBox="0 0 100 12"
                        fill="none"
                        preserveAspectRatio="none"
                     >
                        <path
                           d="M2 8 C20 2, 45 12, 65 6 S88 2, 98 7"
                           stroke="#10b981"
                           strokeWidth="3"
                           strokeLinecap="round"
                        />
                     </svg>
                  </span>
               </h2>
               <p className="mt-5 text-base text-gray-500 max-w-lg mx-auto leading-relaxed">
                  We're a team of Shopify experts obsessed with one thing —
                  helping merchants grow faster with less guesswork.
               </p>
            </div>

            {/* ── COMPANY CARDS ── */}
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
               {companies.map((company, i) => (
                  <CompanyCard key={i} company={company} index={i} />
               ))}
            </div>

            {/* ── MISSION STRIP ── */}
            <div className="opacity-0-init animate-fade-in-up delay-600 mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl border border-gray-100/80 bg-white/60 px-8 py-6 shadow-lg backdrop-blur-sm">
               <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                     Our Mission
                  </p>
                  <p className="text-base font-extrabold text-gray-900 max-w-md leading-snug">
                     Make every Shopify store perform like it was built by a
                     world-class CRO team.
                  </p>
               </div>
               <div className="flex items-center gap-6 flex-shrink-0">
                  {[
                     { value: "500+", label: "Stores" },
                     { value: "25+", label: "Apps" },
                     { value: "5★", label: "Rating" },
                  ].map((s, i) => (
                     <div key={i} className="text-center">
                        <p className="text-xl font-black text-gray-900">
                           {s.value}
                        </p>
                        <p className="text-[11px] text-gray-400">{s.label}</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
}
