import { z } from "zod";
import { Role } from "../types/GenericTypes.types";

const ContactSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(20, { message: "First name cannot be more than 20 characters" }),

  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(20, { message: "Last name cannot be more than 20 characters" }),

  photoURL: z.string().default("https://via.placeholder.com/100").optional(),

  email: z.string().email({ message: "please use a valid email" }),
});

export const NewTeacherProfileSchema = z.object({
  contact: ContactSchema,
  role: z.literal(Role.Admin),
});

// extract New Profile Schema type from NewTeacherProfileSchema
export type NewProfileSchemaType = z.infer<typeof NewTeacherProfileSchema>;
