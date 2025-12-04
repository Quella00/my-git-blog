"use client";
import { useState, useEffect } from "react";
import { createOctokit } from "@/lib/github";
import { Base64 } from "js-base64";

export default function Editor() {
  const [token, setToken] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const t = localStorage.getItem("gh_token");
    if (t) setToken(t);
  }, []);

  const saveToken = (t: string) => {
    localStorage.setItem("gh_token", t);
    setToken(t);
  };

  const handlePublish = async () => {
    if (!token) return alert("Please enter GitHub Token");
    setStatus("loading");
    try {
      const octokit = createOctokit(token);
      const fileContent = `---
title: "${title}"
date: "${new Date().toISOString()}"
excerpt: "${content.slice(0, 80).replace(/\n/g, " ")}..."
---

${content}`;

      await octokit.repos.createOrUpdateFileContents({
        owner: process.env.NEXT_PUBLIC_GITHUB_OWNER!,
        repo: process.env.NEXT_PUBLIC_GITHUB_REPO!,
        path: `posts/${slug || title.toLowerCase().replace(/\s+/g, '-')}.mdx`,
        message: `feat: new post ${title}`,
        content: Base64.encode(fileContent),
        branch: "main",
      });
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  };

  if (!token) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <input type="password" placeholder="Paste GitHub Token here" className="p-3 border rounded w-80"
          onKeyDown={(e) => e.key === 'Enter' && saveToken(e.currentTarget.value)} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between mb-6">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Post Title" className="text-2xl font-bold bg-transparent outline-none w-full" />
        <button onClick={handlePublish} className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full font-medium text-sm">
          {status === "loading" ? "Saving..." : status === "success" ? "Saved!" : "Publish"}
        </button>
      </div>
      <input value={slug} onChange={e => setSlug(e.target.value)} placeholder="custom-slug (optional)" className="text-xs font-mono text-zinc-400 mb-4 bg-transparent w-full outline-none" />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Start writing markdown..." className="w-full h-[70vh] resize-none bg-transparent outline-none font-mono text-sm leading-relaxed" />
    </div>
  );
}