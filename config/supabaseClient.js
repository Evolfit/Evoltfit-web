
import { createClient } from '@supabase/supabase-js';

const configuredUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function resolveBaseUrl() {
  // In browser, prefer same-origin to leverage Next.js rewrites and avoid mixed content
  if (typeof window !== 'undefined') {
    if (!configuredUrl) {
      return window.location.origin;
    }
    try {
      const url = new URL(configuredUrl, window.location.origin);
      if (url.protocol === 'http:') {
        return window.location.origin;
      }
      return url.toString().replace(/\/$/, '');
    } catch (_) {
      return window.location.origin;
    }
  }
  // On server, fall back to Vercel URL if configuredUrl missing or insecure
  if (!configuredUrl || configuredUrl.startsWith('http://')) {
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
  }
  return configuredUrl;
}

const supabase = createClient(resolveBaseUrl(), supabaseKey);

export default supabase;