declare global {
  interface Window {
    gtag: (
      type: string,
      action: string,
      params: {
        [key: string]: any;
      }
    ) => void;
  }
}

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID);
};

// Track page views
export const pageview = (url: string) => {
  if (typeof window === 'undefined') return;
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!, {
    page_path: url,
  });
};

// Track events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window === 'undefined') return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// E-commerce tracking
export const ecommerceEvent = {
  viewItem: (product: any) => {
    if (typeof window === 'undefined') return;
    window.gtag('event', 'view_item', {
      currency: product.currency,
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        currency: product.currency,
      }],
    });
  },

  addToCart: (product: any, quantity: number) => {
    if (typeof window === 'undefined') return;
    window.gtag('event', 'add_to_cart', {
      currency: product.currency,
      value: product.price * quantity,
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        currency: product.currency,
        quantity: quantity,
      }],
    });
  },

  beginCheckout: (cart: any) => {
    if (typeof window === 'undefined') return;
    window.gtag('event', 'begin_checkout', {
      currency: cart.currency,
      value: cart.total,
      items: cart.items.map((item: any) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        currency: item.currency,
        quantity: item.quantity,
      })),
    });
  },

  purchase: (order: any) => {
    if (typeof window === 'undefined') return;
    window.gtag('event', 'purchase', {
      transaction_id: order.id,
      value: order.total,
      currency: order.currency,
      tax: order.tax,
      shipping: order.shipping,
      items: order.items.map((item: any) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        currency: item.currency,
        quantity: item.quantity,
      })),
    });
  },
};
