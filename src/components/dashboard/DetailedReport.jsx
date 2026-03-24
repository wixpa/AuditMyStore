import { useState } from "react";

const SEV = {
   high: {
      bg: "bg-red-50",
      text: "text-red-600",
      border: "border-red-200",
      dot: "bg-red-400",
      label: "High Impact",
   },
   medium: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-200",
      dot: "bg-amber-400",
      label: "Medium Impact",
   },
   low: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "border-emerald-200",
      dot: "bg-emerald-400",
      label: "Quick Win",
   },
};

const CAT_COLORS = {
   CRO: "bg-violet-100 text-violet-700",
   SEO: "bg-sky-100 text-sky-700",
   Speed: "bg-amber-100 text-amber-700",
   UX: "bg-pink-100 text-pink-700",
   Apps: "bg-orange-100 text-orange-700",
};

export default function DetailedReport({ problems }) {
   const [expanded, setExpanded] = useState(null);
   const [filter, setFilter] = useState("All");

   if (!problems?.length) {
      return (
         <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-10 text-center">
            <p className="text-3xl">🎉</p>
            <p className="mt-3 text-base font-black text-emerald-700">
               No major issues found!
            </p>
            <p className="mt-1 text-sm text-emerald-600">
               Your store is performing well across all audit categories.
            </p>
         </div>
      );
   }

   const categories = ["All", ...new Set(problems.map((p) => p.category))];
   const filtered =
      filter === "All"
         ? problems
         : problems.filter((p) => p.category === filter);

   return (
      <div>
         {/* Header + filter */}
         <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-black text-gray-900">
               Detailed Report
               <span className="ml-2 rounded-lg bg-gray-100 px-2 py-0.5 text-sm font-bold text-gray-500">
                  {filtered.length} issues
               </span>
            </h2>
            <div className="flex flex-wrap gap-2">
               {categories.map((cat) => (
                  <button
                     key={cat}
                     onClick={() => setFilter(cat)}
                     className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                        filter === cat
                           ? "bg-gray-900 text-white border-gray-900"
                           : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700"
                     }`}
                  >
                     {cat}
                  </button>
               ))}
            </div>
         </div>

         <div className="space-y-4">
            {filtered.map((p, i) => {
               const sev = SEV[p.severity] ?? SEV.medium;
               const open = expanded === i;
               const catColor =
                  CAT_COLORS[p.category] ?? "bg-gray-100 text-gray-600";

               return (
                  <div
                     key={i}
                     className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                     {/* Top bar */}
                     <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50/60 px-6 py-3">
                        <span
                           className={`rounded-lg border px-2.5 py-1 text-xs font-black ${sev.bg} ${sev.text} ${sev.border}`}
                        >
                           Problem #{p.id}
                        </span>
                        <span
                           className={`rounded-lg px-2.5 py-1 text-xs font-bold ${catColor}`}
                        >
                           {p.category}
                        </span>
                        <div className="flex items-center gap-1.5 ml-auto">
                           <span
                              className={`h-2 w-2 rounded-full ${sev.dot}`}
                           />
                           <span
                              className={`text-xs font-semibold ${sev.text}`}
                           >
                              {sev.label}
                           </span>
                        </div>
                     </div>

                     <div className="px-6 py-5 space-y-4">
                        {/* Problem */}
                        <div className="flex items-start gap-3">
                           <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-red-50 text-base">
                              ⚠️
                           </div>
                           <div className="flex-1">
                              <p className="text-sm font-black text-gray-900">
                                 The Problem
                              </p>
                              <p className="mt-1 text-sm leading-relaxed text-gray-500">
                                 {p.problem}
                              </p>
                           </div>
                        </div>

                        {/* Solution */}
                        <div className="flex items-start gap-3">
                           <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-base">
                              💡
                           </div>
                           <div className="flex-1">
                              <p className="text-sm font-black text-gray-900">
                                 Our Solution
                              </p>
                              <p className="mt-1 text-sm leading-relaxed text-gray-500">
                                 {p.solution}
                              </p>
                           </div>
                        </div>

                        {/* Expandable impact */}
                        <button
                           onClick={() => setExpanded(open ? null : i)}
                           className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                        >
                           {open ? "Hide impact" : "View business impact"}
                           <svg
                              className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                           >
                              <path d="M6 9l6 6 6-6" />
                           </svg>
                        </button>

                        {open && (
                           <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 px-4 py-3">
                              <p className="text-xs font-bold text-emerald-700 mb-1">
                                 📈 Business Impact
                              </p>
                              <p className="text-xs leading-relaxed text-emerald-800">
                                 {p.impact}
                              </p>
                           </div>
                        )}

                        {/* CTA */}
                        <div className="flex items-center gap-3 pt-1">
                           <button className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-emerald-600 active:scale-95">
                              Fix this
                              <svg
                                 className="h-3.5 w-3.5"
                                 viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor"
                                 strokeWidth="2.5"
                                 strokeLinecap="round"
                              >
                                 <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                           </button>
                           <span className="text-xs text-gray-400">
                              Fixing this can significantly improve your store
                              revenue
                           </span>
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
}
