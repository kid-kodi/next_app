import { login } from "@/api/auth";
import { createSession, deleteSession } from "@/lib/Session";
import { LoginFormSchema } from "@/lib/types";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function handleLogin(
  values: z.infer<typeof LoginFormSchema>
) {
  const { email, password } = values;

  const response = await login(email, password);

  if (!response.success) {
    return {
      message: response.message,
    };
  }


  await createSession(response.token);
  // 5. Redirect user
  return response;
}
