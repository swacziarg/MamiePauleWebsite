"use client";

import { useState } from "react";

type ShareButtonProps = {
  url: string;
};

export function ShareButton({ url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="min-h-12 rounded-full border border-ink bg-ink px-6 text-base text-canvas shadow-soft hover:-translate-y-0.5 hover:bg-black"
    >
      {copied ? "Lien copié" : "Partager"}
    </button>
  );
}
