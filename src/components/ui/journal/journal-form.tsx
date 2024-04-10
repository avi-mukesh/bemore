"use client";

import React from "react";
import { CardContent, CardFooter } from "../card";
import { Input } from "../input";
import { Button } from "../button";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { createJournalEntry } from "@/lib/journal/actions";
import { auth } from "@/auth";

type PropsType = {
  userId: string;
};

export default function JournalForm({ userId }: PropsType) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createJournalEntry, initialState);

  return (
    <form action={dispatch}>
      <input type="hidden" name="userId" defaultValue={userId} />
      <CardContent>
        <div className="flex flex-col gap-5 m-8">
          <div className="grid grid-rows-1 align-middle gap-4">
            <p className="text-xl font-semibold leading-none tracking-tight">
              Today I am grateful for...
            </p>
            <Input
              name="gratefulFor"
              className="text-md font-medium leading-none"
              placeholder="pizza"
            />
          </div>
          <div className="grid grid-rows-1 align-middle gap-4">
            <p className="text-xl font-semibold leading-none tracking-tight">
              because...
            </p>
            <Input
              name="reason"
              className="text-md font-medium leading-none"
              placeholder="it is delicious"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" variant="default" className="mx-auto">
          Enter
        </Button>
      </CardFooter>
    </form>
  );
}
