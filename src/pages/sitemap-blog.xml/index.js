import { getServerSideSitemap } from 'next-sitemap';
import { fetchDataByGet } from '../../service/strapi';
import { getCMSDomain, getDomain } from '../../utilities/dev';
import { sitemapField } from '../../utilities/format';

export const getServerSideProps = async (ctx) => {
  // Method to source urls from cms
  const pathSlug = '/blog';
  const fields = [];
  if (getCMSDomain()) {
    await fetch(
      fetchDataByGet('/site-posts', {
        'site_routes.linkTo': pathSlug,
      })
    )
      .then((resData) => resData.json())
      .then((data) =>
        data.map((load) => {
          return fields.push(sitemapField(`${getDomain()}${pathSlug}${load.linkTo}`));
        })
      );
  }

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
