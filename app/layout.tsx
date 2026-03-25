import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mamie Paule",
  description: "Galerie minimaliste des œuvres de Mamie Paule.",
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
