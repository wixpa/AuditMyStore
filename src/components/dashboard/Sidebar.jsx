const auditPages = [
   { label: "Home Page", icon: "🏠" },
   { label: "Cart Page", icon: "🛒" },
   { label: "Collection Page", icon: "📚" },
   { label: "Product Page", icon: "📦" },
];

const seoTools = [
   { label: "AI SEO Audit", icon: "🔍" },
   { label: "AI Visibility Checker", icon: "👁" },
   { label: "LLM.txt Generator", icon: "📄" },
   { label: "Robot.txt Generator", icon: "🤖" },
];

export default function Sidebar({ storeUrl, activeAudit, setActiveAudit }) {
   const domain = storeUrl
      ? storeUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
      : "your-store.com";

   return (
      <aside className="flex w-56 flex-shrink-0 flex-col border-r border-gray-200 bg-white">
         {/* Store selector */}
         <div className="border-b border-gray-100 px-4 py-4">
            <button className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-left transition hover:bg-gray-100">
               <span className="truncate text-sm font-bold text-gray-800">
                  {domain}
               </span>
               <svg
                  className="h-4 w-4 flex-shrink-0 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
               >
                  <path d="M6 9l6 6 6-6" />
               </svg>
            </button>
         </div>

         {/* Nav */}
         <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
            {/* Dashboard */}
            <div>
               <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold text-gray-500 transition hover:bg-gray-50 hover:text-gray-800">
                  <svg
                     className="h-4 w-4"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     strokeLinecap="round"
                  >
                     <rect x="3" y="3" width="7" height="7" rx="1" />
                     <rect x="14" y="3" width="7" height="7" rx="1" />
                     <rect x="3" y="14" width="7" height="7" rx="1" />
                     <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                  Dashboard
               </button>
            </div>

            {/* AI Audits */}
            <div>
               <p className="mb-1.5 px-3 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  AI Audits
               </p>
               {auditPages.map((item) => (
                  <button
                     key={item.label}
                     onClick={() => setActiveAudit(item.label)}
                     className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-150 ${
                        activeAudit === item.label
                           ? "bg-gray-900 text-white shadow-sm"
                           : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                     }`}
                  >
                     <span className="text-base leading-none">{item.icon}</span>
                     {item.label}
                  </button>
               ))}
            </div>

            {/* AI / SEO Visibility */}
            <div>
               <p className="mb-1.5 px-3 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  AI / SEO Visibility
               </p>
               {seoTools.map((item) => (
                  <button
                     key={item.label}
                     className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
                  >
                     <span className="text-base leading-none">{item.icon}</span>
                     {item.label}
                  </button>
               ))}
            </div>

            {/* Store Performance */}
            <div>
               <p className="mb-1.5 px-3 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Store Performance
               </p>
               <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-900">
                  <span className="text-base leading-none">📊</span>
                  Performance Report
               </button>
            </div>
         </nav>
      </aside>
   );
}
