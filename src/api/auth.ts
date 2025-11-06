import { createQueryKeys } from "@lukemorales/query-key-factory";

import { ky } from "@/lib/ky";
import { toastError, tryJson } from "@/lib/request";
import { getTokenSchema } from "./types/auth";

export const authQueries = createQueryKeys("auth", {
  reissue: {
    queryKey: null,
    queryFn: async () => {
      const res = await ky.post("auth/reissue");
      const response = tryJson(await res.text(), getTokenSchema);
      const { accessToken } = toastError(res, response);
      return accessToken;
    },
  },
  logout: {
    queryKey: null,
    queryFn: async () => {
      await ky.get("auth/logout");
      return null;
    },
  },
});
