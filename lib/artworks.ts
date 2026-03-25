import { createClient } from "@/lib/supabase/server";
import type { Artwork } from "@/lib/types";

export async function getArtworks(limit?: number) {
  const supabase = await createClient();
  let query = supabase
    .from("artworks")
    .select("id, image_url, description, created_at")
    .order("created_at", { ascending: false });

  if (typeof limit === "number") {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    return [] as Artwork[];
  }

  return (data ?? []) as Artwork[];
}
