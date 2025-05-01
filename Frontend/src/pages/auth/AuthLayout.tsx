import { Outlet } from "react-router";
import logo from "@assets/logo.png";

export default function AuthLayout() {
  return (
    <div className=" h-full min-h-dvh bg-gradient-to-bl to-(--gradient-1) from-(--gradient-2)">
      <header className="flex justify-center">
        <img src={logo} alt="logo da Neukox" className="w-28" />
      </header>
      <main className="min-h-[calc(100dvh_-_7rem)] flex items-center justify-center p-6">
        <Outlet />
      </main>
    </div>
  );
}
