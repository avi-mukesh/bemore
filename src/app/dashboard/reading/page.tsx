import ReadingEntries from "@/components/ui/reading/reading-entries";
import React, { Suspense } from "react";
import { fetchBooks, fetchTodaysReadingEntryForUser } from "@/lib/reading/data";
import { auth } from "@/auth";
import { JournalEntriesSkeleton } from "@/components/ui/skeletons";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import ReadingForm from "@/components/ui/reading/reading-form";

export default async function page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const session = await auth();
  const currentPage = Number(searchParams?.page) || 1;

  const books = await fetchBooks();

  if (session?.user?.id) {
    const todaysReadingEntry = await fetchTodaysReadingEntryForUser(
      session.user.id
    );
    if (todaysReadingEntry) {
      return (
        <Suspense fallback={<JournalEntriesSkeleton />}>
          <ReadingEntries userId={session.user.id} currentPage={currentPage} />
        </Suspense>
      );
    } else {
      return (
        <Card className=" p-10">
          <CardHeader>
            <CardTitle>
              {new Date().toLocaleString("en-GB", {
                dateStyle: "full",
              })}
            </CardTitle>
          </CardHeader>
          {session?.user?.id && books && (
            <ReadingForm userId={session.user.id} existingBooks={books} />
          )}
        </Card>
      );
    }
  }
}
