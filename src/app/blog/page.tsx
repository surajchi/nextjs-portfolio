"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/blog";
import SectionWrapper from "@/components/SectionWrapper";
import BlogModal from "@/components/BlogModal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type BlogPost } from "@/data/blog";
import { ArrowRight } from "lucide-react";

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <SectionWrapper title="Blog">
      <div className="grid md:grid-cols-3 gap-8">
        {blogPosts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              onClick={() => setSelectedPost(post)}
              className="cursor-pointer h-full"
            >
              <Card className="p-6 h-full group">
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Gold accent line top */}
                  <div
                    className="w-8 h-0.5 mb-5 rounded"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--accent-color), var(--accent-2))",
                    }}
                  />

                  <Badge variant="gold" className="mb-4 w-fit">
                    Article
                  </Badge>

                  <h3
                    className="font-display text-xl font-bold mb-3 group-hover:transition-colors leading-snug"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {post.title}
                  </h3>

                  <p
                    className="text-sm leading-relaxed mb-6 flex-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {post.summary}
                  </p>

                  <div
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3"
                    style={{ color: "var(--accent-color)" }}
                  >
                    Read More
                    <ArrowRight size={14} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </SectionWrapper>
  );
}
