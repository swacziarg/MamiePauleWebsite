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
      <main className="mx-auto flex w-full max-w-6xl flex-col px-5 pb-20 pt-10 md:px-8 md:pt-14">
        <section className="grid gap-8 rounded-[2.5rem] border border-line bg-white/85 p-8 shadow-soft md:grid-cols-[1.1fr_0.9fr] md:p-10">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-black/45">Paule Delmas</p>
            <h1 className="mt-4 text-5xl leading-tight text-ink md:text-7xl">Des peintures à regarder simplement</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-black/72">
              Retrouvez les peintures de Paule Delmas, quelques mots sur son travail, et un lien
              facile à partager.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/galerie"
                className="inline-flex min-h-14 items-center rounded-full border border-ink bg-ink px-8 text-lg text-canvas shadow-soft hover:-translate-y-0.5 hover:bg-black"
              >
                Voir la galerie
              </Link>
              <ShareButton url={siteUrl} />
            </div>
          </div>
          <div className="rounded-[2rem] bg-accent/55 p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-black/45">À voir</p>
            <div className="mt-6 space-y-5">
              <div>
                <h2 className="text-2xl text-ink">Dernières œuvres</h2>
                <p className="mt-2 text-base leading-relaxed text-black/70">
                  Les dernières peintures sont visibles tout de suite dans la galerie.
                </p>
              </div>
              <div>
                <h2 className="text-2xl text-ink">Partager le site</h2>
                <p className="mt-2 text-base leading-relaxed text-black/70">
                  Une page simple avec le QR code permet d'ouvrir le site vite sur téléphone.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-black/45">Sélection</p>
            <h2 className="mt-3 text-3xl text-ink md:text-4xl">Quelques peintures récentes</h2>
          </div>
          <Link href="/galerie" className="text-base text-black/70 underline decoration-line underline-offset-4 hover:text-ink">
            Tout voir
          </Link>
        </section>

        <section className="mt-8">
          {artworks.length === 0 ? (
            <div className="rounded-[2rem] border border-line bg-white/80 px-8 py-20 text-center shadow-soft">
              <p className="text-2xl text-ink">Pas encore d'œuvres en ligne</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {artworks.map((artwork) => (
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
