import { signup } from "@/api/auth";
import { deleteSession } from "@/lib/Session";
import { FormState, SignupFormSchema } from "@/lib/types";
import { encrypt } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function handleSignup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Call the provider or db to create a user...
  // 2. Prepare data for insertion into database
  const { name, email, password } = validatedFields.data;

  const response = await signup(name, email, password);

  if (!response.success) {
    return {
      message: response.message,
    };
  }

  redirect(
    `/otp?activation_token=${response.activationToken}&e0=${encrypt(
      "f",
      email
    )}&n1=${encrypt("f", name)}&p2=${encrypt("f", password)}`
  );
}

export async function logout() {
  deleteSession();
  redirect("/login");
}
