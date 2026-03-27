const tools = [
   {
      emoji: "🔍",
      label: "AI Visibility Checker",
      desc: "See how AI models view your store",
      color: "bg-emerald-50 text-emerald-600",
   },
   {
      emoji: "📄",
      label: "LLM.txt Generator",
      desc: "Generate AI-readable store files",
      color: "bg-sky-50 text-sky-600",
   },
   {
      emoji: "🤖",
      label: "Robots.txt Generator",
      desc: "Control search crawler access",
      color: "bg-violet-50 text-violet-600",
   },
   {
      emoji: "⚡",
      label: "Page Speed Tester",
      desc: "Diagnose your store's load speed",
      color: "bg-amber-50 text-amber-600",
   },
];

export default function FreeToolsDropdown({ open, onClose }) {
   return (
      <div
         className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 transition-all duration-200 ${
            open
               ? "opacity-100 translate-y-0 pointer-events-auto"
               : "opacity-0 -translate-y-2 pointer-events-none"
         }`}
      >
         {/* Arrow */}
         <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 border-l border-t border-gray-200/80 bg-white" />

         {/* Panel */}
         <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-xl shadow-gray-100/80 backdrop-blur-sm">
            <div className="p-2">
               {tools.map((tool, i) => (
                  <a
                     key={i}
                     href="#"
                     onClick={onClose}
                     className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-150 hover:bg-gray-50"
                  >
                     <div
                        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-base ${tool.color}`}
                     >
                        {tool.emoji}
                     </div>
                     <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 leading-tight">
                           {tool.label}
                        </p>
                        <p className="text-xs text-gray-400 leading-tight mt-0.5">
                           {tool.desc}
                        </p>
                     </div>
                     <svg
                        className="ml-auto h-4 w-4 flex-shrink-0 text-gray-300 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                     >
                        <path d="M9 18l6-6-6-6" />
                     </svg>
                  </a>
               ))}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 bg-gray-50/60 px-4 py-3">
               <a
                  href="#"
                  className="flex items-center justify-between text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
               >
                  <span>View all free tools</span>
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
               </a>
            </div>
         </div>
      </div>
   );
}
