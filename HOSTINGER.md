# Deploy ke Hostinger

Project ini adalah app React + Vite statis. Struktur domain yang dipakai:

- `kinaraland.com` untuk company profile PT Kinara Land Indonesia.
- `rivere.kinaraland.com` untuk landing page Rivere Kostaycation IPB.

Untuk Hostinger, ada dua jalur yang masuk akal:

1. `Node.js Web App + GitHub import`
2. `GitHub Actions + FTP deploy`

`public/.htaccess` sudah ada untuk fallback routing SPA, jadi route React tetap diarahkan ke `index.html`.

## Opsi 1: Hostinger Node.js Web App

Pakai ini jika paket hosting kamu mendukung fitur Node.js Web App di hPanel.

Langkah:

1. Push project ini ke repository GitHub.
2. Di hPanel buka `Websites -> Add Website -> Node.js Apps`.
3. Pilih `Import Git Repository`.
4. Hubungkan akun GitHub dan pilih repository ini.
5. Saat diminta build settings, pakai:
   - Build command: `npm run build:hostinger`
   - Output directory: `dist`
   - Node.js version: `20.x` atau `22.x`
6. Deploy.

Build `npm run build:hostinger` menghasilkan:

- `dist/` sebagai document root `kinaraland.com`.
- `dist/rivere/` sebagai document root `rivere.kinaraland.com`.
- `/cs1` sampai `/cs4` tetap tersedia di subdomain Rivere melalui route SPA, jadi tidak perlu folder deploy terpisah.

## Opsi 2: GitHub Actions ke FTP Hostinger

Pakai ini jika paket kamu tidak punya fitur Node.js Web App, atau kamu ingin deploy otomatis ke `public_html` setiap `push` ke branch `main`.

Workflow sudah disiapkan di `.github/workflows/hostinger-deploy.yml`.

Tambahkan GitHub repository secrets ini:

- `HOSTINGER_FTP_SERVER`
- `HOSTINGER_FTP_USERNAME`
- `HOSTINGER_FTP_PASSWORD`

Workflow mengupload seluruh isi `dist/` ke `/public_html/`. Setelah upload:

- `public_html/` melayani `kinaraland.com`.
- `public_html/rivere/` melayani `rivere.kinaraland.com`.

Di hPanel Hostinger, buat subdomain `rivere` dan arahkan document root/subdomain folder ke `public_html/rivere`.

## DNS untuk Subdomain Rivere

Jika domain memakai nameserver Hostinger (`ns1.dns-parking.com` dan `ns2.dns-parking.com`), cara paling aman adalah membuat subdomain lewat hPanel:

1. Buka `Domains -> Subdomains`.
2. Pilih domain `kinaraland.com`.
3. Buat subdomain `rivere`.
4. Set folder/document root ke `public_html/rivere`.
5. Tunggu propagasi DNS, lalu cek `https://rivere.kinaraland.com/`.

Kalau DNS diset manual, buat record:

- Type: `CNAME`
- Name: `rivere`
- Target: `kinaraland.com`

Atau gunakan `A` record ke IP hosting Hostinger yang sama dengan root domain jika hPanel memberi instruksi seperti itu. Jangan hapus record `MX` email.

## Cek Sebelum Go-Live

- `public/robots.txt` dan `public/sitemap.xml` default diarahkan ke company profile. Saat `npm run build:hostinger`, build akan menghasilkan sitemap/robots yang berbeda untuk root dan subdomain Rivere.
- Build khusus Hostinger ada di script `npm run build:hostinger`.
- Untuk tes lokal hasil build Hostinger, jalankan `npm run build:hostinger` lalu upload isi folder `dist/`.
- Jika halaman hanya tampil di hero dan tidak bisa scroll, biasanya HTML lama masih tercache CDN sehingga menunjuk file JS/CSS lama. Purge cache Hostinger/CDN, lalu pastikan file `.htaccess`, folder `assets/`, dan file `index.html` dari build terbaru sudah ter-upload ke folder yang sama.

## Heat Tracking Gratis dengan Microsoft Clarity

Heatmap/session recording utama memakai Microsoft Clarity. Clarity gratis dan hanya aktif jika `VITE_CLARITY_PROJECT_ID` diisi saat build. Tambahkan Project ID dari dashboard Clarity ke environment sebelum menjalankan build:

```bash
VITE_CLARITY_PROJECT_ID=xq9g30oaku npm run build:hostinger
```

Jika memakai GitHub Actions, simpan Project ID sebagai repository secret `VITE_CLARITY_PROJECT_ID`. Workflow deploy sudah membaca secret tersebut saat build. Tracking sengaja tidak aktif di `localhost`, `/login`, dan `/dashboard` agar data admin tidak ikut terekam.

