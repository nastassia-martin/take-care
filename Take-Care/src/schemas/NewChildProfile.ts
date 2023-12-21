import { z } from "zod";

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
  dob: z.date(),
  department: z.string().min(1, { message: "please select a department" }),
});

// validation schema for Parent
const NewParentProfileSchema = genericName.extend({
  email: z.string().email({ message: "please use a valid email" }),
});

// combined Validation schemas to be used when creating a new Child profile
export const NewProfileSchema = z.object({
  child: NewChildProfileSchema,
  parent: NewParentProfileSchema,
});

// extract New Profile Schema type from NewProfileSchema
export type NewProfileSchemaType = z.infer<typeof NewProfileSchema>;
