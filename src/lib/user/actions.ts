"use server";

import prisma from "@/lib/db"
import { z } from "zod"
import {hash} from "bcryptjs"
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const FormSchema = z.object({
    id: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirmPassword:z.string()
})

const CreateUser = FormSchema.omit({id: true}).refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  )

type State = {
    errors?: {
        username?:string[],
        email?: string[],
        password?: string[],
        confirmPassword?:string[]
    };
    message?:string | null
}

export async function createUser(prevState: State, formData:FormData) : Promise<State>{
    const validatedFields = CreateUser.safeParse({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword")
    })

    if(!validatedFields.success){
        console.log("not valid", validatedFields.error.flatten().fieldErrors)
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Invalid data. Failed to register."
        }
    }

    const {username, email, password} = validatedFields.data
    const hashedPassword = await hash(password, 10)


    try {
        await prisma.user.create({data:{username, email, password:hashedPassword}})
    }catch(error) {
        return {message: 'Database Error: Failed to register'}
    }

    redirect("/login")
}

export async function authenticate (prevState: string | undefined, formData: FormData){
    console.log("authenticating...")
    try {
        await signIn("credentials", formData)
    }catch(error){
        if(error instanceof AuthError){
            switch(error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials"
                default:
                    return "Something went wrong"
            }
        }
        throw error
    }
}