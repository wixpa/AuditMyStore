import { useEffect, useState } from "react";
import { Search, ShoppingCart, Home, Tag } from "lucide-react";

const orbitIcons = [
   {
      Icon: Search,
      color: "text-amber-500",
      bg: "bg-amber-50   border-amber-200",
      angle: 0,
      r: 68,
   },
   {
      Icon: Home,
      color: "text-emerald-500",
      bg: "bg-emerald-50 border-emerald-200",
      angle: 120,
      r: 68,
   },
   {
      Icon: ShoppingCart,
      color: "text-sky-500",
      bg: "bg-sky-50     border-sky-200",
      angle: 240,
      r: 68,
   },
   {
      Icon: Tag,
      color: "text-violet-500",
      bg: "bg-violet-50  border-violet-200",
      angle: 60,
      r: 40,
   },
];

export default function StepTwo() {
   const [deg, setDeg] = useState(0);

   useEffect(() => {
      let id;
      const tick = () => {
         setDeg((d) => (d + 0.35) % 360);
         id = requestAnimationFrame(tick);
      };
      id = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(id);
   }, []);

   return (
      <div className="relative flex h-full w-full items-center justify-center">
         {/* Glow layers */}
         <div className="absolute h-32 w-32 rounded-full bg-emerald-300/20 blur-2xl" />
         <div className="absolute h-24 w-24 rounded-full border border-emerald-200/50" />
         <div className="absolute h-40 w-40 rounded-full border border-dashed border-emerald-200/40" />
         <div className="absolute h-[152px] w-[152px] rounded-full border border-sky-200/30" />

         {/* Center */}
         <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-400 shadow-lg shadow-emerald-200/60">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-2xl bg-emerald-400 opacity-25" />
            <span className="text-xl">🤖</span>
         </div>

         {/* Orbiting icons */}
         {orbitIcons.map(({ Icon, color, bg, angle, r }, i) => {
            const rad = ((deg + angle) * Math.PI) / 180;
            const x = Math.cos(rad) * r;
            const y = Math.sin(rad) * r;
            return (
               <div
                  key={i}
                  className={`absolute flex h-10 w-10 items-center justify-center rounded-xl border ${bg} shadow-sm`}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
               >
                  <Icon className={`h-4 w-4 ${color}`} strokeWidth={2} />
               </div>
            );
         })}
      </div>
   );
}
