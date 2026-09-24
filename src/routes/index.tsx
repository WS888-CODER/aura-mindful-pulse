import { createFileRoute } from "@tanstack/react-router";
import { AuraApp } from "@/components/aura/AuraApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AURA — Connected calm. Better understanding." },
      { name: "description", content: "A premium companion for AURA wearable sessions, recorded episodes, heart-rate trends, and health summaries." },
      { property: "og:title", content: "AURA Digital Health Companion" },
      { property: "og:description", content: "Review AURA sessions, recorded heart-rate measurements, and health summaries in one calm mobile experience." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <AuraApp />;
}
