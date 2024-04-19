import prisma from "../db";

const PAGE_SIZE=6;

export async function fetchMeditationsForUser(userId: string) {
    // noStore()
    try {
        const meditations = await prisma.meditation.findMany({
          where: { userId },
          orderBy : { "date": "asc" }
        });
        return meditations;
    } catch (error) {
      console.error('Database Error:', error);
    }
}
export async function fetchMeditationsForUserPages(userId: string) {
    // noStore()
    try {
        const entries = await prisma.journalEntry.findMany({where:{userId}});
        return Math.ceil(entries.length / PAGE_SIZE);
    } catch (error) {
      console.error('Database Error:', error);
    }
}

export async function fetchTodaysMeditationForUser(userId: string) {
  try {
    const meditationsToday = await prisma.meditation.findMany({where: {userId, date: new Date()}})
    if(meditationsToday.length === 1 ){
      return meditationsToday[0]
    }else if(meditationsToday.length > 1){
      throw new Error("Multiple meditations found for today.")
    } else {
      return null
    }
  }catch(error) {
    console.error('Database Error:', error);
  }
}