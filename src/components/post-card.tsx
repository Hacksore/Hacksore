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
    return post.social_image;
  }

  const youtubeVideoId = getYouTubeVideoId(post.cover_image);
  if (youtubeVideoId) {
    return `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`;
  }

  return post.cover_image;
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

      {coverImage && (
        <div className="aspect-video overflow-hidden bg-gray-900 border-b border-(--color-card-border)">
          <img src={coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

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
