import { z } from "zod";

// validation schema
export const NewChildProfileSchema = z.object({
  child_first_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(20, { message: "First name cannot be more than 20 characters" }),

  child_last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(20, { message: "Last name cannot be more than 20 characters" }),

  child_dob: z.string().datetime(),

  department: z.string().min(1, { message: "please select a department" }),
});

// extract New child Profile Schema type from schema
export type NewChildProfileSchemaType = z.infer<typeof NewChildProfileSchema>;
