import { Link } from "react-router-dom";

const auditPages = [
   { label: "Home Page", icon: "🏠" },
   { label: "Cart Page", icon: "🛒" },
   { label: "Collection Page", icon: "📚" },
   { label: "Product Page", icon: "📦" },
];

const seoTools = [
   { label: "AI SEO Audit", icon: "🔍", disabled: true },
   { label: "AI Visibility", icon: "👁️", disabled: true },
];

const performanceTools = [
   { label: "Page Speed", icon: "⚡", disabled: true },
   { label: "Core Web Vitals", icon: "📊", disabled: true },
];

const competitorTools = [
   { label: "Theme Detection", icon: "🎨", disabled: true },
   { label: "App Detection", icon: "📱", disabled: true },
];

export default function Sidebar({ storeUrl, activeAudit, setActiveAudit, onClose }) {
   const domain = storeUrl
      ? storeUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
      : "your-store.com";

   return (
      <aside className="flex h-full w-56 flex-shrink-0 flex-col border-r border-gray-200 bg-white">
         {/* Store selector */}
         <div className="border-b border-gray-100 px-4 py-4">
            <div className="flex items-center justify-between">
               <button className="flex flex-1 items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-left transition hover:bg-gray-100">
                  <span className="truncate text-sm font-bold text-gray-800">{domain}</span>
                  <svg className="h-4 w-4 flex-shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                     <path d="M6 9l6 6 6-6" />
                  </svg>
               </button>
               {/* Mobile close button */}
               {onClose && (
                  <button
                     onClick={onClose}
                     className="ml-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 md:hidden"
                  >
                     <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                     </svg>
                  </button>
               )}
            </div>
         </div>

         {/* Nav */}
         <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
            {/* Dashboard */}
            <div>
               <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold text-gray-500 transition hover:bg-gray-50 hover:text-gray-800">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
                     disabled={item.disabled}
                     className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-400 cursor-not-allowed"
                  >
                     <span className="text-base leading-none opacity-60">{item.icon}</span>
                     <span className="flex-1 text-left">{item.label}</span>
                     <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[9px] font-bold text-gray-400">SOON</span>
                  </button>
               ))}
            </div>

            {/* Store Performance */}
            <div>
               <p className="mb-1.5 px-3 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Performance
               </p>
               {performanceTools.map((item) => (
                  <button
                     key={item.label}
                     disabled={item.disabled}
                     className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-400 cursor-not-allowed"
                  >
                     <span className="text-base leading-none opacity-60">{item.icon}</span>
                     <span className="flex-1 text-left">{item.label}</span>
                     <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[9px] font-bold text-gray-400">SOON</span>
                  </button>
               ))}
            </div>

            {/* Competitor Analysis */}
            <div>
               <p className="mb-1.5 px-3 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Competitor Analysis
               </p>
               {competitorTools.map((item) => (
                  <button
                     key={item.label}
                     disabled={item.disabled}
                     className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-400 cursor-not-allowed"
                  >
                     <span className="text-base leading-none opacity-60">{item.icon}</span>
                     <span className="flex-1 text-left">{item.label}</span>
                     <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[9px] font-bold text-gray-400">SOON</span>
                  </button>
               ))}
            </div>
         </nav>

         {/* Bottom — Pricing + Hire Experts */}
         <div className="border-t border-gray-100 px-3 py-3 space-y-2">
            <Link
               to="/pricing"
               className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50"
            >
               <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
               </svg>
               Pricing Plans
            </Link>
            <a
               href="mailto:hello@auditmystore.com"
               className="flex w-full items-center gap-2.5 rounded-xl border border-dashed border-emerald-300 bg-emerald-50 px-3 py-2.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100"
            >
               <span className="text-sm">🛠️</span>
               Hire Shopify Experts!
            </a>
         </div>
      </aside>
   );
}