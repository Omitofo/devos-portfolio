import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ContactSection } from "@/components/contact-section";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Renatus Cartesius",
    template: "%s · Renatus Cartesius",
  },
  description:
    "Designer and developer focused on calm, precise digital products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <SiteHeader />
        <main className="site-main">{children}</main>
        <ContactSection />
        <SiteFooter />
      </body>
    </html>
  );
}
