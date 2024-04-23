import prisma from "../db";
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchUser(username: string) {
    noStore()
    try {
        const user = await prisma.user.findFirst({where:{username}});
        if(user) {
          return user
        };
        return null;
    } catch (error) {
      console.error('Database Error:', error);
      // throw new Error(`No user with username ${username} found`);
    }
}