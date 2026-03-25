"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AdminSignOut() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="min-h-12 rounded-full border border-line bg-white px-5 text-base text-ink shadow-soft hover:-translate-y-0.5"
    >
      Se déconnecter
    </button>
  );
}
