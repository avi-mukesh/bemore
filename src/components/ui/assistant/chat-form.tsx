import React, { FormEvent, KeyboardEvent, KeyboardEventHandler } from "react";
import { Input } from "@/components/ui/input";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

type PropsType = {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (userMessage: string) => Promise<void>;
};

export default function ChatForm({ prompt, setPrompt, onSubmit }: PropsType) {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    onSubmit(prompt);
    setPrompt("");
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <form className="w-full flex" onSubmit={handleSubmit}>
      <Input
        autoComplete="off"
        autoFocus
        name="prompt"
        className="flex-grow block w-full rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:leading-6"
        placeholder="Send a message"
        required={true}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        // onInput={(e) => {
        //   const lineCount = e.target.value.split("\n").length;
        //   e.target.rows = lineCount > 10 ? 10 : lineCount;
        // }}
      />
      <button
        type="submit"
        className="cursor-pointer absolute right-0 top-1/2 h-full px-2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
      >
        <PaperAirplaneIcon className="pointer-events-none h-[18px] w-[18px]" />
      </button>
    </form>
  );
}
