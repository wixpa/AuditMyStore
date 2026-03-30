import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { PRICING_TIERS, getDisplayPrice } from "../lib/pricingLogic";
import { Check, Sparkles, Zap, Building2, ArrowRight, Shield, MessageCircle } from "lucide-react";

const TIER_ICONS = {
   starter: Zap,
   growth: Sparkles,
   agency: Building2,
};

const TIER_ACCENT = {
   starter: {
      border: "border-gray-200",
      bg: "bg-white",
      badge: "",
      iconBg: "bg-gray-100",
      iconText: "text-gray-600",
      ctaBg: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50",
      check: "text-gray-400",
   },
   growth: {
      border: "border-emerald-300 ring-2 ring-emerald-100",
      bg: "bg-white",
      badge: "bg-emerald-500 text-white",
      iconBg: "bg-emerald-100",
      iconText: "text-emerald-600",
      ctaBg: "bg-gray-900 text-white hover:bg-emerald-600 shadow-lg shadow-gray-900/20",
      check: "text-emerald-500",
   },
   agency: {
      border: "border-gray-200",
      bg: "bg-white",
      badge: "bg-gray-900 text-white",
      iconBg: "bg-violet-100",
      iconText: "text-violet-600",
      ctaBg: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50",
      check: "text-violet-500",
   },
};

