import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Card } from "@/components/ui/card";
import { TouchableOpacity } from "react-native";
import { BienWithRelations } from "@/types/types";

const BienItem = ({
  bien,
  onPress,
}: {
  bien: BienWithRelations;
  onPress: () => void;
}) => {
  const estadoColors: Record<string, string> = {
    asignado: "text-green-600",
    "no asignado": "text-gray-500",
    "baja en Zacatecas": "text-red-600",
    "mantenimiento en Guanajuato": "text-yellow-500",
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Card size="md" variant="elevated">
        <VStack space="sm">
          <HStack space="md" className="justify-between">
            <Text className="font-bold">ID: {bien.id_primario}</Text>
            {bien.estado && (
              <Text className={estadoColors[bien.estado.nombre] || "text-black"}>
                {bien.estado.nombre}
              </Text>
            )}
          </HStack>

          <Text className="text-base">{bien.descripcion}</Text>

          <HStack space="md" className="justify-between">
            {bien.ubicacion && (
              <Text className="text-sm text-gray-600">
                📍 {bien.ubicacion.codigo} - {bien.ubicacion.nombre}
              </Text>
            )}
            {bien.categoria && (
              <Text className="text-sm text-gray-600">{bien.categoria.nombre}</Text>
            )}
          </HStack>
        </VStack>
      </Card>
    </TouchableOpacity>
  );
};

BienItem.displayName = "BienItem";

export default BienItem;
