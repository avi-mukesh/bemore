import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Icons } from "@/components/icons";

type PropsType = {
  message: any;
  isUser: boolean;
  avatar?: string | null | undefined;
  username?: string | undefined;
};

export default function Message({
  message,
  isUser,
  avatar,
  username,
}: PropsType) {
  let containerClass = "bg-primary-foreground";
  if (isUser) {
    containerClass = "";
  }

  if (Array.isArray(message)) {
    message = message.join("");
  }

  if (!message || message === "") {
    return null;
  }

  return (
    <div className={`flex gap-x-4 rounded-md ${containerClass} py-3 px-5 mb-1`}>
      {isUser ? (
        <span className="text-xl sm:text-2xl" title="user">
          <Avatar>
            {avatar !== null && (
              <AvatarImage src={avatar} alt={username}></AvatarImage>
            )}

            <AvatarFallback className="w-10 h-10">
              <Icons.user className="w-10 h-10" />
            </AvatarFallback>
          </Avatar>
        </span>
      ) : (
        <span className="text-xl sm:text-2xl">
          <Avatar>
            <AvatarImage
              src="https://i.ibb.co/XCksTXN/5a518767-b170-4eb8-979d-1b8506ffe102.jpg"
              alt="Mukesh"
            ></AvatarImage>
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
        </span>
      )}

      <div className="flex flex-col text-sm sm:text-base flex-1 gap-y-4 mt-1">
        {message.split("\n").map(
          (text: string, index: number) =>
            text.length > 0 && (
              <span key={index} className="min-w-0">
                {text}
              </span>
            )
        )}
      </div>
    </div>
  );
}
