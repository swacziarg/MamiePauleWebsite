import { QrCodeCard } from "@/components/qr-code-card";
import { SiteShell } from "@/components/site-shell";
import { siteUrl } from "@/lib/config";

export default function VisitPage() {
  return (
    <SiteShell currentPath="/visiter">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 pb-20 pt-10 md:px-8 md:pt-14">
        <section className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2.5rem] border border-line bg-white/85 p-8 shadow-soft md:p-10">
            <p className="text-sm uppercase tracking-[0.35em] text-black/45">Visiter</p>
            <h1 className="mt-4 text-5xl leading-tight text-ink md:text-6xl">
              Ouvrir la galerie, partager le lien, préparer une visite
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-black/72">
              Tout ce qu'il faut pour voir les œuvres en ligne ou envoyer le site à quelqu'un
              rapidement.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.75rem] bg-canvas p-5">
                <h2 className="text-xl text-ink">En ligne</h2>
                <p className="mt-2 text-base leading-relaxed text-black/68">
                  La galerie est disponible à tout moment depuis le lien public du site.
                </p>
              </div>
              <div className="rounded-[1.75rem] bg-canvas p-5">
                <h2 className="text-xl text-ink">Sur rendez-vous</h2>
                <p className="mt-2 text-base leading-relaxed text-black/68">
                  Cette page peut aussi servir de support simple avant de prendre contact.
                </p>
              </div>
            </div>
          </div>

          <aside className="flex items-start">
            <QrCodeCard siteUrl={siteUrl} />
          </aside>
        </section>
      </main>
    </SiteShell>
  );
}
