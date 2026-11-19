import { createFileRoute } from "@tanstack/react-router";
import { ContentRoutePage } from "@/components/site";

export const Route = createFileRoute("/blogs")({
  head: () => ({ meta: [
    { title: "Manufacturing Insights & CNC Articles | Global CNC" },
    { name: "description", content: "Practical articles on CNC machining, special purpose machine design, manufacturing technology and equipment maintenance." },
    { property: "og:title", content: "Manufacturing Insights & CNC Articles | Global CNC" },
    { property: "og:description", content: "Ideas and practical insights for better manufacturing." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <ContentRoutePage page="blogs" />,
});