import { useState, useEffect } from "react";
import { Search } from "lucide-react";

const STORES = [
   "gymshark.com",
   "allbirds.com",
   "fashionnova.com",
   "yourstore.com",
];

export default function StepOne() {
   const [index, setIndex] = useState(0);
   const [visible, setVisible] = useState(true);

   useEffect(() => {
      const interval = setInterval(() => {
         setVisible(false);
         setTimeout(() => {
            setIndex((p) => (p + 1) % STORES.length);
            setVisible(true);
         }, 300);
      }, 2200);
      return () => clearInterval(interval);
   }, []);

   return (
      <div className="flex w-full flex-col items-center justify-center gap-4 px-4">
         {/* Browser bar */}
         <div className="flex w-full items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2 shadow-inner">
            <div className="flex gap-1.5">
               <div className="h-2.5 w-2.5 rounded-full bg-red-300" />
               <div className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
               <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
            </div>
            <div className="h-4 w-px bg-gray-200 mx-1" />
            <span
               className={`flex-1 truncate text-xs text-gray-400 transition-all duration-300 ${
                  visible
                     ? "opacity-100 translate-y-0"
                     : "opacity-0 translate-y-1"
               }`}
            >
               🔒 {STORES[index]}
            </span>
         </div>

         {/* Input field */}
         <div className="flex w-full items-center gap-2 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-white px-4 py-3 shadow-sm">
            <svg
               xmlns="http://www.w3.org/2000/svg"
               className="h-4 w-4 text-gray-300 flex-shrink-0"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
               strokeWidth={1.8}
            >
               <circle cx="12" cy="12" r="10" />
               <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span className="flex-1 text-xs text-gray-400">
               Enter store URL…
            </span>
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl bg-gray-900 shadow">
               <Search className="h-3 w-3 text-white" />
            </div>
         </div>

         {/* Cursor */}
         <div className="self-end pr-6 -mt-1">
            <svg width="16" height="20" viewBox="0 0 18 22" fill="none">
               <path
                  d="M1 1l5.5 16.5 3-6 6-3L1 1z"
                  fill="#1f2937"
                  stroke="#1f2937"
                  strokeWidth="1"
                  strokeLinejoin="round"
               />
            </svg>
         </div>
      </div>
   );
}
