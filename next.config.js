/** @type {import('next').NextConfig} */
const nextConfig = {
    server: {
        port: process.env.PORT || 3000,
    }
}

module.exports = nextConfig
