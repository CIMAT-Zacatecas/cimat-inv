import { useState } from "react";
import { inventoryService } from "@/services/inventory";
import type { BienInsert } from "@/types/types";

export function useCreateItem() {
  const [isLoading, setIsLoading] = useState(false);

  const createItem = async (data: Omit<BienInsert, "fecha_registro">) => {
    console.log("[useCreateItem] Starting item creation with data:", data);
    setIsLoading(true);

    try {
      const newItem: BienInsert = {
        ...data,
        fecha_registro: new Date().toISOString(),
      };

      const result = await inventoryService.createItem(newItem);
      console.log("[useCreateItem] Item created successfully:", result);
      return { data: result, error: null };
    } catch (error) {
      console.error("[useCreateItem] Error creating item:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "No se pudo crear el item",
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { createItem, isLoading };
}
