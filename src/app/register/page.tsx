import React from "react";
import { auth } from "@/auth";
import Form from "@/components/ui/auth/register-form";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import AnimatedText from "@/components/ui/animated-text";

export const metadata: Metadata = {
  title: "Register",
};
export default async function LoginForm() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <main className="flex flex-col h-[100%] items-center justify-center gap-4">
      <AnimatedText />
      <Form />
    </main>
  );
}