function PricingCard({ tier, yearly }) {
   const accent = TIER_ACCENT[tier.id];
   const Icon = TIER_ICONS[tier.id];
   const price = getDisplayPrice(tier, yearly);

   return (
      <div
         className={`relative flex flex-col rounded-3xl border p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${accent.border} ${accent.bg}`}
      >
         {/* Badge */}
         {tier.badge && (
            <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold ${accent.badge}`}>
               {tier.badge}
            </div>
         )}

         {/* Icon + name */}
         <div className="mb-5">
            <div className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl ${accent.iconBg}`}>
               <Icon className={`h-5 w-5 ${accent.iconText}`} strokeWidth={2} />
            </div>
            <h3 className="text-lg font-extrabold text-gray-900">{tier.name}</h3>
            <p className="mt-0.5 text-sm text-gray-500">{tier.description}</p>
         </div>

         {/* Price */}
         <div className="mb-6">
            <div className="flex items-baseline gap-1">
               <span className="text-4xl font-black text-gray-900">
                  {price === 0 ? "Free" : `$${price}`}
               </span>
               {price > 0 && (
                  <span className="text-sm font-medium text-gray-400">
                     /month{yearly ? " (billed yearly)" : ""}
                  </span>
               )}
            </div>
            {yearly && tier.monthlyPrice > 0 && (
               <p className="mt-1 text-xs font-semibold text-emerald-600">
                  Save ${tier.monthlyPrice * 12 - tier.yearlyPrice}/year
               </p>
            )}
         </div>

         {/* Features */}
         <ul className="mb-7 flex-1 space-y-3">
            {tier.features.map((feature, i) => (
               <li key={i} className="flex items-start gap-2.5">
                  <Check className={`mt-0.5 h-4 w-4 flex-shrink-0 ${accent.check}`} strokeWidth={2.5} />
                  <span className="text-sm text-gray-600">{feature}</span>
               </li>
            ))}
         </ul>

         {/* CTA */}
         <Link
            to={tier.id === "agency" ? "#" : "/"}
            className={`flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-200 active:scale-[0.97] ${accent.ctaBg}`}
         >
            {tier.cta}
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
         </Link>
      </div>
   );
}

export default function PricingPage() {
   const [yearly, setYearly] = useState(false);

   return (
      <>
         <Header />
         <main>
            <section className="relative min-h-screen w-full overflow-hidden">
               {/* Background */}
               <div className="absolute inset-0 -z-10">
                  <div
                     className="absolute inset-0"
                     style={{
                        background: `
                           radial-gradient(ellipse 80% 60% at 10% 0%, rgba(167,243,208,0.35) 0%, transparent 60%),
                           radial-gradient(ellipse 60% 50% at 90% 5%, rgba(186,230,255,0.30) 0%, transparent 55%),
                           radial-gradient(ellipse 60% 50% at 50% 100%, rgba(209,250,229,0.25) 0%, transparent 60%),
                           linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 35%, #f0f9ff 65%, #f8fafc 100%)
                        `,
                     }}
                  />
                  <div
                     className="absolute inset-0 opacity-[0.05]"
                     style={{
                        backgroundImage: `radial-gradient(circle, #6ee7b7 1px, transparent 1px)`,
                        backgroundSize: "32px 32px",
                     }}
                  />
               </div>

               <div className="mx-auto max-w-6xl px-5 pt-32 pb-24 sm:px-6">
                  {/* Header */}
                  <div className="mb-14 text-center">
                     <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700 shadow-sm">
                        ✦ Simple Pricing
                     </span>
                     <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-[56px]">
                        Plans for every{" "}
                        <span className="relative inline-block">
                           stage
                           <svg
                              className="absolute -bottom-2 left-0 w-full"
                              viewBox="0 0 180 10"
                              fill="none"
                              preserveAspectRatio="none"
                           >
                              <path
                                 d="M2 7 C40 2, 80 10, 120 5 S165 2, 178 6"
                                 stroke="#10b981"
                                 strokeWidth="2.5"
                                 strokeLinecap="round"
                                 fill="none"
                              />
                           </svg>
                        </span>
                     </h1>
                     <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-gray-500 sm:text-lg">
                        Start free. Upgrade when you need more audits, deeper insights, or team access.
                     </p>

                     {/* Billing toggle */}
                     <div className="mt-8 flex items-center justify-center gap-3">
                        <span className={`text-sm font-semibold ${!yearly ? "text-gray-900" : "text-gray-400"}`}>
                           Monthly
                        </span>
                        <button
                           onClick={() => setYearly(!yearly)}
                           className={`relative h-7 w-12 rounded-full transition-colors duration-200 ${
                              yearly ? "bg-emerald-500" : "bg-gray-300"
                           }`}
                        >
                           <span
                              className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                                 yearly ? "translate-x-5" : ""
                              }`}
                           />
                        </button>
                        <span className={`text-sm font-semibold ${yearly ? "text-gray-900" : "text-gray-400"}`}>
                           Yearly
                        </span>
                        {yearly && (
                           <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                              Save 20%
                           </span>
                        )}
                     </div>
                  </div>

                  {/* Pricing cards */}
                  <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
                     {PRICING_TIERS.map((tier) => (
                        <PricingCard key={tier.id} tier={tier} yearly={yearly} />
                     ))}
                  </div>

                  {/* Bottom trust */}
                  <div className="mt-16 text-center">
                     <div className="mx-auto flex max-w-lg flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-gray-200/60 bg-white/60 px-8 py-5 shadow-sm backdrop-blur-sm">
                        {[
                           { icon: Shield, text: "No credit card required", color: "text-emerald-500", bg: "bg-emerald-50" },
                           { icon: Zap, text: "Cancel anytime", color: "text-amber-500", bg: "bg-amber-50" },
                           { icon: MessageCircle, text: "Priority support", color: "text-sky-500", bg: "bg-sky-50" },
                        ].map((item, i) => {
                           const Icon = item.icon;
                           return (
                              <span key={i} className="flex items-center gap-2.5 text-sm text-gray-600">
                                 <span className={`flex h-8 w-8 items-center justify-center rounded-full ${item.bg}`}>
                                    <Icon className={`h-4 w-4 ${item.color}`} strokeWidth={2} />
                                 </span>
                                 <span className="font-medium">{item.text}</span>
                              </span>
                           );
                        })}
                     </div>
                  </div>
               </div>
            </section>
         </main>
         <Footer />
      </>
   );
}
