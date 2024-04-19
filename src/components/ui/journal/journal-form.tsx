"use client";

import { useFormState } from "react-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createJournalEntry } from "@/lib/journal/actions";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import CardFooterSave from "../shared/card-footer-save";

type PropsType = {
  userId: string;
};

export default function JournalForm({ userId }: PropsType) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createJournalEntry, initialState);

  const {
    register,
    formState: { isValid },
  } = useForm();

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
              {...register("gratefulFor", {
                required: true,
                minLength: 1,
                maxLength: 63,
              })}
              minLength={1}
              maxLength={63}
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
              {...register("reason", {
                required: true,
                minLength: 1,
                maxLength: 63,
              })}
              minLength={1}
              maxLength={63}
              name="reason"
              className="text-md font-medium leading-none"
              placeholder="it is delicious"
            />
          </div>
        </div>
      </CardContent>
      <CardFooterSave isValid={isValid} />
    </form>
  );
}
