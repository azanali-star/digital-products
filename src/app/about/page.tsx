import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Our Story and Heritage',
  description: 'Discover the story behind our handcrafted treasures and culturally inspired clothing. Learn about our artisans and our commitment to preserving cultural heritage.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full">
        <Image
          src="/images/about-hero.jpg"
          alt="Artisans at work"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl text-white font-serif">Our Story</h1>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-serif text-center mb-8">Preserving Heritage Through Artistry</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Our journey began with a simple yet powerful vision: to create a bridge between traditional
          craftsmanship and modern appreciation. We collaborate with skilled artisans who pour their
          hearts into every piece they create, ensuring that each item tells a story of cultural
          richness and artistic excellence.
        </p>
      </section>

      {/* Values Section */}
      <section className="bg-neutral-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-serif text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Authenticity',
                description: 'Every piece reflects genuine cultural heritage and traditional craftsmanship.'
              },
              {
                title: 'Sustainability',
                description: 'We're committed to ethical practices and environmental responsibility.'
              },
              {
                title: 'Fair Trade',
                description: 'Supporting artisan communities through fair compensation and ethical partnerships.'
              }
            ].map((value, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Spotlight */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-serif text-center mb-12">Meet Our Artisans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            {
              name: 'Maria Rodriguez',
              specialty: 'Master Weaver',
              image: '/images/artisan-1.jpg',
              story: 'With over 30 years of experience, Maria specializes in traditional textile weaving.'
            },
            {
              name: 'Ahmed Hassan',
              specialty: 'Expert Craftsman',
              image: '/images/artisan-2.jpg',
              story: 'Ahmed brings ancient metalworking techniques into the modern era.'
            }
          ].map((artisan, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 items-center">
              <div className="relative w-64 h-64">
                <Image
                  src={artisan.image}
                  alt={artisan.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{artisan.name}</h3>
                <p className="text-primary-600 mb-3">{artisan.specialty}</p>
                <p className="text-gray-600">{artisan.story}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cultural Heritage */}
      <section className="bg-neutral-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-8">Our Cultural Heritage</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Each piece in our collection is more than just a product – it's a celebration of
            centuries-old traditions, reimagined for the modern world. Our designs draw inspiration
            from diverse cultural elements, creating pieces that are both timeless and contemporary.
          </p>
        </div>
      </section>
    </main>
  );
}
