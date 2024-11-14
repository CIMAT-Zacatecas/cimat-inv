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
}) => (
  <TouchableOpacity onPress={onPress}>
    <Card size="md" variant="elevated">
      <VStack space="sm">
        <HStack space="md" className="justify-between">
          <Text className="font-bold">ID: {bien.id_primario}</Text>
          {bien.estado && (
            <Text
              className={
                bien.estado.nombre === "activo" ? "text-green-600" : "text-red-600"
              }>
              {bien.estado.nombre}
            </Text>
          )}
        </HStack>

        <Text className="text-base">{bien.descripcion}</Text>

        <HStack space="md" className="justify-between">
          {bien.ubicacion && (
            <Text className="text-sm text-gray-600">📍 {bien.ubicacion.nombre}</Text>
          )}
          {bien.categoria && (
            <Text className="text-sm text-gray-600">{bien.categoria.nombre}</Text>
          )}
        </HStack>
      </VStack>
    </Card>
  </TouchableOpacity>
);
BienItem.displayName = "BienItem";

export default BienItem;
