/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Ye Render ke liye 'out' folder banayega
  images: {
    unoptimized: true, // Static site ke liye ye zaroori hai
  },
};

export default nextConfig;
