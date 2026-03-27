import { useEffect, useState } from "react";

const segments = [
   { label: "Home", value: 14, color: "#f9a8d4" },
   { label: "Collection", value: 23, color: "#86efac" },
   { label: "Product", value: 21, color: "#93c5fd" },
   { label: "Cart", value: 17, color: "#fde68a" },
];

export default function StepThree() {
   const [animated, setAnimated] = useState(false);
   useEffect(() => {
      const t = setTimeout(() => setAnimated(true), 500);
      return () => clearTimeout(t);
   }, []);

   const radius = 34;
   const circ = 2 * Math.PI * radius;
   const total = segments.reduce((s, g) => s + g.value, 0);
   let cum = 0;

   return (
      <div className="flex w-full flex-col items-center justify-center px-3">
         <div className="w-full rounded-2xl border border-gray-100 bg-white px-4 py-4 shadow-sm">
            <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-widest text-gray-400">
               AI Store Analysis
            </p>

            <div className="flex items-center justify-center gap-5">
               {/* Donut */}
               <div className="relative flex-shrink-0">
                  <svg width="84" height="84" viewBox="0 0 84 84">
                     <circle
                        cx="42"
                        cy="42"
                        r={radius}
                        fill="none"
                        stroke="#f3f4f6"
                        strokeWidth="9"
                     />
                     {segments.map((seg, i) => {
                        const pct = seg.value / total;
                        const da = circ * pct;
                        const offset = -circ * cum;
                        cum += pct;
                        return (
                           <circle
                              key={i}
                              cx="42"
                              cy="42"
                              r={radius}
                              fill="none"
                              stroke={seg.color}
                              strokeWidth="9"
                              strokeDasharray={`${animated ? da : 0} ${circ}`}
                              strokeDashoffset={offset}
                              style={{
                                 transition: `stroke-dasharray 1s ease ${i * 0.15}s`,
                                 transform: "rotate(-90deg)",
                                 transformOrigin: "center",
                              }}
                           />
                        );
                     })}
                     <text
                        x="42"
                        y="38"
                        textAnchor="middle"
                        style={{
                           fontSize: 12,
                           fontWeight: 800,
                           fill: "#111827",
                           fontFamily: "Plus Jakarta Sans, sans-serif",
                        }}
                     >
                        49/100
                     </text>
                     <text
                        x="42"
                        y="50"
                        textAnchor="middle"
                        style={{
                           fontSize: 7.5,
                           fill: "#9ca3af",
                           fontFamily: "Plus Jakarta Sans, sans-serif",
                        }}
                     >
                        FMS score
                     </text>
                  </svg>
               </div>

               {/* Legend */}
               <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                  {segments.map((seg, i) => (
                     <div key={i} className="flex items-center gap-1.5">
                        <div
                           className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                           style={{ backgroundColor: seg.color }}
                        />
                        <div>
                           <p className="text-[11px] font-bold text-gray-700">
                              {seg.value}
                           </p>
                           <p className="text-[9px] text-gray-400">
                              {seg.label}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Opportunities bar */}
            <div className="mt-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 px-3 py-2 text-center">
               <p className="text-[11px] text-gray-500">
                  <span className="font-bold text-emerald-600">
                     75 Opportunities
                  </span>{" "}
                  to Increase Sales!
               </p>
            </div>

            {/* Tab pills */}
            <div className="mt-2.5 flex justify-center gap-1 flex-wrap">
               {["Home", "Collection", "Product", "Cart"].map((tab, i) => (
                  <button
                     key={i}
                     className={`rounded-lg px-2.5 py-1 text-[10px] font-semibold transition-all ${i === 0 ? "bg-pink-200 text-pink-700" : "text-gray-400 hover:bg-gray-100"}`}
                  >
                     {tab}
                  </button>
               ))}
            </div>
         </div>
      </div>
   );
}
