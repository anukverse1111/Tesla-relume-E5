/** Supabase-ийн холболт. Утгууд .env.local болон Vercel-ийн Environment Variables-аас ирнэ. */
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

export const hasSupabase = Boolean(supabaseUrl && supabaseKey);
