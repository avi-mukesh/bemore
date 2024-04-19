import React from "react";
import clsx from "clsx";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type PropsType = {
  isValid: boolean;
};

export default function CardFooterSave({ isValid }: PropsType) {
  return (
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
  );
}
