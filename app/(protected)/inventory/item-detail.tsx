import { useLocalSearchParams } from "expo-router";
import Container from "@/components/ui/container";
import { HStack } from "@/components/ui/hstack";
import { Bien } from "@/types/types";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

export default function ItemDetail() {
  const { bien } = useLocalSearchParams();
  const parsedBien: Bien | null = bien ? JSON.parse(bien as string) : null;

  if (!parsedBien) {
    return (
      <Container>
        <Text>No se proporcionaron detalles del bien.</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <HStack space="md">
          <Text className="text-typography-900" bold>
            ID Primario:
          </Text>
          <Text>{parsedBien.id_primario}</Text>
        </HStack>

        <HStack space="md">
          <Text className="text-typography-900" bold>
            Descripción:
          </Text>
          <Text>{parsedBien.descripcion}</Text>
        </HStack>

        {parsedBien.id_ubicacion && (
          <HStack space="md">
            <Text className="text-typography-900" bold>
              Ubicación:
            </Text>
            <Text>{parsedBien.id_ubicacion}</Text>
          </HStack>
        )}

        {parsedBien.id_estado && (
          <HStack space="md">
            <Text className="text-typography-900" bold>
              Estado:
            </Text>
            <Text>{parsedBien.id_estado}</Text>
          </HStack>
        )}
      </Card>
    </Container>
  );
}
