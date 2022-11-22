/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: "/explore",
        destination: "/explore/movies",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["image.tmdb.org", "uploads.dailydot.com"],
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ["image/webp"],
  },
  experimental: {
    appDir: true,
  },
  poweredByHeader: false,
};

module.exports = nextConfig;
