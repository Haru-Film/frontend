import { createQueryKeys } from "@lukemorales/query-key-factory";
import { QuestionResponseSchema } from "./types/question";
import { env } from "@/config/env";
import { toastError, tryJson } from "@/lib/request";

export const questionQueries = createQueryKeys("questions", {
  daily: (day: string) => ({
    queryKey: [day],
    queryFn: async () => {
      const url = `${env.VITE_S3_BUCKET_URL}/questions/day${day}.json`;
      const res = await fetch(url);
      const response = tryJson(await res.text(), QuestionResponseSchema);
      return toastError(res, response);
    },
  }),
});
