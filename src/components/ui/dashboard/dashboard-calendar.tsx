import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { fetchJournalEntriesForUser } from "@/lib/journal/data";
import { auth } from "@/auth";
import { fetchMeditationsForUser } from "@/lib/meditation/data";
import {
  fetchBookById,
  fetchBooks,
  fetchReadingEntriesForUser,
} from "@/lib/reading/data";
import Calendar from "./calendar";
import { ReadingEntry } from "@prisma/client";

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

    let books = await fetchBooks();

    if (journalEntries && meditations && readingEntries && books) {
      return (
        <Calendar
          events={{ journalEntries, meditations, readingEntries }}
          books={books}
        />
      );
    }
  }
}
