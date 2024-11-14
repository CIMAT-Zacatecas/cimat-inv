import { Tabs, Redirect } from "expo-router";
import { useUserStore } from "@/store/userStore";
import { ROLES } from "@/constants/Roles";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function UserLayout() {
  const user = useUserStore((state) => state.user);

  // If user is an admin, redirect them to admin layout
  if (user?.profile?.id_rol === ROLES.ADMIN) {
    return <Redirect href="/(protected)/(admin)" />;
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
    </Tabs>
  );
}
