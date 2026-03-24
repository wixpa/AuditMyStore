import { useState } from "react";
import AudienceRow from "./AudienceRow";
import { Store, Truck, Building2, Megaphone } from "lucide-react";

const audience = [
   {
      id: "store-owners",
      icon: Store,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      accentBar: "bg-emerald-400",
      accentText: "text-emerald-600",
      accentBg: "bg-emerald-50",
      accentRing: "ring-emerald-200",
      filterLabel: "Store Owners",
      emoji: "🏪",
      title: "Shopify Store Owners",
      desc: "Find opportunities to improve the overall performance and sales of your store. Get a complete picture of every issue that's silently blocking your revenue — from slow pages to poor mobile UX.",
      perks: ["Full store scan", "Revenue impact score", "Priority fix list"],
   },
   {
      id: "agency-owners",
      icon: Building2,
      iconBg: "bg-sky-100",
      iconColor: "text-sky-600",
      accentBar: "bg-sky-400",
      accentText: "text-sky-600",
      accentBg: "bg-sky-50",
      accentRing: "ring-sky-200",
      filterLabel: "Agency Owners",
      emoji: "🏢",
      title: "Agency Owners",
      desc: "Help your clients increase revenue by identifying and fixing exactly what's blocking their sales. Deliver AI-backed audit reports that wow clients and justify your retainer fees.",
      perks: [
         "White-label reports",
         "Client-ready insights",
         "Bulk store audits",
      ],
   },
   {
      id: "dropshippers",
      icon: Truck,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      accentBar: "bg-amber-400",
      accentText: "text-amber-600",
      accentBg: "bg-amber-50",
      accentRing: "ring-amber-200",
      filterLabel: "Dropshippers",
      emoji: "🚚",
      title: "Dropshippers",
      desc: "Optimize every touchpoint in your store to turn every click into a sale. Identify conversion blockers, fix product pages, and increase your ROAS to its absolute peak.",
      perks: ["Product page audit", "CRO suggestions", "Ad spend optimizer"],
   },
   {
      id: "marketers",
      icon: Megaphone,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      accentBar: "bg-violet-400",
      accentText: "text-violet-600",
      accentBg: "bg-violet-50",
      accentRing: "ring-violet-200",
      filterLabel: "Marketers",
      emoji: "📣",
      title: "Marketers",
      desc: "Discover exactly what's wrong with your store's marketing funnel. Get clear, actionable steps to fix landing pages, improve CTAs, and scale campaigns with confidence.",
      perks: ["Funnel analysis", "CTA audit", "Landing page fixes"],
   },
];

