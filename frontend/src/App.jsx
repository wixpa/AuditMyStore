import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import DashboardPage from "./pages/DashboardPage";
import PricingPage from "./pages/PricingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
   return (
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/dashboard" element={<DashboardPage />} />
         <Route path="/pricing" element={<PricingPage />} />
         <Route path="/login" element={<LoginPage />} />
         <Route path="/signup" element={<SignupPage />} />
      </Routes>
   );
}

export default App;
