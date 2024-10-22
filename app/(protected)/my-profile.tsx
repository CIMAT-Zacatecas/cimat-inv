import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Alert, Button } from "react-native";

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
    <View style={styles.container}>
      <Text style={styles.title}>Mi perfil</Text>
      <Text style={styles.title}>Hola, {user?.profile.full_name || user?.authUser.email}!</Text>
      <Text>{user?.authUser.email}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});
