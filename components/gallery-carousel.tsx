"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Artwork } from "@/lib/types";

type GalleryCarouselProps = {
  artworks: Artwork[];
};

function getItemsPerPage(width: number) {
  if (width >= 1024) {
    return 3;
  }

  if (width >= 768) {
    return 2;
  }

  return 1;
}

export function GalleryCarousel({ artworks }: GalleryCarouselProps) {
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [page, setPage] = useState(0);

  useEffect(() => {
    function updateItemsPerPage() {
      setItemsPerPage(getItemsPerPage(window.innerWidth));
    }

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  const pages = useMemo(() => {
    const chunks: Artwork[][] = [];

    for (let index = 0; index < artworks.length; index += itemsPerPage) {
      chunks.push(artworks.slice(index, index + itemsPerPage));
    }

    return chunks;
  }, [artworks, itemsPerPage]);

  useEffect(() => {
    if (page > pages.length - 1) {
      setPage(Math.max(pages.length - 1, 0));
    }
  }, [page, pages.length]);

  if (artworks.length === 0) {
    return (
      <div className="rounded-[2rem] border border-line bg-white/80 px-8 py-20 text-center shadow-soft">
        <p className="text-2xl text-ink">Pas encore d'œuvres en ligne</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-[2rem]">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {pages.map((pageItems, index) => (
            <div key={index} className="w-full flex-none">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {pageItems.map((artwork) => (
                  <article
                    key={artwork.id}
                    className="overflow-hidden rounded-[2rem] border border-line bg-white/90 shadow-soft"
                  >
                    <div className="relative aspect-[4/5] bg-accent/40">
                      <Image
                        src={artwork.image_url}
                        alt={artwork.description}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="px-6 py-5 md:px-7">
                      <p className="text-lg leading-relaxed text-ink">{artwork.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {pages.length > 1 ? (
        <div className="flex flex-col gap-4 rounded-[2rem] border border-line bg-white/80 px-5 py-4 shadow-soft md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-black/60">
            Page {page + 1} sur {pages.length}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(current - 1, 0))}
              disabled={page === 0}
              className="rounded-full border border-line bg-canvas px-5 py-2 text-sm text-ink disabled:cursor-not-allowed disabled:opacity-45"
            >
              Avant
            </button>
            <div className="flex items-center gap-2">
              {pages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setPage(index)}
                  aria-label={`Aller à la page ${index + 1}`}
                  aria-current={page === index ? "true" : undefined}
                  className={`h-3 w-3 rounded-full transition ${
                    page === index ? "bg-ink" : "bg-black/20"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(current + 1, pages.length - 1))}
              disabled={page === pages.length - 1}
              className="rounded-full border border-line bg-canvas px-5 py-2 text-sm text-ink disabled:cursor-not-allowed disabled:opacity-45"
            >
              Après
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
