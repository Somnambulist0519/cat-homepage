/* ============================================================
   搭建向导保存接口（仅本地开发可用）
   ------------------------------------------------------------
   向导 POST 当前配置 → 整体覆写 src/data/theme.config.ts。
   生产环境（静态构建/部署）返回 404，且站点不会暴露此接口。
   ============================================================ */
import type { APIRoute } from "astro";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export const GET: APIRoute = () =>
  new Response("Method Not Allowed", { status: 405 });

export const POST: APIRoute = async ({ request }) => {
  if (import.meta.env.PROD) {
    return new Response(JSON.stringify({ ok: false, error: "生产环境不可用" }), {
      status: 404,
    });
  }
  try {
    const body = await request.json();
    const ts = genThemeConfig(body);
    const target = fileURLToPath(
      new URL("../../data/theme.config.ts", import.meta.url),
    );
    writeFileSync(target, ts, "utf-8");
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
    });
  }
};

/* ---------- 参数归一化 ---------- */
const str = (v: unknown, d = ""): string =>
  typeof v === "string" ? v : d;
const num = (v: unknown): number | undefined =>
  typeof v === "number" ? v : undefined;
const bool = (v: unknown): boolean => v === true || v === "true";

function genThemeConfig(body: Record<string, any>): string {
  const theme = str(body?.theme, "glass");
  const accent = str(body?.accent);
  const radius = num(body?.radius);
  const fontHeading = str(body?.fontHeading);
  const fontBody = str(body?.fontBody);
  const glass =
    body?.glass === null || body?.glass === undefined
      ? "null"
      : bool(body?.glass)
        ? "true"
        : "false";

  const f = body?.features ?? {};
  const feat = (k: string, d = true) => (k in f ? bool(f[k]) : d);

  const lay = body?.layout ?? {};

  return `/* 此文件由搭建向导 /setup 生成，也可手动编辑。仅保存数据，逻辑见 ./theme.ts */
export interface Features {
  showHero: boolean;
  showWorks: boolean;
  showVideo: boolean;
  showContact: boolean;
  showSearch: boolean;
  showToc: boolean;
  showAuthorCard: boolean;
  showTags: boolean;
  showArchives: boolean;
  showRSS: boolean;
}

export interface LayoutWidth {
  homeWidth: "wide" | "normal";
  articleWidth: "read" | "wide";
}

export const themeConfig = {
  theme: ${JSON.stringify(theme)},
  accent: ${JSON.stringify(accent)},
  radius: ${radius === undefined ? "undefined" : radius},
  fontHeading: ${JSON.stringify(fontHeading)},
  fontBody: ${JSON.stringify(fontBody)},
  glass: ${glass},
  features: {
    showHero: ${feat("showHero")},
    showWorks: ${feat("showWorks")},
    showVideo: ${feat("showVideo")},
    showContact: ${feat("showContact")},
    showSearch: ${feat("showSearch")},
    showToc: ${feat("showToc")},
    showAuthorCard: ${feat("showAuthorCard")},
    showTags: ${feat("showTags")},
    showArchives: ${feat("showArchives")},
    showRSS: ${feat("showRSS")},
  } as Features,
  layout: {
    homeWidth: ${JSON.stringify(lay.homeWidth ?? "wide")},
    articleWidth: ${JSON.stringify(lay.articleWidth ?? "read")},
  } as LayoutWidth,
};
`;
}
