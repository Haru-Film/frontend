import { default as kyBase } from "ky";
import { useTokenStore } from "@/stores/useTokenStore";

export const ky = kyBase.create({
  throwHttpErrors: false,
  credentials: "include",
  prefixUrl: import.meta.env.VITE_API_URL,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = useTokenStore.getState().token;
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});
