"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import listPlugin from "@fullcalendar/list"; // a plugin!
import { Book, JournalEntry, Meditation, ReadingEntry } from "@prisma/client";
import { useEffect } from "react";
import { LucideIcon } from "lucide-react";
import { Icons } from "@/components/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

type PropsType = {
  events: {
    journalEntries: JournalEntry[];
    meditations: Meditation[];
    readingEntries: ReadingEntry[];
  };
  books: Book[];
};

export default function Calendar({ events, books }: PropsType) {
  useEffect(() => {
    console.log(events);
  }, [events]);

  const journalEvents = events.journalEntries?.map((entry) => ({
    title: "Journaled",
    date: entry.date,
    color: "#2eabff",
    allDay: true,
    icon: "notebook",
    details: `Was grateful for ${entry.gratefulFor} because ${entry.reason}.`,
  }));

  const meditationEvents = events.meditations?.map((entry) => ({
    title: "Meditated",
    date: entry.date,
    color: "#3de060",
    allDay: true,
    icon: "leaf",
    details: `Meditated for ${entry.duration} minutes.`,
  }));
  const readingEvents = events.readingEntries?.map((entry) => {
    // not the best solution but will do for now
    const bookTitle = books.filter((b) => b.id === entry.bookId)[0].title;

    return {
      title: "Read",
      date: entry.date,
      color: "#ff312e",
      allDay: true,
      icon: "book",
      details: `Read ${entry.numPages} pages of ${bookTitle}`,
    };
  });

  const calendarEvents = [
    ...journalEvents,
    ...meditationEvents,
    ...readingEvents,
  ];

  return (
    <FullCalendar
      // viewClassNames={["z-0"]}
      eventClassNames={["z-0"]}
      themeSystem="darkly"
      plugins={[dayGridPlugin]}
      fixedWeekCount={false}
      showNonCurrentDates={false}
      initialView="dayGridMonth"
      events={calendarEvents}
      eventContent={renderEventContent}
    />
  );
}

function renderEventContent(eventInfo: any) {
  console.log(eventInfo);

  let Icon: LucideIcon;
  let iconName = eventInfo.event.extendedProps.icon as string;

  let eventDetails = eventInfo.event.extendedProps.details as string;

  switch (iconName) {
    case "notebook":
      Icon = Icons.notebook;
      break;
    case "leaf":
      Icon = Icons.leaf;
      break;
    case "book":
      Icon = Icons.book;
      break;
    default:
      Icon = Icons.smile;
  }

  return (
    // <>
    //   <p className="flex justify-center">
    //     <Icon />
    //   </p>
    // </>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <p>
            <Icon className="mx-auto my-1" />
          </p>
        </TooltipTrigger>
        <TooltipContent className="z-10">{eventDetails}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
