import { Plus, Minus } from "lucide-react";

export default function FaqItem({ faq, index, isOpen, onToggle }) {
   return (
      <div className="group relative">
         {/* Left accent bar */}
         <div
            className={`absolute left-0 top-0 w-1 rounded-l-none transition-all duration-300 ${
               isOpen ? `${faq.accentColor} h-full` : "h-0"
            }`}
         />

         {/* Question row */}
         <button
            onClick={onToggle}
            className={`flex w-full items-start justify-between gap-4 px-7 py-5 text-left transition-colors duration-200 ${
               isOpen ? faq.accentLight : "hover:bg-gray-50/70"
            }`}
         >
            <div className="flex items-start gap-3 min-w-0">
               {/* Number + emoji */}
               <div className="flex-shrink-0 flex items-center gap-2 mt-0.5">
                  <span
                     className={`text-xs font-black ${isOpen ? faq.accentText : "text-gray-300"} transition-colors duration-200`}
                  >
                     {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                     className={`transition-all duration-300 ${isOpen ? "opacity-100 scale-110" : "opacity-0 scale-75"}`}
                  >
                     {faq.emoji}
                  </span>
               </div>
               <span
                  className={`text-sm font-extrabold leading-snug transition-colors duration-200 ${isOpen ? "text-gray-900" : "text-gray-700"}`}
               >
                  {faq.question}
               </span>
            </div>

            {/* Toggle icon */}
            <div
               className={`flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 ${
                  isOpen
                     ? `${faq.accentColor} border-transparent text-white rotate-0`
                     : "border-gray-200 bg-white text-gray-400 hover:border-gray-300"
               }`}
            >
               {isOpen ? (
                  <Minus className="h-3.5 w-3.5" />
               ) : (
                  <Plus className="h-3.5 w-3.5" />
               )}
            </div>
         </button>

         {/* Answer */}
         <div
            className={`overflow-hidden transition-all duration-400 ease-in-out ${
               isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
            style={{ transition: "max-height 0.4s ease, opacity 0.3s ease" }}
         >
            <div
               className={`mx-7 mb-5 rounded-2xl ${faq.accentLight} ring-1 ${faq.accentRing} px-5 py-4`}
            >
               <p className="text-sm leading-relaxed text-gray-600">
                  {faq.answer}
               </p>
            </div>
         </div>
      </div>
   );
}
