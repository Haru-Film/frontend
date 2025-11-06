import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

import { authQueries } from "./auth";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
  },
  queryCache: new QueryCache({
    onError: async () => {},
  }),
  mutationCache: new MutationCache({
    onError: async () => {},
  }),
});

export const queries = mergeQueryKeys(authQueries);
