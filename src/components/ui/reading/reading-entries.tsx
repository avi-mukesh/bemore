import {
  fetchReadingEntriesForUser,
  fetchReadingEntriesForUserPages,
} from "@/lib/reading/data";
import ReadingEntryCard from "./reading-entry-card";
import ReadingPagination from "./pagination";
import JournalPagination from "../journal/pagination";

type PropsType = {
  userId: string;
  currentPage: number;
};

export default async function ReadingEntries({
  userId,
  currentPage,
}: PropsType) {
  const entries = await fetchReadingEntriesForUser(userId, currentPage);
  const totalPages = await fetchReadingEntriesForUserPages(userId);

  return (
    <>
      <div className="p-4 mx-auto grid gap-2 grid-cols-1 grid-flow-row md:grid-cols-3 md:grid-rows-2">
        {entries?.map((entry) => (
          <ReadingEntryCard key={entry.id} entry={entry} />
        ))}
      </div>
      <div className="mt-5 flex w-full justify-center">
        {totalPages && <JournalPagination totalPages={totalPages} />}
      </div>
    </>
  );
}
