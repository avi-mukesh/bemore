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
import SubmitButton from "@/components/ui/shared/submit-button";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import clsx from "clsx";

type PropsType = {
  justRegistered: boolean;
};

export default function Form({ justRegistered }: PropsType) {
  useEffect(() => {
    if (justRegistered) {
      toast("Registration successful");
    }
  }, [justRegistered]);

  const {
    register,
    formState: { isValid },
  } = useForm();

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
                {...register("username", { required: true })}
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
                {...register("password", { required: true })}
                className="pl-10"
                id="password"
                name="password"
                type="password"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <SubmitButton
            text="Log in"
            className={clsx({ "bg-muted text-muted-foreground": !isValid })}
            disabled={!isValid}
          />
        </form>
        {errorMessage && (
          <div className="flex justify-center gap-2 my-2 text-red-500">
            <ExclamationCircleIcon className="h-5 w-5" />
            <p className="-text-red-500 text-sm">{errorMessage}</p>
          </div>
        )}
        {/* <GoogleSigninButton /> */}
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
