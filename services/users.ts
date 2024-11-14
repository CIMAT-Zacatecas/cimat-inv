import { supabase } from "@/lib/supabase";
import { Profile } from "@/types/types";

export const usersService = {
  async getAll() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) throw error;

    return data || [];
  },
};
