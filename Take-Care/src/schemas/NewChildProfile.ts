import { z } from "zod";
import { Role } from "../types/GenericTypes.types";

// generic validation schema
const genericName = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(20, { message: "First name cannot be more than 20 characters" }),

  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(20, { message: "Last name cannot be more than 20 characters" }),
});

// validation schema for Child
export const NewChildProfileSchema = genericName.extend({
  date_of_birth: z.date(),
  //department: z.string().min(1, { message: "please select a department" }),
});

// validation schema for Parent
const NewParentProfileSchema = genericName
  .extend({
    email: z.string().email({ message: "please use a valid email" }),
    //role: z.literal(Role.User),
    password: z
      .string()
      .min(6, { message: "password must be at least 6 characters" }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

// combined Validation schemas to be used when creating a new Child profile
export const NewProfileSchema = z.object({
  child: NewChildProfileSchema,
  parent: NewParentProfileSchema,
});

// extract New Profile Schema type from NewProfileSchema
export type NewProfileSchemaType = z.infer<typeof NewProfileSchema>;
