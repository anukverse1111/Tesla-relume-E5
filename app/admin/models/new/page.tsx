import Link from "next/link";

import { createModel } from "@/app/admin/actions";
import { ModelForm } from "@/components/admin/ModelForm";
import { AdminHeader, AdminMain } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin";

export default async function NewModelPage() {
  const { email } = await requireAdmin();

  return (
    <>
      <AdminHeader email={email} />
      <AdminMain className="max-w-[720px]">
        <div className="flex flex-col gap-1">
          <Link href="/admin" className="text-small text-black/60 hover:underline">
            ← Картууд
          </Link>
          <h1 className="text-h5 font-semibold">Шинэ карт</h1>
        </div>
        <ModelForm action={createModel} />
      </AdminMain>
    </>
  );
}
