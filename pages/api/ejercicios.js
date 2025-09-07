export default async function handler(req, res) {
  const targetBase = process.env.SUPABASE_HTTP_BASE_URL || 'http://supabasekong-y4cw8s8o0k00wk8c8ko80scs.40.233.12.170.sslip.io';

  const url = new URL(`${targetBase.replace(/\/$/, '')}/rest/v1/ejercicios`);
  Object.entries(req.query || {}).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'apikey': process.env.SUPABASE_SERVICE_OR_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_OR_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''}`,
        'Content-Type': 'application/json',
      },
    });

    const text = await response.text();
    res.status(response.status);
    // Forward content-type if provided
    const contentType = response.headers.get('content-type');
    if (contentType) {
      res.setHeader('content-type', contentType);
    }
    res.send(text);
  } catch (error) {
    res.status(500).json({ error: 'Proxy request failed', details: String(error) });
  }
}


