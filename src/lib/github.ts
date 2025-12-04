import { Octokit } from "@octokit/rest";
import { Base64 } from "js-base64";
import matter from "gray-matter";

const OWNER = process.env.NEXT_PUBLIC_GITHUB_OWNER!;
const REPO = process.env.NEXT_PUBLIC_GITHUB_REPO!;

// 读取：获取文章列表 (Server Side)
export async function getPosts() {
  try {
    const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/posts`, {
      next: { revalidate: 60 },
      headers: { Accept: "application/vnd.github.v3+json" }
    });
    if (!res.ok) return [];
    const files = await res.json();
    
    // 并行获取内容解析 Frontmatter (简单示例，生产环境可用 GraphQL 优化)
    const posts = await Promise.all(files.map(async (file: any) => {
      if (!file.name.endsWith(".mdx")) return null;
      const raw = await fetch(file.download_url).then(r => r.text());
      const { data } = matter(raw);
      return {
        slug: file.name.replace(".mdx", ""),
        title: data.title || file.name,
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || "",
      };
    }));
    return posts.filter(Boolean).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (e) {
    return [];
  }
}

// 读取：获取单篇文章 (Server Side)
export async function getPost(slug: string) {
  const url = `https://raw.githubusercontent.com/${OWNER}/${REPO}/main/posts/${slug}.mdx`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Post not found");
  return await res.text();
}

// 写入：Octokit 实例 (Client Side)
export const createOctokit = (token: string) => new Octokit({ auth: token });