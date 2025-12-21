interface R2Image {
  key: string;
  url: string;
  lastModified?: Date;
  size?: number;
}

/**
 * Filters images by name based on a search term
 */
export function filterImagesByName(images: R2Image[], searchTerm: string): R2Image[] {
  if (!searchTerm.trim()) {
    return images;
  }

  const searchLower = searchTerm.toLowerCase().trim();
  return images.filter((image) => {
    const imageName = (image.key.split("/").pop() || image.key).toLowerCase();
    return imageName.includes(searchLower);
  });
}

/**
 * Gets the initial search term from URL query parameters
 */
export function getSearchTermFromUrl(): string {
  if (typeof window === "undefined") {
    return "";
  }
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("q") || "";
}

/**
 * Updates the URL query parameter with the search term
 */
export function updateSearchUrl(searchTerm: string): void {
  if (typeof window === "undefined") {
    return;
  }
  const url = new URL(window.location.href);
  if (searchTerm.trim()) {
    url.searchParams.set("q", searchTerm);
  } else {
    url.searchParams.delete("q");
  }
  window.history.replaceState({}, "", url.toString());
}
