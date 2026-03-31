import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import DashboardPage from "./pages/DashboardPage";
import PricingPage from "./pages/PricingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ShopifyAppsPage from "./pages/ShopifyAppsPage";
import ShopifyStoresPage from "./pages/ShopifyStoresPage";
import ContactPage from "./pages/ContactPage";
import HireFormModal from "./components/hire-modal/HireFormModal";

function ScrollToTop() {
   const { pathname } = useLocation();
   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   }, [pathname]);
   return null;
}

function App() {
   return (
      <>
         <ScrollToTop />
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/shopify-apps" element={<ShopifyAppsPage />} />
            <Route path="/shopify-stores" element={<ShopifyStoresPage />} />
            <Route path="/contact" element={<ContactPage />} />
         </Routes>

         {/* Global hire modal — triggered from footer & contact page */}
         <HireFormModal />
      </>
   );
}

export default App;
