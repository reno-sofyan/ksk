# Blog System Next.js + Express + PostgreSQL

Scaffold ini dibuat terpisah dari website Vite yang sedang berjalan agar requirement Next.js SSR, Express API, dan PostgreSQL bisa dipenuhi tanpa mengubah struktur deploy Hostinger saat ini.

## Struktur Folder

```txt
blog-system/
  database/
    schema.sql
  backend/
    .env.example
    package.json
    src/
      app.js
      server.js
      config/db.js
      middleware/
        auth.middleware.js
        error.middleware.js
        upload.middleware.js
      modules/posts/
        post.controller.js
        post.repository.js
        post.routes.js
        post.service.js
      utils/slug.js
  frontend/
    .env.example
    package.json
    next.config.mjs
    app/
      layout.tsx
      globals.css
      blog/page.tsx
      blog/[slug]/page.tsx
      admin/blog/page.tsx
    components/
      admin/BlogPostForm.tsx
      admin/RichTextEditor.tsx
      blog/PostCard.tsx
    lib/
      api.ts
      types.ts
```

## PostgreSQL

Jalankan query:

```bash
psql "postgres://HP15@127.0.0.1:5433/kinara_blog" -f database/schema.sql
```

Table utama:

```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  thumbnail_url TEXT,
  status post_status NOT NULL DEFAULT 'draft',
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## Backend Express

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Endpoint:

```txt
POST   /api/auth/login
GET    /api/posts?page=1&limit=10&search=ipb
GET    /api/posts/:slug
GET    /api/admin/posts
POST   /api/posts
PUT    /api/posts/:id
DELETE /api/posts/:id
```

Admin endpoint membutuhkan header:

```txt
Authorization: Bearer <token>
```

Token didapat dari:

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@kinaraland.com","password":"change-this-password"}'
```

Contoh create post dengan thumbnail:

```bash
curl -X POST http://localhost:4000/api/posts \
  -H "Authorization: Bearer <token>" \
  -F "title=Investasi Kost Dekat IPB" \
  -F "excerpt=Panduan singkat membaca potensi investasi kost dekat IPB." \
  -F "content=<p>Konten artikel rich text.</p>" \
  -F "status=published" \
  -F "meta_title=Investasi Kost Dekat IPB" \
  -F "meta_description=Panduan investasi kost dekat IPB untuk calon investor." \
  -F "thumbnail=@/path/to/image.jpg"
```

## Frontend Next.js

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Routes:

```txt
/blog
/blog/[slug]
/admin/blog
```

Fitur SEO:

- `/blog/[slug]` memakai server rendering dengan `fetch(..., { cache: 'no-store' })`.
- `generateMetadata` mengisi meta title, meta description, canonical, Open Graph, dan Twitter card.
- JSON-LD `schema.org/Article` ditambahkan di halaman detail.

## Catatan Security

- Backend memakai middleware admin auth dengan JWT.
- Validasi input memakai Zod.
- Slug dibuat otomatis dari title dan dijaga unique di service layer plus unique index PostgreSQL.
- Konten HTML dari rich text editor disanitasi di backend.
- Upload thumbnail dibatasi hanya image dan maksimal 5 MB.

Untuk production, ganti `ADMIN_JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `DATABASE_URL`, `PUBLIC_BASE_URL`, dan `UPLOAD_BASE_URL`.
