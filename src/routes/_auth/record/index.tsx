import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/record/")({
  beforeLoad: () => {
    throw redirect({
      to: "/record/permission",
      mask: { to: "/record" },
      replace: true,
    });
  },
});
