const CONFIG = [
   { key: "lcp", icon: "🖼️", good: "≤ 2.5s", label: "LCP" },
   { key: "fcp", icon: "⚡", good: "≤ 1.8s", label: "FCP" },
   { key: "tbt", icon: "⏱️", good: "≤ 200ms", label: "TBT" },
   { key: "cls", icon: "📐", good: "≤ 0.1", label: "CLS" },
   { key: "ttfb", icon: "🚀", good: "≤ 0.8s", label: "TTFB" },
];

export default function MetricsRow({ metrics }) {
   if (!metrics || !Object.keys(metrics).length) return null;

   return (
      <div>
         <h2 className="mb-3 text-sm font-black uppercase tracking-wider text-gray-400">
            Core Web Vitals — AI Estimates
         </h2>
         <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {CONFIG.map((m) => {
               const metric = metrics[m.key];
               if (!metric) return null;
               return (
                  <div
                     key={m.key}
                     className="flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                  >
                     <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wider text-gray-400">
                           {m.label}
                        </span>
                        <span className="text-lg">{m.icon}</span>
                     </div>
                     <p className="text-lg font-black text-gray-900 leading-tight">
                        {metric.displayValue}
                     </p>
                     <p className="text-[10px] leading-tight text-gray-400">
                        {metric.label}
                     </p>
                     <p className="text-[10px] font-semibold text-emerald-600">
                        Target: {m.good}
                     </p>
                  </div>
               );
            })}
         </div>
      </div>
   );
}
