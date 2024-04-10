import prisma from "../db";

export async function fetchJournalEntriesForUser(userId: string) {
    // noStore()
    try {
        const entries = await prisma.journalEntry.findMany({where:{userId}});
        return entries;
    } catch (error) {
      console.error('Database Error:', error);
    }
}