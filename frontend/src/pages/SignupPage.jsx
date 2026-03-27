import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Check } from "lucide-react";

function getPasswordStrength(pw) {
   if (!pw) return { level: 0, label: "", color: "" };
   let score = 0;
   if (pw.length >= 6) score++;
   if (pw.length >= 10) score++;
   if (/[A-Z]/.test(pw)) score++;
   if (/[0-9]/.test(pw)) score++;
   if (/[^A-Za-z0-9]/.test(pw)) score++;

   if (score <= 1) return { level: 1, label: "Weak", color: "bg-red-400" };
   if (score <= 2) return { level: 2, label: "Fair", color: "bg-amber-400" };
   if (score <= 3) return { level: 3, label: "Good", color: "bg-emerald-400" };
   return { level: 4, label: "Strong", color: "bg-emerald-600" };
}

export default function SignupPage() {
   const { signup } = useAuth();
   const navigate = useNavigate();
   const [params] = useSearchParams();
   const next = params.get("next") || "/dashboard";
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
   const [agreed, setAgreed] = useState(false);
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);

   const strength = getPasswordStrength(password);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");

      if (!name.trim()) {
         setError("Please enter your name.");
         return;
      }
      if (!email.trim()) {
         setError("Please enter your email.");
         return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
         setError("Please enter a valid email address.");
         return;
      }
      if (!password || password.length < 6) {
         setError("Password must be at least 6 characters.");
         return;
      }
      if (!agreed) {
         setError("You must agree to the terms to continue.");
         return;
      }

      setLoading(true);
      await new Promise((r) => setTimeout(r, 300));

      const result = await signup(name, email, password);
      setLoading(false);

      if (!result.success) {
         setError(result.message);
         return;
      }

      navigate(next);
   };

   return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
         {/* Background */}
         <div className="absolute inset-0 -z-10">
            <div
               className="absolute inset-0"
               style={{
                  background: `
                     radial-gradient(ellipse 70% 50% at 70% 0%, rgba(167,243,208,0.40) 0%, transparent 60%),
                     radial-gradient(ellipse 60% 50% at 20% 10%, rgba(186,230,255,0.35) 0%, transparent 55%),
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
                  <h1 className="text-2xl font-extrabold text-gray-900">Create your account</h1>
                  <p className="mt-1 text-sm text-gray-500">
                     Start auditing your store in seconds
                  </p>
               </div>

               {/* Error */}
               {error && (
                  <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                     {error}
                  </div>
               )}

               <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                     <label htmlFor="signup-name" className="mb-1.5 block text-xs font-bold text-gray-700">
                        Full Name
                     </label>
                     <div className="flex items-center rounded-xl border-2 border-gray-200 bg-gray-50 transition-all focus-within:border-emerald-400 focus-within:bg-white">
                        <div className="pl-3 text-gray-400">
                           <User className="h-4 w-4" strokeWidth={2} />
                        </div>
                        <input
                           id="signup-name"
                           type="text"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           placeholder="John Doe"
                           className="flex-1 bg-transparent px-3 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                        />
                     </div>
                  </div>

                  {/* Email */}
                  <div>
                     <label htmlFor="signup-email" className="mb-1.5 block text-xs font-bold text-gray-700">
                        Email
                     </label>
                     <div className="flex items-center rounded-xl border-2 border-gray-200 bg-gray-50 transition-all focus-within:border-emerald-400 focus-within:bg-white">
                        <div className="pl-3 text-gray-400">
                           <Mail className="h-4 w-4" strokeWidth={2} />
                        </div>
                        <input
                           id="signup-email"
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
                     <label htmlFor="signup-password" className="mb-1.5 block text-xs font-bold text-gray-700">
                        Password
                     </label>
                     <div className="flex items-center rounded-xl border-2 border-gray-200 bg-gray-50 transition-all focus-within:border-emerald-400 focus-within:bg-white">
                        <div className="pl-3 text-gray-400">
                           <Lock className="h-4 w-4" strokeWidth={2} />
                        </div>
                        <input
                           id="signup-password"
                           type={showPassword ? "text" : "password"}
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           placeholder="Min 6 characters"
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
                     {/* Password strength indicator */}
                     {password && (
                        <div className="mt-2">
                           <div className="flex gap-1">
                              {[1, 2, 3, 4].map((i) => (
                                 <div
                                    key={i}
                                    className={`h-1 flex-1 rounded-full transition-colors ${
                                       i <= strength.level ? strength.color : "bg-gray-200"
                                    }`}
                                 />
                              ))}
                           </div>
                           <p className="mt-1 text-xs text-gray-400">
                              Strength: <span className="font-medium text-gray-600">{strength.label}</span>
                           </p>
                        </div>
                     )}
                  </div>

                  {/* Terms checkbox */}
                  <label className="flex items-start gap-2.5 cursor-pointer">
                     <div className="relative mt-0.5">
                        <input
                           type="checkbox"
                           checked={agreed}
                           onChange={(e) => setAgreed(e.target.checked)}
                           className="sr-only"
                        />
                        <div
                           className={`flex h-4.5 w-4.5 items-center justify-center rounded-md border-2 transition-all ${
                              agreed
                                 ? "border-emerald-500 bg-emerald-500"
                                 : "border-gray-300 bg-white"
                           }`}
                        >
                           {agreed && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                        </div>
                     </div>
                     <span className="text-xs leading-relaxed text-gray-500">
                        I agree to the{" "}
                        <a href="#" className="font-medium text-emerald-600 hover:text-emerald-700">
                           Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="font-medium text-emerald-600 hover:text-emerald-700">
                           Privacy Policy
                        </a>
                     </span>
                  </label>

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
                           Creating account...
                        </>
                     ) : (
                        <>
                           Create Account
                           <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                        </>
                     )}
                  </button>
               </form>



               {/* Login link */}
               <p className="mt-6 text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-700">
                     Log in
                  </Link>
               </p>
            </div>
         </div>
      </div>
   );
}
