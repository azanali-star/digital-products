import { Metadata } from 'next';
import Hero from '@/components/ui/Hero';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogCategories from '@/components/blog/BlogCategories';

export const metadata: Metadata = {
  title: 'Blog | Cultural Stories & Artisan Insights',
  description: 'Explore our collection of stories about cultural heritage, artisan craftsmanship, and sustainable fashion.',
};

export default async function BlogPage() {
  return (
    <main className="min-h-screen">
      <Hero
        title="Stories & Insights"
        subtitle="Discover the stories behind our artisans and cultural heritage"
        imageSrc="/images/blog/hero.jpg"
        imageAlt="Traditional craftsmanship in action"
        height="h-[50vh]"
      />

      {/* Categories */}
      <section className="py-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <BlogCategories />
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-serif mb-12 text-center">Latest Stories</h2>
          <BlogGrid />
        </div>
      </section>
    </main>
  );
}
