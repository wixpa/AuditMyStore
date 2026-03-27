export default function BadgeStrip() {
   const avatars = [
      { bg: "bg-emerald-400", initials: "AK" },
      { bg: "bg-sky-400", initials: "JS" },
      { bg: "bg-violet-400", initials: "MR" },
   ];

   return (
      <div className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
         {/* Avatar Stack */}
         <div className="flex -space-x-2">
            {avatars.map((a, i) => (
               <div
                  key={i}
                  className={`${a.bg} flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white`}
               >
                  {a.initials}
               </div>
            ))}
         </div>

         {/* Pulse dot */}
         <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
         </span>

         {/* Text */}
         <span className="text-sm font-medium text-gray-700">
            <span className="font-bold text-emerald-600">500+</span> stores
            audited by AI so far
         </span>
      </div>
   );
}
