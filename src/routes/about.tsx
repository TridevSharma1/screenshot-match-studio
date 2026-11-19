import { createFileRoute } from "@tanstack/react-router";
import { ContentRoutePage } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Global CNC | Pune Engineering & Manufacturing" },
      {
        name: "description",
        content:
          "Meet Global CNC Pvt. Ltd., a Pune-based engineering partner for precision manufacturing, custom machines and production support.",
      },
      { property: "og:title", content: "About Global CNC | Pune Engineering & Manufacturing" },
      { property: "og:description", content: "Engineering partnership, built on precision." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ContentRoutePage page="about" />,
});
