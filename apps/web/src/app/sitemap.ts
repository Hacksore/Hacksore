import type { MetadataRoute } from "next";

const URL = "https://hacksore.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${URL}/`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/uses`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/phone`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/keyboard`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/guestbook`,
      lastModified: new Date(),
    },
  ];
}
