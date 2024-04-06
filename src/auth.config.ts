import type {NextAuthConfig} from "next-auth"
import {z} from "zod"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { fetchUser } from "./lib/user/data"
import {compare} from "bcryptjs"

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({auth, request:{nextUrl}}){
            const isLoggedIn = !!auth?.user
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")

            if(isOnDashboard){
                if(isLoggedIn) return true;
                return false;
            }else if(isLoggedIn) {
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
                    console.log(username, password)
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
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        })
    ]
} satisfies NextAuthConfig