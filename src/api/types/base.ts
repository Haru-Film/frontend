import { z } from "zod";

export const BaseSuccessResponse = z.object({
  result: z.literal(true),
  data: z.unknown(),
});

export const BaseErrorResponse = z.object({
  result: z.literal(false),
  error: z.object({
    title: z.string(),
    message: z.string(),
  }),
});

export class HandledToastError extends Error {
  constructor(path: string, status: number) {
    super(`ERROR[${status}] ${path}`);
  }
}
