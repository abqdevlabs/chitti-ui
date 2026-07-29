"use client";

import { api } from "@/api";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

// ================= TYPES =================

type User = {
  id: string;
  email: string;
  role: "INSTRUCTOR" | "STUDENT";
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  Register: (data: {
    email: string;
    password: string;
    otp: string;
  }) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

// ================= CONTEXT =================

const AuthContext = createContext<AuthContextType | null>(null);

// ================= PROVIDER =================

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // ✅ ALL hooks at top (NO conditions above this)
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ================= REFRESH USER =================

  const refreshUser = useCallback(async () => {
    try {
      const res = await api.get("/auth/me");

      const userData: User = {
        id: res.data.id,
        email: res.data.email,
        role: res.data.role,
      };

      setUser(userData);
    } catch (err) {
      console.error("error on refreshing the user", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // ================= LOGIN =================

  const login = async (email: string, password: string) => {
    try {
      await api.post("/auth/login", { email, password });

      const res = await api.get("/auth/me");

      const userData: User = {
        id: res.data.id,
        email: res.data.email,
        role: res.data.role,
      };

      setUser(userData);
      return userData; // ✅
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const Register = async (data: {
    email: string;
    password: string;
    otp: string;
  }) => {
    try {
      await api.post("/auth/register", data);

      const res = await api.get("/auth/me");

      const userData: User = {
        id: res.data.id,
        email: res.data.email,
        role: res.data.role,
      };

      setUser(userData);

      return userData; // ✅
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Send the logout request to the server (e.g., to invalidate refresh tokens/cookies)
      await api.post("/auth/logout");
    } catch (err) {
      console.error(
        "Backend logout failed, proceeding with client-side cleanup:",
        err,
      );
    } finally {
      // 1. Clear React State
      setUser(null);

      // 2. Clear Redux Global State

      // 3. Targeted storage cleanup (prevents breaking settings/dark mode)
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("tempAuthData");
    }
  };
  // ================= INITIAL LOAD =================

  useEffect(() => {
    const initialize = async () => {
      await refreshUser();
    };

    void initialize();
  }, [refreshUser]);

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    refreshUser,
    Register,
  };

  // ✅ conditional rendering AFTER hooks
  if (loading) return <div>Loading</div>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ================= HOOK =================

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
