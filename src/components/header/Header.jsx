import { useState, useEffect, useRef } from "react";
import FreeToolsDropdown from "./FreeToolsDropdown";
import MobileMenu from "./MobileMenu";

const navLinks = [
   { label: "Home", href: "#", active: true },
   { label: "Shopify Apps", href: "#" },
   { label: "Shopify Stores", href: "#" },
   { label: "Shopify Flow", href: "#" },
   { label: "Pricing", href: "#" },
];

export default function Header() {
   const [scrolled, setScrolled] = useState(false);
   const [dropdownOpen, setDropdownOpen] = useState(false);
   const [mobileOpen, setMobileOpen] = useState(false);
   const [activeLink, setActiveLink] = useState("Home");
   const dropdownRef = useRef(null);

   useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 20);
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
   }, []);

   // Close dropdown on outside click
   useEffect(() => {
      const handler = (e) => {
         if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setDropdownOpen(false);
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
               <a href="#" className="flex-shrink-0 group">
                  <span className="text-xl font-black text-gray-900 tracking-tight">
                     AuditMyStore
                     <span className="font-light text-gray-500">.com</span>
                  </span>
               </a>

               {/* ── DESKTOP NAV ── */}
               <nav className="hidden md:flex items-center gap-1">
                  {navLinks.map((link) => (
                     <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setActiveLink(link.label)}
                        className={`relative px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200
                  ${
                     activeLink === link.label
                        ? "text-emerald-600"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/70"
                  }`}
                     >
                        {link.label}
                        {/* Active underline dot */}
                        {activeLink === link.label && (
                           <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-emerald-500" />
                        )}
                     </a>
                  ))}

                  {/* Free Tools dropdown */}
                  <div ref={dropdownRef} className="relative">
                     <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200
                  ${
                     dropdownOpen
                        ? "text-emerald-600 bg-emerald-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/70"
                  }`}
                     >
                        Free Tools
                        <svg
                           className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                           viewBox="0 0 24 24"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="2.5"
                           strokeLinecap="round"
                        >
                           <path d="M6 9l6 6 6-6" />
                        </svg>
                     </button>

                     {/* Dropdown */}
                     <FreeToolsDropdown
                        open={dropdownOpen}
                        onClose={() => setDropdownOpen(false)}
                     />
                  </div>
               </nav>

               {/* ── RIGHT SIDE ── */}
               <div className="hidden md:flex items-center gap-3">
                  {/* Get Audit CTA — subtle */}
                  <a
                     href="#"
                     className="text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
                  >
                     Free Audit
                  </a>

                  {/* Login button */}
                  <button className="group relative overflow-hidden rounded-2xl bg-gray-900 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:scale-[1.02] active:scale-95">
                     {/* Shimmer */}
                     <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                     Login
                  </button>
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
            setActiveLink={setActiveLink}
            navLinks={navLinks}
         />
      </>
   );
}
