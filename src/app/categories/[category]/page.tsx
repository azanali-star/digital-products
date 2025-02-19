import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Hero from '@/components/ui/Hero';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';

// This would typically come from your database or CMS
const categories = {
  'handmade-items': {
    title: 'Handmade Items',
    description: 'Discover unique handcrafted treasures made with love and tradition',
    heroImage: '/images/categories/handmade-hero.jpg',
  },
  'cultural-clothing': {
    title: 'Cultural Clothing',
    description: 'Embrace your heritage with our authentic cultural fashion collection',
    heroImage: '/images/categories/clothing-hero.jpg',
  },
  'accessories': {
    title: 'Accessories',
    description: 'Complete your look with our handcrafted accessories',
    heroImage: '/images/categories/accessories-hero.jpg',
  },
  'home-decor': {
    title: 'Home Decor',
    description: 'Transform your space with culturally inspired decor pieces',
    heroImage: '/images/categories/decor-hero.jpg',
  },
  'new-arrivals': {
    title: 'New Arrivals',
    description: 'Be the first to discover our latest artisanal creations',
    heroImage: '/images/categories/new-arrivals-hero.jpg',
  },
};

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = categories[params.category as keyof typeof categories];
  
  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.',
    };
  }

  return {
    title: \`\${category.title} | Shop Cultural Products\`,
    description: category.description,
  };
}

// This would typically come from your database
const sampleProducts = [
  {
    id: '1',
    name: 'Hand-woven Textile',
    price: 129.99,
    image: '/images/products/textile-1.jpg',
    category: 'handmade-items',
    isNew: true,
  },
  {
    id: '2',
    name: 'Traditional Dress',
    price: 249.99,
    image: '/images/products/dress-1.jpg',
    category: 'cultural-clothing',
  },
  // Add more sample products as needed
];

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = categories[params.category as keyof typeof categories];
  
  if (!category) {
    notFound();
  }

  // Filter products by category
  const categoryProducts = sampleProducts.filter(
    product => product.category === params.category
  );

  return (
    <main className="min-h-screen">
      <Hero
        title={category.title}
        subtitle={category.description}
        imageSrc={category.heroImage}
        imageAlt={category.title}
        height="h-[40vh]"
      />

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-x-8">
          {/* Filters */}
          <div className="hidden lg:block">
            <ProductFilters />
          </div>

          {/* Product grid */}
          <div className="lg:col-span-3">
            <ProductGrid
              products={categoryProducts}
              title={`Showing ${categoryProducts.length} results`}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
