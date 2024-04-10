import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import JournalForm from "@/components/ui/journal/journal-form";
import { auth } from "@/auth";

export default async function page() {
  const session = await auth();

  return (
    <Card className=" p-10">
      <CardHeader>
        <CardTitle>
          {new Date().toLocaleString("en-GB", {
            dateStyle: "full",
          })}
        </CardTitle>
      </CardHeader>
      {session?.user?.id && <JournalForm userId={session?.user?.id} />}
    </Card>
  );
}
