const features = [
  {
    label: "AI SEO Audit",
    desc: "Get discovered on ChatGPT",
    bg: "bg-[#e8f5e0]",
    border: "border-[#c8e6b0]",
    rotate: "-rotate-2",
    badge: "NEW",
  },
  {
    label: "AI CRO Audit",
    desc: "Turn more visitors into customers",
    bg: "bg-[#d4f5ec]",
    border: "border-[#a8e8d8]",
    rotate: "rotate-1",
  },
  {
    label: "App Audit",
    desc: "Remove unwanted apps",
    bg: "bg-[#d0f0f0]",
    border: "border-[#a0dede]",
    rotate: "-rotate-1",
  },
  {
    label: "Mobile Experience",
    desc: "Ensure easy browsing on mobiles",
    bg: "bg-[#e0e0f8]",
    border: "border-[#c0c0f0]",
    rotate: "rotate-2",
  },
  {
    label: "Page speed",
    desc: "Load faster, Sell faster",
    bg: "bg-[#fef9c3]",
    border: "border-[#fde68a]",
    rotate: "-rotate-1",
  },
];

export default function FeatureCards() {
  return (
    <div className="mt-4 w-full px-2">
      <div className="flex flex-wrap justify-center gap-3 mx-auto max-w-4xl">
        {features.map((f, i) => (
          <div
            key={i}
            className={`
              group relative flex flex-col justify-between
              ${f.bg} ${f.border} ${f.rotate}
              border-2 rounded-[22px]
              w-[175px] h-[110px]
              px-4 pt-4 pb-4
              cursor-default select-none
              transition-all duration-300 ease-out
              hover:rotate-0 hover:-translate-y-3 hover:shadow-2xl hover:scale-[1.05] hover:z-10
            `}
            style={{ zIndex: i }}
          >
            {f.badge && (
              <span className="absolute -top-3 left-3 rounded-md bg-yellow-400 px-2 py-0.5 text-[10px] font-black text-yellow-900 shadow-sm tracking-wide">
                NEW
              </span>
            )}

            <p className="text-[14px] font-extrabold text-gray-800 leading-tight">
              {f.label}
            </p>

            <p className="text-[11.5px] italic text-gray-500 leading-snug mt-auto">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}