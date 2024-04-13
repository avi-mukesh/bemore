import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { createGoogleUserIfNotExists } from "./lib/user/actions";

export const {handlers:{GET, POST}, auth, signIn, signOut} = NextAuth({
    ...authConfig,
    callbacks: {
        ...authConfig.callbacks,
        async signIn({user, account, profile}){
            const {email} = user

            if(account?.provider==="google"){
                if(email) {
                    await createGoogleUserIfNotExists(email);
                }
            }
            return true
        },
    }
})