import React, { Suspense } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import JournalForm from "@/components/ui/journal/journal-form";
import { auth } from "@/auth";
import { fetchTodaysJournalEntryForUser } from "@/lib/journal/data";
import JournalEntries from "@/components/ui/journal/journal-entries";
import { EntriesSkeleton } from "@/components/ui/skeletons";

export default async function page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const session = await auth();
  const currentPage = Number(searchParams?.page) || 1;

  if (session?.user?.id) {
    const todaysJournalEntry = await fetchTodaysJournalEntryForUser(
      session.user.id
    );
    if (todaysJournalEntry) {
      return (
        <Suspense fallback={<EntriesSkeleton />}>
          <JournalEntries userId={session.user.id} currentPage={currentPage} />
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
          {session?.user?.id && <JournalForm userId={session.user.id} />}
        </Card>
      );
    }
  }
}
