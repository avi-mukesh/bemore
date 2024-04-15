"use client";

import React, { useEffect } from "react";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import { Button } from "@/components/ui/button";

type PropsType = {
  text: string;
  variant?: "destructive" | "default" | "outline";
  className?: string;
  disabled?: boolean;
};

export default function SubmitButton(props: PropsType) {
  const { text, variant, className, disabled, ...rest } = props;
  const { pending, data, method, action } = useFormStatus();

  return (
    <Button
      {...rest}
      variant={variant}
      type="submit"
      className={clsx(className, "w-full mt-2", {
        "bg-muted text-muted-foreground": pending,
      })}
      disabled={pending || disabled}
      aria-disabled={pending || disabled}
    >
      {text}
    </Button>
  );
}
