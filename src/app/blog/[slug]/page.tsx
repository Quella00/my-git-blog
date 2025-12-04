import { getPost } from "@/lib/github";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Post({ params }: Props) {
  try {
    const { slug } = await params;
    const raw = await getPost(slug);
    const { content, data } = matter(raw);

    return (
      <article className="py-10">
        {/* 返回按钮 */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm text-muted hover:text-foreground mb-8 transition-colors group"
        >
          <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>

        {/* 文章头部 */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-3 text-foreground">
            {data.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-muted font-mono">
            <time dateTime={data.date}>
              {new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            {/* 如果有标签可以加在这里 */}
          </div>
        </header>

        {/* 正文 - 使用 prose-zinc 实现灰度排版 */}
        <div className="prose prose-zinc dark:prose-invert max-w-none 
          prose-headings:font-semibold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-lg prose-pre:bg-zinc-100 dark:prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-border">
          <MDXRemote source={content} />
        </div>
      </article>
    );
  } catch (e) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted">Post not found or GitHub API limit reached.</p>
        <Link href="/" className="mt-4 text-sm underline">Go Home</Link>
      </div>
    );
  }
}