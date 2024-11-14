import { Stack } from "expo-router";

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
