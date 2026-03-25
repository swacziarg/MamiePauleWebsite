import { AdminAuth } from "@/components/admin-auth";
import { ArtworkUploadForm } from "@/components/artwork-upload-form";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5 py-12">
        <AdminAuth />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12">
      <ArtworkUploadForm userId={user.id} />
    </main>
  );
}
