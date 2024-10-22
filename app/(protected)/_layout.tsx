import { Redirect } from "expo-router";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useUserStore } from "@/store/userStore";
import { Icon } from "@/components/ui/icon";
import HomeScreen from ".";
import MyProfile from "./my-profile";
import AdminDashboard from "./admin-dashboard";
import Inventary from "./inventary";
import Scanner from "./scanner";
import { ArrowLeftRight, CircleUser, Home, LayoutDashboard, QrCode, Users, Warehouse } from "lucide-react-native";
import Transfers from "./transfers";
import UsersManagement from "./users-management";

const Tab = createBottomTabNavigator();

export default function ProtectedLayout() {
  const user = useUserStore((state) => state.user);

  if (!user) {
    // If the user is not logged in, redirect to the login screen
    return <Redirect href="/login" />;
  }

  const isAdmin = user.profile?.id_rol === 1;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconComponent;

          if (route.name === "Dashboard") {
            iconComponent = LayoutDashboard;
          } else if (route.name === "Inventario") {
            iconComponent = Warehouse;
          } else if (route.name === "QR") {
            iconComponent = QrCode;
          } else if (route.name === "Usuarios") {
            iconComponent = Users;
          } else if (route.name === "Transferencias") {
            iconComponent = ArrowLeftRight;
          } else if (route.name === "Mi Perfil") {
            iconComponent = CircleUser;
          } else if (route.name === "Inicio") {
            iconComponent = Home;
          }

          return <Icon as={iconComponent} size="xl" />;
        },
        tabBarActiveTintColor: "#73243D",
        tabBarInactiveTintColor: "gray",
      })}>
      {isAdmin ? (
        <>
          <Tab.Screen name="Dashboard" component={AdminDashboard} />
          <Tab.Screen name="Inventario" component={Inventary} />
          <Tab.Screen name="QR" component={Scanner} />
          <Tab.Screen name="Usuarios" component={UsersManagement} />
          <Tab.Screen name="Transferencias" component={Transfers} />
        </>
      ) : (
        <>
          <Tab.Screen name="Inicio" component={HomeScreen} />
        </>
      )}
      <Tab.Screen name="Mi Perfil" component={MyProfile} />
    </Tab.Navigator>
  );
}
