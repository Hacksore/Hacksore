export interface ImageMetadata {
  title?: string;
  caption?: string;
  tags?: string[];
  uploadedAt?: Date;
}

/** Only expose search fields from R2; unrelated object metadata stays on the server. */
export function parseImageMetadata(metadata: Record<string, string> = {}): ImageMetadata {
  let tags: unknown = [];
  try {
    tags = JSON.parse(metadata.tags || "[]");
  } catch {
    tags = metadata.tags?.split(",") || [];
  }
  const timestamp = Date.parse(metadata["uploaded-at"] || "");
  return {
    title: metadata.title?.trim() || undefined,
    caption: metadata.caption?.trim() || undefined,
    tags: Array.isArray(tags)
      ? tags
          .filter((tag): tag is string => typeof tag === "string")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [],
    uploadedAt: Number.isFinite(timestamp) ? new Date(timestamp) : undefined,
  };
}