Di dashboard admin, panel `Microsoft Clarity Heatmap dan Session Recording` berisi status Project ID, link ke Clarity, URL test, dan daftar halaman yang direkam.

Cara melihat heatmap:

1. Buka `https://clarity.microsoft.com/`.
2. Pilih project Rivere/Kinara.
3. Masuk menu `Heatmaps` untuk klik dan scroll map.
4. Masuk menu `Recordings` untuk melihat sesi visitor.
5. Filter URL dengan domain `rivere.kinaraland.com`.

## Hotjar Heat Tracking Optional

Hotjar bisa dipakai jika nanti dibutuhkan, tetapi bukan tracking utama di build ini. Untuk memakai Hotjar, isi `VITE_HOTJAR_ID` sebelum build dan render kembali `HotjarTracker` di `src/App.jsx`.

## Contentsquare UXA Tracking

Tracker Contentsquare belum diaktifkan di app shell. Saat ini tracking heatmap memakai Microsoft Clarity saja supaya tidak mengulang masalah scroll lock dari script eksternal lain. File tracker Contentsquare tetap ada di kode jika nanti benar-benar dibutuhkan.

## Visitor Analytics Global

Dashboard admin memakai endpoint PHP di:

- `/api/analytics.php`

Setelah deploy, setiap pageview dari visitor akan dikirim ke endpoint tersebut dan disimpan server-side di:

- `/public_html/.analytics-data/visitor-analytics.json`

Folder `.analytics-data` sengaja di-exclude dari GitHub Actions FTP deploy supaya data visitor tidak terhapus saat deploy ulang. Endpoint akan otomatis membuat folder dan file JSON saat pageview pertama masuk.

Checklist setelah deploy:

1. Buka website dari browser biasa.
2. Buka `https://domain-kamu.com/api/analytics.php`.
3. Pastikan respons berupa JSON dan field `source` bernilai `server`.
4. Login dashboard admin, lalu cek panel `Ringkasan Visitor Website`.
5. Pastikan `Sumber data` berubah menjadi `Global dari server analytics`.

Kalau dashboard masih menampilkan `Fallback lokal di browser admin`, biasanya penyebabnya:

- Hosting tidak menjalankan PHP untuk file di `/api/analytics.php`.
- Permission folder `public_html` tidak mengizinkan PHP membuat `.analytics-data`.
- Website dideploy ke subfolder, tetapi `VITE_ANALYTICS_API_URL` belum disesuaikan.

## Blog System Hostinger

Blog dashboard sudah memakai endpoint PHP:

- `/api/blog.php`

Setelah deploy ke Hostinger, admin dapat login ke `/dashboard`, membuat draft, publish artikel, edit, dan hapus artikel. Data blog akan disimpan server-side di:

- `/public_html/.blog-data/blog-posts.json`

Gambar blog yang diupload dari dashboard akan disimpan di:

- `/public_html/images/blog-uploads/`

Folder `.blog-data` sengaja di-exclude dari GitHub Actions FTP deploy supaya artikel yang sudah dibuat dari dashboard tidak hilang saat upload ulang. Endpoint akan otomatis membuat folder data dan folder upload saat request pertama.

Jika upload manual lewat File Manager/FTP, jangan hapus folder berikut setelah blog mulai dipakai:

- `.blog-data/`
- `images/blog-uploads/`

Kunci API admin default:

```txt
RivereBlog2026!
```

Frontend memakai `VITE_BLOG_ADMIN_KEY`, sedangkan PHP membaca env `BLOG_ADMIN_KEY` jika tersedia. Jika kunci diubah, pastikan keduanya sama. Untuk shared hosting tanpa env server, biarkan default atau ubah manual konstanta `DEFAULT_ADMIN_KEY` di `public/api/blog.php` sebelum build.

Checklist setelah deploy:

1. Buka `https://rivere.kinaraland.com/api/blog.php`.
2. Pastikan respons JSON berisi `items`.
3. Login `/dashboard`.
4. Simpan draft artikel.
5. Publish artikel.
6. Buka `/blog/` dan `/blog/slug-artikel/` dari browser biasa.

Jika publish gagal, biasanya penyebabnya:

- Hosting tidak menjalankan PHP untuk `/api/blog.php`.
- Permission `public_html` tidak mengizinkan PHP membuat `.blog-data` atau `images/blog-uploads`.
- `VITE_BLOG_ADMIN_KEY` tidak sama dengan `BLOG_ADMIN_KEY` di server.
