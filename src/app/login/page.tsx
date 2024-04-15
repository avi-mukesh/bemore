import React from "react";
import { auth } from "@/auth";
import Form from "@/components/ui/auth/login-form";
import { redirect } from "next/navigation";
import AnimatedText from "@/components/ui/animated-text";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginForm({
  searchParams,
}: {
  searchParams: { justRegistered?: string };
}) {
  const session = await auth();
  const justRegistered = Boolean(searchParams?.justRegistered) || false;

  if (session) {
    redirect("/dashbaord");
  }

  return (
    <main className="flex flex-col h-[100%] items-center justify-center gap-4">
      <AnimatedText />
      <Form justRegistered={justRegistered} />
    </main>
  );
}
