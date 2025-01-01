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
      {
        protocol: 'https',
        hostname: 'mosaic.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'image-cdn-ak.spotifycdn.com',
      }
    ],
  },
};

export default nextConfig;
