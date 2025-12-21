import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export interface R2Config {
  endpoint?: string;
  accountId?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  publicUrl?: string;
  usePresignedUrls?: boolean;
}

export interface R2Image {
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
    return `${config.publicUrl.replace(/\/$/, "")}/${key}`;
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
    return `https://${bucketName}.${config.accountId}.r2.cloudflarestorage.com/${key}`;
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
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix,
    });

    const response = await s3Client.send(command);

    if (!response.Contents) {
      return [];
    }

    // Filter for image files
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
    const imageObjects = response.Contents.filter((object) => {
      if (!object.Key) return false;
      const lowerKey = object.Key.toLowerCase();
      return imageExtensions.some((ext) => lowerKey.endsWith(ext));
    });

    // Generate URLs for all images
    const images: R2Image[] = await Promise.all(
      imageObjects.map(async (object) => {
        if (!object.Key) {
          throw new Error("Object key is missing");
        }
        const url = await getImageUrl(bucketName, object.Key, config, s3Client);
        return {
          key: object.Key,
          url,
          lastModified: object.LastModified,
          size: object.Size,
        };
      }),
    );

    return images;
  } catch (error) {
    console.error("Error listing R2 images:", error);
    throw error;
  }
}
