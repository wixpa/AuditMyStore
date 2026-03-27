export default function StepCard({ step, index }) {
   const delays = ["delay-200", "delay-300", "delay-400"];

   return (
      <div
         className={`opacity-0-init animate-fade-in-up ${delays[index]} group flex flex-col`}
      >
         {/* Number badge */}
         <div className="relative z-10 mb-5 flex items-center gap-3">
            <div
               className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-base font-black text-gray-900 shadow-lg ring-1 ${step.badge.split(" ").find((c) => c.startsWith("ring-"))} transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}
            >
               {step.number}
            </div>
            {/* Step label pill */}
            <span
               className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${step.badge}`}
            >
               Step {index + 1}
            </span>
         </div>

         {/* Visual Card */}
         <div
            className={`relative overflow-hidden rounded-3xl border-t-4 ${step.accent} bg-white/80 p-5 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl ${step.glow}`}
            style={{ minHeight: "210px" }}
         >
            {/* Ghost number watermark */}
            <span className="pointer-events-none absolute -right-3 -top-4 select-none text-[88px] font-black leading-none text-gray-100/80">
               {step.number}
            </span>

            {/* Illustration */}
            <div className="relative z-10 flex h-44 items-center justify-center">
               {step.visual}
            </div>
         </div>

         {/* Text */}
         <div className="mt-5 px-1">
            <h3 className="text-lg font-extrabold text-gray-900">
               {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
               {step.desc}
            </p>
         </div>
      </div>
   );
}
