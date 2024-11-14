import { useLocalSearchParams, router } from "expo-router";
import Container from "@/components/ui/container";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useInventoryItem } from "@/hooks/useInventory";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react-native";
import { useItemOperations } from "@/hooks/useInventoryOperations";

export default function ItemDetail() {
  const { id } = useLocalSearchParams();
  const { data: bien, isLoading, error } = useInventoryItem(id as string);
  const { deleteItem } = useItemOperations();

  const handleEdit = () => {
    router.push(`/inventory/edit-item?id=${id}`);
  };

  const handleDelete = () => {
    deleteItem(id as string);
  };

  if (isLoading) {
    return (
      <Container centered>
        <Spinner size="large" />
        <Text>Cargando detalles...</Text>
      </Container>
    );
  }

  if (error || !bien) {
    return (
      <Container>
        <Text>No se pudieron cargar los detalles del bien.</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <VStack space="md">
          <HStack space="md" className="items-center justify-between">
            <HStack space="md" className="flex-1">
              <Text className="text-typography-900" bold>
                ID:
              </Text>
              <Text>{bien.id}</Text>
            </HStack>
            <HStack space="sm">
              <Button size="sm" variant="outline" action="secondary" onPress={handleEdit}>
                <Pencil size={18} color="#666666" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                action="negative"
                onPress={handleDelete}>
                <Trash2 size={18} color="#dc2626" />
              </Button>
            </HStack>
          </HStack>

          <HStack space="md">
            <Text className="text-typography-900" bold>
              ID CIMAT:
            </Text>
            <Text>{bien.id_primario}</Text>
          </HStack>

          {bien.id_secundario && (
            <HStack space="md">
              <Text className="text-typography-900" bold>
                ID CIMAT 2:
              </Text>
              <Text>{bien.id_secundario}</Text>
            </HStack>
          )}

          <HStack space="md">
            <Text className="text-typography-900" bold>
              Descripción:
            </Text>
            <Text>{bien.descripcion}</Text>
          </HStack>

          {bien.codigo_barra && (
            <HStack space="md">
              <Text className="text-typography-900" bold>
                Código de Barras:
              </Text>
              <Text>{bien.codigo_barra}</Text>
            </HStack>
          )}

          {bien.categoria && (
            <HStack space="md">
              <Text className="text-typography-900" bold>
                Categoría:
              </Text>
              <Text>{bien.categoria.nombre}</Text>
            </HStack>
          )}

          {bien.ubicacion && (
            <HStack space="md">
              <Text className="text-typography-900" bold>
                Ubicación:
              </Text>
              <Text>{bien.ubicacion.nombre}</Text>
            </HStack>
          )}

          {bien.sub_ubicacion && (
            <HStack space="md">
              <Text className="text-typography-900" bold>
                Sub-ubicación:
              </Text>
              <Text>{bien.sub_ubicacion.nombre}</Text>
            </HStack>
          )}

          {bien.estado && (
            <HStack space="md">
              <Text className="text-typography-900" bold>
                Estado:
              </Text>
              <Text>{bien.estado.nombre}</Text>
            </HStack>
          )}

          {bien.responsable && (
            <HStack space="md">
              <Text className="text-typography-900" bold>
                Responsable:
              </Text>
              <Text>{bien.responsable.full_name || bien.responsable.username}</Text>
            </HStack>
          )}

          {bien.subresponsable && (
            <HStack space="md">
              <Text className="text-typography-900" bold>
                Sub-responsable:
              </Text>
              <Text>{bien.subresponsable.full_name || bien.subresponsable.username}</Text>
            </HStack>
          )}

          {bien.fecha_registro && (
            <HStack space="md">
              <Text className="text-typography-900" bold>
                Fecha de Registro:
              </Text>
              <Text>{new Date(bien.fecha_registro).toLocaleDateString()}</Text>
            </HStack>
          )}
        </VStack>
      </Card>
    </Container>
  );
}
