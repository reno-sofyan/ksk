import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import api, { setAccessToken } from "@/api/axios.js";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      const r = await axios.post(
        `${BASE_URL}/api/auth/refresh`,
        {},
        { withCredentials: true }
      );
      setAccessToken(r.data.accessToken);
      const me = await api.get("/api/auth/me");
      setUser(me.data.user);
    } catch {
      setAccessToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadUser(); }, [loadUser]);

  const login = useCallback(async (email, password) => {
    const r = await api.post("/api/auth/login", { email, password });
    setAccessToken(r.data.accessToken);
    setUser(r.data.user);
    return r.data;
  }, []);

  const logout = useCallback(async () => {
    await api.post("/api/auth/logout").catch(() => {});
    setAccessToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
