import { ReadingEntry } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { formatDateToLocal } from "@/lib/utils";
import { fetchBookById } from "@/lib/reading/data";

type PropsType = {
  entry: ReadingEntry;
};

export default async function ReadingEntryCard({ entry }: PropsType) {
  const book = await fetchBookById(entry.bookId);
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {entry.date.toISOString().split("T")[0] ===
          new Date().toISOString().split("T")[0] ? (
            <Badge variant="default">Today</Badge>
          ) : (
            <Badge variant="secondary">
              {formatDateToLocal(entry.date, "en-GB")}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        I read{" "}
        <span className="underline underline-offset-4">{entry.numPages}</span>{" "}
        page of{" "}
        <span className="underline underline-offset-4">{book?.title}</span>
      </CardContent>
    </Card>
  );
}
