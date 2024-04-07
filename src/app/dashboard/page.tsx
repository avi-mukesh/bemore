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
import JournalForm from "@/components/ui/journal-form";

export default function page() {
  return (
    <Card className=" p-10">
      <CardHeader>
        <CardTitle>
          {new Date().toLocaleString("en-GB", {
            dateStyle: "full",
          })}
        </CardTitle>
      </CardHeader>
      <JournalForm />
    </Card>
  );
}
