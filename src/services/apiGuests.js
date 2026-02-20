import supabase from "./supabase";

export async function getGuests() {
  const { data, error } = await supabase.from("guests").select("*");

  if (error) {
    console.error("guests could not be loaded");
    throw new Error("guests could not be loaded");
  }
  return data;
}
