import { Text, TouchableOpacity } from "react-native";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableData } from "@/components/ui/table";
import Container from "@/components/ui/container";
import { useInventory } from "@/hooks/useInventory";
import { Spinner } from "@/components/ui/spinner";
import { router } from "expo-router";
import { Bien } from "@/types/types";

export default function Inventory() {
  const { data: bienes = [], isLoading, error } = useInventory();

  const handlePress = (bien: Bien) => {
    router.push({
      pathname: "/inventory/item-detail",
      params: { bien: JSON.stringify(bien) },
    });
  };

  if (error) {
    return (
      <Container centered>
        <Text>Error al cargar el inventario</Text>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container centered>
        <Spinner size="large" />
        <Text>Cargando inventario...</Text>
      </Container>
    );
  }

  if (bienes.length === 0) {
    return (
      <Container centered>
        <Text>Inventario</Text>
        <Text>No hay bienes disponibles.</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Text>Inventario</Text>

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
