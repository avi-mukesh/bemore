import prisma from "../db";
import { unstable_noStore as noStore } from 'next/cache';

const PAGE_SIZE=6;

export async function fetchHobbyEntriesForUser(userId: string, currentPage?:number) {
  noStore()

  if(currentPage) {

    const skip = (currentPage - 1) * PAGE_SIZE
    try {
        const entries = await prisma.hobbyEntry.findMany({
          where: { userId },
          skip,
          take: PAGE_SIZE,
          orderBy: { "date" : "desc" }
        });
        return entries;
    } catch (error) {
      console.error('Database Error:', error);
    }
  }else{
    try {
      const entries = await prisma.hobbyEntry.findMany({
        where: { userId },
      });
      return entries;
    } catch (error) {
      console.error('Database Error:', error);
    }
    
  }
}
export async function fetchHobbyEntriesForUserPages(userId: string) {
    noStore()
    try {
        const entries = await prisma.hobbyEntry.findMany({where:{userId}});
        return Math.ceil(entries.length / PAGE_SIZE);
    } catch (error) {
      console.error('Database Error:', error);
    }
}

export async function fetchTodaysHobbyEntryForUser(userId: string) {
  try {
    const entriesToday = await prisma.hobbyEntry.findMany({where: {userId, date: new Date()}})
    if(entriesToday.length > 0 ){
      return entriesToday[0]
    }
    return null
  }catch(error) {
    console.error('Database Error:', error);
  }
}

export async function fetchHobbies() {
  try {
    const hobbies = await prisma.hobby.findMany()
    return hobbies
  } catch (error) {
    console.error("Database Error:", error)
  }
}

export async function fetchHobbyById(id: string){
  try {
    const hobby = await prisma.hobby.findFirst({where:{id}});
    return hobby;
  }catch(error) {
    console.error("Database Error:", error)
  }
}