import { GalleryCarousel } from "@/components/gallery-carousel";
import { SiteShell } from "@/components/site-shell";
import { getArtworks } from "@/lib/artworks";

export default async function GalleryPage() {
  const artworks = await getArtworks();

  return (
    <SiteShell currentPath="/galerie">
      <main className="mx-auto flex w-full max-w-6xl flex-col px-5 pb-8 pt-6 md:px-8 md:pt-8">
        <section className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-black/45">Galerie</p>
          <h1 className="mt-3 text-4xl leading-tight text-ink md:text-5xl">Toutes les peintures</h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-black/70 md:text-lg">
            Ouvrez une œuvre pour la voir seule, puis passez à la suivante.
          </p>
        </section>

        <section className="mt-6">
          <GalleryCarousel artworks={artworks} />
        </section>
      </main>
    </SiteShell>
  );
}
