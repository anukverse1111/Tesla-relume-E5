import { redirect } from "next/navigation";

import { signOut } from "@/app/admin/actions";
import { LoginForm } from "@/components/admin/LoginForm";
import { AdminHeader, AdminMain, Alert, buttonClass } from "@/components/admin/ui";
import { hasSupabase } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; detail?: string }>;
}) {
  if (!hasSupabase) {
    return (
      <>
        <AdminHeader />
        <AdminMain className="max-w-small">
          <Alert>
            Supabase тохируулаагүй байна. <code>NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
            <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> хувьсагчдыг нэмнэ үү.
          </Alert>
        </AdminMain>
      </>
    );
  }

  const { error, detail } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const email = typeof data?.claims?.email === "string" ? data.claims.email : undefined;
  const blocked = error === "forbidden" || error === "setup";

  // Нэвтэрсэн админ энэ хуудсанд ирвэл шууд жагсаалт руу
  if (email && !blocked) redirect("/admin");

  return (
    <>
      <AdminHeader />
      <AdminMain className="max-w-[480px]">
        <div className="flex flex-col gap-2">
          <h1 className="text-h5 font-semibold">Админ нэвтрэх</h1>
          <p className="text-black/70">Нүүр хуудасны машины картуудыг засахын тулд нэвтэрнэ үү.</p>
        </div>

        {email && blocked ? (
          <div className="flex flex-col gap-4">
            {error === "setup" ? (
              <Alert>
                Админ эрхийг шалгаж чадсангүй. Supabase-ийн миграци (
                <code>supabase/migrations</code>) ажилласан эсэхийг шалгана уу.
                {detail && <span className="mt-1 block opacity-80">Алдаа: {detail}</span>}
              </Alert>
            ) : (
              <Alert>
                <strong>{email}</strong> бүртгэлд админ эрх алга. Өөр бүртгэлээр нэвтэрнэ үү.
              </Alert>
            )}
            <form action={signOut}>
              <button type="submit" className={buttonClass.secondary}>
                Гарах
              </button>
            </form>
          </div>
        ) : (
          <LoginForm />
        )}
      </AdminMain>
    </>
  );
}
