import { Outlet } from "react-router-dom";
import ReconHeader from "./ReconHeader";

export default function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <ReconHeader />
      <Outlet />
    </div>
  );
}
