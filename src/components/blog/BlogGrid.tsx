import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

const samplePosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Traditional Weaving',
    slug: 'art-of-traditional-weaving',
    excerpt: 'Discover the ancient techniques of traditional weaving and how our artisans preserve this timeless craft.',
    content: '',
    coverImage: '/images/blog/weaving.jpg',
    author: {
      name: 'Maria Rodriguez',
      image: '/images/about/artisan-1.jpg'
    },
    category: 'Craftsmanship',
    tags: ['weaving', 'tradition', 'artisan'],
    publishedAt: '2024-02-15',
    readingTime: '5 min read'
  },
  {
    id: '2',
    title: 'Sustainable Fashion: A Cultural Perspective',
    slug: 'sustainable-fashion-cultural-perspective',
    excerpt: 'How traditional craftsmanship contributes to sustainable fashion and environmental consciousness.',
    content: '',
    coverImage: '/images/blog/sustainable-fashion.jpg',
    author: {
      name: 'Ahmed Hassan',
      image: '/images/about/artisan-2.jpg'
    },
    category: 'Sustainability',
    tags: ['sustainability', 'fashion', 'culture'],
    publishedAt: '2024-02-10',
    readingTime: '4 min read'
  },
  // Add more sample posts as needed
];

export default function BlogGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {samplePosts.map((post) => (
        <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Link href={`/blog/${post.slug}`}>
            <div className="relative h-48 w-full">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-primary-600">{post.category}</span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-500">{post.readingTime}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 hover:text-primary-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3">
                <div className="relative h-8 w-8 rounded-full overflow-hidden">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{post.author.name}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
