import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/welcome")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Link to="/login">로그인 페이지</Link>
      <br />
      <Link to="/_auth/my">마이 페이지</Link>
    </div>
  );
}
