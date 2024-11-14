import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Container from "@/components/ui/container";
import { HStack } from "@/components/ui/hstack";
import { Bien } from "@/types/types";

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
      {/* Content */}
      <View>
        <HStack>
          <Text>ID Primario:</Text>
          <Text>{parsedBien.id_primario}</Text>
        </HStack>

        <HStack>
          <Text>Descripción:</Text>
          <Text>{parsedBien.descripcion}</Text>
        </HStack>

        {/* Add more details if available in your data */}
        {parsedBien.id_ubicacion && (
          <HStack>
            <Text>Ubicación:</Text>
            <Text>{parsedBien.id_ubicacion}</Text>
          </HStack>
        )}

        {parsedBien.id_estado && (
          <HStack>
            <Text>Estado:</Text>
            <Text>{parsedBien.id_estado}</Text>
          </HStack>
        )}
      </View>
    </Container>
  );
}
