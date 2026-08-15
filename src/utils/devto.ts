import { DEVTO_TOKEN } from "astro:env/server";
import type { Post } from "../components/post-card";

const DEVTO_ARTICLES_ENDPOINT = "https://dev.to/api/articles/me/published";

export const byPublishedDesc = (a: Post, b: Post) =>
  new Date(b.published_at).getTime() - new Date(a.published_at).getTime();

export const fetchPublishedArticlesPage = async (page = 1, perPage = 50): Promise<Post[]> => {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  });

  return (await fetch(`${DEVTO_ARTICLES_ENDPOINT}?${params.toString()}`, {
    headers: {
      "api-key": DEVTO_TOKEN,
    },
  }).then((res) => res.json())) as Post[];
};

export const fetchAllPublishedArticles = async (perPage = 100): Promise<Post[]> => {
  const allArticles: Post[] = [];
  let page = 1;

  while (true) {
    const currentPage = await fetchPublishedArticlesPage(page, perPage);
    allArticles.push(...currentPage);

    if (currentPage.length < perPage) {
      break;
    }

    page += 1;
  }

  return allArticles;
};
