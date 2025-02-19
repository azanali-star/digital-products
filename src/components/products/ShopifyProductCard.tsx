'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useShopify } from '@/lib/context/ShopifyContext';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
        };
      }>;
    };
  };
}

export default function ShopifyProductCard({ product }: ProductCardProps) {
  const { addToCart, isCartLoading } = useShopify();
  const [isAdding, setIsAdding] = useState(false);

  const firstImage = product.images.edges[0]?.node;
  const firstVariant = product.variants.edges[0]?.node;
  const price = firstVariant?.price || product.priceRange.minVariantPrice;

  const handleAddToCart = async () => {
    if (!firstVariant || isAdding) return;

    setIsAdding(true);
    try {
      await addToCart(firstVariant.id, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="group relative">
      <Link href={`/products/${product.handle}`}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
          {firstImage && (
            <Image
              src={firstImage.url}
              alt={firstImage.altText || product.title}
              width={500}
              height={500}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          )}
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">{product.title}</h3>
            <p className="mt-1 text-sm text-gray-500">
              {formatPrice(parseFloat(price.amount), price.currencyCode)}
            </p>
          </div>
        </div>
      </Link>
      <button
        onClick={handleAddToCart}
        disabled={!firstVariant?.availableForSale || isAdding || isCartLoading}
        className="mt-4 w-full rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white
                 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500
                 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {!firstVariant?.availableForSale
          ? 'Out of Stock'
          : isAdding || isCartLoading
          ? 'Adding...'
          : 'Add to Cart'}
      </button>
    </div>
  );
}
