'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cache } from '@/lib/cache';

interface BlurImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  quality?: number;
}

export default function BlurImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75,
}: BlurImageProps) {
  const [loading, setLoading] = useState(true);
  const [blurDataUrl, setBlurDataUrl] = useState<string | null>(null);

  useEffect(() => {
    // Try to get blur data URL from cache
    const cachedBlurData = cache.get<string>(`blur-${src}`);
    if (cachedBlurData) {
      setBlurDataUrl(cachedBlurData);
      return;
    }

    // Generate blur data URL
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.crossOrigin = 'anonymous';
    img.src = src;

    img.onload = () => {
      // Scale down image for blur
      const aspectRatio = img.width / img.height;
      canvas.width = 40;
      canvas.height = 40 / aspectRatio;

      if (ctx) {
        // Draw and blur
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const blurUrl = canvas.toDataURL('image/jpeg', 0.1);
        
        // Cache the blur data URL
        cache.set(`blur-${src}`, blurUrl, 86400000); // Cache for 24 hours
        setBlurDataUrl(blurUrl);
      }
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        className={`
          duration-700 ease-in-out
          ${loading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'}
        `}
        onLoadingComplete={() => setLoading(false)}
        placeholder="blur"
        blurDataURL={blurDataUrl || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMj4xLy0vLi4zOkpIPC5DR0dOVU5QT19iY2JjPEw/RWRsZIBnYW7/2wBDARUXFx4aHR4eHW5gPSBubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='}
      />
      {loading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
}
