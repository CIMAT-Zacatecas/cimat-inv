import { Text } from "react-native";
import Container from "@/components/ui/container";
import { useInventory } from "@/hooks/useInventory";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { Spinner } from "@/components/ui/spinner";
import { router } from "expo-router";
import { Bien } from "@/types/types";
import { FlashList } from "@shopify/flash-list";
import { Separator } from "@/components/ui/separator";
import BienItem from "@/components/bienItem";

export default function Inventory() {
  const { data: bienes = [], isLoading, error, refetch } = useInventory();

  useRefreshOnFocus(refetch);

  const handlePress = (bien: Bien) => {
    router.push({
      pathname: "/inventory/item-detail",
      params: { id: bien.id_primario },
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
