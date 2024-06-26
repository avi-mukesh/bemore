import prisma from "../db";
import { unstable_noStore as noStore } from 'next/cache';

const PAGE_SIZE=6;

export async function fetchReadingEntriesForUser(userId: string, currentPage?:number) {
  noStore()

  if(currentPage) {

    const skip = (currentPage - 1) * PAGE_SIZE
      try {
          const entries = await prisma.readingEntry.findMany({
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
      const entries = await prisma.readingEntry.findMany({
        where: { userId },
      });
      return entries;
    } catch (error) {
      console.error('Database Error:', error);
    }
  }
}


export async function fetchReadingEntriesForUserPages(userId: string) {
    noStore()
    try {
        const entries = await prisma.readingEntry.findMany({where:{userId}});
        return Math.ceil(entries.length / PAGE_SIZE);
    } catch (error) {
      console.error('Database Error:', error);
    }
}

export async function fetchTodaysReadingEntryForUser(userId: string) {
  try {
    const entriesToday = await prisma.readingEntry.findMany({where: {userId, date: new Date()}})
    if(entriesToday.length === 1 ){
      return entriesToday[0]
    }else if(entriesToday.length > 1){
      throw new Error("Multiple reading entries found for today.")
    } else {
      return null
    }
  }catch(error) {
    console.error('Database Error:', error);
  }
}

export async function fetchBooks() {
    try {
      const books = await prisma.book.findMany();
      return books;
    }catch(error) {
      console.error('Database Error:', error);
    }
}

export async function fetchBookById(id:string) {
  try {
    const book = await prisma.book.findFirst({where:{ id }});
    return book;
  }catch(error) {
    console.error('Database Error:', error);
  }
}