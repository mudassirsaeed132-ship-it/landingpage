import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AuthModal from "../../../features/auth/components/AuthModal";
import { useUI } from "../../../shared/ui/UIProvider";

export default function PublicShell() {
  const { authOpen, authIntent, closeAuth } = useUI();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <Outlet />
      <Footer />
      <AuthModal open={authOpen} intent={authIntent} onClose={closeAuth} />
    </div>
  );
}