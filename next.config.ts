import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SPOTIFY_CLIENT_ID : process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET : process.env.SPOTIFY_CLIENT_SECRET,
    REDIRECT_URI : process.env.REDIRECT_URI
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
    ],
  },
};

export default nextConfig;
