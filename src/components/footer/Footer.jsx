import { useState } from "react";

const quickLinks = [
   { label: "Home", href: "#" },
   { label: "Pricing", href: "#" },
   { label: "For Agencies", href: "#" },
   { label: "Contact Us", href: "#" },
   { label: "Blogs", href: "#" },
];

const auditLinks = [
   { label: "Product Page Audit", href: "#" },
   { label: "Cart Page Audit", href: "#" },
   { label: "Collection Page Audit", href: "#" },
   { label: "AI SEO Audit", href: "#" },
   { label: "Page Speed Audit", href: "#" },
];

const toolLinks = [
   { label: "AI Visibility Checker", href: "#" },
   { label: "LLM.txt Generator", href: "#" },
   { label: "Robots.txt Generator", href: "#" },
   { label: "Schema Markup Tool", href: "#" },
];

/* ── All social icons as pure SVGs ── */
const XIcon = () => (
   <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
   </svg>
);

const InstagramIcon = () => (
   <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
   >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
   </svg>
);

const LinkedinIcon = () => (
   <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
   </svg>
);

const YoutubeIcon = () => (
   <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
   </svg>
);

const ArrowRightIcon = () => (
   <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
   >
      <path d="M5 12h14M12 5l7 7-7 7" />
   </svg>
);

const socials = [
   {
      Icon: XIcon,
      href: "#",
      label: "X / Twitter",
      hover: "hover:bg-gray-700 hover:text-white",
   },
   {
      Icon: InstagramIcon,
      href: "#",
      label: "Instagram",
      hover: "hover:bg-pink-500/20 hover:text-pink-400",
   },
   {
      Icon: LinkedinIcon,
      href: "#",
      label: "LinkedIn",
      hover: "hover:bg-sky-500/20 hover:text-sky-400",
   },
   {
      Icon: YoutubeIcon,
      href: "#",
      label: "YouTube",
      hover: "hover:bg-red-500/20 hover:text-red-400",
   },
];

