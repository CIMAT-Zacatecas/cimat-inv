import { Stack } from "expo-router";
import { TouchableOpacity, Platform } from "react-native";
import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import { Fab, FabIcon } from "@/components/ui/fab";

export default function InventoryLayout() {
  const handleCreateItem = () => {
    router.push("/inventory/create-item");
  };

  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Inventario",
            headerRight:
              Platform.OS === "ios"
                ? () => (
                    <TouchableOpacity
                      onPress={handleCreateItem}
                      style={{ marginRight: 16 }}>
                      <Plus size={24} color="black" />
                    </TouchableOpacity>
                  )
                : undefined,
          }}
        />
        <Stack.Screen
          name="item-detail"
          options={{
            title: "Detalle del Item",
          }}
        />
        <Stack.Screen
          name="create-item"
          options={{
            title: "Crear Item",
          }}
        />
        <Stack.Screen
          name="edit-item"
          options={{
            title: "Editar Item",
          }}
        />
      </Stack>
    </>
  );
}
