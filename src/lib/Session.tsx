"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export const verifySession = cache(async () => {
  const session = (await cookies()).get('session')?.value
 
  if (!session) {
    redirect('/login')
  }
 
  return { isAuth: true, session }
})
