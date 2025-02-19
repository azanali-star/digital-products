'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useShopify } from '@/lib/context/ShopifyContext';
import { formatPrice, getVariantOptionValue } from '@/lib/utils';

interface ProductDetailsProps {
  product: any; // Type this properly based on your Shopify product structure
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants.edges[0].node);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.images.edges[0]?.node);
  const [is3DMode, setIs3DMode] = useState(false);
  const { addToCart, isCartLoading } = useShopify();
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current || !is3DMode) return;

    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controlsRef.current = controls;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Add a sample 3D model (cube for now, replace with actual product model)
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [is3DMode]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !rendererRef.current || !cameraRef.current) return;

      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddToCart = async () => {
    try {
      await addToCart(selectedVariant.id, quantity);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg">
          {is3DMode ? (
            <canvas
              ref={canvasRef}
              className="w-full h-full"
            />
          ) : (
            activeImage && (
              <Image
                src={activeImage.url}
                alt={activeImage.altText || product.title}
                width={800}
                height={800}
                className="h-full w-full object-cover object-center"
              />
            )
          )}
        </div>
        
        {/* Thumbnail Images */}
        <div className="grid grid-cols-4 gap-4">
          {product.images.edges.map(({ node: image }: any) => (
            <button
              key={image.url}
              onClick={() => {
                setActiveImage(image);
                setIs3DMode(false);
              }}
              className={\`relative aspect-square overflow-hidden rounded-lg 
                \${activeImage?.url === image.url ? 'ring-2 ring-primary-500' : ''}\`}
            >
              <Image
                src={image.url}
                alt={image.altText || ''}
                fill
                className="object-cover"
              />
            </button>
          ))}
          {/* 3D View Button */}
          <button
            onClick={() => setIs3DMode(!is3DMode)}
            className={\`flex items-center justify-center rounded-lg border-2 
              \${is3DMode ? 'border-primary-500 text-primary-600' : 'border-gray-200 text-gray-600'}\`}
          >
            3D View
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
        <div className="text-2xl text-gray-900">
          {formatPrice(
            parseFloat(selectedVariant.price.amount),
            selectedVariant.price.currencyCode
          )}
        </div>

        {/* Product Options */}
        {product.options.map((option: any) => (
          <div key={option.name} className="space-y-2">
            <h3 className="text-sm font-medium text-gray-900">{option.name}</h3>
            <div className="grid grid-cols-4 gap-2">
              {option.values.map((value: string) => (
                <button
                  key={value}
                  onClick={() => {
                    const newVariant = product.variants.edges.find(
                      ({ node }: any) =>
                        getVariantOptionValue(node, option.name) === value
                    )?.node;
                    if (newVariant) setSelectedVariant(newVariant);
                  }}
                  className={\`px-4 py-2 text-sm rounded-md 
                    \${
                      getVariantOptionValue(selectedVariant, option.name) === value
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }\`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Quantity Selector */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              -
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!selectedVariant.availableForSale || isCartLoading}
          className="w-full bg-primary-600 text-white py-3 px-4 rounded-md
                   hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {!selectedVariant.availableForSale
            ? 'Out of Stock'
            : isCartLoading
            ? 'Adding to Cart...'
            : 'Add to Cart'}
        </button>

        {/* Product Description */}
        <div className="prose prose-sm max-w-none">
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      </div>
    </div>
  );
}
