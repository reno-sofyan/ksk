import { ZodError } from 'zod';

export function notFound(_req, res) {
  return res.status(404).json({ message: 'Route not found' });
}

export function errorHandler(error, _req, res, _next) {
  if (error instanceof ZodError) {
    return res.status(422).json({
      message: 'Validation failed',
      errors: error.flatten()
    });
  }

  if (error.message === 'POST_NOT_FOUND') {
    return res.status(404).json({ message: 'Post not found' });
  }

  if (error.message === 'SLUG_ALREADY_EXISTS') {
    return res.status(409).json({ message: 'Slug already exists' });
  }

  if (error.message?.includes('Thumbnail must be an image')) {
    return res.status(422).json({ message: error.message });
  }

  console.error(error);

  return res.status(500).json({
    message: 'Internal server error'
  });
}
