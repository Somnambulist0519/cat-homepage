/* ============================================================
   Personal site configuration  —  EDIT THIS FILE TO MAKE IT YOURS
   ------------------------------------------------------------
   This is the only file a forked user needs to touch for the
   personal bits (name, bio, avatar, socials, contact endpoint,
   Tencent Cloud bucket). Everything else reads from here.
   The AstroPaper engine config lives in `astro-paper.config.ts`.
   ============================================================ */
export const site = {
  /** Your name shown on the landing hero */
  name: "猫的主人",
  /** A short tagline under your name (Apple-style one-liner) */
  tagline: "写作 · 设计 · 用作品记录思考",
  /** One-paragraph intro shown on the landing page */
  bio: "这里是我用 Obsidian 写作、Astro 生成、腾讯云托管的小站。记录学习、项目与一些不成熟的想法。",
  /** Avatar / profile image (drop a file in /public or /src/assets) */
  avatar: "/avatar.svg",
  /** Accent color override (optional). Leave empty to use theme default. */
  accent: "",
  /**
   * Full-page background image (light mode).
   * Drop a file in /public (e.g. "/bg-light.jpg") and put its path here.
   * Leave "" to use the built-in soft gradient placeholder.
   * Recommended: 1920×1080+, JPG/WebP, < 500KB, low-contrast / abstract.
   */
  backgroundImage: "",
  /** Background image for dark mode. Leave "" to reuse the dark gradient placeholder. */
  backgroundImageDark: "",
} as const;

/**
 * 作品由内容集合 `src/content/works/*.md` 统一管理（可在 /admin 后台在线编辑），
 * 见 `src/utils/getWorks.ts`。这里不再维护硬编码副本，保证「单一权威来源」。
 */

/**
 * Contact / subscribe form.
 * `endpoint` is intentionally left empty — the backend is "reserved".
 * Wire it later to Formspree or a Tencent Cloud SCF function.
 */
export const contact = {
  endpoint: "", // e.g. "https://formspree.io/f/xxxx" or your SCF API gateway URL
  email: "you@example.com",
  placeholder: {
    name: "你的称呼",
    email: "邮箱",
    message: "想说的话",
  },
} as const;

/**
 * Tencent Cloud COS deployment config.
 * Values are read from environment variables at build time
 * (see .github/workflows/deploy.yml and scripts/deploy-cos.sh).
 * They are NOT stored in this file.
 */
export const tencent = {
  bucket: process.env.COS_BUCKET ?? "",
  region: process.env.COS_REGION ?? "ap-guangzhou",
  baseUrl: process.env.SITE_BASE_URL ?? "",
} as const;
