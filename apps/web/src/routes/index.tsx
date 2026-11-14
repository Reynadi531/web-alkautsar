import { createFileRoute } from "@tanstack/react-router";

import { Activities } from "../components/home/activities";
import { Connect } from "../components/home/connect";
import { Gallery } from "../components/home/gallery";
import { Hero } from "../components/home/hero";
import { PracticalInfo } from "../components/home/practical-info";
import { getPrayerTimes } from "../lib/prayer-times";

export const Route = createFileRoute("/")({
  loader: () => getPrayerTimes(),
  component: HomePage,
});

function HomePage() {
  const prayer = Route.useLoaderData();

  return (
    <div className="home-page">
      <Hero />
      <Gallery />
      <PracticalInfo prayer={prayer} />
      <Activities />
      <Connect />
    </div>
  );
}
