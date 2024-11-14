import { supabase } from "@/lib/supabase";
import { Bien, BienInsert } from "@/types/types";

export const inventoryService = {
  async getAll() {
    const { data, error } = await supabase.from("bienes").select("*");

    if (error) throw error;

    return data || [];
  },

  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from("bienes")
      .select("*")
      .eq("id_responsable", userId);

    if (error) throw error;

    return data || [];
  },

  async createItem(newItem: BienInsert) {
    const { data, error } = await supabase
      .from("bienes")
      .insert(newItem)
      .select()
      .single();

    if (error) throw error;

    return data as Bien;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from("bienes")
      .select("*")
      .eq("id_primario", id)
      .single();

    if (error) throw error;

    return data as Bien;
  },
};
