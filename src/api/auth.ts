import { deleteSession } from "@/lib/Session";
import { redirect } from "next/navigation";

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

export async function logout() {
  deleteSession();
  redirect("/login");
}
