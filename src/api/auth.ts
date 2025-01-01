import { deleteSession, verifySession } from "@/lib/Session";
import { redirect } from "next/navigation";
import { cache } from "react";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.log(data);
    throw Error("Failed to login");
  }
  return data;
}

export async function signup(name: string, email: string, password: string) {
  try {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function otp_validation(
  activation_token: string,
  activation_code: string
) {
  try {
    const res = await fetch(`${API_URL}/api/auth/activation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ activation_token, activation_code }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function forgot_password(
  email: string
) {
  try {
    const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function reset_code(
  activation_code: string
) {
  try {
    const res = await fetch(`${API_URL}/api/auth/verify-account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ activation_code }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function reset_password(
  userId: string,
  password: string
) {
  try {
    const res = await fetch(`${API_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, password }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const getUser = cache(async () => {
  const session = await verifySession()
  
  if (!session) return null

  try {
    const res = await fetch(`${API_URL}/api/auth/me`, {
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

export async function logout() {
  deleteSession();
  redirect("/login");
}
