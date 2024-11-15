import { useQuery } from "@tanstack/react-query";
import { inventoryService } from "@/services/inventory";
import type { SelectOption } from "@/types/filters";
import { useMemo } from "react";

export function useCategories() {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => inventoryService.getCategories(),
  });

  const categoryOptions: SelectOption[] = useMemo(
    () => categories.map((cat) => ({ label: cat.nombre, value: cat.id })),
    [categories],
  );

  return { categories, categoryOptions };
}

export function useStatuses() {
  const { data: statuses = [] } = useQuery({
    queryKey: ["statuses"],
    queryFn: () => inventoryService.getStatuses(),
  });

  const statusOptions: SelectOption[] = useMemo(
    () => statuses.map((status) => ({ label: status.nombre, value: status.id })),
    [statuses],
  );

  return { statuses, statusOptions };
}

export function useLocations() {
  const { data: locations = [] } = useQuery({
    queryKey: ["locations"],
    queryFn: () => inventoryService.getLocations(),
  });

  const locationOptions: SelectOption[] = useMemo(
    () => locations.map((loc) => ({ label: loc.nombre, value: loc.id })),
    [locations],
  );

  return { locations, locationOptions };
}

export function useSubLocations(locationId?: number) {
  const { data: subLocations = [] } = useQuery({
    queryKey: ["subLocations", locationId],
    queryFn: () => inventoryService.getSubLocations(locationId!),
    enabled: !!locationId,
  });

  const subLocationOptions: SelectOption[] = useMemo(
    () => subLocations.map((loc) => ({ label: loc.nombre, value: loc.id })),
    [subLocations],
  );

  return { subLocations, subLocationOptions };
}
