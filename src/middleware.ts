import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth

// specifying matcher property for auth middleweare to run on specific paths
// pro of middlware for this = protected routes won't even start rendering until the middlware verifies the authentication
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}