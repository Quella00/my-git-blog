import Link from "next/link";
import { getPosts } from "@/lib/github";
import { ArrowUpRight } from "lucide-react";

export default async function Home() {
  const posts = await getPosts();
  // 仅取最近 3 篇
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="py-10 space-y-12">
      {/* Hero Section */}
      <section className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">
          Hello, I'm Yi. 👋
        </h1>
        <p className="text-muted leading-relaxed max-w-lg">
          I'm a software engineer, an open source contributor, and a writer.
          This website is my digital garden, powered by{" "}
          <span className="font-medium text-foreground">GitHub & Next.js</span>.
        </p>
      </section>

      {/* Writing Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-lg">Writing</h2>
          <Link href="/blog" className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1">
            View all
          </Link>
        </div>
        
        <div className="flex flex-col space-y-6">
          {recentPosts.map((post: any) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <span className="font-medium text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </span>
                <span className="text-sm text-muted font-mono tabular-nums">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Projects Section (模拟数据) */}
      <section>
        <h2 className="font-semibold text-lg mb-6">Projects</h2>
        <div className="grid gap-4">
          <a href="#" className="p-4 rounded-lg border border-border hover:bg-zinc-50 dark:hover:bg-zinc-900 transition group">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Git-CMS</span>
              <ArrowUpRight size={16} className="text-muted group-hover:text-foreground" />
            </div>
            <p className="text-sm text-muted">A database-free blog system using GitHub API.</p>
          </a>
        </div>
      </section>
    </div>
  );
}