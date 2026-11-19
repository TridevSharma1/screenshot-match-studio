import { createFileRoute } from "@tanstack/react-router";
import { ContentRoutePage } from "@/components/site";

export const Route = createFileRoute("/products")({
  head: () => ({ meta: [
    { title: "CNC Machines & Precision Components | Global CNC" },
    { name: "description", content: "Explore CNC turning centres, VMCs, special purpose machines, custom CNC parts and automation systems from Global CNC." },
    { property: "og:title", content: "CNC Machines & Precision Components | Global CNC" },
    { property: "og:description", content: "The right machine and precision components for the work ahead." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <ContentRoutePage page="products" />,
});