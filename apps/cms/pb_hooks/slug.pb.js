/// <reference path="../pb_data/types.d.ts" />

// Slug kosong saat membuat data → diisi dari judul/nama, unik per koleksi.
onRecordCreate(
  (e) => {
    const record = e.record;
    if (!record.getString("slug")) {
      const sumber = record.getString("judul") || record.getString("nama");
      const dasar =
        sumber
          .toLowerCase()
          .normalize("NFKD")
          .replace(/[̀-ͯ]/g, "")
          .replace(/&/g, " dan ")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
          .slice(0, 100)
          .replace(/-+$/, "") || "tanpa-judul";

      let slug = dasar;
      for (let nomor = 2; ; nomor++) {
        try {
          e.app.findFirstRecordByData(record.collection().id, "slug", slug);
        } catch {
          break; // belum dipakai
        }
        slug = dasar + "-" + nomor;
      }
      record.set("slug", slug);
    }
    e.next();
  },
  "bidang",
  "agenda",
  "seminar",
  "program",
  "berita",
  "artikel",
  "kolom",
  "pustaka",
  "publikasi",
  "buletin",
  "layanan",
);
