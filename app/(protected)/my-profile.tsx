import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Container from "@/components/ui/container";
import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { VStack } from "@/components/ui/vstack";

export default function MyProfile() {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Verificar la sesión actual
      const session = await supabase.auth.getSession();

      if (!session?.data?.session) {
        console.warn("No active session found. Redirecting to login...");
        clearUser(); // Limpia cualquier estado de usuario en el store
        router.replace("/login"); // Redirige a la pantalla de inicio de sesión
        return;
      }

      // Intentar cerrar sesión
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error during logout:", error);
        Alert.alert("Error", error.message);
        clearUser();
        router.replace("/login");
      } else {
        clearUser();
        router.replace("/login");
      }
    } catch (error) {
      console.error("Unexpected error during logout:", error);
      Alert.alert(
        "Error",
        "Ocurrió un error inesperado. Por favor, inténtalo nuevamente.",
      );
    }
  };

  return (
    <Container centered>
      <VStack space="lg" className="items-center">
        <Text>Hola, {user?.profile.full_name || user?.authUser.email}!</Text>
        <Text>{user?.authUser.email}</Text>
        <Button onPress={handleLogout}>
          <ButtonText>Logout</ButtonText>
        </Button>
      </VStack>
    </Container>
  );
}
