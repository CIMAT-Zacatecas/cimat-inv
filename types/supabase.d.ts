export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      bienes: {
        Row: {
          codigo_barra: string | null;
          created_at: string | null;
          created_by: string | null;
          descripcion: string;
          fecha_registro: string | null;
          id: number;
          id_categoria: number | null;
          id_estado: number | null;
          id_primario: string;
          id_responsable: string | null;
          id_secundario: string | null;
          id_sub_ubicacion: number | null;
          id_subresponsable: string | null;
          id_ubicacion: number | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          codigo_barra?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          descripcion: string;
          fecha_registro?: string | null;
          id?: number;
          id_categoria?: number | null;
          id_estado?: number | null;
          id_primario: string;
          id_responsable?: string | null;
          id_secundario?: string | null;
          id_sub_ubicacion?: number | null;
          id_subresponsable?: string | null;
          id_ubicacion?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          codigo_barra?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          descripcion?: string;
          fecha_registro?: string | null;
          id?: number;
          id_categoria?: number | null;
          id_estado?: number | null;
          id_primario?: string;
          id_responsable?: string | null;
          id_secundario?: string | null;
          id_sub_ubicacion?: number | null;
          id_subresponsable?: string | null;
          id_ubicacion?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "bienes_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bienes_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bienes_id_categoria_fkey";
            columns: ["id_categoria"];
            isOneToOne: false;
            referencedRelation: "categorias";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bienes_id_estado_fkey";
            columns: ["id_estado"];
            isOneToOne: false;
            referencedRelation: "estados_bienes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bienes_id_responsable_fkey";
            columns: ["id_responsable"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bienes_id_responsable_fkey";
            columns: ["id_responsable"];
            isOneToOne: false;
            referencedRelation: "users_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bienes_id_sub_ubicacion_fkey";
            columns: ["id_sub_ubicacion"];
            isOneToOne: false;
            referencedRelation: "sub_ubicaciones";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bienes_id_subresponsable_fkey";
            columns: ["id_subresponsable"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bienes_id_subresponsable_fkey";
            columns: ["id_subresponsable"];
            isOneToOne: false;
            referencedRelation: "users_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bienes_id_ubicacion_fkey";
            columns: ["id_ubicacion"];
            isOneToOne: false;
            referencedRelation: "ubicaciones";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bienes_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bienes_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "users_view";
            referencedColumns: ["id"];
          },
        ];
      };
      categorias: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          descripcion: string | null;
          id: number;
          nombre: string;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          descripcion?: string | null;
          id?: number;
          nombre: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          descripcion?: string | null;
          id?: number;
          nombre?: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "categorias_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "categorias_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "categorias_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "categorias_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "users_view";
            referencedColumns: ["id"];
          },
        ];
      };
      estados_bienes: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          descripcion: string | null;
          id: number;
          nombre: string;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          descripcion?: string | null;
          id?: number;
          nombre: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          descripcion?: string | null;
          id?: number;
          nombre?: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "estados_bienes_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "estados_bienes_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "estados_bienes_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "estados_bienes_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "users_view";
            referencedColumns: ["id"];
          },
        ];
      };
      historial_cambio_ubicacion: {
        Row: {
          fecha_cambio: string | null;
          id: number;
          id_bien: number | null;
          id_sub_ubicacion_anterior: number | null;
          id_sub_ubicacion_nueva: number | null;
          id_ubicacion_anterior: number | null;
          id_ubicacion_nueva: number | null;
          id_usuario_cambio: string | null;
        };
        Insert: {
          fecha_cambio?: string | null;
          id?: number;
          id_bien?: number | null;
          id_sub_ubicacion_anterior?: number | null;
          id_sub_ubicacion_nueva?: number | null;
          id_ubicacion_anterior?: number | null;
          id_ubicacion_nueva?: number | null;
          id_usuario_cambio?: string | null;
        };
        Update: {
          fecha_cambio?: string | null;
          id?: number;
          id_bien?: number | null;
          id_sub_ubicacion_anterior?: number | null;
          id_sub_ubicacion_nueva?: number | null;
          id_ubicacion_anterior?: number | null;
          id_ubicacion_nueva?: number | null;
          id_usuario_cambio?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "historial_cambio_ubicacion_id_bien_fkey";
            columns: ["id_bien"];
            isOneToOne: false;
            referencedRelation: "bienes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "historial_cambio_ubicacion_id_sub_ubicacion_anterior_fkey";
            columns: ["id_sub_ubicacion_anterior"];
            isOneToOne: false;
            referencedRelation: "sub_ubicaciones";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "historial_cambio_ubicacion_id_sub_ubicacion_nueva_fkey";
            columns: ["id_sub_ubicacion_nueva"];
            isOneToOne: false;
            referencedRelation: "sub_ubicaciones";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "historial_cambio_ubicacion_id_ubicacion_anterior_fkey";
            columns: ["id_ubicacion_anterior"];
            isOneToOne: false;
            referencedRelation: "ubicaciones";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "historial_cambio_ubicacion_id_ubicacion_nueva_fkey";
            columns: ["id_ubicacion_nueva"];
            isOneToOne: false;
            referencedRelation: "ubicaciones";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "historial_cambio_ubicacion_id_usuario_cambio_fkey";
            columns: ["id_usuario_cambio"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "historial_cambio_ubicacion_id_usuario_cambio_fkey";
            columns: ["id_usuario_cambio"];
            isOneToOne: false;
            referencedRelation: "users_view";
            referencedColumns: ["id"];
          },
        ];
      };
      historial_cambios: {
        Row: {
          campo_modificado: string | null;
          fecha_cambio: string | null;
          id: number;
          id_bien: number | null;
          id_usuario_cambio: string | null;
          valor_anterior: string | null;
          valor_nuevo: string | null;
        };
        Insert: {
          campo_modificado?: string | null;
          fecha_cambio?: string | null;
          id?: number;
          id_bien?: number | null;
          id_usuario_cambio?: string | null;
          valor_anterior?: string | null;
          valor_nuevo?: string | null;
        };
        Update: {
          campo_modificado?: string | null;
          fecha_cambio?: string | null;
          id?: number;
          id_bien?: number | null;
          id_usuario_cambio?: string | null;
          valor_anterior?: string | null;
          valor_nuevo?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "historial_cambios_id_bien_fkey";
            columns: ["id_bien"];
            isOneToOne: false;
            referencedRelation: "bienes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "historial_cambios_id_usuario_cambio_fkey";
            columns: ["id_usuario_cambio"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "historial_cambios_id_usuario_cambio_fkey";
            columns: ["id_usuario_cambio"];
            isOneToOne: false;
            referencedRelation: "users_view";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          id_rol: number;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          id_rol: number;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          id_rol?: number;
          updated_at?: string | null;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_profiles_roles";
            columns: ["id_rol"];
            isOneToOne: false;
            referencedRelation: "roles";
            referencedColumns: ["id"];
          },
        ];
      };
      reportes: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          fecha_generacion: string | null;
          filtros_aplicados: string | null;
          id: number;
          nombre: string | null;
          ruta_archivo: string | null;
          tipo: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          fecha_generacion?: string | null;
          filtros_aplicados?: string | null;
          id?: number;
          nombre?: string | null;
          ruta_archivo?: string | null;
          tipo?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          fecha_generacion?: string | null;
          filtros_aplicados?: string | null;
          id?: number;
          nombre?: string | null;
          ruta_archivo?: string | null;
          tipo?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "reportes_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reportes_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users_view";
            referencedColumns: ["id"];
          },
        ];
      };
      roles: {
        Row: {
          id: number;
          nombre: string;
        };
        Insert: {
          id?: never;
          nombre: string;
        };
        Update: {
          id?: never;
          nombre?: string;
        };
        Relationships: [];
      };
      solicitud_cambio_ubicacion: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          estado_solicitud: string | null;
          fecha_autorizacion: string | null;
          fecha_solicitud: string | null;
          id: number;
          id_bien: number | null;
          id_sub_ubicacion_nueva: number | null;
          id_ubicacion_nueva: number;
          id_usuario_autoriza: string | null;
          id_usuario_solicitante: string;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          estado_solicitud?: string | null;
          fecha_autorizacion?: string | null;
          fecha_solicitud?: string | null;
          id?: number;
          id_bien?: number | null;
          id_sub_ubicacion_nueva?: number | null;
          id_ubicacion_nueva: number;
          id_usuario_autoriza?: string | null;
          id_usuario_solicitante: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          estado_solicitud?: string | null;
          fecha_autorizacion?: string | null;
          fecha_solicitud?: string | null;
          id?: number;
          id_bien?: number | null;
          id_sub_ubicacion_nueva?: number | null;
          id_ubicacion_nueva?: number;
          id_usuario_autoriza?: string | null;
          id_usuario_solicitante?: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "solicitud_cambio_ubicacion_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "solicitud_cambio_ubicacion_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "solicitud_cambio_ubicacion_id_bien_fkey";
            columns: ["id_bien"];
            isOneToOne: false;
            referencedRelation: "bienes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "solicitud_cambio_ubicacion_id_sub_ubicacion_nueva_fkey";
            columns: ["id_sub_ubicacion_nueva"];
            isOneToOne: false;
            referencedRelation: "sub_ubicaciones";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "solicitud_cambio_ubicacion_id_ubicacion_nueva_fkey";
            columns: ["id_ubicacion_nueva"];
            isOneToOne: false;
            referencedRelation: "ubicaciones";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "solicitud_cambio_ubicacion_id_usuario_autoriza_fkey";
            columns: ["id_usuario_autoriza"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "solicitud_cambio_ubicacion_id_usuario_autoriza_fkey";
            columns: ["id_usuario_autoriza"];
            isOneToOne: false;
            referencedRelation: "users_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "solicitud_cambio_ubicacion_id_usuario_solicitante_fkey";
            columns: ["id_usuario_solicitante"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "solicitud_cambio_ubicacion_id_usuario_solicitante_fkey";
            columns: ["id_usuario_solicitante"];
            isOneToOne: false;
            referencedRelation: "users_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "solicitud_cambio_ubicacion_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "solicitud_cambio_ubicacion_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "users_view";
            referencedColumns: ["id"];
          },
        ];
      };
      sub_ubicaciones: {
        Row: {
          codigo: string;
          created_at: string | null;
          created_by: string | null;
          descripcion: string | null;
          id: number;
          id_ubicacion: number | null;
          nombre: string;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          codigo: string;
          created_at?: string | null;
          created_by?: string | null;
          descripcion?: string | null;
          id?: number;
          id_ubicacion?: number | null;
          nombre: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          codigo?: string;
          created_at?: string | null;
          created_by?: string | null;
          descripcion?: string | null;
          id?: number;
          id_ubicacion?: number | null;
          nombre?: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "sub_ubicaciones_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sub_ubicaciones_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sub_ubicaciones_id_ubicacion_fkey";
            columns: ["id_ubicacion"];
            isOneToOne: false;
            referencedRelation: "ubicaciones";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sub_ubicaciones_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sub_ubicaciones_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "users_view";
            referencedColumns: ["id"];
          },
        ];
      };
      transferencias: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          estado_transferencia: string;
          fecha_autorizacion: string | null;
          fecha_solicitud: string | null;
          fecha_transferencia: string | null;
          id: number;
          id_bien: number | null;
          id_usuario_autoriza: string | null;
          id_usuario_destino: string | null;
          id_usuario_origen: string | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          estado_transferencia: string;
          fecha_autorizacion?: string | null;
          fecha_solicitud?: string | null;
          fecha_transferencia?: string | null;
          id?: number;
          id_bien?: number | null;
          id_usuario_autoriza?: string | null;
          id_usuario_destino?: string | null;
          id_usuario_origen?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          estado_transferencia?: string;
          fecha_autorizacion?: string | null;
          fecha_solicitud?: string | null;
          fecha_transferencia?: string | null;
          id?: number;
          id_bien?: number | null;
          id_usuario_autoriza?: string | null;
          id_usuario_destino?: string | null;
          id_usuario_origen?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "transferencias_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transferencias_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transferencias_id_bien_fkey";
            columns: ["id_bien"];
            isOneToOne: false;
            referencedRelation: "bienes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transferencias_id_usuario_autoriza_fkey";
            columns: ["id_usuario_autoriza"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transferencias_id_usuario_autoriza_fkey";
            columns: ["id_usuario_autoriza"];
            isOneToOne: false;
            referencedRelation: "users_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transferencias_id_usuario_destino_fkey";
            columns: ["id_usuario_destino"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transferencias_id_usuario_destino_fkey";
            columns: ["id_usuario_destino"];
            isOneToOne: false;
            referencedRelation: "users_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transferencias_id_usuario_origen_fkey";
            columns: ["id_usuario_origen"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transferencias_id_usuario_origen_fkey";
            columns: ["id_usuario_origen"];
            isOneToOne: false;
            referencedRelation: "users_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transferencias_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transferencias_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "users_view";
            referencedColumns: ["id"];
          },
        ];
      };
      ubicaciones: {
        Row: {
          codigo: string;
          created_at: string | null;
          created_by: string | null;
          descripcion: string | null;
          id: number;
          nombre: string;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          codigo: string;
          created_at?: string | null;
          created_by?: string | null;
          descripcion?: string | null;
          id?: number;
          nombre: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          codigo?: string;
          created_at?: string | null;
          created_by?: string | null;
          descripcion?: string | null;
          id?: number;
          nombre?: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ubicaciones_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ubicaciones_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ubicaciones_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ubicaciones_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "users_view";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      users_view: {
        Row: {
          avatar_url: string | null;
          email: string | null;
          full_name: string | null;
          id: string | null;
          id_rol: number | null;
          updated_at: string | null;
          username: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_profiles_roles";
            columns: ["id_rol"];
            isOneToOne: false;
            referencedRelation: "roles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
