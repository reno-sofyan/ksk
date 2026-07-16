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
    <div className="min-h-screen bg-secondary px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm shadow-primary/10">
          <h1 className="text-2xl font-semibold text-primary">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Selamat datang, <strong>{user?.name}</strong>!
          </p>

          <div className="mt-6 rounded-xl border border-border bg-secondary p-4">
            <p className="text-sm text-foreground/80">
              <span className="font-medium">Email:</span> {user?.email}
            </p>
            <p className="mt-1 text-sm text-foreground/80">
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
