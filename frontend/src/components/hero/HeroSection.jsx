import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Lock, CheckCircle } from "lucide-react";
import BadgeStrip from "./BadgeStrip";
import AuditInput from "./AuditInput";
import FeatureCards from "./FeatureCards";
import AuditModal from "../audit-modal/AuditModal";
import { useAuth } from "../../context/AuthContext";
import { getAnonAuditUsed } from "../../lib/auditUsage";
import { extractStoreOrigin } from "../../lib/shopifyValidator";

export default function HeroSection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const [initialUrl, setInitialUrl] = useState("");

  const handleAuditClick = (url) => {
    const rawUrl = (url || "").trim();
    if (!rawUrl) return;

    const storeOrigin = extractStoreOrigin(rawUrl);

    // Logged-in users bypass the email modal and auto-start Home Page audit.
    if (isAuthenticated) {
      navigate(
        `/dashboard?url=${encodeURIComponent(storeOrigin)}&autostart=1&page=${encodeURIComponent("Home Page")}`
      );
      return;
    }

    // Anonymous users get 1 free audit total; after that they must sign up.
    if (getAnonAuditUsed()) {
      const next = `/dashboard?url=${encodeURIComponent(storeOrigin)}&autostart=1&page=${encodeURIComponent("Home Page")}`;
      navigate(`/login?next=${encodeURIComponent(next)}`);
      return;
    }

    // First-time anonymous: collect email inside the modal.
    setInitialUrl(rawUrl);
    setModalOpen(true);
  };

  return (
    <>
      <section className="relative min-h-screen w-full overflow-hidden">

        {/* ── BACKGROUND LAYER ── */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 10% 0%, rgba(167,243,208,0.45) 0%, transparent 60%),
                radial-gradient(ellipse 60% 50% at 90% 5%, rgba(186,230,255,0.40) 0%, transparent 55%),
                radial-gradient(ellipse 60% 50% at 50% 100%, rgba(209,250,229,0.35) 0%, transparent 60%),
                linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 35%, #f0f9ff 65%, #f8fafc 100%)
              `,
            }}
          />

          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `radial-gradient(circle, #6ee7b7 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />

          <div className="animate-float absolute -top-20 -left-20 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
          <div className="animate-float-reverse absolute top-10 right-10 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl" />

          <svg className="animate-float absolute top-[18%] left-[10%] opacity-15" width="18" height="18" viewBox="0 0 20 20">
            <path d="M10 2v16M2 10h16" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <svg className="animate-float-reverse absolute top-[28%] right-[9%] opacity-15" width="14" height="14" viewBox="0 0 20 20">
            <path d="M10 2v16M2 10h16" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
          </svg>

          <div className="animate-float absolute top-[50%] left-[5%] h-2 w-2 rounded-full bg-emerald-400/40" />
          <div className="animate-float-reverse absolute top-[60%] right-[7%] h-2 w-2 rounded-full bg-sky-400/40" />
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="mx-auto flex max-w-3xl flex-col items-center px-5 pt-24 pb-20 text-center sm:pt-28 sm:px-6 lg:px-8">

          {/* Badge */}
          <div className="opacity-0-init animate-fade-in-up delay-100">
            <BadgeStrip />
          </div>

          {/* Heading */}
          <h1 className="opacity-0-init animate-fade-in-up delay-200 mt-7 text-[42px] font-extrabold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-[68px]">
            AI-Powered Store
            <br />
            Growth{" "}
            <span className="relative inline-block">
              Audit
              <svg
                className="absolute -bottom-1.5 left-0 w-full"
                viewBox="0 0 300 10"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 7 C50 2, 100 10, 150 5 S250 1, 298 6"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="opacity-0-init animate-fade-in-up delay-300 mt-6 max-w-lg text-base leading-relaxed text-gray-500 sm:text-lg">
            Instant AI analysis. Expert human review. Actionable fixes that
            actually move your{" "}
            <span className="font-semibold text-gray-700">revenue needle</span>.
          </p>

          {/* ── TRUST INDICATORS ── */}
          <div className="opacity-0-init animate-fade-in-up delay-400 mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {[
              { icon: Zap, text: "Results in 60s", iconCls: "text-amber-400" },
              { icon: Lock, text: "No signup needed", iconCls: "text-emerald-500" },
              { icon: CheckCircle, text: "100% Free audit", iconCls: "text-sky-500" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <span key={i} className="flex items-center gap-1.5">
                  <Icon className={`h-3.5 w-3.5 ${item.iconCls}`} strokeWidth={2.5} />
                  <span className="text-xs font-medium text-gray-500">{item.text}</span>
                </span>
              );
            })}
          </div>

          {/* Audit Input */}
          <div className="opacity-0-init animate-fade-in-up delay-500 mt-8 w-full">
            <AuditInput onAuditClick={handleAuditClick} />
          </div>

          {/* Feature Cards */}
          <div className="opacity-0-init animate-fade-in-up delay-600 mt-10 w-full">
            <FeatureCards />
          </div>

          {/* ── SHOPIFY PARTNER BADGE ── */}
          <div className="opacity-0-init animate-fade-in-up delay-700 mt-12 flex items-center gap-2.5 cursor-default">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 109.5 124.5" className="h-8 w-8">
              <path fill="#95BF47" d="M74.7 14.8s-1.4.4-3.7 1.1c-.4-1.3-1-2.8-1.8-4.4-2.7-5.1-6.6-7.8-11.3-7.8-.3 0-.6 0-1 .1-.1-.2-.3-.3-.4-.5-2-2.2-4.6-3.2-7.7-3.1-6 .2-12 4.5-16.8 12.2-3.4 5.4-6 12.2-6.7 17.5-6.9 2.1-11.7 3.6-11.8 3.7-3.5 1.1-3.6 1.2-4 4.5C9.2 40.7 0 111.5 0 111.5l75.6 13V14.6c-.3.1-.6.1-.9.2zm-17.4 5.3c-4 1.2-8.4 2.6-12.7 3.9 1.2-4.7 3.6-9.4 6.4-12.5 1.1-1.1 2.6-2.4 4.3-3.1 1.7 3.4 2.1 8.1 2 11.7zm-8.4-15.9c1.4 0 2.6.3 3.6.9-1.6.8-3.2 2.1-4.7 3.6-3.8 4.1-6.7 10.5-7.9 16.6-3.6 1.1-7.2 2.2-10.5 3.2 1.9-9.2 9-23.9 19.5-24.3zm-3.6 53.8c.4 6.4 17.3 7.8 18.3 22.9.7 11.9-6.3 20-16.4 20.6-12.2.8-18.9-6.4-18.9-6.4l2.6-11s6.7 5.1 12.1 4.7c3.5-.2 4.8-3.1 4.7-5.1-.5-8.4-14.3-7.9-15.2-21.7-.8-11.6 6.9-23.4 23.7-24.5 6.5-.4 9.8 1.2 9.8 1.2l-3.8 14.5s-4.3-2-9.4-1.6c-7.4.5-7.5 5.2-7.5 6.4zm29.2-37.3c0-3.3-.4-8-1.9-12 4.8.9 7.1 6.3 8.1 9.6-1.9.6-3.9 1.2-6.2 2v.4z" />
              <path fill="#5E8E3E" d="M75.5 124.5l34-8.5S96.1 21.9 96 21.1c-.1-.8-.8-1.3-1.5-1.3-1.1 0-4.2-.1-6.4-.1-2.6 0-3.4 0-3.4 0-1.7-4.7-4.6-8.8-9.2-11.2v116z" />
            </svg>
            <span className="text-base font-black text-[black] tracking-wide">
              shopify <span className="font-light text-[black]">partners</span>
            </span>
          </div>

        </div>
      </section>

      {/* Audit Modal */}
      <AuditModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialUrl={initialUrl}
      />
    </>
  );
}