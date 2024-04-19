import {
  fetchReadingEntriesForUser,
  fetchReadingEntriesForUserPages,
} from "@/lib/reading/data";
import ReadingEntryCard from "@/components/ui/reading/reading-entry-card";
import Pagination from "@/components/ui/shared/pagination";

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
        {totalPages && <Pagination totalPages={totalPages} />}
      </div>
    </>
  );
}
