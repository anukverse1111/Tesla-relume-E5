import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import { models as fallbackModels, type Model } from "@/data/models";

import { CAR_MODELS_TAG, logoOptions, type CarModelRow } from "./car-model-types";
import { hasSupabase, supabaseKey, supabaseUrl } from "./supabase/env";

export { CAR_MODELS_TAG, logoOptions, type CarModelRow, type LogoKey } from "./car-model-types";

export function toCardModel(row: CarModelRow): Model {
  return {
    name: row.name,
    href: row.href ?? undefined,
    description: row.description,
    priceText: row.price_text,
    priceUsd: row.price_usd == null ? undefined : Number(row.price_usd),
    image: row.image_url,
    logo: logoOptions[row.logo] ?? logoOptions.a,
  };
}

/**
 * Нүүр хуудасны нийтлэгдсэн картууд. Хариуг кэшлэх бөгөөд админ өөрчлөлт хийх бүрт
 * CAR_MODELS_TAG-ээр шинэчлэгдэнэ. Supabase тохируулаагүй эсвэл алдаа гарвал data/models.tsx-ийн өгөгдлийг харуулна.
 */
export async function getPublishedCarModels(): Promise<Model[]> {
  if (!hasSupabase) return fallbackModels;

  const supabase = createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) =>
        fetch(input, { ...init, cache: "force-cache", next: { tags: [CAR_MODELS_TAG], revalidate: 3600 } }),
    },
  });

  const { data, error } = await supabase
    .from("car_models")
    .select("*")
    .eq("is_published", true)
    .order("sort_order")
    .order("created_at")
    .returns<CarModelRow[]>();

  if (error) {
    console.error("Машины картуудыг Supabase-ээс уншиж чадсангүй:", error.message);
    return fallbackModels;
  }

  return data.map(toCardModel);
}
