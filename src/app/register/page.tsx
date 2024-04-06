import React from "react";
import { auth } from "@/auth";
import Form from "@/components/ui/auth/register-form";

export default async function LoginForm() {
  const session = await auth();
  // if (session) {
  //   redirect("/");
  // }
  return (
    <main className="flex items-center justify-center min-h-screen">
      <Form />
    </main>
  );
}
