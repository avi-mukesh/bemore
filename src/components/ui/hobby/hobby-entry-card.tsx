import { HobbyEntry } from "@prisma/client";
import React from "react";
import { Card, CardContent } from "../card";
import CardHeaderDate from "../shared/card-header-date";
import { fetchHobbyById } from "@/lib/hobby/data";

type PropsType = {
  entry: HobbyEntry;
};

export default async function HobbyEntryCard({ entry }: PropsType) {
  const hobby = await fetchHobbyById(entry.hobbyId);
  return (
    <Card>
      <CardHeaderDate entry={entry} />
      <CardContent>
        I did{" "}
        <span className="underline underline-offset-4">{hobby?.name}</span>{" "}
      </CardContent>
    </Card>
  );
}
