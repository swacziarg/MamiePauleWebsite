import Image from "next/image";
import Link from "next/link";
import type { Artwork } from "@/lib/types";

type ArtworkCardProps = {
  artwork: Artwork;
  sizes: string;
};

export function ArtworkCard({ artwork, sizes }: ArtworkCardProps) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-line bg-white/90 shadow-soft">
      <Link
        href={`/galerie/${artwork.id}`}
        className="group block"
        aria-label={`Voir l'œuvre : ${artwork.description}`}
      >
        <div className="relative aspect-[4/5] bg-accent/40">
          <Image
            src={artwork.image_url}
            alt={artwork.description}
            fill
            sizes={sizes}
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="px-6 py-5 md:px-7">
          <p className="text-lg leading-relaxed text-ink">{artwork.description}</p>
          <p className="mt-3 text-sm uppercase tracking-[0.24em] text-black/45">
            Ouvrir l'œuvre
          </p>
        </div>
      </Link>
    </article>
  );
}
