import Image from "next/image";
import { QrCodeCard } from "@/components/qr-code-card";
import { ShareButton } from "@/components/share-button";
import { siteUrl } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";
import type { Artwork } from "@/lib/types";

export default async function HomePage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("artworks")
    .select("id, image_url, description, created_at")
    .order("created_at", { ascending: false });

  const artworks = error ? [] : ((data ?? []) as Artwork[]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 pb-20 pt-12 md:px-8 md:pt-16">
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-black/50">Paule Delmas</p>
        <h1 className="text-5xl leading-tight text-ink md:text-6xl">Peintures</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-black/70">
          Une galerie simple pour regarder les œuvres, sans distraction.
        </p>
        <ShareButton url={siteUrl} />
      </section>

      <section className="mt-10 flex justify-center">
        <QrCodeCard siteUrl={siteUrl} />
      </section>

      <section className="mt-14">
        {artworks.length === 0 ? (
          <div className="rounded-[2rem] border border-line bg-white/80 px-8 py-20 text-center shadow-soft">
            <p className="text-2xl text-ink">Aucune œuvre pour le moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {artworks.map((artwork) => (
              <article
                key={artwork.id}
                className="overflow-hidden rounded-[2rem] border border-line bg-white/90 shadow-soft"
              >
                <div className="relative aspect-[4/5] bg-accent/40">
                  <Image
                    src={artwork.image_url}
                    alt={artwork.description}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="px-6 py-5 md:px-7">
                  <p className="text-lg leading-relaxed text-ink">{artwork.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
