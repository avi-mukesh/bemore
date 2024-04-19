import { auth } from "@/auth";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import HobbyEntries from "@/components/ui/hobby/hobby-entries";
import HobbyForm from "@/components/ui/hobby/hobby-form";
import { EntriesSkeleton } from "@/components/ui/skeletons";
import {
  fetchHobbies,
  fetchHobbyEntriesForUser,
  fetchTodaysHobbyEntryForUser,
} from "@/lib/hobby/data";
import React, { Suspense } from "react";

export default async function page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const session = await auth();
  const currentPage = Number(searchParams?.page) || 1;

  const hobbies = await fetchHobbies();

  if (session?.user?.id) {
    const hobbyEntries = await fetchHobbyEntriesForUser(
      session.user.id,
      currentPage
    );

    const todaysHobbyEntries = await fetchTodaysHobbyEntryForUser(
      session.user.id
    );
    if (todaysHobbyEntries) {
      return (
        <Suspense fallback={<EntriesSkeleton />}>
          <HobbyEntries userId={session.user.id} currentPage={currentPage} />
        </Suspense>
      );
    } else {
      return (
        <Card className="p-10">
          <CardHeader>
            <CardTitle>
              {new Date().toLocaleString("en-GB", {
                dateStyle: "full",
              })}
            </CardTitle>
          </CardHeader>
          {session?.user?.id && hobbies && (
            <HobbyForm userId={session.user.id} hobbies={hobbies} />
          )}
        </Card>
      );
    }
  }

  return <div>page</div>;
}
