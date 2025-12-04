# Next.js Git-Backed Blog (Minimalist Edition)


![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat-square&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-007ACC?style=flat-square&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

**一个无后端、无数据库的现代化博客系统。**
所有文章作为 Markdown 文件存储在 GitHub 仓库中，通过 GitHub API 进行读写。


---

## ✨ 项目亮点

-   🚀 **完全无后端 (Serverless)**: 不需要 MySQL, MongoDB 或 CMS。GitHub 仓库就是数据库。
-   📝 **可视化编辑器 (Web Admin)**: 内置 Admin 面板，支持在浏览器中撰写文章并自动 Commit 到仓库。
-   🎨 **极简美学**: 像素级复刻 Engineer Portfolio 风格，支持完美的**深色模式 (Dark Mode)**。
-   ⚡ **动态路由**: 基于 Next.js App Router，支持 ISR (增量静态再生)。
-   💾 **GitOps**: 内容即代码，所有修改均有 Git 版本记录，安全且可回滚。

---

## 📂 项目结构与路由说明

本项目采用 **Next.js App Router** (文件即路由) 架构。

### 1. 路由映射表 (URL Mapping)

| 用户访问 URL | 对应文件路径 | 功能说明 |
| :--- | :--- | :--- |
| `/` | `src/app/page.tsx` | **首页** (个人简介 + 最新文章 Top 3) |
| `/blog` | `src/app/blog/page.tsx` | **博客列表页** (所有历史文章归档) |
| `/blog/hello-world` | `src/app/blog/[slug]/page.tsx` | **文章详情页** (动态渲染 Markdown 内容) |
| `/guestbook` | `src/app/guestbook/page.tsx` | **留言板** (静态展示页) |
| `/admin/editor` | `src/app/admin/editor/page.tsx` | **后台编辑器** (需要 Token 鉴权) |

### 2. 详细目录结构

```text
my-git-blog/
├── posts/                      # 💾 [数据库] 所有的文章 (.mdx) 实际上存储在这里
│   ├── hello-world.mdx
│   └── my-first-post.mdx
│
├── public/                     # 静态资源 (Images, Icons)
│
├── src/
│   ├── app/                    # ⚛️ 页面逻辑 (App Router)
│   │   ├── admin/              # 管理后台
│   │   │   ├── editor/         # 编辑器页面 (调用 GitHub API)
│   │   │
│   │   ├── blog/               # 博客前台
│   │   │   ├── [slug]/         # ⚡ 动态路由文件夹
│   │   │   │   └── page.tsx    # 文章详情渲染 (Params: slug)
│   │   │   └── page.tsx        # 博客列表页
│   │   │
│   │   ├── guestbook/          # 留言板
│   │   │   └── page.tsx
│   │   │
│   │   ├── layout.tsx          # 全局布局 (包含 Header, Footer)
│   │   ├── providers.tsx       # 主题 Providers (Dark Mode)
│   │   └── globals.css         # 全局样式 (Tailwind Base)
│   │
│   ├── components/             # UI 组件
│   │   ├── Header.tsx          # 顶部导航 (带悬浮胶囊动画)
│   │   └── ...
│   │
│   └── lib/                    # 🔧 工具库
│       ├── github.ts           # 核心：封装 GitHub API (Octokit)
│       └── utils.ts            # Tailwind Class 合并工具
│
├── .env.local                  # 🔐 环境变量 (GitHub Token/Repo Info)
├── tailwind.config.ts          # 🎨 Tailwind 配置 (v3)
└── next.config.js              # Next.js 配置
