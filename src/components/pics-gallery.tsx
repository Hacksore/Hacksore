import { useEffect, useMemo, useRef, useState } from "react";
import { copyImageToClipboard, getOriginalFile } from "../utils/clipboard";
import {
  filterImagesByName,
  getSearchTermFromUrl,
  type SearchableImage,
  updateSearchUrl,
} from "../utils/image-filter";
import "../styles/pics.css";

const PAGE_SIZE = 36;
const isGif = (image: SearchableImage) => /\.gif$/i.test(image.key);
const titleOf = (image: SearchableImage) =>
  image.title ||
  (image.key.split("/").pop() || image.key)
    .replace(/^[A-F0-9]{8}[-_]/i, "")
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ");

export const PicsGallery = ({ images }: { images: SearchableImage[] }) => {
  const [query, setQuery] = useState("");
  const [format, setFormat] = useState("all");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<SearchableImage | null>(null);
  const [prepared, setPrepared] = useState<{
    key: string;
    file: File;
    url: string;
    shareable: boolean;
  } | null>(null);
  const [fileError, setFileError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const search = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const sync = () => {
      setQuery(getSearchTermFromUrl());
      setLimit(PAGE_SIZE);
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  useEffect(() => {
    if (!selected) return;
    dialog.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const controller = new AbortController();
    let objectUrl: string | undefined;
    setFileError("");
    setPrepared(null);
    getOriginalFile(selected, controller.signal)
      .then((file) => {
        if (controller.signal.aborted) return;
        objectUrl = URL.createObjectURL(file);
        setPrepared({
          key: selected.key,
          file,
          url: objectUrl,
          shareable: !!navigator.canShare?.({ files: [file] }),
        });
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setFileError("File unavailable here. Open the original to save it.");
      });
    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  const results = useMemo(
    () =>
      filterImagesByName(images, query).filter(
        (image) => format === "all" || (format === "gif" ? isGif(image) : !isGif(image)),
      ),
    [images, query, format],
  );

  function changeQuery(value: string) {
    setQuery(value);
    setLimit(PAGE_SIZE);
    updateSearchUrl(value);
  }

  async function perform(action: () => Promise<void>, success: string) {
    if (busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setMessage("");
    try {
      await action();
      setMessage(success);
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        setMessage(
          error instanceof Error
            ? error.message
            : "Could not complete this action. Try Open original.",
        );
      }
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  }

  function copy(image: SearchableImage) {
    void perform(
      () => copyImageToClipboard(image),
      isGif(image)
        ? "Still frame copied. Use Share GIF to keep animation."
        : "Image copied. Ready to paste.",
    );
  }

  const ready = prepared?.key === selected?.key ? prepared : null;

  return (
    <div className="pics-gallery">
      <div className="pics-toolbar">
        <div className="pics-search">
          <label htmlFor="meme-search" className="sr-only">
            Search memes
          </label>
          <span aria-hidden="true">⌕</span>
          <input
            ref={search}
            id="meme-search"
            type="search"
            value={query}
            onChange={(event) => changeQuery(event.target.value)}
            placeholder="Find a reaction…"
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                changeQuery("");
                search.current?.focus();
              }}
            >
              ×
            </button>
          )}
        </div>
        <div className="pics-filter-row">
          <fieldset className="pics-filters" aria-label="Image format">
            {[
              ["all", "All"],
              ["gif", "GIFs"],
              ["image", "Images"],
            ].map(([value, label]) => (
              <button
                type="button"
                key={value}
                aria-pressed={format === value}
                onClick={() => {
                  setFormat(value);
                  setLimit(PAGE_SIZE);
                }}
              >
                {label}
              </button>
            ))}
          </fieldset>
          <span className="pics-count" role="status">
            {results.length} {results.length === 1 ? "pic" : "pics"}
          </span>
        </div>
      </div>
      <div className="pics-grid">
        {results.slice(0, limit).map((image) => (
          <article className="pics-card" key={image.key}>
            <button
              type="button"
              className="pics-preview"
              onClick={() => {
                setMessage("");
                setSelected(image);
              }}
              aria-label={`Preview ${titleOf(image)}`}
            >
              <img
                crossOrigin="anonymous"
                src={image.url}
                alt={titleOf(image)}
                loading="lazy"
                decoding="async"
              />
              {isGif(image) && <span className="pics-format">GIF</span>}
            </button>
            <div className="pics-card-footer">
              <span title={titleOf(image)}>{titleOf(image)}</span>
              <button
                type="button"
                disabled={busy}
                onClick={() => (isGif(image) ? setSelected(image) : copy(image))}
                aria-label={`${isGif(image) ? "GIF options for" : "Copy"} ${titleOf(image)}`}
              >
                {isGif(image) ? "Share ↗" : "Copy"}
              </button>
            </div>
          </article>
        ))}
      </div>
      {results.length === 0 && (
        <div className="pics-empty">
          <h2>{images.length ? "No matching reactions." : "Nothing in the stash yet."}</h2>
          <p>
            {images.length
              ? "Try fewer words or a different format."
              : "Your saved images will appear here."}
          </p>
          {images.length > 0 && (
            <button
              type="button"
              onClick={() => {
                changeQuery("");
                setFormat("all");
              }}
            >
              Reset filters
            </button>
          )}
        </div>
      )}
      {results.length > limit && (
        <button
          type="button"
          className="pics-more"
          onClick={() => setLimit((value) => value + PAGE_SIZE)}
        >
          Load more · {results.length - limit} remaining
        </button>
      )}
      {!selected && message && (
        <p className="pics-notice" role="status">
          {message}
        </p>
      )}
      {selected && (
        <dialog
          ref={dialog}
          className="pics-dialog"
          aria-labelledby="pic-title"
          onClose={() => setSelected(null)}
        >
          <div className="pics-dialog-header">
            <h2 id="pic-title">{titleOf(selected)}</h2>
            <button
              type="button"
              aria-label="Close preview"
              onClick={() => dialog.current?.close()}
            >
              ×
            </button>
          </div>
          <div className="pics-full-image">
            <img
              crossOrigin="anonymous"
              src={selected.url}
              alt={selected.caption || titleOf(selected)}
            />
          </div>
          <div className="pics-dialog-body">
            <p>
              {isGif(selected)
                ? "Keep it moving. Share or save the original GIF; copying a still removes animation."
                : "Copy it, save it, or send it along."}
            </p>
            <div className="pics-actions">
              {ready?.shareable && (
                <button
                  className="pics-primary"
                  type="button"
                  disabled={busy}
                  onClick={() =>
                    perform(() => navigator.share({ files: [ready.file] }), "Share completed.")
                  }
                >
                  Share {isGif(selected) ? "GIF" : "image"}
                </button>
              )}
              <button type="button" disabled={busy} onClick={() => copy(selected)}>
                {isGif(selected) ? "Copy still" : "Copy image"}
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() =>
                  perform(
                    () =>
                      navigator.clipboard?.writeText
                        ? navigator.clipboard.writeText(selected.url)
                        : Promise.reject(new Error("Link copying is unavailable.")),
                    "Image link copied.",
                  )
                }
              >
                Copy link
              </button>
              {ready && (
                <a href={ready.url} download={ready.file.name}>
                  Save {isGif(selected) ? "GIF" : "image"}
                </a>
              )}
              <a href={selected.url} target="_blank" rel="noreferrer">
                Open original ↗
              </a>
            </div>
            <p className="pics-dialog-status" role="status">
              {busy
                ? "Working…"
                : message ||
                  fileError ||
                  (!ready
                    ? "Preparing original file…"
                    : isGif(selected)
                      ? "Sharing and link previews depend on the receiving app."
                      : "Ready to send.")}
            </p>
          </div>
        </dialog>
      )}
    </div>
  );
};
