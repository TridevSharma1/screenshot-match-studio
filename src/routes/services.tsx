import { createFileRoute } from "@tanstack/react-router";
import { ContentRoutePage } from "@/components/site";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [
    { title: "Engineering & CNC Machine Services | Global CNC" },
    { name: "description", content: "Machine design, custom machine development, CNC manufacturing, installation, maintenance, repair and upgrades from Global CNC." },
    { property: "og:title", content: "Engineering & CNC Machine Services | Global CNC" },
    { property: "og:description", content: "Engineering support at every step of manufacturing." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <ContentRoutePage page="services" />,
});