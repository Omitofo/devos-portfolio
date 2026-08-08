export const siteConfig = {
  name: "Renatus Cartesius",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://renatuscartesius.com",
  description: "Designer and developer focused on calm, precise digital products.",
  locale: "en_US",
} as const;

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, siteConfig.url).toString();
}
