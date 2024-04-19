"use client";

import { Hobby } from "@prisma/client";
import React from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { CardContent, CardFooter } from "../card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { createHobbyEntry } from "@/lib/hobby/actions";
import NewHobbyDialog from "./new-hobby-dialog";
import { Button } from "../button";
import clsx from "clsx";
import CardFooterSave from "../shared/card-footer-save";

type PropsType = {
  userId: string;
  hobbies: Hobby[];
};

export default function HobbyForm({ userId, hobbies }: PropsType) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createHobbyEntry, initialState);

  const {
    register,
    formState: { isValid },
  } = useForm({ mode: "all" });

  return (
    <>
      <form action={dispatch}>
        <input type="hidden" name="userId" defaultValue={userId} />
        <CardContent>
          <div className="flex flex-col gap-5 m-8">
            <div className="grid grid-rows-1 align-middle gap-4">
              <p className="text-xl font-semibold leading-none tracking-tight">
                Today I did
              </p>
              <Select
                {...register(
                  "hobbyId"
                  // , { required: true } // this doesn't work
                )}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Fishing" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {hobbies.map((hobby) => (
                      <SelectItem key={hobby.id} value={hobby.id}>
                        {hobby.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooterSave isValid={isValid} />
      </form>
      <NewHobbyDialog />
    </>
  );
}
