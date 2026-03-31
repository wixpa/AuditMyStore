import { useState, useEffect } from "react";
import { useHireModal } from "../../context/HireModalContext";
import { useAuth } from "../../context/AuthContext";

const EMAILJS_SERVICE_ID = "service_m5aij5f";
const EMAILJS_TEMPLATE_ID = "template_3wu6tpw";
const EMAILJS_PUBLIC_KEY = "02Qg6_k1906RkWlP9";

/* ── Clean SVG icons for each service ── */
const CROIcon = () => (
   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
   </svg>
);

const SEOIcon = () => (
   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
   </svg>
);

const AuditIcon = () => (
   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
   </svg>
);

const MobileIcon = () => (
   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
   </svg>
);

const SpeedIcon = () => (
   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
   </svg>
);

const SERVICE_OPTIONS = [
   { id: "cro", label: "Conversion Rate Optimization (CRO)", Icon: CROIcon, color: "text-emerald-600" },
   { id: "seo", label: "SEO Optimization", Icon: SEOIcon, color: "text-sky-600" },
   { id: "audit", label: "App Audit & Performance", Icon: AuditIcon, color: "text-violet-600" },
   { id: "mobile", label: "Mobile Experience Optimization", Icon: MobileIcon, color: "text-amber-600" },
   { id: "speed", label: "Page Speed Optimization", Icon: SpeedIcon, color: "text-rose-500" },
];

