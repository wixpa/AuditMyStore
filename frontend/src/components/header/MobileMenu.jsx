import { Link } from "react-router-dom";

const mobileTools = [
   { label: "AI Visibility Checker", emoji: "🔍" },
   { label: "LLM.txt Generator", emoji: "📄" },
   { label: "Robots.txt Generator", emoji: "🤖" },
   { label: "Page Speed Tester", emoji: "⚡" },
];

export default function MobileMenu({
   open,
   onClose,
   activeLink,
   navLinks,
}) {
   return (
      <>
         {/* Backdrop */}
         <div
            onClick={onClose}
            className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
               open
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
            }`}
         />

         {/* Drawer */}
         <div
            className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
               open ? "translate-x-0" : "translate-x-full"
            }`}
         >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
               <span className="text-base font-black text-gray-900">
                  AuditMyStore
                  <span className="font-light text-gray-400">.com</span>
               </span>
               <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
               >
                  <svg
                     viewBox="0 0 24 24"
                     className="h-4 w-4"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2.5"
                     strokeLinecap="round"
                  >
                     <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
               </button>
            </div>

            {/* Nav links */}
            <div className="flex flex-col gap-1 px-3 py-4">
               {navLinks.map((link) => {
                  const isHash = link.to === "#";
                  const Comp = isHash ? "a" : Link;
                  const linkProps = isHash ? { href: "#" } : { to: link.to };

                  return (
                     <Comp
                        key={link.label}
                        {...linkProps}
                        onClick={onClose}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-150 ${
                           activeLink === link.label
                              ? "bg-emerald-50 text-emerald-600"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                     >
                        {activeLink === link.label && (
                           <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                        )}
                        {link.label}
                     </Comp>
                  );
               })}

               {/* Free Tools section */}
               <div className="mt-2 border-t border-gray-100 pt-3">
                  <p className="mb-2 px-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                     Free Tools
                  </p>
                  {mobileTools.map((tool, i) => (
                     <a
                        key={i}
                        href="#"
                        onClick={onClose}
                        className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
                     >
                        <span>{tool.emoji}</span>
                        {tool.label}
                     </a>
                  ))}
               </div>
            </div>

            {/* Bottom CTA */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-gray-50/80 p-4">
               <Link
                  to="/login"
                  onClick={onClose}
                  className="block w-full rounded-2xl bg-gray-900 py-3 text-center text-sm font-bold text-white transition-all hover:bg-emerald-600 active:scale-95"
               >
                  Login
               </Link>
               <Link
                  to="/"
                  onClick={onClose}
                  className="mt-2.5 flex items-center justify-center text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
               >
                  Get Free Audit →
               </Link>
            </div>
         </div>
      </>
   );
}
