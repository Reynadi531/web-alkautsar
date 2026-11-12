import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { site } from "./site";

export type PrayerTimes =
  | {
      status: "ok";
      dateLabel: string;
      times: { name: string; time: string }[];
    }
  | { status: "unavailable" };

const timeSchema = z.string().regex(/^\d{2}:\d{2}/);

const responseSchema = z.object({
  data: z.object({
    timings: z.object({
      Fajr: timeSchema,
      Dhuhr: timeSchema,
      Asr: timeSchema,
      Maghrib: timeSchema,
      Isha: timeSchema,
    }),
  }),
});

const TIME_ZONE = "Asia/Jakarta";
const KEMENAG_METHOD = 20;

const cache = new Map<string, PrayerTimes>();

function jakartaDateParts(now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(now);
  const pick = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return { day: pick("day"), month: pick("month"), year: pick("year") };
}

const formatTime = (value: string) => value.slice(0, 5).replace(":", ".");

export const getPrayerTimes = createServerFn({ method: "GET" }).handler(
  async (): Promise<PrayerTimes> => {
    const now = new Date();
    const { day, month, year } = jakartaDateParts(now);
    const key = `${year}-${month}-${day}`;

    const cached = cache.get(key);
    if (cached) return cached;

    const params = new URLSearchParams({
      latitude: String(site.coordinates.latitude),
      longitude: String(site.coordinates.longitude),
      method: String(KEMENAG_METHOD),
      timezonestring: TIME_ZONE,
    });

    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?${params}`,
        {
          headers: { accept: "application/json" },
          signal: AbortSignal.timeout(5000),
        },
      );
      if (!response.ok) return { status: "unavailable" };

      const { data } = responseSchema.parse(await response.json());
      const { Fajr, Dhuhr, Asr, Maghrib, Isha } = data.timings;

      const result: PrayerTimes = {
        status: "ok",
        dateLabel: new Intl.DateTimeFormat("id-ID", {
          timeZone: TIME_ZONE,
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(now),
        times: [
          { name: "Subuh", time: formatTime(Fajr) },
          { name: "Zuhur", time: formatTime(Dhuhr) },
          { name: "Asar", time: formatTime(Asr) },
          { name: "Magrib", time: formatTime(Maghrib) },
          { name: "Isya", time: formatTime(Isha) },
        ],
      };

      cache.clear();
      cache.set(key, result);
      return result;
    } catch {
      return { status: "unavailable" };
    }
  },
);
