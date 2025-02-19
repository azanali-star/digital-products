'use client';

import { useState } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useShopify } from '@/lib/context/ShopifyContext';
import CartDrawer from './CartDrawer';

export default function CartButton() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useShopify();

  const itemCount = cart?.lines?.edges?.length || 0;

  return (
    <>
      <button
        className="relative rounded-full p-2 text-gray-400 hover:text-gray-500"
        onClick={() => setIsCartOpen(true)}
      >
        <span className="sr-only">View cart</span>
        <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary-600 text-xs text-white flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}
