/* ============================================================
   激活主题配置（纯数据）— 搭建向导 /setup 会整体覆写此文件
   ------------------------------------------------------------
   只保存数据，解析逻辑见 ./theme.ts。手动编辑也可。
   ============================================================ */
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
  /** 当前激活主题 id（对应 themes.ts 中的一套预设） */
  theme: "glass",

  /** 可选覆盖项（留空则使用主题默认） */
  accent: "" as string,
  radius: undefined as number | undefined,
  fontHeading: "" as string,
  fontBody: "" as string,
  /** null = 跟随主题默认；true/false = 强制开/关玻璃卡 */
  glass: null as boolean | null,

  /** 功能块开关（向导可逐项切换） */
  features: {
    showHero: true,
    showWorks: true,
    showVideo: true,
    showContact: true,
    showSearch: true,
    showToc: true,
    showAuthorCard: true,
    showTags: true,
    showArchives: true,
    showRSS: true,
  } as Features,

  /** 布局宽度 */
  layout: {
    homeWidth: "wide",
    articleWidth: "read",
  } as LayoutWidth,
};
