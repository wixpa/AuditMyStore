import { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import AuditOverview from "./AuditOverview";
import DetailedReport from "./DetailedReport";
import UpsellBanner from "./UpsellBanner";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import MetricsRow from "./MetricsRow";
import useAudit from "../../hooks/useAudit";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
   getAnonAuditUsed,
   getUserAuditRemaining,
   incrementUserAuditUsedCount,
   markAnonAuditUsed,
} from "../../lib/auditUsage";
import { extractStoreOrigin } from "../../lib/shopifyValidator";
import { checkBackendHealth } from "../../lib/backendClient";

/* ── AI Badge config ── */
const AI_BADGE = {
  huggingface: {
    label: "Powered by GLM‑5 via Hugging Face",
    icon: "🤝",
    cls: "bg-purple-50 text-purple-700 border-purple-200",
  },
};

/* ── Page order for next step banner ── */
const PAGE_ORDER = ["Home Page", "Cart Page", "Collection Page", "Product Page"];

/* ── Per-page content config ── */
const PAGE_CONFIG = {
  "Home Page": {
    icon: "🏠",
    title: "Audit Your Home Page",
    desc: "Analyze your store's first impression. Identify CRO issues, speed bottlenecks, and UX problems that are quietly costing you conversions.",
    placeholder: "yourstore.myshopify.com",
    urlSuffix: "",
    tips: ["Hero section CRO", "Trust signals", "Page speed"],
  },
  "Cart Page": {
    icon: "🛒",
    title: "Audit Your Cart Page",
    desc: "Uncover cart abandonment triggers. Find friction points, missing trust elements, and layout issues that stop customers from checking out.",
    placeholder: "yourstore.myshopify.com/cart",
    urlSuffix: "/cart",
    tips: ["Abandonment triggers", "Upsell opportunities", "Checkout friction"],
  },
  "Collection Page": {
    icon: "📚",
    title: "Audit Your Collection Page",
    desc: "Optimize how customers browse your catalog. Spot filtering issues, poor product card design, and SEO gaps across your collection pages.",
    placeholder: "yourstore.myshopify.com/collections/all",
    urlSuffix: "/collections/all",
    tips: ["Filter & sort UX", "Product card design", "SEO gaps"],
  },
  "Product Page": {
    icon: "📦",
    title: "Audit Your Product Page",
    desc: "Maximize product page conversions. Identify missing social proof, weak CTAs, and content gaps that prevent visitors from adding to cart.",
    placeholder: "yourstore.myshopify.com/products/example",
    urlSuffix: "/products/example",
    tips: ["Social proof gaps", "CTA strength", "Description quality"],
  },
};

