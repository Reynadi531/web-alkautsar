/// <reference path="../pb_data/types.d.ts" />

// Koleksi tunggal: satu halaman situs = tepat satu baris. Baris kedua ditolak.
onRecordCreate(
  (e) => {
    if (e.app.countRecords(e.record.collection().id) > 0) {
      throw new BadRequestError(
        "Koleksi ini hanya boleh berisi satu data. Ubah data yang sudah ada.",
      );
    }
    e.next();
  },
  "profil",
  "sejarah",
  "visi_misi",
  "donasi",
  "kontak",
);
