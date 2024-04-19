"use client";

import { createHobby } from "@/lib/hobby/actions";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Button } from "../button";
import { Label } from "../label";
import { Input } from "../input";
import SubmitButton from "../shared/submit-button";

export default function NewHobbyDialog() {
  const [open, setOpen] = useState(false);

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createHobby, initialState);

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
            <DialogTitle>New Hobby</DialogTitle>
            <DialogDescription>Add a new hobby you enjoy.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Name
              </Label>
              <Input
                name="name"
                id="name"
                placeholder="Exercising"
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
