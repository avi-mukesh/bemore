import {
  fetchJournalEntriesForUser,
  fetchJournalEntriesForUserPages,
} from "@/lib/journal/data";
import JournalEntryCard from "./journal-entry-card";
import Pagination from "../shared/pagination";

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
    <>
      <div className="p-4 mx-auto grid gap-2 grid-cols-1 grid-flow-row md:grid-cols-3 md:grid-rows-2">
        {entries?.map((entry) => (
          <JournalEntryCard key={entry.id} entry={entry} />
        ))}
      </div>
      <div className="mt-5 flex w-full justify-center">
        {totalPages && <Pagination totalPages={totalPages} />}
      </div>
    </>
  );
}
