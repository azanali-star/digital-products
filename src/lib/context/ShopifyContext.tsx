'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { storefrontClient, CREATE_CART_MUTATION, ADD_TO_CART_MUTATION, GET_CART_QUERY, REMOVE_FROM_CART_MUTATION, UPDATE_CART_QUANTITY_MUTATION } from '@/lib/shopify';

interface ShopifyContextType {
  cart: any;
  cartId: string | null;
  isCartLoading: boolean;
  addToCart: (variantId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  updateCartQuantity: (lineId: string, quantity: number) => Promise<void>;
}

const ShopifyContext = createContext<ShopifyContextType | undefined>(undefined);

export function ShopifyProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any>(null);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isCartLoading, setIsCartLoading] = useState(false);

  useEffect(() => {
    const savedCartId = localStorage.getItem('shopifyCartId');
    if (savedCartId) {
      setCartId(savedCartId);
      fetchCart(savedCartId);
    } else {
      createCart();
    }
  }, []);

  const createCart = async () => {
    try {
      const { cartCreate } = await storefrontClient.request(CREATE_CART_MUTATION);
      const newCartId = cartCreate.cart.id;
      localStorage.setItem('shopifyCartId', newCartId);
      setCartId(newCartId);
      setCart(cartCreate.cart);
    } catch (error) {
      console.error('Error creating cart:', error);
    }
  };

  const fetchCart = async (id: string) => {
    try {
      const { cart } = await storefrontClient.request(GET_CART_QUERY, { cartId: id });
      setCart(cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
      // If cart not found, create a new one
      if (error.message.includes('Cart not found')) {
        localStorage.removeItem('shopifyCartId');
        createCart();
      }
    }
  };

  const addToCart = async (variantId: string, quantity: number) => {
    if (!cartId) {
      await createCart();
    }

    setIsCartLoading(true);
    try {
      const { cartLinesAdd } = await storefrontClient.request(ADD_TO_CART_MUTATION, {
        cartId,
        lines: [{ merchandiseId: variantId, quantity }],
      });

      setCart(cartLinesAdd.cart);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsCartLoading(false);
    }
  };

  const removeFromCart = async (lineId: string) => {
    if (!cartId) return;

    setIsCartLoading(true);
    try {
      const { cartLinesRemove } = await storefrontClient.request(REMOVE_FROM_CART_MUTATION, {
        cartId,
        lineIds: [lineId],
      });

      setCart(cartLinesRemove.cart);
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setIsCartLoading(false);
    }
  };

  const updateCartQuantity = async (lineId: string, quantity: number) => {
    if (!cartId) return;

    setIsCartLoading(true);
    try {
      const { cartLinesUpdate } = await storefrontClient.request(UPDATE_CART_QUANTITY_MUTATION, {
        cartId,
        lines: [{ id: lineId, quantity }],
      });

      setCart(cartLinesUpdate.cart);
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    } finally {
      setIsCartLoading(false);
    }
  };

  return (
    <ShopifyContext.Provider
      value={{
        cart,
        cartId,
        isCartLoading,
        addToCart,
        removeFromCart,
        updateCartQuantity,
      }}
    >
      {children}
    </ShopifyContext.Provider>
  );
}

export function useShopify() {
  const context = useContext(ShopifyContext);
  if (context === undefined) {
    throw new Error('useShopify must be used within a ShopifyProvider');
  }
  return context;
}
