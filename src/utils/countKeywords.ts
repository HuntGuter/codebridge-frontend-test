export function countKeywords(text: string, keyword: string): number {
  if (!keyword) return 0;

  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matches = new RegExp(`\\b${escapedKeyword}\\b`, "gi");

  return text.match(matches)?.length ?? 0;
}
