import Image from "next/image";

type QrCodeCardProps = {
  siteUrl: string;
};

export function QrCodeCard({ siteUrl }: QrCodeCardProps) {
  const qrUrl = `/api/qr?url=${encodeURIComponent(siteUrl)}`;

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-[2rem] border border-line bg-white/90 p-6 shadow-soft">
      <Image
        src={qrUrl}
        alt="QR code vers la galerie"
        width={144}
        height={144}
        className="h-36 w-36 rounded-2xl border border-line bg-white p-3"
      />
      <p className="text-center text-base text-ink">Ouvrir le site sur un téléphone</p>
      <p className="max-w-56 text-center text-sm leading-relaxed text-black/65">
        Scannez ce code pour arriver directement sur le site et le partager facilement.
      </p>
    </div>
  );
}
