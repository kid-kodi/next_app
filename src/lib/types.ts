import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z.string().min(1, { message: "Name must not be empty." }).trim(),
  email: z
    .string()
    .min(1, { message: "Email adresse must not be empty." })
    .email({ message: "Please enter a valid email." })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const OtpFormSchema = z.object({
  activation_token: z
    .string()
    .trim(),
  activation_code: z
    .string()
    .trim(),
});

export type OtpFormState =
  | {
      errors?: {
        activation_token?: string[];
        activation_code?: string[];
      };
      message?: string;
    }
  | undefined;
