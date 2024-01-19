import { z } from "zod";

// validation schema for update profile
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const UpdateAddressSchema = z.object({
  address: z.string().optional(),
  phoneNumber: z.string().regex(phoneRegex, "Invalid Number!").optional(),
});

// extract UpdateProfileSchema type from UpdateProfile
export type UpdateAddressSchemaType = z.infer<typeof UpdateAddressSchema>;
