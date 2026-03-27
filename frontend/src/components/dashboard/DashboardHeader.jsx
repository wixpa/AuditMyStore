import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function DashboardHeader({ storeUrl, auditsRemaining }) {
   const navigate = useNavigate();
   const { user, isAuthenticated, logout } = useAuth();
   const [menuOpen, setMenuOpen] = useState(false);
   const menuRef = useRef(null);

   useEffect(() => {
      const handler = (e) => {
         if (menuRef.current && !menuRef.current.contains(e.target)) {
            setMenuOpen(false);
         }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
   }, []);

   const initials = user?.name
      ? user.name
           .split(" ")
           .map((w) => w[0])
           .join("")
           .toUpperCase()
           .slice(0, 2)
      : "U";

   return (
      <header className="hidden md:flex items-center justify-between border-b border-gray-200 bg-white px-8 py-3.5 shadow-sm">
         {/* Logo */}
         <a
            href="/"
            onClick={(e) => {
               e.preventDefault();
               navigate("/");
            }}
            className="text-base font-black text-gray-900 tracking-tight"
         >
            AuditMyStore<span className="font-light text-gray-400">.com</span>
         </a>

         {/* Right — User */}
         <div className="flex items-center gap-3">
            {typeof auditsRemaining === "number" && isAuthenticated && (
               <div className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-[11px] font-bold text-gray-600">
                  Audits left: <span className="text-emerald-600">{auditsRemaining}</span>/5
               </div>
            )}
            {isAuthenticated ? (
               <div ref={menuRef} className="relative">
                  <button
                     onClick={() => setMenuOpen(!menuOpen)}
                     className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 transition-all hover:bg-gray-50"
                  >
                     <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-black text-white">
                        {initials}
                     </div>
                     <div className="hidden sm:block text-left">
                        <p className="text-xs font-bold text-gray-800 leading-tight truncate max-w-[140px]">
                           {user?.name || "User"}
                        </p>
                        <p className="text-[10px] text-gray-400 leading-tight truncate max-w-[140px]">
                           {user?.email || ""}
                        </p>
                     </div>
                     <svg className="h-3.5 w-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M6 9l6 6 6-6" />
                     </svg>
                  </button>

                  {menuOpen && (
                     <div className="absolute right-0 top-full mt-1 w-52 rounded-xl border border-gray-200 bg-white py-1 shadow-lg z-50">
                        <div className="border-b border-gray-100 px-4 py-2.5">
                           <p className="text-xs font-bold text-gray-900 truncate">{user?.name}</p>
                           <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
                        </div>
                        <button
                           onClick={() => {
                              navigate("/");
                              setMenuOpen(false);
                           }}
                           className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
                        >
                           <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                              <polyline points="9 22 9 12 15 12 15 22" />
                           </svg>
                           Home
                        </button>
                        <button
                           onClick={() => {
                              navigate("/pricing");
                              setMenuOpen(false);
                           }}
                           className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
                        >
                           <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <line x1="12" y1="1" x2="12" y2="23" />
                              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                           </svg>
                           Pricing Plans
                        </button>
                        <div className="border-t border-gray-100 mt-1 pt-1">
                           <button
                              onClick={() => {
                                 logout();
                                 navigate("/");
                                 setMenuOpen(false);
                              }}
                              className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
                           >
                              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                 <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                 <polyline points="16 17 21 12 16 7" />
                                 <line x1="21" y1="12" x2="9" y2="12" />
                              </svg>
                              Log out
                           </button>
                        </div>
                     </div>
                  )}
               </div>
            ) : (
               <button
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-600 active:scale-95"
               >
                  Sign In
               </button>
            )}
         </div>
      </header>
   );
}