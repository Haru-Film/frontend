import { useToastStore } from "@/stores/useToastStore";
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/login-failure")({
  component: RouteComponent,
});

function RouteComponent() {
  const showToast = useToastStore((state) => state.show);
  showToast("로그인에 실패했습니다.", "error");
  return <Navigate to="/login" />;
}
