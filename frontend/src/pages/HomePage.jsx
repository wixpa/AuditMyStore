import Header from "../components/header/Header";
import HeroSection from "../components/hero/HeroSection";
import HowItWorksSection from "../components/how-it-works/HowItWorksSection";
import WhatCanFixSection from "../components/what-can-fix/WhatCanFixSection";
import WhoIsItForSection from "../components/who-is-it-for/WhoIsItForSection";
import WhoWeAreSection from "../components/who-we-are/WhoWeAreSection";
import FaqSection from "../components/faq/FaqSection";
import Footer from "../components/footer/Footer";

export default function HomePage() {
   return (
      <>
         <Header />
         <main>
            <HeroSection />
            <HowItWorksSection />
            <WhatCanFixSection />
            <WhoIsItForSection />
            <WhoWeAreSection />
            <FaqSection />
            <Footer />
         </main>
      </>
   );
}
