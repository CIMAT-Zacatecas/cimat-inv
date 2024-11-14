import { Tabs, Redirect } from "expo-router";
import { useUserStore } from "@/store/userStore";
import { ROLES } from "@/constants/Roles";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function ProtectedLayout() {
  const user = useUserStore((state) => state.user);

  // If user state is still loading, show nothing
  if (user === undefined) {
    return null;
  }

  // If not logged in, redirect to login
  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  const isAdmin = user?.profile?.id_rol === ROLES.ADMIN;

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          headerShown: false,
          title: "Inventario",
          tabBarIcon: ({ color }) => <FontAwesome name="list" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-profile"
        options={{
          title: "Mi Perfil",
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: "Scanner",
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome name="qrcode" size={24} color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: "Usuarios",
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome name="shield" size={24} color={color} />,
          tabBarButton: isAdmin ? undefined : () => null,
        }}
      />
    </Tabs>
  );
}
