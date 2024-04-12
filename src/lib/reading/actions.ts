"use server";

import prisma from "@/lib/db"
import { z } from "zod"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type ReadingFormState = {
    errors?: {
        bookId?:string[],
        numPages?:string[],
    };
    message?:string | null
}

const ReadingFormSchema = z.object({
    id: z.string(),
    userId: z.string(),
    bookId: z.string(),
    numPages: z.coerce.number(),
})

const CreateReadingEntry = ReadingFormSchema.omit({id: true})

export async function createReadingEntry(prevState: ReadingFormState, formData:FormData) : Promise<ReadingFormState>{
    console.log("creating reading entry")
    const validatedFields = CreateReadingEntry.safeParse({
        bookId: formData.get("bookId"),
        numPages: formData.get("numPages"),
        userId: formData.get("userId")
    })

    if(!validatedFields.success){
        console.log(validatedFields.error.flatten())
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Invalid data. Failed to register."
        }
    }

    const {userId, bookId, numPages} = validatedFields.data

    try {
        await prisma.readingEntry.create({data: {
            userId,
            bookId,
            numPages,
        }})
    }catch(error) {
        return {message: 'Database Error: Failed to create reading entry.'}
    }

    revalidatePath("/dashboard/reading")
    redirect("/dashboard/reading")
}



type BookFormState = {
    errors?: {
        title?:string[],
    };
    message?:string | null
}

const BookFormSchema = z.object({
    id: z.string(),
    title: z.string()
})

const CreateBook = BookFormSchema.omit({id: true})

export async function createBook(prevState: BookFormState, formData: FormData) : Promise<BookFormState>{
    console.log("creating book")

    const validatedFields = CreateBook.safeParse({
        title: formData.get("title")
    })

    if(!validatedFields.success){
        console.log(validatedFields.error.flatten())
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Invalid data. Failed to create book."
        }
    }

    const {title} = validatedFields.data

    try {
        await prisma.book.create({data: { title }})
    }catch(error) {
        return {message: 'Database Error: Failed to create book.'}
    }

    revalidatePath("/dashboard/reading")
    redirect("/dashboard/reading")
}