import { useState } from "react";
import { useHireModal } from "../../context/HireModalContext";

export default function FloatingHireButton() {
   const { openHireModal, isOpen } = useHireModal();
   const [hovered, setHovered] = useState(false);

   // Hide the floating button when modal is open
   if (isOpen) return null;

   return (
      <button
         id="floating-hire-btn"
         onClick={openHireModal}
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}
         className="fixed bottom-6 right-6 z-[100] flex items-center gap-2.5 rounded-2xl bg-gray-900 text-white shadow-xl shadow-gray-900/30 transition-all duration-300 hover:bg-emerald-600 hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 cursor-pointer group overflow-hidden"
         style={{
            padding: hovered ? "14px 24px" : "14px 18px",
         }}
         aria-label="Hire us"
      >
         {/* Pulse ring */}
         <span className="absolute inset-0 rounded-2xl">
            <span className="absolute inset-0 rounded-2xl border-2 border-emerald-400/40 anim-ping-slow" />
         </span>

         {/* Icon */}
         <span className="relative z-10 flex items-center justify-center">
            <svg
               className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
            >
               <line x1="22" y1="2" x2="11" y2="13" />
               <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
         </span>

         {/* Label — expands on hover */}
         <span
            className="relative z-10 text-sm font-bold whitespace-nowrap overflow-hidden transition-all duration-300"
            style={{
               maxWidth: hovered ? "120px" : "0px",
               opacity: hovered ? 1 : 0,
            }}
         >
            Hire Now
         </span>

         {/* Active dot */}
         <span className="absolute top-2.5 right-2.5 z-10 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
         </span>

         {/* Shimmer */}
         <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </button>
   );
}
