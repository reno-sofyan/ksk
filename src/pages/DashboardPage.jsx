import React from "react";
import { useAuth } from "@/context/AuthContext.jsx";
import { Button } from "@/components/ui/button.jsx";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Selamat datang, <strong>{user?.name}</strong>!
          </p>

          <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-sm text-slate-700">
              <span className="font-medium">Email:</span> {user?.email}
            </p>
            <p className="mt-1 text-sm text-slate-700">
              <span className="font-medium">Role:</span> {user?.role}
            </p>
          </div>

          <Button
            variant="outline"
            className="mt-6"
            onClick={handleLogout}
          >
            Keluar
          </Button>
        </div>
      </div>
    </div>
  );
}
