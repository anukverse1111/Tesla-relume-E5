/** Сервер болон админы client компонент хоёуланд хэрэглэдэг тул Supabase-ийн client-ийг энд импортлохгүй */

/** Админ өөрчлөлт хийхэд нүүр хуудасны кэшийг энэ шошгоор шинэчилнэ */
export const CAR_MODELS_TAG = "car-models";

export const logoOptions = {
  a: "/assets/icons/card-logo-a.svg",
  b: "/assets/icons/card-logo-b.svg",
} as const;

export type LogoKey = keyof typeof logoOptions;

/** Supabase-ийн public.car_models хүснэгтийн мөр */
export type CarModelRow = {
  id: string;
  name: string;
  description: string;
  price_text: string;
  price_usd: number | null;
  href: string | null;
  image_url: string;
  logo: LogoKey;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};
