import { GalleryCarousel } from "@/components/gallery-carousel";
import { SiteShell } from "@/components/site-shell";
import { getArtworks } from "@/lib/artworks";

export default async function GalleryPage() {
  const artworks = await getArtworks();

  return (
    <SiteShell currentPath="/galerie">
      <main className="mx-auto flex w-full max-w-6xl flex-col px-5 pb-20 pt-10 md:px-8 md:pt-14">
        <section className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-black/45">Galerie</p>
          <h1 className="mt-4 text-5xl leading-tight text-ink md:text-6xl">
            Toutes les peintures
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-black/70">
            Faites défiler tranquillement, ou passez d'une page à l'autre.
          </p>
        </section>

        <section className="mt-12">
          <GalleryCarousel artworks={artworks} />
        </section>
      </main>
    </SiteShell>
  );
}
