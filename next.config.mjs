/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: false,
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "new.labdisposable.com",
      },
      {
        protocol: "https",
        hostname: "new.labdisposable.com",
      },
    ],
  },
};

export default nextConfig;
