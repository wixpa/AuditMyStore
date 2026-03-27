import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { getAnonAuditSession } from "../lib/auditUsage";
import { extractStoreOrigin } from "../lib/shopifyValidator";

export default function DashboardPage() {
   const [params] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  const url = params.get("url") || "";
  const autostart = params.get("autostart") === "1";
  const initialPage = params.get("page") || "Home Page";
  const anon = params.get("anon") === "1";

  useEffect(() => {
    if (loading) return;
    if (isAuthenticated) return;

    // Anonymous can access dashboard only after completing the email-first flow.
    if (!anon) {
      navigate("/");
      return;
    }

    const session = getAnonAuditSession();
    const storeOrigin = url ? extractStoreOrigin(url) : "";
    if (!session || !session.storeOrigin || session.storeOrigin !== storeOrigin) {
      navigate("/");
    }
  }, [anon, isAuthenticated, loading, navigate, url]);

  if (loading) return null;

  return <DashboardLayout storeUrl={url} autoStart={autostart} initialPage={initialPage} />;
}
