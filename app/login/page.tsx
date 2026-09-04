"use client";
import { useAuth } from "@/context/authContext";
import { LoginForm } from "@app/components/login-form";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROLE_ROUTES } from "@/routes";

export default function Page() {
  const { login, user } = useAuth();
  const router = useRouter();
  console.log("USER", user);
  useEffect(() => {
    if (!user) return;

    console.log("USER:", user);
    console.log("ROLE:", user.role);
    console.log("ROLE ROUTES:", ROLE_ROUTES);
    console.log("TARGET:", ROLE_ROUTES[user.role]);

    const route = ROLE_ROUTES[user.role];

    if (!route) {
      console.error("No route configured for role:", user.role);
      return;
    }

    router.replace(route);
  }, [user, router]);

  const onSubmit = async (email: string, password: string) => {
    const authenticatedUser = await login(email, password);
    router.replace(ROLE_ROUTES[authenticatedUser?.role ?? "member"]);
  };

  return (
    <div>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
}
