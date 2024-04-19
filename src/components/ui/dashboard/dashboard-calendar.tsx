import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { fetchJournalEntriesForUser } from "@/lib/journal/data";
import { auth } from "@/auth";
import { fetchMeditationsForUser } from "@/lib/meditation/data";
import { fetchReadingEntriesForUser } from "@/lib/reading/data";
import Calendar from "./calendar";

export default async function DashboardCalendar() {
  const session = await auth();
  const userId = session?.user?.id;

  let journalEntries;
  let meditations;
  let readingEntries;
  //   let hobbyEntries;

  if (userId) {
    journalEntries = await fetchJournalEntriesForUser(userId);
    meditations = await fetchMeditationsForUser(userId);
    readingEntries = await fetchReadingEntriesForUser(userId);

    if (journalEntries && meditations && readingEntries) {
      return (
        <Calendar events={{ journalEntries, meditations, readingEntries }} />
      );
    }
  }
}
