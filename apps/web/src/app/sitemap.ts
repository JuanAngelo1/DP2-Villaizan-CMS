// app/sitemap.ts

import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0
    }
  ]
}