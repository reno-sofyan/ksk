export const COMPANY_SITE_URL = 'https://kinaraland.com';
export const RIVERE_SITE_URL = 'https://rivere.kinaraland.com';

const SITE_VARIANTS = new Set(['company', 'rivere']);

export function getSiteVariant() {
  const envVariant = import.meta.env.VITE_SITE_VARIANT?.toLowerCase();

  if (SITE_VARIANTS.has(envVariant)) {
    return envVariant;
  }

  if (typeof window === 'undefined') {
    return 'rivere';
  }

  const hostname = window.location.hostname.toLowerCase();

  if (hostname === 'kinaraland.com' || hostname === 'www.kinaraland.com') {
    return 'company';
  }

  if (hostname === 'rivere.kinaraland.com' || hostname.startsWith('rivere.')) {
    return 'rivere';
  }

  return 'rivere';
}

export function getRivereUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${RIVERE_SITE_URL}${normalizedPath}`;
}
