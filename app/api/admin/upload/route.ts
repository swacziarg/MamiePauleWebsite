import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isDevAdminBypassEnabled } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isDevAdminBypassEnabled) {
    return NextResponse.json({ error: "Connexion requise." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const description = formData.get("description");

  if (!(file instanceof File) || typeof description !== "string") {
    return NextResponse.json({ error: "Données invalides." }, { status: 400 });
  }

  const trimmedDescription = description.trim();

  if (!trimmedDescription) {
    return NextResponse.json({ error: "Description manquante." }, { status: 400 });
  }

  if (!allowedMimeTypes.has(file.type)) {
    return NextResponse.json({ error: "Format d'image non pris en charge." }, { status: 400 });
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "Image trop volumineuse." }, { status: 400 });
  }

  let writeClient = supabase;

  if (!user) {
    try {
      writeClient = createAdminClient();
    } catch {
      return NextResponse.json(
        { error: "La publication est temporairement indisponible." },
        { status: 500 },
      );
    }
  }

  const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const ownerId = user?.id || "dev-local";
  const filePath = `${ownerId}/${Date.now()}-${crypto.randomUUID()}.${fileExt}`;

  const { error: uploadError } = await writeClient.storage
    .from("artworks")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (uploadError) {
    return NextResponse.json({ error: "Impossible d'envoyer l'image." }, { status: 500 });
  }

  const { data: publicUrlData } = writeClient.storage
    .from("artworks")
    .getPublicUrl(filePath);

  const { data: insertedArtwork, error: insertError } = await writeClient
    .from("artworks")
    .insert({
      image_url: publicUrlData.publicUrl,
      description: trimmedDescription,
    })
    .select("id")
    .single();

  if (insertError) {
    await writeClient.storage.from("artworks").remove([filePath]);
    return NextResponse.json(
      { error: "Impossible d'enregistrer l'œuvre." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true, id: insertedArtwork.id });
}
