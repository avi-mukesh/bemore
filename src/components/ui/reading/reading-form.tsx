"use client";

import { createReadingEntry } from "@/lib/reading/actions";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Book } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NewBookDialog from "@/components/ui/reading/new-book-dialog";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import CardFooterSave from "../shared/card-footer-save";

type PropsType = {
  userId: string;
  existingBooks: Book[];
};

export default function ReadingForm({ userId, existingBooks }: PropsType) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createReadingEntry, initialState);

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
                Today I read...
              </p>
              <Input
                {...register("numPages", { required: true, min: 1, max: 5000 })}
                min="1"
                max="10000"
                type="number"
                name="numPages"
                className="text-md font-medium leading-none"
                placeholder="10"
              />
            </div>
            <div className="grid grid-rows-1 align-middle gap-4">
              <p className="text-xl font-semibold leading-none tracking-tight">
                pages of...
              </p>

              <Select
                {...register(
                  "bookId"
                  // , { required: true } // this doesn't work
                )}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Book" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {existingBooks.map((book) => (
                      <SelectItem key={book.id} value={book.id}>
                        {book.title}
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
      <NewBookDialog />
    </>
  );
}
