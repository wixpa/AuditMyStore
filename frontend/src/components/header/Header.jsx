import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import MobileMenu from "./MobileMenu";

const navLinks = [
   { label: "Home", to: "/" },
   { label: "Shopify Apps", to: "/shopify-apps" },
   { label: "Shopify Stores", to: "/shopify-stores" },
   { label: "Pricing", to: "/pricing" },
];

export default function Header() {
   const { isAuthenticated, user, logout } = useAuth();
   const location = useLocation();
   const [scrolled, setScrolled] = useState(false);
   const [mobileOpen, setMobileOpen] = useState(false);
   const [userMenuOpen, setUserMenuOpen] = useState(false);
   const userMenuRef = useRef(null);

   const activeLink = navLinks.find((l) => l.to === location.pathname)?.label || "";

   useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 20);
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
   }, []);

   // Close user menu on outside click
   useEffect(() => {
      const handler = (e) => {
         if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
            setUserMenuOpen(false);
         }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
   }, []);

   return (
      <>
         <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
               scrolled
                  ? "border-b border-gray-200/60 bg-white/80 shadow-sm shadow-gray-100/60 backdrop-blur-md"
                  : "bg-transparent"
            }`}
         >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
               {/* ── LOGO ── */}
               <Link to="/" className="flex-shrink-0 group">
                  <span className="text-xl font-black text-gray-900 tracking-tight">
                     AuditMyStore
                     <span className="font-light text-gray-500">.com</span>
                  </span>
               </Link>

               {/* ── DESKTOP NAV ── */}
               <nav className="hidden md:flex items-center gap-1">
                  {navLinks.map((link) => {
                     const isActive = activeLink === link.label;
                     return (
                        <Link
                           key={link.label}
                           to={link.to}
                           className={`relative px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200
                           ${
                              isActive
                                 ? "text-emerald-600"
                                 : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/70"
                           }`}
                        >
                           {link.label}
                           {isActive && (
                              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-emerald-500" />
                           )}
                        </Link>
                     );
                  })}
               </nav>

               {/* ── RIGHT SIDE ── */}
               <div className="hidden md:flex items-center gap-3">
                  <Link
                     to="/"
                     className="text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
                  >
                     Free Audit
                  </Link>

                  {isAuthenticated ? (
                     <div ref={userMenuRef} className="relative">
                        <button
                           onClick={() => setUserMenuOpen(!userMenuOpen)}
                           className="flex items-center gap-2 rounded-2xl bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-200"
                        >
                           <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-black text-white">
                              {user?.name?.charAt(0)?.toUpperCase() || "U"}
                           </div>
                           <span className="max-w-[100px] truncate">{user?.name || "User"}</span>
                           <svg className="h-3 w-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                              <path d="M6 9l6 6 6-6" />
                           </svg>
                        </button>

                        {userMenuOpen && (
                           <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-gray-200 bg-white py-2 shadow-lg">
                              <div className="border-b border-gray-100 px-4 py-2">
                                 <p className="text-xs font-semibold text-gray-900 truncate">{user?.name}</p>
                                 <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
                              </div>
                              <Link
                                 to="/dashboard"
                                 onClick={() => setUserMenuOpen(false)}
                                 className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                              >
                                 Dashboard
                              </Link>
                              <button
                                 onClick={() => {
                                    logout();
                                    setUserMenuOpen(false);
                                 }}
                                 className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
                              >
                                 Log out
                              </button>
                           </div>
                        )}
                     </div>
                  ) : (
                     <Link
                        to="/login"
                        className="group relative overflow-hidden rounded-2xl bg-gray-900 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:scale-[1.02] active:scale-95"
                     >
                        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                        Login
                     </Link>
                  )}
               </div>

               {/* ── MOBILE HAMBURGER ── */}
               <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="flex md:hidden flex-col items-center justify-center gap-1.5 rounded-xl p-2 transition-colors hover:bg-gray-100"
                  aria-label="Toggle menu"
               >
                  <span
                     className={`block h-0.5 w-5 bg-gray-700 transition-all duration-300 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
                  />
                  <span
                     className={`block h-0.5 w-5 bg-gray-700 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
                  />
                  <span
                     className={`block h-0.5 w-5 bg-gray-700 transition-all duration-300 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
                  />
               </button>
            </div>
         </header>

         {/* Mobile drawer */}
         <MobileMenu
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            activeLink={activeLink}
            navLinks={navLinks}
         />
      </>
   );
}
