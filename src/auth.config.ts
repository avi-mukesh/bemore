import type {NextAuthConfig} from "next-auth"
import {z} from "zod"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { fetchUser } from "./lib/user/data"
import {compare} from "bcryptjs"
import { createGoogleUserIfNotExists } from "./lib/user/actions"


export const authConfig = {
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge:3600
    },
    callbacks: {
        async signIn({user, account, profile}){
            const {email} = user

        //     if(account?.provider==="google"){
        //         if(email) {
        //             console.log(email)
        //             await createGoogleUserIfNotExists(email);
        // //             return true;
        //         }
        //     }
        //     return false;
            return true
        },
        async session({session, token}){
            session.user.id = token.id as string
            session.user.username = token.username as string
            return session
        },
        async jwt({ token, user }) {
            // user is the object from the DB call
            return {...token, ...user}
        },
        authorized({auth, request:{nextUrl}}){
            const isLoggedIn = !!auth?.user
            const isOnJournal = nextUrl.pathname.startsWith("/journal")

            if(isOnJournal){
                if(isLoggedIn) return true;
                return false;
            }else if(isLoggedIn) {
                return Response.redirect(new URL("/journal", nextUrl));
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
                console.log("authorizing with", credentials)
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