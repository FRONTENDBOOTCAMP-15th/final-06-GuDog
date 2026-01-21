"use client";

import { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
}

const DEFAULT_FALLBACK = "/images/product-404.jpg";

export default function ProductImage({
  src,
  alt,
  fallback = DEFAULT_FALLBACK,
  className = "",
}: ProductImageProps) {
  const [error, setError] = useState(false);

  const imageSrc = error || !src ? fallback : src;

  return (
    <div className="relative aspect-square w-full bg-[#FFF9F2]">
      <img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        onError={() => setError(true)}
      />
    </div>
  );
}
