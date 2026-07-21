"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { apiFetch, ApiError } from "./api";
import type { User } from "./types";

const STORAGE_KEY = "fixit_auth";

type AuthState = { token: string; user: User } | null;

type AuthContextValue = {
  user: User | null;
  token: string | null;
  ready: boolean;
  signup: (data: { name: string; email: string; phone: string; password: string }) => Promise<void>;
  login: (data: { email?: string; phone?: string; password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setState(JSON.parse(raw));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: AuthState) => {
    setState(next);
    if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    else localStorage.removeItem(STORAGE_KEY);
  }, []);

  const signup = useCallback(
    async (data: { name: string; email: string; phone: string; password: string }) => {
      const res = await apiFetch<{ token: string; user: User }>("/auth/signup", {
        method: "POST",
        body: data,
      });
      persist(res);
    },
    [persist]
  );

  const login = useCallback(
    async (data: { email?: string; phone?: string; password: string }) => {
      const res = await apiFetch<{ token: string; user: User }>("/auth/login", {
        method: "POST",
        body: data,
      });
      persist(res);
    },
    [persist]
  );

  const logout = useCallback(() => persist(null), [persist]);

  return (
    <AuthContext.Provider
      value={{ user: state?.user ?? null, token: state?.token ?? null, ready, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export { ApiError };
