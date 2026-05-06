import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Clarent Environmental",
    template: "%s — Clarent Environmental",
  },
  description: "Compliance made simple. Hazardous waste broker for Small Quantity Generators.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
