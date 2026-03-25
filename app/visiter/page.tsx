import { QrCodeCard } from "@/components/qr-code-card";
import { SiteShell } from "@/components/site-shell";
import { siteUrl } from "@/lib/config";

export default function VisitPage() {
  return (
    <SiteShell currentPath="/visiter">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 pb-8 pt-6 md:px-8 md:pt-8">
        <section className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2.25rem] border border-line bg-white/85 p-6 shadow-soft md:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-black/45">Visiter</p>
            <h1 className="mt-3 text-4xl leading-tight text-ink md:text-5xl">
              Ouvrir la galerie et partager le lien
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-black/72 md:text-lg">
              Le site peut s&apos;ouvrir directement sur téléphone ou être envoyé en un instant.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.75rem] bg-canvas p-5">
                <h2 className="text-xl text-ink">En ligne</h2>
                <p className="mt-2 text-base leading-relaxed text-black/68">
                  La galerie est disponible à tout moment depuis le lien public.
                </p>
              </div>
              <div className="rounded-[1.75rem] bg-canvas p-5">
                <h2 className="text-xl text-ink">Partager</h2>
                <p className="mt-2 text-base leading-relaxed text-black/68">
                  Le QR code permet d&apos;ouvrir le site rapidement à quelqu&apos;un.
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
