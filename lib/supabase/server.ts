import { createServerComponentClient, createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/lib/supabase/database.types"

export function createServerSupabaseClient() {
  const cookieStore = () => cookies();
  return createServerComponentClient<Database>({ cookies: cookieStore });
}


export function createServerActionSupabaseClient() {
  return createServerActionClient<Database>({ cookies })
}
