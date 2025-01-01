import { forgot_password } from "@/api/auth";
import { ForgotPasswordFormSchema } from "@/lib/types";
import { z } from "zod";

export async function handleForgotPassword(
  values: z.infer<typeof ForgotPasswordFormSchema>
) {
  const { email } = values;

  const response = await forgot_password(email);

  // 5. Redirect user
  return response;
}
