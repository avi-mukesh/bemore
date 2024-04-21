"use server";

import prisma from "@/lib/db"
import { z } from "zod"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type FormState = {
    errors?: {
        hobbyId?:string[],
    };
    message?:string | null
}

const FormSchema = z.object({
    id: z.string(),
    userId: z.string(),
    hobbyId: z.string(),
})

const CreateHobbyEntry = FormSchema.omit({id: true})

export async function createHobbyEntry(prevState: FormState, formData:FormData) : Promise<FormState>{
    const validatedFields = CreateHobbyEntry.safeParse({
        hobbyId: formData.get("hobbyId"),
        userId: formData.get("userId")
    });


    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Invalid data. Failed to register."
        }
    }

    const {userId,hobbyId} = validatedFields.data

    try {
        await prisma.hobbyEntry.create({data: {
            userId,
            hobbyId,
        }})
    }catch(error) {
        return {message: 'Database Error: Failed to create hobby entry'}
    }

    revalidatePath("/dashboard/hobbies")
    redirect("/dashboard/hobbies")
}

type HobbyFormState = {
    errors?: {
        name?:string[],
    };
    message?:string | null
}

const HobbyFormSchema = z.object({
    id: z.string(),
    name: z.string()
})

const CreateHobby = HobbyFormSchema.omit({id: true})

export async function createHobby(prevState: HobbyFormState, formData: FormData) : Promise<HobbyFormState>{

    const validatedFields = CreateHobby.safeParse({
        name: formData.get("name")
    })

    if(!validatedFields.success){

        console.log(validatedFields.error.flatten().fieldErrors)

        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Invalid data. Failed to create hobby."
        }
    }

    const {name} = validatedFields.data

    try {
        await prisma.hobby.create({data: { name }})
    }catch(error) {
        return {message: 'Database Error: Failed to create hobby.'}
    }

    revalidatePath("/dashboard/hobbies")
    redirect("/dashboard/hobbies")
}