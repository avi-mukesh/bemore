"use client";

import React from "react";
import { Label } from "../label";
import { UploadButton } from "@/lib/utils";
import { updateAvatar } from "@/lib/user/actions";
import { toast } from "sonner";

type PropsType = {
  userId: string;
};

export default function AvatarUpload({ userId }: PropsType) {
  return (
    <div className="flex gap-10 items-center">
      <Label>Avatar image</Label>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          updateAvatar(userId, res[0].url);
          toast("Avatar updated successfully!");
        }}
        onUploadError={(error: Error) => {
          console.log("Error:", error.message);
        }}
      />
    </div>
  );
}
