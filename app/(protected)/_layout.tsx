import { Redirect } from "expo-router";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useUserStore } from "@/store/userStore";
import { Icon, StarIcon } from "@/components/ui/icon";
import HomeScreen from ".";
import MyProfile from "./my-profile";
import AdminDashboard from "./admin-dashboard";
import Inventary from "./inventary";
import Scanner from "./scanner";

const Tab = createBottomTabNavigator();

export default function ProtectedLayout() {
  const user = useUserStore((state) => state.user);

  if (!user) {
    // If the user is not logged in, redirect to the login screen
    return <Redirect href="/login" />;
  }

  const isAdmin = user.profile?.is_admin;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconComponent;

          if (route.name === "Dashboard" || "Inicio") {
            iconComponent = StarIcon;
          }
          // else if (route.name === "Inventario") {
          //   iconComponent = StarIcon;

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
          <Tab.Screen name="Usuario" component={Scanner} />
          <Tab.Screen name="Transferencias" component={Scanner} />
        </>
      ) : (
        <>
          <Tab.Screen name="Inicio" component={HomeScreen} />
        </>
      )}
      <Tab.Screen name="Mi Perfil" component={MyProfile} />
      {/* <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Inventario" component={HomeScreen} />
      <Tab.Screen name="QR" component={HomeScreen} />
      <Tab.Screen name="Usuarios" component={HomeScreen} />
      <Tab.Screen name="Mi perfil" component={MyProfile} /> */}
    </Tab.Navigator>
  );
}
