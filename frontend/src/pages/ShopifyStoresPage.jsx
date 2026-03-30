import { useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { X, Check, ExternalLink } from "lucide-react";

const projects = [
   {
      title: "Luxury Zero-Waste Shopify Store Redesign",
      subtitle: "Sustainable Beauty Brand",
      image: "/project-1.png",
      description:
         "Redesigned and customized a high-end Shopify store for a sustainable beauty brand selling solid shampoo and body care bars. The homepage uses full-width hero imagery, clear value propositions, and a guided \"Begin Your Ritual\" call-to-action to drive users into curated product rituals.",
      details: [
         "Structured featured collections like \"Scalp Balance Ritual,\" \"Strength & Vitality Ritual,\" and \"Deep Hydration Ritual\" with clean grids and consistent card layouts",
         "Collection pages optimized with story-driven layouts, fragrance pyramids, narrative sections, and ingredient accordions",
         "CRO best practices with social proof (press logos and customer reviews), simplified product info, and easy add-to-cart on desktop and mobile",
      ],
      tags: ["Shopify", "Custom Theme", "CRO", "Mobile-First", "Liquid", "CSS"],
      link: "#",
      color: "from-amber-600 to-stone-700",
      accentColor: "text-amber-700",
      accentBg: "bg-amber-50",
      accentBorder: "border-amber-200",
   },
   {
      title: "High-Converting Coffee Brand Store",
      subtitle: "Science-Backed Coffee E-Commerce",
      image: "/project-2.png",
      description:
         "Designed & developed a conversion-focused Shopify store for a premium coffee brand. Created custom homepage, product, research, FAQ & reviews pages with science-backed benefits and strong social proof.",
      details: [
         "Built smooth education-to-checkout buying flow highlighting research and clinical data",
         "Custom pages for product science, FAQ, and peer-reviewed research integration",
         "Optimized for mobile-first design, speed & stability using clean Liquid, HTML, CSS & JavaScript",
      ],
      tags: ["Shopify", "Conversion Rate", "Custom Pages", "HTML/CSS", "JavaScript", "Mobile-First"],
      link: "#",
      color: "from-red-700 to-stone-800",
      accentColor: "text-red-800",
      accentBg: "bg-red-50",
      accentBorder: "border-red-200",
   },
];

function ProjectDetailModal({ project, open, onClose }) {
   if (!open || !project) return null;

   return (
      <>
         {/* Backdrop */}
         <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
         />
         {/* Modal */}
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div
               className="pointer-events-auto w-full max-w-2xl rounded-3xl border border-gray-200/80 bg-white shadow-2xl animate-slide-up overflow-hidden max-h-[90vh] flex flex-col"
               onClick={(e) => e.stopPropagation()}
            >
               {/* Image header */}
               <div className="relative h-56 sm:h-64 overflow-hidden flex-shrink-0">
                  <img
                     src={project.image}
                     alt={project.title}
                     className="h-full w-full object-cover object-top"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-40`} />
                  <button
                     onClick={onClose}
                     className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white transition-all hover:bg-black/50 hover:scale-110 backdrop-blur-sm"
                  >
                     <X className="h-4 w-4" strokeWidth={2.5} />
                  </button>
                  <div className="absolute bottom-4 left-6 right-6">
                     <span className={`inline-flex items-center gap-1.5 rounded-full border ${project.accentBorder} ${project.accentBg} px-3 py-1 text-xs font-semibold ${project.accentColor} mb-2`}>
                        {project.subtitle}
                     </span>
                     <h3 className="text-xl font-extrabold text-white drop-shadow-lg sm:text-2xl">{project.title}</h3>
                  </div>
               </div>

               {/* Body */}
               <div className="px-7 py-6 overflow-y-auto flex-1">
                  <p className="text-sm leading-relaxed text-gray-600 mb-6">
                     {project.description}
                  </p>

                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">What We Did</h4>
                  <ul className="space-y-2.5 mb-6">
                     {project.details.map((d, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                           <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" strokeWidth={2.5} />
                           <span className="text-sm text-gray-600">{d}</span>
                        </li>
                     ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                     {project.tags.map((tag, i) => (
                        <span key={i} className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
                           {tag}
                        </span>
                     ))}
                  </div>

                  {/* Link */}
                  {project.link && (
                     <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-emerald-600 hover:scale-[1.02] active:scale-[0.98] no-underline"
                     >
                        Visit Store
                        <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.5} />
                     </a>
                  )}
               </div>
            </div>
         </div>
      </>
   );
}

export default function ShopifyStoresPage() {
   const [selectedProject, setSelectedProject] = useState(null);

   return (
      <>
         <Header />
         <main>
            <section className="relative min-h-screen w-full overflow-hidden">
               {/* Background */}
               <div className="absolute inset-0 -z-10">
                  <div
                     className="absolute inset-0"
                     style={{
                        background: `
                           radial-gradient(ellipse 80% 60% at 10% 0%, rgba(167,243,208,0.35) 0%, transparent 60%),
                           radial-gradient(ellipse 60% 50% at 90% 5%, rgba(186,230,255,0.30) 0%, transparent 55%),
                           radial-gradient(ellipse 60% 50% at 50% 100%, rgba(209,250,229,0.25) 0%, transparent 60%),
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

               <div className="mx-auto max-w-6xl px-5 pt-32 pb-24 sm:px-6">
                  {/* Page Header */}
                  <div className="mb-16 text-center">
                     <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700 shadow-sm">
                        ✦ Our Store Projects
                     </span>
                     <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-[56px]">
                        Shopify Stores We've{" "}
                        <span className="relative inline-block">
                           Crafted
                           <svg
                              className="absolute -bottom-2 left-0 w-full"
                              viewBox="0 0 220 10"
                              fill="none"
                              preserveAspectRatio="none"
                           >
                              <path
                                 d="M2 7 C50 2, 100 10, 150 5 S200 2, 218 6"
                                 stroke="#10b981"
                                 strokeWidth="2.5"
                                 strokeLinecap="round"
                                 fill="none"
                              />
                           </svg>
                        </span>
                     </h1>
                     <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-gray-500 sm:text-lg">
                        Custom Shopify store designs focused on conversions, brand storytelling, and premium user experience.
                     </p>
                  </div>

                  {/* Projects Grid */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                     {projects.map((project, index) => (
                        <button
                           key={index}
                           onClick={() => setSelectedProject(project)}
                           className="group relative overflow-hidden rounded-2xl border border-gray-200/70 bg-white/90 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-gray-300/80 cursor-pointer text-left"
                        >
                           {/* Image */}
                           <div className="relative h-48 sm:h-56 overflow-hidden">
                              <img
                                 src={project.image}
                                 alt={project.title}
                                 className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                              <span className={`absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border ${project.accentBorder} ${project.accentBg} px-2.5 py-0.5 text-[11px] font-semibold ${project.accentColor}`}>
                                 {project.subtitle}
                              </span>
                           </div>

                           {/* Content */}
                           <div className="p-5">
                              <h3 className="text-[15px] font-extrabold text-gray-900 leading-snug mb-2">{project.title}</h3>
                              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">{project.description}</p>

                              <div className="flex items-center gap-2 flex-wrap">
                                 {project.tags.slice(0, 3).map((tag, i) => (
                                    <span key={i} className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-500">
                                       {tag}
                                    </span>
                                 ))}
                                 {project.tags.length > 3 && (
                                    <span className="text-[11px] font-semibold text-gray-400">+{project.tags.length - 3}</span>
                                 )}
                                 <span className="ml-auto text-xs font-semibold text-gray-400 group-hover:text-emerald-600 transition-colors flex items-center gap-1">
                                    View
                                    <svg className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
                                 </span>
                              </div>
                           </div>
                        </button>
                     ))}
                  </div>
               </div>
            </section>
         </main>
         <Footer />

         {/* Project Detail Modal */}
         <ProjectDetailModal
            project={selectedProject}
            open={!!selectedProject}
            onClose={() => setSelectedProject(null)}
         />
      </>
   );
}
