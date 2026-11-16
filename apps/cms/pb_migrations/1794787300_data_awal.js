/// <reference path="../pb_data/types.d.ts" />

// Data awal: informasi situs yang sudah terkonfirmasi + contoh konten dari desain.
// Contoh konten ditandai `contoh = true` agar situs menampilkan label "CONTOH KONTEN";
// hapus atau ganti lewat dasbor setelah materi resmi tersedia.
migrate(
  (app) => {
    // Foto bawaan situs. Docker menyalinnya ke /pb/seed (lihat Dockerfile).
    const dirGambar = $os.getenv("CMS_SEED_DIR") || "../web/public/images";

    function foto(nama) {
      try {
        return $filesystem.fileFromPath(dirGambar + "/" + nama);
      } catch {
        console.log("[data_awal] gambar tidak ditemukan, dilewati: " + dirGambar + "/" + nama);
        return null;
      }
    }

    function tambah(koleksi, data, berkas) {
      const record = new Record(app.findCollectionByNameOrId(koleksi));
      Object.keys(data).forEach((kunci) => record.set(kunci, data[kunci]));
      Object.keys(berkas || {}).forEach((kunci) => {
        const file = foto(berkas[kunci]);
        if (file) record.set(kunci, file);
      });
      app.save(record);
      return record;
    }

    // ── Terkonfirmasi ─────────────────────────────────────────────────────────

    tambah("kontak", {
      jalan: "Jl. Trowulan V, Blok T",
      alamat_lengkap: "Kelurahan Melong, Kecamatan Cimahi Selatan, Kota Cimahi, Jawa Barat 40534",
      wilayah: "Melong · Cimahi Selatan",
      url_peta:
        "https://www.google.com/maps/search/?api=1&query=Masjid+Al-Kautsar+Pharmindo+Cimahi+Selatan",
      lintang: -6.8841,
      bujur: 107.5413,
      akun_instagram: "@masjidalkautsar.pharmindo",
      url_instagram: "https://www.instagram.com/masjidalkautsar.pharmindo/",
    });

    tambah("profil", {
      judul: "Dekat dengan warga, tumbuh dalam kebersamaan.",
      deskripsi:
        "Masjid Al-Kautsar berada di Komplek Pharmindo, Kelurahan Melong, Kecamatan Cimahi Selatan, Kota Cimahi.",
    });

    ["Kajian keislaman", "Pemuda & Ramadan", "Kegiatan UPZ"].forEach((judul, i) =>
      tambah("arsip_kegiatan", {
        judul: judul,
        keterangan: "ARSIP · detail belum tersedia",
        urutan: i + 1,
      }),
    );

    // ── Contoh konten (placeholder desain, bukan fakta) ───────────────────────

    tambah("sejarah", {
      judul: "Perjalanan yang akan didokumentasikan",
      narasi:
        "<p>Naskah sejarah resmi masjid akan ditampilkan di sini setelah diverifikasi bersama pengurus. Bagian ini disiapkan untuk cerita awal pendirian, perkembangan bangunan, dan peran masjid dalam lingkungan warga.</p>",
      contoh: true,
    });

    [
      ["Awal pendirian", "Tahun dan kisah pendirian menunggu arsip resmi."],
      ["Perkembangan masjid", "Tahun, foto arsip, dan narasi perubahan belum diberikan."],
      ["Perjalanan berikutnya", "Tonggak kegiatan akan ditambahkan setelah terverifikasi."],
    ].forEach((tonggak, i) =>
      tambah("tonggak_sejarah", {
        judul: tonggak[0],
        deskripsi: tonggak[1],
        urutan: i + 1,
        contoh: true,
      }),
    );

    tambah("visi_misi", {
      visi: "Rumusan visi resmi masjid",
      keterangan_visi: "Menunggu teks resmi dari pengurus Masjid Al-Kautsar Pharmindo.",
      misi: [
        "Butir misi resmi akan ditambahkan setelah dikonfirmasi.",
        "Butir misi resmi akan ditambahkan setelah dikonfirmasi.",
        "Butir misi resmi akan ditambahkan setelah dikonfirmasi.",
      ].join("\n"),
      contoh: true,
    });

    [
      ["Ketua DKM", "Koordinasi pengelolaan", 1],
      ["Sekretaris", "Administrasi", 2],
      ["Bendahara", "Pengelolaan dana", 2],
      ["Koordinator bidang", "Koordinasi bidang", 3],
    ].forEach((pengurus, i) =>
      tambah("pengurus", {
        jabatan: pengurus[0],
        tugas: pengurus[1],
        tingkat: pengurus[2],
        urutan: i + 1,
        contoh: true,
      }),
    );

    [
      ["Ibadah & Dakwah", "ibadah-dan-dakwah", "buku"],
      ["Sosial & Kemasyarakatan", "sosial-dan-kemasyarakatan", "kepedulian"],
    ].forEach((bidang, i) =>
      tambah("bidang", {
        nama: bidang[0],
        slug: bidang[1],
        ikon: bidang[2],
        ringkasan:
          "Deskripsi dan ruang lingkup bidang akan disesuaikan dengan struktur resmi masjid.",
        tentang:
          "<p>Area ini memuat deskripsi bidang berdasarkan dokumen kepengurusan resmi. Naskah dan penanggung jawab belum diberikan.</p>",
        tanggung_jawab:
          "<p>Contoh susunan informasi: ruang lingkup kerja, koordinasi pelaksanaan kegiatan, dan pelaporan. Rincian final harus dikonfirmasi pengurus.</p>",
        urutan: i + 1,
        contoh: true,
      }),
    );

    const deskripsiAcara =
      "<p>Contoh penyajian deskripsi kegiatan. Tema, alur kegiatan, sasaran peserta, dan ketentuan mengikuti akan disesuaikan dengan informasi resmi. Jangan menggunakan halaman contoh ini sebagai jadwal kegiatan.</p>";

    tambah(
      "agenda",
      {
        judul: "Kajian dan kebersamaan warga",
        slug: "kajian-dan-kebersamaan-warga",
        ringkasan:
          "CONTOH KONTEN — bukan agenda aktif. Lokasi dan pendaftaran menunggu konfirmasi.",
        deskripsi: deskripsiAcara,
        alt_gambar: "Jamaah duduk bersama di dalam masjid pada siang hari",
        unggulan: true,
        contoh: true,
        terbit: true,
      },
      { gambar: "jamaah-masjid.webp" },
    );

    tambah(
      "seminar",
      {
        judul: "Ruang belajar bersama",
        slug: "ruang-belajar-bersama",
        ringkasan: "CONTOH KONTEN: bukan agenda aktif. Lokasi dan pendaftaran menunggu konfirmasi.",
        deskripsi: deskripsiAcara,
        alt_gambar: "Suasana jamaah sebagai ilustrasi umum, bukan dokumentasi acara tertentu",
        unggulan: true,
        contoh: true,
        terbit: true,
      },
      { gambar: "jamaah-masjid.webp" },
    );

    tambah(
      "program",
      {
        judul: "Ruang Belajar Warga",
        slug: "ruang-belajar-warga",
        ringkasan:
          "Contoh pola program belajar bersama. Tujuan, sasaran peserta, dan mekanisme pelaksanaan perlu dikonfirmasi pengurus.",
        tujuan:
          "<p>Contoh tujuan: menyediakan ruang belajar dan saling berbagi pengetahuan bagi warga. Rumusan ini merupakan contoh konten dan perlu diganti dengan deskripsi program resmi.</p>",
        sasaran:
          "<p>Contoh sasaran: jamaah dan warga lingkungan masjid. Persyaratan, kapasitas, dan ketentuan peserta belum ditetapkan.</p>",
        alt_gambar: "Ilustrasi umum suasana jamaah di masjid, bukan dokumentasi program tertentu",
        unggulan: true,
        contoh: true,
        terbit: true,
      },
      { gambar: "jamaah-masjid.webp", gambar_detail: "program-belajar-desktop.webp" },
    );

    const isiContoh =
      "<p>Ruang ibadah yang nyaman mengundang kita untuk menjaga kebersihan, ketenangan, dan sikap saling menghormati. Kebersamaan dapat dirawat melalui kebiasaan sederhana, mulai dari merapikan perlengkapan pribadi hingga memberi ruang bagi jamaah lain.</p>" +
      "<h2>Dimulai dari hal sederhana</h2>" +
      "<p>Datang dengan tertib, memperhatikan kenyamanan sekitar, dan meninggalkan ruang dalam keadaan rapi merupakan contoh ajakan umum dalam naskah ilustratif ini. Arahan khusus masjid perlu mengikuti informasi dari pengurus.</p>" +
      "<h2>Ruang bagi cerita warga</h2>" +
      "<p>Bagian ini disiapkan untuk naskah yang telah melalui proses penyuntingan. Kutipan, informasi kegiatan, dan dokumentasi akan dicantumkan hanya apabila sumbernya tersedia dan dapat dikonfirmasi.</p>";

    // Tiga rubrik memakai dua contoh yang sama; hanya kolom yang punya potongan foto khusus.
    [
      ["berita", "Merawat ruang kebersamaan", {}],
      ["artikel", "Merawat ruang kebersamaan", {}],
      [
        "kolom",
        "Merawat Ruang Kebersamaan",
        {
          gambar_detail: "kolom-kebersamaan-desktop.webp",
          gambar_detail_seluler: "kolom-kebersamaan-mobile.webp",
        },
      ],
    ].forEach((rubrik) => {
      tambah(
        rubrik[0],
        {
          judul: rubrik[1],
          slug: "merawat-ruang-kebersamaan",
          ringkasan: "Contoh konten, bukan informasi atau publikasi resmi.",
          isi: isiContoh,
          alt_gambar:
            "Suasana jamaah di ruang masjid, ilustrasi umum bukan dokumentasi acara tertentu",
          unggulan: true,
          contoh: true,
          terbit: true,
        },
        Object.assign({ gambar: "jamaah-masjid.webp" }, rubrik[2]),
      );
      tambah(
        rubrik[0],
        {
          judul: "Mengenal lingkungan masjid",
          slug: "mengenal-lingkungan-masjid",
          ringkasan: "Contoh konten, bukan informasi atau publikasi resmi.",
          alt_gambar: "Pemandangan Masjid Al-Kautsar dan lingkungan sekitar dari udara",
          contoh: true,
          terbit: true,
        },
        { gambar: "masjid-udara.webp" },
      );
    });

    [
      [
        "Mengenal Masjid Al-Kautsar",
        "Pengenalan singkat masjid dan kegiatan jamaah.",
        "jamaah-masjid.webp",
        "Jamaah duduk bersama di dalam masjid pada siang hari",
      ],
      [
        "Potret bangunan masjid",
        "Thumbnail contoh memakai foto masjid asli.",
        "masjid-tampak-depan.webp",
        "Tampak depan bangunan Masjid Al-Kautsar",
      ],
      [
        "Di lingkungan Pharmindo",
        "Contoh konten — bukan rekaman video yang sudah tersedia.",
        "masjid-udara.webp",
        "Pandangan udara Masjid Al-Kautsar di lingkungan Pharmindo",
      ],
    ].forEach((video, i) =>
      tambah(
        "video",
        {
          judul: video[0],
          ringkasan: video[1],
          alt_thumbnail: video[3],
          urutan: i + 1,
          unggulan: i === 0,
          contoh: true,
          terbit: true,
        },
        { thumbnail: video[2] },
      ),
    );

    [
      ["pustaka", "Catatan kebersamaan", {}],
      ["publikasi", "Catatan Kebersamaan", { jenis: "Publikasi" }],
      ["buletin", "Catatan kebersamaan", {}],
    ].forEach((katalog) => {
      [
        [katalog[1], "catatan-kebersamaan"],
        ["Ruang ibadah yang nyaman", "ruang-ibadah-yang-nyaman"],
      ].forEach((dokumen) =>
        tambah(
          katalog[0],
          Object.assign(
            {
              judul: dokumen[0],
              slug: dokumen[1],
              kategori: "Contoh bacaan komunitas",
              ringkasan: "Contoh konten: ringkasan bacaan menunggu naskah yang disetujui.",
              contoh: true,
              terbit: true,
            },
            katalog[2],
          ),
        ),
      );
    });

    [
      ["Informasi kunjungan", "informasi-kunjungan", "lokasi"],
      ["Informasi kegiatan jamaah", "informasi-kegiatan-jamaah", "percakapan"],
    ].forEach((layanan, i) =>
      tambah("layanan", {
        judul: layanan[0],
        slug: layanan[1],
        ikon: layanan[2],
        ringkasan:
          "Contoh pola penyajian layanan. Ketentuan, jadwal layanan, dan kontak pengelola belum dikonfirmasi.",
        tentang:
          "<p>Halaman ini disiapkan untuk menjelaskan layanan yang telah dikonfirmasi pengurus. Informasi tentang pihak yang melayani, persyaratan, dan cakupan layanan belum diberikan.</p>",
        langkah_akses: [
          "Periksa informasi layanan resmi setelah tersedia.",
          "Hubungi kontak layanan yang telah dikonfirmasi.",
          "Ikuti ketentuan layanan sesuai arahan pengurus.",
        ].join("\n"),
        urutan: i + 1,
        contoh: true,
        terbit: true,
      }),
    );

    tambah("donasi", {
      langkah: [
        "Tunggu informasi kanal dan tujuan donasi resmi.",
        "Periksa kembali nama penerima sebelum menyelesaikan transaksi.",
        "Simpan bukti transaksi dan konfirmasikan melalui kontak resmi jika diperlukan.",
      ].join("\n"),
      contoh: true,
    });
  },
  (app) => {
    [
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
      "agenda",
      "bidang",
      "pengurus",
      "visi_misi",
      "tonggak_sejarah",
      "sejarah",
      "arsip_kegiatan",
      "profil",
      "kontak",
    ].forEach((koleksi) => {
      app
        .findRecordsByFilter(koleksi, "id != ''", "", 0, 0)
        .forEach((record) => app.delete(record));
    });
  },
);
