import { fetchJournalEntriesForUser } from "@/lib/journal/data";
import { auth } from "@/auth";
import { fetchMeditationsForUser } from "@/lib/meditation/data";
import { fetchBooks, fetchReadingEntriesForUser } from "@/lib/reading/data";
import Calendar from "./calendar";
import { fetchHobbies, fetchHobbyEntriesForUser } from "@/lib/hobby/data";

export default async function DashboardCalendar() {
  const session = await auth();
  const userId = session?.user?.id;

  let journalEntries;
  let meditations;
  let readingEntries;
  let hobbyEntries;

  if (userId) {
    journalEntries = await fetchJournalEntriesForUser(userId);
    meditations = await fetchMeditationsForUser(userId);
    readingEntries = await fetchReadingEntriesForUser(userId);
    hobbyEntries = await fetchHobbyEntriesForUser(userId);

    let books = await fetchBooks();
    let hobbies = await fetchHobbies();

    if (
      journalEntries &&
      meditations &&
      readingEntries &&
      hobbyEntries &&
      books &&
      hobbies
    ) {
      return (
        <Calendar
          events={{ journalEntries, meditations, readingEntries, hobbyEntries }}
          books={books}
          hobbies={hobbies}
        />
      );
    }
  }
}
