/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "ichwtlkazihzvtpmxbnw.supabase.co",
      "supabasekong-y4cw8s8o0k00wk8c8ko80scs.40.233.12.170.sslip.io",
    ],
  },
  async rewrites() {
    const targetBase = process.env.SUPABASE_HTTP_BASE_URL || 'http://supabasekong-y4cw8s8o0k00wk8c8ko80scs.40.233.12.170.sslip.io';
    const base = targetBase.replace(/\/$/, '');
    return [
      {
        source: '/rest/v1/:path*',
        destination: `${base}/rest/v1/:path*`,
      },
      {
        source: '/auth/v1/:path*',
        destination: `${base}/auth/v1/:path*`,
      },
      {
        source: '/storage/v1/:path*',
        destination: `${base}/storage/v1/:path*`,
      },
    ];
  },
}

module.exports = nextConfig
