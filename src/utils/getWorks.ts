import { getCollection } from "astro:content";

export type WorkItem = {
  title: string;
  description?: string;
  link?: string;
  cover?: string;
  weight?: number;
  showInHome?: boolean;
  tags: string[];
};

/**
 * 作品数据的唯一来源：`src/content/works/*.md` 内容集合（可在 /admin 后台在线编辑）。
 * 排序：weight 升序（未设置排最后）；首页只取 showInHome 为 true 的项。
 */
export async function getWorks(): Promise<WorkItem[]> {
  const entries = await getCollection("works");
  const items: WorkItem[] = entries.map((e) => ({
    title: e.data.title,
    description: e.data.description,
    link: e.data.link,
    cover: e.data.cover,
    weight: e.data.weight,
    showInHome: e.data.showInHome,
    tags: e.data.tags ?? [],
  }));
  return items.sort((a, b) => (a.weight ?? 999) - (b.weight ?? 999));
}

/** 首页作品墙：仅 showInHome 为 true（缺省也算）的项 */
export async function getHomeWorks(): Promise<WorkItem[]> {
  const all = await getWorks();
  return all.filter((w) => w.showInHome !== false);
}
