import { z } from "zod";

export const inventoryItemSchema = z.object({
  id_primario: z.string().min(1, "El ID primario es obligatorio"),
  descripcion: z.string().min(1, "La descripción es obligatoria"),
  id_secundario: z.string().optional(),
  codigo_barra: z.string().min(1, "El código de barra es obligatorio"),
  id_categoria: z.number().min(1, "La categoría es obligatoria"),
  id_estado: z.number().min(1, "El estado es obligatorio"),
  id_ubicacion: z.number().min(1, "La ubicación es obligatoria"),
  id_sub_ubicacion: z.number().nullable(),
  id_responsable: z.string().min(1, "El responsable es obligatorio"),
  id_subresponsable: z.string().nullable(),
});

export type InventoryItemFormData = z.infer<typeof inventoryItemSchema>;
