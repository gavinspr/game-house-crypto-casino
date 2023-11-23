import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_API_URL as string;
const supabaseAnonKey = process.env.SUPABASE_PUBLIC_API_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
