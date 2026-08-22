import React, { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  FileText,
  Globe2,
  ImagePlus,
  Link as LinkIcon,
  LogOut,
  Plus,
  RefreshCcw,
  Save,
  Search,
  Send,
  Trash2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import ResponsiveImage from "@/components/ResponsiveImage.jsx";
import RichTextEditor from "@/components/RichTextEditor.jsx";
import { legacyPostToHtml } from "@/lib/blogContent.js";
import { SALES_ANCHORS } from "@/data/salesAnchors.js";
import {
  buildBlogPostExport,
  deleteBlogDraft,
  deletePublishedBlogPost,
  deleteServerBlogDraft,
  deleteServerPublishedBlogPost,
  fetchServerBlogDrafts,
  fetchServerPublishedBlogPosts,
  getPublishChecks,
  publishServerBlogPost,
  publishBlogPost,
  readBlogDrafts,
  readPublishedBlogPosts,
  saveServerBlogDraft,
  saveBlogDraft,
  slugify
} from "@/lib/adminBlogStore.js";
import { fetchGlobalVisitorAnalytics, getVisitorAnalytics, resetVisitorAnalytics } from "@/lib/visitorAnalytics.js";

const DEFAULT_BLOG_FORM = {
  title: "",
  seoTitle: "",
  slug: "",
  description: "",
  excerpt: "",
  category: "Rivere Insights",
  image: "/images/rivere/Design%201/1.png",
  imageAlt: "Visual Rivere Kostaycation IPB",
  keywords: "investasi kost dekat IPB, Rivere Kostaycation IPB, properti Ring 1 IPB",
  tags: "investasi properti, Rivere, kost dekat IPB",
  author: "Tim Rivere Kostaycation IPB",
  datePublished: new Date().toISOString().slice(0, 10),
  status: "draft",
  contentHtml: "",
  focusKeyword: "",
  canonicalUrl: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  robotsIndex: true,
  robotsFollow: true,
  intro: "",
  sectionHeading: "Pembahasan Utama",
  body: "",
  faqQuestion1: "",
  faqAnswer1: "",
  faqQuestion2: "",
  faqAnswer2: ""
};

const MAX_BLOG_IMAGE_WIDTH = 1600;
const BLOG_IMAGE_QUALITY = 0.84;
const CLARITY_PROJECT_ID = String(import.meta.env.VITE_CLARITY_PROJECT_ID || "").trim();
const CLARITY_DASHBOARD_URL = "https://clarity.microsoft.com/";
const CLARITY_EXCLUDED_ROUTES = ["/login", "/dashboard"];

const formatNumber = (value) => new Intl.NumberFormat("id-ID").format(value || 0);

const formatDateTime = (value) => {
  if (!value) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
};

const formatDate = (value) => new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric"
}).format(new Date(`${value}T00:00:00+07:00`));

const getOrigin = () => {
  if (typeof window === "undefined") {
    return "https://kinaraland.com";
  }

  return window.location.origin;
};

const Field = ({ id, label, helper, children }) => (
  <div>
    <Label htmlFor={id} className="text-sm font-semibold text-primary">
      {label}
    </Label>
    <div className="mt-2">{children}</div>
    {helper ? <p className="mt-2 text-xs leading-5 text-muted-foreground">{helper}</p> : null}
  </div>
);

const StatCard = ({ icon: Icon, label, value, helper }) => (
  <div className="border border-primary/10 bg-white p-5 shadow-sm">
    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-accent">
      <Icon className="h-5 w-5" aria-hidden="true" />
    </div>
    <p className="text-sm font-semibold text-muted-foreground">{label}</p>
    <p className="mt-2 text-3xl font-bold text-primary">{value}</p>
    {helper ? <p className="mt-2 text-xs leading-5 text-muted-foreground">{helper}</p> : null}
  </div>
);

