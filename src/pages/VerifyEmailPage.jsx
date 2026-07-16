import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "@/api/axios.js";
import { Button } from "@/components/ui/button.jsx";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Token tidak ditemukan.");
      return;
    }
    api
      .get(`/api/auth/verify-email?token=${encodeURIComponent(token)}`)
      .then((r) => {
        setStatus("success");
        setMessage(r.data.msg);
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.response?.data?.msg || "Verifikasi gagal.");
      });
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center shadow-xl shadow-primary/10">
        {status === "loading" && (
          <>
            <div className="mb-4 text-3xl">⏳</div>
            <h2 className="text-xl font-semibold text-primary">Memverifikasi...</h2>
            <p className="mt-2 text-sm text-muted-foreground">Mohon tunggu sebentar.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mb-4 text-3xl">✅</div>
            <h2 className="text-xl font-semibold text-primary">Email terverifikasi!</h2>
            <p className="mt-2 text-sm text-muted-foreground">{message}</p>
            <Button asChild className="mt-6 w-full">
              <Link to="/login">Masuk sekarang</Link>
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mb-4 text-3xl">❌</div>
            <h2 className="text-xl font-semibold text-primary">Verifikasi gagal</h2>
            <p className="mt-2 text-sm text-muted-foreground">{message}</p>
            <Button asChild variant="outline" className="mt-6 w-full">
              <Link to="/login">Kembali ke halaman masuk</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
