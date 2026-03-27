import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail, saveEmail } from "../../lib/emailStorage";
import { validateShopifyStore, extractStoreOrigin } from "../../lib/shopifyValidator";
import { getAnonAuditUsed, setAnonAuditSession } from "../../lib/auditUsage";
import { apiSaveAnonymousEmail } from "../../lib/backendClient";

export default function AuditModal({ open, onClose, initialUrl = "" }) {
   const navigate = useNavigate();
   const [email, setEmail] = useState("");
   const [emailError, setEmailError] = useState("");
   const [checking, setChecking] = useState(false);

   if (!open) return null;

   const storeUrl = initialUrl;
   const storeOrigin = storeUrl ? extractStoreOrigin(storeUrl) : "";

   const handleSubmit = async (e) => {
      e.preventDefault();
      setEmailError("");

      // 1. Validate email
      const trimEmail = email.trim();
      if (!trimEmail) {
         setEmailError("Please enter your email address.");
         return;
      }
      if (!validateEmail(trimEmail)) {
         setEmailError("Please enter a valid email address.");
         return;
      }

      // 2. Make sure we have a URL from the hero input
      if (!storeUrl) {
         setEmailError("Please enter a store URL first, then click Get Audit.");
         return;
      }

      // If anonymous already consumed the free audit, force signup.
      if (getAnonAuditUsed()) {
         const next = `/dashboard?url=${encodeURIComponent(storeOrigin)}&autostart=1&page=${encodeURIComponent("Home Page")}`;
         onClose();
         navigate(`/login?next=${encodeURIComponent(next)}`);
         return;
      }

      // 3. Verify it's a Shopify store
      setChecking(true);

      try {
         const result = await validateShopifyStore(storeUrl);

         if (!result.isShopify) {
            setChecking(false);
            setEmailError(
               "We currently only support Shopify stores. Please go back and enter a valid Shopify store URL."
            );
            return;
         }

         // 4. Save email
         saveEmail(trimEmail);

         // 4b. Store anonymous email in backend (marketing list).
         // If backend is down, we'll still proceed to redirect; Dashboard will block audit generation.
         try {
            await apiSaveAnonymousEmail({ email: trimEmail, storeOrigin });
         } catch {
            // ignore - handled by dashboard gating
         }

         setChecking(false);

         // 5. Persist anonymous email + store origin so the dashboard can verify email-first.
         setAnonAuditSession({ email: trimEmail, storeOrigin });

         // 6. Navigate to dashboard and auto-start Home Page audit
         onClose();
         navigate(
            `/dashboard?url=${encodeURIComponent(storeOrigin)}&autostart=1&anon=1&page=${encodeURIComponent("Home Page")}`
         );
      } catch {
         setChecking(false);
         setEmailError("Could not verify the store. Please try again.");
      }
   };

   const displayDomain = storeOrigin
      ? storeOrigin.replace(/^https?:\/\//, "").replace(/\/$/, "")
      : "";

   return (
      <>
         {/* Backdrop */}
         <div
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
         />

         {/* Modal */}
         <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 animate-slide-up">
            <div
               className="relative w-full max-w-md rounded-3xl border border-gray-200/80 bg-white shadow-2xl shadow-gray-200/60"
               onClick={(e) => e.stopPropagation()}
            >
               {/* Close button */}
               <button
                  onClick={onClose}
                  className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-xl bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
               >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                     <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
               </button>

               <div className="px-7 pt-8 pb-7">
                  {/* Header */}
                  <div className="mb-6 text-center">
                     <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
                        <svg className="h-7 w-7 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                           <circle cx="11" cy="11" r="8" />
                           <path d="M21 21l-4.35-4.35" />
                        </svg>
                     </div>
                     <h2 className="text-xl font-extrabold text-gray-900">Almost there!</h2>
                     <p className="mt-1 text-sm text-gray-500">
                        Enter your email to receive your audit report.
                     </p>
                  </div>

                  {/* Store URL display (read-only chip) */}
                  {displayDomain && (
                     <div className="mb-5 flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5">
                        <svg className="h-4 w-4 text-emerald-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                           <circle cx="12" cy="12" r="10" />
                           <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
                        </svg>
                        <span className="text-sm font-semibold text-emerald-700 truncate">{displayDomain}</span>
                        <svg className="h-4 w-4 text-emerald-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                           <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                           <path d="M22 4L12 14.01l-3-3" />
                        </svg>
                     </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                     {/* Email field */}
                     <div>
                        <label htmlFor="audit-email" className="mb-1.5 block text-xs font-bold text-gray-700">
                           Email Address
                        </label>
                        <div
                           className={`flex items-center rounded-xl border-2 bg-gray-50 transition-all focus-within:bg-white ${
                              emailError
                                 ? "border-red-300 focus-within:border-red-400"
                                 : "border-gray-200 focus-within:border-emerald-400"
                           }`}
                        >
                           <div className="pl-3 text-gray-400">
                              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                 <rect x="2" y="4" width="20" height="16" rx="2" />
                                 <path d="M22 7l-10 6L2 7" />
                              </svg>
                           </div>
                           <input
                              id="audit-email"
                              type="email"
                              value={email}
                              onChange={(e) => {
                                 setEmail(e.target.value);
                                 if (emailError) setEmailError("");
                              }}
                              placeholder="you@example.com"
                              className="flex-1 bg-transparent px-3 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                              disabled={checking}
                              autoFocus
                           />
                        </div>
                        {emailError && (
                           <div className="mt-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5">
                              <p className="flex items-start gap-1.5 text-xs font-medium text-red-600">
                                 <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 8v4M12 16h.01" />
                                 </svg>
                                 {emailError}
                              </p>
                           </div>
                        )}
                     </div>

                     {/* Submit button */}
                     <button
                        type="submit"
                        disabled={checking}
                        className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-gray-900/20 transition-all duration-200 hover:bg-emerald-600 hover:shadow-emerald-500/25 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                     >
                        {checking ? (
                           <>
                              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                 <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-20" />
                                 <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                              </svg>
                              Verifying store...
                           </>
                        ) : (
                           <>
                              Start Free Audit
                              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                 <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                           </>
                        )}
                     </button>
                  </form>

                  {/* Footer note */}
                  <div className="mt-5 flex items-center justify-center gap-4 text-[11px] text-gray-400">
                     <span className="flex items-center gap-1">
                        <svg className="h-3 w-3 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                           <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        100% secure
                     </span>
                     <span className="flex items-center gap-1">
                        <svg className="h-3 w-3 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                           <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                        Results in 60s
                     </span>
                     <span className="flex items-center gap-1">
                        <svg className="h-3 w-3 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                           <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                           <path d="M22 4L12 14.01l-3-3" />
                        </svg>
                        No credit card
                     </span>
                  </div>

                  {/* Privacy note */}
                  <p className="mt-3 text-center text-[10px] text-gray-400">
                     We'll send your audit report to this email. No spam, ever.
                  </p>
               </div>
            </div>
         </div>
      </>
   );
}
