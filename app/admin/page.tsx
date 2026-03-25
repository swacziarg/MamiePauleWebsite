import Link from "next/link";
import { AdminAuth } from "@/components/admin-auth";
import { AdminSignOut } from "@/components/admin-sign-out";
import { ArtworkUploadForm } from "@/components/artwork-upload-form";
import { isDevAdminBypassEnabled } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";

type AdminPageProps = {
  searchParams?: Promise<{
    erreur?: string;
  }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const supabase = await createClient();
  const params = await searchParams;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isDevAdminBypassEnabled) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5 py-12">
        <div className="flex w-full flex-col items-center gap-4">
          <Link
            href="/"
            className="rounded-full border border-line bg-white px-5 py-2 text-sm text-black/70 shadow-soft hover:text-ink"
          >
            Retour au site
          </Link>
          {params?.erreur ? (
            <p className="rounded-full border border-red-200 bg-red-50 px-5 py-3 text-center text-base text-red-800">
              {params.erreur}
            </p>
          ) : null}
          <AdminAuth />
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 px-5 py-12">
      <div className="flex w-full max-w-3xl items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="rounded-full border border-line bg-white px-5 py-2 text-sm text-black/70 shadow-soft hover:text-ink"
          >
            Retour au site
          </Link>
          <p className="text-sm uppercase tracking-[0.3em] text-black/45">
            {isDevAdminBypassEnabled && !user ? "Mode dev" : "Admin"}
          </p>
        </div>
        {user ? <AdminSignOut /> : null}
      </div>
      <ArtworkUploadForm />
    </main>
  );
}
