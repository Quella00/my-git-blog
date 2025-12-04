"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // 如果没有这个工具函数，请看文末补充
import { Sun, Moon, Github, PenLine } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: "Guestbook", path: "/guestbook" }, // 仅做展示，暂无功能
];

export default function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* 左侧导航 */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "relative px-3 py-1 text-sm transition-colors duration-200",
                  isActive ? "text-foreground font-medium" : "text-muted hover:text-foreground"
                )}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* 右侧功能区 */}
        <div className="flex items-center gap-3">
          {/* Admin入口 (隐蔽一点) */}
          <Link href="/admin/editor" className="text-muted hover:text-foreground transition-colors" title="Write Post">
            <PenLine size={18} />
          </Link>
          
          <a 
            href="https://github.com/Quella00/my-git-blog" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors"
          >
            <Github size={18} />
          </a>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-muted hover:text-foreground transition-colors focus:outline-none"
          >
            {mounted && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}