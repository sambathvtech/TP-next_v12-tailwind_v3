import React from 'react';
import Head from 'next/head';
import { FAQPageJsonLd, NextSeo } from 'next-seo';
import { getDomain } from '@utilities/dev';
import { fetchImage } from '@service/strapi';
import { asFaq } from '@utilities';
import { faqDefault } from '@constants';
import GATag from './GATag';

export default function HeadNextSeo({ dataSource }) {
  const { seo, linkTo } = dataSource;
  return (
    <div>
      <Head>
        <GATag />

        <link
          href='https://fonts.googleapis.com/css2?family=Inter&display=optional'
          rel='stylesheet'
        />

        <link rel='apple-touch-icon' sizes='180x180' href='/favicon/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon/favicon-16x16.png' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <link rel='icon' type='image/x-icon' href='/favicon.ico' />
        <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />

        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='keywords' content={seo?.keywords || ''} />
      </Head>
      <NextSeo
        title={seo?.title ? seo?.title.substring(0, 70) : 'A title of page'}
        description={
          seo?.description ? seo?.description.substring(0, 320) : 'A short description goes here.'
        }
        canonical={`${getDomain()}${linkTo}`}
        openGraph={{
          url: `${getDomain()}${linkTo}`,
          title: seo?.title.substring(0, 70),
          description: seo?.description
            ? seo?.description.substring(0, 320)
            : 'A short description goes here.',
          images:
            seo?.images?.length > 0
              ? seo?.images?.map((load) => ({
                  url: load.local ? `${getDomain()}${load.url}` : fetchImage(load.url),
                }))
              : [
                  {
                    url: `${getDomain()}/favicon/android-chrome-512x512.png`,
                  },
                ],
          site_name: 'Example',
          type: 'website',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />

      <FAQPageJsonLd mainEntity={seo?.faq?.length > 0 ? asFaq(seo?.faq) : faqDefault} />
    </div>
  );
}
