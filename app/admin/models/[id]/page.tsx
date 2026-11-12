import Link from "next/link";
import { notFound } from "next/navigation";

import { updateModel } from "@/app/admin/actions";
import { ModelForm } from "@/components/admin/ModelForm";
import { AdminHeader, AdminMain } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin";
import type { CarModelRow } from "@/lib/car-models";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function EditModelPage({ params }: { params: Promise<{ id: string }> }) {
  const { supabase, email } = await requireAdmin();
  const { id } = await params;
  if (!uuidPattern.test(id)) notFound();

  const { data: model } = await supabase.from("car_models").select("*").eq("id", id).maybeSingle<CarModelRow>();
  if (!model) notFound();

  return (
    <>
      <AdminHeader email={email} />
      <AdminMain className="max-w-[720px]">
        <div className="flex flex-col gap-1">
          <Link href="/admin" className="text-small text-black/60 hover:underline">
            ← Картууд
          </Link>
          <h1 className="text-h5 font-semibold">{model.name} засах</h1>
        </div>
        <ModelForm key={model.updated_at} action={updateModel.bind(null, model.id)} model={model} />
      </AdminMain>
    </>
  );
}
