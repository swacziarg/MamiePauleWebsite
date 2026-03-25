import Image from "next/image";

type QrCodeCardProps = {
  siteUrl: string;
};

export function QrCodeCard({ siteUrl }: QrCodeCardProps) {
  const qrUrl = `/api/qr?url=${encodeURIComponent(siteUrl)}`;

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-3 rounded-[1.75rem] border border-line bg-white/90 p-5 shadow-soft">
      <Image
        src={qrUrl}
        alt="QR code vers la galerie"
        width={132}
        height={132}
        className="h-32 w-32 rounded-2xl border border-line bg-white p-3"
      />
      <p className="text-center text-base text-ink">Ouvrir le site sur un téléphone</p>
      <p className="max-w-56 text-center text-sm leading-relaxed text-black/65">
        Scannez ce code pour ouvrir la galerie.
      </p>
    </div>
  );
}
