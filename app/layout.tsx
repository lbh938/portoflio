import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Portfolio - Expert en Développement Web",
  description: "Portfolio d'un expert en développement d'applications web modernes, performantes et élégantes. Découvrez mes projets web et créations numériques innovantes.",
  keywords: ["Développement Web", "Next.js", "React", "TypeScript", "Portfolio", "Web Development", "Frontend", "Full Stack", "Applications Web"],
  authors: [{ name: "Portfolio Expert" }],
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌐</text></svg>',
    apple: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌐</text></svg>',
  },
  openGraph: {
    title: "Portfolio - Expert en Développement Web",
    description: "Spécialisé dans le développement d'applications web modernes, performantes et élégantes",
    url: defaultUrl,
    siteName: "Portfolio",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Portfolio Expert Web Development",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Expert en Développement Web",
    description: "Spécialisé dans le développement d'applications web modernes, performantes et élégantes",
    images: ["/twitter-image.png"],
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        {/* Global glassmorphism background */}
        <div className="fixed inset-0 -z-10">
          <div className="radial-grid absolute inset-0 opacity-40" />
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        </div>
        
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
