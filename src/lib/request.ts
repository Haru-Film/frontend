import type { KyResponse } from "ky";
import { toast } from "sonner";
import { z } from "zod";

import { BaseErrorResponse, HandledToastError } from "@/api/types/base";

export const INVALID_JSON = Symbol("INVALID_JSON");
export const INVALID_DATA = Symbol("INVALID_DATA");
export function tryJson<T>(
  input: string,
  schema?: z.ZodType<T>,
  debug = false
): T | typeof INVALID_JSON | typeof INVALID_DATA {
  try {
    const result = JSON.parse(input);
    if (!schema) return result;
    const schemaResult = schema.safeParse(result);
    if (schemaResult.success) return schemaResult.data;
    if (debug || import.meta.env.MODE !== "production") {
      console.error(input);
      console.error(schemaResult.error);
    }

    return INVALID_DATA;
  } catch (e) {
    if (debug || import.meta.env.MODE !== "production") {
      console.error(input);
      console.error(e);
    }
    return INVALID_JSON;
  }
}

export function tryJsonWithRefresh<T extends Record<string, unknown>>(
  input: string,
  schema: z.ZodType<T>
):
  | T
  | typeof INVALID_JSON
  | typeof INVALID_DATA
  | z.infer<typeof BaseErrorResponse> {
  const result = tryJson(input, z.union([schema, BaseErrorResponse]), true);
  return result;
}

export function toastError<T extends Record<string, unknown>>(
  res: KyResponse<unknown>,
  result: T | typeof INVALID_DATA | typeof INVALID_JSON
) {
  if (result === INVALID_DATA || result === INVALID_JSON) {
    toast.error("오류", {
      description: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    });
    throw new HandledToastError(res.url, res.status);
  }

  const errorResponse = BaseErrorResponse.safeParse(result);
  if (errorResponse.success) {
    toast.error(errorResponse.data.error.title, {
      description: errorResponse.data.error.message,
    });
    throw new HandledToastError(res.url, res.status);
  }

  return result as T;
}
