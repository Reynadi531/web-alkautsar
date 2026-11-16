/// <reference path="../pb_data/types.d.ts" />

// Skema CMS Masjid Al-Kautsar Pharmindo.
// Satu koleksi per menu situs. Semua penulisan hanya lewat dasbor (superuser);
// pengunjung hanya membaca, dan konten berkala hanya terbaca saat `terbit` dicentang.
migrate(
  (app) => {
    const POLA_SLUG = "^[a-z0-9]+(?:-[a-z0-9]+)*$";
    const MB = 1024 * 1024;

    const teks = (name, opsi) => Object.assign({ type: "text", name: name }, opsi || {});
    const naskah = (name) => ({ type: "editor", name: name, convertURLs: false });
    const centang = (name) => ({ type: "bool", name: name });
    const tanggal = (name) => ({ type: "date", name: name });
    const tautan = (name) => ({ type: "url", name: name });
    const angka = (name, opsi) =>
      Object.assign({ type: "number", name: name, onlyInt: true }, opsi || {});
    const pilihan = (name, values) => ({
      type: "select",
      name: name,
      maxSelect: 1,
      values: values,
    });
    const gambar = (name) => ({
      type: "file",
      name: name,
      maxSelect: 1,
      maxSize: 5 * MB,
      mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
      thumbs: ["640x0", "1280x0"],
    });
    const berkas = (name) => ({
      type: "file",
      name: name,
      maxSelect: 1,
      maxSize: 30 * MB,
      mimeTypes: ["application/pdf"],
    });

    const judul = (name) => teks(name || "judul", { required: true, presentable: true, max: 200 });
    // Dikosongkan saat membuat data = diisi otomatis dari judul (pb_hooks/slug.pb.js).
    const slug = () => teks("slug", { required: true, max: 120, pattern: POLA_SLUG });
    const urutan = () => angka("urutan");
    const jejak = () => [
      { type: "autodate", name: "dibuat", onCreate: true, onUpdate: false },
      { type: "autodate", name: "diperbarui", onCreate: true, onUpdate: true },
    ];

    const TERBIT = "terbit = true";
    const PUBLIK = "";

    function buat(name, aturanBaca, fields, indexes) {
      const collection = new Collection({
        type: "base",
        name: name,
        listRule: aturanBaca,
        viewRule: aturanBaca,
        createRule: null,
        updateRule: null,
        deleteRule: null,
        fields: fields.concat(jejak()),
        indexes: indexes || [],
      });
      app.save(collection);
      return collection;
    }

    const indeksSlug = (name) => [
      "CREATE UNIQUE INDEX idx_" + name + "_slug ON " + name + " (slug)",
    ];

    // ── Tentang Masjid ────────────────────────────────────────────────────────

    // Tunggal: /profil
    buat("profil", PUBLIK, [judul(), teks("deskripsi", { max: 2000 })]);

    // Tunggal: /profil/sejarah
    buat("sejarah", PUBLIK, [judul(), naskah("narasi"), centang("contoh")]);

    buat("tonggak_sejarah", PUBLIK, [
      judul(),
      teks("tahun", { max: 40 }),
      teks("deskripsi", { max: 1000 }),
      urutan(),
      centang("contoh"),
    ]);

    // Tunggal: /profil/visi-misi. `misi`: satu butir per baris.
    buat("visi_misi", PUBLIK, [
      teks("visi", { required: true, presentable: true, max: 1000 }),
      teks("keterangan_visi", { max: 1000 }),
      teks("misi", { max: 5000 }),
      centang("contoh"),
    ]);

    // /profil/pengurus dan /profil/pengurus/bagan (`tingkat` = baris pada bagan)
    buat("pengurus", PUBLIK, [
      teks("jabatan", { required: true, presentable: true, max: 120 }),
      teks("nama", { presentable: true, max: 160 }),
      teks("tugas", { max: 300 }),
      gambar("foto"),
      angka("tingkat", { min: 1, max: 9 }),
      teks("periode", { max: 60 }),
      urutan(),
      centang("contoh"),
    ]);

    // /profil/bidang
    const bidang = buat(
      "bidang",
      PUBLIK,
      [
        judul("nama"),
        slug(),
        pilihan("ikon", [
          "buku",
          "kepedulian",
          "pemuda",
          "pendidikan",
          "keuangan",
          "sarana",
          "umum",
        ]),
        teks("ringkasan", { max: 500 }),
        naskah("tentang"),
        naskah("tanggung_jawab"),
        teks("penanggung_jawab", { max: 160 }),
        teks("kontak", { max: 160 }),
        urutan(),
        centang("contoh"),
      ],
      indeksSlug("bidang"),
    );

    // ── Kegiatan ──────────────────────────────────────────────────────────────

    const acara = (narasumber) => [
      judul(),
      slug(),
      teks("ringkasan", { max: 500 }),
      naskah("deskripsi"),
      tanggal("tanggal"),
      teks("waktu", { max: 80 }),
      teks("lokasi", { max: 200 }),
      teks(narasumber, { max: 200 }),
      teks("keterangan_pendaftaran", { max: 300 }),
      tautan("url_pendaftaran"),
      gambar("gambar"),
      teks("alt_gambar", { max: 300 }),
    ];
    const status = () => [centang("unggulan"), centang("contoh"), centang("terbit")];

    // /agenda
    buat(
      "agenda",
      TERBIT,
      acara("narasumber")
        .concat([
          {
            type: "relation",
            name: "bidang",
            collectionId: bidang.id,
            maxSelect: 1,
            cascadeDelete: false,
          },
        ])
        .concat(status()),
      indeksSlug("agenda"),
    );

    // Baris arsip tanpa halaman detail: /agenda, /seminar, dan beranda
    buat("arsip_kegiatan", PUBLIK, [
      judul(),
      tanggal("tanggal"),
      teks("keterangan", { max: 200 }),
      urutan(),
    ]);

    // /seminar
    buat(
      "seminar",
      TERBIT,
      acara("pembicara")
        .concat([teks("tema", { max: 120 }), berkas("materi")])
        .concat(status()),
      indeksSlug("seminar"),
    );

    // /program
    buat(
      "program",
      TERBIT,
      [
        judul(),
        slug(),
        teks("ringkasan", { max: 500 }),
        naskah("tujuan"),
        naskah("sasaran"),
        teks("jadwal", { max: 200 }),
        teks("lokasi", { max: 200 }),
        teks("keterangan_pendaftaran", { max: 300 }),
        tautan("url_pendaftaran"),
        teks("kontak", { max: 160 }),
        gambar("gambar"),
        gambar("gambar_detail"),
        teks("alt_gambar", { max: 300 }),
      ].concat(status()),
      indeksSlug("program"),
    );

    // ── Tulisan: /berita, /artikel, /kolom ────────────────────────────────────

    const tulisan = () =>
      [
        judul(),
        slug(),
        teks("ringkasan", { max: 500 }),
        naskah("isi"),
        teks("kategori", { max: 80 }),
        teks("penulis", { max: 160 }),
        tanggal("tanggal_terbit"),
        teks("sumber", { max: 200 }),
        gambar("gambar"),
        // Opsional: potongan khusus untuk halaman detail (desktop / ponsel).
        gambar("gambar_detail"),
        gambar("gambar_detail_seluler"),
        teks("alt_gambar", { max: 300 }),
      ].concat(status());

    buat("berita", TERBIT, tulisan(), indeksSlug("berita"));
    buat("artikel", TERBIT, tulisan(), indeksSlug("artikel"));
    buat("kolom", TERBIT, tulisan(), indeksSlug("kolom"));

    // ── Konten ────────────────────────────────────────────────────────────────

    // /video
    buat(
      "video",
      TERBIT,
      [
        judul(),
        teks("ringkasan", { max: 500 }),
        tautan("url_video"),
        teks("durasi", { max: 40 }),
        tanggal("tanggal"),
        teks("kategori", { max: 80 }),
        gambar("thumbnail"),
        teks("alt_thumbnail", { max: 300 }),
        urutan(),
      ].concat(status()),
    );

    const dokumen = (khusus) =>
      [judul(), slug()]
        .concat(khusus)
        .concat([
          teks("kategori", { max: 80 }),
          tanggal("tanggal"),
          teks("ringkasan", { max: 1000 }),
          gambar("sampul"),
          berkas("berkas"),
          centang("contoh"),
          centang("terbit"),
        ]);

    buat("pustaka", TERBIT, dokumen([teks("penulis", { max: 160 })]), indeksSlug("pustaka"));
    buat("publikasi", TERBIT, dokumen([teks("jenis", { max: 80 })]), indeksSlug("publikasi"));
    buat("buletin", TERBIT, dokumen([teks("nomor_edisi", { max: 60 })]), indeksSlug("buletin"));

    // ── Lainnya ───────────────────────────────────────────────────────────────

    // /layanan. `langkah_akses`: satu langkah per baris.
    buat(
      "layanan",
      TERBIT,
      [
        judul(),
        slug(),
        pilihan("ikon", ["lokasi", "percakapan", "ibadah", "pendidikan", "kepedulian", "umum"]),
        teks("ringkasan", { max: 500 }),
        naskah("tentang"),
        teks("langkah_akses", { max: 3000 }),
        teks("waktu_layanan", { max: 200 }),
        teks("kontak", { max: 200 }),
        urutan(),
        centang("contoh"),
        centang("terbit"),
      ],
      indeksSlug("layanan"),
    );

    // Tunggal: /donasi. `langkah`: satu langkah per baris.
    buat("donasi", PUBLIK, [
      teks("nama_bank", { presentable: true, max: 120 }),
      teks("nomor_rekening", { max: 60 }),
      teks("atas_nama", { max: 160 }),
      {
        type: "file",
        name: "qris",
        maxSelect: 1,
        maxSize: 5 * MB,
        mimeTypes: ["image/jpeg", "image/png", "image/webp"],
      },
      teks("kontak_konfirmasi", { max: 200 }),
      teks("langkah", { max: 3000 }),
      centang("contoh"),
    ]);

    buat("tujuan_donasi", PUBLIK, [judul(), teks("deskripsi", { max: 1000 }), urutan()]);

    // Tunggal: /kontak, footer, beranda, dan koordinat jadwal salat
    buat("kontak", PUBLIK, [
      teks("jalan", { required: true, presentable: true, max: 200 }),
      teks("alamat_lengkap", { required: true, max: 400 }),
      teks("wilayah", { max: 120 }),
      tautan("url_peta"),
      tautan("url_sematan_peta"),
      { type: "number", name: "lintang", min: -90, max: 90 },
      { type: "number", name: "bujur", min: -180, max: 180 },
      teks("akun_instagram", { max: 80 }),
      tautan("url_instagram"),
      tautan("url_youtube"),
      teks("telepon", { max: 40 }),
      teks("whatsapp", { max: 40 }),
      { type: "email", name: "email" },
      teks("info_kunjungan", { max: 1000 }),
    ]);
  },
  (app) => {
    [
      "kontak",
      "tujuan_donasi",
      "donasi",
      "layanan",
      "buletin",
      "publikasi",
      "pustaka",
      "video",
      "kolom",
      "artikel",
      "berita",
      "program",
      "seminar",
      "arsip_kegiatan",
      "agenda",
      "bidang",
      "pengurus",
      "visi_misi",
      "tonggak_sejarah",
      "sejarah",
      "profil",
    ].forEach((name) => {
      try {
        app.delete(app.findCollectionByNameOrId(name));
      } catch {
        // sudah terhapus
      }
    });
  },
);
