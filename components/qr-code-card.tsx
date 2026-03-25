import Image from "next/image";

type QrCodeCardProps = {
  siteUrl: string;
};

export function QrCodeCard({ siteUrl }: QrCodeCardProps) {
  const qrUrl = `/api/qr?url=${encodeURIComponent(siteUrl)}`;

  return (
    <div className="flex flex-col items-center gap-4 rounded-[2rem] border border-line bg-white/80 p-6 shadow-soft">
      <Image
        src={qrUrl}
        alt="QR code vers la galerie"
        width={160}
        height={160}
        className="h-40 w-40 rounded-2xl border border-line bg-white p-3"
      />
      <p className="max-w-48 text-center text-sm text-black/70">
        Scannez ce code pour ouvrir la galerie.
      </p>
    </div>
  );
}
