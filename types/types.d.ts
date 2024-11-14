import type { Database } from "@/types/supabase"; // Adjust the import path if necessary

// Extracted types for the 'bienes' table
export type Bien = Database["public"]["Tables"]["bienes"]["Row"];
export type BienInsert = Database["public"]["Tables"]["bienes"]["Insert"];
export type BienUpdate = Database["public"]["Tables"]["bienes"]["Update"];

// Extracted types for the 'profiles' table
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

// Extracted types for other tables as needed
export type Categoria = Database["public"]["Tables"]["categorias"]["Row"];
export type EstadoBien = Database["public"]["Tables"]["estados_bienes"]["Row"];
export type Ubicacion = Database["public"]["Tables"]["ubicaciones"]["Row"];
export type SubUbicacion = Database["public"]["Tables"]["sub_ubicaciones"]["Row"];
export type Rol = Database["public"]["Tables"]["roles"]["Row"];
export type Transferencia = Database["public"]["Tables"]["transferencias"]["Row"];

// Add this after the existing types
export type BienWithRelations = Bien & {
  categoria: Categoria | null;
  estado: EstadoBien | null;
  ubicacion: Ubicacion | null;
  sub_ubicacion: SubUbicacion | null;
  responsable: Profile | null;
  subresponsable: Profile | null;
};
