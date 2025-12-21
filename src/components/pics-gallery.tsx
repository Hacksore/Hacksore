import { useState, useEffect, useCallback, useRef } from "react";
import {
  copyImageToClipboard,
  getIndicatorText,
  getIndicatorClassName,
  type CopyState,
} from "../utils/clipboard";
import { filterImagesByName, getSearchTermFromUrl, updateSearchUrl } from "../utils/image-filter";

interface R2Image {
  key: string;
  url: string;
  lastModified?: Date;
  size?: number;
}

interface PicsGalleryProps {
  images: R2Image[];
}

interface ImageCardProps {
  image: R2Image;
  imageName: string;
  isActive: boolean;
  onCopy: (imgElement?: HTMLImageElement | null) => void;
  indicatorText: string;
  indicatorClassName: string;
}

const ImageCard = ({
  image,
  imageName,
  isActive,
  onCopy,
  indicatorText,
  indicatorClassName,
}: ImageCardProps) => {
  const [isTouching, setIsTouching] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleTouchStart = useCallback(() => {
    setIsTouching(true);
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      setIsTouching(false);
      // Call onCopy immediately to maintain user gesture chain for Safari
      onCopy(imgRef.current);
    },
    [onCopy],
  );

  const showOverlay = isActive || isTouching;

  return (
    <div className="relative group image-container">
      <button
        type="button"
        onClick={() => onCopy(imgRef.current)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="w-full block aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-pointer border-0 p-0 touch-manipulation"
        style={{
          touchAction: "manipulation",
          WebkitTapHighlightColor: "transparent",
          background: "transparent",
        }}
        aria-label={`Copy image: ${imageName}`}
      >
        <img
          ref={imgRef}
          src={image.url}
          alt={imageName}
          crossOrigin="anonymous"
          className={`w-full h-full object-cover pointer-events-none transition-opacity duration-200 ${
            showOverlay ? "opacity-30" : "group-hover:opacity-30"
          }`}
          loading="lazy"
        />
      </button>
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200 ${
          showOverlay ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <span className={indicatorClassName}>{indicatorText}</span>
      </div>
    </div>
  );
};

export const PicsGallery = ({ images }: PicsGalleryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredImages, setFilteredImages] = useState(images);
  const [copyingStates, setCopyingStates] = useState<Record<string, CopyState>>({});
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Initialize search from URL query parameter
  useEffect(() => {
    const initialQuery = getSearchTermFromUrl();
    if (initialQuery) {
      setSearchTerm(initialQuery);
    }
  }, []);

  // Filter images based on search term
  useEffect(() => {
    const filtered = filterImagesByName(images, searchTerm);
    setFilteredImages(filtered);
  }, [searchTerm, images]);

  // Update URL query parameter when search changes
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      updateSearchUrl(searchTerm);
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchTerm]);

  const handleCopy = useCallback(async (image: R2Image, imgElement?: HTMLImageElement | null) => {
    setCopyingStates((prev) => ({ ...prev, [image.url]: "loading" }));

    try {
      await copyImageToClipboard(image, imgElement);
      setCopyingStates((prev) => ({ ...prev, [image.url]: "copied" }));

      // Reset after 2 seconds
      setTimeout(() => {
        setCopyingStates((prev) => ({ ...prev, [image.url]: "idle" }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy image:", err);
      setCopyingStates((prev) => ({ ...prev, [image.url]: "error" }));

      // Reset after 2 seconds even on error
      setTimeout(() => {
        setCopyingStates((prev) => ({ ...prev, [image.url]: "idle" }));
      }, 2000);
    }
  }, []);

  const getIndicatorTextForImage = useCallback(
    (image: R2Image) => {
      const state = copyingStates[image.url] || "idle";
      return getIndicatorText(image, state);
    },
    [copyingStates],
  );

  const getIndicatorClassNameForImage = useCallback(
    (image: R2Image) => {
      const state = copyingStates[image.url] || "idle";
      return getIndicatorClassName(state);
    },
    [copyingStates],
  );

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search images by name..."
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-x-4 gap-y-4">
        {filteredImages.map((image) => {
          const imageName = image.key.split("/").pop() || image.key;
          const isActive =
            copyingStates[image.url] === "loading" || copyingStates[image.url] === "copied";

          return (
            <ImageCard
              key={image.url}
              image={image}
              imageName={imageName}
              isActive={isActive}
              onCopy={(imgElement) => handleCopy(image, imgElement)}
              indicatorText={getIndicatorTextForImage(image)}
              indicatorClassName={getIndicatorClassNameForImage(image)}
            />
          );
        })}
      </div>
    </div>
  );
};
