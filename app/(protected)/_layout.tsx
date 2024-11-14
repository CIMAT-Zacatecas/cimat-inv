import { Redirect, Tabs } from "expo-router";
import { Icon } from "@/components/ui/icon";
import { useUserStore } from "@/store/userStore";
import {
  Home,
  Warehouse,
  QrCode,
  Users,
  ArrowLeftRight,
  CircleUser,
  LayoutDashboard,
} from "lucide-react-native";
import { Platform } from "react-native";
import { ROLES } from "@/constants/Roles";

export default function ProtectedLayout() {
  const user = useUserStore((state) => state.user);
  const isAdmin = user?.profile?.id_rol === ROLES.ADMIN;

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#73243D",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
        },
      }}>
      {/* Admin Routes */}
      {isAdmin ? (
        <>
          <Tabs.Screen
            name="admin-dashboard/index"
            options={{
              title: "Dashboard",
              tabBarIcon: ({ color }) => <Icon as={LayoutDashboard} size="xl" color={color} />,
            }}
          />
          <Tabs.Screen
            name="inventory/index"
            options={{
              title: "Inventario",
              tabBarIcon: ({ color }) => <Icon as={Warehouse} size="xl" color={color} />,
            }}
          />
          <Tabs.Screen
            name="scanner/index"
            options={{
              title: "QR",
              tabBarIcon: ({ color }) => <Icon as={QrCode} size="xl" color={color} />,
            }}
          />
          <Tabs.Screen
            name="users-management/index"
            options={{
              title: "Usuarios",
              tabBarIcon: ({ color }) => <Icon as={Users} size="xl" color={color} />,
            }}
          />
          <Tabs.Screen
            name="transfers/index"
            options={{
              title: "Transferencias",
              tabBarIcon: ({ color }) => <Icon as={ArrowLeftRight} size="xl" color={color} />,
            }}
          />
        </>
      ) : (
        <Tabs.Screen
          name="index"
          options={{
            title: "Inicio",
            tabBarIcon: ({ color }) => <Icon as={Home} size="xl" color={color} />,
          }}
        />
      )}

      {/* Common Route */}
      <Tabs.Screen
        name="my-profile"
        options={{
          title: "Mi Perfil",
          tabBarIcon: ({ color }) => <Icon as={CircleUser} size="xl" color={color} />,
        }}
      />
    </Tabs>
  );
}
