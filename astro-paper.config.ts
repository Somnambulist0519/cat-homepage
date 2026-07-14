import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  // ============================================================
  //  Fork 用户只需改这里 + src/site.config.ts
  //  - url: 你的线上域名（备案后填，例如 https://yourdomain.com）
  //  - title / author / description: 站名与作者
  //  - socials: 你的社交链接
  // ============================================================
  site: {
    url: "https://your-domain.com/",
    title: "猫的主页",
    description: "用 Obsidian 写作、Astro 生成、腾讯云托管的小站。",
    author: "猫的主人",
    profile: "https://your-domain.com",
    ogImage: "default-og.png",
    lang: "zh-CN",
    timezone: "Asia/Shanghai",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: false,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: "https://github.com/your-name/your-repo/edit/main/",
    },
    search: "pagefind",
  },
  socials: [
    // 把 url 改成你自己的。可用图标：github / x / linkedin / mail / weibo / bilibili 等
    { name: "github",   url: "https://github.com/your-name" },
    { name: "x",        url: "https://x.com/your-name" },
    { name: "linkedin", url: "https://www.linkedin.com/in/your-name/" },
    { name: "mail",     url: "mailto:you@example.com" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});