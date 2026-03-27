const STEPS = [
   { icon: "🌐", label: "Connecting to store..." },
   { icon: "🔍", label: "Scanning store structure..." },
   { icon: "🧠", label: "AI analyzing issues..." },
   { icon: "📊", label: "Building your audit report..." },
   { icon: "✅", label: "Finalizing recommendations..." },
];

const DOTS = [0, 1, 2];

export default function LoadingScreen({ url, step = 0 }) {
   const domain = url?.replace(/^https?:\/\//, "").replace(/\/$/, "") ?? url;
   const currentStep = Math.min(step, STEPS.length - 1);

   return (
      <div className="flex min-h-[65vh] flex-col items-center justify-center gap-8 text-center">
         {/* Spinner ring */}
         <div className="relative h-24 w-24">
            <svg className="absolute inset-0 animate-spin" viewBox="0 0 96 96">
               <circle
                  cx="48"
                  cy="48"
                  r="40"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="6"
               />
               <circle
                  cx="48"
                  cy="48"
                  r="40"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="6"
                  strokeDasharray="251"
                  strokeDashoffset="180"
                  strokeLinecap="round"
               />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-3xl">
               {STEPS[currentStep].icon}
            </div>
         </div>

         {/* Title */}
         <div>
            <h2 className="text-xl font-black text-gray-900">
               Auditing your store
            </h2>
            <p className="mt-1 max-w-xs truncate text-sm font-semibold text-emerald-600">
               {domain}
            </p>
            <p className="mt-1 text-xs text-gray-400">
                Powered by GLM-5 AI via Hugging Face
            </p>
         </div>

         {/* Step list */}
         <div className="flex w-72 flex-col gap-3">
            {STEPS.map((s, i) => {
               const done = i < step;
               const active = i === step;

               return (
                  <div
                     key={i}
                     className={`flex items-center gap-3 transition-all duration-500 ${
                        done || active ? "opacity-100" : "opacity-20"
                     }`}
                  >
                     {/* Step indicator */}
                     <div
                        className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-black transition-all ${
                           done
                              ? "bg-emerald-500 text-white"
                              : active
                                ? "bg-emerald-100 text-emerald-700 animate-pulse"
                                : "bg-gray-100 text-gray-400"
                        }`}
                     >
                        {done ? (
                           <svg
                              className="h-3.5 w-3.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="3"
                              strokeLinecap="round"
                           >
                              <path d="M20 6L9 17l-5-5" />
                           </svg>
                        ) : (
                           i + 1
                        )}
                     </div>

                     {/* Label */}
                     <span
                        className={`text-sm font-semibold ${
                           active ? "text-gray-900" : "text-gray-400"
                        }`}
                     >
                        {s.label}
                     </span>

                     {/* Bouncing dots — only on active step */}
                     {active && (
                        <div className="ml-auto flex items-center gap-0.5">
                           {DOTS.map((d) => (
                              <div
                                 key={d}
                                 className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce"
                                 style={{ animationDelay: `${d * 0.15}s` }}
                              />
                           ))}
                        </div>
                     )}
                  </div>
               );
            })}
         </div>
      </div>
   );
}
