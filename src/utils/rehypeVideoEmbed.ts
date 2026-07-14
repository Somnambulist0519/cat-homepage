import { visit } from "unist-util-visit";

/**
 * rehypeVideoEmbed —— 正文媒体自动内嵌
 * ---------------------------------------------------------------------------
 * 在 Markdown 正文里「单独占一行」贴一条视频链接，构建时自动转成播放器：
 *   - B站    ：https://www.bilibili.com/video/BV1xx411c7mD  → player.bilibili.com iframe
 *   - YouTube：https://youtu.be/dQw4w9WgXcQ 或 watch?v=...   → youtube.com/embed iframe
 *   - 自托管 ：https://<COS>/xxx.mp4 / .webm / .mov          → 原生 <video> 直链
 *
 * 识别条件：某个 <p> 段落的唯一有效内容，是一个指向上述来源的链接
 * （自动链接的 <a>，或裸文本 URL）。其余情况保持原样，不误伤正文里的普通链接。
 *
 * 说明：抖音无公开 embed、YouTube 对无科学上网访客不可见——见方案设计「媒体嵌入规范」。
 */

type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
  value?: string;
};

const BILI_RE = /bilibili\.com\/video\/(BV[0-9A-Za-z]+)/i;
const YT_WATCH_RE = /(?:youtube\.com\/watch\?[^)\s]*v=|youtu\.be\/)([0-9A-Za-z_-]{6,})/i;
const VIDEO_FILE_RE = /^https?:\/\/[^\s)]+\.(mp4|webm|mov)(\?[^\s)]*)?$/i;

/** 把一条 URL 解析成对应的嵌入信息；无法识别返回 null */
function resolveEmbed(
  url: string
): { kind: "iframe"; src: string } | { kind: "video"; src: string } | null {
  const bili = url.match(BILI_RE);
  if (bili) {
    return {
      kind: "iframe",
      src: `https://player.bilibili.com/player.html?bvid=${bili[1]}&autoplay=0&high_quality=1`,
    };
  }
  const yt = url.match(YT_WATCH_RE);
  if (yt) {
    return { kind: "iframe", src: `https://www.youtube.com/embed/${yt[1]}` };
  }
  if (VIDEO_FILE_RE.test(url)) {
    return { kind: "video", src: url };
  }
  return null;
}

/** 从一个 <p> 段落里提取「唯一的 URL」；若段落含其它有效内容则返回 null */
function extractSoleUrl(p: HastNode): string | null {
  const kids = (p.children ?? []).filter(
    (c) => !(c.type === "text" && typeof c.value === "string" && c.value.trim() === "")
  );
  if (kids.length !== 1) return null;
  const only = kids[0];

  // 情况 1：自动链接 <a href="...">...</a>
  if (only.type === "element" && only.tagName === "a") {
    const href = only.properties?.href;
    if (typeof href === "string") return href.trim();
  }
  // 情况 2：裸文本 URL
  if (only.type === "text" && typeof only.value === "string") {
    const txt = only.value.trim();
    if (/^https?:\/\/\S+$/.test(txt)) return txt;
  }
  return null;
}

function buildEmbedNode(embed: NonNullable<ReturnType<typeof resolveEmbed>>): HastNode {
  const inner: HastNode =
    embed.kind === "iframe"
      ? {
          type: "element",
          tagName: "iframe",
          properties: {
            src: embed.src,
            title: "视频",
            loading: "lazy",
            frameborder: "0",
            allow:
              "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowfullscreen: true,
            class: "h-full w-full",
          },
          children: [],
        }
      : {
          type: "element",
          tagName: "video",
          properties: {
            src: embed.src,
            controls: true,
            preload: "metadata",
            playsinline: true,
            class: "h-full w-full",
          },
          children: [],
        };

  return {
    type: "element",
    tagName: "div",
    properties: {
      class: "rounded-card glass my-6 overflow-hidden not-prose",
    },
    children: [
      {
        type: "element",
        tagName: "div",
        properties: { class: "aspect-video w-full" },
        children: [inner],
      },
    ],
  };
}

export function rehypeVideoEmbed() {
  return (tree: HastNode) => {
    visit(tree as never, "element", (node: HastNode) => {
      if (node.tagName !== "p") return;
      const url = extractSoleUrl(node);
      if (!url) return;
      const embed = resolveEmbed(url);
      if (!embed) return;
      // 原地把该 <p> 改写成嵌入容器
      const built = buildEmbedNode(embed);
      node.tagName = built.tagName;
      node.properties = built.properties;
      node.children = built.children;
    });
  };
}

export default rehypeVideoEmbed;
