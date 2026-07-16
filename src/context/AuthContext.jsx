import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const ADMIN_SESSION_KEY = "rivere_admin_session_v1";
const ADMIN_ACCOUNT = {
  name: import.meta.env.VITE_ADMIN_NAME || "Admin Rivere",
  email: (import.meta.env.VITE_ADMIN_EMAIL || "admin@kinaraland.com").trim().toLowerCase(),
  password: import.meta.env.VITE_ADMIN_PASSWORD || "RivereAdmin2026!",
  role: "admin"
};

const AuthContext = createContext(null);

function readStoredAdminUser() {
  if (typeof window === "undefined") return null;

  try {
    const stored = JSON.parse(window.localStorage.getItem(ADMIN_SESSION_KEY) || "null");
    return stored?.email === ADMIN_ACCOUNT.email ? stored : null;
  } catch {
    return null;
  }
}

function saveStoredAdminUser(user) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(user));
}

function clearStoredAdminUser() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ADMIN_SESSION_KEY);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    setUser(readStoredAdminUser());
    setLoading(false);
  }, []);

  useEffect(() => { loadUser(); }, [loadUser]);

  const login = useCallback(async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail !== ADMIN_ACCOUNT.email || password !== ADMIN_ACCOUNT.password) {
      throw new Error("Email atau kata sandi admin tidak sesuai.");
    }

    const adminUser = {
      name: ADMIN_ACCOUNT.name,
      email: ADMIN_ACCOUNT.email,
      role: ADMIN_ACCOUNT.role
    };

    saveStoredAdminUser(adminUser);
    setUser(adminUser);
    return { user: adminUser };
  }, []);

  const logout = useCallback(async () => {
    clearStoredAdminUser();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
