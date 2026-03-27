const delayClasses = ["delay-200", "delay-300", "delay-400", "delay-500"];

export default function AudienceCard({ item, index }) {
   const Icon = item.icon;

   return (
      <div
         className={`opacity-0-init animate-fade-in-up ${delayClasses[index]} group relative overflow-hidden rounded-3xl border-l-4 ${item.borderColor} border border-white/8 bg-white/5 p-6 backdrop-blur-sm shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${item.glow} hover:bg-white/8`}
      >
         {/* Shimmer sweep on hover */}
         <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

         {/* Watermark */}
         <span className="pointer-events-none absolute -right-3 -bottom-4 select-none text-[72px] leading-none opacity-[0.06] grayscale">
            {item.watermark}
         </span>

         {/* Top row: icon + tag */}
         <div className="relative z-10 mb-4 flex items-center justify-between">
            <div
               className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconBg} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
            >
               <Icon
                  className={`h-6 w-6 ${item.iconColor}`}
                  strokeWidth={1.8}
               />
            </div>
            <span
               className={`rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 ${item.tagColor}`}
            >
               {item.tag}
            </span>
         </div>

         {/* Title */}
         <h3 className="relative z-10 mb-2 text-base font-extrabold text-white leading-snug">
            {item.title}
         </h3>

         {/* Description */}
         <p className="relative z-10 text-sm leading-relaxed text-gray-400">
            {item.desc}
         </p>

         {/* Bottom arrow */}
         <div className="relative z-10 mt-4 flex items-center gap-1 text-xs font-semibold text-gray-500 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:gap-2">
            <span className={`${item.iconColor}`}>Learn more</span>
            <span className={`${item.iconColor}`}>→</span>
         </div>
      </div>
   );
}
