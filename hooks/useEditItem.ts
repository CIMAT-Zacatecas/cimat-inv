import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { inventoryService } from "@/services/inventory";
import { Bien } from "@/types/types";

export function useEditItem() {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const updateItem = async (id: string, data: Partial<Bien>) => {
    console.log("[useEditItem] Starting item update with data:", data);
    setIsLoading(true);

    try {
      const result = await inventoryService.updateItem(id, data);
      queryClient.invalidateQueries({ queryKey: ["item", id] });
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      console.log("[useEditItem] Item updated successfully:", result);
      return { data: result, error: null };
    } catch (error) {
      console.error("[useEditItem] Error updating item:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "No se pudo actualizar el item",
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { updateItem, isLoading };
}
