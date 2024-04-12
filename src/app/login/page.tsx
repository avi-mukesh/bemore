import React from "react";
import { auth } from "@/auth";
import Form from "@/components/ui/auth/login-form";
import { redirect } from "next/navigation";

export default async function LoginForm({
  searchParams,
}: {
  searchParams: { justRegistered?: string };
}) {
  const session = await auth();
  const justRegistered = Boolean(searchParams?.justRegistered) || false;

  console.log(justRegistered);

  if (session) {
    redirect("/dashbaord");
  }

  return (
    <main className="flex items-center justify-center min-h-screen">
      <Form justRegistered={justRegistered} />
    </main>
  );
}
