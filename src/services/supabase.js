import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://jubthdqhyevbxfmhrnxh.supabase.co";
const supabaseKey = "sb_publishable_W32Qi_GNQbun2I1uFeA1bQ_eWE_Kq1P";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
