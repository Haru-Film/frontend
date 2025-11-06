import { z } from "zod";

export const TokenSchema = z.object({
  accessToken: z.string(),
});

export const getTokenSchema = TokenSchema;
