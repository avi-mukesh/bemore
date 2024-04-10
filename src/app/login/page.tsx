import React from "react";
import { auth, signIn } from "@/auth";
import Form from "@/components/ui/auth/login-form";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function LoginForm() {
  const session = await auth();
  if (session) {
    redirect("/journal");
  }
  return (
    <main className="flex items-center justify-center min-h-screen">
      <Form />
    </main>
  );
}
