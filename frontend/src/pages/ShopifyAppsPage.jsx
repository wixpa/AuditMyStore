import { useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { ExternalLink, X, Check } from "lucide-react";

const apps = [
   {
      name: "Wixpa Google Shopping Feed",
      tagline: "Multi-Feed for Google, Facebook, Pinterest & AI",
      description:
         "Create & manage multi feeds for Google Shopping, Facebook, Pinterest, Microsoft, and ChatGPT, Gemini. Take your e-commerce business to the next level with our powerful product feed management app. Easily create and optimize multi-product feeds for Google Merchant Center, Facebook Shops, Pinterest, Microsoft shopping, Snapchat, and TikTok, Google & YouTube. Boost sales with Google Shopping Feed XML, Local Inventory Ads, GTIN sync, bulk editing, and error-free listings. Publish products on AI-driven platforms like ChatGPT, Perplexity, Claude, Gemini, and Grok to stay ahead in the digital landscape.",
      features: [
         "Support for multi language, multi currency & submits feed for Google shopping",
         "Manage multi feed for Google shopping, Facebook Feed, Pinterest, TikTok, Microsoft",
         "Publish products on ChatGPT, Perplexity, Claude, & Gemini for next-gen discovery",
         "Sync your products with Google in real-time while targeting multiple countries",
         "Built-in feed rules to streamline and enhance your shopping feed performance",
      ],
      link: "#",
      color: "from-emerald-500 to-teal-600",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: (
         <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
         </svg>
      ),
   },
   {
      name: "Wixpa Google Analytics 4 (GA4)",
      tagline: "No-Code GA4 Install in Under 2 Minutes",
      description:
         "Quickly link your store to Google Analytics 4 (GA4) in less than two minutes. No coding skills needed. Google Analytics Universal is on its way out, and all stores must transition to Google Analytics 4. Effortlessly install Google Analytics 4 with just a few clicks to Track GA4 events & Google Ads Conversion Tracking. Capture your Google Shopping data effortlessly in your GA4 and Google Ads Tracking. You can also log your Google Ads conversion data seamlessly. Google tag manager, Google ads tracking.",
      features: [
         "Easy, No-Code Install. Start tracking a dozen event types in GA4 in minutes",
         "Our solution integrates seamlessly with Checkout extensibility",
         "Track all eCommerce events, orders and conversions automatically!",
         "Google Ads tracking and multi-tag support with data layers for e-commerce events",
         "Accurate & Complete GA4 Ecommerce Integration & Fine-tuning & Expert Support",
      ],
      link: "#",
      color: "from-sky-500 to-blue-600",
      iconBg: "bg-sky-100",
      iconColor: "text-sky-600",
      badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
      icon: (
         <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
         </svg>
      ),
   },
   {
      name: "Wixpa Google Tag Manager ‑ GTM",
      tagline: "Multi-Channel Tracking Made Simple",
      description:
         "Wixpa Google Tag Manager simplifies multi-channel tracking for your store, supporting a variety of tracking pixels, including Google Ads Pixel, Google Analytics, Pinterest tag, Snapchat, Twitter, Google Analytics 4, UET Bing Tags, Google Shopping Ads, Reddit, Quora, Hotjar, Mixpanel, LinkedIn, Taboola, Outbrain, and more. Easily manage and track all your marketing and analytics tags using Google Tag Manager GTM without coding. Optimize performance across multiple channels, all from one platform.",
      features: [
         "Quick and simple GTM setup with multi-channel tracking support",
         "Including Google Ads, Google Analytics 4, Pinterest, Snapchat, Twitter, Taboola",
         "Pre-built data layer with all e-commerce events (\"purchase\", \"addToCart\"...)",
         "Effortlessly integrate a Server-Side GTM container with minimal setup",
         "Achieve flawless integration with Checkout Extensibility",
      ],
      link: "#",
      color: "from-violet-500 to-purple-600",
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      badgeColor: "bg-violet-50 text-violet-700 border-violet-200",
      icon: (
         <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
         </svg>
      ),
   },
   {
      name: "Wixpa Google Ads Remarketing",
      tagline: "One-Click Dynamic Retargeting Tags",
      description:
         "Effortlessly Set Up Dynamic Google Ads Retargeting Tags and Launch Retargeting Ads with Ease. Installing Google Ads Dynamic Retargeting Tag manually can often lead to unexpected errors and headaches. Google frequently updates its code, making manual maintenance a challenging task. Wixpa Retargeting Pixel App for Google Ads simplifies this process with a one-click installation of Google's retargeting code. We take care of keeping the code up-to-date with Google's changes, ensuring Google Ads Tracking.",
      features: [
         "Install Google ads remarketing tags",
         "Install the Google ads Dynamic remarketing conversion pixel in one click",
         "No technical background required — No code change or theme file edits",
         "Our solution integrates seamlessly with Checkout extensibility",
      ],
      link: "#",
      color: "from-amber-500 to-orange-600",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
      icon: (
         <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
         </svg>
      ),
   },
];

function AppDetailModal({ app, open, onClose }) {
   if (!open || !app) return null;

   return (
      <>
         {/* Backdrop */}
         <div
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
         />
         {/* Modal */}
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div
               className="pointer-events-auto w-full max-w-lg rounded-3xl border border-gray-200/80 bg-white shadow-2xl animate-slide-up overflow-hidden"
               onClick={(e) => e.stopPropagation()}
            >
               {/* Gradient header */}
               <div className={`relative bg-gradient-to-r ${app.color} px-7 pt-7 pb-6`}>
                  <button
                     onClick={onClose}
                     className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-white/30 hover:scale-110"
                  >
                     <X className="h-4 w-4" strokeWidth={2.5} />
                  </button>
                  <div className="flex items-center gap-3">
                     <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-white">
                        {app.icon}
                     </div>
                     <div>
                        <h3 className="text-lg font-extrabold text-white leading-tight">{app.name}</h3>
                        <p className="mt-0.5 text-sm text-white/70">{app.tagline}</p>
                     </div>
                  </div>
               </div>

               {/* Body */}
               <div className="px-7 py-6 max-h-[60vh] overflow-y-auto">
                  <p className="text-sm leading-relaxed text-gray-600 mb-6">
                     {app.description}
                  </p>

                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Key Features</h4>
                  <ul className="space-y-2.5 mb-6">
                     {app.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                           <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" strokeWidth={2.5} />
                           <span className="text-sm text-gray-600">{f}</span>
                        </li>
                     ))}
                  </ul>

                  {/* Link */}
                  {app.link && (
                     <a
                        href={app.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r ${app.color} px-5 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] no-underline`}
                     >
                        View on Shopify
                        <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.5} />
                     </a>
                  )}
               </div>
            </div>
         </div>
      </>
   );
}

export default function ShopifyAppsPage() {
   const [selectedApp, setSelectedApp] = useState(null);

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
                  <div className="mb-16 text-center">
                     <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700 shadow-sm">
                        ✦ Our Agency Apps
                     </span>
                     <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-[56px]">
                        Shopify Apps We've{" "}
                        <span className="relative inline-block">
                           Built
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
                        Powerful Shopify apps built by our agency to help merchants grow with better tracking, feeds, and marketing.
                     </p>
                  </div>

                  {/* Apps Grid — Clean 2x2 */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                     {apps.map((app, index) => (
                        <button
                           key={index}
                           onClick={() => setSelectedApp(app)}
                           className="group relative flex flex-col items-start overflow-hidden rounded-2xl border border-gray-200/70 bg-white/90 p-6 text-left shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-gray-300/80 cursor-pointer"
                        >
                           {/* Accent line */}
                           <div className={`absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r ${app.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                           <div className="flex items-center gap-3.5 mb-3">
                              <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${app.iconBg} ${app.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                                 {app.icon}
                              </div>
                              <div className="min-w-0">
                                 <h3 className="text-[15px] font-extrabold text-gray-900 leading-snug">{app.name}</h3>
                              </div>
                           </div>

                           <p className="text-sm text-gray-500 leading-relaxed mb-4">{app.tagline}</p>

                           <div className="mt-auto flex items-center gap-3 w-full">
                              <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${app.badgeColor}`}>
                                 <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                                 Shopify App
                              </span>
                              <span className="ml-auto text-xs font-semibold text-gray-400 group-hover:text-emerald-600 transition-colors flex items-center gap-1">
                                 View Details
                                 <svg className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
                              </span>
                           </div>
                        </button>
                     ))}
                  </div>
               </div>
            </section>
         </main>
         <Footer />

         {/* App Detail Modal */}
         <AppDetailModal
            app={selectedApp}
            open={!!selectedApp}
            onClose={() => setSelectedApp(null)}
         />
      </>
   );
}
