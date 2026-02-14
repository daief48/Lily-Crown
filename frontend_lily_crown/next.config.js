/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    reactCompiler: true,
    compress: true,
    poweredByHeader: false,
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    images: {
        unoptimized: process.env.NODE_ENV === 'development',
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        minimumCacheTTL: 60,
        remotePatterns: [
            { protocol: "https", hostname: "images.unsplash.com" },
            { protocol: "https", hostname: "www.mohifashion.com" },
            { protocol: "https", hostname: "randomuser.me" },
            { protocol: "https", hostname: "assets0.mirraw.com" },
            { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
            { protocol: "https", hostname: "cdn11.bigcommerce.com" },
            { protocol: "https", hostname: "storage.googleapis.com" },
            { protocol: "https", hostname: "viaindia.nl" },
            { protocol: "https", hostname: "medias.utsavfashion.com" },
            { protocol: "https", hostname: "images.vestiairecollective.com" },
            { protocol: "https", hostname: "www.ethnickart.com" },
            { protocol: "https", hostname: "i.pinimg.com" },
            { protocol: "https", hostname: "m.media-amazon.com" },
            { protocol: "https", hostname: "anvicouture.com" },
            { protocol: "https", hostname: "indiansilkhouse.com" },
            { protocol: "https", hostname: "www.indiansilkhouse.com" },
            { protocol: "https", hostname: "perfectdetails.com" },
            { protocol: "https", hostname: "clareswandesigns.com" },
            { protocol: "https", hostname: "masakalee.com" },
            { protocol: "https", hostname: "www.fashiongonerogue.com" },
            { protocol: "https", hostname: "miro.medium.com" },
            { protocol: "https", hostname: "picsum.photos" },
            { protocol: "https", hostname: "i.pravatar.cc" },
            { protocol: "http", hostname: "localhost", port: "8000" },
            { protocol: "http", hostname: "127.0.0.1", port: "8000" }
        ],
    },
};

module.exports = nextConfig;
