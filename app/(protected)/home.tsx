import { useEffect, useState } from "react";
import { TableHeader, TableRow, TableHead, TableBody, TableData, Table } from "@/components/ui/table";
import { Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { useAuthUser } from "@/hooks/useAuthUser";
import { Bien } from "@/types/types";
import Container from "@/components/ui/container";

export default function HomeScreen() {
  const user = useAuthUser();
  const [bienes, setBienes] = useState<Bien[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBienes = async () => {
      try {
        if (!user.profile?.id) {
          setError("Usuario no identificado");
          return;
        }

        const { data, error: supabaseError } = await supabase
          .from("bienes")
          .select("*")
          .eq("id_responsable", user.profile.id);

        if (supabaseError) {
          setError("Error al obtener bienes");
          console.error("Error al obtener bienes:", supabaseError);
        } else {
          setBienes(data || []);
        }
      } catch (err) {
        setError("Error inesperado");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBienes();
  }, [user.profile?.id]);

  if (loading) {
    return (
      <Container centered>
        <ActivityIndicator size="large" />
        <Text>Cargando inventario...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container centered>
        <Text>{error}</Text>
      </Container>
    );
  }

  if (bienes.length === 0) {
    return (
      <Container centered>
        <Text>Mi Inventario</Text>
        <Text>No tienes bienes asignados.</Text>
      </Container>
    );
  }

  const handlePress = (bien: Bien) => {
    router.push({
      pathname: "/(protected)/inventory/item-detail",
      params: { bien: JSON.stringify(bien) },
    });
  };

  return (
    <Container>
      <Text>Mis bienes</Text>

      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bienes.map((bien) => (
            <TouchableOpacity key={bien.id_primario} onPress={() => handlePress(bien)}>
              <TableRow>
                <TableData>{bien.id_primario}</TableData>
                <TableData>{bien.descripcion}</TableData>
                <TableData>
                  <Text>→</Text>
                </TableData>
              </TableRow>
            </TouchableOpacity>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
