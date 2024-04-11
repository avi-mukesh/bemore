import { formatDateToLocal } from "@/lib/utils";
import { JournalEntry } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<JournalEntry>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return row.getValue("date");
    },
  },
  {
    accessorKey: "gratefulFor",
    header: "Grateful for",
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
];
