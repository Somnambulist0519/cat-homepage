/* ============================================================
   主题货架（Theme Shelf）— 单一来源的视觉令牌库
   ------------------------------------------------------------
   每套主题 = 一套完整的 light/dark 颜色集 + 共享令牌(圆角/阴影/字体)
   + 视觉 flag(glass / gradientBg)。
   Layout.astro 在构建期把激活主题的令牌以 CSS 变量注入 :root，
   全站样式即随之切换。组件内禁止硬编码颜色。
   ============================================================ */

export interface ThemeColorSet {
  background: string;
  foreground: string;
  accent: string;
  accentForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  card: string;
  glassBg: string;
  glassBorder: string;
  glassBlur: string;
  glassShadow: string;
  bgGradient: string;
}

export interface ThemeShared {
  radiusSm: string;
  radiusCard: string;
  radiusLg: string;
  shadowSoft: string;
  shadowCard: string;
  fontBody: string;
  fontHeading: string;
}

export interface ThemeFlags {
  glass: boolean;
  gradientBg: boolean;
}

export interface ThemePreset {
  id: string;
  name: string;
  desc: string;
  audience: string;
  light: ThemeColorSet;
  dark: ThemeColorSet;
  shared: ThemeShared;
  flags: ThemeFlags;
}

/* ---------- 字体栈 ---------- */
const SYS =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", "Helvetica Neue", "Microsoft YaHei", "Segoe UI", Roboto, system-ui, sans-serif';
const SERIF =
  'Georgia, "Songti SC", "SimSun", "Noto Serif SC", "Times New Roman", serif';
const MONO =
  'ui-monospace, "JetBrains Mono", "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

/* ---------- 基准令牌（苹果极简作底） ---------- */
const BASE_LIGHT: ThemeColorSet = {
  background: "#ffffff",
  foreground: "#1d1d1f",
  accent: "#4a6b8f",
  accentForeground: "#ffffff",
  muted: "#f5f5f7",
  mutedForeground: "#6e6e73",
  border: "#ededf0",
  card: "#ffffff",
  glassBg: "rgba(255,255,255,0.55)",
  glassBorder: "rgba(255,255,255,0.6)",
  glassBlur: "18px",
  glassShadow: "0 8px 32px rgba(0,0,0,0.08)",
  bgGradient:
    "linear-gradient(135deg, #eef2f8 0%, #f6f0f4 45%, #eef4f1 100%)",
};
const BASE_DARK: ThemeColorSet = {
  background: "#000000",
  foreground: "#f5f5f7",
  accent: "#7d9bbf",
  accentForeground: "#0a0a0a",
  muted: "#1c1c1e",
  mutedForeground: "#a1a1a6",
  border: "#2a2a2c",
  card: "#1c1c1e",
  glassBg: "rgba(28,28,30,0.55)",
  glassBorder: "rgba(255,255,255,0.12)",
  glassBlur: "20px",
  glassShadow: "0 8px 32px rgba(0,0,0,0.4)",
  bgGradient:
    "linear-gradient(135deg, #0a0e14 0%, #12101a 50%, #0b1014 100%)",
};
const BASE_SHARED: ThemeShared = {
  radiusSm: "10px",
  radiusCard: "14px",
  radiusLg: "18px",
  shadowSoft: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)",
  shadowCard: "0 1px 3px rgba(0,0,0,0.04)",
  fontBody: SYS,
  fontHeading: SYS,
};
const BASE_FLAGS: ThemeFlags = { glass: true, gradientBg: true };

/* ---------- 各主题覆盖项（只写差异） ---------- */
type Override = {
  light?: Partial<ThemeColorSet>;
  dark?: Partial<ThemeColorSet>;
  shared?: Partial<ThemeShared>;
  flags?: Partial<ThemeFlags>;
};

const RAW: Record<
  string,
  { name: string; desc: string; audience: string; override: Override }
