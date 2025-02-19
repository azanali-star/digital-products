'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useShopify } from '@/lib/context/ShopifyContext';
import { formatPrice } from '@/lib/utils';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface CartItemProps {
  item: {
    id: string;
    quantity: number;
    merchandise: {
      id: string;
      title: string;
      product: {
        title: string;
        handle: string;
      };
      price: {
        amount: string;
        currencyCode: string;
      };
      image: {
        url: string;
        altText: string | null;
      };
    };
  };
}

export default function CartItem({ item }: CartItemProps) {
  const { removeFromCart, updateCartQuantity } = useShopify();

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateCartQuantity(item.id, newQuantity);
  };

  const handleRemove = async () => {
    await removeFromCart(item.id);
  };

  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Link href={`/products/${item.merchandise.product.handle}`}>
          <Image
            src={item.merchandise.image.url}
            alt={item.merchandise.image.altText || item.merchandise.product.title}
            width={96}
            height={96}
            className="h-full w-full object-cover object-center"
          />
        </Link>
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link href={`/products/${item.merchandise.product.handle}`}>
                {item.merchandise.product.title}
              </Link>
            </h3>
            <p className="ml-4">
              {formatPrice(
                parseFloat(item.merchandise.price.amount) * item.quantity,
                item.merchandise.price.currencyCode
              )}
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{item.merchandise.title}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center space-x-2">
            <label htmlFor={`quantity-${item.id}`} className="sr-only">
              Quantity
            </label>
            <button
              className="rounded-md border px-2 py-1 hover:bg-gray-50"
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              -
            </button>
            <span className="text-gray-500">{item.quantity}</span>
            <button
              className="rounded-md border px-2 py-1 hover:bg-gray-50"
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              +
            </button>
          </div>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-primary-600 hover:text-primary-500"
              onClick={handleRemove}
            >
              <span className="sr-only">Remove item</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
