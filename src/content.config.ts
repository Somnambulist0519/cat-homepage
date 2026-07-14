import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import config from "@/config";

export const BLOG_PATH = "src/content/posts";

// 日期统一用 ISO 字符串（Sveltia CMS 不支持 z.date()）。
// 允许传入 Date / 字符串，统一规整为 ISO；缺省回退到当前时间。
const isoDate = (fallback?: Date) =>
  z
    .union([z.date(), z.string()])
    .default(fallback ?? new Date())
    .transform((v) => (v instanceof Date ? v.toISOString() : new Date(v).toISOString()));

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(config.site.author),
      pubDatetime: isoDate(),
      modDatetime: z
        .union([z.date(), z.string()])
        .optional()
        .nullable()
        .transform((v) => (v ? (v instanceof Date ? v.toISOString() : new Date(v).toISOString()) : null)),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

const works = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/works" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    link: z.string().optional(),
    cover: z.string().optional(),
    weight: z.number().optional(),
    showInHome: z.boolean().optional().default(true),
    tags: z.array(z.string()).default([]),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
    canonicalURL: z.string().optional(),
  }),
});

export const collections = { posts, works, pages };
