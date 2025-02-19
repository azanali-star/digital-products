'use client';

import { useState } from 'react';
import Link from 'next/link';

const categories = [
  { name: 'All', slug: 'all' },
  { name: 'Craftsmanship', slug: 'craftsmanship' },
  { name: 'Culture', slug: 'culture' },
  { name: 'Sustainability', slug: 'sustainability' },
  { name: 'Fashion', slug: 'fashion' },
  { name: 'Behind the Scenes', slug: 'behind-the-scenes' },
];

export default function BlogCategories() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/blog/category/${category.slug}`}
          onClick={() => setActiveCategory(category.slug)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
            ${activeCategory === category.slug
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
