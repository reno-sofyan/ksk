export const COMPANY_SITE_URL = 'https://kinaraland.com';
export const RIVERE_SITE_URL = 'https://rivere.kinaraland.com';
export const ROYAL_CNN_SITE_URL = 'https://royalcnn.kinaraland.com';
export const KSK_SITE_URL = 'https://ksk.kinaraland.com';

const SITE_VARIANTS = new Set(['company', 'rivere', 'royal', 'ksk']);

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

  if (hostname === 'royalcnn.kinaraland.com' || hostname.startsWith('royalcnn.')) {
    return 'royal';
  }

  if (hostname === 'ksk.kinaraland.com' || hostname.startsWith('ksk.')) {
    return 'ksk';
  }

  return 'rivere';
}

export function getRivereUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${RIVERE_SITE_URL}${normalizedPath}`;
}