export default function HireFormModal() {
   const { isOpen, closeHireModal } = useHireModal();
   const { user, isAuthenticated } = useAuth();

   const [form, setForm] = useState({
      user_name: "",
      user_email: "",
      website_url: "",
   });
   const [selectedServices, setSelectedServices] = useState([]);
   const [sending, setSending] = useState(false);
   const [success, setSuccess] = useState(false);
   const [error, setError] = useState("");

   // Pre-fill name/email when user is logged in
   useEffect(() => {
      if (isAuthenticated && user) {
         setForm((prev) => ({
            ...prev,
            user_name: user.name || prev.user_name,
            user_email: user.email || prev.user_email,
         }));
      }
   }, [isAuthenticated, user]);

   // Reset form when modal opens
   useEffect(() => {
      if (isOpen) {
         setSuccess(false);
         setError("");
         if (isAuthenticated && user) {
            setForm({
               user_name: user.name || "",
               user_email: user.email || "",
               website_url: "",
            });
         }
      }
   }, [isOpen, isAuthenticated, user]);

   // Lock body scroll when modal is open
   useEffect(() => {
      if (isOpen) {
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = "";
      }
      return () => {
         document.body.style.overflow = "";
      };
   }, [isOpen]);

   // Close on Escape key
   useEffect(() => {
      const handleEsc = (e) => {
         if (e.key === "Escape" && isOpen) closeHireModal();
      };
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
   }, [isOpen, closeHireModal]);

   if (!isOpen) return null;

   const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
      if (error) setError("");
   };

   const toggleService = (id) => {
      setSelectedServices((prev) =>
         prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
      );
      if (error) setError("");
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");

      if (!form.user_name.trim()) {
         setError("Please enter your name.");
         return;
      }
      if (!form.user_email.trim()) {
         setError("Please enter your email address.");
         return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.user_email.trim())) {
         setError("Please enter a valid email address.");
         return;
      }
      if (!form.website_url.trim()) {
         setError("Please enter your website URL.");
         return;
      }
      if (selectedServices.length === 0) {
         setError("Please select at least one service.");
         return;
      }

      const servicesStr = selectedServices
         .map((id) => {
            const svc = SERVICE_OPTIONS.find((s) => s.id === id);
            return svc ? `• ${svc.label}` : "";
         })
         .filter(Boolean)
         .join("\n");

      const templateParams = {
         user_name: form.user_name.trim(),
         user_email: form.user_email.trim(),
         website_url: form.website_url.trim(),
         services: servicesStr,
      };

      setSending(true);

      try {
         if (!window.emailjs) {
            throw new Error("EmailJS not loaded. Please refresh and try again.");
         }

         await window.emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams,
            EMAILJS_PUBLIC_KEY
         );

         setSuccess(true);
         setForm({ user_name: "", user_email: "", website_url: "" });
         setSelectedServices([]);

         setTimeout(() => {
            closeHireModal();
            setTimeout(() => setSuccess(false), 300);
         }, 3000);
      } catch (err) {
         console.error("EmailJS Error:", err);
         setError("Failed to send message. Please try again.");
      } finally {
         setSending(false);
      }
   };

   return (
      <>
         {/* Backdrop */}
         <div
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={closeHireModal}
         />

         {/* Modal */}
         <div className="fixed inset-0 z-[201] flex items-center justify-center p-3 sm:p-4 animate-slide-up">
            <div
               className="relative w-full max-w-lg max-h-[92vh] overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200/80 bg-white shadow-2xl shadow-gray-200/60"
               onClick={(e) => e.stopPropagation()}
            >
               {/* Top gradient accent bar */}
               <div className="absolute top-0 left-0 right-0 h-1 z-20 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500" />

               {/* Close button */}
               <button
                  onClick={closeHireModal}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex h-8 w-8 items-center justify-center rounded-xl bg-gray-100/90 backdrop-blur-sm text-gray-400 transition-all hover:bg-gray-200 hover:text-gray-600 hover:rotate-90 duration-200"
               >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                     <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
               </button>

               {/* Scrollable inner content */}
               <div
                  className="overflow-y-auto max-h-[92vh] px-5 pt-7 pb-6 sm:px-7 sm:pt-8 sm:pb-7"
                  style={{ scrollbarWidth: "thin", scrollbarColor: "#d1d5db transparent" }}
               >
                  {success ? (
                     /* ── SUCCESS STATE ── */
                     <div className="flex flex-col items-center justify-center py-8 sm:py-10 text-center">
                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
                           <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                              <svg className="h-8 w-8 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                 <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                 <path d="M22 4L12 14.01l-3-3" />
                              </svg>
                           </div>
                        </div>
                        <h3 className="text-xl font-extrabold text-gray-900">Request Sent!</h3>
                        <p className="mt-2 text-sm text-gray-500 max-w-xs">
                           Thanks for reaching out! Our team will review your request and get back to you within 24 hours.
                        </p>
                        <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                           <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-20" />
                              <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                           </svg>
                           Closing automatically...
                        </div>
                     </div>
                  ) : (
                     /* ── FORM STATE ── */
                     <>
                        {/* Header */}
                        <div className="mb-5 sm:mb-6 text-center">
                           <div className="mx-auto mb-3 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50">
                              <svg className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                 <line x1="22" y1="2" x2="11" y2="13" />
                                 <polygon points="22 2 15 22 11 13 2 9 22 2" />
                              </svg>
                           </div>
                           <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight">
                              GET EXPERT HELP FOR YOUR STORE
                           </h2>
                           <p className="mt-1 text-xs sm:text-sm text-gray-500">
                              Tell us what you need help with
                           </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                           {/* Name & Email — side by side on larger screens */}
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                              {/* Name */}
                              <div>
                                 <label htmlFor="hire-name" className="mb-1 sm:mb-1.5 block text-[11px] sm:text-xs font-bold text-gray-700">
                                    Your Name *
                                 </label>
                                 <div className={`flex items-center rounded-xl border-2 bg-gray-50 transition-all focus-within:bg-white ${error && !form.user_name.trim() ? "border-red-300" : "border-gray-200 focus-within:border-emerald-400"}`}>
                                    <div className="pl-3 text-gray-400">
                                       <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                          <circle cx="12" cy="7" r="4" />
                                       </svg>
                                    </div>
                                    <input
                                       id="hire-name"
                                       type="text"
                                       name="user_name"
                                       value={form.user_name}
                                       onChange={handleChange}
                                       placeholder="John Doe"
                                       className="flex-1 bg-transparent px-3 py-2.5 sm:py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                       disabled={sending}
                                    />
                                 </div>
                              </div>

                              {/* Email */}
                              <div>
                                 <label htmlFor="hire-email" className="mb-1 sm:mb-1.5 block text-[11px] sm:text-xs font-bold text-gray-700">
                                    Email Address *
                                 </label>
                                 <div className={`flex items-center rounded-xl border-2 bg-gray-50 transition-all focus-within:bg-white ${error && !form.user_email.trim() ? "border-red-300" : "border-gray-200 focus-within:border-emerald-400"}`}>
                                    <div className="pl-3 text-gray-400">
                                       <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                          <rect x="2" y="4" width="20" height="16" rx="2" />
                                          <path d="M22 7l-10 6L2 7" />
                                       </svg>
                                    </div>
                                    <input
                                       id="hire-email"
                                       type="email"
                                       name="user_email"
                                       value={form.user_email}
                                       onChange={handleChange}
                                       placeholder="john@example.com"
                                       className="flex-1 bg-transparent px-3 py-2.5 sm:py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                       disabled={sending}
                                    />
                                 </div>
                              </div>
                           </div>

                           {/* Website URL */}
                           <div>
                              <label htmlFor="hire-url" className="mb-1 sm:mb-1.5 block text-[11px] sm:text-xs font-bold text-gray-700">
                                 Website URL *
                              </label>
                              <div className={`flex items-center rounded-xl border-2 bg-gray-50 transition-all focus-within:bg-white ${error && !form.website_url.trim() ? "border-red-300" : "border-gray-200 focus-within:border-emerald-400"}`}>
                                 <div className="pl-3 text-gray-400">
                                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                       <circle cx="12" cy="12" r="10" />
                                       <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
                                    </svg>
                                 </div>
                                 <input
                                    id="hire-url"
                                    type="url"
                                    name="website_url"
                                    value={form.website_url}
                                    onChange={handleChange}
                                    placeholder="https://yourstore.com"
                                    className="flex-1 bg-transparent px-3 py-2.5 sm:py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                    disabled={sending}
                                 />
                              </div>
                           </div>

                           {/* Services Checkboxes */}
                           <div>
                              <label className="mb-2 sm:mb-2.5 block text-[11px] sm:text-xs font-bold text-gray-700">
                                 Services You Need *
                              </label>
                              <div className="grid grid-cols-1 gap-1.5 sm:gap-2">
                                 {SERVICE_OPTIONS.map((svc) => {
                                    const isChecked = selectedServices.includes(svc.id);
                                    const SvcIcon = svc.Icon;
                                    return (
                                       <label
                                          key={svc.id}
                                          className={`group flex cursor-pointer items-center gap-2.5 sm:gap-3 rounded-xl border-2 px-3 py-2.5 sm:px-4 sm:py-3 transition-all duration-200 select-none ${
                                             isChecked
                                                ? "border-emerald-400 bg-emerald-50/80 shadow-sm"
                                                : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white"
                                          }`}
                                       >
                                          {/* Custom checkbox */}
                                          <div
                                             className={`flex h-4.5 w-4.5 sm:h-5 sm:w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200 ${
                                                isChecked
                                                   ? "border-emerald-500 bg-emerald-500"
                                                   : "border-gray-300 bg-white group-hover:border-gray-400"
                                             }`}
                                          >
                                             {isChecked && (
                                                <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                                   <path d="M20 6L9 17l-5-5" />
                                                </svg>
                                             )}
                                          </div>
                                          <input
                                             type="checkbox"
                                             name="services"
                                             value={svc.id}
                                             checked={isChecked}
                                             onChange={() => toggleService(svc.id)}
                                             className="sr-only"
                                             disabled={sending}
                                          />
                                          <span className="flex items-center gap-2 text-xs sm:text-sm leading-tight">
                                             <span className={`flex-shrink-0 ${isChecked ? "text-emerald-600" : svc.color}`}>
                                                <SvcIcon />
                                             </span>
                                             <span className={`font-medium ${isChecked ? "text-emerald-800" : "text-gray-700"}`}>
                                                {svc.label}
                                             </span>
                                          </span>
                                       </label>
                                    );
                                 })}
                              </div>
                           </div>

                           {/* Error message */}
                           {error && (
                              <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5">
                                 <p className="flex items-start gap-1.5 text-xs font-medium text-red-600">
                                    <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                       <circle cx="12" cy="12" r="10" />
                                       <path d="M12 8v4M12 16h.01" />
                                    </svg>
                                    {error}
                                 </p>
                              </div>
                           )}

                           {/* Submit button */}
                           <button
                              type="submit"
                              disabled={sending}
                              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gray-900 px-6 py-3 sm:py-3.5 text-sm font-bold text-white shadow-lg shadow-gray-900/20 transition-all duration-200 hover:bg-emerald-600 hover:shadow-emerald-500/25 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                           >
                              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />

                              {sending ? (
                                 <>
                                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                       <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-20" />
                                       <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                    </svg>
                                    Sending Request...
                                 </>
                              ) : (
                                 <>
                                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                       <line x1="22" y1="2" x2="11" y2="13" />
                                       <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                    Send Request
                                 </>
                              )}
                           </button>
                        </form>

                        {/* Trust badges */}
                        <div className="mt-4 sm:mt-5 flex items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] text-gray-400">
                           <span className="flex items-center gap-1">
                              <svg className="h-3 w-3 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                              </svg>
                              100% secure
                           </span>
                           <span className="flex items-center gap-1">
                              <svg className="h-3 w-3 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                 <circle cx="12" cy="12" r="10" />
                                 <polyline points="12 6 12 12 16 14" />
                              </svg>
                              Reply in 24hrs
                           </span>
                           <span className="flex items-center gap-1">
                              <svg className="h-3 w-3 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                 <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                 <path d="M22 4L12 14.01l-3-3" />
                              </svg>
                              Shopify Experts
                           </span>
                        </div>

                        <p className="mt-2.5 sm:mt-3 text-center text-[9px] sm:text-[10px] text-gray-400">
                           Your information is safe with us. We never share your data.
                        </p>
                     </>
                  )}
               </div>
            </div>
         </div>
      </>
   );
}
