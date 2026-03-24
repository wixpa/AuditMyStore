import { useNavigate } from "react-router-dom";

export default function DashboardHeader({ storeUrl, strategy, setStrategy }) {
   const navigate = useNavigate();
   const domain = storeUrl
      ? storeUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
      : "—";

   return (
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-3.5 shadow-sm">
         {/* Logo */}
         <a
            href="/"
            onClick={(e) => {
               e.preventDefault();
               navigate("/");
            }}
            className="text-base font-black text-gray-900 tracking-tight"
         >
            FixMyStore<span className="font-light text-gray-400">.com</span>
         </a>

         {/* Right */}
         <div className="flex items-center gap-3">
            {/* Mobile/Desktop toggle */}
            <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1">
               {["mobile", "desktop"].map((s) => (
                  <button
                     key={s}
                     onClick={() => setStrategy(s)}
                     className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all duration-150 ${
                        strategy === s
                           ? "bg-white text-gray-900 shadow-sm"
                           : "text-gray-400 hover:text-gray-600"
                     }`}
                  >
                     {s === "mobile" ? (
                        <svg
                           className="h-3.5 w-3.5"
                           viewBox="0 0 24 24"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="2"
                           strokeLinecap="round"
                        >
                           <rect x="7" y="2" width="10" height="20" rx="2" />
                           <circle cx="12" cy="18" r="1" fill="currentColor" />
                        </svg>
                     ) : (
                        <svg
                           className="h-3.5 w-3.5"
                           viewBox="0 0 24 24"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="2"
                           strokeLinecap="round"
                        >
                           <rect x="2" y="4" width="20" height="14" rx="2" />
                           <path d="M8 20h8M12 18v2" />
                        </svg>
                     )}
                     {s}
                  </button>
               ))}
            </div>

            {/* Pricing pill */}
            <button className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100">
               <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
               >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
               </svg>
               Pricing Plan
            </button>

            {/* Credits */}
            <div className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600">
               <svg
                  className="h-3.5 w-3.5 text-amber-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
               >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
               </svg>
               3 Credits
            </div>

            {/* User */}
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2">
               <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-500 text-[11px] font-black text-white">
                  U
               </div>
               <div className="hidden sm:block">
                  <p className="text-xs font-bold text-gray-800 leading-tight">
                     Umair
                  </p>
                  <p className="text-[10px] text-gray-400 leading-tight">
                     mumair.wixpa@gmail.com
                  </p>
               </div>
               <svg
                  className="h-3.5 w-3.5 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
               >
                  <path d="M6 9l6 6 6-6" />
               </svg>
            </div>
         </div>
      </header>
   );
}
