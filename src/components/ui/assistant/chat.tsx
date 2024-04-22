// "use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { testReplicate } from "@/lib/replicate";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import React from "react";
import MessageHistory from "./message-history";

export default function Chat() {
  return (
    <Card className="w-[90%] md:w-[70%] h-full">
      <CardContent>
        Speak to ass(istant)
        <MessageHistory />
      </CardContent>
      <CardFooter>
        <div className="relative mx-auto w-[75%]">
          <form action={testReplicate}>
            <Input
              name="prompt"
              placeholder="Send a message"
              className="pr-10"
            />
            <button
              type="submit"
              className="cursor-pointer absolute right-0 top-1/2 h-full px-2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
            >
              <PaperAirplaneIcon className="pointer-events-none h-[18px] w-[18px]" />
            </button>
          </form>
        </div>
      </CardFooter>
    </Card>
  );
}
