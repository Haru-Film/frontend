import { createFileRoute, Outlet, Navigate } from "@tanstack/react-router";
import { useTokenStore } from "@/stores/useTokenStore";

export const Route = createFileRoute("/_public")({
  component: RouteComponent,
});

function RouteComponent() {
  const { token } = useTokenStore();

  if (token) {
    return <Navigate to="/my" />;
  }

  return <Outlet />;
}
