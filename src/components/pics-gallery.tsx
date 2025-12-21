import { useState, useEffect, useCallback, useRef } from "react";
import { copyImageToClipboard } from "../utils/clipboard";
import { filterImagesByName, getSearchTermFromUrl, updateSearchUrl } from "../utils/image-filter";
import {
  checkClipboardPermission,
  getPermissionMessage,
  type ClipboardPermissionState,
} from "../utils/clipboard-permissions";
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

// Placeholder image as data URI (SVG)
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui, sans-serif' font-size='18' fill='%239ca3af'%3EImage not available%3C/text%3E%3C/svg%3E";

const ImageCard = ({ image, imageName, onCopy }: ImageCardProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(image.url);
  const touchHandledRef = useRef(false);

  const handleImageError = useCallback(() => {
    if (!imageError) {
      setImageError(true);
      setImageSrc(PLACEHOLDER_IMAGE);
    }
  }, [imageError]);

  const handleTouchStart = useCallback(() => {
    // Mark that we're handling a touch event
    touchHandledRef.current = false;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      // Only allow copy if image loaded successfully and not already handled
      if (!imageError && !touchHandledRef.current) {
        touchHandledRef.current = true;
        // Ensure page has focus for clipboard access
        if (document.hasFocus && !document.hasFocus()) {
          window.focus();
        }
        // Call onCopy immediately to maintain user gesture chain for Safari
        onCopy(imgRef.current);
        // Reset after a delay to allow click event to be ignored
        setTimeout(() => {
          touchHandledRef.current = false;
        }, 500);
      }
    },
    [onCopy, imageError],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      // Prevent click if we just handled a touch event (mobile)
      if (touchHandledRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      // Only allow copy if image loaded successfully
      if (!imageError) {
        // Ensure page has focus for clipboard access
        if (document.hasFocus && !document.hasFocus()) {
          window.focus();
        }
        onCopy(imgRef.current);
      }
    },
    [onCopy, imageError],
  );

  return (
    <div className="relative group image-container">
      <button
        type="button"
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        disabled={imageError}
        className="w-full block aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-pointer border-0 p-0 touch-manipulation disabled:cursor-not-allowed disabled:opacity-75"
        style={{
          touchAction: "manipulation",
          WebkitTapHighlightColor: "transparent",
          background: "transparent",
        }}
        aria-label={imageError ? `Image unavailable: ${imageName}` : `Copy image: ${imageName}`}
      >
        <img
          ref={imgRef}
          src={imageSrc}
          alt={imageName}
          crossOrigin="anonymous"
          onError={handleImageError}
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
  const [clipboardPermission, setClipboardPermission] =
    useState<ClipboardPermissionState>("unknown");
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const toastIdRef = useRef(0);
  const copyingRef = useRef<Set<string>>(new Set());

  // Check clipboard permissions on mount
  useEffect(() => {
    const checkPermissions = async () => {
      const permission = await checkClipboardPermission();
      setClipboardPermission(permission);
    };
    checkPermissions();
  }, []);

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
      // Prevent multiple simultaneous copy operations for the same image
      if (copyingRef.current.has(image.url)) {
        return;
      }

      const imageName = image.key.split("/").pop() || image.key;
      copyingRef.current.add(image.url);

      try {
        await copyImageToClipboard(image, imgElement);
        addToast(`Copied ${imageName}!`, "success");
        // Recheck permissions after successful copy (might have changed from prompt to granted)
        const updatedPermission = await checkClipboardPermission();
        setClipboardPermission(updatedPermission);
      } catch (err) {
        console.error("Failed to copy image:", err);
        const errorMessage = err instanceof Error ? err.message : "Failed to copy image";
        addToast(`Error: ${errorMessage}`, "error");
        // Recheck permissions after error (might have been denied)
        const updatedPermission = await checkClipboardPermission();
        setClipboardPermission(updatedPermission);
      } finally {
        // Remove from copying set after a short delay to allow retry
        setTimeout(() => {
          copyingRef.current.delete(image.url);
        }, 1000);
      }
    },
    [addToast],
  );

  const getPermissionBadgeColor = () => {
    switch (clipboardPermission) {
      case "granted":
        return "bg-green-600";
      case "denied":
        return "bg-red-600";
      case "prompt":
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div>
        <div className="mb-6 flex flex-col gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search images by name..."
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <div className="flex items-center gap-2">
            <div
              className={`${getPermissionBadgeColor()} text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-2`}
            >
              <div className="w-2 h-2 rounded-full bg-white" />
              {getPermissionMessage(clipboardPermission)}
            </div>
          </div>
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
