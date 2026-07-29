"use client";
import { useAuth } from "@/context/authContext";
import { LoginForm } from "@app/components/login-form";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { login, user } = useAuth();
  const router = useRouter();
  console.log("USER", user);
  useEffect(() => {
    if (user) {
      router.replace("/admin/chits");
    }
  }, [user, router]);

  const onSubmit = async (email: string, password: string) => {
    await login(email, password);
    router.replace("/admin/chits");
  };

  return (
    <div>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
}
