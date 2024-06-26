import prisma from "../db";
import { unstable_noStore as noStore } from 'next/cache';

const PAGE_SIZE=6;

export async function fetchJournalEntriesForUser(userId: string, currentPage?:number) {
  noStore()
  if(currentPage) {

    const skip = (currentPage - 1) * PAGE_SIZE
      try {
          const entries = await prisma.journalEntry.findMany({
            where: { userId },
            skip,
            take: PAGE_SIZE,
            orderBy: { "date" : "desc" }
          });
          return entries;
      } catch (error) {
        console.error('Database Error:', error);
      }
  }else {
    try {
      const entries = await prisma.journalEntry.findMany({
        where: {userId}
      })
      return entries
    }catch (error) {
      console.error('Database Error:', error);
    }
  }

}
export async function fetchJournalEntriesForUserPages(userId: string) {
    noStore()
    try {
        const entries = await prisma.journalEntry.findMany({where:{userId}});
        return Math.ceil(entries.length / PAGE_SIZE);
    } catch (error) {
      console.error('Database Error:', error);
    }
}

export async function fetchTodaysJournalEntryForUser(userId: string) {
  try {
    const entriesToday = await prisma.journalEntry.findMany({where: {userId, date: new Date()}})
    if(entriesToday.length === 1 ){
      return entriesToday[0]
    }else if(entriesToday.length > 1){
      throw new Error("Multiple journal entries found for today.")
    } else {
      return null
    }
  }catch(error) {
    console.error('Database Error:', error);
  }
}