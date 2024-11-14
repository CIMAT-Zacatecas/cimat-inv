import { useEffect } from "react";
import { useRouter, Tabs, Redirect } from "expo-router";
import { useUserStore } from "@/store/userStore";
import { ROLES } from "@/constants/Roles";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function AdminLayout() {
  const user = useUserStore((state) => state.user);

  // If user is not an admin, redirect them using Redirect component
  if (user?.profile?.id_rol !== ROLES.ADMIN) {
    return <Redirect href="/(protected)/(user)" />;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      {/* Shared Screens */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: "Inventory",
          tabBarIcon: ({ color }) => <FontAwesome name="list" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
        }}
      />
      {/* Admin-Specific Screens */}
      <Tabs.Screen
        name="users"
        options={{
          title: "Users",
          tabBarIcon: ({ color }) => <FontAwesome name="shield" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
