import { z } from "zod";

export const inventoryItemSchema = z.object({
  id_primario: z.string().min(1, "El ID primario es obligatorio"),
  descripcion: z.string().min(1, "La descripción es obligatoria"),
  id_secundario: z.string().optional(),
  codigo_barra: z.string().optional(),
  id_categoria: z.number().nullable(),
  id_estado: z.number().nullable(),
  id_ubicacion: z.number().nullable(),
  id_sub_ubicacion: z.number().nullable(),
  id_responsable: z.string().nullable(),
  id_subresponsable: z.string().nullable(),
});

export type InventoryItemFormData = z.infer<typeof inventoryItemSchema>;
