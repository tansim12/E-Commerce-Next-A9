import { z } from "zod";

export const CreateProductReviewSchema = z.object({
  userMessage: z.string({ required_error: "required" }),
  rating: z.string({ required_error: "required" }),
});
