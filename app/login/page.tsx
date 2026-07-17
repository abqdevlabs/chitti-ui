"use client";
import { LoginForm } from "@app/components/login-form";

export default function Page() {
  function onSubmit(email: string, password: string) {
    console.log(email, password);
  }
  return (
    <div className="">
      <LoginForm onSubmit={(email, password) => onSubmit(email, password)} />
    </div>
  );
}
