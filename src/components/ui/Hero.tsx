import Image from 'next/image';
import { FC } from 'react';

interface HeroProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
  height?: string;
  overlayOpacity?: number;
  buttonText?: string;
  onButtonClick?: () => void;
}

const Hero: FC<HeroProps> = ({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  height = 'h-[70vh]',
  overlayOpacity = 40,
  buttonText,
  onButtonClick,
}) => {
  return (
    <section className={`relative w-full ${height}`}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        priority
      />
      <div className={`absolute inset-0 bg-black/${overlayOpacity} flex flex-col items-center justify-center text-center px-4`}>
        <h1 className="text-4xl md:text-6xl text-white font-serif mb-4">{title}</h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-8">{subtitle}</p>
        )}
        {buttonText && (
          <button
            onClick={onButtonClick}
            className="bg-white text-gray-900 px-8 py-3 rounded-full text-lg font-medium 
                     hover:bg-gray-100 transition-colors duration-200"
          >
            {buttonText}
          </button>
        )}
      </div>
    </section>
  );
};

export default Hero;
