import { auth } from "@/auth";
import Chat from "@/components/ui/assistant/chat";
import { fetchTodaysHobbyEntryForUser } from "@/lib/hobby/data";
import { fetchTodaysJournalEntryForUser } from "@/lib/journal/data";
import { fetchTodaysMeditationForUser } from "@/lib/meditation/data";
import { fetchTodaysReadingEntryForUser } from "@/lib/reading/data";

export default async function page() {
  const session = await auth();

  let journaledToday = false;
  let meditatedToday = false;
  let hobbyToday = false;
  let readToday = false;

  if (session?.user?.id) {
    const id = session.user.id;
    const todaysJournalEntry = await fetchTodaysJournalEntryForUser(id);
    const todaysMeditation = await fetchTodaysMeditationForUser(id);
    const todaysHobbyEntry = await fetchTodaysHobbyEntryForUser(id);
    const todaysReadingEntry = await fetchTodaysReadingEntryForUser(id);

    if (todaysJournalEntry) journaledToday = true;
    if (todaysMeditation) meditatedToday = true;
    if (todaysHobbyEntry) hobbyToday = true;
    if (todaysReadingEntry) readToday = true;
  }

  return (
    <div className="flex flex-col items-center gap-2 h-full">
      {/* <p>Assistant has been disabled temporarily.</p> */}
      <Chat
        username={session?.user?.username}
        avatar={session?.user?.image}
        journaledToday={journaledToday}
        meditatedToday={meditatedToday}
        hobbyToday={hobbyToday}
        readToday={readToday}
      />
    </div>
  );
}
