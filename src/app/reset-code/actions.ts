"use server";

import { otp_validation } from "@/api/auth";
import { createSession } from "@/lib/Session";
import { OtpFormSchema } from "@/lib/types";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function handleOtpValidation(
  values: z.infer<typeof OtpFormSchema>
) {
  const { activation_token, activation_code } = values;

  const response = await otp_validation(activation_token, activation_code);

  if (!response.success) {
    return {
      message: response.message,
    };
  }


  await createSession(response.token);
  // 5. Redirect user
  redirect('/dashboard');
}
