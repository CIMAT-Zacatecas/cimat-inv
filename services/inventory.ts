import { supabase } from "@/lib/supabase";
import { Bien, BienInsert, BienWithRelations } from "@/types/types";

export const inventoryService = {
  async getAll() {
    const { data, error } = await supabase
      .from("bienes")
      .select(
        `
        *,
        categoria:categorias(*),
        estado:estados_bienes(*),
        ubicacion:ubicaciones(*),
        sub_ubicacion:sub_ubicaciones(*),
        responsable:profiles!bienes_id_responsable_fkey(*),
        subresponsable:profiles!bienes_id_subresponsable_fkey(*)
      `,
      )
      .returns<BienWithRelations[]>();

    if (error) throw error;
    return data || [];
  },

  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from("bienes")
      .select(
        `
        *,
        categoria:categorias(*),
        estado:estados_bienes(*),
        ubicacion:ubicaciones(*),
        sub_ubicacion:sub_ubicaciones(*),
        responsable:profiles!bienes_id_responsable_fkey(*),
        subresponsable:profiles!bienes_id_subresponsable_fkey(*)
      `,
      )
      .eq("id_responsable", userId)
      .returns<BienWithRelations[]>();

    if (error) throw error;
    return data || [];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from("bienes")
      .select(
        `
        *,
        categoria:categorias(*),
        estado:estados_bienes(*),
        ubicacion:ubicaciones(*),
        sub_ubicacion:sub_ubicaciones(*),
        responsable:profiles!bienes_id_responsable_fkey(*),
        subresponsable:profiles!bienes_id_subresponsable_fkey(*)
      `,
      )
      .eq("id_primario", id)
      .single();

    if (error) throw error;
    return data;
  },

  async createItem(data: BienInsert) {
    const { data: result, error } = await supabase
      .from("bienes")
      .insert(data)
      .select(
        `
        *,
        categoria:categorias(*),
        estado:estados_bienes(*),
        ubicacion:ubicaciones(*),
        sub_ubicacion:sub_ubicaciones(*),
        responsable:profiles!bienes_id_responsable_fkey(*),
        subresponsable:profiles!bienes_id_subresponsable_fkey(*)
      `,
      )
      .single();

    if (error) throw error;
    return result;
  },

  async updateItem(id: string, data: Partial<Bien>) {
    const { data: result, error } = await supabase
      .from("bienes")
      .update(data)
      .eq("id_primario", id)
      .select(
        `
        *,
        categoria:categorias(*),
        estado:estados_bienes(*),
        ubicacion:ubicaciones(*),
        sub_ubicacion:sub_ubicaciones(*),
        responsable:profiles!bienes_id_responsable_fkey(*),
        subresponsable:profiles!bienes_id_subresponsable_fkey(*)
      `,
      )
      .single();

    if (error) throw error;

    return result;
  },

  async deleteItem(id: string) {
    const { error } = await supabase.from("bienes").delete().eq("id_primario", id);

    if (error) throw error;

    return true;
  },
};
