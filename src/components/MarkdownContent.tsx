"use client";

import ReactMarkdown from "react-markdown";

/**
 * Shared renderer for blog markdown — keeps the article page and the preview
 * modal visually identical. Styling maps headings/lists/emphasis to the theme.
 */
export default function MarkdownContent({ content }: { content: string }) {
  return (
    <div
      className="prose prose-sm max-w-none"
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
            <strong style={{ color: "var(--accent-color)" }}>{children}</strong>
          ),
          code: ({ children }) => (
            <code
              className="px-1.5 py-0.5 rounded text-[0.8em] font-mono-custom"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-color)",
                color: "var(--accent-color)",
              }}
            >
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre
              className="rounded-xl p-4 my-4 overflow-x-auto text-xs leading-relaxed"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-color)",
                color: "var(--text-secondary)",
              }}
            >
              {children}
            </pre>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