export default function Footer() {
   const [email, setEmail] = useState("");
   const [submitted, setSubmitted] = useState(false);

   const handleSubscribe = (e) => {
      e.preventDefault();
      if (!email.trim()) return;
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail("");
   };

   return (
      <footer className="relative w-full overflow-hidden">
         {/* ── BACKGROUND ── */}
         <div
            className="absolute inset-0 -z-10"
            style={{
               background: `
            radial-gradient(ellipse 80% 40% at 50% 0%, rgba(16,185,129,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 50% 30% at 0% 100%, rgba(56,189,248,0.05) 0%, transparent 55%),
            radial-gradient(ellipse 50% 30% at 100% 100%, rgba(139,92,246,0.05) 0%, transparent 55%),
            linear-gradient(170deg, #111827 0%, #0f172a 50%, #0d1117 100%)
          `,
            }}
         />

         {/* Dot grid */}
         <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
               backgroundImage: `radial-gradient(circle, #34d399 1px, transparent 1px)`,
               backgroundSize: "32px 32px",
            }}
         />

         {/* Top glow line */}
         <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

         {/* Blobs */}
         <div className="animate-float absolute -top-10 left-1/3 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
         <div className="animate-float-reverse absolute bottom-10 right-1/4 h-56 w-56 rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />

         {/* Floating crosses */}
         <svg
            className="animate-float absolute top-[20%] left-[3%] opacity-10 pointer-events-none"
            width="16"
            height="16"
            viewBox="0 0 20 20"
         >
            <path
               d="M10 2v16M2 10h16"
               stroke="#34d399"
               strokeWidth="2.5"
               strokeLinecap="round"
            />
         </svg>
         <svg
            className="animate-float-reverse absolute top-[30%] right-[3%] opacity-10 pointer-events-none"
            width="14"
            height="14"
            viewBox="0 0 20 20"
         >
            <path
               d="M10 2v16M2 10h16"
               stroke="#38bdf8"
               strokeWidth="2.5"
               strokeLinecap="round"
            />
         </svg>
         <div className="animate-float absolute top-[50%] right-[5%] h-2.5 w-2.5 rotate-45 border border-emerald-400/20 opacity-60 pointer-events-none" />
         <div className="animate-float-reverse absolute top-[15%] left-[8%] h-2 w-2 rounded-full bg-emerald-400/15 opacity-70 pointer-events-none" />

         {/* ── MAIN CONTENT ── */}
         <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
            {/* TOP GRID */}
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 pb-14">
               {/* ── BRAND COLUMN ── */}
               <div className="flex flex-col gap-5">
                  {/* Logo */}
                  <div className="flex items-center gap-2">
                     <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/30">
                        <span className="text-sm font-black text-white">F</span>
                     </div>
                     <span className="text-lg font-black text-white tracking-tight">
                        FixMyStore
                     </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
                     Get comprehensive Shopify AI audits powered by advanced
                     analysis. Built for brands and agencies looking to optimize
                     stores with actionable, data-driven recommendations.
                  </p>

                  {/* Social icons */}
                  <div className="flex items-center gap-2">
                     {socials.map(({ Icon, href, label, hover }, i) => (
                        <a
                           key={i}
                           href={href}
                           aria-label={label}
                           className={`flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/5 text-gray-400 transition-all duration-200 ${hover} hover:scale-110`}
                        >
                           <Icon />
                        </a>
                     ))}
                  </div>

                  {/* Newsletter strip */}
                  <div>
                     <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Get audit tips →
                     </p>
                     <form
                        onSubmit={handleSubscribe}
                        className="flex items-center gap-2"
                     >
                        <input
                           type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder="your@email.com"
                           className="flex-1 min-w-0 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder:text-gray-500 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
                        />
                        <button
                           type="submit"
                           className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white transition-all hover:bg-emerald-400 hover:scale-105 active:scale-95"
                        >
                           {submitted ? (
                              <span className="text-[10px] font-black">✓</span>
                           ) : (
                              <ArrowRightIcon />
                           )}
                        </button>
                     </form>
                  </div>
               </div>

               {/* ── LINK COLUMNS ── */}
               <FooterLinkCol
                  title="Quick Links"
                  links={quickLinks}
                  accentColor="text-emerald-400"
               />
               <FooterLinkCol
                  title="Audit Links"
                  links={auditLinks}
                  accentColor="text-sky-400"
               />
               <FooterLinkCol
                  title="Tools"
                  links={toolLinks}
                  accentColor="text-violet-400"
               />
            </div>

            {/* ── FEATURED BADGE ── */}
            <div className="flex justify-center pb-10">
               <div className="group relative inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-6 py-3 shadow-lg shadow-emerald-900/20 backdrop-blur-sm transition-all duration-300 hover:bg-emerald-400/15 hover:scale-105 cursor-pointer">
                  <span className="relative flex h-3 w-3">
                     <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                     <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                  </span>
                  <div>
                     <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-emerald-400/70">
                        Featured on
                     </p>
                     <p className="text-sm font-black text-emerald-300 leading-tight">
                        FixMyStore.com
                     </p>
                  </div>
                  {/* Shimmer */}
                  <div className="pointer-events-none absolute inset-0 -translate-x-full rounded-full bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
               </div>
            </div>

            {/* ── DIVIDER ── */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* ── BOTTOM BAR ── */}
            <div className="flex flex-col items-center justify-between gap-4 pt-6 sm:flex-row">
               {/* Avatar + copyright */}
               <div className="flex items-center gap-3">
                  <div className="relative">
                     <div className="h-9 w-9 rounded-full border-2 border-emerald-500/40 shadow-md bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                        <span className="text-xs font-black text-white">
                           FM
                        </span>
                     </div>
                     <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-gray-900 bg-emerald-400" />
                  </div>
                  <p className="text-xs text-gray-500">
                     © 2026{" "}
                     <span className="text-gray-300 font-semibold">
                        FixMyStore
                     </span>
                     . All rights reserved.
                  </p>
               </div>

               {/* Legal links */}
               <div className="flex items-center gap-2 text-xs text-gray-500">
                  <a href="#" className="transition-colors hover:text-gray-300">
                     Privacy Policy
                  </a>
                  <span className="opacity-30">|</span>
                  <a href="#" className="transition-colors hover:text-gray-300">
                     Terms of Service
                  </a>
                  <span className="opacity-30">|</span>
                  <a href="#" className="transition-colors hover:text-gray-300">
                     Cookie Policy
                  </a>
               </div>

               {/* Brand wordmark */}
               <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Powered by AI</span>
                  <span className="text-xs font-black text-white tracking-tight">
                     Fix My Store
                  </span>
               </div>
            </div>
         </div>
      </footer>
   );
}

/* ── Reusable link column ── */
function FooterLinkCol({ title, links, accentColor }) {
   return (
      <div className="flex flex-col gap-4">
         <h4
            className={`text-[11px] font-black uppercase tracking-[0.15em] ${accentColor}`}
         >
            {title}
         </h4>
         <ul className="flex flex-col gap-3">
            {links.map((link, i) => (
               <li key={i}>
                  <a
                     href={link.href}
                     className="group relative inline-flex items-center text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                  >
                     <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-emerald-400 to-transparent transition-all duration-300 group-hover:w-full" />
                     {link.label}
                  </a>
               </li>
            ))}
         </ul>
      </div>
   );
}
