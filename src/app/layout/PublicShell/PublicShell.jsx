import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AuthModal from "../../../features/auth/components/AuthModal";

export default function PublicShell() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <Outlet />
      <Footer />
      <AuthModal />
    </div>
  );
}