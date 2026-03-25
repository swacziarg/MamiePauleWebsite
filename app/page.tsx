import Link from "next/link";
import { ArtworkCard } from "@/components/artwork-card";
import { ShareButton } from "@/components/share-button";
import { SiteShell } from "@/components/site-shell";
import { getArtworks } from "@/lib/artworks";
import { siteUrl } from "@/lib/config";

export default async function HomePage() {
  const artworks = await getArtworks(4);

  return (
    <SiteShell currentPath="/">
      <main className="mx-auto flex w-full max-w-6xl flex-col px-5 pb-8 pt-6 md:px-8 md:pt-8">
        <section className="grid gap-6 rounded-[2.25rem] border border-line bg-white/85 p-6 shadow-soft md:grid-cols-[1.15fr_0.85fr] md:p-8">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-black/45">Paule Delmas</p>
            <h1 className="mt-3 text-4xl leading-tight text-ink md:text-6xl">
              Des peintures à regarder simplement
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-black/72 md:text-lg">
              Les œuvres, l&apos;artiste et un lien facile à partager.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/galerie"
                className="inline-flex min-h-12 items-center rounded-full border border-ink bg-ink px-6 text-base text-canvas shadow-soft hover:-translate-y-0.5 hover:bg-black"
              >
                Voir la galerie
              </Link>
              <ShareButton url={siteUrl} />
            </div>
          </div>
          <div className="rounded-[2rem] bg-accent/55 p-5 md:p-6">
            <p className="text-sm uppercase tracking-[0.28em] text-black/45">À voir</p>
            <div className="mt-4 space-y-4">
              <div>
                <h2 className="text-xl text-ink md:text-2xl">Dernières œuvres</h2>
                <p className="mt-1 text-sm leading-relaxed text-black/70 md:text-base">
                  Les peintures récentes sont visibles tout de suite.
                </p>
              </div>
              <div>
                <h2 className="text-xl text-ink md:text-2xl">Partager le site</h2>
                <p className="mt-1 text-sm leading-relaxed text-black/70 md:text-base">
                  Un QR code permet aussi de l&apos;ouvrir vite sur téléphone.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-black/45">Sélection</p>
            <h2 className="mt-2 text-2xl text-ink md:text-3xl">Quelques peintures récentes</h2>
          </div>
          <Link href="/galerie" className="text-base text-black/70 underline decoration-line underline-offset-4 hover:text-ink">
            Tout voir
          </Link>
        </section>

        <section className="mt-5">
          {artworks.length === 0 ? (
            <div className="rounded-[2rem] border border-line bg-white/80 px-8 py-20 text-center shadow-soft">
              <p className="text-2xl text-ink">Pas encore d'œuvres en ligne</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {artworks.slice(0, 2).map((artwork) => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </SiteShell>
  );
}
