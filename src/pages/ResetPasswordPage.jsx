import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "@/api/axios.js";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Kata sandi tidak cocok.");
      return;
    }
    if (password.length < 8) {
      setError("Kata sandi minimal 8 karakter.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/api/auth/reset-password", { token, password });
      navigate("/login?reset=1", { replace: true });
    } catch (err) {
      setError(err.response?.data?.msg || "Reset gagal. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-sky-50 to-blue-100 px-4">
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl">
          <div className="mb-4 text-3xl">❌</div>
          <h2 className="text-xl font-semibold text-slate-900">Tautan tidak valid</h2>
          <p className="mt-2 text-sm text-slate-500">Token tidak ditemukan.</p>
          <Button asChild variant="outline" className="mt-6 w-full">
            <Link to="/forgot-password">Minta tautan baru</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-sky-50 to-blue-100 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <h1 className="mb-1 text-2xl font-semibold text-slate-900">Reset Kata Sandi</h1>
        <p className="mb-6 text-sm text-slate-500">Buat kata sandi baru untuk akun Anda.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="password">Kata Sandi Baru</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 karakter"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirm">Konfirmasi Kata Sandi</Label>
            <Input
              id="confirm"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Ulangi kata sandi"
              required
            />
          </div>

          {error && (
            <p className="text-center text-sm text-red-600">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan Kata Sandi Baru"}
          </Button>
        </form>
      </div>
    </div>
  );
}
