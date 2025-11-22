import { useCallback } from "react";
import { toast } from "sonner";

interface ToastInfo {
  description?: string;
  type: "success" | "error" | "info" | "warning";
}

export function useToast() {
  const showToast = useCallback(({ description, type }: ToastInfo) => {
    setTimeout(() => {
      switch (type) {
        case "success":
          toast.success("성공", { description });
          break;
        case "error":
          toast.error("오류", { description });
          break;
        case "info":
          toast.info("안내", { description });
          break;
        case "warning":
          toast.warning("경고", { description });
          break;
      }
    }, 500);
  }, []);

  return { showToast };
}
