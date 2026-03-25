import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

export default function ArtistPage() {
  return (
    <SiteShell currentPath="/artiste">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 pb-8 pt-6 md:px-8 md:pt-8">
        <section className="grid gap-6 rounded-[2.25rem] border border-line bg-white/85 p-6 shadow-soft md:grid-cols-[1.2fr_0.8fr] md:p-8">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-black/45">L'artiste</p>
            <h1 className="mt-3 text-4xl leading-tight text-ink md:text-5xl">Paule Delmas</h1>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-black/72 md:text-lg">
              <p>
                J&apos;ai commencé l&apos;étude de la peinture de chevalet dans les années 1960,
                dans l&apos;atelier parisien du peintre orientaliste Thérèse Clément (1889-1984),
                élève de Montholon, post-impressionniste.
              </p>
              <p>
                J&apos;ai ensuite travaillé à Jouy-en-Josas, Paris, Versailles et Fresnes, auprès
                de Chantal Peponnet, Annick Chevaller et Michèle Taupin.
              </p>
              <p>
                Au Moulin de Perrot, dirigé par Robert Koeppel, j&apos;ai suivi les enseignements de
                peintres de renom comme Danièle Fuchs, Franck Janca, Claude Sauzet et Christoff
                Debusschere.
              </p>
              <p>
                De 2001 à 2008, avec l&apos;Association des Commerçants bièvrois, j&apos;ai participé
                à la manifestation des « Peintres dans la rue ».
              </p>
              <p>
                J&apos;ai exposé collectivement à Bièvres puis individuellement à Paris, Versailles
                et Bièvres.
              </p>
              <p>
                Dans mes dernières toiles, je me suis intéressée plus particulièrement au
                traitement de la lumière artificielle dans les lieux publics et à la convivialité
                qu&apos;elle induit.
              </p>
            </div>
          </div>
          <div className="rounded-[2rem] bg-accent/55 p-5">
            <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-[1.5rem] border border-white/60 bg-white/70 shadow-soft">
              <Image
                src="http://paule.delmas.free.fr/wp-content/uploads/portrait-300x300.jpg"
                alt="Portrait de Paule Delmas"
                fill
                sizes="(min-width: 768px) 20rem, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-center text-sm uppercase tracking-[0.28em] text-black/45">
              Paule Delmas
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-[2rem] border border-line bg-white/90 p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.28em] text-black/45">Approche</p>
            <h2 className="mt-2 text-xl text-ink md:text-2xl">Peindre la lumière et les lieux</h2>
            <div className="mt-3 space-y-3 text-base leading-relaxed text-black/70">
              <p>
                Les tableaux avancent par la lumière, l&apos;observation des lieux et la justesse
                des ambiances.
              </p>
              <p>
                Scènes quotidiennes, paysages et espaces publics y gardent une présence calme,
                lisible et directe.
              </p>
            </div>
          </article>
          <article className="rounded-[2rem] border border-line bg-white/90 p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.28em] text-black/45">Galerie</p>
            <h2 className="mt-2 text-xl text-ink md:text-2xl">Voir les œuvres</h2>
            <div className="mt-3 space-y-3 text-base leading-relaxed text-black/70">
              <p>
                La galerie rassemble les peintures mises en ligne, avec une page par œuvre pour
                passer simplement à la précédente ou à la suivante.
              </p>
            </div>
            <Link
              href="/galerie"
              className="mt-5 inline-flex rounded-full border border-ink bg-ink px-6 py-3 text-base text-canvas shadow-soft hover:-translate-y-0.5 hover:bg-black"
            >
              Voir la galerie
            </Link>
          </article>
        </section>
      </main>
    </SiteShell>
  );
}
