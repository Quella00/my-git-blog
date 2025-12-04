import Link from "next/link";
import { getPosts } from "@/lib/github";
import { format } from "date-fns";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <header className="mb-16">
        <h1 className="text-4xl font-bold mb-4">Digital Garden</h1>
        <p className="text-zinc-500 leading-relaxed">
          A minimal blog built with Next.js, stored on GitHub.
        </p>
      </header>
      <div className="space-y-10">
        {posts.map((post: any) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h2 className="text-xl font-medium group-hover:text-blue-600 transition-colors">{post.title}</h2>
              <span className="text-sm text-zinc-400 font-mono">{format(new Date(post.date), "MMM dd, yyyy")}</span>
            </div>
            {post.excerpt && <p className="mt-2 text-zinc-500 line-clamp-2">{post.excerpt}</p>}
          </Link>
        ))}
        {posts.length === 0 && <p className="text-zinc-400">No posts found. Go to Admin to create one.</p>}
      </div>
    </div>
  );
}