import { query } from '../../config/db.js';

const postFields = `
  id, title, slug, content, excerpt, thumbnail_url, status,
  meta_title, meta_description, created_at, updated_at
`;

export async function countPublishedPosts({ search = '' }) {
  const params = [];
  let where = "WHERE status = 'published'";

  if (search) {
    params.push(`%${search}%`);
    where += ` AND title ILIKE $${params.length}`;
  }

  const result = await query(`SELECT COUNT(*)::int AS total FROM posts ${where}`, params);
  return result.rows[0].total;
}

export async function findPublishedPosts({ page = 1, limit = 10, search = '' }) {
  const offset = (page - 1) * limit;
  const params = [];
  let where = "WHERE status = 'published'";

  if (search) {
    params.push(`%${search}%`);
    where += ` AND title ILIKE $${params.length}`;
  }

  params.push(limit, offset);

  const result = await query(
    `
      SELECT ${postFields}
      FROM posts
      ${where}
      ORDER BY created_at DESC
      LIMIT $${params.length - 1}
      OFFSET $${params.length}
    `,
    params
  );

  return result.rows;
}

export async function findAllPosts({ page = 1, limit = 20, search = '' }) {
  const offset = (page - 1) * limit;
  const params = [];
  let where = '';

  if (search) {
    params.push(`%${search}%`);
    where = `WHERE title ILIKE $${params.length}`;
  }

  params.push(limit, offset);

  const result = await query(
    `
      SELECT ${postFields}
      FROM posts
      ${where}
      ORDER BY created_at DESC
      LIMIT $${params.length - 1}
      OFFSET $${params.length}
    `,
    params
  );

  return result.rows;
}

export async function findPublishedPostBySlug(slug) {
  const result = await query(
    `SELECT ${postFields} FROM posts WHERE slug = $1 AND status = 'published' LIMIT 1`,
    [slug]
  );

  return result.rows[0] || null;
}

export async function findPostById(id) {
  const result = await query(`SELECT ${postFields} FROM posts WHERE id = $1 LIMIT 1`, [id]);
  return result.rows[0] || null;
}

export async function findPostBySlug(slug) {
  const result = await query(`SELECT ${postFields} FROM posts WHERE slug = $1 LIMIT 1`, [slug]);
  return result.rows[0] || null;
}

export async function createPost(data) {
  const result = await query(
    `
      INSERT INTO posts (
        title, slug, content, excerpt, thumbnail_url, status,
        meta_title, meta_description
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING ${postFields}
    `,
    [
      data.title,
      data.slug,
      data.content,
      data.excerpt,
      data.thumbnail_url,
      data.status,
      data.meta_title,
      data.meta_description
    ]
  );

  return result.rows[0];
}

export async function updatePost(id, data) {
  const result = await query(
    `
      UPDATE posts
      SET
        title = $2,
        slug = $3,
        content = $4,
        excerpt = $5,
        thumbnail_url = $6,
        status = $7,
        meta_title = $8,
        meta_description = $9
      WHERE id = $1
      RETURNING ${postFields}
    `,
    [
      id,
      data.title,
      data.slug,
      data.content,
      data.excerpt,
      data.thumbnail_url,
      data.status,
      data.meta_title,
      data.meta_description
    ]
  );

  return result.rows[0] || null;
}

export async function deletePost(id) {
  const result = await query(`DELETE FROM posts WHERE id = $1 RETURNING id`, [id]);
  return result.rowCount > 0;
}
