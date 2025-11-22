import { useToast } from "@/hooks/useToast";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_public/login-success")({
  component: RouteComponent,
});

function RouteComponent() {
  const { showToast } = useToast();

  useEffect(() => {
    showToast({ description: "로그인에 성공했습니다.", type: "success" });
  }, [showToast]);

  return <Navigate to="/my" />;
}
