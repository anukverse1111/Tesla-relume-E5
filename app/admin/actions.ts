"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/admin";
import { CAR_MODELS_TAG, logoOptions, type CarModelRow } from "@/lib/car-models";
import { createClient } from "@/lib/supabase/server";

export type FormState = {
  error?: string;
  /** Алдаа гарсан үед бөглөсөн утгуудыг формд буцааж харуулна */
  values?: Record<string, string>;
};

const BUCKET = "car-images";
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

type Supabase = Awaited<ReturnType<typeof createClient>>;

// ---------- Нэвтрэх ----------

export async function signIn(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Имэйл эсвэл нууц үг буруу байна.", values: { email } };

  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ---------- Машины карт ----------

function readFields(formData: FormData) {
  const text = (key: string) => String(formData.get(key) ?? "").trim();
  return {
    name: text("name"),
    description: text("description"),
    price_text: text("price_text"),
    price_usd: text("price_usd"),
    href: text("href"),
    logo: text("logo"),
    is_published: formData.get("is_published") === "on",
  };
}

type Fields = ReturnType<typeof readFields>;

function validate(fields: Fields) {
  if (!fields.name) return "Нэрээ оруулна уу.";
  if (fields.name.length > 80) return "Нэр 80 тэмдэгтээс хэтрэхгүй.";
  if (fields.description.length > 200) return "Тайлбар 200 тэмдэгтээс хэтрэхгүй.";
  if (fields.price_text.length > 120) return "Үнийн бичвэр 120 тэмдэгтээс хэтрэхгүй.";
  if (fields.price_usd && !(Number(fields.price_usd) >= 0)) return "Долларын дүн 0-ээс их тоо байна.";
  if (fields.href && !/^(\/|https:\/\/)/.test(fields.href)) return "Холбоос \"/\" эсвэл \"https://\"-ээр эхэлнэ.";
  if (!(fields.logo in logoOptions)) return "Логогоо сонгоно уу.";
  return null;
}

function toRow(fields: Fields) {
  return {
    name: fields.name,
    description: fields.description,
    price_text: fields.price_text,
    price_usd: fields.price_usd ? Number(fields.price_usd) : null,
    href: fields.href || null,
    logo: fields.logo as CarModelRow["logo"],
    is_published: fields.is_published,
  };
}

function formValues(fields: Fields): Record<string, string> {
  return { ...fields, is_published: fields.is_published ? "on" : "" };
}

/** Сонгосон зургийг шалгаж байршуулна. Зураг сонгоогүй бол null. */
async function uploadImage(supabase: Supabase, formData: FormData): Promise<{ url: string } | { error: string } | null> {
  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) return null;

  const ext = IMAGE_TYPES[file.type];
  if (!ext) return { error: "Зураг JPG, PNG, WebP эсвэл AVIF байна." };
  if (file.size > MAX_IMAGE_BYTES) return { error: "Зураг 4MB-аас бага байна." };

  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { contentType: file.type });
  if (error) return { error: `Зураг байршуулж чадсангүй: ${error.message}` };

  return { url: supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl };
}

/** Зөвхөн манай bucket-д байгаа зургийг устгана. /assets/... зэрэг сайтын зургийг хөндөхгүй. */
async function removeImage(supabase: Supabase, imageUrl: string) {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const index = imageUrl.indexOf(marker);
  if (index === -1) return;
  await supabase.storage.from(BUCKET).remove([imageUrl.slice(index + marker.length)]);
}

export async function createModel(_prev: FormState, formData: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const fields = readFields(formData);
  const values = formValues(fields);

  const invalid = validate(fields);
  if (invalid) return { error: invalid, values };

  const image = await uploadImage(supabase, formData);
  if (!image) return { error: "Зураг сонгоно уу.", values };
  if ("error" in image) return { error: image.error, values };

  // Шинэ картыг жагсаалтын төгсгөлд нэмнэ
  const { data: last } = await supabase
    .from("car_models")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { error } = await supabase
    .from("car_models")
    .insert({ ...toRow(fields), image_url: image.url, sort_order: (last?.sort_order ?? 0) + 1 });

  if (error) {
    await removeImage(supabase, image.url);
    return { error: `Хадгалж чадсангүй: ${error.message}`, values };
  }

  updateTag(CAR_MODELS_TAG);
  redirect("/admin?saved=1");
}

export async function updateModel(id: string, _prev: FormState, formData: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const fields = readFields(formData);
  const values = formValues(fields);

  const invalid = validate(fields);
  if (invalid) return { error: invalid, values };

  const { data: current } = await supabase.from("car_models").select("image_url").eq("id", id).maybeSingle();
  if (!current) return { error: "Энэ карт олдсонгүй. Устгагдсан байж магадгүй.", values };

  const image = await uploadImage(supabase, formData);
  if (image && "error" in image) return { error: image.error, values };

  const { error } = await supabase
    .from("car_models")
    .update({ ...toRow(fields), ...(image ? { image_url: image.url } : {}) })
    .eq("id", id);

  if (error) {
    if (image) await removeImage(supabase, image.url);
    return { error: `Хадгалж чадсангүй: ${error.message}`, values };
  }

  if (image) await removeImage(supabase, current.image_url);

  updateTag(CAR_MODELS_TAG);
  redirect("/admin?saved=1");
}

export async function deleteModel(id: string) {
  const { supabase } = await requireAdmin();

  const { data: deleted, error } = await supabase.from("car_models").delete().eq("id", id).select("image_url").maybeSingle();
  if (error) throw new Error(`Устгаж чадсангүй: ${error.message}`);
  if (deleted) await removeImage(supabase, deleted.image_url);

  updateTag(CAR_MODELS_TAG);
  redirect("/admin");
}

export async function togglePublished(id: string, publish: boolean) {
  const { supabase } = await requireAdmin();

  const { error } = await supabase.from("car_models").update({ is_published: publish }).eq("id", id);
  if (error) throw new Error(`Хадгалж чадсангүй: ${error.message}`);

  updateTag(CAR_MODELS_TAG);
  redirect("/admin");
}

/** Картыг дарааллын дагуу нэг байр дээш (-1) эсвэл доош (+1) зөөнө */
export async function moveModel(id: string, direction: -1 | 1) {
  const { supabase } = await requireAdmin();

  const { data: rows, error } = await supabase
    .from("car_models")
    .select("id, sort_order")
    .order("sort_order")
    .order("created_at");
  if (error) throw new Error(`Дарааллыг уншиж чадсангүй: ${error.message}`);

  const index = rows.findIndex((row) => row.id === id);
  const target = index + direction;
  if (index === -1 || target < 0 || target >= rows.length) redirect("/admin");

  const ordered = [...rows];
  [ordered[index], ordered[target]] = [ordered[target], ordered[index]];

  // Дугаарлалтыг 1, 2, 3... болгож зөвхөн өөрчлөгдсөн мөрүүдийг шинэчилнэ
  const changes = ordered
    .map((row, position) => ({ id: row.id, sort_order: position + 1, changed: row.sort_order !== position + 1 }))
    .filter((row) => row.changed);

  const results = await Promise.all(
    changes.map((row) => supabase.from("car_models").update({ sort_order: row.sort_order }).eq("id", row.id)),
  );
  const failed = results.find((result) => result.error);
  if (failed?.error) throw new Error(`Дарааллыг хадгалж чадсангүй: ${failed.error.message}`);

  updateTag(CAR_MODELS_TAG);
  redirect("/admin");
}
