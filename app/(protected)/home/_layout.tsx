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
          headerShown: false,
          title: "Inicio",
        }}
      />
      <Stack.Screen
        name="item-detail"
        options={{
          title: "Detalle del Item",
        }}
      />
    </Stack>
  );
}
