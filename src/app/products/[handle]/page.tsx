import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetails from '@/components/products/ProductDetails';
import { storefrontClient, PRODUCT_BY_HANDLE_QUERY } from '@/lib/shopify';
import { createMetaTitle, createMetaDescription } from '@/lib/utils';

interface PageProps {
  params: {
    handle: string;
  };
}

async function getProduct(handle: string) {
  try {
    const { product } = await storefrontClient.request(PRODUCT_BY_HANDLE_QUERY, {
      handle,
    });
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProduct(params.handle);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: createMetaTitle(product.title),
    description: createMetaDescription(product.description),
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.images.edges[0]?.node.url || '',
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProduct(params.handle);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="pt-6 pb-16">
        <ProductDetails product={product} />
      </div>
    </main>
  );
}
