import { getServerSideSitemapIndex } from 'next-sitemap';
import { getDomain } from '../../utilities/dev';

export const getServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  const sitemapIndex = [`${getDomain()}/sitemap-main.xml`, `${getDomain()}/sitemap-blog.xml`];

  return getServerSideSitemapIndex(ctx, sitemapIndex);
};

// Default export to prevent next.js errors
export default function SitemapIndex() {}
