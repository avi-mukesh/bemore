"use client";

import React from "react";
import { Card, CardContent, CardFooter } from "../card";
import { Input } from "../input";
import { Button } from "../button";
import { useFormState } from "react-dom";
import { createMeditation } from "@/lib/meditation/actions";
import clsx from "clsx";
import { useForm } from "react-hook-form";

type PropsType = {
  userId: string;
};

export default function MeditationForm({ userId }: PropsType) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createMeditation, initialState);

  const {
    register,
    formState: { isValid },
  } = useForm();

  return (
    <form action={dispatch}>
      <input type="hidden" name="userId" defaultValue={userId} />
      <CardContent>
        <div className="grid grid-rows-1 align-middle gap-4">
          <p className="text-xl font-semibold leading-none tracking-tight">
            Today I meditated for
          </p>
          <Input
            {...register("duration", {
              required: true,
              min: 1,
              max: 720,
            })}
            min={1}
            max={720}
            type="number"
            name="duration"
            className="text-md font-medium leading-none"
            placeholder="10"
          />
          <p className="text-xl font-semibold leading-none tracking-tight">
            minutes
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          variant="default"
          className={clsx("mx-auto", {
            "bg-muted text-muted-foreground": !isValid,
          })}
          disabled={!isValid}
        >
          Save
        </Button>
      </CardFooter>
    </form>
  );
}
