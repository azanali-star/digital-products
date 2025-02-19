interface ProductStructuredData {
  name: string;
  description: string;
  image: string[];
  price: number;
  priceCurrency: string;
  sku: string;
  brand: string;
  availability: 'InStock' | 'OutOfStock' | 'PreOrder';
}

interface ArticleStructuredData {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
}

export function generateProductStructuredData({
  name,
  description,
  image,
  price,
  priceCurrency,
  sku,
  brand,
  availability,
}: ProductStructuredData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    sku,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    offers: {
      '@type': 'Offer',
      url: typeof window !== 'undefined' ? window.location.href : '',
      priceCurrency,
      price,
      availability: `https://schema.org/${availability}`,
    },
  };
}

export function generateArticleStructuredData({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
}: ArticleStructuredData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author.name,
      url: author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Digital Products',
      logo: {
        '@type': 'ImageObject',
        url: '/images/logo.png',
      },
    },
  };
}

export function generateBreadcrumbStructuredData(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
