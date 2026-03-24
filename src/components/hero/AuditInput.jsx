import { useState, useEffect } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

const PLACEHOLDERS = [
   "yourstore.myshopify.com",
   "gymshark.com",
   "allbirds.com",
   "fashionnova.com",
];

export default function AuditInput() {
   const [value, setValue] = useState("");
   const [loading, setLoading] = useState(false);
   const [placeholderIndex, setPlaceholderIndex] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
      }, 2500);
      return () => clearInterval(interval);
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!value.trim()) return;
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
   };

   return (
      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl mx-auto">
         <div className="flex items-center rounded-2xl border border-gray-200 bg-white/90 p-2 shadow-xl shadow-gray-100/60 backdrop-blur-sm focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100 transition-all duration-300">
            {/* Globe icon */}
            <div className="pl-3 pr-2 text-gray-400">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
               >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
               </svg>
            </div>
            <input
               type="text"
               value={value}
               onChange={(e) => setValue(e.target.value)}
               placeholder={PLACEHOLDERS[placeholderIndex]}
               className="flex-1 bg-transparent py-3 text-base text-gray-800 placeholder:text-gray-400 outline-none"
            />
            <button
               type="submit"
               disabled={loading}
               className="flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-600 hover:scale-[1.02] active:scale-95 disabled:opacity-70 cursor-pointer"
            >
               {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
               ) : (
                  <>
                     Get Audit <ArrowRight className="h-4 w-4" />
                  </>
               )}
            </button>
         </div>
         <p className="mt-2.5 text-center text-xs text-gray-400">
            Free audit • No credit card required • Results in &lt;60 seconds
         </p>
      </form>
   );
}
