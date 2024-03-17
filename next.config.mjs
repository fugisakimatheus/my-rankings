/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ranks',
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
