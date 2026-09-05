# R2 meme metadata

The gallery reads each image's R2 custom metadata through `HeadObject`. Search includes `title`, `caption`, `tags`, and the original filename. Tags accept either a JSON string array or comma-separated text. Missing or unreadable metadata falls back to filename search. Only these search fields and the preserved upload date are sent to the browser.

`ListObjectsV2` is paginated and metadata requests run in batches of six. The existing page cache still applies. There is no local image catalog or image analysis during page loads.

Updating metadata changes R2's last-modified timestamp, so the tagging process saves the original timestamp in `uploaded-at`. Gallery sorting prefers this field. Newly uploaded files without it use R2's last-modified timestamp.

## Tagging additional images

Inspect the original image (including frames of animated files) and produce a temporary batch file containing an array of `{ key, etag, title, caption, tags }` records. Use the exact R2 key and ETag of the inspected object. Titles and captions describe visible content; tags can also describe useful reaction contexts. Keep the batch file outside the source tree.

Run `node scripts/update-pic-metadata.mjs /path/to/updates.json` to validate the whole batch, then add `--apply` to write it. The script reads `.env` and `.env.local`; process environment variables take precedence. It backs up existing metadata to a temporary directory before writing and preserves existing custom metadata, HTTP content headers, storage class, and upload date. Conditional copies reject images whose contents changed after inspection. Every write is checked with a subsequent HEAD request.

This implements metadata consumption and provides a batch updater. Newly uploaded images are not automatically analyzed; they remain searchable by filename until tagged. The updater does not invoke an external AI service.

Run `node --test tests/pics-search.test.mjs` for metadata parsing and search checks.
