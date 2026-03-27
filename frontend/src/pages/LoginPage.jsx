import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
   const { login } = useAuth();
   const navigate = useNavigate();
   const [params] = useSearchParams();
   const next = params.get("next") || "/dashboard";
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");

      if (!email.trim()) {
         setError("Please enter your email.");
         return;
      }
      if (!password) {
         setError("Please enter your password.");
         return;
      }

      setLoading(true);
      // Simulate a small delay for UX
      await new Promise((r) => setTimeout(r, 300));

      const result = await login(email, password);
      setLoading(false);

      if (!result.success) {
         setError(result.message);
         return;
      }

      navigate(next);
   };

   return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
         {/* Background */}
         <div className="absolute inset-0 -z-10">
            <div
               className="absolute inset-0"
               style={{
                  background: `
                     radial-gradient(ellipse 70% 50% at 30% 0%, rgba(167,243,208,0.40) 0%, transparent 60%),
                     radial-gradient(ellipse 60% 50% at 80% 10%, rgba(186,230,255,0.35) 0%, transparent 55%),
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

         <div className="w-full max-w-md">
            {/* Logo */}
            <div className="mb-8 text-center">
               <Link to="/" className="inline-block">
                  <span className="text-2xl font-black text-gray-900 tracking-tight">
                     AuditMyStore
                     <span className="font-light text-gray-500">.com</span>
                  </span>
               </Link>
            </div>

            {/* Card */}
            <div className="rounded-3xl border border-gray-200/80 bg-white p-8 shadow-xl shadow-gray-100/60">
               <div className="mb-6 text-center">
                  <h1 className="text-2xl font-extrabold text-gray-900">Welcome back</h1>
                  <p className="mt-1 text-sm text-gray-500">
                     Log in to your account to continue
                  </p>
               </div>

               {/* Error */}
               {error && (
                  <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                     {error}
                  </div>
               )}

               <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email */}
                  <div>
                     <label htmlFor="login-email" className="mb-1.5 block text-xs font-bold text-gray-700">
                        Email
                     </label>
                     <div className="flex items-center rounded-xl border-2 border-gray-200 bg-gray-50 transition-all focus-within:border-emerald-400 focus-within:bg-white">
                        <div className="pl-3 text-gray-400">
                           <Mail className="h-4 w-4" strokeWidth={2} />
                        </div>
                        <input
                           id="login-email"
                           type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder="you@example.com"
                           className="flex-1 bg-transparent px-3 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                        />
                     </div>
                  </div>

                  {/* Password */}
                  <div>
                     <div className="mb-1.5 flex items-center justify-between">
                        <label htmlFor="login-password" className="text-xs font-bold text-gray-700">
                           Password
                        </label>
                        <button type="button" className="text-xs font-medium text-emerald-600 hover:text-emerald-700">
                           Forgot password?
                        </button>
                     </div>
                     <div className="flex items-center rounded-xl border-2 border-gray-200 bg-gray-50 transition-all focus-within:border-emerald-400 focus-within:bg-white">
                        <div className="pl-3 text-gray-400">
                           <Lock className="h-4 w-4" strokeWidth={2} />
                        </div>
                        <input
                           id="login-password"
                           type={showPassword ? "text" : "password"}
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           placeholder="••••••••"
                           className="flex-1 bg-transparent px-3 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                        />
                        <button
                           type="button"
                           onClick={() => setShowPassword(!showPassword)}
                           className="pr-3 text-gray-400 hover:text-gray-600"
                        >
                           {showPassword ? (
                              <EyeOff className="h-4 w-4" strokeWidth={2} />
                           ) : (
                              <Eye className="h-4 w-4" strokeWidth={2} />
                           )}
                        </button>
                     </div>
                  </div>

                  {/* Submit */}
                  <button
                     type="submit"
                     disabled={loading}
                     className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-gray-900/20 transition-all duration-200 hover:bg-emerald-600 hover:shadow-emerald-500/25 active:scale-[0.98] disabled:opacity-60"
                  >
                     {loading ? (
                        <>
                           <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-20" />
                              <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                           </svg>
                           Logging in...
                        </>
                     ) : (
                        <>
                           Log In
                           <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                        </>
                     )}
                  </button>
               </form>



               {/* Sign up link */}
               <p className="mt-6 text-center text-sm text-gray-500">
                  Don&apos;t have an account?{" "}
                  <Link to="/signup" className="font-semibold text-emerald-600 hover:text-emerald-700">
                     Sign up free
                  </Link>
               </p>
            </div>
         </div>
      </div>
   );
}
