import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "@/api/axios.js";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (form.password !== form.confirm) {
      setError("Kata sandi tidak cocok.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      setDone(true);
    } catch (err) {
      setError(err.response?.data?.msg || "Pendaftaran gagal. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary px-4">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center shadow-xl shadow-primary/10">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl">
            ✉️
          </div>
          <h2 className="text-xl font-semibold text-primary">Cek email Anda</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tautan verifikasi dikirim ke <strong>{form.email}</strong>. Klik tautan di
            email untuk mengaktifkan akun.
          </p>
          <Button
            variant="outline"
            className="mt-6 w-full"
            onClick={() => navigate("/login")}
          >
            Ke halaman masuk
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-xl shadow-primary/10">
        <h1 className="mb-1 text-2xl font-semibold text-primary">Daftar</h1>
        <p className="mb-6 text-sm text-muted-foreground">Buat akun KIKOST baru.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input
              id="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={set("name")}
              placeholder="Nama kamu"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={set("email")}
              placeholder="nama@email.com"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Kata Sandi</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={set("password")}
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
              value={form.confirm}
              onChange={set("confirm")}
              placeholder="Ulangi kata sandi"
              required
            />
          </div>

          {error && (
            <p className="text-center text-sm text-red-600">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Mendaftar..." : "Daftar"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Sudah punya akun?{" "}
          <Link to="/login" className="font-medium text-primary hover:text-accent">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
