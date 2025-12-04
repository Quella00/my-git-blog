import "./globals.css";

import { Providers } from "./providers";
import Header from "@/components/Header";

// 1. 实例化字体，并设置 variable


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body >
        <Providers>
          <Header />
          {/* 关键：max-w-2xl (约672px) 创造了那个紧凑的视觉效果 */}
          <main className="flex-1 w-full max-w-2xl mx-auto px-4">
            {children}
          </main>
          <footer className="py-8 text-center text-xs text-muted border-t border-transparent mt-10">
            © {new Date().getFullYear()} Yi. Built with Next.js & GitHub.
          </footer>
        </Providers>
      </body>
    </html>
  );
}