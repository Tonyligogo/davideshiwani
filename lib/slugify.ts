export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")   // strip punctuation
    .replace(/\s+/g, "-")        // spaces → hyphens
    .replace(/-+/g, "-");        // collapse repeated hyphens
}