import { buttonVariants } from "@web-alkautsar/ui/components/button";

export function NotFound() {
  return (
    <section className="mx-auto flex min-h-[50svh] max-w-3xl flex-col items-start justify-center gap-5 px-[26px] py-20 lg:px-19">
      <p className="text-[11px] font-semibold tracking-[0.164em] text-ak-brown uppercase">404</p>
      <h1 className="text-3xl font-bold text-ak-dark">Halaman belum tersedia.</h1>
      <p className="text-ak-body">Halaman yang Anda cari belum dibuat atau sudah dipindahkan.</p>
      <a href="/" className={buttonVariants()}>
        Kembali ke Beranda
      </a>
    </section>
  );
}
