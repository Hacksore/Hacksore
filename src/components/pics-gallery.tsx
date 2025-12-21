import { useState, useEffect, useCallback, useRef } from "react";

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
  onCopy: () => void;
  getIndicatorText: (image: R2Image) => string;
  getIndicatorClassName: (image: R2Image) => string;
}

const ImageCard = ({
  image,
  imageName,
  isActive,
  onCopy,
  getIndicatorText,
  getIndicatorClassName,
}: ImageCardProps) => {
  const [isTouching, setIsTouching] = useState(false);

  const handleTouchStart = useCallback(() => {
    setIsTouching(true);
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      setIsTouching(false);
      onCopy();
    },
    [onCopy],
  );

  const showOverlay = isActive || isTouching;

  return (
    <div className="relative group image-container">
      <button
        type="button"
        onClick={onCopy}
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
          src={image.url}
          alt={imageName}
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
        <span className={getIndicatorClassName(image)}>{getIndicatorText(image)}</span>
      </div>
    </div>
  );
};

export const PicsGallery = ({ images }: PicsGalleryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredImages, setFilteredImages] = useState(images);
  const [copyingStates, setCopyingStates] = useState<
    Record<string, "idle" | "loading" | "copied" | "error">
  >({});
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Initialize search from URL query parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get("q") || "";
    if (initialQuery) {
      setSearchTerm(initialQuery);
    }
  }, []);

  // Filter images based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredImages(images);
      return;
    }

    const searchLower = searchTerm.toLowerCase().trim();
    const filtered = images.filter((image) => {
      const imageName = (image.key.split("/").pop() || image.key).toLowerCase();
      return imageName.includes(searchLower);
    });
    setFilteredImages(filtered);
  }, [searchTerm, images]);

  // Update URL query parameter when search changes
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      const url = new URL(window.location.href);
      if (searchTerm.trim()) {
        url.searchParams.set("q", searchTerm);
      } else {
        url.searchParams.delete("q");
      }
      window.history.replaceState({}, "", url.toString());
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchTerm]);

  const handleCopy = useCallback(async (image: R2Image) => {
    setCopyingStates((prev) => ({ ...prev, [image.url]: "loading" }));

    try {
      // Download the image
      const response = await fetch(image.url);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }

      const blob = await response.blob();

      // Copy image to clipboard using ClipboardItem API
      const clipboardItem = new ClipboardItem({
        [blob.type]: blob,
      });

      await navigator.clipboard.write([clipboardItem]);

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

  const getIndicatorText = useCallback(
    (image: R2Image) => {
      const state = copyingStates[image.url] || "idle";
      const imageName = image.key.split("/").pop() || image.key;

      switch (state) {
        case "loading":
          return "Loading...";
        case "copied":
          return "Copied!";
        case "error":
          return "Copy failed";
        default:
          return imageName;
      }
    },
    [copyingStates],
  );

  const getIndicatorClassName = useCallback(
    (image: R2Image) => {
      const state = copyingStates[image.url] || "idle";
      const baseClasses =
        "text-white text-sm font-medium px-4 py-2 bg-black rounded transition-colors duration-200";

      if (state === "copied") {
        return `${baseClasses} bg-green-600`;
      }

      return baseClasses;
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
              onCopy={() => handleCopy(image)}
              getIndicatorText={getIndicatorText}
              getIndicatorClassName={getIndicatorClassName}
            />
          );
        })}
      </div>
    </div>
  );
};
