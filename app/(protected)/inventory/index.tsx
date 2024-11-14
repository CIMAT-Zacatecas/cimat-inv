import { Text, TouchableOpacity } from "react-native";
import Container from "@/components/ui/container";
import { useInventory } from "@/hooks/useInventory";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { Spinner } from "@/components/ui/spinner";
import { router } from "expo-router";
import { Bien } from "@/types/types";
import { FlashList } from "@shopify/flash-list";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Separator } from "@/components/ui/separator";

const BienItem = ({ bien, onPress }: { bien: Bien; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress}>
    <Card size="md" variant="elevated">
      <VStack space="sm">
        <HStack space="md">
          <Text>ID: {bien.id_primario}</Text>
          <Text>→</Text>
        </HStack>
        <Text>{bien.descripcion}</Text>
      </VStack>
    </Card>
  </TouchableOpacity>
);

export default function Inventory() {
  const { data: bienes = [], isLoading, error, refetch } = useInventory();

  useRefreshOnFocus(refetch);

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
    <Container removeVerticalPadding>
      <FlashList
        ListHeaderComponent={() => <Separator height={8} />}
        estimatedItemSize={50}
        data={bienes}
        renderItem={({ item }) => (
          <BienItem bien={item} onPress={() => handlePress(item)} />
        )}
        keyExtractor={(item) => item.id_primario.toString()}
        contentContainerClassName="pb-5"
        ItemSeparatorComponent={() => <Separator height={8} />}
      />
    </Container>
  );
}
