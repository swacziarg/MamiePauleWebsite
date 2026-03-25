import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const tokenHash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type");
  const next = requestUrl.searchParams.get("next") ?? "/admin";
  const redirectTo = new URL(next, requestUrl.origin);

  const supabase = await createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(redirectTo);
    }

    return NextResponse.redirect(
      new URL(`/admin?erreur=${encodeURIComponent("Lien de connexion invalide ou expiré.")}`, requestUrl.origin),
    );
  }

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type: type as
        | "signup"
        | "invite"
        | "magiclink"
        | "recovery"
        | "email_change"
        | "email",
      token_hash: tokenHash,
    });

    if (!error) {
      return NextResponse.redirect(redirectTo);
    }

    return NextResponse.redirect(
      new URL(`/admin?erreur=${encodeURIComponent("Lien de connexion invalide ou expiré.")}`, requestUrl.origin),
    );
  }

  return NextResponse.redirect(
    new URL(`/admin?erreur=${encodeURIComponent("Lien de connexion incomplet.")}`, requestUrl.origin),
  );
}
