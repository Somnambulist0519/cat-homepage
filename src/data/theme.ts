/* ============================================================
   主题解析逻辑（单一来源的计算层）
   ------------------------------------------------------------
   把 theme.config.ts(数据) + themes.ts(预设) 解析成：
   - resolveActiveTheme(params?)  主题令牌，支持 ?preview/glass/accent/radius/font 覆盖
   - resolveFeatures(params?)     功能块开关，支持 ?f= 覆盖
   - resolveLayout(params?)       布局宽度，支持 ?home/?article= 覆盖
   Layout / 页面用这些函数，既读"已保存配置"，也支持向导实时预览。
   ============================================================ */
import {
  getTheme,
  applyFlags,
  type ThemePreset,
  type ThemeColorSet,
  type ThemeFlags,
} from "./themes";
import { themeConfig, type Features, type LayoutWidth } from "./theme.config";

export type { Features, LayoutWidth } from "./theme.config";
export { themeConfig } from "./theme.config";

/** 已保存配置解析出的主题（无预览参数时使用） */
export const activeTheme = resolveActiveTheme(null);

/**
 * 解析激活主题令牌。
 * 优先级：URL 参数 > themeConfig 覆盖 > 主题预设。
 */
export function resolveActiveTheme(
  params?: URLSearchParams | null,
): ThemePreset {
  const id = params?.get("preview") ?? themeConfig.theme;
  const base = getTheme(id);

  // 玻璃开关：URL > 配置 > 主题默认
  const flags: ThemeFlags = { ...base.flags };
  if (themeConfig.glass !== null) flags.glass = themeConfig.glass;
  const g = params?.get("glass");
  if (g === "0") flags.glass = false;
  else if (g === "1") flags.glass = true;

  const { light, dark } = applyFlags({ ...base, flags });
  let L: ThemeColorSet = { ...light };
  let D: ThemeColorSet = { ...dark };
  const shared = { ...base.shared };

  // 强调色
  const accent = params?.get("accent") || themeConfig.accent;
  if (accent) {
    L = { ...L, accent, accentForeground: "#ffffff" };
    D = { ...D, accent, accentForeground: "#ffffff" };
  }
  // 圆角
  const radiusRaw = params?.get("radius")
    ? Number(params.get("radius"))
    : themeConfig.radius;
  if (typeof radiusRaw === "number" && !Number.isNaN(radiusRaw)) {
    shared.radiusSm = `${Math.max(0, Math.round(radiusRaw * 0.7))}px`;
    shared.radiusCard = `${radiusRaw}px`;
    shared.radiusLg = `${radiusRaw + 4}px`;
  }
  // 字体
  const fb = params?.get("fontBody") || themeConfig.fontBody;
  if (fb) shared.fontBody = fb;
  const fh = params?.get("fontHeading") || themeConfig.fontHeading;
  if (fh) shared.fontHeading = fh;

  return {
    id: base.id,
    name: base.name,
    desc: base.desc,
    audience: base.audience,
    flags,
    light: L,
    dark: D,
    shared,
  };
}

/** 解析功能块开关（?f=逗号列表 表示"启用项"） */
export function resolveFeatures(params?: URLSearchParams | null): Features {
  const f = params?.get("f");
  if (!f) return themeConfig.features;
  if (f === "none") {
    const out = {} as Features;
    for (const k of Object.keys(themeConfig.features) as (keyof Features)[]) {
      out[k] = false;
    }
    return out;
  }
  const enabled = new Set(
    f.split(",").map((s) => s.trim()).filter(Boolean),
  );
  const out = { ...themeConfig.features };
  for (const k of Object.keys(out) as (keyof Features)[]) {
    out[k] = enabled.has(k);
  }
  return out;
}

/** 解析布局宽度（?home=wide|normal  ?article=read|wide） */
export function resolveLayout(params?: URLSearchParams | null): LayoutWidth {
  const home = params?.get("home");
  const article = params?.get("article");
  return {
    homeWidth:
      home === "normal" || home === "wide"
        ? home
        : themeConfig.layout.homeWidth,
    articleWidth:
      article === "read" || article === "wide"
        ? article
        : themeConfig.layout.articleWidth,
  };
}

/** 给页面用的容器宽度工具类 */
export function widthClass(
  kind: "home" | "article",
  params?: URLSearchParams | null,
): string {
  const layout = resolveLayout(params);
  if (kind === "home") {
    return layout.homeWidth === "normal"
      ? "mx-auto w-full max-w-4xl px-4 sm:px-6"
      : "app-wide";
  }
  return layout.articleWidth === "wide" ? "app-wide" : "app-read";
}
