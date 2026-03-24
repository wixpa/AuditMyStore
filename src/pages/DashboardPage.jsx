import { useSearchParams } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";

export default function DashboardPage() {
   const [params] = useSearchParams();
   const url = params.get("url") || "";
   return <DashboardLayout storeUrl={url} />;
}
