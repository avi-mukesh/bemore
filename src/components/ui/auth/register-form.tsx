"use client";
import React from "react";
import { useFormState } from "react-dom";
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
import ValidationError from "@/components/ui/auth/validation-error";
import SubmitButton from "@/components/ui/shared/submit-button";

import { useForm } from "react-hook-form";
import ClientValidationError from "./client-validation-error";
import clsx from "clsx";

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createUser, initialState);

  const {
    register,
    getFieldState,
    formState: { errors, isValid, isDirty },
    getValues,
    setError,
  } = useForm({ mode: "all" });

  console.log(Object.keys(errors));

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
                {...register("username", { required: "Username is required" })}
                className="pl-10"
                id="username"
                type="text"
                name="username"
                required
                aria-describedby="username-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errors.username?.message ? (
              <ClientValidationError
                message={errors.username.message.toString()}
                field="username"
              />
            ) : state.errors?.username ? (
              <ValidationError state={state} field="username" />
            ) : (
              false
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value:
                      /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i,
                    message: "Invalid email address.",
                  },
                })}
                className="pl-10"
                id="email"
                type="email"
                name="email"
                required
                aria-describedby="email-error"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errors.email?.message ? (
              <ClientValidationError
                message={errors.email?.message.toString()}
                field="email"
              />
            ) : state.errors?.email ? (
              <ValidationError state={state} field="email" />
            ) : (
              false
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must be at least 8 characters, have a number, a lower case letter, an uppercase letter and a special character.",
                  },
                })}
                className="pl-10"
                id="password"
                name="password"
                type="password"
                aria-describedby="password-error"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errors.password?.message ? (
              <ClientValidationError
                message={errors.password?.message.toString()}
                field="email"
              />
            ) : state.errors?.password ? (
              <ValidationError state={state} field="password" />
            ) : (
              false
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                {...register("confirmPassword", {
                  validate: (confPass) => {
                    if (confPass !== getValues("password")) {
                      setError("confirmPassword", {
                        type: "custom",
                        message: "Passwords must match custom!",
                      });
                    }
                    return (
                      confPass === getValues("password") ||
                      "Passwords must match!"
                    );
                  },
                })}
                className="pl-10"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                aria-describedby="confirmPassword"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errors.confirmPassword?.message ? (
              <ClientValidationError
                message={errors.confirmPassword?.message.toString()}
                field="email"
              />
            ) : state.errors?.confirmPassword ? (
              <ValidationError state={state} field="confirmPassword" />
            ) : (
              false
            )}
          </div>

          <SubmitButton
            text="Create account"
            className={clsx({
              "bg-muted text-muted-foreground": !isValid,
            })}
            disabled={!isValid}
          />
        </form>
        {/* <GoogleSigninButton /> */}
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
