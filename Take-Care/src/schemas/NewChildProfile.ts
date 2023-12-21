import { z } from "zod";

// validation schema generic will reuse for parents
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

// extract New child Profile Schema type from schema
export type NewChildProfileSchemaType = z.infer<typeof NewChildProfileSchema>;
