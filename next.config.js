/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "occ-0-3933-116.1.nflxso.net",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "rvsscgpdsglupytboang.supabase.co",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
    // domains: ["occ-0-3933-116.1.nflxso.net", "img.freepik.com"],
  },
};

module.exports = nextConfig;
