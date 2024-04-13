import type {NextAuthConfig} from "next-auth"
import {z} from "zod"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { fetchUser } from "@/lib/user/data"
import {compare} from "bcryptjs"
import { PrismaClient } from "@prisma/client"
import prisma from "./lib/db"
// import { createGoogleUserIfNotExists } from "@/lib/user/actions"

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge:3600
    },
    callbacks: {
        // async signIn({user, account, profile}){
        //     const {email} = user

        //     if(account?.provider==="google"){
        //         if(email) {
        //             console.log(email)
        //             await createGoogleUserIfNotExists(email);
        //         }
        //     }
        //     return true
        // },
        async session({session, token}){
            // console.log("session in session", session)
            // console.log("token in session", session)

            session.user.id = token.id as string
            session.user.username = token.username as string

            if(!session.user.username){
                session.user.username = session.user.email.split("@")[0]
            }

            return session
        },
        async jwt({ token, user }) {
            // user is the object from the DB call
            // console.log("token in jwt", token)
            // console.log("user in jwt", user)
            return {...token, ...user}
        },
        authorized({auth, request:{nextUrl}}){
            const isLoggedIn = !!auth?.user
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
            const isOnAbout = nextUrl.pathname.startsWith("/about")

            if(isOnAbout){
                return true;
            }

            if(isOnDashboard){
                if(isLoggedIn) return true;
                return false;
            } else if(isLoggedIn) {
                return Response.redirect(new URL("/dashboard", nextUrl));
            }
            return true
        },
    },
    providers: [
        CredentialsProvider({
            name:"Credentials",
            credentials: {
                username: {label: "Username", type:"text"},
                password: {label:"Password", type:"password"}
            },
            async authorize(credentials) {
                const parsedCredentials = z.object({username:z.string(), password: z.string()}).safeParse(credentials)
                if(parsedCredentials.success) {
                    const {username, password} = parsedCredentials.data
                    const user = await fetchUser(username)
                    
                    if(user){
                        const passwordsMatch = await compare(password, user.password);
                        if(passwordsMatch) return user
                    }
                }
                return null
            }
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    
} satisfies NextAuthConfig