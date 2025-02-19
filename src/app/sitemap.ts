import { MetadataRoute } from 'next';
import { storefrontClient } from '@/lib/shopify';
import { PRODUCTS_QUERY } from '@/lib/shopify';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-site.com';

  // Get all products
  const { products } = await storefrontClient.request(PRODUCTS_QUERY, {
    first: 250, // Adjust based on your needs
  });

  // Generate product URLs
  const productUrls = products.edges.map(({ node }: any) => ({
    url: `${baseUrl}/products/${node.handle}`,
    lastModified: node.updatedAt,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];

  return [...staticPages, ...productUrls];
}
