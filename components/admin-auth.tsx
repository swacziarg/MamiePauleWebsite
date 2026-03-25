"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function AdminAuth() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const supabase = createClient();
    const baseUrl = window.location.origin;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${baseUrl}/auth/confirm?next=/admin`,
      },
    });

    if (error) {
      setStatus("error");
      setMessage("Le lien n'a pas pu partir. Réessayez dans un moment.");
      return;
    }

    setStatus("success");
    setMessage("Le lien de connexion a été envoyé par e-mail.");
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-xl flex-col gap-5 rounded-[2rem] border border-line bg-white/90 p-8 shadow-soft">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl text-ink">Connexion admin</h1>
        <p className="text-base leading-relaxed text-black/70">
          Entrez votre e-mail pour recevoir un lien.
        </p>
      </div>
      <label className="space-y-2">
        <span className="text-lg text-ink">E-mail</span>
        <input
          required
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="min-h-14 w-full rounded-2xl border border-line bg-canvas px-5 text-lg text-ink"
          placeholder="nom@exemple.fr"
        />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="min-h-14 rounded-full border border-ink bg-ink px-6 text-lg text-canvas shadow-soft disabled:cursor-wait disabled:opacity-70"
      >
        {status === "loading" ? "Envoi..." : "Recevoir le lien"}
      </button>
      {message ? (
        <p className={`text-center text-base ${status === "error" ? "text-red-700" : "text-black/70"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
