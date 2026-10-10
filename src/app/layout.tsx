import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "Bazar Dor App",
  description: "A Next.js 16 app with Tailwind CSS, TypeScript",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="light" className={`${notoSansBengali.className}  h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F0F5F0]">
        <Header />
        <Marquee />
        <main className="flex flex-1 flex-col container mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
      