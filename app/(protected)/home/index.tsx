import { Text } from "react-native";
import { router } from "expo-router";
import { useAuthUser } from "@/hooks/user/useUser";
import { BienWithRelations } from "@/types/types";
import Container from "@/components/ui/container";
import { FlashList } from "@shopify/flash-list";
import { Separator } from "@/components/ui/separator";
import { useAppFocus } from "@/hooks/core/useAppState";
import { useUserInventory } from "@/hooks/inventory/useInventory";
import { Spinner } from "@/components/ui/spinner";
import React from "react";
import BienItem from "@/components/bienItem";

export default function HomeScreen() {
  const user = useAuthUser();
  const {
    data: bienes = [],
    isLoading,
    error,
    refetch,
  } = useUserInventory(user.profile?.id);

  useAppFocus(refetch);

  const handlePress = (bien: BienWithRelations) => {
    router.push({
      pathname: "/home/item-detail",
      params: { id: bien.id_primario },
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
        ListHeaderComponent={() => <Separator height={8} />}
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
