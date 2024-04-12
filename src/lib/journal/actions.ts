"use server";

import prisma from "@/lib/db"
import { z } from "zod"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type FormState = {
    errors?: {
        gratefulFor?:string[],
        reason?: string[],
    };
    message?:string | null
}

const FormSchema = z.object({
    id: z.string(),
    userId: z.string(),
    gratefulFor: z.string(),
    reason: z.string(),
})

const CreateJournalEntry = FormSchema.omit({id: true})

export async function createJournalEntry(prevState: FormState, formData:FormData) : Promise<FormState>{

    const validatedFields = CreateJournalEntry.safeParse({
        gratefulFor: formData.get("gratefulFor"),
        reason: formData.get("reason"),
        userId: formData.get("userId")
    })

    if(!validatedFields.success){
        console.log(validatedFields.error.flatten())
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Invalid data. Failed to register."
        }
    }

    const {userId, gratefulFor, reason} = validatedFields.data

    try {
        await prisma.journalEntry.create({data: {
            userId,
            gratefulFor,
            reason,
        }})
    }catch(error) {
        return {message: 'Database Error: Failed to register'}
    }

    revalidatePath("/dashboard/journal")
    redirect("/dashboard/journal")
}
