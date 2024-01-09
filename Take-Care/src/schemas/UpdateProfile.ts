import { z } from "zod";

// validation schema for update profile

export const UpdateProfileSchema = z.object({
  email: z.string().email({ message: "please use a valid email" }).optional(),
  password: z
    .string()
    .min(6, { message: "password must be at least 6 characters " })
    .or(z.string().length(0))
    .optional(),
  photoFile: z
    .instanceof(FileList, { message: "format not supported" })
    .optional(),
});

// extract UpdateProfileSchema type from UpdateProfile
export type UpdateProfileSchemaType = z.infer<typeof UpdateProfileSchema>;
