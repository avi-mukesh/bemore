import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function page() {
  return (
    <Card className=" p-10">
      <CardHeader>
        <CardTitle>
          {new Date().toLocaleString("en-GB", {
            // weekday: "long",
            dateStyle: "full",
          })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5 m-8">
          <div className="grid grid-rows-1 align-middle gap-4">
            <p className="text-xl font-semibold leading-none tracking-tight">
              Today I am grateful for...
            </p>
            <Input
              className="text-md font-medium leading-none"
              placeholder="pizza"
            />
          </div>
          <div className="grid grid-rows-1 align-middle gap-4">
            <p className="text-xl font-semibold leading-none tracking-tight">
              because...
            </p>
            <Input
              className="text-md font-medium leading-none"
              placeholder="it is delicious"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="default" className="mx-auto">
          Enter
        </Button>
      </CardFooter>
    </Card>
  );
}
