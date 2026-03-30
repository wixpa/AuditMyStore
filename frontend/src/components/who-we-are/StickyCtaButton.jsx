import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";

export default function StickyCtaButton() {
   const [visible, setVisible] = useState(false);

   useEffect(() => {
      const onScroll = () => setVisible(window.scrollY > 300);
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
   }, []);

   return (
      <a
         href="https://www.upwork.com/freelancers/malikzeeshanhaider"
         target="_blank"
         rel="noopener noreferrer"
         className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 flex items-center gap-2 rounded-2xl bg-gray-900 px-5 py-3.5 text-sm font-bold text-white shadow-2xl shadow-gray-900/30 transition-all duration-500 hover:bg-emerald-600 hover:scale-105 active:scale-95 no-underline ${
            visible
               ? "opacity-100 translate-x-0"
               : "opacity-0 translate-x-8 pointer-events-none"
         }`}
      >
         {/* Pulse beacon */}
         <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
         </span>
         <ExternalLink className="h-4 w-4" />
         Hire Now
      </a>
   );
}
