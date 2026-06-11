"use client";

import ReactMarkdown from "react-markdown";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { type BlogPost } from "@/data/blog";

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export default function BlogModal({ post, onClose }: BlogModalProps) {
  return (
    <Dialog open={!!post} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        {post && (
          <>
            {/* Gold accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
              style={{
                background:
                  "linear-gradient(90deg, var(--accent-color), var(--accent-2))",
              }}
            />
            <DialogTitle className="text-2xl mt-2">{post.title}</DialogTitle>
            <DialogDescription className="text-sm mb-4">
              {post.summary}
            </DialogDescription>
            <div
              className="prose prose-sm max-w-none mt-2"
              style={{ color: "var(--text-secondary)" }}
            >
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2
                      className="text-xl font-display font-bold mt-6 mb-3"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3
                      className="text-base font-semibold mt-4 mb-2"
                      style={{ color: "var(--accent-color)" }}
                    >
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-sm leading-relaxed mb-3">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-none space-y-1.5 mb-4">{children}</ul>
                  ),
                  li: ({ children }) => (
                    <li
                      className="flex items-start gap-2 text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: "var(--accent-color)" }}
                      />
                      {children}
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong style={{ color: "var(--accent-color)" }}>
                      {children}
                    </strong>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
