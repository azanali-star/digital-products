export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 flex items-center justify-center h-full text-white text-center">
          <div className="max-w-4xl px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Handcrafted Treasures,<br />Rooted in Culture
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Celebrating heritage through handcrafted artistry and timeless designs
            </p>
            <button className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
              Explore Our Collection
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product cards will go here */}
          </div>
        </div>
      </section>

      {/* Cultural Highlight */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Cultural Heritage
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Every piece tells a story, woven with tradition and crafted with love.
                Discover the artisans behind our unique collections and the cultural
                significance that makes each item special.
              </p>
              <button className="bg-black text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors">
                Meet Our Artisans
              </button>
            </div>
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              {/* Cultural highlight image/video will go here */}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Community
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive updates about new products,
            cultural stories, and exclusive offers.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full text-black"
            />
            <button
              type="submit"
              className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
