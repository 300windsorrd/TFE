import React, { useMemo } from "react";
import TheseFreakinEmpanadas, { type HeroImage, type MenuItem } from "./lib";
import { MenuJSONLD } from "./lib/seo";
import heroImagesRaw from "./data/hero.json";
import menuDataRaw from "./data/menu.json";

type RawMenuItem = MenuItem & {
  pricesJson?: string;
  orderLinksJson?: string;
  tagsJson?: string;
};

function normalizeMenu(data: unknown): MenuItem[] {
  if (!Array.isArray(data)) return [];
  return (data as RawMenuItem[]).map((item) => ({
    ...item,
    prices: item.prices ?? (item.pricesJson ? JSON.parse(item.pricesJson) : undefined),
    orderLinks: item.orderLinks ?? (item.orderLinksJson ? JSON.parse(item.orderLinksJson) : undefined),
    tags: item.tags ?? (item.tagsJson ? JSON.parse(item.tagsJson) : undefined)
  }));
}

export default function App() {
  const menuItems = useMemo(() => normalizeMenu(menuDataRaw), []);
  const sections = useMemo(() => {
    const byCategory: Record<string, MenuItem[]> = {};
    for (const item of menuItems) {
      const key = item.category ?? "Menu";
      (byCategory[key] ||= []).push(item);
    }
    return Object.entries(byCategory).map(([name, items]) => ({ name, items }));
  }, [menuItems]);

  return (
    <div className="tfe-page">
      <TheseFreakinEmpanadas heroImages={heroImagesRaw as HeroImage[]} items={menuItems} />
      <MenuJSONLD sections={sections} />
    </div>
  );
}
