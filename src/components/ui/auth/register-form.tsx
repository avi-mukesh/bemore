"use client";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";

import {
  UserCircleIcon,
  AtSymbolIcon,
  KeyIcon,
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

import { createUser } from "@/lib/user/actions";

import GoogleSigninButton from "./google-signin-button";
import ValidationError from "./validation-error";
import SubmitButton from "./submit-button";

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createUser, initialState);

  const { pending, data, method, action } = useFormStatus();

  useEffect(() => {
    console.log("pending: ", pending);
  }, [pending]);

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>Create a new account</CardDescription>
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
                aria-describedby="username-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {state.errors?.username && (
              <ValidationError state={state} field="username" />
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                className="pl-10"
                id="email"
                type="email"
                name="email"
                required
                aria-describedby="email-error"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {state.errors?.email && (
              <ValidationError state={state} field="email" />
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                className="pl-10"
                id="password"
                name="password"
                type="password"
                aria-describedby="password-error"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {state.errors?.password && (
              <ValidationError state={state} field="password" />
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                className="pl-10"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                aria-describedby="confirmPassword"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {state.errors?.confirmPassword && (
              <ValidationError state={state} field="confirmPassword" />
            )}
          </div>
          <SubmitButton text="Create account" />
        </form>
        <GoogleSigninButton />
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
