import { ExternalLink } from "lucide-react";
import { useState } from "react";

const delayClasses = ["delay-200", "delay-400"];

export default function CompanyCard({ company, index }) {
   const [tilt, setTilt] = useState({ x: 0, y: 0 });

   const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
      const y = ((e.clientX - rect.left) / rect.width - 0.5) * -10;
      setTilt({ x, y });
   };

   const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

   return (
      <div
         onMouseMove={handleMouseMove}
         onMouseLeave={handleMouseLeave}
         className={`opacity-0-init animate-fade-in-up ${delayClasses[index]} group relative flex flex-col rounded-3xl border border-gray-100/80 bg-white/80 shadow-lg backdrop-blur-sm transition-shadow duration-300 overflow-hidden hover:shadow-2xl ${company.glowColor}`}
         style={{
            transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 0.15s ease, box-shadow 0.3s ease",
         }}
      >
         {/* Top gradient accent bar */}
         <div className={`h-1 w-full bg-gradient-to-r ${company.accentBar}`} />

         {/* Tag pills */}
         <div className="flex flex-wrap gap-2 px-6 pt-5">
            {company.tags.map((tag, i) => (
               <span
                  key={i}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ${tag.color}`}
               >
                  <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                  {tag.label}
               </span>
            ))}
         </div>

         {/* Brand banner */}
         <div
            className="relative mx-6 mt-4 h-44 overflow-hidden rounded-2xl"
            style={{
               background: `linear-gradient(135deg, ${company.bannerFrom}, ${company.bannerVia}, ${company.bannerTo})`,
            }}
         >
            {/* Animated glow orbs inside banner */}
            <div className="absolute inset-0 overflow-hidden">
               <div
                  className="animate-float absolute -top-8 -left-8 h-32 w-32 rounded-full opacity-30 blur-2xl"
                  style={{ backgroundColor: company.bannerVia }}
               />
               <div
                  className="animate-float-reverse absolute -bottom-8 -right-8 h-28 w-28 rounded-full opacity-25 blur-2xl"
                  style={{ backgroundColor: company.bannerTo }}
               />
            </div>

            {/* Logo circle */}
            <div className="absolute inset-0 flex items-center justify-center">
               <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full ${company.logoBg} shadow-2xl ring-4 ring-white/20 transition-transform duration-300 group-hover:scale-110`}
               >
                  <span className="text-xl font-black text-white tracking-tight">
                     {company.logoInitials}
                  </span>
               </div>
            </div>

            {/* Stat badge */}
            <div className="absolute bottom-3 right-3 rounded-xl bg-black/30 px-3 py-1.5 backdrop-blur-sm">
               <p className="text-xs font-black text-white">
                  {company.stat.value}
               </p>
               <p className="text-[10px] text-white/70">{company.stat.label}</p>
            </div>
         </div>

         {/* Content */}
         <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
            <h3 className="mb-2 text-xl font-extrabold text-gray-900">
               {company.name}
            </h3>
            <p className="flex-1 text-sm leading-relaxed text-gray-500">
               {company.desc}
            </p>

            {/* Link */}
            <a
               href={`https://${company.link}`}
               target="_blank"
               rel="noopener noreferrer"
               className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 hover:gap-2.5 ${company.linkColor}`}
            >
               <ExternalLink className="h-3.5 w-3.5" />
               {company.link}
            </a>
         </div>
      </div>
   );
}
