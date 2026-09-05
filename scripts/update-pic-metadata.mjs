// Usage: node scripts/update-pic-metadata.mjs /path/to/updates.json [--apply]
// Input: [{ key, etag, title, caption, tags: string[] }]. ETag binds tags to the inspected image.
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parseEnv } from "node:util";
import { CopyObjectCommand, HeadObjectCommand, S3Client } from "@aws-sdk/client-s3";

const input = process.argv[2];
if (!input) throw new Error("Provide an updates JSON file; add --apply to write metadata.");
const updates = JSON.parse(readFileSync(input, "utf8"));
if (!Array.isArray(updates) || !updates.length) throw new Error("Expected a nonempty updates array.");
const keys = new Set();
for (const entry of updates) {
  if (!entry.key || !entry.etag || typeof entry.title !== "string" || !entry.title.trim() ||
      typeof entry.caption !== "string" || !entry.caption.trim() || !Array.isArray(entry.tags) ||
      !entry.tags.length || !entry.tags.every((tag) => typeof tag === "string" && tag.trim())) {
    throw new Error(`Invalid metadata entry: ${entry.key || "missing key"}`);
  }
  if (keys.has(entry.key)) throw new Error(`Duplicate key: ${entry.key}`);
  keys.add(entry.key);
}
const env = {};
for (const file of [".env", ".env.local"]) {
  if (existsSync(file)) Object.assign(env, parseEnv(readFileSync(file, "utf8")));
}
Object.assign(env, process.env);
for (const key of ["R2_BUCKET_NAME", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY"]) {
  if (!env[key]) throw new Error(`Missing ${key}`);
}
if (!env.R2_ENDPOINT && !env.R2_ACCOUNT_ID) throw new Error("Missing R2 endpoint or account ID.");
const client = new S3Client({
  region: "auto",
  endpoint: env.R2_ENDPOINT || `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: env.R2_ACCESS_KEY_ID, secretAccessKey: env.R2_SECRET_ACCESS_KEY },
  forcePathStyle: true,
});
const bucket = env.R2_BUCKET_NAME;
try {
  const prepared = [];
  for (const entry of updates) {
    const head = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: entry.key }));
    if (head.ETag !== entry.etag) throw new Error(`Image changed since inspection: ${entry.key}`);
    const metadata = {
      ...head.Metadata,
      title: entry.title.trim(),
      caption: entry.caption.trim(),
      tags: JSON.stringify([...new Set(entry.tags.map((tag) => tag.trim()))]),
      "uploaded-at": head.Metadata?.["uploaded-at"] || head.LastModified.toISOString(),
    };
    if (Object.entries(metadata).reduce((size, [key, value]) => size + Buffer.byteLength(key + value), 0) > 2048) {
      throw new Error(`Metadata exceeds 2 KiB for ${entry.key}`);
    }
    prepared.push({ entry, head, metadata });
  }
  if (!process.argv.includes("--apply")) {
    console.log(`Validated ${prepared.length} objects. No changes written.`);
  } else {
    const backup = join(mkdtempSync(join(tmpdir(), "pics-metadata-backup-")), "before.json");
    writeFileSync(backup, JSON.stringify(prepared.map(({ entry, head }) => ({ key: entry.key, ...head })), null, 2));
    console.log(`Original metadata saved to ${backup}`);
    for (const { entry, head, metadata } of prepared) {
      await client.send(new CopyObjectCommand({
        Bucket: bucket,
        Key: entry.key,
        CopySource: `${bucket}/${entry.key.split("/").map(encodeURIComponent).join("/")}`,
        CopySourceIfMatch: head.ETag,
        MetadataDirective: "REPLACE",
        Metadata: metadata,
        ContentType: head.ContentType,
        CacheControl: head.CacheControl,
        ContentDisposition: head.ContentDisposition,
        ContentEncoding: head.ContentEncoding,
        ContentLanguage: head.ContentLanguage,
        Expires: head.Expires,
        StorageClass: head.StorageClass,
      }));
      const verified = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: entry.key }));
      if (verified.ETag !== head.ETag || verified.ContentLength !== head.ContentLength ||
          Object.entries(metadata).some(([key, value]) => verified.Metadata?.[key] !== value)) {
        throw new Error(`Verification failed for ${entry.key}`);
      }
      console.log(`Updated and verified: ${entry.key}`);
    }
  }
} catch (error) {
  if (error?.name === "AccessDenied") {
    console.error("R2 denied access. Metadata writes require Object Read & Write access to this bucket. Prepared updates can be rerun after credentials are updated.");
    process.exitCode = 1;
  } else {
    throw error;
  }
} finally {
  client.destroy();
}
