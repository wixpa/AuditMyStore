import { Search, TrendingUp, Smartphone, Zap, PackageX } from "lucide-react";

const features = [
   {
      icon: Search,
      label: "AI SEO Audit",
      desc: "Rank higher on Google & ChatGPT",
      color: "from-lime-100 to-green-100",
      border: "border-lime-300",
      iconColor: "text-lime-600",
      badge: "NEW",
   },
   {
      icon: TrendingUp,
      label: "CRO Audit",
      desc: "Turn browsers into buyers",
      color: "from-cyan-100 to-teal-100",
      border: "border-cyan-300",
      iconColor: "text-cyan-600",
   },
   {
      icon: PackageX,
      label: "App Audit",
      desc: "Remove bloat, boost speed",
      color: "from-sky-100 to-blue-100",
      border: "border-sky-300",
      iconColor: "text-sky-600",
   },
   {
      icon: Smartphone,
      label: "Mobile UX",
      desc: "Smooth on every device",
      color: "from-violet-100 to-purple-100",
      border: "border-violet-300",
      iconColor: "text-violet-600",
   },
   {
      icon: Zap,
      label: "Page Speed",
      desc: "Load fast. Convert faster",
      color: "from-yellow-100 to-amber-100",
      border: "border-yellow-300",
      iconColor: "text-yellow-600",
   },
];

export default function FeatureCards() {
   return (
      <div className="mt-14 flex w-full flex-wrap justify-center gap-3">
         {features.map((f, i) => {
            const Icon = f.icon;
            return (
               <div
                  key={i}
                  className={`group relative flex flex-col items-start gap-1.5 rounded-2xl border ${f.border} bg-gradient-to-br ${f.color} px-4 py-4 w-[148px] sm:w-[155px] cursor-default transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg`}
               >
                  {f.badge && (
                     <span className="absolute -top-2.5 -right-2.5 rounded-full bg-yellow-400 px-2 py-0.5 text-[10px] font-black text-yellow-900 shadow">
                        {f.badge}
                     </span>
                  )}
                  <Icon className={`h-5 w-5 ${f.iconColor}`} strokeWidth={2} />
                  <p className="text-sm font-bold text-gray-800 leading-tight">
                     {f.label}
                  </p>
                  <p className="text-xs text-gray-500 leading-snug">{f.desc}</p>
               </div>
            );
         })}
      </div>
   );
}
