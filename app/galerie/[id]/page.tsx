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
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 pb-8 pt-6 md:px-8 md:pt-8">
        <section className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-black/45">Galerie</p>
            <h1 className="mt-3 text-3xl leading-tight text-ink md:text-4xl">
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

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <div className="overflow-hidden rounded-[2.25rem] border border-line bg-white/90 p-3 shadow-soft md:p-4">
            <div className="relative aspect-[4/3] max-h-[62vh] w-full overflow-hidden rounded-[1.75rem] bg-accent/35 md:aspect-[16/10]">
              <Image
                src={artwork.image_url}
                alt={artwork.description}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-contain"
              />
            </div>
          </div>

          <aside className="grid gap-4 lg:sticky lg:top-6">
            {previousArtwork ? (
              <Link
                href={`/galerie/${previousArtwork.id}`}
                className="rounded-[1.75rem] border border-line bg-white/85 px-5 py-4 shadow-soft hover:-translate-y-0.5"
              >
                <p className="text-sm uppercase tracking-[0.24em] text-black/45">← Précédente</p>
                <p className="mt-2 text-base leading-relaxed text-ink">
                  {previousArtwork.description}
                </p>
              </Link>
            ) : (
              <div className="rounded-[1.75rem] border border-line bg-white/60 px-5 py-4 text-black/40 shadow-soft">
                <p className="text-sm uppercase tracking-[0.24em]">← Précédente</p>
                <p className="mt-2 text-base leading-relaxed">Début de la galerie</p>
              </div>
            )}

            {nextArtwork ? (
              <Link
                href={`/galerie/${nextArtwork.id}`}
                className="rounded-[1.75rem] border border-line bg-white/85 px-5 py-4 text-left shadow-soft hover:-translate-y-0.5"
              >
                <p className="text-sm uppercase tracking-[0.24em] text-black/45">Suivante →</p>
                <p className="mt-2 text-base leading-relaxed text-ink">{nextArtwork.description}</p>
              </Link>
            ) : (
              <div className="rounded-[1.75rem] border border-line bg-white/60 px-5 py-4 text-left text-black/40 shadow-soft">
                <p className="text-sm uppercase tracking-[0.24em]">Suivante →</p>
                <p className="mt-2 text-base leading-relaxed">Fin de la galerie</p>
              </div>
            )}
          </aside>
        </section>
      </main>
    </SiteShell>
  );
}
