"use server";

import prisma from "@/lib/db"
import { z } from "zod"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type FormState = {
    errors?: {
        duration?:string[],
    };
    message?:string | null
}

const FormSchema = z.object({
    id: z.string(),
    userId: z.string(),
    duration: z.coerce.number(),
})

const CreateMeditation = FormSchema.omit({id: true})

export async function createMeditation(prevState: FormState, formData:FormData) : Promise<FormState>{

    const validatedFields = CreateMeditation.safeParse({
        duration: formData.get("duration"),
        userId: formData.get("userId")
    })

    if(!validatedFields.success){
        console.log(validatedFields.error.flatten())
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Invalid data. Failed to create meditation."
        }
    }

    const {userId, duration} = validatedFields.data

    try {
        await prisma.meditation.create({data: {
            userId,
            duration,
        }})
    }catch(error) {
        return {message: 'Database Error: Failed to register'}
    }

    revalidatePath("/meditation")
    redirect("/meditation")
}
