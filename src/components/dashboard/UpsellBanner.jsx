const features = [
   "Conversion Audit",
   "SEO Audit",
   "Page Speed Audit",
   "App & Integration Audit",
];

export default function UpsellBanner() {
   return (
      <div
         className="relative overflow-hidden rounded-2xl px-8 py-8"
         style={{
            background:
               "linear-gradient(135deg, #0a4a2e 0%, #14532d 40%, #166534 100%)",
         }}
      >
         {/* Decorative circle */}
         <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-emerald-400/10" />
         <div className="pointer-events-none absolute -right-4 -bottom-12 h-40 w-40 rounded-full bg-emerald-300/10" />

         <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            {/* Left */}
            <div>
               <span className="inline-block rounded-lg bg-emerald-400/20 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-emerald-300 mb-3">
                  Limited Time Offer!
               </span>
               <h3 className="text-2xl font-black text-white leading-tight">
                  Get Your Full Store Audit!
               </h3>
               <p className="mt-1.5 text-sm text-emerald-200/80">
                  And find out where your store is leaking revenue!
               </p>

               {/* Feature list */}
               <div className="mt-4 grid grid-cols-2 gap-2">
                  {features.map((f, i) => (
                     <div key={i} className="flex items-center gap-2">
                        <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500">
                           <svg
                              className="h-2.5 w-2.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="3"
                              strokeLinecap="round"
                           >
                              <path d="M20 6L9 17l-5-5" />
                           </svg>
                        </div>
                        <span className="text-xs font-semibold text-emerald-100">
                           {f}
                        </span>
                     </div>
                  ))}
               </div>
            </div>

            {/* Right — price + CTA */}
            <div className="flex flex-shrink-0 flex-col items-center gap-3 text-center">
               <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-emerald-400">
                     One Time Payment!
                  </p>
                  <div className="flex items-start justify-center leading-none mt-1">
                     <span className="text-xl font-black text-white mt-2">
                        $
                     </span>
                     <span className="text-6xl font-black text-white tracking-tight">
                        199
                     </span>
                  </div>
               </div>
               <button className="flex items-center gap-2 rounded-xl bg-emerald-400 px-6 py-3 text-sm font-black text-gray-900 transition-all hover:bg-emerald-300 hover:scale-105 active:scale-95">
                  Purchase Now
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
         </div>
      </div>
   );
}
