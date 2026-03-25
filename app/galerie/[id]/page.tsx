import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { getArtworkWithNeighbors } from "@/lib/artworks";

type ArtworkDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ArtworkDetailPage({ params }: ArtworkDetailPageProps) {
  const { id } = await params;
  const artworkData = await getArtworkWithNeighbors(id);

  if (!artworkData) {
    notFound();
  }

  const { artwork, previousArtwork, nextArtwork } = artworkData;

  return (
    <SiteShell currentPath="/galerie">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 pb-20 pt-10 md:px-8 md:pt-14">
        <section className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-black/45">Galerie</p>
            <h1 className="mt-4 max-w-3xl text-4xl leading-tight text-ink md:text-5xl">
              {artwork.description}
            </h1>
          </div>
          <Link
            href="/galerie"
            className="rounded-full border border-line bg-white px-5 py-3 text-sm text-black/70 shadow-soft hover:text-ink"
          >
            Retour à la galerie
          </Link>
        </section>

        <section className="overflow-hidden rounded-[2.5rem] border border-line bg-white/90 p-4 shadow-soft md:p-6">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-accent/35">
            <Image
              src={artwork.image_url}
              alt={artwork.description}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 72rem"
              className="object-contain"
            />
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {previousArtwork ? (
            <Link
              href={`/galerie/${previousArtwork.id}`}
              className="rounded-[2rem] border border-line bg-white/85 px-6 py-5 shadow-soft hover:-translate-y-0.5"
            >
              <p className="text-sm uppercase tracking-[0.24em] text-black/45">← Précédente</p>
              <p className="mt-3 text-lg leading-relaxed text-ink">
                {previousArtwork.description}
              </p>
            </Link>
          ) : (
            <div className="rounded-[2rem] border border-line bg-white/60 px-6 py-5 text-black/40 shadow-soft">
              <p className="text-sm uppercase tracking-[0.24em]">← Précédente</p>
              <p className="mt-3 text-lg leading-relaxed">Première œuvre de la série affichée</p>
            </div>
          )}

          {nextArtwork ? (
            <Link
              href={`/galerie/${nextArtwork.id}`}
              className="rounded-[2rem] border border-line bg-white/85 px-6 py-5 text-left shadow-soft hover:-translate-y-0.5"
            >
              <p className="text-sm uppercase tracking-[0.24em] text-black/45">Suivante →</p>
              <p className="mt-3 text-lg leading-relaxed text-ink">{nextArtwork.description}</p>
            </Link>
          ) : (
            <div className="rounded-[2rem] border border-line bg-white/60 px-6 py-5 text-left text-black/40 shadow-soft">
              <p className="text-sm uppercase tracking-[0.24em]">Suivante →</p>
              <p className="mt-3 text-lg leading-relaxed">Dernière œuvre de la série affichée</p>
            </div>
          )}
        </section>
      </main>
    </SiteShell>
  );
}
