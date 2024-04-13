import { ReadingEntry } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { formatDateToLocal } from "@/lib/utils";
import { fetchBookById } from "@/lib/reading/data";
import CardHeaderDate from "@/components/ui/shared/card-header-date";

type PropsType = {
  entry: ReadingEntry;
};

export default async function ReadingEntryCard({ entry }: PropsType) {
  const book = await fetchBookById(entry.bookId);
  return (
    <Card>
      <CardHeaderDate entry={entry} />
      <CardContent>
        I read{" "}
        <span className="underline underline-offset-4">{entry.numPages}</span>{" "}
        page of{" "}
        <span className="underline underline-offset-4">{book?.title}</span>
      </CardContent>
    </Card>
  );
}
