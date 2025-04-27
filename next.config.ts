import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // ถ้าใช้ <Image> ของ Next ต้องใส่อันนี้
  },
  
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Removed images configuration as it's not specified in the requirements
  // and picsum pattern might not be needed.
  // experimental: {
  //   serverActions: true, // Explicitly enable if needed, usually enabled by default in newer Next.js
  // },
  // If you encounter issues with Turbopack, uncomment the line below
  // experimental: { turbopack: false },
};

module.exports = nextConfig;

export default nextConfig;
