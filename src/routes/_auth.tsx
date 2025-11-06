import { queryClient, queries } from "@/api";
import { useTokenStore } from "@/stores/useTokenStore";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    const token = useTokenStore.getState().token;
    if (token) {
      return;
    }

    try {
      const accessToken = await queryClient.fetchQuery({
        ...queries.auth.reissue,
        retry: false,
      });
      if (accessToken) {
        useTokenStore.getState().authorize(accessToken);
        return;
      }
    } catch (error) {
      // ignore
      console.log(error);
    }

    return;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const token = useTokenStore((s) => s.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // TODO: Fallback
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
}
