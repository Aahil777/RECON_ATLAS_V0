import { Outlet } from "react-router-dom";
import ReconHeader from "./ReconHeader";
import UtilityBar from "./UtilityBar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <UtilityBar />
      <ReconHeader />
      <Outlet />
    </div>
  );
}
