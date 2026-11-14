import { redirect } from "next/navigation";

import { hasSupabase } from "./supabase/env";
import { createClient } from "./supabase/server";

/**
 * Хуудас, Server Action бүрийн эхэнд дуудна. Нэвтрээгүй эсвэл admin_users жагсаалтад
 * байхгүй бол нэвтрэх хуудас руу шилжүүлнэ. Өгөгдлийн сангийн RLS мөн адил шалгадаг.
 */
export async function requireAdmin() {
  // Supabase тохируулаагүй бол 500 алдаа өгөхийн оронд нэвтрэх хуудсан дээр тайлбар харуулна
  if (!hasSupabase) redirect("/admin/login");

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const email = typeof data?.claims?.email === "string" ? data.claims.email.toLowerCase() : null;
  if (!email) redirect("/admin/login");

  const { data: admin, error } = await supabase.from("admin_users").select("email").eq("email", email).maybeSingle();
  // Хүснэгт байхгүй (миграци ажиллаагүй) зэрэг алдааг "эрх алга"-аас ялгаж харуулна
  if (error) redirect(`/admin/login?error=setup&detail=${encodeURIComponent(error.message)}`);
  if (!admin) redirect("/admin/login?error=forbidden");

  return { supabase, email };
}
