import { createFileRoute } from "@tanstack/react-router";
import { ContentRoutePage } from "@/components/site";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers at Global CNC | Pune Manufacturing Jobs" },
      {
        name: "description",
        content:
          "Explore engineering, CNC operations and service careers with Global CNC Pvt. Ltd. in Pune, Maharashtra.",
      },
      { property: "og:title", content: "Careers at Global CNC | Pune Manufacturing Jobs" },
      {
        property: "og:description",
        content: "Build the next generation of manufacturing with Global CNC.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ContentRoutePage page="careers" />,
});