> = {
  apple: {
    name: "苹果极简",
    desc: "近白底、低饱和灰、蓝点缀、无玻璃、克制阴影",
    audience: "通用 / 产品人",
    override: {
      flags: { glass: false, gradientBg: false },
      light: { bgGradient: "#ffffff" },
      dark: { bgGradient: "#000000" },
    },
  },
  glass: {
    name: "玻璃月光",
    desc: "柔和渐变底 + 半透明磨砂卡 + 发丝描边（默认）",
    audience: "设计 / 作品集",
    override: {},
  },
  "dark-neon": {
    name: "暗夜霓虹",
    desc: "近黑底、青/品红霓虹点缀、玻璃带微辉光",
    audience: "极客 / 二次元",
    override: {
      light: {
        background: "#0b1020",
        foreground: "#e8ecff",
        accent: "#22d3ee",
        accentForeground: "#04121a",
        muted: "#141b33",
        mutedForeground: "#9fb0d6",
        border: "#26305a",
        card: "#10182f",
        glassBg: "rgba(16,24,47,0.55)",
        glassBorder: "rgba(34,211,238,0.35)",
        glassBlur: "18px",
        glassShadow: "0 8px 32px rgba(34,211,238,0.18)",
        bgGradient:
          "linear-gradient(135deg, #070b18 0%, #131a3a 50%, #1a1030 100%)",
      },
      dark: {
        background: "#05060a",
        foreground: "#e8ecff",
        accent: "#22d3ee",
        accentForeground: "#04121a",
        muted: "#0e1426",
        mutedForeground: "#8fa0c8",
        border: "#1c2547",
        card: "#0a0f1f",
        glassBg: "rgba(10,15,31,0.6)",
        glassBorder: "rgba(34,211,238,0.4)",
        glassBlur: "20px",
        glassShadow: "0 8px 36px rgba(34,211,238,0.22)",
        bgGradient:
          "linear-gradient(135deg, #03040a 0%, #0c1030 50%, #150a26 100%)",
      },
    },
  },
  editorial: {
    name: "报纸杂志",
    desc: "衬线标题、暖纸色、经典排版、极简卡",
    audience: "写作者 / 专栏",
    override: {
      flags: { glass: false, gradientBg: false },
      shared: { fontHeading: SERIF },
      light: {
        background: "#faf8f3",
        foreground: "#2b2620",
        accent: "#8a5a2b",
        accentForeground: "#fffaf0",
        muted: "#f0ece3",
        mutedForeground: "#796b5a",
        border: "#e6ddcf",
        card: "#fffdf8",
        bgGradient: "#faf8f3",
      },
      dark: {
        background: "#16140f",
        foreground: "#ece6d8",
        accent: "#d6a25e",
        accentForeground: "#16140f",
        muted: "#221f17",
        mutedForeground: "#a99c84",
        border: "#34301f",
        card: "#1c1913",
        bgGradient: "#16140f",
      },
    },
  },
  bento: {
    name: "Bento 网格",
    desc: "圆角卡片拼贴、活泼强调色、网格感强",
    audience: "多面手 / 作品墙",
    override: {
      shared: { radiusCard: "20px", radiusLg: "26px" },
      light: {
        background: "#fbfbff",
        foreground: "#232336",
        accent: "#6366f1",
        accentForeground: "#ffffff",
        muted: "#eef0ff",
        mutedForeground: "#6b6f8a",
        border: "#e6e7fb",
        card: "#ffffff",
        glassBg: "rgba(255,255,255,0.7)",
        glassBorder: "rgba(99,102,241,0.25)",
        bgGradient:
          "linear-gradient(135deg, #eef0ff 0%, #fbeef6 45%, #eafaff 100%)",
      },
      dark: {
        background: "#0c0d18",
        foreground: "#e9e9ff",
        accent: "#818cf8",
        accentForeground: "#0c0d18",
        muted: "#15172a",
        mutedForeground: "#9a9cc4",
        border: "#272a4a",
        card: "#13152a",
        glassBg: "rgba(19,21,42,0.6)",
        glassBorder: "rgba(129,140,248,0.3)",
        bgGradient:
          "linear-gradient(135deg, #0a0b16 0%, #160e22 50%, #0a1420 100%)",
      },
    },
  },
  mint: {
    name: "薄荷清新",
    desc: "浅薄荷/teal 粉彩、柔和友好",
    audience: "生活 / 女性向",
    override: {
      light: {
        background: "#f0faf6",
        foreground: "#14342b",
        accent: "#10b981",
        accentForeground: "#ffffff",
        muted: "#e2f4ec",
        mutedForeground: "#5b8a78",
        border: "#d3ece0",
        card: "#ffffff",
        glassBg: "rgba(255,255,255,0.6)",
        glassBorder: "rgba(16,185,129,0.22)",
        bgGradient:
          "linear-gradient(135deg, #e6f7f0 0%, #eafaf4 50%, #e3f6fb 100%)",
      },
      dark: {
        background: "#061512",
        foreground: "#d8f3e8",
        accent: "#34d399",
        accentForeground: "#061512",
        muted: "#0d211c",
        mutedForeground: "#7fb8a4",
        border: "#163029",
        card: "#0b1d18",
        glassBg: "rgba(11,29,24,0.6)",
        glassBorder: "rgba(52,211,153,0.28)",
        bgGradient:
          "linear-gradient(135deg, #04110d 0%, #0a1f1a 50%, #06141a 100%)",
      },
    },
  },
  ink: {
    name: "墨痕国风",
    desc: "宣纸米白、墨黑 + 朱砂点缀、衬线",
    audience: "文化 / 国风",
    override: {
      flags: { glass: false, gradientBg: false },
      shared: { fontHeading: SERIF },
      light: {
        background: "#f5f1e8",
        foreground: "#1f1b16",
        accent: "#c0392b",
        accentForeground: "#fff7f0",
        muted: "#ece5d6",
        mutedForeground: "#7a6f5c",
        border: "#ddd5c5",
        card: "#fbf8f0",
        bgGradient: "#f5f1e8",
      },
      dark: {
        background: "#14110c",
        foreground: "#ece3d2",
        accent: "#e06b5a",
        accentForeground: "#14110c",
        muted: "#211d15",
        mutedForeground: "#a89a80",
        border: "#342e21",
        card: "#1b1712",
        bgGradient: "#14110c",
      },
    },
  },
  terminal: {
    name: "极客终端",
    desc: "深底、等宽字体、绿字终端感、直角",
    audience: "开发者 / 工具控",
    override: {
      flags: { glass: false, gradientBg: false },
      shared: {
        fontBody: MONO,
        fontHeading: MONO,
        radiusSm: "4px",
        radiusCard: "6px",
        radiusLg: "8px",
      },
      light: {
        background: "#f4f6f4",
        foreground: "#11231a",
        accent: "#1a7f37",
        accentForeground: "#f4f6f4",
        muted: "#e3eae4",
        mutedForeground: "#4f6b58",
        border: "#cdd8cd",
        card: "#ffffff",
        bgGradient: "#f4f6f4",
      },
      dark: {
        background: "#0d1117",
        foreground: "#c9d1d9",
        accent: "#3fb950",
        accentForeground: "#0d1117",
        muted: "#161b22",
        mutedForeground: "#8b949e",
        border: "#30363d",
        card: "#161b22",
        bgGradient: "#0d1117",
      },
    },
  },
  sunset: {
    name: "日落暖阳",
    desc: "橙粉渐变、温暖治愈",
    audience: "摄影 / 旅行",
    override: {
      light: {
        background: "#fff6ef",
        foreground: "#3a2418",
        accent: "#ff7a59",
        accentForeground: "#ffffff",
        muted: "#ffe9df",
        mutedForeground: "#a06a52",
        border: "#ffd9c9",
        card: "#ffffff",
        glassBg: "rgba(255,255,255,0.6)",
        glassBorder: "rgba(255,122,89,0.25)",
        bgGradient:
          "linear-gradient(135deg, #ffe7d6 0%, #ffd9e6 50%, #fff1d9 100%)",
      },
      dark: {
        background: "#1a0f0c",
        foreground: "#ffe7dc",
        accent: "#ff9166",
        accentForeground: "#1a0f0c",
        muted: "#261613",
        mutedForeground: "#c08d77",
        border: "#3a241d",
        card: "#21130f",
        glassBg: "rgba(33,19,15,0.6)",
        glassBorder: "rgba(255,145,102,0.3)",
        bgGradient:
          "linear-gradient(135deg, #160b08 0%, #2a1118 50%, #1c0f0a 100%)",
      },
    },
  },
  morandi: {
    name: "莫兰迪",
    desc: "低饱和大地色、高级灰、克制",
    audience: "艺术 / 极简控",
    override: {
      flags: { glass: false, gradientBg: false },
      light: {
        background: "#ece9e4",
        foreground: "#4a4742",
        accent: "#9a8c7a",
        accentForeground: "#fbf9f5",
        muted: "#e2ded7",
        mutedForeground: "#8a8478",
        border: "#d8d2c8",
        card: "#f6f3ee",
        bgGradient: "#ece9e4",
      },
      dark: {
        background: "#1c1b19",
        foreground: "#e6e2da",
        accent: "#b3a48f",
        accentForeground: "#1c1b19",
        muted: "#26241f",
        mutedForeground: "#a39c8d",
        border: "#39362f",
        card: "#23211d",
        bgGradient: "#1c1b19",
      },
    },
  },
};

