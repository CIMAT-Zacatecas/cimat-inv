import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { useUserStore } from "@/store/userStore";
import { supabase } from "@/lib/supabase";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import type { Profile } from "@/types/profile";

export default function LoginScreen() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      Alert.alert("Error", authError.message);
      return;
    }

    // Fetch the user's profile
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (profileError) {
      Alert.alert("Error", profileError.message);
      return;
    }

    const profile = profileData as Profile;
    const user = { authUser: authData.user, profile };
    setUser(user);

    // Navigate to Home after successful login
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <VStack space="md">
        <Text>Logo</Text>
        <Text>Bienvenido</Text>
        <Text>Ingresa tus datos para iniciar sesión</Text>
        <Input>
          <InputField
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </Input>
        <Input>
          <InputField placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
        </Input>
        <Button onPress={handleLogin}>
          <ButtonText>Iniciar sesión</ButtonText>
        </Button>
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
});
