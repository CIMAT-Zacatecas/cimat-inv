import { useEffect, useState } from "react";
import { Text, ActivityIndicator, ScrollView } from "react-native";
import { supabase } from "@/lib/supabase";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableData } from "@/components/ui/table";
import { Bien } from "@/types/types";
import Container from "@/components/ui/container";

export default function Inventory() {
  const [bienes, setBienes] = useState<Bien[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBienes = async () => {
    try {
      const { data, error } = await supabase.from("bienes").select("*");

      if (error) {
        console.error("Error al obtener bienes:", error);
      } else {
        setBienes(data);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBienes();
  }, []);

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando inventario...</Text>
      </Container>
    );
  }

  if (bienes.length === 0) {
    return (
      <Container>
        <Text>Inventario</Text>
        <Text>No hay bienes disponibles.</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Text>Inventario</Text>

      <ScrollView horizontal={true}>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Descripción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bienes.map((bien) => (
              <TableRow key={bien.id_primario}>
                <TableData>{bien.id_primario}</TableData>
                <TableData>{bien.descripcion}</TableData>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollView>
    </Container>
  );
}
