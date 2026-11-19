import { createFileRoute } from "@tanstack/react-router";
import { AdminLoginPage } from "@/components/admin";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [
    { title: "Admin Login | Global CNC" },
    { name: "description", content: "Administrator access to Global CNC website content management." },
    { property: "og:title", content: "Admin Login | Global CNC" },
    { property: "og:description", content: "Manage Global CNC website content." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: AdminLoginPage,
});