# Deploy ke Hostinger

Project ini adalah app React + Vite statis. Untuk Hostinger, ada dua jalur yang masuk akal:

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

## Opsi 2: GitHub Actions ke FTP Hostinger

Pakai ini jika paket kamu tidak punya fitur Node.js Web App, atau kamu ingin deploy otomatis ke `public_html` setiap `push` ke branch `main`.

Workflow sudah disiapkan di `.github/workflows/hostinger-deploy.yml`.

Tambahkan GitHub repository secrets ini:

- `HOSTINGER_FTP_SERVER`
- `HOSTINGER_FTP_USERNAME`
- `HOSTINGER_FTP_PASSWORD`

Kalau website kamu bukan di root domain, ubah `server-dir` pada workflow dari `/public_html/` ke folder target yang benar.

## Cek Sebelum Go-Live

- `public/robots.txt` dan `public/sitemap.xml` masih mengarah ke `https://kinaraland.com/`. Ganti kalau domain final kamu berbeda.
- Build khusus Hostinger ada di script `npm run build:hostinger`.
- Untuk tes lokal hasil build Hostinger, jalankan `npm run build:hostinger` lalu upload isi folder `dist/`.

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
