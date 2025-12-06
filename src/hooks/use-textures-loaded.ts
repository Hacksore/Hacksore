import { useEffect, useState } from "react";

export function useTexturesLoaded(imageUrls: string[]): boolean {
  const [areTexturesLoaded, setAreTexturesLoaded] = useState(false);

  useEffect(() => {
    if (imageUrls.length === 0) {
      setAreTexturesLoaded(true);
      return;
    }

    let loadedCount = 0;
    const totalImages = imageUrls.length;

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setAreTexturesLoaded(true);
      }
    };

    const handleImageError = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setAreTexturesLoaded(true);
      }
    };

    const images = imageUrls.map((url) => {
      const img = new Image();
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
      img.src = url;
      return img;
    });

    return () => {
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [imageUrls]);

  return areTexturesLoaded;
}

