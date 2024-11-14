import { supabase } from "@/lib/supabase";
import { Bien } from "@/types/types";

export const inventoryService = {
  async getAll() {
    const { data, error } = await supabase.from("bienes").select("*");

    if (error) throw error;
    return data as Bien[];
  },

  async getByUserId(userId: string) {
    const { data, error } = await supabase.from("bienes").select("*").eq("id_responsable", userId);

    if (error) throw error;
    return data as Bien[];
  },
};
