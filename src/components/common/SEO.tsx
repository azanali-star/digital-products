'use client';

import Head from 'next/head';
import { usePathname } from 'next/navigation';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
}

export default function SEO({
  title = 'Digital Products - Handmade & Cultural Items',
  description = 'Discover our collection of handmade items and culturally inspired clothing. Shop unique pieces with immersive 3D visualization.',
  image = '/images/og-image.jpg',
  type = 'website',
  publishedAt,
  updatedAt,
  author,
}: SEOProps) {
  const pathname = usePathname();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-site.com';
  const url = `${siteUrl}${pathname}`;
  const siteName = 'Digital Products';

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${image}`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />

      {/* Article Specific */}
      {type === 'article' && publishedAt && (
        <>
          <meta property="article:published_time" content={publishedAt} />
          {updatedAt && <meta property="article:modified_time" content={updatedAt} />}
          {author && <meta property="article:author" content={author} />}
        </>
      )}

      {/* Product Specific */}
      {type === 'product' && (
        <>
          <meta property="og:price:amount" content="0.00" />
          <meta property="og:price:currency" content="USD" />
        </>
      )}
    </Head>
  );
}
