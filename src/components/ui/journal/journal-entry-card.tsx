import { JournalEntry } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateToLocal } from "@/lib/utils";
import CardHeaderDate from "../shared/card-header-date";

type PropsType = {
  entry: JournalEntry;
};

export default function JournalEntryCard({ entry }: PropsType) {
  return (
    <Card>
      <CardHeaderDate entry={entry} />
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
