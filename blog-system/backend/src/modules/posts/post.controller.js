import * as service from './post.service.js';

function getUploadedThumbnailUrl(req) {
  if (!req.file) {
    return null;
  }

  const baseUrl = process.env.UPLOAD_BASE_URL || `${req.protocol}://${req.get('host')}/uploads`;
  return `${baseUrl}/${req.file.filename}`;
}

export async function listPublishedPosts(req, res, next) {
  try {
    const result = await service.listPublishedPosts(req.query);
    return res.json(result);
  } catch (error) {
    return next(error);
  }
}

export async function listAdminPosts(req, res, next) {
  try {
    const result = await service.listAdminPosts(req.query);
    return res.json(result);
  } catch (error) {
    return next(error);
  }
}

export async function getPublishedPostBySlug(req, res, next) {
  try {
    const post = await service.getPublishedPostBySlug(req.params.slug);
    return res.json({ data: post });
  } catch (error) {
    return next(error);
  }
}

export async function createPost(req, res, next) {
  try {
    const post = await service.createPost(req.body, getUploadedThumbnailUrl(req));
    return res.status(201).json({ data: post });
  } catch (error) {
    return next(error);
  }
}

export async function updatePost(req, res, next) {
  try {
    const post = await service.updatePost(req.params.id, req.body, getUploadedThumbnailUrl(req));
    return res.json({ data: post });
  } catch (error) {
    return next(error);
  }
}

export async function deletePost(req, res, next) {
  try {
    const result = await service.deletePost(req.params.id);
    return res.json({ data: result });
  } catch (error) {
    return next(error);
  }
}
