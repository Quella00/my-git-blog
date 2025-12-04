import { getPost } from "@/lib/github";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";

export default async function Post({ params }: { params: { slug: string } }) {
  try {
    const raw = await getPost(params.slug);
    const { content, data } = matter(raw);

    return (
      <article className="max-w-3xl mx-auto px-6 py-20">
        <header className="mb-10 pb-10 border-b border-zinc-100 dark:border-zinc-800">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{data.title}</h1>
          <time className="text-zinc-400 font-mono text-sm">{data.date && new Date(data.date).toLocaleDateString()}</time>
        </header>
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <MDXRemote source={content} />
        </div>
      </article>
    );
  } catch (e) {
    return <div className="text-center py-20">Post not found</div>;
  }
}