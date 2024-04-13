import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateToLocal } from "@/lib/utils";

type PropsType = {
  entry: {
    date: Date;
  };
};

export default function CardHeaderDate({ entry }: PropsType) {
  return (
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
  );
}
