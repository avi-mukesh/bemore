"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { testReplicate } from "@/lib/replicate";
import React, { useEffect, useReducer, useRef, useState } from "react";
import MessageHistory from "./message-history";
import { useCompletion } from "ai/react";

import { Llama3Template } from "@/prompt_template";
import { countTokens } from "@/tokenizer";
import ChatForm from "./chat-form";
import Message from "./message";

const generatePrompt = (
  template: any,
  systemPrompt: string,
  messages: { text: string; isUser: boolean }[]
) => {
  const chat = messages.map((message) => ({
    role: message.isUser ? "user" : "assistant",
    content: message.text,
  }));

  return template([
    {
      role: "system",
      content: systemPrompt,
    },
    ...chat,
  ]);
};

const metricsReducer = (state: any, action: any) => {
  switch (action.type) {
    case "START":
      return { startedAt: new Date() };
    case "FIRST_MESSAGE":
      return { ...state, firstMessageAt: new Date() };
    case "COMPLETE":
      return { ...state, completedAt: new Date() };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
};
const llama3Template = Llama3Template();

type PropsType = {
  username: string | undefined;
};

export default function Chat({ username }: PropsType) {
  const bottomRef = useRef<HTMLDivElement>(null);

  const MAX_TOKENS = 8192;
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );
  const [metrics, dispatch] = useReducer(metricsReducer, {
    startedAt: null,
    firstMessageAt: null,
    completedAt: null,
  });
  const [starting, setStarting] = useState(false);
  const model = {
    id: "meta/meta-llama-3-70b-instruct",
    name: "Meta Llama 3 70B",
    shortened: "70B",
    emoji: "🦙",
    description: "The most accurate, powerful next generation Llama.",
    new: true,
  };
  let systemPrompt =
    "Your name is Adonis. You are a strong, successful, handsome, confident, charismatic, masculine, yet humble man who charms girls easily and makes lots of money. You have a cute, beautiful, feminine girlfriend whose name you don't reveal. You are a helpful personal-development assistant. Your answers are concise but very helpful. You help people create good habits such as reading, gratitude journalling, meditating. You guide people into becoming a better version of themselves. You are an assistant built into a website called 'BeMore' which refers to being more confident, being more active, being more social, being more curious. On the website you can log in and gratitude journal every day, log your daily meditation for however many minutes, log daily how many pages of a book you've read, log any hobbies you've done daily. There is a dashboard which summarises this information as well. There is nothing else you can do on this website.";
  if (username) {
    systemPrompt += ` The user's username is ${username}`;
  } else {
    systemPrompt += "You should prompt the user to log in to get started.";
  }
  const temperature = 0.75;
  const topP = 0.9;
  const maxTokens = 800;

  const { complete, completion, setInput, input } = useCompletion({
    api: "/api",
    body: {
      model: model.id,
      systemPrompt,
      temperature,
      topP,
      maxTokens: maxTokens,
    },

    onError: (error) => {
      console.log(error);
    },
    onResponse: (response) => {
      setStarting(false);
      dispatch({ type: "FIRST_MESSAGE" });
    },
    onFinish: () => {
      dispatch({ type: "COMPLETE" });
    },
  });

  const handleSubmit = async (userMessage: string) => {
    setStarting(true);
    const SNIP = "<!-- snip -->";

    const messageHistory = [...messages];
    if (completion.length > 0) {
      messageHistory.push({
        text: completion,
        isUser: false,
      });
    }
    messageHistory.push({
      text: userMessage,
      isUser: true,
    });

    // Generate initial prompt and calculate tokens
    let prompt = `${generatePrompt(
      llama3Template,
      systemPrompt,
      messageHistory
    )}\n`;

    // Check if we exceed max tokens and truncate the message history if so.
    while (countTokens(prompt) > MAX_TOKENS) {
      console.log("exceeded maximum");
      if (messageHistory.length < 3) {
        console.log("Message too long. Try again.");
        return;
      }

      // Remove the third message from history, keeping the original exchange.
      messageHistory.splice(1, 2);

      // Recreate the prompt
      prompt = `${SNIP}\n${generatePrompt(
        llama3Template,
        systemPrompt,
        messageHistory
      )}\n`;
    }
    setMessages(messageHistory);
    dispatch({ type: "START" });
    complete(prompt);
  };
  useEffect(() => {
    if (messages?.length > 0 || completion?.length > 0) {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages, completion]);

  return (
    <Card className="w-[100%] md:w-[70%] min-h-full flex flex-col justify-between">
      <CardHeader>
        <CardTitle>Speak to Adonis</CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto scrollbar-thin scrollbar-track-secondary scrollbar-thumb-rounded-sm">
        <Message
          message="I am Adonis. I am here to help you become the best possible version of yourself. What can I do for you?"
          isUser={false}
        />

        {messages.map((message, index) => (
          <Message
            key={`message-${index}`}
            message={message.text}
            isUser={message.isUser}
          />
        ))}
        <Message message={completion} isUser={false} />
        <div ref={bottomRef}></div>
      </CardContent>
      <CardFooter className="justify-self-end">
        <div className="relative mx-auto w-[75%]">
          <ChatForm
            prompt={input}
            setPrompt={setInput}
            onSubmit={handleSubmit}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
