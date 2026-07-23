'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import RichTextEditor from './RichTextEditor';
import { API_URL } from '@/lib/api';
import type { BlogPost, PostStatus } from '@/lib/types';

type FormState = {
  title: string;
  content: string;
  excerpt: string;
  status: PostStatus;
  meta_title: string;
  meta_description: string;
};

const emptyForm: FormState = {
  title: '',
  content: '',
  excerpt: '',
  status: 'draft',
  meta_title: '',
  meta_description: ''
};

function createSlug(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export default function BlogPostForm() {
  const [token, setToken] = useState('');
  const [login, setLogin] = useState({ email: '', password: '' });
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const slugPreview = useMemo(() => createSlug(form.title), [form.title]);

  async function request(path: string, init: RequestInit = {}) {
    const response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(init.headers || {})
      }
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      throw new Error(error?.message || `Request failed: ${response.status}`);
    }

    return response.json();
  }

  async function loadPosts() {
    if (!token) return;

    const result = await request('/api/admin/posts');
    setPosts(result.items || []);
  }

  useEffect(() => {
    const savedToken = window.localStorage.getItem('blog_admin_token') || '';
    setToken(savedToken);
  }, []);

  useEffect(() => {
    loadPosts().catch(() => undefined);
  }, [token]);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(login)
      });

      if (!response.ok) {
        throw new Error('Login gagal');
      }

      const data = await response.json();
      window.localStorage.setItem('blog_admin_token', data.token);
      setToken(data.token);
      setMessage('Login berhasil.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Login gagal');
    } finally {
      setLoading(false);
    }
  }

  function editPost(post: BlogPost) {
    setEditingPost(post);
    setForm({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      status: post.status,
      meta_title: post.meta_title || '',
      meta_description: post.meta_description || ''
    });
    setThumbnail(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetForm() {
    setEditingPost(null);
    setForm(emptyForm);
    setThumbnail(null);
  }

  async function submitPost(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      if (thumbnail) {
        formData.append('thumbnail', thumbnail);
      }

      const path = editingPost ? `/api/posts/${editingPost.id}` : '/api/posts';
      const method = editingPost ? 'PUT' : 'POST';

      await request(path, {
        method,
        body: formData
      });

      setMessage(editingPost ? 'Artikel berhasil diupdate.' : 'Artikel berhasil dibuat.');
      resetForm();
      await loadPosts();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Gagal menyimpan artikel');
    } finally {
      setLoading(false);
    }
  }

  async function deletePost(post: BlogPost) {
    if (!window.confirm(`Hapus artikel "${post.title}"?`)) {
      return;
    }

    await request(`/api/posts/${post.id}`, { method: 'DELETE' });
    await loadPosts();
  }

  async function toggleStatus(post: BlogPost) {
    const nextStatus = post.status === 'published' ? 'draft' : 'published';

    await request(`/api/posts/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        thumbnail_url: post.thumbnail_url || '',
        meta_title: post.meta_title || '',
        meta_description: post.meta_description || '',
        status: nextStatus
      })
    });

    await loadPosts();
  }

  return (
    <div className="admin-layout">
      <section className="card card-body">
        <p className="eyebrow">{editingPost ? 'Edit Artikel' : 'Create Post'}</p>
        <h2>{editingPost ? editingPost.title : 'Tulis artikel baru'}</h2>

        {!token ? (
          <form onSubmit={handleLogin} className="form-grid">
            <div className="field">
              <label htmlFor="email">Admin Email</label>
              <input
                id="email"
                type="email"
                value={login.email}
                onChange={(event) => setLogin({ ...login, email: event.target.value })}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={login.password}
                onChange={(event) => setLogin({ ...login, password: event.target.value })}
                required
              />
            </div>
            <div className="field full">
              <button className="button" disabled={loading} type="submit">
                Login Admin
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={submitPost} className="form-grid">
            <div className="field full">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                required
              />
              <span className="meta">Slug otomatis: /blog/{slugPreview || 'judul-artikel'}</span>
            </div>
            <div className="field full">
              <label htmlFor="excerpt">Excerpt</label>
              <textarea
                id="excerpt"
                value={form.excerpt}
                onChange={(event) => setForm({ ...form, excerpt: event.target.value })}
                required
              />
            </div>
            <div className="field full">
              <label>Content</label>
              <RichTextEditor
                value={form.content}
                onChange={(content) => setForm({ ...form, content })}
              />
            </div>
            <div className="field">
              <label htmlFor="thumbnail">Thumbnail Upload</label>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={(event) => setThumbnail(event.target.files?.[0] || null)}
              />
            </div>
            <div className="field">
              <label htmlFor="status">Publish / Draft</label>
              <select
                id="status"
                value={form.status}
                onChange={(event) => setForm({ ...form, status: event.target.value as PostStatus })}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="meta-title">Meta Title</label>
              <input
                id="meta-title"
                value={form.meta_title}
                onChange={(event) => setForm({ ...form, meta_title: event.target.value })}
              />
            </div>
            <div className="field">
              <label htmlFor="meta-description">Meta Description</label>
              <input
                id="meta-description"
                value={form.meta_description}
                onChange={(event) => setForm({ ...form, meta_description: event.target.value })}
              />
            </div>
            <div className="field full row-actions">
              <button className="button" disabled={loading} type="submit">
                {editingPost ? 'Update Post' : 'Create Post'}
              </button>
              {editingPost ? (
                <button className="button secondary" type="button" onClick={resetForm}>
                  Batal Edit
                </button>
              ) : null}
            </div>
          </form>
        )}
        {message ? <p className="meta">{message}</p> : null}
      </section>

      <section className="card card-body">
        <p className="eyebrow">Admin Dashboard Blog</p>
        <h2>Daftar Artikel</h2>
        {token ? (
          <button className="button secondary" type="button" onClick={loadPosts}>
            Refresh
          </button>
        ) : null}
        <div>
          {posts.map((post) => (
            <article key={post.id} className="post-row">
              <div>
                <strong>{post.title}</strong>
                <p className="meta">/{post.slug} - {post.status}</p>
              </div>
              <div className="row-actions">
                <button className="button secondary" type="button" onClick={() => editPost(post)}>
                  Edit
                </button>
                <button className="button secondary" type="button" onClick={() => toggleStatus(post)}>
                  {post.status === 'published' ? 'Set Draft' : 'Publish'}
                </button>
                <button className="button danger" type="button" onClick={() => deletePost(post)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
          {!posts.length ? <p className="meta">Belum ada artikel atau belum login.</p> : null}
        </div>
      </section>
    </div>
  );
}
