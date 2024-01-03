import { z } from "zod";

// validation schema for login
export const LoginSchema = z.object({
  email: z.string().email({ message: "please use a valid email" }),
  password: z.string(),
});

// extract LoginSchema type from NewProfileSchema
export type LoginSchemaType = z.infer<typeof LoginSchema>;
