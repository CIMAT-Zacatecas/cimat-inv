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
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      clearUser();
      router.replace("/login");
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
