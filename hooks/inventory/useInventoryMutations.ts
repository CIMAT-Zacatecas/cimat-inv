import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { inventoryService } from "@/services/inventory";
import type { Bien, BienInsert } from "@/types/types";
import { router } from "expo-router";
import { Alert } from "react-native";

export function useInventoryMutations() {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const createItem = async (data: Omit<BienInsert, "fecha_registro">) => {
    setIsLoading(true);
    try {
      const newItem: BienInsert = {
        ...data,
        fecha_registro: new Date().toISOString(),
      };
      const result = await inventoryService.createItem(newItem);
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      return { data: result, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "No se pudo crear el item",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const updateItem = async (id: string, data: Partial<Bien>) => {
    setIsLoading(true);
    try {
      const result = await inventoryService.updateItem(id, data);
      queryClient.invalidateQueries({ queryKey: ["item", id] });
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      return { data: result, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "No se pudo actualizar el item",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await inventoryService.deleteItem(id);
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      router.back();
      return { error: null };
    } catch (error) {
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
    createItem,
    updateItem,
    deleteItem: confirmDelete,
    isLoading,
  };
}
