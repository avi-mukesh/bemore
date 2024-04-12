import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmotionButton from "@/components/ui/dashboard/emotion-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchTodaysJournalEntryForUser } from "@/lib/journal/data";
import { fetchTodaysMeditationForUser } from "@/lib/meditation/data";
import Link from "next/link";
import React from "react";

export default async function page() {
  const session = await auth();

  let todaysJournalEntry;
  let todaysMeditation;
  if (session?.user?.id) {
    todaysJournalEntry = await fetchTodaysJournalEntryForUser(session.user.id);
    todaysMeditation = await fetchTodaysMeditationForUser(session.user.id);
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold">Hi, {session?.user?.username} 👋</h2>
      </div>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="space-y-8 ">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Today I meditated for...
                </CardTitle>
              </CardHeader>
              <CardContent>
                {todaysMeditation ? (
                  <div className="text-2xl font-bold">
                    {todaysMeditation.duration} minutes{" "}
                    <p className="text-muted-foreground text-xs">
                      +3 from yesterday
                    </p>
                  </div>
                ) : (
                  <div className="text-2xl font-bold text-destructive">
                    <Link href="/dashboard/meditation">Log meditation now</Link>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Today I am grateful for
                </CardTitle>
              </CardHeader>
              <CardContent>
                {todaysJournalEntry ? (
                  <div className="text-2xl font-bold">
                    my car
                    <p className="text-muted-foreground text-xs">
                      because I can get everywhere with it
                    </p>
                  </div>
                ) : (
                  <div className="text-2xl font-bold text-destructive">
                    <Link href="/dashboard/journal">Gratitude journal now</Link>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  How do I feel right now?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">
                  <div className="flex gap-2 justify-between">
                    <EmotionButton variant="angry" />
                    <EmotionButton variant="frown" />
                    <EmotionButton variant="meh" />
                    <EmotionButton variant="smile" />
                    <EmotionButton variant="laugh" />
                  </div>
                  <p className="text-muted-foreground text-xs mt-3 text-center">
                    Rate your mood here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}