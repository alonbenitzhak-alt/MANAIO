"use client";

import { useState, useEffect } from "react";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1920&q=80",
  "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=1920&q=80",
  "https://images.unsplash.com/photo-1555993539-1732b0258235?w=1920&q=80",
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1920&q=80",
];

interface PageHeroProps {
  children: React.ReactNode;
  py?: string;
}

export default function PageHero({ children, py = "py-16" }: PageHeroProps) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={`relative text-white ${py} overflow-hidden`}>
      {HERO_IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url(${src})`, opacity: i === idx ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}
