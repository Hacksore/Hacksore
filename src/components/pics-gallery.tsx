import { useState, useEffect, useCallback, useRef } from "react";
import { copyImageToClipboard } from "../utils/clipboard";
import { filterImagesByName, getSearchTermFromUrl, updateSearchUrl } from "../utils/image-filter";
import { ToastContainer } from "./toast";

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
  onCopy: (imgElement?: HTMLImageElement | null) => void;
}

const ImageCard = ({ image, imageName, onCopy }: ImageCardProps) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      // Call onCopy immediately to maintain user gesture chain for Safari
      onCopy(imgRef.current);
    },
    [onCopy],
  );

  return (
    <div className="relative group image-container">
      <button
        type="button"
        onClick={() => onCopy(imgRef.current)}
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
          className="w-full h-full object-cover pointer-events-none transition-opacity duration-200 group-hover:opacity-30"
          loading="lazy"
        />
      </button>
    </div>
  );
};

interface Toast {
  id: string;
  message: string;
  type: "loading" | "success" | "error";
}

export const PicsGallery = ({ images }: PicsGalleryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredImages, setFilteredImages] = useState(images);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const toastIdRef = useRef(0);

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

  const addToast = useCallback((message: string, type: "loading" | "success" | "error") => {
    const id = `toast-${toastIdRef.current++}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const handleCopy = useCallback(
    async (image: R2Image, imgElement?: HTMLImageElement | null) => {
      const imageName = image.key.split("/").pop() || image.key;
      const loadingId = addToast("Copying image...", "loading");

      try {
        await copyImageToClipboard(image, imgElement);
        removeToast(loadingId);
        addToast(`Copied ${imageName}!`, "success");
      } catch (err) {
        console.error("Failed to copy image:", err);
        removeToast(loadingId);
        const errorMessage =
          err instanceof Error ? err.message : "Failed to copy image";
        addToast(`Error: ${errorMessage}`, "error");
      }
    },
    [addToast, removeToast],
  );

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
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

            return (
              <ImageCard
                key={image.url}
                image={image}
                imageName={imageName}
                onCopy={(imgElement) => handleCopy(image, imgElement)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
