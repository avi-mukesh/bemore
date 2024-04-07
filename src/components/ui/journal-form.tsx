"use client";

import React from "react";
import { CardContent, CardFooter } from "./card";
import { Input } from "./input";
import { Button } from "./button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

const formSchema = z.object({
  gratefulFor: z.string().max(63),
  reason: z.string().max(63),
});

function JournalForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gratefulFor: "",
      reason: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CardContent>
          <div className="flex flex-col gap-5 m-8">
            <div className="grid grid-rows-1 align-middle gap-4">
              <p className="text-xl font-semibold leading-none tracking-tight">
                Today I am grateful for...
              </p>

              <FormField
                control={form.control}
                name="gratefulFor"
                render={({ field }) => (
                  <FormControl>
                    <Input
                      className="text-md font-medium leading-none"
                      placeholder="pizza"
                      {...field}
                    />
                  </FormControl>
                )}
              />
            </div>
            <div className="grid grid-rows-1 align-middle gap-4">
              <p className="text-xl font-semibold leading-none tracking-tight">
                because...
              </p>
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormControl>
                    <Input
                      className="text-md font-medium leading-none"
                      placeholder="it is delicious"
                      {...field}
                    />
                  </FormControl>
                )}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" variant="default" className="mx-auto">
            Enter
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}

export default JournalForm;
