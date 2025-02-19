# Digital Products E-commerce

A modern e-commerce platform built with Next.js for digital products.

## Features

- Next.js 13 with App Router
- Server and Client Components
- API Routes and Middleware
- Authentication with NextAuth.js
- Shopping Cart Functionality
- Product Management
- Responsive Design
- PWA Support
- SEO Optimization

## Deployment

This project is automatically deployed to Vercel through GitHub Actions CI/CD pipeline.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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
