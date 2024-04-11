import { auth } from "@/auth";
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchTodaysMeditationForUser } from "@/lib/meditation/data";
import MeditationForm from "@/components/ui/meditation/meditation-form";
import MeditationGraph from "@/components/ui/meditation/meditation-graph";

export default async function Page() {
  const session = await auth();

  if (session?.user?.id) {
    const meditatedToday = await fetchTodaysMeditationForUser(session.user.id);
    if (meditatedToday) {
      return <MeditationGraph userId={session.user.id} />;
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
          {session?.user?.id && <MeditationForm userId={session.user.id} />}
        </Card>
      );
    }
  }

  return <div>page</div>;
}
