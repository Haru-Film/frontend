import { z } from "zod";

export const QuestionResponseSchema = z.object({
  questions: z.array(z.string()),
});
