import { getServerSideSitemap } from 'next-sitemap';
import { navbarBtnsData } from '../../constants/navbarBtn';
import { getDomain } from '../../utilities/dev';
import { sitemapField } from '../../utilities/format';

export const getServerSideProps = async (ctx) => {
  const fields = [];

  navbarBtnsData.map((load) => {
    return fields.push(sitemapField(`${getDomain()}${load.linkTo}`));
  });

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
