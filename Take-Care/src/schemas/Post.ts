import { z } from "zod";

// validation schema for update profile

export const CreateOrEditPostSchema = z.object({
  title: z.string().or(z.string().length(0)),
  content: z.string().min(1, { message: "Please write something" }),
  photo: z.instanceof(FileList, { message: "format not supported" }).optional(),
  typeOfPost: z.union([z.literal("menu"), z.literal("social")]),
});

// extract UpdateProfileSchema type from UpdateProfile
export type CreateOrEditPostType = z.infer<typeof CreateOrEditPostSchema>;
