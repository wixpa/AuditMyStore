import BadgeStrip from "./BadgeStrip";
import AuditInput from "./AuditInput";
import FeatureCards from "./FeatureCards";

export default function HeroSection() {
   return (
      <section className="relative min-h-screen w-full overflow-hidden">
         {/* ── BACKGROUND LAYER ── */}
         <div className="absolute inset-0 -z-10">
            {/* Mesh gradient base */}
            <div
               className="absolute inset-0"
               style={{
                  background: `
              radial-gradient(ellipse 80% 60% at 10% 0%, rgba(167,243,208,0.55) 0%, transparent 60%),
              radial-gradient(ellipse 60% 50% at 90% 5%, rgba(186,230,255,0.50) 0%, transparent 55%),
              radial-gradient(ellipse 70% 60% at 50% 100%, rgba(209,250,229,0.45) 0%, transparent 60%),
              radial-gradient(ellipse 50% 40% at 80% 60%, rgba(224,242,254,0.40) 0%, transparent 50%),
              linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 30%, #f0f9ff 60%, #f8fafc 100%)
            `,
               }}
            />

            {/* Dot grid pattern */}
            <div
               className="absolute inset-0 opacity-[0.07]"
               style={{
                  backgroundImage: `radial-gradient(circle, #6ee7b7 1px, transparent 1px)`,
                  backgroundSize: "28px 28px",
               }}
            />

            {/* Animated blobs */}
            <div className="animate-float absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-200/50 blur-3xl" />
            <div className="animate-float-reverse absolute top-10 right-10 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />
            <div className="animate-float absolute bottom-10 left-1/3 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl" />
            <div className="animate-float-reverse absolute bottom-20 right-1/4 h-60 w-60 rounded-full bg-cyan-200/30 blur-3xl" />

            {/* Decorative rings — left */}
            <div className="absolute top-20 left-[5%] h-32 w-32 rounded-full border border-emerald-200/60 opacity-60" />
            <div className="absolute top-28 left-[6.5%] h-16 w-16 rounded-full border border-emerald-300/40 opacity-50" />

            {/* Decorative rings — right */}
            <div className="absolute bottom-32 right-[6%] h-24 w-24 rounded-full border border-sky-200/60 opacity-60" />
            <div className="absolute bottom-36 right-[7.2%] h-12 w-12 rounded-full border border-sky-300/40 opacity-50" />

            {/* Floating plus/cross icons */}
            <svg
               className="animate-float absolute top-[18%] left-[12%] opacity-20"
               width="20"
               height="20"
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
               className="animate-float-reverse absolute top-[30%] right-[10%] opacity-20"
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
            <svg
               className="animate-float absolute bottom-[25%] left-[8%] opacity-15"
               width="14"
               height="14"
               viewBox="0 0 20 20"
            >
               <path
                  d="M10 2v16M2 10h16"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
               />
            </svg>

            {/* Floating diamonds */}
            <div className="animate-float-reverse absolute top-[40%] left-[4%] h-3 w-3 rotate-45 border border-emerald-400/40 opacity-50" />
            <div className="animate-float absolute top-[20%] right-[5%] h-4 w-4 rotate-45 border border-sky-400/40 opacity-50" />
            <div className="animate-float-reverse absolute bottom-[35%] right-[3%] h-2.5 w-2.5 rotate-45 bg-emerald-300/30 opacity-60" />

            {/* Floating dots */}
            <div className="animate-float absolute top-[55%] left-[6%] h-2 w-2 rounded-full bg-emerald-400/50" />
            <div className="animate-float-reverse absolute top-[65%] right-[8%] h-2.5 w-2.5 rounded-full bg-sky-400/50" />
            <div className="animate-float absolute top-[12%] right-[18%] h-1.5 w-1.5 rounded-full bg-teal-400/60" />
         </div>

         {/* ── MAIN CONTENT ── */}
         <div className="mx-auto flex max-w-4xl flex-col items-center px-4 pt-28 pb-20 text-center">
            {/* Badge */}
            <div className="opacity-0-init animate-fade-in-up delay-100">
               <BadgeStrip />
            </div>

            {/* Heading */}
            <div className="opacity-0-init animate-fade-in-up delay-200 mt-8">
               <h1 className="text-5xl font-extrabold leading-[1.08] tracking-tight text-gray-900 sm:text-6xl md:text-[72px]">
                  AI-Powered <span className="animate-shimmer">Store</span>
                  <br />
                  <span className="text-gray-900">Growth</span>{" "}
                  <span className="relative inline-block">
                     Audit
                     {/* Squiggly underline */}
                     <svg
                        className="absolute -bottom-2 left-0 w-full"
                        viewBox="0 0 300 12"
                        fill="none"
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           d="M2 8 C50 2, 100 12, 150 6 S250 2, 298 7"
                           stroke="#10b981"
                           strokeWidth="3"
                           strokeLinecap="round"
                           fill="none"
                        />
                     </svg>
                  </span>
               </h1>
            </div>

            {/* Subtitle */}
            <p className="opacity-0-init animate-fade-in-up delay-300 mt-8 max-w-xl text-lg leading-relaxed text-gray-500">
               Instant AI analysis. Expert human review. Actionable fixes that
               actually move your{" "}
               <span className="font-semibold text-gray-700">
                  revenue needle
               </span>
               .
            </p>

            {/* Micro trust indicators */}
            <div className="opacity-0-init animate-fade-in-up delay-400 mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
               {[
                  { icon: "⚡", text: "Results in 60s" },
                  { icon: "🔒", text: "No signup needed" },
                  { icon: "✅", text: "100% Free audit" },
               ].map((item, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                     <span>{item.icon}</span>
                     <span className="font-medium">{item.text}</span>
                  </span>
               ))}
            </div>

            {/* Input */}
            <div className="opacity-0-init animate-fade-in-up delay-500 w-full">
               <AuditInput />
            </div>

            {/* Feature Cards */}
            <div className="opacity-0-init animate-fade-in-up delay-600 w-full">
               <FeatureCards />
            </div>

            {/* Shopify Partner Badge */}
            <div className="opacity-0-init animate-fade-in-up delay-700 mt-14 flex items-center gap-2 opacity-50 grayscale transition-all duration-500 hover:opacity-90 hover:grayscale-0 cursor-pointer">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 109.5 124.5"
                  className="h-7 w-7"
               >
                  <path
                     fill="#95BF47"
                     d="M74.7 14.8s-1.4.4-3.7 1.1c-.4-1.3-1-2.8-1.8-4.4-2.7-5.1-6.6-7.8-11.3-7.8-.3 0-.6 0-1 .1-.1-.2-.3-.3-.4-.5-2-2.2-4.6-3.2-7.7-3.1-6 .2-12 4.5-16.8 12.2-3.4 5.4-6 12.2-6.7 17.5-6.9 2.1-11.7 3.6-11.8 3.7-3.5 1.1-3.6 1.2-4 4.5C9.2 40.7 0 111.5 0 111.5l75.6 13V14.6c-.3.1-.6.1-.9.2zm-17.4 5.3c-4 1.2-8.4 2.6-12.7 3.9 1.2-4.7 3.6-9.4 6.4-12.5 1.1-1.1 2.6-2.4 4.3-3.1 1.7 3.4 2.1 8.1 2 11.7zm-8.4-15.9c1.4 0 2.6.3 3.6.9-1.6.8-3.2 2.1-4.7 3.6-3.8 4.1-6.7 10.5-7.9 16.6-3.6 1.1-7.2 2.2-10.5 3.2 1.9-9.2 9-23.9 19.5-24.3zm-3.6 53.8c.4 6.4 17.3 7.8 18.3 22.9.7 11.9-6.3 20-16.4 20.6-12.2.8-18.9-6.4-18.9-6.4l2.6-11s6.7 5.1 12.1 4.7c3.5-.2 4.8-3.1 4.7-5.1-.5-8.4-14.3-7.9-15.2-21.7-.8-11.6 6.9-23.4 23.7-24.5 6.5-.4 9.8 1.2 9.8 1.2l-3.8 14.5s-4.3-2-9.4-1.6c-7.4.5-7.5 5.2-7.5 6.4zm29.2-37.3c0-3.3-.4-8-1.9-12 4.8.9 7.1 6.3 8.1 9.6-1.9.6-3.9 1.2-6.2 2v.4z"
                  />
                  <path
                     fill="#5E8E3E"
                     d="M75.5 124.5l34-8.5S96.1 21.9 96 21.1c-.1-.8-.8-1.3-1.5-1.3-1.1 0-4.2-.1-6.4-.1-2.6 0-3.4 0-3.4 0-1.7-4.7-4.6-8.8-9.2-11.2v116z"
                  />
               </svg>
               <span className="text-sm font-semibold text-gray-600 tracking-wide">
                  shopify <span className="font-light">partners</span>
               </span>
            </div>
         </div>
      </section>
   );
}
