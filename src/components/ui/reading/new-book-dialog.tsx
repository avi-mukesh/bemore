"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/auth/submit-button";
import { createBook } from "@/lib/reading/actions";
import { useFormState } from "react-dom";

export default function NewBookDialog() {
  const [open, setOpen] = useState(false);

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createBook, initialState);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">New Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            let data = new FormData(e.currentTarget);
            dispatch(data);
            setOpen(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>New Book</DialogTitle>
            <DialogDescription>
              Add a new book that you&apos;re reading.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                name="title"
                id="title"
                placeholder="Bhagavad Gita"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <SubmitButton text="Add" />
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
