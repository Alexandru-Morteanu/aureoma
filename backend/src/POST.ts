import { supabase } from "./supabse";

export default async function POST() {
  const { data } = await supabase.from("item").select("*");
  return {
    id: data,
  };
}