/* ---------- 解析：合并基准 + 覆盖，得到完整预设 ---------- */
export const themes: ThemePreset[] = Object.entries(RAW).map(
  ([id, v]) =>
    ({
      id,
      name: v.name,
      desc: v.desc,
      audience: v.audience,
      light: { ...BASE_LIGHT, ...v.override.light },
      dark: { ...BASE_DARK, ...v.override.dark },
      shared: { ...BASE_SHARED, ...v.override.shared },
      flags: { ...BASE_FLAGS, ...v.override.flags },
    }) as ThemePreset,
);

export function getTheme(id: string): ThemePreset {
  return themes.find((t) => t.id === id) ?? themes.find((t) => t.id === "glass")!;
}

/** 向导列表用的精简信息 */
export const THEME_LIST = themes.map((t) => ({
  id: t.id,
  name: t.name,
  desc: t.desc,
  audience: t.audience,
  flags: t.flags,
}));

/**
 * 按视觉 flag 调整颜色集：
 * - glass=false → 玻璃卡退化为不透明实色卡（blur=0、边框=普通边框、无投影）
 * - gradientBg=false → 背景渐变退化为纯色（=background）
 */
export function applyFlags(
  preset: ThemePreset,
): { light: ThemeColorSet; dark: ThemeColorSet; flags: ThemeFlags } {
  const flat = (c: ThemeColorSet, bg: string): ThemeColorSet =>
    preset.flags.glass
      ? { ...c, bgGradient: preset.flags.gradientBg ? c.bgGradient : bg }
      : {
          ...c,
          glassBg: c.card,
          glassBorder: c.border,
          glassBlur: "0px",
          glassShadow: "none",
          bgGradient: preset.flags.gradientBg ? c.bgGradient : bg,
        };
  return {
    flags: preset.flags,
    light: flat(preset.light, preset.light.background),
    dark: flat(preset.dark, preset.dark.background),
  };
}
