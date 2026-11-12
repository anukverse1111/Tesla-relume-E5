import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { supabaseKey, supabaseUrl } from "./env";

/** Нэвтэрсэн хэрэглэгчийн нэрийн өмнөөс ажиллах client. Хүсэлт бүрт шинээр үүсгэнэ. */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) cookieStore.set(name, value, options);
        } catch {
          // Server Component-оос cookie бичих боломжгүй. Сессийг proxy.ts шинэчилнэ.
        }
      },
    },
  });
}
