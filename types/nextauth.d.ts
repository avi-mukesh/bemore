import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    // Add your additional properties here:
    username:string
  }
  interface JWT {
    username: string
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    // Add your additional properties here:
    username: string;
  }
}