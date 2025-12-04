"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, PenTool } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight">Blog.</Link>
        <div className="flex gap-4 items-center">
          <Link href="/admin/editor" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"><PenTool size={18}/></Link>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2">
            {mounted && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}