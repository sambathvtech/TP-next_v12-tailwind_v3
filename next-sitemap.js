/** @type {import('next-sitemap').IConfig} */

const siteUrl =
  process.env.NEXT_PUBLIC_API_URL === undefined
    ? 'https://www.test.com'
    : process.env.NEXT_PUBLIC_API_URL;

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [`${siteUrl}/sitemap.xml`],
  },
};
