export interface SearchableImage {
  key: string;
  url: string;
  title?: string;
  caption?: string;
  tags?: string[];
}

export function normalizeSearch(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

const reactions = [
  ["happy", "joy", "excited", "yay", "celebrate", "celebration"],
  ["sad", "cry", "crying", "tears"],
  ["angry", "mad", "rage", "furious"],
  ["laugh", "laughing", "lol", "lmao", "funny"],
  ["confused", "confusion", "what", "huh", "wtf"],
  ["surprised", "shocked", "shock", "wow"],
  ["approve", "approval", "yes", "agree"],
];

/** Search every word in filenames and R2 metadata; rank literal matches first. */
export function filterImagesByName<T extends SearchableImage>(
  images: T[],
  searchTerm: string,
): T[] {
  const query = normalizeSearch(searchTerm);
  if (!query) return images;
  const terms = query.split(" ");
  return images
    .map((image) => {
      const name = normalizeSearch(image.title || image.key.replace(/\.[^.]+$/, ""));
      const text = normalizeSearch(
        [image.key, image.title, image.caption, ...(image.tags || [])].join(" "),
      );
      const words = new Set(text.split(" "));
      const matches = terms.every(
        (term) =>
          text.includes(term) ||
          reactions.some((group) => group.includes(term) && group.some((word) => words.has(word))),
      );
      const score =
        name === query
          ? 3
          : name.includes(query)
            ? 2
            : terms.every((term) => text.includes(term))
              ? 1
              : 0;
      return { image, matches, score };
    })
    .filter((entry) => entry.matches)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.image);
}

export function getSearchTermFromUrl(): string {
  return typeof window === "undefined"
    ? ""
    : new URLSearchParams(window.location.search).get("q") || "";
}

export function updateSearchUrl(searchTerm: string): void {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (searchTerm.trim()) url.searchParams.set("q", searchTerm);
  else url.searchParams.delete("q");
  window.history.replaceState(window.history.state, "", url.toString());
}
