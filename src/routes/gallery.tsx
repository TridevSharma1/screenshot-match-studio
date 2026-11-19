import { createFileRoute } from "@tanstack/react-router";
import { ContentRoutePage } from "@/components/site";

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [
    { title: "Manufacturing Gallery | Global CNC Pune" },
    { name: "description", content: "See the CNC machinery, precision components and manufacturing environment behind Global CNC's engineering work." },
    { property: "og:title", content: "Manufacturing Gallery | Global CNC Pune" },
    { property: "og:description", content: "Precision manufacturing, in every detail." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <ContentRoutePage page="gallery" />,
});