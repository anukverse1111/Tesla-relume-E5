import type { NextConfig } from "next";

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname : undefined;

const nextConfig: NextConfig = {
  images: {
    // Админаас Supabase Storage-д байршуулсан машины зургууд
    remotePatterns: supabaseHost
      ? [{ protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/car-images/**" }]
      : [],
  },
  experimental: {
    serverActions: {
      // Админы зураг байршуулалт (4MB хүртэл) + multipart-ийн нэмэлт байт
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
