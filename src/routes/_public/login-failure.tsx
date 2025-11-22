import { useToast } from "@/hooks/useToast";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_public/login-failure")({
  component: RouteComponent,
});

function RouteComponent() {
  const { showToast } = useToast();

  useEffect(() => {
    showToast({ description: "로그인에 실패했습니다.", type: "error" });
  }, [showToast]);

  return <Navigate to="/login" replace />;
}
