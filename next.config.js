/** @type {import('next').NextConfig} */
const nextConfig = {
  // App RouterはNext.js 13.4以降でデフォルトで有効
  experimental: {
    // 必要に応じて実験的機能を有効化
  },
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
