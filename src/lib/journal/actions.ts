"use server";

import prisma from "@/lib/db"
import { z } from "zod"
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

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
    reason: z.string().email(),
})

const CreateJournalEntry = FormSchema.omit({id: true, userId:true})

export async function createJournalEntry(prevState: FormState, formData:FormData) : Promise<FormState>{
    const validatedFields = CreateJournalEntry.safeParse({
        gratefulFor: formData.get("gratefulForname"),
        reason: formData.get("reason"),
    })

    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Invalid data. Failed to register."
        }
    }

    const {gratefulFor, reason} = validatedFields.data

    try {
        await prisma.journalEntry.create({data: {
            userId:"",
            gratefulFor,
            reason,
        }})
    }catch(error) {
        return {message: 'Database Error: Failed to register'}
    }

    redirect("/login")
}
