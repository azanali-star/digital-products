import { useState } from 'react';
import Image from 'next/image';

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = ({ params }: ProductPageProps) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Mock product data - replace with actual data fetching
  const product = {
    id: params.id,
    name: 'Handcrafted Traditional Dress',
    price: 299.99,
    description: 'This beautifully handcrafted dress combines traditional artisanal techniques with modern styling. Each piece is uniquely made by skilled artisans, ensuring no two items are exactly alike.',
    images: ['/product-1.jpg', '/product-2.jpg', '/product-3.jpg', '/product-4.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    features: [
      'Handmade by skilled artisans',
      '100% sustainable materials',
      'Traditional dyeing techniques',
      'Fair trade certified',
    ],
    category: 'Clothing',
    artisan: {
      name: 'Maria Garcia',
      location: 'Mexico City, Mexico',
      story: 'Maria has been crafting traditional clothing for over 20 years, passing down techniques learned from her grandmother.',
    },
  };

  const addToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    // Implement add to cart functionality
    console.log('Adding to cart:', {
      productId: product.id,
      size: selectedSize,
      quantity,
    });
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10">
          {/* Product Images */}
          <div className="grid grid-cols-2 gap-4">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`aspect-h-1 aspect-w-1 overflow-hidden rounded-lg ${
                  index === 0 ? 'col-span-2' : ''
                }`}
              >
                <Image
                  src={image}
                  alt={`Product image ${index + 1}`}
                  width={800}
                  height={800}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            ))}
          </div>

          {/* Product Info */}
          <div className="lg:pl-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>
            <div className="mt-4">
              <p className="text-2xl tracking-tight text-gray-900">
                ${product.price}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Description</h3>
              <p className="mt-2 text-sm text-gray-500">{product.description}</p>
            </div>

            {/* Size Selector */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <div className="mt-2 grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex items-center justify-center rounded-md py-2 text-sm font-medium uppercase
                      ${
                        selectedSize === size
                          ? 'bg-black text-white'
                          : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
              <div className="mt-2 flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-md p-2 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Decrease quantity</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <span className="text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-md p-2 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Increase quantity</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-8">
              <button
                onClick={addToCart}
                className="w-full bg-black text-white px-6 py-3 rounded-full text-base font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                Add to Cart
              </button>
            </div>

            {/* Product Features */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-sm font-medium text-gray-900">Features</h3>
              <ul className="mt-4 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-2 text-sm text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Artisan Information */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-sm font-medium text-gray-900">Artisan Story</h3>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-900">
                  {product.artisan.name}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {product.artisan.location}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  {product.artisan.story}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
