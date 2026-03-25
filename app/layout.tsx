import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paule Delmas",
  description: "Galerie minimaliste des œuvres de Paule Delmas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="font-serif antialiased">{children}</body>
    </html>
  );
}
