# Digital Products E-commerce

A modern e-commerce platform built with Next.js, Shopify, and Three.js for 3D product visualization.

## Features

- 🛍️ Shopify Integration for product management and checkout
- 🎨 Modern UI with Tailwind CSS
- 🎮 3D product visualization with Three.js
- 📱 Fully responsive design
- 🔒 Secure authentication with NextAuth.js
- 💳 Payment processing with Stripe
- 📝 Blog system with categories
- 📧 Contact form with validation
- 🔍 SEO optimized
- 🚀 Performance optimized with image optimization and lazy loading

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn
- A Shopify store
- MongoDB database
- Stripe account (for payments)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/digital-products.git
   cd digital-products
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

4. Update the environment variables in `.env.local` with your credentials.

5. Run the development server:
   ```bash
   npm run dev
   ```

### Testing

Run the test suite:
```bash
npm test           # Run all tests
npm run test:watch # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

## Project Structure

```
src/
├── app/           # Next.js app directory
├── components/    # React components
├── lib/          # Utility functions and configurations
├── types/        # TypeScript type definitions
└── styles/       # Global styles and Tailwind config
```

## Key Components

- `ShopifyContext`: Manages cart state and Shopify API interactions
- `ProductDetails`: Displays product information with 3D visualization
- `CartDrawer`: Shopping cart interface
- `BlogGrid`: Displays blog posts in a grid layout
- `ContactForm`: Handles user inquiries
- `OptimizedImage`: Image optimization component
- `LazyLoad`: Component lazy loading
- `ErrorBoundary`: Error handling component

## Performance Optimization

- Image optimization with next/image
- Lazy loading of components and images
- Code splitting and dynamic imports
- Caching strategies
- Performance monitoring with analytics

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
