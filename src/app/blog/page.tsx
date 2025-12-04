import Link from "next/link";
import { getPosts } from "@/lib/github";

export const metadata = {
  title: "Blog - My Digital Garden",
  description: "Writing about code, design, and life.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  // 按年份分组 (可选优化，模仿 yysuni 的风格)
  const postsByYear = posts.reduce((acc: any, post: any) => {
    const year = new Date(post.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {});

  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Blog</h1>
        <p className="text-muted">
          All my thoughts, tutorials, and notes are archived here.
        </p>
      </header>

      <div className="space-y-10">
        {years.map((year) => (
          <section key={year}>
            <h2 className="text-2xl font-bold mb-6 text-foreground">{year}</h2>
            <div className="space-y-6">
              {postsByYear[year].map((post: any) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1"
                >
                  <span className="text-base font-medium text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </span>
                  <span className="text-sm text-muted font-mono tabular-nums shrink-0 border-b border-dashed border-zinc-200 dark:border-zinc-800 sm:border-none pb-1 sm:pb-0">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}