/* ── Per-page URL validation rules ── */
const PAGE_URL_RULES = {
  "Home Page": {
    validate: (url) => {
      const path = url.replace(/^https?:\/\//, "").replace(/^[^/]+/, "");
      return path === "" || path === "/" || /^\/#/.test(path);
    },
    hint: "Home page URL should be just your domain — e.g. avojoy.org",
    example: "avojoy.org",
  },
  "Cart Page": {
    validate: (url) => /\/cart/.test(url),
    hint: "Cart page URL must contain /cart — e.g. avojoy.org/cart",
    example: "avojoy.org/cart",
  },
  "Collection Page": {
    validate: (url) => /\/collections\//.test(url),
    hint: "Collection URL must contain /collections/ — e.g. avojoy.org/collections/all",
    example: "avojoy.org/collections/all",
  },
  "Product Page": {
    validate: (url) => /\/products\//.test(url),
    hint: "Product URL must contain /products/ — e.g. avojoy.org/products/my-product",
    example: "avojoy.org/products/my-product",
  },
};

/* ══════════════════════════════════════════
   PAGE INPUT PANEL
══════════════════════════════════════════ */
function PageInputPanel({ activeAudit, storeUrl, onSubmit }) {
  const config = PAGE_CONFIG[activeAudit];
  const rule = PAGE_URL_RULES[activeAudit];

  const buildDefault = () =>
    storeUrl
      ? storeUrl.replace(/^https?:\/\//, "").replace(/\/$/, "") + config.urlSuffix
      : "";

  const [url, setUrl] = useState(buildDefault);
  const [urlError, setUrlError] = useState("");

  useEffect(() => {
    setUrl(buildDefault());
    setUrlError("");
  }, [activeAudit, storeUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = url.trim();

    // 1. Empty check
    if (!trimmed) {
      setUrlError("Please enter a store URL.");
      return;
    }

    // 2. Basic format check
    const basicValid = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+/.test(trimmed);
    if (!basicValid) {
      setUrlError("That doesn't look like a valid URL. Please check and try again.");
      return;
    }

    // 3. Page-type match check
    if (!rule.validate(trimmed)) {
      setUrlError(rule.hint);
      return;
    }

    setUrlError("");
    onSubmit(trimmed);
  };

  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center px-4">
      <div className="w-full max-w-xl text-center">

        {/* Icon */}
        <div className="mb-5 text-5xl">{config.icon}</div>

        {/* Title */}
        <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">
          {config.title}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-500">
          {config.desc}
        </p>

        {/* Tip chips */}
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {config.tips.map((tip, i) => (
            <span
              key={i}
              className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
            >
              {tip}
            </span>
          ))}
        </div>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="mt-8">
          <div
            className={`flex overflow-hidden rounded-2xl border-2 bg-white shadow-sm transition-all focus-within:shadow-md ${
              urlError
                ? "border-red-400 focus-within:border-red-400"
                : "border-gray-200 focus-within:border-emerald-400"
            }`}
          >
            {/* Globe icon */}
            <div className="flex items-center pl-4 text-gray-400">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>

            {/* URL Input */}
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (urlError) setUrlError("");
              }}
              placeholder={config.placeholder}
              className="flex-1 bg-transparent px-3 py-4 text-sm font-medium text-gray-800 outline-none placeholder:text-gray-400"
            />

            {/* Submit button */}
            <button
              type="submit"
              disabled={!url.trim()}
              className="m-1.5 flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:opacity-40 active:scale-95"
            >
              Start Audit
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Error box */}
          {urlError ? (
            <div className="mt-3 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-left">
              <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
              <div>
                <p className="text-xs font-semibold text-red-600">{urlError}</p>
                <p className="mt-0.5 text-xs text-red-400">
                  Example:{" "}
                  <span className="font-mono font-bold">{rule.example}</span>
                </p>
              </div>
            </div>
          ) : (
            <p className="mt-2.5 text-xs text-gray-400">
              Paste any Shopify store URL — AI results delivered in seconds
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   DASHBOARD LAYOUT
══════════════════════════════════════════ */
export default function DashboardLayout({ storeUrl, autoStart = false, initialPage = "Home Page" }) {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [activeAudit, setActiveAudit] = useState(initialPage || "Home Page");
  const [pageCache, setPageCache] = useState({});
  const [runningPage, setRunningPage] = useState(null);
  const [runUrl, setRunUrl] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [auditLimitError, setAuditLimitError] = useState("");
  const [backendUnavailable, setBackendUnavailable] = useState(false);
  const backendCheckInFlightRef = useRef(null);
  const autostartRanRef = useRef(false);

  const auditsRemaining = isAuthenticated && user?.email ? getUserAuditRemaining(user.email) : null;

  const { data, loading, error, strategy, setStrategy, step, aiSource, run } =
    useAudit(null);

  useEffect(() => {
    if (initialPage && initialPage !== activeAudit) {
      setActiveAudit(initialPage);
      autostartRanRef.current = false;
    }
    // Intentionally only react to prop changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPage]);

  // Cache completed audit result per page + update usage counts
  useEffect(() => {
    if (data && runningPage) {
      setPageCache((prev) => ({
        ...prev,
        [runningPage]: { data, url: runUrl },
      }));
      setRunningPage(null);

      if (isAuthenticated && user?.email) {
        incrementUserAuditUsedCount(user.email);
      } else if (!isAuthenticated && runningPage === "Home Page" && !getAnonAuditUsed()) {
        markAnonAuditUsed();
      }
    }
  }, [data, runningPage, isAuthenticated, user?.email, runUrl]);

  const ensureBackendReady = async () => {
    // Avoid hammering /health when multiple submissions happen quickly.
    if (backendCheckInFlightRef.current) {
      return await backendCheckInFlightRef.current;
    }

    const p = (async () => {
      try {
        const ok = await checkBackendHealth();
        setBackendUnavailable(!ok);
        return ok;
      } catch {
        setBackendUnavailable(true);
        return false;
      } finally {
        backendCheckInFlightRef.current = null;
      }
    })();

    backendCheckInFlightRef.current = p;
    return await p;
  };

  const submitAudit = async (urlToAudit) => {
    const trimmed = (urlToAudit || "").trim();
    if (!trimmed) return false;

    setAuditLimitError("");
    // Block audit generation if backend isn't reachable.
    const backendOk = await ensureBackendReady();
    if (!backendOk) return false;

    // Anonymous: only 1 free audit total (Home Page only).
    if (!isAuthenticated) {
      const consumed = getAnonAuditUsed();
      if (consumed || activeAudit !== "Home Page") {
        const origin = extractStoreOrigin(trimmed);
        const nextAutostart = activeAudit === "Home Page" ? 1 : 0;
        const nextDash = `/dashboard?url=${encodeURIComponent(origin)}&page=${encodeURIComponent(activeAudit)}&autostart=${nextAutostart}`;
        navigate(`/login?next=${encodeURIComponent(nextDash)}`);
        return false;
      }
    } else {
      // Logged-in: max 5 audits total.
      const remaining = getUserAuditRemaining(user?.email);
      if (!user?.email || remaining <= 0) {
        setAuditLimitError("You’ve reached the 5-audit limit. Upgrade to keep auditing.");
        return false;
      }
    }

    setRunUrl(trimmed);
    setRunningPage(activeAudit);
    run(trimmed);
    return true;
  };

  useEffect(() => {
    if (!autoStart) return;
    if (autostartRanRef.current) return;
    if (!storeUrl) return;

    const pageToStart = initialPage || "Home Page";
    if (activeAudit !== pageToStart) return;

    const rawHost = storeUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const cfg = PAGE_CONFIG[activeAudit];
    const startUrl = rawHost + (cfg?.urlSuffix ?? "");

    const rule = PAGE_URL_RULES[activeAudit];
    autostartRanRef.current = true;
    if (!rule?.validate(startUrl)) return;

    submitAudit(startUrl);
  }, [activeAudit, autoStart, initialPage, storeUrl]);

  const rerunAudit = () => {
    const existing = pageCache[activeAudit];
    const url = existing?.url || storeUrl || "";
    setPageCache((prev) => {
      const next = { ...prev };
      delete next[activeAudit];
      return next;
    });
    if (url) submitAudit(url);
  };

  const cached = pageCache[activeAudit];
  const displayData = cached?.data;
  const nextPage = PAGE_ORDER[PAGE_ORDER.indexOf(activeAudit) + 1];

  const showLoading = loading;
  const showError = error && !loading && !displayData;
  const showInput = !loading && !displayData && !error && !auditLimitError;
  const showResults = !!displayData && !loading;

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafb]">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — hidden on mobile, overlay when open */}
      <div className={`fixed inset-y-0 left-0 z-40 w-56 transform transition-transform duration-300 md:relative md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <Sidebar
          storeUrl={storeUrl}
          activeAudit={activeAudit}
          setActiveAudit={(page) => {
            setActiveAudit(page);
            setSidebarOpen(false);
          }}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile sidebar toggle */}
        <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
          <div className="flex flex-1 items-center justify-between gap-3">
            <span className="text-sm font-bold text-gray-700 truncate">{activeAudit}</span>
            {isAuthenticated && typeof auditsRemaining === "number" && (
              <span className="text-[11px] font-bold text-gray-500 whitespace-nowrap">
                Audits left: <span className="text-emerald-600">{auditsRemaining}</span>/5
              </span>
            )}
          </div>
        </div>

        <DashboardHeader
          storeUrl={storeUrl}
          strategy={strategy}
          setStrategy={setStrategy}
          auditsRemaining={auditsRemaining}
        />

        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 md:px-8 md:py-8">
          {backendUnavailable && (
            <div className="mb-6 rounded-2xl border border-gray-200 bg-white px-6 py-5 text-left shadow-sm">
              <p className="text-sm font-bold text-gray-900">
                Under development, until you can contact us and hire us for auditing by our expert developers
              </p>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href="mailto:hello@auditmystore.com?subject=Audit%20Request"
                  className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-600 transition"
                >
                  Hire Auditing Experts
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          )}

          {auditLimitError && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-left">
              <p className="text-sm font-bold text-red-700">{auditLimitError}</p>
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => navigate("/pricing")}
                  className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-600 transition"
                >
                  View Pricing
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Loading */}
          {showLoading && <LoadingScreen url={runUrl} step={step} />}

          {/* Error */}
          {showError && <ErrorScreen error={error} onRetry={rerunAudit} />}

          {/* Input panel */}
          {showInput && (
            <PageInputPanel
              activeAudit={activeAudit}
              storeUrl={storeUrl}
              onSubmit={submitAudit}
            />
          )}

          {/* Results */}
          {showResults && (
            <div className="mx-auto max-w-5xl space-y-6">

              {/* Heading row */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="mb-1 flex flex-wrap items-center gap-3">
                    <h1 className="text-2xl font-black text-gray-900">
                      {activeAudit} Audit Overview
                    </h1>
                    {aiSource && AI_BADGE[aiSource] && (
                      <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1 text-[11px] font-bold ${AI_BADGE[aiSource].cls}`}>
                        <span>{AI_BADGE[aiSource].icon}</span>
                        {AI_BADGE[aiSource].label}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    Analyzed:{" "}
                    <a
                      href={`https://${cached?.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-emerald-600 hover:underline"
                    >
                      {cached?.url}
                    </a>
                  </p>
                  {displayData.summary && (
                    <p className="mt-2 max-w-2xl text-sm italic leading-relaxed text-gray-500">
                      "{displayData.summary}"
                    </p>
                  )}
                </div>

                {/* Re-run button */}
                <button
                  onClick={rerunAudit}
                  className="flex-shrink-0 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-600 shadow-sm transition hover:border-emerald-300 hover:text-emerald-600"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M1 4v6h6M23 20v-6h-6" />
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                  </svg>
                  Re-run
                </button>
              </div>

              {/* Stat cards */}
              <AuditOverview data={displayData} />

              {/* Core Web Vitals */}
              <MetricsRow metrics={displayData.metrics} />

              {/* Next step banner — hidden on last page */}
              {nextPage && (
                <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {activeAudit} Audit is completed.
                    </p>
                    <p className="text-sm text-gray-500">
                      Next, analyze your {nextPage} for more optimization opportunities.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveAudit(nextPage)}
                    className="ml-6 flex-shrink-0 flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-600 active:scale-95"
                  >
                    Start {nextPage} Audit
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Upsell */}
              <UpsellBanner />

              {/* Detailed problems */}
              <DetailedReport problems={displayData.problems} />

            </div>
          )}
        </main>
      </div>
    </div>
  );
}