"use server";

import prisma from "../db"

export async function createMoodEntry(moodId: "laugh" | "smile" | "meh" | "frown" | "angry", userId:string){
    console.log("creating mood entry")
    try {
        await prisma.moodEntry.create({data: {
            userId,
            moodId,
            time: new Date()
        }})
    }catch(error) {
        console.log(error)
        return {message: 'Database Error: Failed to create journal entry'}
    }
}