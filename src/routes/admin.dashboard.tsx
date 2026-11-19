import { createFileRoute } from "@tanstack/react-router";
import { AdminDashboardPage } from "@/components/admin";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [
    { title: "Website Content Dashboard | Global CNC" },
    { name: "description", content: "Manage Global CNC website sections, products, services, gallery, company details and more." },
    { property: "og:title", content: "Website Content Dashboard | Global CNC" },
    { property: "og:description", content: "Manage Global CNC website content." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: AdminDashboardPage,
});