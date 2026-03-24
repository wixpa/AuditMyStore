import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PLACEHOLDERS = [
   "gymshark.com",
   "allbirds.com",
   "fashionnova.com",
   "yourstore.myshopify.com",
];

export default function AuditInput() {
   const [value, setValue] = useState("");
   const [phIndex, setPhIndex] = useState(0);
   const [phVisible, setPhVisible] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
      const t = setInterval(() => {
         setPhVisible(false);
         setTimeout(() => {
            setPhIndex((p) => (p + 1) % PLACEHOLDERS.length);
            setPhVisible(true);
         }, 250);
      }, 2500);
      return () => clearInterval(t);
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!value.trim()) return;
      let url = value.trim();
      if (!/^https?:\/\//i.test(url)) url = "https://" + url;
      navigate(`/dashboard?url=${encodeURIComponent(url)}`);
   };

   return (
      <form onSubmit={handleSubmit} className="w-full">
         <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg shadow-gray-100/80 transition-all duration-300 focus-within:border-emerald-400 focus-within:shadow-emerald-50 focus-within:ring-2 focus-within:ring-emerald-100">
            <div className="flex-shrink-0 pl-3 pr-1 text-gray-300">
               <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
               >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
               </svg>
            </div>
            <input
               type="text"
               value={value}
               onChange={(e) => setValue(e.target.value)}
               placeholder={phVisible ? PLACEHOLDERS[phIndex] : ""}
               className="min-w-0 flex-1 bg-transparent py-3 text-[15px] text-gray-800 placeholder:text-gray-300 outline-none"
            />
            <button
               type="submit"
               className="flex-shrink-0 flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-[14px] font-bold text-white transition-all duration-200 hover:bg-emerald-600 active:scale-95"
            >
               Get Audit
               <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
               >
                  <path d="M5 12h14M12 5l7 7-7 7" />
               </svg>
            </button>
         </div>
         <p className="mt-3 text-center text-[12px] text-gray-400">
            Paste any Shopify store URL above — results delivered instantly
         </p>
      </form>
   );
}