const DashboardPanel = ({ eyebrow, title, description, children, action, className = "" }) => (
  <section className={`border border-primary/10 bg-card p-5 shadow-sm sm:p-6 lg:p-8 ${className}`}>
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-normal text-accent">{eyebrow}</p> : null}
        <h2 className="mt-2 text-2xl font-bold text-primary">{title}</h2>
        {description ? <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
    {children}
  </section>
);

function blogPostToForm(post) {
  const [firstFaq, secondFaq] = post.faq || [];
  const firstSection = post.sections?.[0];

  return {
    ...DEFAULT_BLOG_FORM,
    id: post.id,
    createdAt: post.createdAt,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    title: post.title || "",
    seoTitle: post.seoTitle || "",
    slug: post.slug || "",
    description: post.description || "",
    excerpt: post.excerpt || "",
    category: post.category || DEFAULT_BLOG_FORM.category,
    image: post.image || DEFAULT_BLOG_FORM.image,
    imageAlt: post.imageAlt || DEFAULT_BLOG_FORM.imageAlt,
    keywords: Array.isArray(post.keywords) ? post.keywords.join(", ") : DEFAULT_BLOG_FORM.keywords,
    tags: Array.isArray(post.tags) ? post.tags.join(", ") : (Array.isArray(post.keywords) ? post.keywords.join(", ") : ""),
    author: post.author || DEFAULT_BLOG_FORM.author,
    datePublished: post.datePublished || DEFAULT_BLOG_FORM.datePublished,
    status: post.status || "published",
    contentHtml: post.contentHtml || legacyPostToHtml(post),
    focusKeyword: post.focusKeyword || "",
    canonicalUrl: post.canonicalUrl || "",
    ogTitle: post.ogTitle || "",
    ogDescription: post.ogDescription || "",
    ogImage: post.ogImage || "",
    robotsIndex: post.robotsIndex !== false,
    robotsFollow: post.robotsFollow !== false,
    intro: Array.isArray(post.intro) ? post.intro.join("\n\n") : "",
    sectionHeading: firstSection?.heading || DEFAULT_BLOG_FORM.sectionHeading,
    body: Array.isArray(post.sections)
      ? post.sections.flatMap((section) => section.paragraphs || []).join("\n\n")
      : "",
    faqQuestion1: firstFaq?.question || "",
    faqAnswer1: firstFaq?.answer || "",
    faqQuestion2: secondFaq?.question || "",
    faqAnswer2: secondFaq?.answer || ""
  };
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Gagal membaca file gambar."));
    reader.readAsDataURL(file);
  });
}

function loadImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Gambar tidak bisa diproses."));
    image.src = dataUrl;
  });
}

async function compressImageFile(file) {
  if (!file.type.startsWith("image/")) {
    throw new Error("File harus berupa gambar.");
  }

  const dataUrl = await readFileAsDataUrl(file);
  const image = await loadImage(dataUrl);
  const scale = Math.min(1, MAX_BLOG_IMAGE_WIDTH / image.width);
  const width = Math.round(image.width * scale);
  const height = Math.round(image.height * scale);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  return canvas.toDataURL("image/jpeg", BLOG_IMAGE_QUALITY);
}

