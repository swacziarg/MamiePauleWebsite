"use client";

import Image from "next/image";
import {
  ChangeEvent,
  ClipboardEvent,
  DragEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { siteUrl } from "@/lib/config";

export function ArtworkUploadForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [lastArtworkUrl, setLastArtworkUrl] = useState("");
  const [isClipboardLoading, setIsClipboardLoading] = useState(false);

  const previewUrl = useMemo(() => {
    if (!file) {
      return null;
    }

    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function handleFile(nextFile: File | null) {
    if (!nextFile) {
      return;
    }

    setFile(nextFile);
    setMessage("");
  }

  function extractImageFile(items: DataTransferItemList | null) {
    if (!items) {
      return null;
    }

    for (const item of Array.from(items)) {
      if (item.kind === "file" && item.type.startsWith("image/")) {
        return item.getAsFile();
      }
    }

    return null;
  }

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files[0] ?? null);
  }

  function onPaste(event: ClipboardEvent<HTMLFormElement>) {
    const pastedFile = extractImageFile(event.clipboardData.items);

    if (!pastedFile) {
      return;
    }

    event.preventDefault();
    handleFile(pastedFile);
    setMessage("Image collée depuis le presse-papiers.");
  }

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    handleFile(event.target.files?.[0] ?? null);
  }

  async function handleClipboardPaste() {
    if (typeof navigator === "undefined" || !navigator.clipboard?.read) {
      setMessage("Le collage direct n'est pas disponible dans ce navigateur.");
      return;
    }

    setIsClipboardLoading(true);
    setMessage("");

    try {
      const clipboardItems = await navigator.clipboard.read();

      for (const clipboardItem of clipboardItems) {
        const imageType = clipboardItem.types.find((type) => type.startsWith("image/"));

        if (!imageType) {
          continue;
        }

        const blob = await clipboardItem.getType(imageType);
        const extension = imageType.split("/")[1] || "png";
        const pastedFile = new File([blob], `presse-papiers.${extension}`, {
          type: imageType,
        });

        handleFile(pastedFile);
        setMessage("Image collée depuis le presse-papiers.");
        setIsClipboardLoading(false);
        return;
      }

      setMessage("Aucune image trouvée dans le presse-papiers.");
    } catch {
      setMessage("Impossible de lire le presse-papiers.");
    }

    setIsClipboardLoading(false);
  }

  async function handleCopyLink() {
    if (!lastArtworkUrl || typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
      setMessage("Impossible de copier le lien.");
      return;
    }

    try {
      await navigator.clipboard.writeText(lastArtworkUrl);
      setMessage("Lien de l'œuvre copié.");
    } catch {
      setMessage("Impossible de copier le lien.");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file || !description.trim()) {
      setMessage("Ajoutez une image et un petit texte.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description.trim());

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const payload = (await response.json().catch(() => null)) as
      | { error?: string; id?: string }
      | null;

    if (!response.ok) {
      setIsLoading(false);
      setMessage(payload?.error || "Impossible d'ajouter l'œuvre.");
      return;
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setFile(null);
    setDescription("");
    setIsLoading(false);
    setLastArtworkUrl(payload?.id ? `${siteUrl}/galerie/${payload.id}` : "");
    setMessage(
      payload?.id ? "Œuvre ajoutée. Le lien peut être copié." : "Œuvre ajoutée.",
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onPaste={onPaste}
      className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-[2rem] border border-line bg-white/90 p-6 shadow-soft md:p-8"
    >
      <h1 className="text-center text-3xl text-ink">Ajouter une peinture</h1>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleClipboardPaste}
          disabled={isClipboardLoading}
          className="rounded-full border border-line bg-canvas px-5 py-3 text-sm text-ink shadow-soft disabled:cursor-wait disabled:opacity-60"
        >
          {isClipboardLoading ? "Lecture du presse-papiers..." : "Coller une image"}
        </button>
        {lastArtworkUrl ? (
          <button
            type="button"
            onClick={handleCopyLink}
            className="rounded-full border border-line bg-canvas px-5 py-3 text-sm text-ink shadow-soft"
          >
            Copier le lien de la dernière œuvre
          </button>
        ) : null}
      </div>

      <label
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`flex min-h-72 cursor-pointer flex-col items-center justify-center gap-4 rounded-[2rem] border-2 border-dashed px-6 py-10 text-center ${
          isDragging ? "border-ink bg-accent" : "border-line bg-canvas"
        }`}
      >
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Aperçu de l'œuvre"
            width={900}
            height={700}
            className="max-h-80 w-auto rounded-2xl object-contain shadow-soft"
            unoptimized
          />
        ) : (
          <div className="space-y-3">
            <p className="text-xl text-ink">Glissez une image ici ou cliquez</p>
            <p className="text-base text-black/60">
              JPG, PNG ou image collée depuis le presse-papiers
            </p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="hidden"
        />
      </label>

      <label className="space-y-2">
        <span className="text-lg text-ink">Texte</span>
        <input
          required
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="min-h-14 w-full rounded-2xl border border-line bg-canvas px-5 text-lg text-ink"
          placeholder="Ex: paysage du matin, huile sur toile..."
        />
      </label>

      <button
        type="submit"
        disabled={isLoading}
        className="min-h-16 rounded-full border border-ink bg-ink px-8 text-xl text-canvas shadow-soft disabled:cursor-wait disabled:opacity-75"
      >
        {isLoading ? "Envoi..." : "Publier"}
      </button>

      {message ? (
        <p
          className={`text-center text-base ${
            message === "Œuvre ajoutée." ||
            message === "Œuvre ajoutée. Le lien peut être copié." ||
            message === "Image collée depuis le presse-papiers." ||
            message === "Lien de l'œuvre copié."
              ? "text-black/70"
              : "text-red-700"
          }`}
        >
          {message}
        </p>
      ) : null}

      {lastArtworkUrl ? (
        <p className="break-all text-center text-sm text-black/55">{lastArtworkUrl}</p>
      ) : null}
    </form>
  );
}
