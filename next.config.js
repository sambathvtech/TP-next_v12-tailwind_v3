/* next.config.js  */
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const cmsPath =
  process?.env?.NEXT_PUBLIC_CMS_URL === undefined
    ? '/'
    : process?.env?.NEXT_PUBLIC_CMS_URL.replace(/^https?:\/\//, '');

module.exports = withPWA({
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  experimental: { esmExternals: true },
  images: {
    domains: [cmsPath],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    scope: '/',
    runtimeCaching,
    sw: 'service-worker.js',
  },
});
