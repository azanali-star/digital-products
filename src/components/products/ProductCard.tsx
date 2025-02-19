import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
}

const ProductCard = ({ id, name, price, image, category, isNew }: ProductCardProps) => {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={name}
          width={500}
          height={500}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        {isNew && (
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black text-white">
              New
            </span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-sm text-gray-700">
          <Link href={`/products/${id}`}>
            <span className="absolute inset-0" />
            {name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-gray-500">{category}</p>
        <p className="mt-1 text-sm font-medium text-gray-900">${price}</p>
      </div>
      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="w-full bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-900 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
