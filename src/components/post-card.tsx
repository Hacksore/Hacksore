export interface PostOrganization {
  name: string;
  username: string;
  slug: string;
  profile_image: string;
  profile_image_90: string;
}

export interface Post {
  id: number | string;
  title: string;
  url: string;
  content?: string;
  description?: string;
  cover_image?: string;
  social_image?: string;
  video?: string;
  video_url?: string;
  published_at: string;
  reading_time_minutes?: number;
  tags?: string[];
  tag_list?: string[];
  comments_count?: number;
  page_views_count?: number;
  public_reactions_count?: number;
  organization?: PostOrganization;
}

const getYouTubeVideoId = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();

    if (hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1) || undefined;
    }

    if (hostname === "youtube.com" || hostname === "www.youtube.com") {
      if (parsedUrl.pathname === "/watch") {
        return parsedUrl.searchParams.get("v") ?? undefined;
      }

      if (parsedUrl.pathname.startsWith("/embed/")) {
        return parsedUrl.pathname.split("/")[2] || undefined;
      }
    }
  } catch {
    return undefined;
  }
};

export const resolvePostCoverImage = (post: Post) => {
  if (!post.cover_image) {
    // Try to get a YouTube thumbnail from the video URL when there's no cover image
    const videoYouTubeId = post.video_url ? getYouTubeVideoId(post.video_url) : undefined;
    if (videoYouTubeId) {
      return `https://img.youtube.com/vi/${videoYouTubeId}/maxresdefault.jpg`;
    }
    return post.social_image;
  }

  const youtubeVideoId = getYouTubeVideoId(post.cover_image);
  if (youtubeVideoId) {
    return `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`;
  }

  return post.cover_image;
};

function titleSeed(title: string): number {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash * 31 + title.charCodeAt(i)) >>> 0;
  }
  return hash;
}

const PlaceholderImage = ({ title }: { title: string }) => {
  const seed = titleSeed(title);
  const hue = seed % 360;
  const hue2 = (hue + 150) % 360;

  const ids = { glow: `gw${seed}`, grid: `gr${seed}`, bg: `bg${seed}` };
  const col1 = `hsl(${hue},100%,55%)`;
  const col2 = `hsl(${hue2},100%,60%)`;

  // Deterministic active nodes on a 10×6 grid (viewBox 0 0 100 60)
  type Node = { x: number; y: number };
  const nodes: Node[] = [];
  for (let col = 1; col <= 9; col++) {
    for (let row = 1; row <= 5; row++) {
      const h = (((seed ^ (col * 73856093)) ^ (row * 19349663)) * 1664525 + 1013904223) >>> 0;
      if ((h & 0xff) < 70) {
        nodes.push({ x: col * 10, y: row * 10 });
      }
    }
  }

  // L-shaped circuit traces between node pairs
  const traces = nodes.map((a, i) => {
    const b = nodes[(i + 3) % nodes.length];
    return { d: `M${a.x},${a.y} H${b.x} V${b.y}`, color: i % 3 === 0 ? col2 : col1 };
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 60"
      preserveAspectRatio="xMidYMid slice"
      width="100%"
      height="100%"
      style={{ display: "block" }}
      aria-hidden="true"
    >
      <defs>
        <filter id={ids.glow} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id={ids.grid} width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="none" stroke={col1} strokeWidth="0.08" opacity="0.25" />
        </pattern>
        <linearGradient id={ids.bg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#060d1a" />
          <stop offset="100%" stopColor={`hsl(${hue},30%,5%)`} />
        </linearGradient>
      </defs>

      {/* Dark background */}
      <rect width="100" height="60" fill={`url(#${ids.bg})`} />
      {/* Geometric grid */}
      <rect width="100" height="60" fill={`url(#${ids.grid})`} />

      {/* Circuit traces */}
      <g opacity="0.75" filter={`url(#${ids.glow})`}>
        {traces.map(({ d, color }) => (
          <path key={d} d={d} fill="none" stroke={color} strokeWidth="0.3" />
        ))}
      </g>

      {/* Glowing nodes at active intersections */}
      {nodes.map((n) => (
        <circle
          key={`${n.x}-${n.y}`}
          cx={n.x}
          cy={n.y}
          r={0.9}
          fill={(n.x + n.y) % 20 === 0 ? col2 : col1}
          filter={`url(#${ids.glow})`}
        />
      ))}
    </svg>
  );
};

export const PostCard = ({ post }: { post: Post }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const formatCount = (count?: number) => {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 1,
      notation: "compact",
    })
      .format(count ?? 0)
      .toLowerCase();
  };
  const tags = post.tags ?? post.tag_list ?? [];
  const coverImage = resolvePostCoverImage(post);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-(--color-card-border) bg-(--color-card-bg) transition-all duration-300 hover:border-(--color-primary) hover:shadow-lg hover:shadow-(--color-primary)/10">
      <a
        href={post.url}
        className="absolute inset-0 z-10"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read ${post.title}`}
      >
        <span className="sr-only">Read {post.title}</span>
      </a>

      {post.organization?.slug === "aws" && (
        <a
          href="https://dev.to/aws"
          className="absolute right-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-gray-700/50 bg-gray-900/85 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:border-(--color-primary) focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:ring-offset-2 focus:ring-offset-gray-950"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit AWS on DEV"
        >
          <img src={post.organization.profile_image_90} alt="" className="h-4 w-4 rounded-full" />
          <span>AWS</span>
        </a>
      )}

      <div className="aspect-video overflow-hidden bg-gray-900 border-b border-(--color-card-border)">
        {coverImage ? (
          <img src={coverImage} alt={post.title} className="w-full h-full object-cover" />
        ) : (
          <PlaceholderImage title={post.title} />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
          <time>{formatDate(post.published_at)}</time>
        </div>

        <h3 className="text-2xl font-semibold leading-tight text-white mb-3 line-clamp-2 group-hover:text-(--color-primary) transition-colors">
          {post.title}
        </h3>

        <div className="mt-auto flex items-end justify-between gap-4">
          {Array.isArray(tags) && tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs bg-gray-800 text-gray-300 rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : (
            <div />
          )}

          <div className="flex shrink-0 items-center gap-4 text-sm text-gray-400">
            <span className="inline-flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12 18 18.75 12 18.75 2.25 12 2.25 12z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                />
              </svg>
              <span className="sr-only">Views: </span>
              {formatCount(post.page_views_count)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"
                />
              </svg>
              <span className="sr-only">Reactions: </span>
              {formatCount(post.public_reactions_count)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h8m-8 4h5m8-2a9 9 0 1 1-4.2-7.6L21 3l-1.4 4.2A8.96 8.96 0 0 1 21 12z"
                />
              </svg>
              <span className="sr-only">Comments: </span>
              {formatCount(post.comments_count)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
