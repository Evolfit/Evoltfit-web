/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "ichwtlkazihzvtpmxbnw.supabase.co",
      "supabasekong-y4cw8s8o0k00wk8c8ko80scs.40.233.12.170.sslip.io",
    ],
  },
}

module.exports = nextConfig
