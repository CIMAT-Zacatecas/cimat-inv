import { useEffect, useState } from "react";
import { Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { useAuthUser } from "@/hooks/useAuthUser";
import { Bien } from "@/types/types";
import Container from "@/components/ui/container";
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
    <Container removeVerticalPadding>
      <Text className="mb-4 text-2xl font-bold">Mis bienes</Text>
      <FlashList
        estimatedItemSize={50}
        data={bienes}
        renderItem={({ item }) => <BienItem bien={item} onPress={() => handlePress(item)} />}
        keyExtractor={(item) => item.id_primario.toString()}
        contentContainerClassName="pb-5"
        ItemSeparatorComponent={() => <Separator height={10} />}
      />
    </Container>
  );
}
