import { useQueryClient } from "@tanstack/react-query";
import { inventoryService } from "@/services/inventory";
import { router } from "expo-router";
import { Alert } from "react-native";
import { Bien } from "@/types/types";

export function useItemOperations() {
  const queryClient = useQueryClient();

  const updateItem = async (id: string, data: Partial<Bien>) => {
    try {
      const result = await inventoryService.updateItem(id, data);
      queryClient.invalidateQueries({ queryKey: ["item", id] });
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      return { data: result, error: null };
    } catch (error) {
      console.error("[useItemOperations] Error updating item:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Error al actualizar el item",
      };
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await inventoryService.deleteItem(id);
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      router.back();
      return { error: null };
    } catch (error) {
      console.error("[useItemOperations] Error deleting item:", error);
      return {
        error: error instanceof Error ? error.message : "Error al eliminar el item",
      };
    }
  };

  const confirmDelete = (id: string) => {
    Alert.alert("Confirmar eliminación", "¿Está seguro que desea eliminar este item?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => deleteItem(id),
      },
    ]);
  };

  return {
    updateItem,
    deleteItem: confirmDelete,
  };
}
