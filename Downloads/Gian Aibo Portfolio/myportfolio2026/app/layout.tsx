import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PerformanceProvider } from "@/components/performance-provider";
import { CopyModeProvider } from "@/components/copy-mode-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gianaibo.tech";

export const metadata: Metadata = {
  title: "Gian Aibo Portfolio 2025",
  description: "Computer Scientist | Product Designer | AI Enthusiast | Community Leader",
  metadataBase: new URL(baseUrl),
  icons: {
    icon: "/lib/image.jpeg",
    apple: "/lib/image.jpeg",
  },
  openGraph: {
    title: "Gian Aibo Portfolio 2025",
    description: "Computer Scientist | Product Designer | AI Enthusiast | Community Leader",
    type: "website",
    url: baseUrl,
    siteName: "Gian Aibo Portfolio",
    images: [
      {
        url: "/portfolio-screenshots/og-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Gian Aibo Portfolio Homepage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gian Aibo Portfolio 2025",
    description: "Computer Scientist | Product Designer | AI Enthusiast | Community Leader",
    images: ["/portfolio-screenshots/og-hero.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <PerformanceProvider>
            <CopyModeProvider>
              {children}
            </CopyModeProvider>
          </PerformanceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
