import {
  fetchJournalEntriesForUser,
  fetchJournalEntriesForUserPages,
} from "@/lib/journal/data";
import { JournalEntry } from "@prisma/client";
import React from "react";
import JournalEntryCard from "./journal-entry-card";
import { DataTable } from "./journal-entries-data-table";
import { columns } from "./journal-entry-columns";
import Pagination from "./pagination";
import JournalPagination from "./pagination";

import { useMediaQuery } from "usehooks-ts";

type PropsType = {
  userId: string;
  currentPage: number;
};

export default async function JournalEntries({
  userId,
  currentPage,
}: PropsType) {
  const entries = await fetchJournalEntriesForUser(userId, currentPage);
  const totalPages = await fetchJournalEntriesForUserPages(userId);

  return (
    <div>
      <div className="p-4 mx-auto grid gap-2 grid-cols-2 grid-rows-2">
        {entries?.map((entry) => (
          <JournalEntryCard key={entry.id} entry={entry} />
        ))}
      </div>
      <div className="mt-5 flex w-full justify-center">
        {totalPages && <JournalPagination totalPages={totalPages} />}
      </div>
    </div>
  );
}