const BlogFormatPreview = ({ post }) => {
  const title = post.title || "Judul artikel akan tampil di sini";
  const excerpt = post.excerpt || post.description || "Ringkasan artikel untuk kartu blog dan header artikel akan tampil di sini.";
  const category = post.category || "Rivere Insights";
  const image = post.image || DEFAULT_BLOG_FORM.image;
  const imageAlt = post.imageAlt || DEFAULT_BLOG_FORM.imageAlt;
  const intro = post.intro.length ? post.intro : ["Paragraf intro artikel akan tampil dengan format teks yang sama seperti halaman artikel blog."];
  const sections = post.sections.some((section) => section.paragraphs.length)
    ? post.sections
    : [{ heading: post.sections[0]?.heading || "Pembahasan Utama", paragraphs: ["Isi artikel akan tampil sebagai paragraf di bawah heading section, mengikuti format halaman artikel blog."] }];

  return (
    <div className="border border-primary/10 bg-white p-5">
      <h3 className="font-bold text-primary">Preview Format Blog</h3>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">
        Preview ini mengikuti struktur kartu blog dan halaman artikel publik.
      </p>

      <div className="mt-5 overflow-hidden rounded-lg bg-secondary">
        <ResponsiveImage
          src={image}
          alt={imageAlt}
          className="aspect-[16/10] w-full object-cover"
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1024px) 320px, 100vw"
        />
      </div>

      <div className="pt-5">
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-muted-foreground">
          <span className="text-primary">{category}</span>
          <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {post.readTime}
          </span>
        </div>
        <h4 className="text-xl font-bold leading-tight text-primary">{title}</h4>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">{excerpt}</p>
      </div>

      <div className="mt-6 border-t border-border pt-5">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            {formatDate(post.datePublished)}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {post.readTime}
          </span>
        </div>

        <div className="mt-5 space-y-3 text-sm leading-7 text-foreground/80">
          {intro.slice(0, 2).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>

        {sections.slice(0, 2).map((section, index) => (
          <section key={`${section.heading}-${index}`} className="pt-6">
            <h5 className="text-lg font-bold text-primary">{section.heading}</h5>
            <div className="mt-3 space-y-3 text-sm leading-7 text-foreground/80">
              {section.paragraphs.slice(0, 2).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>
        ))}

        {post.faq.length ? (
          <section className="pt-6">
            <h5 className="text-lg font-bold text-primary">Pertanyaan Umum</h5>
            <div className="mt-3 divide-y divide-border border-y border-border">
              {post.faq.slice(0, 2).map((item) => (
                <div key={item.question} className="py-3">
                  <p className="font-semibold text-primary">{item.question}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [analytics, setAnalytics] = useState(() => getVisitorAnalytics());
  const [analyticsStatus, setAnalyticsStatus] = useState("Memuat analytics...");
  const [drafts, setDrafts] = useState(() => readBlogDrafts());
  const [publishedPosts, setPublishedPosts] = useState(() => readPublishedBlogPosts());
  const [blogSyncStatus, setBlogSyncStatus] = useState("Memuat data blog server...");
  const [form, setForm] = useState(DEFAULT_BLOG_FORM);
  const [slugTouched, setSlugTouched] = useState(false);
  const [copiedLabel, setCopiedLabel] = useState("");
  const [imageUploadError, setImageUploadError] = useState("");
  const origin = useMemo(() => getOrigin(), []);

  const publishChecks = useMemo(() => getPublishChecks(form), [form]);
  const slugConflict = useMemo(() => {
    if (!form.slug) return false;
    return [...drafts, ...publishedPosts].some((item) => item.slug === form.slug && item.id !== form.id);
  }, [drafts, publishedPosts, form.id, form.slug]);
  const canPublish = publishChecks.every((check) => check.pass) && !slugConflict;
  const blogPostExport = useMemo(() => buildBlogPostExport(form), [form]);
  const previewUrl = `${origin}/blog/${form.slug || "slug-artikel"}/`;
  const isUploadedImage = form.image.startsWith("data:image/");
  const clarityConfigured = CLARITY_PROJECT_ID.length > 0;
  const clarityTestUrl = `${origin}/?utm_source=admin-dashboard&utm_medium=clarity-test`;

  useEffect(() => {
    let isMounted = true;

    const refreshAnalytics = async () => {
      const localAnalytics = getVisitorAnalytics();

      if (isMounted) {
        setAnalytics(localAnalytics);
        setAnalyticsStatus("Fallback lokal di browser admin");
      }

      const globalAnalytics = await fetchGlobalVisitorAnalytics();

      if (isMounted && globalAnalytics) {
        setAnalytics(globalAnalytics);
        setAnalyticsStatus("Global dari server analytics");
      }
    };

    refreshAnalytics();
    const intervalId = window.setInterval(refreshAnalytics, 5000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const refreshBlogData = async () => {
      const [serverDrafts, serverPublishedPosts] = await Promise.all([
        fetchServerBlogDrafts(),
        fetchServerPublishedBlogPosts()
      ]);

      if (!isMounted) return;

      if (serverDrafts || serverPublishedPosts) {
        if (serverDrafts) setDrafts(serverDrafts);
        if (serverPublishedPosts) setPublishedPosts(serverPublishedPosts);
        setBlogSyncStatus("Server Hostinger aktif");
        return;
      }

      setBlogSyncStatus("Fallback lokal sampai API Hostinger aktif");
    };

    refreshBlogData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  const handleFieldChange = (field, value) => {
    setForm((current) => {
      const next = { ...current, [field]: value };

      if (field === "title" && !slugTouched) {
        next.slug = slugify(value);
      }

      return next;
    });
  };

  const handleSlugChange = (value) => {
    setSlugTouched(true);
    setForm((current) => ({ ...current, slug: slugify(value) }));
  };

  const handleSaveDraft = async () => {
    const next = saveBlogDraft(form);
    setDrafts(next);
    setSlugTouched(true);
    if (next[0]) {
      setForm((current) => ({ ...current, id: next[0].id, updatedAt: next[0].updatedAt }));
    }

    try {
      const serverDrafts = await saveServerBlogDraft(next[0] || form);
      setDrafts(serverDrafts);
      setBlogSyncStatus("Draft tersimpan ke server Hostinger");
      showCopiedState("Draft tersimpan ke server");
    } catch {
      setBlogSyncStatus("Fallback lokal sampai API Hostinger aktif");
      showCopiedState("Draft tersimpan lokal");
    }
  };

  const handleLoadDraft = (draft) => {
    setForm({ ...DEFAULT_BLOG_FORM, ...draft });
    setSlugTouched(Boolean(draft.slug));
    showCopiedState("Draft dibuka");
  };

  const handleLoadPublishedPost = (post) => {
    setForm(blogPostToForm(post));
    setSlugTouched(Boolean(post.slug));
    showCopiedState("Artikel dibuka untuk diedit");
  };

  const handleDeleteDraft = async (id) => {
    const next = deleteBlogDraft(id);
    setDrafts(next);

    try {
      const serverDrafts = await deleteServerBlogDraft(id);
      setDrafts(serverDrafts);
      setBlogSyncStatus("Draft dihapus dari server Hostinger");
    } catch {
      setBlogSyncStatus("Fallback lokal sampai API Hostinger aktif");
    }
  };

  const handleDeletePublishedPost = async (slug) => {
    const next = deletePublishedBlogPost(slug);
    setPublishedPosts(next);

    try {
      const serverPublishedPosts = await deleteServerPublishedBlogPost(slug);
      setPublishedPosts(serverPublishedPosts);
      setBlogSyncStatus("Artikel dihapus dari server Hostinger");
      showCopiedState("Artikel dihapus dari server");
    } catch {
      setBlogSyncStatus("Fallback lokal sampai API Hostinger aktif");
      showCopiedState("Artikel lokal dihapus");
    }
  };

  const handleNewDraft = () => {
    setForm(DEFAULT_BLOG_FORM);
    setSlugTouched(false);
    setImageUploadError("");
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    setImageUploadError("");

    try {
      const dataUrl = await compressImageFile(file);
      setForm((current) => ({
        ...current,
        image: dataUrl,
        imageAlt: current.imageAlt && current.imageAlt !== DEFAULT_BLOG_FORM.imageAlt
          ? current.imageAlt
          : `Foto blog ${file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ')}`
      }));
      showCopiedState("Foto blog diupload");
    } catch (error) {
      setImageUploadError(error.message || "Upload foto gagal.");
    }
  };

  const handleRemoveUploadedImage = () => {
    setForm((current) => ({ ...current, image: DEFAULT_BLOG_FORM.image }));
    setImageUploadError("");
  };

  const handlePublishBlogPost = async () => {
    if (!canPublish) {
      showCopiedState("Lengkapi field wajib sebelum publish");
      return;
    }

    const publishedExport = { ...blogPostExport, status: "published" };
    const nextPublishedPosts = publishBlogPost(publishedExport);
    const nextDrafts = saveBlogDraft(form);
    setPublishedPosts(nextPublishedPosts);
    setDrafts(nextDrafts);
    if (nextDrafts[0]) {
      setForm((current) => ({ ...current, id: nextDrafts[0].id, updatedAt: nextDrafts[0].updatedAt }));
    }

    try {
      const [serverPublishedPosts, serverDrafts] = await Promise.all([
        publishServerBlogPost(publishedExport),
        saveServerBlogDraft(nextDrafts[0] || form)
      ]);
      setPublishedPosts(serverPublishedPosts);
      setDrafts(serverDrafts);
      setBlogSyncStatus("Artikel dipublish ke server Hostinger");
      showCopiedState("Artikel berhasil dipublish ke server");
    } catch (error) {
      setBlogSyncStatus("Fallback lokal sampai API Hostinger aktif");
      showCopiedState(error.message || "Artikel dipublish lokal");
    }
  };

  const handleResetAnalytics = () => {
    resetVisitorAnalytics();
    setAnalytics(getVisitorAnalytics());
  };

  const showCopiedState = (label) => {
    setCopiedLabel(label);
    window.setTimeout(() => setCopiedLabel(""), 1800);
  };

  const copyText = async (value, label) => {
    try {
      await navigator.clipboard.writeText(value);
      showCopiedState(label);
    } catch {
      showCopiedState("Gagal copy");
    }
  };

  return (
    <div className="min-h-screen bg-secondary/45 text-foreground">
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-semibold text-accent">Admin Rivere Kostaycation IPB</p>
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Dashboard Sales, SEO, dan Visitor</h1>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Masuk sebagai <strong className="text-white">{user?.name || user?.email}</strong>
              {user?.role ? ` (${user.role})` : ""}.
            </p>
          </div>
          <Button
            variant="outline"
            className="w-fit border-white/20 bg-white/5 text-white hover:bg-accent hover:text-primary"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Keluar
          </Button>
        </div>
      </header>

      {copiedLabel ? (
        <div className="sticky top-0 z-50 border-b border-accent/30 bg-primary px-4 py-3 text-center text-sm font-semibold text-accent">
          {copiedLabel}
        </div>
      ) : null}

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <DashboardPanel
          className="order-4"
          eyebrow="Anchor Sales"
          title="Link Presentasi Cepat"
          description="Anchor dibuat simpel untuk membantu sales mengirim calon investor langsung ke bagian penting landing page."
          action={
            <Button
              variant="outline"
              className="border-primary/20 bg-white text-primary hover:bg-primary hover:text-accent"
              onClick={() => copyText(SALES_ANCHORS.map((anchor) => `${anchor.label}: ${origin}${anchor.href}`).join("\n"), "Semua anchor disalin")}
            >
              <Copy className="h-4 w-4" aria-hidden="true" />
              Copy Semua
            </Button>
          }
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SALES_ANCHORS.map((anchor) => {
              const url = `${origin}${anchor.href}`;

              return (
                <div key={anchor.sectionId} className="flex items-center justify-between gap-3 border border-primary/10 bg-white px-4 py-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-primary">{anchor.label}</p>
                    <p className="mt-1 truncate text-xs text-muted-foreground">{url}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <a
                      href={anchor.href}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-primary transition-colors hover:bg-primary hover:text-accent"
                      aria-label={`Buka ${anchor.label}`}
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-primary transition-colors hover:bg-primary hover:text-accent"
                      onClick={() => copyText(url, `${anchor.label} disalin`)}
                      aria-label={`Copy ${anchor.label}`}
                    >
                      <Copy className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </DashboardPanel>

        <DashboardPanel
          className="order-5"
          eyebrow="Visitor"
          title="Ringkasan Visitor Website"
          description="Panel ini membaca data global dari endpoint analytics server setelah deploy. Saat endpoint belum tersedia, dashboard otomatis menampilkan fallback lokal browser admin."
          action={
            <Button
              variant="outline"
              className="border-primary/20 bg-white text-primary hover:bg-primary hover:text-accent"
              onClick={handleResetAnalytics}
            >
              <RefreshCcw className="h-4 w-4" aria-hidden="true" />
              Reset Fallback Lokal
            </Button>
          }
        >
          <div className="mb-5 border border-primary/10 bg-white px-4 py-3 text-sm font-semibold text-primary">
            <p>
              Sumber data: <span className={analytics.source === "server" ? "text-primary" : "text-accent"}>{analyticsStatus}</span>
            </p>
            {analytics.lastUpdated ? (
              <p className="mt-1 text-xs font-medium text-muted-foreground">
                Update terakhir: {formatDateTime(analytics.lastUpdated)}
              </p>
            ) : null}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={CheckCircle2} label="Hari Ini" value={formatNumber(analytics.todayPageViews)} helper="Pageview pada tanggal hari ini." />
            <StatCard icon={BarChart3} label="7 Hari" value={formatNumber(analytics.last7DaysPageViews)} helper="Akumulasi pageview 7 hari terakhir." />
            <StatCard icon={Search} label="14 Hari" value={formatNumber(analytics.last14DaysPageViews)} helper="Akumulasi pageview 14 hari terakhir." />
            <StatCard icon={LinkIcon} label="1 Bulan" value={formatNumber(analytics.last30DaysPageViews)} helper="Akumulasi pageview 30 hari terakhir." />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="border border-primary/10 bg-white p-5">
              <h3 className="font-bold text-primary">Top Pages</h3>
              <div className="mt-4 grid gap-3">
                {analytics.topPages.length ? analytics.topPages.map((page) => (
                  <div key={page.path} className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-b-0 last:pb-0">
                    <span className="truncate text-sm font-medium text-foreground/80">{page.path}</span>
                    <span className="shrink-0 rounded-full bg-primary px-3 py-1 text-xs font-bold text-accent">{formatNumber(page.views)}</span>
                  </div>
                )) : <p className="text-sm text-muted-foreground">Belum ada data pageview.</p>}
              </div>
            </div>

            <div className="border border-primary/10 bg-white p-5">
              <h3 className="font-bold text-primary">Aktivitas Terbaru</h3>
              <div className="mt-4 grid gap-3">
                {analytics.recentEvents.length ? analytics.recentEvents.map((event) => (
                  <div key={event.id} className="border-b border-border pb-3 last:border-b-0 last:pb-0">
                    <p className="truncate text-sm font-semibold text-foreground/80">{event.pathname}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{formatDateTime(event.timestamp)}</p>
                  </div>
                )) : <p className="text-sm text-muted-foreground">Belum ada aktivitas tercatat.</p>}
              </div>
            </div>
          </div>
        </DashboardPanel>

        <DashboardPanel
          className="order-6"
          eyebrow="Heat Tracking"
          title="Microsoft Clarity Heatmap dan Session Recording"
          description="Clarity membaca perilaku visitor di halaman publik untuk melihat section yang menarik, section yang dilewati, dan rekaman sesi. Halaman login dan dashboard admin tidak direkam."
          action={
            <Button asChild className="bg-primary text-accent hover:bg-accent hover:text-primary">
              <a href={CLARITY_DASHBOARD_URL} target="_blank" rel="noreferrer">
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Buka Clarity
              </a>
            </Button>
          }
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={CheckCircle2}
              label="Status Tracking"
              value={clarityConfigured ? "Aktif" : "Off"}
              helper={clarityConfigured ? "Script Clarity akan dimuat di halaman publik production." : "Isi VITE_CLARITY_PROJECT_ID sebelum build production."}
            />
            <StatCard
              icon={BarChart3}
              label="Heatmap"
              value="Publik"
              helper="Klik, scroll, dan perhatian visitor dibaca dari halaman landing, denah, dan blog."
            />
            <StatCard
              icon={LinkIcon}
              label="Project ID"
              value={clarityConfigured ? CLARITY_PROJECT_ID : "-"}
              helper={clarityConfigured ? "Project ID dari dashboard Clarity." : "Belum ada Project ID di build ini."}
            />
            <StatCard
              icon={Globe2}
              label="Admin"
              value="Exclude"
              helper={`Route ${CLARITY_EXCLUDED_ROUTES.join(" dan ")} tidak ikut direkam.`}
            />
          </div>

          {!clarityConfigured ? (
            <div className="mt-6 flex gap-3 border border-accent/25 bg-accent/10 p-4 text-sm leading-6 text-primary">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <p>
                Clarity belum aktif di build ini. Buat project gratis di Microsoft Clarity, lalu build ulang dengan environment
                <span className="font-semibold"> VITE_CLARITY_PROJECT_ID</span>.
              </p>
            </div>
          ) : null}

          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.85fr)]">
            <div className="border border-primary/10 bg-white p-5">
              <h3 className="font-bold text-primary">Yang Direkam</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {["/", "/cs1 - /cs4", "/denah", "/blog dan /blog/[slug]"].map((path) => (
                  <div key={path} className="border border-border bg-secondary/40 px-4 py-3 text-sm font-semibold text-primary">
                    {path}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Untuk mengetes data, buka halaman publik dari browser biasa, scroll beberapa section, lalu tunggu data masuk ke Clarity.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  className="border-primary/20 text-primary hover:bg-primary hover:text-accent"
                  onClick={() => copyText(clarityTestUrl, "URL test Clarity disalin")}
                >
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  Copy URL Test
                </Button>
                <a
                  href={clarityTestUrl}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-primary/20 px-4 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-accent"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Buka Test
                </a>
              </div>
            </div>

            <div className="border border-primary/10 bg-white p-5">
              <h3 className="font-bold text-primary">Cara Lihat Heatmap</h3>
              <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-muted-foreground">
                <li>Buka dashboard Microsoft Clarity lalu pilih project Rivere/Kinara.</li>
                <li>Masuk ke menu Heatmaps untuk peta klik dan scroll.</li>
                <li>Masuk ke menu Recordings untuk melihat sesi visitor satu per satu.</li>
                <li>Filter URL dengan domain Rivere agar data landing page terpisah dari halaman lain.</li>
              </ol>
            </div>
          </div>
        </DashboardPanel>

        <DashboardPanel
          className="order-1"
          eyebrow="Blog Admin"
          title="Kelola Artikel Blog"
          description="Buat draft, edit konten, upload foto, lalu publish artikel ke website."
          action={
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="border-primary/20 bg-white text-primary hover:bg-primary hover:text-accent" onClick={handleNewDraft}>
                <Plus className="h-4 w-4" aria-hidden="true" />
                Draft Baru
              </Button>
              <Button className="bg-primary text-accent hover:bg-accent hover:text-primary" onClick={handleSaveDraft}>
                <Save className="h-4 w-4" aria-hidden="true" />
                Simpan Draft
              </Button>
              <Button className="bg-accent text-primary hover:bg-primary hover:text-accent" onClick={handlePublishBlogPost}>
                <Send className="h-4 w-4" aria-hidden="true" />
                Publish Artikel
              </Button>
            </div>
          }
        >
          <div className="mb-5 border border-primary/10 bg-white px-4 py-3 text-sm font-semibold text-primary">
            Status blog: <span className="text-accent">{blogSyncStatus}</span>
          </div>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
            <div className="grid gap-5">
              <div className="border-b border-primary/10 pb-3">
                <p className="text-xs font-bold uppercase tracking-normal text-accent">A. Konten Artikel</p>
                <h3 className="mt-1 text-xl font-bold text-primary">Informasi dan isi artikel</h3>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field id="title" label="Judul Artikel">
                  <Input id="title" value={form.title} onChange={(event) => handleFieldChange("title", event.target.value)} placeholder="Contoh: Investasi Kost Dekat IPB untuk Passive Income" />
                </Field>
                <Field id="slug" label="Slug URL" helper={slugConflict ? "Slug sudah digunakan artikel lain. Gunakan slug berbeda." : "Dibuat otomatis dari judul saat artikel baru. Tidak berubah otomatis setelah diedit manual atau diterbitkan."}>
                  <Input id="slug" value={form.slug} onChange={(event) => handleSlugChange(event.target.value)} placeholder="investasi-kost-dekat-ipb" className={slugConflict ? "border-destructive" : ""} />
                </Field>
              </div>

              <Field id="excerpt" label="Ringkasan / Excerpt">
                <Textarea id="excerpt" value={form.excerpt} onChange={(event) => handleFieldChange("excerpt", event.target.value)} className="min-h-20" placeholder="Ringkasan pendek untuk kartu blog." />
              </Field>

              <div className="grid gap-5">
                <Field id="imageUpload" label="Upload Foto Blog" helper="Upload JPG, PNG, atau WebP. Foto akan dikompres otomatis sebelum disimpan.">
                  <div className="grid gap-3">
                    <label className="flex cursor-pointer flex-col items-center justify-center gap-3 border border-dashed border-primary/25 bg-white px-4 py-6 text-center transition-colors hover:border-primary hover:bg-secondary/40">
                      <ImagePlus className="h-7 w-7 text-primary" aria-hidden="true" />
                      <span className="text-sm font-semibold text-primary">Pilih foto blog</span>
                      <span className="text-xs text-muted-foreground">Rasio 16:10 atau landscape akan tampil paling rapi.</span>
                      <input id="imageUpload" type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} />
                    </label>
                    {imageUploadError ? <p className="text-sm text-destructive">{imageUploadError}</p> : null}
                  </div>
                </Field>
              </div>

              <Field id="image" label="Gambar Utama" helper="Gunakan upload foto, atau isi URL manual seperti /images/nama-file.jpg.">
                <div className="grid gap-3">
                  <div className="flex gap-2">
                    <Input
                      id="image"
                      value={isUploadedImage ? "Foto upload tersimpan di artikel" : form.image}
                      onChange={(event) => handleFieldChange("image", event.target.value)}
                      readOnly={isUploadedImage}
                    />
                    {isUploadedImage ? (
                      <Button type="button" variant="outline" className="shrink-0 border-primary/20 text-primary hover:bg-primary hover:text-accent" onClick={handleRemoveUploadedImage}>
                        Hapus Foto
                      </Button>
                    ) : null}
                  </div>
                  {form.image ? (
                    <div className="overflow-hidden rounded-lg border border-primary/10 bg-white">
                      <ResponsiveImage
                        src={form.image}
                        alt={form.imageAlt || "Preview gambar blog"}
                        className="aspect-[16/10] w-full object-cover"
                        loading="lazy"
                        decoding="async"
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                  ) : null}
                </div>
              </Field>

              <Field id="imageAlt" label="Alt Text Gambar">
                <Input id="imageAlt" value={form.imageAlt} onChange={(event) => handleFieldChange("imageAlt", event.target.value)} placeholder="Deskripsi gambar untuk SEO dan aksesibilitas." />
                {!form.imageAlt.trim() ? <p className="mt-2 text-xs font-semibold text-accent">Peringatan: alt text kosong. Draft tetap dapat disimpan, tetapi lengkapi sebelum publish.</p> : null}
              </Field>

              <Field id="contentHtml" label="Isi Artikel" helper="Gunakan H2 dan H3 secara berurutan. Toolbar mendukung paragraf, bold, italic, list, link, gambar beserta alt text, dan blockquote.">
                <RichTextEditor value={form.contentHtml} onChange={(value) => handleFieldChange("contentHtml", value)} />
              </Field>

              <div className="grid gap-5 md:grid-cols-2">
                <Field id="category" label="Kategori">
                  <Input id="category" value={form.category} onChange={(event) => handleFieldChange("category", event.target.value)} />
                </Field>
                <Field id="tags" label="Tags" helper="Pisahkan setiap tag dengan koma.">
                  <Input id="tags" value={form.tags} onChange={(event) => handleFieldChange("tags", event.target.value)} />
                </Field>
                <Field id="author" label="Penulis">
                  <Input id="author" value={form.author} onChange={(event) => handleFieldChange("author", event.target.value)} />
                </Field>
                <Field id="datePublished" label="Tanggal Terbit">
                  <Input id="datePublished" type="date" value={form.datePublished} onChange={(event) => handleFieldChange("datePublished", event.target.value)} />
                </Field>
              </div>

              <div className="mt-3 rounded-xl border border-primary/10 bg-secondary/50 p-4 text-sm leading-6 text-primary">
                <strong>SEO dibuat otomatis.</strong>
                <p className="mt-1 text-muted-foreground">
                  Judul artikel, ringkasan, slug, dan featured image otomatis digunakan untuk metadata Google, canonical URL, serta tampilan saat artikel dibagikan.
                </p>
              </div>
            </div>

            <aside className="grid content-start gap-5">
              <div className="border border-primary/10 bg-white p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-primary">Status Publish</h3>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Artikel bisa dipublish jika field wajib sudah lengkap.
                    </p>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${canPublish ? "bg-primary text-accent" : "bg-secondary text-primary"}`}>
                    <Globe2 className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
                <div className="mt-5 grid gap-3">
                  {publishChecks.map((check) => (
                    <div key={check.label} className="flex items-start gap-3">
                      {check.pass ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      ) : (
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      )}
                      <p className="text-sm font-semibold text-foreground/80">{check.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-primary/10 bg-white p-5">
                <h3 className="font-bold text-primary">Preview URL</h3>
                <p className="mt-2 break-all text-sm leading-6 text-muted-foreground">{previewUrl}</p>
                <Button
                  variant="outline"
                  className="mt-4 w-full border-primary/20 text-primary hover:bg-primary hover:text-accent"
                  onClick={() => copyText(previewUrl, "Preview URL disalin")}
                >
                  <LinkIcon className="h-4 w-4" aria-hidden="true" />
                  Copy URL
                </Button>
              </div>

              <BlogFormatPreview post={blogPostExport} />
            </aside>
          </div>

          <div className="mt-6 border border-accent/25 bg-accent/10 p-4 text-sm leading-6 text-primary">
            <strong>Catatan publish:</strong> artikel yang dipublish tersimpan di server Hostinger dan tampil untuk visitor di halaman Blog serta section Blog di beranda.
          </div>
        </DashboardPanel>

        <DashboardPanel
          className="order-2"
          eyebrow="Artikel Live"
          title="Artikel Terpublish"
          description="Artikel yang sudah publish akan tampil di /blog, detail artikel, dan section Blog di beranda."
        >
          <div className="grid gap-3">
            {publishedPosts.length ? publishedPosts.map((post) => (
              <div key={post.slug} className="grid gap-4 border border-primary/10 bg-white p-4 md:grid-cols-[96px_minmax(0,1fr)_auto] md:items-center">
                <div className="overflow-hidden rounded-lg bg-secondary">
                  <ResponsiveImage
                    src={post.image}
                    alt={post.imageAlt}
                    className="aspect-[16/10] w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    sizes="96px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-bold text-primary">{post.title}</p>
                  <p className="mt-1 truncate text-sm text-muted-foreground">{post.excerpt}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    /blog/{post.slug}/ · Publish {formatDateTime(post.updatedAt || post.publishedAt)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a href={`/blog/${post.slug}/`} className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-primary/20 px-3 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-accent">
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    Buka
                  </a>
                  <Button variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary hover:text-accent" onClick={() => handleLoadPublishedPost(post)}>
                    <FileText className="h-4 w-4" aria-hidden="true" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="border-destructive/20 text-destructive hover:bg-destructive hover:text-white" onClick={() => handleDeletePublishedPost(post.slug)}>
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    Hapus
                  </Button>
                </div>
              </div>
            )) : (
              <div className="border border-dashed border-primary/20 bg-white p-6 text-center text-sm text-muted-foreground">
                Belum ada artikel yang dipublish dari dashboard.
              </div>
            )}
          </div>
        </DashboardPanel>

        <DashboardPanel
          className="order-3"
          eyebrow="Draft"
          title="Draft Artikel Tersimpan"
          description="Draft tersimpan di server Hostinger dan bisa dibuka lagi untuk dilanjutkan sebelum publish."
        >
          <div className="grid gap-3">
            {drafts.length ? drafts.map((draft) => (
              <div key={draft.id} className="grid gap-4 border border-primary/10 bg-white p-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                <div className="min-w-0">
                  <p className="truncate font-bold text-primary">{draft.title || "Draft tanpa judul"}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    /blog/{draft.slug || "slug-belum-diisi"} · Update {formatDateTime(draft.updatedAt)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary hover:text-accent" onClick={() => handleLoadDraft(draft)}>
                    <FileText className="h-4 w-4" aria-hidden="true" />
                    Buka
                  </Button>
                  <Button variant="outline" size="sm" className="border-destructive/20 text-destructive hover:bg-destructive hover:text-white" onClick={() => handleDeleteDraft(draft.id)}>
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    Hapus
                  </Button>
                </div>
              </div>
            )) : (
              <div className="border border-dashed border-primary/20 bg-white p-6 text-center text-sm text-muted-foreground">
                Belum ada draft tersimpan.
              </div>
            )}
          </div>
        </DashboardPanel>
      </main>
    </div>
  );
}
