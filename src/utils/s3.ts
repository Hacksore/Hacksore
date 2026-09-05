import {
  GetObjectCommand,
  HeadObjectCommand,
  paginateListObjectsV2,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { type ImageMetadata, parseImageMetadata } from "./image-metadata";

export interface R2Config {
  endpoint?: string;
  accountId?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  publicUrl?: string;
  usePresignedUrls?: boolean;
}

export interface R2Image extends ImageMetadata {
  key: string;
  url: string;
  lastModified?: Date;
  size?: number;
}

/**
 * Generate URL for an R2 object
 * Supports custom public domain, presigned URLs, or R2 public URLs
 */
async function getImageUrl(
  bucketName: string,
  key: string,
  config: R2Config,
  s3Client: S3Client,
): Promise<string> {
  // If custom public URL is configured, use it
  if (config.publicUrl) {
    return `${config.publicUrl.replace(/\/$/, "")}/${key.split("/").map(encodeURIComponent).join("/")}`;
  }

  // If bucket is private, generate presigned URL
  if (config.usePresignedUrls) {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    // Presigned URLs valid for 1 hour
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  }

  // Default: R2 public URL (requires account ID)
  if (config.accountId) {
    return `https://${bucketName}.${config.accountId}.r2.cloudflarestorage.com/${key.split("/").map(encodeURIComponent).join("/")}`;
  }

  // Fallback: if no account ID, return a placeholder (shouldn't happen in production)
  throw new Error("R2 public URL requires either R2_PUBLIC_URL or R2_ACCOUNT_ID to be set");
}

/**
 * List all images from an R2 bucket
 * @param bucketName - The name of the R2 bucket
 * @param prefix - Optional prefix to filter objects (e.g., "images/")
 * @param config - R2 configuration (endpoint, credentials, etc.)
 * @returns Array of image objects with their URLs
 */
export async function listR2Images(
  bucketName: string,
  prefix = "",
  config: R2Config = {},
): Promise<R2Image[]> {
  // Initialize S3-compatible client for R2
  // R2 uses S3-compatible API, so we can use the AWS SDK
  let endpoint = config.endpoint;
  if (!endpoint && config.accountId) {
    // Construct R2 endpoint from account ID
    endpoint = `https://${config.accountId}.r2.cloudflarestorage.com`;
  }
  if (!endpoint) {
    throw new Error("R2 endpoint must be provided via R2_ENDPOINT or R2_ACCOUNT_ID");
  }

  const s3Client = new S3Client({
    region: "auto", // R2 uses "auto" as the region
    endpoint,
    credentials:
      config.accessKeyId && config.secretAccessKey
        ? {
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey,
          }
        : undefined,
    forcePathStyle: true, // R2 requires path-style URLs
  });
  try {
    const images: R2Image[] = [];
    for await (const page of paginateListObjectsV2(
      { client: s3Client },
      { Bucket: bucketName, Prefix: prefix },
    )) {
      const objects = (page.Contents || []).filter((object) =>
        /\.(jpe?g|png|gif|webp|svg)$/i.test(object.Key || ""),
      );
      // ListObjectsV2 omits custom metadata. Bound HEAD concurrency on large collections.
      for (let offset = 0; offset < objects.length; offset += 6) {
        const batch = await Promise.all(
          objects.slice(offset, offset + 6).map(async (object) => {
            const key = object.Key;
            if (!key) throw new Error("Missing image key");
            let metadata: ImageMetadata = {};
            try {
              const head = await s3Client.send(
                new HeadObjectCommand({ Bucket: bucketName, Key: key }),
              );
              metadata = parseImageMetadata(head.Metadata);
            } catch (error) {
              // A metadata read failure should not hide an otherwise usable image.
              console.warn(
                `Could not read search metadata for ${key}:`,
                error instanceof Error ? error.name : "Unknown error",
              );
            }
            return {
              key,
              url: await getImageUrl(bucketName, key, config, s3Client),
              lastModified: object.LastModified,
              size: object.Size,
              ...metadata,
            };
          }),
        );
        images.push(...batch);
      }
    }

    return images;
  } catch (error) {
    console.error("Error listing R2 images:", error);
    throw error;
  } finally {
    s3Client.destroy();
  }
}
