import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getGuests({ page, sortBy }) {
  let query = supabase.from("guests").select("*", { count: "exact" });
  // SORTING
  if (sortBy) {
    const { field, direction } = sortBy;

    query = query.order(field, {
      ascending: direction === "asc",
    });
  }

  // PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Guests could not be loaded");
    throw new Error("Guests could not be loaded");
  }

  return { data, count };
}

export async function createUpdateGuest(newGuest, id) {
  let query = supabase.from("guests");
  console.log(newGuest);

  if (!id) query = query.insert([{ ...newGuest }]);
  if (id) query = query.update({ ...newGuest }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error("Guest could not be created/updated");
    throw new Error(error.message);
  }

  return data;
}

export async function deleteGuest(id) {
  const { data, error } = await supabase.from("guests").delete().eq("id", id);

  if (error) {
    console.error("Guest could not be deleted");
    throw new Error("Guest could not be deleted");
  }
  return data;
}
