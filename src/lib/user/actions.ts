"use server";

import prisma from "@/lib/db"
import { z } from "zod"
import {hash} from "bcryptjs"
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i);

type FormState = {
    errors?: {
        username?:string[],
        email?: string[],
        password?: string[],
        confirmPassword?:string[]
    };
    message?:string | null
}

const FormSchema = z.object({
    id: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string().regex(passwordRegex, "Password must be at least 8 characters, have a number, a lower case letter, an uppercase letter and a special character."),
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



export async function createUser(prevState: FormState, formData:FormData) : Promise<FormState>{
    const validatedFields = CreateUser.safeParse({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword")
    })

    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Invalid data. Failed to register."
        }
    }

    const {username, email, password} = validatedFields.data

    const userWithSameUsername = await prisma.user.findFirst({where: {username}})
    const userWithSameEmail = await prisma.user.findFirst({where: {email}})

    if(userWithSameUsername){
        return {
            errors: {
                username: ["That username is taken"]
            }
        }
    }

    if(userWithSameEmail){
        return {
            errors: {
                email: ["That email is taken"]
            }
        }
    }

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

export async function logout() {
    try {
        await signOut()
    }catch(error){
        throw error
    }
}