import { useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Send, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import { useHireModal } from "../context/HireModalContext";

export default function ContactPage() {
   const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
   const [submitted, setSubmitted] = useState(false);
   const [sending, setSending] = useState(false);
   const { openHireModal } = useHireModal();

   const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
      setSending(true);
      setTimeout(() => {
         setSending(false);
         setSubmitted(true);
         setForm({ name: "", email: "", subject: "", message: "" });
      }, 1200);
   };

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
                  {/* Header */}
                  <div className="mb-14 text-center">
                     <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700 shadow-sm">
                        ✦ Get In Touch
                     </span>
                     <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-[56px]">
                        Let's{" "}
                        <span className="relative inline-block">
                           Talk
                           <svg
                              className="absolute -bottom-2 left-0 w-full"
                              viewBox="0 0 120 10"
                              fill="none"
                              preserveAspectRatio="none"
                           >
                              <path
                                 d="M2 7 C30 2, 60 10, 90 5 S110 2, 118 6"
                                 stroke="#10b981"
                                 strokeWidth="2.5"
                                 strokeLinecap="round"
                                 fill="none"
                              />
                           </svg>
                        </span>
                     </h1>
                     <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-gray-500 sm:text-lg">
                        Have a project in mind? Need Shopify expertise? We'd love to hear from you.
                     </p>
                  </div>

                  <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
                     {/* Contact Info */}
                     <div className="lg:col-span-2 flex flex-col gap-6">
                        {/* Info Cards */}
                        {[
                           {
                              icon: Mail,
                              title: "Email Us",
                              detail: "hello@auditmystore.com",
                              desc: "We'll respond within 24 hours",
                              color: "bg-emerald-50 text-emerald-600",
                           },
                           {
                              icon: MapPin,
                              title: "Location",
                              detail: "Remote Team",
                              desc: "Serving clients worldwide",
                              color: "bg-sky-50 text-sky-600",
                           },
                           {
                              icon: Clock,
                              title: "Working Hours",
                              detail: "Mon — Fri, 9AM — 6PM",
                              desc: "We reply on weekends too",
                              color: "bg-violet-50 text-violet-600",
                           },
                        ].map((item, i) => {
                           const Icon = item.icon;
                           return (
                              <div
                                 key={i}
                                 className="group flex items-start gap-4 rounded-2xl border border-gray-200/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                              >
                                 <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${item.color} transition-transform duration-200 group-hover:scale-110`}>
                                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                                 </div>
                                 <div>
                                    <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                                    <p className="mt-0.5 text-sm font-semibold text-gray-700">{item.detail}</p>
                                    <p className="mt-0.5 text-xs text-gray-400">{item.desc}</p>
                                 </div>
                              </div>
                           );
                        })}

                        {/* Hire CTA */}
                        <button
                           onClick={openHireModal}
                           className="group flex w-full items-center gap-3 rounded-2xl bg-gray-900 p-6 text-white shadow-lg transition-all duration-200 hover:bg-emerald-600 hover:scale-[1.02] active:scale-[0.98] cursor-pointer border-none"
                        >
                           <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
                              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                 <line x1="22" y1="2" x2="11" y2="13" />
                                 <polygon points="22 2 15 22 11 13 2 9 22 2" />
                              </svg>
                           </div>
                           <div className="text-left">
                              <p className="text-sm font-bold">Get Expert Help</p>
                              <p className="text-xs text-white/60">Shopify Development & Optimization</p>
                           </div>
                           <svg className="ml-auto h-5 w-5 text-white/40 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                           </svg>
                        </button>
                     </div>

                     {/* Contact Form */}
                     <div className="lg:col-span-3">
                        <div className="rounded-3xl border border-gray-200/60 bg-white/80 p-8 shadow-sm backdrop-blur-sm sm:p-10">
                           {submitted ? (
                              <div className="flex flex-col items-center justify-center py-16 text-center">
                                 <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                                    <CheckCircle className="h-8 w-8 text-emerald-500" strokeWidth={1.8} />
                                 </div>
                                 <h3 className="text-xl font-extrabold text-gray-900">Message Sent!</h3>
                                 <p className="mt-2 text-sm text-gray-500 max-w-xs">
                                    Thanks for reaching out. We'll get back to you within 24 hours.
                                 </p>
                                 <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-6 rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-200"
                                 >
                                    Send another message
                                 </button>
                              </div>
                           ) : (
                              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                 <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                       <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                                          Full Name *
                                       </label>
                                       <input
                                          type="text"
                                          name="name"
                                          value={form.name}
                                          onChange={handleChange}
                                          required
                                          placeholder="John Doe"
                                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                                       />
                                    </div>
                                    <div>
                                       <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                                          Email Address *
                                       </label>
                                       <input
                                          type="email"
                                          name="email"
                                          value={form.email}
                                          onChange={handleChange}
                                          required
                                          placeholder="john@example.com"
                                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                                       />
                                    </div>
                                 </div>

                                 <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                                       Subject
                                    </label>
                                    <input
                                       type="text"
                                       name="subject"
                                       value={form.subject}
                                       onChange={handleChange}
                                       placeholder="What's this about?"
                                       className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                                    />
                                 </div>

                                 <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                                       Message *
                                    </label>
                                    <textarea
                                       name="message"
                                       value={form.message}
                                       onChange={handleChange}
                                       required
                                       rows={5}
                                       placeholder="Tell us about your project or question..."
                                       className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                                    />
                                 </div>

                                 <button
                                    type="submit"
                                    disabled={sending}
                                    className="group flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-gray-900/20 transition-all duration-200 hover:bg-emerald-600 hover:scale-[1.02] active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
                                 >
                                    {sending ? (
                                       <>
                                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                          </svg>
                                          Sending...
                                       </>
                                    ) : (
                                       <>
                                          <Send className="h-4 w-4" strokeWidth={2} />
                                          Send Message
                                       </>
                                    )}
                                 </button>
                              </form>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </main>
         <Footer />
      </>
   );
}
