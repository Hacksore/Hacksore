export interface Post {
  id: string;
  title: string;
  url: string;
  content: string;
  cover_image?: string;
  published_at: string;
  reading_time_minutes?: number;
  tags?: string[];
}

export const PostCard = ({ post }: { post: Post }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <a
      href={post.url}
      className="group block bg-(--color-card-bg) border border-(--color-card-border) rounded-lg overflow-hidden transition-all duration-300 hover:border-(--color-primary) hover:shadow-lg hover:shadow-(--color-primary)/10"
      target="_blank"
      rel="noopener noreferrer"
    >
      {post.cover_image && (
        <div className="aspect-video overflow-hidden bg-gray-900">
          <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
          <time>{formatDate(post.published_at)}</time>
        </div>

        <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 group-hover:text-(--color-primary) transition-colors">
          {post.title}
        </h3>

        <p className="text-gray-300 line-clamp-3 mb-4">
          {post.content ? `${post.content.replace(/<[^>]*>/g, "").substring(0, 150)}...` : ""}
        </p>

        {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-md">
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-md">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </a>
  );
};
