# 猫的主页 · Apple 风个人站模板

一个基于 [Astro Paper](https://github.com/satnaing/astro-paper) 改造的**极简苹果风**个人站点模板，可 Fork 即用：

- 🍎 **苹果风 · 玻璃拟态**：大面积留白、统一圆角、克制玻璃质感、低饱和配色、系统字体、平滑暗色过渡。
- 🎨 **主题货架 + 搭建向导**：本地跑 `/setup`，像搭积木一样选主题（10 套）、开关功能块、调布局与视觉细节，右侧实时预览；读者前台只看成品，看不到搭建过程。
- 📝 **两种写作方式**：用 **Obsidian** 直接改 `src/content/` 的 Markdown；或打开 `/admin` **网页后台**（Sveltia CMS）在线写文章、传图传视频、管作品，零后端。
- 🎬 **正文媒体自动内嵌**：正文里单独一行贴视频链接，自动变播放器（B站 / YouTube / 腾讯云 COS 自托管）。
- ☁️ **自建腾讯云**：静态产物部署到腾讯云 COS + CDN（备案后），数据/后台/域名全归你。

---

## 1. Fork 三步上手

### 第 ① 步：跑起来 + 改身份

```bash
npm install
npm run dev        # 打开 http://localhost:4321
```

只需改两个文件填上你自己的信息：

| 文件 | 作用 |
|------|------|
| `src/site.config.ts` | 姓名、简介、头像、联系邮箱、背景图 |
| `astro-paper.config.ts` | 站名、作者、描述、社交链接、`site.url`（你的域名） |

### 第 ② 步：选外观（搭建向导 `/setup`）

```bash
npm run dev
# 浏览器打开 http://localhost:4321/setup
```

- 左侧：**主题货架**（10 套皮肤）+ 视觉细节（玻璃/扁平、强调色、圆角、字体）+ 布局宽度 + 10 个功能块开关。
- 右侧：iframe **实时预览**。
- 点「保存配置」→ 写入 `src/data/theme.config.ts`，下次构建即固化。

> `/setup` **仅本地开发可见**，生产构建自动隔离，读者前台访问会重定向到首页。

### 第 ③ 步：部署到腾讯云 COS

见下方第 4 节。推到 GitHub 后每次 `git push` 自动构建部署。

---

## 2. 写内容：Obsidian 或网页后台二选一

### 方式 A：Obsidian（本地）

用 Obsidian 打开项目文件夹，文章写在 `src/content/posts/`，新建 `.md` 并加 frontmatter：

```markdown
---
title: 我的文章
description: 一句话摘要
pubDatetime: 2026-07-12T10:00
tags: [随笔]
---

正文用 Markdown 写，支持代码块、图片、表格、Callout。
```

图片放进 `public/` 或同目录，用 `/` 或相对路径引用。

### 方式 B：网页后台 `/admin`（Sveltia CMS，推荐给非技术用户）

部署后打开 `https://你的域名/admin`，用 GitHub 登录即可在网页写文章、上传图片/视频、管理作品——**无需改代码**。首次使用需一次性配置（见第 3 节）。

三个内容集合：**文章**（`src/content/posts`）、**作品**（`src/content/works`）、**单页**（`src/content/pages`）。

---

## 3. 启用网页后台 `/admin`（一次性配置）

Sveltia CMS 用 GitHub OAuth 登录，需你建一个 **GitHub OAuth App**（免费、无 secret 泄露风险，用 PKCE）：

1. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**：
   - **Homepage URL**：`https://你的域名`
   - **Authorization callback URL**：`https://你的域名/admin`
2. 编辑 `public/admin/config.yml`，把 `repo` 改成你自己的仓库：

   ```yaml
   backend:
     name: github
     repo: 你的GitHub用户名/你的仓库名   # ← 改这里
     branch: main
   ```

3. 推送后访问 `https://你的域名/admin`，用 GitHub 授权即可开始写作。

> 上传的图片/视频会存进仓库 `public/` 目录，随内容一起提交。

---

## 4. 部署到腾讯云 COS（自动）

1. 仓库推到 GitHub，在 **Settings → Secrets and variables → Actions** 添加：
   - `COS_SECRET_ID`、`COS_SECRET_KEY`（腾讯云访问密钥）
   - `COS_BUCKET`（格式 `桶名-APPID`）、`COS_REGION`（如 `ap-guangzhou`）
   - `SITE_BASE_URL`（你的域名，备案后填）
2. 改 `astro-paper.config.ts` 的 `site.url` 为你的域名。
3. 每次 `git push` 到 `main`，`.github/workflows/deploy.yml` 自动构建并上传到 COS。

### 域名与备案
- 域名需完成 **ICP 备案**（约 1–2 周）才能绑国内 CDN。备案期间可用 COS 默认地址验证。
- 备案通过后：开启 CDN，把域名 CNAME 到 COS/CDN 地址，并在 `deploy.yml` 取消「CDN 刷新」注释。

---

## 5. 正文里放视频

在文章正文里**单独一行**贴链接，构建时自动转成播放器：

```markdown
https://www.bilibili.com/video/BV1xx411c7mD
https://youtu.be/dQw4w9WgXcQ
https://你的COS域名/videos/demo.mp4
```

- 支持：B站（`bilibili.com/video/BV...`）、YouTube（`watch?v=` / `youtu.be`）、自托管视频文件（`.mp4`/`.webm`/`.mov`）。
- 不支持：抖音（无公开嵌入接口）；YouTube 对无科学上网环境的访客不可见，按需选用。

---

## 技术栈

- [Astro](https://astro.build) v7（静态生成）+ Tailwind CSS v4
- 主题系统：`src/data/themes.ts`（预设库）+ `theme.config.ts`（激活配置，向导写入）
- 内容后台：[Sveltia CMS](https://github.com/sveltia/sveltia-cms)（Git-based，零后端）
- 部署：GitHub Actions → 腾讯云 COS（+ CDN）

## License

基于 Astro Paper（MIT）改造，遵循其许可证。
