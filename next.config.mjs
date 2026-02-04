/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { 
    unoptimized: true 
  },
  basePath: process.env.NODE_ENV === 'production' ? '/MyPortfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/MyPortfolio/' : '',
};

export default nextConfig;
