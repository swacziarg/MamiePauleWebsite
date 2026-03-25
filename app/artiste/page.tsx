import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

export default function ArtistPage() {
  return (
    <SiteShell currentPath="/artiste">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 pb-20 pt-10 md:px-8 md:pt-14">
        <section className="grid gap-8 rounded-[2.5rem] border border-line bg-white/85 p-8 shadow-soft md:grid-cols-[1.15fr_0.85fr] md:p-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-black/45">L'artiste</p>
            <h1 className="mt-4 text-5xl leading-tight text-ink md:text-6xl">Paule Delmas</h1>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-black/72">
              <p>
                J&apos;ai commencé l&apos;étude de la peinture de chevalet dans les années 1960,
                dans l&apos;atelier parisien du peintre orientaliste Thérèse Clément (1889-1984),
                élève de Montholon, post-impressionniste.
              </p>
              <p>
                J&apos;ai ensuite fréquenté les ateliers de la Cour Rolland à Jouy-en-Josas, de
                Chantal Peponnet à Paris pour la peinture ancienne et la restauration de tableaux,
                d&apos;Annick Chevaller à Versailles pour l&apos;aquarelle, et de Michèle Taupin à
                Fresnes.
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
                J&apos;ai pris part à de nombreuses expositions collectives à Bièvres, puis présenté
                des expositions individuelles à Paris, Versailles et Bièvres, notamment en 2014 au
                restaurant-librairie Le Mille-Feuilles, place de l&apos;Église à Bièvres, et en
                2015 à l&apos;Auberge de la Mouff, 83 rue Mouffetard, Paris V.
              </p>
              <p>
                Dans mes dernières toiles, je me suis intéressée plus particulièrement au
                traitement de la lumière artificielle dans les lieux publics et à la convivialité
                qu&apos;elle induit.
              </p>
            </div>
          </div>
          <div className="rounded-[2rem] bg-accent/55 p-6">
            <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/70 shadow-soft">
              <Image
                src="http://paule.delmas.free.fr/wp-content/uploads/portrait-300x300.jpg"
                alt="Portrait de Paule Delmas"
                fill
                sizes="(min-width: 768px) 28rem, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-5 text-center text-sm uppercase tracking-[0.28em] text-black/45">
              Paule Delmas
            </p>
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-2">
          <article className="rounded-[2rem] border border-line bg-white/90 p-8 shadow-soft">
            <p className="text-sm uppercase tracking-[0.28em] text-black/45">Approche</p>
            <h2 className="mt-3 text-2xl text-ink">Peindre la lumière et les lieux</h2>
            <div className="mt-4 space-y-4 text-lg leading-relaxed text-black/70">
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
          <article className="rounded-[2rem] border border-line bg-white/90 p-8 shadow-soft">
            <p className="text-sm uppercase tracking-[0.28em] text-black/45">Galerie</p>
            <h2 className="mt-3 text-2xl text-ink">Voir les œuvres</h2>
            <div className="mt-4 space-y-4 text-lg leading-relaxed text-black/70">
              <p>
                La galerie rassemble les peintures mises en ligne et permet de parcourir les
                différentes séries depuis ordinateur ou téléphone.
              </p>
              <p>
                Chaque œuvre dispose maintenant de sa propre page pour regarder l&apos;image seule
                et passer simplement à la précédente ou à la suivante.
              </p>
            </div>
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
