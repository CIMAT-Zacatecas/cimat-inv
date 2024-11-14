import { Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useAuthUser } from "@/hooks/useAuthUser";
import { Bien } from "@/types/types";
import Container from "@/components/ui/container";
import { FlashList } from "@shopify/flash-list";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Separator } from "@/components/ui/separator";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { useUserInventory } from "@/hooks/useInventory";
import { Spinner } from "@/components/ui/spinner";

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

export default function HomeScreen() {
  const user = useAuthUser();
  const {
    data: bienes = [],
    isLoading,
    error,
    refetch,
  } = useUserInventory(user.profile?.id);

  useRefreshOnFocus(refetch);

  const handlePress = (bien: Bien) => {
    router.push({
      pathname: "/home/item-detail",
      params: { bien: JSON.stringify(bien) },
    });
  };

  if (isLoading) {
    return (
      <Container centered>
        <Spinner size="large" />
        <Text>Cargando inventario...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container centered>
        <Text>Error al cargar el inventario</Text>
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

  return (
    <Container removeVerticalPadding>
      <Text className="mb-4 text-2xl font-bold">Mis bienes</Text>
      <FlashList
        estimatedItemSize={50}
        data={bienes}
        renderItem={({ item }) => (
          <BienItem bien={item} onPress={() => handlePress(item)} />
        )}
        keyExtractor={(item) => item.id_primario.toString()}
        contentContainerClassName="pb-5"
        ItemSeparatorComponent={() => <Separator height={10} />}
      />
    </Container>
  );
}
