import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export default function OptimizedImage({ 
  src, 
  alt, 
  className = "", 
  width, 
  height, 
  priority = false 
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        style={{
          width: width ? `${width}px` : "100%",
          height: height ? `${height}px` : "auto",
        }}
      />
      
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400">
          <span className="text-sm">Erro ao carregar imagem</span>
        </div>
      )}
    </div>
  );
}