"use client";
import Link from "next/link";
import {
  UserCircleIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { authenticate } from "@/lib/user/actions";
import GoogleSigninButton from "./google-signin-button";
import SubmitButton from "./submit-button";
import { toast } from "sonner";

type PropsType = {
  justRegistered: boolean;
};

export default function Form({ justRegistered }: PropsType) {
  useEffect(() => {
    console.log(justRegistered);
    if (justRegistered) {
      toast("Registration successful");
    }
  }, [justRegistered]);

  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">Sign In</CardTitle>
        <CardDescription>Log in to an existing account</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={dispatch} className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <Input
                className="pl-10"
                id="username"
                type="text"
                name="username"
                required
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                className="pl-10"
                id="password"
                name="password"
                type="password"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <SubmitButton text="Log in" />
        </form>
        {errorMessage && (
          <div className="flex justify-center gap-2 my-2">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="-text-red-500 text-sm">{errorMessage}</p>
          </div>
        )}
        <GoogleSigninButton />
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