export default function WhoIsItForSection() {
   const [active, setActive] = useState(null);

   return (
      <section className="relative w-full overflow-hidden py-28">
         {/* ── BACKGROUND ── */}
         <div className="absolute inset-0 -z-10">
            <div
               className="absolute inset-0"
               style={{
                  background: `
              radial-gradient(ellipse 75% 55% at 5% 0%, rgba(254,243,199,0.45) 0%, transparent 55%),
              radial-gradient(ellipse 60% 50% at 95% 10%, rgba(167,243,208,0.38) 0%, transparent 55%),
              radial-gradient(ellipse 55% 45% at 10% 95%, rgba(186,230,255,0.32) 0%, transparent 55%),
              radial-gradient(ellipse 50% 40% at 90% 90%, rgba(221,214,254,0.28) 0%, transparent 50%),
              linear-gradient(155deg, #fffbeb 0%, #f0fdf4 30%, #f0f9ff 65%, #faf5ff 100%)
            `,
               }}
            />

            {/* Dot grid */}
            <div
               className="absolute inset-0 opacity-[0.06]"
               style={{
                  backgroundImage: `radial-gradient(circle, #fbbf24 1px, transparent 1px)`,
                  backgroundSize: "30px 30px",
               }}
            />

            {/* Noise grain */}
            <div
               className="absolute inset-0 opacity-[0.015]"
               style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  backgroundSize: "128px 128px",
               }}
            />

            {/* Blobs */}
            <div className="animate-float absolute -top-16 right-1/3 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />
            <div className="animate-float-reverse absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-emerald-200/25 blur-3xl" />
            <div className="animate-float absolute top-1/2 right-0 h-56 w-56 rounded-full bg-violet-200/20 blur-3xl" />

            {/* Decorative rings */}
            <div className="absolute top-10 left-[6%] h-24 w-24 rounded-full border border-amber-200/60 opacity-70" />
            <div className="absolute top-14 left-[7.5%] h-12 w-12 rounded-full border border-amber-300/40 opacity-60" />
            <div className="absolute bottom-14 right-[6%] h-20 w-20 rounded-full border border-violet-200/50 opacity-70" />
            <div className="absolute bottom-18 right-[7.5%] h-10 w-10 rounded-full border border-violet-300/40 opacity-60" />

            {/* Floating crosses */}
            <svg
               className="animate-float absolute top-[20%] left-[4%] opacity-15"
               width="18"
               height="18"
               viewBox="0 0 20 20"
            >
               <path
                  d="M10 2v16M2 10h16"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
               />
            </svg>
            <svg
               className="animate-float-reverse absolute bottom-[22%] right-[4%] opacity-15"
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

            {/* Floating dots & diamonds */}
            <div className="animate-float-reverse absolute top-[35%] right-[3%] h-3.5 w-3.5 rotate-45 border border-amber-400/40 opacity-60" />
            <div className="animate-float absolute top-[14%] right-[9%] h-2.5 w-2.5 rotate-45 bg-emerald-300/35 opacity-60" />
            <div className="animate-float-reverse absolute bottom-[38%] left-[3.5%] h-3 w-3 rotate-45 border border-sky-400/35 opacity-60" />
            <div className="animate-float absolute bottom-[14%] left-[11%] h-2 w-2 rounded-full bg-violet-400/30 opacity-70" />
            <div className="animate-float-reverse absolute top-[55%] left-[7%] h-1.5 w-1.5 rounded-full bg-amber-400/40 opacity-70" />
         </div>

         <div className="mx-auto max-w-5xl px-4">
            {/* ── HEADING ── */}
            <div className="opacity-0-init animate-fade-in-up delay-100 mb-14 text-center">
               <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200/70 bg-amber-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-700 shadow-sm backdrop-blur-sm">
                  ✦ Made For You
               </span>
               <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-[54px]">
                  Who is it{" "}
                  <span className="relative inline-block">
                     for?
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
                  Whether you own a store, manage clients, run dropshipping, or
                  scale ads — there's a clear win here for you.
               </p>
            </div>

            {/* ── FILTER TABS ── */}
            <div className="opacity-0-init animate-fade-in-up delay-200 mb-10 flex flex-wrap justify-center gap-2">
               {audience.map((item) => (
                  <button
                     key={item.id}
                     onClick={() =>
                        setActive(active === item.id ? null : item.id)
                     }
                     className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200
                ${
                   active === item.id
                      ? `${item.accentBg} ${item.accentText} ring-1 ${item.accentRing} border-transparent shadow-sm scale-105`
                      : "border-gray-200 bg-white/70 text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
                  >
                     <span>{item.emoji}</span>
                     {item.filterLabel}
                  </button>
               ))}
            </div>

            {/* ── AUDIENCE ROWS ── */}
            <div className="overflow-hidden rounded-3xl border border-gray-100/80 bg-white/60 shadow-xl shadow-gray-100/60 backdrop-blur-sm divide-y divide-gray-100/80">
               {audience.map((item, i) => (
                  <AudienceRow
                     key={item.id}
                     item={item}
                     index={i}
                     isActive={active === item.id}
                     onHover={() => setActive(item.id)}
                     onLeave={() => setActive(null)}
                  />
               ))}
            </div>

            {/* ── BOTTOM CTA ── */}
            <div className="opacity-0-init animate-fade-in-up delay-700 mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
               <p className="text-sm text-gray-500">
                  Trusted by{" "}
                  <span className="font-bold text-gray-800">500+</span> store
                  owners, agencies & marketers
               </p>
               <span className="hidden sm:block h-4 w-px bg-gray-300" />
               <button className="flex items-center gap-2 rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-600 hover:scale-[1.02] active:scale-95">
                  Get My Free Audit →
               </button>
            </div>
         </div>
      </section>
   );
}
