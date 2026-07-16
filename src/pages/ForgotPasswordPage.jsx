import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "@/api/axios.js";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await api.post("/api/auth/forgot-password", { email });
      setDone(true);
    } catch (err) {
      setError(err.response?.data?.msg || "Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary px-4">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center shadow-xl shadow-primary/10">
          <div className="mb-4 text-3xl">✉️</div>
          <h2 className="text-xl font-semibold text-primary">Cek email Anda</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Jika email terdaftar, tautan reset kata sandi akan dikirim ke{" "}
            <strong>{email}</strong>.
          </p>
          <Button asChild variant="outline" className="mt-6 w-full">
            <Link to="/login">Kembali ke masuk</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-xl shadow-primary/10">
        <h1 className="mb-1 text-2xl font-semibold text-primary">Lupa Kata Sandi</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Masukkan email Anda. Kami akan mengirimkan tautan reset kata sandi.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              required
            />
          </div>

          {error && (
            <p className="text-center text-sm text-red-600">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Mengirim..." : "Kirim Tautan Reset"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Ingat kata sandi?{" "}
          <Link to="/login" className="font-medium text-primary hover:text-accent">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
