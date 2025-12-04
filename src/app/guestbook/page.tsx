export const metadata = {
  title: "Guestbook",
};

export default function GuestbookPage() {
  return (
    <div className="py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Guestbook</h1>
        <p className="text-muted">
          Leave a message or say hi! (Feature powered by GitHub Discussions coming soon)
        </p>
      </header>

      {/* 占位符内容 */}
      <div className="p-6 rounded-lg border border-dashed border-border bg-zinc-50 dark:bg-zinc-900/50 text-center">
        <p className="text-sm text-muted">
          The comment system is under construction. 🚧
        </p>
      </div>
    </div>
  );
}