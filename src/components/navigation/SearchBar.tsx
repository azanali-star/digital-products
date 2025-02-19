import { useState } from 'react';

const SearchBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="relative">
      {/* Search Icon */}
      <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className="p-2 text-gray-600 hover:text-gray-900"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl p-4 z-50">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </form>
          
          {/* Quick Links */}
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-900">Popular Searches</h3>
            <div className="mt-2 space-y-2">
              <button className="block text-sm text-gray-600 hover:text-gray-900">
                Handmade Jewelry
              </button>
              <button className="block text-sm text-gray-600 hover:text-gray-900">
                Traditional Clothing
              </button>
              <button className="block text-sm text-gray-600 hover:text-gray-900">
                Home Decor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
