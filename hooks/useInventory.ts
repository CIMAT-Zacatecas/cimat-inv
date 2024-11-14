import { useQuery } from "@tanstack/react-query";
import { inventoryService } from "@/services/inventory";
import { Bien } from "@/types/types";

export function useInventory() {
  return useQuery<Bien[]>({
    queryKey: ["inventory"],
    queryFn: () => inventoryService.getAll(),
  });
}

export function useUserInventory(userId?: string) {
  return useQuery<Bien[]>({
    queryKey: ["inventory", "user", userId],
    queryFn: () => inventoryService.getByUserId(userId!),
    enabled: !!userId,
  });
}

export function useInventoryItem(id?: string) {
  return useQuery<Bien>({
    queryKey: ["inventory", "item", id],
    queryFn: () => inventoryService.getById(id!),
    enabled: !!id,
  });
}
