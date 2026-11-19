import { createFileRoute } from "@tanstack/react-router";
import { ContentRoutePage } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact Global CNC | Bhosari, Pune" },
    { name: "description", content: "Contact Global CNC Pvt. Ltd. in Bhosari, Pune for CNC machines, custom manufacturing, precision parts and engineering support." },
    { property: "og:title", content: "Contact Global CNC | Bhosari, Pune" },
    { property: "og:description", content: "Talk with our team about your manufacturing requirements." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <ContentRoutePage page="contact" />,
});