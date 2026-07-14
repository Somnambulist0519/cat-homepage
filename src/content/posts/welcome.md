---
title: 欢迎来到猫的主页
description: 这是站点的第一篇文章，顺便演示一下 Markdown 在苹果风主题下的呈现效果。
pubDatetime: 2026-07-12
tags:
  - 站点公告
  - 示例
---

这是「猫的主页」的第一篇文章。它同时也是一个**写作模板**——你可以直接复制这份文件，替换成自己的内容。

## 排版示例

苹果风主题下，标题、正文与引用都做了精修。一段普通的正文长这样：

> 留白不是空白，而是让内容呼吸的空间。好的排版，应该让人忘记排版本身。

### 列表

- 用 Obsidian 打开仓库里的 `src/content/posts/`
- 新建一个 `.md` 文件，填上 frontmatter
- 推送到 GitHub，站点会自动重新构建并部署

### 代码

```ts
// 一段 TypeScript 示例
function greet(name: string): string {
  return `你好，${name}！`;
}

console.log(greet("猫的主人"));
```

### 提示框

> [!NOTE]
> 图片直接放在文章同目录即可，在 Obsidian 里插入本地图后会自动随仓库管理。

> [!TIP]
> 暗色模式点右上角的切换按钮；偏好会被记住。

## 视频

想在正文里放视频？**单独一行贴上链接即可**，构建时会自动变成播放器。支持 B站、YouTube、以及自托管到腾讯云 COS 的视频文件（`.mp4`/`.webm`/`.mov`）。例如：

https://www.bilibili.com/video/BV1GJ411x7h7

（抖音无公开嵌入接口；YouTube 对无科学上网环境的访客不可见，按需选用。）

## 接下来

去 `src/content/posts/` 写下你自己的第一篇吧。
