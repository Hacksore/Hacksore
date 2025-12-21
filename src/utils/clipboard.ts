export type CopyState = "idle" | "loading" | "copied" | "error";

interface R2Image {
  key: string;
  url: string;
  lastModified?: Date;
  size?: number;
}

/**
 * Converts an image URL to a blob using canvas
 * This approach works better for Safari/iOS clipboard operations
 * Creates a new Image object and waits for it to load
 */
async function imageUrlToBlob(imageUrl: string): Promise<Blob> {
  return new Promise<Blob>((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Could not get canvas context"));
      return;
    }

    const image = new Image();
    image.crossOrigin = "anonymous";

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to convert canvas to blob"));
        }
      }, "image/png");
    };

    image.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    image.src = imageUrl;
  });
}

/**
 * Fetches an image from a URL and returns it as a blob
 */
async function fetchImageAsBlob(url: string): Promise<Blob> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }
  return response.blob();
}

/**
 * Gets a blob representation of an image, using canvas conversion for Safari compatibility
 * Creates a new Image object and waits for it to load (similar to working implementation)
 */
export async function getImageBlob(
  image: R2Image,
  _imgElement?: HTMLImageElement | null,
): Promise<Blob> {
  // Always use the canvas approach with a new Image object (works better for Safari)
  try {
    return await imageUrlToBlob(image.url);
  } catch (canvasError) {
    // Fallback to fetch if canvas fails
    console.warn("Canvas approach failed, falling back to fetch:", canvasError);
    return fetchImageAsBlob(image.url);
  }
}

/**
 * Copies an image to the clipboard
 */
export async function copyImageToClipboard(
  image: R2Image,
  imgElement?: HTMLImageElement | null,
): Promise<void> {
  const blob = await getImageBlob(image, imgElement);

  // Copy image to clipboard using ClipboardItem API
  const clipboardItem = new ClipboardItem({
    [blob.type]: blob,
  });

  await navigator.clipboard.write([clipboardItem]);
}

/**
 * Gets the display text for the copy indicator based on state
 */
export function getIndicatorText(image: R2Image, state: CopyState): string {
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
}

/**
 * Gets the CSS classes for the copy indicator based on state
 */
export function getIndicatorClassName(state: CopyState): string {
  const baseClasses =
    "text-white text-sm font-medium px-4 py-2 bg-black rounded transition-colors duration-200";

  if (state === "copied") {
    return `${baseClasses} bg-green-600`;
  }

  return baseClasses;
}
