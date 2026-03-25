import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

export default function ArtistPage() {
  return (
    <SiteShell currentPath="/artiste">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 pb-20 pt-10 md:px-8 md:pt-14">
        <section className="grid gap-8 rounded-[2.5rem] border border-line bg-white/85 p-8 shadow-soft md:grid-cols-[1.15fr_0.85fr] md:p-10">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-black/45">L'artiste</p>
            <h1 className="mt-4 text-5xl leading-tight text-ink md:text-6xl">
              Une peinture calme, proche des saisons et de la lumière
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-black/72">
              Paule Delmas peint des paysages, des fleurs, des intérieurs et des souvenirs de
              promenade. Ici, tout est présenté simplement pour laisser les œuvres respirer.
            </p>
          </div>
          <div className="rounded-[2rem] bg-accent/55 p-6">
            <p className="text-sm uppercase tracking-[0.28em] text-black/45">En bref</p>
            <dl className="mt-6 space-y-5 text-lg text-ink">
              <div>
                <dt className="text-sm uppercase tracking-[0.22em] text-black/45">Médiums</dt>
                <dd className="mt-1">Huile, acrylique, papier et études préparatoires</dd>
              </div>
              <div>
                <dt className="text-sm uppercase tracking-[0.22em] text-black/45">Sujets</dt>
                <dd className="mt-1">Paysages, fleurs, scènes domestiques, couleurs de saison</dd>
              </div>
              <div>
                <dt className="text-sm uppercase tracking-[0.22em] text-black/45">Rythme</dt>
                <dd className="mt-1">Mises en ligne régulières au fil des nouvelles œuvres</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-2">
          <article className="rounded-[2rem] border border-line bg-white/90 p-8 shadow-soft">
            <h2 className="text-2xl text-ink">Approche</h2>
            <p className="mt-4 text-lg leading-relaxed text-black/70">
              Les tableaux vont vers l'équilibre, l'air, et la texture. Les images en ligne restent
              claires et simples.
            </p>
          </article>
          <article className="rounded-[2rem] border border-line bg-white/90 p-8 shadow-soft">
            <h2 className="text-2xl text-ink">Voir les œuvres</h2>
            <p className="mt-4 text-lg leading-relaxed text-black/70">
              La galerie rassemble toutes les peintures mises en ligne et se partage facilement sur
              téléphone.
            </p>
            <Link
              href="/galerie"
              className="mt-6 inline-flex rounded-full border border-ink bg-ink px-6 py-3 text-base text-canvas shadow-soft hover:-translate-y-0.5 hover:bg-black"
            >
              Voir la galerie
            </Link>
          </article>
        </section>
      </main>
    </SiteShell>
  );
}
