import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Portfolio - Expert IA & Développement Web",
  description: "Portfolio d'un expert en génération d'images IA avec prompts avancés et développement d'applications web modernes. Découvrez mes projets et créations numériques innovantes.",
  keywords: ["IA", "Intelligence Artificielle", "Prompt Engineering", "Développement Web", "Next.js", "React", "Portfolio", "Midjourney", "DALL-E", "Stable Diffusion"],
  authors: [{ name: "Portfolio Expert" }],
  openGraph: {
    title: "Portfolio - Expert IA & Développement Web",
    description: "Spécialisé dans la génération d'images IA et le développement d'applications web modernes",
    url: defaultUrl,
    siteName: "Portfolio",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Portfolio Expert IA & Web Development",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Expert IA & Développement Web",
    description: "Spécialisé dans la génération d'images IA et le développement d'applications web modernes",
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
