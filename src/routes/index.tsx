import { createFileRoute } from "@tanstack/react-router";
import { HomeRoutePage } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Global CNC | Precision Engineering & Manufacturing" },
      {
        name: "description",
        content:
          "Discover precision CNC machining, VMC machines, special purpose machines and custom manufacturing solutions from Global CNC in Pune, India.",
      },
      { property: "og:title", content: "Global CNC | Precision Engineering & Manufacturing" },
      {
        property: "og:description",
        content: "Precision machines and manufacturing solutions, engineered around your process.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomeRoutePage,
});
