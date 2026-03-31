/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Disable SWC completely to bypass library validation errors on external drives
  swcMinify: false,
  compiler: {
    // This forces Next.js to use Babel if .babelrc is present
    styledComponents: false,
  },
  experimental: {
    forceSwcTransforms: false,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: 'assets.pokemon.com' },
      { protocol: 'https', hostname: 'img.pokemondb.net' },
    ],
  },
};

export default nextConfig;
