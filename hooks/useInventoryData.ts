import { useQuery } from "@tanstack/react-query";
import { inventoryService } from "@/services/inventory";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => inventoryService.getCategories(),
  });
}

export function useStatuses() {
  return useQuery({
    queryKey: ["statuses"],
    queryFn: () => inventoryService.getStatuses(),
  });
}

export function useLocations() {
  return useQuery({
    queryKey: ["locations"],
    queryFn: () => inventoryService.getLocations(),
  });
}

export function useSubLocations(locationId?: number) {
  return useQuery({
    queryKey: ["subLocations", locationId],
    queryFn: () => inventoryService.getSubLocations(locationId!),
    enabled: !!locationId,
  });
}
