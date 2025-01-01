import { verifySession } from "@/lib/Session"
import { cache } from "react"
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getUsers = cache(async () => {
  const session = await verifySession()
  
  if (!session) return null

  try {
    const res = await fetch(`${API_URL}/api/users/search`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${session.session}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
})