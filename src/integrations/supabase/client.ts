import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("As credenciais do Supabase (URL e Publishable Key) não foram encontradas nas variáveis de ambiente (.env).");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
