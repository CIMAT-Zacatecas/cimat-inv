import { useState, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import { supabase } from "@/lib/supabase";
import type { InventoryFilters, SelectOption } from "@/types/filters";
import type { BienWithRelations } from "@/types/types";

export function useInventoryFilters(items: BienWithRelations[]) {
  const [filters, setFilters] = useState<InventoryFilters>({
    search: "",
    categoryId: undefined,
    statusId: undefined,
    locationId: undefined,
  });

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categorias")
        .select("*")
        .order("nombre");
      if (error) throw error;
      return data;
    },
  });

  // Fetch statuses
  const { data: statuses = [] } = useQuery({
    queryKey: ["statuses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("estados_bienes")
        .select("*")
        .order("nombre");
      if (error) throw error;
      return data;
    },
  });

  // Fetch locations
  const { data: locations = [] } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ubicaciones")
        .select("*")
        .order("nombre");
      if (error) throw error;
      return data;
    },
  });

  // Convert to select options
  const categoryOptions: SelectOption[] = useMemo(
    () => categories.map((cat) => ({ label: cat.nombre, value: cat.id })),
    [categories],
  );

  const statusOptions: SelectOption[] = useMemo(
    () => statuses.map((status) => ({ label: status.nombre, value: status.id })),
    [statuses],
  );

  const locationOptions: SelectOption[] = useMemo(
    () =>
      [...locations]
        .sort((a, b) => a.codigo.localeCompare(b.codigo))
        .map((loc) => ({ label: `${loc.codigo} - ${loc.nombre}`, value: loc.id })),
    [locations],
  );

  // Debounced search handler
  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setFilters((prev) => ({ ...prev, search: value }));
    }, 300),
    [],
  );

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        !filters.search ||
        item.descripcion.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.id_primario.toLowerCase().includes(filters.search.toLowerCase());

      const matchesCategory =
        !filters.categoryId || item.id_categoria === filters.categoryId;

      const matchesStatus = !filters.statusId || item.id_estado === filters.statusId;

      const matchesLocation =
        !filters.locationId || item.id_ubicacion === filters.locationId;

      return matchesSearch && matchesCategory && matchesStatus && matchesLocation;
    });
  }, [items, filters]);

  return {
    filters,
    setFilters,
    debouncedSetSearch,
    filteredItems,
    categoryOptions,
    statusOptions,
    locationOptions,
  };
}
