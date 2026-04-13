"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const SLIDES = [
  "/images/hero-carousel/01-packing.png",
  "/images/hero-carousel/02-couple-packing.png",
  "/images/hero-carousel/03-delivery.png",
  "/images/hero-carousel/04-high-five.png",
] as const;

const ROTATE_MS = 6500;

export function HeroCarouselBg() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {SLIDES.map((src, i) => (
        <div
          key={src}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1200ms] ease-in-out motion-reduce:transition-none",
            i === index ? "z-[1] opacity-100" : "z-0 opacity-0"
          )}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={i === 0}
            className="object-cover object-[center_35%] sm:object-center"
            sizes="100vw"
          />
        </div>
      ))}
    </div>
  );
}
