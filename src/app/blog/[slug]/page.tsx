import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BlogPost } from '@/types/blog';

// This would typically come from your CMS or API
const getPost = async (slug: string): Promise<BlogPost | null> => {
  // Simulated API call
  const post = {
    id: '1',
    title: 'The Art of Traditional Weaving',
    slug: 'art-of-traditional-weaving',
    excerpt: 'Discover the ancient techniques of traditional weaving and how our artisans preserve this timeless craft.',
    content: `
      <p>Traditional weaving is more than just a craft—it's a story told through threads, a heritage passed down through generations, and a testament to human creativity and patience.</p>
      
      <h2>The Ancient Art</h2>
      <p>For thousands of years, weavers have been creating textiles using techniques that have remained largely unchanged. These methods, perfected over centuries, produce fabrics that are not only beautiful but also incredibly durable.</p>
      
      <h2>Our Artisans</h2>
      <p>Our master weavers bring decades of experience to their craft. Each piece they create is unique, carrying within its threads the stories and traditions of their culture.</p>
      
      <h2>Preserving Tradition</h2>
      <p>In an age of mass production, we believe it's crucial to preserve these traditional techniques. By supporting our artisans, you're helping to ensure these ancient crafts continue to thrive.</p>
    `,
    coverImage: '/images/blog/weaving.jpg',
    author: {
      name: 'Maria Rodriguez',
      image: '/images/about/artisan-1.jpg'
    },
    category: 'Craftsmanship',
    tags: ['weaving', 'tradition', 'artisan'],
    publishedAt: '2024-02-15',
    readingTime: '5 min read'
  };
  
  return post.slug === slug ? post : null;
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    };
  }

  return {
    title: \`\${post.title} | Blog\`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen">
      {/* Hero Image */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 -mt-32 relative z-10">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Category and Reading Time */}
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
              {post.category}
            </span>
            <span className="text-gray-500 text-sm">{post.readingTime}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-serif mb-6">{post.title}</h1>

          {/* Author */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b">
            <div className="relative h-12 w-12 rounded-full overflow-hidden">
              <Image
                src={post.author.image}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-medium">{post.author.name}</div>
              <div className="text-sm text-gray-500">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-8 pt-8 border-t">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
