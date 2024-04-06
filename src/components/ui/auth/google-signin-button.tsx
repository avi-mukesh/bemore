import React from "react";
import { Button } from "../button";
import { signIn } from "next-auth/react";

function GoogleSigninButton() {
  return (
    <Button
      variant="outline"
      className="w-full mt-2 border-blue-400"
      onClick={() => signIn("google")}
    >
      Sign in with Google
    </Button>
  );
}

export default GoogleSigninButton;
