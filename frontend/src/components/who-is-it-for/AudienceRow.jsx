import { CheckCircle2 } from "lucide-react";

const delayClasses = ["delay-300", "delay-400", "delay-500", "delay-600"];

export default function AudienceRow({
   item,
   index,
   isActive,
   onHover,
   onLeave,
}) {
   const Icon = item.icon;

   return (
      <div
         onMouseEnter={onHover}
         onMouseLeave={onLeave}
         className={`opacity-0-init animate-fade-in-up ${delayClasses[index]} group relative flex flex-col sm:flex-row sm:items-center gap-5 px-7 py-7 transition-all duration-300 cursor-default
        ${isActive ? `${item.accentBg}` : "hover:bg-gray-50/80"}`}
      >
         {/* Left accent bar */}
         <div
            className={`absolute left-0 top-0 h-full w-1 rounded-l-3xl transition-all duration-300 ${
               isActive ? item.accentBar : "bg-transparent"
            }`}
         />

         {/* Icon */}
         <div
            className={`flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl ${item.iconBg} transition-transform duration-300 ${isActive ? "scale-110 rotate-6" : "group-hover:scale-105"}`}
         >
            <Icon className={`h-6 w-6 ${item.iconColor}`} strokeWidth={1.8} />
         </div>

         {/* Content */}
         <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
               <h3
                  className={`text-base font-extrabold text-gray-900 transition-colors duration-200 ${isActive ? item.accentText : ""}`}
               >
                  {item.title}
               </h3>
               <span className="text-lg">{item.emoji}</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xl">
               {item.desc}
            </p>

            {/* Perks — visible on active */}
            <div
               className={`mt-3 flex flex-wrap gap-3 transition-all duration-300 overflow-hidden ${
                  isActive ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
               }`}
            >
               {item.perks.map((perk, i) => (
                  <span
                     key={i}
                     className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${item.accentBg} ${item.accentText} ${item.accentRing}`}
                  >
                     <CheckCircle2 className="h-3 w-3" />
                     {perk}
                  </span>
               ))}
            </div>
         </div>

         {/* Right arrow */}
         <div
            className={`flex-shrink-0 text-sm font-semibold transition-all duration-300 ${item.accentText} ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
         >
            <span className="flex items-center gap-1">
               Start Free <span>→</span>
            </span>
         </div>
      </div>
   );
}
