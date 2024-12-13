import { Database } from "./supabase";

export type InventoryFilters = {
  search: string;
  categoryId?: number;
  statusId?: number;
  locationId?: number;
  responsableId?: number;
};

export type SelectOption = {
  label: string;
  value: number;
};
