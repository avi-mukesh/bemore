import {
  fetchHobbyEntriesForUser,
  fetchHobbyEntriesForUserPages,
} from "@/lib/hobby/data";
import React from "react";
import HobbyEntryCard from "@/components/ui/hobby/hobby-entry-card";
import Pagination from "@/components/ui/shared/pagination";
import HobbyForm from "./hobby-form";

type PropsType = {
  userId: string;
  currentPage: number;
};

export default async function HobbyEntries({ userId, currentPage }: PropsType) {
  const entries = await fetchHobbyEntriesForUser(userId, currentPage);
  const totalPages = await fetchHobbyEntriesForUserPages(userId);

  return (
    <>
      <div className="p-4 mx-auto grid gap-2 grid-cols-1 grid-flow-row md:grid-cols-3 md:grid-rows-2">
        {entries?.map((entry) => (
          <HobbyEntryCard key={entry.id} entry={entry} />
        ))}
      </div>
      <div className="mt-5 flex w-full justify-center">
        {totalPages && <Pagination totalPages={totalPages} />}
      </div>
    </>
  );
}
