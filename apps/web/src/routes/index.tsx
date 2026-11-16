import { createFileRoute } from "@tanstack/react-router";

import { Activities } from "../components/home/activities";
import { Connect } from "../components/home/connect";
import { Gallery } from "../components/home/gallery";
import { Hero } from "../components/home/hero";
import { PracticalInfo } from "../components/home/practical-info";
import { getHomeActivities } from "../lib/agenda";
import { getPrayerTimes } from "../lib/prayer-times";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [prayer, activities] = await Promise.all([getPrayerTimes(), getHomeActivities()]);
    return { prayer, activities };
  },
  component: HomePage,
});

function HomePage() {
  const { prayer, activities } = Route.useLoaderData();

  return (
    <div className="home-page">
      <Hero />
      <Gallery />
      <PracticalInfo prayer={prayer} />
      <Activities upcoming={activities.upcoming} archive={activities.archive} />
      <Connect />
    </div>
  );
}
