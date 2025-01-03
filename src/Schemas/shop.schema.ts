import { z } from "zod";

const shopCreateSchema = z.object({
  name: z.string({
    required_error: "Name is required!",
  }),
  contactNumber: z
    .string({
      required_error: "contactNumber is required!",
    })
    .optional(),
  address: z
    .string({
      required_error: "address is required!",
    })
    .optional(),
  shopType: z
    .string({
      required_error: "shopType is required!",
    })
    .optional(),
  description: z
    .string({
      required_error: "description is required!",
    })
    .optional(),
});
const shopUpdateSchema = z.object({
  name: z
    .string({
      required_error: "Name is required!",
    })
    .optional(),
  contactNumber: z
    .string({
      required_error: "contactNumber is required!",
    })
    .optional(),
  address: z
    .string({
      required_error: "address is required!",
    })
    .optional(),
  shopType: z
    .string({
      required_error: "shopType is required!",
    })
    .optional(),
  description: z
    .string({
      required_error: "description is required!",
    })
    .optional(),
  isDelete: z
    .boolean({
      required_error: "isDelete is required!",
    })
    .optional(),
    isBlocked: z
    .boolean({
      required_error: "isBlocked is required!",
    })
    .optional(),
});

export const shopSchema = {
  shopCreateSchema,
  shopUpdateSchema,
};
