import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Plus } from "lucide-react-native";

export default function InventoryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Inventario",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("/inventory/create-item")}
              style={{ marginRight: 16 }}>
              <Plus size={24} color="black" />
            </TouchableOpacity>
          ),
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
    </Stack>
  );
}
