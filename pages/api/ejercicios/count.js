export default async function handler(req, res) {
  const targetBase = process.env.SUPABASE_HTTP_BASE_URL || 'http://supabasekong-y4cw8s8o0k00wk8c8ko80scs.40.233.12.170.sslip.io';

  const url = new URL(`${targetBase.replace(/\/$/, '')}/rest/v1/ejercicios`);
  // Build search with only filtering-related params; enforce select and head
  Object.entries(req.query || {}).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });
  url.searchParams.set('select', 'id');

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'apikey': process.env.SUPABASE_SERVICE_OR_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_OR_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''}`,
        'Prefer': 'count=exact',
      },
    });

    const contentRange = response.headers.get('content-range');
    let count = null;
    if (contentRange) {
      const parts = contentRange.split('/');
      if (parts.length === 2) {
        const parsed = parseInt(parts[1], 10);
        if (!Number.isNaN(parsed)) {
          count = parsed;
        }
      }
    }

    if (count === null) {
      // Fallback: try to read array and count length (not efficient but safe)
      const json = await response.json().catch(() => []);
      count = Array.isArray(json) ? json.length : 0;
    }

    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Proxy count failed', details: String(error) });
  }
}


