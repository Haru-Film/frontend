import { z } from "zod";

export const GetTokenResponseSchema = z.object({
  accessToken: z.string(),
});
