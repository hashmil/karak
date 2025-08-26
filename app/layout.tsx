import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "How Many Karaks Is That? | UAE Dirham to Karak Calculator",
  description: "Convert any AED amount into cups of delicious karak chai! A fun calculator that puts prices into the only metric that truly matters in the UAE.",
  keywords: "karak, chai, UAE, dirham, AED, calculator, tea, price converter",
  authors: [{ name: "Karak Calculator" }],
  creator: "Karak Calculator",
  publisher: "Karak Calculator",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" }
    ],
  },
  openGraph: {
    title: "How Many Karaks Is That?",
    description: "Convert any AED amount into cups of delicious karak chai!",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "How Many Karaks Is That?",
    description: "Convert any AED amount into cups of delicious karak chai!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} font-bricolage antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
