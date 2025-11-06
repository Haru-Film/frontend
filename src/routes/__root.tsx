import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useToastStore } from "@/stores/useToastStore";
import { useEffect } from "react";
import { toast } from "sonner";

import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { message, type } = useToastStore();
  const clearToast = useToastStore((state) => state.clear);

  useEffect(() => {
    if (message) {
      switch (type) {
        case "success":
          toast.success(message);
          break;
        case "error":
          toast.error(message);
          break;
        case "info":
          toast.info(message);
          break;
        default:
          toast(message);
      }

      clearToast();
    }
  }, [message, type, clearToast]);

  return (
    <>
      <Outlet />
      <Toaster />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  );
}
