import React, { useState } from "react";
import { Button } from "../button";
import { signIn } from "next-auth/react";
import clsx from "clsx";

export default function GoogleSigninButton() {
  const [disabled, setDisabled] = useState(false);

  const handleClick = async () => {
    setDisabled(true);
    await signIn("google");
  };

  return (
    <Button
      variant="outline"
      className={clsx("w-full mt-2 border-blue-400", {
        "bg-muted text-muted-foreground": disabled,
      })}
      onClick={handleClick}
      disabled={disabled}
    >
      Sign in with Google
    </Button>
  );
}
