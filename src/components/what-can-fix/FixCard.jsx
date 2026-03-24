import { ArrowRight } from "lucide-react";

const delayClasses = [
   "delay-200",
   "delay-300",
   "delay-400",
   "delay-500",
   "delay-600",
];

export default function FixCard({ card, index }) {
   const Icon = card.icon;

   return (
      <div
         className={`opacity-0-init animate-fade-in-up ${delayClasses[index]} group relative flex flex-col rounded-3xl border border-t-4 ${card.borderAccent} border-gray-100/80 bg-white/80 p-6 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${card.glow}`}
      >
         {/* Issue badge — top right */}
         <div
            className={`absolute right-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 ${card.tag}`}
         >
            {card.badge} issues
         </div>

         {/* Icon box */}
         <div
            className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${card.iconBg} transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}
         >
            <Icon className={`h-7 w-7 ${card.iconColor}`} strokeWidth={1.8} />
         </div>

         {/* Title */}
         <h3 className="mb-2.5 text-lg font-extrabold text-gray-900 leading-tight">
            {card.title}
         </h3>

         {/* Description */}
         <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-500">
            {card.desc}
         </p>

         {/* CTA Button */}
         <button className="group/btn flex w-fit items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-600 hover:gap-3 hover:shadow-md active:scale-95">
            Get Audit
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
         </button>
      </div>
   );
}
