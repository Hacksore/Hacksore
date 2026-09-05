interface ImageSource {
  key: string;
  url: string;
}

/** Canvas always produces an actual PNG, including a still frame for animated images. */
export function getImageBlob(image: ImageSource): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const source = new Image();
    source.crossOrigin = "anonymous";
    source.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = source.naturalWidth;
        canvas.height = source.naturalHeight;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Image conversion is unavailable.");
        context.drawImage(source, 0, 0);
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error("Image conversion failed."))),
          "image/png",
        );
      } catch (error) {
        reject(error);
      }
    };
    source.onerror = () =>
      reject(new Error("Could not load this image for copying. Try opening the original."));
    source.src = image.url;
  });
}

export async function copyImageToClipboard(image: ImageSource): Promise<void> {
  if (!navigator.clipboard?.write || typeof ClipboardItem === "undefined") {
    throw new Error("Image copying is unavailable. Open the original to save it.");
  }
  // Invoke write during the click, before any await, to preserve Safari user activation.
  await navigator.clipboard.write([new ClipboardItem({ "image/png": getImageBlob(image) })]);
}

export async function getOriginalFile(image: ImageSource, signal?: AbortSignal): Promise<File> {
  const response = await fetch(image.url, { signal });
  if (!response.ok) throw new Error("Could not load the original. Use Open original to save it.");
  const blob = await response.blob();
  const extension = image.key.split(".").pop()?.toLowerCase() || "";
  const types: Record<string, string> = {
    gif: "image/gif",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    webp: "image/webp",
    svg: "image/svg+xml",
  };
  return new File([blob], image.key.split("/").pop() || "image", {
    type: types[extension] || blob.type,
  });
}
