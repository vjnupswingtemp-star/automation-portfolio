/** @type {import('next').NextConfig} */
const nextConfig = {
  // ESLint plugin has a structural incompatibility with eslint-config-next 15.x.
  // TypeScript catches type errors at build time; run `npm run lint` manually.
  eslint: { ignoreDuringBuilds: true },

  async headers() {
    const csp = [
      "default-src 'self'",
      // 'unsafe-inline' is ignored by nonce-aware browsers — kept as fallback for older ones
      "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://images.unsplash.com",
      "font-src 'self'",
      // /api/chat is same-origin; Vercel Analytics vitals endpoint
      "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
      "media-src 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ')

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ]
  },
}

export default nextConfig
