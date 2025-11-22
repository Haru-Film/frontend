import { z } from "zod";

export const BaseSuccessResponse = z.object({
  message: z.string().optional(),
});

export const BaseErrorResponse = z.object({
  message: z.string(),
});

export class HandledToastError extends Error {
  constructor(path: string, status: number) {
    super(`ERROR[${status}] ${path}`);
  }
}
