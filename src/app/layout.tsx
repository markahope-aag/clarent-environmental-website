import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Clarent Environmental — Compliance Made Simple",
    template: "%s | Clarent Environmental",
  },
  description:
    "Hazardous waste disposal for small businesses. Instant quotes, compliant pickup, complete documentation.",
  metadataBase: new URL("https://clarentenvironmental.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://clarentenvironmental.com",
    siteName: "Clarent Environmental",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
