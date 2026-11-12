import Link from "next/link";

import { deleteModel, moveModel, togglePublished } from "@/app/admin/actions";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { AdminHeader, AdminMain, Alert, buttonClass } from "@/components/admin/ui";
import { Mnt } from "@/components/ui/Mnt";
import { requireAdmin } from "@/lib/admin";
import type { CarModelRow } from "@/lib/car-models";

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const { supabase, email } = await requireAdmin();
  const { saved } = await searchParams;

  const { data: rows, error } = await supabase
    .from("car_models")
    .select("*")
    .order("sort_order")
    .order("created_at")
    .returns<CarModelRow[]>();

  return (
    <>
      <AdminHeader email={email} />
      <AdminMain>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-h5 font-semibold">Машины картууд</h1>
            <p className="text-small text-black/70">
              Нүүр хуудасны «Машины загварууд» хэсэгт энэ дарааллаар харагдана. Нуусан карт сайтад гарахгүй.
            </p>
          </div>
          <Link href="/admin/models/new" className={buttonClass.primary}>
            + Карт нэмэх
          </Link>
        </div>

        {saved && <Alert tone="success">Хадгаллаа. Нүүр хуудас шинэчлэгдсэн.</Alert>}
        {error && <Alert>Картуудыг уншиж чадсангүй: {error.message}</Alert>}

        {rows && rows.length === 0 && (
          <Alert tone="info">Одоогоор карт алга. «Карт нэмэх» товчоор эхний картаа үүсгэнэ үү.</Alert>
        )}

        {rows && rows.length > 0 && (
          <ol className="flex flex-col gap-3">
            {rows.map((row, index) => (
              <li
                key={row.id}
                className="flex flex-col gap-4 rounded-card bg-white p-4 md:flex-row md:items-center md:gap-5"
              >
                <div className="flex min-w-px flex-1 items-center gap-4">
                  <img
                    src={row.image_url}
                    alt=""
                    width={120}
                    height={80}
                    className={`h-20 w-30 flex-none rounded-[4px] object-cover ${row.is_published ? "" : "opacity-40 grayscale"}`}
                  />
                  <div className="flex min-w-px flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold">{row.name}</h2>
                      {!row.is_published && (
                        <span className="rounded-full bg-black-5 px-2 py-0.5 text-small text-black/70">Нуусан</span>
                      )}
                    </div>
                    <p className="text-small text-black/70">{row.description}</p>
                    <p className="text-small">
                      {row.price_text} {row.price_usd != null && <Mnt usd={Number(row.price_usd)} />}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1 border-t border-black/10 pt-3 md:border-0 md:pt-0">
                  <form action={moveModel.bind(null, row.id, -1)}>
                    <button type="submit" disabled={index === 0} className={buttonClass.ghost} aria-label={`${row.name}-ийг дээш зөөх`}>
                      ↑
                    </button>
                  </form>
                  <form action={moveModel.bind(null, row.id, 1)}>
                    <button
                      type="submit"
                      disabled={index === rows.length - 1}
                      className={buttonClass.ghost}
                      aria-label={`${row.name}-ийг доош зөөх`}
                    >
                      ↓
                    </button>
                  </form>
                  <form action={togglePublished.bind(null, row.id, !row.is_published)}>
                    <button type="submit" className={buttonClass.ghost}>
                      {row.is_published ? "Нуух" : "Нийтлэх"}
                    </button>
                  </form>
                  <Link href={`/admin/models/${row.id}`} className={buttonClass.ghost}>
                    Засах
                  </Link>
                  <form action={deleteModel.bind(null, row.id)}>
                    <ConfirmButton
                      message={`«${row.name}» картыг устгах уу? Энэ үйлдлийг буцаах боломжгүй.`}
                      className={`${buttonClass.ghost} text-tesla-red-dark`}
                    >
                      Устгах
                    </ConfirmButton>
                  </form>
                </div>
              </li>
            ))}
          </ol>
        )}
      </AdminMain>
    </>
  );
}
