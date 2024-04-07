"use client";

import React, { useEffect } from "react";
import { Button } from "../button";
import { useFormStatus } from "react-dom";
import clsx from "clsx";

type PropsType = {
  text: string;
};

export default function SubmitButton({ text }: PropsType) {
  const { pending, data, method, action } = useFormStatus();

  useEffect(() => {
    console.log("pending:", pending);
  }, [pending]);

  return (
    <Button
      type="submit"
      className={clsx("w-full mt-2", {
        "bg-muted text-muted-foreground": pending,
      })}
      disabled={pending}
    >
      {text}
    </Button>
  );
}
