function ScoreRing({ value = 0, color = "emerald" }) {
   const palette = {
      emerald: {
         stroke: "#10b981",
         track: "#d1fae5",
         text: "text-emerald-600",
      },
      amber: { stroke: "#f59e0b", track: "#fef3c7", text: "text-amber-600" },
      red: { stroke: "#ef4444", track: "#fee2e2", text: "text-red-500" },
   };
   const c = palette[color] ?? palette.emerald;
   const r = 20;
   const circ = 2 * Math.PI * r;
   const off = circ - (Math.min(value, 100) / 100) * circ;

   return (
      <div className="relative flex h-12 w-12 items-center justify-center flex-shrink-0">
         <svg className="absolute inset-0 -rotate-90" width="48" height="48">
            <circle
               cx="24"
               cy="24"
               r={r}
               fill="none"
               stroke={c.track}
               strokeWidth="5"
            />
            <circle
               cx="24"
               cy="24"
               r={r}
               fill="none"
               stroke={c.stroke}
               strokeWidth="5"
               strokeDasharray={circ}
               strokeDashoffset={off}
               strokeLinecap="round"
            />
         </svg>
         <span className={`text-[11px] font-black ${c.text}`}>{value}</span>
      </div>
   );
}

export default function AuditOverview({ data }) {
   const cards = [
      {
         icon: "🎯",
         iconBg: "bg-emerald-50",
         label: "Overall Score",
         value: `${data.overallScore}/100`,
         sub: "AI-powered combined score",
         ring: {
            value: data.overallScore,
            color: data.scores.performance.color,
         },
      },
      {
         icon: "⚠️",
         iconBg: "bg-red-50",
         label: "Issues Found",
         value: `${data.issuesCount} Issues`,
         sub: "Areas that need improvement",
         ring: {
            value: Math.max(10, 100 - data.issuesCount * 12),
            color: data.issuesCount > 5 ? "red" : "amber",
         },
      },
      {
         icon: "⚡",
         iconBg: "bg-amber-50",
         label: "Quick Wins",
         value: `${data.quickWins} Fixes`,
         sub: "Low effort, high reward fixes",
         ring: { value: data.scores.seo.value, color: data.scores.seo.color },
      },
      {
         icon: "📈",
         iconBg: "bg-sky-50",
         label: "High Impact",
         value: `${data.highImpact} Issues`,
         sub: "Critical conversion blockers",
         ring: {
            value: data.scores.cro?.value ?? data.scores.performance.value,
            color: data.scores.cro?.color ?? "amber",
         },
      },
   ];

   return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
         {cards.map((card, i) => (
            <div
               key={i}
               className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
               <div className="flex items-center justify-between">
                  <div
                     className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${card.iconBg}`}
                  >
                     {card.icon}
                  </div>
                  <ScoreRing
                     value={card.ring.value ?? 0}
                     color={card.ring.color}
                  />
               </div>
               <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                     {card.label}
                  </p>
                  <p className="mt-0.5 text-xl font-black text-gray-900">
                     {card.value}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-gray-400">
                     {card.sub}
                  </p>
               </div>
            </div>
         ))}
      </div>
   );
}
