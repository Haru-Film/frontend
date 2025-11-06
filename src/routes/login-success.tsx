import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/login-success")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Navigate to="/_auth/my" />;
}
