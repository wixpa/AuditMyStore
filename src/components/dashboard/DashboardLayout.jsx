import { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import AuditOverview from "./AuditOverview";
import DetailedReport from "./DetailedReport";
import UpsellBanner from "./UpsellBanner";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import MetricsRow from "./MetricsRow";
import useAudit from "../../hooks/useAudit";

const AI_BADGE = {
   openai: {
      label: "Powered by GPT-4o Mini",
      icon: "✦",
      cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
   },
   gemini: {
      label: "Powered by Gemini 2.0 Flash",
      icon: "✦",
      cls: "bg-sky-50 text-sky-700 border-sky-200",
   },
};

export default function DashboardLayout({ storeUrl }) {
   const [activeAudit, setActiveAudit] = useState("Home Page");
   const {
      data,
      loading,
      error,
      strategy,
      setStrategy,
      step,
      aiSource,
      rerun,
   } = useAudit(storeUrl);

   return (
      <div className="flex h-screen overflow-hidden bg-[#f8fafb]">
         <Sidebar
            storeUrl={storeUrl}
            activeAudit={activeAudit}
            setActiveAudit={setActiveAudit}
         />

         <div className="flex flex-1 flex-col overflow-hidden">
            <DashboardHeader
               storeUrl={storeUrl}
               strategy={strategy}
               setStrategy={setStrategy}
            />

            <main className="flex-1 overflow-y-auto px-8 py-8">
               {loading && <LoadingScreen url={storeUrl} step={step} />}
               {error && !loading && (
                  <ErrorScreen error={error} onRetry={rerun} />
               )}

               {data && !loading && (
                  <div className="mx-auto max-w-5xl space-y-6">
                     {/* Page title */}
                     <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                           <div className="flex flex-wrap items-center gap-3 mb-1">
                              <h1 className="text-2xl font-black text-gray-900">
                                 {activeAudit} Audit Overview
                              </h1>
                              {/* AI source badge */}
                              {aiSource && AI_BADGE[aiSource] && (
                                 <span
                                    className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1 text-[11px] font-bold ${AI_BADGE[aiSource].cls}`}
                                 >
                                    <span>{AI_BADGE[aiSource].icon}</span>
                                    {AI_BADGE[aiSource].label}
                                 </span>
                              )}
                           </div>

                           <p className="text-sm text-gray-500">
                              Analyzed:{" "}
                              <a
                                 href={data.url}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="font-semibold text-emerald-600 hover:underline"
                              >
                                 {data.url.replace(/^https?:\/\//, "")}
                              </a>
                           </p>

                           {data.summary && (
                              <p className="mt-2 max-w-2xl text-sm italic leading-relaxed text-gray-500">
                                 "{data.summary}"
                              </p>
                           )}
                        </div>

                        {/* Re-run */}
                        <button
                           onClick={rerun}
                           className="flex-shrink-0 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-600 shadow-sm transition hover:border-emerald-300 hover:text-emerald-600"
                        >
                           <svg
                              className="h-3.5 w-3.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                           >
                              <path d="M1 4v6h6M23 20v-6h-6" />
                              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                           </svg>
                           Re-run
                        </button>
                     </div>

                     {/* Overview stat cards */}
                     <AuditOverview data={data} />

                     {/* Core Web Vitals */}
                     <MetricsRow metrics={data.metrics} />

                     {/* Next step banner */}
                     <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
                        <div>
                           <p className="text-sm font-bold text-gray-900">
                              {activeAudit} Audit is completed,
                           </p>
                           <p className="text-sm text-gray-500">
                              Next, analyze your Cart page for conversion rate
                              optimization opportunities.
                           </p>
                        </div>
                        <button
                           onClick={() => setActiveAudit("Cart Page")}
                           className="ml-6 flex-shrink-0 flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-600 active:scale-95"
                        >
                           Start Cart Page Audit
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

                     {/* Upsell banner */}
                     <UpsellBanner />

                     {/* Detailed AI report */}
                     <DetailedReport problems={data.problems} />
                  </div>
               )}
            </main>
         </div>
      </div>
   );
}
