import { JournalEntry } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateToLocal } from "@/lib/utils";

type PropsType = {
  entry: JournalEntry;
};

export default function JournalEntryCard({ entry }: PropsType) {
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
        I was grateful for{" "}
        <span className="underline underline-offset-4">
          {entry.gratefulFor}
        </span>{" "}
        because{" "}
        <span className="underline underline-offset-4">{entry.reason}</span>
      </CardContent>
    </Card>
  );
}
