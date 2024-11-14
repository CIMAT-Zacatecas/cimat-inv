// app/(protected)/inventory/_layout.tsx
import { Stack } from "expo-router";

export default function InventoryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Inventario",
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
