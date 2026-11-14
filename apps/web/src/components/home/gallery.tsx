import { SectionLabel } from "../section-label";

export function Gallery() {
  return (
    <section id="galeri" className="hidden gap-6 bg-white px-19 py-13 lg:flex lg:items-center">
      <div className="flex flex-col gap-3.5 lg:w-[290px] lg:shrink-0">
        <SectionLabel>Masjid Al-Kautsar</SectionLabel>
        <h2 className="text-[25px] leading-[1.5] font-bold text-ak-dark">
          Akrab dengan
          <br />
          lingkungan sekitar.
        </h2>
        <p className="text-[13px] leading-normal text-ak-body">
          Potret bangunan masjid di tengah lingkungan Komplek Pharmindo.
        </p>
      </div>

      <div className="grid h-60 w-[29%] shrink-0 grid-cols-2 gap-2.5 overflow-hidden rounded-[7px] bg-ak-cream xl:w-[370px]">
        <img
          src="/images/masjid-menara.webp"
          alt="Menara Masjid Al-Kautsar di bawah cahaya siang"
          width={900}
          height={1200}
          loading="lazy"
          className="h-60 w-full object-cover"
        />
        <img
          src="/images/masjid-mihrab.webp"
          alt="Mihrab bergaya hangat di dalam Masjid Al-Kautsar"
          width={900}
          height={1200}
          loading="lazy"
          className="h-60 w-full object-cover"
        />
      </div>

      <img
        src="/images/masjid-tampak-depan.webp"
        alt="Tampak depan Masjid Al-Kautsar"
        width={1400}
        height={788}
        loading="lazy"
        className="h-60 w-full rounded-[7px] object-cover object-top lg:min-w-0 lg:flex-1"
      />
    </section>
  );
}
