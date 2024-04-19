"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { JournalEntry, Meditation, ReadingEntry } from "@prisma/client";
import { useEffect } from "react";

type PropsType = {
  events: {
    journalEntries: JournalEntry[];
    meditations: Meditation[];
    readingEntries: ReadingEntry[];
  };
};

export default function Calendar({ events }: PropsType) {
  useEffect(() => {
    console.log(events);
  }, [events]);

  const journalEvents = events.journalEntries?.map((entry) => ({
    title: "Jou",
    date: entry.date,
  }));

  const meditationEvents = events.meditations?.map((entry) => ({
    title: "Med",
    date: entry.date,
  }));
  const readingEvents = events.readingEntries?.map((entry) => ({
    title: "Rea",
    date: entry.date,
  }));

  const calendarEvents = [
    ...journalEvents,
    ...meditationEvents,
    ...readingEvents,
  ];

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="listWeek"
      events={calendarEvents}
    />
  );
}
