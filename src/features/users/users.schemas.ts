import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const UpdateUserSchema = z.lazy(() =>
  z
    .object({
      email: z.string().email().optional(),
      password: z.string().optional(),
    })
    .refine((data) => data.email || data.password, {
      message: "At least one field must be provided",
      path: ["email", "password"],
    }),
);
