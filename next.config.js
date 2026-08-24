/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow GitHub avatar / OG images once GITHUB_USERNAME is finalized.
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" }
    ]
  }
};

module.exports = nextConfig;
