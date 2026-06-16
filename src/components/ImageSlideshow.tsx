"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSlideshowProps {
  images: string[];
  alt: string;
  /** Extra classes applied to each <img> (e.g. group-hover:scale-110). */
  imgClassName?: string;
  /** Auto-advance through the images when there is more than one. */
  autoPlay?: boolean;
  /** Auto-advance interval in ms. */
  interval?: number;
  /** Show left/right navigation arrows (only renders when multiple images). */
  showArrows?: boolean;
  /** Show the dot indicators (only renders when multiple images). */
  showDots?: boolean;
}

/**
 * Renders a single static image when given one source, or a crossfading
 * slideshow when given multiple. The parent must be `relative overflow-hidden`
 * with a defined height — images fill it via `absolute inset-0`.
 */
export default function ImageSlideshow({
  images,
  alt,
  imgClassName = "",
  autoPlay = false,
  interval = 3500,
  showArrows = false,
  showDots = true,
}: ImageSlideshowProps) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;

  const go = useCallback(
    (dir: number) =>
      setIndex((i) => (i + dir + images.length) % images.length),
    [images.length]
  );

  // Reset to the first slide when the set of images changes (e.g. switching projects).
  useEffect(() => {
    setIndex(0);
  }, [images]);

  useEffect(() => {
    if (!autoPlay || !hasMultiple) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      interval
    );
    return () => clearInterval(id);
  }, [autoPlay, hasMultiple, images.length, interval]);

  if (images.length === 0) return null;

  return (
    <>
      {images.map((src, i) => (
        <Image
          key={`${src}-${i}`}
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 420px"
          priority={i === 0}
          className={`object-cover transition-[opacity,transform] duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          } ${imgClassName}`}
        />
      ))}

      {hasMultiple && showArrows && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors"
            style={{
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors"
            style={{
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}

      {hasMultiple && showDots && (
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                setIndex(i);
              }}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === index ? "18px" : "6px",
                background:
                  i === index ? "var(--accent-color)" : "rgba(255,255,255,0.6)",
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
