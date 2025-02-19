import Image from 'next/image';
import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="relative w-24 h-24 mx-auto">
          <Image
            src="/images/offline.svg"
            alt="Offline"
            fill
            className="object-contain"
          />
        </div>
        
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          You&apos;re Offline
        </h2>
        
        <p className="mt-2 text-sm text-gray-600">
          It seems you&apos;re not connected to the internet. Check your connection and try again.
        </p>

        <div className="mt-6">
          <button
            onClick={() => window.location.reload()}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Try Again
          </button>
        </div>

        <div className="mt-4">
          <Link
            href="/"
            className="text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            Return to Homepage
          </Link>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            Available Offline Features:
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• View previously visited pages</li>
            <li>• Access cached product images</li>
            <li>• View saved cart items</li>
            <li>• Browse through recent blog posts</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
